import { useEffect } from "react";
import { gsap, ScrollTrigger, hasFinePointer, prefersReducedMotion } from "./motion";

// Attribute-driven behaviours shared across sections:
//   data-magnetic="0.3"  element leans towards the pointer
//   data-tilt="6"        3D tilt following the pointer
//   .spot                exposes --mx / --my for cursor-following glows
//   data-speed="12"      parallax drift while scrolling
//   data-scrub           words brighten one by one as the block scrolls through
export const useInteractions = () => {
  useEffect(() => {
    const reduced = prefersReducedMotion();
    const fine = hasFinePointer();
    const cleanups: (() => void)[] = [];
    const on = <K extends keyof HTMLElementEventMap>(
      el: HTMLElement,
      type: K,
      fn: (e: HTMLElementEventMap[K]) => void
    ) => {
      el.addEventListener(type, fn);
      cleanups.push(() => el.removeEventListener(type, fn));
    };

    if (fine && !reduced) {
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const strength = parseFloat(el.dataset.magnetic || "") || 0.3;
        const xTo = gsap.quickTo(el, "x", { duration: 0.9, ease: "elastic.out(1, 0.35)" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.9, ease: "elastic.out(1, 0.35)" });
        on(el, "pointermove", (e) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * strength);
          yTo((e.clientY - (r.top + r.height / 2)) * strength);
        });
        on(el, "pointerleave", () => {
          xTo(0);
          yTo(0);
        });
        cleanups.push(() => gsap.set(el, { clearProps: "x,y" }));
      });

      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
        const max = parseFloat(el.dataset.tilt || "") || 6;
        gsap.set(el, { transformPerspective: 1100 });
        const rx = gsap.quickTo(el, "rotationX", { duration: 0.7, ease: "power3.out" });
        const ry = gsap.quickTo(el, "rotationY", { duration: 0.7, ease: "power3.out" });
        on(el, "pointermove", (e) => {
          const r = el.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * max);
          rx(-((e.clientY - r.top) / r.height - 0.5) * max);
        });
        on(el, "pointerleave", () => {
          rx(0);
          ry(0);
        });
        cleanups.push(() => gsap.set(el, { clearProps: "transform" }));
      });
    }

    if (fine) {
      const spots = Array.from(document.querySelectorAll<HTMLElement>(".spot"));
      let px = -9999;
      let py = -9999;
      let raf = 0;
      const update = () => {
        raf = 0;
        for (const el of spots) {
          const r = el.getBoundingClientRect();
          if (r.bottom < -200 || r.top > window.innerHeight + 200) continue;
          el.style.setProperty("--mx", `${px - r.left}px`);
          el.style.setProperty("--my", `${py - r.top}px`);
        }
      };
      const queue = () => {
        if (!raf) raf = requestAnimationFrame(update);
      };
      const onMove = (e: PointerEvent) => {
        px = e.clientX;
        py = e.clientY;
        queue();
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("scroll", queue, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("scroll", queue);
        cancelAnimationFrame(raf);
      });
    }

    const ctx = gsap.context(() => {
      gsap.to(".scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });

      if (reduced) return;

      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
        const s = parseFloat(el.dataset.speed || "10");
        gsap.fromTo(
          el,
          { yPercent: -s },
          {
            yPercent: s,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-scrub]").forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll(".wi"),
          { opacity: 0.16 },
          {
            opacity: 1,
            stagger: 0.06,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 55%", scrub: true },
          }
        );
      });
    });

    // Late-loading fonts and images shift layout, so re-measure trigger positions.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, []);
};
