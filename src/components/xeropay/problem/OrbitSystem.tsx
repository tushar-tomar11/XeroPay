"use client";

import { COMET_DURATION, NODE_PULSE, ORBIT_DURATION } from "@/lib/xeropay-motion";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";

type Props = {
  active: string | null;
};

const nodes = [
  { id: "payroll", cx: 22, cy: 28, delay: "0s" },
  { id: "stocks", cx: 78, cy: 26, delay: "0.7s" },
  { id: "stablecoins", cx: 24, cy: 74, delay: "1.4s" },
  { id: "yield", cx: 76, cy: 72, delay: "2.1s" },
  { id: "n1", cx: 50, cy: 12, delay: "0.4s" },
  { id: "n2", cx: 91, cy: 50, delay: "1.1s" },
  { id: "n3", cx: 50, cy: 88, delay: "1.8s" },
  { id: "n4", cx: 9, cy: 50, delay: "2.5s" },
];

const cometPath = "M 50 22 A 42 28 0 1 1 49.99 22";

export function OrbitSystem({ active }: Props) {
  const enabled = useMotionEnabled();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-[6%] lg:inset-[8%]">
      <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id="orbit-comet-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A78BFA" stopOpacity="0" />
            <stop offset="55%" stopColor="#7C8CFF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#E0E7FF" stopOpacity="0.95" />
          </linearGradient>
          <filter id="orbit-comet-blur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="0.9" />
          </filter>
        </defs>
        <g
          className="origin-center motion-safe:animate-orbit-spin"
          style={{
            animationDuration: `${ORBIT_DURATION}s`,
            animationPlayState: enabled ? "running" : "paused",
          }}
        >
          <ellipse cx="50" cy="50" rx="42" ry="28" fill="none" stroke="rgba(139,92,246,0.18)" strokeWidth="0.28" />
          <ellipse cx="50" cy="50" rx="34" ry="22" fill="none" stroke="rgba(91,140,255,0.16)" strokeWidth="0.22" />
          <ellipse cx="50" cy="50" rx="26" ry="16" fill="none" stroke="rgba(167,139,250,0.12)" strokeWidth="0.18" />
        </g>
        <g className="max-md:hidden">
          <path
            d={cometPath}
            fill="none"
            stroke="url(#orbit-comet-fill)"
            strokeWidth="1.6"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray="14 86"
            filter="url(#orbit-comet-blur)"
            opacity={0.55}
            className="motion-safe:animate-orbit-comet"
            style={{
              animationDuration: `${COMET_DURATION}s`,
              animationPlayState: enabled ? "running" : "paused",
            }}
          />
          <path
            d={cometPath}
            fill="none"
            stroke="url(#orbit-comet-fill)"
            strokeWidth="0.55"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray="10 90"
            className="motion-safe:animate-orbit-comet"
            style={{
              animationDuration: `${COMET_DURATION}s`,
              animationPlayState: enabled ? "running" : "paused",
            }}
          />
        </g>
        {nodes.map((node) => {
          const lit = active === node.id;
          return (
            <circle
              key={node.id}
              cx={node.cx}
              cy={node.cy}
              r={lit ? 1.15 : 0.7}
              fill={lit ? "#A78BFA" : "#7C8CFF"}
              opacity={lit ? 0.95 : 0.45}
              className="motion-safe:animate-status-pulse"
              style={{
                animationDuration: `${NODE_PULSE}s`,
                animationDelay: node.delay,
                animationPlayState: enabled ? "running" : "paused",
              }}
            />
          );
        })}
        <line x1="50" y1="50" x2="22" y2="28" stroke={active === "payroll" ? "rgba(167,139,250,0.45)" : "rgba(140,160,255,0.16)"} strokeWidth="0.22" />
        <line x1="50" y1="50" x2="78" y2="26" stroke={active === "stocks" ? "rgba(167,139,250,0.45)" : "rgba(140,160,255,0.16)"} strokeWidth="0.22" />
        <line x1="50" y1="50" x2="24" y2="74" stroke={active === "stablecoins" ? "rgba(167,139,250,0.45)" : "rgba(140,160,255,0.16)"} strokeWidth="0.22" />
        <line x1="50" y1="50" x2="76" y2="72" stroke={active === "yield" ? "rgba(167,139,250,0.45)" : "rgba(140,160,255,0.16)"} strokeWidth="0.22" />
      </svg>
    </div>
  );
}
