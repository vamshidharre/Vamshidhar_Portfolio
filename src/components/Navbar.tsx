import React, { useEffect, useState } from "react";
import "./styles/Navbar.css";
import { FaFilePdf, FaLinkedin, FaGithub } from "react-icons/fa6";
import { RiMenu4Line, RiCloseLine } from "react-icons/ri";
export let smoother: any = {
  paused: () => {},
  scrollTo: () => {},
  scrollTop: () => {},
};

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "ABOUT", href: "#about" },
    { label: "EXPERTISE", href: "#expertise" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "PROJECTS", href: "#projects" },
    { label: "RESEARCH", href: "#research" },
    { label: "SKILLS", href: "#skills" },
    { label: "EDUCATION", href: "#education" },
    { label: "CONTACT", href: "#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className={`engineering-navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          {/* Brand Monogram & Status */}
          <a href="#" className="nav-brand" onClick={(e) => handleNavClick(e, "#hero")}>
            <div className="brand-monogram">VRE</div>
            <div className="brand-meta">
              <span className="brand-name">VAMSHIDHAR REDDY</span>
              <span className="brand-role">CAE & NVH ENGINEER</span>
            </div>
          </a>

          {/* Center Navigation Links */}
          <nav className="nav-desktop-menu">
            <ul>
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="nav-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick Actions (Resume, Thesis, Links) */}
          <div className="nav-actions">
            <a
              href="/docs/Vamshidhar_Reddy_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn resume-btn"
              title="Download Resume (PDF)"
            >
              <FaFilePdf />
              <span>RESUME</span>
            </a>

            <div className="nav-social-pills">
              <a
                href="https://www.linkedin.com/in/vamshidhar-reddy-eng/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-pill"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/vamshidharre"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="social-pill"
              >
                <FaGithub />
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <RiCloseLine size={24} /> : <RiMenu4Line size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`nav-mobile-drawer ${mobileMenuOpen ? "open" : ""}`}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="mobile-nav-link"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mobile-action-item">
              <a
                href="/docs/Vamshidhar_Reddy_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn resume-btn mobile-btn"
              >
                <FaFilePdf />
                <span>DOWNLOAD RESUME (PDF)</span>
              </a>
            </li>
            <li className="mobile-action-item">
              <a
                href="/docs/Master_Thesis_Summary_Vamshidhar_Reddy.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn thesis-btn mobile-btn"
              >
                <FaFilePdf />
                <span>THESIS SUMMARY (PDF)</span>
              </a>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navbar;
