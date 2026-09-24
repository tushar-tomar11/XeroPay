"use client";

import { assets } from "@/config/assets";
import { FloatingObject } from "@/components/effects/FloatingObject";
import { afterOrbiter, float } from "@/lib/motion";
import Image from "next/image";

export function YieldCard() {
  return (
    <FloatingObject
      y={float.yieldCard.y}
      rotateX={float.yieldCard.rotateX}
      rotateY={float.yieldCard.rotateY}
      duration={float.yieldCard.duration}
      delay={afterOrbiter(0)}
    >
      <div className="relative">
        <div className="pointer-events-none absolute inset-[18%] rounded-3xl bg-[#6D5CFF]/25 blur-2xl" />
        <Image
          src={assets.yieldCard.src}
          alt={assets.yieldCard.alt}
          width={assets.yieldCard.width}
          height={assets.yieldCard.height}
          className="relative w-full"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-[12%] overflow-hidden rounded-[18%] motion-safe:animate-shine-delayed"
        >
          <span className="absolute -left-1/3 top-0 h-full w-1/3 rotate-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent)]" />
        </span>
      </div>
    </FloatingObject>
  );
}
