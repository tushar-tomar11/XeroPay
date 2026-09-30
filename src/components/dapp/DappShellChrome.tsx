"use client";

import { SignIntentModal } from "@/components/dapp/ConnectWalletModal";
import { DAppSidebar } from "@/components/dapp/DAppSidebar";
import { DappAtmosphere } from "@/components/dapp/DappAtmosphere";
import { DappShellBar } from "@/components/dapp/DappShellBar";
import { CommandPalette } from "@/components/dapp/ui/CommandPalette";
import { ToastProvider } from "@/components/dapp/ui/Toast";
import { useCallback, useEffect, useRef, useState } from "react";

export function DappShellChrome({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const closePalette = useCallback(() => setPaletteOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!menuOpen || !drawerRef.current) return;
    const first = drawerRef.current.querySelector<HTMLElement>("a,button,input");
    first?.focus();
  }, [menuOpen]);

  return (
    <ToastProvider>
      <div className="flex min-h-svh overflow-x-clip bg-[#05060b] text-[#F7F7FA]">
        <aside className="sticky top-0 hidden h-svh w-[248px] shrink-0 overflow-hidden border-r border-white/10 lg:block">
          <DAppSidebar onOpenSearch={() => setPaletteOpen(true)} />
        </aside>

        {menuOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation">
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-black/60"
              onClick={() => setMenuOpen(false)}
            />
            <div
              ref={drawerRef}
              className="relative h-full w-[min(280px,86vw)] overflow-hidden border-r border-white/10"
            >
              <DAppSidebar onNavigate={() => setMenuOpen(false)} onOpenSearch={() => setPaletteOpen(true)} />
            </div>
          </div>
        ) : null}

        <div className="relative flex min-w-0 flex-1 flex-col">
          <div className="flex h-12 items-center justify-between gap-2 border-b border-white/10 px-4 lg:hidden">
            <button
              type="button"
              className="rounded-lg border border-white/12 px-3 py-1.5 text-[13px] text-[#C8CBD6]"
              onClick={() => setMenuOpen(true)}
            >
              Menu
            </button>
            <button
              type="button"
              className="rounded-lg border border-white/12 px-3 py-1.5 text-[13px] text-[#C8CBD6]"
              onClick={() => setPaletteOpen(true)}
            >
              Search
            </button>
          </div>
          <DappShellBar />
          <div className="relative min-h-0 flex-1 overflow-y-auto dapp-scroll">
            <DappAtmosphere />
            {children}
          </div>
        </div>
      </div>
      {paletteOpen ? <CommandPalette onClose={closePalette} /> : null}
      <SignIntentModal />
    </ToastProvider>
  );
}
