import { Connection, PublicKey, type ParsedTransactionWithMeta } from "@solana/web3.js";

const TOKEN_PROGRAM = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");

export type ChainActivity = {
  signature: string;
  at: number | null;
  label: string;
  kind: "sent" | "received" | "swap" | "unknown";
  err: boolean;
};

export type SplHolding = {
  mint: string;
  amount: number;
  decimals: number;
  symbol: string;
};

export function classifyTx(owner: string, tx: ParsedTransactionWithMeta | null): Omit<ChainActivity, "signature" | "at" | "err"> {
  if (!tx) return { label: "Unknown", kind: "unknown" };
  const log = tx.meta?.logMessages?.join(" ") ?? "";
  if (/swap|jupiter|raydium|orca/i.test(log)) return { label: "Swap", kind: "swap" };
  const keys = tx.transaction.message.accountKeys.map((k) =>
    typeof k === "string" ? k : k.pubkey.toBase58(),
  );
  const pre = tx.meta?.preBalances[0] ?? 0;
  const post = tx.meta?.postBalances[0] ?? 0;
  const feePayer = keys[0];
  if (feePayer === owner && post < pre) return { label: "Sent SOL", kind: "sent" };
  if (post > pre) return { label: "Received SOL", kind: "received" };
  return { label: "Transaction", kind: "unknown" };
}

export async function fetchRecentActivity(
  connection: Connection,
  owner: PublicKey,
  limit = 12,
): Promise<ChainActivity[]> {
  const sigs = await connection.getSignaturesForAddress(owner, { limit });
  const out: ChainActivity[] = [];
  for (const sig of sigs) {
    let parsed: ParsedTransactionWithMeta | null = null;
    try {
      parsed = await connection.getParsedTransaction(sig.signature, {
        maxSupportedTransactionVersion: 0,
      });
    } catch {
      parsed = null;
    }
    const cls = classifyTx(owner.toBase58(), parsed);
    out.push({
      signature: sig.signature,
      at: sig.blockTime ? sig.blockTime * 1000 : null,
      err: Boolean(sig.err),
      ...cls,
    });
  }
  return out;
}

export async function fetchSplHoldings(connection: Connection, owner: PublicKey): Promise<SplHolding[]> {
  const res = await connection.getParsedTokenAccountsByOwner(owner, { programId: TOKEN_PROGRAM });
  const rows: SplHolding[] = [];
  for (const { account } of res.value) {
    const data = account.data;
    if (!("parsed" in data)) continue;
    const info = data.parsed as {
      info?: { mint?: string; tokenAmount?: { uiAmount?: number | null; decimals?: number } };
    };
    const amount = info.info?.tokenAmount?.uiAmount;
    const mint = info.info?.mint;
    if (!mint || typeof amount !== "number" || amount <= 0) continue;
    rows.push({
      mint,
      amount,
      decimals: info.info?.tokenAmount?.decimals ?? 0,
      symbol: mint.slice(0, 4),
    });
  }
  return rows;
}

export async function fetchNetworkHealth(connection: Connection, endpoint: string) {
  const t0 = performance.now();
  let slot = 0;
  try {
    slot = await connection.getSlot("confirmed");
  } catch {
    slot = 0;
  }
  const latencyMs = Math.round(performance.now() - t0);
  let tps = 0;
  try {
    const samples = await connection.getRecentPerformanceSamples(3);
    if (samples[0]?.numTransactions && samples[0].samplePeriodSecs) {
      tps = samples[0].numTransactions / samples[0].samplePeriodSecs;
    }
  } catch {
    tps = 0;
  }
  return { slot, latencyMs, tps, endpoint };
}

export function solscanTx(signature: string, cluster: string) {
  const q = cluster === "devnet" ? "?cluster=devnet" : "";
  return `https://solscan.io/tx/${signature}${q}`;
}

export function solscanAddress(address: string, cluster: string) {
  const q = cluster === "devnet" ? "?cluster=devnet" : "";
  return `https://solscan.io/account/${address}${q}`;
}
