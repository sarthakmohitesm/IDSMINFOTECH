/* eslint-disable react/no-unknown-property */
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

/* ─── 1. Animated Industrial Steam / Smoke ─────────── */
function ChimneySmoke({ position, color = '#cbd5e1' }) {
  const particlesRef = useRef();
  const count = 10;

  const initialPuffs = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      y: (i / count) * 0.7,
      x: (Math.random() - 0.5) * 0.06,
      z: (Math.random() - 0.5) * 0.06,
      speed: 0.35 + Math.random() * 0.2,
    }));
  }, [count]);

  const puffs = useRef(initialPuffs);

  useFrame((_, delta) => {
    if (!particlesRef.current) return;
    particlesRef.current.children.forEach((mesh, i) => {
      const p = puffs.current[i];
      p.y += delta * p.speed;
      if (p.y > 0.7) {
        p.y = 0;
        p.x = (Math.random() - 0.5) * 0.04;
        p.z = (Math.random() - 0.5) * 0.04;
      }
      mesh.position.set(p.x, p.y, p.z);
      const progress = p.y / 0.7;
      mesh.scale.setScalar(0.035 + progress * 0.07);
      if (mesh.material) {
        mesh.material.opacity = Math.max(0, 0.35 * (1 - progress));
      }
    });
  });

  return (
    <group position={position} ref={particlesRef}>
      {initialPuffs.map((_, i) => (
        <mesh key={i} position={[0, 0, 0]}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.25} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── 2. Low-Poly Stylized Trees ───────────────────── */
function LowPolyTree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.06, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.03, 0.12, 6]} />
        <meshStandardMaterial color="#451a03" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.16, 0]} castShadow>
        <coneGeometry args={[0.1, 0.16, 7]} />
        <meshStandardMaterial color="#047857" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.23, 0]} castShadow>
        <coneGeometry args={[0.075, 0.14, 7]} />
        <meshStandardMaterial color="#059669" roughness={0.7} />
      </mesh>
    </group>
  );
}

/* ─── 3. Shipping Containers ───────────────────────── */
function ShippingContainer({ position, rotation = [0, 0, 0], color = '#0284c7' }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.34, 0.14, 0.15]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.5} />
      </mesh>
      {[-0.1, 0, 0.1].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.076]}>
          <boxGeometry args={[0.015, 0.12, 0.005]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── 4. Delivery Transport Truck ──────────────────── */
function TransportTruck({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation} scale={0.75}>
      <mesh position={[0.16, 0.09, 0]} castShadow>
        <boxGeometry args={[0.14, 0.14, 0.14]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} metalness={0.4} />
      </mesh>
      <mesh position={[0.22, 0.11, 0]}>
        <boxGeometry args={[0.03, 0.06, 0.12]} />
        <meshStandardMaterial color="#0284c7" roughness={0.1} />
      </mesh>
      <mesh position={[-0.1, 0.12, 0]} castShadow>
        <boxGeometry args={[0.34, 0.18, 0.15]} />
        <meshStandardMaterial color="#2563eb" roughness={0.4} metalness={0.3} />
      </mesh>
      {[-0.2, 0, 0.18].map((x, i) => (
        <React.Fragment key={i}>
          <mesh position={[x, 0.03, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.025, 12]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          <mesh position={[x, 0.03, -0.08]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.025, 12]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        </React.Fragment>
      ))}
    </group>
  );
}

/* ─── 5. Industrial Silos with Domed Tops & Pipes ───── */
function StorageSilos({ position }) {
  return (
    <group position={position}>
      <group position={[-0.18, 0, 0]}>
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.7, 32]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.2} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0.58, 0]}>
          <cylinderGeometry args={[0.224, 0.224, 0.08, 32]} />
          <meshStandardMaterial color="#2563eb" roughness={0.3} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0.7, 0]} castShadow>
          <sphereGeometry args={[0.22, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.2} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.23, 0.23, 0.1, 32]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.4} />
        </mesh>
      </group>

      <group position={[0.22, 0, -0.15]}>
        <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.24, 0.24, 0.76, 32]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0.64, 0]}>
          <cylinderGeometry args={[0.244, 0.244, 0.08, 32]} />
          <meshStandardMaterial color="#2563eb" roughness={0.3} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0.76, 0]} castShadow>
          <sphereGeometry args={[0.24, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.1, 32]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.4} />
        </mesh>
      </group>

      <mesh position={[0.35, 0.52, 0.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.025, 0.025, 0.55, 16]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}

