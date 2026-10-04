import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// A clamped membrane, solved live with an explicit finite-difference scheme of the 2D wave equation:
//   u_next = (2u − u_prev + c²·∇²u) · damping
// The pointer injects Gaussian impulses; the result is drawn as an FE-style mesh of nodes and edges.

const NX = 150;
const NY = 96;
const SX = 24; // plate size in world units
const SZ = 15.4;
const C2 = 0.22; // Courant number squared (stable below 0.5)
const DAMP = 0.9935;

const vert = /* glsl */ `
  attribute float aDisp;
  uniform float uAmp;
  uniform float uSize;
  uniform float uPR;
  uniform vec2 uPlate;
  uniform vec2 uFog;
  varying float vHeat;
  varying float vFade;
  void main() {
    vec3 p = position;
    p.y += aDisp * uAmp;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float depth = -mv.z;
    vHeat = clamp(abs(aDisp) * 1.8, 0.0, 1.0);
    vec2 uv = position.xz / uPlate + 0.5;
    float edge = smoothstep(0.0, 0.1, uv.x) * smoothstep(1.0, 0.9, uv.x) * smoothstep(0.0, 0.22, uv.y);
    vFade = edge * (1.0 - smoothstep(uFog.x, uFog.y, depth));
    gl_PointSize = uSize * uPR * (1.0 + vHeat * 1.6) * (16.0 / depth);
  }
`;

const pointFrag = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uHot;
  uniform float uOpacity;
  varying float vHeat;
  varying float vFade;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.05, d);
    vec3 col = mix(uBase, uHot, smoothstep(0.04, 0.6, vHeat));
    gl_FragColor = vec4(col, a * vFade * uOpacity * (0.7 + 0.3 * vHeat));
  }
`;

const lineFrag = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uHot;
  uniform float uOpacity;
  varying float vHeat;
  varying float vFade;
  void main() {
    vec3 col = mix(uBase, uHot, smoothstep(0.04, 0.6, vHeat));
    gl_FragColor = vec4(col, vFade * uOpacity * (0.26 + 0.6 * vHeat));
  }
`;

const readTheme = () => {
  const cs = getComputedStyle(document.documentElement);
  const get = (name: string, fallback: string) => cs.getPropertyValue(name).trim() || fallback;
  return {
    base: new THREE.Color(get("--mesh-base", "#77736b")),
    hot: new THREE.Color(get("--mesh-hot", "#ff6b2c")),
    additive: get("--mesh-blend", "additive") === "additive",
  };
};

interface Props {
  hudRef?: React.RefObject<HTMLElement>;
}

