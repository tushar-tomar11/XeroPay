"use client";

import { AccountDashboard } from "@/components/home/AccountDashboard";
import { Button } from "@/components/common/Button";
import { useMotionEnabled } from "@/hooks/useMotionEnabled";
import { motion } from "framer-motion";

export function AccountNotMixer() {
  const motionEnabled = useMotionEnabled();

  return (
    <section className="relative overflow-x-clip px-5 py-24 lg:px-10 lg:py-28">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <motion.div
            initial={motionEnabled ? { opacity: 0, y: 20 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[12px] font-medium tracking-[0.22em] text-[#9AA6FF]/80 uppercase">
              The account
            </p>
            <h2 className="mt-4 max-w-xl text-[34px] font-semibold leading-[1.12] tracking-[-0.04em] text-[#F7F7FA] sm:text-[44px] lg:text-[50px]">
              XEROPAY is an account, not a mixer.
            </h2>
            <div className="mt-6 max-w-xl space-y-4 text-[16px] leading-[1.75] text-[#C5C8D4] sm:text-[17px]">
              <p>
                You open it like a neobank: a handle, a balance, statements, and the
                ability to pay, earn, and prove. Underneath is a note-based shielded
                pool secured by zero-knowledge proofs. Only your spending key opens
                those notes.
              </p>
              <p>
                Money comes in through a licensed ramp or a bridge, can be screened
                at the edge, and lands encrypted. From there it behaves like an
                account — and when someone needs a fact you hand over a scoped,
                time-boxed viewing key, not your whole history.
              </p>
            </div>
            <div className="mt-8">
              <Button href="/account" variant="secondary">
                Explore the account
                <span aria-hidden="true">→</span>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={motionEnabled ? { opacity: 0, y: 24 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <AccountDashboard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