/* ─── 6. Industrial Smokestacks with Hazard Stripes ─── */
function Smokestacks({ position }) {
  return (
    <group position={position}>
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0.1, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.14, 0.2, 24]} />
          <meshStandardMaterial color="#334155" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.75, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.11, 1.1, 24]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.98, 0]}>
          <cylinderGeometry args={[0.084, 0.088, 0.1, 24]} />
          <meshStandardMaterial color="#2563eb" roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.08, 0]}>
          <cylinderGeometry args={[0.082, 0.084, 0.1, 24]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.18, 0]}>
          <cylinderGeometry args={[0.08, 0.082, 0.1, 24]} />
          <meshStandardMaterial color="#2563eb" roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.25, 0]}>
          <sphereGeometry args={[0.02, 12, 12]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={3.5} />
        </mesh>
        <ChimneySmoke position={[0, 1.26, 0]} />
      </group>

      <group position={[0.28, 0, 0.1]}>
        <mesh position={[0, 0.08, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.12, 0.16, 24]} />
          <meshStandardMaterial color="#334155" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.65, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.095, 0.98, 24]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.88, 0]}>
          <cylinderGeometry args={[0.073, 0.077, 0.09, 24]} />
          <meshStandardMaterial color="#2563eb" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.97, 0]}>
          <cylinderGeometry args={[0.071, 0.073, 0.09, 24]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.06, 0]}>
          <cylinderGeometry args={[0.069, 0.071, 0.09, 24]} />
          <meshStandardMaterial color="#2563eb" roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.12, 0]}>
          <sphereGeometry args={[0.018, 12, 12]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={3.0} />
        </mesh>
        <ChimneySmoke position={[0, 1.13, 0]} />
      </group>
    </group>
  );
}

