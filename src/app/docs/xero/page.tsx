import {
  DocsH2,
  DocsLinkRow,
  DocsPage,
  StatusNote,
} from "@/components/docs/DocsArticle";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Token notes — Docs",
  description: "Intended $XERO utility. No contract address on this site until it is live.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/xero"
      title="Token notes"
      lede="A utility token. Not the product. The account is specified to work without it."
    >
      <StatusNote />
      <p>
        $XERO is described as the protocol token for intended utility — tiers and fee discounts —
        not as a live listing, not with a contract address, and not with a circulating supply.
        Those fields stay empty until they are real.
      </p>
      <section>
        <DocsH2>What you will not find here</DocsH2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>A contract address or explorer link presented as current.</li>
          <li>APY, unlock charts, launchpad tickers, or a whitepaper PDF we have not published.</li>
          <li>A comparison to another chain&apos;s token as if it were ours.</li>
          <li>Staking, emissions, or an airdrop story.</li>
        </ul>
      </section>
      <section>
        <DocsH2>Until an official address exists</DocsH2>
        <p className="mt-3">
          Any ticker, pool, or contract claiming to be $XERO is not ours. Do not send funds to it.
          When the token is live, the only official address will be published here and on the{" "}
          <Link href="/xero" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
            $XERO page
          </Link>
          .
        </p>
        <div className="mt-4">
          <DocsLinkRow href="/docs/xero/tiers" label="Tiers and fee discounts" />
        </div>
      </section>
    </DocsPage>
  );
}
