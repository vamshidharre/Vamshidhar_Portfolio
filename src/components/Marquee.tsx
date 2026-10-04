import React, { useEffect, useRef } from "react";
import "./styles/Marquee.css";
import { getLenis, gsap, prefersReducedMotion } from "./utils/motion";
import { marqueeFocus, marqueeTools } from "../data/content";

interface TrackProps {
  items: string[];
  reverse?: boolean;
  speed?: number;
}

// Drifts on its own, speeds up and skews with scroll velocity, and flips direction when you scroll back.
const Track: React.FC<TrackProps> = ({ items, reverse = false, speed = 48 }) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;

    const base = reverse ? 1 : -1;
    let dir = base;
    let x = reverse ? -track.scrollWidth / 2 : 0;
    let visible = true;
    const skewTo = gsap.quickTo(track, "skewX", { duration: 0.6, ease: "power3.out" });

    const tick = (_time: number, dt: number) => {
      if (!visible) return;
      const v = getLenis()?.velocity ?? 0;
      if (Math.abs(v) > 0.4) dir = v > 0 ? base : -base;
      const boost = 1 + Math.min(Math.abs(v) * 0.3, 9);
      const half = track.scrollWidth / 2;
      x += dir * speed * boost * (dt / 1000);
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      gsap.set(track, { x });
      skewTo(gsap.utils.clamp(-12, 12, -v * 0.7));
    };

    gsap.ticker.add(tick);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(track);

    return () => {
      gsap.ticker.remove(tick);
      io.disconnect();
      gsap.set(track, { clearProps: "transform" });
    };
  }, [reverse, speed]);

  const group = (copy: boolean) => (
    <div className="marquee-group" aria-hidden={copy || undefined}>
      {items.map((t) => (
        <span className="marquee-item" key={t}>
          {t}
          <span className="marquee-sep" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee">
      <div className="marquee-track" ref={trackRef}>
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
};

export const Bands: React.FC = () => (
  <section className="bands" aria-label="Focus areas and tools">
    <div className="band band-accent">
      <Track items={marqueeFocus} />
    </div>
    <div className="band band-outline">
      <Track items={marqueeTools} reverse speed={40} />
    </div>
  </section>
);

export default Bands;
