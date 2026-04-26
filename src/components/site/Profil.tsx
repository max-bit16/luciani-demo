import { useReveal } from "@/hooks/useReveal";
import { H2Reveal } from "@/components/anim/H2Reveal";

export function Profil() {
  const img = useReveal<HTMLDivElement>();
  const txt = useReveal<HTMLDivElement>();
  return (
    <section
      id="profil"
      className="relative overflow-hidden py-28 md:py-36"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <span className="deco-number" aria-hidden="true">02</span>
      <div className="container-x relative" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div
            ref={img}
            className="reveal-left zoom-wrap"
            style={{
              borderRadius: "20px",
              aspectRatio: "4 / 3",
              boxShadow: "var(--shadow-outline-ring)",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=900&q=80&auto=format&fit=crop"
              alt="Consultation juridique au cabinet Luciani"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div ref={txt} className="reveal flex flex-col gap-6">
            <span className="label-pill-section self-start">Votre avocat</span>
            <H2Reveal className="t-h2">Maître Tom Luciani</H2Reveal>
            <p className="t-editorial">
              Avocat à la Cour · Barreau de Luxembourg
            </p>
            <p className="t-body" style={{ color: "var(--ink-2)" }}>
              Né à Esch-sur-Alzette, Maître Luciani est inscrit au Barreau de
              Luxembourg depuis le 24 mai 2007. Après une première expérience au
              sein de l'Étude Wies & Majerus, il rejoint l'Étude Majerus à
              Esch-sur-Alzette en 2009, où il acquiert une expertise solide en
              contentieux.
            </p>
            <p className="t-body" style={{ color: "var(--ink-2)" }}>
              En novembre 2014, il fonde son cabinet à Dudelange, quatrième
              ville du Grand-Duché, à distance optimale des juridictions de
              Luxembourg et du Tribunal d'Esch-sur-Alzette. Titulaire d'une
              maîtrise en Droit Privé et Études Européennes, Université Robert
              Schumann de Strasbourg.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="lang-pill-white">🇱🇺 Luxembourgeois</span>
              <span className="lang-pill-white">🇫🇷 Français</span>
              <span className="lang-pill-white">🇩🇪 Allemand</span>
              <span className="lang-pill-white">🇬🇧 Anglais</span>
            </div>

            <p className="t-caption" style={{ color: "var(--ink-3)" }}>
              Maîtrise Droit Privé & Études Européennes, Université Robert
              Schumann, Strasbourg
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}