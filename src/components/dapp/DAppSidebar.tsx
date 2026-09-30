"use client";

import { LoadingSkeleton } from "@/components/dapp/ErrorState";
import { DappNavIcon } from "@/components/dapp/DappNavIcon";
import { WalletButton } from "@/components/dapp/WalletButton";
import { useDappSession } from "@/components/dapp/session/DappSession";
import { assets } from "@/config/assets";
import { dappNav } from "@/config/navConfig";
import { formatSol, formatUsdc } from "@/lib/wallet/balances";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

export function DAppSidebar({
  onNavigate,
  onOpenSearch,
}: {
  onNavigate?: () => void;
  onOpenSearch?: () => void;
}) {
  const pathname = usePathname();
  const { connected, solBalance, usdcBalance, balancesReady, balancesError, balancesLoading, refreshBalances } =
    useDappSession();
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
            src={assets.wordmark.src}
            alt={assets.wordmark.alt}
            width={assets.wordmark.width}
            height={assets.wordmark.height}
            className="h-5 w-auto"
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
          placeholder="Search · Ctrl+K"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => onOpenSearch?.()}
          autoComplete="off"
          className="w-full rounded-full border border-white/12 bg-white/[0.04] px-3 py-2 text-[13px] text-[#F7F7FA] placeholder:text-[#6E7280] outline-none focus:border-[#7B9CFF]/50"
        />
      </div>

      <nav className="dapp-scroll min-h-0 flex-1 overflow-y-auto px-2 pb-4" aria-label="dApp">
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

      <div className="shrink-0 border-t border-white/10 px-3 py-3">
        <WalletButton className="w-full px-4 py-2.5 text-[13px]" variant="header" />
        <div className="mt-3 flex justify-between gap-2 rounded-2xl border border-white/10 bg-[#0B0E1A]/70 px-3 py-2 text-[11px] text-[#8F93A3]">
          {balancesLoading ? (
            <>
              <LoadingSkeleton className="h-4 w-16" />
              <LoadingSkeleton className="h-4 w-16" />
            </>
          ) : (
            <>
              <span>SOL {formatSol(solBalance, connected && balancesReady)}</span>
              <span>USDC {formatUsdc(usdcBalance, connected && balancesReady)}</span>
            </>
          )}
        </div>
        {connected ? (
          <p className="mt-1.5 text-center text-[10px] text-[#6E7280]">
            {balancesError ? (
              <button type="button" className="underline decoration-white/20" onClick={refreshBalances}>
                Wallet RPC unavailable · Retry
              </button>
            ) : (
              "On-chain wallet"
            )}
          </p>
        ) : null}
      </div>
    </div>
  );
}