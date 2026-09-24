"use client";

import { connectWallet, type SolanaWalletId, truncateAddress } from "@/lib/wallet/solanaAdapter";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const SESSION_KEY = "xeropay.dapp.session.v1";
const STORE_KEY = "xeropay.dapp.store.v1";

export type HistoryKind = "send" | "shield" | "unshield" | "link" | "payroll" | "split" | "scheduled";

export type HistoryItem = { id: string; kind: HistoryKind; label: string; at: number };
export type Contact = { id: string; handle: string; note: string };
export type PayLink = { id: string; amount: string; asset: string; memo: string };
export type SplitDraft = { id: string; amount: string; asset: string; participants: string[] };
export type ScheduledItem = { id: string; destination: string; amount: string; cadence: string };
export type Goal = { id: string; name: string; target: string };
export type Budget = { id: string; vault: string; limit: string };
export type ViewingKey = {
  id: string;
  vault: string;
  from: string;
  to: string;
  secret?: string;
  revoked: boolean;
};
export type AskMessage = { id: string; role: "user" | "xero"; text: string };
export type InboxItem = { id: string; from: string; memo: string; at: number };

export type DappStore = {
  contacts: Contact[];
  links: PayLink[];
  splits: SplitDraft[];
  scheduled: ScheduledItem[];
  history: HistoryItem[];
  goals: Goal[];
  budgets: Budget[];
  viewingKeys: ViewingKey[];
  askMessages: AskMessage[];
  inbox: InboxItem[];
  yieldSweep: boolean;
  cardFrozen: boolean;
  cardLimit: string;
  payrollPreview: string;
};

const emptyStore: DappStore = {
  contacts: [],
  links: [],
  splits: [],
  scheduled: [],
  history: [],
  goals: [],
  budgets: [],
  viewingKeys: [],
  askMessages: [],
  inbox: [],
  yieldSweep: false,
  cardFrozen: false,
  cardLimit: "250",
  payrollPreview: "",
};

type SessionState = {
  connected: boolean;
  address: string | null;
  walletId: SolanaWalletId | null;
  handle: string | null;
};

type DappSessionValue = SessionState & {
  ready: boolean;
  store: DappStore;
  truncated: string | null;
  openConnect: () => void;
  closeConnect: () => void;
  connectOpen: boolean;
  pendingWallet: SolanaWalletId | null;
  pendingAddress: string | null;
  selectWallet: (id: SolanaWalletId) => Promise<void>;
  confirmSign: () => void;
  cancelSign: () => void;
  signOpen: boolean;
  signLabel: string;
  requestSign: (label: string, onDone?: () => void) => void;
  disconnect: () => void;
  claimHandle: (raw: string) => boolean;
  patchStore: (fn: (prev: DappStore) => DappStore) => void;
  addHistory: (kind: HistoryKind, label: string) => void;
};

const DappSessionContext = createContext<DappSessionValue | null>(null);

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function DappSessionProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<SessionState>({
    connected: false,
    address: null,
    walletId: null,
    handle: null,
  });
  const [store, setStore] = useState<DappStore>(emptyStore);
  const [connectOpen, setConnectOpen] = useState(false);
  const [pendingWallet, setPendingWallet] = useState<SolanaWalletId | null>(null);
  const [pendingAddress, setPendingAddress] = useState<string | null>(null);
  const [signOpen, setSignOpen] = useState(false);
  const [signLabel, setSignLabel] = useState("Open account — no gas");
  const [onSignDone, setOnSignDone] = useState<(() => void) | undefined>();

  useEffect(() => {
    const saved = readJson<SessionState | null>(SESSION_KEY, null);
    const savedStore = readJson<DappStore>(STORE_KEY, emptyStore);
    if (saved?.connected && saved.address) setSession(saved);
    setStore({ ...emptyStore, ...savedStore });
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }, [session, ready]);

  useEffect(() => {
    if (!ready) return;
    sessionStorage.setItem(STORE_KEY, JSON.stringify(store));
  }, [store, ready]);

  const patchStore = useCallback((fn: (prev: DappStore) => DappStore) => {
    setStore((prev) => fn(prev));
  }, []);

  const addHistory = useCallback((kind: HistoryKind, label: string) => {
    setStore((prev) => ({
      ...prev,
      history: [{ id: uid(), kind, label, at: Date.now() }, ...prev.history].slice(0, 50),
    }));
  }, []);

  const selectWallet = useCallback(async (id: SolanaWalletId) => {
    const result = await connectWallet(id);
    setPendingWallet(result.walletId);
    setPendingAddress(result.address);
    setSignLabel("Open account — no gas");
    setOnSignDone(undefined);
    setSignOpen(true);
  }, []);

  const confirmSign = useCallback(() => {
    if (pendingAddress && pendingWallet && signLabel.startsWith("Open account")) {
      setSession((s) => ({
        ...s,
        connected: true,
        address: pendingAddress,
        walletId: pendingWallet,
      }));
      setConnectOpen(false);
    }
    onSignDone?.();
    setSignOpen(false);
    setPendingAddress(null);
    setPendingWallet(null);
    setOnSignDone(undefined);
  }, [pendingAddress, pendingWallet, signLabel, onSignDone]);

  const cancelSign = useCallback(() => {
    setSignOpen(false);
    setPendingAddress(null);
    setPendingWallet(null);
    setOnSignDone(undefined);
  }, []);

  const requestSign = useCallback((label: string, onDone?: () => void) => {
    setSignLabel(label);
    setOnSignDone(() => onDone);
    setSignOpen(true);
  }, []);

  const disconnect = useCallback(() => {
    setSession({ connected: false, address: null, walletId: null, handle: null });
    setStore(emptyStore);
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(STORE_KEY);
  }, []);

  const claimHandle = useCallback((raw: string) => {
    const tag = raw.trim().replace(/^@/, "").toLowerCase().replace(/[^a-z0-9_]/g, "");
    if (tag.length < 3 || tag.length > 20) return false;
    setSession((s) => ({ ...s, handle: `@${tag}` }));
    return true;
  }, []);

  const value = useMemo<DappSessionValue>(
    () => ({
      ...session,
      ready,
      store,
      truncated: session.address ? truncateAddress(session.address) : null,
      openConnect: () => setConnectOpen(true),
      closeConnect: () => {
        setConnectOpen(false);
        setSignOpen(false);
        setPendingAddress(null);
        setPendingWallet(null);
      },
      connectOpen,
      pendingWallet,
      pendingAddress,
      selectWallet,
      confirmSign,
      cancelSign,
      signOpen,
      signLabel,
      requestSign,
      disconnect,
      claimHandle,
      patchStore,
      addHistory,
    }),
    [
      session,
      ready,
      store,
      connectOpen,
      pendingWallet,
      pendingAddress,
      selectWallet,
      confirmSign,
      cancelSign,
      signOpen,
      signLabel,
      requestSign,
      disconnect,
      claimHandle,
      patchStore,
      addHistory,
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
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
