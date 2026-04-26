import { useEffect, useRef, type ReactNode } from "react";

export function H2Reveal({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll<HTMLElement>(".h2-clip").forEach((s) =>
            s.classList.add("visible")
          );
          obs.unobserve(el);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const arr = Array.isArray(children) ? children : [children];
  return (
    <h2 ref={ref} className={className}>
      {arr.map((child, i) => {
        if (typeof child === "string") {
          return (
            <span key={i} className="h2-clip">
              <span>{child}</span>
            </span>
          );
        }
        // Render br and other elements as-is (e.g. <br />)
        return <span key={i}>{child}</span>;
      })}
    </h2>
  );
}
