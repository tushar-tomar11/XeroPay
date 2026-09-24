"use client";

import { Button } from "@/components/common/Button";
import { useDappSession } from "@/components/dapp/session/DappSession";
import { SOLANA_WALLETS, truncateAddress } from "@/lib/wallet/solanaAdapter";

export function ConnectWalletModal() {
  const { connectOpen, closeConnect, selectWallet, pendingWallet } = useDappSession();
  if (!connectOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center">
      <button type="button" aria-label="Close" className="absolute inset-0 bg-black/70" onClick={closeConnect} />
      <div className="relative z-[1] max-h-[88svh] w-full max-w-[440px] overflow-y-auto rounded-t-3xl border border-white/12 bg-[#0B0E1A] p-6 shadow-[0_40px_100px_rgba(0,0,0,0.5)] sm:rounded-3xl">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-[#F7F7FA]">Connect a wallet</h2>
            <p className="mt-1 text-[14px] text-[#A6A9B5]">Your wallet is your account.</p>
          </div>
          <button
            type="button"
            onClick={closeConnect}
            className="rounded-full border border-white/12 px-2.5 py-1 text-[13px] text-[#A6A9B5]"
          >
            Close
          </button>
        </div>
        <p className="mb-4 inline-flex rounded-full border border-white/12 px-3 py-1 text-[11px] tracking-[0.16em] text-[#9AA6FF] uppercase">
          Solana
        </p>
        <ul className="divide-y divide-white/10 rounded-2xl border border-white/10">
          {SOLANA_WALLETS.map((w) => (
            <li key={w.id}>
              <button
                type="button"
                disabled={pendingWallet === w.id}
                onClick={() => void selectWallet(w.id)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-white/[0.04]"
              >
                <span>
                  <span className="block text-[15px] font-medium text-[#F7F7FA]">{w.name}</span>
                  <span className="block text-[12px] text-[#6E7280] uppercase">{w.hint}</span>
                </span>
                <span className="text-[12px] font-medium tracking-[0.12em] text-[#9AA6FF] uppercase">
                  {pendingWallet === w.id ? "Opening…" : "Connect"}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[12px] leading-relaxed text-[#6E7280]">
          Preview session only. This does not talk to Phantom yet — the adapter hook is ready for a
          live Solana wallet later.
        </p>
      </div>
    </div>
  );
}

export function SignIntentModal() {
  const { signOpen, signLabel, confirmSign, cancelSign, pendingAddress } = useDappSession();
  if (!signOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center">
      <button type="button" aria-label="Close" className="absolute inset-0 bg-black/70" onClick={cancelSign} />
      <div className="relative z-[1] w-full max-w-[400px] rounded-t-3xl border border-white/12 bg-[#0B0E1A] p-6 sm:rounded-3xl">
        <p className="text-[11px] tracking-[0.16em] text-[#9AA6FF] uppercase">Signature</p>
        <h2 className="mt-2 text-[20px] font-semibold tracking-[-0.03em] text-[#F7F7FA]">{signLabel}</h2>
        <p className="mt-2 text-[14px] leading-relaxed text-[#A6A9B5]">
          One signature. No gas in this preview. Nothing broadcasts.
        </p>
        {pendingAddress ? (
          <p className="mt-3 font-mono text-[12px] text-[#C8CBD6]">{truncateAddress(pendingAddress)}</p>
        ) : null}
        <div className="mt-6 flex gap-3">
          <Button className="flex-1 px-4 py-2.5 text-[14px]" onClick={confirmSign}>
            Sign
          </Button>
          <Button variant="secondary" className="flex-1 px-4 py-2.5 text-[14px]" onClick={cancelSign}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
