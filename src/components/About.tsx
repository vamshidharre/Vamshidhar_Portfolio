import React from "react";
import "./styles/About.css";
import Split from "./Split";
import { aboutFacts, aboutLead, aboutStory, profile } from "../data/content";

export const About: React.FC = () => {
  return (
    <section className="section about" id="about">
      <div className="wrap">
        <div className="section-head">
          <p className="section-label eyebrow reveal">
            <span className="num">(01)</span>About
          </p>
          <h2 className="section-title reveal-split">
            <Split>
              From building things to <em>simulating</em> them.
            </Split>
          </h2>
        </div>

        <p className="about-lead" data-scrub>
          <Split>{aboutLead}</Split>
        </p>

        <div className="about-grid">
          <aside className="about-side">
            <div className="reveal">
              <figure className="portrait" data-tilt="5">
                <div className="portrait-frame">
                  <img
                    src="/images/portrait.webp"
                    alt={`Portrait of ${profile.name}`}
                    width={600}
                    height={600}
                    loading="lazy"
                    data-speed="7"
                  />
                </div>
                <figcaption>
                  <span className="portrait-name">{profile.name}</span>
                  <span className="portrait-tag">
                    <span className="status-dot" aria-hidden="true" />
                    Stuttgart
                  </span>
                </figcaption>
              </figure>
            </div>

            <dl className="facts reveal">
              {aboutFacts.map((f) => (
                <div key={f.k}>
                  <dt>{f.k}</dt>
                  <dd>{f.v}</dd>
                </div>
              ))}
            </dl>
          </aside>

          <div className="about-body">
            {aboutStory.map((p, i) => (
              <p className="reveal" key={i}>
                <span className="about-num">0{i + 1}</span>
                {p}
              </p>
            ))}
            <div className="about-links reveal">
              <a className="text-link" href={profile.thesis} target="_blank" rel="noopener noreferrer">
                Read the thesis summary <span className="arrow">↗</span>
              </a>
              <a className="text-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn <span className="arrow">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
