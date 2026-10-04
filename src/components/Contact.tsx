import React, { useEffect, useRef, useState } from "react";
import "./styles/Contact.css";
import Split, { RollText } from "./Split";
import { profile } from "../data/content";

type Status = "idle" | "sending" | "sent" | "error" | "local";

const topics = ["Full-time role", "Project or collaboration", "Research", "Something else"];

const encode = (data: Record<string, string>) =>
  Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");

const mailtoFor = (data: Record<string, string>) =>
  `mailto:${profile.email}?subject=${encodeURIComponent(
    `${data.topic || "Hello"} — from ${data.name || "your portfolio"}`
  )}&body=${encodeURIComponent(data.message || "")}`;

const CopyEmail: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <button type="button" className={`copy-email ${copied ? "is-copied" : ""}`} onClick={copy}>
      <span className="copy-address">{profile.email}</span>
      <span className="copy-state" aria-live="polite">
        {copied ? "Copied ✓" : "Copy"}
      </span>
    </button>
  );
};

export const Contact: React.FC = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [fields, setFields] = useState<Record<string, string>>({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    setFields(data);

    // Netlify Forms only exists on the deployed site.
    if (import.meta.env.DEV) {
      setStatus("local");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...data }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section contact" id="contact">
      <div className="contact-glow" aria-hidden="true" />
      <div className="wrap">
        <div className="section-head">
          <p className="section-label eyebrow reveal">
            <span className="num">(06)</span>Contact
          </p>
          <h2 className="section-title reveal-split">
            <Split>
              Something too loud, or too slow to simulate? <em>Let's talk.</em>
            </Split>
          </h2>
          <p className="section-intro reveal">
            I'm looking for full-time roles in CAE, structural dynamics and NVH in Germany, and I'm always up for
            a conversation about surrogate modelling. I usually reply within a day or two.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-left">
            <div className="reveal orb-wrap">
              <a href={`mailto:${profile.email}`} className="orb" data-magnetic="0.35">
                <span className="orb-text">
                  Write
                  <br />
                  to me
                </span>
                <span className="orb-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>

            <div className="reveal" style={{ ["--delay" as string]: "100ms" }}>
              <CopyEmail />
            </div>

            <dl className="contact-direct reveal" style={{ ["--delay" as string]: "180ms" }}>
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={profile.phoneHref}>{profile.phone}</a>
                </dd>
              </div>
              <div>
                <dt>Elsewhere</dt>
                <dd className="direct-links">
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn ↗
                  </a>
                  <a href={profile.github} target="_blank" rel="noopener noreferrer">
                    GitHub ↗
                  </a>
                </dd>
              </div>
              <div>
                <dt>Documents</dt>
                <dd className="direct-links">
                  <a href={profile.resume} target="_blank" rel="noopener noreferrer">
                    Résumé (PDF) ↗
                  </a>
                  <a href={profile.thesis} target="_blank" rel="noopener noreferrer">
                    Thesis summary (PDF) ↗
                  </a>
                </dd>
              </div>
              <div>
                <dt>Based in</dt>
                <dd>{profile.location}</dd>
              </div>
            </dl>
          </div>

          <div className="contact-form-wrap reveal" style={{ ["--delay" as string]: "120ms" }}>
            {status === "sent" ? (
              <div className="form-done" role="status">
                <p className="form-done-title">Thank you, message received.</p>
                <p>I'll get back to you at {fields.email}.</p>
                <button type="button" className="text-link" onClick={() => setStatus("idle")}>
                  Send another
                </button>
              </div>
            ) : (
              <form
                className="contact-form"
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={onSubmit}
              >
                <p className="form-title">
                  Send a message <span className="serif">directly</span>
                </p>
                <input type="hidden" name="form-name" value="contact" />
                <p className="hp" aria-hidden="true">
                  <label>
                    Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>

                <div className="field-row">
                  <div className="field">
                    <input id="cf-name" name="name" type="text" autoComplete="name" placeholder=" " required />
                    <label htmlFor="cf-name">Name</label>
                  </div>
                  <div className="field">
                    <input id="cf-email" name="email" type="email" autoComplete="email" placeholder=" " required />
                    <label htmlFor="cf-email">Email</label>
                  </div>
                </div>

                <fieldset className="topics">
                  <legend>What's it about?</legend>
                  <div className="topic-list">
                    {topics.map((t, i) => (
                      <label className="topic" key={t}>
                        <input type="radio" name="topic" value={t} defaultChecked={i === 0} />
                        <span>{t}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="field">
                  <textarea id="cf-message" name="message" rows={4} placeholder=" " required />
                  <label htmlFor="cf-message">Message</label>
                </div>

                <div className="form-foot">
                  <button className="btn" type="submit" disabled={status === "sending"} data-magnetic="0.15">
                    <RollText>{status === "sending" ? "Sending…" : "Send message"}</RollText>
                    <span className="arrow">→</span>
                  </button>
                  <div className="form-msg" role="status" aria-live="polite">
                    {status === "error" && (
                      <p>
                        That didn't go through.{" "}
                        <a className="text-link" href={mailtoFor(fields)}>
                          Send it by email instead
                        </a>
                      </p>
                    )}
                    {status === "local" && (
                      <p>
                        Local preview: the form sends once the site is deployed on Netlify.{" "}
                        <a className="text-link" href={mailtoFor(fields)}>
                          Open as email
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const berlinTime = () =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Berlin",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: "short",
  }).format(new Date());

export const Footer: React.FC = () => {
  const [time, setTime] = useState(berlinTime);

  useEffect(() => {
    const id = window.setInterval(() => setTime(berlinTime()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <p className="eyebrow">Local time in Stuttgart</p>
            <p className="footer-time">
              <span className="status-dot" aria-hidden="true" />
              {time}
            </p>
          </div>
          <nav className="footer-links" aria-label="Elsewhere">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <RollText>LinkedIn</RollText>
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <RollText>GitHub</RollText>
            </a>
            <a href={`mailto:${profile.email}`}>
              <RollText>Email</RollText>
            </a>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer">
              <RollText>Résumé</RollText>
            </a>
          </nav>
          <a href="#top" className="footer-up" data-magnetic="0.4" aria-label="Back to top">
            ↑
          </a>
        </div>
      </div>

      <p className="footer-giant" aria-hidden="true">
        {Array.from("Vamshidhar").map((c, i) => (
          <span className="ch" key={i}>
            {c}
          </span>
        ))}
      </p>

      <div className="wrap footer-bottom">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>Designed & built with React, three.js and GSAP</span>
      </div>
    </footer>
  );
};

export default Contact;
