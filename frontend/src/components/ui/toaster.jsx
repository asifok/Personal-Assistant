import React from 'react';
import { useToast } from '../../hooks/use-toast';

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="w-[320px] rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-zinc-900">{toast.title}</p>
              {toast.description && <p className="mt-1 text-sm text-zinc-600">{toast.description}</p>}
            </div>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              className="text-zinc-400 hover:text-zinc-600"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
