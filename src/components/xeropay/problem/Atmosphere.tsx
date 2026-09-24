"use client";

export function FloatingOrb({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(180,200,255,0.55),rgba(91,140,255,0.08)_55%,transparent_70%)] blur-[1px] ${className}`}
    />
  );
}

export function ProblemParticles() {
  const dots = [
    { t: "12%", l: "18%", s: "3px", d: "0s" },
    { t: "22%", l: "72%", s: "2px", d: "0.8s" },
    { t: "38%", l: "8%", s: "2px", d: "1.4s" },
    { t: "48%", l: "92%", s: "3px", d: "0.3s" },
    { t: "63%", l: "14%", s: "2px", d: "1.1s" },
    { t: "70%", l: "80%", s: "2px", d: "1.9s" },
    { t: "16%", l: "46%", s: "2px", d: "2.2s" },
    { t: "84%", l: "40%", s: "3px", d: "0.6s" },
    { t: "31%", l: "88%", s: "2px", d: "1.6s" },
    { t: "78%", l: "62%", s: "2px", d: "2.4s" },
    { t: "9%", l: "63%", s: "2px", d: "0.2s" },
    { t: "55%", l: "6%", s: "3px", d: "1.3s" },
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
      {dots.map((dot, index) => (
        <span
          key={index}
          className="absolute rounded-full bg-[#A5B4FC]/50 motion-safe:animate-status-pulse"
          style={{
            top: dot.t,
            left: dot.l,
            width: dot.s,
            height: dot.s,
            animationDelay: dot.d,
            animationDuration: "3.6s",
          }}
        />
      ))}
    </div>
  );
}
