import Link from "next/link";
import { docsSequence } from "@/config/docs";
import type { ReactNode } from "react";

export function DocsPager({ current }: { current: string }) {
  const i = docsSequence.findIndex((item) => item.href === current);
  const prev = i > 0 ? docsSequence[i - 1] : null;
  const next = i >= 0 && i < docsSequence.length - 1 ? docsSequence[i + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav className="mt-14 flex flex-wrap justify-between gap-4 border-t border-white/10 pt-6 text-[14px]">
      {prev ? (
        <Link href={prev.href} className="text-[#A6A9B5] hover:text-[#F7F7FA]">
          ← {prev.label}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.href} className="ml-auto text-[#9AA6FF] hover:text-[#F7F7FA]">
          Next: {next.label} →
        </Link>
      ) : null}
    </nav>
  );
}

export function DocsArticle({
  title,
  lede,
  children,
}: {
  title: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <article className="max-w-[720px]">
      <h1 className="text-[32px] font-semibold tracking-[-0.04em] text-[#F7F7FA] sm:text-[40px]">
        {title}
      </h1>
      {lede ? (
        <p className="mt-4 text-[18px] leading-[1.65] text-[#D7DAE6]">{lede}</p>
      ) : null}
      <div className="docs-prose mt-8 space-y-8 text-[16px] leading-[1.75] text-[#C5C8D4]">
        {children}
      </div>
    </article>
  );
}

export function DocsPage({
  path,
  title,
  lede,
  children,
}: {
  path: string;
  title: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <>
      <DocsArticle title={title} lede={lede}>
        {children}
      </DocsArticle>
      <div className="max-w-[720px]">
        <DocsPager current={path} />
      </div>
    </>
  );
}

export function StatusNote() {
  return (
    <p className="rounded-2xl border border-[#5B8CFF]/20 bg-[#5B8CFF]/[0.07] px-4 py-3 text-[14px] leading-[1.65] text-[#C5C8D4]">
      <span className="font-semibold text-[#F7F7FA]">Status: design.</span> XEROPAY is being built.
      These pages describe intended behaviour. Nothing here is claimed as live mainnet. Details can
      change. See{" "}
      <Link href="/docs" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
        What&apos;s live
      </Link>
      .
    </p>
  );
}

export function DocsH2({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-[#F7F7FA]">{children}</h2>
  );
}

export function DocsH3({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-[#F7F7FA]">{children}</h3>
  );
}

export function DocsLinkRow({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-[14px] text-[#9AA6FF] hover:text-[#F7F7FA]"
    >
      {label} →
    </Link>
  );
}

export function DocsTable({
  columns,
  rows,
}: {
  columns: readonly string[];
  rows: readonly (readonly string[])[];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="min-w-full text-left text-[14px]">
        <thead className="bg-white/[0.04] text-[12px] tracking-[0.12em] text-[#9AA6FF]/80 uppercase">
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-4 py-2.5 font-medium">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("|")} className="border-t border-white/10">
              {row.map((cell, i) => (
                <td
                  key={`${row[0]}-${i}`}
                  className={`px-4 py-3 align-top ${i === 0 ? "font-medium text-[#F7F7FA]" : "text-[#A6A9B5]"}`}
                >
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

export function DocsUl({ items }: { items: readonly ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
