import React, { useCallback, useEffect, useRef, useState } from "react";
import "./styles/Navbar.css";
import { RollText } from "./Split";
import { getLenis } from "./utils/motion";
import { profile } from "../data/content";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

type Theme = "light" | "dark";

const currentTheme = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [theme, setTheme] = useState<Theme>(() => (typeof window === "undefined" ? "dark" : currentTheme()));
  const linksRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  // Tuck the bar away while reading down, bring it back on any upward scroll.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > lastY + 4 && y > 320) setHidden(true);
      else if (y < lastY - 4 || y < 320) setHidden(false);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link of the section currently in view.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Sliding pill behind the hovered (or else the active) link.
  const movePill = useCallback((el: HTMLElement | null) => {
    const pill = pillRef.current;
    if (!pill) return;
    if (!el) {
      pill.style.opacity = "0";
      return;
    }
    pill.style.opacity = "1";
    pill.style.width = `${el.offsetWidth}px`;
    pill.style.transform = `translateX(${el.offsetLeft}px)`;
  }, []);

  const activeEl = useCallback(
    () => linksRef.current?.querySelector<HTMLElement>(`a[href="${active}"]`) ?? null,
    [active]
  );

  useEffect(() => {
    movePill(activeEl());
  }, [activeEl, movePill]);

  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable: the choice just won't persist */
    }
    setTheme(next);
  };

  return (
    <header
      className={`nav ${scrolled ? "is-scrolled" : ""} ${hidden && !open ? "is-hidden" : ""} ${open ? "is-open" : ""}`}
    >
      <div className="wrap nav-inner">
        <a href="#top" className="nav-brand glass" onClick={() => setOpen(false)}>
          <span className="nav-mark" aria-hidden="true">
            vr
          </span>
          <span className="nav-name">{profile.shortName}</span>
        </a>

        <nav className="nav-links glass" aria-label="Primary" ref={linksRef} onMouseLeave={() => movePill(activeEl())}>
          <span className="nav-pill" ref={pillRef} aria-hidden="true" />
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={active === l.href ? "is-active" : ""}
              aria-current={active === l.href ? "true" : undefined}
              onMouseEnter={(e) => movePill(e.currentTarget)}
            >
              <RollText>{l.label}</RollText>
            </a>
          ))}
        </nav>

        <div className="nav-actions glass">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

          <a className="nav-cta" href={profile.resume} target="_blank" rel="noopener noreferrer">
            <RollText>Résumé</RollText>
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </a>

          <button
            type="button"
            className="nav-menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="nav-sheet">
        <nav className="wrap" aria-label="Mobile">
          {navLinks.map((l, i) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ ["--i" as string]: i }}>
              <span className="eyebrow">0{i + 1}</span>
              {l.label}
            </a>
          ))}
          <div className="nav-sheet-foot">
            <a className="text-link" href={profile.resume} target="_blank" rel="noopener noreferrer">
              Download résumé <span className="arrow">↗</span>
            </a>
            <a className="text-link" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
