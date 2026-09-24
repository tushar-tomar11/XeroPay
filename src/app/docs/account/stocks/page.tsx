import { DocsH2, DocsPage, StatusNote } from "@/components/docs/DocsArticle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tokenized stocks — Docs",
  description:
    "Positions and cost basis stay off the explorer. Corporate actions are designed to reach shielded holders.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/account/stocks"
      title="Tokenized stocks"
      lede="Equity tokens in the same account as cash — without a public brokerage statement."
    >
      <StatusNote />
      <p>
        On a public wallet, every fill is ticker, size, time, and cost basis. That is a statement
        anyone can read. In XEROPAY, each buy is designed to settle into a fresh note. Positions
        stay hidden.
      </p>
      <section>
        <DocsH2>Private DCA</DocsH2>
        <p className="mt-3">
          Scheduled buys should not publish a cadence. Fills land as notes. The schedule lives with
          you, not on the explorer.
        </p>
      </section>
      <section>
        <DocsH2>Corporate actions</DocsH2>
        <p className="mt-3">
          Dividends and splits are meant to reach shielded holders without publishing who they are.
          That requires issuer-side plumbing we will describe when it exists — not a pretend
          transfer agent.
        </p>
      </section>
      <section>
        <DocsH2>What we do not list</DocsH2>
        <p className="mt-3">
          No ticker roster, no “trade TSLA privately today,” no brokerage APIs. Assets appear when
          they are actually held in notes.
        </p>
      </section>
    </DocsPage>
  );
}
