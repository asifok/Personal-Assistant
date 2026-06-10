import React, { useState, createContext, useContext, cloneElement } from 'react';

const AlertDialogContext = createContext(null);

export function AlertDialog({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialogContext.Provider value={{ open, setOpen }}>
      {children}
    </AlertDialogContext.Provider>
  );
}

export function AlertDialogTrigger({ asChild, children }) {
  const ctx = useContext(AlertDialogContext);
  if (!ctx) return null;

  const onClick = () => ctx.setOpen(true);

  if (asChild && React.isValidElement(children)) {
    return cloneElement(children, { onClick });
  }

  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export function AlertDialogContent({ children }) {
  const ctx = useContext(AlertDialogContext);
  if (!ctx || !ctx.open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
        {children}
      </div>
    </div>
  );
}

export function AlertDialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function AlertDialogTitle({ children }) {
  return <h2 className="text-lg font-semibold text-zinc-900">{children}</h2>;
}

export function AlertDialogDescription({ children }) {
  return <p className="mt-2 text-sm leading-6 text-zinc-600">{children}</p>;
}

export function AlertDialogFooter({ children }) {
  return <div className="mt-6 flex items-center justify-end gap-3">{children}</div>;
}

export function AlertDialogCancel({ children }) {
  const ctx = useContext(AlertDialogContext);
  if (!ctx) return null;
  return (
    <button
      type="button"
      onClick={() => ctx.setOpen(false)}
      className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50"
    >
      {children}
    </button>
  );
}

export function AlertDialogAction({ children, onClick }) {
  const ctx = useContext(AlertDialogContext);
  if (!ctx) return null;
  return (
    <button
      type="button"
      onClick={(event) => {
        if (onClick) onClick(event);
        ctx.setOpen(false);
      }}
      className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
    >
      {children}
    </button>
  );
}
