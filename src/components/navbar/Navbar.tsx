"use client";

import { StatusPill } from "@/components/common/StatusPill";
import { assets } from "@/config/assets";
import { businessLinks, personalLinks } from "@/config/site";
import { EASE_OUT, introOffset, load } from "@/lib/motion";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const simpleLinks = [
  { label: "Compliance", href: "/compliance" },
  { label: "$XERO", href: "/xero" },
  { label: "About", href: "/about" },
  { label: "Docs", href: "/docs" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<"personal" | "business" | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [pathname]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -introOffset }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: load.navbar.delay, duration: load.navbar.duration, ease: EASE_OUT }}
      className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#05060B]/72 backdrop-blur-xl"
    >
      <nav className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 lg:px-10">
        <Link href="/" className="relative z-10 flex items-center">
          <Image
            src={assets.logo.src}
            alt={assets.logo.alt}
            width={assets.logo.width}
            height={assets.logo.height}
            className="h-7 w-auto"
            priority
          />
        </Link>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex">
          <li
            className="relative"
            onMouseEnter={() => setMenu("personal")}
            onMouseLeave={() => setMenu(null)}
          >
            <Link
              href="/personal"
              className="inline-flex items-center gap-1 text-[13.5px] text-[#C8CBD6] transition-colors duration-200 hover:text-white"
              aria-haspopup="true"
              aria-expanded={menu === "personal"}
            >
              Personal
              <Chevron />
            </Link>
            <MegaPanel open={menu === "personal"} links={personalLinks} />
          </li>
          <li
            className="relative"
            onMouseEnter={() => setMenu("business")}
            onMouseLeave={() => setMenu(null)}
          >
            <Link
              href="/business"
              className="inline-flex items-center gap-1 text-[13.5px] text-[#C8CBD6] transition-colors duration-200 hover:text-white"
              aria-haspopup="true"
              aria-expanded={menu === "business"}
            >
              Business
              <Chevron />
            </Link>
            <MegaPanel open={menu === "business"} links={businessLinks} />
          </li>
          {simpleLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[13.5px] text-[#C8CBD6] transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <StatusPill />
          <Link
            href="/dapp"
            className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(90deg,#4F7CFF_0%,#7A6BFF_52%,#8B5CF6_100%)] px-4 py-2 text-[13.5px] font-medium text-white shadow-[0_8px_24px_rgba(79,124,255,0.28)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            dApp Access
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <button
          type="button"
          className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex w-4 flex-col gap-1.5">
            <span className={`h-px w-full bg-white transition ${open ? "translate-y-[4px] rotate-45" : ""}`} />
            <span className={`h-px w-full bg-white transition ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-[#05060B] lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              <Link href="/personal" className="rounded-lg px-3 py-2.5 text-sm text-[#D7D9E2]">
                Personal
              </Link>
              <Link href="/business" className="rounded-lg px-3 py-2.5 text-sm text-[#D7D9E2]">
                Business
              </Link>
              {simpleLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-sm text-[#D7D9E2]"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex items-center justify-between px-3 py-2">
                <StatusPill />
                <Link
                  href="/dapp"
                  className="rounded-full bg-[linear-gradient(90deg,#4F7CFF,#8B5CF6)] px-4 py-2 text-sm text-white"
                >
                  dApp Access
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 10 6" className="h-2 w-2.5 opacity-70" aria-hidden="true">
      <path
        d="M1 1.2 5 5l4-3.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MegaPanel({
  open,
  links,
}: {
  open: boolean;
  links: readonly { href: string; label: string; description: string }[];
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.18 }}
          className="absolute left-1/2 top-full z-50 w-[420px] -translate-x-1/2 pt-3"
        >
          <div className="rounded-2xl border border-white/10 bg-[#0B0D16]/95 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <ul className="grid gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-xl px-3 py-2.5 transition hover:bg-white/[0.05]"
                >
                  <span className="block text-[13.5px] font-medium text-white">{link.label}</span>
                  <span className="mt-0.5 block text-[12px] leading-snug text-[#8F93A3]">
                    {link.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
