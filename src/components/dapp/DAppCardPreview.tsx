"use client";

import { assets } from "@/config/assets";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";
import Image from "next/image";
import { useRef, useState, type MouseEvent } from "react";

export function DAppCardPreview() {
  const motionEnabled = useMotionEnabled();
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, shift: 0, gx: 42, gy: 28 });

  function onMove(event: MouseEvent<HTMLDivElement>) {
    if (!motionEnabled || !stageRef.current) return;
    const box = stageRef.current.getBoundingClientRect();
    const px = (event.clientX - box.left) / box.width - 0.5;
    const py = (event.clientY - box.top) / box.height - 0.5;
    setTilt({
      x: py * -16,
      y: px * 24,
      shift: px * 14,
      gx: (px + 0.5) * 100,
      gy: (py + 0.5) * 100,
    });
  }

  function onLeave() {
    setTilt({ x: 0, y: 0, shift: 0, gx: 42, gy: 28 });
  }

  return (
    <div className="relative isolate flex min-h-[300px] w-full items-center justify-center lg:min-h-[420px]">
      <p className="pointer-events-none absolute top-0 right-0 hidden text-right text-[11px] tracking-[0.22em] text-white/55 uppercase lg:block">
        Same
        <br />
        address.
        <br />
        Total
        <br />
        control.
      </p>
      <div
        ref={stageRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative w-full max-w-[520px] cursor-grab touch-none select-none active:cursor-grabbing"
        style={{ perspective: 1400 }}
      >
        <div className="pointer-events-none absolute inset-[18%] rounded-[40px] bg-[#6B7CFF]/28 blur-3xl" />
        <div className={motionEnabled ? "dapp-card-float" : undefined}>
          <div
            className="relative will-change-transform"
            style={{
              transform: motionEnabled
                ? `translateX(${tilt.shift}px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                : undefined,
              transformStyle: "preserve-3d",
              transition: "transform 140ms ease-out",
            }}
          >
            <Image
              src={assets.card.src}
              alt={assets.card.alt}
              width={assets.card.width}
              height={assets.card.height}
              priority
              unoptimized
              draggable={false}
              className="relative z-10 h-auto w-full select-none drop-shadow-[0_28px_70px_rgba(40,50,160,0.55)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-[12%] z-20 rounded-[28px]"
              style={{
                background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.22), transparent 55%)`,
                opacity: motionEnabled ? 1 : 0,
              }}
            />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute right-0 bottom-[4%] z-20 max-w-[180px] rounded-2xl border border-white/15 bg-[#0B0E1A]/80 p-3 backdrop-blur-md">
        <p className="text-[10px] tracking-[0.16em] text-[#9AA6FF] uppercase">Private by design</p>
        <p className="mt-1 text-[12px] leading-snug text-[#C8CBD6]">Onchain finance without compromise.</p>
      </div>
    </div>
  );
}
