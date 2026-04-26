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

  // Wrap each line (ReactNode children may include <br/>). We split text nodes by lines.
  const wrapNode = (node: ReactNode, key: number): ReactNode => {
    if (typeof node === "string") {
      const lines = node.split(/\n/);
      return lines.map((line, i) => (
        <span key={`${key}-${i}`} className="h2-clip">
          <span>{line}</span>
        </span>
      ));
    }
    return (
      <span key={key} className="h2-clip">
        <span>{node}</span>
      </span>
    );
  };

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
