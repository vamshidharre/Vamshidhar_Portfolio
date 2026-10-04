import "./styles/Education.css";
import { FaAward, FaIdCard, FaLanguage, FaCar, FaCheck } from "react-icons/fa";

export const Education: React.FC = () => {
  return (
    <section className="education-section" id="education">
      <div className="section-container">
        {/* Section Header Tag */}
        <div className="section-header-tag">
          <span className="section-num">07</span>
          <span className="section-tag-line">// ACADEMIC QUALIFICATIONS & HONORS</span>
        </div>

        <div className="education-header-block">
          <h2 className="education-heading">
            Education, Awards & <span className="text-gradient">Credentials</span>
          </h2>
          <p className="education-sub">
            Advanced computational mechanics education in Germany, mechanical engineering core,
            hackathon achievements, and international work authorization.
          </p>
        </div>

        {/* 2 Degrees Grid */}
        <div className="degrees-grid">
          {/* Degree 1: FAU Erlangen-Nürnberg */}
          <div className="degree-card featured-degree">
            <div className="degree-top-bar">
              <span className="degree-level">MASTER OF SCIENCE (M.SC.)</span>
              <span className="degree-gpa">GERMAN GPA: 2.0</span>
            </div>
            <h3 className="degree-title">Computational Engineering</h3>
            <h4 className="degree-uni">Friedrich-Alexander-Universität Erlangen-Nürnberg (FAU), Germany</h4>
            <span className="degree-period">2022 - 2026</span>

            <p className="degree-focus">
              Specialization: <strong>Structural Mechanics, Dynamics, Simulation Science & Scientific Machine Learning</strong>.
            </p>

            <div className="coursework-block">
              <span className="course-label">KEY MASTER’S CURRICULUM:</span>
              <div className="course-tags">
                <span className="c-tag">Structural Topology Optimization (STSTOP)</span>
                <span className="c-tag">Nonlinear Continuum Mechanics (NLKM)</span>
                <span className="c-tag">Intermediate / Inelastic FEM (IFEM)</span>
                <span className="c-tag">3D Structural Mechanics Simulation (3DSSS)</span>
                <span className="c-tag">Applied Numerical Linear Algebra (ANLA)</span>
                <span className="c-tag">Machine Learning & Data Science (DSSS)</span>
                <span className="c-tag">Computer Vision for Engineering</span>
              </div>
            </div>
          </div>

          {/* Degree 2: KITS */}
          <div className="degree-card">
            <div className="degree-top-bar">
              <span className="degree-level">BACHELOR OF TECHNOLOGY (B.TECH.)</span>
              <span className="degree-gpa">GERMAN GPA: 1.7 (DISTINCTION)</span>
            </div>
            <h3 className="degree-title">Mechanical Engineering</h3>
            <h4 className="degree-uni">Kakatiya Institute of Technology and Science (KITS), India</h4>
            <span className="degree-period">2018 - 2022</span>

            <p className="degree-focus">
              First Class with Distinction. Strong foundation in classical mechanics, continuum dynamics, and machine design.
            </p>

            <div className="coursework-block">
              <span className="course-label">KEY FOUNDATIONAL CURRICULUM:</span>
              <div className="course-tags">
                <span className="c-tag">Dynamics of Machinery & Vibrations</span>
                <span className="c-tag">Strength of Materials</span>
                <span className="c-tag">Finite Element Methods in Engineering</span>
                <span className="c-tag">Machine Design & CAD/CAM</span>
                <span className="c-tag">Fluid Mechanics & Heat Transfer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Awards & Qualifications Row */}
        <div className="awards-qual-grid">
          {/* Hackathon Awards Card */}
          <div className="info-card">
            <div className="info-header">
              <FaAward className="info-icon text-amber" />
              <h3>AWARDS & HACKATHON VICTORIES</h3>
            </div>
            <div className="award-item">
              <div className="award-title-row">
                <span className="award-name">1st Place Winner — Hack A-Bot Hackathon 2026</span>
                <span className="award-org text-cyan">Siemens Healthineers</span>
              </div>
              <p className="award-desc">
                Engineered an interactive contactless AI gesture & voice system for surgical robotic apparatus
                in sterile operating theaters, eliminating touch contamination risks.
              </p>
            </div>
            <div className="award-item">
              <div className="award-title-row">
                <span className="award-name">Winner — START Stuttgart AI Hackathon</span>
                <span className="award-org text-cyan">Rivyn AI</span>
              </div>
              <p className="award-desc">
                Co-developed Ryvian / Rivyn, an enterprise AI log intelligence and automated observability platform.
              </p>
            </div>
          </div>

          {/* Work Authorization & Languages Card */}
          <div className="info-card">
            <div className="info-header">
              <FaIdCard className="info-icon text-emerald" />
              <h3>WORK AUTHORIZATION & LANGUAGES</h3>
            </div>
            <div className="auth-list">
              <div className="auth-row">
                <FaCheck className="auth-check text-emerald" />
                <div>
                  <strong>Unrestricted German Work Authorization</strong>
                  <p>EU Blue Card eligible (§ 20 / § 18g AufenthG) — Immediate full-time availability without visa delays.</p>
                </div>
              </div>
              <div className="auth-row">
                <FaLanguage className="auth-check text-cyan" />
                <div>
                  <strong>Language Proficiencies</strong>
                  <p>English (Fluent / C2) | German (Intermediate / B1, advancing) | Telugu (Native)</p>
                </div>
              </div>
              <div className="auth-row">
                <FaCar className="auth-check text-purple" />
                <div>
                  <strong>Mobility & Driving License</strong>
                  <p>Driving License Class B (Valid across Germany & European Union).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
