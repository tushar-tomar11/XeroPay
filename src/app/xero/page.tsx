import { FeatureGrid, PageHero, PageSection } from "@/components/page/PagePrimitives";
import { PageCardVisual } from "@/components/page/PageCardVisual";
import { PageFrame } from "@/components/page/PageFrame";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "$XERO — XEROPAY",
  description:
    "$XERO is designed as a utility token for tiers and fee discounts. Contract and supply details publish when the token is live.",
};

export default function XeroPage() {
  return (
    <PageFrame>
    <main>
      <PageHero
        eyebrow="$XERO"
        title="A utility token. Not the product."
        body="$XERO is designed to buy tiers and fee discounts once it is live. The account, payroll, and compliance layer are supposed to work without it. There is no public contract address on this site yet — do not trust unofficial tickers."
        primary={{ href: "/docs", label: "Design notes" }}
        secondary={{ href: "/business#pricing", label: "Business pricing" }}
        visual={
          <PageCardVisual
            chips={[
              { label: "Utility", caption: "Tiers and fee discounts — not the product." },
              { label: "Tiers", caption: "Limits and seats step up with holding, when live." },
              { label: "Fees", caption: "The only thing the token is meant to gate." },
            ]}
          />
        }
      />

      <PageSection title="What it is for — when it ships">
        <FeatureGrid
          items={[
            { title: "Tiers", body: "Holding $XERO is designed to move an account or company seats up a tier: higher limits, more vaults, more seats." },
            { title: "Fee discounts", body: "Fees across the account and business products can step down with tier. That is the only thing the token is meant to gate." },
            { title: "Revenue, not inflation", body: "If buybacks exist, they should be funded by customers — seat fees and protocol revenue — not by emissions." },
          ]}
        />
      </PageSection>

      <PageSection title="The parts we leave out on purpose">
        <FeatureGrid
          items={[
            { title: "No staking requirement", body: "Yield in XEROPAY is designed to come from shielded deposits routed to real venues, not from locking a token." },
            { title: "No emissions as growth", body: "Supply is not a stand-in for product-market fit. No liquidity-mining story on this page." },
            { title: "No gate on the account", body: "Every core feature is specified to work without $XERO. Companies can pay a seat fee from day one." },
          ]}
        />
        <p className="mt-8 max-w-2xl text-[15px] leading-[1.7] text-[#8F93A3]">
          Chain, decimals, supply, and the only official address will be published here and in Docs
          when they exist. Until then, any other address claiming to be $XERO is not ours.
        </p>
      </PageSection>
    </main>
    </PageFrame>
  );
}
