import { DocsH2, DocsPage, StatusNote } from "@/components/docs/DocsArticle";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payments — Docs",
  description: "Stealth handles, private recurring, escrow, invoicing, and time-decorrelated exits.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/account/payments"
      title="Payments"
      lede="Pay without leaving a pattern. A shared name should never become a scrapeable balance."
    >
      <StatusNote />
      <section>
        <DocsH2>Stealth handles</DocsH2>
        <p className="mt-3">
          A handle is a name people can remember. Each payment derives a fresh receiving address.
          Publishing the handle does not publish the running total. That is the difference from
          posting a public address in a bio.
        </p>
      </section>
      <section>
        <DocsH2>Private recurring</DocsH2>
        <p className="mt-3">
          Rent, retainers, and subscriptions are the easiest pattern on a transparent chain: same
          amount, same destination, same day. Recurring inside the pool is specified to use a new
          stealth destination each time so cadence does not become a fingerprint.
        </p>
      </section>
      <section>
        <DocsH2>Escrow and invoices</DocsH2>
        <p className="mt-3">
          Shielded escrow keeps amount and counterparty hidden until release. Invoices can send a
          link whose arrival shields without publishing the amount. Business invoicing has its own
          page:{" "}
          <Link href="/docs/business/invoicing" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
            Invoicing
          </Link>
          .
        </p>
      </section>
      <section>
        <DocsH2>Memos</DocsH2>
        <p className="mt-3">
          Encrypted labels travel with the note. They are for you and for a viewing-key holder — not
          for the explorer.
        </p>
      </section>
    </DocsPage>
  );
}
