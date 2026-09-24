import type { DappIcon } from "@/config/dapp";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function DappNavIcon({ name }: { name: DappIcon }) {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden="true">
      {iconPath(name)}
    </svg>
  );
}

function iconPath(name: DappIcon) {
  switch (name) {
    case "overview":
      return <rect x="2" y="2" width="12" height="12" rx="2" {...stroke} />;
    case "send":
      return <path d="M3 13 13 3M6 3h7v7" {...stroke} />;
    case "receive":
      return <path d="M13 3 3 13M10 13H3V6" {...stroke} />;
    case "inbox":
      return (
        <>
          <path d="M2 8h4l1 2h2l1-2h4" {...stroke} />
          <rect x="2" y="3" width="12" height="10" rx="1.5" {...stroke} />
        </>
      );
    case "contacts":
      return (
        <>
          <circle cx="8" cy="6" r="2.2" {...stroke} />
          <path d="M3.5 13c.8-2 2.5-3 4.5-3s3.7 1 4.5 3" {...stroke} />
        </>
      );
    case "split":
      return <path d="M8 2v12M3 8h10M4 4l8 8M12 4 4 12" {...stroke} />;
    case "links":
      return <path d="M6.5 9.5 5 11a2.2 2.2 0 1 1-3-3l1.5-1.5M9.5 6.5 11 5a2.2 2.2 0 1 1 3 3L12.5 9.5" {...stroke} />;
    case "scheduled":
      return (
        <>
          <circle cx="8" cy="8" r="6" {...stroke} />
          <path d="M8 5v4l2.5 1.5" {...stroke} />
        </>
      );
    case "ask":
      return (
        <>
          <circle cx="8" cy="8" r="6" {...stroke} />
          <path d="M6.2 6.2a2 2 0 1 1 2.2 3.2V10" {...stroke} />
          <path d="M8 12h.01" {...stroke} />
        </>
      );
    case "invite":
      return (
        <>
          <circle cx="6" cy="6" r="2" {...stroke} />
          <path d="M2.5 13c.6-2 2-3 3.5-3s2.9 1 3.5 3M11 6h3M12.5 4.5v3" {...stroke} />
        </>
      );
    case "vault":
      return (
        <>
          <rect x="3" y="6" width="10" height="8" rx="1.5" {...stroke} />
          <path d="M5.5 6V4.5a2.5 2.5 0 0 1 5 0V6" {...stroke} />
        </>
      );
    case "portfolio":
      return <path d="M2 12h12M4 12V6l3 2 3-4 2 3v5" {...stroke} />;
    case "markets":
      return <path d="M2 12h12M3 9l3-3 3 2 4-5" {...stroke} />;
    case "yield":
      return <path d="M3 12c2-5 4-7 5-7s3 2 5 7M8 5V3" {...stroke} />;
    case "goals":
      return (
        <>
          <circle cx="8" cy="8" r="6" {...stroke} />
          <circle cx="8" cy="8" r="2" {...stroke} />
        </>
      );
    case "budgets":
      return (
        <>
          <rect x="3" y="2" width="10" height="12" rx="1" {...stroke} />
          <path d="M6 6h4M6 9h4" {...stroke} />
        </>
      );
    case "bridge":
      return <path d="M2 11c2-4 4-6 6-6s4 2 6 6M2 11h12" {...stroke} />;
    case "history":
      return (
        <>
          <path d="M8 3a5 5 0 1 1-4.5 3" {...stroke} />
          <path d="M3.5 3v3H6.5M8 6v3l2 1" {...stroke} />
        </>
      );
    case "reports":
      return (
        <>
          <rect x="3" y="3" width="10" height="10" rx="1" {...stroke} />
          <path d="M5 10V7M8 10V5M11 10V8" {...stroke} />
        </>
      );
    case "card":
      return (
        <>
          <rect x="2" y="4" width="12" height="8" rx="1.5" {...stroke} />
          <path d="M2 7h12" {...stroke} />
        </>
      );
    case "xero":
      return <path d="M4 4 12 12M12 4 4 12" {...stroke} />;
    case "payroll":
      return (
        <>
          <circle cx="6" cy="5.5" r="2" {...stroke} />
          <circle cx="11" cy="8" r="1.6" {...stroke} />
          <path d="M2.5 13c.7-2 2.2-3 3.5-3s2.8 1 3.5 3M10 13c.4-1.2 1.2-2 2-2" {...stroke} />
        </>
      );
    case "disclose":
      return (
        <>
          <circle cx="8" cy="8" r="3" {...stroke} />
          <path d="M8 2v2M8 12v2M2 8h2M12 8h2" {...stroke} />
        </>
      );
    case "privacy":
      return (
        <>
          <path d="M8 2 3.5 4.5v4c0 3 2 5 4.5 5.8 2.5-.8 4.5-2.8 4.5-5.8v-4z" {...stroke} />
        </>
      );
    case "numbers":
      return <path d="M5 3v10M11 3v10M3 6h10M3 10h10" {...stroke} />;
    case "network":
      return (
        <>
          <circle cx="8" cy="8" r="2" {...stroke} />
          <path d="M8 2v2M8 12v2M2 8h2M12 8h2M4 4l1.4 1.4M10.6 10.6 12 12M12 4l-1.4 1.4M4 12l1.4-1.4" {...stroke} />
        </>
      );
    case "settings":
      return (
        <>
          <circle cx="8" cy="8" r="2.2" {...stroke} />
          <path d="M8 2.5v1.5M8 12v1.5M2.5 8H4M12 8h1.5M4 4l1.1 1.1M10.9 10.9 12 12M12 4l-1.1 1.1M4 12l1.1-1.1" {...stroke} />
        </>
      );
  }
}
