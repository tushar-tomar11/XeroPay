"use client";

import { assets } from "@/config/assets";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";
import Image from "next/image";
import { useState } from "react";

const stages = [
  {
    id: "shield",
    label: "Shield",
    action: "Inbound screened",
    explorer: "Encrypted notes",
    detail: "Ramp or bridge at the edge. Funds land as notes only your key opens.",
  },
  {
    id: "hold",
    label: "Hold",
    action: "Yield routing",
    explorer: "Encrypted notes",
    detail: "Idle notes stay in the pool. They can keep working without a public deposit trail.",
  },
  {
    id: "pay",
    label: "Pay",
    action: "Stealth send",
    explorer: "One-time address",
    detail: "Each payment mints a fresh receiving path. Nothing repeats on the ledger.",
  },
  {
    id: "prove",
    label: "Prove",
    action: "Scoped viewing key",
    explorer: "Still encrypted",
    detail: "A read-only key, dated and revocable. The account itself stays closed.",
  },
] as const;

export function AccountDashboard() {
  const motionEnabled = useMotionEnabled();
  const [active, setActive] = useState<(typeof stages)[number]["id"]>("shield");
  const current = stages.find((stage) => stage.id === active) ?? stages[0];
  const activeIndex = stages.findIndex((stage) => stage.id === active);

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/12 bg-[#070914]/55 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 sm:px-6">
        <div>
          <p className="text-[11px] tracking-[0.18em] text-[#9AA6FF]/80 uppercase">Account</p>
          <p className="mt-0.5 font-medium text-[#F7F7FA]">@you</p>
        </div>
        <p className="rounded-full border border-white/12 px-3 py-1 text-[11px] tracking-[0.12em] text-[#A6A9B5] uppercase">
          Explorer · encrypted
        </p>
      </div>

      <div className="grid gap-6 p-5 lg:grid-cols-[1.05fr_0.95fr] lg:p-6">
        <div>
          <div
            role="tablist"
            aria-label="Account stages"
            className="flex flex-wrap gap-2"
          >
            {stages.map((stage, index) => {
              const selected = stage.id === active;
              return (
                <button
                  key={stage.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(stage.id)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowRight") {
                      event.preventDefault();
                      setActive(stages[(index + 1) % stages.length].id);
                    }
                    if (event.key === "ArrowLeft") {
                      event.preventDefault();
                      setActive(stages[(index - 1 + stages.length) % stages.length].id);
                    }
                  }}
                  className={`rounded-full px-3.5 py-1.5 text-[12px] font-medium transition ${
                    selected
                      ? "bg-[linear-gradient(90deg,#4F7CFF,#8B5CF6)] text-white"
                      : "border border-white/12 text-[#C8CBD6] hover:border-white/28"
                  }`}
                >
                  {stage.label}
                </button>
              );
            })}
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/25 p-4">
            <NoteDiagram activeIndex={motionEnabled ? activeIndex : 0} />
          </div>
        </div>

        <div className="relative min-h-[240px]">
          <div className="absolute -right-4 -top-6 hidden w-[46%] opacity-80 lg:block">
            <Image
              src={assets.phone.src}
              alt=""
              width={280}
              height={420}
              className="h-auto w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
            />
          </div>
          <div className="relative z-10 rounded-2xl border border-white/12 bg-[#0B0E1A]/80 p-5 backdrop-blur-md">
            <dl className="space-y-3 text-[13px]">
              <Row label="Handle" value="@you" />
              <Row label="Balance" value="Shielded notes" />
              <Row label="Last action" value={current.action} />
              <Row label="On the explorer" value={current.explorer} />
            </dl>
            <p className="mt-4 text-[13px] leading-[1.65] text-[#A6A9B5]">{current.detail}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-2">
      <dt className="text-[#8B90A3]">{label}</dt>
      <dd className="font-medium text-[#F7F7FA]">{value}</dd>
    </div>
  );
}

function NoteDiagram({ activeIndex }: { activeIndex: number }) {
  const paths = [
    "M 40 90 C 90 90, 90 70, 160 70",
    "M 160 70 C 210 70, 210 50, 280 50",
    "M 280 50 C 340 50, 360 100, 420 110",
    "M 280 50 C 330 20, 380 20, 430 28",
  ];

  return (
    <svg viewBox="0 0 480 140" className="h-[140px] w-full" aria-hidden="true">
      <ellipse cx="280" cy="72" rx="92" ry="48" fill="rgba(91,140,255,0.08)" stroke="rgba(165,180,252,0.35)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={248 + (i % 3) * 18}
          y={52 + Math.floor(i / 3) * 18}
          width="14"
          height="10"
          rx="2"
          fill={activeIndex >= 0 ? "rgba(139,92,246,0.75)" : "rgba(255,255,255,0.2)"}
          opacity={0.55 + i * 0.08}
        />
      ))}
      {paths.map((d, index) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke={index === activeIndex ? "#8B5CF6" : "rgba(255,255,255,0.18)"}
          strokeWidth={index === activeIndex ? 2.4 : 1.2}
          strokeLinecap="round"
        />
      ))}
      <text x="28" y="108" fill="#8B90A3" fontSize="10">
        Ramp
      </text>
      <text x="250" y="128" fill="#C8CBD6" fontSize="10">
        Shielded pool
      </text>
      <text x="400" y="128" fill="#8B90A3" fontSize="10">
        Pay
      </text>
      <text x="400" y="18" fill="#8B90A3" fontSize="10">
        Prove
      </text>
    </svg>
  );
}
