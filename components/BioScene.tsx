"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { BufferAttribute, BufferGeometry, Color, type Group } from "three";

type V = [number, number, number];
const PAIRS = 44; // DNA base pairs
const BASE = new Color("#5d4d70");
const HOT = new Color("#f6cdf3");
const LAYERS = [5, 6, 6, 4]; // neural network layer sizes
const LX = [-7, -5.6, -4.2, -2.8];
const R = 0.95;
const GATE: V = [0.2, 0, 0]; // where network signal enters the helix

function build() {
  const nodes = LAYERS.map((n, l) =>
    Array.from({ length: n }, (_, i): V => [
      LX[l],
      (i - (n - 1) / 2) * 0.9,
      (((i * 7 + l * 3) % 5) - 2) * 0.25,
    ]),
  );
  const g: [V, V][] = [];
  for (let l = 0; l < nodes.length - 1; l++)
    for (const a of nodes[l]) for (const b of nodes[l + 1]) g.push([a, b]);
  for (const a of nodes[nodes.length - 1]) g.push([a, GATE]); // bridge into the helix

  const A: V[] = [];
  const B: V[] = [];
  for (let i = 0; i < PAIRS; i++) {
    const x = 0.2 + (i / (PAIRS - 1)) * 6.8;
    const th = i * 0.3;
    A.push([x, R * Math.sin(th), R * Math.cos(th)]);
    B.push([x, -R * Math.sin(th), -R * Math.cos(th)]);
  }
  const h: [V, V][] = [];
  for (let i = 0; i < PAIRS; i++) {
    h.push([A[i], B[i]]); // rung = base pair
    if (i < PAIRS - 1) h.push([A[i], A[i + 1]], [B[i], B[i + 1]]);
  }
  return { nodes: nodes.flat(), g, A, B, h };
}

function seg(edges: [V, V][]) {
  const pos = new Float32Array(edges.length * 6);
  edges.forEach(([a, b], i) => pos.set([...a, ...b], i * 6));
  return pos;
}
function geo(pos: Float32Array) {
  const g = new BufferGeometry();
  g.setAttribute("position", new BufferAttribute(pos, 3));
  g.setAttribute("color", new BufferAttribute(new Float32Array(pos.length), 3));
  return g;
}
// Brightness depends only on x, so a wave can sweep network -> DNA.
function paint(g: BufferGeometry, wx: number) {
  const p = g.getAttribute("position") as BufferAttribute;
  const c = g.getAttribute("color") as BufferAttribute;
  const col = new Color();
  for (let i = 0; i < p.count; i++) {
    const d = (p.getX(i) - wx) / 1.5;
    col.copy(BASE).lerp(HOT, Math.exp(-d * d));
    c.setXYZ(i, col.r, col.g, col.b);
  }
  c.needsUpdate = true;
}

function Rig() {
  const d = useMemo(() => build(), []);
  const geos = useMemo(
    () => ({
      graph: geo(seg(d.g)),
      helix: geo(seg(d.h)),
      nodes: geo(new Float32Array(d.nodes.flat())),
      bases: geo(new Float32Array([...d.A, ...d.B].flat())),
      pulses: geo(new Float32Array(16 * 3)),
    }),
    [d],
  );
  Object.values(geos).forEach((g) => paint(g, 0)); // static first frame (reduced motion)

  const helix = useRef<Group>(null);
  const { viewport } = useThree();
  const scale = Math.min(viewport.width / 15.5, viewport.height / 4); // keep in sync with HeroBio

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    // Opening: one fast sweep (~2.8s), then a calm ~12s loop.
    const wx = t < 2.8 ? -9 + t * 6.5 : -9 + (((t - 2.8) * 1.6) % 20);
    Object.values(geos).forEach((g) => paint(g, wx));
    if (helix.current) helix.current.rotation.x += dt * 0.35;
    // Signal pulses ride random network edges.
    const pp = geos.pulses.getAttribute("position") as BufferAttribute;
    for (let i = 0; i < 16; i++) {
      const [a, b] = d.g[(i * 37) % d.g.length];
      const f = (t * 0.45 + i / 16) % 1;
      pp.setXYZ(i, a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f);
    }
    pp.needsUpdate = true;
  });

  return (
    <group scale={scale}>
      <lineSegments geometry={geos.graph}>
        <lineBasicMaterial vertexColors transparent opacity={0.85} />
      </lineSegments>
      <points geometry={geos.nodes}>
        <pointsMaterial vertexColors size={0.09} sizeAttenuation />
      </points>
      <points geometry={geos.pulses}>
        <pointsMaterial color="#ffffff" size={0.16} sizeAttenuation transparent opacity={0.9} />
      </points>
      <group ref={helix}>
        <lineSegments geometry={geos.helix}>
          <lineBasicMaterial vertexColors transparent opacity={0.85} />
        </lineSegments>
        <points geometry={geos.bases}>
          <pointsMaterial vertexColors size={0.09} sizeAttenuation />
        </points>
      </group>
    </group>
  );
}

export default function BioScene({ animate }: { animate: boolean }) {
  return (
    <Canvas
      frameloop={animate ? "always" : "demand"}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 8], fov: 35 }}
      gl={{ alpha: true, antialias: true }}
    >
      <Rig />
    </Canvas>
  );
}
