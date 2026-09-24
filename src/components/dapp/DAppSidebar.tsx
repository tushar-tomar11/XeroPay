"use client";

import { Button } from "@/components/common/Button";
import { DappNavIcon } from "@/components/dapp/DappNavIcon";
import { useDappSession } from "@/components/dapp/session/DappSession";
import { assets } from "@/config/assets";
import { dappNav } from "@/config/dapp";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

export function DAppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { connected, truncated, openConnect, disconnect } = useDappSession();
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return dappNav;
    return dappNav
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.label.toLowerCase().includes(q)),
      }))
      .filter((group) => group.items.length > 0);
  }, [query]);

  return (
    <div className="flex h-full flex-col border-r border-white/10 bg-[#070914]/90 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-2 px-4 py-4">
        <Link href="/" onClick={onNavigate} className="flex min-w-0 items-center">
          <Image
            src={assets.logo.src}
            alt={assets.logo.alt}
            width={assets.logo.width}
            height={assets.logo.height}
            className="h-6 w-auto"
            priority
          />
        </Link>
      </div>

      <div className="px-3 pb-3">
        <label className="sr-only" htmlFor="dapp-search">
          Search
        </label>
        <input
          id="dapp-search"
          type="search"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          className="w-full rounded-full border border-white/12 bg-white/[0.04] px-3 py-2 text-[13px] text-[#F7F7FA] placeholder:text-[#6E7280] outline-none focus:border-[#7B9CFF]/50"
        />
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto px-2 pb-4" aria-label="dApp">
        {groups.map((group) => (
          <div key={group.title} className="mb-4">
            <p className="px-2 pb-1.5 text-[10px] font-medium tracking-[0.16em] text-[#6E7280] uppercase">
              {group.title}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active =
                  item.href === "/dapp" ? pathname === "/dapp" : pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={`flex items-center gap-2.5 rounded-full px-2.5 py-1.5 text-[13px] ${
                        active
                          ? "bg-[linear-gradient(90deg,rgba(79,124,255,0.28),rgba(139,92,246,0.22))] font-medium text-[#F7F7FA]"
                          : "text-[#A6A9B5] hover:bg-white/[0.05] hover:text-[#E8EAF2]"
                      }`}
                    >
                      <DappNavIcon name={item.icon} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 px-3 py-3">
        {connected ? (
          <div className="space-y-2">
            <p className="truncate px-1 font-mono text-[12px] text-[#C8CBD6]">{truncated}</p>
            <Button variant="secondary" className="w-full px-4 py-2.5 text-[13px]" onClick={disconnect}>
              Disconnect
            </Button>
          </div>
        ) : (
          <Button data-wallet-trigger className="w-full px-4 py-2.5 text-[13px]" onClick={openConnect}>
            Connect wallet
          </Button>
        )}
        <div className="mt-3 flex justify-between gap-2 rounded-2xl border border-white/10 bg-[#0B0E1A]/70 px-3 py-2 text-[11px] text-[#8F93A3]">
          <span>SOL —</span>
          <span>USDC —</span>
        </div>
        {connected ? (
          <p className="mt-1.5 text-center text-[10px] text-[#6E7280]">Preview balances</p>
        ) : null}
      </div>
    </div>
  );
}