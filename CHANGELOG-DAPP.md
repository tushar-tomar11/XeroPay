# CHANGELOG-DAPP.md

## Phase 2 — Foundation (2026-09-30)

| File | What | Why |
|---|---|---|
| `eslint.config.mjs`, `package.json` | ESLint + `npm run lint` | Phase 2 checklist |
| `.env.example` | Cluster, RPC, fallbacks docs | Helius-ready; no secrets committed |
| `src/lib/wallet/cluster.ts` | Cluster, USDC mints, RPC list | mainnet-beta default; per-cluster USDC |
| `src/lib/wallet/balances.ts` | Fallback fetch; mint arg | Public RPC failure; empty ATA = 0 |
| `src/components/providers/ClusterProvider.tsx` | Client cluster + RPC override | Settings toggle without rebuild |
| `src/components/providers/SolanaProvider.tsx` | Connection remount on cluster | Adapter network matches cluster |
| `src/hooks/useXeroWallet.ts` | Single wallet/balances/refresh hook | One source for connect state |
| `src/lib/preview/*` | Flag, types, wallet-keyed store, send/inbox/vault adapters | Preview layer before Bucket B |
| `src/components/dapp/session/DappSession.tsx` | Store keyed by address; unified `disconnect()` | Handle/store do not leak across wallets |
| `src/components/dapp/WalletButton.tsx` | Disconnect via session; dropdown opens up in sidebar | Same disconnect as Settings |
| `src/components/dapp/DappAtmosphere.tsx` + `DAppShell.tsx` | CSS atmosphere, no section-02 PNG | dApp-only; marketing frozen |
| `src/components/dapp/DAppSidebar.tsx` | Wordmark; themed scrollbar; retry | N-logo PNG off; wallet pill not clipped |
| `src/app/globals.css` | `.dapp-scroll` | Thin themed scrollbar |
| `src/app/dapp/error.tsx`, `not-found.tsx` | Error boundary + 404 | No raw Next crash page inside dApp |
| `src/config/dapp.ts` | Bridge removed from nav; path kept | Cut dead Bridge |
| `src/components/dapp/screens/*` | Send validation + inbox; Privacy/Ask/Numbers/Card honesty; Bridge notice; Settings cluster/RPC | P0 Send; labels; cluster |
| `src/components/dapp/DappScreen.tsx` | Optional preview badge | Overview not blanket-preview |
| `src/components/dapp/ErrorState.tsx` | Error + Retry, skeleton | RPC honesty |

## Phases 3–7 — Shell, pages, quality (2026-09-30)

| File | What | Why |
|---|---|---|
| `src/config/navConfig.ts`, `DappShellChrome.tsx`, `DappShellBar.tsx`, `CommandPalette.tsx` | Nav config, cluster bar, Cmd/Ctrl+K | Phase 3 shell |
| `src/components/dapp/ui/primitives.tsx`, `Toast.tsx` | StatCard, DataTable, PreviewBadge, toasts | Shared UI |
| `src/lib/wallet/onchain.ts`, `prices.ts` | Activity, SPL, network health, USD prices | Bucket A |
| `src/components/dapp/screens/*` | Portfolio, markets, vault store, links expiry/disable, scheduled pause/next-run, contacts CRUD, receive payment URI | Phases 4–5 |
| `src/lib/preview/scheduled.ts`, `markets.ts` | Next-run dates, link expiry, Jupiter/CG prices | Preview helpers |
| `src/lib/format.ts` | Shared formatters | Phase 6 consistency |
| `tests/*.test.ts`, `playwright.config.ts`, `e2e/smoke.spec.ts` | Unit + smoke routes | Phase 7 |
| `README-DAPP.md` | Runbook + architecture | Deploy-ready docs |
