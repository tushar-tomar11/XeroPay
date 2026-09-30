const SOL_MINT = "So11111111111111111111111111111111111111112";

export async function fetchUsdPrices(ids: string[]): Promise<Record<string, number>> {
  const unique = [...new Set(ids.filter(Boolean))];
  if (unique.length === 0) return {};
  try {
    const mapped = unique.map((id) => (id === "SOL" ? SOL_MINT : id));
    const url = `https://lite-api.jup.ag/price/v2?ids=${mapped.join(",")}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("price http");
    const json = (await res.json()) as { data?: Record<string, { price?: string } | null> };
    const out: Record<string, number> = {};
    unique.forEach((orig, i) => {
      const key = mapped[i];
      const n = Number(json.data?.[key]?.price);
      if (Number.isFinite(n)) out[orig] = n;
    });
    return out;
  } catch {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=solana,usd-coin&vs_currencies=usd",
      );
      if (!res.ok) return {};
      const json = (await res.json()) as Record<string, { usd?: number }>;
      const out: Record<string, number> = {};
      if (json.solana?.usd) out.SOL = json.solana.usd;
      if (json["usd-coin"]?.usd) {
        unique.forEach((id) => {
          if (id !== "SOL") out[id] = json["usd-coin"]!.usd!;
        });
      }
      return out;
    } catch {
      return {};
    }
  }
}
