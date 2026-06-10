import React from 'react';
import { Bot, Plus, MessageSquare } from 'lucide-react';
import { cn } from '../lib/utils';

const Sidebar = ({ chats, activeChatId, onNewChat, onSelectChat }) => {
  return (
    <aside className="w-[260px] shrink-0 bg-[#0d0d0f] text-white flex flex-col border-r border-black/40">
      <div className="px-5 pt-5 pb-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#7c3aed] flex items-center justify-center shadow-md">
          <Bot className="w-5 h-5 text-white" strokeWidth={2.25} />
        </div>
        <div className="leading-tight">
          <div className="font-semibold text-[15px]">AI Code</div>
          <div className="font-semibold text-[15px]">Assistant</div>
        </div>
      </div>

      <div className="px-4 pt-2">
        <button
          onClick={onNewChat}
          className="w-full h-11 rounded-lg bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-medium text-[15px] flex items-center justify-center gap-2 transition-colors duration-200 shadow-sm"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          New Chat
        </button>
      </div>

      <div className="px-3 pt-5 flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {chats.map((c) => (
            <li key={c.id}>
              <button
                onClick={() => onSelectChat(c.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 h-10 rounded-md text-[14px] text-left transition-colors duration-150',
                  c.id === activeChatId
                    ? 'bg-[#1c1c20] text-white'
                    : 'text-zinc-300 hover:bg-[#17171a]'
                )}
              >
                <MessageSquare className="w-4 h-4 text-zinc-400" strokeWidth={2} />
                <span className="truncate">{c.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
