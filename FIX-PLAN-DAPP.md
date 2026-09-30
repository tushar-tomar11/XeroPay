# FIX-PLAN-DAPP.md — Phase 1

Date: 2026-09-30  
Input: `AUDIT-DAPP.md` + user amendments (2026-09-30).  
**Do not implement until explicit “go” on Phase 2.** No product code in this document’s creation.

Honesty over polish. Preview data never presented as on-chain. Marketing site frozen until **Phase 8** (separate go).

Every code phase lists files in `CHANGELOG-DAPP.md`. After each phase: `npm run typecheck`, `npm run lint`, `npm run build`, then the phase click-through. Stop and wait for “go” on the next phase.

---

## 1. Route buckets

### A. Make real now (wallet + RPC only)

| Route | Work |
|---|---|
| Overview | Real SOL/USDC with skeleton, error + Retry, poll ~30s; shielded stays Preview; Send/Receive/Vault links |
| Receive | Address, real QR, copy/share; optional payment-request query string |
| History | Paginated signatures for connected wallet + Solscan; **plus** preview-store rows clearly labelled |
| Portfolio | SOL + SPL holdings, USD with price fallback |
| Network | Cluster, RPC latency, slot, health, low-SOL fee warning |
| Settings | Handle (wallet-scoped), cluster switch (devnet/mainnet), RPC override persist, clear local data, disconnect |
| Invite | Referral URL derived from wallet address (and handle if claimed) |
| Privacy / Disclose / Numbers | Accurate copy for **this** build; Disclose keys stay preview; Numbers “Notes” labelled Preview |

### B. Functional preview (after preview layer + wallet-keyed store exist)

Vault, Send, Split, Links, Scheduled, Budgets, Goals, Yield, Markets, Reports, Card, Payroll, Contacts, Inbox, Ask Xero, $XERO.

Send is **P0** even though it is preview: validation (address format, balance vs selected token, min amount) + write History **and** Inbox. Ask Xero labelled **scripted helper**. Card `cardLimit` default labelled Preview.

### C. Cut or merge

| Item | Decision | Why |
|---|---|---|
| Bridge | **Cut from nav.** Keep `/dapp/bridge` as a **redirect or notice** pointing to Receive (on-chain funds in) and Vault (preview shield). | Dead disabled button; no bridge product; duplicates Receive/Vault |
| Marketing ChainLogos / BuiltOn / HeroBridge / why-multi-chain / `0x` alts | **Phase 8 only** | Hard rule: marketing frozen until explicit go |

---

## 2. Shared preview-data layer + wallet-keyed store

**Build in Phase 2–3, before any Bucket B page rebuilds** (Send P0 validation/inbox is the exception: it must use this layer as soon as the store exists, still in Phase 2).

### `/lib/preview/*`

Typed adapters, one `isPreview: true` flag per feature module. Components never inline fake numbers. Swapping to contracts later is a one-file change per feature.

Suggested modules (names can adjust):

- `types.ts` — shared IDs, amounts, timestamps
- `flag.ts` — `isPreview` (constant true until contracts)
- `vault.ts`, `send.ts`, `inbox.ts`, `contacts.ts`, `links.ts`, `scheduled.ts`, `goals.ts`, `budgets.ts`, `yield.ts`, `markets.ts`, `reports.ts`, `card.ts`, `payroll.ts`, `ask.ts`, `xeroToken.ts`

### Wallet-keyed store (Phase 2, not Phase 6)

- Key: connected `publicKey` base58 (or `"anon"` only while disconnected — dApp screens should not mutate preview data when disconnected).
- Persistence: `localStorage` or `sessionStorage` **namespaced** e.g. `xeropay.dapp.store.v2:<address>`.
- Handle stored per wallet, not globally.
- **One `disconnect()`** used by wallet dropdown **and** Settings: adapter disconnect + clear **current wallet** session UI; do not leak handle/store to the next wallet; switching wallets loads that wallet’s slice.

Phase 6 is **verification only**: Overview totals vs Portfolio vs Vault preview vs Reports; Send appears on History + Inbox; no duplicate sources of truth.

---

## 3. Shared UI primitives (Phase 3; stubs OK in Phase 2 if needed)

