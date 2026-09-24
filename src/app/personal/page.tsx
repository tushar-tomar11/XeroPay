import {
  CompareTable,
  FeatureGrid,
  PageHero,
} from "@/components/page/PagePrimitives";
import { PageCardVisual } from "@/components/page/PageCardVisual";
import { PageFrame } from "@/components/page/PageFrame";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal — XEROPAY",
  description:
    "Six things people do with money every month, and what changes when the balance cannot be read off a block explorer.",
};

const cases = [
  {
    id: "get-paid",
    n: "01",
    title: "Get paid privately",
    tags: ["Stealth handles", "Shielded payroll", "Invoicing"],
    publicValue:
      "Every salary or invoice lands in a public wallet. Anyone with the address can read income to the cent.",
    xero: "Your handle can receive each payment at a fresh address and shield it on arrival. Your income is yours to know.",
  },
  {
    id: "save",
    n: "02",
    title: "Save and keep earning",
    tags: ["Private yield", "Auto-sweep", "Vaults"],
    publicValue: "Most privacy tools turn a hidden balance into dead capital the moment you conceal it.",
    xero: "A shielded balance is designed to keep working. Yield is credited per note — without publishing the strategy.",
  },
  {
    id: "spend",
    n: "03",
    title: "Spend from the account",
    tags: ["Shielded spend", "Limits", "Kill switch"],
    publicValue: "Spending from a public wallet publishes merchants, timing, and often an unshield step.",
    xero: "Everyday spend is meant to settle from shielded funds, with limits and a kill switch you control. Networks are named when they are live.",
  },
  {
    id: "pay",
    n: "04",
    title: "Pay rent, friends, subscriptions",
    tags: ["Private recurring", "Stealth handles", "Escrow"],
    publicValue: "The same amount, to the same address, on the same day is the easiest pattern on a public chain.",
    xero: "Recurring payments can run inside the pool: a fresh stealth address each time, no repeating trail.",
  },
  {
    id: "invest",
    n: "05",
    title: "Hold tokenized stocks",
    tags: ["Private DCA", "Fresh notes", "Corporate actions"],
    publicValue: "Every fill is public: ticker, size, cost basis, cadence. A brokerage statement anyone can read.",
    xero: "Each buy can settle into a fresh note. Positions stay hidden; dividends and splits are still designed to reach you.",
  },
  {
    id: "prove",
    n: "06",
    title: "Prove it when you need to",
    tags: ["Viewing keys", "Proof of funds", "Local export"],
    publicValue: "You either share the whole wallet history or a screenshot nobody should have to trust.",
    xero: "Give an accountant a viewing key scoped to a period. Give a lender a proof of funds. Both can expire.",
  },
] as const;

export default function PersonalPage() {
  return (
    <PageFrame>
      <main>
        <PageHero
          eyebrow="For you"
          title="Money that stays yours to know"
          body="Six things people do with money every month, and what changes when the balance cannot be read off a block explorer."
          primary={{ href: "/dapp", label: "dApp access" }}
          secondary={{ href: "/account", label: "How the account works" }}
          visual={
            <PageCardVisual
              chips={[
                { label: "Paid", caption: "Income lands as notes — not a public payslip." },
                { label: "Save", caption: "A hidden balance is still meant to keep working." },
                { label: "Prove", caption: "Scoped keys instead of your whole history." },
              ]}
            />
          }
        />

        <div className="mx-auto max-w-[1120px] space-y-8 px-5 pb-16 lg:px-10">
          <p className="max-w-3xl text-[16px] leading-[1.75] text-[#C5C8D4]">
            Each use case is the same shape: what a public wallet publishes, and what changes when
            the account is shielded. Indentation, spacing, and card height stay identical down the page.
          </p>

          {cases.map((item) => (
            <article
              key={item.id}
              id={item.id}
              className="scroll-mt-28 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                <span className="text-[12px] tracking-[0.2em] text-[#9AA6FF]/80 uppercase">{item.n}</span>
                <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-[#F7F7FA] sm:text-[26px]">
                  {item.title}
                </h2>
              </div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] tracking-[0.08em] text-[#9AA0B0] uppercase"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid gap-4 md:grid-cols-2 md:gap-6">
                <div className="flex min-h-[148px] flex-col rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-[11px] tracking-[0.16em] text-[#8B90A3] uppercase">On a public wallet</p>
                  <p className="mt-3 flex-1 text-[15px] leading-[1.7] text-[#A6A9B5]">{item.publicValue}</p>
                </div>
                <div className="flex min-h-[148px] flex-col rounded-2xl border border-[#5B8CFF]/25 bg-[#5B8CFF]/[0.07] p-5">
                  <p className="text-[11px] tracking-[0.16em] text-[#9AA6FF] uppercase">With XEROPAY</p>
                  <p className="mt-3 flex-1 text-[15px] leading-[1.7] text-[#D7DAE6]">{item.xero}</p>
                </div>
              </div>
            </article>
          ))}

          <section className="pt-4">
            <h2 className="text-[26px] font-semibold tracking-[-0.03em] text-[#F7F7FA] sm:text-[32px]">
              It works like a bank account. It just doesn&apos;t publish your statement.
            </h2>
            <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-[#C5C8D4]">
              Open it with a passkey. Fund it through a licensed ramp. Everything after that is designed
              to happen inside a shielded pool, with screening at the edge and a viewing key only you
              can issue.
            </p>
            <div className="mt-8">
              <FeatureGrid
                items={[
                  { title: "Stealth handles", body: "A shared name that never reveals a running balance." },
                  { title: "Vaults", body: "Separate shielded buckets for saving, spending, and investing." },
                  { title: "Client-side dashboard", body: "Notes decrypt in your browser. The server is not supposed to see positions." },
                ]}
              />
            </div>
            <div className="mt-8">
              <CompareTable
                caption="Public wallet versus XEROPAY"
                columns={["", "Public wallet", "XEROPAY"]}
                rows={[
                  { label: "Balance", publicValue: "Exact, to the cent", xero: "Encrypted notes" },
                  { label: "Salary", publicValue: "Every incoming payment", xero: "Shielded on arrival" },
                  { label: "Who you pay", publicValue: "Every counterparty, forever", xero: "A one-time stealth address" },
                ]}
              />
            </div>
          </section>
        </div>
      </main>
    </PageFrame>
  );
}
