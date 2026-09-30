import { isPreview } from "@/lib/preview/flag";
import type { DappStore, VaultName } from "@/lib/preview/types";

export { isPreview };

export const VAULT_NAMES: VaultName[] = ["Spend", "Save", "Invest"];

export function shieldedUsdcPreview(store?: DappStore): number {
  if (!store?.vault) return 0;
  return VAULT_NAMES.reduce((sum, name) => sum + (store.vault[name] ?? 0), 0);
}

export function addToVault(store: DappStore, name: VaultName, amount: number): DappStore {
  return {
    ...store,
    vault: { ...store.vault, [name]: Math.max(0, (store.vault[name] ?? 0) + amount) },
  };
}

export function takeFromVault(store: DappStore, name: VaultName, amount: number): DappStore | null {
  const current = store.vault[name] ?? 0;
  if (amount > current) return null;
  return {
    ...store,
    vault: { ...store.vault, [name]: current - amount },
  };
}
