import type { ReactNode } from "react";

export function DappScreen({
  title,
  lede,
  children,
}: {
  title: string;
  lede: string;
  children: ReactNode;
}) {
  return (
    <div className="relative z-[1] mx-auto max-w-[1100px] px-4 py-8 lg:px-8 lg:py-10">
      <p className="inline-flex rounded-full border border-white/12 bg-white/[0.03] px-3 py-1 text-[11px] tracking-[0.16em] text-[#9AA6FF] uppercase">
        Preview — not on-chain
      </p>
      <h1 className="mt-4 text-[28px] font-semibold tracking-[-0.04em] text-[#F7F7FA] sm:text-[34px]">
        {title}
      </h1>
      <p className="mt-2 max-w-2xl text-[15px] leading-[1.7] text-[#C5C8D4]">{lede}</p>
      <div className="mt-8 space-y-4">{children}</div>
    </div>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl border border-white/12 bg-[#0B0E1A]/55 p-5 backdrop-blur-md ${className}`}>
      {children}
    </div>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[11px] tracking-[0.14em] text-[#9AA6FF] uppercase">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

export const inputClass =
  "w-full rounded-2xl border border-white/12 bg-white/[0.04] px-3 py-2.5 text-[14px] text-[#F7F7FA] outline-none placeholder:text-[#6E7280] focus:border-[#7B9CFF]/50";
