import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl, PublicKey } from "@solana/web3.js";

export type SolanaCluster = "mainnet-beta" | "devnet";

export const CLUSTER_STORAGE_KEY = "xeropay.dapp.cluster.v1";
export const RPC_OVERRIDE_STORAGE_KEY = "xeropay.dapp.rpc.v1";

/** Circle USDC — mainnet. */
export const USDC_MINT_MAINNET = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
/** Circle USDC — devnet. */
export const USDC_MINT_DEVNET = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");

export function parseCluster(raw: string | null | undefined): SolanaCluster {
  return raw === "devnet" ? "devnet" : "mainnet-beta";
}

export function envDefaultCluster(): SolanaCluster {
  return parseCluster(process.env.NEXT_PUBLIC_SOLANA_CLUSTER);
}

export function adapterNetwork(cluster: SolanaCluster): WalletAdapterNetwork {
  return cluster === "devnet" ? WalletAdapterNetwork.Devnet : WalletAdapterNetwork.Mainnet;
}

export function usdcMintForCluster(cluster: SolanaCluster): PublicKey {
  return cluster === "devnet" ? USDC_MINT_DEVNET : USDC_MINT_MAINNET;
}

export function explorerClusterPath(cluster: SolanaCluster): string {
  return cluster === "devnet" ? "?cluster=devnet" : "";
}

export function publicClusterUrl(cluster: SolanaCluster): string {
  return clusterApiUrl(cluster === "devnet" ? "devnet" : "mainnet-beta");
}

function splitUrls(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Ordered RPC list. User override first, then env URLs when the active cluster
 * matches NEXT_PUBLIC_SOLANA_CLUSTER, then the public cluster endpoint.
 */
export function resolveRpcEndpoints(cluster: SolanaCluster, override: string | null): string[] {
  const envCluster = envDefaultCluster();
  const list: string[] = [];

  const trimmedOverride = override?.trim();
  if (trimmedOverride) list.push(trimmedOverride);

  if (cluster === envCluster) {
    const primary = process.env.NEXT_PUBLIC_SOLANA_RPC_URL?.trim();
    if (primary) list.push(primary);
    list.push(...splitUrls(process.env.NEXT_PUBLIC_SOLANA_RPC_FALLBACKS));
  }

  list.push(publicClusterUrl(cluster));
  return [...new Set(list)];
}
