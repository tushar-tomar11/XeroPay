"use client";

import { Button } from "@/components/common/Button";
import { useDappSession } from "@/components/dapp/session/DappSession";
import { truncateAddress } from "@/lib/wallet/solanaAdapter";

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
