import { DocsH2, DocsPage, StatusNote } from "@/components/docs/DocsArticle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shielded payroll — Docs",
  description: "Batch payouts from a private treasury. Recipients see their line, not the roster.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/business/payroll"
      title="Shielded payroll"
      lede="Compensation that is not a public spreadsheet. Each employee receives into a stealth destination."
    >
      <StatusNote />
      <p>
        A public payroll run is a graph of who earns what. XEROPAY is designed so a company pays
        from a shielded treasury in one batch: each recipient gets a note at a fresh address.
        Colleagues cannot read each other. Outsiders cannot scrape bands.
      </p>
      <section>
        <DocsH2>Roles and thresholds</DocsH2>
        <p className="mt-3">
          Who can initiate a run is separate from who can approve it. Large runs wait for a second
          operator. That is company policy encoded in the product, not a shared hot wallet with a
          spreadsheet on the side.
        </p>
      </section>
      <section>
        <DocsH2>Batch files</DocsH2>
        <p className="mt-3">
          CSV in, shielded notes out. The file stays with the workspace. The chain sees a batch
          proof, not a payslip. Recipients decrypt their own line.
        </p>
      </section>
      <section>
        <DocsH2>Auditors</DocsH2>
        <p className="mt-3">
          A viewing key scoped to the payroll vault and a filing window is how accountants get what
          they need without a dump of the whole treasury.
        </p>
      </section>
    </DocsPage>
  );
}
