"use client";

import type { ReactNode } from "react";

function EyeOff() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-white/70" aria-hidden="true">
      <path
        d="M3 3l18 18M10.6 10.6A3 3 0 0 0 12 15a3 3 0 0 0 2.4-4.4M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 9.3 3.1 11 7.5a12 12 0 0 1-4.1 4.9M6.1 6.1A12 12 0 0 0 1 12.5C2.7 16.9 7 20 12 20c1.4 0 2.8-.3 4-.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

type Props = {
  title: string;
  address: string;
  icon: ReactNode;
  className?: string;
  emphasized?: boolean;
  onHover?: (hovered: boolean) => void;
};

export function FinancialDataCard({
  title,
  address,
  icon,
  className = "",
  emphasized = false,
  onHover,
}: Props) {
  return (
    <button
      type="button"
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      className={`group flex w-[min(100%,340px)] items-center gap-3 rounded-[22px] border px-2.5 py-2 text-left backdrop-blur-xl transition duration-300 ${
        emphasized
          ? "border-white/22 bg-[#0A1024]/80 shadow-[0_12px_40px_rgba(70,90,220,0.28)]"
          : "border-white/12 bg-[#070B18]/70 shadow-[0_10px_30px_rgba(8,12,40,0.35)]"
      } ${className}`}
      aria-label={`${title}, ${address}`}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.04] text-[#7EB6FF]">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-medium text-white">{title}</span>
        <span className="block truncate font-mono text-[12px] text-[#8FA0D6]">{address}</span>
      </span>
      <span className="mx-1 hidden h-8 w-px bg-white/15 sm:block" />
      <span className="pr-2 opacity-70 transition group-hover:opacity-100">
        <EyeOff />
      </span>
    </button>
  );
}
