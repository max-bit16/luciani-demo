import { useCounter } from "@/hooks/useCounter";

function Stat({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const { ref, value } = useCounter(target);
  return (
    <div ref={ref} className="text-center">
      <div
        className="font-display"
        style={{ fontSize: "56px", lineHeight: 1, color: "#000", fontWeight: 300 }}
      >
        {value}
        {suffix}
      </div>
      <div className="t-label mt-3" style={{ color: "var(--ink-3)" }}>
        {label}
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <section style={{ backgroundColor: "#f5f5f5" }} className="py-20 md:py-24">
      <div className="container-x">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x md:divide-[rgba(0,0,0,0.06)]">
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