import {
  DocsH2,
  DocsLinkRow,
  DocsPage,
  DocsTable,
  StatusNote,
} from "@/components/docs/DocsArticle";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The compliance model — Docs",
  description:
    "Privacy inside the pool. Checks at its boundary. Disclosure you issue, scope, and revoke.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/compliance"
      title="The model"
      lede="Built in, not bolted on. Screening at the edge. No permanent back door."
    >
      <StatusNote />
      <p>
        Counterparties say yes when they can check the perimeter and when you can prove a fact
        without opening the account. They say no to a mixer-shaped blob. XEROPAY is specified as
        the first, not the second.
      </p>
      <section>
        <DocsH2>Three layers</DocsH2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <Link href="/docs/compliance/screening" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
              Edge screening
            </Link>{" "}
            — enter and exit.
          </li>
          <li>
            <Link href="/docs/compliance/viewing-keys" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
              Viewing keys
            </Link>{" "}
            — scoped read access you issue.
          </li>
          <li>
            <Link href="/docs/compliance/attestations" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
              Attestations
            </Link>{" "}
            — yes-or-no proofs.
          </li>
        </ul>
      </section>
      <section>
        <DocsH2>Who sees what</DocsH2>
        <div className="mt-4">
          <DocsTable
            columns={["Party", "Public wallet", "XEROPAY"]}
            rows={[
              ["Accountant", "Screenshots and a shared sheet", "A key scoped to the filing window"],
              ["Auditor", "Full history, forever", "A read-only key that expires"],
              ["Lender", "A public balance they can watch", "A proof of balance above X"],
              ["Ramp / issuer", "Nothing but a mixer-shaped address", "Edge screening plus association-set proofs"],
              ["Counterparty", "Your whole balance from one payment", "A one-time stealth address"],
            ]}
          />
        </div>
        <div className="mt-4">
          <DocsLinkRow href="/compliance" label="Full marketing page" />
        </div>
      </section>
    </DocsPage>
  );
}
