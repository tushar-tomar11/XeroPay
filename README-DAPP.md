# XeroPay dApp (`/dapp`)

Solana wallet-connected preview product. **On-chain:** balances, receive address/QR, history signatures, portfolio SPL, network health. **Preview (local, per wallet):** vault, send sign modal, inbox, links, schedules, card, payroll, ask helper, etc.

## Setup

```bash
cp .env.example .env.local
```

Set:

- `NEXT_PUBLIC_SOLANA_CLUSTER` — `mainnet-beta` (default) or `devnet`
- `NEXT_PUBLIC_SOLANA_RPC_URL` — Helius or other RPC (recommended; public mainnet often 403/429 in browsers)

```bash
npm install
npm run dev
```

Open [http://localhost:3000/dapp](http://localhost:3000/dapp).

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server (Turbopack) |
| `npm run typecheck` | TypeScript |
| `npm run lint` | ESLint |
| `npm run build` | Production build |
| `npm run test` | Unit tests (`node:test`) |
| `npm run test:e2e` | Playwright smoke (server must be running unless `CI=1`) |

## Architecture

- **Routes:** `src/app/dapp/*` → `DappRoute` maps paths to screen components.
- **Session:** `DappSession.tsx` — wallet adapter, balances, wallet-keyed `localStorage` store.
- **Preview data:** `src/lib/preview/*` — typed store; `isPreview` until contracts exist.
- **Wallet hook:** `useXeroWallet.ts` — connect state, refresh balances, unified disconnect.

## Manual QA

Follow **FIX-PLAN-DAPP.md § Phase 2 click-through** plus:

- **Cmd/Ctrl+K** — command palette (nav + contacts/history when connected)
- **Links** — create link, copy URL, open Receive with prefilled amount; disable/expiry
- **Scheduled** — next run date, pause/resume
- **Network** — slot, latency, TPS sample, low-SOL warning
- **Portfolio / Markets** — SPL list and price fallback (still preview-labelled where applicable)

Paste DevTools Console + Network notes after your pass.

## Phase 8 (not done)

Marketing multi-chain strip/docs remain until explicit go. dApp shell uses Solana-only atmosphere and wordmark.
