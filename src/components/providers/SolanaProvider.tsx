"use client";

import { ClusterProvider, useCluster } from "@/components/providers/ClusterProvider";
import { adapterNetwork } from "@/lib/wallet/cluster";
import { WalletNotReadyError, type WalletError } from "@solana/wallet-adapter-base";
import { BackpackWalletAdapter } from "@solana/wallet-adapter-backpack";
import { CoinbaseWalletAdapter } from "@solana/wallet-adapter-coinbase";
import { XeroWalletModalProvider } from "@/components/providers/XeroWalletModalProvider";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { useCallback, useMemo, type ReactNode } from "react";

import "@solana/wallet-adapter-react-ui/styles.css";

function SolanaWalletTree({ children }: { children: ReactNode }) {
  const { endpoint, cluster } = useCluster();
  const network = adapterNetwork(cluster);

  // Phantom is registered via Wallet Standard; omit PhantomWalletAdapter to avoid duplicate entries/hangs.
  const wallets = useMemo(
    () => [new SolflareWalletAdapter({ network }), new BackpackWalletAdapter(), new CoinbaseWalletAdapter()],
    [network],
  );

  const onError = useCallback((error: WalletError, adapter?: { url: string }) => {
    console.error("[XeroPay wallet]", error);
    if (error instanceof WalletNotReadyError && adapter?.url) {
      window.open(adapter.url, "_blank", "noreferrer");
    }
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect localStorageKey="xeropay.wallet" onError={onError}>
        <XeroWalletModalProvider>{children}</XeroWalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export function SolanaProvider({ children }: { children: ReactNode }) {
  return (
    <ClusterProvider>
      <SolanaWalletTree>{children}</SolanaWalletTree>
    </ClusterProvider>
  );
}
