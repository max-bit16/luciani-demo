import { useRef, type MouseEvent } from "react";

export function useTilt<T extends HTMLElement = HTMLDivElement>(
  enabled: boolean = true
) {
  const ref = useRef<T>(null);

  const onMouseMove = (e: MouseEvent<T>) => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.classList.remove("tilt-reset");
    el.style.transform = `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateZ(6px) scale(1.01)`;
  };

  const onMouseLeave = () => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    el.classList.add("tilt-reset");
    el.style.transform = "";
  };

  return { ref, onMouseMove, onMouseLeave };
}
