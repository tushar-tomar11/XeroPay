# XeroPay

Marketing site and Solana dApp for XEROPAY — a self-custodial privacy account for stablecoins and tokenized stocks.

The **dApp** (`/dapp`) uses real Solana wallet connect (Phantom, Solflare, Backpack, Coinbase), RPC balances, and a labelled **preview** layer for features not yet on-chain. See **[README-DAPP.md](./README-DAPP.md)** for setup, env vars, and QA.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 + Framer Motion
- `@solana/wallet-adapter` + `@solana/web3.js`

## Local

```bash
cp .env.example .env.local
# Set NEXT_PUBLIC_SOLANA_RPC_URL (Helius or other) in .env.local — never commit keys.

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). dApp: [http://localhost:3000/dapp](http://localhost:3000/dapp).

```bash
npm run typecheck
npm run lint
npm run test
npm run build
npm start
```

## Layout

- `src/app` — routes (`/`, `/dapp`, docs, personal, business, legal)
- `src/components` — site, hero, dApp, docs
- `src/lib/preview` — wallet-keyed preview store
- `public/assets` — brand art

## dApp docs

- [README-DAPP.md](./README-DAPP.md) — runbook
- [CHANGELOG-DAPP.md](./CHANGELOG-DAPP.md) — dApp change log
- [AUDIT-DAPP.md](./AUDIT-DAPP.md) — recon / status
- [FIX-PLAN-DAPP.md](./FIX-PLAN-DAPP.md) — phased plan and manual QA checklist
