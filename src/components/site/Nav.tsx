import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#domaines", label: "Domaines" },
  { href: "#profil", label: "Tom Luciani" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

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

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full"
      style={{
        backgroundColor: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
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
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link t-nav">
              {l.label}
            </a>
          ))}
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
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-50"
          onClick={() => setOpen(false)}
          style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
        >
          <aside
            className="absolute top-0 right-0 h-full w-[80%] max-w-[360px] bg-white p-6 flex flex-col"
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
                onClick={() => setOpen(false)}
                className="w-10 h-10 inline-flex items-center justify-center rounded-full"
                style={{ color: "#000" }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="t-nav"
                  style={{ color: "#000" }}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="tel:+35220331456"
                className="pill-black mt-4 self-start"
                onClick={() => setOpen(false)}
              >
                Prendre rendez-vous
              </a>
            </nav>
          </aside>
        </div>
      )}
    </header>
  );
}