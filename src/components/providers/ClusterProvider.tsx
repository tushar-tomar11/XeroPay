"use client";

import {
  CLUSTER_STORAGE_KEY,
  RPC_OVERRIDE_STORAGE_KEY,
  envDefaultCluster,
  parseCluster,
  resolveRpcEndpoints,
  type SolanaCluster,
} from "@/lib/wallet/cluster";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type ClusterContextValue = {
  cluster: SolanaCluster;
  envCluster: SolanaCluster;
  rpcOverride: string | null;
  endpoints: string[];
  endpoint: string;
  setCluster: (cluster: SolanaCluster) => void;
  setRpcOverride: (url: string | null) => void;
};

const ClusterContext = createContext<ClusterContextValue | null>(null);

function readStoredCluster(fallback: SolanaCluster): SolanaCluster {
  if (typeof window === "undefined") return fallback;
  return parseCluster(localStorage.getItem(CLUSTER_STORAGE_KEY) ?? fallback);
}

function readStoredRpcOverride(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(RPC_OVERRIDE_STORAGE_KEY);
}

export function ClusterProvider({ children }: { children: ReactNode }) {
  const envCluster = envDefaultCluster();
  const [cluster, setClusterState] = useState<SolanaCluster>(() => readStoredCluster(envCluster));
  const [rpcOverride, setRpcState] = useState<string | null>(() => readStoredRpcOverride());

  const setCluster = useCallback((next: SolanaCluster) => {
    setClusterState(next);
    localStorage.setItem(CLUSTER_STORAGE_KEY, next);
  }, []);

  const setRpcOverride = useCallback((url: string | null) => {
    const trimmed = url?.trim() || null;
    setRpcState(trimmed);
    if (trimmed) localStorage.setItem(RPC_OVERRIDE_STORAGE_KEY, trimmed);
    else localStorage.removeItem(RPC_OVERRIDE_STORAGE_KEY);
  }, []);

  const endpoints = useMemo(() => resolveRpcEndpoints(cluster, rpcOverride), [cluster, rpcOverride]);

  const value = useMemo<ClusterContextValue>(
    () => ({
      cluster,
      envCluster,
      rpcOverride,
      endpoints,
      endpoint: endpoints[0] ?? "",
      setCluster,
      setRpcOverride,
    }),
    [cluster, envCluster, rpcOverride, endpoints, setCluster, setRpcOverride],
  );

  return <ClusterContext.Provider value={value}>{children}</ClusterContext.Provider>;
}

export function useCluster() {
  const ctx = useContext(ClusterContext);
  if (!ctx) throw new Error("useCluster must be used inside ClusterProvider");
  return ctx;
}
