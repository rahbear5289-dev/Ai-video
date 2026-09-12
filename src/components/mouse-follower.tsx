import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, [role=button], input, textarea, select, label, .card, .hover-lift, .magnetic, .cta-sheen";

/**
 * App-wide mouse follower: a gold ring that trails the cursor with easing
 * plus a dot that tracks it instantly. Hover state is handled with event
 * delegation so it also works for elements added after mount (router
 * navigations, dynamic lists). Disabled on touch devices.
 */
export function MouseFollower() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let targetX = -100;
    let targetY = -100;
    let ringX = targetX;
    let ringY = targetY;
    let raf = 0;
    let visible = false;

    const dotTransform = (x: number, y: number) =>
      `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        visible = true;
        ringX = targetX;
        ringY = targetY;
        ring.classList.add("mf-visible");
        dot.classList.add("mf-visible");
      }
      dot.style.transform = dotTransform(targetX, targetY);
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement | null)?.closest(INTERACTIVE_SELECTOR)) {
        ring.classList.add("mf-hover");
        dot.classList.add("mf-hover");
      }
    };

    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement | null)?.closest(INTERACTIVE_SELECTOR)) {
        ring.classList.remove("mf-hover");
        dot.classList.remove("mf-hover");
      }
    };

    const onLeaveDocument = () => {
      visible = false;
      ring.classList.remove("mf-visible");
      dot.classList.remove("mf-visible");
    };

    const tick = () => {
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;
      ring.style.transform = dotTransform(ringX, ringY);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, true);
    document.addEventListener("mouseout", onOut, true);
    document.documentElement.addEventListener("mouseleave", onLeaveDocument);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver, true);
      document.removeEventListener("mouseout", onOut, true);
      document.documentElement.removeEventListener("mouseleave", onLeaveDocument);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999]">
      <div ref={ringRef} className="mf-ring" />
      <div ref={dotRef} className="mf-dot" />
    </div>
  );
}
