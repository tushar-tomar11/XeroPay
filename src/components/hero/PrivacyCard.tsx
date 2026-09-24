"use client";

import { assets } from "@/config/assets";
import { FloatingObject } from "@/components/effects/FloatingObject";
import { afterOrbiter, float } from "@/lib/motion";
import Image from "next/image";

export function PrivacyCard() {
  return (
    <FloatingObject
      y={float.privacyCard.y}
      rotateX={float.privacyCard.rotateX}
      rotateY={float.privacyCard.rotateY}
      duration={float.privacyCard.duration}
      delay={afterOrbiter(1)}
    >
      <div className="relative">
        <div className="pointer-events-none absolute inset-[22%] rounded-3xl bg-[#7A5CFF]/22 blur-2xl" />
        <Image
          src={assets.privacyCard.src}
          alt={assets.privacyCard.alt}
          width={assets.privacyCard.width}
          height={assets.privacyCard.height}
          className="relative w-full"
        />
      </div>
    </FloatingObject>
  );
}
