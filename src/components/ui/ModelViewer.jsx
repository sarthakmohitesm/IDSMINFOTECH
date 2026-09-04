import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';

function Model({ url }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef();
  const angleRef = useRef(0); // current Y rotation in radians

  useEffect(() => {
    // Set initial opacity on all mesh materials
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const mat = child.material;
        if (Array.isArray(mat)) {
          mat.forEach((m) => {
            m.transparent = true;
            m.opacity = 0.1;
          });
        } else {
          mat.transparent = true;
          mat.opacity = 0.65;
        }
      }
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Normalise angle to [0, 2π]
    const TWO_PI = Math.PI * 2;
    let angle = ((angleRef.current % TWO_PI) + TWO_PI) % TWO_PI;

    // "back" zone = π/2 → 3π/2  (the 180° arc behind)
    const inBack = angle > Math.PI / 2 && angle < (3 * Math.PI) / 2;

    // Slow crawl on front, fast snap through the back
    // Increased rotation speed
    const speed = inBack ? 6.0 : 0.5; // rad/s

    const step = speed * delta;
    angleRef.current += step;

    groupRef.current.rotation.y = angleRef.current;
  });

  return <primitive ref={groupRef} object={scene} scale={0.7} />;
}

export default function ModelViewer() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      className="w-full h-full"
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <ambientLight intensity={0.45} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.9} castShadow />
      <Suspense fallback={null}>
        <Model url="/IDMS_logo.glb" />
        <Environment preset="city" />
      </Suspense>
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        minPolarAngle={Math.PI / 2} 
        maxPolarAngle={Math.PI / 2} 
      />
    </Canvas>
  );
}
