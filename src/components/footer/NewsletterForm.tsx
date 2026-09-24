"use client";

import { FormEvent, useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="mt-5">
      <label className="sr-only" htmlFor="footer-email">
        Email
      </label>
      <div className="flex items-center gap-2 rounded-full border border-white/12 bg-black/30 px-2 py-1.5">
        <input
          id="footer-email"
          type="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setSent(false);
          }}
          placeholder="Enter your email"
          className="min-w-0 flex-1 bg-transparent px-3 py-2 text-[13px] text-[#F7F7FA] outline-none placeholder:text-[#6F7384]"
        />
        <button
          type="submit"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(90deg,#4F7CFF,#8B5CF6)] text-white"
          aria-label="Subscribe"
        >
          <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
            <path d="M2 6h8M7 3l3 3-3 3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      {sent ? (
        <p className="mt-2 text-[12px] text-[#9AA6FF]">Saved on this device. No list is connected yet.</p>
      ) : null}
    </form>
  );
}
