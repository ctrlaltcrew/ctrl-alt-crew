import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, useTexture, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Interactive3DLogo = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (meshRef.current) {
      // Rotate based on time
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      
      // Add mouse interaction
      if (hovered) {
        meshRef.current.rotation.x += mousePosition.current.y * 0.5;
        meshRef.current.rotation.y += mousePosition.current.x * 0.5;
      }
    }
  });

  const handlePointerMove = (event: any) => {
    mousePosition.current = {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1
    };
  };

  return (
    <group>
      {/* Outer Ring */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3, 0.4, 16, 100]} />
          <MeshDistortMaterial
            color="#00d4ff"
            attach="material"
            distort={0.3}
            speed={1.5}
            roughness={0.2}
            metalness={0.9}
            emissive="#00d4ff"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      {/* Inner Ring */}
      <Float speed={2} rotationIntensity={0.8} floatIntensity={0.8}>
        <mesh rotation={[0, Math.PI / 4, 0]}>
          <torusGeometry args={[2, 0.3, 16, 100]} />
          <MeshDistortMaterial
            color="#ff6b9d"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.9}
            emissive="#ff6b9d"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      {/* Core Sphere */}
      <mesh
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onPointerMove={handlePointerMove}
      >
        <icosahedronGeometry args={[1.2, 1]} />
        <MeshDistortMaterial
          color="#c084fc"
          attach="material"
          distort={0.5}
          speed={3}
          roughness={0.1}
          metalness={1}
          emissive="#c084fc"
          emissiveIntensity={hovered ? 0.8 : 0.4}
        />
      </mesh>
    </group>
  );
};

const Logo3DInteractive = () => {
  return (
    <div className="w-full h-[500px] relative">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#00d4ff" intensity={0.8} />
        <pointLight position={[10, 10, 10]} color="#ff6b9d" intensity={0.6} />
        
        <Interactive3DLogo />
      </Canvas>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm text-muted-foreground">Hover and move your mouse to interact</p>
      </div>
    </div>
  );
};

export default Logo3DInteractive;
