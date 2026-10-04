// All site copy lives here so it can be edited without touching layout code.

export const profile = {
  name: "Enugala Vamshidhar Reddy",
  shortName: "Vamshidhar Reddy",
  role: "CAE · Structural Dynamics · NVH",
  location: "Stuttgart / Erlangen, Germany",
  email: "vamshidharreddye@gmail.com",
  phone: "+49 176 87733752",
  phoneHref: "tel:+4917687733752",
  linkedin: "https://www.linkedin.com/in/vamshidhar-reddy-eng/",
  github: "https://github.com/vamshidharre",
  resume: "/docs/Vamshidhar_Reddy_Resume.pdf",
  thesis: "/docs/Master_Thesis_Summary_Vamshidhar_Reddy.pdf",
  availability: "Open to full-time CAE & NVH roles",
};

export const heroIntro =
  "I'm Vamshidhar, a CAE engineer working where structural dynamics, NVH and machine learning meet. At Mercedes-Benz I train neural surrogates that predict how an engine structure vibrates in under a millisecond, instead of waiting hours for NASTRAN.";

export const heroRoles = ["Structural dynamics", "Powertrain NVH", "Neural surrogates", "FEA automation"];

export const marqueeFocus = [
  "Structural dynamics",
  "Powertrain NVH",
  "Neural surrogates",
  "Modal analysis",
  "Topology optimisation",
  "Vibroacoustics",
];

export const marqueeTools = [
  "MSC NASTRAN",
  "ANSYS Mechanical",
  "Simcenter 3D",
  "HyperMesh",
  "TensorFlow",
  "PyMechanical",
  "openCFS",
  "Python",
];

export const heroStats = [
  { value: "1,000×", label: "faster FRF evaluation than the full NASTRAN solve" },
  { value: "90%+", label: "agreement between neural surrogate and FE benchmark" },
  { value: "50%", label: "less model-setup time through NX Open automation" },
  { value: "1st", label: "place, Siemens Healthineers Hack A-Bot 2026" },
];

export const aboutLead =
  "I like problems where the physics is well understood, but the computation is too slow to be useful.";

export const aboutStory = [
  "My engineering started with things you can hold: an electric go-kart, a two-wheeler airbag concept, a UGV modelled in SolidWorks. Building them showed me how expensive it is to learn that a design is wrong after it already exists.",
  "That pulled me towards simulation, and to Germany. In the M.Sc. Computational Engineering programme at FAU Erlangen-Nürnberg I went deep into nonlinear continuum mechanics, finite elements and structural topology optimisation.",
  "At Valeo I saw what simulation looks like in industry. For my master's thesis I modelled a complete electric motor in ANSYS and compared simulated with measured electromagnetic forces. The housing noise turned out to be driven mainly by tangential forces of order r = 0, not by the radial forces most NVH work focuses on.",
  "The other lesson was that good models are slow. A single frequency sweep can take hours, which makes real design exploration impractical. So at Mercedes-Benz I now train neural surrogates on NASTRAN results for V8 engine structures. They reproduce the FE frequency response with over 90% agreement, in under a millisecond.",
];

export const aboutFacts = [
  { k: "Currently", v: "Mercedes-Benz AG, Untertürkheim" },
  { k: "Based in", v: "Stuttgart / Erlangen, Germany" },
  { k: "Education", v: "M.Sc. Computational Engineering, FAU" },
  { k: "Languages", v: "English (C2) · German (B1) · Telugu (native)" },
  { k: "Work permit", v: "Unrestricted for Germany, EU Blue Card eligible" },
];

export type FigureKind =
  | "surrogate"
  | "stator"
  | "topology"
  | "acoustics"
  | "pipeline"
  | "robot";

export interface ProjectLink {
  label: string;
  // "#" marks a placeholder: it renders but does nothing until a real URL is added.
  href: string;
}

export interface Project {
  id: string;
  context: string;
  year?: string;
  title: string;
  summary: string;
  outcomes: string[];
  stack: string[];
  figure: FigureKind;
  caption: string;
  links: ProjectLink[];
  note?: string;
}

