import { ChainLogos } from "@/components/common/ChainLogos";

export function BuiltOn() {
  return (
    <section className="relative overflow-x-clip px-5 py-16 lg:px-10">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-8 text-center">
        <div>
          <p className="text-[12px] font-medium tracking-[0.22em] text-[#9AA6FF]/80 uppercase">
            Built on
          </p>
          <h2 className="mt-3 text-[22px] font-semibold tracking-[-0.03em] text-[#F7F7FA] sm:text-[28px]">
            Multi-chain from the first account
          </h2>
        </div>
        <ChainLogos />
      </div>
    </section>
  );
}
