import React, { useEffect, useRef } from "react";
import "./styles/Projects.css";
import { featuredProjects, moreProjects, Project, ProjectLink } from "../data/content";
import ProjectFigure from "./Figures";
import Split from "./Split";
import { gsap, prefersReducedMotion } from "./utils/motion";

const LinkItem: React.FC<{ link: ProjectLink }> = ({ link }) => {
  const placeholder = link.href === "#";
  const external = /^https?:/.test(link.href) || link.href.endsWith(".pdf");
  return (
    <a
      className="text-link"
      href={link.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(placeholder
        ? { onClick: (e: React.MouseEvent) => e.preventDefault(), title: "Link coming soon" }
        : {})}
    >
      {link.label} <span className="arrow">↗</span>
    </a>
  );
};

const Meta: React.FC<{ p: Project; index: number }> = ({ p, index }) => (
  <p className="project-meta eyebrow">
    <span className="num">{String(index).padStart(2, "0")}</span>
    {p.context}
    {p.year && <span className="project-year">{p.year}</span>}
  </p>
);

const Footer: React.FC<{ p: Project }> = ({ p }) => (
  <>
    <ul className="project-stack" aria-label="Tools">
      {p.stack.map((s) => (
        <li className="chip" key={s}>
          {s}
        </li>
      ))}
    </ul>
    {(p.links.length > 0 || p.note) && (
      <div className="project-links">
        {p.links.map((l) => (
          <LinkItem link={l} key={l.label} />
        ))}
        {p.note && <span className="project-note">{p.note}</span>}
      </div>
    )}
  </>
);

export const Projects: React.FC = () => {
  const stackRef = useRef<HTMLDivElement>(null);

  // Each card pins under the nav; as the next one slides over, the one beneath shrinks and dims.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (min-height: 720px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card", stackRef.current);
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        gsap
          .timeline({
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: () => `top ${parseFloat(getComputedStyle(next).top) || 100}px`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
          .to(card.querySelector(".stack-inner"), { scale: 0.93 - (cards.length - i) * 0.01, ease: "none" }, 0)
          .to(card.querySelector(".stack-shade"), { opacity: 0.7, ease: "none" }, 0);
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="section work" id="work">
      <div className="wrap">
        <div className="section-head">
          <p className="section-label eyebrow reveal">
            <span className="num">(02)</span>Selected work
          </p>
          <h2 className="section-title reveal-split">
            <Split>
              Six projects, one thread: making <em>physics</em> computable.
            </Split>
          </h2>
          <p className="section-intro reveal">
            Industry work at Mercedes-Benz and Valeo, university research at FAU, and a couple of things built
            in a weekend.
          </p>
        </div>

        <div className="stack" ref={stackRef}>
          {featuredProjects.map((p, i) => (
            <article className="stack-card" key={p.id} id={p.id} style={{ ["--i" as string]: i }}>
              <div className="stack-inner spot">
                <div className="stack-body">
                  <Meta p={p} index={i + 1} />
                  <h3 className="feature-title">{p.title}</h3>
                  <p className="feature-summary">{p.summary}</p>
                  <ul className="outcomes">
                    {p.outcomes.map((o) => (
                      <li key={o}>{o}</li>
                    ))}
                  </ul>
                  <Footer p={p} />
                </div>

                <figure className="stack-figure">
                  <div className={`fig-frame ${p.figure === "topology" ? "is-photo" : ""}`}>
                    <ProjectFigure kind={p.figure} alt={p.caption} />
                  </div>
                  <figcaption>
                    <span className="eyebrow">Fig. {i + 2}</span>
                    {p.caption}
                  </figcaption>
                </figure>

                <div className="stack-shade" aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>

        <div className="more">
          <div className="more-head reveal">
            <p className="eyebrow">More projects</p>
            <p className="more-count">
              <span>{String(moreProjects.length).padStart(2, "0")}</span> builds
            </p>
          </div>
          <div className="more-grid" data-spot-group>
            {moreProjects.map((p, i) => (
              <div className="reveal" key={p.id} style={{ ["--delay" as string]: `${i * 110}ms` }}>
                <article className="card spot" id={p.id} data-tilt="5">
                  <div className="fig-frame">
                    <ProjectFigure kind={p.figure} alt={p.caption} />
                  </div>
                  <Meta p={p} index={featuredProjects.length + i + 1} />
                  <h3 className="card-title">{p.title}</h3>
                  <p className="card-summary">{p.summary}</p>
                  <p className="card-outcome">{p.outcomes.join(" · ")}</p>
                  <Footer p={p} />
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
