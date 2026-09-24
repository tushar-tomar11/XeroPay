import {
  DocsH2,
  DocsPage,
  DocsTable,
  StatusNote,
} from "@/components/docs/DocsArticle";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What is XEROPAY — Docs",
  description:
    "XEROPAY is a shielded account for money that needs to move without publishing a statement on a public chain.",
};

const quick = [
  { href: "/docs/how-it-works", label: "How it works" },
  { href: "/docs/account", label: "The shielded account" },
  { href: "/docs/business", label: "Business" },
  { href: "/docs/compliance", label: "Compliance" },
  { href: "/docs/xero", label: "$XERO notes" },
  { href: "/docs/faq", label: "FAQ" },
] as const;

export default function DocsIndexPage() {
  return (
    <DocsPage
      path="/docs"
      title="What is XEROPAY"
      lede="A self-custodial shielded account: stablecoins and tokenized stocks stay unreadable on an explorer, and are still meant to earn, pay, spend, and prove."
    >
      <StatusNote />
      <p>
        You open it like an account: a handle, a balance, statements. Underneath, the balance is a
        set of encrypted notes in a shielded pool. Only your spending key can open them. Zero-knowledge
        proofs are the plumbing — they are not the product.
      </p>
      <p>
        In one line: private money that still works. Holdings stay invisible on the explorer. They
        are designed to keep earning, to pay without a repeating trail, to settle everyday spend
        from notes you control, and to prove themselves to an accountant or a lender with a viewing
        key you issue.
      </p>
      <p>
        XEROPAY is multi-chain by design. This site does not name a home chain, a card network, or a
        live token address as if they were already in production.
      </p>

      <section>
        <DocsH2>Why it exists</DocsH2>
        <p className="mt-3">
          Private transfers already exist. A private account does not. Mixers and hop-tools hide a
          movement, then dump you back onto a readable wallet. The money stops earning. It cannot
          pay rent without a pattern. It cannot show an auditor anything except a screenshot.
        </p>
        <p className="mt-3">
          Payroll-grade stablecoins and tokenized equities now sit in the same public address. That
          address is a payslip and a brokerage statement at once. XEROPAY is specified as the
          account layer in between: hold, pay, spend, and disclose on purpose. See{" "}
          <Link href="/docs/why-multi-chain" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
            Why multi-chain
          </Link>
          .
        </p>
      </section>

      <section>
        <DocsH2>What&apos;s live</DocsH2>
        <p className="mt-3">
          XEROPAY is pre-launch. Product contracts are not claimed on any mainnet. $XERO has no
          official contract on this site. These docs describe the design; every feature page carries
          a status note.
        </p>
        <div className="mt-4">
          <DocsTable
            columns={["Now", "Next"]}
            rows={[
              ["This marketing site and the product design", "Shielded account: shield, hold, unshield"],
              ["dApp waitlist on this site", "Private yield, stealth handles, viewing keys"],
              ["Business conversations for shielded payroll", "Payroll batches, API, spend rails"],
              ["$XERO described as intended utility only", "Official address, supply, and chain when live"],
            ]}
          />
        </div>
      </section>

      <section>
        <DocsH2>How the docs are organised</DocsH2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <Link href="/docs/account" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
              Account
            </Link>{" "}
            — the shielded account, shield and unshield, yield, spend rails, payments, vaults,
            tokenized stocks, keys.
          </li>
          <li>
            <Link href="/docs/business" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
              Business
            </Link>{" "}
            — overview, payroll, treasury, API, checkout, invoicing, pricing.
          </li>
          <li>
            <Link href="/docs/compliance" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
              Compliance
            </Link>{" "}
            — the model, edge screening, viewing keys, attestations, what XEROPAY sees.
          </li>
          <li>
            <Link href="/docs/xero" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
              $XERO
            </Link>{" "}
            — token notes, tiers and fee discounts. No live address.
          </li>
          <li>
            <Link href="/docs/protocol" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
              Protocol
            </Link>{" "}
            — architecture, modules, security model, fees.
          </li>
          <li>
            <Link href="/docs/landscape" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
              Landscape
            </Link>
            ,{" "}
            <Link href="/docs/faq" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
              FAQ
            </Link>
            , and{" "}
            <Link href="/docs/changelog" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
              changelog
            </Link>
            . There is no whitepaper PDF on this site.
          </li>
        </ul>
      </section>

      <section>
        <DocsH2>Quick links</DocsH2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {quick.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[15px] text-[#F7F7FA] hover:border-white/20"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[14px] text-[#8F93A3]">
          Marketing pages:{" "}
          <Link href="/" className="text-[#9AA6FF]">
            Home
          </Link>
          {" · "}
          <Link href="/dapp" className="text-[#9AA6FF]">
            dApp access
          </Link>
          {" · "}
          <Link href="/personal" className="text-[#9AA6FF]">
            Personal
          </Link>
          {" · "}
          <Link href="/business" className="text-[#9AA6FF]">
            Business
          </Link>
        </p>
      </section>
    </DocsPage>
  );
}
