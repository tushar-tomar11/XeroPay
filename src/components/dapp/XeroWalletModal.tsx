"use client";

import { WalletReadyState, type WalletName } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { flushSync } from "react-dom";
import { useCallback, useMemo, useState } from "react";

export function XeroWalletModal() {
  const { wallets, select, connect } = useWallet();
  const { visible, setVisible } = useWalletModal();
  const [pending, setPending] = useState<WalletName | null>(null);
  const [error, setError] = useState<string | null>(null);

  const listed = useMemo(() => {
    const seen = new Set<string>();
    const installed: typeof wallets = [];
    const notInstalled: typeof wallets = [];
    for (const w of wallets) {
      if (seen.has(w.adapter.name)) continue;
      seen.add(w.adapter.name);
      if (w.readyState === WalletReadyState.Installed) installed.push(w);
      else notInstalled.push(w);
    }
    return installed.length ? [...installed, ...notInstalled] : notInstalled;
  }, [wallets]);

  const close = useCallback(() => {
    if (pending) return;
    setError(null);
    setVisible(false);
  }, [pending, setVisible]);

  const handlePick = useCallback(
    async (name: WalletName) => {
      if (pending) return;
      setError(null);
      setPending(name);
      try {
        flushSync(() => select(name));
        await connect();
        setVisible(false);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Could not connect wallet";
        setError(message);
        console.error("[XeroPay wallet] connect failed", e);
      } finally {
        setPending(null);
      }
    },
    [connect, pending, select, setVisible],
  );

  if (!visible) return null;

  return (
    <div
      className="wallet-adapter-modal wallet-adapter-modal-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="xero-wallet-modal-title"
    >
      <div className="wallet-adapter-modal-container">
        <div className="wallet-adapter-modal-wrapper">
          <button type="button" className="wallet-adapter-modal-button-close" onClick={close} aria-label="Close">
            <svg width="14" height="14" aria-hidden="true">
              <path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z" />
            </svg>
          </button>
          <h1 id="xero-wallet-modal-title" className="wallet-adapter-modal-title">
            Connect a wallet on Solana
          </h1>
          {error ? <p className="mb-3 text-[13px] text-[#F0A0A0]">{error}</p> : null}
          <ul className="wallet-adapter-modal-list">
            {listed.map((w) => (
              <li key={w.adapter.name}>
                <button
                  type="button"
                  className="wallet-adapter-button"
                  disabled={Boolean(pending)}
                  onClick={() => void handlePick(w.adapter.name)}
                >
                  {/* Wallet icons are adapter data URLs — not suitable for next/image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={w.adapter.icon} alt="" width={24} height={24} className="rounded-md" />
                  <span className="ml-2">
                    {w.adapter.name}
                    {pending === w.adapter.name ? " · connecting…" : ""}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {listed.length === 0 ? (
            <p className="text-[13px] text-[#A6A9B5]">Install Phantom or Solflare, then refresh this page.</p>
          ) : null}
        </div>
      </div>
      <button type="button" className="wallet-adapter-modal-overlay" aria-label="Close" onClick={close} />
    </div>
  );
}
