import { useReveal } from "@/hooks/useReveal";

export function Hero() {
  const r1 = useReveal<HTMLDivElement>();
  const r2 = useReveal<HTMLHeadingElement>();
  const r3 = useReveal<HTMLParagraphElement>();
  const r4 = useReveal<HTMLDivElement>();
  const r5 = useReveal<HTMLDivElement>();
  const r6 = useReveal<HTMLParagraphElement>();

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}
    >
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1920&q=80&auto=format&fit=crop"
          alt="Vue de la Philharmonie et du quartier financier de Luxembourg"
          className="w-full h-full object-cover object-right"
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
          <div ref={r1} className="reveal">
            <span className="label-pill">Barreau de Luxembourg · Depuis 2007</span>
          </div>

          <h1 ref={r2} className="reveal t-h1">
            Défendre vos intérêts
            <br />
            au Grand-Duché
          </h1>

          <p
            ref={r3}
            className="reveal t-body-lg"
            style={{ color: "var(--ink-2)" }}
          >
            Cabinet d'avocats à Dudelange, au cœur du Grand-Duché de Luxembourg.
            Droit civil, pénal, commercial et administratif. Consultations en
            luxembourgeois, français, allemand ou anglais.
          </p>

          <div ref={r4} className="reveal flex gap-2 flex-wrap">
            <span className="lang-pill">🇱🇺 LU</span>
            <span className="lang-pill">🇫🇷 FR</span>
            <span className="lang-pill">🇩🇪 DE</span>
            <span className="lang-pill">🇬🇧 EN</span>
          </div>

          <div ref={r5} className="reveal flex gap-3 flex-wrap">
            <a href="tel:+35220331456" className="pill-black">
              Prendre rendez-vous
            </a>
            <a href="#domaines" className="pill-warm">
              Nos domaines
            </a>
          </div>

          <p
            ref={r6}
            className="reveal t-caption"
            style={{ color: "var(--ink-3)" }}
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