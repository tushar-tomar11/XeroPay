import { DocsH2, DocsPage, DocsTable, StatusNote } from "@/components/docs/DocsArticle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invoicing — Docs",
  description: "Invoices that do not become a public ledger of clients.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/business/invoicing"
      title="Invoicing"
      lede="Issue to a handle. Each invoice gets a fresh destination. Export a proof without publishing the client list."
    >
      <StatusNote />
      <div className="mt-2">
        <DocsTable
          columns={["State", "Meaning"]}
          rows={[
            ["Draft", "Internal only. Nothing on chain."],
            ["Issued", "Payee handle + amount. Fresh destination per invoice."],
            ["Paid", "Note lands in treasury. Optional viewing-key export."],
            ["Overdue", "Local reminder. No public dunning trail."],
          ]}
        />
      </div>
      <section>
        <DocsH2>Line items and partials</DocsH2>
        <p className="mt-3">
          Line items stay local until you export them. Partial payments attach to the same invoice,
          not a new public hash. Voiding never leaves a public tombstone.
        </p>
      </section>
    </DocsPage>
  );
}
