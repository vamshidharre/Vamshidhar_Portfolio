import "./styles/EngineeringExpertise.css";
import { FaCube, FaBrain, FaCogs, FaCheck } from "react-icons/fa";
import { TbWaveSine } from "react-icons/tb";

export const EngineeringExpertise: React.FC = () => {
  const domains = [
    {
      id: "cae-fea",
      tag: "PILLAR 01",
      icon: <FaCube className="domain-icon" />,
      title: "CAE, Structural Dynamics & High-Fidelity FEA",
      subtitle: "Modal Extraction, Harmonic Response & Non-Linear Continuum Mechanics",
      equation: "[M]ü(t) + [C]u̇(t) + [K]u(t) = F(t)",
      description:
        "Building and validating complex 3D finite element structural assemblies from the ground up. Executing eigensolutions via Block Lanczos, steady-state harmonic frequency sweeps, and Equivalent Radiated Power (ERP) housing evaluations.",
      highlights: [
        "Modal Analysis & Harmonic Response under electro-dynamic & engine excitation",
        "Thermo-mechanical warpage analysis and non-linear material calibration",
        "Stress, deformation & fatigue evaluation across multi-axial load conditions",
        "Benchmark validation of ANSYS Mechanical FE models against MSC NASTRAN",
      ],
      tools: ["ANSYS Mechanical", "MSC NASTRAN", "Altair HyperMesh", "LS-DYNA", "SolidWorks"],
    },
    {
      id: "nvh-vibro",
      tag: "PILLAR 02",
      icon: <TbWaveSine className="domain-icon" />,
      title: "Powertrain NVH & Vibroacoustics",
      subtitle: "PMSM Acoustic Whine, 2D FFT Force Decomposition & Acoustic Propagation",
      equation: "F(θ, t) = Σ Σ F_r,ω · cos(rθ - ωt - φ_r,ω)",
      description:
        "Specialized in identifying and eliminating high-frequency tonal whine in electrified powertrains. Decomposing radial and tangential air-gap forces into spatial orders and temporal harmonics, correlating with physical test rig data.",
      highlights: [
        "Spatial-temporal 2D FFT decomposing air-gap electromagnetic forces (mode r, freq f)",
        "Discovered tangential force mode r = 0 governs stator housing acoustic whine (ERP)",
        "Airborne noise modeling, sound source definition & microphone arrays in Simcenter 3D",
        "Simulation-to-test correlation via triaxial accelerometers & flex-PCB coil sensors",
      ],
      tools: ["Simcenter 3D", "ANSYS Mechanical", "MATLAB Signal Processing", "Python (SciPy)", "NX Open API"],
    },
    {
      id: "ai-surrogates",
      tag: "PILLAR 03",
      icon: <FaBrain className="domain-icon" />,
      title: "Scientific Machine Learning & AI Surrogates",
      subtitle: "Deep Neural Surrogates Replacing Prohibitive Multi-Hour FEA Solvers",
      equation: "ŷ(ω) = f_θ(x_geo, x_mat) ≈ H_FEA(ω)",
      description:
        "Pioneering surrogate modeling pipelines that map high-dimensional structural design parameters directly to frequency-dependent transfer functions. Accelerating dynamic sweeps from hours to milliseconds for real-time optimization.",
      highlights: [
        "TensorFlow & Keras neural surrogates predicting structural FRFs across 500+ freq bins",
        "Benchmarked against Data-Interpolated Moving Gaussian Process (DIMGP) & GPR",
        "Automated Latin Hypercube Sampling (LHS) and DOE batch simulation generation",
        "Over 90% benchmark agreement with NASTRAN at 1,000x faster inference speed",
      ],
      tools: ["TensorFlow", "Keras", "Python (NumPy/Pandas)", "DIMGP", "Gaussian Processes", "Scikit-Learn"],
    },
    {
      id: "automation-topology",
      tag: "PILLAR 04",
      icon: <FaCogs className="domain-icon" />,
      title: "CAE Automation & Structural Topology Optimization",
      subtitle: "Automated FE Pipelines, Scripted APIs & Lightweight Synthesis",
      equation: "min c(ρ) = U^T K U  s.t.  V(ρ)/V_0 ≤ V_frac",
      description:
        "Eliminating manual simulation bottlenecks through robust Python and NX Open API automation scripts. Formulating structural topology optimization under compliance minimization using openCFS and mathematical programming optimizers.",
      highlights: [
        "PyMechanical & IronPython automation scripts eliminating 50% of setup overhead",
        "Simcenter 3D NX Open Python tools for ray paths, SPL mapping & energy plots",
        "3D Topology optimization via openCFS: SIMP & RAMP material interpolation",
        "Solvers & optimizers: Method of Moving Asymptotes (MMA), SNOPT & Intel Pardiso",
      ],
      tools: ["PyMechanical", "NX Open API", "openCFS", "IronPython", "Intel Pardiso", "Linux HPC"],
    },
  ];

  return (
    <section className="expertise-section" id="expertise">
      <div className="section-container">
        {/* Section Tag */}
        <div className="section-header-tag">
          <span className="section-num">02</span>
          <span className="section-tag-line">// CORE ENGINEERING PILLARS</span>
        </div>

        <div className="expertise-header-block">
          <h2 className="expertise-heading">
            Engineering Expertise & <span className="text-gradient">Specialized Domains</span>
          </h2>
          <p className="expertise-sub">
            Rigorous mathematical foundations combined with commercial finite element solvers,
            signal processing, test correlation, and data-driven scientific surrogate architectures.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="expertise-cards-grid">
          {domains.map((d) => (
            <div className="expertise-card" key={d.id}>
              <div className="card-top-bar">
                <span className="card-tag">{d.tag}</span>
                <div className="card-icon-wrap">{d.icon}</div>
              </div>

              <h3 className="card-title">{d.title}</h3>
              <p className="card-subtitle">{d.subtitle}</p>

              {/* Mathematical Equation Pill */}
              <div className="card-equation">
                <code>{d.equation}</code>
              </div>

              <p className="card-desc">{d.description}</p>

              <div className="card-highlights">
                <span className="highlights-title">KEY CAPABILITIES & FINDINGS:</span>
                <ul>
                  {d.highlights.map((h, i) => (
                    <li key={i}>
                      <FaCheck className="check-icon" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tools Tags */}
              <div className="card-tools">
                {d.tools.map((t) => (
                  <span className="tool-chip" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngineeringExpertise;
