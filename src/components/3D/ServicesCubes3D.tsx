import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Float, MeshDistortMaterial, Text } from '@react-three/drei';
import * as THREE from 'three';

interface CubeProps {
  position: [number, number, number];
  color: string;
  icon: string;
  index: number;
}

const ServiceCube = ({ position, color, icon, index }: CubeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() + index) * 0.3;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5 + index;
    }
  });

  return (
    <Float speed={1.5 + index * 0.2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={position}>
        <mesh ref={meshRef}>
          <RoundedBox args={[2, 2, 2]} radius={0.1} smoothness={4}>
            <MeshDistortMaterial
              color={color}
              attach="material"
              distort={0.3}
              speed={2}
              roughness={0.2}
              metalness={0.9}
              emissive={color}
              emissiveIntensity={0.4}
            />
          </RoundedBox>
        </mesh>
        
        <Text
          position={[0, 0, 1.1]}
          fontSize={0.8}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {icon}
        </Text>
      </group>
    </Float>
  );
};

const SpinningRing = () => {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      ringRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[6, 0.2, 16, 100]} />
      <meshStandardMaterial
        color="#00d4ff"
        metalness={0.9}
        roughness={0.1}
        emissive="#00d4ff"
        emissiveIntensity={0.2}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};

const ServicesCubes3D = () => {
  return (
    <div className="w-full h-[600px]">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#00d4ff" intensity={1} />
        
        <SpinningRing />
        
        <ServiceCube position={[-4, 2, 0]} color="#00d4ff" icon="AI" index={0} />
        <ServiceCube position={[4, 2, 0]} color="#ff6b9d" icon="WEB" index={1} />
        <ServiceCube position={[-4, -2, 0]} color="#c084fc" icon="BOT" index={2} />
        <ServiceCube position={[4, -2, 0]} color="#10b981" icon="APP" index={3} />
        <ServiceCube position={[0, 0, 0]} color="#f59e0b" icon="DB" index={4} />
      </Canvas>
    </div>
  );
};

export default ServicesCubes3D;
