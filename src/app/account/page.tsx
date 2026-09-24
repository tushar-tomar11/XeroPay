import {
  CompareTable,
  FeatureGrid,
  PageHero,
  PageSection,
} from "@/components/page/PagePrimitives";
import { PageCardVisual } from "@/components/page/PageCardVisual";
import { PageFrame } from "@/components/page/PageFrame";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The account — XEROPAY",
  description:
    "A bank account the block explorer can't read: shielded notes for stablecoins and tokenized stocks.",
};

export default function AccountPage() {
  return (
    <PageFrame>
    <main>
      <PageHero
        eyebrow="The shielded account"
        title="A bank account the block explorer can't read"
        body="Encrypted note balances for stablecoins and tokenized stocks. Holdings, sizes, and cost basis stay hidden. Yield, payments, and proofs are designed to keep working."
        primary={{ href: "/dapp", label: "dApp access" }}
        secondary={{ href: "/compliance", label: "How compliance works" }}
        visual={
          <PageCardVisual
            chips={[
              { label: "Shield", caption: "Screened at the edge, then encrypted notes." },
              { label: "Hold", caption: "Idle notes can keep working in the pool." },
              { label: "Pay", caption: "A fresh path per payment — nothing repeats." },
            ]}
          />
        }
      />

      <PageSection id="balance" title="Four things a bank account does — from a balance nobody else can see.">
        <ol className="grid gap-4 md:grid-cols-2">
          {[
            ["01 Shield", "Money comes in through a licensed ramp or a bridge, can be screened at the edge, and lands as notes tied to your spending key."],
            ["02 Hold", "Notes can earn in the background and split into vaults. Idle balance is designed to sweep without a public deposit trail."],
            ["03 Spend and pay", "Payments go to stealth addresses, on a schedule if you want, with nothing repeating on-chain."],
            ["04 Prove", "Hand an accountant a viewing key scoped to a period, or a lender a proof of funds. Both expire. Both can be pulled early."],
          ].map(([title, body]) => (
            <li key={title} className="rounded-3xl border border-white/10 p-6">
              <p className="text-[13px] tracking-[0.16em] text-[#9AA6FF] uppercase">{title}</p>
              <p className="mt-3 text-[15px] leading-[1.7] text-[#A6A9B5]">{body}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection title="What a public wallet publishes — and what this account hides">
        <CompareTable
          caption="Public wallet versus XEROPAY account"
          columns={["", "Public wallet", "XEROPAY"]}
          rows={[
            { label: "Balance", publicValue: "Exact, for anyone", xero: "Encrypted notes; nothing to read" },
            { label: "Positions", publicValue: "Every token and size", xero: "Hidden, including tokenized stocks" },
            { label: "Cost basis", publicValue: "Every fill, timestamped", xero: "Each buy can settle into a fresh note" },
            { label: "Salary", publicValue: "Every incoming payment", xero: "One line inside a shielded batch" },
            { label: "Who you pay", publicValue: "Every counterparty, forever", xero: "A one-time stealth address" },
            { label: "Yield", publicValue: "Every deposit and claim", xero: "Credited inside the pool" },
          ]}
        />
      </PageSection>

      <PageSection id="yield" title="Hiding your balance should cost you nothing">
        <FeatureGrid
          items={[
            { title: "Private yield routing", body: "Shielded deposits are designed to pool into real venues and come back per note. We will publish rates with the venues, not before." },
            { title: "Auto-sweep", body: "Idle balance above a threshold can move into the yield pool on its own." },
            { title: "Private DCA", body: "Scheduled buys into tokenized stocks, each fill settling into a fresh note." },
          ]}
        />
      </PageSection>

      <PageSection id="card" title="Spend from shielded balance">
        <p className="max-w-2xl text-[16px] leading-[1.7] text-[#A6A9B5]">
          The account is built so everyday spend can settle from notes you control — with per-device
          limits, freeze, and a kill switch. Card networks and wallets will be listed here when
          issuance is real.
        </p>
      </PageSection>

      <PageSection id="payments" title="Pay without leaving a pattern">
        <FeatureGrid
          items={[
            { title: "Stealth handles", body: "A fresh receiving address per payment, so a shared name cannot be scraped for a balance." },
            { title: "Private recurring", body: "Rent, retainers, and subscriptions without a repeating on-chain cadence." },
            { title: "Shielded escrow", body: "Amount and counterparty stay hidden until release." },
            { title: "Time-decorrelated exits", body: "Unshields can be split and staggered so timing does not match them to a shield." },
            { title: "Invoicing", body: "Send a link. Arrival is designed to shield without publishing the amount." },
            { title: "Identity-separated ramps", body: "Licensed partners hold KYC. XEROPAY is not supposed to hold both halves of that link." },
          ]}
        />
      </PageSection>

      <PageSection id="keys" title="Self-custodial, and still recoverable">
        <FeatureGrid
          items={[
            { title: "Spending key on device", body: "XEROPAY cannot move funds or decrypt notes on your behalf." },
            { title: "Guardians and passkeys", body: "A lost device is not designed to be a lost account." },
            { title: "Scoped viewing keys", body: "Read-only, dated, revocable. No master key." },
            { title: "Local tax export", body: "CSV or PDF generated from a viewing key on your machine." },
          ]}
        />
      </PageSection>
    </main>
    </PageFrame>
  );
}