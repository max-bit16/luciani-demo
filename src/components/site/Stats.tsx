import { useCounter } from "@/hooks/useCounter";

function Stat({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const { ref, value } = useCounter(target);
  return (
    <div ref={ref} className="text-center">
      <div
        className="font-display"
        style={{ fontSize: "56px", lineHeight: 1, color: "#ffffff", fontWeight: 300 }}
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
      className="relative overflow-hidden py-20 md:py-24"
    >
      <span
        aria-hidden="true"
        className="font-display absolute pointer-events-none select-none"
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x md:divide-[rgba(255,255,255,0.06)]">
          <div className="md:px-4">
            <Stat target={17} suffix="+" label="Années au barreau" />
          </div>
          <div className="md:px-4">
            <Stat target={2007} label="Inscription au barreau" />
          </div>
          <div className="md:px-4">
            <Stat target={4} label="Domaines d'expertise" />
          </div>
          <div className="md:px-4">
            <Stat target={4} label="Langues de consultation" />
          </div>
        </div>
      </div>
    </section>
  );
}