import { useMemo } from "react";
import * as THREE from "three";
import { useTheme } from "@/hooks/useTheme";
import { TRUNK_TOP_Y } from "./project3d";

export default function Trunk() {
  const { theme } = useTheme();
  const isNight = theme === "night";

  const geometry = useMemo(() => {
    const points = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.06, TRUNK_TOP_Y * 0.2, 0.04),
      new THREE.Vector3(-0.05, TRUNK_TOP_Y * 0.42, 0.08),
      new THREE.Vector3(0.07, TRUNK_TOP_Y * 0.62, -0.04),
      new THREE.Vector3(-0.04, TRUNK_TOP_Y * 0.85, 0.05),
      new THREE.Vector3(0, TRUNK_TOP_Y, 0),
    ];
    const curve = new THREE.CatmullRomCurve3(points);
    const tubularSegments = 64;
    const radialSegments = 14;
    const baseRadius = 0.22;
    const geom = new THREE.TubeGeometry(
      curve,
      tubularSegments,
      baseRadius,
      radialSegments,
      false
    );

    // Taper the trunk: scale each ring of vertices around the curve point.
    const pos = geom.attributes.position;
    const ringSize = radialSegments + 1;
    for (let s = 0; s <= tubularSegments; s++) {
      const t = s / tubularSegments;
      const taper = THREE.MathUtils.lerp(1.0, 0.32, Math.pow(t, 0.85));
      const onCurve = curve.getPointAt(t);
      for (let r = 0; r < ringSize; r++) {
        const i = s * ringSize + r;
        const dx = pos.getX(i) - onCurve.x;
        const dy = pos.getY(i) - onCurve.y;
        const dz = pos.getZ(i) - onCurve.z;
        pos.setX(i, onCurve.x + dx * taper);
        pos.setY(i, onCurve.y + dy * taper);
        pos.setZ(i, onCurve.z + dz * taper);
      }
    }
    pos.needsUpdate = true;
    geom.computeVertexNormals();
    return geom;
  }, []);

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial
        color={isNight ? "#322642" : "#6e4421"}
        roughness={0.88}
        metalness={0.05}
      />
    </mesh>
  );
}
