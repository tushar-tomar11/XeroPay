"use client";

import { assets } from "@/config/assets";
import { FloatingObject } from "@/components/effects/FloatingObject";
import { float, afterPhoneDrop } from "@/lib/motion";
import Image from "next/image";

export function PhoneMockup() {
  return (
    <FloatingObject
      y={float.phone.y}
      rotateX={float.phone.rotateX}
      rotateY={float.phone.rotateY}
      duration={float.phone.duration}
      delay={afterPhoneDrop()}
      className="relative"
    >
      <div className="pointer-events-none absolute inset-x-[18%] bottom-[4%] h-[18%] rounded-[100%] bg-[#4F3CFF]/35 blur-3xl" />
      <Image
        src={assets.phone.src}
        alt={assets.phone.alt}
        width={assets.phone.width}
        height={assets.phone.height}
        priority
        className="relative w-full drop-shadow-[0_40px_80px_rgba(8,10,30,0.72)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[12%] rounded-[2.5rem] bg-[linear-gradient(115deg,rgba(255,255,255,0.14)_0%,transparent_28%,transparent_62%,rgba(140,160,255,0.08)_100%)] mix-blend-screen"
      />
    </FloatingObject>
  );
}
