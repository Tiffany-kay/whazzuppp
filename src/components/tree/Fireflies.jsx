import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTheme } from "@/hooks/useTheme";

export default function Fireflies({ count = 36 }) {
  const { theme } = useTheme();
  const isNight = theme === "night";
  const color = isNight ? "#a8e8ff" : "#ffe0a0";

  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        origin: new THREE.Vector3(
          (Math.random() - 0.5) * 9,
          0.4 + Math.random() * 4.2,
          (Math.random() - 0.5) * 5 - 0.5
        ),
        phase: Math.random() * Math.PI * 2,
        speed: 0.25 + Math.random() * 0.45,
        drift: 0.3 + Math.random() * 0.45,
        size: 0.022 + Math.random() * 0.025,
        i,
      })),
    [count]
  );

  return (
    <group>
      {seeds.map((s) => (
        <Firefly key={s.i} seed={s} color={color} isNight={isNight} />
      ))}
    </group>
  );
}

function Firefly({ seed, color, isNight }) {
  const ref = useRef();
  const matRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.position.x =
        seed.origin.x + Math.sin(t * seed.speed + seed.phase) * seed.drift;
      ref.current.position.y =
        seed.origin.y +
        Math.cos(t * seed.speed * 0.7 + seed.phase) * seed.drift * 0.6;
      ref.current.position.z =
        seed.origin.z +
        Math.cos(t * seed.speed * 0.9 + seed.phase * 1.3) * seed.drift;
    }
    if (matRef.current) {
      // gentle pulse
      const pulse = 0.7 + 0.3 * Math.sin(t * 1.6 + seed.phase * 2);
      matRef.current.opacity = (isNight ? 0.95 : 0.7) * pulse;
    }
  });

  return (
    <mesh ref={ref} position={seed.origin}>
      <sphereGeometry args={[seed.size, 8, 8]} />
      <meshBasicMaterial
        ref={matRef}
        color={color}
        transparent
        opacity={isNight ? 0.95 : 0.7}
        toneMapped={false}
      />
    </mesh>
  );
}
