import { DocsH2, DocsPage, DocsTable, StatusNote } from "@/components/docs/DocsArticle";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Architecture — Docs",
  description:
    "A note-based shielded pool with routing, disclosure, and settlement modules around it. Design status — not a deployed spec dump.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/protocol"
      title="Architecture"
      lede="A UTXO-style ledger of encrypted notes, with modules around it. What each part does and what it can see."
    >
      <StatusNote />
      <p>
        XEROPAY is specified as a note-based shielded pool — commitments and nullifiers, in the
        tradition of Zcash-style designs — with modules for yield routing, spend settlement, payroll
        batching, and controlled disclosure. Zero-knowledge proofs let a contract verify that a
        transaction is valid (notes exist, are unspent, and balance) without learning what it
        contains. No chain, circuit, or address is claimed live.
      </p>
      <section>
        <DocsH2>Components</DocsH2>
        <div className="mt-4">
          <DocsTable
            columns={["Component", "Role", "Sees"]}
            rows={[
              [
                "Shielded pool",
                "Holds assets; records commitments and nullifiers; verifies proofs",
                "Commitments, nullifiers, proof validity — not amounts, owners, or assets",
              ],
              [
                "Edge screener",
                "Gates shield and unshield; publishes association sets",
                "Deposit and withdrawal addresses",
              ],
              [
                "Yield router",
                "Allocates pool capital; credits returns per note",
                "Pool-level allocation only",
              ],
              [
                "Settlement module",
                "Settles spend-rail batches from the pool",
                "Batch totals",
              ],
              ["Batcher", "Builds payroll batches", "Nothing; runs in the client"],
              ["Disclosure", "Viewing keys and attestations", "Proof validity"],
              [
                "Relayer + paymaster",
                "Submits proofs; pays gas",
                "That a proof was submitted",
              ],
              [
                "Client",
                "Keys, decryption, proofs, dashboard, exports",
                "Everything, locally",
              ],
            ]}
          />
        </div>
      </section>
      <section>
        <DocsH2>A transaction, end to end</DocsH2>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li>
            The client selects notes to spend, builds new notes for recipients (and change), and
            generates a proof that inputs equal outputs, inputs are unspent, and the signer owns
            them.
          </li>
          <li>
            The relayer submits the proof. The pool checks it, records new commitments, and records
            nullifiers so spent notes cannot be spent again.
          </li>
          <li>Recipients scan for notes encrypted to their key and add them to their balance.</li>
        </ol>
      </section>
      <section>
        <DocsH2>Where privacy comes from</DocsH2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Commitments hide note contents; nullifiers prevent double-spends without revealing which note.</li>
          <li>Stealth addresses unlink payments to the same handle.</li>
          <li>Pool-level yield and settlement mean the chain sees the pool act, not the account.</li>
          <li>Time decorrelation and consolidation break timing and amount links between entry and exit.</li>
        </ul>
      </section>
      <section>
        <DocsH2>Where compliance comes from</DocsH2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Edge screening at shield and unshield.</li>
          <li>Association sets so withdrawals can prove hygiene.</li>
          <li>Viewing keys and attestations issued by the account holder only.</li>
        </ul>
        <p className="mt-3">
          See{" "}
          <Link href="/docs/protocol/security" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
            Security model
          </Link>{" "}
          for what this does and does not protect against.
        </p>
      </section>
    </DocsPage>
  );
}
