import { DocsH2, DocsPage, DocsTable, StatusNote } from "@/components/docs/DocsArticle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API and webhooks — Docs",
  description: "Intended REST-shaped surface for shield, unshield, notes, and events. No public sandbox key yet.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/business/api"
      title="API and webhooks"
      lede="Integrate without a public webhook dump of decrypted balances."
    >
      <StatusNote />
      <p>
        REST-shaped endpoints for shield, unshield, and note queries. Events fire when a payment
        settles, fails, or a viewing key is disclosed. There is no public sandbox key yet — this is
        the intended surface, not a live contract list.
      </p>
      <div className="mt-4">
        <DocsTable
          columns={["Method", "Path", "Note"]}
          rows={[
            ["POST", "/v1/shield", "Create a shielded note for a named payee."],
            ["POST", "/v1/unshield", "Exit to a named destination after screening."],
            ["GET", "/v1/notes", "Client-side decrypt — never a server-side balance."],
            ["POST", "/v1/webhooks", "Subscribe to settled / failed / disclosed events."],
          ]}
        />
      </div>
      <section>
        <DocsH2>Rules of the surface</DocsH2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Auth is scoped per workspace, not a single shared wallet.</li>
          <li>Webhook payloads never include decrypted balances.</li>
          <li>Idempotency keys on money-moving calls.</li>
          <li>Retries on failed delivery; no public event log.</li>
        </ul>
      </section>
    </DocsPage>
  );
}
