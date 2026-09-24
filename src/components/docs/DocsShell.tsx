"use client";

import { docsNav } from "@/config/docs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function DocsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto max-w-[1280px] px-5 pb-20 pt-8 lg:px-10">
      <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-4 lg:hidden">
        <p className="text-[12px] tracking-[0.18em] text-[#9AA6FF]/80 uppercase">Docs</p>
        <button
          type="button"
          className="rounded-full border border-white/12 px-3 py-1.5 text-[13px] text-[#C8CBD6]"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside
          className={`${open ? "block" : "hidden"} lg:sticky lg:top-24 lg:block lg:self-start lg:max-h-[calc(100svh-8rem)] lg:overflow-y-auto`}
        >
          <p className="mb-4 hidden text-[11px] tracking-[0.2em] text-[#9AA6FF]/70 uppercase lg:block">
            Documentation
          </p>
          <nav aria-label="Docs">
            {docsNav.map((group) => (
              <div key={group.title} className="mb-6">
                <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-[#8B90A3] uppercase">
                  {group.title}
                </p>
                <ul className="space-y-0.5">
                  {group.items.map((item) => {
                    const active =
                      item.href === "/docs"
                        ? pathname === "/docs"
                        : pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={`block rounded-lg px-2.5 py-1.5 text-[14px] ${
                            active
                              ? "bg-white/[0.08] text-[#F7F7FA]"
                              : "text-[#A6A9B5] hover:bg-white/[0.04] hover:text-[#E8EAF2]"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
