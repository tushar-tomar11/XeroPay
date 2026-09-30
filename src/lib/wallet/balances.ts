import { Connection, PublicKey } from "@solana/web3.js";

export type WalletBalances = {
  sol: number;
  usdc: number;
};

export async function fetchWalletBalances(
  connection: Connection,
  owner: PublicKey,
  usdcMint: PublicKey,
): Promise<WalletBalances> {
  const [lamports, tokenAccounts] = await Promise.all([
    connection.getBalance(owner, "confirmed"),
    connection.getParsedTokenAccountsByOwner(owner, { mint: usdcMint }, "confirmed"),
  ]);

  let usdc = 0;
  for (const { account } of tokenAccounts.value) {
    const data = account.data;
    if (!("parsed" in data)) continue;
    const amount = (data.parsed as { info?: { tokenAmount?: { uiAmount?: number | null } } })?.info
      ?.tokenAmount?.uiAmount;
    if (typeof amount === "number") usdc += amount;
  }

  return { sol: lamports / 1e9, usdc };
}

export async function fetchWalletBalancesWithFallback(
  endpoints: string[],
  owner: PublicKey,
  usdcMint: PublicKey,
): Promise<WalletBalances> {
  let lastError: unknown;
  for (const endpoint of endpoints) {
    try {
      const connection = new Connection(endpoint, "confirmed");
      return await fetchWalletBalances(connection, owner, usdcMint);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError instanceof Error ? lastError : new Error("Could not load balances from RPC");
}

export function formatSol(value: number | null, ready: boolean) {
  if (!ready || value === null) return "—";
  if (value === 0) return "0";
  if (value < 0.0001) return "<0.0001";
  return value.toLocaleString(undefined, { maximumFractionDigits: 4 });
}

export function formatUsdc(value: number | null, ready: boolean) {
  if (!ready || value === null) return "—";
  return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
