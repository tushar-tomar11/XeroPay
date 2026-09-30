"use client";

import { Button } from "@/components/common/Button";
import { useDappSession } from "@/components/dapp/session/DappSession";
import { useToast } from "@/components/dapp/ui/Toast";
import { useCluster } from "@/components/providers/ClusterProvider";
import { truncateAddress } from "@/lib/format";
import { solscanAddress } from "@/lib/wallet/onchain";
import { useWalletMultiButton } from "@solana/wallet-adapter-base-ui";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useCallback, useEffect, useRef, useState } from "react";

type WalletButtonProps = {
  className?: string;
  variant?: "header" | "signin";
};

export function WalletButton({ className = "", variant = "header" }: WalletButtonProps) {
  const { disconnect } = useDappSession();
  const { cluster } = useCluster();
  const { push } = useToast();
  const { setVisible } = useWalletModal();
  const { buttonState, onConnect, publicKey, walletName } = useWalletMultiButton({
    onSelectWallet() {
      setVisible(true);
    },
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropdownOpen]);

  const handleConnect = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  const handleCopy = useCallback(async () => {
    if (!publicKey) return;
    await navigator.clipboard.writeText(publicKey.toBase58());
    setCopied(true);
    push("Address copied");
    window.setTimeout(() => setCopied(false), 1800);
  }, [publicKey, push]);

  const handleDisconnect = useCallback(async () => {
    setDropdownOpen(false);
    disconnect();
  }, [disconnect]);

  if (buttonState === "connecting" || buttonState === "disconnecting") {
    return (
      <Button data-wallet-trigger className={className} disabled>
        <ConnectingSpinner />
        Connecting...
      </Button>
    );
  }

  if (buttonState === "has-wallet" && onConnect) {
    return (
      <Button
        data-wallet-trigger
        className={className}
        onClick={() => {
          onConnect();
        }}
      >
        Connect {walletName ?? "wallet"}
        {variant === "signin" ? <span aria-hidden="true">→</span> : null}
      </Button>
    );
  }

  if (publicKey && buttonState === "connected") {
    const address = publicKey.toBase58();
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          data-wallet-trigger="true"
          onClick={() => setDropdownOpen((open) => !open)}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#4F7CFF_0%,#6F6CFF_48%,#8B5CF6_100%)] px-6 py-3 text-[15px] font-medium tracking-[-0.01em] text-white shadow-[0_10px_30px_rgba(79,124,255,0.28)] ${className}`}
        >
          <ConnectedDot />
          <span className="font-mono text-[13px]">{truncateAddress(address)}</span>
          <ChevronIcon open={dropdownOpen} />
        </button>
        {dropdownOpen ? (
          <div
            className={`absolute z-[70] min-w-[180px] overflow-hidden rounded-2xl border border-white/12 bg-[#0B0E1A] py-1 shadow-[0_24px_64px_rgba(0,0,0,0.6)] ${
              variant === "header" ? "bottom-full left-0 right-0 mb-2" : "left-0 mt-2"
            }`}
          >
            <button
              type="button"
              onClick={() => void handleCopy()}
              className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-[13px] text-[#F7F7FA] hover:bg-white/[0.06]"
            >
              <CopyIcon />
              {copied ? "Copied!" : "Copy address"}
            </button>
            <a
              href={solscanAddress(address, cluster)}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center gap-2 px-3 py-2.5 text-[13px] text-[#F7F7FA] hover:bg-white/[0.06]"
              onClick={() => setDropdownOpen(false)}
            >
              View on Solscan
            </a>
            <button
              type="button"
              onClick={() => {
                setDropdownOpen(false);
                setVisible(true);
              }}
              className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-[13px] text-[#F7F7FA] hover:bg-white/[0.06]"
            >
              Switch wallet
            </button>
            <button
              type="button"
              onClick={() => void handleDisconnect()}
              className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-[13px] text-[#F7F7FA] hover:bg-white/[0.06]"
            >
              <DisconnectIcon />
              Disconnect
            </button>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <Button data-wallet-trigger className={className} onClick={handleConnect}>
      Connect wallet
      {variant === "signin" ? <span aria-hidden="true">→</span> : null}
    </Button>
  );
}

function ConnectingSpinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ConnectedDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inset-0 rounded-full bg-[#42E8A1] opacity-70 motion-safe:animate-status-pulse" />
      <span className="relative h-2 w-2 rounded-full bg-[#42E8A1]" />
    </span>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke="currentColor" />
      <path d="M10.5 5.5V3.8A1.3 1.3 0 0 0 9.2 2.5H3.8A1.3 1.3 0 0 0 2.5 3.8v5.4A1.3 1.3 0 0 0 3.8 10.5H5.5" stroke="currentColor" />
    </svg>
  );
}

function DisconnectIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="M6 3H4.2A1.2 1.2 0 0 0 3 4.2v7.6A1.2 1.2 0 0 0 4.2 13H6" stroke="currentColor" />
      <path d="M9 11.5 12.5 8 9 4.5M12.5 8H6" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}
