// Geometry helpers for the tree scene. Filled in when we build the canvas.

export function polar(cx, cy, angleDeg, length) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + Math.cos(rad) * length, y: cy + Math.sin(rad) * length };
}

export function bez1d(p0, p1, p2, p3, t) {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
}

export function bezPoint(p0, p1, p2, p3, t) {
  return {
    x: bez1d(p0.x, p1.x, p2.x, p3.x, t),
    y: bez1d(p0.y, p1.y, p2.y, p3.y, t),
  };
}
