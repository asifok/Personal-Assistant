import React from 'react';
import { ChevronDown, Trash2 } from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger, DropdownMenuSeparator,
} from './ui/dropdown-menu';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from './ui/alert-dialog';

const ChatHeader = ({ title, onNewChat, onClear, onExport, onRename, onDelete }) => {
  return (
    <header className="h-[78px] px-8 flex items-center justify-between border-b border-zinc-200 bg-white">
      <div>
        <h1 className="text-[22px] font-semibold text-zinc-900 leading-tight">{title}</h1>
        <p className="text-[13px] text-zinc-500 mt-0.5">AI-powered coding assistant</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onNewChat}
          className="h-10 px-4 rounded-md bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-medium text-[14px] transition-colors duration-200 shadow-sm"
        >
          New Chat
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-10 w-10 rounded-md border border-zinc-200 hover:bg-zinc-50 text-zinc-700 flex items-center justify-center transition-colors duration-150">
              <ChevronDown className="w-4 h-4" strokeWidth={2.25} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem onClick={onRename}>Rename chat</DropdownMenuItem>
            <DropdownMenuItem onClick={onExport}>Export chat</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onClear}>Clear messages</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="h-10 w-10 rounded-md border border-zinc-200 hover:bg-zinc-50 text-zinc-500 hover:text-rose-600 flex items-center justify-center transition-colors duration-150">
              <Trash2 className="w-4 h-4" strokeWidth={2} />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this chat?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. The conversation will be permanently removed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} className="bg-rose-600 hover:bg-rose-700">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </header>
  );
};

export default ChatHeader;