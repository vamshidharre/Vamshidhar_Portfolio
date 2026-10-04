import React, { useEffect, useRef } from "react";
import "./styles/Stats.css";
import { prefersReducedMotion } from "./utils/motion";
import { heroStats } from "../data/content";

const parse = (value: string) => {
  const m = value.match(/^([^\d]*)([\d,.]+)(.*)$/);
  if (!m) return null;
  return { prefix: m[1], num: parseFloat(m[2].replace(/,/g, "")), suffix: m[3], grouped: m[2].includes(",") };
};

// Counts up from zero the first time it's on screen.
const Counter: React.FC<{ value: string }> = ({ value }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const p = parse(value);
  const fmt = (n: number) => (p?.grouped ? Math.round(n).toLocaleString("en-US") : String(Math.round(n)));

  useEffect(() => {
    const el = ref.current;
    if (!el || !p || p.num < 10 || prefersReducedMotion()) return;
    let raf = 0;
    el.textContent = fmt(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - t0) / 2200);
          el.textContent = fmt(p.num * (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = fmt(p.num);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!p) return <>{value}</>;
  return (
    <>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {p.prefix}
        <span ref={ref}>{fmt(p.num)}</span>
        <span className="stat-suffix">{p.suffix}</span>
      </span>
    </>
  );
};

export const Stats: React.FC = () => (
  <section className="stats-band" aria-label="Highlights">
    <div className="wrap">
      <dl className="stats">
        {heroStats.map((s, i) => (
          <div className="stat reveal spot" key={s.value} style={{ ["--delay" as string]: `${i * 90}ms` }}>
            <dt>
              <Counter value={s.value} />
            </dt>
            <dd>{s.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default Stats;
