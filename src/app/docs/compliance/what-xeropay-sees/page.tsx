import { DocsH2, DocsPage, DocsTable, StatusNote } from "@/components/docs/DocsArticle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What XEROPAY sees — Docs",
  description: "The server is not the source of positions. Notes decrypt in the browser.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/compliance/what-xeropay-sees"
      title="What XEROPAY sees"
      lede="Client-side portfolio. No master viewing key. Edge sees deposits and withdrawals — not your notes."
    >
      <StatusNote />
      <div className="mt-2">
        <DocsTable
          columns={["Component", "Sees", "Does not see"]}
          rows={[
            ["Client", "Everything, locally", "—"],
            ["Pool (when live)", "Commitments, nullifiers, proof validity", "Amounts, owners, assets"],
            ["Edge screener", "Deposit and withdrawal addresses", "Notes inside the pool"],
            ["Relayer / paymaster", "That a proof was submitted", "Note contents"],
            ["XEROPAY servers", "Account metadata you choose to store", "Decrypted balances"],
          ]}
        />
      </div>
      <section>
        <DocsH2>No master key</DocsH2>
        <p className="mt-3">
          Every disclosure is scoped, time-boxed, and issued by you. Support cannot “just look.” If
          a future jurisdiction required a back door, that would be a different product — and these
          docs would say so.
        </p>
      </section>
      <section>
        <DocsH2>Metadata we may hold</DocsH2>
        <p className="mt-3">
          Email for the waitlist. Workspace members for business seats. Webhook endpoints you
          configure. That is not a shadow ledger of notes.
        </p>
      </section>
    </DocsPage>
  );
}
