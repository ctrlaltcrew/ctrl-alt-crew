import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float,
  RoundedBox,
  Cylinder,
  Sphere,
  Environment,
  ContactShadows
} from '@react-three/drei';
import * as THREE from 'three';

// Main 3D Robot Character
const RobotCharacter = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  const eyeLight1 = useRef<THREE.PointLight>(null);
  const eyeLight2 = useRef<THREE.PointLight>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
    
    const pulse = Math.sin(state.clock.getElapsedTime() * 2) * 0.5 + 2;
    if (eyeLight1.current) eyeLight1.current.intensity = pulse;
    if (eyeLight2.current) eyeLight2.current.intensity = pulse;
    
    // Pointing animation - cycle every 8 seconds
    if (leftArmRef.current) {
      const time = state.clock.getElapsedTime();
      const cycle = time % 8; // 8 second cycle
      
      if (cycle < 1) {
        // Point towards text (0-1 second)
        const progress = cycle;
        leftArmRef.current.rotation.z = 0.3 - progress * 1.3; // Rotate down and out
        leftArmRef.current.rotation.y = progress * 1.2; // Rotate outward towards viewer's left
        leftArmRef.current.rotation.x = -progress * 0.5; // Tilt forward
      } else if (cycle < 3) {
        // Hold pointing (1-3 seconds)
        leftArmRef.current.rotation.z = -1.0;
        leftArmRef.current.rotation.y = 1.2;
        leftArmRef.current.rotation.x = -0.5;
      } else if (cycle < 4) {
        // Return to original (3-4 seconds)
        const progress = 1 - (cycle - 3);
        leftArmRef.current.rotation.z = 0.3 - progress * 1.3;
        leftArmRef.current.rotation.y = progress * 1.2;
        leftArmRef.current.rotation.x = -progress * 0.5;
      } else {
        // Rest position (4-8 seconds)
        leftArmRef.current.rotation.z = 0.3;
        leftArmRef.current.rotation.y = 0;
        leftArmRef.current.rotation.x = 0;
      }
    }
  });

  return (
    <group position={position}>
      <group ref={groupRef}>
        {/* Robot Head */}
        <RoundedBox args={[2.2, 2, 1.8]} radius={0.3} position={[0, 2, 0]}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
        </RoundedBox>
        
        {/* Screen */}
        <RoundedBox args={[1.9, 1.7, 0.1]} radius={0.15} position={[0, 2, 0.91]}>
          <meshStandardMaterial color="#000000" metalness={0.3} roughness={0.7} />
        </RoundedBox>
        
        {/* Eyes */}
        <pointLight ref={eyeLight1} position={[-0.4, 2.2, 1.5]} color="#ffffff" intensity={2} distance={4} />
        <pointLight ref={eyeLight2} position={[0.4, 2.2, 1.5]} color="#ffffff" intensity={2} distance={4} />
        
        <RoundedBox args={[0.5, 0.5, 0.15]} radius={0.25} position={[-0.4, 2.2, 0.95]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
        </RoundedBox>
        <RoundedBox args={[0.5, 0.5, 0.15]} radius={0.25} position={[0.4, 2.2, 0.95]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
        </RoundedBox>
        
        {/* Antennas */}
        <Cylinder args={[0.08, 0.08, 1.2]} position={[-0.7, 3.5, 0]}>
          <meshStandardMaterial color="#404040" metalness={1} roughness={0.2} />
        </Cylinder>
        <Sphere args={[0.18, 32, 32]} position={[-0.7, 4.1, 0]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.5} />
        </Sphere>
        
        <Cylinder args={[0.08, 0.08, 1.2]} position={[0.7, 3.5, 0]}>
          <meshStandardMaterial color="#404040" metalness={1} roughness={0.2} />
        </Cylinder>
        <Sphere args={[0.18, 32, 32]} position={[0.7, 4.1, 0]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.5} />
        </Sphere>
        
        {/* Body */}
        <RoundedBox args={[1.8, 1.6, 1.4]} radius={0.2} position={[0, 0.2, 0]}>
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
        </RoundedBox>
        
        {/* Core */}
        <Sphere args={[0.25, 32, 32]} position={[0, 0.3, 0.8]}>
          <meshStandardMaterial color="#cccccc" emissive="#ffffff" emissiveIntensity={1.5} />
        </Sphere>
        
        {/* Arms */}
        <group ref={leftArmRef} position={[-1.2, 0, 0]}>
          <Cylinder args={[0.25, 0.25, 1.5]} rotation={[0, 0, 0]}>
            <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
          </Cylinder>
          <Sphere args={[0.35, 32, 32]} position={[0, -0.75, 0]}>
            <meshStandardMaterial color="#404040" metalness={0.9} roughness={0.1} />
          </Sphere>
        </group>
        
        <Cylinder args={[0.25, 0.25, 1.5]} position={[1.2, 0, 0]} rotation={[0, 0, -0.3]}>
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
        </Cylinder>
        <Sphere args={[0.35, 32, 32]} position={[1.6, -0.6, 0]}>
          <meshStandardMaterial color="#404040" metalness={0.9} roughness={0.1} />
        </Sphere>
        
        {/* Legs */}
        <Cylinder args={[0.3, 0.3, 1.2]} position={[-0.5, -1.3, 0]}>
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
        </Cylinder>
        <Cylinder args={[0.3, 0.3, 1.2]} position={[0.5, -1.3, 0]}>
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
        </Cylinder>
        
        {/* Feet */}
        <RoundedBox args={[0.5, 0.3, 0.8]} radius={0.1} position={[-0.5, -2, 0.2]}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
        </RoundedBox>
        <RoundedBox args={[0.5, 0.3, 0.8]} radius={0.1} position={[0.5, -2, 0.2]}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
        </RoundedBox>
      </group>
      
      {/* Platform */}
      <Cylinder args={[3, 3, 0.3]} position={[0, -2.3, 0]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
      </Cylinder>
      
      {/* Glow Ring */}
      <Cylinder args={[3.1, 3.1, 0.1]} position={[0, -2.15, 0]}>
        <meshStandardMaterial color="#666666" emissive="#999999" emissiveIntensity={0.5} transparent opacity={0.6} />
      </Cylinder>
    </group>
  );
};

const FloatingCube = ({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) => {
  return (
    <Float speed={1.5 + delay} rotationIntensity={0.5} floatIntensity={1}>
      <RoundedBox args={[0.4, 0.4, 0.4]} position={position} radius={0.1}>
        <meshStandardMaterial color="#404040" metalness={1} roughness={0.1} emissive="#666666" emissiveIntensity={0.2} />
      </RoundedBox>
    </Float>
  );
};

const PremiumHeroScene = () => {
  return (
    <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(ellipse at right, #1a1a1a 0%, #000000 100%)' }}>
      <Canvas
        camera={{ position: [5, 2, 14], fov: 45 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <spotLight position={[5, 10, 0]} angle={0.5} penumbra={1} intensity={2} castShadow color="#ffffff" />
        <directionalLight position={[8, 5, 5]} intensity={0.8} />
        <pointLight position={[5, 3, 5]} color="#ffffff" intensity={1.5} />
        <pointLight position={[-5, 4, -5]} color="#666666" intensity={1} distance={20} />
        <pointLight position={[10, 4, -5]} color="#999999" intensity={1.5} distance={20} />
        
        <Float speed={1} rotationIntensity={0.05} floatIntensity={0.3}>
          <RobotCharacter position={[5, 0, 0]} />
        </Float>
        
        <FloatingCube position={[2, 2, -2]} delay={0} />
        <FloatingCube position={[7, 1, -1]} delay={0.5} />
        <FloatingCube position={[3, -1, 1]} delay={1} />
        <FloatingCube position={[8, 3, 1]} delay={1.5} />
        
        <Environment preset="night" />
        <ContactShadows position={[0, -2.5, 0]} opacity={0.8} scale={15} blur={2.5} far={10} />
        <fog attach="fog" args={['#000000', 8, 25]} />
      </Canvas>
    </div>
  );
};

export default PremiumHeroScene;
