import { DocsH2, DocsPage, StatusNote } from "@/components/docs/DocsArticle";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Keys and recovery — Docs",
  description: "Self-custodial, still recoverable. Spending key on device. Guardians, passkeys, hardware.",
};

export default function Page() {
  return (
    <DocsPage
      path="/docs/account/keys"
      title="Keys and recovery"
      lede="Self-custodial from the first note — without a single-phone cliff."
    >
      <StatusNote />
      <section>
        <DocsH2>Spending key</DocsH2>
        <p className="mt-3">
          Generated and kept on your device. XEROPAY cannot move funds or decrypt notes on your
          behalf. If we could, this would be a hosted wallet with extra adjectives.
        </p>
      </section>
      <section>
        <DocsH2>Passkeys and hardware</DocsH2>
        <p className="mt-3">
          Passkeys are the intended daily opener. Hardware wallets are for people who already live
          there. Neither is a back door for us.
        </p>
      </section>
      <section>
        <DocsH2>Guardians</DocsH2>
        <p className="mt-3">
          A lost phone is not designed to be a lost account. Guardians help recover the spending
          path. They are not supposed to receive a standing viewing key unless you issue one.
        </p>
      </section>
      <section>
        <DocsH2>Gas sponsorship</DocsH2>
        <p className="mt-3">
          A paymaster is designed to cover network fees so you are not forced to hold a public gas
          token beside private funds. See{" "}
          <Link href="/docs/wallet" className="text-[#9AA6FF] hover:text-[#F7F7FA]">
            Wallet and network
          </Link>
          .
        </p>
      </section>
      <section>
        <DocsH2>Local tax export</DocsH2>
        <p className="mt-3">
          CSV or PDF generated on your machine from a viewing key you issued. The server does not
          assemble your tax year.
        </p>
      </section>
    </DocsPage>
  );
}
