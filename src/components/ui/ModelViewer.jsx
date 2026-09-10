/* eslint-disable react/no-unknown-property */
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls, Float, ContactShadows, Center } from '@react-three/drei';

function Model({ url = '/IDMS_logo.glb', scale = 0.72 }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Continuous smooth idle rotation around Y axis
    groupRef.current.rotation.y += delta * 0.45;
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive
          object={scene}
          scale={scale}
        />
      </Center>
    </group>
  );
}

export default function ModelViewer({ className = '', scale = 0.72 }) {
  return (
    <div className={`relative w-full h-full min-h-[360px] sm:min-h-[420px] lg:min-h-[480px] flex items-center justify-center select-none ${className}`}>
      {/* Ambient background soft glow behind 3D model */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[360px] lg:w-[420px] h-[280px] sm:h-[360px] lg:h-[420px] bg-gradient-to-tr from-blue-500/12 via-indigo-500/8 to-cyan-400/15 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[10, 10, 6]} intensity={1.3} />
        <directionalLight position={[-10, -4, -4]} intensity={0.6} color="#38bdf8" />
        <pointLight position={[0, 4, 3]} intensity={0.7} />

        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.15} floatIntensity={0.25}>
            <Model url="/IDMS_logo.glb" scale={scale} />
          </Float>
          <ContactShadows
            position={[0, -1.6, 0]}
            opacity={0.3}
            scale={5.5}
            blur={2.4}
            far={4}
          />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={(2 * Math.PI) / 3}
          rotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/IDMS_logo.glb');
