"use client";

import { FloatingObject } from "@/components/effects/FloatingObject";
import { ConsequenceCard } from "@/components/xeropay/problem/ConsequenceCard";
import { FinancialDataCard } from "@/components/xeropay/problem/FinancialDataCard";
import { ProblemCard } from "@/components/xeropay/problem/ProblemCard";
import { assets } from "@/config/assets";
import { cardFocus, storyBlend, storyStates } from "@/config/story";
import { CARD_FLOAT_DURATION, PARALLAX_CARDS, PARALLAX_FOREGROUND } from "@/lib/xeropay-motion";
import {
  motion,
  useMotionTemplate,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";

type Props = {
  progress: MotionValue<number>;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  hovered: string | null;
  onHover: (id: string | null) => void;
};

function CardSlot({
  progress,
  mouseX,
  mouseY,
  id,
  rest,
  toward,
  children,
}: {
  progress: MotionValue<number>;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  id: "payroll" | "stocks" | "stablecoins" | "yield";
  rest: string;
  toward: { x: number; y: number };
  children: ReactNode;
}) {
  const focus = useTransform(progress, (p) => cardFocus(p, id));
  const xFocus = useTransform(focus, [0, 1], [0, toward.x]);
  const yFocus = useTransform(focus, [0, 1], [0, toward.y]);
  const xMouse = useTransform(mouseX, [-1, 1], [-PARALLAX_CARDS, PARALLAX_CARDS]);
  const yMouse = useTransform(mouseY, [-1, 1], [-PARALLAX_CARDS * 0.8, PARALLAX_CARDS * 0.8]);
  const x = useTransform([xFocus, xMouse], (v) => Number(v[0]) + Number(v[1]));
  const y = useTransform([yFocus, yMouse], (v) => Number(v[0]) + Number(v[1]));
  const scale = useTransform(focus, [0, 0.32, 1], [0.92, 0.98, 1.04]);
  const opacity = useTransform(focus, [0, 0.32, 1], [0.42, 0.78, 1]);
  const blur = useTransform(focus, [0, 0.32, 1], [2, 0.6, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;
  const rotateY = useTransform(mouseX, [-1, 1], [-3.4, 3.4]);
  const rotateX = useTransform(mouseY, [-1, 1], [2.4, -2.4]);

  return (
    <motion.div
      className={`absolute z-30 ${rest}`}
      style={{ x, y, scale, opacity, filter, rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}

function CopyLayer({
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
  return (
    <motion.div style={{ opacity }} className={`${className ?? ""} pointer-events-none`}>
      {children}
    </motion.div>
  );
}

export function ProblemStory({ progress, mouseX, mouseY, hovered, onHover }: Props) {
  const problemY = useTransform(progress, [0, 1], [0, -18]);
  const consequenceY = useTransform(progress, [0, 1], [0, 20]);
  const fgX = useTransform(mouseX, [-1, 1], [-PARALLAX_FOREGROUND, PARALLAX_FOREGROUND]);
  const fgY = useTransform(mouseY, [-1, 1], [-PARALLAX_FOREGROUND * 0.7, PARALLAX_FOREGROUND * 0.7]);
  const problemYCombined = useTransform([problemY, fgY], (v) => Number(v[0]) + Number(v[1]));
  const consequenceYCombined = useTransform([consequenceY, fgY], (v) => Number(v[0]) + Number(v[1]));

  return (
    <>
      <motion.div
        style={{ x: fgX, y: problemYCombined }}
        className="absolute top-24 left-1/2 z-40 w-max -translate-x-1/2"
      >
        <FloatingObject y={6} rotateX={1.2} rotateY={2} duration={CARD_FLOAT_DURATION}>
          <div className="relative h-[78px] w-[280px]">
            {storyStates.map((state, index) => (
              <CopyLayer key={state.id} progress={progress} index={index} className="absolute inset-0 flex justify-center">
                <ProblemCard {...state.problem} />
              </CopyLayer>
            ))}
          </div>
        </FloatingObject>
      </motion.div>

      <CardSlot progress={progress} mouseX={mouseX} mouseY={mouseY} id="payroll" rest="left-[4%] top-[22%] hidden sm:block lg:left-[8%] lg:top-[20%]" toward={{ x: 72, y: 46 }}>
        <FloatingObject y={7} rotateY={2.2} duration={CARD_FLOAT_DURATION} delay={0.1}>
          <button type="button" className="block w-[260px] lg:w-[310px]" onMouseEnter={() => onHover("payroll")} onMouseLeave={() => onHover(null)}>
            <Image src={assets.section02.payroll.src} alt={assets.section02.payroll.alt} width={assets.section02.payroll.width} height={assets.section02.payroll.height} className="h-auto w-full" />
          </button>
        </FloatingObject>
      </CardSlot>

      <CardSlot progress={progress} mouseX={mouseX} mouseY={mouseY} id="stocks" rest="right-[4%] top-[22%] hidden sm:block lg:right-[8%] lg:top-[20%]" toward={{ x: -72, y: 46 }}>
        <FloatingObject y={8} rotateY={-2.2} duration={CARD_FLOAT_DURATION + 0.6} delay={0.25}>
          <button type="button" className="block w-[260px] lg:w-[310px]" onMouseEnter={() => onHover("stocks")} onMouseLeave={() => onHover(null)}>
            <Image src={assets.section02.stocks.src} alt={assets.section02.stocks.alt} width={assets.section02.stocks.width} height={assets.section02.stocks.height} className="h-auto w-full" />
          </button>
        </FloatingObject>
      </CardSlot>

      <CardSlot progress={progress} mouseX={mouseX} mouseY={mouseY} id="stablecoins" rest="bottom-[18%] left-[4%] lg:bottom-[16%] lg:left-[9%]" toward={{ x: 64, y: -40 }}>
        <FloatingObject y={6} rotateY={2} duration={CARD_FLOAT_DURATION + 1.1} delay={0.35}>
          <FinancialDataCard
            title="Stablecoins"
            address="0x9c2...4b18"
            emphasized={hovered === "stablecoins"}
            onHover={(value) => onHover(value ? "stablecoins" : null)}
            icon={
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="M12 7.2v9.6M9.4 9.2c.6-1 1.6-1.5 2.6-1.5 1.6 0 2.7 1 2.7 2.3 0 3.2-5.4 1.6-5.4 4.2 0 1.2 1.1 2.2 2.7 2.2 1.1 0 2-.5 2.6-1.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            }
          />
        </FloatingObject>
      </CardSlot>

      <CardSlot progress={progress} mouseX={mouseX} mouseY={mouseY} id="yield" rest="bottom-[18%] right-[4%] lg:bottom-[16%] lg:right-[9%]" toward={{ x: -64, y: -40 }}>
        <FloatingObject y={7} rotateY={-2} duration={CARD_FLOAT_DURATION + 0.8} delay={0.5}>
          <FinancialDataCard
            title="DeFi Yield"
            address="0x5d4...c71e"
            emphasized={hovered === "yield"}
            onHover={(value) => onHover(value ? "yield" : null)}
            icon={
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M5 16.5 10 11l3.2 3.2L19 8.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M14.5 8.5H19V13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            }
          />
        </FloatingObject>
      </CardSlot>

      <motion.div
        style={{ x: fgX, y: consequenceYCombined }}
        className="absolute bottom-6 left-1/2 z-40 w-max -translate-x-1/2"
      >
        <FloatingObject y={7} rotateX={-1} rotateY={2} duration={CARD_FLOAT_DURATION + 0.4} delay={0.2}>
          <div className="relative h-[68px] w-[min(92vw,420px)]">
            {storyStates.map((state, index) => (
              <CopyLayer key={state.id} progress={progress} index={index} className="absolute inset-0 flex justify-center">
                <ConsequenceCard {...state.consequence} />
              </CopyLayer>
            ))}
          </div>
        </FloatingObject>
      </motion.div>
    </>
  );
}
