import assert from "node:assert/strict";
import test from "node:test";
import {
  isValidSolanaAddress,
  parseAmount,
  resolveSendDestination,
  validateSendAmount,
} from "@/lib/preview/send";
import { emptyStore } from "@/lib/preview/types";

test("parseAmount rejects non-numeric", () => {
  assert.equal(parseAmount("abc"), null);
  assert.equal(parseAmount("1.5"), 1.5);
});

test("isValidSolanaAddress accepts system program", () => {
  assert.equal(isValidSolanaAddress("11111111111111111111111111111111"), true);
  assert.equal(isValidSolanaAddress("not-an-address"), false);
});

test("resolveSendDestination requires known handle", () => {
  const store = { ...emptyStore, contacts: [{ id: "1", handle: "@alex", note: "" }] };
  assert.equal(resolveSendDestination("@alex", store.contacts, null).ok, true);
  assert.equal(resolveSendDestination("@unknown", store.contacts, null).ok, false);
});

test("validateSendAmount enforces balance", () => {
  const fail = validateSendAmount("USDC", "100", 1, 5, true);
  assert.equal(fail.ok, false);
  const ok = validateSendAmount("USDC", "2", 1, 5, true);
  assert.equal(ok.ok, true);
  if (ok.ok) assert.equal(ok.amount, 2);
});
