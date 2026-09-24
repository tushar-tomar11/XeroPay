"use client";

import { ParallaxLayer } from "@/components/effects/ParallaxScene";
import { FloatingCard } from "@/components/hero/FloatingCard";
import { Orbit } from "@/components/hero/Orbit";
import { PhoneMockup } from "@/components/hero/PhoneMockup";
import { PrivacyCard } from "@/components/hero/PrivacyCard";
import { XCoin } from "@/components/hero/XCoin";
import { YieldCard } from "@/components/hero/YieldCard";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";
import { drop, EASE_OUT, load, parallax, springs } from "@/lib/motion";
import { motion, type MotionValue } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  scroll: MotionValue<number>;
};

export function HeroVisual({ mouseX, mouseY, scroll }: Props) {
  const motionEnabled = useMotionEnabled();

  return (
    <div
      className="relative isolate h-[540px] w-full min-w-0 overflow-visible sm:h-[560px] lg:h-full lg:min-h-[560px]"
      style={{ perspective: 1400 }}
    >
      <motion.div
        initial={motionEnabled ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={
          motionEnabled
            ? { delay: load.phone.delay, duration: 0.5, ease: EASE_OUT }
            : { duration: 0 }
        }
      >
        <Orbit />
      </motion.div>

      <ParallaxLayer
        mouseX={mouseX}
        mouseY={mouseY}
        scroll={scroll}
        strength={parallax.glass}
        scrollY={-8}
        className="absolute left-[2%] top-[4%] z-20 w-[42%] sm:left-[14%] sm:top-[0%] sm:w-[30%] lg:left-[16%] lg:top-[-1%] lg:w-[30%]"
      >
        <IntroDrop kind="orbiter" delay={load.orbiters.delay} enabled={motionEnabled}>
          <YieldCard />
        </IntroDrop>
      </ParallaxLayer>

      <ParallaxLayer
        mouseX={mouseX}
        mouseY={mouseY}
        scroll={scroll}
        strength={parallax.phone}
        scrollRotateX={6}
        scrollY={10}
        className="absolute left-[18%] top-[18%] z-30 w-[78%] sm:left-[26%] sm:top-[8%] sm:w-[54%] lg:left-[26%] lg:top-[4%] lg:w-[54%]"
      >
        <IntroDrop kind="phone" delay={load.phone.delay} enabled={motionEnabled}>
          <PhoneMockup />
        </IntroDrop>
      </ParallaxLayer>

      <ParallaxLayer
        mouseX={mouseX}
        mouseY={mouseY}
        scroll={scroll}
        strength={parallax.card}
        scrollY={-14}
        hoverRotate
        className="absolute left-[-8%] top-[36%] z-40 w-[56%] sm:left-[-2%] sm:w-[42%] lg:left-[-8%] lg:top-[38%] lg:w-[44%]"
      >
        <IntroDrop
          kind="orbiter"
          delay={load.orbiters.delay + load.orbiterStagger * 2}
          enabled={motionEnabled}
        >
          <FloatingCard />
        </IntroDrop>
      </ParallaxLayer>

      <ParallaxLayer
        mouseX={mouseX}
        mouseY={mouseY}
        scroll={scroll}
        strength={parallax.glass}
        scrollY={-10}
        className="absolute right-[-4%] top-[4%] z-20 w-[36%] sm:right-[0%] sm:w-[28%] lg:right-[-2%] lg:top-[2%] lg:w-[30%]"
      >
        <IntroDrop
          kind="orbiter"
          delay={load.orbiters.delay + load.orbiterStagger}
          enabled={motionEnabled}
        >
          <PrivacyCard />
        </IntroDrop>
      </ParallaxLayer>

      <ParallaxLayer
        mouseX={mouseX}
        mouseY={mouseY}
        scroll={scroll}
        strength={parallax.coin}
        scrollY={18}
        className="absolute bottom-[6%] right-[-4%] z-40 w-[32%] sm:bottom-[8%] sm:w-[24%] lg:bottom-[8%] lg:right-[-2%] lg:w-[22%]"
      >
        <IntroDrop
          kind="orbiter"
          delay={load.orbiters.delay + load.orbiterStagger * 3}
          enabled={motionEnabled}
        >
          <XCoin />
        </IntroDrop>
      </ParallaxLayer>

      <ParallaxLayer
        mouseX={mouseX}
        mouseY={mouseY}
        scroll={scroll}
        strength={parallax.foreground}
        className="absolute bottom-[6%] right-[2%] z-50 hidden lg:block"
      >
        <motion.div
          initial={motionEnabled ? { opacity: 0, y: 12 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={
            motionEnabled
              ? { delay: load.tagline.delay, duration: load.tagline.duration, ease: EASE_OUT }
              : { duration: 0 }
          }
          className="flex flex-col items-end gap-1 text-right"
        >
          <p className="font-[family-name:var(--font-tagline)] text-[15px] italic tracking-wide text-[#C4B5FD]/80">
            Control Without Compromise.
          </p>
          <p className="text-[10px] tracking-[0.18em] text-[#8B90A3] uppercase">
            One account. A more private world.
          </p>
        </motion.div>
      </ParallaxLayer>
    </div>
  );
}

function IntroDrop({
  kind,
  delay,
  enabled,
  children,
}: {
  kind: "phone" | "orbiter";
  delay: number;
  enabled: boolean;
  children: ReactNode;
}) {
  if (!enabled) return children;

  const fromY = kind === "phone" ? drop.phoneY : drop.orbiterY;
  const fromRotate = kind === "phone" ? drop.phoneRotate : 0;

  return (
    <motion.div
      initial={{ y: fromY, rotate: fromRotate, opacity: 0 }}
      animate={{ y: 0, rotate: 0, opacity: 1 }}
      transition={{
        opacity: { duration: 0.18, ease: "easeOut", delay },
        y: { delay, ...springs.drop },
        rotate: { delay, ...springs.drop },
      }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}
