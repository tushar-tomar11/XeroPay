import {
  DocsH2,
  DocsLinkRow,
  DocsPage,
  StatusNote,
} from "@/components/docs/DocsArticle";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Business overview — Docs",
  description:
    "Payroll, treasury, checkout, and invoicing that do not leak salary bands or customer graphs.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/business"
      title="Business overview"
      lede="Teams need private money that still integrates: roles, APIs, invoices, and checkout — without publishing the org chart."
    >
      <StatusNote />
      <p>
        On a public chain, payroll is a spreadsheet anyone can scrape. Treasury is an explorer
        query. Checkout is a customer graph. XEROPAY is specified so those jobs still exist, with
        the books readable only by operators and named auditors.
      </p>
      <section>
        <DocsH2>Surfaces</DocsH2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <Link href="/docs/business/payroll" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
              Shielded payroll
            </Link>{" "}
            — batch payouts, roles, thresholds.
          </li>
          <li>
            <Link href="/docs/business/treasury" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
              Treasury
            </Link>{" "}
            — runway that is not public, vaults, approvals.
          </li>
          <li>
            <Link href="/docs/business/api" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
              API and webhooks
            </Link>{" "}
            — intended REST-shaped surface, no live sandbox key.
          </li>
          <li>
            <Link href="/docs/business/checkout" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
              Checkout
            </Link>{" "}
            — quote, settle, confirm without a public payer list.
          </li>
          <li>
            <Link href="/docs/business/invoicing" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
              Invoicing
            </Link>{" "}
            — draft, issued, paid, overdue.
          </li>
          <li>
            <Link href="/docs/business/pricing" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
              Pricing
            </Link>{" "}
            — seats, not invented fee tables.
          </li>
        </ul>
        <div className="mt-4">
          <DocsLinkRow href="/business" label="Full marketing page" />
        </div>
      </section>
    </DocsPage>
  );
}
