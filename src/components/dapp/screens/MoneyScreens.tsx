"use client";

import { Button } from "@/components/common/Button";
import { DappScreen, Field, Panel, inputClass } from "@/components/dapp/DappScreen";
import { EmptyState } from "@/components/dapp/EmptyState";
import { newId, useDappSession } from "@/components/dapp/session/DappSession";
import Link from "next/link";
import { useState } from "react";

const VAULTS = ["Spend", "Save", "Invest"] as const;

export function VaultScreen() {
  const { requestSign, addHistory } = useDappSession();
  const [amount, setAmount] = useState("");
  const [side, setSide] = useState<"shield" | "unshield">("shield");

  return (
    <DappScreen
      title="Vault"
      lede="Labelled buckets of notes. Screening happens at the edge. This preview does not move funds."
    >
      <div className="grid gap-3 sm:grid-cols-3">
        {VAULTS.map((name) => (
          <Panel key={name}>
            <p className="text-[11px] tracking-[0.14em] text-[#9AA6FF] uppercase">{name}</p>
            <p className="mt-2 text-[28px] font-semibold">0.00</p>
            <p className="text-[12px] text-[#6E7280]">USDC notes · empty</p>
          </Panel>
        ))}
      </div>
      <Panel>
        <div className="mb-4 flex gap-2">
          <Button
            variant={side === "shield" ? "primary" : "secondary"}
            className="px-4 py-2 text-[13px]"
            onClick={() => setSide("shield")}
          >
            Shield
          </Button>
          <Button
            variant={side === "unshield" ? "primary" : "secondary"}
            className="px-4 py-2 text-[13px]"
            onClick={() => setSide("unshield")}
          >
            Unshield
          </Button>
        </div>
        <p className="mb-4 text-[13px] leading-relaxed text-[#A6A9B5]">
          {side === "shield"
            ? "Entry is specified after screening. Sanctioned sources are refused before anything is shielded."
            : "Exit is identity-separated from the notes. The happy path is not unshield-to-spend for every purchase."}
        </p>
        <Field label="Amount USDC">
          <input className={inputClass} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
        </Field>
        <Button
          className="mt-4 px-5 py-2.5 text-[14px]"
          onClick={() => {
            if (!amount) return;
            requestSign(`${side === "shield" ? "Shield" : "Unshield"} ${amount} USDC`, () => {
              addHistory(side, `${side === "shield" ? "Shield" : "Unshield"} ${amount} USDC (preview)`);
              setAmount("");
            });
          }}
        >
          Sign preview
        </Button>
      </Panel>
    </DappScreen>
  );
}

export function PortfolioScreen() {
  return (
    <DappScreen title="Portfolio" lede="Positions stay notes. The explorer does not get a bag to scrape.">
      <Panel>
        <EmptyState title="No positions" body="When notes exist they decrypt here. Nothing is live on-chain in this preview." />
      </Panel>
    </DappScreen>
  );
}

export function MarketsScreen() {
  const rows = [
    { name: "Stablecoins", status: "Named when venues are live" },
    { name: "Tokenized stocks", status: "Corporate actions specified; no live book" },
    { name: "SOL", status: "Network asset — no quote in this preview" },
  ];
  return (
    <DappScreen title="Markets" lede="Browse categories only. No live prices in this preview.">
      <Panel>
        <ul className="divide-y divide-white/10">
          {rows.map((r) => (
            <li key={r.name} className="flex items-center justify-between gap-3 py-3">
              <span className="text-[15px] text-[#F7F7FA]">{r.name}</span>
              <span className="text-[13px] text-[#8F93A3]">{r.status}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </DappScreen>
  );
}

export function YieldScreen() {
  const { store, patchStore } = useDappSession();
  return (
    <DappScreen title="Yield" lede="Idle notes are designed to keep working. Rates publish with venues — none are shown here.">
      <Panel>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={store.yieldSweep}
            onChange={(e) => patchStore((s) => ({ ...s, yieldSweep: e.target.checked }))}
            className="mt-1"
          />
          <span>
            <span className="block text-[15px] font-medium text-[#F7F7FA]">Opt-in sweep</span>
            <span className="text-[13px] text-[#A6A9B5]">
              Policy on a vault, not a silent siphon. No APY is published until a venue is named.
            </span>
          </span>
        </label>
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
            patchStore((s) => ({ ...s, goals: [{ id: newId(), name: name.trim(), target }, ...s.goals] }));
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
              <li key={g.id}>
                {g.name}
                {g.target ? ` · ${g.target} USDC` : ""}
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
            patchStore((s) => ({ ...s, budgets: [{ id: newId(), vault, limit }, ...s.budgets] }));
            setLimit("");
          }}
        >
          <select className={inputClass} value={vault} onChange={(e) => setVault(e.target.value)}>
            {VAULTS.map((v) => (
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
                {b.vault} · {b.limit} USDC
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
    <DappScreen title="Bridge" lede="Enter and exit at the edge. Screening stays at the boundary. No live bridge in this preview.">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="From">
            <input className={inputClass} defaultValue="External Solana wallet" readOnly />
          </Field>
          <Field label="To">
            <input className={inputClass} defaultValue="XEROPAY shielded notes" readOnly />
          </Field>
        </div>
        <p className="mt-4 text-[13px] leading-relaxed text-[#A6A9B5]">
          A deposit into the pool is visible as a pool deposit. It is not supposed to show whose
          balance grew. Routes are named when the account is live.
        </p>
        <Button className="mt-4 px-5 py-2.5 text-[14px]" disabled>
          Bridge unavailable
        </Button>
      </Panel>
    </DappScreen>
  );
}

export function HistoryScreen() {
  const { store } = useDappSession();
  return (
    <DappScreen title="History" lede="Decrypt locally. This is not a server-side statement.">
      <Panel>
        {store.history.length === 0 ? (
          <EmptyState title="No local log" body="Preview signatures write rows here." />
        ) : (
          <ul className="divide-y divide-white/10">
            {store.history.map((row) => (
              <li key={row.id} className="flex justify-between gap-3 py-3 text-[14px]">
                <span>
                  <span className="mr-2 text-[11px] tracking-[0.12em] text-[#9AA6FF] uppercase">{row.kind}</span>
                  {row.label}
                </span>
                <span className="shrink-0 text-[12px] text-[#6E7280]">{new Date(row.at).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </DappScreen>
  );
}

export function ReportsScreen() {
  const { store, handle } = useDappSession();
  return (
    <DappScreen title="Reports" lede="Export from a viewing key you issue — scoped, dated, revocable. Generated in this browser.">
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
        <Field label="Daily limit USDC">
          <input
            className={`${inputClass} mt-3 max-w-xs`}
            value={store.cardLimit}
            onChange={(e) => patchStore((s) => ({ ...s, cardLimit: e.target.value }))}
          />
        </Field>
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
