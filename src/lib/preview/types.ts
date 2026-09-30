export type HistoryKind =
  | "send"
  | "shield"
  | "unshield"
  | "link"
  | "payroll"
  | "split"
  | "scheduled";

export type VaultName = "Spend" | "Save" | "Invest";

export type HistoryItem = { id: string; kind: HistoryKind; label: string; at: number };
export type Contact = { id: string; handle: string; note: string; favourite?: boolean };
export type PayLink = {
  id: string;
  amount: string;
  asset: string;
  memo: string;
  expires?: string;
  disabled?: boolean;
};
export type SplitDraft = {
  id: string;
  amount: string;
  asset: string;
  participants: string[];
  settled?: string[];
};
export type ScheduledItem = {
  id: string;
  destination: string;
  amount: string;
  cadence: string;
  paused?: boolean;
  nextRun?: string;
};
export type Goal = { id: string; name: string; target: string; contributed: string };
export type Budget = { id: string; vault: string; limit: string; spent: string };
export type ViewingKey = {
  id: string;
  vault: string;
  from: string;
  to: string;
  secret?: string;
  revoked: boolean;
};
export type AskMessage = { id: string; role: "user" | "xero"; text: string };
export type InboxItem = { id: string; from: string; memo: string; at: number; read?: boolean };
export type VaultBalances = Record<VaultName, number>;

export type DappStore = {
  contacts: Contact[];
  links: PayLink[];
  splits: SplitDraft[];
  scheduled: ScheduledItem[];
  history: HistoryItem[];
  goals: Goal[];
  budgets: Budget[];
  viewingKeys: ViewingKey[];
  askMessages: AskMessage[];
  inbox: InboxItem[];
  yieldSweep: boolean;
  yieldDeposit: number;
  yieldEarned: number;
  cardFrozen: boolean;
  cardLimit: string;
  cardWaitlist: boolean;
  payrollPreview: string;
  vault: VaultBalances;
  watchlist: string[];
};

export const emptyVault: VaultBalances = { Spend: 0, Save: 0, Invest: 0 };

export const emptyStore: DappStore = {
  contacts: [],
  links: [],
  splits: [],
  scheduled: [],
  history: [],
  goals: [],
  budgets: [],
  viewingKeys: [],
  askMessages: [],
  inbox: [],
  yieldSweep: false,
  yieldDeposit: 0,
  yieldEarned: 0,
  cardFrozen: false,
  cardLimit: "250",
  cardWaitlist: false,
  payrollPreview: "",
  vault: { ...emptyVault },
  watchlist: [],
};

export function previewId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
