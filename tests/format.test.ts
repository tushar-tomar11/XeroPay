import assert from "node:assert/strict";
import test from "node:test";
import { formatTokenAmount, truncateAddress } from "@/lib/format";

test("truncateAddress shortens long keys", () => {
  const addr = "8AxP1234567890abcdefghijklmnopqrstuvwxyzADzh";
  assert.match(truncateAddress(addr), /^8AxP…/);
});

test("formatTokenAmount shows zero", () => {
  assert.equal(formatTokenAmount(0), "0");
});
