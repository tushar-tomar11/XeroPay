"use client";

import { assets } from "@/config/assets";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";
import Image from "next/image";
import { useRef, useState, type MouseEvent } from "react";

type Chip = { label: string; caption: string };

export function PageCardVisual({ chips }: { chips: readonly Chip[] }) {
  const motionEnabled = useMotionEnabled();
  const [active, setActive] = useState(0);
  const caption = chips[active]?.caption ?? "";
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, shift: 0 });

  function onMove(event: MouseEvent<HTMLDivElement>) {
    if (!motionEnabled || !cardRef.current) return;
    const box = cardRef.current.getBoundingClientRect();
    const px = (event.clientX - box.left) / box.width - 0.5;
    const py = (event.clientY - box.top) / box.height - 0.5;
    setTilt({
      x: py * -12,
      y: px * 18,
      shift: px * 18,
    });
  }

  function onLeave() {
    setTilt({ x: 0, y: 0, shift: 0 });
  }

  return (
    <div className="relative mx-auto w-full max-w-[380px]">
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative"
        style={{ perspective: 1200 }}
      >
        <div className="pointer-events-none absolute inset-8 rounded-[32px] bg-[#5B8CFF]/20 blur-3xl" />
        <Image
          src={assets.card.src}
          alt={assets.card.alt}
          width={assets.card.width}
          height={assets.card.height}
          className="relative z-10 h-auto w-full drop-shadow-[0_24px_60px_rgba(0,0,0,0.45)] will-change-transform"
          style={{
            transform: motionEnabled
              ? `translateX(${tilt.shift}px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
              : undefined,
            transition: "transform 160ms ease-out",
          }}
        />
      </div>
      <div className="relative z-10 mt-5 flex flex-wrap justify-center gap-2">
        {chips.map((chip, index) => {
          const selected = index === active;
          return (
            <button
              key={chip.label}
              type="button"
              onClick={() => setActive(index)}
              className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition ${
                selected
                  ? "bg-[linear-gradient(90deg,#4F7CFF,#8B5CF6)] text-white"
                  : "border border-white/12 text-[#C8CBD6] hover:border-white/25"
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>
      <p className="relative z-10 mt-3 text-center text-[13px] leading-snug text-[#A6A9B5]">
        {caption}
      </p>
    </div>
  );
}
