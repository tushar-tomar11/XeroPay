import { DocsH2, DocsPage } from "@/components/docs/DocsArticle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog — Docs",
  description: "Design-status notes for this site. Not a protocol release log.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/changelog"
      title="Changelog"
      lede="What the documentation currently states — not a mainnet release feed."
    >
      <section>
        <DocsH2>2026 — Docs depth</DocsH2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            Full docs IA: Start here, Account, Business, Compliance, $XERO, Protocol, Reference —
            matching the article set people expect from a product docs site.
          </li>
          <li>
            Index: why it exists, what&apos;s live table, how the docs are organised, quick links.
          </li>
          <li>Why multi-chain (no home-chain costume). How it works lifecycle + two keys + what the chain sees.</li>
          <li>Account: shield/unshield, yield, spend rails, payments, vaults, stocks, keys.</li>
          <li>Business: payroll, treasury, API, checkout, invoicing, pricing.</li>
          <li>Compliance: screening, viewing keys, attestations, what XEROPAY sees.</li>
          <li>Protocol: architecture, modules, security, fees. Landscape and expanded FAQ.</li>
          <li>Still no whitepaper PDF, no live $XERO address, no invented card network.</li>
        </ul>
      </section>
      <section>
        <DocsH2>2026 — Site</DocsH2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Docs shell with sticky sidebar.</li>
          <li>Personal: one article, six equal use-case blocks.</li>
          <li>Business marketing: two-column API, checkout, invoicing, and pricing panels.</li>
          <li>Shared card visual with pointer tilt on inner pages.</li>
        </ul>
      </section>
    </DocsPage>
  );
}
