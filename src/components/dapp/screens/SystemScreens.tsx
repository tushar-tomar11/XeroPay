"use client";

import { Button } from "@/components/common/Button";
import { DappScreen, Field, Panel, inputClass } from "@/components/dapp/DappScreen";
import { EmptyState } from "@/components/dapp/EmptyState";
import { newId, useDappSession } from "@/components/dapp/session/DappSession";
import { useCluster } from "@/components/providers/ClusterProvider";
import { shieldedUsdcPreview } from "@/lib/preview/vault";
import type { SolanaCluster } from "@/lib/wallet/cluster";
import { fetchNetworkHealth } from "@/lib/wallet/onchain";
import { useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

export function PayrollScreen() {
  const { store, patchStore, requestSign, addHistory } = useDappSession();
  const [csv, setCsv] = useState(store.payrollPreview);

  return (
    <DappScreen
      title="Payroll"
      lede="Batch payouts from a private treasury. Recipients see their line, not the roster. Preview only — nothing broadcasts."
    >
      <Panel>
        <p className="text-[13px] leading-relaxed text-[#A6A9B5]">
          Who can initiate a run is separate from who can approve it. Large runs wait for a second
          operator. Encode that before a live batch exists.
        </p>
        <Field label="CSV roster">
          <textarea
            className={`${inputClass} mt-0 min-h-32 font-mono text-[13px]`}
            placeholder={"handle,amount\n@alex,2400\n@sam,1800"}
            value={csv}
            onChange={(e) => setCsv(e.target.value)}
          />
        </Field>
        <Button
          className="mt-4 px-5 py-2.5 text-[14px]"
          onClick={() => {
            patchStore((s) => ({ ...s, payrollPreview: csv }));
            requestSign("Preview payroll batch", () => {
              addHistory("payroll", `Payroll preview · ${csv.split("\n").filter(Boolean).length} lines`);
            });
          }}
        >
          Preview batch
        </Button>
      </Panel>
    </DappScreen>
  );
}

export function DiscloseScreen() {
  const { store, patchStore } = useDappSession();
  const [vault, setVault] = useState("Spend");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [lastSecret, setLastSecret] = useState<string | null>(null);

  return (
    <DappScreen title="Disclose" lede="Viewing keys you issue, scope, and revoke. No master key.">
      <Panel>
        <form
          className="grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            const secret = `vk_preview_${newId()}`;
            setLastSecret(secret);
            patchStore((s) => ({
              ...s,
              viewingKeys: [
                { id: newId(), vault, from, to, secret, revoked: false },
                ...s.viewingKeys,
              ],
            }));
          }}
        >
          <Field label="Vault">
            <select className={inputClass} value={vault} onChange={(e) => setVault(e.target.value)}>
              <option>Spend</option>
              <option>Save</option>
              <option>Invest</option>
            </select>
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="From">
              <input className={inputClass} type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
            </Field>
            <Field label="To">
              <input className={inputClass} type="date" value={to} onChange={(e) => setTo(e.target.value)} />
            </Field>
          </div>
          <Button type="submit" className="w-fit px-5 py-2.5 text-[14px]">
            Issue key
          </Button>
        </form>
        {lastSecret ? (
          <p className="mt-3 break-all font-mono text-[12px] text-[#C8CBD6]">Shown once: {lastSecret}</p>
        ) : null}
      </Panel>
      <Panel>
        {store.viewingKeys.length === 0 ? (
          <EmptyState title="No keys issued" body="Scope a vault and a date range." />
        ) : (
          <ul className="divide-y divide-white/10">
            {store.viewingKeys.map((k) => (
              <li key={k.id} className="flex items-center justify-between gap-3 py-3 text-[14px]">
                <span className="text-[#C8CBD6]">
                  {k.vault}
                  {k.from ? ` · ${k.from}` : ""}
                  {k.to ? ` → ${k.to}` : ""}
                  {k.revoked ? " · revoked" : ""}
                </span>
                {!k.revoked ? (
                  <Button
                    variant="secondary"
                    className="px-3 py-1.5 text-[12px]"
                    onClick={() =>
                      patchStore((s) => ({
                        ...s,
                        viewingKeys: s.viewingKeys.map((x) => (x.id === k.id ? { ...x, revoked: true } : x)),
                      }))
                    }
                  >
                    Revoke
                  </Button>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </DappScreen>
  );
}

export function PrivacyScreen() {
  return (
    <DappScreen title="Privacy" lede="What this build actually does — not the full product spec.">
      <Panel>
        <ul className="space-y-3 text-[14px] leading-relaxed text-[#C8CBD6]">
          <li>Your connected wallet address and SOL/USDC balances are public on Solana. This app reads them via RPC.</li>
          <li>There is no live shielding, viewing-key protocol, or encrypted notes on-chain in this build.</li>
          <li>Handles, sends, vaults, and inbox rows are stored in this browser, keyed to your wallet. They are labelled Preview.</li>
          <li>Disconnect does not delete that local preview data, so the same wallet can restore it. A different wallet loads a different slice.</li>
        </ul>
      </Panel>
    </DappScreen>
  );
}

export function NumbersScreen() {
  const { store, handle } = useDappSession();
  const stats = [
    ["Handle", handle ?? "—"],
    ["Contacts", String(store.contacts.length)],
    ["Links", String(store.links.length)],
    ["History rows", String(store.history.length)],
    ["Viewing keys", String(store.viewingKeys.length)],
    ["Notes (preview)", shieldedUsdcPreview(store).toFixed(2)],
  ];
  return (
    <DappScreen title="Numbers" lede="Workspace stats after you connect. Nothing decrypts from a server.">
      <div className="grid gap-3 sm:grid-cols-3">
        {stats.map(([k, v]) => (
          <Panel key={k}>
            <p className="text-[11px] tracking-[0.14em] text-[#9AA6FF] uppercase">{k}</p>
            <p className="mt-2 text-[22px] font-semibold text-[#F7F7FA]">{v}</p>
          </Panel>
        ))}
      </div>
    </DappScreen>
  );
}

export function NetworkScreen() {
  const { cluster, endpoint } = useCluster();
  const { connection } = useConnection();
  const { solBalance } = useDappSession();
  const [health, setHealth] = useState<Awaited<ReturnType<typeof fetchNetworkHealth>> | null>(null);

  useEffect(() => {
    let cancelled = false;
    void fetchNetworkHealth(connection, endpoint).then((h) => {
      if (!cancelled) setHealth(h);
    });
    return () => {
      cancelled = true;
    };
  }, [connection, endpoint]);

  const lowSol = solBalance !== null && solBalance < 0.01;

  return (
    <DappScreen title="Network" lede="Wallet RPC is Solana. Shielded notes are still preview-only." badge="onchain">
      <Panel>
        <dl className="grid gap-3 text-[14px]">
          <div className="flex justify-between gap-3">
            <dt className="text-[#8F93A3]">Cluster</dt>
            <dd className="text-[#F7F7FA]">{cluster}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-[#8F93A3]">RPC</dt>
            <dd className="max-w-[60%] break-all text-right text-[#F7F7FA]">{endpoint}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-[#8F93A3]">Slot</dt>
            <dd className="text-[#F7F7FA]">{health?.slot ?? "—"}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-[#8F93A3]">Latency</dt>
            <dd className="text-[#F7F7FA]">{health ? `${health.latencyMs} ms` : "—"}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-[#8F93A3]">TPS (sample)</dt>
            <dd className="text-[#F7F7FA]">{health?.tps ? health.tps.toFixed(1) : "—"}</dd>
          </div>
        </dl>
        {lowSol ? (
          <p className="mt-4 text-[13px] text-[#F0A0A0]">Low SOL for fees — fund this wallet before sending on-chain later.</p>
        ) : null}
      </Panel>
    </DappScreen>
  );
}

export function SettingsScreen() {
  const { handle, truncated, disconnect, claimHandle, clearLocalData } = useDappSession();
  const { cluster, setCluster, rpcOverride, setRpcOverride, envCluster } = useCluster();
  const [tag, setTag] = useState("");
  const [rpcDraft, setRpcDraft] = useState(rpcOverride ?? "");
  useEffect(() => {
    setRpcDraft(rpcOverride ?? "");
  }, [rpcOverride]);
  return (
    <DappScreen title="Settings" lede="Cluster and RPC persist in this browser. Preview data is keyed to the connected wallet." badge="onchain">
      <Panel>
        <p className="text-[13px] text-[#8F93A3]">Wallet</p>
        <p className="mt-1 font-mono text-[14px] text-[#F7F7FA]">{truncated}</p>
        <p className="mt-4 text-[13px] text-[#8F93A3]">Handle</p>
        <p className="mt-1 text-[15px]">{handle ?? "None claimed"}</p>
        <form
          className="mt-3 flex flex-wrap gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            claimHandle(tag);
            setTag("");
          }}
        >
          <input className={`${inputClass} max-w-xs`} placeholder="@newtag" value={tag} onChange={(e) => setTag(e.target.value)} />
          <Button type="submit" className="px-5 py-2.5 text-[14px]">
            Update tag
          </Button>
        </form>
        <p className="mt-6 text-[13px] text-[#8F93A3]">Cluster</p>
        <p className="mt-1 text-[12px] text-[#6E7280]">Env default is {envCluster}. Switching reloads RPC (devnet uses the Circle USDC mint for that cluster).</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {(["mainnet-beta", "devnet"] as SolanaCluster[]).map((c) => (
            <Button
              key={c}
              variant={cluster === c ? "primary" : "secondary"}
              className="px-4 py-2 text-[13px]"
              onClick={() => setCluster(c)}
            >
              {c}
            </Button>
          ))}
        </div>
        <p className="mt-6 text-[13px] text-[#8F93A3]">RPC override</p>
        <form
          className="mt-2 flex flex-wrap gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            setRpcOverride(rpcDraft);
          }}
        >
          <input
            className={`${inputClass} max-w-md`}
            placeholder="https://… (Helius or other)"
            value={rpcDraft}
            onChange={(e) => setRpcDraft(e.target.value)}
          />
          <Button type="submit" className="px-5 py-2.5 text-[14px]">
            Save RPC
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="px-5 py-2.5 text-[14px]"
            onClick={() => {
              setRpcDraft("");
              setRpcOverride(null);
            }}
          >
            Clear
          </Button>
        </form>
        <p className="mt-6 text-[13px] text-[#8F93A3]">Devices</p>
        <p className="mt-1 text-[14px] text-[#C8CBD6]">This browser · preview session</p>
        <Button variant="secondary" className="mt-6 px-5 py-2.5 text-[14px]" onClick={clearLocalData}>
          Clear local preview data
        </Button>
        <Button variant="secondary" className="mt-3 px-5 py-2.5 text-[14px]" onClick={disconnect}>
          Disconnect
        </Button>
      </Panel>
    </DappScreen>
  );
}
