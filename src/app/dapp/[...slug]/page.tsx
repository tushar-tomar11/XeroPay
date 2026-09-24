import { DappRoute } from "@/components/dapp/DappRoute";
import { dappNav, dappPaths, getDappCopy } from "@/config/dapp";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string[] }> };

function hrefFromSlug(slug: string[]) {
  return `/dapp/${slug.join("/")}`;
}

export function generateStaticParams() {
  return dappNav
    .flatMap((g) => g.items)
    .filter((item) => item.href !== "/dapp")
    .map((item) => ({
      slug: item.href.replace("/dapp/", "").split("/"),
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const href = hrefFromSlug(slug);
  const item = dappNav.flatMap((g) => [...g.items]).find((i) => i.href === href);
  return { title: `${item?.label ?? "dApp"} — XEROPAY` };
}

export default async function DappLockedPage({ params }: Props) {
  const { slug } = await params;
  const href = hrefFromSlug(slug);
  if (!dappPaths.has(href)) notFound();
  const copy = getDappCopy(href);
  return <DappRoute href={href} headline={copy.headline} body={copy.body} />;
}
