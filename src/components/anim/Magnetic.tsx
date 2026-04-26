import { useRef, type ReactNode, type MouseEvent } from "react";

export function Magnetic({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: MouseEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    let dx = (e.clientX - cx) * 0.25;
    let dy = (e.clientY - cy) * 0.25;
    dx = Math.max(-8, Math.min(8, dx));
    dy = Math.max(-8, Math.min(8, dy));
    el.classList.remove("magnet-reset");
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("magnet-reset");
    el.style.transform = "translate(0px, 0px)";
  };

  return (
    <span
      ref={ref}
      className={`magnetic ${className ?? ""}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ display: "inline-block" }}
    >
      {children}
    </span>
  );
}
