/* eslint-disable react/no-unknown-property */
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Building Block ───────────────────────────────── */
function Building({ position, size = [0.3, 0.6, 0.3], color = '#1a3a5c', emissive = '#1e40af', windowColor = '#38bdf8' }) {
  const [w, h, d] = size;
  return (
    <group position={position}>
      {/* Main body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Roof accent */}
      <mesh position={[0, h / 2 + 0.015, 0]}>
        <boxGeometry args={[w + 0.02, 0.03, d + 0.02]} />
        <meshStandardMaterial color={emissive} emissive={emissive} emissiveIntensity={0.6} />
      </mesh>
      {/* Glowing windows rows */}
      {Array.from({ length: Math.max(1, Math.floor(h / 0.22)) }).map((_, row) => (
        <React.Fragment key={row}>
          {/* Front face windows */}
          <mesh position={[0, -h / 2 + 0.15 + row * 0.22, d / 2 + 0.001]}>
            <planeGeometry args={[w * 0.65, 0.06]} />
            <meshStandardMaterial color={windowColor} emissive={windowColor} emissiveIntensity={1.8} transparent opacity={0.9} />
          </mesh>
          {/* Side face windows */}
          <mesh position={[w / 2 + 0.001, -h / 2 + 0.15 + row * 0.22, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[d * 0.65, 0.06]} />
            <meshStandardMaterial color={windowColor} emissive={windowColor} emissiveIntensity={1.8} transparent opacity={0.9} />
          </mesh>
        </React.Fragment>
      ))}
    </group>
  );
}

/* ─── Factory Smokestack ───────────────────────────── */
function Smokestack({ position, height = 0.8 }) {
  const smokeRef = useRef();
  useFrame((state) => {
    if (smokeRef.current) {
      smokeRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.15;
      smokeRef.current.position.y = height / 2 + 0.15 + Math.sin(state.clock.elapsedTime * 1.5) * 0.03;
    }
  });

  return (
    <group position={position}>
      {/* Stack cylinder */}
      <mesh castShadow>
        <cylinderGeometry args={[0.06, 0.08, height, 12]} />
        <meshStandardMaterial color="#374151" roughness={0.6} metalness={0.5} />
      </mesh>
      {/* Red warning light */}
      <mesh position={[0, height / 2 + 0.02, 0]}>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={3.0} />
      </mesh>
      {/* Smoke puff */}
      <mesh ref={smokeRef} position={[0, height / 2 + 0.15, 0]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#94a3b8" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

/* ─── Ground Platform with Grid ────────────────────── */
function GroundPlatform() {
  return (
    <group position={[0, -0.02, 0]}>
      {/* Main ground */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5.5, 5.5]} />
        <meshStandardMaterial color="#0c1929" roughness={0.9} />
      </mesh>
      {/* Grid lines */}
      <gridHelper args={[5.5, 22, '#1e3a5f', '#0f2744']} position={[0, 0.005, 0]} />
      {/* Road strips */}
      {[-0.5, 0.8].map((z, i) => (
        <mesh key={i} position={[0, 0.008, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[5.5, 0.18]} />
          <meshStandardMaterial color="#1a2d42" roughness={0.8} />
        </mesh>
      ))}
      {/* Road center lines */}
      {[-0.5, 0.8].map((z, i) => (
        <mesh key={`line-${i}`} position={[0, 0.012, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[5.5, 0.02]} />
          <meshStandardMaterial color="#334155" emissive="#334155" emissiveIntensity={0.5} />
        </mesh>
      ))}
      {/* Cross road */}
      <mesh position={[0.4, 0.008, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[5.5, 0.16]} />
        <meshStandardMaterial color="#1a2d42" roughness={0.8} />
      </mesh>
    </group>
  );
}

/* ─── Glowing Ground Accent Pads ───────────────────── */
function GlowPad({ position, size = [0.4, 0.4], color = '#3b82f6' }) {
  return (
    <mesh position={[position[0], 0.015, position[2]]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={size} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.4} />
    </mesh>
  );
}

/* ─── Trees / Park Elements ────────────────────────── */
function SmallTree({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.12, 6]} />
        <meshStandardMaterial color="#4a3728" />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#166534" emissive="#15803d" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

/* ─── Complete Isometric Smart City / Factory Scene ─── */
function SmartFactoryScene() {
  const stageRef = useRef();
  const isDragging = useRef(false);
  const prevX = useRef(0);
  const vel = useRef(0);
  const rot = useRef(0.78);
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
      rot.current += Math.sin(state.clock.elapsedTime * 0.4) * 0.0006;
    }
    stageRef.current.rotation.y = rot.current;
  });

  return (
    <group ref={stageRef} rotation={[0.55, 0.78, 0]} scale={0.58}>
      <GroundPlatform />

      {/* ── Main Tall Buildings (City Center) ── */}
      <Building position={[-0.3, 0.5, -0.3]} size={[0.45, 1.0, 0.45]} color="#0f2744" emissive="#2563eb" windowColor="#38bdf8" />
      <Building position={[0.4, 0.35, -0.5]} size={[0.35, 0.7, 0.4]} color="#122b47" emissive="#3b82f6" windowColor="#60a5fa" />
      <Building position={[-0.8, 0.25, 0.2]} size={[0.38, 0.5, 0.35]} color="#162d4a" emissive="#1d4ed8" windowColor="#93c5fd" />
      <Building position={[0.9, 0.22, -0.1]} size={[0.32, 0.44, 0.32]} color="#132840" emissive="#2563eb" windowColor="#38bdf8" />
      
      {/* ── Medium Office Buildings ── */}
      <Building position={[-1.2, 0.18, -0.6]} size={[0.3, 0.36, 0.28]} color="#1a3352" emissive="#1e40af" windowColor="#60a5fa" />
      <Building position={[0.1, 0.18, 0.5]} size={[0.28, 0.36, 0.3]} color="#172e48" emissive="#3b82f6" windowColor="#7dd3fc" />
      <Building position={[1.3, 0.15, 0.5]} size={[0.26, 0.3, 0.24]} color="#1a3050" emissive="#1e40af" windowColor="#38bdf8" />
      <Building position={[-0.6, 0.16, 1.0]} size={[0.3, 0.32, 0.28]} color="#152a44" emissive="#2563eb" windowColor="#60a5fa" />
      
      {/* ── Small Warehouse / Factory Buildings ── */}
      <Building position={[0.7, 0.12, 1.0]} size={[0.5, 0.24, 0.35]} color="#1e3650" emissive="#7c3aed" windowColor="#a78bfa" />
      <Building position={[-1.4, 0.1, 0.8]} size={[0.4, 0.2, 0.3]} color="#1a3048" emissive="#059669" windowColor="#34d399" />
      <Building position={[1.5, 0.12, -0.8]} size={[0.35, 0.24, 0.28]} color="#172c45" emissive="#0284c7" windowColor="#38bdf8" />

      {/* ── Factory Smokestacks ── */}
      <Smokestack position={[0.85, 0.44, -0.1]} height={0.66} />
      <Smokestack position={[-0.95, 0.25, 0.55]} height={0.5} />
      <Smokestack position={[0.5, 0.24, 1.15]} height={0.48} />

      {/* ── Glowing Ground Accent Pads (Tech Feel) ── */}
      <GlowPad position={[-0.3, 0, -0.3]} size={[0.55, 0.55]} color="#2563eb" />
      <GlowPad position={[0.4, 0, -0.5]} size={[0.45, 0.5]} color="#3b82f6" />
      <GlowPad position={[0.7, 0, 1.0]} size={[0.6, 0.42]} color="#7c3aed" />
      <GlowPad position={[-1.4, 0, 0.8]} size={[0.5, 0.38]} color="#059669" />

      {/* ── Trees / Green Spaces ── */}
      <SmallTree position={[-0.1, 0, 0.15]} />
      <SmallTree position={[0.65, 0, 0.3]} />
      <SmallTree position={[-0.55, 0, -0.9]} />
      <SmallTree position={[1.1, 0, 0.7]} />
      <SmallTree position={[-1.0, 0, -0.2]} />
      <SmallTree position={[0.2, 0, -1.0]} />

      {/* ── Floating Layer Labels (HTML overlays) ── */}
      <Html position={[-0.3, 1.35, -0.3]} distanceFactor={6} style={{ pointerEvents: 'none' }}>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/90 border border-blue-400/60 shadow-lg shadow-blue-500/30 backdrop-blur-md text-[10px] font-bold text-white whitespace-nowrap">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          L3 · AI Decision
        </div>
      </Html>

      <Html position={[0.6, 0.65, -0.2]} distanceFactor={6} style={{ pointerEvents: 'none' }}>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-600/90 border border-purple-400/60 shadow-lg shadow-purple-500/30 backdrop-blur-md text-[10px] font-bold text-white whitespace-nowrap">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          L2 · 11 Modules
        </div>
      </Html>

      <Html position={[0.8, 0.2, 1.1]} distanceFactor={6} style={{ pointerEvents: 'none' }}>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/90 border border-emerald-400/60 shadow-lg shadow-emerald-500/30 backdrop-blur-md text-[10px] font-bold text-white whitespace-nowrap">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          L1 · Data Fabric
        </div>
      </Html>
    </group>
  );
}

/* ─── Exported Component ───────────────────────────── */
export default function SmartCityViewer({ className = '' }) {
  return (
    <div className={`relative w-full h-full select-none ${className}`}>
      <Canvas
        camera={{ position: [0, 1.2, 5.8], fov: 36 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Dark city ambient */}
        <ambientLight intensity={0.25} />
        {/* Cool moonlight key */}
        <directionalLight position={[6, 10, 5]} intensity={0.9} color="#c7d2fe" castShadow />
        {/* Warm accent from side */}
        <directionalLight position={[-4, 5, -3]} intensity={0.5} color="#60a5fa" />
        {/* Ground up-glow */}
        <pointLight position={[0, -0.5, 0]} intensity={0.6} color="#1e40af" distance={6} />
        {/* Blue atmospheric point */}
        <pointLight position={[0, 2, 2]} intensity={0.5} color="#38bdf8" distance={8} />

        <fog attach="fog" args={['#0a1628', 4, 12]} />

        <ContactShadows position={[0, -0.018, 0]} opacity={0.6} scale={6} blur={2.5} far={3} color="#0a1628" />

        <Float speed={0.8} rotationIntensity={0.02} floatIntensity={0.08}>
          <SmartFactoryScene />
        </Float>
      </Canvas>
    </div>
  );
}
