export type DappLink = { href: string; label: string; icon: DappIcon };

export type DappGroup = { title: string; items: readonly DappLink[] };

export type DappIcon =
  | "overview"
  | "send"
  | "receive"
  | "inbox"
  | "contacts"
  | "split"
  | "links"
  | "scheduled"
  | "ask"
  | "invite"
  | "vault"
  | "portfolio"
  | "markets"
  | "yield"
  | "goals"
  | "budgets"
  | "bridge"
  | "history"
  | "reports"
  | "card"
  | "xero"
  | "payroll"
  | "disclose"
  | "privacy"
  | "numbers"
  | "network"
  | "settings";

export const dappNav: readonly DappGroup[] = [
  {
    title: "Account",
    items: [
      { href: "/dapp", label: "Overview", icon: "overview" },
      { href: "/dapp/send", label: "Send", icon: "send" },
      { href: "/dapp/receive", label: "Receive", icon: "receive" },
      { href: "/dapp/inbox", label: "Inbox", icon: "inbox" },
      { href: "/dapp/contacts", label: "Contacts", icon: "contacts" },
      { href: "/dapp/split", label: "Split", icon: "split" },
      { href: "/dapp/links", label: "Links", icon: "links" },
      { href: "/dapp/scheduled", label: "Scheduled", icon: "scheduled" },
      { href: "/dapp/ask", label: "Ask Xero", icon: "ask" },
      { href: "/dapp/invite", label: "Invite", icon: "invite" },
    ],
  },
  {
    title: "Money",
    items: [
      { href: "/dapp/vault", label: "Vault", icon: "vault" },
      { href: "/dapp/portfolio", label: "Portfolio", icon: "portfolio" },
      { href: "/dapp/markets", label: "Markets", icon: "markets" },
      { href: "/dapp/yield", label: "Yield", icon: "yield" },
      { href: "/dapp/goals", label: "Goals", icon: "goals" },
      { href: "/dapp/budgets", label: "Budgets", icon: "budgets" },
      { href: "/dapp/bridge", label: "Bridge", icon: "bridge" },
      { href: "/dapp/history", label: "History", icon: "history" },
      { href: "/dapp/reports", label: "Reports", icon: "reports" },
      { href: "/dapp/card", label: "Card", icon: "card" },
      { href: "/dapp/xero", label: "$XERO", icon: "xero" },
    ],
  },
  {
    title: "Business",
    items: [{ href: "/dapp/payroll", label: "Payroll", icon: "payroll" }],
  },
  {
    title: "System",
    items: [
      { href: "/dapp/disclose", label: "Disclose", icon: "disclose" },
      { href: "/dapp/privacy", label: "Privacy", icon: "privacy" },
      { href: "/dapp/numbers", label: "Numbers", icon: "numbers" },
      { href: "/dapp/network", label: "Network", icon: "network" },
      { href: "/dapp/settings", label: "Settings", icon: "settings" },
    ],
  },
] as const;

export const dappPaths = new Set(dappNav.flatMap((g) => g.items.map((i) => i.href)));

export const dappLocked = {
  eyebrow: "Your account",
  steps: [
    { n: "01", title: "Connect", desc: "Any Solana wallet." },
    { n: "02", title: "Sign", desc: "One signature, no gas." },
    { n: "03", title: "Open", desc: "Claim a tag after." },
  ],
} as const;

const defaultCopy = {
  headline: "Sign in with your wallet",
  body: "Your wallet is the account. One signature opens it.",
} as const;

export const dappCopy: Record<string, { headline: string; body: string }> = {
  "/dapp": { ...defaultCopy },
  "/dapp/send": {
    headline: "Sign in to pay",
    body: "Zero-knowledge payments on Solana. Your wallet connects the rest.",
  },
  "/dapp/receive": {
    headline: "Sign in to receive",
    body: "Get paid to a fresh address. Your wallet opens the account.",
  },
  "/dapp/inbox": {
    headline: "Sign in to inbox",
    body: "Messages stay with the account — not a public memo field.",
  },
  "/dapp/contacts": {
    headline: "Sign in to contacts",
    body: "Handles without publishing a graph of who you know.",
  },
  "/dapp/split": {
    headline: "Sign in to split",
    body: "Shared notes, still private. Connect a Solana wallet to continue.",
  },
  "/dapp/links": {
    headline: "Sign in to links",
    body: "Payment links without a public trail. One signature opens them.",
  },
  "/dapp/scheduled": {
    headline: "Sign in to schedule",
    body: "Recurring payments without a repeating on-chain pattern.",
  },
  "/dapp/ask": {
    headline: "Sign in to Ask Xero",
    body: "Account help after you connect. Nothing decrypts without your key.",
  },
  "/dapp/invite": {
    headline: "Sign in to invite",
    body: "Share a handle, not a running balance.",
  },
  "/dapp/vault": {
    headline: "Sign in to protect funds",
    body: "A shielded balance is designed to leave the explorer the moment it lands.",
  },
  "/dapp/portfolio": {
    headline: "Sign in to portfolio",
    body: "Positions stay notes. The explorer does not get a bag to scrape.",
  },
  "/dapp/markets": {
    headline: "Sign in to trade",
    body: "Private positions. No address watching every move.",
  },
  "/dapp/yield": {
    headline: "Sign in to earn",
    body: "Idle notes are designed to keep working. Rates publish with venues.",
  },
  "/dapp/goals": {
    headline: "Sign in to goals",
    body: "Labelled vaults you control. Nobody else reads the split.",
  },
  "/dapp/budgets": {
    headline: "Sign in to budgets",
    body: "Limits on notes — not a public spreadsheet.",
  },
  "/dapp/bridge": {
    headline: "Sign in to bridge",
    body: "Enter and exit at the edge. Screening stays at the boundary.",
  },
  "/dapp/history": {
    headline: "Sign in to history",
    body: "Decrypt locally. This is not a server-side statement.",
  },
  "/dapp/reports": {
    headline: "Sign in for reports",
    body: "Export from a viewing key you issue — scoped, dated, revocable.",
  },
  "/dapp/card": {
    headline: "Sign in to spend",
    body: "Spend from notes you control. Rails are named when issuance is real.",
  },
  "/dapp/xero": {
    headline: "Sign in for $XERO",
    body: "Intended utility when the token is live. No contract on this site yet.",
  },
  "/dapp/payroll": {
    headline: "Sign in for payroll",
    body: "Batch payouts from a private treasury. Recipients see their line.",
  },
  "/dapp/disclose": {
    headline: "Sign in to disclose",
    body: "Viewing keys you issue, scope, and revoke. No master key.",
  },
  "/dapp/privacy": {
    headline: "Sign in to privacy",
    body: "What the account is built never to see — and what stays on your device.",
  },
  "/dapp/numbers": {
    headline: "Sign in to numbers",
    body: "Workspace stats after you connect. Nothing decrypts before that.",
  },
  "/dapp/network": {
    headline: "Sign in to network",
    body: "Solana by design. We name RPCs and explorers when the account is live.",
  },
  "/dapp/settings": {
    headline: "Sign in to settings",
    body: "Keys and devices stay yours. Connect a Solana wallet to continue.",
  },
};

export function getDappCopy(pathname: string) {
  return dappCopy[pathname] ?? defaultCopy;
}