export const featuredProjects: Project[] = [
  {
    id: "neural-surrogates",
    context: "Mercedes-Benz AG",
    year: "2026",
    title: "Neural surrogates for V8 engine dynamics",
    summary:
      "Design-of-experiments sweeps over engine structures were too expensive to run in NASTRAN. I built a TensorFlow surrogate that maps rib thicknesses and material stiffnesses straight to the frequency response, trained on automatically generated and parsed FE runs.",
    outcomes: [
      "Over 90% agreement with NASTRAN across the critical frequency bands",
      "0.6 ms per evaluation instead of hours of solver time",
      "Benchmarked against Data-Interpolated Moving Gaussian Process regression",
    ],
    stack: ["MSC NASTRAN", "HyperMesh", "TensorFlow", "Keras", "Python", "DIMGP"],
    figure: "surrogate",
    caption: "FE reference and surrogate prediction of a driving-point FRF.",
    links: [],
    note: "Industry project. Code and data are confidential.",
  },
  {
    id: "pmsm-thesis",
    context: "Master's thesis · Valeo & FAU",
    year: "2025",
    title: "What actually makes an e-motor whine",
    summary:
      "A full 3D structural model of a permanent-magnet synchronous motor in ANSYS: laminated stator, windings, rotor, housing and bearing stiffnesses. Air-gap forces from EM simulation and from flex-PCB sensors were decomposed with a 2D FFT into spatial orders and temporal harmonics, then fed into harmonic response analysis.",
    outcomes: [
      "Showed that the tangential mode r = 0 dominates housing radiated power (ERP)",
      "Mode shapes correlated with test (MAC > 0.90)",
      "Measured forces exposed rotor eccentricity that nominal EM models miss",
    ],
    stack: ["ANSYS Mechanical", "2D FFT", "Python / SciPy", "MATLAB", "Accelerometers", "ERP"],
    figure: "stator",
    caption: "Stator cross-section with the tangential r = 0 force wave.",
    links: [{ label: "Thesis summary (PDF)", href: profile.thesis }],
  },
  {
    id: "topology-optimisation",
    context: "FAU Erlangen-Nürnberg",
    title: "Structural topology optimisation with openCFS",
    summary:
      "Compliance minimisation for cantilevers, a rear bulkhead and a pressure box under a 30% volume constraint. I wrote the meshing scripts in Python, implemented SIMP and RAMP interpolation, and compared the MMA and SNOPT optimisers with Intel Pardiso as the linear solver.",
    outcomes: [
      "Convergence study of MMA vs. SNOPT across load cases",
      "Multi-point load cases and mixed support conditions",
      "Designs post-processed in ParaView with manufacturability in mind",
    ],
    stack: ["openCFS", "Python", "SIMP / RAMP", "MMA", "SNOPT", "ParaView"],
    figure: "topology",
    caption: "Optimised cantilever, volume fraction 0.3.",
    links: [
      // TODO: replace "#" with the real repository URL.
      { label: "GitHub", href: "#" },
    ],
  },
];

export const moreProjects: Project[] = [
  {
    id: "simcenter-automation",
    context: "Valeo Schalter und Sensoren",
    year: "2025–26",
    title: "Vibroacoustic automation in Simcenter 3D",
    summary:
      "Python and NX Open tooling that sets up airborne-noise models for radar and ultrasonic sensor housings: point sources, microphone arrays, absorbing boundaries, then ray-path, SPL and energy maps for reporting.",
    outcomes: ["50% less setup time", "Adopted as the team's reporting standard"],
    stack: ["Simcenter 3D", "NX Open", "Python"],
    figure: "acoustics",
    caption: "Source and spherical microphone array.",
    links: [],
    note: "Industry project. Code is confidential.",
  },
  {
    id: "agentic-fea",
    context: "Personal project",
    title: "Agentic FEA: hands-free modal analysis",
    summary:
      "An agent-driven pipeline that takes a bracket from CAD to eigenfrequencies with no GUI: geometry import, solid meshing, bolted constraints and a Block Lanczos solve through PyMechanical, ending in a generated report.",
    outcomes: ["Geometry to modal report with zero manual steps"],
    stack: ["Ansys 2026 R1", "PyMechanical", "Python"],
    figure: "pipeline",
    caption: "CAD → mesh → constraints → solve → report.",
    links: [
      // TODO: replace "#" with real URLs.
      { label: "GitHub", href: "#" },
      { label: "Demo", href: "#" },
    ],
  },
  {
    id: "hack-a-bot",
    context: "Hack A-Bot · Siemens Healthineers",
    year: "2026",
    title: "Touchless control for surgical robotics",
    summary:
      "A gesture and voice interface that lets surgeons position robotic equipment without touching it, keeping the sterile field intact. Computer-vision hand tracking and speech commands with sub-100 ms response.",
    outcomes: ["1st place"],
    stack: ["Python", "Computer vision", "PyTorch", "Voice AI"],
    figure: "robot",
    caption: "Gesture and voice to arm motion.",
    links: [
      // TODO: replace "#" with real URLs.
      { label: "GitHub", href: "#" },
      { label: "Demo", href: "#" },
    ],
  },
];

