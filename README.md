# XeroPay

Marketing site and Solana dApp preview for XEROPAY — a self-custodial privacy account for stablecoins and tokenized stocks.

The dApp uses a mock connected session today so the UI can ship without a live wallet adapter. Wallet connect is stubbed in `src/lib/wallet/solanaAdapter.ts` for a later `@solana/wallet-adapter` hook. Nothing here claims live APYs, card issuance, or a token contract.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 + Framer Motion
- CSS 3D / transforms (no Three.js)

## Local

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If that port is taken, Next will pick the next free port.

```bash
npm run build
npm start
```

## Layout

- `src/app` — routes (`/`, `/dapp`, docs, personal, business, legal)
- `src/components` — site, hero, dApp, docs
- `public/assets` — processed brand art served by the app
