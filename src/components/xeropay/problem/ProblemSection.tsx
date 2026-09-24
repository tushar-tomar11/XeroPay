"use client";

import { FloatingObject } from "@/components/effects/FloatingObject";
import { FloatingOrb, ProblemParticles } from "@/components/xeropay/problem/Atmosphere";
import { OrbitSystem } from "@/components/xeropay/problem/OrbitSystem";
import { ProblemContent } from "@/components/xeropay/problem/ProblemContent";
import { ProblemStory } from "@/components/xeropay/problem/ProblemStory";
import { SideExposurePanel, SidePrivacyPanel } from "@/components/xeropay/problem/SidePanels";
import { assets } from "@/config/assets";
import { cardFocus } from "@/config/story";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { PARALLAX_BACKGROUND, PARALLAX_ORBIT } from "@/lib/xeropay-motion";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

export function ProblemSection() {
  const ref = useRef<HTMLElement>(null);
  const motionEnabled = useMotionEnabled();
  const { x, y } = useMouseParallax(motionEnabled);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = scrollYProgress;
  const bgX = useTransform(x, [-1, 1], [-PARALLAX_BACKGROUND, PARALLAX_BACKGROUND]);
  const bgY = useTransform(y, [-1, 1], [-PARALLAX_BACKGROUND, PARALLAX_BACKGROUND]);
  const orbitX = useTransform(x, [-1, 1], [-PARALLAX_ORBIT, PARALLAX_ORBIT]);
  const orbitY = useTransform(y, [-1, 1], [-PARALLAX_ORBIT, PARALLAX_ORBIT]);
  const orbitScale = useTransform(progress, [0, 0.5, 1], [1, 0.98, 0.94]);
  const orbitFade = useTransform(progress, [0.86, 1], [1, 0.28]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrollActive, setScrollActive] = useState<string | null>(null);

  useMotionValueEvent(progress, "change", (value) => {
    const scores = [
      ["payroll", cardFocus(value, "payroll")],
      ["stocks", cardFocus(value, "stocks")],
      ["stablecoins", cardFocus(value, "stablecoins")],
      ["yield", cardFocus(value, "yield")],
    ] as const;
    const best = scores.reduce((a, b) => (b[1] > a[1] ? b : a));
    setScrollActive(best[1] >= 0.55 ? best[0] : null);
  });

  const active = hovered ?? scrollActive;

  return (
    <section ref={ref} id="the-problem" className="relative h-[280vh] max-w-[100%] overflow-x-clip bg-[#05060B] md:h-[320vh] lg:h-[340vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden" style={{ perspective: 1200 }}>
        <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0">
          <Image
            src={assets.section02.background.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-bottom opacity-90"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(70,90,200,0.16),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(5,6,11,0.4)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-28 bg-gradient-to-b from-[#05060B] via-[#05060B]/55 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-36 bg-gradient-to-t from-[#05060B]/25 to-transparent" />

        <ProblemParticles />
        <FloatingOrb className="left-[18%] top-[22%] h-16 w-16 opacity-40 motion-safe:animate-status-pulse hidden md:block" />
        <FloatingOrb className="right-[16%] top-[28%] h-10 w-10 opacity-30 hidden lg:block" />
        <FloatingOrb className="bottom-[22%] left-[28%] h-8 w-8 opacity-25 hidden md:block" />

        <motion.div style={{ x: orbitX, y: orbitY, scale: orbitScale, opacity: orbitFade }} className="absolute inset-0">
          <OrbitSystem active={active} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-[2%] top-1/2 z-10 hidden -translate-y-1/2 xl:block"
        >
          <SidePrivacyPanel />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-[2%] top-1/2 z-10 hidden -translate-y-1/2 xl:block"
        >
          <SideExposurePanel />
        </motion.div>

        <div className="relative flex h-full flex-col justify-center pt-16">
          <ProblemContent progress={progress} mouseX={x} mouseY={y} />
        </div>

        <ProblemStory
          progress={progress}
          mouseX={x}
          mouseY={y}
          hovered={hovered}
          onHover={setHovered}
        />
      </div>
    </section>
  );
}
