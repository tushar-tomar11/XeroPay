"use client";

import { assets } from "@/config/assets";
import { FloatingObject } from "@/components/effects/FloatingObject";
import { afterOrbiter, coinSpinDuration, float } from "@/lib/motion";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";
import Image from "next/image";

export function XCoin() {
  const enabled = useMotionEnabled();

  return (
    <FloatingObject
      y={float.coin.y}
      rotateX={float.coin.rotateX}
      rotateY={float.coin.rotateY}
      duration={float.coin.duration}
      delay={afterOrbiter(3)}
    >
      <div className="relative mx-auto w-[78%]">
        <div className="pointer-events-none absolute inset-[8%] rounded-full bg-[#5B8CFF]/30 blur-2xl" />
        <div
          className="relative [transform-style:preserve-3d] motion-safe:animate-coin-spin"
          style={{
            animationDuration: `${coinSpinDuration}s`,
            animationPlayState: enabled ? "running" : "paused",
          }}
        >
          <Image
            src={assets.coin.src}
            alt={assets.coin.alt}
            width={assets.coin.width}
            height={assets.coin.height}
            className="relative w-full [backface-visibility:hidden]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 [transform:rotateY(180deg)_translateZ(1px)] [backface-visibility:hidden]"
          >
            <Image
              src={assets.coin.src}
              alt=""
              width={assets.coin.width}
              height={assets.coin.height}
              className="-scale-x-100"
            />
          </div>
        </div>
      </div>
    </FloatingObject>
  );
}
