import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

const GridDots = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const { positions, colors } = useMemo(() => {
    const positions = [];
    const colors = [];
    const gridSize = 30;
    const spacing = 1;
    
    for (let x = -gridSize; x <= gridSize; x += spacing) {
      for (let z = -gridSize; z <= gridSize; z += spacing) {
        positions.push(x, 0, z);
        
        const distance = Math.sqrt(x * x + z * z);
        const hue = (distance / gridSize) * 0.3;
        const color = new THREE.Color().setHSL(hue, 0.7, 0.5);
        colors.push(color.r, color.g, color.b);
      }
    }
    
    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors)
    };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.getElapsedTime();
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const z = positions[i + 2];
        const distance = Math.sqrt(x * x + z * z);
        positions[i + 1] = Math.sin(distance * 0.3 - time * 2) * 0.5;
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const ConnectionLines = () => {
  const linesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  const lines = useMemo(() => {
    const lineData = [];
    const radius = 8;
    const points = 12;
    
    for (let i = 0; i < points; i++) {
      const angle1 = (i / points) * Math.PI * 2;
      const angle2 = ((i + 1) / points) * Math.PI * 2;
      
      lineData.push({
        points: [
          [Math.cos(angle1) * radius, 0, Math.sin(angle1) * radius],
          [Math.cos(angle2) * radius, 0, Math.sin(angle2) * radius]
        ],
        color: new THREE.Color().setHSL(i / points, 0.7, 0.5)
      });
    }
    
    return lineData;
  }, []);

  return (
    <group ref={linesRef}>
      {lines.map((line, i) => (
        <Line
          key={i}
          points={line.points as any}
          color={line.color}
          lineWidth={2}
          transparent
          opacity={0.4}
        />
      ))}
    </group>
  );
};

const TechGrid = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 15, 15], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <GridDots />
        <ConnectionLines />
        <fog attach="fog" args={['#0a0a0f', 15, 35]} />
      </Canvas>
    </div>
  );
};

export default TechGrid;