export const experience = [
  {
    period: "04/2026 – now",
    company: "Mercedes-Benz AG",
    place: "Untertürkheim, Stuttgart",
    role: "Intern, Structural Dynamics & NVH",
    summary:
      "Preprocessing V8 engine assemblies in HyperMesh for DOE-driven NASTRAN studies, automating job submission and PCH/FIF parsing in Python, and training TensorFlow surrogates that predict FRFs, benchmarked against DIMGP.",
    tags: ["NASTRAN", "HyperMesh", "TensorFlow", "Python"],
    current: true,
  },
  {
    period: "09/2025 – 03/2026",
    company: "Valeo Schalter und Sensoren",
    place: "Bietigheim-Bissingen",
    role: "Intern, Vibroacoustic Simulation",
    summary:
      "Automated Simcenter 3D vibroacoustic workflows with Python and NX Open, cutting model setup time by half. Built ray-path, SPL and acoustic-energy tooling that the simulation team adopted for standard reporting.",
    tags: ["Simcenter 3D", "NX Open", "Acoustics"],
  },
  {
    period: "03/2025 – 08/2025",
    company: "Valeo eAutomotive Germany",
    place: "Erlangen",
    role: "Master's thesis, E-powertrain NVH",
    summary:
      "Built and validated a full 3D FE model of a PMSM in ANSYS, decomposed air-gap forces with a 2D FFT and correlated harmonic response against test-rig accelerometer data.",
    tags: ["ANSYS", "2D FFT", "Test correlation"],
  },
  {
    period: "08/2024 – 02/2025",
    company: "Valeo eAutomotive Germany",
    place: "Erlangen",
    role: "Working student, Simulation",
    summary:
      "Wrote Python and IronPython tooling for ANSYS Mechanical, ran thermo-mechanical analyses of power-electronics modules and calibrated temperature-dependent material models against optical warpage measurements.",
    tags: ["ANSYS", "IronPython", "Thermo-mechanics"],
  },
];

export const skillGroups = [
  {
    title: "Simulation & FEA",
    items: [
      "ANSYS Mechanical",
      "MSC NASTRAN (SOL 103 / 111)",
      "Simcenter 3D Acoustics",
      "Altair HyperMesh",
      "openCFS",
      "SolidWorks · Siemens NX",
      "LS-DYNA (familiar)",
    ],
  },
  {
    title: "Machine learning",
    items: [
      "Python · NumPy · SciPy · pandas",
      "TensorFlow · Keras",
      "PyTorch (PINNs)",
      "Gaussian processes · DIMGP",
      "scikit-learn",
      "LHS & DOE sampling",
    ],
  },
  {
    title: "Automation & tools",
    items: [
      "PyMechanical",
      "NX Open API",
      "IronPython (ACT)",
      "Linux HPC · Slurm · Bash",
      "MATLAB",
      "Git · LaTeX",
    ],
  },
  {
    title: "Methods",
    items: [
      "Modal & harmonic response",
      "Powertrain NVH · ERP",
      "2D FFT force decomposition",
      "Topology optimisation (SIMP, MMA)",
      "Thermo-mechanical & nonlinear FEA",
      "Simulation–test correlation (MAC)",
    ],
  },
];

export const education = [
  {
    period: "2022 – 2026",
    degree: "M.Sc. Computational Engineering",
    school: "Friedrich-Alexander-Universität Erlangen-Nürnberg",
    detail:
      "Structural mechanics, dynamics and scientific ML. Nonlinear continuum mechanics, inelastic FEM, topology optimisation, numerical linear algebra. Grade 2.0.",
  },
  {
    period: "2018 – 2022",
    degree: "B.Tech. Mechanical Engineering",
    school: "Kakatiya Institute of Technology and Science, India",
    detail:
      "First class with distinction (German equivalent 1.7). Vibrations, strength of materials, FEM, machine design.",
  },
];

export const recognition: { year?: string; title: string; org: string }[] = [
  {
    year: "2026",
    title: "1st place, Hack A-Bot",
    org: "Siemens Healthineers",
  },
  {
    title: "Winner, START Stuttgart AI Hackathon",
    org: "Rivyn AI, log intelligence platform",
  },
];
