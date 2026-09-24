"use client";

import { orbitDuration } from "@/lib/motion";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";

export function Orbit() {
  const enabled = useMotionEnabled();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-[-4%] hidden lg:block">
      <div className="absolute left-[10%] top-[8%] h-[76%] w-[80%] rounded-[50%] border border-[#8B5CF6]/16 [transform:rotateX(64deg)_rotateZ(-16deg)]">
        <span
          className="absolute inset-0 motion-safe:animate-orbit-spin"
          style={{
            animationDuration: `${orbitDuration}s`,
            animationPlayState: enabled ? "running" : "paused",
          }}
        >
          <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#A78BFA] shadow-[0_0_12px_rgba(167,139,250,0.85)]" />
        </span>
      </div>
    </div>
  );
}
