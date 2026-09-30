"use client";

import { DAppCardPreview } from "@/components/dapp/DAppCardPreview";
import { WalletButton } from "@/components/dapp/WalletButton";
import { assets } from "@/config/assets";
import { dappLocked } from "@/config/dapp";
import Image from "next/image";
import Link from "next/link";

export function SignInWall({ headline, body }: { headline: string; body: string }) {
  const accentWord = accentFromHeadline(headline);

  return (
    <div className="relative z-[1] mx-auto flex min-h-[calc(100svh-48px)] max-w-[1280px] flex-col justify-center gap-6 px-4 py-8 lg:min-h-svh lg:px-8">
      <div className="relative overflow-hidden rounded-[28px] border border-white/12 bg-[#070914]/40 shadow-[0_40px_100px_rgba(0,0,0,0.35)]">
        <Image
          src={assets.section02.background.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom opacity-80"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(80,90,200,0.28),transparent_55%)]" />
        <div className="relative grid items-center gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[minmax(280px,1fr)_minmax(0,1fr)] lg:px-14 lg:py-14">
          <div className="order-2 min-w-0 lg:order-1">
            <DAppCardPreview />
          </div>
          <div className="order-1 min-w-0 lg:order-2">
            <p className="text-[11px] font-medium tracking-[0.28em] text-[#9AA6FF]/85 uppercase">
              {dappLocked.eyebrow} · Private × Secure × On-chain
            </p>
            <h1 className="mt-4 max-w-xl text-[32px] font-semibold leading-[1.1] tracking-[-0.04em] text-[#F7F7FA] sm:text-[44px] lg:text-[50px]">
              {accentWord ? (
                <>
                  {accentWord.lead}{" "}
                  <span className="bg-[linear-gradient(90deg,#7B9CFF_0%,#A78BFA_100%)] bg-clip-text text-transparent">
                    {accentWord.tail}
                  </span>
                </>
              ) : (
                headline
              )}
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-[1.7] text-[#C5C8D4]">{body}</p>
            <p className="mt-2 max-w-md text-[13px] text-[#8F93A3]">
              Solana only — Phantom, Solflare, Backpack, or Coinbase. MetaMask will not connect.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <WalletButton variant="signin" />
              <Link
                href="/docs/how-it-works"
                className="inline-flex items-center rounded-full border border-white/14 bg-[#0B0E1A]/70 px-5 py-3 text-[14px] font-medium text-[#F7F7FA] backdrop-blur-md hover:border-white/28"
              >
                How it works
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ol className="grid gap-3 sm:grid-cols-3">
        {dappLocked.steps.map((step) => (
          <li
            key={step.n}
            className="rounded-3xl border border-white/12 bg-[#0B0E1A]/55 px-5 py-4 backdrop-blur-md"
          >
            <p className="text-[11px] tracking-[0.16em] text-[#9AA6FF] uppercase">
              {step.n} {step.title}
            </p>
            <p className="mt-2 text-[14px] leading-snug text-[#C8CBD6]">{step.desc}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function accentFromHeadline(headline: string) {
  const parts = headline?.trim().split(" ") ?? [];
  if (parts.length < 2) return null;
  return {
    lead: parts.slice(0, -1).join(" "),
    tail: parts[parts.length - 1],
  };
}
