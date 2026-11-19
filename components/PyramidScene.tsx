"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function Pyramid() {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock }, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.25;
    ref.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.12; // gentle float
  });
  return (
    // 4 radial segments = square pyramid
    <mesh ref={ref} rotation={[0.15, Math.PI / 4, 0]}>
      <coneGeometry args={[1.3, 1.9, 4]} />
      <meshStandardMaterial
        color="#9c369a"
        emissive="#9c369a"
        emissiveIntensity={0.55}
        roughness={0.4}
        metalness={0.2}
      />
      <Edges color="#e9b3e7" />
    </mesh>
  );
}

export default function PyramidScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.4, 4.6], fov: 40 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 3, 3]} intensity={30} color="#d27ad0" />
      <Pyramid />
    </Canvas>
  );
}
