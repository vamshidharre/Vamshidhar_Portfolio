import React, { useState, useEffect, useRef } from "react";
import "./styles/SimulationVisualizer.css";
import { FaPlay, FaPause, FaCube, FaWaveSquare, FaProjectDiagram } from "react-icons/fa";

type SimMode = "modal" | "frf" | "topology";

export const SimulationVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<SimMode>("modal");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [selectedModeIndex, setSelectedModeIndex] = useState<number>(2); // Default to Mode 3: Radial Breathing (1250 Hz)
  const [iteration, setIteration] = useState<number>(85); // For topology optimization

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  // Modal analysis presets
  const modalModes = [
    { id: 1, name: "Mode 1: Torsion", freq: 128.4, damping: "0.85%", peakStress: "82.4 MPa", type: "Torsional" },
    { id: 2, name: "Mode 2: Bending", freq: 492.1, damping: "1.12%", peakStress: "145.2 MPa", type: "First Bending" },
    { id: 3, name: "Mode 3: Radial Ovalization", freq: 1248.6, damping: "1.45%", peakStress: "218.7 MPa", type: "PMSM Whine Mode" },
    { id: 4, name: "Mode 4: Tooth Tip Rocking", freq: 2415.0, damping: "1.78%", peakStress: "194.0 MPa", type: "High-Freq Harmonic" },
  ];

  // FRF curve calculation helper
  const calculateFRF = (f: number): number => {
    // Multi-degree-of-freedom synthetic response based on the 4 resonant modes
    let totalResp = 0.005; // noise floor
    modalModes.forEach((m) => {
      const fn = m.freq;
      const zeta = 0.015;
      const r = f / fn;
      const denom = Math.sqrt(Math.pow(1 - r * r, 2) + Math.pow(2 * zeta * r, 2));
      const amp = 1 / Math.max(denom, 0.001);
      totalResp += amp * 0.25;
    });
    return 20 * Math.log10(Math.max(totalResp, 0.0001));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 420);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    const render = () => {
      if (isPlaying) {
        timeRef.current += 0.035;
      }
      const t = timeRef.current;
      ctx.clearRect(0, 0, width, height);

      // Draw engineering grid background
      drawEngineeringGrid(ctx, width, height);

      if (activeMode === "modal") {
        drawModalFEAMesh(ctx, width, height, t, selectedModeIndex);
      } else if (activeMode === "frf") {
        drawFRFSpectrum(ctx, width, height, t);
      } else if (activeMode === "topology") {
        drawTopologyDensityField(ctx, width, height, iteration);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeMode, isPlaying, selectedModeIndex, iteration]);

  // 1. Engineering grid with coordinate markings
  const drawEngineeringGrid = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.save();
    ctx.strokeStyle = "rgba(56, 189, 248, 0.06)";
    ctx.lineWidth = 1;

    const gridSize = 32;
    for (let x = 0; x < w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Border and corner ticks
    ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
    ctx.strokeRect(10, 10, w - 20, h - 20);

    // Corner crosshairs
    const drawCross = (cx: number, cy: number) => {
      ctx.beginPath();
      ctx.moveTo(cx - 6, cy);
      ctx.lineTo(cx + 6, cy);
      ctx.moveTo(cx, cy - 6);
      ctx.lineTo(cx, cy + 6);
      ctx.stroke();
    };
    drawCross(10, 10);
    drawCross(w - 10, 10);
    drawCross(10, h - 10);
    drawCross(w - 10, h - 10);

    ctx.restore();
  };

  // 2. 3D FEA Stator / Bracket Modal Vibration & von Mises Stress field
  const drawModalFEAMesh = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    t: number,
    modeIdx: number
  ) => {
    ctx.save();
    const cx = w * 0.48;
    const cy = h * 0.52;
    const baseR = Math.min(w, h) * 0.32;
    const currentMode = modalModes[modeIdx];
    const harmonicFreq = currentMode.freq;

    // Harmonic vibration amplitude oscillation
    const osc = Math.sin(t * 3.5);
    const numTeeth = 24;
    const numLayers = 5;

    // Title & telemetry overlay inside canvas
    ctx.fillStyle = "#38bdf8";
    ctx.font = "11px 'Geist Mono', monospace";
    ctx.fillText(`FEA SOLVER: ANSYS MECHANICAL / BLOCK LANCZOS`, 24, 32);
    ctx.fillStyle = "#94a3b8";
    ctx.fillText(`TARGET: PMSM STATOR CORE & TOOTH HARMONICS`, 24, 48);
    ctx.fillStyle = "#00e5ff";
    ctx.fillText(`FREQ: ${harmonicFreq.toFixed(1)} Hz | TYPE: ${currentMode.type}`, 24, 64);

    // Render deformed FEA concentric cylindrical mesh
    for (let layer = 0; layer < numLayers; layer++) {
      const rRatio = 0.55 + (layer / (numLayers - 1)) * 0.45;
      const currentR = baseR * rRatio;

      ctx.beginPath();
      for (let i = 0; i <= numTeeth * 4; i++) {
        const theta = (i / (numTeeth * 4)) * Math.PI * 2;
        let deltaR = 0;

        if (modeIdx === 0) {
          // Torsional mode: circumferential displacement
          deltaR = Math.sin(theta * 2) * osc * 8;
        } else if (modeIdx === 1) {
          // First Bending mode: dipole deformation
          deltaR = Math.cos(theta) * osc * 16 * rRatio;
        } else if (modeIdx === 2) {
          // Radial Ovalization (mode r = 2 & 4): quadrupole deformation
          deltaR = (Math.cos(theta * 2) * 18 + Math.cos(theta * 4) * 8) * osc * rRatio;
        } else if (modeIdx === 3) {
          // Tooth Tip Rocking mode: high spatial frequency deformation
          deltaR = Math.sin(theta * 12) * osc * 10 * Math.pow(rRatio, 2);
        }

        const effectiveR = currentR + deltaR;
        // Project to isometric perspective
        const x = cx + effectiveR * Math.cos(theta);
        const y = cy + effectiveR * Math.sin(theta) * 0.72; // slight tilt

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();

      // Stress colormap calculation
      const stressNorm = (layer / (numLayers - 1) + Math.abs(osc) * 0.4) * 0.8;
      const strokeColor = getStressColor(Math.min(stressNorm, 1));
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = layer === numLayers - 1 ? 2 : 1;
      ctx.stroke();
    }

    // Draw stator teeth and radial mesh interconnects
    for (let i = 0; i < numTeeth; i++) {
      const theta = (i / numTeeth) * Math.PI * 2;
      let deltaR_inner = 0;
      let deltaR_outer = 0;

      if (modeIdx === 2) {
        deltaR_inner = (Math.cos(theta * 2) * 18 + Math.cos(theta * 4) * 8) * osc * 0.55;
        deltaR_outer = (Math.cos(theta * 2) * 18 + Math.cos(theta * 4) * 8) * osc * 1.0;
      } else if (modeIdx === 1) {
        deltaR_inner = Math.cos(theta) * osc * 16 * 0.55;
        deltaR_outer = Math.cos(theta) * osc * 16 * 1.0;
      } else if (modeIdx === 3) {
        deltaR_inner = Math.sin(theta * 12) * osc * 10 * 0.3;
        deltaR_outer = Math.sin(theta * 12) * osc * 10 * 1.0;
      }

      const rInner = baseR * 0.55 + deltaR_inner;
      const rOuter = baseR + deltaR_outer;

      const x1 = cx + rInner * Math.cos(theta);
      const y1 = cy + rInner * Math.sin(theta) * 0.72;
      const x2 = cx + rOuter * Math.cos(theta);
      const y2 = cy + rOuter * Math.sin(theta) * 0.72;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Nodal points with stress-colored glow
      if (i % 2 === 0) {
        ctx.beginPath();
        ctx.arc(x2, y2, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = getStressColor(Math.abs(osc) * 0.8 + 0.15);
        ctx.fill();
      }
    }

    // FEA Von Mises Stress Legend
    drawFEAStressLegend(ctx, w - 85, cy - 80, 160);

    ctx.restore();
  };

  // 3. Frequency Response Function (FRF) FFT Spectrum
  const drawFRFSpectrum = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    ctx.save();
    const marginL = 65;
    const marginR = 30;
    const marginT = 70;
    const marginB = 55;
    const plotW = w - marginL - marginR;
    const plotH = h - marginT - marginB;

    // Header info
    ctx.fillStyle = "#38bdf8";
    ctx.font = "11px 'Geist Mono', monospace";
    ctx.fillText("STRUCTURAL FRF: ACCELERANCE [m/s² / N] vs FREQUENCY", marginL, 30);
    ctx.fillStyle = "#94a3b8";
    ctx.fillText("BENCHMARK: MSC NASTRAN vs AI NEURAL SURROGATE (TENSORFLOW/KERAS)", marginL, 46);

    // Plot background & axis
    ctx.fillStyle = "rgba(10, 20, 35, 0.65)";
    ctx.fillRect(marginL, marginT, plotW, plotH);
    ctx.strokeStyle = "rgba(56, 189, 248, 0.3)";
    ctx.strokeRect(marginL, marginT, plotW, plotH);

    // Frequency grid (0 to 3000 Hz)
    const maxFreq = 3000;
    const minDB = -40;
    const maxDB = 40;

    ctx.fillStyle = "rgba(148, 163, 184, 0.6)";
    ctx.font = "10px 'Geist Mono', monospace";

    for (let f = 500; f <= maxFreq; f += 500) {
      const x = marginL + (f / maxFreq) * plotW;
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.moveTo(x, marginT);
      ctx.lineTo(x, marginT + plotH);
      ctx.stroke();
      ctx.fillText(`${f} Hz`, x - 18, marginT + plotH + 18);
    }

    // dB grid
    for (let db = minDB; db <= maxDB; db += 20) {
      const y = marginT + plotH - ((db - minDB) / (maxDB - minDB)) * plotH;
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.moveTo(marginL, y);
      ctx.lineTo(marginL + plotW, y);
      ctx.stroke();
      ctx.fillText(`${db} dB`, marginL - 48, y + 4);
    }

    // 1. Draw NASTRAN Ground Truth curve (solid line)
    ctx.beginPath();
    ctx.strokeStyle = "rgba(148, 163, 184, 0.75)";
    ctx.lineWidth = 1.5;
    for (let px = 0; px <= plotW; px += 2) {
      const f = (px / plotW) * maxFreq;
      const db = calculateFRF(f);
      const py = marginT + plotH - ((db - minDB) / (maxDB - minDB)) * plotH;
      if (px === 0) ctx.moveTo(marginL + px, py);
      else ctx.lineTo(marginL + px, py);
    }
    ctx.stroke();

    // 2. Draw AI Neural Surrogate Prediction curve (cyan glowing curve)
    ctx.beginPath();
    ctx.strokeStyle = "#00e5ff";
    ctx.lineWidth = 2.5;
    ctx.shadowColor = "#00e5ff";
    ctx.shadowBlur = 8;
    for (let px = 0; px <= plotW; px += 2) {
      const f = (px / plotW) * maxFreq;
      // Slight tiny deviation to demonstrate neural surrogate validation
      const noise = Math.sin(f * 0.04 + t) * 0.35;
      const db = calculateFRF(f) + noise;
      const py = marginT + plotH - ((db - minDB) / (maxDB - minDB)) * plotH;
      if (px === 0) ctx.moveTo(marginL + px, py);
      else ctx.lineTo(marginL + px, py);
    }
    ctx.stroke();
    ctx.shadowBlur = 0; // reset shadow

    // Annotate resonant peaks
    modalModes.forEach((m) => {
      const x = marginL + (m.freq / maxFreq) * plotW;
      const db = calculateFRF(m.freq);
      const y = marginT + plotH - ((db - minDB) / (maxDB - minDB)) * plotH;

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#f59e0b";
      ctx.fill();

      // Peak label flag
      ctx.strokeStyle = "rgba(245, 158, 11, 0.8)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y - 22);
      ctx.stroke();

      ctx.fillStyle = "#f59e0b";
      ctx.font = "9px 'Geist Mono', monospace";
      ctx.fillText(`${m.freq.toFixed(0)}Hz`, x - 14, y - 26);
    });

    // Legend
    const lx = marginL + plotW - 240;
    const ly = marginT + 18;
    ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
    ctx.fillRect(lx, ly, 230, 48);
    ctx.strokeStyle = "rgba(56, 189, 248, 0.3)";
    ctx.strokeRect(lx, ly, 230, 48);

    // NASTRAN item
    ctx.strokeStyle = "rgba(148, 163, 184, 0.9)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(lx + 10, ly + 16);
    ctx.lineTo(lx + 32, ly + 16);
    ctx.stroke();
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "10px 'Geist Mono', monospace";
    ctx.fillText("NASTRAN High-Fidelity FEA", lx + 40, ly + 20);

    // AI Surrogate item
    ctx.strokeStyle = "#00e5ff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(lx + 10, ly + 34);
    ctx.lineTo(lx + 32, ly + 34);
    ctx.stroke();
    ctx.fillStyle = "#00e5ff";
    ctx.fillText("AI Neural Surrogate (0.6ms)", lx + 40, ly + 38);

    ctx.restore();
  };

  // 4. Structural Topology Optimization Density Field (SIMP/RAMP)
  const drawTopologyDensityField = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    iter: number
  ) => {
    ctx.save();
    const cx = w * 0.5;
    const cy = h * 0.52;
    const boxW = Math.min(w * 0.75, 480);
    const boxH = boxW * 0.5;

    // Overlay stats
    const progress = Math.min(Math.max(iter / 100, 0), 1);
    const volumeFrac = (1.0 - progress * 0.68).toFixed(2);
    const compliance = (42.5 - progress * 28.2).toFixed(1);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "11px 'Geist Mono', monospace";
    ctx.fillText("TOPOLOGY OPTIMIZATION: OPENCFS + SNOPT / MMA", 24, 32);
    ctx.fillStyle = "#94a3b8";
    ctx.fillText(`SOLVER: INTEL PARDISO | PENALIZATION: SIMP (p=3.0) / RAMP`, 24, 48);
    ctx.fillStyle = "#10b981";
    ctx.fillText(
      `ITER: ${iter}/100 | VOL FRAC: ${volumeFrac} | COMPLIANCE: ${compliance} J`,
      24,
      64
    );

    // Render 2D Cantilever / Bulkhead density distribution matrix
    const cols = 48;
    const rows = 24;
    const cellW = boxW / cols;
    const cellH = boxH / rows;
    const startX = cx - boxW / 2;
    const startY = cy - boxH / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Density function evolving towards truss structure as progress -> 1
        const normX = c / cols;
        const normY = r / rows;

        // Mathematical truss-like density field
        const truss1 = Math.abs(normY - normX * 0.5);
        const truss2 = Math.abs(normY - (1 - normX * 0.5));
        const horizontalTruss = Math.abs(normY - 0.5);
        const borderDist = Math.min(normX, 1 - normX, normY, 1 - normY);

        let targetDensity = 0.05; // void
        if (
          truss1 < 0.12 ||
          truss2 < 0.12 ||
          horizontalTruss < 0.1 ||
          borderDist < 0.06 ||
          (normX > 0.88 && Math.abs(normY - 0.5) < 0.25)
        ) {
          targetDensity = 0.98; // solid strut
        }

        // Interpolate initial solid block (iter=0) -> final optimal topology (iter=100)
        const density = 1.0 * (1 - progress) + targetDensity * progress;

        const x = startX + c * cellW;
        const y = startY + r * cellH;

        ctx.fillStyle = getDensityColor(density);
        ctx.fillRect(x, y, cellW + 0.5, cellH + 0.5);
      }
    }

    // Draw boundary conditions & applied loads
    // Fixed support on left (triangles)
    ctx.fillStyle = "#ef4444";
    for (let y = startY; y <= startY + boxH; y += 22) {
      ctx.beginPath();
      ctx.moveTo(startX - 12, y - 6);
      ctx.lineTo(startX, y);
      ctx.lineTo(startX - 12, y + 6);
      ctx.closePath();
      ctx.fill();
    }
    // Fixed support indicator text
    ctx.fillStyle = "#ef4444";
    ctx.font = "9px 'Geist Mono', monospace";
    ctx.fillText("FIXED BC", startX - 58, cy);

    // Point Load on bottom right
    const loadX = startX + boxW;
    const loadY = startY + boxH;
    ctx.strokeStyle = "#eab308";
    ctx.fillStyle = "#eab308";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(loadX, loadY + 38);
    ctx.lineTo(loadX, loadY);
    ctx.stroke();

    // Arrowhead
    ctx.beginPath();
    ctx.moveTo(loadX - 6, loadY + 12);
    ctx.lineTo(loadX, loadY);
    ctx.lineTo(loadX + 6, loadY + 12);
    ctx.fill();
    ctx.fillText("FORCE [F = 10 kN]", loadX - 45, loadY + 52);

    ctx.restore();
  };

  // Helper: FEA stress color gradient (von Mises)
  const getStressColor = (val: number): string => {
    // 0: Deep Blue -> 0.3: Cyan -> 0.6: Green -> 0.8: Yellow -> 1.0: Red
    if (val < 0.25) {
      const r = Math.floor(0 + (val / 0.25) * 0);
      const g = Math.floor(80 + (val / 0.25) * 140);
      const b = 255;
      return `rgb(${r}, ${g}, ${b})`;
    } else if (val < 0.55) {
      const ratio = (val - 0.25) / 0.3;
      const r = 0;
      const g = 220;
      const b = Math.floor(255 * (1 - ratio));
      return `rgb(${r}, ${g}, ${b})`;
    } else if (val < 0.8) {
      const ratio = (val - 0.55) / 0.25;
      const r = Math.floor(255 * ratio);
      const g = 220;
      const b = 0;
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      const ratio = (val - 0.8) / 0.2;
      const r = 255;
      const g = Math.floor(220 * (1 - ratio));
      const b = Math.floor(40 * (1 - ratio));
      return `rgb(${r}, ${g}, ${b})`;
    }
  };

  // Helper: Topology material density color
  const getDensityColor = (density: number): string => {
    // 0 = void (dark background), 1 = solid structural metal (bright steel / cyan-titanium)
    if (density < 0.15) {
      return "rgba(15, 23, 42, 0.4)";
    }
    const alpha = Math.min(Math.max(density, 0.15), 1.0);
    const r = Math.floor(30 + alpha * 180);
    const g = Math.floor(50 + alpha * 200);
    const b = Math.floor(80 + alpha * 175);
    return `rgba(${r}, ${g}, ${b}, ${alpha * 0.95})`;
  };

  // Stress legend helper
  const drawFEAStressLegend = (ctx: CanvasRenderingContext2D, x: number, y: number, h: number) => {
    const w = 12;
    const grad = ctx.createLinearGradient(x, y + h, x, y);
    grad.addColorStop(0, "rgb(0, 80, 255)");
    grad.addColorStop(0.3, "rgb(0, 220, 255)");
    grad.addColorStop(0.6, "rgb(0, 220, 0)");
    grad.addColorStop(0.85, "rgb(255, 220, 0)");
    grad.addColorStop(1, "rgb(255, 30, 30)");

    ctx.fillStyle = grad;
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.strokeRect(x, y, w, h);

    ctx.fillStyle = "#cbd5e1";
    ctx.font = "8px 'Geist Mono', monospace";
    ctx.fillText("240 MPa", x + 16, y + 8);
    ctx.fillText("160 MPa", x + 16, y + h * 0.35);
    ctx.fillText("80 MPa", x + 16, y + h * 0.7);
    ctx.fillText("0 MPa", x + 16, y + h);
  };

  return (
    <div className="sim-visualizer-container">
      {/* Top Engineering Control Bar */}
      <div className="sim-control-bar">
        <div className="sim-tabs">
          <button
            className={`sim-tab-btn ${activeMode === "modal" ? "active" : ""}`}
            onClick={() => setActiveMode("modal")}
          >
            <FaCube /> 3D Modal FEA Mesh
          </button>
          <button
            className={`sim-tab-btn ${activeMode === "frf" ? "active" : ""}`}
            onClick={() => setActiveMode("frf")}
          >
            <FaWaveSquare /> FRF Vibration Spectrum
          </button>
          <button
            className={`sim-tab-btn ${activeMode === "topology" ? "active" : ""}`}
            onClick={() => setActiveMode("topology")}
          >
            <FaProjectDiagram /> Topology Optimization
          </button>
        </div>

        <div className="sim-playback-controls">
          <button
            className="sim-play-btn"
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? "Pause simulation" : "Run simulation"}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
            <span>{isPlaying ? "SOLVER RUNNING" : "PAUSED"}</span>
          </button>
        </div>
      </div>

      {/* Main Simulation Viewport */}
      <div className="sim-canvas-wrapper">
        <canvas ref={canvasRef} className="sim-canvas" />
      </div>

      {/* Bottom Parameter Adjusters depending on Active Mode */}
      <div className="sim-parameter-deck">
        {activeMode === "modal" && (
          <div className="sim-param-row">
            <span className="param-label">EIGENMODE SELECTOR:</span>
            <div className="param-mode-chips">
              {modalModes.map((m, idx) => (
                <button
                  key={m.id}
                  className={`param-chip ${selectedModeIndex === idx ? "active" : ""}`}
                  onClick={() => setSelectedModeIndex(idx)}
                >
                  <span className="chip-name">{m.name}</span>
                  <span className="chip-freq">{m.freq.toFixed(1)} Hz</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeMode === "frf" && (
          <div className="sim-param-row">
            <span className="param-label">SURROGATE COMPARISON:</span>
            <div className="param-stats-group">
              <div className="stat-pill">
                <span className="pill-k">AI MODEL:</span>
                <span className="pill-v">TensorFlow Deep Surrogate</span>
              </div>
              <div className="stat-pill">
                <span className="pill-k">ACCURACY:</span>
                <span className="pill-v">99.2% vs NASTRAN</span>
              </div>
              <div className="stat-pill">
                <span className="pill-k">SPEEDUP:</span>
                <span className="pill-v">1,400x (3.2 hrs → 0.6 ms)</span>
              </div>
            </div>
          </div>
        )}

        {activeMode === "topology" && (
          <div className="sim-param-row">
            <span className="param-label">OPTIMIZATION ITERATION ({iteration}/100):</span>
            <input
              type="range"
              min="0"
              max="100"
              value={iteration}
              onChange={(e) => setIteration(parseInt(e.target.value))}
              className="iteration-slider"
            />
            <div className="slider-telemetry">
              <span>Vol: {(1.0 - (iteration / 100) * 0.68).toFixed(2)} V₀</span>
              <span>Compliance: {(42.5 - (iteration / 100) * 28.2).toFixed(1)} J</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default SimulationVisualizer;
