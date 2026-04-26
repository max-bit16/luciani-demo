import { MapPin, Phone, Clock } from "lucide-react";
import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import { H2Reveal } from "@/components/anim/H2Reveal";
import { Magnetic } from "@/components/anim/Magnetic";

function InfoCard({
  delay,
  children,
}: {
  delay: number;
  children: React.ReactNode;
}) {
  const ref = useReveal<HTMLDivElement>();
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };
  const onEnter = () => {
    const el = cardRef.current;
    if (el) el.classList.add("glow-on");
  };
  const onLeave = () => {
    const el = cardRef.current;
    if (el) el.classList.remove("glow-on");
  };

  return (
    <div
      ref={(el) => {
        ref.current = el;
        cardRef.current = el;
      }}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="reveal info-card flex flex-col"
      style={{ ["--delay" as string]: `${delay}ms` }}
    >
      <span className="glow" aria-hidden="true" />
      {children}
    </div>
  );
}

export function Contact() {
  const head = useReveal<HTMLDivElement>();
  const note = useReveal<HTMLDivElement>();
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-28 md:py-36"
      style={{ backgroundColor: "#ffffff" }}
    >
      <span className="deco-number" aria-hidden="true">04</span>
      <img
        src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1200&q=80&auto=format&fit=crop"
        alt=""
        aria-hidden="true"
        className="absolute right-0 top-0 bottom-0 h-full object-cover pointer-events-none select-none"
        style={{ width: "40%", opacity: 0.07 }}
      />

      <div className="container-x relative z-10">
        <div className="max-w-4xl mx-auto">
          <div
            ref={head}
            className="reveal text-center mb-16 flex flex-col items-center gap-5"
          >
            <span className="label-pill">Contact</span>
            <H2Reveal className="t-h2">Consultations sur rendez-vous</H2Reveal>
            <p
              className="t-body-lg max-w-lg mx-auto"
              style={{ color: "var(--ink-2)" }}
            >
              Le Cabinet reçoit sur rendez-vous, du lundi au vendredi.
              Contactez-nous par téléphone pour convenir d'une consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard delay={0}>
              <MapPin
                className="w-5 h-5 mb-4"
                style={{ color: "var(--ink-3)" }}
              />
              <span className="t-label" style={{ color: "var(--ink-3)" }}>
                Adresse
              </span>
              <p
                className="font-display mt-3"
                style={{
                  fontSize: "26px",
                  lineHeight: 1.5,
                  color: "#000",
                  fontWeight: 300,
                }}
              >
                40, rue du Commerce
                <br />
                L-3450 Dudelange
                <br />
                Grand-Duché de Luxembourg
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=40+rue+du+Commerce+L-3450+Dudelange"
                target="_blank"
                rel="noopener noreferrer"
                className="t-small mt-4 underline self-start"
                style={{ color: "#000" }}
              >
                Voir sur Google Maps
              </a>
            </InfoCard>

            <InfoCard delay={120}>
              <Phone
                className="w-5 h-5 mb-4"
                style={{ color: "var(--ink-3)" }}
              />
              <span className="t-label" style={{ color: "var(--ink-3)" }}>
                Téléphone
              </span>
              <p
                className="font-display mt-3"
                style={{ fontSize: "32px", color: "#000", fontWeight: 300 }}
              >
                20 33 14 56
              </p>
              <p className="t-caption mt-1" style={{ color: "var(--ink-3)" }}>
                Permanence : 14h00 – 18h00
              </p>
              <Magnetic className="mt-6 self-start">
                <a href="tel:+35220331456" className="pill-warm">
                  Appeler maintenant
                </a>
              </Magnetic>
            </InfoCard>

            <InfoCard delay={240}>
              <Clock
                className="w-5 h-5 mb-4"
                style={{ color: "var(--ink-3)" }}
              />
              <span className="t-label" style={{ color: "var(--ink-3)" }}>
                Horaires
              </span>
              <p
                className="font-display mt-3"
                style={{ fontSize: "32px", color: "#000", fontWeight: 300 }}
              >
                Lun – Ven
              </p>
              <p className="t-caption mt-1" style={{ color: "var(--ink-3)" }}>
                9h00 – 19h00
              </p>
              <p
                className="t-caption mt-3 italic"
                style={{ color: "var(--ink-3)" }}
              >
                Uniquement sur rendez-vous
              </p>
            </InfoCard>
          </div>

          <div ref={note} className="reveal text-center mt-12">
            <p className="t-caption" style={{ color: "var(--ink-3)" }}>
              Cabinet opérant en collaboration avec l'Étude Majerus,
              Esch-sur-Alzette · Fax : 26 52 10 34
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}