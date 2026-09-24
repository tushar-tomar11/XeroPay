import { Button } from "@/components/common/Button";
import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  body,
  primary,
  secondary,
  visual,
}: {
  eyebrow: string;
  title: string;
  body: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  visual?: ReactNode;
}) {
  return (
    <header className="relative overflow-x-clip px-5 pb-12 pt-14 lg:px-10 lg:pb-16 lg:pt-20">
      <div className="relative mx-auto grid max-w-[1120px] items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)] lg:gap-10">
        <div>
          <p className="text-[12px] font-medium tracking-[0.22em] text-[#9AA6FF]/80 uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl text-[36px] font-semibold leading-[1.1] tracking-[-0.045em] text-[#F7F7FA] sm:text-[48px] lg:text-[52px]">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-[1.7] text-[#C5C8D4] sm:text-[18px]">{body}</p>
          {primary || secondary ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {primary ? (
                <Button href={primary.href}>
                  {primary.label}
                  <span aria-hidden="true">→</span>
                </Button>
              ) : null}
              {secondary ? (
                <Button href={secondary.href} variant="secondary">
                  {secondary.label}
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
        {visual ? <div className="flex justify-center lg:justify-center">{visual}</div> : null}
      </div>
    </header>
  );
}

export function FeatureGrid({
  items,
}: {
  items: readonly { title: string; body: string }[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.title}
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
        >
          <h3 className="text-[16px] font-semibold text-[#F7F7FA]">{item.title}</h3>
          <p className="mt-2 text-[14px] leading-[1.65] text-[#A6A9B5]">{item.body}</p>
        </article>
      ))}
    </div>
  );
}

export function CompareTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: readonly [string, string, string];
  rows: readonly { label: string; publicValue: string; xero: string }[];
}) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-white/10">
      <table className="min-w-full text-left text-[14px]">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-white/[0.04] text-[12px] tracking-[0.14em] text-[#9AA6FF]/80 uppercase">
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-5 py-3 font-medium">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-t border-white/10">
              <th className="px-5 py-4 align-top font-medium text-[#F7F7FA]">{row.label}</th>
              <td className="px-5 py-4 align-top text-[#8F93A3]">{row.publicValue}</td>
              <td className="px-5 py-4 align-top text-[#C8CBD6]">{row.xero}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PageSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 px-5 py-10 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-[1120px]">
        {eyebrow ? (
          <p className="text-[12px] font-medium tracking-[0.22em] text-[#9AA6FF]/80 uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 max-w-3xl text-[28px] font-semibold tracking-[-0.035em] text-[#F7F7FA] sm:text-[36px]">
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
