"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import {
  Color,
  type Group,
  type Mesh,
  type MeshBasicMaterial,
  type MeshStandardMaterial,
} from "three";

// Base (data) is indigo, top (agentic) is brand purple; tuned to read on the ink section.
const COLORS = ["#2b3290", "#4b2a91", "#76308f", "#9c369a"];
const GAP = 0.62;
const TOP = 3 * GAP;
const ALL = -1;

type P = { active: number | null; still: boolean };

function Plate({ i, active, still }: P & { i: number }) {
  const ref = useRef<Mesh>(null);
  const base = useMemo(() => new Color(COLORS[i]), [i]);
  useFrame((_, dt) => {
    const m = ref.current;
    if (!m) return;
    const on = active === i || active === ALL;
    const k = still ? 1 : Math.min(dt * 7, 1); // ease toward target; snap when motion is reduced
    m.position.y += (i * GAP + (active === i ? 0.3 : 0) - m.position.y) * k;
    const mat = m.material as MeshStandardMaterial;
    const glow = on ? 1 : active === null ? 0.4 : 0.15;
    mat.emissiveIntensity += (glow - mat.emissiveIntensity) * k;
  });
  return (
    <RoundedBox ref={ref} args={[2.6, 0.16, 2.6]} radius={0.06} position={[0, i * GAP, 0]}>
      <meshStandardMaterial
        color={base}
        emissive={base}
        emissiveIntensity={0.4}
        roughness={0.35}
        metalness={0.25}
      />
      <Edges color="#e9b3e7" />
    </RoundedBox>
  );
}

// Data rising through the layers.
function Particles({ still }: { still: boolean }) {
  const ref = useRef<Group>(null);
  const seeds = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => [
        ((i * 37) % 21) / 10 - 1,
        ((i * 53) % 21) / 10 - 1,
        i / 22,
      ]),
    [],
  );
  useFrame(({ clock }) => {
    if (!ref.current || still) return;
    ref.current.children.forEach((c, i) => {
      const t = (clock.elapsedTime * 0.18 + seeds[i][2]) % 1;
      c.position.y = -0.2 + t * (TOP + 0.6);
      c.scale.setScalar(Math.sin(t * Math.PI)); // fade in at the base, out at the top
    });
  });
  return (
    <group ref={ref}>
      {seeds.map(([x, z, t], i) => (
        <mesh key={i} position={[x, -0.2 + t * (TOP + 0.6), z]}>
          <sphereGeometry args={[0.055, 10, 10]} />
          <meshBasicMaterial color="#f3c6f2" />
        </mesh>
      ))}
    </group>
  );
}

// Digital Accessibility: the shell around every layer.
function Shell({ active, still }: P) {
  const ref = useRef<MeshBasicMaterial>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    const target = active === ALL ? 0.14 : 0.04;
    ref.current.opacity += (target - ref.current.opacity) * (still ? 1 : Math.min(dt * 6, 1));
  });
  return (
    <mesh position={[0, TOP / 2, 0]}>
      <boxGeometry args={[3.05, TOP + 0.75, 3.05]} />
      <meshBasicMaterial ref={ref} color="#e9b3e7" transparent opacity={0.04} depthWrite={false} />
      <Edges color="#e9b3e7" />
    </mesh>
  );
}

function Stack({ active, still }: P) {
  const ref = useRef<Group>(null);
  useFrame(({ clock }, dt) => {
    if (!ref.current || still) return;
    ref.current.rotation.y += dt * 0.15;
    ref.current.position.y = -0.95 + Math.sin(clock.elapsedTime * 0.7) * 0.06;
  });
  return (
    <group ref={ref} position={[0, -0.95, 0]} rotation={[0, Math.PI / 4, 0]}>
      {COLORS.map((_, i) => (
        <Plate key={i} i={i} active={active} still={still} />
      ))}
      <Particles still={still} />
      <Shell active={active} still={still} />
    </group>
  );
}

export default function StackScene({ active, still }: P) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={still ? "demand" : "always"}
      camera={{ position: [5.8, 4.4, 5.8], fov: 35 }}
      onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 4, 2]} intensity={40} color="#f3c6f2" />
      <Stack active={active} still={still} />
    </Canvas>
  );
}
