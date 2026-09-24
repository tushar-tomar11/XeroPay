import { DocsH2, DocsPage, StatusNote } from "@/components/docs/DocsArticle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merchant checkout — Docs",
  description: "Quote, settle, confirm. Customers pay without becoming a public graph.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/business/checkout"
      title="Merchant checkout"
      lede="Accept payment without inheriting a public list of every payer."
    >
      <StatusNote />
      <p>
        A customer can pay from a shielded note or a one-time stealth address. You receive
        confirmation. You do not inherit an explorer-shaped customer graph.
      </p>
      <section>
        <DocsH2>Session flow</DocsH2>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li>Quote — amount, asset, expiry. Unpaid quotes do not linger.</li>
          <li>Settle — customer pays from a note or a fresh stealth address.</li>
          <li>Confirm — webhook fires settled. Refunds are new notes, not a reverse of a public tx.</li>
        </ol>
      </section>
      <section>
        <DocsH2>What merchants still get</DocsH2>
        <p className="mt-3">
          Paid / failed / expired. Optional proof of payment for disputes. Not a worldwide feed of
          who shops with you.
        </p>
      </section>
    </DocsPage>
  );
}
