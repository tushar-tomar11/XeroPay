"use client";

export function StatusPill() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[12.5px] text-[#D7D9E2]">
      <span className="relative flex h-2 w-2">
        <span className="absolute inset-0 rounded-full bg-[#42E8A1] opacity-70 motion-safe:animate-status-pulse" />
        <span className="relative h-2 w-2 rounded-full bg-[#42E8A1]" />
      </span>
      Preview
    </div>
  );
}
