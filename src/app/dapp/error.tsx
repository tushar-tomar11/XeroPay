"use client";

import { DappScreen, Panel } from "@/components/dapp/DappScreen";
import { Button } from "@/components/common/Button";

export default function DappError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <DappScreen title="Something broke" lede="The dApp hit an unexpected error. Your wallet was not asked to sign." badge="none">
      <Panel>
        <p className="text-[13px] text-[#A6A9B5]">{error.message || "Unknown error"}</p>
        <Button className="mt-4 px-5 py-2.5 text-[14px]" onClick={reset}>
          Try again
        </Button>
      </Panel>
    </DappScreen>
  );
}
