"use client";

import { Button } from "@/components/common/Button";
import { jobs } from "@/config/site";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";
import { motion } from "framer-motion";
import { useState } from "react";

export function JobsExplorer() {
  const motionEnabled = useMotionEnabled();
  const [active, setActive] = useState<(typeof jobs)[number]["id"]>("shield");
  const current = jobs.find((job) => job.id === active) ?? jobs[2];

  return (
    <section className="relative overflow-x-clip px-5 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto w-full max-w-[1440px]">
        <motion.div
          initial={motionEnabled ? { opacity: 0, y: 18 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="text-[12px] font-medium tracking-[0.22em] text-[#9AA6FF]/80 uppercase">
            One account, five jobs
          </p>
          <h2 className="mt-4 text-[30px] font-semibold leading-[1.15] tracking-[-0.04em] text-[#F7F7FA] sm:text-[42px] lg:text-[48px]">
            Earn, spend, pay and prove — without putting a balance on the explorer.
          </h2>
        </motion.div>

        <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-white/10 bg-white/[0.03] p-3 sm:p-5">
          <div
            role="tablist"
            aria-label="Account jobs"
            className="flex flex-wrap justify-center gap-2"
          >
            {jobs.map((job) => {
              const selected = job.id === active;
              return (
                <button
                  key={job.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(job.id)}
                  className={`rounded-full px-4 py-2 text-[13px] font-medium transition ${
                    selected
                      ? "bg-[linear-gradient(90deg,#4F7CFF,#8B5CF6)] text-white"
                      : "border border-white/10 text-[#C8CBD6] hover:border-white/25 hover:text-white"
                  }`}
                >
                  {job.label}
                </button>
              );
            })}
          </div>

          <div className="mt-8 min-h-[160px] px-3 pb-4 text-center sm:px-8">
            <p className="text-[12px] tracking-[0.2em] text-[#8B90A3] uppercase">{current.label}</p>
            <h3 className="mt-3 text-[22px] font-semibold tracking-[-0.03em] text-[#F7F7FA] sm:text-[26px]">
              {current.title}
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-[1.7] text-[#A6A9B5] sm:text-[16px]">
              {current.body}
            </p>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Button href="/account">
            Explore the account
            <span aria-hidden="true">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
