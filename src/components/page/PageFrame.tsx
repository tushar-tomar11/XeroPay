import { SectionAtmosphere } from "@/components/home/SectionAtmosphere";

export function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-svh overflow-x-clip">
      <SectionAtmosphere />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
