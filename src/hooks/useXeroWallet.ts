"use client";

import { useCluster } from "@/components/providers/ClusterProvider";
import { fetchWalletBalancesWithFallback } from "@/lib/wallet/balances";
import { usdcMintForCluster } from "@/lib/wallet/cluster";
import { truncateAddress } from "@/lib/wallet/solanaAdapter";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useRef, useState } from "react";

const POLL_MS = 30_000;

export function useXeroWallet() {
  const { publicKey, connecting, disconnect: adapterDisconnect, wallet } = useWallet();
  const { endpoints, cluster } = useCluster();
  const [solBalance, setSolBalance] = useState<number | null>(null);
  const [usdcBalance, setUsdcBalance] = useState<number | null>(null);
  const [balancesLoading, setBalancesLoading] = useState(false);
  const [balancesError, setBalancesError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  const loadedFor = useRef<string | null>(null);

  const address = publicKey?.toBase58() ?? null;
  const mint = usdcMintForCluster(cluster);

  const refresh = useCallback(() => {
    setTick((n) => n + 1);
  }, []);

  useEffect(() => {
    if (!publicKey) {
      loadedFor.current = null;
      setSolBalance(null);
      setUsdcBalance(null);
      setBalancesLoading(false);
      setBalancesError(null);
      return;
    }

    const key = publicKey.toBase58();
    let cancelled = false;
    if (loadedFor.current !== key) {
      setBalancesLoading(true);
    }
    setBalancesError(null);

    void fetchWalletBalancesWithFallback(endpoints, publicKey, mint)
      .then((balances) => {
        if (cancelled) return;
        loadedFor.current = key;
        setSolBalance(balances.sol);
        setUsdcBalance(balances.usdc);
        setBalancesLoading(false);
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        setSolBalance(null);
        setUsdcBalance(null);
        setBalancesLoading(false);
        setBalancesError(error instanceof Error ? error.message : "Could not load balances from RPC");
      });

    return () => {
      cancelled = true;
    };
  }, [publicKey, endpoints, mint, tick]);

  useEffect(() => {
    if (!publicKey) return;
    const timer = window.setInterval(() => setTick((n) => n + 1), POLL_MS);
    return () => window.clearInterval(timer);
  }, [publicKey, endpoints, mint]);

  const balancesReady = Boolean(publicKey) && !balancesLoading && !balancesError && solBalance !== null;

  return {
    publicKey,
    address,
    shortAddress: address ? truncateAddress(address) : null,
    connected: Boolean(publicKey),
    connecting,
    walletName: wallet?.adapter.name ?? null,
    disconnectAdapter: adapterDisconnect,
    solBalance,
    usdcBalance,
    balancesLoading,
    balancesError,
    balancesReady,
    refresh,
    cluster,
  };
}
