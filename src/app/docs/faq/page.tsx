import { DocsH2, DocsPage } from "@/components/docs/DocsArticle";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ — Docs",
  description: "Short answers about mixers, custody, status, $XERO, and disclosure.",
};

export default function Page() {
  return (
    <DocsPage path="/docs/faq" title="FAQ" lede="Short answers to the questions that come up first.">
      <section>
        <DocsH2>Is XEROPAY a mixer?</DocsH2>
        <p className="mt-3">
          No. A mixer takes coins in and gives unlinked coins out. XEROPAY is an account: a balance
          that stays in the pool, is designed to earn, pay, spend, and prove, with screening at the
          boundary and disclosure you control. See{" "}
          <Link href="/docs/how-it-works" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
            How it works
          </Link>
          .
        </p>
      </section>
      <section>
        <DocsH2>Can I deposit today?</DocsH2>
        <p className="mt-3">
          No. Join the{" "}
          <Link href="/dapp" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
            dApp waitlist
          </Link>
          . The site describes the product as specified. Product contracts are not claimed on
          mainnet.
        </p>
      </section>
      <section>
        <DocsH2>Can XEROPAY see my balance?</DocsH2>
        <p className="mt-3">
          No. Notes decrypt in your browser. See{" "}
          <Link href="/docs/compliance/what-xeropay-sees" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
            What XEROPAY sees
          </Link>
          .
        </p>
      </section>
      <section>
        <DocsH2>Can XEROPAY freeze or move my funds?</DocsH2>
        <p className="mt-3">
          It holds no spending key. It can refuse a deposit or a withdrawal at the pool edge on
          screening grounds; it cannot touch what is inside.
        </p>
      </section>
      <section>
        <DocsH2>What if I lose my phone?</DocsH2>
        <p className="mt-3">
          Recover through passkeys, hardware, and guardians. See{" "}
          <Link href="/docs/account/keys" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
            Keys and recovery
          </Link>
          .
        </p>
      </section>
      <section>
        <DocsH2>How does spend work if my money is hidden?</DocsH2>
        <p className="mt-3">
          Spend is specified to settle from shielded balance at the pool level. Partner networks are
          named when issuance is real — not as Visa/Mastercard decoration. See{" "}
          <Link href="/docs/account/spend" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
            Spend rails
          </Link>
          .
        </p>
      </section>
      <section>
        <DocsH2>Where does yield come from?</DocsH2>
        <p className="mt-3">
          From real venues the pool routes into, credited per note — a target, not a promise. No
          rate until venues are live. See{" "}
          <Link href="/docs/account/yield" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
            Private yield
          </Link>
          .
        </p>
      </section>
      <section>
        <DocsH2>Do I need $XERO?</DocsH2>
        <p className="mt-3">
          No. Every core feature is specified to work without it. $XERO only steps fees and limits
          when it exists. See{" "}
          <Link href="/docs/xero" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
            Token notes
          </Link>
          .
        </p>
      </section>
      <section>
        <DocsH2>Is staking or an airdrop coming?</DocsH2>
        <p className="mt-3">
          No staking requirement, no emissions-as-growth story on this site. Anything claiming
          otherwise is not from XEROPAY.
        </p>
      </section>
      <section>
        <DocsH2>Where is the $XERO contract?</DocsH2>
        <p className="mt-3">
          Not on this site. When a token is live, the address will be published with it. Any other
          contract, presale, or pool claiming to be $XERO is not ours.
        </p>
      </section>
      <section>
        <DocsH2>How do I show my accountant transactions?</DocsH2>
        <p className="mt-3">
          Issue a viewing key scoped to the filing window. See{" "}
          <Link href="/docs/compliance/viewing-keys" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
            Viewing keys
          </Link>
          .
        </p>
      </section>
      <section>
        <DocsH2>Is there a whitepaper PDF?</DocsH2>
        <p className="mt-3">
          No. These docs are the design. We will not invent a download to look finished.
        </p>
      </section>
    </DocsPage>
  );
}
