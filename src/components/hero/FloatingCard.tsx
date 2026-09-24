"use client";

import { assets } from "@/config/assets";
import { FloatingObject } from "@/components/effects/FloatingObject";
import { afterOrbiter, float } from "@/lib/motion";
import Image from "next/image";

export function FloatingCard() {
  return (
    <FloatingObject
      y={float.card.y}
      rotateX={float.card.rotateX}
      rotateY={float.card.rotateY}
      duration={float.card.duration}
      delay={afterOrbiter(2)}
    >
      <div className="relative">
        <Image
          src={assets.card.src}
          alt={assets.card.alt}
          width={assets.card.width}
          height={assets.card.height}
          className="w-full drop-shadow-[0_24px_50px_rgba(40,50,160,0.35)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[18%] motion-safe:animate-shine"
        >
          <span className="absolute -left-1/3 top-0 h-full w-1/3 rotate-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)]" />
        </span>
      </div>
    </FloatingObject>
  );
}
