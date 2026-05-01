// Lightweight analytics shim. Wire up to Plausible / Umami later.
export function track(event, props = {}) {
  if (typeof window === "undefined") return;
  if (window.plausible) window.plausible(event, { props });
}
