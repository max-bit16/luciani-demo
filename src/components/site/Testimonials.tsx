import { useEffect, useRef, useState } from "react";
import { H2Reveal } from "@/components/anim/H2Reveal";
import { useReveal } from "@/hooks/useReveal";

type Review = { name: string; quote: string };

const reviews: Review[] = [
  {
    name: "Miguelito",
    quote:
      "Je recommande Maître Luciani les yeux fermés. C'est un avocat extrêmement aimable, professionnel et humain.",
  },
  {
    name: "Michel Keser",
    quote:
      "Maître Luciani est un must en matière de défense. Très à l'écoute et méticuleux dans ses approches. À recommander vivement.",
  },
  {
    name: "Joelle Brink",
    quote:
      "La profession juridique a besoin de plus d'avocats comme vous — intelligents, passionnés, débrouillards, résilients et compatissants.",
  },
  {
    name: "manu hous",
    quote: "Très professionnel, je recommande ce cabinet et Maître Luciani.",
  },
  {
    name: "Pedro Campos",
    quote: "Un très bon cabinet d'avocats, je conseille.",
  },
];

const SHADOW =
  "rgba(0,0,0,0.075) 0px 0px 0px 0.5px inset, rgba(0,0,0,0.06) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 1px 2px, rgba(0,0,0,0.04) 0px 2px 4px";

function initial(name: string) {
  return name.trim().charAt(0).toUpperCase();
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const pausedRef = useRef(false);
  const head = useReveal<HTMLDivElement>();
  const wrap = useReveal<HTMLDivElement>();

  useEffect(() => {
    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      setIndex((i) => (i + 1) % reviews.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (index === displayIndex) return;
    // Start exit animation on the currently displayed card
    setPhase("out");
    const outDuration = 400;
    const gap = 50;
    const t = window.setTimeout(() => {
      setDisplayIndex(index);
      setPhase("in");
    }, outDuration - gap); // next enters as current finishes (gap between out & in)
    return () => window.clearTimeout(t);
  }, [index, displayIndex]);

  const r = reviews[displayIndex];

  return (
    <section
      className="py-28 md:py-36"
      style={{ backgroundColor: "#f5f5f5" }}
      aria-label="Avis clients"
    >
      <div
        className="max-w-6xl mx-auto"
        style={{ paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
      >
        <div
          ref={head}
          className="reveal text-center mb-16 flex flex-col items-center gap-5"
        >
          <span className="label-pill">Avis clients</span>
          <H2Reveal className="t-h2">Ce que disent nos clients</H2Reveal>
          <p
            className="t-body-lg max-w-xl mx-auto"
            style={{ color: "#4e4e4e" }}
          >
            Des centaines de particuliers et professionnels font confiance au
            Cabinet Luciani au Grand-Duché.
          </p>
        </div>

        <div
          ref={wrap}
          className="reveal max-w-2xl mx-auto"
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
        >
          <div
            key={`${displayIndex}-${phase}`}
            className={`testimonial-card relative ${phase === "in" ? "is-in" : "is-out"}`}
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              padding: "40px",
              boxShadow: SHADOW,
            }}
          >
            <span
              aria-hidden="true"
              className="font-display absolute select-none pointer-events-none"
              style={{
                top: "24px",
                left: "28px",
                fontSize: "96px",
                lineHeight: 0.8,
                fontWeight: 300,
                color: "rgba(245,242,239,1)",
                zIndex: 0,
              }}
            >
              "
            </span>

            <div
              className="relative"
              style={{ zIndex: 1 }}
              aria-live="polite"
            >
              <div
                className="mb-6"
                style={{
                  color: "#c9a84c",
                  fontSize: "16px",
                  display: "flex",
                  gap: "2px",
                }}
                aria-label="5 étoiles sur 5"
              >
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>

              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                  fontSize: "18px",
                  fontStyle: "italic",
                  color: "#4e4e4e",
                  lineHeight: 1.65,
                  letterSpacing: "0.18px",
                }}
              >
                {r.quote}
              </p>

              <div className="flex items-center gap-3 mt-6">
                <span
                  className="inline-flex items-center justify-center"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "9999px",
                    background: "rgba(245,242,239,0.8)",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "14px",
                    color: "#777169",
                  }}
                  aria-hidden="true"
                >
                  {initial(r.name)}
                </span>
                <span
                  className="font-display"
                  style={{ fontSize: "20px", fontWeight: 300, color: "#000" }}
                >
                  {r.name}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    color: "#777169",
                  }}
                >
                  Google Maps
                </span>
              </div>
            </div>
          </div>

          <div
            className="flex items-center justify-center gap-2 mt-10"
            role="tablist"
            aria-label="Sélection d'avis"
          >
            {reviews.map((_, i) => {
              const active = i === index;
              return (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`Avis ${i + 1}`}
                  onClick={() => setIndex(i)}
                  style={{
                    height: "4px",
                    width: active ? "32px" : "20px",
                    background: active ? "#000" : "#e5e5e5",
                    borderRadius: "9999px",
                    border: 0,
                    padding: 0,
                    cursor: "pointer",
                    transition: "width 300ms ease, background-color 300ms ease",
                  }}
                />
              );
            })}
          </div>

          <p
            className="text-center mt-6"
            style={{ color: "#777169" }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                fontSize: "14px",
              }}
            >
              Avis vérifiés sur Google Maps
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}