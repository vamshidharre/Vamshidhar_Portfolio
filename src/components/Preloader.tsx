import React, { useEffect, useRef, useState } from "react";
import "./styles/Preloader.css";
import { startIntro } from "./utils/intro";
import { prefersReducedMotion } from "./utils/motion";

const STEPS = ["Meshing geometry", "Assembling stiffness matrix", "Solving eigenproblem", "Ready"];
const DURATION = 1500;
const SEEN_KEY = "intro-seen";

const alreadySeen = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
};

// Purely time-based: it never waits on network assets, and a failsafe always dismisses it.
const Preloader: React.FC = () => {
  const [done, setDone] = useState(() => prefersReducedMotion() || alreadySeen());
  const rootRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const stepRef = useRef<HTMLSpanElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (done) {
      startIntro();
      return;
    }
    const root = rootRef.current;
    let raf = 0;
    let finished = false;
    const timers: number[] = [];
    const t0 = performance.now();

    const finish = () => {
      if (finished) return;
      finished = true;
      root?.classList.add("is-leaving");
      timers.push(window.setTimeout(startIntro, 380));
      timers.push(window.setTimeout(() => setDone(true), 1200));
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* storage unavailable: the intro just plays again next time */
      }
    };

    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / DURATION);
      const p = 1 - Math.pow(1 - t, 3);
      if (numRef.current) numRef.current.textContent = String(Math.round(p * 100)).padStart(3, "0");
      if (stepRef.current) stepRef.current.textContent = STEPS[Math.min(STEPS.length - 1, Math.floor(p * STEPS.length))];
      if (pathRef.current) pathRef.current.style.strokeDashoffset = String(1 - p);
      if (t < 1) raf = requestAnimationFrame(tick);
      else timers.push(window.setTimeout(finish, 150));
    };

    raf = requestAnimationFrame(tick);
    timers.push(window.setTimeout(finish, 3500));

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, [done]);

  if (done) return null;

  return (
    <div className="preloader" ref={rootRef} aria-hidden="true">
      <div className="preloader-top">
        <span>Vamshidhar Reddy</span>
        <span>CAE · NVH · ML</span>
      </div>

      <svg className="preloader-wave" viewBox="0 0 600 120" preserveAspectRatio="none">
        <path
          ref={pathRef}
          pathLength={1}
          d="M0,60 C40,60 60,58 80,56 S110,8 122,8 S140,58 170,62 S240,66 260,64 S290,22 300,22 S318,66 350,68 S420,62 440,60 S462,38 470,38 S486,62 510,63 S580,60 600,60"
        />
      </svg>

      <div className="preloader-bottom">
        <span className="preloader-num" ref={numRef}>
          000
        </span>
        <span className="preloader-step">
          <span className="preloader-dot" />
          <span ref={stepRef}>{STEPS[0]}</span>
        </span>
      </div>
    </div>
  );
};

export default Preloader;
