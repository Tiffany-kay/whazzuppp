import * as THREE from "three";

/* ------------------------------------------------------------
   2D viewBox (1000 x 1400) → 3D world coordinates.
   - trunk base at world (0, 0, 0)
   - +Y is up (toward canopy), -Y is underground (roots)
   - +Z is toward camera (front of scene)
   ------------------------------------------------------------ */

export const TRUNK_BASE = new THREE.Vector3(0, 0, 0);
export const TRUNK_TOP_Y = 4.0;

const ORIGIN_2D = { x: 500, y: 905 };
const SCALE_X = 0.012;
const SCALE_Y = 0.0055;

export function fruitPosition(pos2d, depthSeed = 0) {
  const x = (pos2d.x - ORIGIN_2D.x) * SCALE_X;
  const y = (ORIGIN_2D.y - pos2d.y) * SCALE_Y;
  // pushed forward in Z so fruits sit in front of the foliage canopy
  const z = 0.85 + Math.sin(depthSeed * 1.7) * 0.35;
  return new THREE.Vector3(x, y, z);
}

export function branchAttachPoint(fruitPos) {
  const t = THREE.MathUtils.clamp((fruitPos.y - 0.4) / TRUNK_TOP_Y, 0.15, 0.85);
  return new THREE.Vector3(0, t * TRUNK_TOP_Y, 0);
}

/* ------------------------------------------------------------
   FRUIT PALETTE — same hues as the 2D spec, made to glow as
   physical-light emissive in three.js.
   ------------------------------------------------------------ */

export const FRUIT_PALETTE = {
  amber: { body: "#ffb84a", emissive: "#ffd97a", halo: "#ffe7a8" },
  coral: { body: "#ff8a6e", emissive: "#ffa890", halo: "#ffd0c2" },
  rose: { body: "#ff6b8a", emissive: "#ff9eb4", halo: "#ffc8d4" },
  teal: { body: "#5ad4c0", emissive: "#8eebd8", halo: "#c4f5ea" },
  violet: { body: "#b87aff", emissive: "#d4a8ff", halo: "#e9d3ff" },
};

export function fruitColors(hue) {
  return FRUIT_PALETTE[hue] || FRUIT_PALETTE.amber;
}

/* ------------------------------------------------------------
   ROOT GEOMETRY — main + 3 forks. Angles (degrees) are around
   the Y axis, with 0 = forward (+Z), negative = -X side.
   Each root plunges downward as it spreads outward.
   ------------------------------------------------------------ */

export function rootEndpoint(angleDeg, length = 2.7) {
  const rad = (angleDeg * Math.PI) / 180;
  return new THREE.Vector3(
    Math.sin(rad) * length * 0.95,
    -length * 0.55,
    Math.cos(rad) * length * 0.5 - 0.2
  );
}

export function buildRoot(angleDeg) {
  const start = new THREE.Vector3(0, -0.05, 0);
  const end = rootEndpoint(angleDeg, 2.7);
  const mid1 = start.clone().lerp(end, 0.33);
  mid1.y -= 0.15;
  mid1.x += Math.sin(angleDeg * 0.07) * 0.08;
  const mid2 = start.clone().lerp(end, 0.66);
  mid2.y -= 0.05;
  mid2.x += Math.sin(angleDeg * 0.11) * 0.06;
  const main = new THREE.CatmullRomCurve3([start, mid1, mid2, end]);

  const forks = [
    forkFrom(main, 0.55, angleDeg + 28, 0.95, 0.7),
    forkFrom(main, 0.55, angleDeg - 22, 0.78, 0.65),
    forkFrom(main, 0.30, angleDeg + 42, 0.5, 0.45),
  ];

  const tip = main.getPointAt(1);
  return { main, forks, tip };
}

function forkFrom(mainCurve, t, forkAngleDeg, lengthScale, depthScale) {
  const origin = mainCurve.getPointAt(t);
  const baseEnd = rootEndpoint(forkAngleDeg, 2.7 * lengthScale);
  // bias the fork end toward the parent direction so it reads as a sub-branch
  const end = origin.clone().lerp(baseEnd, depthScale);
  end.y = origin.y - 0.6 * lengthScale;
  const mid = origin.clone().lerp(end, 0.5);
  mid.y -= 0.08;
  const curve = new THREE.CatmullRomCurve3([origin, mid, end]);
  return { curve, tip: end };
}
