"use client";

import { useXeroWallet } from "@/hooks/useXeroWallet";
import { clearWalletLocalData, loadHandle, loadStore, saveHandle, saveStore } from "@/lib/preview/store";
import { emptyStore, previewId, type DappStore, type HistoryKind } from "@/lib/preview/types";
import { truncateAddress } from "@/lib/wallet/solanaAdapter";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type {
  AskMessage,
  Budget,
  Contact,
  DappStore,
  Goal,
  HistoryItem,
  HistoryKind,
  InboxItem,
  PayLink,
  ScheduledItem,
  SplitDraft,
  ViewingKey,
} from "@/lib/preview/types";

type SessionState = {
  connected: boolean;
  address: string | null;
  walletId: string | null;
  handle: string | null;
};

type DappSessionValue = SessionState & {
  ready: boolean;
  store: DappStore;
  truncated: string | null;
  solBalance: number | null;
  usdcBalance: number | null;
  balancesReady: boolean;
  balancesLoading: boolean;
  balancesError: string | null;
  refreshBalances: () => void;
  openConnect: () => void;
  closeConnect: () => void;
  connectOpen: boolean;
  pendingWallet: string | null;
  pendingAddress: string | null;
  confirmSign: () => void;
  cancelSign: () => void;
  signOpen: boolean;
  signLabel: string;
  requestSign: (label: string, onDone?: () => void) => void;
  disconnect: () => void;
  claimHandle: (raw: string) => boolean;
  patchStore: (fn: (prev: DappStore) => DappStore) => void;
  addHistory: (kind: HistoryKind, label: string) => void;
  clearLocalData: () => void;
};

const DappSessionContext = createContext<DappSessionValue | null>(null);

export function DappSessionProvider({ children }: { children: ReactNode }) {
  const {
    address,
    connected,
    walletName,
    shortAddress,
    solBalance,
    usdcBalance,
    balancesReady,
    balancesLoading,
    balancesError,
    refresh,
    disconnectAdapter,
  } = useXeroWallet();
  const { setVisible } = useWalletModal();
  const [ready, setReady] = useState(false);
  const [handle, setHandle] = useState<string | null>(null);
  const [store, setStore] = useState<DappStore>(emptyStore);
  const [hydratedAddress, setHydratedAddress] = useState<string | null>(null);
  const [pendingAddress, setPendingAddress] = useState<string | null>(null);
  const [signOpen, setSignOpen] = useState(false);
  const [signLabel, setSignLabel] = useState("Confirm");
  const [onSignDone, setOnSignDone] = useState<(() => void) | undefined>();

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (!address) {
      setHandle(null);
      setStore(emptyStore);
      setHydratedAddress(null);
      return;
    }
    setHandle(loadHandle(address));
    setStore(loadStore(address));
    setHydratedAddress(address);
  }, [address, ready]);

  useEffect(() => {
    if (!ready || !address || hydratedAddress !== address) return;
    saveStore(address, store);
    saveHandle(address, handle);
  }, [store, handle, address, hydratedAddress, ready]);

  const patchStore = useCallback((fn: (prev: DappStore) => DappStore) => {
    setStore((prev) => fn(prev));
  }, []);

  const addHistory = useCallback((kind: HistoryKind, label: string) => {
    setStore((prev) => ({
      ...prev,
      history: [{ id: previewId(), kind, label, at: Date.now() }, ...prev.history].slice(0, 50),
    }));
  }, []);

  const confirmSign = useCallback(() => {
    onSignDone?.();
    setSignOpen(false);
    setPendingAddress(null);
    setOnSignDone(undefined);
  }, [onSignDone]);

  const cancelSign = useCallback(() => {
    setSignOpen(false);
    setPendingAddress(null);
    setOnSignDone(undefined);
  }, []);

  const requestSign = useCallback(
    (label: string, onDone?: () => void) => {
      setSignLabel(label);
      setPendingAddress(address);
      setOnSignDone(() => onDone);
      setSignOpen(true);
    },
    [address],
  );

  const disconnect = useCallback(() => {
    void disconnectAdapter();
  }, [disconnectAdapter]);

  const clearLocalData = useCallback(() => {
    if (address) clearWalletLocalData(address);
    setHandle(null);
    setStore(emptyStore);
  }, [address]);

  const claimHandle = useCallback((raw: string) => {
    const tag = raw.trim().replace(/^@/, "").toLowerCase().replace(/[^a-z0-9_]/g, "");
    if (tag.length < 3 || tag.length > 20) return false;
    setHandle(`@${tag}`);
    return true;
  }, []);

  const value = useMemo<DappSessionValue>(
    () => ({
      connected,
      address,
      walletId: walletName,
      handle,
      ready,
      store,
      truncated: address ? truncateAddress(address) : shortAddress,
      solBalance,
      usdcBalance,
      balancesReady,
      balancesLoading,
      balancesError,
      refreshBalances: refresh,
      openConnect: () => setVisible(true),
      closeConnect: () => setVisible(false),
      connectOpen: false,
      pendingWallet: walletName,
      pendingAddress,
      confirmSign,
      cancelSign,
      signOpen,
      signLabel,
      requestSign,
      disconnect,
      claimHandle,
      patchStore,
      addHistory,
      clearLocalData,
    }),
    [
      connected,
      address,
      walletName,
      shortAddress,
      solBalance,
      usdcBalance,
      balancesReady,
      balancesLoading,
      balancesError,
      refresh,
      handle,
      ready,
      store,
      setVisible,
      pendingAddress,
      confirmSign,
      cancelSign,
      signOpen,
      signLabel,
      requestSign,
      disconnect,
      claimHandle,
      patchStore,
      addHistory,
      clearLocalData,
    ],
  );

  return <DappSessionContext.Provider value={value}>{children}</DappSessionContext.Provider>;
}

export function useDappSession() {
  const ctx = useContext(DappSessionContext);
  if (!ctx) throw new Error("useDappSession must be used inside DappSessionProvider");
  return ctx;
}

export function newId() {
  return previewId();
}

