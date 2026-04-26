import { useEffect, useRef, useState } from "react";
import { useParallax } from "@/hooks/useParallax";
import { Magnetic } from "@/components/anim/Magnetic";
import heroMobileJpg from "@/assets/luxembourg-hero-mobile.jpg";
import heroMobileWebp from "@/assets/luxembourg-hero-mobile.webp";
import heroMobileJpg480 from "@/assets/luxembourg-hero-mobile-480.jpg";
import heroMobileJpg768 from "@/assets/luxembourg-hero-mobile-768.jpg";
import heroMobileJpg1280 from "@/assets/luxembourg-hero-mobile-1280.jpg";
import heroMobileWebp480 from "@/assets/luxembourg-hero-mobile-480.webp";
import heroMobileWebp768 from "@/assets/luxembourg-hero-mobile-768.webp";
import heroMobileWebp1280 from "@/assets/luxembourg-hero-mobile-1280.webp";

const heroMobileWebpSrcSet = [
  `${heroMobileWebp480} 480w`,
  `${heroMobileWebp768} 768w`,
  `${heroMobileWebp1280} 1280w`,
  `${heroMobileWebp} 1920w`,
].join(", ");

const heroMobileJpgSrcSet = [
  `${heroMobileJpg480} 480w`,
  `${heroMobileJpg768} 768w`,
  `${heroMobileJpg1280} 1280w`,
  `${heroMobileJpg} 1920w`,
].join(", ");

// Hero is full viewport width on mobile (<768px). Above that the desktop
// image takes over, so we only need to cover the mobile range here.
const heroMobileSizes = "(max-width: 767px) 100vw, 0px";

const H1_LINE_1 = "Défendre vos intérêts";
const H1_LINE_2 = "au Grand-Duché";

// Hide any image that fails to load so its alt text never leaks into the
// hero. The CSS background-image fallback on .hero-bg keeps the photo
// visible even when JS or every variant somehow fails.
const hideOnError: React.ReactEventHandler<HTMLImageElement> = (e) => {
  const img = e.currentTarget;
  img.style.visibility = "hidden";
  img.setAttribute("data-failed", "true");
};

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

  const renderLine = (line: string, startIndex: number, color?: string) =>
    line.split(" ").map((word, i) => {
      const idx = startIndex + i;
      return (
        <span
          key={`${idx}-${word}`}
          className="word-reveal"
          style={{ ["--word-delay" as string]: `${idx * 60}ms` }}
        >
          <span style={color ? { color } : undefined}>{word}</span>
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
      <div
        ref={parallaxRef}
        className="absolute inset-0 parallax-wrap hero-bg"
        style={{
          backgroundImage: `url(${heroMobileJpg768})`,
          backgroundSize: "cover",
          backgroundPosition: "center 70%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <picture>
          <source
            type="image/webp"
            media="(max-width: 767px)"
            srcSet={heroMobileWebpSrcSet}
            sizes={heroMobileSizes}
          />
          <source
            type="image/jpeg"
            media="(max-width: 767px)"
            srcSet={heroMobileJpgSrcSet}
            sizes={heroMobileSizes}
          />
          <img
            src={heroMobileJpg768}
            srcSet={heroMobileJpgSrcSet}
            sizes={heroMobileSizes}
            alt="Vue du signe Luxembourg au coucher du soleil, Grand-Duché de Luxembourg"
            className="block md:hidden absolute inset-0 w-full h-full object-cover kenburns"
            style={{ objectPosition: "center 70%" }}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            width={1920}
            height={1280}
            onError={hideOnError}
          />
        </picture>
        <img
          src={heroMobileJpg}
          srcSet={`${heroMobileJpg768} 768w, ${heroMobileJpg1280} 1280w, ${heroMobileJpg} 1920w`}
          sizes="(min-width: 768px) 100vw, 0px"
          alt=""
          aria-hidden="true"
          className="hidden md:block absolute inset-0 w-full h-full object-cover object-right kenburns"
          loading="eager"
          decoding="async"
          width={1920}
          height={1280}
          onError={hideOnError}
        />
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.55) 18%, rgba(255,255,255,0.20) 38%, rgba(255,255,255,0.10) 55%, rgba(255,255,255,0.65) 78%, rgba(255,255,255,0.92) 100%)",
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
            <span className="label-pill">
              <span
                aria-hidden="true"
                style={{
                  color: "#B8924A",
                  fontSize: "8px",
                  marginRight: "4px",
                  verticalAlign: "middle",
                  lineHeight: 1,
                }}
              >
                ●
              </span>
              Barreau de Luxembourg · Depuis 2007
            </span>
          </div>

          <h1
            ref={h1Ref}
            className={`hero-enter ${entered ? "entered" : ""} t-h1`}
            style={{ ["--enter-delay" as string]: "200ms" } as React.CSSProperties}
          >
            {renderWordsWithSpaces(renderLine(H1_LINE_1, 0, "#000000"))}
            <br />
            {renderWordsWithSpaces(renderLine(H1_LINE_2, line1Words.length, "#B8924A"))}
          </h1>

          <p
            className={`hero-enter ${entered ? "entered" : ""} t-body-lg`}
            style={{
              color: "var(--ink-2)",
              ["--enter-delay" as string]: "380ms",
              textShadow:
                "0 1px 2px rgba(255,255,255,0.95), 0 0 12px rgba(255,255,255,0.85), 0 0 24px rgba(255,255,255,0.7)",
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