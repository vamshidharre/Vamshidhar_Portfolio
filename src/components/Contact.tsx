import React from "react";
import "./styles/Contact.css";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLinkedin, FaGithub, FaFilePdf, FaArrowUp, FaPaperPlane } from "react-icons/fa";

export const Contact: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="contact-section" id="contact">
      <div className="section-container">
        {/* Section Header Tag */}
        <div className="section-header-tag">
          <span className="section-num">08</span>
          <span className="section-tag-line">// INITIATE CONTACT & ENGINEERING COLLABORATION</span>
        </div>

        <div className="contact-header-block">
          <h2 className="contact-heading">
            Let’s Build the Next Generation of <span className="text-gradient">Engineering Simulations</span>
          </h2>
          <p className="contact-sub">
            Available for full-time engineering roles, structural dynamics & NVH consulting,
            surrogate modeling implementations, and computational mechanics research.
          </p>
        </div>

        {/* Contact Deck Grid */}
        <div className="contact-deck-grid">
          {/* Card 1: Direct Message Card */}
          <div className="contact-card message-card">
            <h3 className="card-heading">DIRECT ENGINEERING INQUIRY</h3>
            <p className="card-desc">
              Send a direct message regarding open CAE/NVH roles, research inquiries, or technical discussion:
            </p>

            <a
              href="mailto:vamshidharreddye@gmail.com?subject=Engineering%20Inquiry%20-%20Enugala%20Vamshidhar%20Reddy"
              className="send-email-btn"
            >
              <FaPaperPlane />
              <span>SEND EMAIL (vamshidharreddye@gmail.com)</span>
            </a>

            <div className="contact-badges-list">
              <div className="c-badge">
                <FaEnvelope className="b-icon text-cyan" />
                <div>
                  <span className="b-label">PRIMARY EMAIL</span>
                  <a href="mailto:vamshidharreddye@gmail.com" className="b-val">vamshidharreddye@gmail.com</a>
                </div>
              </div>

              <div className="c-badge">
                <FaPhoneAlt className="b-icon text-emerald" />
                <div>
                  <span className="b-label">DIRECT PHONE</span>
                  <a href="tel:+4917687733752" className="b-val">+49 176 87733752</a>
                </div>
              </div>

              <div className="c-badge">
                <FaMapMarkerAlt className="b-icon text-amber" />
                <div>
                  <span className="b-label">LOCATION</span>
                  <span className="b-val">Stuttgart / Erlangen, Germany</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Professional Profiles & Artifacts */}
          <div className="contact-card links-card">
            <h3 className="card-heading">PROFILES & CURRICULUM VITAE</h3>
            <p className="card-desc">
              Connect via professional networks or review full academic and industrial documentation:
            </p>

            <div className="external-profiles-row">
              <a
                href="https://www.linkedin.com/in/vamshidhar-reddy-eng/"
                target="_blank"
                rel="noopener noreferrer"
                className="profile-link-btn"
              >
                <FaLinkedin className="p-icon" />
                <div>
                  <span className="p-name">LINKEDIN</span>
                  <span className="p-sub">linkedin.com/in/vamshidhar-reddy-eng</span>
                </div>
              </a>

              <a
                href="https://github.com/vamshidharre"
                target="_blank"
                rel="noopener noreferrer"
                className="profile-link-btn"
              >
                <FaGithub className="p-icon" />
                <div>
                  <span className="p-name">GITHUB</span>
                  <span className="p-sub">github.com/vamshidharre</span>
                </div>
              </a>
            </div>

            <div className="documents-download-box">
              <span className="doc-box-title">VERIFIED RESUME & RESEARCH THESIS:</span>
              <div className="doc-btns-grid">
                <a
                  href="/docs/Vamshidhar_Reddy_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="doc-btn"
                >
                  <FaFilePdf className="text-cyan" />
                  <span>DOWNLOAD RESUME (.PDF)</span>
                </a>
                <a
                  href="/docs/Master_Thesis_Summary_Vamshidhar_Reddy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="doc-btn"
                >
                  <FaFilePdf className="text-amber" />
                  <span>MASTER THESIS SUMMARY (.PDF)</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Footer Bar */}
        <div className="contact-footer-bar">
          <div className="footer-left">
            <span className="footer-monogram">VRE</span>
            <div className="footer-copy">
              <span>© {new Date().getFullYear()} ENUGALA VAMSHIDHAR REDDY</span>
              <span className="footer-meta">M.Sc. Computational Engineering | FAU Erlangen-Nürnberg</span>
            </div>
          </div>

          <div className="footer-center">
            <span className="telemetry-pill">
              <span className="dot-green"></span> SYSTEM STATUS: ONLINE | GERMANY
            </span>
          </div>

          <button className="scroll-top-btn" onClick={scrollToTop} aria-label="Scroll to Top">
            <span>RETURN TO TOP</span>
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
