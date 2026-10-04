// Hands off from the preloader to the hero entrance animation.
type Listener = () => void;

let started = false;
const listeners = new Set<Listener>();

export const onIntro = (fn: Listener) => {
  if (started) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
};

export const startIntro = () => {
  if (started) return;
  started = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
};
