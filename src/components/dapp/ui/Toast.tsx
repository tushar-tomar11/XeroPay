"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type Toast = { id: number; text: string };

const ToastContext = createContext<{ push: (text: string) => void } | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);

  const push = useCallback((text: string) => {
    const id = Date.now() + Math.random();
    setItems((prev) => [...prev, { id, text }].slice(-5));
    window.setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 2800);
  }, []);

  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-4 left-1/2 z-[200] flex w-[min(92vw,360px)] -translate-x-1/2 flex-col gap-2">
        {items.map((t) => (
          <p
            key={t.id}
            className="rounded-2xl border border-white/12 bg-[#0B0E1A] px-4 py-2.5 text-center text-[13px] text-[#F7F7FA] shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
          >
            {t.text}
          </p>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) return { push: () => undefined };
  return ctx;
}
