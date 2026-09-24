import { DocsH2, DocsPage, StatusNote } from "@/components/docs/DocsArticle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Attestations — Docs",
  description: "Yes-or-no proofs about a shielded account without opening the notes.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/compliance/attestations"
      title="Attestations"
      lede="Prove it without revealing it. Lenders and counterparties get an answer, not a statement."
    >
      <StatusNote />
      <p>
        When the other party only needs a fact, a viewing key is too much. An attestation is a
        proof that a statement about the notes is true: balance above X, held for N months, not in
        a tainted association set.
      </p>
      <section>
        <DocsH2>Examples in the design</DocsH2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Proof of funds — yes or no, without opening the account.</li>
          <li>Collateral attestation — a lender accepts a proof of shielded holdings.</li>
          <li>Hygiene — an exit can prove it is not joined to a published bad set.</li>
        </ul>
      </section>
      <section>
        <DocsH2>What attestations are not</DocsH2>
        <p className="mt-3">
          They are not a standing feed. They are not a screenshot. They are not a promise that a
          particular circuit is deployed. When proofs ship, this page will name the statements they
          actually support.
        </p>
      </section>
    </DocsPage>
  );
}