/* ─── 7. Main Manufacturing Factory Complex ────────── */
function MainFactoryPlant({ position }) {
  return (
    <group position={position}>
      <group position={[0, 0.42, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.35, 0.84, 0.95]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.25} metalness={0.35} />
        </mesh>

        <mesh position={[0, 0.43, 0]}>
          <boxGeometry args={[1.38, 0.04, 0.98]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.4} />
        </mesh>

        {[-0.5, -0.25, 0, 0.25, 0.5].map((x, i) => (
          <mesh key={i} position={[x, 0, 0.478]}>
            <boxGeometry args={[0.03, 0.78, 0.01]} />
            <meshStandardMaterial color="#3b82f6" roughness={0.3} />
          </mesh>
        ))}

        {[-0.2, 0.08, 0.28].map((y, i) => (
          <mesh key={`fw-${i}`} position={[0, y, 0.48]}>
            <planeGeometry args={[1.2, 0.09]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={2.4}
              roughness={0.1}
            />
          </mesh>
        ))}

        {[-0.2, 0.08, 0.28].map((y, i) => (
          <mesh key={`sw-${i}`} position={[0.68, y, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[0.8, 0.09]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={2.4}
              roughness={0.1}
            />
          </mesh>
        ))}

        {[-0.35, -0.1, 0.15, 0.4].map((x, i) => (
          <mesh key={`solar-${i}`} position={[x, 0.46, -0.15]} rotation={[-0.15, 0, 0]}>
            <boxGeometry args={[0.18, 0.015, 0.35]} />
            <meshStandardMaterial color="#1e40af" roughness={0.15} metalness={0.8} />
          </mesh>
        ))}

        {[-0.28, 0.25].map((x, i) => (
          <group key={`hvac-${i}`} position={[x, 0.5, 0.25]}>
            <mesh castShadow>
              <boxGeometry args={[0.22, 0.12, 0.18]} />
              <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.6} />
            </mesh>
            <mesh position={[0, 0.065, 0]}>
              <cylinderGeometry args={[0.06, 0.06, 0.01, 16]} />
              <meshStandardMaterial color="#0f172a" />
            </mesh>
          </group>
        ))}
      </group>

      <group position={[0.78, 0.28, 0.12]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.55, 0.56, 0.72]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0.29, 0]}>
          <boxGeometry args={[0.57, 0.03, 0.74]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.4} />
        </mesh>
        {[-0.16, 0.16].map((z, i) => (
          <mesh key={`dock-${i}`} position={[0.28, -0.06, z]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[0.2, 0.24]} />
            <meshStandardMaterial color="#0284c7" roughness={0.5} metalness={0.4} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ─── 8. Modern Glass Front Office / R&D HQ ────────── */
function OfficeHeadquarters({ position }) {
  return (
    <group position={position}>
      <group position={[0, 0.4, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.85, 0.8, 0.75]} />
          <meshPhysicalMaterial
            color="#0284c7"
            roughness={0.12}
            metalness={0.15}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            transmission={0.4}
            transparent
            opacity={0.92}
          />
        </mesh>

        <mesh position={[0, 0.41, 0]}>
          <boxGeometry args={[0.88, 0.03, 0.78]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>

        {[-0.15, 0.12].map((y, i) => (
          <mesh key={`floor-${i}`} position={[0, y, 0]}>
            <boxGeometry args={[0.86, 0.02, 0.76]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
        ))}

        {[-0.26, 0.0, 0.25].map((y, i) => (
          <mesh key={`win-glow-${i}`} position={[0, y, 0.378]}>
            <planeGeometry args={[0.74, 0.08]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={2.2}
            />
          </mesh>
        ))}

        <group position={[0, 0.48, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.38, 0.12, 0.32]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/* ─── 9. The Island Pedestal (Roads, Perimeter, LED) ── */
function IslandPedestal() {
  return (
    <group position={[0, -0.05, 0]}>
      <mesh receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[4.2, 0.14, 3.6]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>

      <mesh receiveShadow position={[0, -0.22, 0]}>
        <boxGeometry args={[4.35, 0.32, 3.75]} />
        <meshStandardMaterial color="#0b1320" roughness={0.6} metalness={0.7} />
      </mesh>

      <mesh position={[0, -0.07, 0]}>
        <boxGeometry args={[4.24, 0.025, 3.64]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#00f0ff"
          emissiveIntensity={3.2}
        />
      </mesh>

      <mesh receiveShadow position={[-1.3, 0.075, 1.1]}>
        <boxGeometry args={[0.9, 0.015, 0.8]} />
        <meshStandardMaterial color="#047857" roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[1.2, 0.075, -1.0]}>
        <boxGeometry args={[1.0, 0.015, 0.7]} />
        <meshStandardMaterial color="#047857" roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[-1.2, 0.075, -1.0]}>
        <boxGeometry args={[0.8, 0.015, 0.7]} />
        <meshStandardMaterial color="#047857" roughness={0.9} />
      </mesh>

      {[-1.4, -1.0, -0.6, -0.2, 0.2, 0.6, 1.0, 1.4].map((x, i) => (
        <mesh key={`lane-${i}`} position={[x, 0.076, 1.55]}>
          <planeGeometry args={[0.18, 0.02]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} rotation={[-Math.PI / 2, 0, 0]} />
        </mesh>
      ))}
      {[-1.0, -0.5, 0, 0.5, 1.0].map((z, i) => (
        <mesh key={`side-lane-${i}`} position={[1.85, 0.076, z]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[0.18, 0.02]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </mesh>
      ))}

      {[-0.08, -0.04, 0, 0.04, 0.08].map((offset, i) => (
        <mesh key={`cross-${i}`} position={[-0.45, 0.076, 1.45 + offset]}>
          <planeGeometry args={[0.08, 0.02]} />
          <meshStandardMaterial color="#f8fafc" rotation={[-Math.PI / 2, 0, 0]} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── 10. Sleek 3D Beacon Hotspots (Pure 3D - Zero Overlap) ─── */
function BeaconDot({ position, color = '#38bdf8', active = false, onClick }) {
  return (
    <group position={position} onClick={onClick}>
      {/* Laser stem */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.3, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3.0} />
      </mesh>

      {/* Glowing 3D Beacon Sphere */}
      <mesh position={[0, 0.32, 0]}>
        <sphereGeometry args={[active ? 0.07 : 0.05, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={4.0} />
      </mesh>

      {/* Outer Pulse Ring */}
      <mesh position={[0, 0.32, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.08, 0.1, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2.5}
          side={THREE.DoubleSide}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}

/* ─── 11. Complete Interactive Smart Factory Scene ─── */
function FactoryCampusScene({ activeLayer, onSelectLayer, viewMode }) {
  const isExploded = viewMode === 'exploded';

  return (
    <group position={[0, -0.2, 0]}>
      {/* ── TIER 1: Foundation Pedestal (L1: Data Fabric) ── */}
      <group
        position={[0, isExploded ? -0.45 : 0, 0]}
        style={{ transition: 'position 0.5s ease' }}
      >
        <IslandPedestal />

        <LowPolyTree position={[-1.5, 0.07, 1.3]} scale={1.1} />
        <LowPolyTree position={[-1.2, 0.07, 1.4]} scale={0.9} />
        <LowPolyTree position={[-1.6, 0.07, 0.9]} scale={1.0} />
        <LowPolyTree position={[-1.1, 0.07, 0.8]} scale={0.8} />

        <LowPolyTree position={[1.4, 0.07, -0.9]} scale={1.1} />
        <LowPolyTree position={[1.1, 0.07, -1.1]} scale={0.9} />
        <LowPolyTree position={[1.5, 0.07, -1.2]} scale={1.0} />

        <LowPolyTree position={[-1.3, 0.07, -1.1]} scale={1.0} />
        <LowPolyTree position={[-1.0, 0.07, -1.2]} scale={0.85} />

        <TransportTruck position={[1.4, 0.07, 0.35]} rotation={[0, -Math.PI / 2, 0]} />
        <TransportTruck position={[1.4, 0.07, 0.9]} rotation={[0, -Math.PI / 2, 0]} />

        <ShippingContainer position={[1.25, 0.14, 1.35]} color="#0284c7" />
        <ShippingContainer position={[0.85, 0.14, 1.35]} color="#f97316" />
        <ShippingContainer position={[1.05, 0.28, 1.35]} color="#f8fafc" />

        <BeaconDot
          position={[1.8, 0.05, 1.4]}
          color="#10b981"
          active={activeLayer === 1}
          onClick={() => onSelectLayer(1)}
        />
      </group>

      {/* ── TIER 2: Factory Campus Buildings (L2: 11 Modules) ── */}
      <group position={[0, 0, 0]}>
        <OfficeHeadquarters position={[-0.85, 0.07, 0.25]} />
        <StorageSilos position={[-0.75, 0.07, -0.65]} />
        <MainFactoryPlant position={[0.25, 0.07, -0.15]} />

        <BeaconDot
          position={[0.25, 0.95, -0.15]}
          color="#6366f1"
          active={activeLayer === 2}
          onClick={() => onSelectLayer(2)}
        />
      </group>

      {/* ── TIER 3: Smokestacks & AI Decision Cloud (L3: AI Decision) ── */}
      <group
        position={[0, isExploded ? 0.65 : 0, 0]}
        style={{ transition: 'position 0.5s ease' }}
      >
        <Smokestacks position={[0.4, 0.07, -0.85]} />

        <BeaconDot
          position={[0.4, 1.35, -0.85]}
          color="#38bdf8"
          active={activeLayer === 3}
          onClick={() => onSelectLayer(3)}
        />
      </group>
    </group>
  );
}

/* ─── 12. Main Exported 3D Component with WebGL Canvas ─── */
export default function SmartFactory3D({
  activeLayer = 1,
  onSelectLayer = () => {},
  viewMode = 'stacked',
  className = '',
}) {
  return (
    <div className={`relative w-full h-full select-none ${className}`}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-[radial-gradient(circle,rgba(56,189,248,0.15)_0%,rgba(16,185,129,0.06)_50%,transparent_70%)] rounded-full blur-2xl pointer-events-none" />

      <Canvas
        camera={{ position: [3.3, 2.6, 3.3], fov: 33 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        shadows
      >
        <ambientLight intensity={0.65} color="#e0f2fe" />
        
        <directionalLight
          position={[7, 10, 6]}
          intensity={1.8}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={25}
          shadow-camera-left={-4}
          shadow-camera-right={4}
          shadow-camera-top={4}
          shadow-camera-bottom={-4}
          shadow-bias={-0.0005}
        />

        <directionalLight position={[-6, 5, -5]} intensity={0.9} color="#38bdf8" />
        <pointLight position={[0, -0.2, 0]} intensity={1.2} color="#00f0ff" distance={5} />
        <pointLight position={[-1, 1, 1.5]} intensity={0.4} color="#f59e0b" distance={4} />

        <ContactShadows
          position={[0, -0.32, 0]}
          opacity={0.6}
          scale={7}
          blur={2.2}
          far={3.5}
          color="#080f1a"
        />

        <Float speed={0.8} rotationIntensity={0.02} floatIntensity={0.06}>
          <FactoryCampusScene
            activeLayer={activeLayer}
            onSelectLayer={onSelectLayer}
            viewMode={viewMode}
          />
        </Float>

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={3.0}
          maxDistance={7.5}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 6}
          dampingFactor={0.08}
          rotateSpeed={0.6}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
