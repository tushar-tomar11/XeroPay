import { DocsH2, DocsPage, StatusNote } from "@/components/docs/DocsArticle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vaults and consolidation — Docs",
  description: "Labelled buckets of notes, and background defragmentation so proofs stay fast.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/account/vaults"
      title="Vaults and consolidation"
      lede="Separate shielded buckets for saving, spending, and investing — without publishing the split."
    >
      <StatusNote />
      <section>
        <DocsH2>Vaults</DocsH2>
        <p className="mt-3">
          A vault is a labelled set of notes. Payroll can land in one. Spend limits can attach to
          another. Investing can stay apart. The explorer does not get a pie chart of how you
          allocated.
        </p>
        <p className="mt-3">
          Viewing keys can be scoped to a vault so an accountant sees the operating bucket and not
          the whole life.
        </p>
      </section>
      <section>
        <DocsH2>Consolidation</DocsH2>
        <p className="mt-3">
          Notes fragment as you receive, spend, and take change. Background consolidation is
          specified so proofs stay fast and fees stay low. It is plumbing. It should not create a
          public “reorg of your wallet” trail.
        </p>
      </section>
      <section>
        <DocsH2>What you still control</DocsH2>
        <p className="mt-3">
          Moving between vaults is still your spend. XEROPAY does not rebalance you. Sweep-to-yield
          is opt-in policy on a vault, not a silent siphon.
        </p>
      </section>
    </DocsPage>
  );
}
