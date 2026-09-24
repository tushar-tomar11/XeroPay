"use client";

import { storyBlend, storyStates } from "@/config/story";
import { PARALLAX_COPY } from "@/lib/xeropay-motion";
import { motion, useMotionTemplate, useTransform, type MotionValue } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  progress: MotionValue<number>;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
};

function Layer({
  progress,
  index,
  children,
  className,
}: {
  progress: MotionValue<number>;
  index: number;
  children: ReactNode;
  className?: string;
}) {
  const opacity = useTransform(progress, (p) => {
    const { from, to, mix } = storyBlend(p);
    if (from === index && to === index) return 1;
    if (from === index) return 1 - mix;
    if (to === index) return mix;
    return 0;
  });
  const y = useTransform(opacity, [0, 1], [12, 0]);
  const blur = useTransform(opacity, [0, 1], [5, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.div
      style={{ opacity, y, filter }}
      className={className ? `${className} pointer-events-none` : "pointer-events-none"}
    >
      {children}
    </motion.div>
  );
}

export function ProblemContent({ progress, mouseX, mouseY }: Props) {
  const x = useTransform(mouseX, [-1, 1], [-PARALLAX_COPY, PARALLAX_COPY]);
  const y = useTransform(mouseY, [-1, 1], [-PARALLAX_COPY, PARALLAX_COPY]);

  return (
    <motion.div
      style={{ x, y }}
      className="relative z-20 mx-auto flex min-h-[240px] w-full max-w-[640px] flex-col items-center px-5 text-center sm:min-h-[280px]"
    >
      <div className="relative h-[22px] w-full">
        {storyStates.map((state, index) => (
          <Layer key={state.id} progress={progress} index={index} className="absolute inset-0">
            <p className="text-[11px] font-medium tracking-[0.28em] text-[#9AA6FF]/80 uppercase">
              {state.label}
            </p>
          </Layer>
        ))}
      </div>

      <div className="relative mt-4 min-h-[132px] w-full sm:min-h-[168px]">
        {storyStates.map((state, index) => (
          <Layer key={state.id} progress={progress} index={index} className="absolute inset-0">
            <h2 className="text-[28px] font-semibold leading-[1.12] tracking-[-0.04em] text-[#F7F7FA] sm:text-[40px] lg:text-[46px]">
              {state.headline.map((line, lineIndex) => (
                <span key={line} className="block">
                  {line}
                  {lineIndex === state.headline.length - 1 ? (
                    <>
                      {" "}
                      <span className="bg-[linear-gradient(90deg,#5B8CFF_0%,#8B5CF6_100%)] bg-clip-text text-transparent">
                        {state.accent}
                      </span>
                    </>
                  ) : null}
                </span>
              ))}
            </h2>
          </Layer>
        ))}
      </div>

      <div className="relative mt-5 min-h-[112px] w-full max-w-[540px] sm:min-h-[120px]">
        {storyStates.map((state, index) => (
          <Layer key={state.id} progress={progress} index={index} className="absolute inset-0">
            {state.description.map((paragraph) => (
              <p key={paragraph} className="mt-2 text-[14px] leading-[1.65] text-[#A6A9B5] sm:text-[16px] first:mt-0">
                {paragraph}
              </p>
            ))}
          </Layer>
        ))}
      </div>
    </motion.div>
  );
}
