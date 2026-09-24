import { DocsH2, DocsPage, DocsTable, StatusNote } from "@/components/docs/DocsArticle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landscape — Docs",
  description: "Plenty of privacy tools. A private account that still works is the gap.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/landscape"
      title="Landscape"
      lede="Private transfers already exist. An account — hold, earn, pay, spend, prove — mostly does not."
    >
      <StatusNote />
      <p>
        This is a category sketch, not a competitor roast and not a list of partners. XEROPAY is
        specified for the empty cell: a self-custodial shielded balance that still does the jobs of
        a bank account.
      </p>
      <div className="mt-4">
        <DocsTable
          columns={["Category", "What exists", "What is missing"]}
          rows={[
            [
              "Mixers / hop tools",
              "Hide a transfer, then dump you on a public wallet",
              "A balance that stays private and keeps working",
            ],
            [
              "Public wallets",
              "Hold, swap, earn — fully readable",
              "Any privacy of salary, holdings, or counterparties",
            ],
            [
              "Custodial neobanks",
              "UX of an account",
              "Self-custody and an unreadable chain statement",
            ],
            [
              "Shielded pools (transfer-only)",
              "Encrypted notes for a hop",
              "Yield, payroll, spend rails, scoped disclosure",
            ],
          ]}
        />
      </div>
      <section>
        <DocsH2>Principles we use to stay in the right cell</DocsH2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>An account, not a mixer.</li>
          <li>Private money has to keep working.</li>
          <li>Compliance is a feature: edge plus keys you issue.</li>
          <li>Revenue before token.</li>
        </ul>
      </section>
    </DocsPage>
  );
}
