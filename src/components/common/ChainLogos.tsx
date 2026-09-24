const chains = [
  {
    name: "Ethereum",
    icon: (
      <svg viewBox="0 0 16 16" className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true">
        <path fill="#8B93B0" d="M8 0 3.2 8.1 8 11l4.8-2.9L8 0Z" />
        <path fill="#C9CDD8" d="M8 0v11l4.8-2.9L8 0Z" />
        <path fill="#8B93B0" d="M8 16 3.2 9.1 8 12l4.8-2.9L8 16Z" />
        <path fill="#C9CDD8" d="M8 12v4l4.8-6.9L8 12Z" />
      </svg>
    ),
  },
  {
    name: "Solana",
    icon: (
      <svg viewBox="0 0 16 16" className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true">
        <path
          fill="url(#sol)"
          d="M3.1 11.4c.12-.12.28-.18.45-.18h10.3c.3 0 .45.36.24.57l-2.14 2.1a.64.64 0 0 1-.45.18H1.2c-.3 0-.45-.36-.24-.57l2.14-2.1Zm0-9.02c.12-.12.28-.18.45-.18h10.3c.3 0 .45.36.24.57L11.95 4.9a.64.64 0 0 1-.45.18H1.2c-.3 0-.45-.36-.24-.57L3.1 2.38Zm10.99 4.43c.12.12.28.18.45.18H4.24a.64.64 0 0 1-.45-.18L1.65 4.7c-.21-.21-.06-.57.24-.57h10.3c.17 0 .33.06.45.18l1.45 1.43Z"
        />
        <defs>
          <linearGradient id="sol" x1="1" y1="2" x2="15" y2="14">
            <stop stopColor="#A78BFA" />
            <stop offset="1" stopColor="#67E8F9" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Base",
    icon: (
      <svg viewBox="0 0 16 16" className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true">
        <circle cx="8" cy="8" r="7.2" fill="#5B8CFF" />
        <rect x="4.2" y="7.3" width="7.6" height="1.4" rx="0.7" fill="#F7F7FA" />
      </svg>
    ),
  },
  {
    name: "Arbitrum",
    icon: (
      <svg viewBox="0 0 16 16" className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true">
        <path
          fill="#9BA3C7"
          d="M8 1.2 14.6 13H12.2L8 4.8 3.8 13H1.4L8 1.2Z"
        />
        <path fill="#5B8CFF" d="M6.6 10.6h2.8L8 8.2 6.6 10.6Z" />
        <path
          fill="none"
          stroke="#C5CAD8"
          strokeWidth="1.1"
          d="M8 1.6 14.2 13.2H1.8L8 1.6Z"
        />
      </svg>
    ),
  },
  {
    name: "Polygon",
    icon: (
      <svg viewBox="0 0 16 16" className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true">
        <path
          fill="#A78BFA"
          d="M10.7 5.1 8 3.6 5.3 5.1v3.1L8 9.7l2.7-1.5V5.1Zm-8.4 1.6L.1 8.1v3.1L2.8 13l2.2-1.2-2.7-1.6V6.7Zm11.4 0v3.5L11 11.8l2.2 1.2 2.7-1.8V8.1l-2.2-1.4Z"
        />
      </svg>
    ),
  },
];

export function ChainLogos() {
  return (
    <ul className="flex w-full max-w-[1100px] flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12 lg:gap-x-14">
      {chains.map((chain) => (
        <li key={chain.name}>
          <span className="inline-flex items-center gap-2.5 text-[15px] text-[#B4B9C9] transition-colors duration-300 hover:text-[#E8EAF2] sm:text-[16px] lg:text-[17px]">
            <span className="opacity-80 transition-opacity duration-300 hover:opacity-100">
              {chain.icon}
            </span>
            {chain.name}
          </span>
        </li>
      ))}
    </ul>
  );
}
