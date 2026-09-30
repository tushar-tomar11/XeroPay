import { emptyStore, emptyVault, type DappStore } from "@/lib/preview/types";

const STORE_PREFIX = "xeropay.dapp.store.v2:";
const HANDLE_PREFIX = "xeropay.dapp.handle.v2:";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function loadStore(address: string): DappStore {
  const partial = readJson<Partial<DappStore>>(`${STORE_PREFIX}${address}`, {});
  return {
    ...emptyStore,
    ...partial,
    vault: { ...emptyVault, ...partial.vault },
  };
}

export function saveStore(address: string, store: DappStore) {
  if (typeof window === "undefined") return;
  localStorage.setItem(`${STORE_PREFIX}${address}`, JSON.stringify(store));
}

export function loadHandle(address: string): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(`${HANDLE_PREFIX}${address}`);
}

export function saveHandle(address: string, handle: string | null) {
  if (typeof window === "undefined") return;
  const key = `${HANDLE_PREFIX}${address}`;
  if (handle) localStorage.setItem(key, handle);
  else localStorage.removeItem(key);
}

export function clearWalletLocalData(address: string) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(`${STORE_PREFIX}${address}`);
  localStorage.removeItem(`${HANDLE_PREFIX}${address}`);
}
