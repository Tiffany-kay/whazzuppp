import { useMemo, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { PROJECTS } from "@/data/projects";
import { SKILL_ROOTS } from "@/data/skills";

/* ------------------------------------------------------------
   2D SVG tree — line-art trunk + branches + roots, glowing fruit
   nodes at branch tips, skill chips at root tips. Clean vector
   aesthetic that scales infinitely and stays under 20 KB.
   ------------------------------------------------------------ */

const VB_W = 1000;
const VB_H = 1180;
const TRUNK_BASE = { x: 500, y: 600 };
const TRUNK_TOP = { x: 500, y: 60 };

// Fruits sit HIGH in the canopy; branches arc up to reach them.
// OpenClaw is the crown fruit at the trunk top; KooLabs hangs upper-left.
const FRUIT_POS = {
  openclaw: { x: 500, y: 60 },
  koolabs: { x: 130, y: 175 },
  adamur: { x: 870, y: 175 },
  plintcart: { x: 215, y: 340 },
  "mental-baddie": { x: 785, y: 340 },
};

const HUE_COLORS = {
  amber: { core: "#fff4c0", mid: "#ffb84a", edge: "#c46a18", halo: "#ffd97a" },
  coral: { core: "#ffe0d0", mid: "#ff8a6e", edge: "#a83a26", halo: "#ffa890" },
  rose: { core: "#ffd6dc", mid: "#ff6b8a", edge: "#a82048", halo: "#ff9eb4" },
  teal: { core: "#d0fff0", mid: "#5ad4c0", edge: "#1a6e60", halo: "#8eebd8" },
  violet: { core: "#ecd6ff", mid: "#b87aff", edge: "#5a2899", halo: "#d4a8ff" },
};

// Trunk: a single vertical PCB trace from base to crown fruit.
const TRUNK_PATH = "M 500 600 L 500 60";

// Branches as circuit traces: trunk → 45° diagonal → final perpendicular run
// to the fruit. Path geometry is computed so the diagonal exhausts whichever
// of |dx|/|dy| is smaller, then one straight segment finishes the route.
const BRANCHES = [
  // KooLabs (130, 175): upper-left fruit. dx=-370, dy=-245 → diagonal 245, then horizontal
  { id: "koolabs", d: "M 500 420 L 255 175 L 130 175" },
  // Adamur (870, 175): mirror of KooLabs branch
  { id: "adamur", d: "M 500 420 L 745 175 L 870 175" },
  // PlintCart (215, 340): dx=-285, dy=-170 → diagonal 170, then horizontal
  { id: "plintcart", d: "M 500 510 L 330 340 L 215 340" },
  // Mental Baddie (785, 340): mirror of PlintCart
  { id: "mental-baddie", d: "M 500 510 L 670 340 L 785 340" },
];

// Hand-tuned root tip positions for a clean fan layout.
const ROOT_ENDPOINTS = {
  cloud:    { x: 140, y: 700 },
  ai:       { x: 220, y: 800 },
  dev:      { x: 340, y: 880 },
  apis:     { x: 500, y: 920 },
  data:     { x: 660, y: 880 },
  security: { x: 780, y: 800 },
  devops:   { x: 860, y: 700 },
};

/**
 * Circuit-style path from trunk base to root tip:
 *   - if path is purely vertical → straight line
 *   - else: 45° diagonal that exhausts the smaller of |dx|/|dy|, then a
 *     perpendicular run to the endpoint
 *
 * Returns one or two short perpendicular "spurs" off the final segment for
 * PCB-trace density, each terminating in its own small node.
 */
function buildRoot(skill) {
  const start = TRUNK_BASE;
  const end = ROOT_ENDPOINTS[skill.id] || { x: 500, y: 800 };

  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const adx = Math.abs(dx);
  const ady = Math.abs(dy);

  let mainPath;
  const forks = [];

  if (adx < 1) {
    // straight vertical
    mainPath = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
    // two spurs: one left, one right, at different heights
    const y1 = start.y + ady * 0.45;
    const y2 = start.y + ady * 0.72;
    forks.push({ path: `M ${start.x} ${y1} L ${start.x - 55} ${y1}`, end: { x: start.x - 55, y: y1 } });
    forks.push({ path: `M ${start.x} ${y2} L ${start.x + 55} ${y2}`, end: { x: start.x + 55, y: y2 } });
  } else if (adx >= ady) {
    // diagonal then horizontal — final segment runs at y = end.y
    const cornerX = start.x + Math.sign(dx) * ady;
    mainPath = `M ${start.x} ${start.y} L ${cornerX} ${end.y} L ${end.x} ${end.y}`;
    // two perpendicular spurs going AWAY from the chip (i.e. up, opposite of dy)
    const spurDir = -Math.sign(dy);
    const segLen = Math.abs(end.x - cornerX);
    if (segLen > 80) {
      const x1 = cornerX + (end.x - cornerX) * 0.35;
      const x2 = cornerX + (end.x - cornerX) * 0.7;
      forks.push({ path: `M ${x1} ${end.y} L ${x1} ${end.y + spurDir * 32}`, end: { x: x1, y: end.y + spurDir * 32 } });
      forks.push({ path: `M ${x2} ${end.y} L ${x2} ${end.y + spurDir * 50}`, end: { x: x2, y: end.y + spurDir * 50 } });
    }
  } else {
    // diagonal then vertical — final segment runs at x = end.x
    const cornerY = start.y + Math.sign(dy) * adx;
    mainPath = `M ${start.x} ${start.y} L ${end.x} ${cornerY} L ${end.x} ${end.y}`;
    // one perpendicular spur going AWAY from the chip (opposite of dx)
    const spurDir = -Math.sign(dx);
    const segLen = Math.abs(end.y - cornerY);
    if (segLen > 60) {
      const y1 = cornerY + (end.y - cornerY) * 0.5;
      forks.push({ path: `M ${end.x} ${y1} L ${end.x + spurDir * 38} ${y1}`, end: { x: end.x + spurDir * 38, y: y1 } });
    }
  }

  return { id: skill.id, label: skill.label, skills: skill.skills, mainPath, end, forks };
}

export default function TreeScene({ hoveredRoot, onHoverRoot, onSelectProject }) {
  const { theme } = useTheme();
  const isNight = theme === "night";

  const lineColor = isNight ? "#dde7ff" : "#3a2618";
  const rootRest = isNight ? "#b6c8e8" : "#5a3a18";
  const glowColor = isNight ? "#7ad6ff" : "#ffb86b";

  const roots = useMemo(() => SKILL_ROOTS.map(buildRoot), []);

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }}
      role="img"
      aria-label="Interactive tree of projects and skills"
    >
      <defs>
        {Object.entries(HUE_COLORS).map(([hue, c]) => (
          <radialGradient key={hue} id={`fruit-${hue}`} cx="35%" cy="35%" r="70%">
            <stop offset="0%" stopColor={c.core} />
            <stop offset="55%" stopColor={c.mid} />
            <stop offset="100%" stopColor={c.edge} />
          </radialGradient>
        ))}

        <filter id="rg" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>

        <filter id="fh" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* Trunk + branches — circuit traces with neon glow underlay */}
      <g aria-hidden="true">
        {/* Glow underlays */}
        <path
          d={TRUNK_PATH}
          stroke={glowColor}
          strokeWidth={11}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="miter"
          opacity={isNight ? 0.42 : 0.22}
          filter="url(#rg)"
        />
        {BRANCHES.map((b) => (
          <path
            key={b.id + "-glow"}
            d={b.d}
            stroke={glowColor}
            strokeWidth={9}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="miter"
            opacity={isNight ? 0.36 : 0.18}
            filter="url(#rg)"
          />
        ))}

        {/* Crisp top traces */}
        <path
          d={TRUNK_PATH}
          stroke={lineColor}
          strokeWidth={2.8}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="miter"
          style={{ transition: "stroke 600ms" }}
        />
        {BRANCHES.map((b) => (
          <path
            key={b.id}
            d={b.d}
            stroke={lineColor}
            strokeWidth={2.2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="miter"
            style={{ transition: "stroke 600ms" }}
          />
        ))}
      </g>

      {/* Roots */}
      <g>
        {roots.map((r) => (
          <RootGroup
            key={r.id}
            root={r}
            isHovered={hoveredRoot === r.id}
            isAnyHovered={!!hoveredRoot}
            isNight={isNight}
            onHover={(h) => onHoverRoot?.(h ? r.id : null)}
            restColor={rootRest}
            glowColor={glowColor}
          />
        ))}
      </g>

      {/* Fruits — drawn last so they sit above branches */}
      <g>
        {PROJECTS.map((p) => (
          <Fruit
            key={p.id}
            project={p}
            hoveredRoot={hoveredRoot}
            isNight={isNight}
            onSelect={() => onSelectProject?.(p)}
          />
        ))}
      </g>
    </svg>
  );
}

