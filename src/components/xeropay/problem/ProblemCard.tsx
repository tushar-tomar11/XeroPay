"use client";

type Props = {
  title: string;
  meta: string;
  status: string;
};

export function ProblemCard({ title, meta, status }: Props) {
  return (
    <article
      aria-label={`${title}, ${meta}, ${status}`}
      className="w-[min(100%,280px)] rounded-[18px] border border-white/12 bg-[#070B18]/78 px-4 py-3.5 shadow-[0_16px_40px_rgba(20,24,70,0.35)] backdrop-blur-xl"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
          <svg viewBox="0 0 20 20" className="h-4 w-4 text-[#A78BFA]" aria-hidden="true">
            <path
              d="M5 2.5h7l3.5 3.5V17.5H5V2.5Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path d="M12 2.5V6h3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13.5px] font-medium text-white">{title}</p>
          <p className="mt-0.5 text-[12px] text-[#8B90A3]">{meta}</p>
        </div>
        <span className="ml-auto rounded-full border border-[#F87171]/25 bg-[#F87171]/10 px-2 py-0.5 text-[10px] tracking-wide text-[#F8B4B4] uppercase">
          {status}
        </span>
      </div>
    </article>
  );
}
