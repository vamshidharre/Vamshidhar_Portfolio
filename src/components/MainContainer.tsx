import React, { useEffect } from "react";
import Preloader from "./Preloader";
import Cursor from "./Cursor";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Bands from "./Marquee";
import About from "./About";
import Stats from "./Stats";
import Lab from "./Lab";
import Projects from "./Projects";
import Career from "./Career";
import TechnicalSkills from "./TechnicalSkills";
import Education from "./Education";
import Contact, { Footer } from "./Contact";
import { useReveal } from "./utils/useReveal";
import { useInteractions } from "./utils/useInteractions";
import { startSmoothScroll } from "./utils/motion";

const MainContainer: React.FC = () => {
  useEffect(() => startSmoothScroll(), []);
  useReveal();
  useInteractions();

  return (
    <>
      <Preloader />
      <Cursor />
      <div className="scroll-progress" aria-hidden="true" />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Bands />
        <About />
        <Stats />
        <Lab />
        <Projects />
        <Career />
        <TechnicalSkills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default MainContainer;
