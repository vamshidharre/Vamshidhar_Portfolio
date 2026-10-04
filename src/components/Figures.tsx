import React from "react";
import { FigureKind } from "../data/content";
import { frfDb, logSpace, Mode } from "./utils/frf";

const W = 640;
const H = 400;

const Svg: React.FC<React.PropsWithChildren<{ label: string }>> = ({ label, children }) => (
  <svg viewBox={`0 0 ${W} ${H}`} className="fig-svg" role="img" aria-label={label}>
    {children}
  </svg>
);

/* ---------- Surrogate vs FE ---------- */
const FE_MODES: Mode[] = [
  { f: 180, a: 1 },
  { f: 640, a: 0.7 },
  { f: 1350, a: 0.5 },
  { f: 2300, a: 0.4 },
];
const NN_MODES: Mode[] = FE_MODES.map((m, i) => ({ f: m.f * (1 + (i % 2 ? -0.012 : 0.015)), a: m.a * 0.96 }));

const SurrogateFigure: React.FC = () => {
  const m = { l: 40, r: 20, t: 64, b: 44 };
  const fMin = 50;
  const fMax = 3000;
  const x = (f: number) =>
    m.l + ((Math.log10(f) - Math.log10(fMin)) / (Math.log10(fMax) - Math.log10(fMin))) * (W - m.l - m.r);
  const y = (db: number) => m.t + ((40 - Math.max(-30, Math.min(40, db))) / 70) * (H - m.t - m.b);
  const fs = logSpace(fMin, fMax, 300);
  const line = (modes: Mode[], z: number) =>
    fs.map((f, i) => `${i ? "L" : "M"}${x(f).toFixed(1)},${y(frfDb(f, z, modes)).toFixed(1)}`).join("");
  const samples = logSpace(70, 2800, 13);

  return (
    <Svg label="Two nearly identical frequency response curves: the finite-element reference and the neural surrogate prediction.">
      <g className="fig-grid">
        {[-20, 0, 20].map((d) => (
          <line key={d} x1={m.l} x2={W - m.r} y1={y(d)} y2={y(d)} />
        ))}
        {[100, 1000].map((f) => (
          <line key={f} x1={x(f)} x2={x(f)} y1={m.t} y2={H - m.b} />
        ))}
      </g>
      <line className="fig-axis" x1={m.l} x2={W - m.r} y1={H - m.b} y2={H - m.b} />
      <g className="fig-text">
        <text x={x(100)} y={H - m.b + 22} textAnchor="middle">100 Hz</text>
        <text x={x(1000)} y={H - m.b + 22} textAnchor="middle">1 kHz</text>
      </g>
      <path className="fig-ink" d={line(FE_MODES, 0.03)} />
      <path className="fig-accent fig-dashed" d={line(NN_MODES, 0.032)} />
      {samples.map((f) => (
        <circle key={f} className="fig-node" cx={x(f)} cy={y(frfDb(f, 0.03, FE_MODES))} r={3.2} />
      ))}
      <g className="fig-text fig-label" transform="translate(40, 30)">
        <line className="fig-ink" x1={0} x2={26} y1={-4} y2={-4} />
        <text x={34} y={0}>NASTRAN reference</text>
        <line className="fig-accent fig-dashed" x1={190} x2={216} y1={-4} y2={-4} />
        <text x={224} y={0}>Neural surrogate</text>
        <circle className="fig-node" cx={378} cy={-4} r={3.2} />
        <text x={388} y={0}>Training samples</text>
      </g>
    </Svg>
  );
};

