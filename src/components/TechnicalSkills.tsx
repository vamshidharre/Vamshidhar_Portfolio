import React, { useState } from "react";
import "./styles/TechnicalSkills.css";
import { FaCogs, FaBrain, FaWaveSquare, FaTerminal } from "react-icons/fa";

export const TechnicalSkills: React.FC = () => {
  const [testFreq, setTestFreq] = useState<number>(1248);
  const [damping, setDamping] = useState<number>(0.02);

  // Dynamic response calculation
  const resonantModes = [128.4, 492.1, 1248.6, 2415.0];
  let responseMagnitude = 0.05;
  resonantModes.forEach((fn) => {
    const r = testFreq / fn;
    const denom = Math.sqrt(Math.pow(1 - r * r, 2) + Math.pow(2 * damping * r, 2));
    responseMagnitude += 0.8 / Math.max(denom, 0.01);
  });
  const dbValue = (20 * Math.log10(responseMagnitude)).toFixed(1);

  const skillCategories = [
    {
      title: "FEA & CAE SOLVERS",
      icon: <FaCogs className="cat-icon" />,
      skills: [
        { name: "ANSYS Mechanical", level: "Expert", desc: "Modal, Harmonic, Static, Non-linear Contacts, Thermo-elastic Warpage" },
        { name: "MSC NASTRAN", level: "Advanced", desc: "SOL 103 (Modal), SOL 108/111 (Frequency Response), PCH/FIF Data Extraction" },
        { name: "Siemens Simcenter 3D", level: "Advanced", desc: "Acoustics, Airborne Noise, Sound Sources, Microphone Arrays" },
        { name: "Altair HyperMesh", level: "Advanced", desc: "Preprocessing full engine assemblies, 2D/3D Meshing, Quality Criteria" },
        { name: "openCFS (CFS++)", level: "Advanced", desc: "Finite Element Solver for PDE-based Structural Topology Optimization" },
        { name: "SolidWorks & Siemens NX", level: "Proficient", desc: "3D Parametric CAD, Surface Modeling, Geometry Clean-up for Meshing" },
        { name: "LS-DYNA", level: "Familiar", desc: "Explicit Dynamic Solvers, High-Energy Impact & Crashworthiness" },
      ],
    },
    {
      title: "AI, ML & SCIENTIFIC COMPUTING",
      icon: <FaBrain className="cat-icon" />,
      skills: [
        { name: "Python (NumPy, SciPy, Pandas)", level: "Expert", desc: "Scientific Computing, Signal Processing, Automated Data Pipelines" },
        { name: "TensorFlow & Keras", level: "Advanced", desc: "Deep Neural Surrogates for Structural FRF Predictions, MLPs, CNNs" },
        { name: "MATLAB", level: "Advanced", desc: "Signal Processing Toolbox, 2D FFT, Modal Analysis, Numerical Linear Algebra" },
        { name: "PyTorch", level: "Proficient", desc: "Physics-Informed Neural Networks (PINNs), Field Regression" },
        { name: "DIMGP & Gaussian Processes", level: "Advanced", desc: "Data-Interpolated Moving Gaussian Process Regression, Uncertainty Estimation" },
        { name: "Scikit-Learn & LHS", level: "Advanced", desc: "Latin Hypercube Sampling, DOE Parametric Sweeps, Statistical Regression" },
        { name: "Linux HPC & Slurm", level: "Advanced", desc: "High-Performance Computing Cluster Workflows, Batch Scheduling" },
      ],
    },
    {
      title: "AUTOMATION & SIMULATION APIS",
      icon: <FaTerminal className="cat-icon" />,
      skills: [
        { name: "PyMechanical", level: "Expert", desc: "Ansys Mechanical Automation via Python API, Agentic Simulation Workflows" },
        { name: "Siemens NX Open API", level: "Advanced", desc: "Automated Simcenter 3D Pre/Post-processing in Python & C++" },
        { name: "IronPython", level: "Advanced", desc: "Ansys Workbench & Mechanical ACT Scripting for Standardized Workflows" },
        { name: "Bash & Linux Shell Scripting", level: "Advanced", desc: "Headless Cluster Simulation Orchestration & Log Extraction" },
        { name: "Git & Version Control", level: "Advanced", desc: "Collaborative Software & Simulation Deck Version Control" },
        { name: "LaTeX & KaTeX", level: "Expert", desc: "Mathematical & Scientific Engineering Documentation" },
      ],
    },
    {
      title: "ENGINEERING DOMAINS & METHODS",
      icon: <FaWaveSquare className="cat-icon" />,
      skills: [
        { name: "Structural Dynamics & Modal Analysis", level: "Core", desc: "Eigenfrequency extraction, mode shapes, dynamic amplification" },
        { name: "Powertrain NVH & Vibroacoustics", level: "Core", desc: "PMSM acoustic whine, ERP, SPL radiation, acoustic ray tracing" },
        { name: "2D FFT Harmonic Force Decomposition", level: "Core", desc: "Spatial wavenumber (r) and temporal harmonic (f) separation" },
        { name: "Structural Topology Optimization", level: "Core", desc: "SIMP, RAMP, MMA, SNOPT, compliance minimization under volume constraints" },
        { name: "Thermo-Mechanical & Non-Linear FEA", level: "Core", desc: "Thermal warpage correlation, non-linear material calibration" },
        { name: "Simulation-Test Correlation", level: "Core", desc: "Accelerometer data, EMA correlation (MAC), flex-PCB sensor validation" },
      ],
    },
  ];

  return (
    <section className="skills-section" id="skills">
      <div className="section-container">
        {/* Section Header Tag */}
        <div className="section-header-tag">
          <span className="section-num">06</span>
          <span className="section-tag-line">// TOOLCHAIN & TECHNICAL COMPETENCIES</span>
        </div>

        <div className="skills-header-block">
          <h2 className="skills-heading">
            Technical Skills & <span className="text-gradient">Simulation Ecosystem</span>
          </h2>
          <p className="skills-sub">
            Comprehensive proficiency in commercial finite element solvers, scientific programming languages,
            machine learning frameworks, and automated engineering pipelines.
          </p>
        </div>

        {/* 4 Category Matrix */}
        <div className="skills-categories-grid">
          {skillCategories.map((cat, idx) => (
            <div className="skill-cat-card" key={idx}>
              <div className="cat-header">
                <div className="cat-icon-box">{cat.icon}</div>
                <h3 className="cat-title">{cat.title}</h3>
              </div>

              <div className="cat-skills-list">
                {cat.skills.map((s, i) => (
                  <div className="skill-item-row" key={i}>
                    <div className="skill-row-top">
                      <span className="skill-name">{s.name}</span>
                      <span className={`skill-level-badge ${s.level.toLowerCase()}`}>{s.level}</span>
                    </div>
                    <p className="skill-item-desc">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Dynamic Vibration Frequency Response Sandbox */}
        <div className="skills-interactive-sandbox">
          <div className="sandbox-header">
            <span className="sandbox-tag">LIVE ENGINEERING FREQUENCY TEST RIG</span>
            <h4>Interactive Structural Frequency Response Function (FRF) Evaluator</h4>
          </div>

          <div className="sandbox-controls-grid">
            <div className="control-slider-group">
              <div className="slider-label-row">
                <span>EXCITATION FREQUENCY:</span>
                <span className="slider-val text-cyan">{testFreq} Hz</span>
              </div>
              <input
                type="range"
                min="20"
                max="3000"
                value={testFreq}
                onChange={(e) => setTestFreq(parseInt(e.target.value))}
                className="sandbox-slider"
              />
              <div className="mode-markers-row">
                <span>128 Hz (Mode 1)</span>
                <span>492 Hz (Mode 2)</span>
                <span className="text-amber">1248 Hz (PMSM Whine)</span>
                <span>2415 Hz (Mode 4)</span>
              </div>
            </div>

            <div className="control-slider-group">
              <div className="slider-label-row">
                <span>STRUCTURAL DAMPING (ζ):</span>
                <span className="slider-val text-emerald">{(damping * 100).toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0.005"
                max="0.08"
                step="0.005"
                value={damping}
                onChange={(e) => setDamping(parseFloat(e.target.value))}
                className="sandbox-slider"
              />
              <div className="mode-markers-row">
                <span>0.5% (Light)</span>
                <span>2.0% (Automotive Structural)</span>
                <span>8.0% (Heavily Damped)</span>
              </div>
            </div>

            <div className="sandbox-result-card">
              <span className="res-title">DYNAMIC ACCELERANCE MAGNITUDE:</span>
              <div className="res-val-group">
                <span className="res-number text-cyan">{dbValue}</span>
                <span className="res-unit">dB (m/s² / N)</span>
              </div>
              <p className="res-state">
                {parseFloat(dbValue) > 25
                  ? "⚠ CRITICAL STRUCTURAL RESONANCE REACHED"
                  : parseFloat(dbValue) > 10
                  ? "● ELEVATED HARMONIC RESPONSE"
                  : "✓ NOMINAL OFF-RESONANCE STABILITY"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;
