import { DocsH2, DocsPage, StatusNote } from "@/components/docs/DocsArticle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Viewing keys — Docs",
  description: "Read-only, scoped, dated, revocable. No master key.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/compliance/viewing-keys"
      title="Viewing keys"
      lede="Show exactly what is needed, to exactly who needs it, for exactly as long."
    >
      <StatusNote />
      <p>
        A viewing key is read-only access to notes inside a scope: often a date range, often a
        vault. It cannot spend. It cannot issue further keys. You revoke it, or it expires itself.
      </p>
      <section>
        <DocsH2>Typical scopes</DocsH2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Accountant — tax year, operating vault.</li>
          <li>Auditor — a named period, treasury vault.</li>
          <li>Support — never, unless you issue a short key for a ticket you opened.</li>
        </ul>
      </section>
      <section>
        <DocsH2>Programmable expiry</DocsH2>
        <p className="mt-3">
          Set an end date. The key dies. No “we’ll remember to turn it off.” Memos in scope decrypt
          for the holder; memos outside do not.
        </p>
      </section>
      <section>
        <DocsH2>Local export</DocsH2>
        <p className="mt-3">
          CSV or PDF generated on your machine from a key you issued. That file is yours to send.
          It is not a server-side zip of the account.
        </p>
      </section>
    </DocsPage>
  );
}