Reuse existing tokens. Do not invent a second design system.

| Primitive | Notes |
|---|---|
| `PageHeader` | Title, lede, optional `PreviewBadge` from `isPreview` — **not** a blanket badge on real-balance pages |
| `StatCard` | Replace ad-hoc Panels for numbers |
| `EmptyState` | Already exists — use everywhere |
| `ErrorState` | Message + Retry |
| `LoadingSkeleton` | Overview balances, tables |
| `PreviewBadge` | “PREVIEW — NOT ON-CHAIN” |
| `ActionButton` | Wrap existing `Button` |
| `DataTable` | History / Portfolio |
| `Modal` / `Sheet` | Extend `SignIntentModal` pattern |
| `Toast` | Copy address, mutations |

---

## 4. Phased work

Estimates: S ≤ 0.5d, M 0.5–2d, L 2–4d. Risk: H/M/L.

### Phase 2 — Foundation (P0) — wait for “go”

**Depends on:** Helius (or other) RPC URL from you for `.env.example` comments; cluster default `mainnet-beta` read-only.

| Work | Size | Risk | Deps |
|---|---|---|---|
| ESLint + `npm run lint` (Next ESLint or equivalent) | S | L | — |
| Cluster: `NEXT_PUBLIC_SOLANA_CLUSTER` (`mainnet-beta` default). Devnet toggle in Settings. USDC mint per cluster | M | M | RPC |
| RPC: `NEXT_PUBLIC_SOLANA_RPC_URL` + **fallback list**; Retry; skeleton; poll ~30s; empty wallet `0` not `—`; never swallow | M | H | Helius key |
| `useXeroWallet()` wrapping adapter + balances + `refresh` + unified `disconnect()` | M | M | session |
| Wallet-keyed store + `/lib/preview` **skeleton** (types, flag, store I/O) | M | M | — |
| Route guard: SignInWall; disconnect → wall, no crash | S | L | hook |
| dApp background: **Robinhood-free** asset or CSS-only atmosphere (**dApp only**) | S | L | assets |
| Sidebar logo: `assets.wordmark` and/or `assets.mark` — not the N logo PNG | S | L | — |
| Themed scrollbar; sidebar height so wallet pill not clipped | S | L | CSS |
| Error boundary + dApp 404 | S | L | — |
| Privacy copy: no overclaim | S | L | — |
| Label Ask Xero **scripted**; Numbers Notes **preview**; `cardLimit` default **preview** | S | L | — |
| Send P0: validate address / balance / min; write History + Inbox via preview store | M | M | store |
| Cut Bridge from `dappNav`; `/dapp/bridge` redirect or notice → Receive / Vault | S | L | nav |
| `CHANGELOG-DAPP.md` | S | L | — |

**Explicitly not Phase 2:** Bucket B UX rebuilds (except Send P0 + honesty labels). Portfolio/History on-chain. Cmd+K. Marketing (Phase 8).

Checklist (from original prompt, plus amendments):

- [ ] `grep -ri "noir\|robinhood"` zero in **app code** (PNG pixels may still exist in marketing assets — dApp must not display them)
- [ ] Logo wordmark/mark on desktop and mobile
- [ ] SOL/USDC real or `0` or error+Retry (funded + empty + RPC fail)
- [ ] Disconnect from **dropdown and Settings** both clear wallet-scoped state and return to SignInWall
- [ ] Refresh stable, no hydration warnings
- [ ] Sidebar themed scrollbar, nothing clipped
- [ ] `tsc`, `lint`, `build` pass
- [ ] Bridge gone from nav; old URL notices Receive/Vault
- [ ] Send invalid address blocked; valid preview send appears in History and Inbox

### Phase 3 — Shell + shared components

Nav config, active states, mobile drawer a11y, Cmd+K search (nav + preview contacts/history), wallet dropdown (copy toast, Solscan for **current cluster**, switch wallet, disconnect), `PreviewBadge` from flag, cluster indicator in shell. Primitives library.

### Phase 4 — Bucket A pages

Overview activity (signatures + labelled preview rows), Portfolio, History, Receive QR, Network live metrics, Settings persist, Invite wallet URL, Privacy/Disclose/Numbers accuracy.

