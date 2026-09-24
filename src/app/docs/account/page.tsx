import {
  DocsH2,
  DocsLinkRow,
  DocsPage,
  DocsTable,
  StatusNote,
} from "@/components/docs/DocsArticle";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The shielded account — Docs",
  description:
    "Encrypted note balances for stablecoins and tokenized stocks. Holdings stay hidden while the jobs of an account keep working.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/account"
      title="The shielded account"
      lede="Encrypted note balances for stablecoins and tokenized stocks. Holdings, sizes, and cost basis stay hidden. Yield, payments, and proofs are designed to keep working."
    >
      <StatusNote />
      <p>
        A XEROPAY account looks like a neobank account: a handle, a balance, statements. The
        difference is where the balance lives. Instead of a public wallet address, it is a set of
        encrypted notes that only your spending key can open.
      </p>

      <section>
        <DocsH2>What&apos;s in the account</DocsH2>
        <div className="mt-4">
          <DocsTable
            columns={["Surface", "What it does", "Docs"]}
            rows={[
              ["Shielded balance", "Stablecoins and tokenized stocks as encrypted notes", "this page"],
              ["Shield / unshield", "Screened entry and exit, identity-separated ramps", "Shield and unshield"],
              ["Private yield", "Pooled routing, credited per note when venues are live", "Yield"],
              ["Spend rails", "Everyday spend from notes, with limits and a kill switch", "Spend rails"],
              ["Payments", "Stealth handles, recurring, escrow, invoicing", "Payments"],
              ["Vaults", "Sub-accounts and note consolidation", "Vaults"],
              ["Tokenized stocks", "Corporate actions for shielded holders", "Stocks"],
              ["Keys", "Spending key, passkeys, hardware, guardians, gas", "Keys"],
              ["Disclosure", "Viewing keys and attestations", "Compliance"],
            ]}
          />
        </div>
        <p className="mt-3 text-[14px] text-[#8F93A3]">
          Linked pages live under Account, Spend, and Compliance in the sidebar.
        </p>
      </section>

      <section>
        <DocsH2>What the explorer sees</DocsH2>
        <div className="mt-4">
          <DocsTable
            columns={["", "Public wallet", "XEROPAY"]}
            rows={[
              ["Balance", "Exact, to the cent, for anyone", "Encrypted notes; nothing to read"],
              ["Positions", "Every token and every size", "Hidden, including tokenized stocks"],
              ["Cost basis", "Every fill, timestamped", "Each buy can settle into a fresh note"],
              ["Salary", "Every incoming payment", "One line inside a shielded payroll batch"],
              ["Who you pay", "Every counterparty, forever", "A one-time stealth address"],
              ["Yield", "Every deposit and every claim", "Credited inside the pool"],
            ]}
          />
        </div>
      </section>

      <section>
        <DocsH2>Client-side by design</DocsH2>
        <p className="mt-3">
          Notes decrypt in your browser with your spending key. The dashboard, statements, and tax
          export are generated locally. The server is not supposed to see positions. See{" "}
          <Link href="/docs/compliance/what-xeropay-sees" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
            What XEROPAY sees
          </Link>
          .
        </p>
      </section>

      <section>
        <DocsH2>Encrypted memos</DocsH2>
        <p className="mt-3">
          Every transaction can carry a private bookkeeping label. Memos are encrypted with the
          note, readable only by you or by a viewing-key holder whose scope covers them.
        </p>
      </section>

      <section>
        <DocsH2>Self-custodial</DocsH2>
        <p className="mt-3">
          Your spending key is generated and kept on your device. XEROPAY cannot move funds, cannot
          decrypt notes, and cannot issue a viewing key on your behalf. Recovery goes through your
          guardians, not through us.
        </p>
        <div className="mt-4">
          <DocsLinkRow href="/account" label="Full marketing page" />
        </div>
      </section>
    </DocsPage>
  );
}
