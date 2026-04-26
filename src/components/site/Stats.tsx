import { useCounter } from "@/hooks/useCounter";
import { useReveal } from "@/hooks/useReveal";

function Stat({
  target,
  suffix = "",
  label,
  delay,
}: {
  target: number;
  suffix?: string;
  label: string;
  delay: number;
}) {
  const { ref, numberRef, value } = useCounter(target);
  const reveal = useReveal<HTMLDivElement>();
  return (
    <div
      ref={(el) => {
        ref.current = el;
        reveal.current = el;
      }}
      className="reveal-scale text-center"
      style={{ ["--delay" as string]: `${delay}ms` }}
    >
      <div
        ref={numberRef}
        className="font-display"
        style={{
          lineHeight: 1,
          color: "#ffffff",
          fontWeight: 300,
          display: "inline-block",
          willChange: "transform",
        }}
        data-stat-number
      >
        {value}
        {suffix}
      </div>
      <div className="t-label mt-3" style={{ color: "rgba(255,255,255,0.4)" }}>
        {label}
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <section
      style={{ backgroundColor: "#0a0a0a" }}
      className="relative overflow-hidden py-16 md:py-24"
    >
      <span
        aria-hidden="true"
        className="font-display absolute pointer-events-none select-none hidden md:block"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "200px",
          fontWeight: 300,
          color: "rgba(255,255,255,0.02)",
          letterSpacing: "-4px",
          whiteSpace: "nowrap",
          zIndex: 0,
          lineHeight: 1,
        }}
      >
        LUCIANI
      </span>
      <div className="container-x relative" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x md:divide-[rgba(255,255,255,0.06)] stats-grid">
          <div className="md:px-4 stat-cell">
            <Stat target={17} suffix="+" label="Années au barreau" delay={0} />
          </div>
          <div className="md:px-4 stat-cell">
            <Stat target={2007} label="Inscription au barreau" delay={100} />
          </div>
          <div className="md:px-4 stat-cell">
            <Stat target={4} label="Domaines d'expertise" delay={200} />
          </div>
          <div className="md:px-4 stat-cell">
            <Stat target={4} label="Langues de consultation" delay={300} />
          </div>
        </div>
      </div>
    </section>
  );
}