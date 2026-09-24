import { DocsH2, DocsPage, StatusNote } from "@/components/docs/DocsArticle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security model — Docs",
  description: "What the design protects, what it does not, and who holds which key.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/protocol/security"
      title="Security model"
      lede="Self-custodial notes, edge checks, no master viewing key. This is a threat sketch, not an audit."
    >
      <StatusNote />
      <section>
        <DocsH2>In scope (design)</DocsH2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>A third party with an explorer cannot read your balance, positions, or counterparties.</li>
          <li>XEROPAY cannot move funds or decrypt notes.</li>
          <li>A viewing-key holder cannot spend or widen their own scope.</li>
          <li>Double-spends are rejected via nullifiers.</li>
          <li>Sanctioned flow can be refused at the edge.</li>
        </ul>
      </section>
      <section>
        <DocsH2>Out of scope / residual</DocsH2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>A compromised device that holds the spending key.</li>
          <li>A guardian set you chose poorly.</li>
          <li>Side channels at the edge (you still interact with ramps that see fiat identity).</li>
          <li>Bugs in unreleased circuits and contracts — there is no audit report to link.</li>
          <li>Network-level metadata of who talked to a relayer, until that is designed away.</li>
        </ul>
      </section>
      <section>
        <DocsH2>Device controls</DocsH2>
        <p className="mt-3">
          Per-device limits, freeze, and a kill switch are how a stolen phone is not an unbounded
          drain. They do not replace key hygiene.
        </p>
      </section>
    </DocsPage>
  );
}
