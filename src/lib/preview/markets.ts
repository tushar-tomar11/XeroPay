import { isPreview } from "@/lib/preview/flag";
import { fetchUsdPrices } from "@/lib/wallet/prices";
import { USDC_MINT_MAINNET } from "@/lib/wallet/cluster";

export { isPreview };

export type MarketRow = {
  id: string;
  name: string;
  priceUsd: number | null;
  change24h: number | null;
};

const STATIC: Omit<MarketRow, "priceUsd" | "change24h">[] = [
  { id: "SOL", name: "Solana (SOL)" },
  { id: USDC_MINT_MAINNET.toBase58(), name: "USD Coin (USDC)" },
];

export async function fetchMarketRows(): Promise<MarketRow[]> {
  const ids = STATIC.map((s) => s.id);
  const prices = await fetchUsdPrices(ids);
  return STATIC.map((s) => ({
    ...s,
    priceUsd: prices[s.id] ?? null,
    change24h: null,
  }));
}
