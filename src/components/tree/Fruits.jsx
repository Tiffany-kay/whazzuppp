import { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useTheme } from "@/hooks/useTheme";
import { PROJECTS } from "@/data/projects";
import { fruitColors, fruitPosition } from "./project3d";

export default function Fruits({ hoveredRoot, onSelectProject }) {
  return (
    <group>
      {PROJECTS.map((p, i) => (
        <Fruit
          key={p.id}
          project={p}
          index={i}
          hoveredRoot={hoveredRoot}
          onSelect={() => onSelectProject?.(p)}
        />
      ))}
    </group>
  );
}

function Fruit({ project, index, hoveredRoot, onSelect }) {
  const { theme } = useTheme();
  const isNight = theme === "night";
  const colors = fruitColors(project.hue);
  const basePos = fruitPosition(project.pos, index);

  const [hovered, setHovered] = useState(false);
  const groupRef = useRef();
  const haloRef = useRef();
  const bodyMatRef = useRef();
  const haloMatRef = useRef();
  const lightRef = useRef();

  // skill filter state
  const isFiltering = !!hoveredRoot;
  const isMatch = !isFiltering || project.skillTags.includes(hoveredRoot);
  const dim = isFiltering && !isMatch;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      // gentle bob + rotate
      const bob = Math.sin(t * 0.7 + index * 1.3) * 0.05;
      const sway = Math.sin(t * 0.5 + index) * 0.04;
      groupRef.current.position.set(basePos.x + sway, basePos.y + bob, basePos.z);
    }

    // target values
    const targetBodyEmissive = isNight ? 1.7 : 0.95;
    const hoverBoost = hovered ? 1.7 : 1.0;
    const matchBoost = isMatch && isFiltering ? 1.4 : 1.0;
    const dimMul = dim ? 0.15 : 1.0;

    const bodyEmissive = targetBodyEmissive * hoverBoost * matchBoost * dimMul;
    const haloOpacity = (isNight ? 0.55 : 0.4) * (hovered ? 1.6 : 1.0) * (dim ? 0.25 : 1.0);
    const haloScale = hovered ? 1.35 : 1.0;
    const lightIntensity = (isNight ? 1.4 : 0.75) * hoverBoost * matchBoost * (dim ? 0.2 : 1.0);

    if (bodyMatRef.current) {
      bodyMatRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        bodyMatRef.current.emissiveIntensity,
        bodyEmissive,
        0.18
      );
      bodyMatRef.current.opacity = THREE.MathUtils.lerp(
        bodyMatRef.current.opacity,
        dim ? 0.3 : 1.0,
        0.18
      );
    }
    if (haloMatRef.current) {
      haloMatRef.current.opacity = THREE.MathUtils.lerp(
        haloMatRef.current.opacity,
        haloOpacity,
        0.18
      );
    }
    if (haloRef.current) {
      const s = THREE.MathUtils.lerp(haloRef.current.scale.x, haloScale, 0.18);
      haloRef.current.scale.setScalar(s);
    }
    if (lightRef.current) {
      lightRef.current.intensity = THREE.MathUtils.lerp(
        lightRef.current.intensity,
        lightIntensity,
        0.18
      );
    }
  });

  function handlePointerOver(e) {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  }
  function handlePointerOut(e) {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = "";
  }

  return (
    <group ref={groupRef} position={basePos}>
      {/* Outer halo */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[0.42, 24, 24]} />
        <meshBasicMaterial
          ref={haloMatRef}
          color={colors.halo}
          transparent
          opacity={0.4}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Body */}
      <mesh
        castShadow
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.();
        }}
      >
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial
          ref={bodyMatRef}
          color={colors.body}
          emissive={colors.emissive}
          emissiveIntensity={0.95}
          roughness={0.3}
          metalness={0.1}
          transparent
          opacity={1}
        />
      </mesh>

      {/* Tiny specular highlight */}
      <mesh position={[-0.075, 0.09, 0.16]}>
        <sphereGeometry args={[0.028, 8, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.8} toneMapped={false} />
      </mesh>

      {/* Click-affordance ring — appears on hover */}
      {hovered && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.34, 0.012, 8, 48]} />
          <meshBasicMaterial color={colors.halo} toneMapped={false} transparent opacity={0.9} />
        </mesh>
      )}

      {/* Point light */}
      <pointLight
        ref={lightRef}
        color={colors.emissive}
        intensity={0.75}
        distance={3.2}
        decay={2}
      />

      {/* Label */}
      <Html
        position={[0, -0.42, 0]}
        center
        distanceFactor={9}
        zIndexRange={[10, 0]}
        style={{ pointerEvents: "none", opacity: dim ? 0.35 : 1, transition: "opacity 250ms" }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <div
            style={{
              whiteSpace: "nowrap",
              fontFamily: "Fraunces, serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: 15,
              color: isNight ? "#f6efe0" : "#2a1812",
              textShadow: isNight
                ? "0 1px 10px rgba(0,0,0,0.7)"
                : "0 1px 10px rgba(255,255,255,0.7)",
            }}
          >
            {project.name}
          </div>
          <div
            style={{
              whiteSpace: "nowrap",
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: 9,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: hovered
                ? isNight ? "#ffd56b" : "#e07a3c"
                : isNight ? "rgba(246,239,224,0.55)" : "rgba(42,24,18,0.55)",
              transition: "color 200ms",
            }}
          >
            {hovered ? "open →" : "click to open"}
          </div>
        </div>
      </Html>
    </group>
  );
}
