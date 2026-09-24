import { AccountNotMixer } from "@/components/home/AccountNotMixer";
import { BuiltOn } from "@/components/home/BuiltOn";
import { CapabilityTiles } from "@/components/home/CapabilityTiles";
import { JobsExplorer } from "@/components/home/JobsExplorer";
import { RailsSection } from "@/components/home/RailsSection";
import { SectionAtmosphere } from "@/components/home/SectionAtmosphere";
import { Hero } from "@/components/hero/Hero";
import { ProblemSection } from "@/components/xeropay/problem/ProblemSection";

export default function HomePage() {
  return (
    <main id="top" className="relative overflow-x-clip bg-[#05060B]">
      <Hero />
      <ProblemSection />
      <div className="relative">
        <SectionAtmosphere />
        <div className="relative z-[1]">
          <AccountNotMixer />
          <BuiltOn />
          <JobsExplorer />
          <RailsSection />
          <CapabilityTiles />
        </div>
      </div>
    </main>
  );
}
