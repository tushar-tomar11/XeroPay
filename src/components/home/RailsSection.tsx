"use client";

import { rails } from "@/config/site";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";
import { motion } from "framer-motion";
import { useState } from "react";

export function RailsSection() {
  const motionEnabled = useMotionEnabled();
  const [active, setActive] = useState<(typeof rails)[number]["id"]>("assets");
  const current = rails.find((rail) => rail.id === active) ?? rails[0];

  return (
    <section
      id="integrations"
      className="relative overflow-x-clip px-5 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto grid w-full max-w-[1440px] gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:items-start lg:gap-16">
        <motion.div
          initial={motionEnabled ? { opacity: 0, y: 18 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[12px] font-medium tracking-[0.22em] text-[#9AA6FF]/80 uppercase">
            Rails
          </p>
          <h2 className="mt-4 text-[30px] font-semibold leading-[1.15] tracking-[-0.04em] text-[#F7F7FA] sm:text-[40px]">
            Plugs into the rails you already use, without showing anyone what runs through them.
          </h2>
        </motion.div>

        <div>
          <nav aria-label="Panel navigation" className="flex flex-wrap gap-2">
            {rails.map((rail) => {
              const selected = rail.id === active;
              return (
                <button
                  key={rail.id}
                  type="button"
                  onClick={() => setActive(rail.id)}
                  className={`rounded-full px-3.5 py-1.5 text-[13px] transition ${
                    selected
                      ? "bg-white text-[#05060B]"
                      : "border border-white/10 text-[#C8CBD6] hover:border-white/25"
                  }`}
                >
                  {rail.label}
                </button>
              );
            })}
          </nav>
          <div className="mt-8 rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(91,140,255,0.08),rgba(5,6,11,0.2))] p-7 sm:p-10">
            <h3 className="text-[22px] font-semibold tracking-[-0.03em] text-[#F7F7FA]">
              {current.title}
            </h3>
            <p className="mt-4 max-w-xl text-[15px] leading-[1.7] text-[#B4B8C6] sm:text-[16px]">
              {current.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
