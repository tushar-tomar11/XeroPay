export type DocsLink = { href: string; label: string };

export type DocsGroup = { title: string; items: readonly DocsLink[] };

export const docsNav: readonly DocsGroup[] = [
  {
    title: "Start here",
    items: [
      { href: "/docs", label: "What is XEROPAY" },
      { href: "/docs/why-multi-chain", label: "Why multi-chain" },
      { href: "/docs/how-it-works", label: "How it works" },
      { href: "/docs/wallet", label: "Wallet and network" },
      { href: "/docs/glossary", label: "Glossary" },
    ],
  },
  {
    title: "Account",
    items: [
      { href: "/docs/account", label: "The shielded account" },
      { href: "/docs/account/shield", label: "Shield and unshield" },
      { href: "/docs/account/yield", label: "Private yield" },
      { href: "/docs/account/spend", label: "Spend rails" },
      { href: "/docs/account/payments", label: "Payments" },
      { href: "/docs/account/vaults", label: "Vaults and consolidation" },
      { href: "/docs/account/stocks", label: "Tokenized stocks" },
      { href: "/docs/account/keys", label: "Keys and recovery" },
    ],
  },
  {
    title: "Business",
    items: [
      { href: "/docs/business", label: "Overview" },
      { href: "/docs/business/payroll", label: "Shielded payroll" },
      { href: "/docs/business/treasury", label: "Treasury controls" },
      { href: "/docs/business/api", label: "API and webhooks" },
      { href: "/docs/business/checkout", label: "Merchant checkout" },
      { href: "/docs/business/invoicing", label: "Invoicing" },
      { href: "/docs/business/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Compliance",
    items: [
      { href: "/docs/compliance", label: "The model" },
      { href: "/docs/compliance/screening", label: "Edge screening" },
      { href: "/docs/compliance/viewing-keys", label: "Viewing keys" },
      { href: "/docs/compliance/attestations", label: "Attestations" },
      { href: "/docs/compliance/what-xeropay-sees", label: "What XEROPAY sees" },
    ],
  },
  {
    title: "$XERO",
    items: [
      { href: "/docs/xero", label: "Token notes" },
      { href: "/docs/xero/tiers", label: "Tiers and fee discounts" },
    ],
  },
  {
    title: "Protocol",
    items: [
      { href: "/docs/protocol", label: "Architecture" },
      { href: "/docs/protocol/modules", label: "Modules" },
      { href: "/docs/protocol/security", label: "Security model" },
      { href: "/docs/protocol/fees", label: "Fees" },
    ],
  },
  {
    title: "Reference",
    items: [
      { href: "/docs/landscape", label: "Landscape" },
      { href: "/docs/faq", label: "FAQ" },
      { href: "/docs/changelog", label: "Changelog" },
    ],
  },
] as const;

export const docsSequence: readonly DocsLink[] = docsNav.flatMap((g) => [...g.items]);
