import { DocsH2, DocsPage, StatusNote } from "@/components/docs/DocsArticle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glossary — Docs",
  description: "Words XEROPAY uses for notes, handles, keys, the edge, and proofs.",
};

const terms = [
  {
    t: "Note",
    d: "An encrypted unit of value in the shielded pool. The explorer does not read its amount, asset, or owner. Your spending key opens it.",
  },
  {
    t: "Commitment",
    d: "A public record that a note exists, without revealing its contents.",
  },
  {
    t: "Nullifier",
    d: "A public record that a note has been spent, without revealing which note. Stops double-spends.",
  },
  {
    t: "Stealth handle",
    d: "A name people can pay. Each payment derives a fresh receiving address so the handle never maps to a running balance.",
  },
  {
    t: "Spending key",
    d: "The key that opens notes, signs spends, and issues viewing keys. Stays on your device.",
  },
  {
    t: "Viewing key",
    d: "Read-only access, scoped in time and often in vault. You issue it. It cannot spend.",
  },
  {
    t: "Attestation",
    d: "A yes-or-no proof about the account (balance above X, held N months) without opening the notes.",
  },
  {
    t: "Edge",
    d: "Where funds enter or leave. Screening and licensed ramps live here, not beside your notes.",
  },
  {
    t: "Unshield",
    d: "Exit to a named destination after checks. Not a mixer hop.",
  },
  {
    t: "Vault",
    d: "A labelled bucket of notes — save, spend, invest — still shielded.",
  },
  {
    t: "Association set",
    d: "A published set used so an exit can prove it is not joined to known-tainted deposits, without revealing which notes you spent.",
  },
  {
    t: "Paymaster / relayer",
    d: "Intended path to submit proofs and cover gas so you do not hold a public gas token next to private funds.",
  },
  {
    t: "$XERO",
    d: "Intended utility token for tiers and fee discounts. Not the product. No contract on this site until live.",
  },
] as const;

export default function Page() {
  return (
    <DocsPage
      path="/docs/glossary"
      title="Glossary"
      lede="Short definitions for the words these docs repeat. Not a tokenomics appendix."
    >
      <StatusNote />
      <dl className="space-y-8">
        {terms.map((item) => (
          <div key={item.t}>
            <DocsH2>{item.t}</DocsH2>
            <dd className="mt-2">{item.d}</dd>
          </div>
        ))}
      </dl>
    </DocsPage>
  );
}
