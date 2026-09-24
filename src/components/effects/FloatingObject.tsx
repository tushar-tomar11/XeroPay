"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";

type Props = {
  children: ReactNode;
  className?: string;
  y?: number;
  rotateX?: number;
  rotateY?: number;
  duration?: number;
  delay?: number;
};

export function FloatingObject({
  children,
  className,
  y = 10,
  rotateX = 1.5,
  rotateY = 2.2,
  duration = 7.5,
  delay = 0,
}: Props) {
  const enabled = useMotionEnabled();

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -y, 0],
        rotateX: [0, rotateX, 0, -rotateX * 0.5, 0],
        rotateY: [0, rotateY, 0, -rotateY, 0],
      }}
      transition={{
        duration,
        delay,
        ease: "easeInOut",
        repeat: Infinity,
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}
