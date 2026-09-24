"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary";

type Props = {
  variant?: Variant;
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  "data-wallet-trigger"?: boolean | "true";
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium tracking-[-0.01em] transition-[box-shadow,background-color,border-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B8CFF]/70";

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-[linear-gradient(90deg,#4F7CFF_0%,#6F6CFF_48%,#8B5CF6_100%)] shadow-[0_10px_30px_rgba(79,124,255,0.28)] hover:shadow-[0_14px_36px_rgba(91,140,255,0.42)]",
  secondary:
    "text-[#F7F7FA] border border-white/14 bg-white/[0.03] hover:border-white/28 hover:bg-white/[0.06]",
};

export function Button({
  variant = "primary",
  href,
  children,
  className = "",
  onClick,
  type = "button",
  disabled,
  "data-wallet-trigger": walletTrigger,
}: Props) {
  const classes = `${base} ${variants[variant]} ${className}`;
  const motionProps = {
    whileHover: { y: -2, scale: 1.01 },
    whileTap: { y: 0, scale: 0.995 },
    transition: { type: "spring" as const, stiffness: 380, damping: 24 },
  };
  const dataAttrs =
    walletTrigger === true || walletTrigger === "true"
      ? { "data-wallet-trigger": "true" as const }
      : {};

  if (href) {
    return (
      <motion.a href={href} className={classes} {...motionProps} {...dataAttrs}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={`${classes} ${disabled ? "pointer-events-none opacity-50" : ""}`}
      onClick={onClick}
      disabled={disabled}
      {...motionProps}
      {...dataAttrs}
    >
      {children}
    </motion.button>
  );
}
