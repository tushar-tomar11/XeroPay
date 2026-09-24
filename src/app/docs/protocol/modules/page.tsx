import { DocsH2, DocsPage, StatusNote } from "@/components/docs/DocsArticle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modules — Docs",
  description: "Intended modules around the pool. No live contract addresses.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/protocol/modules"
      title="Modules"
      lede="Named pieces of the design. Not a verified-contract list."
    >
      <StatusNote />
      <p>
        When contracts exist, this page will list names, chains, and addresses. Until then, treat
        every module as intended behaviour.
      </p>
      <section>
        <DocsH2>Around the pool</DocsH2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Pool — notes, commitments, nullifiers, proof verification.</li>
          <li>Screener — shield/unshield gates, association sets.</li>
          <li>Router — yield allocation when venues are live.</li>
          <li>Settlement — spend-rail batches.</li>
          <li>Payroll batcher — client-side assembly, on-chain one-shot verify.</li>
          <li>Disclosure — viewing-key verification and attestation circuits.</li>
          <li>Relayer / paymaster — submission and gas.</li>
        </ul>
      </section>
      <section>
        <DocsH2>What we will not paste</DocsH2>
        <p className="mt-3">
          No placeholder 0x addresses. No copied bytecode. No “verified on explorer” badges.
        </p>
      </section>
    </DocsPage>
  );
}
