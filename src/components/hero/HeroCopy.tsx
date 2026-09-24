"use client";

import { Button } from "@/components/common/Button";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";
import { motion } from "framer-motion";
import { EASE_OUT, introOffset, load } from "@/lib/motion";

export function HeroCopy() {
  const motionEnabled = useMotionEnabled();
  const fadeUp = (delay: number, duration: number) =>
    motionEnabled
      ? {
          initial: { opacity: 0, y: introOffset },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration, ease: EASE_OUT },
        }
      : {
          initial: false as const,
          animate: { opacity: 1, y: 0 },
        };

  return (
    <div className="hero-copy relative z-10 w-full min-w-0 pt-4 lg:pt-6">
      <motion.p
        {...fadeUp(load.eyebrow.delay, load.eyebrow.duration)}
        className="w-full max-w-full text-[10px] font-medium tracking-[0.12em] text-[#9AA6FF]/80 uppercase sm:text-[12px] sm:tracking-[0.28em]"
      >
        Privacy × Yield × Real Utility
      </motion.p>

      <motion.h1
        {...fadeUp(load.headline.delay, load.headline.duration)}
        className="hero-title mt-4 max-w-full font-semibold leading-[1.06] tracking-[-0.045em] text-[#F7F7FA]"
      >
        Money moves
        <span className="mt-1 block lg:whitespace-nowrap">
          better in{" "}
          <span className="bg-[linear-gradient(90deg,#5B8CFF_0%,#8B5CF6_100%)] bg-clip-text text-transparent">
            private.
          </span>
        </span>
      </motion.h1>

      <motion.p
        {...fadeUp(load.description.delay, load.description.duration)}
        className="mt-5 w-full text-[15px] leading-[1.65] text-[#A6A9B5] sm:text-[18px] lg:text-[19px]"
      >
        XEROPAY is a self-custodial privacy neobank on-chain.
        Your stablecoins and tokenized stocks stay invisible,
        keep earning yield, and remain fully yours — without
        compromising compliance.
      </motion.p>

      <motion.div
        {...fadeUp(load.cta.delay, load.cta.duration)}
        className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button href="/dapp" variant="primary">
            Access dApp
            <span aria-hidden="true">→</span>
          </Button>
          <Button href="/business" variant="secondary">
            For Business
          </Button>
        </div>
        <a
          href="#the-problem"
          className="group inline-flex items-center gap-3 text-left"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-white/[0.03] transition duration-300 group-hover:-translate-y-0.5 group-hover:border-white/40">
            <svg viewBox="0 0 10 12" className="ml-0.5 h-3 w-3 transition duration-300 group-hover:translate-x-px" aria-hidden="true">
              <path d="M1 0.8v10.4L9.4 6 1 0.8Z" fill="#F7F7FA" />
            </svg>
          </span>
          <span className="text-[13px] leading-tight text-[#C5C8D4]">
            See the problem
            <span className="block text-[12px] text-[#8B8F9C]">Scroll story</span>
          </span>
        </a>
      </motion.div>

      <motion.dl
        {...fadeUp(load.stats.delay, load.stats.duration)}
        className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-0"
      >
        <Stat title="100%" body="Self-custodial" />
        <Stat title="Multi-chain" body="Assets & yield" bordered />
        <Stat title="Private by default" body="Your data, your control" bordered />
      </motion.dl>
    </div>
  );
}

function Stat({
  title,
  body,
  bordered = false,
}: {
  title: string;
  body: string;
  bordered?: boolean;
}) {
  return (
    <div
      className={`sm:px-5 ${bordered ? "sm:border-l sm:border-white/10" : "sm:pl-0 sm:pr-5"}`}
    >
      <dt className="text-[15px] font-medium text-white">{title}</dt>
      <dd className="mt-1 text-[13px] text-[#8F93A3]">{body}</dd>
    </div>
  );
}
