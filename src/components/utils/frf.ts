// Driving-point receptance of an N-mode structure:
// H(f) = Σ A_i / (1 − r_i² + 2iζ r_i),  r_i = f / f_i
export interface Mode {
  f: number;
  a: number;
}

export const DEFAULT_MODES: Mode[] = [
  { f: 128, a: 1 },
  { f: 492, a: 0.6 },
  { f: 1248, a: 0.45 },
  { f: 2415, a: 0.35 },
];

export const frfDb = (f: number, zeta: number, modes: Mode[] = DEFAULT_MODES) => {
  let re = 0;
  let im = 0;
  for (const m of modes) {
    const r = f / m.f;
    const dr = 1 - r * r;
    const di = 2 * zeta * r;
    const den = dr * dr + di * di;
    re += (m.a * dr) / den;
    im += (-m.a * di) / den;
  }
  return 20 * Math.log10(Math.max(Math.hypot(re, im), 1e-6));
};

export const logSpace = (min: number, max: number, n: number) => {
  const a = Math.log10(min);
  const b = Math.log10(max);
  return Array.from({ length: n }, (_, i) => 10 ** (a + ((b - a) * i) / (n - 1)));
};
