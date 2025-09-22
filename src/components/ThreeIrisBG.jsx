import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import * as THREE from "three";

const useReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || false;
};

// Global mouse tracker (normalized -1..1 in each axis, viewport-based)
function useViewportPointer() {
  const ref = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      ref.current.x = nx;
      ref.current.y = ny;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return ref;
}

// Shader material for iris
function makeIrisMaterial() {
  const uniforms = {
    u_time: { value: 0 },
    u_primary: { value: new THREE.Color("#2f6af6") },
    u_secondary: { value: new THREE.Color("#7fb3ff") },
    u_glint: { value: new THREE.Color("#ff8a33") },
  };
  const vertex = /* glsl */`
    varying vec2 vUv;
    void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
  `;
  const fragment = /* glsl */`
    precision highp float;
    varying vec2 vUv;
    uniform float u_time;
    uniform vec3 u_primary, u_secondary, u_glint;

    vec2 toPolar(vec2 p){ float r=length(p), a=atan(p.y,p.x); return vec2(r,a); }

    void main(){
      vec2 uv = vUv*2.0-1.0;
      vec2 polar = toPolar(uv);
      float r = polar.x, a = polar.y;
      float stripes = sin(a*32.0 + r*24.0 - u_time*0.6)*0.5+0.5;
      float fibers  = sin(a*96.0 - u_time*0.9)*0.5+0.5;

      vec3 base = mix(u_primary, u_secondary, stripes*0.7 + fibers*0.3);
      float glintMask = smoothstep(0.68, 0.86, r) * (0.7 + 0.3*sin(a*6.0 + u_time*0.7));
      base = mix(base, u_glint, glintMask*0.08);

      float vignette = smoothstep(0.0, 0.1, r);
      base *= mix(0.2, 1.0, vignette);

      float alpha = smoothstep(0.99, 0.96, r);
      gl_FragColor = vec4(base, alpha);
    }
  `;
  return new THREE.ShaderMaterial({
    uniforms, vertexShader: vertex, fragmentShader: fragment,
    transparent: true, depthWrite: false,
  });
}

function NodeSphere({ position = [0, 0, 0], color = "#7fb3ff", scale = 0.02 }) {
  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

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
    if (!reduceMotion && group.current) group.current.rotation.z += dt * 0.03;
  });
  return (
    <group ref={group}>
      {rings.map((ring, idx) => (
        <group key={idx}>
          <Line points={ring.points} color="#284a99" linewidth={1} opacity={0.5} transparent />
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

function IrisLens({ reduceMotion, pointerRef }) {
  const group = useRef();
  const irisMat = useMemo(() => makeIrisMaterial(), []);
  const ringMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#1b2a52", metalness: 0.75, roughness: 0.35 }),
    []
  );
  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#ffffff",
        transmission: 0.5,
        thickness: 0.5,
        roughness: 0.1,
        metalness: 0,
        transparent: true,
        opacity: 0.5,
      }),
    []
  );

  useFrame((state, dt) => {
    if (!reduceMotion) {
      irisMat.uniforms.u_time.value += dt;
      if (group.current) group.current.rotation.z += dt * 0.1;
    }
    const p = pointerRef.current;
    const targetX = (p.y || 0) * 0.12;
    const targetY = (p.x || 0) * 0.12;
    if (group.current) {
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.075;
      group.current.rotation.y += (targetY - group.current.rotation.y) * 0.075;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <ringGeometry args={[1.15, 1.45, 96, 1]} />
        <primitive object={ringMat} attach="material" />
      </mesh>
      <mesh>
        <circleGeometry args={[1.0, 128]} />
        <primitive object={irisMat} attach="material" />
      </mesh>
      <mesh>
        <circleGeometry args={[0.35, 64]} />
        <meshStandardMaterial color="#000000" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <circleGeometry args={[1.48, 64]} />
        <primitive object={glassMat} attach="material" />
      </mesh>
    </group>
  );
}

export default function ThreeIrisBG() {
  const reduceMotion = useReducedMotion();
  const pointerRef = useViewportPointer();
  return (
    <div className="bg3d" aria-hidden="true">
      <Canvas
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 3], fov: 40, near: 0.1, far: 100 }}
        frameloop={reduceMotion ? "demand" : "always"}
      >
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 4]} intensity={0.8} />
        <directionalLight position={[-4, -2, 3]} intensity={0.4} color="#7fb3ff" />
        <Suspense fallback={<Html><div style={{ color: "#9aa3b2" }}>Loading…</div></Html>}>
          <group position={[0, 0, 0]}>
            <NeuralRings reduceMotion={reduceMotion} />
            <IrisLens reduceMotion={reduceMotion} pointerRef={pointerRef} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
