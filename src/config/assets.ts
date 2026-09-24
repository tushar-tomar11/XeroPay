export const assets = {
  logo: {
    src: "/assets/xeropay-logo-transparent.png",
    alt: "XEROPAY",
    width: 231,
    height: 49,
  },
  wordmark: {
    src: "/assets/xeropay-wordmark-transparent.png",
    alt: "XEROPAY",
    width: 158,
    height: 29,
  },
  mark: {
    src: "/assets/xeropay-x-logo-transparent.png",
    alt: "XEROPAY",
    width: 57,
    height: 49,
  },
  background: {
    src: "/assets/background.png",
    alt: "",
    width: 1837,
    height: 856,
  },
  phone: {
    src: "/assets/phone.png",
    alt: "XEROPAY app mockup on a phone",
    width: 1024,
    height: 1536,
  },
  card: {
    src: "/assets/xeropay-card.png",
    alt: "XEROPAY privacy card",
    width: 1150,
    height: 887,
  },
  coin: {
    src: "/assets/xeropay-coin.png",
    alt: "XEROPAY coin",
    width: 618,
    height: 694,
  },
  yieldCard: {
    src: "/assets/xeropay-yeild-card.png",
    alt: "Yield panel mockup",
    width: 1374,
    height: 1145,
  },
  privacyCard: {
    src: "/assets/xeropay-privacy-card.png",
    alt: "Privacy panel: Private. Compliant. Yours.",
    width: 1223,
    height: 1286,
  },
  icons: {
    src: "/assets/xeropay-icons.png",
    alt: "Send, Receive, Swap, and Earn actions",
    width: 1983,
    height: 793,
  },
  chainLogos: {
    src: "/assets/xhain-logos.png",
    alt: "Network logos",
    width: 2172,
    height: 724,
  },
  section02: {
    background: {
      src: "/xeropay/section-02/background.png",
      alt: "",
      width: 1840,
      height: 855,
    },
    payroll: {
      src: "/xeropay/section-02/cards/payroll.png",
      alt: "Payroll wallet 0x3a7…9f2c",
      width: 1774,
      height: 887,
    },
    stocks: {
      src: "/xeropay/section-02/cards/tokenized-stocks.png",
      alt: "Tokenized stocks wallet 0x7e1…3a8f",
      width: 1278,
      height: 342,
    },
    consequence: {
      src: "/xeropay/section-02/problem/consequence-email.png",
      alt: "Email from Priya Shah about an invoice discrepancy review",
      width: 1572,
      height: 313,
    },
    privacyLeft: {
      src: "/xeropay/section-02/panels/privacy-left.png",
      alt: "Privacy should compound, not conceal.",
      width: 1536,
      height: 1024,
    },
    exposureRight: {
      src: "/xeropay/section-02/panels/exposure-right.png",
      alt: "Same address. Total exposure.",
      width: 1536,
      height: 1024,
    },
  },
} as const;

export type Asset = (typeof assets)[keyof typeof assets];
