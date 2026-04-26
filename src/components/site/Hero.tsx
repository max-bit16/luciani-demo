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
    // Words reveal after the H1 itself starts entering (200ms),
    // then each word adds a 60ms stagger via its --delay var.
    const t = window.setTimeout(() => {
      el.querySelectorAll<HTMLElement>(".word-reveal").forEach((w) =>
        w.classList.add("entered")
      );
    }, 200);
    return () => window.clearTimeout(t);
  }, [entered]);

  const renderLine = (line: string, startIndex: number) =>
    line.split(" ").map((word, i) => {
      const idx = startIndex + i;
      return (
        <span
          key={`${idx}-${word}`}
          className="word-reveal"
          style={{ ["--word-delay" as string]: `${idx * 60}ms` }}
        >
          <span>{word}</span>
        </span>
      );
    });

  const line1Words = H1_LINE_1.split(" ");
  const renderWordsWithSpaces = (words: React.ReactNode[]) =>
    words.flatMap((node, i) => (i === 0 ? [node] : [" ", node]));

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}
    >
      <div ref={parallaxRef} className="absolute inset-0 parallax-wrap">
        <picture className="block md:hidden absolute inset-0 w-full h-full">
          <source srcSet="/images/luxembourg-hero-mobile.webp" type="image/webp" />
          <img
            src="/images/luxembourg-hero-mobile.jpg"
            alt="Vue du signe Luxembourg au coucher du soleil, Grand-Duché de Luxembourg"
            className="absolute inset-0 w-full h-full object-cover kenburns"
            style={{ objectPosition: "center 70%" }}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            width={1920}
            height={1280}
          />
        </picture>
        <img
          src="https://source.unsplash.com/vBKCJbjH8cs/1920x1080"
          alt="Architecture contemporaine de la Philharmonie de Luxembourg"
          className="hidden md:block absolute inset-0 w-full h-full object-cover object-right kenburns"
          loading="eager"
        />
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.88) 18%, rgba(255,255,255,0.70) 32%, rgba(255,255,255,0.55) 45%, rgba(255,255,255,0.90) 65%, rgba(255,255,255,0.98) 100%)",
          }}
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.80) 45%, rgba(255,255,255,0.08) 100%)",
          }}
        />
      </div>

      <div
        className="relative flex flex-col justify-center gap-8 max-w-xl"
        style={{ minHeight: "100vh", paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "96px", paddingBottom: "64px" }}
      >
        <div className="md:pl-10 flex flex-col gap-8">
          <div
            className={`hero-enter ${entered ? "entered" : ""}`}
            style={{ ["--enter-delay" as string]: "80ms" } as React.CSSProperties}
          >
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
            className={`hero-enter hero-cta-block ${entered ? "entered" : ""} flex gap-3 flex-col sm:flex-row sm:flex-wrap`}
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
            <span>40, rue du Commerce · L-3450 Dudelange</span>
            <br className="sm:hidden" />
            <span className="sm:before:content-['_·_']">Tél. 20 33 14 56 · Lun–Ven 9h–19h</span>
          </p>
        </div>
      </div>
    </section>
  );
}