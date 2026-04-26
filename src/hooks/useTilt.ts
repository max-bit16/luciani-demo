import { useRef, type MouseEvent } from "react";

export function useTilt<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  const onMouseMove = (e: MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.classList.remove("tilt-reset");
    el.style.transform = `perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateZ(6px) scale(1.01)`;
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("tilt-reset");
    el.style.transform = "";
  };

  return { ref, onMouseMove, onMouseLeave };
}
