"use client";

import { Button } from "@/components/common/Button";
import { DAppCardPreview } from "@/components/dapp/DAppCardPreview";
import { DappScreen, Field, Panel, inputClass } from "@/components/dapp/DappScreen";
import { EmptyState } from "@/components/dapp/EmptyState";
import { ErrorState, LoadingSkeleton } from "@/components/dapp/ErrorState";
import { newId, useDappSession } from "@/components/dapp/session/DappSession";
import { ASK_REPLIES } from "@/lib/preview/ask";
import {
  resolveSendDestination,
  sendHistoryLabel,
  sendInboxItem,
  validateSendAmount,
  type SendAsset,
} from "@/lib/preview/send";
import { shieldedUsdcPreview } from "@/lib/preview/vault";
import { formatSol, formatUsdc } from "@/lib/wallet/balances";
import { fetchRecentActivity, type ChainActivity } from "@/lib/wallet/onchain";
import { ReceiveQr } from "@/components/dapp/ui/ReceiveQr";
import { useToast } from "@/components/dapp/ui/Toast";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { computeNextRun, isLinkExpired } from "@/lib/preview/scheduled";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

export function OverviewScreen() {
  const {
    handle,
    truncated,
    store,
    claimHandle,
    solBalance,
    usdcBalance,
    balancesReady,
    balancesError,
    balancesLoading,
    refreshBalances,
    address,
  } = useDappSession();
  const [tag, setTag] = useState("");
  const [error, setError] = useState("");
  const shielded = shieldedUsdcPreview(store);
  const { connection } = useConnection();
  const [chainRows, setChainRows] = useState<ChainActivity[]>([]);

  useEffect(() => {
    if (!address) return;
    let cancelled = false;
    void fetchRecentActivity(connection, new PublicKey(address), 8)
      .then((rows) => {
        if (!cancelled) setChainRows(rows);
      })
      .catch(() => {
        if (!cancelled) setChainRows([]);
      });
    return () => {
      cancelled = true;
    };
  }, [address, connection]);

  return (
    <DappScreen
      badge="onchain"
      title={handle ? handle : "Your account"}
      lede="Public SOL and USDC come from Solana RPC. Shielded notes, sends, and vaults in this build are preview-only."
    >
      {!handle ? (
        <Panel>
          <p className="text-[15px] font-medium text-[#F7F7FA]">Claim a tag</p>
          <p className="mt-1 text-[13px] text-[#A6A9B5]">
            A handle people can remember. Each payment still derives a fresh destination.
          </p>
          <form
            className="mt-4 flex flex-wrap gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const ok = claimHandle(tag);
              setError(ok ? "" : "Use 3–20 letters, numbers, or underscore.");
            }}
          >
            <input
              className={`${inputClass} max-w-xs`}
              placeholder="@you"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <Button type="submit" className="px-5 py-2.5 text-[14px]">
              Claim
            </Button>
          </form>
          {error ? <p className="mt-2 text-[13px] text-[#F0A0A0]">{error}</p> : null}
        </Panel>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel>
          <p className="text-[11px] tracking-[0.16em] text-[#9AA6FF] uppercase">Wallet (on-chain)</p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-[13px] text-[#8F93A3]">SOL</p>
              {balancesLoading ? (
                <LoadingSkeleton className="mt-2 h-8 w-24" />
              ) : (
                <p className="mt-1 text-[28px] font-semibold tracking-[-0.03em] text-[#F7F7FA]">
                  {formatSol(solBalance, balancesReady)}
                </p>
              )}
            </div>
            <div>
              <p className="text-[13px] text-[#8F93A3]">USDC</p>
              {balancesLoading ? (
                <LoadingSkeleton className="mt-2 h-8 w-24" />
              ) : (
                <p className="mt-1 text-[28px] font-semibold tracking-[-0.03em] text-[#F7F7FA]">
                  {formatUsdc(usdcBalance, balancesReady)}
                </p>
              )}
            </div>
          </div>
          {balancesError ? (
            <div className="mt-3">
              <ErrorState title="Could not load balances from RPC." body={balancesError} onRetry={refreshBalances} />
            </div>
          ) : (
            <p className="mt-3 text-[13px] text-[#8F93A3]">Public Solana address · {truncated}</p>
          )}
        </Panel>
        <Panel>
          <p className="text-[11px] tracking-[0.16em] text-[#9AA6FF] uppercase">Shielded balance</p>
          <p className="mt-3 text-[40px] font-semibold tracking-[-0.04em] text-[#F7F7FA]">
            {shielded.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-[13px] text-[#8F93A3]">USDC notes · preview · not on-chain yet</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button href="/dapp/send" className="px-5 py-2.5 text-[14px]">
              Send
            </Button>
            <Button href="/dapp/receive" variant="secondary" className="px-5 py-2.5 text-[14px]">
              Receive
            </Button>
            <Button href="/dapp/vault" variant="secondary" className="px-5 py-2.5 text-[14px]">
              Vault
            </Button>
          </div>
        </Panel>
      </div>
      <div className="min-h-[220px]">
        <DAppCardPreview />
      </div>

      <Panel>
        <p className="text-[15px] font-medium text-[#F7F7FA]">Recent activity</p>
        {store.history.length === 0 && chainRows.length === 0 ? (
          <div className="mt-3">
            <EmptyState title="Nothing decrypted yet" body="On-chain signatures and preview sends land here." />
          </div>
        ) : (
          <ul className="mt-3 divide-y divide-white/10">
            {chainRows.slice(0, 4).map((row) => (
              <li key={row.signature} className="flex justify-between gap-3 py-2.5 text-[14px]">
                <span className="text-[#C8CBD6]">
                  {row.label}
                  <span className="ml-2 text-[11px] text-[#6E7280]">on-chain</span>
                </span>
                <span className="shrink-0 text-[12px] text-[#6E7280]">
                  {row.at ? new Date(row.at).toLocaleString() : "—"}
                </span>
              </li>
            ))}
            {store.history.slice(0, 6).map((row) => (
              <li key={row.id} className="flex justify-between gap-3 py-2.5 text-[14px]">
                <span className="text-[#C8CBD6]">
                  {row.label}
                  <span className="ml-2 text-[11px] text-[#9AA6FF]">preview</span>
                </span>
                <span className="shrink-0 text-[12px] text-[#6E7280]">
                  {new Date(row.at).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
        <Link href="/dapp/history" className="mt-3 inline-block text-[13px] text-[#9AA6FF] hover:text-[#F7F7FA]">
          Full history
        </Link>
      </Panel>
    </DappScreen>
  );
}

export function SendScreen() {
  const { requestSign, patchStore, store, handle, solBalance, usdcBalance, balancesReady } = useDappSession();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [asset, setAsset] = useState<SendAsset>("USDC");
  const [memo, setMemo] = useState("");
  const [formError, setFormError] = useState("");

  return (
    <DappScreen
      title="Send"
      lede="Preview only — nothing broadcasts. Destination must be a valid Solana address or a handle you already know."
    >
      <Panel>
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            const dest = resolveSendDestination(to, store.contacts, handle);
            if (!dest.ok) {
              setFormError(dest.error);
              return;
            }
            const amt = validateSendAmount(asset, amount, solBalance, usdcBalance, balancesReady);
            if (!amt.ok) {
              setFormError(amt.error);
              return;
            }
            setFormError("");
            requestSign(`Send ${amt.amount} ${asset}`, () => {
              const label = sendHistoryLabel(amt.amount, asset, dest.dest, memo);
              const inbox = sendInboxItem(amt.amount, asset, dest.dest, memo);
              patchStore((s) => ({
                ...s,
                history: [{ id: inbox.id, kind: "send" as const, label, at: inbox.at }, ...s.history].slice(0, 50),
                inbox: [{ ...inbox, read: false }, ...s.inbox].slice(0, 50),
              }));
              setTo("");
              setAmount("");
              setMemo("");
            });
          }}
        >
          <Field label="To">
            <input className={inputClass} placeholder="@handle or address" value={to} onChange={(e) => setTo(e.target.value)} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Amount">
              <input className={inputClass} inputMode="decimal" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </Field>
            <Field label="Asset">
              <select className={inputClass} value={asset} onChange={(e) => setAsset(e.target.value as SendAsset)}>
                <option>USDC</option>
                <option>SOL</option>
              </select>
            </Field>
          </div>
          <Field label="Encrypted memo">
            <input className={inputClass} placeholder="For you and a viewing-key holder" value={memo} onChange={(e) => setMemo(e.target.value)} />
          </Field>
          {formError ? <p className="text-[13px] text-[#F0A0A0]">{formError}</p> : null}
          <Button type="submit" className="w-fit px-5 py-2.5 text-[14px]">
            Review and sign
          </Button>
        </form>
      </Panel>
    </DappScreen>
  );
}

function ReceiveScreenContent() {
  const { handle, address, store } = useDappSession();
  const { push } = useToast();
  const params = useSearchParams();
  const receive = address ?? "";

  const request = useMemo(() => {
    const linkId = params.get("link");
    const link = linkId ? store.links.find((l) => l.id === linkId) : undefined;
    const amount = params.get("amount") ?? link?.amount;
    const memo = params.get("memo") ?? link?.memo;
    const disabled = link?.disabled || (link ? isLinkExpired(link.expires) : false);
    return { link, amount, memo, disabled };
  }, [params, store.links]);

  const payUri = useMemo(() => {
    if (!receive) return "";
    const q = new URLSearchParams();
    if (request.amount) q.set("amount", request.amount);
    if (request.memo) q.set("memo", request.memo);
    const query = q.toString();
    return query ? `solana:${receive}?${query}` : `solana:${receive}`;
  }, [receive, request.amount, request.memo]);

  return (
    <DappScreen
      badge="onchain"
      title="Receive"
      lede="Share your Solana address. QR encodes solana: URI when amount or memo is set (payment request)."
    >
      {request.link ? (
        <Panel>
          <p className="text-[13px] text-[#A6A9B5]">
            Payment request · preview link{" "}
            {request.disabled ? <span className="text-[#F0A0A0]">(disabled or expired)</span> : null}
          </p>
          {request.amount ? (
            <p className="mt-2 text-[18px] font-semibold text-[#F7F7FA]">
              {request.amount} USDC {request.memo ? `· ${request.memo}` : ""}
            </p>
          ) : null}
        </Panel>
      ) : null}
      <Panel>
        <p className="text-[11px] tracking-[0.16em] text-[#9AA6FF] uppercase">Handle</p>
        <p className="mt-2 text-[22px] font-semibold">{handle ?? "Claim a tag on Overview first"}</p>
        <p className="mt-4 text-[11px] tracking-[0.16em] text-[#9AA6FF] uppercase">Address</p>
        <p className="mt-2 break-all font-mono text-[13px] text-[#C8CBD6]">{receive || "—"}</p>
        <div className="mt-4">
          <ReceiveQr value={payUri || receive} />
        </div>
        <Button
          className="mt-4 px-5 py-2.5 text-[14px]"
          onClick={() => {
            void navigator.clipboard.writeText(receive);
            push("Address copied");
          }}
        >
          Copy address
        </Button>
        {payUri ? (
          <Button
            variant="secondary"
            className="mt-2 px-5 py-2.5 text-[14px]"
            onClick={() => {
              void navigator.clipboard.writeText(payUri);
              push("Payment URI copied");
            }}
          >
            Copy payment URI
          </Button>
        ) : null}
      </Panel>
    </DappScreen>
  );
}

export function ReceiveScreen() {
  return (
    <Suspense fallback={<div className="relative z-[1] min-h-[30vh]" aria-busy="true" />}>
      <ReceiveScreenContent />
    </Suspense>
  );
}

export function InboxScreen() {
  const { store, patchStore } = useDappSession();
  return (
    <DappScreen title="Inbox" lede="Preview memos from sends you sign in this browser. Mark as read stays local.">
      <Panel>
        {store.inbox.length === 0 ? (
          <EmptyState title="Nothing decrypted yet" body="A preview send writes a row here." />
        ) : (
          <ul className="divide-y divide-white/10">
            {store.inbox.map((item) => (
              <li key={item.id} className="flex items-start justify-between gap-3 py-3">
                <div>
                  <p className="text-[14px] text-[#F7F7FA]">
                    {item.from}
                    {!item.read ? <span className="ml-2 text-[11px] text-[#9AA6FF]">unread</span> : null}
                  </p>
                  <p className="text-[13px] text-[#A6A9B5]">{item.memo}</p>
                </div>
                {!item.read ? (
                  <Button
                    variant="secondary"
                    className="px-3 py-1.5 text-[12px]"
                    onClick={() =>
                      patchStore((s) => ({
                        ...s,
                        inbox: s.inbox.map((x) => (x.id === item.id ? { ...x, read: true } : x)),
                      }))
                    }
                  >
                    Mark read
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

export function ContactsScreen() {
  const { store, patchStore } = useDappSession();
  const { push } = useToast();
  const [handle, setHandle] = useState("");
  const [note, setNote] = useState("");

  const sorted = [...store.contacts].sort((a, b) => Number(Boolean(b.favourite)) - Number(Boolean(a.favourite)));

  return (
    <DappScreen title="Contacts" lede="Handles without publishing a graph of who you know. Stored per wallet in this browser.">
      <Panel>
        <form
          className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
          onSubmit={(e) => {
            e.preventDefault();
            const h = handle.trim();
            if (!h) return;
            patchStore((s) => ({
              ...s,
              contacts: [{ id: newId(), handle: h.startsWith("@") ? h : `@${h}`, note }, ...s.contacts],
            }));
            setHandle("");
            setNote("");
            push("Contact added");
          }}
        >
          <input className={inputClass} placeholder="@handle" value={handle} onChange={(e) => setHandle(e.target.value)} />
          <input className={inputClass} placeholder="Private note" value={note} onChange={(e) => setNote(e.target.value)} />
          <Button type="submit" className="px-5 py-2.5 text-[14px]">
            Add
          </Button>
        </form>
      </Panel>
      <Panel>
        {sorted.length === 0 ? (
          <EmptyState title="No contacts yet" body="Add a handle. It stays in this browser for the connected wallet." />
        ) : (
          <ul className="divide-y divide-white/10">
            {sorted.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-[14px] font-medium text-[#F7F7FA]">
                    {c.favourite ? <span className="mr-1 text-[#9AA6FF]">★</span> : null}
                    {c.handle}
                  </p>
                  {c.note ? <p className="text-[13px] text-[#8F93A3]">{c.note}</p> : null}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="secondary"
                    className="px-3 py-1.5 text-[12px]"
                    onClick={() =>
                      patchStore((s) => ({
                        ...s,
                        contacts: s.contacts.map((x) => (x.id === c.id ? { ...x, favourite: !x.favourite } : x)),
                      }))
                    }
                  >
                    {c.favourite ? "Unfavourite" : "Favourite"}
                  </Button>
                  <Button href={`/dapp/send`} variant="secondary" className="px-3 py-1.5 text-[12px]">
                    Pay
                  </Button>
                  <Button
                    variant="secondary"
                    className="px-3 py-1.5 text-[12px]"
                    onClick={() => patchStore((s) => ({ ...s, contacts: s.contacts.filter((x) => x.id !== c.id) }))}
                  >
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </DappScreen>
  );
}

export function SplitScreen() {
  const { store, patchStore, addHistory, requestSign } = useDappSession();
  const [amount, setAmount] = useState("");
  const [picked, setPicked] = useState<string[]>([]);

  return (
    <DappScreen title="Split" lede="Shared notes, still private. Drafts stay on this device.">
      <Panel>
        <Field label="Amount USDC">
          <input className={inputClass} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
        </Field>
        <p className="mt-4 text-[11px] tracking-[0.14em] text-[#9AA6FF] uppercase">Participants</p>
        {store.contacts.length === 0 ? (
          <p className="mt-2 text-[13px] text-[#8F93A3]">
            Add contacts first.{" "}
            <Link href="/dapp/contacts" className="text-[#9AA6FF]">
              Contacts
            </Link>
          </p>
        ) : (
          <ul className="mt-2 space-y-1">
            {store.contacts.map((c) => (
              <li key={c.id}>
                <label className="flex items-center gap-2 text-[14px] text-[#C8CBD6]">
                  <input
                    type="checkbox"
                    checked={picked.includes(c.handle)}
                    onChange={() =>
                      setPicked((p) => (p.includes(c.handle) ? p.filter((x) => x !== c.handle) : [...p, c.handle]))
                    }
                  />
                  {c.handle}
                </label>
              </li>
            ))}
          </ul>
        )}
        <Button
          className="mt-4 px-5 py-2.5 text-[14px]"
          onClick={() => {
            if (!amount || picked.length === 0) return;
            requestSign(`Split ${amount} USDC`, () => {
              patchStore((s) => ({
                ...s,
                splits: [{ id: newId(), amount, asset: "USDC", participants: picked }, ...s.splits],
              }));
              addHistory("split", `Split ${amount} USDC with ${picked.join(", ")}`);
              setAmount("");
              setPicked([]);
            });
          }}
        >
          Save draft
        </Button>
      </Panel>
      <Panel>
        {store.splits.length === 0 ? (
          <EmptyState title="No splits" body="Local drafts only. Nothing broadcasts." />
        ) : (
          <ul className="space-y-2 text-[14px] text-[#C8CBD6]">
            {store.splits.map((s) => (
              <li key={s.id}>
                {s.amount} {s.asset} · {s.participants.join(", ")}
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </DappScreen>
  );
}

export function LinksScreen() {
  const { store, patchStore, addHistory, requestSign } = useDappSession();
  const { push } = useToast();
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [expires, setExpires] = useState("");

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <DappScreen title="Links" lede="Payment links without a public trail. Preview URLs open Receive with amount and memo prefilled.">
      <Panel>
        <form
          className="grid gap-3 sm:grid-cols-[1fr_1fr_1fr_auto]"
          onSubmit={(e) => {
            e.preventDefault();
            if (!amount.trim()) return;
            requestSign("Create payment link", () => {
              const id = newId();
              patchStore((s) => ({
                ...s,
                links: [
                  {
                    id,
                    amount,
                    asset: "USDC",
                    memo,
                    expires: expires || undefined,
                    disabled: false,
                  },
                  ...s.links,
                ],
              }));
              addHistory("link", `Link for ${amount} USDC`);
              setAmount("");
              setMemo("");
              setExpires("");
              push("Link created");
            });
          }}
        >
          <input className={inputClass} placeholder="Amount USDC" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <input className={inputClass} placeholder="Memo" value={memo} onChange={(e) => setMemo(e.target.value)} />
          <input className={inputClass} type="date" value={expires} onChange={(e) => setExpires(e.target.value)} aria-label="Expires" />
          <Button type="submit" className="px-5 py-2.5 text-[14px]">
            Create
          </Button>
        </form>
      </Panel>
      <Panel>
        {store.links.length === 0 ? (
          <EmptyState title="No links" body="Create a request. The URL is a preview path on this site." />
        ) : (
          <ul className="divide-y divide-white/10">
            {store.links.map((l) => {
              const path = `/dapp/receive?link=${l.id}`;
              const expired = isLinkExpired(l.expires);
              const inactive = l.disabled || expired;
              return (
                <li key={l.id} className="flex flex-col gap-2 py-3 text-[14px] sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[#F7F7FA]">
                      {l.amount} {l.asset}
                      {l.memo ? ` · ${l.memo}` : ""}
                      {inactive ? <span className="ml-2 text-[12px] text-[#F0A0A0]">inactive</span> : null}
                    </p>
                    <p className="font-mono text-[12px] text-[#8F93A3]">{path}</p>
                    {l.expires ? <p className="text-[12px] text-[#6E7280]">Expires {l.expires}</p> : null}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="secondary"
                      className="px-3 py-1.5 text-[12px]"
                      onClick={() => {
                        void navigator.clipboard.writeText(`${origin}${path}`);
                        push("Link copied");
                      }}
                    >
                      Copy
                    </Button>
                    <Button
                      variant="secondary"
                      className="px-3 py-1.5 text-[12px]"
                      onClick={() =>
                        patchStore((s) => ({
                          ...s,
                          links: s.links.map((x) => (x.id === l.id ? { ...x, disabled: !x.disabled } : x)),
                        }))
                      }
                    >
                      {l.disabled ? "Enable" : "Disable"}
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Panel>
    </DappScreen>
  );
}

export function ScheduledScreen() {
  const { store, patchStore, addHistory } = useDappSession();
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [cadence, setCadence] = useState("Monthly");

  return (
    <DappScreen
      title="Scheduled"
      lede="Recurring rent and retainers without a repeating on-chain cadence. Preview schedules stay local."
    >
      <Panel>
        <form
          className="grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!destination || !amount) return;
            patchStore((s) => ({
              ...s,
              scheduled: [
                {
                  id: newId(),
                  destination,
                  amount,
                  cadence,
                  paused: false,
                  nextRun: computeNextRun(cadence),
                },
                ...s.scheduled,
              ],
            }));
            addHistory("scheduled", `${cadence} ${amount} USDC to ${destination}`);
            setDestination("");
            setAmount("");
          }}
        >
          <Field label="Destination">
            <input className={inputClass} value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="@handle" />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Amount USDC">
              <input className={inputClass} value={amount} onChange={(e) => setAmount(e.target.value)} />
            </Field>
            <Field label="Cadence">
              <select className={inputClass} value={cadence} onChange={(e) => setCadence(e.target.value)}>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Quarterly</option>
              </select>
            </Field>
          </div>
          <Button type="submit" className="w-fit px-5 py-2.5 text-[14px]">
            Save schedule
          </Button>
        </form>
      </Panel>
      <Panel>
        {store.scheduled.length === 0 ? (
          <EmptyState title="Nothing scheduled" body="Cadence is policy on notes — not a public standing order." />
        ) : (
          <ul className="divide-y divide-white/10">
            {store.scheduled.map((s) => (
              <li key={s.id} className="flex flex-col gap-2 py-3 text-[14px] text-[#C8CBD6] sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[#F7F7FA]">
                    {s.cadence} · {s.amount} USDC → {s.destination}
                    {s.paused ? <span className="ml-2 text-[12px] text-[#F0A0A0]">paused</span> : null}
                  </p>
                  <p className="text-[12px] text-[#6E7280]">Next preview run: {s.nextRun ?? "—"}</p>
                </div>
                <Button
                  variant="secondary"
                  className="px-3 py-1.5 text-[12px]"
                  onClick={() =>
                    patchStore((st) => ({
                      ...st,
                      scheduled: st.scheduled.map((x) => (x.id === s.id ? { ...x, paused: !x.paused } : x)),
                    }))
                  }
                >
                  {s.paused ? "Resume" : "Pause"}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </DappScreen>
  );
}

export function AskScreen() {
  const { store, patchStore } = useDappSession();
  const [text, setText] = useState("");

  return (
    <DappScreen title="Ask Xero" lede="Scripted helper — not a live model. Replies are canned docs copy stored in this browser.">
      <Panel className="min-h-[280px]">
        {store.askMessages.length === 0 ? (
          <EmptyState title="Ask about the account" body="This is a scripted helper. No API key, no invented rates." />
        ) : (
          <ul className="space-y-3">
            {store.askMessages.map((m) => (
              <li
                key={m.id}
                className={`max-w-[90%] rounded-2xl px-3 py-2 text-[14px] ${
                  m.role === "user" ? "ml-auto bg-[#4F7CFF]/20 text-[#F7F7FA]" : "bg-white/[0.04] text-[#C8CBD6]"
                }`}
              >
                {m.text}
              </li>
            ))}
          </ul>
        )}
        <form
          className="mt-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!text.trim()) return;
            const reply = ASK_REPLIES[store.askMessages.length % ASK_REPLIES.length];
            patchStore((s) => ({
              ...s,
              askMessages: [
                ...s.askMessages,
                { id: newId(), role: "user", text: text.trim() },
                { id: newId(), role: "xero", text: reply },
              ],
            }));
            setText("");
          }}
        >
          <input className={inputClass} value={text} onChange={(e) => setText(e.target.value)} placeholder="How do viewing keys work?" />
          <Button type="submit" className="shrink-0 px-5 py-2.5 text-[14px]">
            Send
          </Button>
        </form>
      </Panel>
    </DappScreen>
  );
}

export function InviteScreen() {
  const { handle, address } = useDappSession();
  const { push } = useToast();
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const url =
    address && origin
      ? `${origin}/dapp/invite?ref=${encodeURIComponent(address)}${handle ? `&handle=${encodeURIComponent(handle)}` : ""}`
      : "/dapp/invite";

  return (
    <DappScreen title="Invite" lede="Referral links include your wallet address. Handle is optional context only.">
      <Panel>
        <p className="text-[15px] text-[#C8CBD6]">
          {handle ? `Invite people to pay ${handle}.` : "Claim a tag on Overview for a friendlier link."}
        </p>
        <p className="mt-3 break-all font-mono text-[13px] text-[#8F93A3]">{url}</p>
        <Button
          className="mt-4 px-5 py-2.5 text-[14px]"
          onClick={() => {
            void navigator.clipboard.writeText(url);
            push("Invite link copied");
          }}
        >
          Copy invite
        </Button>
      </Panel>
    </DappScreen>
  );
}
