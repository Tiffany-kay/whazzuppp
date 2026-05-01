import { useTheme } from "@/hooks/useTheme";

// Pulled back in Z so fruits at z ≈ 0.85 sit clearly in front.
const CLUSTERS = [
  { pos: [0, 4.05, -0.35],   scale: [0.95, 0.78, 0.95], shade: 0 },
  { pos: [-1.5, 3.55, -0.15], scale: [0.85, 0.78, 0.85], shade: 1 },
  { pos: [1.55, 3.6, -0.3],  scale: [0.88, 0.78, 0.85], shade: 0 },
  { pos: [-2.5, 2.8, -0.15], scale: [0.7, 0.62, 0.7], shade: 1 },
  { pos: [2.55, 2.95, -0.4], scale: [0.78, 0.7, 0.78], shade: 0 },
  { pos: [-1.0, 3.2, 0.05],  scale: [0.55, 0.5, 0.55], shade: 2 },
  { pos: [1.1, 3.3, 0.05],   scale: [0.55, 0.5, 0.55], shade: 2 },
  { pos: [0, 4.45, -0.55],   scale: [0.55, 0.5, 0.55], shade: 2 },
];

export default function Foliage() {
  const { theme } = useTheme();
  const isNight = theme === "night";

  const palette = isNight
    ? ["#2a6a6a", "#1d4f55", "#0e3340"]
    : ["#5fa75a", "#4a8a48", "#3a7338"];

  return (
    <group>
      {CLUSTERS.map((c, i) => (
        <mesh key={i} position={c.pos} scale={c.scale} castShadow>
          <icosahedronGeometry args={[0.95, 1]} />
          <meshStandardMaterial
            color={palette[c.shade]}
            roughness={0.85}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
}
