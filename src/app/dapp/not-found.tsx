import { DappScreen, Panel } from "@/components/dapp/DappScreen";
import { Button } from "@/components/common/Button";

export default function DappNotFound() {
  return (
    <DappScreen title="Page not found" lede="That dApp route does not exist." badge="none">
      <Panel>
        <p className="text-[14px] text-[#C8CBD6]">Check the sidebar, or return to Overview.</p>
        <Button href="/dapp" className="mt-4 px-5 py-2.5 text-[14px]">
          Overview
        </Button>
      </Panel>
    </DappScreen>
  );
}
