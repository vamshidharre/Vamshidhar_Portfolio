import React from "react";
import "./styles/Lab.css";
import FrfPlot from "./FrfPlot";
import Split from "./Split";

export const Lab: React.FC = () => (
  <section className="section lab" aria-labelledby="lab-title">
    <div className="wrap lab-grid">
      <div className="lab-copy">
        <p className="eyebrow reveal">
          <span className="num">Fig. 1</span>Interactive
        </p>
        <h2 className="lab-title reveal-split" id="lab-title">
          <Split>
            Drag the damping. <em>Watch the peaks.</em>
          </Split>
        </h2>
        <p className="lab-text reveal">
          A four-mode frequency response, the kind of curve my surrogates learn to predict from geometry and
          material parameters. Hover to read values; drag <span className="serif">ζ</span> to see how damping
          flattens each resonance.
        </p>
        <ul className="lab-legend reveal" aria-label="Plot legend">
          <li>
            <span className="lab-swatch is-line" />
            Driving-point receptance |H(f)|
          </li>
          <li>
            <span className="lab-swatch is-mode" />
            Natural frequencies f₁ to f₄
          </li>
        </ul>
      </div>

      <div className="lab-plot reveal spot" style={{ ["--delay" as string]: "150ms" }}>
        <FrfPlot />
      </div>
    </div>
  </section>
);

export default Lab;
