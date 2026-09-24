"use client";

import { assets } from "@/config/assets";
import { FloatingObject } from "@/components/effects/FloatingObject";
import { PANEL_FLOAT_DURATION } from "@/lib/xeropay-motion";
import Image from "next/image";

export function SidePrivacyPanel() {
  return (
    <FloatingObject y={8} rotateX={1.2} rotateY={-3} duration={PANEL_FLOAT_DURATION}>
      <Image
        src={assets.section02.privacyLeft.src}
        alt={assets.section02.privacyLeft.alt}
        width={assets.section02.privacyLeft.width}
        height={assets.section02.privacyLeft.height}
        className="w-[220px] max-w-[20vw] drop-shadow-[0_20px_50px_rgba(40,60,180,0.28)]"
      />
    </FloatingObject>
  );
}

export function SideExposurePanel() {
  return (
    <FloatingObject y={9} rotateX={1.2} rotateY={3} duration={PANEL_FLOAT_DURATION + 1.2} delay={0.4}>
      <Image
        src={assets.section02.exposureRight.src}
        alt={assets.section02.exposureRight.alt}
        width={assets.section02.exposureRight.width}
        height={assets.section02.exposureRight.height}
        className="w-[220px] max-w-[20vw] drop-shadow-[0_20px_50px_rgba(40,60,180,0.28)]"
      />
    </FloatingObject>
  );
}
