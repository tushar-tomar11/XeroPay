import { DocsH2, DocsPage, StatusNote } from "@/components/docs/DocsArticle";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shield and unshield — Docs",
  description: "Screened entry and exit. Identity-separated ramps. Time-decorrelated withdrawals.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/account/shield"
      title="Shield and unshield"
      lede="Money is checked at the boundary, then encrypted. Leaving is checked again — to a named destination, not a hop."
    >
      <StatusNote />
      <section>
        <DocsH2>Shield</DocsH2>
        <p className="mt-3">
          A shield is a deposit into the pool. Sources are licensed ramps and bridges. Screening
          runs before notes are created. What the chain can see is that the pool received funds.
          What it should not see is which account grew, by how much, in which asset.
        </p>
        <p className="mt-3">
          Failed screens never become notes. There is no “retry inside the pool” for a refused
          source.
        </p>
      </section>
      <section>
        <DocsH2>Unshield</DocsH2>
        <p className="mt-3">
          An unshield is an exit to a destination you name. It is screened again. Amounts can be
          split and delayed so clock and size are weaker links between entry and exit. The
          destination is not supposed to be “another mixer.”
        </p>
      </section>
      <section>
        <DocsH2>Identity-separated ramps</DocsH2>
        <p className="mt-3">
          KYC belongs with the licensed partner. That record is not supposed to sit next to your
          note history inside XEROPAY. Joining those halves would be a product bug, not a feature.
          See{" "}
          <Link href="/docs/compliance/screening" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
            Edge screening
          </Link>
          .
        </p>
      </section>
      <section>
        <DocsH2>What this is not</DocsH2>
        <p className="mt-3">
          It is not a tumbler, not a delay-and-hope mixer, and not an anonymous cash-out with no
          destination. If you need the money to remain an account — earning, paying, proving —
          stay shielded. Unshield when you actually need to leave.
        </p>
      </section>
    </DocsPage>
  );
}
