import {
  CompareTable,
  FeatureGrid,
  PageHero,
} from "@/components/page/PagePrimitives";
import { PageCardVisual } from "@/components/page/PageCardVisual";
import { PageFrame } from "@/components/page/PageFrame";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business — XEROPAY",
  description:
    "Payroll, treasury, checkout, and invoicing that do not leak salary bands or customer graphs onto a public chain.",
};

const apiEvents = [
  { method: "POST", path: "/v1/shield", note: "Create a shielded note for a named payee." },
  { method: "POST", path: "/v1/unshield", note: "Exit to a named destination after screening." },
  { method: "GET", path: "/v1/notes", note: "Client-side decrypt — never a server-side balance." },
  { method: "POST", path: "/v1/webhooks", note: "Subscribe to settled / failed / disclosed events." },
] as const;

const checkoutSteps = [
  { n: "01", title: "Quote", body: "Checkout session with amount, asset, and expiry." },
  { n: "02", title: "Settle", body: "Customer pays from a shielded note or a fresh stealth address." },
  { n: "03", title: "Confirm", body: "Webhook fires settled. The public graph does not list your customers." },
] as const;

const invoiceStates = [
  { state: "Draft", body: "Internal only. Nothing on chain." },
  { state: "Issued", body: "Payee handle + amount. Fresh destination per invoice." },
  { state: "Paid", body: "Note lands in treasury. Optional viewing-key export." },
  { state: "Overdue", body: "Local reminder. No public dunning trail." },
] as const;

const seats = [
  { title: "Starter", body: "One operator, viewing keys, CSV export. For teams still mapping payroll." },
  { title: "Team", body: "Roles, approval thresholds, and a named support channel." },
  { title: "Enterprise", body: "SSO, custom screening policy, dedicated onboarding — scoped when you ask." },
] as const;

