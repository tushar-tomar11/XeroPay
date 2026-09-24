import { DAppShell } from "@/components/dapp/DAppShell";

export default function DappLayout({ children }: { children: React.ReactNode }) {
  return <DAppShell>{children}</DAppShell>;
}
