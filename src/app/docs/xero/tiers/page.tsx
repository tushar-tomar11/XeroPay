import { DocsH2, DocsPage, StatusNote } from "@/components/docs/DocsArticle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tiers and fee discounts — Docs",
  description: "Holding $XERO is designed to step limits and fees — when the token is live.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/xero/tiers"
      title="Tiers and fee discounts"
      lede="The only thing the token is meant to gate. Core features work without it."
    >
      <StatusNote />
      <section>
        <DocsH2>Tiers</DocsH2>
        <p className="mt-3">
          Holding $XERO is designed to move an account or company seats up a tier: higher limits,
          more vaults, more seats. Exact thresholds are not published because the token is not live.
        </p>
      </section>
      <section>
        <DocsH2>Fee discounts</DocsH2>
        <p className="mt-3">
          Fees across the account and business products can step down with tier. That is the only
          thing the token is meant to gate. Companies can pay a seat fee from day one without
          holding anything.
        </p>
      </section>
      <section>
        <DocsH2>What we refuse</DocsH2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>No staking requirement for yield.</li>
          <li>No emissions as growth.</li>
          <li>No gate on shield, hold, pay, or prove.</li>
        </ul>
      </section>
    </DocsPage>
  );
}
