import {
  DocsH2,
  DocsPage,
  DocsTable,
  StatusNote,
} from "@/components/docs/DocsArticle";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How it works — Docs",
  description:
    "Shield, hold, earn, spend, pay, prove, unshield — the lifecycle of money inside a XEROPAY account, and the two keys that control it.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/how-it-works"
      title="How it works"
      lede="Shield, hold, earn, spend, pay, prove: the lifecycle of money inside a XEROPAY account, and the two keys that control it."
    >
      <StatusNote />
      <p>
        XEROPAY is an account, not a mixer. The account is the product; the shielded pool underneath
        is plumbing. This page walks through what is supposed to happen to a unit of value from the
        moment it enters.
      </p>

      <section>
        <DocsH2>1. Shield</DocsH2>
        <p className="mt-3">
          Money enters through a licensed fiat ramp or a bridge. At the boundary of the pool it is
          screened: sanctioned sources are refused before anything is shielded. What passes lands as
          one or more encrypted notes bound to your spending key. From that moment the chain can see
          a deposit into a pool; it is not supposed to see whose balance grew. See{" "}
          <Link href="/docs/account/shield" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
            Shield and unshield
          </Link>
          .
        </p>
      </section>

      <section>
        <DocsH2>2. Hold</DocsH2>
        <p className="mt-3">
          A balance is the sum of the notes your spending key can open. Notes can hold stablecoins
          or tokenized stocks. Your app decrypts them locally; the XEROPAY server is not the source
          of positions. You can split notes across vaults for saving, spending, and investing. See{" "}
          <Link href="/docs/account" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
            The shielded account
          </Link>
          .
        </p>
      </section>

      <section>
        <DocsH2>3. Earn</DocsH2>
        <p className="mt-3">
          Shielded deposits are designed to pool and route into real yield venues. Returns are meant
          to credit per note, so you earn without a visible deposit, claim, or running balance.
          Auto-sweep can move idle balance into that pool on its own. Rates publish with venues, not
          before. See{" "}
          <Link href="/docs/account/yield" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
            Private yield
          </Link>
          .
        </p>
      </section>

      <section>
        <DocsH2>4. Spend and pay</DocsH2>
        <p className="mt-3">
          Everyday spend is specified to settle from shielded funds, with limits, freeze, and a kill
          switch — networks named only when issuance is real. Payments go to stealth addresses: a
          fresh receiving address per payment, so a shared handle cannot be scraped for a balance.
          Recurring rent and subscriptions are meant to run without a repeating on-chain cadence. A
          business can pay a roster from one treasury. See{" "}
          <Link href="/docs/account/spend" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
            Spend rails
          </Link>{" "}
          and{" "}
          <Link href="/docs/account/payments" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
            Payments
          </Link>
          .
        </p>
      </section>

      <section>
        <DocsH2>5. Prove</DocsH2>
        <p className="mt-3">
          When someone legitimately needs to see inside, you issue a viewing key: read-only, scoped
          to a date range, revocable, optionally self-expiring. When they only need a yes-or-no
          answer, you issue an attestation instead — balance above X, held N months. See{" "}
          <Link href="/docs/compliance/viewing-keys" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
            Viewing keys
          </Link>{" "}
          and{" "}
          <Link href="/docs/compliance/attestations" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
            Attestations
          </Link>
          .
        </p>
      </section>

      <section>
        <DocsH2>6. Unshield</DocsH2>
        <p className="mt-3">
          Leaving the pool is screened again. Exits can be split and staggered so an unshield is
          harder to match to a shield by clock. Destinations are named. This is not a hop through a
          mixer.
        </p>
      </section>

      <section>
        <DocsH2>The two keys</DocsH2>
        <div className="mt-4">
          <DocsTable
            columns={["Key", "Can", "Cannot", "Held by"]}
            rows={[
              [
                "Spending key",
                "Open notes, sign spends, issue viewing keys",
                "—",
                "You. On-device; recoverable via guardians",
              ],
              [
                "Viewing key",
                "Read notes inside its scope and dates",
                "Spend, issue further keys, read outside scope",
                "Whoever you give it to, until expiry or revoke",
              ],
            ]}
          />
        </div>
        <p className="mt-4">
          There is no third key. XEROPAY is specified to hold no master viewing key and cannot move
          funds.
        </p>
      </section>

      <section>
        <DocsH2>What the chain sees</DocsH2>
        <div className="mt-4">
          <DocsTable
            columns={["Event", "Public", "Hidden"]}
            rows={[
              ["Shield", "A deposit into the pool, screened", "Whose balance it became"],
              ["Transfer inside the pool", "That a proof was verified", "Sender, recipient, amount, asset"],
              ["Yield credit", "Pool-level routing when venues are live", "Per-note accrual"],
              ["Spend / pay", "Pool-level settlement where a rail exists", "Which account paid"],
              ["Unshield", "A withdrawal from the pool, screened", "Which notes, when they were shielded"],
            ]}
          />
        </div>
      </section>
    </DocsPage>
  );
}
