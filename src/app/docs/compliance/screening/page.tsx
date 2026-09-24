import { DocsH2, DocsPage, StatusNote } from "@/components/docs/DocsArticle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edge screening — Docs",
  description: "Sanctions and risk checks at shield and unshield. Association sets for hygienic exits.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/compliance/screening"
      title="Edge screening"
      lede="Checks live at the boundary. Privacy lives inside the pool."
    >
      <StatusNote />
      <p>
        Shield and unshield can be checked so sanctioned flow stays out of the pool. Identity
        still belongs with licensed ramps — that KYC file is not supposed to sit next to note
        history.
      </p>
      <section>
        <DocsH2>Association sets</DocsH2>
        <p className="mt-3">
          The edge can publish association sets so a withdrawal can prove it is not joined to
          known-tainted deposits — without revealing which notes you spent. That is how an issuer
          gets hygiene without a master viewing key.
        </p>
      </section>
      <section>
        <DocsH2>Time-decorrelated exits</DocsH2>
        <p className="mt-3">
          Withdrawals can be split and staggered so an unshield is harder to match to a shield by
          clock. Timing is a classic leak; the design treats it as one.
        </p>
      </section>
      <section>
        <DocsH2>What screening cannot do</DocsH2>
        <p className="mt-3">
          It cannot decrypt notes. It cannot freeze funds already inside except by refusing a later
          unshield. If a regulator needs a window into an account, that is a viewing key the holder
          issues — not a silent tap.
        </p>
      </section>
    </DocsPage>
  );
}