function RootGroup({ root, isHovered, isAnyHovered, isNight, onHover, restColor, glowColor }) {
  const dim = isAnyHovered && !isHovered;
  const stroke = isHovered ? glowColor : restColor;
  const opacity = dim ? 0.35 : 1;
  const glow = isHovered ? 0.7 : 0.16;

  return (
    <g
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      style={{ opacity, transition: "opacity 250ms", cursor: "pointer" }}
    >
      {/* Glow underlay on main */}
      <path
        d={root.mainPath}
        stroke={glowColor}
        strokeWidth={isHovered ? 14 : 6}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="miter"
        opacity={glow}
        filter="url(#rg)"
        style={{ transition: "all 250ms" }}
      />

      {/* Main path */}
      <path
        d={root.mainPath}
        stroke={stroke}
        strokeWidth={isHovered ? 3 : 2.2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="miter"
        style={{ transition: "stroke 200ms, stroke-width 200ms" }}
      />

      {/* Spurs — short perpendicular nodes for PCB density */}
      {root.forks.map((f, i) => (
        <g key={i}>
          <path
            d={f.path}
            stroke={glowColor}
            strokeWidth={isHovered ? 7 : 3}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="miter"
            opacity={isHovered ? 0.5 : 0.1}
            filter="url(#rg)"
            style={{ transition: "all 250ms" }}
          />
          <path
            d={f.path}
            stroke={stroke}
            strokeWidth={isHovered ? 2 : 1.4}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="miter"
            style={{ transition: "all 200ms" }}
          />
          <circle
            cx={f.end.x}
            cy={f.end.y}
            r={isHovered ? 4 : 2.6}
            fill={stroke}
            style={{ transition: "all 200ms" }}
          />
        </g>
      ))}

      {/* Hover halo at main tip */}
      <circle
        cx={root.end.x}
        cy={root.end.y}
        r={isHovered ? 18 : 0}
        fill={glowColor}
        opacity={isHovered ? 0.45 : 0}
        filter="url(#rg)"
        style={{ transition: "all 250ms" }}
      />

      {/* Main tip node */}
      <circle
        cx={root.end.x}
        cy={root.end.y}
        r={isHovered ? 8 : 5}
        fill={stroke}
        style={{ transition: "all 200ms" }}
      />

      {/* Label + sub-skill bloom */}
      <foreignObject
        x={root.end.x - 130}
        y={root.end.y + 14}
        width={260}
        height={isHovered ? 240 : 50}
        style={{ overflow: "visible", pointerEvents: "none" }}
      >
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "4px 12px",
              borderRadius: 999,
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: 16,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              whiteSpace: "nowrap",
              background: isHovered
                ? isNight
                  ? "rgba(122, 214, 255, 0.95)"
                  : "rgba(255, 184, 107, 0.95)"
                : isNight
                ? "rgba(20, 24, 60, 0.85)"
                : "rgba(255, 248, 232, 0.92)",
              color: isHovered
                ? isNight
                  ? "#0a0e2e"
                  : "#2a1812"
                : isNight
                ? "#dde7ff"
                : "#2a1812",
              border: `1px solid ${
                isNight ? "rgba(221,231,255,0.3)" : "rgba(110,68,33,0.3)"
              }`,
              transition: "all 200ms",
              backdropFilter: "blur(4px)",
            }}
          >
            {root.label}
          </div>
          {isHovered && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                alignItems: "center",
                marginTop: 4,
              }}
            >
              {root.skills.map((s, i) => (
                <span
                  key={s}
                  style={{
                    whiteSpace: "nowrap",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: 13,
                    padding: "2px 10px",
                    borderRadius: 999,
                    color: isNight ? "#dde7ff" : "#2a1812",
                    background: isNight
                      ? "rgba(20, 24, 60, 0.85)"
                      : "rgba(255, 248, 232, 0.92)",
                    border: `1px solid ${
                      isNight ? "rgba(221,231,255,0.2)" : "rgba(110,68,33,0.2)"
                    }`,
                    animation: `tg-bloom 0.4s ease ${i * 0.05}s both`,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </foreignObject>
    </g>
  );
}

function Fruit({ project, hoveredRoot, isNight, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const colors = HUE_COLORS[project.hue] || HUE_COLORS.amber;
  const pos = FRUIT_POS[project.id];
  if (!pos) return null;

  const isFiltering = !!hoveredRoot;
  const isMatch = !isFiltering || project.skillTags.includes(hoveredRoot);
  const dim = isFiltering && !isMatch;

  const opacity = dim ? 0.25 : 1;
  const haloR = hovered ? 38 : 28;
  const bodyR = hovered ? 16 : 14;

  return (
    <g
      style={{ opacity, cursor: "pointer", transition: "opacity 250ms" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      aria-label={`Open ${project.name} case study`}
    >
      {/* Halo */}
      <circle
        cx={pos.x}
        cy={pos.y}
        r={haloR}
        fill={colors.halo}
        opacity={hovered ? 0.6 : 0.4}
        filter="url(#fh)"
        style={{ transition: "all 250ms" }}
      />

      {/* Hover ring */}
      {hovered && (
        <circle
          cx={pos.x}
          cy={pos.y}
          r={22}
          fill="none"
          stroke={colors.halo}
          strokeWidth={1.5}
          opacity={0.85}
        />
      )}

      {/* Body */}
      <circle
        cx={pos.x}
        cy={pos.y}
        r={bodyR}
        fill={`url(#fruit-${project.hue})`}
        stroke={colors.edge}
        strokeWidth={1}
        style={{ transition: "r 200ms" }}
      />

      {/* Specular */}
      <circle cx={pos.x - 4} cy={pos.y - 5} r={2.4} fill="white" opacity={0.75} />

      {/* Label */}
      <foreignObject
        x={pos.x - 130}
        y={pos.y + 22}
        width={260}
        height={60}
        style={{ overflow: "visible", pointerEvents: "none" }}
      >
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "Fraunces, serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: 22,
              lineHeight: 1.1,
              color: isNight ? "#f6efe0" : "#2a1812",
              textShadow: isNight
                ? "0 1px 8px rgba(0,0,0,0.7)"
                : "0 1px 8px rgba(255,255,255,0.7)",
            }}
          >
            {project.name}
          </div>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginTop: 4,
              color: hovered
                ? colors.edge
                : isNight
                ? "rgba(246,239,224,0.6)"
                : "rgba(42,24,18,0.6)",
              transition: "color 200ms",
            }}
          >
            {hovered ? "open →" : "click to open"}
          </div>
        </div>
      </foreignObject>
    </g>
  );
}
