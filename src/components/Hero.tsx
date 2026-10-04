import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import "./styles/Hero.css";
import Split, { RollText } from "./Split";
import { onIntro } from "./utils/intro";
import { gsap, prefersReducedMotion } from "./utils/motion";
import { heroIntro, heroRoles, profile } from "../data/content";

const HeroMesh = lazy(() => import("./HeroMesh"));

// Vertical word carousel. It slides onto a copy of the first word, then snaps back unseen.
const RoleTicker: React.FC = () => {
  const [i, setI] = useState(0);
  const [snap, setSnap] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      setSnap(false);
      setI((n) => n + 1);
    }, 2400);
    return () => window.clearInterval(id);
  }, []);

  const onEnd = () => {
    if (i === heroRoles.length) {
      setSnap(true);
      setI(0);
    }
  };

  return (
    <span className="ticker">
      <span className="sr-only">{heroRoles.join(", ")}</span>
      <span
        className={`ticker-track ${snap ? "is-snap" : ""}`}
        style={{ transform: `translateY(${-i * 1.25}em)` }}
        onTransitionEnd={onEnd}
        aria-hidden="true"
      >
        {[...heroRoles, heroRoles[0]].map((r, k) => (
          <span key={k}>{r}</span>
        ))}
      </span>
    </span>
  );
};

export const Hero: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null);
  const hudRef = useRef<HTMLSpanElement>(null);

  useEffect(() => onIntro(() => rootRef.current?.classList.add("is-in")), []);

  // As the hero scrolls away, the copy lifts and fades while the mesh sinks slower behind it.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const st = { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(".hero-content", { yPercent: -22, opacity: 0, ease: "none", scrollTrigger: st });
      gsap.to(".hero-stage", { yPercent: 18, ease: "none", scrollTrigger: st });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={rootRef}>
      <div className="hero-stage">
        <Suspense fallback={null}>
          <HeroMesh hudRef={hudRef} />
        </Suspense>
      </div>
      <div className="hero-veil" aria-hidden="true" />

      <div className="wrap hero-content">
        <div className="hero-meta intro-fade">
          <span className="hero-status">
            <span className="status-dot" aria-hidden="true" />
            {profile.availability}
          </span>
          <span className="eyebrow hero-coords">Stuttgart, DE · 48.78° N, 9.18° E</span>
        </div>

        <h1 className="hero-title">
          <span className="hero-line">
            <Split mode="chars">Quieter machines,</Split>
          </span>
          <span className="hero-line" style={{ ["--ld" as string]: "220ms" }}>
            <Split mode="chars">
              <em>faster</em> simulations.
            </Split>
          </span>
        </h1>

        <div className="hero-bottom">
          <div className="hero-intro intro-fade" style={{ ["--d" as string]: "700ms" }}>
            <p>{heroIntro}</p>
            <div className="hero-ctas">
              <a href="#work" className="btn" data-magnetic="0.2">
                <RollText>See selected work</RollText>
                <span className="arrow">→</span>
              </a>
              <a
                href={profile.resume}
                className="btn btn-ghost"
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic="0.2"
              >
                <RollText>Résumé</RollText>
                <span className="arrow">↗</span>
              </a>
            </div>
          </div>

          <div className="hero-side intro-fade" style={{ ["--d" as string]: "850ms" }}>
            <p className="eyebrow">CAE engineer, focused on</p>
            <p className="hero-role">
              <RoleTicker />
            </p>
          </div>
        </div>

        <div className="hero-hud intro-fade" style={{ ["--d" as string]: "1000ms" }}>
          <span className="hud-cell">
            <span className="hud-live" aria-hidden="true" />
            Live membrane · 150 × 96 nodes
          </span>
          <span className="hud-cell hud-readout" aria-hidden="true">
            |u|<sub>max</sub> <span ref={hudRef}>0.000</span>
          </span>
          <span className="hud-cell hud-hint">Move or click to excite it</span>
          <a href="#about" className="hud-scroll" aria-label="Scroll to About">
            <span />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
