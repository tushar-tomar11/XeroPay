import { isPreview } from "@/lib/preview/flag";

export { isPreview };

const CADENCE_DAYS: Record<string, number> = {
  Weekly: 7,
  Monthly: 30,
  Quarterly: 90,
};

export function computeNextRun(cadence: string, from = new Date()): string {
  const days = CADENCE_DAYS[cadence] ?? 30;
  const next = new Date(from);
  next.setDate(next.getDate() + days);
  return next.toISOString().slice(0, 10);
}

export function isLinkExpired(expires?: string): boolean {
  if (!expires) return false;
  const end = new Date(expires);
  if (Number.isNaN(end.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return end < today;
}
