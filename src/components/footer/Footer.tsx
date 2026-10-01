import { NewsletterForm } from "@/components/footer/NewsletterForm";
import { SectionAtmosphere } from "@/components/home/SectionAtmosphere";
import { Button } from "@/components/common/Button";
import { assets } from "@/config/assets";
import {
  footerBusiness,
  footerCompany,
  footerPersonal,
  footerProtocol,
} from "@/config/site";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative overflow-x-clip">
      <SectionAtmosphere />
      <div className="relative z-[1] mx-auto w-full max-w-[1440px] px-5 pb-8 pt-10 lg:px-10 lg:pt-14">
        <div className="relative overflow-hidden rounded-[28px] border border-white/12 bg-[#070914]/40 shadow-[0_40px_100px_rgba(0,0,0,0.35)]">
          <Image
            src={assets.section02.background.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-bottom opacity-80"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(80,90,200,0.28),transparent_55%)]" />
          <div className="relative grid items-center gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-14 lg:py-14">
            <div>
              <p className="text-[11px] font-medium tracking-[0.28em] text-[#9AA6FF]/85 uppercase">
                Private × Secure × On-chain
              </p>
              <h2 className="mt-4 max-w-xl text-[34px] font-semibold leading-[1.1] tracking-[-0.04em] text-[#F7F7FA] sm:text-[48px] lg:text-[54px]">
                Your money is{" "}
                <span className="bg-[linear-gradient(90deg,#7B9CFF_0%,#A78BFA_100%)] bg-clip-text text-transparent">
                  nobody&apos;s business.
                </span>
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-[1.7] text-[#C5C8D4]">
                Own your assets, earn yield, and move freely — without exposing your
                financial life to the world.
              </p>
              <div className="mt-7">
                <Button href="/dapp">
                  dApp Access
                  <span aria-hidden="true">→</span>
                </Button>
              </div>
            </div>

            <div className="relative isolate min-h-[240px] lg:min-h-[320px]">
              <div className="absolute right-[8%] top-[8%] hidden text-right text-[11px] tracking-[0.22em] text-white/55 uppercase lg:block">
                Same
                <br />
                address.
                <br />
                Total
                <br />
                control.
              </div>
              <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 lg:h-64 lg:w-64" />
              <div className="absolute left-1/2 top-1/2 h-28 w-56 -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] rounded-2xl border border-white/10 bg-white/5" />
              <div className="absolute left-1/2 top-1/2 z-10 w-[46%] max-w-[220px] -translate-x-[42%] -translate-y-[55%] rotate-[12deg]">
                <div className="rounded-3xl border border-white/20 bg-[linear-gradient(160deg,rgba(90,110,255,0.35),rgba(12,14,28,0.9))] p-6 shadow-[0_20px_60px_rgba(80,90,200,0.35)]">
                  <Image
                    src={assets.mark.src}
                    alt=""
                    width={assets.mark.width}
                    height={assets.mark.height}
                    className="h-16 w-auto"
                  />
                </div>
              </div>
              <div className="absolute bottom-[12%] right-[6%] z-20 max-w-[180px] rounded-2xl border border-white/15 bg-[#0B0E1A]/80 p-3 backdrop-blur-md">
                <p className="text-[10px] tracking-[0.16em] text-[#9AA6FF] uppercase">Private by design</p>
                <p className="mt-1 text-[12px] leading-snug text-[#C8CBD6]">
                  Onchain finance without compromise.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_repeat(4,0.7fr)_1.1fr]">
          <div>
            <Image
              src={assets.logo.src}
              alt={assets.logo.alt}
              width={assets.logo.width}
              height={assets.logo.height}
              className="h-7 w-auto"
            />
            <p className="mt-4 max-w-[220px] text-[15px] font-medium text-[#F7F7FA]">
              Money moves better in private.
            </p>
            <p className="mt-2 max-w-[240px] text-[13px] leading-[1.6] text-[#8F93A3]">
              Self-custodial tools for payroll, stablecoins and tokenized assets — without a public ledger for the account.
            </p>
            <div className="mt-5 flex gap-2">
              <SocialIcon label="X" />
              <SocialIcon label="Telegram" />
              <SocialIcon label="Email" />
            </div>
          </div>
          <FooterColumn title="Personal" links={footerPersonal} />
          <FooterColumn title="Business" links={footerBusiness} />
          <FooterColumn title="Protocol" links={footerProtocol} />
          <FooterColumn title="Company" links={footerCompany} />
          <div className="rounded-3xl border border-white/12 bg-[#0B0E1A]/55 p-5 backdrop-blur-md">
            <p className="text-[12px] tracking-[0.18em] text-[#9AA6FF]/80 uppercase">Stay updated</p>
            <h3 className="mt-3 text-[18px] font-semibold leading-snug text-[#F7F7FA]">
              Build a more private financial future.
            </h3>
            <p className="mt-2 text-[13px] leading-[1.6] text-[#8F93A3]">
              Product updates and launch notes. No list is wired yet — this stays on your device.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-5 text-[11px] tracking-[0.16em] text-[#7B7F90] uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} XEROPAY. All rights reserved.</p>
          <p>Multi-chain / Private / Open / Global</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-[11px] font-medium tracking-[0.2em] text-[#9AA6FF]/75 uppercase">
        {title}
      </h3>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className="text-[13px] text-[#C8CBD6] transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ label }: { label: string }) {
  return (
    <span
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-[#C8CBD6]"
    >
      {label === "X" ? (
        <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" aria-hidden="true">
          <path fill="currentColor" d="M10.8 1.5H12.7L8.6 6.2 13.4 12.5H9.6L6.5 8.7 3.1 12.5H1.2L5.6 7.5 1 1.5H4.9L7.7 5 10.8 1.5Zm-.7 9.9h1.1L4.1 2.6H3L10.1 11.4Z" />
        </svg>
      ) : null}
      {label === "Telegram" ? (
        <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" aria-hidden="true">
          <path fill="currentColor" d="M13 2.2 11.1 12c-.14.62-.52.77-1.05.48L7.2 10.2 5.86 11.5c-.15.15-.28.28-.57.28l.2-2.04 3.72-3.36c.16-.14-.04-.23-.25-.09L4.3 8.86 2.33 8.24c-.62-.2-.63-.62.13-.91L12.2 2.1c.52-.2.97.12.8.99Z" />
        </svg>
      ) : null}
      {label === "Email" ? (
        <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" aria-hidden="true">
          <path fill="none" stroke="currentColor" strokeWidth="1.2" d="M2 3.5h10v7H2z" />
          <path fill="none" stroke="currentColor" strokeWidth="1.2" d="M2 3.5 7 8l5-4.5" />
        </svg>
      ) : null}
    </span>
  );
}
