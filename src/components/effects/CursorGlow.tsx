"use client";

import { useEffect, useState } from "react";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";

export function CursorGlow() {
  const enabled = useMotionEnabled();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled || window.matchMedia("(pointer: coarse)").matches) return;

    const root = document.documentElement;
    const onMove = (event: PointerEvent) => {
      root.style.setProperty("--mouse-x", `${event.clientX}px`);
      root.style.setProperty("--mouse-y", `${event.clientY}px`);
      setVisible(true);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 hidden lg:block"
      style={{
        opacity: visible ? 1 : 0,
        background:
          "radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(100, 90, 255, 0.08), transparent 30%)",
      }}
    />
  );
}
