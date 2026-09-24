"use client";

import { type MotionValue, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import { springs } from "@/lib/motion";

export type ParallaxValues = {
  x: MotionValue<number>;
  y: MotionValue<number>;
};

export function useMouseParallax(enabled: boolean): ParallaxValues {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, springs.parallax);
  const y = useSpring(rawY, springs.parallax);

  useEffect(() => {
    if (!enabled || window.matchMedia("(pointer: coarse)").matches) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const onMove = (event: PointerEvent) => {
      const nx = (event.clientX / window.innerWidth) * 2 - 1;
      const ny = (event.clientY / window.innerHeight) * 2 - 1;
      rawX.set(nx);
      rawY.set(ny);
    };

    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, rawX, rawY]);

  return { x, y };
}
