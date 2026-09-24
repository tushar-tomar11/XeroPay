"use client";

import { ChainLogos } from "@/components/common/ChainLogos";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";
import { EASE_OUT, load } from "@/lib/motion";
import { motion } from "framer-motion";

export function HeroBridge() {
  const motionEnabled = useMotionEnabled();

  return (
    <div
      aria-label="Supported networks"
      className="relative z-20 mt-auto flex w-full shrink-0 flex-col items-center justify-center px-5 pb-10 pt-10 text-center sm:pb-12 sm:pt-12 lg:pb-14 lg:pt-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5B8CFF]/25 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(91,140,255,0.08),transparent_62%)]"
      />

      <motion.div
        initial={motionEnabled ? { opacity: 0, y: 12 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={
          motionEnabled
            ? { delay: load.chains.delay, duration: load.chains.duration, ease: EASE_OUT }
            : { duration: 0 }
        }
        className="relative flex w-full max-w-[1280px] flex-col items-center gap-5 sm:gap-6"
      >
        <p className="text-[13px] font-medium tracking-[0.2em] text-[#D6DAE8] uppercase sm:text-[15px] lg:text-[17px]">
          Built for a more open financial future
        </p>
        <ChainLogos />
      </motion.div>
    </div>
  );
}
