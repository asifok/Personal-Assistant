import React, { useState } from 'react';
import { Send } from 'lucide-react';

const Composer = ({ onSend, disabled }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="px-6 md:px-10 pb-8 pt-3 bg-white">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex items-end gap-3">
        <div className="flex-1 rounded-lg border border-zinc-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#7c3aed]/30 focus-within:border-[#7c3aed]/40 transition-shadow">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about code..."
            rows={1}
            className="w-full resize-none bg-transparent px-4 py-3 text-[14.5px] text-zinc-900 placeholder:text-zinc-400 outline-none max-h-40"
          />
        </div>
        <button
          type="submit"
          disabled={!value.trim() || disabled}
          className="h-12 w-12 rounded-lg bg-[#a78bfa] hover:bg-[#8b5cf6] disabled:opacity-60 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors duration-200 shadow-sm"
          aria-label="Send"
        >
          <Send className="w-5 h-5" strokeWidth={2} />
        </button>
      </form>
    </div>
  );
};

export default Composer;
