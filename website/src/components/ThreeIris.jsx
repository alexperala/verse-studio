// src/components/ThreeIris.jsx
import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei";
import * as THREE from "three";

const useReducedMotion = () => {
  const prefers =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return !!prefers;
};

// ---- Iris shader material (procedural striations + slight orange glint) ----
const IrisMaterial = (() => {
  const uniforms = {
    u_time: { value: 0 },
    u_primary: { value: new THREE.Color("#2f6af6") }, // blue
    u_secondary: { value: new THREE.Color("#7fb3ff") }, // light blue
    u_glint: { value: new THREE.Color("#ff8a33") }, // subtle orange
  };

  const vertex = /* glsl */ `
    varying vec2 vUv;
    varying vec3 vPos;
    void main(){
      vUv = uv;
      vPos = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  // simple polar stripes + radius modulation, time-animated
  const fragment = /* glsl */ `
    precision highp float;
    varying vec2 vUv;
    varying vec3 vPos;
    uniform float u_time;
    uniform vec3 u_primary;
    uniform vec3 u_secondary;
    uniform vec3 u_glint;

    // convert cartesian -> polar
    vec2 toPolar(vec2 p){
      float r = length(p);
      float a = atan(p.y, p.x); // -PI..PI
      return vec2(r, a);
    }

    void main(){
      vec2 uv = vUv * 2.0 - 1.0;      // center at 0
      vec2 polar = toPolar(uv);
      float r = polar.x;
      float a = polar.y;

      // iris striations: radial × angular interference
      float stripes = sin(a * 32.0 + r * 24.0 - u_time * 0.6) * 0.5 + 0.5;
      float fibers = sin(a * 96.0 - u_time * 0.9) * 0.5 + 0.5;
      float ringBand = smoothstep(0.15, 0.95, r) * (1.0 - smoothstep(0.88, 0.99, r));

      // base color blend
      vec3 base = mix(u_primary, u_secondary, stripes * 0.7 + fibers * 0.3);

      // subtle orange glint near outer ring
      float glintMask = smoothstep(0.68, 0.86, r) * (0.7 + 0.3*sin(a*6.0 + u_time*0.7));
      base = mix(base, u_glint, glintMask * 0.08);

      // darken toward pupil
      float vignette = smoothstep(0.0, 0.1, r);
      base *= mix(0.2, 1.0, vignette);

      // soft alpha outside iris
      float alpha = smoothstep(0.99, 0.96, r);

      gl_FragColor = vec4(base, alpha);
    }
  `;

  const mat = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    depthWrite: false,
  });

  return mat;
})();

// ---- Reusable small sphere for circuit nodes ----
function NodeSphere({ position = [0, 0, 0], color = "#7fb3ff", scale = 0.02 }) {
  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

// ---- Background neural circuit rings ----
function NeuralRings({ reduceMotion }) {
  const group = useRef();
  const rings = useMemo(() => {
    const arr = [];
    const ringCount = 3;
    for (let i = 0; i < ringCount; i++) {
      const R = 0.9 + i * 0.22;
      const pts = [];
      const steps = 180;
      for (let j = 0; j <= steps; j++) {
        const t = (j / steps) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(t) * R, Math.sin(t) * R, -0.2));
      }
      arr.push({ radius: R, points: pts });
    }
    return arr;
  }, []);

  useFrame((_, dt) => {
    if (reduceMotion) return;
    if (group.current) {
      group.current.rotation.z += dt * 0.03; // slow rotate
    }
  });

  return (
    <group ref={group}>
      {rings.map((ring, idx) => (
        <group key={idx}>
          <Line
            points={ring.points}
            color="#284a99"
            linewidth={1}
            opacity={0.5}
            transparent
          />
          {/* Sprinkle a few "nodes" */}
          {Array.from({ length: 12 }).map((_, k) => {
            const t = (k / 12) * Math.PI * 2;
            const x = Math.cos(t) * ring.radius;
            const y = Math.sin(t) * ring.radius;
            return <NodeSphere key={k} position={[x, y, -0.2]} color="#7fb3ff" />;
          })}
        </group>
      ))}
    </group>
  );
}

// ---- The iris/lens assembly ----
function IrisLens({ reduceMotion }) {
  const group = useRef();
  const irisRef = useRef();
  const pupilRef = useRef();

  // materials
  const irisMat = useMemo(() => IrisMaterial.clone(), []);
  const ringMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1b2a52"),
        metalness: 0.75,
        roughness: 0.35,
      }),
    []
  );
  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#ffffff"),
        transmission: 0.5, // “glass-like” if supported
        thickness: 0.5,
        roughness: 0.1,
        metalness: 0.0,
        transparent: true,
        opacity: 0.5,
      }),
    []
  );

  useFrame((state, dt) => {
    if (!reduceMotion) {
      // time for shader
      irisMat.uniforms.u_time.value += dt;
      // slow, elegant rotation
      if (group.current) group.current.rotation.z += dt * 0.1;
    }
    // mouse look: tilt group toward pointer
    const { pointer } = state; // -1..1
    const targetX = (pointer.y || 0) * 0.12;
    const targetY = (pointer.x || 0) * 0.12;
    if (group.current) {
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.075;
      group.current.rotation.y += (targetY - group.current.rotation.y) * 0.075;
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Outer metal ring */}
      <mesh>
        <ringGeometry args={[1.15, 1.45, 96, 1]} />
        <primitive object={ringMat} attach="material" />
      </mesh>

      {/* Iris (shader) */}
      <mesh>
        <circleGeometry args={[1.0, 128]} />
        <primitive object={irisMat} attach="material" />
      </mesh>

      {/* Pupil */}
      <mesh ref={pupilRef}>
        <circleGeometry args={[0.35, 64]} />
        <meshStandardMaterial color="#000000" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Subtle glass lens */}
      <mesh position={[0, 0, 0.02]}>
        <circleGeometry args={[1.48, 64]} />
        <primitive object={glassMat} attach="material" />
      </mesh>
    </group>
  );
}

export default function ThreeIris() {
  const reduceMotion = useReducedMotion();

  // Canvas sizing via container CSS; keep DPR reasonable for perf
  return (
    <div className="three-iris-wrap" aria-hidden="true">
      <Canvas
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 3], fov: 40, near: 0.1, far: 100 }}
      >
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 4]} intensity={0.8} />
        <directionalLight position={[-4, -2, 3]} intensity={0.4} color={"#7fb3ff"} />

        <Suspense fallback={<Html><div style={{ color: "#9aa3b2" }}>Loading…</div></Html>}>
          <group position={[0, 0, 0]}>
            <NeuralRings reduceMotion={reduceMotion} />
            <IrisLens reduceMotion={reduceMotion} />
          </group>
        </Suspense>
      </Canvas>
      <noscript>
        <div
          style={{
            width: "100%",
            aspectRatio: "1 / 1",
            background: "radial-gradient(60% 60% at 50% 45%,#0b0f14 0%,#000 60%)",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,.06)",
          }}
        ></div>
      </noscript>
    </div>
  );
}
