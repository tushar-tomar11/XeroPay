import { DocsH2, DocsPage, StatusNote } from "@/components/docs/DocsArticle";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Wallet and network — Docs",
  description:
    "XEROPAY is multi-chain by design. Networks, RPCs, and explorers are named when they are live — not as decoration.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/wallet"
      title="Wallet and network"
      lede="The account sits above more than one chain. This page is about keys, gas, and what we refuse to fake."
    >
      <StatusNote />
      <p>
        There is no “add XEROPAY chain” snippet here, and no explorer URL presented as current.
        Until a network is live for the product, publishing those fields would be a costume.
      </p>
      <section>
        <DocsH2>What you hold</DocsH2>
        <p className="mt-3">
          A spending key on your device. Passkeys and hardware wallets are the intended openers.
          Guardians recover a lost device — they are not supposed to see your history by default.
          See{" "}
          <Link href="/docs/account/keys" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
            Keys and recovery
          </Link>
          .
        </p>
      </section>
      <section>
        <DocsH2>What the explorer sees</DocsH2>
        <p className="mt-3">
          Pool-level activity: commitments, nullifiers, proof validity. Not your running balance,
          counterparties, vault mix, or cost basis. If a surface would publish those, it is out of
          spec. See{" "}
          <Link href="/docs/protocol" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
            Architecture
          </Link>
          .
        </p>
      </section>
      <section>
        <DocsH2>Gas</DocsH2>
        <p className="mt-3">
          A relayer plus paymaster is designed to submit proofs and cover network fees so you are
          not forced to hold a public gas token beside private funds. That is a design note, not a
          live relayer URL.
        </p>
      </section>
      <section>
        <DocsH2>Client, not hosted wallet</DocsH2>
        <p className="mt-3">
          The dashboard decrypts notes in the browser. Connecting a public EOA to “see your XEROPAY
          balance” would defeat the product. The waitlist dApp on this site is access, not a
          custodian.
        </p>
      </section>
    </DocsPage>
  );
}
