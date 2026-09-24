import { DappRoute } from "@/components/dapp/DappRoute";
import { getDappCopy } from "@/config/dapp";
import type { Metadata } from "next";

const copy = getDappCopy("/dapp");

export const metadata: Metadata = {
  title: "Overview — XEROPAY",
};

export default function DAppOverviewPage() {
  return <DappRoute href="/dapp" headline={copy.headline} body={copy.body} />;
}
