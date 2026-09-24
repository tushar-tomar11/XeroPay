"use client";

import { useReducedMotion } from "framer-motion";

export function useMotionEnabled() {
  const prefersReduced = useReducedMotion();
  return !prefersReduced;
}
