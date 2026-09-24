import { DocsH2, DocsPage, StatusNote } from "@/components/docs/DocsArticle";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why multi-chain — Docs",
  description:
    "Public wallets leak salary and holdings on every chain people actually use. XEROPAY is specified as an account layer above those chains — not a single-network story.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/why-multi-chain"
      title="Why multi-chain"
      lede="The leak is not unique to one L2. Salary, runway, and brokerage-shaped positions are public wherever people hold them."
    >
      <StatusNote />
      <p>
        Privacy products often pick a home chain and write as if the world lives there. XEROPAY does
        not. People already hold stablecoins and tokenized stocks on more than one network. The
        explorer problem follows the address, not the brand of the rollup.
      </p>
      <section>
        <DocsH2>What a public address publishes</DocsH2>
        <p className="mt-3">
          Once payroll-grade cash and equity tokens sit in the same wallet, anyone with the address
          can read income, holdings, cost basis, and who you pay. That is true on any transparent
          ledger. A “private hop” that exits back to that wallet does not fix it.
        </p>
      </section>
      <section>
        <DocsH2>What we will not claim</DocsH2>
        <p className="mt-3">
          This site does not list a canonical chain ID, RPC, explorer, or “add to wallet” snippet as
          if settlement were live. When a network is actually underwritten, it will be named here
          with the same status discipline as the rest of the docs.
        </p>
      </section>
      <section>
        <DocsH2>What the account layer is for</DocsH2>
        <p className="mt-3">
          Notes, stealth destinations, edge checks, and client-side decryption are specified so the
          jobs of an account — hold, earn, pay, spend, prove — can happen without a public
          statement. See{" "}
          <Link href="/docs/how-it-works" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
            How it works
          </Link>{" "}
          and{" "}
          <Link href="/docs/wallet" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
            Wallet and network
          </Link>
          .
        </p>
      </section>
    </DocsPage>
  );
}
