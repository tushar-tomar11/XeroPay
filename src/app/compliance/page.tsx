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
  title: "Compliance — XEROPAY",
  description:
    "Screening at the edge, scoped viewing keys, and proofs that answer a question without opening the account.",
};

export default function CompliancePage() {
  return (
    <PageFrame>
    <main>
      <PageHero
        eyebrow="Compliance"
        title="Built in, not bolted on"
        body="Privacy inside the pool. Checks at its boundary. Disclosure you issue, scope, and revoke — never a permanent back door."
        primary={{ href: "/account", label: "The account" }}
        secondary={{ href: "/docs", label: "Docs" }}
        visual={
          <PageCardVisual
            chips={[
              { label: "Screen", caption: "Checks at the edge. Privacy inside the pool." },
              { label: "Disclose", caption: "A key you scope, date, and revoke." },
              { label: "Prove", caption: "Yes-or-no answers without opening the account." },
            ]}
          />
        }
      />

      <PageSection title="Screened on the way in and on the way out">
        <FeatureGrid
          items={[
            { title: "Edge screening", body: "Shield and unshield can be checked so sanctioned flow stays out of the pool." },
            { title: "Identity-separated ramps", body: "Licensed partners hold KYC. That record is not supposed to sit next to on-chain activity." },
            { title: "Time-decorrelated exits", body: "Withdrawals can be split and staggered so an unshield is harder to match to a shield by clock." },
          ]}
        />
      </PageSection>

      <PageSection id="viewing-keys" title="Show exactly what's needed, to exactly who needs it, for exactly as long">
        <FeatureGrid
          items={[
            { title: "Scoped viewing keys", body: "Read-only access to a date range for an accountant, auditor, or lender. Revoke whenever you like." },
            { title: "Programmable expiry", body: "Set an end date and the key revokes itself. No key is meant to live forever." },
            { title: "Encrypted memos", body: "Private bookkeeping labels, readable only by you or a viewing-key holder." },
            { title: "Local export", body: "CSV or PDF generated on your machine from a key you issued." },
          ]}
        />
      </PageSection>

      <PageSection title="Prove it without revealing it">
        <FeatureGrid
          items={[
            { title: "Proof of funds", body: "Answer yes-or-no questions — balance above X, held for N months — without opening the account." },
            { title: "Collateral attestation", body: "A lender can accept a proof of shielded holdings instead of watching a public wallet." },
            { title: "Corporate actions", body: "Dividends and splits reach shielded holders without publishing who they are." },
          ]}
        />
      </PageSection>

      <PageSection title="Every party that used to need your whole wallet gets a narrower answer">
        <CompareTable
          caption="Who sees what"
          columns={["Party", "Public wallet", "XEROPAY"]}
          rows={[
            { label: "Accountant", publicValue: "Screenshots and a shared sheet", xero: "A key scoped to the filing window" },
            { label: "Auditor", publicValue: "Full history, forever", xero: "A read-only key that expires" },
            { label: "Lender", publicValue: "A public balance they can watch", xero: "A proof of balance above X" },
            { label: "Issuer / bank", publicValue: "Nothing to show but a mixer-shaped address", xero: "Edge screening plus association-set proofs" },
            { label: "Counterparty", publicValue: "Your whole balance from one payment", xero: "A one-time stealth address" },
          ]}
        />
      </PageSection>

      <PageSection id="security" title="Self-custodial from the first note">
        <FeatureGrid
          items={[
            { title: "No master viewing key", body: "Every disclosure is scoped, time-boxed, and issued by you." },
            { title: "Client-side portfolio", body: "Notes decrypt in the browser. The server is not the source of positions." },
            { title: "Device controls", body: "Per-device limits, freeze, and an instant kill switch." },
            { title: "Treasury multi-sig", body: "Co-signers for companies that cannot put funds behind one key." },
            { title: "Note consolidation", body: "Background defragmentation so proofs stay fast and fees stay low." },
            { title: "Gas sponsorship", body: "A paymaster can cover fees so you do not hold a gas token beside private funds." },
          ]}
        />
      </PageSection>
    </main>
    </PageFrame>
  );
}