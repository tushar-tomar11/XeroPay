export function ErrorState({
  title,
  body,
  onRetry,
}: {
  title: string;
  body: string;
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-[#F0A0A0]/25 bg-[#F0A0A0]/8 px-4 py-4">
      <p className="text-[14px] font-medium text-[#F7F7FA]">{title}</p>
      <p className="mt-1 text-[13px] leading-relaxed text-[#C8CBD6]">{body}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 rounded-full border border-white/15 px-3 py-1.5 text-[12px] text-[#F7F7FA] hover:bg-white/[0.06]"
        >
          Retry
        </button>
      ) : null}
    </div>
  );
}

export function LoadingSkeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-white/10 ${className}`} />;
}
