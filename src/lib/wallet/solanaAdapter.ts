/**
 * Solana wallet adapter boundary.
 *
 * TODO: replace `connectWallet` with `@solana/wallet-adapter-react`
 * (Phantom / Solflare / Backpack / Glow) when the account is live.
 * Callers must go through this module — do not persist wallet state ad hoc.
 */

export const SOLANA_WALLETS = [
  { id: "phantom", name: "Phantom", hint: "Browser extension or mobile" },
  { id: "solflare", name: "Solflare", hint: "Browser extension or mobile" },
  { id: "backpack", name: "Backpack", hint: "Browser extension" },
  { id: "glow", name: "Glow", hint: "Browser extension" },
] as const;

export type SolanaWalletId = (typeof SOLANA_WALLETS)[number]["id"];

const PREVIEW_ADDRESSES: Record<SolanaWalletId, string> = {
  phantom: "XpRm8previewPhantom11111111111111111111111",
  solflare: "XpRm8previewSolflare1111111111111111111111",
  backpack: "XpRm8previewBackpack111111111111111111111",
  glow: "XpRm8previewGlow1111111111111111111111111",
};

export async function connectWallet(walletId: SolanaWalletId): Promise<{
  address: string;
  walletId: SolanaWalletId;
}> {
  await new Promise((r) => setTimeout(r, 180));
  return { address: PREVIEW_ADDRESSES[walletId], walletId };
}

export function truncateAddress(address: string) {
  if (address.length < 10) return address;
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}
