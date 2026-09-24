"use client";

import { HeroBridge } from "@/components/hero/HeroBridge";
import { HeroCopy } from "@/components/hero/HeroCopy";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { assets } from "@/config/assets";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { EASE_OUT, load } from "@/lib/motion";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const motionEnabled = useMotionEnabled();
  const { x, y } = useMouseParallax(motionEnabled);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scroll = useTransform(scrollYProgress, [0, 1], motionEnabled ? [0, 1] : [0, 0]);
  const bgY = useTransform(scroll, [0, 1], [0, 28]);

  return (
    <section
      ref={ref}
      id="personal"
      className="relative flex min-h-[calc(100svh-72px)] flex-col overflow-x-clip"
    >
      <motion.div
        style={{ y: bgY }}
        initial={motionEnabled ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={
          motionEnabled
            ? { delay: load.bg.delay, duration: load.bg.duration, ease: EASE_OUT }
            : { duration: 0 }
        }
        className="pointer-events-none absolute inset-x-0 top-[52%] bottom-[-8%] sm:inset-y-[-8%] sm:right-[-4%] sm:left-auto sm:w-[62%]"
      >
        <Image
          src={assets.background.src}
          alt=""
          fill
          priority
          sizes="62vw"
          className="object-cover object-[70%_88%] opacity-95"
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_62%,rgba(70,80,180,0.18),transparent_46%)]" />
      <div className="hero-veil pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_48%,rgba(5,6,11,0.42)_100%)]" />

      <div className="relative mx-auto grid w-full min-w-0 max-w-[1440px] flex-1 grid-cols-1 items-center gap-6 px-5 py-4 lg:grid-cols-[0.43fr_0.57fr] lg:gap-4 lg:px-10 lg:pb-10 lg:pt-2">
        <HeroCopy />
        <HeroVisual mouseX={x} mouseY={y} scroll={scroll} />
      </div>

      <HeroBridge />
    </section>
  );
}