const HeroMesh: React.FC<Props> = ({ hudRef }) => {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // No WebGL: the hero simply shows without the mesh.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    const lookAt = new THREE.Vector3(0, 0, -1.5);

    // ----- Simulation state -----
    const N = NX * NY;
    let u = new Float32Array(N);
    let uPrev = new Float32Array(N);
    let uNext = new Float32Array(N);

    const positions = new Float32Array(N * 3);
    for (let j = 0; j < NY; j++) {
      for (let i = 0; i < NX; i++) {
        const k = (j * NX + i) * 3;
        positions[k] = (i / (NX - 1) - 0.5) * SX;
        positions[k + 2] = (j / (NY - 1) - 0.5) * SZ;
      }
    }
    const posAttr = new THREE.BufferAttribute(positions, 3);
    const dispAttr = new THREE.BufferAttribute(new Float32Array(N), 1);
    dispAttr.setUsage(THREE.DynamicDrawUsage);

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", posAttr);
    pointsGeo.setAttribute("aDisp", dispAttr);

    const edges: number[] = [];
    for (let j = 0; j < NY; j++) {
      for (let i = 0; i < NX; i++) {
        const k = j * NX + i;
        if (i < NX - 1) edges.push(k, k + 1);
        if (j < NY - 1) edges.push(k, k + NX);
      }
    }
    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute("position", posAttr);
    linesGeo.setAttribute("aDisp", dispAttr);
    linesGeo.setIndex(edges);

    const theme = readTheme();
    const uniforms = {
      uAmp: { value: 0.7 },
      uSize: { value: 2.2 },
      uFog: { value: new THREE.Vector2(17, 30) },
      uPR: { value: renderer.getPixelRatio() },
      uPlate: { value: new THREE.Vector2(SX, SZ) },
      uBase: { value: theme.base },
      uHot: { value: theme.hot },
      uOpacity: { value: 1 },
    };
    const blending = (additive: boolean) => (additive ? THREE.AdditiveBlending : THREE.NormalBlending);
    const pointsMat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vert,
      fragmentShader: pointFrag,
      transparent: true,
      depthWrite: false,
      blending: blending(theme.additive),
    });
    const linesMat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vert,
      fragmentShader: lineFrag,
      transparent: true,
      depthWrite: false,
      blending: blending(theme.additive),
    });
    scene.add(new THREE.LineSegments(linesGeo, linesMat));
    scene.add(new THREE.Points(pointsGeo, pointsMat));

    // ----- Physics -----
    const step = () => {
      for (let j = 1; j < NY - 1; j++) {
        const row = j * NX;
        for (let i = 1; i < NX - 1; i++) {
          const k = row + i;
          const lap = u[k - 1] + u[k + 1] + u[k - NX] + u[k + NX] - 4 * u[k];
          uNext[k] = (2 * u[k] - uPrev[k] + C2 * lap) * DAMP;
        }
      }
      const t = uPrev;
      uPrev = u;
      u = uNext;
      uNext = t;
    };

    const strike = (gx: number, gy: number, amp: number, radius: number) => {
      const r = Math.ceil(radius * 2.2);
      const ci = Math.round(gx);
      const cj = Math.round(gy);
      const r2 = radius * radius;
      for (let j = Math.max(1, cj - r); j <= Math.min(NY - 2, cj + r); j++) {
        for (let i = Math.max(1, ci - r); i <= Math.min(NX - 2, ci + r); i++) {
          const d2 = (i - gx) * (i - gx) + (j - gy) * (j - gy);
          // Displace both time levels: a pure displacement pulse, no injected velocity.
          const w = amp * Math.exp(-d2 / r2);
          u[j * NX + i] += w;
          uPrev[j * NX + i] += w;
        }
      }
    };

    // ----- Pointer → grid coordinates via a ray cast onto the plate -----
    const ray = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const hit = new THREE.Vector3();
    const ndc = new THREE.Vector2();
    const parallax = { x: 0, tx: 0 };
    let pointer: { gx: number; gy: number } | null = null;
    let last: { gx: number; gy: number } | null = null;
    let lastActivity = 0;

    const toGrid = (clientX: number, clientY: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (clientY < rect.top || clientY > rect.bottom) return null;
      ndc.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
      parallax.tx = ndc.x;
      ray.setFromCamera(ndc, camera);
      if (!ray.ray.intersectPlane(plane, hit)) return null;
      const gx = (hit.x / SX + 0.5) * (NX - 1);
      const gy = (hit.z / SZ + 0.5) * (NY - 1);
      if (gx < 1 || gx > NX - 2 || gy < 1 || gy > NY - 2) return null;
      return { gx, gy };
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer = toGrid(e.clientX, e.clientY);
      lastActivity = performance.now();
    };
    const onDown = (e: PointerEvent) => {
      const g = toGrid(e.clientX, e.clientY);
      if (!g) return;
      strike(g.gx, g.gy, 1.5, 3.2);
      lastActivity = performance.now();
    };
    const onLeave = () => {
      pointer = null;
      last = null;
    };

    // ----- Sizing -----
    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      const aspect = w / h;
      camera.aspect = aspect;
      // Narrow screens: widen the lens so the plate still reads as a surface.
      camera.fov = aspect < 1 ? 52 : 34;
      camera.position.set(0, aspect < 1 ? 11 : 9.5, aspect < 1 ? 19 : 17);
      camera.updateProjectionMatrix();
    };
    resize();

    const render = () => {
      camera.position.x = parallax.x * 1.2;
      camera.lookAt(lookAt);
      dispAttr.copyArray(u);
      dispAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };

    // ----- Loop -----
    let raf = 0;
    let running = false;
    let frame = 0;
    let nextDrop = 0;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      frame++;

      // Trail the pointer, stamping impulses along the path so fast moves stay continuous.
      if (pointer) {
        if (last) {
          const dx = pointer.gx - last.gx;
          const dy = pointer.gy - last.gy;
          const dist = Math.hypot(dx, dy);
          if (dist > 0.05 && dist < 20) {
            const stamps = Math.min(8, Math.ceil(dist / 1.5));
            const amp = Math.min(0.8, dist * 0.16) / stamps;
            for (let s = 1; s <= stamps; s++) {
              strike(last.gx + (dx * s) / stamps, last.gy + (dy * s) / stamps, amp, 2.4);
            }
          }
        }
        last = { ...pointer };
      }

      // Left alone, the plate is struck now and then at random, like raindrops.
      if (now - lastActivity > 2200 && now > nextDrop) {
        strike(10 + Math.random() * (NX - 20), 8 + Math.random() * (NY - 16), 0.9 + Math.random() * 0.5, 2.8);
        nextDrop = now + 900 + Math.random() * 1400;
      }

      step();
      step();

      parallax.x += (parallax.tx - parallax.x) * 0.04;
      render();

      if (hudRef?.current && frame % 8 === 0) {
        let peak = 0;
        for (let k = 0; k < N; k++) {
          const a = Math.abs(u[k]);
          if (a > peak) peak = a;
        }
        hudRef.current.textContent = (peak * 1.25).toFixed(3);
      }
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    if (reduced) {
      // Still frame of a (3,2) plate mode instead of animation.
      for (let j = 0; j < NY; j++) {
        for (let i = 0; i < NX; i++) {
          u[j * NX + i] = 0.55 * Math.sin((3 * Math.PI * i) / (NX - 1)) * Math.sin((2 * Math.PI * j) / (NY - 1));
        }
      }
      render();
    } else {
      strike(NX * 0.66, NY * 0.6, 1.6, 3.5);
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }

    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(host);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    const ro = new ResizeObserver(() => {
      resize();
      if (!running) render();
    });
    ro.observe(host);

    const themeObserver = new MutationObserver(() => {
      const t = readTheme();
      uniforms.uBase.value = t.base;
      uniforms.uHot.value = t.hot;
      pointsMat.blending = linesMat.blending = blending(t.additive);
      pointsMat.needsUpdate = linesMat.needsUpdate = true;
      if (!running) render();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    requestAnimationFrame(() => host.classList.add("is-ready"));

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      pointsGeo.dispose();
      linesGeo.dispose();
      pointsMat.dispose();
      linesMat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [hudRef]);

  return <div className="hero-mesh" ref={hostRef} aria-hidden="true" />;
};

export default HeroMesh;
