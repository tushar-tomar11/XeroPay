import { PageHero, PageSection } from "@/components/page/PagePrimitives";
import { PageFrame } from "@/components/page/PageFrame";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — XEROPAY",
  description: "What this website collects, and what the product is designed never to see.",
};

export default function PrivacyPage() {
  return (
    <PageFrame>
    <main>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        body="What the website and the product collect, and what they are designed never to see. Last updated 24 September 2026."
      />

      <PageSection title="1. This website">
        <p className="max-w-2xl text-[16px] leading-[1.7] text-[#A6A9B5]">
          This is a static marketing site. It is not intended to set advertising cookies or load
          third-party trackers. If you contact the team through a page on this site, we keep that
          message only to reply.
        </p>
      </PageSection>
      <PageSection title="2. What the product is built never to see">
        <p className="max-w-2xl text-[16px] leading-[1.7] text-[#A6A9B5]">
          Balances, positions, cost basis, and transaction memos are designed as encrypted notes,
          decrypted in your browser with your key. Identity checks for ramps live with licensed
          partners. XEROPAY is not supposed to store the link between a KYC record and on-chain
          activity.
        </p>
      </PageSection>
      <PageSection title="3. What we may process">
        <p className="max-w-2xl text-[16px] leading-[1.7] text-[#A6A9B5]">
          Screening results for shield and unshield, operational logs needed to run relayers and
          APIs, and business account details for companies that buy seats — when those surfaces exist.
        </p>
      </PageSection>
      <PageSection title="4. Disclosure you control">
        <p className="max-w-2xl text-[16px] leading-[1.7] text-[#A6A9B5]">
          A viewing key you issue lets its holder read the scope you set, for the period you set.
          You can revoke it. There is no master key in the design.
        </p>
      </PageSection>
      <PageSection title="5. Changes">
        <p className="max-w-2xl text-[16px] leading-[1.7] text-[#A6A9B5]">
          We may update this policy. The version on this page applies.
        </p>
      </PageSection>
    </main>
    </PageFrame>
  );
}
