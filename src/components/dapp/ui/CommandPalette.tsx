"use client";

import { useDappSession } from "@/components/dapp/session/DappSession";
import { dappNav } from "@/config/navConfig";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function matches(q: string, text: string) {
  return text.toLowerCase().includes(q);
}

export function CommandPalette({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const { store } = useDappSession();
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    const nav = dappNav.flatMap((g) =>
      g.items
        .filter((i) => !query || matches(query, i.label) || matches(query, i.href))
        .map((i) => ({ type: "Route" as const, label: i.label, href: i.href })),
    );
    const contacts = store.contacts
      .filter((c) => !query || matches(query, c.handle) || matches(query, c.note))
      .map((c) => ({ type: "Contact" as const, label: c.handle, href: "/dapp/contacts" }));
    const history = store.history
      .filter((h) => !query || matches(query, h.label))
      .slice(0, 8)
      .map((h) => ({ type: "History" as const, label: h.label, href: "/dapp/history" }));
    return [...nav, ...contacts, ...history].slice(0, 20);
  }, [q, store.contacts, store.history]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center px-4 pt-[12vh]">
      <button type="button" aria-label="Close search" className="absolute inset-0 bg-black/65" onClick={onClose} />
      <div className="relative z-[1] w-full max-w-lg rounded-3xl border border-white/12 bg-[#0B0E1A] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search routes, contacts, history"
          className="w-full rounded-2xl border border-white/12 bg-white/[0.04] px-3 py-2.5 text-[14px] text-[#F7F7FA] outline-none"
        />
        <ul className="mt-2 max-h-[50vh] overflow-y-auto dapp-scroll">
          {results.length === 0 ? (
            <li className="px-3 py-4 text-[13px] text-[#8F93A3]">No matches</li>
          ) : (
            results.map((r, i) => (
              <li key={`${r.href}-${r.label}-${i}`}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[13px] text-[#F7F7FA] hover:bg-white/[0.06]"
                  onClick={() => {
                    router.push(r.href);
                    onClose();
                  }}
                >
                  <span>{r.label}</span>
                  <span className="text-[11px] text-[#6E7280]">{r.type}</span>
                </button>
              </li>
            ))
          )}
        </ul>
        <p className="px-3 pt-2 text-[11px] text-[#6E7280]">Esc to close</p>
      </div>
    </div>
  );
}
