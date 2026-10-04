import React from "react";
import "./styles/Research.css";
import { FaBookOpen, FaFilePdf, FaUniversity, FaBuilding, FaUserTie, FaCheckCircle, FaLightbulb } from "react-icons/fa";
import { TbMathFunction, TbWaveSine } from "react-icons/tb";

export const Research: React.FC = () => {
  return (
    <section className="research-section" id="research">
      <div className="section-container">
        {/* Section Header Tag */}
        <div className="section-header-tag">
          <span className="section-num">05</span>
          <span className="section-tag-line">// ACADEMIC RESEARCH & SCIENTIFIC PUBLICATIONS</span>
        </div>

        <div className="research-header-block">
          <h2 className="research-heading">
            Master Thesis & <span className="text-gradient">Powertrain Vibroacoustics Research</span>
          </h2>
          <p className="research-sub">
            Scientific investigation into multi-physical electromagnetic-structural coupling, air-gap harmonic
            decomposition, and Equivalent Radiated Power (ERP) in electrified vehicle powertrains.
          </p>
        </div>

        {/* Master Thesis Card */}
        <div className="thesis-master-card">
          {/* Header Metadata Bar */}
          <div className="thesis-top-banner">
            <div className="thesis-badge">
              <FaBookOpen />
              <span>MASTER OF SCIENCE THESIS INVESTIGATION</span>
            </div>
            <div className="thesis-date">SUBMITTED: 02.10.2025 | FAU ERLANGEN-NÜRNBERG</div>
          </div>

          <h3 className="thesis-title">
            Comparative Study on the Influence of Electromagnetic Excitation Profiles on Electric
            Drivetrain Noise Based on Numerically and Experimentally Derived Forces
          </h3>

          {/* Academic & Industrial Supervisors HUD */}
          <div className="thesis-supervisors-grid">
            <div className="sup-item">
              <span className="sup-label"><FaUniversity /> INSTITUTION</span>
              <span className="sup-val">Chair of Applied Mechanics, FAU Erlangen-Nürnberg</span>
            </div>
            <div className="sup-item">
              <span className="sup-label"><FaBuilding /> INDUSTRY PARTNER</span>
              <span className="sup-val">Valeo eAutomotive Germany GmbH, Erlangen</span>
            </div>
            <div className="sup-item">
              <span className="sup-label"><FaUserTie /> ACADEMIC SUPERVISOR</span>
              <span className="sup-val">Prof. Dr.-Ing. habil. Kai Willner</span>
            </div>
            <div className="sup-item">
              <span className="sup-label"><FaUserTie /> INDUSTRIAL SUPERVISOR</span>
              <span className="sup-val">Dr.-Ing. Christian Ehrlich</span>
            </div>
          </div>

          {/* Mathematical Formulation Block */}
          <div className="research-math-deck">
            <div className="deck-title">
              <TbMathFunction />
              <span>SPATIAL-TEMPORAL 2D FOURIER FORCE DECOMPOSITION</span>
            </div>
            <div className="equation-container">
              <code>F(θ, t) = Σ_r Σ_ω F_{'{'}r,ω{'}'} · cos(rθ - ωt - φ_{'{'}r,ω{'}'})</code>
            </div>
            <p className="deck-explanation">
              Air-gap forces from numerical electromagnetic FEA and experimental flex-PCB coil sensors are decomposed
              into circumferential spatial wavenumbers (order <em>r</em>) and temporal excitation harmonics (frequency <em>ω</em>),
              isolating critical excitation orders exciting stator structural modes.
            </p>
          </div>

          {/* 3 Scientific Insights Grid */}
          <div className="research-insights-grid">
            <div className="insight-card">
              <div className="insight-icon-wrap">
                <FaLightbulb />
              </div>
              <h4>Dominance of Tangential Forces on Housing ERP</h4>
              <p>
                Sensitivity analysis demonstrated that stator housing vibration and Equivalent Radiated Power (ERP)
                are predominantly governed by <strong>tangential force harmonics (specifically spatial mode r = 0)</strong>,
                challenging traditional NVH approaches that assume radial forces dominate acoustic radiation.
              </p>
            </div>

            <div className="insight-card">
              <div className="insight-icon-wrap">
                <TbWaveSine />
              </div>
              <h4>Dynamic Air-Gap Asymmetry & Eccentricity</h4>
              <p>
                Comparison between simulated nominal forces and experimental flex-PCB measurements revealed significant
                divergences in <strong>Force Mode 1</strong>, uncovering real-world dynamic rotor eccentricities and
                manufacturing tolerances not captured by conventional electromagnetic models.
              </p>
            </div>

            <div className="insight-card">
              <div className="insight-icon-wrap">
                <FaCheckCircle />
              </div>
              <h4>Multi-Physics Validation Paradigm</h4>
              <p>
                While structural mode shapes exhibited strong simulation-to-test agreement (MAC {'>'} 0.90),
                radiated noise predictions proved exceptionally sensitive to precise electromagnetic force harmonic profiles,
                proving that reliable NVH requires validated multi-physics force inputs.
              </p>
            </div>
          </div>

          {/* Download Action Footer */}
          <div className="thesis-card-footer">
            <div className="footer-meta">
              <span>DOCUMENTATION STATUS: ACADEMIC SUMMARY (NON-CONFIDENTIAL)</span>
              <span>KEYWORDS: PMSM, NVH, 2D FFT, ANSYS MECHANICAL, ERP, FLEX-PCB</span>
            </div>
            <a
              href="/docs/Master_Thesis_Summary_Vamshidhar_Reddy.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="thesis-download-btn"
            >
              <FaFilePdf />
              <span>DOWNLOAD MASTER THESIS SUMMARY (PDF)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Research;
