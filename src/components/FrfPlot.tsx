import React, { useMemo, useRef, useState } from "react";
import { DEFAULT_MODES, frfDb, logSpace } from "./utils/frf";

const W = 720;
const H = 380;
const M = { l: 48, r: 14, t: 30, b: 36 };
const F_MIN = 20;
const F_MAX = 4000;
const DB_MIN = -40;
const DB_MAX = 45;

const xOf = (f: number) =>
  M.l +
  ((Math.log10(f) - Math.log10(F_MIN)) / (Math.log10(F_MAX) - Math.log10(F_MIN))) * (W - M.l - M.r);
const fOf = (x: number) =>
  10 **
  (Math.log10(F_MIN) +
    ((x - M.l) / (W - M.l - M.r)) * (Math.log10(F_MAX) - Math.log10(F_MIN)));
const yOf = (db: number) => {
  const c = Math.min(DB_MAX, Math.max(DB_MIN, db));
  return M.t + ((DB_MAX - c) / (DB_MAX - DB_MIN)) * (H - M.t - M.b);
};

const freqs = logSpace(F_MIN, F_MAX, 420);
const decadeTicks = [100, 1000];
const minorTicks = [20, 30, 40, 50, 60, 70, 80, 90, 200, 300, 400, 500, 600, 700, 800, 900, 2000, 3000, 4000];
const dbTicks = [-40, -20, 0, 20, 40];
const subscripts = ["₁", "₂", "₃", "₄"];

const fmtHz = (f: number) => (f >= 1000 ? `${(f / 1000).toFixed(2)} kHz` : `${Math.round(f)} Hz`);

const FrfPlot: React.FC = () => {
  const [zeta, setZeta] = useState(0.02);
  const [hoverF, setHoverF] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const path = useMemo(
    () =>
      freqs
        .map((f, i) => `${i === 0 ? "M" : "L"}${xOf(f).toFixed(1)},${yOf(frfDb(f, zeta)).toFixed(1)}`)
        .join(""),
    [zeta]
  );

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    if (x < M.l || x > W - M.r) {
      setHoverF(null);
      return;
    }
    setHoverF(fOf(x));
  };

  const hoverDb = hoverF !== null ? frfDb(hoverF, zeta) : 0;
  const hx = hoverF !== null ? xOf(hoverF) : 0;
  const hy = yOf(hoverDb);
  const labelLeft = hx > W * 0.7;

  return (
    <div className="frf">
      <div className="frf-plot">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="frf-svg"
        role="img"
        aria-label={`Frequency response of a structure with four modes at 128, 492, 1248 and 2415 hertz, at ${(zeta * 100).toFixed(1)} percent damping.`}
        onPointerMove={onMove}
        onPointerLeave={() => setHoverF(null)}
      >
        {/* grid */}
        <g className="frf-grid">
          {dbTicks.map((d) => (
            <line key={d} x1={M.l} x2={W - M.r} y1={yOf(d)} y2={yOf(d)} />
          ))}
          {decadeTicks.map((f) => (
            <line key={f} x1={xOf(f)} x2={xOf(f)} y1={M.t} y2={H - M.b} />
          ))}
        </g>
        <g className="frf-axis">
          <line x1={M.l} x2={W - M.r} y1={H - M.b} y2={H - M.b} />
          {minorTicks.map((f) => (
            <line key={f} x1={xOf(f)} x2={xOf(f)} y1={H - M.b} y2={H - M.b + 4} />
          ))}
          {decadeTicks.map((f) => (
            <line key={f} x1={xOf(f)} x2={xOf(f)} y1={H - M.b} y2={H - M.b + 7} />
          ))}
        </g>
        <g className="frf-labels">
          {[20, 100, 1000, 4000].map((f) => (
            <text key={f} x={xOf(f)} y={H - M.b + 22} textAnchor={f === 4000 ? "end" : f === 20 ? "start" : "middle"}>
              {f >= 1000 ? `${f / 1000}k` : f}
            </text>
          ))}
          {dbTicks.map((d) => (
            <text key={d} x={M.l - 10} y={yOf(d) + 4} textAnchor="end">
              {d}
            </text>
          ))}
          <text x={M.l} y={14} textAnchor="start">
            |H| [dB]
          </text>
          <text x={W - M.r} y={14} textAnchor="end">
            frequency [Hz]
          </text>
        </g>

        {/* response */}
        <defs>
          <linearGradient id="frf-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--accent)", stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        <path d={`${path}L${W - M.r},${H - M.b}L${M.l},${H - M.b}Z`} className="frf-area" />
        <path d={path} className="frf-glow" pathLength={1} />
        <path d={path} className="frf-line" pathLength={1} />

        {/* mode markers */}
        <g className="frf-modes">
          {DEFAULT_MODES.map((m, i) => {
            const x = xOf(m.f);
            const y = yOf(frfDb(m.f, zeta));
            return (
              <g key={m.f}>
                <circle cx={x} cy={y} r={3.5} />
                <text x={x} y={Math.max(y - 12, M.t - 4)} textAnchor="middle">
                  f{subscripts[i]}
                </text>
              </g>
            );
          })}
        </g>

        {/* hover readout */}
        {hoverF !== null && (
          <g className="frf-hover">
            <line x1={hx} x2={hx} y1={M.t} y2={H - M.b} />
            <circle cx={hx} cy={hy} r={4} />
          </g>
        )}
      </svg>
      {hoverF !== null && (
        <div
          className={`frf-readout ${labelLeft ? "is-left" : ""}`}
          style={{ left: `${(hx / W) * 100}%`, top: `${((M.t + 4) / H) * 100}%` }}
          aria-hidden="true"
        >
          {fmtHz(hoverF)} · {hoverDb.toFixed(1)} dB
        </div>
      )}
      </div>

      <div className="frf-control">
        <label htmlFor="zeta">
          Damping <span className="frf-zeta">ζ</span>
        </label>
        <input
          id="zeta"
          type="range"
          min={0.005}
          max={0.08}
          step={0.0025}
          value={zeta}
          onChange={(e) => setZeta(parseFloat(e.target.value))}
          style={{ ["--p" as string]: `${((zeta - 0.005) / 0.075) * 100}%` }}
        />
        <output htmlFor="zeta">{(zeta * 100).toFixed(1)}%</output>
      </div>
    </div>
  );
};

export default FrfPlot;
