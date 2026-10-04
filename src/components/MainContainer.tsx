import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import About from "./About";
import EngineeringExpertise from "./EngineeringExpertise";
import Career from "./Career";
import Projects from "./Projects";
import Research from "./Research";
import TechnicalSkills from "./TechnicalSkills";
import Education from "./Education";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";

const MainContainer: React.FC = () => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth > 1024 : true
  );

  useEffect(() => {
    const resizeHandler = () => {
      setIsDesktopView(window.innerWidth > 1024);
    };
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className="container-main">
      {isDesktopView && <Cursor />}
      <Navbar />
      <SocialIcons />
      <main id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Hero />
            <About />
            <EngineeringExpertise />
            <Career />
            <Projects />
            <Research />
            <TechnicalSkills />
            <Education />
            <Contact />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainContainer;
