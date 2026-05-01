import { useTheme } from "@/hooks/useTheme";

/**
 * Just a thin glowing horizon ring at the base of the trunk —
 * no occluding disc, so roots remain visible in the space below.
 */
export default function Ground() {
  const { theme } = useTheme();
  const isNight = theme === "night";
  const glow = isNight ? "#7ad6ff" : "#ffb86b";

  return (
    <group>
      {/* Inner bright ring at the trunk base */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.05, 0.6, 64]} />
        <meshBasicMaterial
          color={glow}
          transparent
          opacity={isNight ? 0.55 : 0.55}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
      {/* Outer faint ring for atmospheric anchor */}
      <mesh position={[0, 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.6, 1.4, 64]} />
        <meshBasicMaterial
          color={glow}
          transparent
          opacity={isNight ? 0.12 : 0.18}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
