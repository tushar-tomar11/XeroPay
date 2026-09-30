"use client";

import { XeroWalletModal } from "@/components/dapp/XeroWalletModal";
import { WalletModalContext } from "@solana/wallet-adapter-react-ui";
import { useMemo, useState, type ReactNode } from "react";

/** Same as WalletModalProvider but renders XeroWalletModal (select + connect on click). */
export function XeroWalletModalProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const value = useMemo(() => ({ visible, setVisible }), [visible]);

  return (
    <WalletModalContext.Provider value={value}>
      {children}
      <XeroWalletModal />
    </WalletModalContext.Provider>
  );
}
