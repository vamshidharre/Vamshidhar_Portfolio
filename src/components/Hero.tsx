import "./styles/Hero.css";
import SimulationVisualizer from "./SimulationVisualizer";
import { FaFilePdf, FaArrowRight, FaCrosshairs, FaCheckCircle } from "react-icons/fa";
import { BsCpuFill, BsGraphUp } from "react-icons/bs";

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const elem = document.querySelector(id);
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="engineering-hero" id="hero">
      {/* Background Engineering Grids & Glow */}
      <div className="hero-grid-bg"></div>
      <div className="hero-radial-glow"></div>

      <div className="hero-content-wrapper">
        {/* Top Telemetry HUD */}
        <div className="hero-telemetry-hud">
          <div className="hud-badge active-corp">
            <span className="live-dot"></span>
            <span>MERCEDES-BENZ AG (UNTERTÜRKHEIM) | CAE & SURROGATE MODELING</span>
          </div>
          <div className="hud-telemetry-items">
            <span className="tele-item">
              <FaCrosshairs /> LOC: STUTTGART / ERLANGEN, DE
            </span>
            <span className="tele-item">
              <BsCpuFill /> SOLVERS: ANSYS | NASTRAN | SIMCENTER 3D | OPENCFS
            </span>
            <span className="tele-item">
              <FaCheckCircle className="text-emerald" /> GERMAN WORK AUTHORIZATION: UNRESTRICTED
            </span>
          </div>
        </div>

        {/* Main Title & Value Proposition */}
        <div className="hero-headline-block">
          <h2 className="hero-name-label">ENUGALA VAMSHIDHAR REDDY</h2>
          <h1 className="hero-title">
            CAE, Structural Dynamics <span className="text-gradient">& NVH Engineer</span>
          </h1>
          <p className="hero-subtitle">
            Bridging high-fidelity finite element analysis (FEA) with deep neural surrogate models,
            vibroacoustic simulation-test correlation, and automated Python / NX Open pipelines.
          </p>
        </div>

        {/* CTA Action Buttons */}
        <div className="hero-cta-group">
          <button className="hero-btn primary" onClick={() => scrollTo("#projects")}>
            <span>EXPLORE ENGINEERING PROJECTS</span>
            <FaArrowRight />
          </button>
          <button className="hero-btn secondary" onClick={() => scrollTo("#research")}>
            <span>MASTER THESIS RESEARCH</span>
            <BsGraphUp />
          </button>
          <a
            href="/docs/Vamshidhar_Reddy_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn tertiary"
          >
            <FaFilePdf />
            <span>DOWNLOAD CV (.PDF)</span>
          </a>
        </div>

        {/* Interactive Engineering Simulation Visualizer */}
        <div className="hero-visualizer-section">
          <div className="visualizer-header-tag">
            <span className="tag-k">INTERACTIVE SIMULATION LAB</span>
            <span className="tag-v">LIVE WEBDYNAMICS ENGINE [MODAL FEA / FRF FFT / TOPOLOGY]</span>
          </div>
          <SimulationVisualizer />
        </div>

        {/* Engineering Highlights / Performance Metrics */}
        <div className="hero-metrics-grid">
          <div className="metric-card">
            <div className="metric-val text-cyan">90%+</div>
            <div className="metric-title">SURROGATE ACCURACY</div>
            <div className="metric-desc">Trained TensorFlow/Keras neural surrogates vs NASTRAN benchmarks</div>
          </div>
          <div className="metric-card">
            <div className="metric-val text-emerald">1,000x</div>
            <div className="metric-title">INFERENCE ACCELERATION</div>
            <div className="metric-desc">Evaluating high-dimensional structural FRFs in 0.6ms vs hours of FEA</div>
          </div>
          <div className="metric-card">
            <div className="metric-val text-amber">50%</div>
            <div className="metric-title">SETUP AUTOMATION</div>
            <div className="metric-desc">Pre/post-processing pipelines in Simcenter 3D (NX Open) & ANSYS Mechanical</div>
          </div>
          <div className="metric-card">
            <div className="metric-val text-purple">1st Place</div>
            <div className="metric-title">HACK A-BOT WINNER</div>
            <div className="metric-desc">Siemens Healthineers touchless AI interaction for surgical robotics</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
