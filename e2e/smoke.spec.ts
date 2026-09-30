import { test, expect } from "@playwright/test";

const routes = [
  "/dapp",
  "/dapp/send",
  "/dapp/receive",
  "/dapp/vault",
  "/dapp/history",
  "/dapp/settings",
  "/dapp/bridge",
  "/dapp/this-is-not-a-route",
];

test.describe("dApp smoke (disconnected)", () => {
  for (const path of routes) {
    test(`loads ${path}`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.ok() || res?.status() === 404).toBeTruthy();
      await expect(page.locator("body")).toBeVisible();
    });
  }
});
