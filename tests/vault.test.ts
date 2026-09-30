import assert from "node:assert/strict";
import test from "node:test";
import { addToVault, shieldedUsdcPreview, takeFromVault } from "@/lib/preview/vault";
import { emptyStore } from "@/lib/preview/types";
import { computeNextRun, isLinkExpired } from "@/lib/preview/scheduled";

test("shieldedUsdcPreview sums vault buckets", () => {
  let store = emptyStore;
  store = addToVault(store, "Spend", 10);
  store = addToVault(store, "Save", 5);
  assert.equal(shieldedUsdcPreview(store), 15);
});

test("takeFromVault rejects overdraft", () => {
  const store = addToVault(emptyStore, "Spend", 3);
  assert.equal(takeFromVault(store, "Spend", 5), null);
});

test("computeNextRun advances calendar", () => {
  const next = computeNextRun("Weekly", new Date("2026-01-01T12:00:00Z"));
  assert.equal(next, "2026-01-08");
});

test("isLinkExpired respects date", () => {
  assert.equal(isLinkExpired("2020-01-01"), true);
  assert.equal(isLinkExpired(undefined), false);
});
