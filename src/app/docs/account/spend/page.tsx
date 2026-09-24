import { DocsH2, DocsPage, StatusNote } from "@/components/docs/DocsArticle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spend rails — Docs",
  description:
    "Everyday spend from shielded notes, with limits and a kill switch. Networks are named when issuance is real.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/account/spend"
      title="Spend rails"
      lede="The account is built so day-to-day spend can settle from notes you control — without publishing every merchant."
    >
      <StatusNote />
      <p>
        A private account that cannot pay for coffee is a vault with extra steps. Spend is specified
        to settle from shielded balance, with per-device limits, freeze, and a kill switch you
        control.
      </p>
      <section>
        <DocsH2>No unshield-to-spend as the happy path</DocsH2>
        <p className="mt-3">
          Forcing an unshield before every purchase would republish the user at the worst moment.
          The intended path is pool-level settlement to a rail. The chain sees the pool act, not
          which account paid which merchant.
        </p>
      </section>
      <section>
        <DocsH2>What is not on this page</DocsH2>
        <p className="mt-3">
          No Visa, Mastercard, Apple Pay, or bank partner is listed as live. When underwriting and
          issuance are real, the partner names will appear here with the same status note as
          everything else. Until then, treat “card” copy on the wider web as unofficial.
        </p>
      </section>
      <section>
        <DocsH2>Controls</DocsH2>
        <p className="mt-3">
          Limits, freeze, and kill switch are account features, not issuer afterthoughts. A lost
          device should be stoppable without waiting on a call centre that can also see your
          history.
        </p>
      </section>
    </DocsPage>
  );
}
