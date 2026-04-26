import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#domaines", label: "Domaines" },
  { href: "#profil", label: "Tom Luciani" },
  { href: "#approche", label: "Approche" },
  { href: "#avis", label: "Avis" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [pill, setPill] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Scroll-spy with rootMargin compensating the fixed header
  useEffect(() => {
    const ids = links.map((l) => l.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const ratios = new Map<string, number>();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            ratios.set(id, entry.intersectionRatio);
          } else {
            ratios.delete(id);
          }
        });
        if (ratios.size === 0) {
          setActiveIndex(null);
          return;
        }
        // Highest ratio wins; tie-break = first in document order
        let bestId: string | null = null;
        let bestRatio = -1;
        for (const id of ids) {
          const r = ratios.get(id);
          if (r === undefined) continue;
          if (r > bestRatio) {
            bestRatio = r;
            bestId = id;
          }
        }
        if (bestId) {
          setActiveIndex(ids.indexOf(bestId));
        } else {
          setActiveIndex(null);
        }
      },
      { threshold: 0.3, rootMargin: "-64px 0px 0px 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Keep the active pill aligned with the active link
  useLayoutEffect(() => {
    const update = () => {
      const parent = navRef.current;
      if (!parent || activeIndex === null) return;
      const el = linkRefs.current[activeIndex];
      if (!el) return;
      const parentRect = parent.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      setPill({ left: rect.left - parentRect.left, width: rect.width });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [activeIndex]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full nav-shell-solid"
      style={{ height: "64px" }}
    >
      <div className="container-x flex items-center justify-between h-16">
        <a
          href="#hero"
          className="font-display text-[20px] leading-none nav-logo"
          aria-label="Étude Luciani — accueil"
        >
          Étude <span className="nav-logo-name">Luciani</span>
        </a>

        <nav
          ref={navRef}
          className="hidden lg:flex items-center gap-2 relative"
          aria-label="Navigation principale"
        >
          {links.map((l, i) => {
            const isActive = activeIndex === i;
            return (
              <a
                key={l.href}
                href={l.href}
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
                className={`nav-link-pill t-nav ${isActive ? "active" : ""}`}
                style={{
                  animation: `nav-link-in 400ms cubic-bezier(0.16,1,0.3,1) both`,
                  animationDelay: `${150 + i * 50}ms`,
                }}
              >
                {l.label}
              </a>
            );
          })}
          <span
            aria-hidden="true"
            className="nav-active-pill"
            style={{
              left: `${pill.left}px`,
              width: `${pill.width}px`,
              opacity: activeIndex === null ? 0 : 1,
            }}
          />
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+35220331456"
            className="hidden lg:inline-flex nav-cta"
          >
            Prendre rendez-vous
          </a>
          <button
            type="button"
            aria-label="Ouvrir le menu"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full nav-burger"
            onClick={() => setOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <MobileDrawer
        open={open}
        onClose={() => setOpen(false)}
        activeIndex={activeIndex}
      />
    </header>
  );
}

function MobileDrawer({
  open,
  onClose,
  activeIndex,
}: {
  open: boolean;
  onClose: () => void;
  activeIndex: number | null;
}) {
  const [mounted, setMounted] = useState(false);
  const [animOpen, setAnimOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    if (open) {
      if (closeTimer.current) {
        window.clearTimeout(closeTimer.current);
        closeTimer.current = null;
      }
      setMounted(true);
      // next frame, trigger transition to open
      const id = requestAnimationFrame(() => setAnimOpen(true));
      return () => cancelAnimationFrame(id);
    } else if (mounted) {
      setAnimOpen(false);
      closeTimer.current = window.setTimeout(() => {
        setMounted(false);
        closeTimer.current = null;
      }, 360);
    }
    return undefined;
  }, [open, mounted]);

  if (!mounted) return null;

  return (
    <div
      className={`lg:hidden fixed inset-0 z-50 drawer-backdrop ${animOpen ? "open" : ""}`}
      onClick={onClose}
    >
      <aside
        className={`absolute top-0 right-0 h-full w-[85vw] max-w-[320px] bg-white p-6 flex flex-col drawer-panel ${animOpen ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: "var(--shadow-card-hover)" }}
      >
        <div className="flex items-center justify-between mb-10">
          <span className="font-display text-[20px]" style={{ color: "#000" }}>
            Étude Luciani
          </span>
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={onClose}
            className="w-10 h-10 inline-flex items-center justify-center rounded-full"
            style={{ color: "#000" }}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col flex-1">
          {links.map((l, i) => {
            const isActive = activeIndex === i;
            return (
              <a
                key={l.href}
                href={l.href}
                className={`drawer-link-gold ${isActive ? "active" : ""}`}
                onClick={onClose}
              >
                <span className="drawer-bar" aria-hidden="true" />
                {l.label}
              </a>
            );
          })}
          <a
            href="tel:+35220331456"
            className="nav-cta mt-6 w-full justify-center"
            onClick={onClose}
          >
            Prendre rendez-vous
          </a>
        </nav>
      </aside>
    </div>
  );
}