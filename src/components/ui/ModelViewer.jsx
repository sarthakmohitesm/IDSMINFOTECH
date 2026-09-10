/* eslint-disable react/no-unknown-property */
import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, Center } from '@react-three/drei';
import * as THREE from 'three';

/**
 * 3D IDMS Logo with Solid, Deep, Saturated Colors matching reference image
 */
function Model({ url = '/IDMS_logo.glb', scale = 0.46 }) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        const meshName = child.name || '';
        const matName = (child.material?.name || '').toLowerCase();

        let solidColor = '#e1146c'; // Default deep solid fuchsia pink

        // Curve012_1: Inner curved petals -> Deep rich royal purple
        if (meshName.includes('_1') || matName.includes('002') || matName.includes('purple')) {
          solidColor = '#6d11d9'; // Deep bold royal purple / violet
        } else if (meshName.includes('_2') || matName.includes('001')) {
          // Curve012_2: Outer diagonal bars -> Deep rich hot pink / magenta
          solidColor = '#ea1b72'; // Deep bold magenta-pink
        } else {
          // Curve012: Central vertical spindle & core -> Deep vibrant fuchsia
          solidColor = '#e60067'; // Solid saturated fuchsia
        }

        const solidMaterial = new THREE.MeshPhysicalMaterial({
          name: meshName.includes('_1') ? 'solid_purple' : 'solid_pink',
          color: new THREE.Color(solidColor),
          roughness: 0.22,
          metalness: 0.02,
          clearcoat: 0.35,
          clearcoatRoughness: 0.2,
          reflectivity: 0.4,
          transmission: 0, // 100% solid opaque - zero glass/transparency
          transparent: false,
          opacity: 1.0,
          depthWrite: true,
          toneMapped: true,
        });

        child.material = solidMaterial;
      }
    });
  }, [scene]);

  return (
    <Center position={[0, 0.2, 0]}>
      <primitive object={scene} scale={scale} />
    </Center>
  );
}

/**
 * Stationary Multi-tier Pedestal (Floor Platform)
 * Firmly anchored, does NOT move or tilt.
 */
