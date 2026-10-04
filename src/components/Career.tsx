import React, { useEffect, useRef } from "react";
import "./styles/Career.css";
import Split from "./Split";
import { experience } from "../data/content";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./utils/motion";

export const Career: React.FC = () => {
  const listRef = useRef<HTMLDivElement>(null);

  // The rail fills as you read down; each role lights up when the fill reaches it.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.fromTo(
          ".tl-fill",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: list, start: "top 65%", end: "bottom 65%", scrub: 0.4 },
          }
        );
      }
      gsap.utils.toArray<HTMLElement>(".tl-item").forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 65%",
          toggleClass: { targets: item, className: "is-active" },
          ...(reduced ? { once: true } : {}),
        });
      });
    }, list);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section experience" id="experience">
      <div className="wrap">
        <div className="section-head">
          <p className="section-label eyebrow reveal">
            <span className="num">(03)</span>Experience
          </p>
          <h2 className="section-title reveal-split">
            <Split>
              Two years inside <em>automotive</em> CAE teams.
            </Split>
          </h2>
        </div>

        <div className="timeline" ref={listRef}>
          <div className="tl-rail" aria-hidden="true">
            <div className="tl-fill" />
          </div>
          <ol className="tl-list">
            {experience.map((r) => (
              <li className="tl-item" key={`${r.company}-${r.period}`}>
                <span className="tl-node" aria-hidden="true" />
                <p className="tl-period">
                  {r.period}
                  {r.current && <span className="tl-now">Now</span>}
                </p>
                <div className="tl-head">
                  <h3 className="tl-role">{r.role}</h3>
                  <p className="tl-company">
                    {r.company}
                    <span>{r.place}</span>
                  </p>
                </div>
                <div className="tl-body">
                  <p>{r.summary}</p>
                  <ul className="tl-tags" aria-label="Tools">
                    {r.tags.map((t) => (
                      <li className="chip" key={t}>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Career;
