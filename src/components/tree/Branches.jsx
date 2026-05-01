import { useMemo } from "react";
import * as THREE from "three";
import { useTheme } from "@/hooks/useTheme";
import { PROJECTS } from "@/data/projects";
import { branchAttachPoint, fruitPosition } from "./project3d";

export default function Branches() {
  const { theme } = useTheme();
  const isNight = theme === "night";

  const geometries = useMemo(() => {
    return PROJECTS.map((p, i) => {
      const fruit = fruitPosition(p.pos, i);
      const attach = branchAttachPoint(fruit);
      // mid control points: arc out toward fruit with a gentle dip then rise.
      const dx = fruit.x - attach.x;
      const dy = fruit.y - attach.y;
      const dz = fruit.z - attach.z;
      const mid1 = new THREE.Vector3(
        attach.x + dx * 0.35,
        attach.y + dy * 0.2,
        attach.z + dz * 0.4 + 0.05
      );
      const mid2 = new THREE.Vector3(
        attach.x + dx * 0.7,
        attach.y + dy * 0.7,
        attach.z + dz * 0.7
      );
      const fruitStem = new THREE.Vector3(fruit.x, fruit.y - 0.18, fruit.z);
      const curve = new THREE.CatmullRomCurve3([attach, mid1, mid2, fruitStem]);
      return new THREE.TubeGeometry(curve, 40, 0.07, 10, false);
    });
  }, []);

  const color = isNight ? "#3f3050" : "#5e3a1e";

  return (
    <group>
      {geometries.map((geom, i) => (
        <mesh key={i} geometry={geom} castShadow>
          <meshStandardMaterial color={color} roughness={0.9} metalness={0.05} />
        </mesh>
      ))}
    </group>
  );
}
