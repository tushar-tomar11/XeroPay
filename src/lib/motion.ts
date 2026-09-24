export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const springs = {
  parallax: { stiffness: 48, damping: 22, mass: 0.85 },
  ui: { stiffness: 260, damping: 24, mass: 0.6 },
  drop: { type: "spring" as const, bounce: 0.38, duration: 1.05 },
} as const;

export const load = {
  navbar: { delay: 0, duration: 0.7 },
  bg: { delay: 0, duration: 0.45 },
  phone: { delay: 0.35, duration: 1.05 },
  eyebrow: { delay: 1.0, duration: 0.55 },
  headline: { delay: 1.1, duration: 0.6 },
  description: { delay: 1.22, duration: 0.55 },
  cta: { delay: 1.34, duration: 0.55 },
  stats: { delay: 1.46, duration: 0.55 },
  orbiters: { delay: 1.45, duration: 1.05 },
  orbiterStagger: 0.12,
  tagline: { delay: 1.34, duration: 0.55 },
  chains: { delay: 1.5, duration: 0.7 },
} as const;

export const drop = {
  phoneY: "-92%",
  phoneRotate: -8,
  orbiterY: "-88%",
} as const;

export const float = {
  phone: {
    y: 10,
    rotateX: 1.6,
    rotateY: 2.4,
    duration: 7.2,
  },
  card: {
    y: 12,
    rotateX: 2.2,
    rotateY: 3.2,
    duration: 8.2,
  },
  yieldCard: {
    y: 8,
    rotateX: 1.4,
    rotateY: 2,
    duration: 8.8,
  },
  privacyCard: {
    y: 9,
    rotateX: 1.6,
    rotateY: 2.2,
    duration: 9.4,
  },
  coin: {
    y: 8,
    rotateX: 1.2,
    rotateY: 2,
    duration: 7.6,
  },
} as const;

export const parallax = {
  background: { x: 3, y: 3, rotate: 0.4 },
  glass: { x: 8, y: 7, rotate: 1.6 },
  phone: { x: 8, y: 7, rotate: 2.2 },
  card: { x: 15, y: 13, rotate: 3.4 },
  coin: { x: 16, y: 14, rotate: 3.8 },
  foreground: { x: 18, y: 16, rotate: 2.8 },
} as const;

export const coinSpinDuration = 11;

export const orbitDuration = 10;

export const introOffset = 16;

export function afterPhoneDrop() {
  return load.phone.delay + load.phone.duration;
}

export function afterOrbiter(index: number) {
  return load.orbiters.delay + index * load.orbiterStagger + 0.55;
}
