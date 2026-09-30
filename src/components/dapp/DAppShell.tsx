"use client";

import { DappShellChrome } from "@/components/dapp/DappShellChrome";
import { DappSessionProvider } from "@/components/dapp/session/DappSession";

export function DAppShell({ children }: { children: React.ReactNode }) {
  return (
    <DappSessionProvider>
      <DappShellChrome>{children}</DappShellChrome>
    </DappSessionProvider>
  );
}