export default function BusinessPage() {
  return (
    <PageFrame>
      <main>
        <PageHero
          eyebrow="For teams"
          title="Run payroll and treasury without leaking the org chart"
          body="Businesses need private money that still integrates: APIs, roles, invoices, and checkout — without publishing salary bands or customer graphs."
          primary={{ href: "/dapp", label: "Request access" }}
          secondary={{ href: "/docs", label: "Read the docs" }}
          visual={
            <PageCardVisual
              chips={[
                { label: "Payroll", caption: "Compensation stays a note, not a public payslip." },
                { label: "Treasury", caption: "Runway is not an explorer query." },
                { label: "Checkout", caption: "Customers pay without a public graph of who they are." },
              ]}
            />
          }
        />

        <div className="mx-auto max-w-[1120px] space-y-10 px-5 pb-16 lg:px-10">
          <section id="payroll" className="scroll-mt-28">
            <p className="text-[12px] font-medium tracking-[0.22em] text-[#9AA6FF]/80 uppercase">Payroll</p>
            <h2 className="mt-3 text-[26px] font-semibold tracking-[-0.03em] text-[#F7F7FA] sm:text-[32px]">
              Compensation that isn&apos;t a public spreadsheet
            </h2>
            <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-[#C5C8D4]">
              On a public chain, payroll is a spreadsheet anyone can scrape. XEROPAY is designed so
              each employee receives into a stealth address, with roles for who can approve, and
              viewing keys for auditors.
            </p>
            <div className="mt-6">
              <FeatureGrid
                items={[
                  { title: "Roles", body: "Separates who can initiate from who can approve a run." },
                  { title: "Thresholds", body: "Large runs wait for a second operator." },
                  { title: "Batch files", body: "CSV in, shielded notes out — without a public payslip." },
                ]}
              />
            </div>
          </section>

          <section id="treasury" className="scroll-mt-28">
            <p className="text-[12px] font-medium tracking-[0.22em] text-[#9AA6FF]/80 uppercase">Treasury</p>
            <h2 className="mt-3 text-[26px] font-semibold tracking-[-0.03em] text-[#F7F7FA] sm:text-[32px]">
              Runway that isn&apos;t an explorer query
            </h2>
            <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-[#C5C8D4]">
              Competitors, journalists, and anyone with a block explorer can currently read a
              protocol&apos;s treasury in real time. A shielded treasury is designed so only operators
              and named auditors see the books.
            </p>
            <div className="mt-6">
              <CompareTable
                caption="Public treasury versus XEROPAY"
                columns={["", "Public treasury", "XEROPAY"]}
                rows={[
                  { label: "Runway", publicValue: "Visible to anyone", xero: "Encrypted notes" },
                  { label: "Payroll", publicValue: "Salary graph", xero: "Stealth destinations" },
                  { label: "Vendors", publicValue: "Every invoice on-chain", xero: "Private settlement, optional proof" },
                ]}
              />
            </div>
          </section>

          <section id="api" className="scroll-mt-28 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <p className="text-[12px] font-medium tracking-[0.22em] text-[#9AA6FF]/80 uppercase">API and webhooks</p>
            <h2 className="mt-3 text-[26px] font-semibold tracking-[-0.03em] text-[#F7F7FA] sm:text-[32px]">
              Integrate without a public webhook dump
            </h2>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div>
                <p className="text-[16px] leading-[1.75] text-[#C5C8D4]">
                  REST-shaped endpoints for shield, unshield, and note queries. Events fire when a
                  payment settles, fails, or a viewing key is disclosed. There is no public sandbox
                  key yet — this is the intended surface, not a live contract list.
                </p>
                <ul className="mt-5 space-y-3 text-[14px] leading-[1.65] text-[#A6A9B5]">
                  <li>Auth is scoped per workspace, not a single shared wallet.</li>
                  <li>Webhooks retry on failure; payloads never include decrypted balances.</li>
                  <li>Idempotency keys on money-moving calls.</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5 font-mono text-[13px]">
                <p className="mb-3 text-[11px] tracking-[0.16em] text-[#9AA6FF] uppercase">Intended surface</p>
                <ul className="space-y-3">
                  {apiEvents.map((row) => (
                    <li key={row.path} className="flex gap-3 border-b border-white/8 pb-3 last:border-0 last:pb-0">
                      <span className="shrink-0 text-[#8B5CF6]">{row.method}</span>
                      <span>
                        <span className="text-[#F7F7FA]">{row.path}</span>
                        <span className="mt-1 block font-sans text-[13px] text-[#8F93A3]">{row.note}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section id="merchants" className="scroll-mt-28 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <p className="text-[12px] font-medium tracking-[0.22em] text-[#9AA6FF]/80 uppercase">Checkout</p>
            <h2 className="mt-3 text-[26px] font-semibold tracking-[-0.03em] text-[#F7F7FA] sm:text-[32px]">
              Accept payment without a public customer graph
            </h2>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div>
                <p className="text-[16px] leading-[1.75] text-[#C5C8D4]">
                  Checkout is designed so a customer can pay from a shielded note or a one-time
                  stealth address. You receive confirmation; you do not inherit a public list of
                  every payer.
                </p>
                <ul className="mt-5 space-y-3 text-[14px] leading-[1.65] text-[#A6A9B5]">
                  <li>Session expiry so unpaid quotes do not linger.</li>
                  <li>Amount + asset locked at quote time.</li>
                  <li>Refunds as new notes — not a reverse of a public tx.</li>
                </ul>
              </div>
              <ol className="space-y-3">
                {checkoutSteps.map((step) => (
                  <li
                    key={step.n}
                    className="flex gap-4 rounded-2xl border border-white/10 bg-black/25 p-4"
                  >
                    <span className="text-[12px] tracking-[0.16em] text-[#9AA6FF]">{step.n}</span>
                    <span>
                      <span className="block text-[15px] font-semibold text-[#F7F7FA]">{step.title}</span>
                      <span className="mt-1 block text-[14px] leading-[1.6] text-[#A6A9B5]">{step.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section id="invoicing" className="scroll-mt-28 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <p className="text-[12px] font-medium tracking-[0.22em] text-[#9AA6FF]/80 uppercase">Invoicing</p>
            <h2 className="mt-3 text-[26px] font-semibold tracking-[-0.03em] text-[#F7F7FA] sm:text-[32px]">
              Invoices that don&apos;t become a public ledger of clients
            </h2>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div>
                <p className="text-[16px] leading-[1.75] text-[#C5C8D4]">
                  Issue an invoice to a handle. Each one gets a fresh destination. Paid invoices
                  can export a proof for accounting without publishing the whole client list.
                </p>
                <ul className="mt-5 space-y-3 text-[14px] leading-[1.65] text-[#A6A9B5]">
                  <li>Line items stay local until you export them.</li>
                  <li>Partial payments attach to the same invoice, not a new public hash.</li>
                  <li>Voiding never leaves a public tombstone.</li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {invoiceStates.map((row) => (
                  <div key={row.state} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <p className="text-[13px] font-semibold text-[#F7F7FA]">{row.state}</p>
                    <p className="mt-2 text-[13px] leading-[1.55] text-[#A6A9B5]">{row.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="pricing" className="scroll-mt-28 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <p className="text-[12px] font-medium tracking-[0.22em] text-[#9AA6FF]/80 uppercase">Pricing</p>
            <h2 className="mt-3 text-[26px] font-semibold tracking-[-0.03em] text-[#F7F7FA] sm:text-[32px]">
              Pricing is not live. Access is.
            </h2>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div>
                <p className="text-[16px] leading-[1.75] text-[#C5C8D4]">
                  There is no public fee table yet. Early teams get a seat, a support channel, and
                  a written scope of what is actually live. When numbers exist, they will live here —
                  not as a teaser.
                </p>
                <ul className="mt-5 space-y-3 text-[14px] leading-[1.65] text-[#A6A9B5]">
                  <li>No invented APR, spread, or per-tx fee.</li>
                  <li>Enterprise terms are written, not implied by a slider.</li>
                  <li>Usage reports stay with the workspace.</li>
                </ul>
              </div>
              <div className="space-y-3">
                {seats.map((seat) => (
                  <div key={seat.title} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <p className="text-[15px] font-semibold text-[#F7F7FA]">{seat.title}</p>
                    <p className="mt-1 text-[14px] leading-[1.6] text-[#A6A9B5]">{seat.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </PageFrame>
  );
}
