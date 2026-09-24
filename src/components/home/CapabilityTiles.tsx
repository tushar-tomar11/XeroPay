"use client";

import { capabilities } from "@/config/site";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";
import { motion } from "framer-motion";

export function CapabilityTiles() {
  const motionEnabled = useMotionEnabled();

  return (
    <section className="relative overflow-x-clip px-5 pb-24 lg:px-10 lg:pb-32">
      <div className="mx-auto grid w-full max-w-[1440px] gap-4 sm:grid-cols-2">
        {capabilities.map((item, index) => (
          <motion.article
            key={item.title}
            initial={motionEnabled ? { opacity: 0, y: 16 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-8"
          >
            <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-[#F7F7FA]">
              {item.title}
            </h3>
            <p className="mt-3 text-[15px] leading-[1.7] text-[#A6A9B5]">{item.body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
