"use client";

import { ConnectWalletModal, SignIntentModal } from "@/components/dapp/ConnectWalletModal";
import { DAppSidebar } from "@/components/dapp/DAppSidebar";
import { DappSessionProvider } from "@/components/dapp/session/DappSession";
import { SectionAtmosphere } from "@/components/home/SectionAtmosphere";
import { useState } from "react";

export function DAppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <DappSessionProvider>
      <div className="flex min-h-svh overflow-x-clip bg-[#05060b] text-[#F7F7FA]">
        <aside className="sticky top-0 hidden h-svh w-[248px] shrink-0 border-r border-white/10 lg:block">
          <DAppSidebar />
        </aside>

        {open ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-black/60"
              onClick={() => setOpen(false)}
            />
            <div className="relative h-full w-[min(280px,86vw)] border-r border-white/10">
              <DAppSidebar onNavigate={() => setOpen(false)} />
            </div>
          </div>
        ) : null}

        <div className="relative flex min-w-0 flex-1 flex-col">
          <div className="flex h-12 items-center border-b border-white/10 px-4 lg:hidden">
            <button
              type="button"
              className="rounded-lg border border-white/12 px-3 py-1.5 text-[13px] text-[#C8CBD6]"
              onClick={() => setOpen(true)}
            >
              Menu
            </button>
          </div>
          <div className="relative min-h-0 flex-1">
            <SectionAtmosphere />
            {children}
          </div>
        </div>
      </div>
      <ConnectWalletModal />
      <SignIntentModal />
    </DappSessionProvider>
  );
}