/* ---------- PMSM stator, tangential r = 0 ---------- */
const StatorFigure: React.FC = () => {
  const cx = 404;
  const cy = 200;
  const slots = 48;
  const arrows = 12;
  const rad = (d: number) => (d * Math.PI) / 180;
  const pt = (r: number, a: number) => [cx + r * Math.cos(rad(a)), cy + r * Math.sin(rad(a))];
  const arc = (r: number, a0: number, a1: number) => {
    const [x0, y0] = pt(r, a0);
    const [x1, y1] = pt(r, a1);
    return `M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 0 1 ${x1.toFixed(1)},${y1.toFixed(1)}`;
  };

  return (
    <Svg label="Cross-section of an electric motor stator and rotor, with arrows around the housing showing a uniform tangential force wave of order zero.">
      <circle className="fig-thin" cx={cx} cy={cy} r={160} />
      <circle className="fig-ink" cx={cx} cy={cy} r={146} />
      <circle className="fig-ink" cx={cx} cy={cy} r={104} />
      {Array.from({ length: slots }, (_, i) => {
        const a = (360 / slots) * i;
        const [x0, y0] = pt(106, a);
        const [x1, y1] = pt(126, a);
        return <line key={i} className="fig-thin" x1={x0} y1={y0} x2={x1} y2={y1} />;
      })}
      <circle className="fig-thin" cx={cx} cy={cy} r={126} />
      <circle className="fig-ink" cx={cx} cy={cy} r={97} />
      {Array.from({ length: 8 }, (_, i) => {
        const a = 45 * i + 22.5;
        const [px, py] = pt(84, a);
        return (
          <rect
            key={i}
            className="fig-fill"
            x={px - 14}
            y={py - 4}
            width={28}
            height={8}
            transform={`rotate(${a + 90} ${px} ${py})`}
          />
        );
      })}
      <circle className="fig-ink" cx={cx} cy={cy} r={20} />
      {Array.from({ length: arrows }, (_, i) => {
        const a0 = (360 / arrows) * i + 6;
        const a1 = a0 + 18;
        const [hx, hy] = pt(176, a1);
        const tangent = a1 + 90;
        return (
          <g key={i}>
            <path className="fig-accent" d={arc(176, a0, a1)} />
            <path
              className="fig-accent-fill"
              d="M0,0 L-8,-4 L-8,4 Z"
              transform={`translate(${hx.toFixed(1)} ${hy.toFixed(1)}) rotate(${tangent})`}
            />
          </g>
        );
      })}
      <g className="fig-text fig-label">
        <text x={24} y={40}>Housing</text>
        <text x={24} y={58}>Stator, 48 slots</text>
        <text x={24} y={76}>Rotor, 8 poles</text>
        <text className="fig-accent-text" x={24} y={344}>
          Tangential force, r = 0
        </text>
        <text x={24} y={362}>
          Same direction at every tooth
        </text>
      </g>
    </Svg>
  );
};

/* ---------- Airborne acoustics ---------- */
const AcousticsFigure: React.FC = () => {
  const sx = 320;
  const sy = 318;
  const mics = 13;
  const rMic = 230;
  const rad = (d: number) => (d * Math.PI) / 180;
  const mic = (i: number) => {
    const a = 180 + (180 / (mics - 1)) * i;
    return [sx + rMic * Math.cos(rad(a)), sy + rMic * Math.sin(rad(a))];
  };

  return (
    <Svg label="A sensor housing emitting sound waves towards a half-circle of microphones.">
      <line className="fig-axis" x1={40} x2={W - 40} y1={sy + 34} y2={sy + 34} />
      {[60, 110, 160].map((r, i) => (
        <path
          key={r}
          className="fig-thin"
          style={{ opacity: 1 - i * 0.25 }}
          d={`M${sx - r},${sy} A${r},${r} 0 0 1 ${sx + r},${sy}`}
        />
      ))}
      <path
        className="fig-thin fig-dashed"
        d={`M${sx - rMic},${sy} A${rMic},${rMic} 0 0 1 ${sx + rMic},${sy}`}
      />
      {[3, 8].map((i) => {
        const [mx, my] = mic(i);
        return <line key={i} className="fig-accent fig-dashed" x1={sx} y1={sy - 18} x2={mx} y2={my} />;
      })}
      {Array.from({ length: mics }, (_, i) => {
        const [mx, my] = mic(i);
        return <circle key={i} className="fig-node" cx={mx} cy={my} r={5} />;
      })}
      <rect className="fig-ink" x={sx - 46} y={sy - 18} width={92} height={52} rx={6} />
      <rect className="fig-thin" x={sx - 30} y={sy - 8} width={60} height={20} rx={3} />
      <circle className="fig-accent-fill" cx={sx} cy={sy - 18} r={5} />
      <g className="fig-text fig-label">
        <text x={sx} y={sy + 58} textAnchor="middle">Sensor housing</text>
        <text x={W - 34} y={56} textAnchor="end">Microphone array</text>
        <text className="fig-accent-text" x={34} y={56}>Ray paths</text>
      </g>
    </Svg>
  );
};

