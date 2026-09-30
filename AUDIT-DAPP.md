# AUDIT-DAPP.md — Phase 0 recon (+ status after Phases 2–7)

Date: 2026-09-30 (recon); updated after implementation pass same day.  
Scope: XeroPay dApp (`/dapp`). Marketing site unchanged (Phase 8 gated).  
Golden rule: honesty over polish. Anything not on-chain must be labelled Preview.

**Implementation status (Phases 2–7):** Foundation, shell (Cmd+K, toasts, wallet dropdown), Bucket A (balances retry, receive QR/URI, on-chain history, portfolio, network metrics, settings cluster/RPC, invite `?ref=`, privacy/numbers honesty), Bucket B preview layer on wallet-keyed store, Bridge cut from nav. See `CHANGELOG-DAPP.md` and `README-DAPP.md`. Live browser QA still required — paste DevTools from `FIX-PLAN-DAPP.md` click-through.

---

## 1. Stack map

| Area | Finding |
|---|---|
| Framework | Next.js 15 App Router (`src/app`), React 19, TypeScript, npm |
| Routing | `src/app/dapp/page.tsx` + `src/app/dapp/[...slug]/page.tsx`. Unknown slugs call `notFound()` if missing from `dappPaths`. Screens mapped in `src/components/dapp/DappRoute.tsx` |
| 404 / errors | No `src/app/dapp/not-found.tsx` or `error.tsx`. Unknown routes use root Next 404, not a dApp-themed page |
| State | `DappSession` context + `sessionStorage` keys `xeropay.dapp.session.v1` and `xeropay.dapp.store.v1`. No Zustand |
| Styling | Tailwind v4, tokens in `src/app/globals.css`. dApp chrome: `DappScreen` / `Panel` / `Field` |
| Icons | Custom SVG `DappNavIcon.tsx` |
| Motion | Framer Motion (marketing + Overview card tilt) |
| Solana | `@solana/web3.js` ^1.99; wallet-adapter Phantom, Solflare, Backpack, Coinbase |
| RPC | `NEXT_PUBLIC_SOLANA_RPC_URL` else `clusterApiUrl(Mainnet)` in `SolanaProvider.tsx`. `.env.example` points at `https://api.mainnet-beta.solana.com` |
| Cluster | Hardcoded mainnet. USDC mint in `src/lib/wallet/balances.ts` is mainnet Circle USDC only |
| Scripts | `dev`, `build`, `start`, `typecheck`. **No ESLint / `npm run lint`** |
| Marketing vs dApp | `SiteShell` strips navbar/footer on `/dapp`. dApp still uses `SectionAtmosphere` (marketing section-02 PNG) |

```text
RootLayout → SolanaProvider → SiteShell → DappLayout → DAppShell
  → DappSessionProvider → DappRoute
      → no publicKey → SignInWall
      → publicKey → Screen
  → fetchWalletBalances (RPC)
```

---

## 2. Route / feature table

All product routes live under **`/dapp`** (not `/app`). Shared guard: `!ready` → blank min-height; `!connected` → `SignInWall`; else the mapped screen. Active nav is exact `pathname === href` in `DAppSidebar.tsx`.

