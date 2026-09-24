import { DocsH2, DocsPage, StatusNote } from "@/components/docs/DocsArticle";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fees — Docs",
  description: "No public fee table yet. Gas sponsorship is a design note.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/protocol/fees"
      title="Fees"
      lede="When numbers exist, they will be written here. Until then, no invented bps."
    >
      <StatusNote />
      <p>
        Protocol fees, if any, are not published. Business seats are described without a price.
        $XERO is designed only to discount fees when live — see{" "}
        <Link href="/docs/xero/tiers" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
          Tiers
        </Link>
        .
      </p>
      <section>
        <DocsH2>Gas</DocsH2>
        <p className="mt-3">
          Users should not have to hold a public gas token beside private funds. A paymaster is
          specified to cover network fees. That is not a live relayer you can ping.
        </p>
      </section>
      <section>
        <DocsH2>What fees are not</DocsH2>
        <p className="mt-3">
          They are not yield. They are not a reason to lock a token. They are not a hidden spread
          we will reveal “at TGE.”
        </p>
      </section>
    </DocsPage>
  );
}