/* ---------- Agentic FEA pipeline ---------- */
const PipelineFigure: React.FC = () => {
  const steps = ["CAD", "Mesh", "BCs", "Solve", "Report"];
  const bw = 96;
  const gap = (W - 48 - steps.length * bw) / (steps.length - 1);
  const bx = (i: number) => 24 + i * (bw + gap);
  const by = 190;

  return (
    <Svg label="A five-step pipeline from CAD to mesh, boundary conditions, solve and report, coordinated by an agent.">
      <rect className="fig-accent" x={24} y={70} width={W - 48} height={44} rx={22} />
      <text className="fig-text fig-accent-text" x={W / 2} y={97} textAnchor="middle">
        Agent · PyMechanical
      </text>
      {steps.map((s, i) => (
        <g key={s}>
          <line className="fig-thin fig-dashed" x1={bx(i) + bw / 2} x2={bx(i) + bw / 2} y1={114} y2={by} />
          <rect className="fig-ink" x={bx(i)} y={by} width={bw} height={56} rx={4} />
          <text className="fig-text fig-strong" x={bx(i) + bw / 2} y={by + 33} textAnchor="middle">
            {s}
          </text>
          {i < steps.length - 1 && (
            <g>
              <line className="fig-ink" x1={bx(i) + bw + 6} x2={bx(i + 1) - 8} y1={by + 28} y2={by + 28} />
              <path
                className="fig-ink-fill"
                d={`M${bx(i + 1) - 6},${by + 28} l-7,-4 v8 Z`}
              />
            </g>
          )}
        </g>
      ))}
      <path
        className="fig-accent"
        d={`M${bx(3) + 8},${by + 110} q11,-26 22,0 t22,0 t22,0 t22,0`}
      />
      <text className="fig-text fig-label" x={bx(3) + bw / 2} y={by + 150} textAnchor="middle">
        Mode shapes
      </text>
      <g className="fig-text fig-label">
        {["STEP", "IGES"].map((t, i) => (
          <text key={t} x={bx(0) + bw / 2} y={by + 96 + i * 18} textAnchor="middle">
            {t}
          </text>
        ))}
        <text x={bx(4) + bw / 2} y={by + 96} textAnchor="middle">f₁ … fₙ</text>
      </g>
    </Svg>
  );
};

/* ---------- Touchless robotics ---------- */
const RobotFigure: React.FC = () => {
  const base = [470, 330];
  const j1 = [470, 230];
  const j2 = [380, 150];
  const tip = [300, 190];

  return (
    <Svg label="A camera and a voice waveform feed an intent model that drives a robot arm.">
      <rect className="fig-ink" x={40} y={70} width={70} height={46} rx={6} />
      <circle className="fig-ink" cx={75} cy={93} r={12} />
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          className="fig-thin"
          style={{ opacity: 1 - i * 0.28 }}
          d={`M${126 + i * 16},${70} q12,23 0,46`}
        />
      ))}
      <g>
        {[10, 26, 40, 22, 34, 14, 28, 18, 8].map((h, i) => (
          <line
            key={i}
            className="fig-ink"
            x1={44 + i * 8}
            x2={44 + i * 8}
            y1={290 - h / 2}
            y2={290 + h / 2}
            strokeLinecap="round"
          />
        ))}
      </g>
      <path className="fig-thin fig-dashed" d="M180,93 C 210,93 200,190 236,190" />
      <path className="fig-thin fig-dashed" d="M130,290 C 200,290 200,214 236,214" />
      <rect className="fig-accent" x={236} y={176} width={30} height={52} rx={15} />
      <path className="fig-accent fig-dashed" d="M266,202 C 280,202 282,196 292,193" />

      <line className="fig-axis" x1={400} x2={560} y1={354} y2={354} />
      <path className="fig-ink" d={`M${base[0] - 40},354 L${base[0] - 26},${base[1]} L${base[0] + 26},${base[1]} L${base[0] + 40},354`} />
      <line className="fig-link" x1={base[0]} y1={base[1]} x2={j1[0]} y2={j1[1]} />
      <line className="fig-link" x1={j1[0]} y1={j1[1]} x2={j2[0]} y2={j2[1]} />
      <line className="fig-link" x1={j2[0]} y1={j2[1]} x2={tip[0]} y2={tip[1]} />
      {[j1, j2].map(([x, y]) => (
        <circle key={`${x}-${y}`} className="fig-joint" cx={x} cy={y} r={9} />
      ))}
      <path className="fig-ink" d={`M${tip[0] + 4},${tip[1] - 12} l-14,4 M${tip[0] - 4},${tip[1] + 12} l-14,-2`} />

      <g className="fig-text fig-label">
        <text x={40} y={56}>Vision</text>
        <text x={40} y={262}>Voice</text>
        <text className="fig-accent-text" x={251} y={252} textAnchor="middle">Intent</text>
        <text x={560} y={150} textAnchor="end">Sterile field,</text>
        <text x={560} y={168} textAnchor="end">no contact</text>
      </g>
    </Svg>
  );
};

export const ProjectFigure: React.FC<{ kind: FigureKind; alt: string }> = ({ kind, alt }) => {
  switch (kind) {
    case "surrogate":
      return <SurrogateFigure />;
    case "stator":
      return <StatorFigure />;
    case "acoustics":
      return <AcousticsFigure />;
    case "pipeline":
      return <PipelineFigure />;
    case "robot":
      return <RobotFigure />;
    case "topology":
      return (
        <img
          className="fig-img"
          src="/images/work-topology-cantilever.webp"
          alt={alt}
          width={1800}
          height={900}
          loading="lazy"
        />
      );
  }
};

export default ProjectFigure;
