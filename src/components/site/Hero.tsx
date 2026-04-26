import { useEffect, useRef, useState } from "react";
import { useParallax } from "@/hooks/useParallax";
import { Magnetic } from "@/components/anim/Magnetic";

const H1_LINE_1 = "Défendre vos intérêts";
const H1_LINE_2 = "au Grand-Duché";

export function Hero() {
  const [entered, setEntered] = useState(false);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const parallaxRef = useParallax<HTMLDivElement>(0.15, 80);

  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!entered) return;
    const el = h1Ref.current;
    if (!el) return;
    el.querySelectorAll<HTMLElement>(".word-reveal").forEach((w) =>
      w.classList.add("entered")
    );
  }, [entered]);

  const renderLine = (line: string, startIndex: number) =>
    line.split(" ").map((word, i) => {
      const idx = startIndex + i;
      return (
        <span
          key={`${idx}-${word}`}
          className="word-reveal"
          style={{ ["--delay" as string]: `${idx * 60}ms` }}
        >
          <span>{word}</span>
        </span>
      );
    });

  const line1Words = H1_LINE_1.split(" ");
  const renderWordsWithSpaces = (words: React.ReactNode[]) =>
    words.flatMap((node, i) => (i === 0 ? [node] : [" ", node]));

  const e = (delay: number, cls = ""): React.HTMLAttributes<HTMLElement> => ({
    className: `hero-enter ${entered ? "entered" : ""} ${cls}`.trim(),
    style: { ["--enter-delay" as string]: `${delay}ms` } as React.CSSProperties,
  });

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}
    >
      <div ref={parallaxRef} className="absolute inset-0 parallax-wrap">
        <img
          src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1920&q=80&auto=format&fit=crop"
          alt="Vue de la Philharmonie et du quartier financier de Luxembourg"
          className="w-full h-full object-cover object-right kenburns"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.75) 45%, rgba(255,255,255,0.05) 100%)",
          }}
        />
      </div>

      <div
        className="relative flex flex-col justify-center gap-8 max-w-xl"
        style={{ minHeight: "100vh", paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "96px", paddingBottom: "64px" }}
      >
        <div className="md:pl-10 flex flex-col gap-8">
          <div {...e(80)}>
            <span className="label-pill">Barreau de Luxembourg · Depuis 2007</span>
          </div>

          <h1
            ref={h1Ref}
            className={`hero-enter ${entered ? "entered" : ""} t-h1`}
            style={{ ["--enter-delay" as string]: "200ms" } as React.CSSProperties}
          >
            {renderWordsWithSpaces(renderLine(H1_LINE_1, 0))}
            <br />
            {renderWordsWithSpaces(renderLine(H1_LINE_2, line1Words.length))}
          </h1>

          <p
            {...e(380)}
            className={`hero-enter ${entered ? "entered" : ""} t-body-lg`}
            style={{
              color: "var(--ink-2)",
              ["--enter-delay" as string]: "380ms",
            } as React.CSSProperties}
          >
            Cabinet d'avocats à Dudelange, au cœur du Grand-Duché de Luxembourg.
            Droit civil, pénal, commercial et administratif. Consultations en
            luxembourgeois, français, allemand ou anglais.
          </p>

          <div
            className={`hero-enter ${entered ? "entered" : ""} flex gap-2 flex-wrap`}
            style={{ ["--enter-delay" as string]: "500ms" } as React.CSSProperties}
          >
            <span className="lang-pill">🇱🇺 LU</span>
            <span className="lang-pill">🇫🇷 FR</span>
            <span className="lang-pill">🇩🇪 DE</span>
            <span className="lang-pill">🇬🇧 EN</span>
          </div>

          <div
            className={`hero-enter ${entered ? "entered" : ""} flex gap-3 flex-wrap`}
            style={{ ["--enter-delay" as string]: "610ms" } as React.CSSProperties}
          >
            <Magnetic>
              <a href="tel:+35220331456" className="pill-black">
                Prendre rendez-vous
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#domaines" className="pill-warm">
                Nos domaines
              </a>
            </Magnetic>
          </div>

          <p
            className={`hero-enter ${entered ? "entered" : ""} t-caption`}
            style={{
              color: "var(--ink-3)",
              ["--enter-delay" as string]: "710ms",
            } as React.CSSProperties}
          >
            40, rue du Commerce · L-3450 Dudelange
            <br />
            Tél. 20 33 14 56 · Lun–Ven 9h–19h
          </p>
        </div>
      </div>
    </section>
  );
}