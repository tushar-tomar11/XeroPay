import { PublicKey } from "@solana/web3.js";
import { isPreview } from "@/lib/preview/flag";
import { previewId, type Contact } from "@/lib/preview/types";

export { isPreview };

export const MIN_SOL = 0.000001;
export const MIN_USDC = 0.01;

export type SendAsset = "USDC" | "SOL";

export function parseAmount(raw: string): number | null {
  const n = Number(raw.trim());
  if (!Number.isFinite(n)) return null;
  return n;
}

export function isValidSolanaAddress(value: string): boolean {
  try {
    // Accept any well-formed pubkey (including program-derived addresses).
    new PublicKey(value.trim());
    return true;
  } catch {
    return false;
  }
}

export function normalizeHandle(raw: string): string {
  const tag = raw.trim().replace(/^@/, "").toLowerCase();
  return tag ? `@${tag}` : "";
}

export function resolveSendDestination(
  raw: string,
  contacts: Contact[],
  ownHandle: string | null,
): { ok: true; dest: string } | { ok: false; error: string } {
  const trimmed = raw.trim();
  if (!trimmed) return { ok: false, error: "Enter a Solana address or @handle." };
  if (trimmed.startsWith("@") || (!trimmed.includes("1") && trimmed.length < 32)) {
    const handle = normalizeHandle(trimmed);
    if (handle.length < 4) return { ok: false, error: "Handle is too short." };
    const known =
      (ownHandle && ownHandle.toLowerCase() === handle) ||
      contacts.some((c) => c.handle.toLowerCase() === handle);
    if (!known) return { ok: false, error: "Unknown handle. Use a contact or a Solana address." };
    return { ok: true, dest: handle };
  }
  if (!isValidSolanaAddress(trimmed)) return { ok: false, error: "That is not a valid Solana address." };
  return { ok: true, dest: trimmed };
}

export function validateSendAmount(
  asset: SendAsset,
  amountRaw: string,
  solBalance: number | null,
  usdcBalance: number | null,
  balancesOk: boolean,
): { ok: true; amount: number } | { ok: false; error: string } {
  const amount = parseAmount(amountRaw);
  if (amount === null) return { ok: false, error: "Enter a numeric amount." };
  const min = asset === "SOL" ? MIN_SOL : MIN_USDC;
  if (amount < min) return { ok: false, error: `Minimum is ${min} ${asset}.` };
  if (!balancesOk || solBalance === null || usdcBalance === null) {
    return { ok: false, error: "Wait for wallet balances before sending." };
  }
  const available = asset === "SOL" ? solBalance : usdcBalance;
  if (amount > available) return { ok: false, error: `Amount exceeds your ${asset} balance.` };
  return { ok: true, amount };
}

export function sendHistoryLabel(amount: number, asset: SendAsset, dest: string, memo: string) {
  return `Sent ${amount} ${asset} to ${dest} · ${memo || "no memo"}`;
}

export function sendInboxItem(amount: number, asset: SendAsset, dest: string, memo: string) {
  return {
    id: previewId(),
    from: "You",
    memo: `Preview send ${amount} ${asset} → ${dest}${memo ? ` · ${memo}` : ""}`,
    at: Date.now(),
  };
}
