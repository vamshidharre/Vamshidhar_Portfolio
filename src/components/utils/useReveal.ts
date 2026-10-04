import { useEffect } from "react";

// Adds `is-visible` to every `.reveal` / `.reveal-split` element once it scrolls into view.
export const useReveal = () => {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal, .reveal-split"));
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};