function Pedestal() {
  return (
    <group position={[0, -0.88, 0]}>
      {/* Top Tier Platform */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <cylinderGeometry args={[1.52, 1.58, 0.13, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.16}
          metalness={0.06}
        />
      </mesh>
      {/* Top Tier Soft Violet/Pink Neon Rim */}
      <mesh position={[0, 0.066, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.53, 0.012, 16, 64]} />
        <meshStandardMaterial
          color="#f472b6"
          emissive="#f472b6"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Base Tier Platform (Wider) */}
      <mesh position={[0, -0.13, 0]} receiveShadow>
        <cylinderGeometry args={[1.92, 2.02, 0.14, 64]} />
        <meshStandardMaterial
          color="#fbfbfe"
          roughness={0.22}
          metalness={0.04}
        />
      </mesh>
      {/* Base Tier Soft Purple Glow Rim */}
      <mesh position={[0, -0.058, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.94, 0.013, 16, 64]} />
        <meshStandardMaterial
          color="#c084fc"
          emissive="#a855f7"
          emissiveIntensity={0.9}
        />
      </mesh>

      {/* Bottom Ground Step Rim */}
      <mesh position={[0, -0.198, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.04, 0.014, 16, 64]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#9333ea"
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
}

/**
 * Orbital Rings with Glowing Beads orbiting around the IDMS diamond
 */
function OrbitalRings() {
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame((_, delta) => {
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.2;
    if (ring2Ref.current) ring2Ref.current.rotation.z -= delta * 0.16;
  });

  return (
    <group position={[0, 0.16, 0]}>
      {/* Ring 1 - Tilted Ellipse */}
      <group rotation={[1.16, 0.36, -0.22]}>
        <group ref={ring1Ref}>
          <mesh>
            <torusGeometry args={[1.86, 0.008, 16, 120]} />
            <meshStandardMaterial
              color="#c084fc"
              emissive="#a855f7"
              emissiveIntensity={0.6}
              transparent
              opacity={0.65}
            />
          </mesh>
          {/* Glowing Pink Bead on Ring 1 */}
          <mesh position={[1.86, 0, 0]}>
            <sphereGeometry args={[0.065, 24, 24]} />
            <meshStandardMaterial
              color="#f43f5e"
              emissive="#f43f5e"
              emissiveIntensity={2.2}
            />
          </mesh>
          {/* Glowing Cyan Bead on Ring 1 */}
          <mesh position={[-1.86, 0, 0]}>
            <sphereGeometry args={[0.06, 24, 24]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#0284c7"
              emissiveIntensity={2.2}
            />
          </mesh>
        </group>
      </group>

      {/* Ring 2 - Opposite Tilted Ellipse */}
      <group rotation={[1.28, -0.42, 0.22]}>
        <group ref={ring2Ref}>
          <mesh>
            <torusGeometry args={[2.16, 0.008, 16, 120]} />
            <meshStandardMaterial
              color="#f472b6"
              emissive="#ec4899"
              emissiveIntensity={0.55}
              transparent
              opacity={0.6}
            />
          </mesh>
          {/* Glowing Magenta Bead on Ring 2 */}
          <mesh position={[0, 2.16, 0]}>
            <sphereGeometry args={[0.07, 24, 24]} />
            <meshStandardMaterial
              color="#ec4899"
              emissive="#ec4899"
              emissiveIntensity={2.2}
            />
          </mesh>
          {/* Glowing Violet Bead on Ring 2 */}
          <mesh position={[0, -2.16, 0]}>
            <sphereGeometry args={[0.06, 24, 24]} />
            <meshStandardMaterial
              color="#a855f7"
              emissive="#a855f7"
              emissiveIntensity={2.2}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/**
 * Interactive Spinning Stage for the Logo + Rings ONLY.
 * The Pedestal underneath stays 100% stationary!
 */
function RotatingLogoStage({ scale }) {
  const stageRef = useRef();
  const isDragging = useRef(false);
  const previousX = useRef(0);
  const velocity = useRef(0);
  const userRotation = useRef(-0.1);
  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;

    const onPointerDown = (e) => {
      isDragging.current = true;
      previousX.current = e.clientX;
      velocity.current = 0;
    };

    const onPointerMove = (e) => {
      if (!isDragging.current || !stageRef.current) return;
      const deltaX = e.clientX - previousX.current;
      userRotation.current += deltaX * 0.008;
      velocity.current = deltaX * 0.008;
      previousX.current = e.clientX;
    };

    const onPointerUp = () => {
      isDragging.current = false;
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [gl]);

  useFrame((state) => {
    if (!stageRef.current) return;
    if (!isDragging.current) {
      velocity.current *= 0.94;
      userRotation.current += velocity.current;
      // Gentle, elegant idle sway around the hero front-facing angle (-0.1 rad)
      const t = state.clock.getElapsedTime();
      const subtleSway = Math.sin(t * 0.7) * 0.14;
      stageRef.current.rotation.y = userRotation.current + subtleSway;
    } else {
      stageRef.current.rotation.y = userRotation.current;
    }
  });

  return (
    <group ref={stageRef}>
      <Model url="/IDMS_logo.glb" scale={scale} />
      <OrbitalRings />
    </group>
  );
}

export default function ModelViewer({ className = '', scale = 0.46 }) {
  return (
    <div className={`relative w-full h-full min-h-[460px] sm:min-h-[560px] lg:min-h-[640px] xl:min-h-[680px] flex items-center justify-center select-none ${className}`}>
      {/* Background radial ambiance aura matching reference image */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[480px] lg:w-[560px] h-[380px] sm:h-[480px] lg:h-[560px] bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.14)_0%,rgba(168,85,247,0.1)_35%,rgba(56,189,248,0.05)_55%,transparent_72%)] rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <Canvas
        camera={{ position: [0, 0.04, 8.0], fov: 38 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        {/* Soft balanced studio key light */}
        <directionalLight position={[3.5, 5, 4]} intensity={1.3} />
        {/* Magenta rim highlight light */}
        <directionalLight position={[-3.5, 3.5, -2]} color="#f43f5e" intensity={1.4} />
        {/* Soft side cyan fill light */}
        <directionalLight position={[-3, 1, 3]} color="#38bdf8" intensity={0.7} />
        {/* Upward stage glow */}
        <pointLight position={[0, -0.6, 0.4]} color="#c084fc" intensity={0.9} distance={3.0} />

        <Suspense fallback={null}>
          {/* The Stationary Pedestal: anchored, NEVER moves or floats */}
          <Pedestal />

          {/* Contact Shadow onto Pedestal Surface */}
          <ContactShadows
            position={[0, -0.81, 0]}
            opacity={0.5}
            scale={2.6}
            blur={1.6}
            far={2.2}
          />

          {/* Contact Shadow on Floor beneath Pedestal */}
          <ContactShadows
            position={[0, -1.25, 0]}
            opacity={0.3}
            scale={5.0}
            blur={2.6}
            far={3.5}
          />

          {/* Interactive Rotating Logo + Orbital Rings ONLY */}
          <RotatingLogoStage scale={scale} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/IDMS_logo.glb');

