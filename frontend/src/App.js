import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import ChatHeader from './components/ChatHeader';
import MessageList from './components/MessageList';
import Composer from './components/Composer';
import { Toaster } from './components/ui/toaster';
import { useToast } from './hooks/use-toast';

const API_URL = "https://ai-assistant-backend-production-e37f.up.railway.app"; 

const STORAGE_KEY = 'ai-code-assistant-state-v1';

const initialChats = [
  {
    id: "chat-1",
    title: "New Chat",
    messages: [],
    createdAt: new Date().toISOString()
  }
];

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) { return null; }
};

const saveState = (state) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
};

function App() {
  const persisted = useMemo(() => loadState(), []);
  const [chats, setChats] = useState(persisted?.chats || initialChats);
  const [activeChatId, setActiveChatId] = useState(persisted?.activeChatId || initialChats[0].id);
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  useEffect(() => { saveState({ chats, activeChatId }); }, [chats, activeChatId]);

  const activeChat =chats?.find((c) => c.id === activeChatId) || chats?.[0];

  const handleNewChat = () => {
    const id = `chat-${Date.now()}`;
    setChats((prev) => [{ id, title: 'Chat', messages: [], createdAt: new Date().toISOString() }, ...prev]);
    setActiveChatId(id);
  };

  const handleSelectChat = (id) => setActiveChatId(id);

  const handleSend = async (text) => {
    const userMsg = { id: `m-${Date.now()}`, role: 'user', content: text };
    setChats((prev) => prev.map((c) => {
      if (c.id !== activeChatId) return c;
      const isFirst = c.messages.length === 0;
      return { ...c, title: isFirst ? text.slice(0, 32) : c.title, messages: [...c.messages, userMsg] };
    }));

    setIsTyping(true);

    try {
      const response = await fetch(`${API_URL}/api/chat?msg=${encodeURIComponent(text)}`);
      let assistantText = '';

      if (!response.ok) {
        assistantText = 'Sorry, I could not reach the chat service. Please try again.';
      } else {
        const body = await response.text();
        try {
          const parsed = JSON.parse(body);
          if (parsed && typeof parsed === 'object' && parsed.content) {
            assistantText = parsed.content;
          } else if (parsed && typeof parsed === 'object') {
            assistantText = JSON.stringify(parsed, null, 2);
          } else {
            assistantText = String(parsed);
          }
        } catch {
          assistantText = body;
        }
      }

      const botMsg = { id: `m-${Date.now() + 1}`, role: 'assistant', content: assistantText };
      setChats((prev) => prev.map((c) => c.id === activeChatId ? { ...c, messages: [...c.messages, botMsg] } : c));
    } catch (error) {
      const botMsg = { id: `m-${Date.now() + 1}`, role: 'assistant', content: 'Unable to connect to backend chat API.' };
      setChats((prev) => prev.map((c) => c.id === activeChatId ? { ...c, messages: [...c.messages, botMsg] } : c));
    } finally {
      setIsTyping(false);
    }
  };

  const handleClear = () => {
    setChats((prev) => prev.map((c) => c.id === activeChatId ? { ...c, messages: [] } : c));
    toast({ title: 'Messages cleared' });
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(activeChat, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeChat.title || 'chat'}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Chat exported' });
  };

  const handleRename = () => {
    const next = window.prompt('Rename chat', activeChat.title);
    if (next && next.trim()) {
      setChats((prev) => prev.map((c) => c.id === activeChatId ? { ...c, title: next.trim() } : c));
    }
  };

  const handleDelete = () => {
    setChats((prev) => {
      const filtered = prev.filter((c) => c.id !== activeChatId);
      if (filtered.length === 0) {
        const fresh = { id: `chat-${Date.now()}`, title: 'Chat', messages: [], createdAt: new Date().toISOString() };
        setActiveChatId(fresh.id);
        return [fresh];
      }
      setActiveChatId(filtered[0].id);
      return filtered;
    });
    toast({ title: 'Chat deleted' });
  };

  return (
    <div className="App h-screen w-screen flex bg-white overflow-hidden">
      <Sidebar chats={chats} activeChatId={activeChatId} onNewChat={handleNewChat} onSelectChat={handleSelectChat} />
      <main className="flex-1 flex flex-col min-w-0">
        <ChatHeader
          title="New Chat"
          onNewChat={handleNewChat}
          onClear={handleClear}
          onExport={handleExport}
          onRename={handleRename}
          onDelete={handleDelete}
        />
        <MessageList messages={activeChat?.messages || []} isTyping={isTyping} />
        <Composer onSend={handleSend} disabled={isTyping} />
      </main>
      <Toaster />
    </div>
  );
}

export default App;