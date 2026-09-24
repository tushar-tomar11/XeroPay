import { DocsH2, DocsPage, DocsTable, StatusNote } from "@/components/docs/DocsArticle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treasury controls — Docs",
  description: "Runway that is not an explorer query. Caps, approvals, separate vaults.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/business/treasury"
      title="Treasury controls"
      lede="Competitors and journalists should not be able to read your runway in real time."
    >
      <StatusNote />
      <p>
        Protocol treasuries on public chains are spectator sports. A shielded treasury is specified
        so only operators and named auditors see the books — with caps, approvals, and vaults so one
        key cannot empty the company.
      </p>
      <div className="mt-4">
        <DocsTable
          columns={["", "Public treasury", "XEROPAY"]}
          rows={[
            ["Runway", "Visible to anyone", "Encrypted notes"],
            ["Payroll", "Salary graph", "Stealth destinations"],
            ["Vendors", "Every invoice on-chain", "Private settlement, optional proof"],
          ]}
        />
      </div>
      <section>
        <DocsH2>Multi-sig and policy</DocsH2>
        <p className="mt-3">
          Co-signers for companies that cannot put funds behind one device. Spending policy
          (limits, destinations, time locks) belongs with the workspace, not in a public config
          anyone can read as a hint.
        </p>
      </section>
    </DocsPage>
  );
}
