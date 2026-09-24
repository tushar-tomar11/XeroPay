export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/12 px-4 py-8 text-center">
      <p className="text-[15px] font-medium text-[#F7F7FA]">{title}</p>
      <p className="mt-1 text-[13px] leading-relaxed text-[#8F93A3]">{body}</p>
    </div>
  );
}
