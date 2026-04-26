import { Scale, Shield, Briefcase, Building2, type LucideIcon } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

type Card = {
  Icon: LucideIcon;
  title: string;
  subtitle: string;
  bullets: string[];
};

const cards: Card[] = [
  {
    Icon: Scale,
    title: "Droit Civil",
    subtitle:
      "Famille, successions, bail à loyer, droit du travail, responsabilité civile.",
    bullets: [
      "Divorce, garde d'enfants, successions",
      "Licenciement, rédaction de contrats de travail",
      "Litiges locatifs, procédures d'expulsion",
    ],
  },
  {
    Icon: Shield,
    title: "Droit Pénal",
    subtitle: "Défense pénale, droit routier, procédure et exécution des peines.",
    bullets: [
      "Ivresse au volant, restitution de permis",
      "Défense en cas d'atteintes aux personnes",
      "Plaintes pénales, demandes de mise en liberté",
    ],
  },
  {
    Icon: Briefcase,
    title: "Droit Commercial",
    subtitle:
      "Constitution de sociétés, contentieux commercial, gestion des faillites.",
    bullets: [
      "Constitution de sociétés, baux commerciaux",
      "Recouvrement de créances",
      "Défense devant le Tribunal de commerce",
    ],
  },
  {
    Icon: Building2,
    title: "Administratif & Immigration",
    subtitle:
      "Recours administratifs, urbanisme, droit des étrangers et immigration.",
    bullets: [
      "Contestation de décisions administratives",
      "Autorisations communales et urbanisme",
      "Dossiers d'immigration, statut de réfugié",
    ],
  },
];

function ServiceCard({ card, delay }: { card: Card; delay: number }) {
  const ref = useReveal<HTMLDivElement>();
  const { Icon, title, subtitle, bullets } = card;
  return (
    <div
      ref={ref}
      className="reveal service-card flex flex-col"
      style={{ ["--delay" as string]: `${delay}ms` }}
    >
      <Icon className="w-6 h-6 mb-5" />
      <h3 className="t-h3">{title}</h3>
      <p className="t-body-ui mt-2" style={{ color: "var(--ink-2)" }}>
        {subtitle}
      </p>
      <ul className="mt-4 flex flex-col gap-1.5">
        {bullets.map((b) => (
          <li
            key={b}
            className="t-caption"
            style={{ color: "var(--ink-3)" }}
          >
            — {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Domaines() {
  const head = useReveal<HTMLDivElement>();
  return (
    <section
      id="domaines"
      className="py-28 md:py-36"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="container-x">
        <div ref={head} className="reveal text-center mb-16 flex flex-col items-center gap-5">
          <span className="label-pill">Nos domaines</span>
          <h2 className="t-h2 max-w-2xl">
            Une expertise complète
            <br />
            pour chaque situation
          </h2>
          <p
            className="t-body-lg max-w-xl mx-auto"
            style={{ color: "var(--ink-2)" }}
          >
            Que vous soyez particulier ou professionnel, le Cabinet Luciani vous
            accompagne avec rigueur et humanité dans toutes vos démarches
            juridiques.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => (
            <ServiceCard key={c.title} card={c} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}