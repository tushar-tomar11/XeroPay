"use client";

import {
  motion,
  useMotionTemplate,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { ReactNode } from "react";
import { springs } from "@/lib/motion";

type Strength = {
  x: number;
  y: number;
  rotate: number;
};

type Props = {
  children: ReactNode;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  scroll: MotionValue<number>;
  strength: Strength;
  className?: string;
  scrollRotateX?: number;
  scrollY?: number;
  hoverRotate?: boolean;
};

export function ParallaxLayer({
  children,
  mouseX,
  mouseY,
  scroll,
  strength,
  className,
  scrollRotateX = 0,
  scrollY = 0,
  hoverRotate = false,
}: Props) {
  const x = useTransform(mouseX, [-1, 1], [-strength.x, strength.x]);
  const yMouse = useTransform(mouseY, [-1, 1], [-strength.y, strength.y]);
  const yScroll = useTransform(scroll, [0, 1], [0, scrollY]);
  const y = useTransform([yMouse, yScroll], (values) => Number(values[0]) + Number(values[1]));
  const rotateY = useTransform(mouseX, [-1, 1], [-strength.rotate, strength.rotate]);
  const rotateXMouse = useTransform(mouseY, [-1, 1], [strength.rotate * 0.7, -strength.rotate * 0.7]);
  const rotateXScroll = useTransform(scroll, [0, 1], [0, scrollRotateX]);
  const rotateX = useTransform(
    [rotateXMouse, rotateXScroll],
    (values) => Number(values[0]) + Number(values[1]),
  );

  const hoverRX = useSpring(0, springs.ui);
  const hoverRY = useSpring(0, springs.ui);

  const transform = useMotionTemplate`translate3d(${x}px, ${y}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  return (
    <motion.div style={{ transform, transformStyle: "preserve-3d" }} className={className}>
      <motion.div
        style={{ rotateX: hoverRX, rotateY: hoverRY, transformStyle: "preserve-3d" }}
        onMouseMove={
          hoverRotate
            ? (event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                const px = (event.clientX - rect.left) / rect.width - 0.5;
                const py = (event.clientY - rect.top) / rect.height - 0.5;
                hoverRY.set(px * 6);
                hoverRX.set(-py * 4);
              }
            : undefined
        }
        onMouseLeave={
          hoverRotate
            ? () => {
                hoverRX.set(0);
                hoverRY.set(0);
              }
            : undefined
        }
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
