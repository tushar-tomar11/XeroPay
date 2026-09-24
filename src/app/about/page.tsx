import { FeatureGrid, PageHero, PageSection } from "@/components/page/PagePrimitives";
import { PageCardVisual } from "@/components/page/PageCardVisual";
import { PageFrame } from "@/components/page/PageFrame";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — XEROPAY",
  description:
    "Private transfers already exist. A private account — one that still earns, spends, and proves — does not.",
};

export default function AboutPage() {
  return (
    <PageFrame>
    <main>
      <PageHero
        eyebrow="About"
        title="Private transfers already exist. A private account does not."
        body="XEROPAY is the missing account layer: self-custodial, shielded by zero-knowledge proofs, and still usable the way a bank account is used — across the chains you already hold."
        primary={{ href: "/dapp", label: "dApp access" }}
        secondary={{ href: "/docs", label: "Read the design" }}
        visual={
          <PageCardVisual
            chips={[
              { label: "Account", caption: "A handle and a balance — not a mixer." },
              { label: "Yield", caption: "Private money still has to keep working." },
              { label: "Privacy", caption: "Compliance as a feature, not a concession." },
            ]}
          />
        }
      />

      <PageSection title="The one place a public wallet is a payslip and a brokerage statement at once">
        <p className="max-w-2xl text-[16px] leading-[1.7] text-[#A6A9B5]">
          Payroll-grade stablecoins and tokenized equities now sit in the same address on public
          chains. Trading is crowded. The account layer is empty. That gap is the product — not a
          mixer, not a card with nothing behind it.
        </p>
      </PageSection>

      <PageSection title="Principles">
        <FeatureGrid
          items={[
            { title: "An account, not a mixer", body: "A handle, a balance, statements, and the jobs of a neobank. The zero-knowledge pool is plumbing." },
            { title: "Private money has to keep working", body: "If hiding a balance stops it earning, spending, or proving itself, it is dead capital. We don't ship dead capital." },
            { title: "Compliance is a feature", body: "Screening at the edge and scoped disclosure are what make counterparties say yes." },
            { title: "Revenue before token", body: "Companies can pay seat fees for shielded payroll. $XERO sits on top of that design — it is not the product." },
          ]}
        />
      </PageSection>

      <PageSection title="Plenty of privacy tools. No private account.">
        <div className="overflow-x-auto rounded-3xl border border-white/10">
          <table className="min-w-full text-left text-[14px]">
            <thead className="bg-white/[0.04] text-[12px] tracking-[0.14em] text-[#9AA6FF]/80 uppercase">
              <tr>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">What exists</th>
                <th className="px-5 py-3 font-medium">What&apos;s missing</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Private transfer tools", "Shielded sends and stealth addresses", "No yield, no payroll, no disclosure layer"],
                ["Privacy neobanks elsewhere", "Private transfers and sometimes a card", "Not a full account for stocks + yield + payroll"],
                ["Card-only projects", "A card with little behind it", "Issuers and compliance tend to pull thin stacks"],
                ["Public neobanks", "Checking, yield, and payroll in the open", "Structurally unable to offer privacy"],
              ].map(([a, b, c]) => (
                <tr key={a} className="border-t border-white/10">
                  <th className="px-5 py-4 align-top font-medium text-[#F7F7FA]">{a}</th>
                  <td className="px-5 py-4 align-top text-[#8F93A3]">{b}</td>
                  <td className="px-5 py-4 align-top text-[#C8CBD6]">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>
    </main>
    </PageFrame>
  );
}
