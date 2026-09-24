"use client";

import { ProblemParticles } from "@/components/xeropay/problem/Atmosphere";
import { assets } from "@/config/assets";
import Image from "next/image";

export function SectionAtmosphere() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <Image
        src={assets.section02.background.src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-bottom opacity-90"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(70,90,200,0.16),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(5,6,11,0.55)_100%)]" />
      <ProblemParticles />
    </div>
  );
}
