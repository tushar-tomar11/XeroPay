import { DocsH2, DocsPage, StatusNote } from "@/components/docs/DocsArticle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private yield — Docs",
  description:
    "Hiding a balance should not kill it. Yield is designed to credit per note when venues are live.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/account/yield"
      title="Private yield"
      lede="Hiding a balance should cost you nothing. Idle notes are designed to keep working without a public deposit trail."
    >
      <StatusNote />
      <p>
        Most privacy tools turn a hidden balance into dead capital. XEROPAY is specified so shielded
        deposits can be pooled, routed into real venues, and credited back per note. The explorer
        sees pool-level routing when that exists — not your strategy, size, or claim cadence.
      </p>
      <section>
        <DocsH2>How credit is supposed to work</DocsH2>
        <p className="mt-3">
          Returns accrue to notes, not to a public wallet. Auto-sweep can move idle balance above a
          threshold into the yield path on its own. You should not have to unshield to earn.
        </p>
      </section>
      <section>
        <DocsH2>What we will not publish early</DocsH2>
        <p className="mt-3">
          No APY, no venue list, no “current rate” widget. Figures go live with the venues. Anything
          advertising a number before that is not from these docs.
        </p>
      </section>
      <section>
        <DocsH2>Not token staking</DocsH2>
        <p className="mt-3">
          Yield is not designed to come from locking $XERO. If the token exists, it is for tiers and
          fee discounts. Productive balances come from the assets in the notes.
        </p>
      </section>
    </DocsPage>
  );
}
