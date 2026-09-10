/* eslint-disable react/no-unknown-property */
import React, { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';

// 6 Core Enterprise Module Data Points
const CORE_MODULES = [
  { name: 'Production', color: '#2563EB', angle: 0, distance: 1.95, speed: 0.5, icon: '⚙️', stat: '94.8% OEE' },
  { name: 'Inventory', color: '#7C3AED', angle: (Math.PI * 2) / 6, distance: 2.15, speed: 0.42, icon: '📦', stat: '11 Hubs' },
  { name: 'Quality', color: '#059669', angle: (Math.PI * 4) / 6, distance: 1.85, speed: 0.55, icon: '✓', stat: '99.9% Pass' },
  { name: 'Dispatch', color: '#DB2777', angle: (Math.PI * 6) / 6, distance: 2.25, speed: 0.38, icon: '🚚', stat: '98.2% OTIF' },
  { name: 'Finance', color: '#0284C7', angle: (Math.PI * 8) / 6, distance: 2.05, speed: 0.48, icon: '💳', stat: 'Real-time' },
  { name: 'Analytics', color: '#D97706', angle: (Math.PI * 10) / 6, distance: 2.35, speed: 0.44, icon: '📈', stat: '12ms Query' },
];

/**
 * Stationary Polished Studio Base Pedestal
 */
function StudioPedestal() {
  return (
    <group position={[0, -1.05, 0]}>
      {/* Top Disc */}
      <mesh receiveShadow>
        <cylinderGeometry args={[1.7, 1.76, 0.08, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.18}
          metalness={0.05}
        />
      </mesh>

      {/* Subtle Blue Glow Rim Accent */}
      <mesh position={[0, 0.042, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.71, 0.009, 16, 64]} />
        <meshStandardMaterial
          color="#3B82F6"
          emissive="#3B82F6"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Base Disc */}
      <mesh position={[0, -0.07, 0]} receiveShadow>
        <cylinderGeometry args={[2.05, 2.12, 0.08, 64]} />
        <meshStandardMaterial
          color="#f8fafc"
          roughness={0.25}
          metalness={0.02}
        />
      </mesh>
    </group>
  );
}

/**
 * Triple Polished Gyroscopic Telemetry Rings
 */
function GyroscopicRings() {
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();

  useFrame((_, delta) => {
    if (ring1.current) ring1.current.rotation.z += delta * 0.22;
    if (ring2.current) ring2.current.rotation.x += delta * 0.18;
    if (ring3.current) ring3.current.rotation.y += delta * 0.26;
  });

  return (
    <group position={[0, 0.1, 0]}>
      {/* Primary Cyan/Blue Telemetry Ring */}
      <group rotation={[1.1, 0.35, -0.2]}>
        <group ref={ring1}>
          <mesh>
            <torusGeometry args={[1.55, 0.012, 24, 120]} />
            <meshStandardMaterial
              color="#3B82F6"
              roughness={0.2}
              metalness={0.8}
              emissive="#2563EB"
              emissiveIntensity={0.6}
            />
          </mesh>
          {/* Luminous Bead 1 */}
          <mesh position={[1.55, 0, 0]}>
            <sphereGeometry args={[0.05, 20, 20]} />
            <meshStandardMaterial
              color="#60A5FA"
              emissive="#3B82F6"
              emissiveIntensity={2.5}
            />
          </mesh>
        </group>
      </group>

      {/* Secondary Purple/Violet Telemetry Ring */}
      <group rotation={[-1.0, 0.45, 0.3]}>
        <group ref={ring2}>
          <mesh>
            <torusGeometry args={[1.75, 0.01, 24, 120]} />
            <meshStandardMaterial
              color="#8B5CF6"
              roughness={0.2}
              metalness={0.7}
              emissive="#7C3AED"
              emissiveIntensity={0.5}
            />
          </mesh>
          {/* Luminous Bead 2 */}
          <mesh position={[0, 1.75, 0]}>
            <sphereGeometry args={[0.045, 20, 20]} />
            <meshStandardMaterial
              color="#C084FC"
              emissive="#8B5CF6"
              emissiveIntensity={2.2}
            />
          </mesh>
        </group>
      </group>

      {/* Tertiary Amber/Pink Telemetry Ring */}
      <group rotation={[0.4, -1.2, 0.5]}>
        <group ref={ring3}>
          <mesh>
            <torusGeometry args={[1.92, 0.009, 20, 100]} />
            <meshStandardMaterial
              color="#EC4899"
              roughness={0.25}
              metalness={0.6}
              emissive="#DB2777"
              emissiveIntensity={0.4}
              transparent
              opacity={0.8}
            />
          </mesh>
          {/* Luminous Bead 3 */}
          <mesh position={[-1.92, 0, 0]}>
            <sphereGeometry args={[0.042, 20, 20]} />
            <meshStandardMaterial
              color="#F472B6"
              emissive="#EC4899"
              emissiveIntensity={2.0}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/**
 * Central Crystalline Holographic Core
 */
function HolographicCore({ isHovered }) {
  const meshRef = useRef();
  const innerRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.35;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.5;
      innerRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group position={[0, 0.1, 0]}>
      {/* Inner Glowing Crystal Core */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.48, 0]} />
        <meshPhysicalMaterial
          color="#2563EB"
          emissive="#3B82F6"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Outer Faceted Geometric Glass Sphere */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.78, 1]} />
        <meshPhysicalMaterial
          color="#EFF6FF"
          emissive="#60A5FA"
          emissiveIntensity={0.25}
          roughness={0.08}
          metalness={0.05}
          transmission={0.85}
          ior={1.45}
          thickness={0.6}
          transparent
          opacity={0.92}
          wireframe={false}
        />
      </mesh>

      {/* Thin Golden Ratio Wireframe Lattice */}
      <mesh rotation={[0.4, 0.6, 0]}>
        <icosahedronGeometry args={[0.88, 1]} />
        <meshStandardMaterial
          color="#93C5FD"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}

