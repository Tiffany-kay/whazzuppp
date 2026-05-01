import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useTheme } from "@/hooks/useTheme";
import { SKILL_ROOTS } from "@/data/skills";
import { buildRoot } from "./project3d";

export default function Roots({ hoveredRoot, onHoverRoot }) {
  return (
    <group>
      {SKILL_ROOTS.map((r) => (
        <SkillRoot
          key={r.id}
          root={r}
          isHovered={hoveredRoot === r.id}
          isAnyHovered={!!hoveredRoot}
          onHover={(v) => onHoverRoot?.(v ? r.id : null)}
        />
      ))}
    </group>
  );
}

function tubeFromCurve(curve, segments, radius) {
  return new THREE.TubeGeometry(curve, segments, radius, 8, false);
}

function SkillRoot({ root, isHovered, isAnyHovered, onHover }) {
  const { theme } = useTheme();
  const isNight = theme === "night";

  const built = useMemo(() => buildRoot(root.angle), [root.angle]);
  const geometries = useMemo(
    () => ({
      main: tubeFromCurve(built.main, 40, 0.085),
      forks: built.forks.map((f, i) => tubeFromCurve(f.curve, 24, 0.05 - i * 0.008)),
    }),
    [built]
  );

  const mainMatRef = useRef();
  const forkMatRefs = useRef([]);
  const tipLightRef = useRef();
  const mainTipRef = useRef();
  const forkTipRefs = useRef([]);

  const mutedColor = isNight ? "#1a2440" : "#5a3a18";
  const glowColor = isNight ? "#7ad6ff" : "#ffb86b";

  useFrame(({ clock }) => {
    const dim = isAnyHovered && !isHovered;
    // Gentle pulse so they read as live electric lines even at rest.
    const idlePulse = 0.85 + Math.sin(clock.elapsedTime * 1.2 + root.angle * 0.05) * 0.15;
    const targetEmissive = isHovered ? 2.2 : dim ? 0.25 : 0.85 * idlePulse;
    const targetTipScale = isHovered ? 2.2 : dim ? 0.8 : 1.0;
    const targetLight = isHovered ? 1.6 : 0.15;
    const targetOpacity = dim ? 0.4 : 1.0;

    [mainMatRef.current, ...forkMatRefs.current].forEach((m) => {
      if (!m) return;
      m.emissiveIntensity = THREE.MathUtils.lerp(
        m.emissiveIntensity,
        targetEmissive,
        0.15
      );
      m.opacity = THREE.MathUtils.lerp(m.opacity, targetOpacity, 0.15);
    });

    [mainTipRef.current, ...forkTipRefs.current].forEach((m) => {
      if (!m) return;
      const s = THREE.MathUtils.lerp(m.scale.x, targetTipScale, 0.15);
      m.scale.setScalar(s);
    });

    if (tipLightRef.current) {
      tipLightRef.current.intensity = THREE.MathUtils.lerp(
        tipLightRef.current.intensity,
        targetLight,
        0.15
      );
    }
  });

  const labelDim = isAnyHovered && !isHovered;

  return (
    <group
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onHover(false);
      }}
    >
      {/* Main root */}
      <mesh geometry={geometries.main}>
        <meshStandardMaterial
          ref={mainMatRef}
          color={mutedColor}
          emissive={glowColor}
          emissiveIntensity={0.85}
          roughness={0.5}
          transparent
          opacity={1}
        />
      </mesh>

      {/* Forks */}
      {geometries.forks.map((g, i) => (
        <mesh key={i} geometry={g}>
          <meshStandardMaterial
            ref={(el) => (forkMatRefs.current[i] = el)}
            color={mutedColor}
            emissive={glowColor}
            emissiveIntensity={0.7}
            roughness={0.5}
            transparent
            opacity={1}
          />
        </mesh>
      ))}

      {/* Glowing tip nodes */}
      <mesh ref={mainTipRef} position={built.main.getPointAt(1)}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={glowColor} toneMapped={false} />
      </mesh>
      {built.forks.map((f, i) => (
        <mesh
          key={i}
          ref={(el) => (forkTipRefs.current[i] = el)}
          position={f.tip}
        >
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color={glowColor} toneMapped={false} />
        </mesh>
      ))}

      {/* Hover-only point light at main tip */}
      <pointLight
        ref={tipLightRef}
        position={built.main.getPointAt(1)}
        color={glowColor}
        intensity={0}
        distance={2.5}
        decay={2}
      />

      {/* Category label at main tip */}
      <Html
        position={[built.main.getPointAt(1).x, built.main.getPointAt(1).y - 0.25, built.main.getPointAt(1).z]}
        center
        distanceFactor={9}
        zIndexRange={[5, 0]}
        style={{
          pointerEvents: "none",
          opacity: labelDim ? 0.3 : 1,
          transition: "opacity 250ms",
        }}
      >
        <div
          style={{
            whiteSpace: "nowrap",
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            padding: "4px 10px",
            borderRadius: 999,
            color: isHovered ? (isNight ? "#0a0e2e" : "#fffbe6") : isNight ? "#f6efe0" : "#2a1812",
            background: isHovered
              ? isNight
                ? "rgba(255,213,107,0.95)"
                : "rgba(224,122,60,0.95)"
              : isNight
              ? "rgba(20,24,60,0.7)"
              : "rgba(255,248,232,0.85)",
            border: `1px solid ${isNight ? "rgba(246,239,224,0.35)" : "rgba(110,68,33,0.35)"}`,
            backdropFilter: "blur(6px)",
            transition: "all 250ms ease",
          }}
        >
          {root.label}
        </div>

        {/* Sub-skills bloom on hover */}
        {isHovered && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              marginTop: 6,
              display: "flex",
              flexDirection: "column",
              gap: 4,
              alignItems: "center",
            }}
          >
            {root.skills.map((s, i) => (
              <span
                key={s}
                style={{
                  whiteSpace: "nowrap",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: 11,
                  padding: "2px 8px",
                  borderRadius: 999,
                  color: isNight ? "#f6efe0" : "#2a1812",
                  background: isNight ? "rgba(20,24,60,0.85)" : "rgba(255,248,232,0.92)",
                  border: `1px solid ${isNight ? "rgba(246,239,224,0.25)" : "rgba(110,68,33,0.25)"}`,
                  animation: `tg-bloom 0.4s ease ${i * 0.05}s both`,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </Html>
    </group>
  );
}
