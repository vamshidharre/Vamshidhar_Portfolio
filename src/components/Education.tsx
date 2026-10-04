import React from "react";
import "./styles/Education.css";
import Split from "./Split";
import { education, recognition } from "../data/content";

export const Education: React.FC = () => {
  return (
    <section className="section education" id="education">
      <div className="wrap">
        <div className="section-head">
          <p className="section-label eyebrow reveal">
            <span className="num">(05)</span>Education & recognition
          </p>
          <h2 className="section-title reveal-split">
            <Split>
              Trained in <em>mechanics</em>, then in computation.
            </Split>
          </h2>
        </div>

        <div className="edu-grid">
          <div className="edu-col">
            <h3 className="edu-col-title eyebrow reveal">Education</h3>
            {education.map((e, i) => (
              <article className="edu-item reveal" key={e.degree} style={{ ["--delay" as string]: `${i * 100}ms` }}>
                <p className="edu-period">{e.period}</p>
                <div>
                  <h4>{e.degree}</h4>
                  <p className="edu-school">{e.school}</p>
                  <p className="edu-detail">{e.detail}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="edu-col">
            <h3 className="edu-col-title eyebrow reveal">Recognition</h3>
            {recognition.map((r, i) => (
              <article
                className="award reveal spot"
                key={r.title}
                style={{ ["--delay" as string]: `${i * 100}ms` }}
              >
                <span className="award-mark" aria-hidden="true">
                  ★
                </span>
                <div>
                  <h4>{r.title}</h4>
                  <p className="edu-school">
                    {r.org}
                    {r.year && <span className="award-year">{r.year}</span>}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
