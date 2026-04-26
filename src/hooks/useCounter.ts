import { useEffect, useRef, useState } from "react";

// easeOutExpo
const easeOutExpo = (t: number) =>
  t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);

export function useCounter(target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          obs.unobserve(el);
          const start = performance.now();
          let raf = 0;
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            setValue(Math.round(target * easeOutExpo(t)));
            if (t < 1) {
              raf = requestAnimationFrame(tick);
            } else {
              const num = numberRef.current;
              if (num) {
                num.classList.remove("counter-pulse");
                // force reflow so animation can restart
                void num.offsetWidth;
                num.classList.add("counter-pulse");
              }
            }
          };
          raf = requestAnimationFrame(tick);
          return () => cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return { ref, numberRef, value };
}