import { CheckCircle, Globe, MapPin, type LucideIcon } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const blocs: { Icon: LucideIcon; title: string; body: string }[] = [
  {
    Icon: CheckCircle,
    title: "Écoute et précision",
    body:
      "Chaque dossier est traité avec une attention personnelle. Nous commençons par écouter, comprendre, puis construire la meilleure stratégie pour vos intérêts.",
  },
  {
    Icon: Globe,
    title: "Accessibilité multilingue",
    body:
      "Consultations en luxembourgeois, français, allemand ou anglais. Le Cabinet est pensé pour accueillir toute la diversité du Grand-Duché.",
  },
  {
    Icon: MapPin,
    title: "Proximité avec les juridictions",
    body:
      "Situé à Dudelange, le Cabinet opère en collaboration avec l'Étude Majerus. À distance optimale des tribunaux de Luxembourg et d'Esch-sur-Alzette.",
  },
];

export function Approche() {
  const txt = useReveal<HTMLDivElement>();
  const img = useReveal<HTMLDivElement>();
  return (
    <section
      className="py-28 md:py-36"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="container-x">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div ref={txt} className="reveal flex flex-col gap-6">
            <span className="label-pill self-start">Notre approche</span>
            <h2 className="t-h2">
              Rigueur et humanité,
              <br />
              à chaque étape
            </h2>

            <div className="flex flex-col gap-10 mt-4">
              {blocs.map(({ Icon, title, body }) => (
                <div key={title} className="flex gap-4 items-start">
                  <Icon
                    className="w-5 h-5 flex-shrink-0 mt-1"
                    style={{ color: "var(--ink-3)" }}
                  />
                  <div>
                    <h3 className="t-h3">{title}</h3>
                    <p
                      className="t-body mt-2"
                      style={{ color: "var(--ink-2)" }}
                    >
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={img}
            className="reveal-right relative overflow-hidden"
            style={{
              borderRadius: "20px",
              aspectRatio: "3 / 4",
              boxShadow: "var(--shadow-outline-ring)",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&q=80&auto=format&fit=crop"
              alt="Salle d'audience et balance de la justice"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.10), transparent)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}