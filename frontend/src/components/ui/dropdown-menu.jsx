import React, { useState, useContext, cloneElement } from 'react';

const DropdownMenuContext = React.createContext(null);

export function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-flex">{children}</div>
    </DropdownMenuContext.Provider>
  );
}

export function DropdownMenuTrigger({ asChild, children }) {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx) return null;
  const { setOpen } = ctx;

  const onClick = () => setOpen((prev) => !prev);

  if (asChild && React.isValidElement(children)) {
    return cloneElement(children, { onClick });
  }

  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export function DropdownMenuContent({ children, className = '' }) {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx || !ctx.open) return null;
  return (
    <div className={`absolute right-0 z-50 mt-2 w-44 rounded-xl border border-zinc-200 bg-white p-1 shadow-xl ${className}`}>
      {children}
    </div>
  );
}

export function DropdownMenuItem({ onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-xl px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-100"
    >
      {children}
    </button>
  );
}

export function DropdownMenuSeparator() {
  return <div className="my-1 h-px bg-zinc-200" />;
}
