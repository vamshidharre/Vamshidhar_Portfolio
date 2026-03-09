import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Internship</h4>
                <h5>Valeo Schalter und Sensoren GmbH</h5>
              </div>
              <h3>09/2025 - Present</h3>
            </div>
            <p>
              Automated acoustic simulations in Simcenter 3D using NX Open API and Python scripting. Created advanced Python visualization scripts for ray paths, sound pressure levels, and energy maps. Optimized simulation model setup, cutting manual configuration time by 50%.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Master Thesis</h4>
                <h5>Valeo eAutomotive Germany GmbH</h5>
              </div>
              <h3>03/2025 - 08/2025</h3>
            </div>
            <p>
              Developed the stator design and validated a full electric motor FE model in ANSYS for modal and harmonic NVH analysis. Integrated experimental EMAG force measurements and utilized advanced signal processing to identify excitation modes.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Working Student</h4>
                <h5>Simulation Department</h5>
              </div>
              <h3>08/2024 - 02/2025</h3>
            </div>
            <p>
              Performed thermomechanical FEM simulations in ANSYS Mechanical. Analyzed deformations and stress distributions, validated against experimental data, and developed Python scripts to automate preprocessing, solver runs, and postprocessing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
