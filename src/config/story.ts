export type StoryId = "public-data" | "payroll" | "stocks" | "stablecoins" | "yield";
export type FocusCard = "payroll" | "stocks" | "stablecoins" | "yield" | null;

export type StoryState = {
  id: StoryId;
  label: string;
  headline: string[];
  accent: string;
  description: string[];
  problem: {
    title: string;
    meta: string;
    status: string;
  };
  consequence: {
    name: string;
    subject: string;
    time: string;
  };
  focusCard: FocusCard;
};

export const storyStates: StoryState[] = [
  {
    id: "public-data",
    label: "THE PROBLEM",
    headline: ["Your financial data", "was never meant to be"],
    accent: "public.",
    description: [
      "Onchain payroll, stablecoins, and tokenized equities sit in the same address. A single leak can expose what you earn, what you own, and what you’re worth — all at once.",
      "Every other privacy tool turns that money into dead capital the moment you hide it. No yield, no card, and nothing you can show a bank.",
    ],
    problem: {
      title: "Payment Reconciliation.pdf",
      meta: "166 kb",
      status: "Leaked",
    },
    consequence: {
      name: "Priya Shah",
      subject: "RE: Invoice discrepancy review",
      time: "9 days ago",
    },
    focusCard: null,
  },
  {
    id: "payroll",
    label: "PAYROLL",
    headline: ["Your income shouldn't", "be an"],
    accent: "open ledger.",
    description: [
      "Payroll sitting on a public address makes compensation patterns readable to anyone who looks.",
      "A leak does not just reveal a payment. It reveals how you earn.",
    ],
    problem: {
      title: "Payroll Export.csv",
      meta: "84 kb",
      status: "Traceable",
    },
    consequence: {
      name: "Priya Shah",
      subject: "Income becomes publicly traceable.",
      time: "Now visible",
    },
    focusCard: "payroll",
  },
  {
    id: "stocks",
    label: "TOKENIZED STOCKS",
    headline: ["What you own shouldn't reveal", "what you're"],
    accent: "worth.",
    description: [
      "Tokenized equities in the same wallet turn a private portfolio into a public statement.",
      "Your investment position can become visible without you ever publishing it.",
    ],
    problem: {
      title: "Holdings Snapshot.pdf",
      meta: "210 kb",
      status: "Visible",
    },
    consequence: {
      name: "Priya Shah",
      subject: "Your investment position can become visible.",
      time: "Now visible",
    },
    focusCard: "stocks",
  },
  {
    id: "stablecoins",
    label: "STABLECOINS",
    headline: ["Your balance shouldn't", "be your"],
    accent: "identity.",
    description: [
      "Liquid stablecoin balances sitting beside payroll and holdings make solvency easier to infer.",
      "The address becomes a proxy for who you are and what you can move.",
    ],
    problem: {
      title: "Treasury Balance.json",
      meta: "12 kb",
      status: "Inferred",
    },
    consequence: {
      name: "Priya Shah",
      subject: "Liquid holdings become easier to infer.",
      time: "Now visible",
    },
    focusCard: "stablecoins",
  },
  {
    id: "yield",
    label: "DEFI YIELD",
    headline: ["Your financial strategy", "shouldn't be public"],
    accent: "either.",
    description: [
      "Yield positions advertise how capital is allocated, not just how much is held.",
      "Your on-chain strategy becomes observable — and copyable — from a single address.",
    ],
    problem: {
      title: "Strategy Notes.pdf",
      meta: "96 kb",
      status: "Observable",
    },
    consequence: {
      name: "Priya Shah",
      subject: "Your on-chain strategy becomes observable.",
      time: "Now visible",
    },
    focusCard: "yield",
  },
];

export const storyStops = [0, 0.15, 0.2, 0.35, 0.4, 0.55, 0.6, 0.75, 0.8, 1];
const storyIndexAtStop = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4];

export function storyBlend(progress: number) {
  const p = Math.min(1, Math.max(0, progress));
  for (let i = 0; i < storyStops.length - 1; i += 1) {
    const start = storyStops[i];
    const end = storyStops[i + 1];
    if (p <= end || i === storyStops.length - 2) {
      const mix = end === start ? 1 : (p - start) / (end - start);
      return {
        from: storyIndexAtStop[i],
        to: storyIndexAtStop[i + 1],
        mix: Math.min(1, Math.max(0, mix)),
      };
    }
  }
  return { from: 4, to: 4, mix: 1 };
}

export function cardFocus(progress: number, cardId: FocusCard) {
  if (!cardId) return 0;
  const { from, to, mix } = storyBlend(progress);
  const a = storyStates[from].focusCard === cardId ? 1 : storyStates[from].focusCard === null ? 0.32 : 0.12;
  const b = storyStates[to].focusCard === cardId ? 1 : storyStates[to].focusCard === null ? 0.32 : 0.12;
  return a * (1 - mix) + b * mix;
}
