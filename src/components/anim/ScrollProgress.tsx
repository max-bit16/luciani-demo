import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    let ticking = false;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${ratio})`;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}