| Route / Feature | Status | Data source | Issues found | Severity | Fix size |
|---|---|---|---|---|---|
| `/dapp` Overview | Partial | Real SOL/USDC when RPC works; history = local store; shielded `0.00` labelled | RPC fail → `—` + copy, no Retry/skeleton/poll; whole page Preview badge covers real balances; handle is sessionStorage | P0 | M |
| `/dapp/send` | Partial | Mock-labelled (sign modal, local history) | No address/balance/min validation; Send does not write Inbox; fake-sign not on-chain | **P0** | M |
| `/dapp/receive` | Partial | Address real if connected | QR is a decorative glyph; copy prefers handle over address | P1 | S |
| `/dapp/inbox` | Shell | None | `store.inbox` is never written | **P0** (with Send) | M |
| `/dapp/contacts` | Partial | Local store | Not wallet-keyed | P2 | M |
| `/dapp/split` | Partial | Local store | Preview sign only | P2 | M |
| `/dapp/links` | Partial | Local store | No disable/expiry | P2 | M |
| `/dapp/scheduled` | Partial | Local store | No next-run/pause | P2 | M |
| `/dapp/ask` | Partial | Scripted `ASK_REPLIES` | Not labelled as scripted | P1 | S |
| `/dapp/invite` | Partial | Handle + origin | Link is `/dapp/invite`, not wallet-based referral | P1 | S |
| `/dapp/vault` | Partial | Hardcoded `0.00` + labelled preview | Fake sign; buckets not tied to a preview store | P1 | M |
| `/dapp/portfolio` | Shell | None | No SPL list / totals | P0 | L |
| `/dapp/markets` | Shell | Static status strings | Honest (no fake prices) | P2 | L |
| `/dapp/yield` | Partial | Local checkbox | Honest (no APY) | P2 | M |
| `/dapp/goals` | Partial | Local store | No progress ring | P2 | M |
| `/dapp/budgets` | Partial | Local store | No spent vs limit | P2 | M |
| `/dapp/bridge` | Shell | None | Disabled “Bridge unavailable”; cut from nav (Phase 1) | P2 | S |
| `/dapp/history` | Partial | Local preview log only | Not chain signatures | P0 | L |
| `/dapp/reports` | Partial | CSV of local history | No chart | P2 | M |
| `/dapp/card` | Partial | `cardLimit` default `"250"` | Default is mock-unlabelled; freeze is local | P1 | S |
| `/dapp/xero` | Partial | None (honest) | Docs link only | P2 | S |
| `/dapp/payroll` | Partial | Local textarea | Fake sign | P2 | M |
| `/dapp/disclose` | Partial | Local `vk_preview_*` | Honest preview keys | P2 | S |
| `/dapp/privacy` | Working | Static | Overclaims shielded notes / viewing keys vs current build | P1 | S |
| `/dapp/numbers` | Partial | Mix of store counts + Notes `"0"` | Notes hardcoded, unlabelled | P1 | S |
| `/dapp/network` | Partial | Static copy | No latency/slot/TPS; copy vs `dappCopy` mismatch | P1 | M |
| `/dapp/settings` | Partial | Handle + disconnect | No cluster/RPC persist; Settings disconnect ≠ wallet dropdown | P0 | M |
| Search box | Partial | Nav labels only | Not Cmd+K; no contacts/history | P2 | M |
| Wallet pill | Partial | Adapter | Copy + disconnect; no Explorer / Switch; dropdown disconnect **does not** call session `disconnect()` | P0 | S |
| Send / Receive / Vault CTAs | Working | Links | Navigate correctly | P3 | — |
| Unknown `/dapp/…` | Broken UX | — | Root 404, not dApp shell | P2 | S |

---

## 3. Leftover branding hit list

**Code grep (`noir`, `noirpay`, `NOIR`, `robinhood`, `wagmi`, `viem`):** zero hits in repo source.

**EVM / multi-chain (marketing + assets; out of dApp Phase 2 unless you expand — see Phase 8):**

- `src/components/common/ChainLogos.tsx` — Ethereum, Base, Arbitrum, Polygon + Solana
- `src/components/home/BuiltOn.tsx`, `src/components/hero/HeroBridge.tsx`
- `src/app/docs/why-multi-chain/page.tsx`, `src/config/docs.ts`
- `src/config/assets.ts` — payroll/stocks alts `0x3a7…` / `0x7e1…`; `xhain-logos.png`

**dApp visual leftovers (not in TS strings):**

- “BUILT ON ROBINHOOD C…” — almost certainly baked into `/xeropay/section-02/background.png` via `SectionAtmosphere` on the dApp shell
- Sidebar “N” overlapping wordmark — `assets.logo` (`xeropay-logo-transparent.png`); use wordmark/mark for dApp only

