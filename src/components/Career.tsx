import "./styles/Career.css";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

export const Career: React.FC = () => {
  const experiences = [
    {
      id: "mercedes-benz",
      company: "Mercedes-Benz AG",
      location: "Untertürkheim, Stuttgart, Germany",
      role: "Internship — Structural Dynamics & NVH / ML Surrogates",
      period: "04/2026 - Present",
      isCurrent: true,
      bullets: [
        "Preprocessed full V8 engine structural assemblies in HyperMesh to configure high-dimensional DOE-based NASTRAN simulation decks across varying parametric design bounds.",
        "Automated NASTRAN job submissions, queue monitoring, and PCH / FIF output parsing via custom Python batch pipelines, accelerating data extraction from structural decks.",
        "Built and trained deep TensorFlow/Keras neural surrogate models predicting structural Frequency Response Functions (FRFs) across hundreds of frequency points, benchmarked against Data-Interpolated Moving Gaussian Process (DIMGP) regressors.",
      ],
      tags: ["MSC NASTRAN", "Altair HyperMesh", "TensorFlow", "Keras", "Python", "DIMGP", "Structural Dynamics", "FRF Surrogates"],
    },
    {
      id: "valeo-sensors",
      company: "Valeo Schalter und Sensoren GmbH",
      location: "Bietigheim-Bissingen, Germany",
      role: "Internship — Vibroacoustic Simulation & Automation",
      period: "09/2025 - 03/2026",
      isCurrent: false,
      bullets: [
        "Automated vibroacoustic simulation workflows in Siemens Simcenter 3D using Python and NX Open API, eliminating repetitive manual configuration steps and cutting model setup time by 50%.",
        "Configured airborne noise simulations including acoustic point sound sources, spatial microphone arrays, and absorbing boundaries for ultrasonic and radar sensor housing designs.",
        "Engineered custom Python toolkits for acoustic ray-path tracking, Sound Pressure Levels (SPL), and acoustic energy dissipation heatmaps, adopted by the wider simulation team for standard reporting.",
      ],
      tags: ["Siemens Simcenter 3D", "NX Open API", "Python", "Vibroacoustics", "Ray Tracing", "SPL Mapping", "Acoustic Arrays"],
    },
    {
      id: "valeo-thesis",
      company: "Valeo eAutomotive Germany GmbH",
      location: "Erlangen, Germany",
      role: "Master Thesis — Electric Powertrain NVH & Multi-Physics Simulation",
      period: "03/2025 - 08/2025",
      isCurrent: false,
      bullets: [
        "Built and validated a high-fidelity 3D structural finite element model of a permanent magnet synchronous motor (PMSM) in ANSYS Mechanical, including laminated stator core, copper windings, rotor assembly, housing, and bearing stiffnesses.",
        "Extracted electromagnetic air-gap excitation forces from EM FEA and experimental flex-PCB coil sensors; developed 2D FFT algorithms to decompose forces into spatial orders (r) and temporal harmonics (f).",
        "Correlated harmonic response simulations against physical test rig accelerometer data; discovered and proved that tangential force mode r = 0 governs housing Equivalent Radiated Power (ERP), challenging conventional radial-only NVH assumptions.",
      ],
      tags: ["ANSYS Mechanical", "NASTRAN Benchmark", "2D FFT Decomposition", "Accelerometer Correlation", "Flex-PCB Sensors", "ERP"],
    },
    {
      id: "valeo-student",
      company: "Valeo eAutomotive Germany GmbH",
      location: "Erlangen, Germany",
      role: "Working Student — Simulation Department",
      period: "08/2024 - 02/2025",
      isCurrent: false,
      bullets: [
        "Built automated pre- and post-processing tools in ANSYS Mechanical using Python and IronPython, standardizing thermal-mechanical analysis workflows across the team.",
        "Executed coupled thermo-mechanical FEA simulations of power electronic modules, evaluating thermal stress gradients and cyclic warpage deformations.",
        "Refined and calibrated non-linear temperature-dependent constitutive material parameters based on empirical optical warpage measurements, eliminating simulation-to-test discrepancies.",
      ],
      tags: ["ANSYS Mechanical", "Python", "IronPython", "Thermo-Mechanical FEA", "Warpage Correlation", "Material Calibration"],
    },
  ];

  return (
    <section className="career-section" id="experience">
      <div className="section-container">
        {/* Section Tag */}
        <div className="section-header-tag">
          <span className="section-num">03</span>
          <span className="section-tag-line">// INDUSTRIAL EXPERIENCE & TRACK RECORD</span>
        </div>

        <div className="career-header-block">
          <h2 className="career-heading">
            Professional Experience in <span className="text-gradient">Automotive CAE & NVH</span>
          </h2>
          <p className="career-sub">
            Engineering high-fidelity structural dynamics, vibroacoustics, and automated AI surrogate pipelines
            at tier-1 suppliers and German automotive OEMs.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="experience-timeline">
          {experiences.map((exp) => (
            <div className={`experience-card ${exp.isCurrent ? "current-role" : ""}`} key={exp.id}>
              {/* Left Meta Column */}
              <div className="exp-meta-col">
                <div className="exp-company-header">
                  {exp.isCurrent && <span className="current-pulse-badge">ACTIVE ROLE</span>}
                  <h3 className="company-name">{exp.company}</h3>
                </div>

                <div className="meta-info-list">
                  <div className="meta-item">
                    <FaMapMarkerAlt className="meta-icon" />
                    <span>{exp.location}</span>
                  </div>
                  <div className="meta-item">
                    <FaCalendarAlt className="meta-icon" />
                    <span className="exp-period">{exp.period}</span>
                  </div>
                </div>
              </div>

              {/* Right Details Column */}
              <div className="exp-details-col">
                <h4 className="role-title">{exp.role}</h4>
                <ul className="exp-bullet-list">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>
                      <span className="bullet-indicator">›</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="exp-tags-row">
                  {exp.tags.map((tag) => (
                    <span className="exp-tag-chip" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Career;
