import { FaGraduationCap, FaBriefcase, FaFilePdf, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";

export const About: React.FC = () => {
  return (
    <section className="about-section" id="about">
      <div className="section-container">
        {/* Section Header Tag */}
        <div className="section-header-tag">
          <span className="section-num">01</span>
          <span className="section-tag-line">// PROFILE & ENGINEERING BACKGROUND</span>
        </div>

        <div className="about-grid">
          {/* Left Column: Technical Profile Card with Photo */}
          <div className="profile-card-col">
            <div className="profile-hud-card">
              <div className="hud-corner top-left"></div>
              <div className="hud-corner top-right"></div>
              <div className="hud-corner bottom-left"></div>
              <div className="hud-corner bottom-right"></div>

              {/* Photo Viewport */}
              <div className="profile-photo-wrapper">
                <img
                  src="/images/vamshi_profile.png"
                  alt="Enugala Vamshidhar Reddy - CAE & NVH Engineer"
                  className="profile-photo"
                />
                <div className="photo-scan-line"></div>
                <div className="photo-badge">
                  <span className="badge-pulse"></span>
                  <span>ACTIVE: MERCEDES-BENZ AG</span>
                </div>
              </div>

              {/* Profile Telemetry Data */}
              <div className="profile-hud-details">
                <h3 className="profile-name">Enugala Vamshidhar Reddy</h3>
                <p className="profile-title">M.Sc. Computational Engineering | Mechanical Engineer</p>

                <div className="telemetry-table">
                  <div className="table-row">
                    <span className="row-k"><FaMapMarkerAlt /> LOCATION:</span>
                    <span className="row-v">Stuttgart / Erlangen, Germany</span>
                  </div>
                  <div className="table-row">
                    <span className="row-k"><FaCheckCircle className="text-emerald" /> WORK STATUS:</span>
                    <span className="row-v text-emerald">Unrestricted Work Auth (EU Blue Card)</span>
                  </div>
                  <div className="table-row">
                    <span className="row-k"><FaGraduationCap /> EDUCATION:</span>
                    <span className="row-v">FAU Erlangen-Nürnberg (M.Sc.)</span>
                  </div>
                  <div className="table-row">
                    <span className="row-k"><FaBriefcase /> INDUSTRY:</span>
                    <span className="row-v">Mercedes-Benz AG, Valeo</span>
                  </div>
                </div>

                <div className="profile-actions">
                  <a
                    href="/docs/Vamshidhar_Reddy_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-action-btn primary"
                  >
                    <FaFilePdf />
                    <span>DOWNLOAD RESUME (PDF)</span>
                  </a>
                  <a
                    href="/docs/Master_Thesis_Summary_Vamshidhar_Reddy.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-action-btn secondary"
                  >
                    <FaFilePdf />
                    <span>THESIS SUMMARY (PDF)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: In-Depth Engineering Narrative & Capabilities */}
          <div className="narrative-col">
            <h2 className="about-main-heading">
              Engineering High-Fidelity Simulations with{" "}
              <span className="text-gradient">Data-Driven AI Surrogates</span>
            </h2>

            <div className="narrative-content">
              <p>
                I am a Mechanical Engineer specializing in <strong>Computational Mechanics, Structural Dynamics,
                and Powertrain NVH</strong>. Having completed my Bachelor’s degree in Mechanical Engineering
                (German GPA: 1.7) and currently finishing my <strong>Master of Science in Computational Engineering at
                Friedrich-Alexander-Universität Erlangen-Nürnberg (FAU, GPA: 2.0)</strong>, my work bridges classical
                continuum mechanics and modern scientific machine learning.
              </p>
              <p>
                Throughout my roles at <strong>Mercedes-Benz AG</strong> (Untertürkheim) and <strong>Valeo</strong> (Bietigheim-Bissingen & Erlangen),
                I have focused on solving computationally prohibitive engineering problems. I specialize in building
                high-fidelity 3D finite element models (ANSYS Mechanical, MSC NASTRAN, Simcenter 3D), performing complex
                modal and harmonic response analyses, spatial-temporal 2D FFT decomposition of electromagnetic forces,
                and correlating simulation results against real-world test rig data (accelerometers, flex-PCB air-gap sensors,
                and thermal warpage optical measurements).
              </p>
              <p>
                To eliminate solver bottlenecks in high-dimensional Design of Experiments (DOE) sweeps, I architect
                <strong>deep neural surrogate models (TensorFlow/Keras)</strong> benchmarked against DIMGP (Data-Interpolated
                Moving Gaussian Process) and Gaussian Processes—delivering <strong>over 90% benchmark agreement at sub-millisecond inference speeds</strong>.
              </p>
            </div>

            {/* Core Capability Pillars Grid */}
            <div className="about-pillars-grid">
              <div className="pillar-item">
                <div className="pillar-num">01</div>
                <div className="pillar-body">
                  <h4>Structural Dynamics & High-Fidelity FEA</h4>
                  <p>Modal extraction, harmonic response, non-linear contacts, thermo-elastic warpage, and Equivalent Radiated Power (ERP).</p>
                </div>
              </div>
              <div className="pillar-item">
                <div className="pillar-num">02</div>
                <div className="pillar-body">
                  <h4>Electric Powertrain NVH & Vibroacoustics</h4>
                  <p>PMSM acoustic whine, 2D FFT decomposition of radial/tangential forces, ray-tracing, and airborne noise propagation.</p>
                </div>
              </div>
              <div className="pillar-item">
                <div className="pillar-num">03</div>
                <div className="pillar-body">
                  <h4>Scientific Machine Learning & Surrogates</h4>
                  <p>TensorFlow/Keras surrogate models replacing expensive NASTRAN runs; PINNs, DIMGP, and parametric sensitivity sweeps.</p>
                </div>
              </div>
              <div className="pillar-item">
                <div className="pillar-num">04</div>
                <div className="pillar-body">
                  <h4>Full-Stack CAE Automation</h4>
                  <p>Scripting end-to-end simulation pipelines via Python, PyMechanical, NX Open API, IronPython, and openCFS topology optimization.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
