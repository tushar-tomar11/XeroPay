"use client";

import { useCluster } from "@/components/providers/ClusterProvider";

export function DappShellBar() {
  const { cluster } = useCluster();
  return (
    <div className="relative z-[2] flex items-center justify-end border-b border-white/10 px-4 py-2 lg:px-8">
      <p className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1 text-[11px] tracking-[0.12em] text-[#9AA6FF] uppercase">
        Solana · {cluster}
      </p>
    </div>
  );
}
