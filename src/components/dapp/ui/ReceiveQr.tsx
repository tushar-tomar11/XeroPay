"use client";

export function ReceiveQr({ value }: { value: string }) {
  if (!value) {
    return <p className="text-[13px] text-[#8F93A3]">Connect a wallet to generate a QR.</p>;
  }
  const src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(value)}`;
  return (
    // External QR renderer — address is already a public Solana key.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="Payment QR" width={180} height={180} className="mx-auto rounded-xl bg-white p-2" />
  );
}
