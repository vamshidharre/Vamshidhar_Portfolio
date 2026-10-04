import React, { useState } from "react";
import "./styles/Projects.css";
import { FaExternalLinkAlt, FaFilePdf, FaSearchPlus, FaTimes } from "react-icons/fa";

type ProjectCategory = "all" | "cae" | "nvh" | "ai" | "optimization";

interface ProjectItem {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  badge?: string;
  image: string;
  summary: string;
  description: string;
  highlights: string[];
  tools: string[];
  docLink?: string;
  externalLink?: string;
  gallery?: string[];
}

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const projects: ProjectItem[] = [
    {
      id: "topology-optimization",
      title: "Structural Topology Optimization with openCFS & Python",
      category: "optimization",
      categoryLabel: "LIGHTWEIGHT & COMPUTATIONAL MECHANICS",
      badge: "FEATURED PROJECT",
      image: "/images/topology_cantilever.png",
      summary:
        "Formulating 3D topology optimization for rear bulkheads and cantilever structures under multi-load boundary conditions using SIMP/RAMP material interpolation and mathematical programming solvers.",
      description:
        "Executed at FAU Erlangen-Nürnberg using openCFS. Developed custom Python discretization scripts (mesh.py) generating 3D finite element meshes with designated solid, void, and design spaces. Implemented Solid Isotropic Material with Penalization (SIMP, penalization p=3.0) and Rational Approximation of Material Properties (RAMP) models. Evaluated Method of Moving Asymptotes (MMA) and SNOPT optimizers with Intel MKL Pardiso linear solvers to minimize strain compliance subject to strict volume fraction constraints.",
      highlights: [
        "Compliance minimization under volume constraints (V/V₀ ≤ 0.30)",
        "Comparative convergence analysis of MMA vs SNOPT optimizers",
        "Multi-point force loadcases and fixed constraint boundary configurations",
        "Intel Pardiso solver scalability and memory footprint optimization",
      ],
      tools: ["openCFS", "Python (mesh.py)", "SIMP / RAMP", "SNOPT", "MMA", "Intel Pardiso", "ParaView"],
      gallery: [
        "/images/topology_cantilever.png",
        "/images/topology_convergence.png",
        "/images/topology_pressure_box.png",
        "/images/topology_mesh.png",
      ],
    },
    {
      id: "neural-surrogate-engine",
      title: "Deep Neural Surrogate Modeling for V8 Engine Dynamics",
      category: "ai",
      categoryLabel: "AI FOR CAE & STRUCTURAL DYNAMICS",
      badge: "MERCEDES-BENZ AG",
      image: "/images/preview.png",
      summary:
        "Trained deep neural networks in TensorFlow/Keras to predict structural Frequency Response Functions (FRFs) across 500+ frequency bins, replacing expensive NASTRAN simulations with 0.6 ms inference.",
      description:
        "Developed at Mercedes-Benz AG (Untertürkheim). High-dimensional Design of Experiments (DOE) sweeps across engine structural variants were computationally prohibitive. Designed a neural surrogate architecture mapping geometric rib thicknesses and material stiffnesses directly to frequency-dependent accelerance transfer functions. Automated NASTRAN job submissions and PCH/FIF batch parsing via custom Python scripts, achieving over 90% benchmark agreement.",
      highlights: [
        "1,000x+ evaluation acceleration (hours of NASTRAN solver time → 0.6 ms)",
        "Benchmarked against Data-Interpolated Moving Gaussian Process (DIMGP) regressors",
        "Automated DOE parameter sweeps and PCH/FIF output data extraction in Python",
        "Over 90% agreement across critical structural frequency bands",
      ],
      tools: ["MSC NASTRAN", "Altair HyperMesh", "TensorFlow", "Keras", "Python", "DIMGP", "Linux HPC"],
    },
    {
      id: "valeo-thesis-pmsm",
      title: "PMSM Powertrain Vibroacoustics & 2D FFT Force Decomposition",
      category: "nvh",
      categoryLabel: "NVH & ELECTRIC POWERTRAIN",
      badge: "MASTER THESIS",
      image: "/images/TopologyOptimization.png",
      summary:
        "Multi-physics investigation of PMSM acoustic whine. Built 3D motor structural FE model, decomposed air-gap forces via 2D FFT, and proved tangential mode r=0 governs housing Equivalent Radiated Power.",
      description:
        "Master’s thesis in collaboration between FAU Chair of Applied Mechanics and Valeo eAutomotive Germany GmbH. Constructed a full 3D structural model in ANSYS Mechanical (laminated stator core, copper windings, rotor assembly, housing, bearing stiffnesses) benchmarked against NASTRAN and experimental modal analysis (EMA). Implemented 2D FFT decomposing air-gap electromagnetic forces into spatial orders (r) and temporal harmonics (f), discovering tangential forces dominate housing acoustic radiation.",
      highlights: [
        "Full 3D electric motor FE model developed and validated in ANSYS Mechanical",
        "Spatial-temporal 2D FFT decomposition isolating critical excitation modes",
        "Discovered tangential mode r = 0 governs housing Equivalent Radiated Power (ERP)",
        "Correlated harmonic response with experimental flex-PCB sensors and accelerometers",
      ],
      tools: ["ANSYS Mechanical", "MSC NASTRAN Benchmark", "Python (SciPy)", "MATLAB", "Flex-PCB Sensors", "ERP"],
      docLink: "/docs/Master_Thesis_Summary_Vamshidhar_Reddy.pdf",
    },
    {
      id: "agentic-fea",
      title: "Agentic FEA: Autonomous 3D Bracket Modal Analysis",
      category: "cae",
      categoryLabel: "CAE AUTOMATION & AGENTIC AI",
      badge: "INNOVATION",
      image: "/images/Maxlife.png",
      summary:
        "Autonomous simulation pipeline executing structural modal analysis on aerospace brackets via PyMechanical, CAD solid meshing, bolted constraints, and Block Lanczos eigensolving.",
      description:
        "Engineered an automated end-to-end vibration simulation pipeline driven by AI agentic orchestration. Scripts CAD geometry ingestion, tetrahedral solid meshing, bolted boundary conditions, and Block Lanczos eigensolver execution via PyMechanical without manual GUI interaction, extracting eigenfrequencies and modal stress telemetry into standardized reports.",
      highlights: [
        "End-to-end vibration pipeline automation via PyMechanical & Python",
        "Scripted CAD setup, solid meshing, bolted constraints, and eigensolving",
        "Automatic extraction of modal shapes, frequencies, and stress contours",
        "Zero-touch execution from geometry input to final modal telemetry",
      ],
      tools: ["Ansys 2026 R1", "PyMechanical", "Python", "Block Lanczos", "Solid Meshing"],
    },
    {
      id: "simcenter-vibro",
      title: "Simcenter 3D Vibroacoustic Automation & SPL Mapping Suite",
      category: "nvh",
      categoryLabel: "VIBROACOUSTICS & AUTOMATION",
      badge: "VALEO SENSORS",
      image: "/images/simcenter.png",
      summary:
        "Full-stack automation toolkit in Siemens Simcenter 3D via NX Open API. Scripted microphone sphere arrays, boundary acoustic impedances, and SPL sound energy contour maps.",
      description:
        "Developed at Valeo Schalter und Sensoren GmbH. Built automated Python scripts interfacing with Siemens NX Open API, eliminating repetitive manual setup steps and cutting simulation setup time by 50%. Configured acoustic point sound sources, spatial microphone arrays, and absorbing boundaries for airborne vehicle sensor noise studies.",
      highlights: [
        "50% reduction in simulation model setup time via NX Open API automation",
        "Point sound sources, spatial microphone arrays, and airborne acoustics",
        "Engineered Python visualization for ray paths, SPL, and acoustic energy dissipation",
        "Standardized reporting pipeline deployed across the simulation team",
      ],
      tools: ["Siemens Simcenter 3D", "NX Open API", "Python", "Vibroacoustics", "Ray Tracing", "SPL Mapping"],
    },
    {
      id: "hack-a-bot",
      title: "Hack A-Bot: Sterile Surgical Robotics Touchless AI Interface",
      category: "ai",
      categoryLabel: "AI & ROBOTICS",
      badge: "1ST PLACE WINNER",
      image: "/images/radix.png",
      summary:
        "1st Place Winner at Hack A-Bot Hackathon 2026 (Siemens Healthineers). Engineered a contactless AI interaction system allowing surgeons to control robotic apparatus without tactile contamination.",
      description:
        "Engineered during the Siemens Healthineers Hack A-Bot Hackathon 2026. Designed and prototyped a contactless multimodal interaction system combining computer vision gesture tracking and natural language voice commands to control robotic surgical apparatus in sterile operating theaters, eliminating touch contamination risks and accelerating surgical tool positioning.",
      highlights: [
        "1st Place Winner out of international engineering teams",
        "Touchless gesture & voice interaction pipeline for sterile operating theaters",
        "Sub-100ms response latency for safe surgical apparatus manipulation",
        "Recognized by Siemens Healthineers medical robotics leadership",
      ],
      tools: ["Python", "Computer Vision", "PyTorch", "Voice AI", "Robotics Control"],
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="projects-section" id="projects">
      <div className="section-container">
        {/* Section Header Tag */}
        <div className="section-header-tag">
          <span className="section-num">04</span>
          <span className="section-tag-line">// ENGINEERING PROJECTS & SIMULATION STUDIES</span>
        </div>

        <div className="projects-header-block">
          <h2 className="projects-heading">
            Major Projects & <span className="text-gradient">Applied Engineering</span>
          </h2>
          <p className="projects-sub">
            Real-world finite element models, powertrain NVH investigations, structural topology optimization,
            and AI-driven surrogate models developed for automotive and computational mechanics applications.
          </p>

          {/* Filter Pills */}
          <div className="project-filter-bar">
            <button
              className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              ALL PROJECTS ({projects.length})
            </button>
            <button
              className={`filter-btn ${activeFilter === "cae" ? "active" : ""}`}
              onClick={() => setActiveFilter("cae")}
            >
              CAE & FEM
            </button>
            <button
              className={`filter-btn ${activeFilter === "nvh" ? "active" : ""}`}
              onClick={() => setActiveFilter("nvh")}
            >
              NVH & POWERTRAIN
            </button>
            <button
              className={`filter-btn ${activeFilter === "ai" ? "active" : ""}`}
              onClick={() => setActiveFilter("ai")}
            >
              AI FOR ENGINEERING
            </button>
            <button
              className={`filter-btn ${activeFilter === "optimization" ? "active" : ""}`}
              onClick={() => setActiveFilter("optimization")}
            >
              TOPOLOGY & LIGHTWEIGHT
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-cards-grid">
          {filteredProjects.map((proj) => (
            <div className="project-card" key={proj.id}>
              {/* Card Image Viewport */}
              <div className="project-image-wrap" onClick={() => setActiveModalProject(proj)}>
                <img src={proj.image} alt={proj.title} className="project-img" />
                <div className="project-overlay">
                  <span className="view-details-tag">
                    <FaSearchPlus /> VIEW ENGINEERING SPECS
                  </span>
                </div>
                {proj.badge && <span className="project-badge">{proj.badge}</span>}
              </div>

              {/* Card Body */}
              <div className="project-body">
                <span className="project-category-label">{proj.categoryLabel}</span>
                <h3 className="project-title" onClick={() => setActiveModalProject(proj)}>
                  {proj.title}
                </h3>
                <p className="project-summary">{proj.summary}</p>

                {/* Highlights */}
                <div className="project-quick-highlights">
                  {proj.highlights.slice(0, 2).map((h, i) => (
                    <div className="quick-h-item" key={i}>
                      <span className="h-dot">▪</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tools */}
                <div className="project-tools-row">
                  {proj.tools.slice(0, 4).map((t) => (
                    <span className="proj-tool-chip" key={t}>
                      {t}
                    </span>
                  ))}
                  {proj.tools.length > 4 && (
                    <span className="proj-tool-chip more">+{proj.tools.length - 4}</span>
                  )}
                </div>

                {/* Card Action */}
                <div className="project-card-footer">
                  <button
                    className="card-detail-btn"
                    onClick={() => setActiveModalProject(proj)}
                  >
                    <span>TECHNICAL SPEC SHEET</span>
                    <FaExternalLinkAlt size={11} />
                  </button>
                  {proj.docLink && (
                    <a
                      href={proj.docLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-doc-btn"
                      title="Download PDF"
                    >
                      <FaFilePdf />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engineering Spec Modal */}
      {activeModalProject && (
        <div className="project-modal-backdrop" onClick={() => setActiveModalProject(null)}>
          <div className="project-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setActiveModalProject(null)}
              aria-label="Close Modal"
            >
              <FaTimes />
            </button>

            <div className="modal-header">
              <span className="modal-category">{activeModalProject.categoryLabel}</span>
              <h2 className="modal-title">{activeModalProject.title}</h2>
            </div>

            <div className="modal-body-scroll">
              {/* Gallery if present */}
              {activeModalProject.gallery && activeModalProject.gallery.length > 0 && (
                <div className="modal-gallery-row">
                  {activeModalProject.gallery.map((imgSrc, idx) => (
                    <div className="gallery-thumb" key={idx}>
                      <img src={imgSrc} alt={`Visual ${idx + 1}`} />
                    </div>
                  ))}
                </div>
              )}

              <div className="modal-section">
                <h4>ENGINEERING BACKGROUND & METHODOLOGY</h4>
                <p>{activeModalProject.description}</p>
              </div>

              <div className="modal-section">
                <h4>KEY TECHNICAL RESULTS & ACHIEVEMENTS</h4>
                <ul className="modal-bullets">
                  {activeModalProject.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-section">
                <h4>SOLVERS, ALGORITHMS & LIBRARIES</h4>
                <div className="modal-tools-wrap">
                  {activeModalProject.tools.map((t) => (
                    <span className="modal-tool-badge" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {activeModalProject.docLink && (
                <div className="modal-action-bar">
                  <a
                    href={activeModalProject.docLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-download-btn"
                  >
                    <FaFilePdf />
                    <span>DOWNLOAD FULL DOCUMENTATION (PDF)</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
