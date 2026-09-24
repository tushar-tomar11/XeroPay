"use client";

type Props = {
  name: string;
  subject: string;
  time: string;
};

export function ConsequenceCard({ name, subject, time }: Props) {
  return (
    <article
      aria-label={`${name}: ${subject}`}
      className="flex w-[min(100%,420px)] items-center gap-3 rounded-[22px] border border-white/12 bg-[#070B18]/80 px-3 py-2.5 shadow-[0_16px_40px_rgba(20,24,70,0.35)] backdrop-blur-xl"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.04] text-[#C4B5FD]">
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            d="M4 7.5 12 13l8-5.5M5 18h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <p className="truncate text-[14px] font-medium text-white">{name}</p>
          <p className="shrink-0 text-[11px] text-[#8B90A3]">{time}</p>
        </div>
        <p className="truncate text-[12.5px] text-[#9AA6D8]">{subject}</p>
      </div>
    </article>
  );
}
