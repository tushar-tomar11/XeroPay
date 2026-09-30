import { Button } from "@/components/common/Button";
import { isPreview } from "@/lib/preview/flag";
import type { ComponentProps, ReactNode } from "react";

export function PreviewBadge({ label = "PREVIEW — NOT ON-CHAIN" }: { label?: string }) {
  if (!isPreview) return null;
  return (
    <p className="inline-flex rounded-full border border-white/12 bg-white/[0.03] px-3 py-1 text-[11px] tracking-[0.16em] text-[#9AA6FF] uppercase">
      {label}
    </p>
  );
}

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
}) {
  return (
    <div className="rounded-3xl border border-white/12 bg-[#0B0E1A]/55 p-5 backdrop-blur-md">
      <p className="text-[11px] tracking-[0.14em] text-[#9AA6FF] uppercase">{label}</p>
      <div className="mt-2 text-[22px] font-semibold text-[#F7F7FA]">{value}</div>
      {hint ? <p className="mt-1 text-[12px] text-[#6E7280]">{hint}</p> : null}
    </div>
  );
}

export function DataTable({
  columns,
  rows,
  empty,
}: {
  columns: string[];
  rows: ReactNode[][];
  empty?: ReactNode;
}) {
  if (rows.length === 0) return <>{empty}</>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] text-left text-[13px]">
        <thead>
          <tr className="text-[11px] tracking-[0.12em] text-[#6E7280] uppercase">
            {columns.map((c) => (
              <th key={c} className="pb-2 pr-3 font-medium">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="py-2.5 pr-3 text-[#C8CBD6]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ActionButton({
  children,
  ...props
}: ComponentProps<typeof Button>) {
  return <Button {...props}>{children}</Button>;
}