**dApp copy leftovers:**

- `DappScreen` always shows “Preview — not on-chain” including Overview on-chain balances
- Privacy page describes notes/keys as if they are live product behavior

**TODO / FIXME / lorem / coming soon:** none in `src`. Form `placeholder=` attributes only.

---

## 4. Data audit

| Producer | Tag |
|---|---|
| `fetchWalletBalances` (`getBalance` + `getParsedTokenAccountsByOwner`) | REAL (empty ATA = 0 USDC, not an error) |
| `publicKey` / address | REAL |
| Handle `@…` | MOCK-LABELLED as a tag; local-only, not on-chain |
| `DappStore` (contacts, goals, fake history, card, payroll, viewing keys, ask) | MOCK-LABELLED via ledes + Preview chip; **`cardLimit: "250"` MOCK-UNLABELLED** |
| Vault bucket `0.00` | MOCK-LABELLED |
| Overview shielded `0.00` | MOCK-LABELLED |
| Markets status strings | MOCK-LABELLED (honest empty) |
| Ask canned replies | MOCK-UNLABELLED as assistant (no “scripted” label) |
| Numbers “Notes” = `"0"` | MOCK-UNLABELLED |
| `SignIntentModal` | MOCK-LABELLED (no gas, nothing broadcasts) |

Store is **not keyed by wallet**. Settings `disconnect()` clears storage. Wallet dropdown `disconnect()` does **not** → handle (e.g. `@tushar12`) survives reconnect.

---

## 5. Wallet audit

- Connection: `@solana/wallet-adapter-react` `useWallet()`; session `connected = Boolean(publicKey)`.
- No single `useXeroWallet()`. Pages use `useDappSession`; `WalletButton` talks to the adapter directly.
- Disconnected: `SignInWall` after `ready`.
- Locked / wrong cluster: not detected; adapter pinned to mainnet.
- Disconnect mid-session: SignInWall appears; **dropdown path leaves handle/store**.
- Refresh: `autoConnect` + sessionStorage; balances refetch. Session hydrate in `useEffect` (no SSR wallet).
- MetaMask is not in the adapter list.

---

## 6. RPC diagnosis

**Cause of “Could not load balances from RPC” / `SOL —` `USDC —`:** default public `api.mainnet-beta.solana.com` is rate-limited and often CORS-hostile in browsers.

- On error, catch sets `balancesReady: true` and **null** balances → formatters return `—` (empty wallet with a working RPC would be `0`).
- No Retry, no skeleton, no poll, no fallback RPC list, no cluster env.
- USDC mint `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v` is correct for **mainnet**, wrong for **devnet**.
- ATA lookup path is correct.

---

## 7. UI consistency / a11y

- Header pattern: `DappScreen` is consistent.
- EmptyState exists; Markets / Network / Card / $XERO / Ask / Receive lack loading/error/retry parity with Overview.
- Sidebar `overflow-y-auto` uses native Windows scrollbar (white arrows). Wallet dropdown at the bottom of a sticky column is likely clipped.
- Mobile: “Menu” drawer, no focus trap.
- Overview decorative callouts: “Same address…” is `lg:block` only; “Private by design” can collide on small widths.
- Contrast: `#6E7280` on `#05060b` is tight.
- No error boundary.

---

## 8. Dead buttons / links

- Bridge: disabled “Bridge unavailable”
- Inbox: no producer
- Wallet dropdown: no View on explorer, no Switch wallet
- Overview RPC error: text only, not a control
- Search: filters nav (not dead)

---

## 9. Console (expected, unverified)

| Source | Likely |
|---|---|
| Network | RPC 403/429/CORS to `api.mainnet-beta.solana.com` |
| `SolanaProvider` | `console.error("[XeroPay wallet]", …)` |
| `WalletButton` | `connect().catch(() => undefined)` swallows failures |

---

## 10. What to verify in Phase 2 QA

See `FIX-PLAN-DAPP.md` § Phase 2 — manual click-through.
