import React from "react";
import "./styles/TechnicalSkills.css";
import Split from "./Split";
import { skillGroups } from "../data/content";

export const TechnicalSkills: React.FC = () => {
  return (
    <section className="section skills" id="skills">
      <div className="wrap">
        <div className="section-head">
          <p className="section-label eyebrow reveal">
            <span className="num">(04)</span>Skills
          </p>
          <h2 className="section-title reveal-split">
            <Split>
              Solvers, <em>scripts</em> and the maths underneath.
            </Split>
          </h2>
          <p className="section-intro reveal">
            The tools I use day to day, grouped by what they're for. I care most about the methods column:
            solvers change, the mechanics doesn't.
          </p>
        </div>

        <div className="skill-grid" data-spot-group>
          {skillGroups.map((g, i) => (
            <div className="reveal skill-cell" key={g.title} style={{ ["--delay" as string]: `${i * 90}ms` }}>
              <div className={`skill-card spot ${i === skillGroups.length - 1 ? "is-featured" : ""}`}>
                <div className="skill-top">
                  <span className="skill-letter">{String.fromCharCode(65 + i)}</span>
                  <span className="skill-count">{String(g.items.length).padStart(2, "0")}</span>
                </div>
                <h3 className="skill-title">{g.title}</h3>
                <ul className="skill-list">
                  {g.items.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;
