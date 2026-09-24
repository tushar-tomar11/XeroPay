"use client";

import { Button } from "@/components/common/Button";
import { DappScreen, Field, Panel, inputClass } from "@/components/dapp/DappScreen";
import { EmptyState } from "@/components/dapp/EmptyState";
import { newId, useDappSession } from "@/components/dapp/session/DappSession";
import { useState } from "react";

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
    <DappScreen title="Privacy" lede="What the account is built never to see — and what stays on your device.">
      <Panel>
        <ul className="space-y-3 text-[14px] leading-relaxed text-[#C8CBD6]">
          <li>Notes decrypt in the browser with your spending key.</li>
          <li>XEROPAY is not designed to store positions or memos as a server-side source of truth.</li>
          <li>Screening is specified at the pool edge, not as a standing view of your life.</li>
          <li>Viewing keys are issued by you, scoped, dated, and revocable.</li>
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
    ["Notes", "0"],
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
  return (
    <DappScreen title="Network" lede="Solana by design. RPCs and explorers are named when the account is live.">
      <Panel>
        <dl className="grid gap-3 text-[14px]">
          <div className="flex justify-between gap-3">
            <dt className="text-[#8F93A3]">Chain</dt>
            <dd className="text-[#F7F7FA]">Solana</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-[#8F93A3]">RPC</dt>
            <dd className="text-[#F7F7FA]">Not named yet</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-[#8F93A3]">Explorer</dt>
            <dd className="text-[#F7F7FA]">Not named yet</dd>
          </div>
        </dl>
      </Panel>
    </DappScreen>
  );
}

export function SettingsScreen() {
  const { handle, truncated, disconnect, claimHandle } = useDappSession();
  const [tag, setTag] = useState("");
  return (
    <DappScreen title="Settings" lede="Keys and devices stay yours. In preview, nothing leaves this browser.">
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
        <p className="mt-4 text-[13px] text-[#8F93A3]">Devices</p>
        <p className="mt-1 text-[14px] text-[#C8CBD6]">This browser · preview session</p>
        <Button variant="secondary" className="mt-6 px-5 py-2.5 text-[14px]" onClick={disconnect}>
          Disconnect
        </Button>
      </Panel>
    </DappScreen>
  );
}
