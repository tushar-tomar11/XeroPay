"use client";

import { Button } from "@/components/common/Button";
import { DappScreen, Field, Panel, inputClass } from "@/components/dapp/DappScreen";
import { EmptyState } from "@/components/dapp/EmptyState";
import { LoadingSkeleton } from "@/components/dapp/ErrorState";
import { DataTable, StatCard } from "@/components/dapp/ui/primitives";
import { newId, useDappSession } from "@/components/dapp/session/DappSession";
import { formatDateTime, formatTokenAmount, formatUsd } from "@/lib/format";
import { fetchMarketRows, type MarketRow } from "@/lib/preview/markets";
import { shieldedUsdcPreview, VAULT_NAMES, addToVault, takeFromVault } from "@/lib/preview/vault";
import type { VaultName } from "@/lib/preview/types";
import { formatSol } from "@/lib/wallet/balances";
import { USDC_MINT_MAINNET } from "@/lib/wallet/cluster";
import {
  fetchRecentActivity,
  fetchSplHoldings,
  solscanTx,
  type ChainActivity,
} from "@/lib/wallet/onchain";
import { fetchUsdPrices } from "@/lib/wallet/prices";
import { useCluster } from "@/components/providers/ClusterProvider";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export function VaultScreen() {
  const { requestSign, addHistory, store, patchStore, usdcBalance, balancesReady } = useDappSession();
  const [amount, setAmount] = useState("");
  const [side, setSide] = useState<"shield" | "unshield">("shield");
  const [bucket, setBucket] = useState<VaultName>("Spend");

  return (
    <DappScreen title="Vault" lede="Preview shielded USDC buckets. Nothing moves on-chain in this build.">
      <div className="grid gap-3 sm:grid-cols-3">
        {VAULT_NAMES.map((name) => (
          <Panel key={name}>
            <p className="text-[11px] tracking-[0.14em] text-[#9AA6FF] uppercase">{name}</p>
            <p className="mt-2 text-[28px] font-semibold">
              {(store.vault[name] ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-[12px] text-[#6E7280]">USDC notes · preview</p>
          </Panel>
        ))}
      </div>
      <Panel>
        <div className="mb-4 flex gap-2">
          <Button variant={side === "shield" ? "primary" : "secondary"} className="px-4 py-2 text-[13px]" onClick={() => setSide("shield")}>
            Shield
          </Button>
          <Button variant={side === "unshield" ? "primary" : "secondary"} className="px-4 py-2 text-[13px]" onClick={() => setSide("unshield")}>
            Unshield
          </Button>
        </div>
        <Field label="Vault bucket">
          <select className={inputClass} value={bucket} onChange={(e) => setBucket(e.target.value as VaultName)}>
            {VAULT_NAMES.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </Field>
        <Field label="Amount USDC">
          <input className={inputClass} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
        </Field>
        <Button
          className="mt-4 px-5 py-2.5 text-[14px]"
          onClick={() => {
            const n = Number(amount);
            if (!Number.isFinite(n) || n <= 0) return;
            if (side === "shield" && (!balancesReady || (usdcBalance ?? 0) < n)) return;
            requestSign(`${side === "shield" ? "Shield" : "Unshield"} ${n} USDC`, () => {
              patchStore((s) => {
                if (side === "shield") return addToVault(s, bucket, n);
                const next = takeFromVault(s, bucket, n);
                return next ?? s;
              });
              addHistory(side, `${side === "shield" ? "Shield" : "Unshield"} ${n} USDC → ${bucket} (preview)`);
              setAmount("");
            });
          }}
        >
          Sign preview
        </Button>
        <p className="mt-3 text-[12px] text-[#6E7280]">
          Total shielded preview: {shieldedUsdcPreview(store).toFixed(2)} USDC
        </p>
      </Panel>
    </DappScreen>
  );
}

export function PortfolioScreen() {
  const { address, solBalance, usdcBalance, balancesReady, store } = useDappSession();
  const { connection } = useConnection();
  const [spl, setSpl] = useState<Awaited<ReturnType<typeof fetchSplHoldings>>>([]);
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!address) return;
    let cancelled = false;
    setLoading(true);
    void fetchSplHoldings(connection, new PublicKey(address))
      .then(async (rows) => {
        if (cancelled) return;
        setSpl(rows);
        const ids = ["SOL", ...rows.map((r) => r.mint)];
        setPrices(await fetchUsdPrices(ids));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [address, connection]);

  const rows = useMemo(() => {
    const list: { symbol: string; amount: number; usd: number | null }[] = [];
    if (balancesReady && solBalance !== null) {
      list.push({ symbol: "SOL", amount: solBalance, usd: prices.SOL ? solBalance * prices.SOL : null });
    }
    if (balancesReady && usdcBalance !== null) {
      const p = prices[USDC_MINT_MAINNET.toBase58()] ?? prices.SOL;
      list.push({ symbol: "USDC", amount: usdcBalance, usd: p ? usdcBalance * p : null });
    }
    for (const t of spl) {
      const p = prices[t.mint];
      list.push({ symbol: t.symbol, amount: t.amount, usd: p ? t.amount * p : null });
    }
    const preview = shieldedUsdcPreview(store);
    if (preview > 0) list.push({ symbol: "Shielded (preview)", amount: preview, usd: null });
    return list;
  }, [balancesReady, solBalance, usdcBalance, spl, prices, store]);

  const totalUsd = rows.reduce((sum, r) => sum + (r.usd ?? 0), 0);

  return (
    <DappScreen title="Portfolio" lede="On-chain SOL/SPL from RPC. Shielded line is preview-only." badge="onchain">
      <div className="grid gap-3 sm:grid-cols-2">
        <StatCard label="Total (priced assets)" value={formatUsd(totalUsd || null)} hint="Missing prices show as —" />
        <StatCard label="Wallet SOL" value={formatSol(solBalance, balancesReady)} />
      </div>
      <Panel>
        {loading ? (
          <LoadingSkeleton className="h-24 w-full" />
        ) : (
          <DataTable
            columns={["Asset", "Amount", "USD"]}
            rows={rows.map((r) => [r.symbol, formatTokenAmount(r.amount), formatUsd(r.usd)])}
            empty={<EmptyState title="No holdings" body="Connect a funded wallet or shield preview USDC in Vault." />}
          />
        )}
      </Panel>
    </DappScreen>
  );
}

export function MarketsScreen() {
  const { store, patchStore } = useDappSession();
  const [rows, setRows] = useState<MarketRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void fetchMarketRows()
      .then((r) => {
        if (!cancelled) setRows(r);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <DappScreen title="Markets" lede="Live quotes when APIs respond. Illustrative — not a trading venue.">
      <Panel>
        {loading ? (
          <LoadingSkeleton className="h-20 w-full" />
        ) : (
          <ul className="divide-y divide-white/10">
            {rows.map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-3 py-3">
                <span className="text-[15px] text-[#F7F7FA]">{r.name}</span>
                <span className="text-[13px] text-[#C8CBD6]">{r.priceUsd ? formatUsd(r.priceUsd) : "—"}</span>
                <Button
                  variant="secondary"
                  className="px-3 py-1.5 text-[12px]"
                  onClick={() =>
                    patchStore((s) => ({
                      ...s,
                      watchlist: s.watchlist.includes(r.id) ? s.watchlist.filter((x) => x !== r.id) : [...s.watchlist, r.id],
                    }))
                  }
                >
                  {store.watchlist.includes(r.id) ? "Watching" : "Watch"}
                </Button>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-[12px] text-[#6E7280]">24h change unavailable in preview.</p>
      </Panel>
    </DappScreen>
  );
}

export function YieldScreen() {
  const { store, patchStore } = useDappSession();
  const [deposit, setDeposit] = useState("");
  return (
    <DappScreen title="Yield" lede="Illustrative APY only — preview simulation, not a live venue.">
      <Panel>
        <p className="text-[13px] text-[#A6A9B5]">Illustrative APY: 4.2% (not live)</p>
        <StatCard label="Preview deposit" value={`${store.yieldDeposit.toFixed(2)} USDC`} />
        <StatCard label="Earned (simulated)" value={`${store.yieldEarned.toFixed(2)} USDC`} />
        <label className="mt-4 flex items-start gap-3">
          <input
            type="checkbox"
            checked={store.yieldSweep}
            onChange={(e) => patchStore((s) => ({ ...s, yieldSweep: e.target.checked }))}
            className="mt-1"
          />
          <span>
            <span className="block text-[15px] font-medium text-[#F7F7FA]">Opt-in sweep</span>
            <span className="text-[13px] text-[#A6A9B5]">Policy on a vault, not a silent siphon.</span>
          </span>
        </label>
        <Field label="Simulate deposit USDC">
          <input className={inputClass} value={deposit} onChange={(e) => setDeposit(e.target.value)} placeholder="0.00" />
        </Field>
        <Button
          className="mt-3 px-5 py-2.5 text-[14px]"
          onClick={() => {
            const n = Number(deposit);
            if (!Number.isFinite(n) || n <= 0) return;
            patchStore((s) => ({
              ...s,
              yieldDeposit: s.yieldDeposit + n,
              yieldEarned: s.yieldEarned + n * 0.042 * 0.083,
            }));
            setDeposit("");
          }}
        >
          Add to simulation
        </Button>
      </Panel>
    </DappScreen>
  );
}

export function GoalsScreen() {
  const { store, patchStore } = useDappSession();
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  return (
    <DappScreen title="Goals" lede="Labelled vaults you control. Nobody else reads the split.">
      <Panel>
        <form
          className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
          onSubmit={(e) => {
            e.preventDefault();
            if (!name.trim()) return;
            patchStore((s) => ({
              ...s,
              goals: [{ id: newId(), name: name.trim(), target, contributed: "0" }, ...s.goals],
            }));
            setName("");
            setTarget("");
          }}
        >
          <input className={inputClass} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className={inputClass} placeholder="Target USDC" value={target} onChange={(e) => setTarget(e.target.value)} />
          <Button type="submit" className="px-5 py-2.5 text-[14px]">
            Add
          </Button>
        </form>
      </Panel>
      <Panel>
        {store.goals.length === 0 ? (
          <EmptyState title="No goals" body="Targets stay in this session." />
        ) : (
          <ul className="space-y-2 text-[14px] text-[#C8CBD6]">
            {store.goals.map((g) => (
              <li key={g.id} className="flex items-center justify-between gap-2">
                <span>
                  {g.name}
                  {g.target ? ` · ${g.contributed || "0"}/${g.target} USDC` : ""}
                </span>
                <Button
                  variant="secondary"
                  className="px-3 py-1.5 text-[12px]"
                  onClick={() =>
                    patchStore((s) => ({
                      ...s,
                      goals: s.goals.map((x) =>
                        x.id === g.id ? { ...x, contributed: String(Number(x.contributed || 0) + 10) } : x,
                      ),
                    }))
                  }
                >
                  +10 preview
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </DappScreen>
  );
}

export function BudgetsScreen() {
  const { store, patchStore } = useDappSession();
  const [vault, setVault] = useState("Spend");
  const [limit, setLimit] = useState("");
  return (
    <DappScreen title="Budgets" lede="Limits on notes — not a public spreadsheet.">
      <Panel>
        <form
          className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
          onSubmit={(e) => {
            e.preventDefault();
            if (!limit.trim()) return;
            patchStore((s) => ({
              ...s,
              budgets: [{ id: newId(), vault, limit, spent: "0" }, ...s.budgets],
            }));
            setLimit("");
          }}
        >
          <select className={inputClass} value={vault} onChange={(e) => setVault(e.target.value)}>
            {VAULT_NAMES.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
          <input className={inputClass} placeholder="Limit USDC" value={limit} onChange={(e) => setLimit(e.target.value)} />
          <Button type="submit" className="px-5 py-2.5 text-[14px]">
            Add
          </Button>
        </form>
      </Panel>
      <Panel>
        {store.budgets.length === 0 ? (
          <EmptyState title="No budgets" body="Attach a limit to Spend, Save, or Invest." />
        ) : (
          <ul className="space-y-2 text-[14px] text-[#C8CBD6]">
            {store.budgets.map((b) => (
              <li key={b.id}>
                {b.vault} · {b.spent}/{b.limit} USDC
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </DappScreen>
  );
}

export function BridgeScreen() {
  return (
    <DappScreen
      title="Bridge"
      lede="There is no live bridge in this build. Move public SOL/USDC with Receive, or use Vault for preview shielding."
    >
      <Panel>
        <p className="text-[14px] leading-relaxed text-[#C8CBD6]">
          This route was removed from navigation. Use Receive to share your Solana address, or Vault to try the
          labelled preview shield flow.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button href="/dapp/receive" className="px-5 py-2.5 text-[14px]">
            Receive
          </Button>
          <Button href="/dapp/vault" variant="secondary" className="px-5 py-2.5 text-[14px]">
            Vault
          </Button>
        </div>
      </Panel>
    </DappScreen>
  );
}

export function HistoryScreen() {
  const { store, address } = useDappSession();
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const [chain, setChain] = useState<ChainActivity[]>([]);

  useEffect(() => {
    if (!address) return;
    void fetchRecentActivity(connection, new PublicKey(address), 20).then(setChain);
  }, [address, connection]);

  return (
    <DappScreen title="History" lede="On-chain signatures from RPC plus preview rows from this browser." badge="onchain">
      <Panel>
        <DataTable
          columns={["Type", "Detail", "Time"]}
          rows={[
            ...chain.map((c) => [
              "on-chain",
              <a key={c.signature} href={solscanTx(c.signature, cluster)} className="text-[#9AA6FF] hover:underline" target="_blank" rel="noreferrer">
                {c.label}
              </a>,
              c.at ? formatDateTime(c.at) : "—",
            ]),
            ...store.history.map((row) => [
              `preview · ${row.kind}`,
              row.label,
              formatDateTime(row.at),
            ]),
          ]}
          empty={<EmptyState title="No history" body="Connect a wallet or run a preview action." />}
        />
      </Panel>
    </DappScreen>
  );
}

export function ReportsScreen() {
  const { store, handle } = useDappSession();
  const previewTotal = store.history.length;
  const sends = store.history.filter((h) => h.kind === "send").length;
  const shielded = shieldedUsdcPreview(store);

  return (
    <DappScreen title="Reports" lede="Export from a viewing key you issue — scoped, dated, revocable. Generated in this browser.">
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <StatCard label="Preview events" value={String(previewTotal)} hint="Local history rows" />
        <StatCard label="Preview sends" value={String(sends)} hint="Not on-chain" />
        <StatCard label="Shielded USDC" value={shielded.toFixed(2)} hint="Vault preview total" />
      </div>
      <Panel>
        <p className="text-[13px] text-[#A6A9B5]">
          {store.viewingKeys.filter((k) => !k.revoked).length} active preview keys.{" "}
          <Link href="/dapp/disclose" className="text-[#9AA6FF]">
            Disclose
          </Link>
        </p>
        <Button
          className="mt-4 px-5 py-2.5 text-[14px]"
          onClick={() => {
            const lines = [
              "kind,label,at",
              ...store.history.map((h) => `${h.kind},"${h.label.replace(/"/g, "")}",${new Date(h.at).toISOString()}`),
            ];
            const blob = new Blob([`handle,${handle ?? ""}\n${lines.join("\n")}`], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "xeropay-preview-report.csv";
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          Download CSV
        </Button>
      </Panel>
    </DappScreen>
  );
}

export function CardScreen() {
  const { store, patchStore } = useDappSession();
  return (
    <DappScreen
      title="Card"
      lede="Spend from notes you control. Limits, freeze, and a kill switch. No card network is named as live."
    >
      <Panel>
        <p className="text-[13px] leading-relaxed text-[#A6A9B5]">
          Visa, Mastercard, and bank partners are not listed as issued. When underwriting is real,
          names will appear with the same preview honesty as the rest of this app.
        </p>
        <Field label="Daily limit USDC (preview default)">
          <input
            className={`${inputClass} mt-3 max-w-xs`}
            value={store.cardLimit}
            onChange={(e) => patchStore((s) => ({ ...s, cardLimit: e.target.value }))}
          />
        </Field>
        <p className="mt-2 text-[12px] text-[#6E7280]">Preview only — not an issued card limit.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            variant={store.cardFrozen ? "primary" : "secondary"}
            className="px-5 py-2.5 text-[14px]"
            onClick={() => patchStore((s) => ({ ...s, cardFrozen: !s.cardFrozen }))}
          >
            {store.cardFrozen ? "Frozen" : "Freeze"}
          </Button>
          <Button
            variant="secondary"
            className="px-5 py-2.5 text-[14px]"
            onClick={() => patchStore((s) => ({ ...s, cardFrozen: true, cardLimit: "0" }))}
          >
            Kill switch
          </Button>
          <Button
            variant="secondary"
            className="px-5 py-2.5 text-[14px]"
            onClick={() => patchStore((s) => ({ ...s, cardWaitlist: true }))}
          >
            {store.cardWaitlist ? "On waitlist" : "Request access"}
          </Button>
        </div>
      </Panel>
    </DappScreen>
  );
}

export function XeroTokenScreen() {
  return (
    <DappScreen title="$XERO" lede="Intended utility when the token is live. No contract on this site yet.">
      <Panel>
        <p className="text-[15px] leading-relaxed text-[#C8CBD6]">
          Tiers and fee discounts are specified in docs. This screen does not invent a price or an
          address.
        </p>
        <Link href="/docs/xero" className="mt-4 inline-block text-[14px] text-[#9AA6FF] hover:text-[#F7F7FA]">
          Token notes
        </Link>
      </Panel>
    </DappScreen>
  );
}
