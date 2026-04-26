import { useEffect, useRef, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["domaines", "profil", "approche", "avis", "contact"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const visible = new Set<string>();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        });
        // Pick the first id (in document order) that is currently visible
        const next = ids.find((id) => visible.has(id)) ?? null;
        setActiveId(next);
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full nav-shell"
      style={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0)",
        backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.05)" : "1px solid rgba(0,0,0,0)",
        boxShadow: scrolled ? "rgba(0,0,0,0.04) 0px 4px 4px" : "none",
        height: "64px",
      }}
    >
      <div className="container-x flex items-center justify-between h-16">
        <a
          href="#hero"
          className="font-display text-[20px] leading-none"
          style={{ color: "#000" }}
        >
          Étude Luciani
        </a>

        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l) => {
            const id = l.href.replace("#", "");
            const isActive = activeId === id;
            return (
              <a
                key={l.href}
                href={l.href}
                className={`nav-link t-nav ${isActive ? "active" : ""}`}
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a href="tel:+35220331456" className="hidden sm:inline-flex pill-black compact">
            Prendre rendez-vous
          </a>
          <button
            type="button"
            aria-label="Ouvrir le menu"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full"
            onClick={() => setOpen(true)}
            style={{ color: "#000" }}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </header>
  );
}

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
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
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="drawer-link"
              onClick={onClose}
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:+35220331456"
            className="pill-black mt-6 w-full justify-center"
            onClick={onClose}
          >
            Prendre rendez-vous
          </a>
        </nav>
      </aside>
    </div>
  );
}