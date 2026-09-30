/** Shared number / address / date formatting for the dApp. */

export function truncateAddress(address: string) {
  if (address.length < 10) return address;
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}

export function formatUsd(value: number | null) {
  if (value === null || Number.isNaN(value)) return "—";
  return value.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

export function formatTokenAmount(value: number, digits = 4) {
  if (!Number.isFinite(value)) return "—";
  if (value === 0) return "0";
  return value.toLocaleString(undefined, { maximumFractionDigits: digits });
}

export function formatDateTime(at: number | string) {
  const d = typeof at === "number" ? new Date(at) : new Date(at);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString();
}
