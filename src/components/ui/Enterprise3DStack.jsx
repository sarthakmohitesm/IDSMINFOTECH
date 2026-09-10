/* eslint-disable react/no-unknown-property */
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Animated glowing data conduit pulses
 */
function DataPulses() {
  const ref = useRef();
  const count = 20;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const corners = [[-0.75, -0.75], [0.75, -0.75], [-0.75, 0.75], [0.75, 0.75]];
    for (let i = 0; i < count; i++) {
      const c = corners[i % 4];
      pos[i * 3] = c[0];
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2;
      pos[i * 3 + 2] = c[1];
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const p = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      p[i * 3 + 1] += delta * 1.4;
      if (p[i * 3 + 1] > 1.0) p[i * 3 + 1] = -1.0;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#38BDF8" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
    </points>
  );
}

/**
 * Vertical conduit columns
 */
function Conduits() {
  const corners = [[-0.75, -0.75], [0.75, -0.75], [-0.75, 0.75], [0.75, 0.75]];
  return (
    <group>
      {corners.map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh>
            <cylinderGeometry args={[0.025, 0.025, 1.8, 12]} />
            <meshStandardMaterial color="#BAE6FD" emissive="#38BDF8" emissiveIntensity={0.4} transparent opacity={0.5} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.008, 0.008, 1.8, 12]} />
            <meshStandardMaterial color="#0284C7" emissive="#38BDF8" emissiveIntensity={2.0} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/**
 * Top Intelligence Layer
 */
function TopTier() {
  const ringRef = useRef();
  useFrame((_, d) => { if (ringRef.current) ringRef.current.rotation.z += d * 0.4; });

  return (
    <group position={[0, 0.6, 0]}>
      <mesh castShadow>
        <boxGeometry args={[1.7, 0.11, 1.7]} />
        <meshPhysicalMaterial color="#FFFFFF" roughness={0.1} metalness={0.08} clearcoat={1} transmission={0.35} transparent opacity={0.95} />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[1.72, 0.014, 1.72]} />
        <meshStandardMaterial color="#3B82F6" emissive="#2563EB" emissiveIntensity={1.4} />
      </mesh>
      <group position={[0, 0.22, 0]}>
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0.2, 0]}>
          <torusGeometry args={[0.28, 0.01, 16, 56]} />
          <meshStandardMaterial color="#38BDF8" emissive="#0284C7" emissiveIntensity={2.0} />
        </mesh>
        <mesh>
          <octahedronGeometry args={[0.12, 0]} />
          <meshStandardMaterial color="#2563EB" emissive="#3B82F6" emissiveIntensity={1.6} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Middle Operations Layer
 */
function MidTier() {
  return (
    <group position={[0, 0, 0]}>
      <mesh castShadow>
        <boxGeometry args={[1.7, 0.13, 1.7]} />
        <meshPhysicalMaterial color="#FAFAFA" roughness={0.14} metalness={0.12} clearcoat={0.9} transmission={0.25} transparent opacity={0.95} />
      </mesh>
      <mesh position={[0, 0.07, 0]}>
        <boxGeometry args={[1.72, 0.014, 1.72]} />
        <meshStandardMaterial color="#8B5CF6" emissive="#7C3AED" emissiveIntensity={1.4} />
      </mesh>
      {[[-0.34, -0.34], [0.34, -0.34], [-0.34, 0.34], [0.34, 0.34]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.11, z]}>
          <boxGeometry args={[0.18, 0.08, 0.18]} />
          <meshStandardMaterial
            color={['#3B82F6', '#8B5CF6', '#10B981', '#EC4899'][i]}
            emissive={['#2563EB', '#7C3AED', '#059669', '#DB2777'][i]}
            emissiveIntensity={1.4}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Base Data Fabric Layer
 */
function BaseTier() {
  return (
    <group position={[0, -0.6, 0]}>
      <mesh castShadow>
        <boxGeometry args={[1.8, 0.15, 1.8]} />
        <meshStandardMaterial color="#1E293B" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[1.82, 0.014, 1.82]} />
        <meshStandardMaterial color="#10B981" emissive="#059669" emissiveIntensity={1.4} />
      </mesh>
      {[-0.4, -0.13, 0.13, 0.4].map((z, i) => (
        <mesh key={i} position={[0, 0, z]}>
          <boxGeometry args={[1.76, 0.018, 0.05]} />
          <meshStandardMaterial color="#34D399" emissive="#10B981" emissiveIntensity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Full Scene: Rotatable 3-Tier Architecture Stack
 */
function Scene() {
  const stageRef = useRef();
  const isDragging = useRef(false);
  const prevX = useRef(0);
  const vel = useRef(0);
  const rot = useRef(0.65);
  const { gl } = useThree();

  React.useEffect(() => {
    const c = gl.domElement;
    const down = (e) => { isDragging.current = true; prevX.current = e.clientX; vel.current = 0; };
    const move = (e) => { if (!isDragging.current) return; const d = e.clientX - prevX.current; rot.current += d * 0.005; vel.current = d * 0.005; prevX.current = e.clientX; };
    const up = () => { isDragging.current = false; };
    c.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => { c.removeEventListener('pointerdown', down); window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
  }, [gl]);

  useFrame((state) => {
    if (!stageRef.current) return;
    if (!isDragging.current) {
      vel.current *= 0.93;
      rot.current += vel.current;
      rot.current += Math.sin(state.clock.elapsedTime * 0.5) * 0.0008;
    }
    stageRef.current.rotation.y = rot.current;
  });

  return (
    <group ref={stageRef} rotation={[0.4, 0.65, 0]} scale={0.82}>
      <Conduits />
      <DataPulses />
      <TopTier />
      <MidTier />
      <BaseTier />
    </group>
  );
}

/**
 * Export: Compact, Polished 3D Enterprise Architecture Viewer
 */
export default function Enterprise3DStack({ className = '' }) {
  return (
    <div className={`relative w-full h-full select-none ${className}`}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] bg-[radial-gradient(circle,rgba(59,130,246,0.14)_0%,transparent_70%)] rounded-full blur-2xl pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0.35, 6.0], fov: 34 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
        <directionalLight position={[-5, 4, -4]} intensity={0.8} color="#93C5FD" />
        <pointLight position={[0, 0, 3.5]} intensity={0.9} color="#38BDF8" distance={7} />

        <ContactShadows position={[0, -1.1, 0]} opacity={0.35} scale={4.5} blur={2} far={2.5} />

        <Float speed={1.0} rotationIntensity={0.04} floatIntensity={0.15}>
          <Scene />
        </Float>
      </Canvas>
    </div>
  );
}
