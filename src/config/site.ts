export const personalLinks = [
  {
    href: "/personal#get-paid",
    label: "Get paid privately",
    description: "Salary and invoices land as shielded notes, not a public payslip.",
  },
  {
    href: "/personal#save",
    label: "Save and keep earning",
    description: "A private balance is still meant to work — not sit as dead capital.",
  },
  {
    href: "/personal#spend",
    label: "Spend from the account",
    description: "Pay from shielded funds without publishing every merchant to the chain.",
  },
  {
    href: "/personal#pay",
    label: "Pay rent, friends, subscriptions",
    description: "Recurring payments without a repeating on-chain pattern.",
  },
  {
    href: "/personal#invest",
    label: "Hold tokenized stocks",
    description: "Positions and cost basis stay off the explorer.",
  },
  {
    href: "/personal#prove",
    label: "Prove it when you need to",
    description: "Scoped, time-boxed disclosure instead of your whole history.",
  },
] as const;

export const businessLinks = [
  {
    href: "/business#payroll",
    label: "Shielded payroll",
    description: "Batch payouts from a private treasury. Recipients see only their line.",
  },
  {
    href: "/business#treasury",
    label: "Treasury controls",
    description: "Caps, approvals, and separate vaults on a balance outsiders cannot read.",
  },
  {
    href: "/business#invoicing",
    label: "Invoicing",
    description: "Send a payment link. Arrival can shield without publishing the amount.",
  },
  {
    href: "/business#merchants",
    label: "Merchant checkout",
    description: "Accept private payments without building the privacy layer yourself.",
  },
  {
    href: "/business#api",
    label: "API and webhooks",
    description: "Trigger payouts and reconcile from your own systems.",
  },
  {
    href: "/business#pricing",
    label: "Pricing",
    description: "Seat-based access for finance teams — talk to us for roster pricing.",
  },
] as const;

export const footerPersonal = [
  { href: "/personal", label: "Use cases" },
  { href: "/personal", label: "Reserve a handle" },
  { href: "/account#balance", label: "Shielded balance" },
  { href: "/account#yield", label: "Private yield" },
  { href: "/account#card", label: "Card" },
  { href: "/account#payments", label: "Payments" },
  { href: "/account#keys", label: "Keys and recovery" },
] as const;

export const footerBusiness = [
  { href: "/business#payroll", label: "Shielded payroll" },
  { href: "/business#treasury", label: "Treasury" },
  { href: "/business#api", label: "API and webhooks" },
  { href: "/business#merchants", label: "Merchant checkout" },
  { href: "/business#invoicing", label: "Invoicing" },
] as const;

export const footerProtocol = [
  { href: "/compliance", label: "Compliance" },
  { href: "/compliance#viewing-keys", label: "Viewing keys" },
  { href: "/compliance#security", label: "Security" },
  { href: "/xero", label: "$XERO" },
  { href: "/account", label: "Multi-chain" },
] as const;

export const footerCompany = [
  { href: "/about", label: "About" },
  { href: "/docs", label: "Docs" },
  { href: "/dapp", label: "App" },
  { href: "/dapp", label: "Contact" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
] as const;

export const jobs = [
  {
    id: "pay",
    label: "Pay",
    title: "Pay without leaving a readable trail",
    body: "Payments can land at a fresh receiving address each time. Recurring rent, retainers, and subscriptions stay inside the account instead of repeating on a public ledger.",
  },
  {
    id: "prove",
    label: "Prove",
    title: "Show only what the other party needs",
    body: "Hand an accountant a scoped viewing key, or a lender a yes-or-no proof about a balance. Disclosure is read-only, time-boxed, and revocable by you.",
  },
  {
    id: "shield",
    label: "Shield",
    title: "Money enters screened, then encrypted",
    body: "Funds come in through a ramp or a bridge, can be checked at the edge, and land as notes only your spending key opens. The explorer does not get a running balance.",
  },
  {
    id: "earn",
    label: "Earn",
    title: "Hiding a balance should not kill it",
    body: "Shielded deposits are designed to keep working. Idle funds can sweep into yield venues in the background — without advertising the strategy on-chain.",
  },
  {
    id: "spend",
    label: "Spend",
    title: "Use the account like an account",
    body: "Day-to-day spend is meant to settle from shielded funds. Limits, freeze, and recovery stay in your control. We will name networks only when they are live.",
  },
] as const;

export const rails = [
  {
    id: "assets",
    label: "Assets",
    title: "Stablecoins and tokenized stocks, same account",
    body: "Hold payroll-grade cash and equity tokens without publishing size, cost basis, or the mix. Corporate actions are designed to reach holders without revealing who they are.",
  },
  {
    id: "yield",
    label: "Yield",
    title: "Private by default, still productive",
    body: "The point of an account — not a mixer — is that hidden funds can still be routed to real venues and credited back per note. Figures go live with the venues, not before.",
  },
  {
    id: "spend-rails",
    label: "Spend rails",
    title: "Plugs into how people already pay",
    body: "The account is built to settle everyday spend from shielded balance. Partner networks will be listed here when underwriting and issuance are real — not as decoration.",
  },
  {
    id: "ramps",
    label: "Ramps and bridges",
    title: "Enter and exit at the edge",
    body: "On- and off-ramps stay with licensed partners. Identity checks live there. They are not supposed to sit next to your on-chain activity inside XEROPAY.",
  },
  {
    id: "keys",
    label: "Keys and recovery",
    title: "Self-custodial, still recoverable",
    body: "Your spending key stays on your device. Passkeys, hardware wallets, and guardians are how a lost phone is not a lost account.",
  },
] as const;

export const capabilities = [
  {
    title: "Identity separation",
    body: "KYC belongs with the licensed ramp. It should never be joined to what you do once funds are inside the account.",
  },
  {
    title: "Gas, sponsored",
    body: "A paymaster is designed to cover network fees so you are not forced to hold a gas token beside private funds.",
  },
  {
    title: "Corporate actions, handled",
    body: "Dividends and splits on tokenized stocks are meant to reach shielded holders without publishing who holds what.",
  },
  {
    title: "Your keys, recoverable",
    body: "Passkeys, hardware wallets, and guardian recovery. Self-custody without a single-device cliff.",
  },
] as const;
