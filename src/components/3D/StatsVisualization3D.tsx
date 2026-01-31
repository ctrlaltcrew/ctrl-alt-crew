import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Cylinder, Text } from '@react-three/drei';
import * as THREE from 'three';

interface StatBarProps {
  position: [number, number, number];
  height: number;
  color: string;
  value: string;
  label: string;
}

const StatBar = ({ position, height, color, value, label }: StatBarProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const targetHeight = useRef(height);
  const currentHeight = useRef(0);
  
  useFrame(() => {
    if (groupRef.current && currentHeight.current < targetHeight.current) {
      currentHeight.current += 0.05;
      groupRef.current.scale.y = Math.min(currentHeight.current / targetHeight.current, 1);
    }
  });

  return (
    <group position={position}>
      <group ref={groupRef}>
        <RoundedBox args={[1.2, height, 1.2]} position={[0, height / 2, 0]} radius={0.1}>
          <meshStandardMaterial 
            color={color}
            metalness={0.8}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.3}
          />
        </RoundedBox>
        
        {/* Glow at top */}
        <Cylinder args={[0.7, 0.7, 0.1]} position={[0, height + 0.1, 0]}>
          <meshStandardMaterial 
            color={color}
            emissive={color}
            emissiveIntensity={1}
            transparent
            opacity={0.8}
          />
        </Cylinder>
      </group>
      
      {/* Value text */}
      <Text
        position={[0, height + 0.8, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {value}
      </Text>
      
      {/* Label text */}
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.25}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        textAlign="center"
      >
        {label}
      </Text>
    </group>
  );
};

const GridFloor = () => {
  return (
    <gridHelper args={[20, 20, '#00d4ff', '#1e293b']} position={[0, 0, 0]} />
  );
};

const StatsVisualization3D = () => {
  return (
    <div className="w-full h-[500px]">
      <Canvas camera={{ position: [8, 6, 8], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={1} />
        <pointLight position={[-10, 10, -10]} color="#00d4ff" intensity={0.5} />
        
        <GridFloor />
        
        <StatBar 
          position={[-4, 0, 0]} 
          height={4} 
          color="#00d4ff" 
          value="150+"
          label="Projects Completed"
        />
        <StatBar 
          position={[-1.3, 0, 0]} 
          height={3} 
          color="#ff6b9d" 
          value="80+"
          label="Active Clients"
        />
        <StatBar 
          position={[1.3, 0, 0]} 
          height={2.5} 
          color="#c084fc" 
          value="15+"
          label="Countries Served"
        />
        <StatBar 
          position={[4, 0, 0]} 
          height={2} 
          color="#10b981" 
          value="5+"
          label="Years Experience"
        />
        
        <fog attach="fog" args={['#0a0a0f', 10, 25]} />
      </Canvas>
    </div>
  );
};

export default StatsVisualization3D;