/**
 * Orbiting Department Modules with Glassmorphic Badges
 */
function OrbitingDepartmentNodes({ activeModule, onSelectModule }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    groupRef.current.children.forEach((child, idx) => {
      const mod = CORE_MODULES[idx];
      if (!mod) return;
      const angle = mod.angle + time * mod.speed * 0.38;
      const x = Math.cos(angle) * mod.distance;
      const z = Math.sin(angle) * mod.distance;
      const y = 0.1 + Math.sin(angle * 2.5) * 0.22;
      child.position.set(x, y, z);
    });
  });

  return (
    <group ref={groupRef}>
      {CORE_MODULES.map((mod) => {
        const isSelected = activeModule === mod.name;
        return (
          <group
            key={mod.name}
            onClick={(e) => {
              e.stopPropagation();
              onSelectModule?.(mod.name);
            }}
          >
            {/* Luminous Spherical Node */}
            <mesh>
              <sphereGeometry args={[isSelected ? 0.16 : 0.11, 24, 24]} />
              <meshStandardMaterial
                color={mod.color}
                emissive={mod.color}
                emissiveIntensity={isSelected ? 2.4 : 1.4}
                roughness={0.2}
              />
            </mesh>

            {/* Glowing Accent Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[isSelected ? 0.22 : 0.16, isSelected ? 0.25 : 0.18, 32]} />
              <meshBasicMaterial
                color={mod.color}
                transparent
                opacity={isSelected ? 0.8 : 0.4}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Interactive HTML Tag */}
            <Html
              position={[0, 0.26, 0]}
              center
              distanceFactor={6.2}
              style={{ pointerEvents: 'none' }}
            >
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide whitespace-nowrap transition-all duration-300 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-lg ring-2 ring-blue-500/60 scale-105'
                    : 'bg-white/95 text-slate-700 shadow-sm border border-slate-200/90'
                }`}
              >
                <span className="text-[12px]">{mod.icon}</span>
                <span>{mod.name}</span>
                <span className="text-[9px] text-blue-500 font-mono font-bold ml-0.5">
                  {mod.stat}
                </span>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

/**
 * Subtle Ambient Particle Field
 */
function AmbientDataDust({ count = 45 }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const pColor = new THREE.Color('#3B82F6');

    for (let i = 0; i < count; i++) {
      const radius = 1.2 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = 0.1 + radius * Math.sin(phi) * Math.sin(theta) * 0.45;
      pos[i * 3 + 2] = radius * Math.cos(phi);

      col[i * 3] = pColor.r;
      col[i * 3 + 1] = pColor.g;
      col[i * 3 + 2] = pColor.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

/**
 * Interactive Spinning Stage with Mouse Tilt & Inertia
 */
function InteractiveStage({ activeModule, onSelectModule }) {
  const stageRef = useRef();
  const isDragging = useRef(false);
  const previousX = useRef(0);
  const velocity = useRef(0);
  const userRotation = useRef(0);
  const [isHovered, setIsHovered] = useState(false);
  const { gl } = useThree();

  // Smooth pointer drag interaction
  React.useEffect(() => {
    const canvas = gl.domElement;

    const onDown = (e) => {
      isDragging.current = true;
      previousX.current = e.clientX;
      velocity.current = 0;
    };

    const onMove = (e) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - previousX.current;
      userRotation.current += deltaX * 0.006;
      velocity.current = deltaX * 0.006;
      previousX.current = e.clientX;
    };

    const onUp = () => {
      isDragging.current = false;
    };

    canvas.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    return () => {
      canvas.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [gl]);

  useFrame((state) => {
    if (!stageRef.current) return;

    if (!isDragging.current) {
      velocity.current *= 0.94;
      userRotation.current += velocity.current;
      // Gentle automatic sway
      const t = state.clock.elapsedTime;
      const subtleSway = Math.sin(t * 0.6) * 0.08;
      stageRef.current.rotation.y = userRotation.current + subtleSway;
    } else {
      stageRef.current.rotation.y = userRotation.current;
    }

    // Gentle subtle pitch
    stageRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.04;
  });

  return (
    <group
      ref={stageRef}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <HolographicCore isHovered={isHovered} />
      <GyroscopicRings />
      <OrbitingDepartmentNodes activeModule={activeModule} onSelectModule={onSelectModule} />
      <AmbientDataDust count={40} />
    </group>
  );
}

/**
 * Exported Component: Studio-Grade 3D Enterprise Core
 */
export default function Enterprise3DCore({ activeModule = 'Production', onSelectModule, className = '' }) {
  return (
    <div className={`relative w-full h-[400px] sm:h-[460px] lg:h-[500px] flex items-center justify-center select-none ${className}`}>
      
      {/* Background Soft Studio Aura */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[440px] h-[340px] sm:h-[440px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12)_0%,rgba(124,58,237,0.06)_40%,transparent_70%)] rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <Canvas
        camera={{ position: [0, 0.4, 6.2], fov: 42 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Balanced Studio Key, Rim & Ambient Lighting */}
        <ambientLight intensity={0.75} />
        <directionalLight position={[4, 6, 4]} intensity={1.4} color="#ffffff" />
        <directionalLight position={[-4, 3, -2]} intensity={1.1} color="#93C5FD" />
        <directionalLight position={[0, -2, 3]} intensity={0.5} color="#E0E7FF" />
        <pointLight position={[0, 0.3, 1.5]} intensity={1.2} color="#3B82F6" distance={5} />

        <Suspense fallback={null}>
          {/* Studio Pedestal Floor */}
          <StudioPedestal />

          {/* Contact Shadow on Floor Pedestal */}
          <ContactShadows
            position={[0, -0.99, 0]}
            opacity={0.45}
            scale={3.6}
            blur={1.8}
            far={2.2}
          />

          {/* Interactive Gyroscopic Stage */}
          <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
            <InteractiveStage activeModule={activeModule} onSelectModule={onSelectModule} />
          </Float>
        </Suspense>
      </Canvas>

      {/* Modern Studio HUD Badges */}
      <div className="absolute top-3 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm text-xs font-semibold text-slate-800">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
        </span>
        <span>IDMS Neural Core</span>
        <span className="text-[10px] text-slate-400 font-mono">v4.2</span>
      </div>

      <div className="absolute top-3 right-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50/90 backdrop-blur-md border border-slate-200/70 text-[11px] font-medium text-slate-600 shadow-2xs">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>11/11 Synced</span>
      </div>

      <div className="absolute bottom-3 text-center z-10 text-[11px] text-slate-400 font-medium bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full border border-slate-200/60 shadow-2xs hidden sm:block">
        Click or drag to rotate 3D core · Select nodes to sync metrics
      </div>
    </div>
  );
}
