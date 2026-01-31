import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, Center, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FloatingCard3D = ({ 
  position, 
  color,
  index 
}: { 
  position: [number, number, number];
  color: string;
  index: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() + index) * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5 + index) * 0.5;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[2, 2.5, 0.3]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

const ServiceCards3D = () => {
  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#00d4ff" intensity={0.5} />
        
        <FloatingCard3D position={[-4, 0, 0]} color="#00d4ff" index={0} />
        <FloatingCard3D position={[0, 0, 0]} color="#ff6b9d" index={1} />
        <FloatingCard3D position={[4, 0, 0]} color="#c084fc" index={2} />
      </Canvas>
    </div>
  );
};

export default ServiceCards3D;
