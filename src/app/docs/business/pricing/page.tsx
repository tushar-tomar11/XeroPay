import { DocsH2, DocsPage, StatusNote } from "@/components/docs/DocsArticle";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — Docs",
  description: "Seat-based access. No invented APR, spread, or per-tx fee table.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/business/pricing"
      title="Pricing"
      lede="Pricing is not live. Access is. When numbers exist, they will live here — not as a teaser."
    >
      <StatusNote />
      <p>
        Early teams get a seat, a support channel, and a written scope of what is actually live.
        There is no public fee table, no slider, no fake per-tx basis points.
      </p>
      <section>
        <DocsH2>Seat names (design)</DocsH2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Starter — one operator, viewing keys, CSV export.</li>
          <li>Team — roles, approval thresholds, named support.</li>
          <li>Enterprise — SSO, custom screening policy, dedicated onboarding when you ask.</li>
        </ul>
      </section>
      <section>
        <DocsH2>Token</DocsH2>
        <p className="mt-3">
          Companies can pay a seat fee without $XERO. If the token is live, tiers may discount fees.
          See{" "}
          <Link href="/docs/xero/tiers" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
            Tiers and fee discounts
          </Link>
          .
        </p>
      </section>
    </DocsPage>
  );
}