### Phase 5 — Bucket B pages

Full UX on preview layer; no inline hardcoded amounts. Markets may use real prices with fallback (still Preview if not a live venue).

### Phase 6 — Consistency verification only

Store already wallet-keyed. Run a scripted or documented scenario: send, shield, link, schedule; confirm every affected page. Unify formatters (decimals, truncation `8AxP…ADzh`, dates). Handle from one profile source. Toasts/skeletons unified.

### Phase 7 — Quality / deploy-ready

Lighthouse, a11y, security pass, unit tests (RPC, formatters, preview store), Playwright smoke of remaining nav routes, `README-DAPP.md`, update `AUDIT-DAPP.md` statuses.

### Phase 8 — Marketing Solana-only (separate go)

ChainLogos, BuiltOn, HeroBridge, why-multi-chain docs, `0x` alt text, related docs nav. **Do not start without explicit “go”.**

---

## 5. Phase 2 — manual click-through (paste console back)

Run with **Chrome DevTools → Console + Network** open. Filter Console: Default levels. Network: preserve log.

**Prep**

1. Copy `.env.example` → `.env.local`. Set `NEXT_PUBLIC_SOLANA_CLUSTER=mainnet-beta` and `NEXT_PUBLIC_SOLANA_RPC_URL` to the Helius (or fallback) URL when you have it. Restart `npm run dev`.
2. Open `http://localhost:3000/dapp`.
3. Confirm marketing homepage still shows the old multi-chain strip (Phase 8 not done).

**A. Disconnected**

4. Sidebar: XeroPay **wordmark/mark only** — no overlapping N.
5. Background: no “Robinhood” / leftover chain strip.
6. Click Inbox, Vault, Settings — each shows SignInWall, not a crash.
7. Open `/dapp/bridge` — notice or redirect to Receive/Vault. Bridge **absent** from sidebar.

**B. Connect (Phantom or Solflare)**

8. Connect. Overview unlocks. Console: no unhandled rejections.
9. Network tab: RPC to **your** endpoint (not necessarily public mainnet).
10. **Empty or funded wallet:** SOL/USDC show numbers or `0`, never `—` while healthy. If RPC fails: error copy + **Retry** (click Retry once).
11. Claim or confirm handle. Note it.

**C. Disconnect unify**

12. Wallet pill → Disconnect. Must land on SignInWall. Reconnect **same** wallet: handle/store return.  
13. Disconnect again. Connect a **different** wallet (or skip if only one): previous handle must **not** appear.
14. Reconnect first wallet → Settings → Disconnect. Same SignInWall + cleared current session behavior as step 12.

**D. Send P0 (preview)**

15. Send: paste invalid string → blocked, no sign modal.
16. Valid Solana address, amount `0` or above balance → blocked.
17. Valid amount → complete preview sign. Open History: row present. Open Inbox: corresponding item present.

**E. Honesty labels**

18. Ask Xero: visible **scripted** (or equivalent) label.
19. Numbers: Notes marked Preview.
20. Card: daily limit default marked Preview.
21. Privacy: copy does not claim live shielding/viewing keys as production.

**F. Shell**

22. Scroll sidebar to bottom — wallet pill fully visible; scrollbar themed (not Windows default arrows).
23. Resize to mobile: Menu drawer opens/closes; no horizontal page scroll.
24. Hit a fake path `/dapp/this-is-not-a-route` — dApp-themed 404 if implemented, else note leftover.
25. Copy console **errors/warnings** (and any failed RPC status codes) and paste into chat.

**Commands (agent, after go):** `npm run typecheck && npm run lint && npm run build`.

---

## 6. What I need from you before / during Phase 2

1. **“go”** to start Phase 2.
2. **Helius (or other) RPC URL** for `.env.example` + fallback list (never commit secrets; `.env.local` only).
3. After implementation: paste DevTools console/Network notes from the click-through above.
4. Phase 8 remains blocked until you say so.

---

## 7. Reporting format (every phase after 2 starts)

1. What changed (files)
2. Checklist pass/fail
3. Bugs found in self-test
4. Deferred items
5. What is needed from you  

Then stop and wait for “go”.
