import { useEffect, useRef } from "react";

export function useParallax<T extends HTMLElement = HTMLDivElement>(
  factor = 0.15,
  max = 80
) {
  const ref = useRef<T>(null);
  useEffect(() => {
    let raf = 0;
    let ticking = false;
    const update = () => {
      const el = ref.current;
      if (el) {
        const offset = Math.min(max, Math.max(-max, window.scrollY * factor));
        el.style.transform = `translateY(${offset}px)`;
      }
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
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [factor, max]);
  return ref;
}
