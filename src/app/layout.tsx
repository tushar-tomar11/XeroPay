import { SiteShell } from "@/components/layout/SiteShell";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { SolanaProvider } from "@/components/providers/SolanaProvider";
import type { Metadata, Viewport } from "next";
import { Caveat, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-tagline",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05060B",
};

export const metadata: Metadata = {
  title: "XEROPAY — Money moves better in private.",
  description:
    "XEROPAY is a self-custodial privacy neobank on-chain. Your stablecoins and tokenized stocks stay invisible, keep earning yield, and remain fully yours — without compromising compliance.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${caveat.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <SolanaProvider>
          <CursorGlow />
          <SiteShell>{children}</SiteShell>
        </SolanaProvider>
      </body>
    </html>
  );
}
