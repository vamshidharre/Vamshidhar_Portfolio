import React, { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import { hasFinePointer } from "./utils/motion";

const INTERACTIVE = "a, button, label, select, summary, [data-cursor], input[type='range'], input[type='radio']";
const TEXT_ENTRY = "input:not([type='range']):not([type='radio']):not([type='checkbox']), textarea";

// A dot that tracks the pointer exactly, plus a ring that trails it and reacts to what's underneath.
const Cursor: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!root || !ring || !dot || !label || !hasFinePointer()) return;

    document.documentElement.classList.add("has-cursor");
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;

    const loop = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (!root.classList.contains("is-on")) {
        rx = x;
        ry = y;
        root.classList.add("is-on");
      }
    };

    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const text = t.closest(TEXT_ENTRY);
      const hit = text ? null : t.closest<HTMLElement>(INTERACTIVE);
      const custom = t.closest<HTMLElement>("[data-cursor-label]");
      root.classList.toggle("is-text", !!text);
      root.classList.toggle("is-link", !!hit && !custom);
      root.classList.toggle("is-label", !!custom);
      label.textContent = custom?.dataset.cursorLabel ?? "";
    };

    const onDown = () => root.classList.add("is-down");
    const onUp = () => root.classList.remove("is-down");
    const onLeave = () => root.classList.remove("is-on");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div className="cursor" ref={rootRef} aria-hidden="true">
      <div className="cursor-ring" ref={ringRef}>
        <span className="cursor-ring-shape" />
        <span className="cursor-label" ref={labelRef} />
      </div>
      <div className="cursor-dot" ref={dotRef} />
    </div>
  );
};

export default Cursor;
