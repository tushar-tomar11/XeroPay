"use client";

import { Button } from "@/components/common/Button";
import { DAppCardPreview } from "@/components/dapp/DAppCardPreview";
import { DappScreen, Field, Panel, inputClass } from "@/components/dapp/DappScreen";
import { EmptyState } from "@/components/dapp/EmptyState";
import { newId, useDappSession } from "@/components/dapp/session/DappSession";
import Link from "next/link";
import { useState } from "react";

export function OverviewScreen() {
  const { handle, truncated, store, claimHandle } = useDappSession();
  const [tag, setTag] = useState("");
  const [error, setError] = useState("");

  return (
    <DappScreen
      title={handle ? handle : "Your account"}
      lede="Encrypted notes on Solana. The explorer does not get a running balance. This preview decrypts only on this device."
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

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Panel>
          <p className="text-[11px] tracking-[0.16em] text-[#9AA6FF] uppercase">Shielded balance</p>
          <p className="mt-3 text-[40px] font-semibold tracking-[-0.04em] text-[#F7F7FA]">0.00</p>
          <p className="text-[13px] text-[#8F93A3]">USDC notes · preview · {truncated}</p>
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
        <div className="min-h-[220px]">
          <DAppCardPreview />
        </div>
      </div>

      <Panel>
        <p className="text-[15px] font-medium text-[#F7F7FA]">Recent activity</p>
        {store.history.length === 0 ? (
          <div className="mt-3">
            <EmptyState title="Nothing decrypted yet" body="Sends, shields, and links you sign in preview land here." />
          </div>
        ) : (
          <ul className="mt-3 divide-y divide-white/10">
            {store.history.slice(0, 6).map((row) => (
              <li key={row.id} className="flex justify-between gap-3 py-2.5 text-[14px]">
                <span className="text-[#C8CBD6]">{row.label}</span>
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
  const { requestSign, addHistory } = useDappSession();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [asset, setAsset] = useState("USDC");
  const [memo, setMemo] = useState("");

  return (
    <DappScreen
      title="Send"
      lede="Pay a handle or address. The destination is meant to be one-time so a shared name never becomes a scrapeable balance."
    >
      <Panel>
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!to.trim() || !amount.trim()) return;
            requestSign(`Send ${amount} ${asset}`, () => {
              addHistory("send", `Sent ${amount} ${asset} to ${to.trim()} · ${memo || "no memo"}`);
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
              <select className={inputClass} value={asset} onChange={(e) => setAsset(e.target.value)}>
                <option>USDC</option>
                <option>SOL</option>
              </select>
            </Field>
          </div>
          <Field label="Encrypted memo">
            <input className={inputClass} placeholder="For you and a viewing-key holder" value={memo} onChange={(e) => setMemo(e.target.value)} />
          </Field>
          <Button type="submit" className="w-fit px-5 py-2.5 text-[14px]">
            Review and sign
          </Button>
        </form>
      </Panel>
    </DappScreen>
  );
}

export function ReceiveScreen() {
  const { handle, address } = useDappSession();
  const receive = address ?? "";
  const [copied, setCopied] = useState(false);

  return (
    <DappScreen
      title="Receive"
      lede="Share a handle. Each payment can still land at a fresh destination. Publishing the name does not publish the total."
    >
      <Panel>
        <p className="text-[11px] tracking-[0.16em] text-[#9AA6FF] uppercase">Handle</p>
        <p className="mt-2 text-[22px] font-semibold">{handle ?? "Claim a tag on Overview first"}</p>
        <p className="mt-4 text-[11px] tracking-[0.16em] text-[#9AA6FF] uppercase">Preview receive string</p>
        <p className="mt-2 break-all font-mono text-[13px] text-[#C8CBD6]">{receive}</p>
        <div className="mt-4 flex h-36 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
          <div
            className="grid h-24 w-24 grid-cols-5 gap-0.5"
            aria-hidden
            style={{
              backgroundImage: `repeating-linear-gradient(90deg,#9AA6FF 0 4px,transparent 4px 8px)`,
            }}
          />
        </div>
        <p className="mt-2 text-center text-[12px] text-[#6E7280]">QR is a preview glyph — not a live invoice.</p>
        <Button
          className="mt-4 px-5 py-2.5 text-[14px]"
          onClick={() => {
            void navigator.clipboard.writeText(handle ?? receive);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          }}
        >
          {copied ? "Copied" : "Copy"}
        </Button>
      </Panel>
    </DappScreen>
  );
}

export function InboxScreen() {
  const { store } = useDappSession();
  return (
    <DappScreen title="Inbox" lede="Messages stay with the account — not a public memo field.">
      <Panel>
        {store.inbox.length === 0 ? (
          <EmptyState title="Nothing decrypted yet" body="Incoming notes and memos appear here after you can open them locally." />
        ) : (
          <ul className="divide-y divide-white/10">
            {store.inbox.map((item) => (
              <li key={item.id} className="py-3">
                <p className="text-[14px] text-[#F7F7FA]">{item.from}</p>
                <p className="text-[13px] text-[#A6A9B5]">{item.memo}</p>
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
  const [handle, setHandle] = useState("");
  const [note, setNote] = useState("");

  return (
    <DappScreen title="Contacts" lede="Handles without publishing a graph of who you know.">
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
        {store.contacts.length === 0 ? (
          <EmptyState title="No contacts yet" body="Add a handle. It stays in this browser session." />
        ) : (
          <ul className="divide-y divide-white/10">
            {store.contacts.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-[14px] font-medium text-[#F7F7FA]">{c.handle}</p>
                  {c.note ? <p className="text-[13px] text-[#8F93A3]">{c.note}</p> : null}
                </div>
                <Button href={`/dapp/send`} variant="secondary" className="px-4 py-2 text-[13px]">
                  Pay
                </Button>
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
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");

  return (
    <DappScreen title="Links" lede="Payment links without a public trail. Arrival is meant to shield without publishing the amount.">
      <Panel>
        <form
          className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
          onSubmit={(e) => {
            e.preventDefault();
            if (!amount.trim()) return;
            requestSign("Create payment link", () => {
              const id = newId();
              patchStore((s) => ({
                ...s,
                links: [{ id, amount, asset: "USDC", memo }, ...s.links],
              }));
              addHistory("link", `Link for ${amount} USDC`);
              setAmount("");
              setMemo("");
            });
          }}
        >
          <input className={inputClass} placeholder="Amount USDC" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <input className={inputClass} placeholder="Memo" value={memo} onChange={(e) => setMemo(e.target.value)} />
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
            {store.links.map((l) => (
              <li key={l.id} className="py-3 text-[14px]">
                <p className="text-[#F7F7FA]">
                  {l.amount} {l.asset}
                  {l.memo ? ` · ${l.memo}` : ""}
                </p>
                <p className="font-mono text-[12px] text-[#8F93A3]">/dapp/receive?link={l.id}</p>
              </li>
            ))}
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
              scheduled: [{ id: newId(), destination, amount, cadence }, ...s.scheduled],
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
          <ul className="space-y-2 text-[14px] text-[#C8CBD6]">
            {store.scheduled.map((s) => (
              <li key={s.id}>
                {s.cadence} · {s.amount} USDC → {s.destination}
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </DappScreen>
  );
}

const ASK_REPLIES = [
  "Notes decrypt in this browser. XEROPAY is not supposed to be the source of your positions.",
  "Shielding is specified at the pool edge, after screening. This preview does not move funds.",
  "A viewing key is read-only, scoped, and revocable. Issue one from Disclose.",
];

export function AskScreen() {
  const { store, patchStore } = useDappSession();
  const [text, setText] = useState("");

  return (
    <DappScreen title="Ask Xero" lede="Account help after you connect. Nothing decrypts without your key.">
      <Panel className="min-h-[280px]">
        {store.askMessages.length === 0 ? (
          <EmptyState title="Ask about the account" body="Answers stay on-docs. No invented rates or live rails." />
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
  const { handle } = useDappSession();
  const url = typeof window !== "undefined" ? `${window.location.origin}/dapp/invite` : "/dapp/invite";
  const [copied, setCopied] = useState(false);

  return (
    <DappScreen title="Invite" lede="Share a handle, not a running balance.">
      <Panel>
        <p className="text-[15px] text-[#C8CBD6]">
          {handle ? `Invite people to pay ${handle}.` : "Claim a tag on Overview, then share it."}
        </p>
        <p className="mt-3 break-all font-mono text-[13px] text-[#8F93A3]">{url}</p>
        <Button
          className="mt-4 px-5 py-2.5 text-[14px]"
          onClick={() => {
            void navigator.clipboard.writeText(handle ? `${handle} · ${url}` : url);
            setCopied(true);
          }}
        >
          {copied ? "Copied" : "Copy invite"}
        </Button>
      </Panel>
    </DappScreen>
  );
}
