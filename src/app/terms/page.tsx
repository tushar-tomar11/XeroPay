import { PageHero, PageSection } from "@/components/page/PagePrimitives";
import { PageFrame } from "@/components/page/PageFrame";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — XEROPAY",
  description: "Plain-language terms for the XEROPAY website and product.",
};

export default function TermsPage() {
  return (
    <PageFrame>
    <main>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        body="Plain-language terms for this website and the XEROPAY product as it ships. Last updated 24 September 2026."
      />

      <PageSection title="1. What these terms cover">
        <p className="max-w-2xl text-[16px] leading-[1.7] text-[#A6A9B5]">
          These terms apply to this website and to the XEROPAY application, interfaces, and APIs
          (together, the &quot;Service&quot;). By using the Service you agree to them.
        </p>
      </PageSection>
      <PageSection title="2. Self-custody">
        <p className="max-w-2xl text-[16px] leading-[1.7] text-[#A6A9B5]">
          XEROPAY is self-custodial. Your spending key is generated and held on your device. We
          cannot move your funds, recover your key, or reverse a transaction you have signed.
        </p>
      </PageSection>
      <PageSection title="3. Eligibility and compliance">
        <p className="max-w-2xl text-[16px] leading-[1.7] text-[#A6A9B5]">
          You may not use the Service if you are subject to sanctions or using it to evade the law.
          Shield and unshield may be screened. Fiat ramps and cards, when offered, are provided by
          licensed partners under their own terms.
        </p>
      </PageSection>
      <PageSection title="4. Yield and third parties">
        <p className="max-w-2xl text-[16px] leading-[1.7] text-[#A6A9B5]">
          Any yield figures on this site are targets or design intent, not guarantees. Returns
          depend on venues. Partner rails can change.
        </p>
      </PageSection>
      <PageSection title="5. The $XERO token">
        <p className="max-w-2xl text-[16px] leading-[1.7] text-[#A6A9B5]">
          $XERO is described as a utility for tiers and fee discounts. It is not a deposit, share of
          revenue, or promise of return. Nothing on this site is investment advice. Official
          contract details will be published only on this site and in Docs.
        </p>
      </PageSection>
      <PageSection title="6. Disclaimers">
        <p className="max-w-2xl text-[16px] leading-[1.7] text-[#A6A9B5]">
          The Service is provided as is. Smart contracts, proofs, and networks can fail. To the
          extent the law allows, XEROPAY is not liable for losses from your use of the Service or
          underlying networks.
        </p>
      </PageSection>
    </main>
    </PageFrame>
  );
}
