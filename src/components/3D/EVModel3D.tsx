import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';

interface EVModel3DProps {
  modelUrl: string;
  color: string;
  scale?: number;
  rotation?: [number, number, number];
  position?: [number, number, number];
  autoRotate?: boolean;
}

const EVModel3D: React.FC<EVModel3DProps> = ({
  modelUrl,
  color,
  scale = 1,
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  autoRotate = false
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Auto rotation
  useFrame((state, delta) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  // Try to load GLTF model, fallback to basic geometry
  let model;
  try {
    model = useGLTF(modelUrl);
    if (model && isLoading) {
      setIsLoading(false);
      setError(null);
    }
  } catch (err) {
    console.warn('Failed to load GLTF model, using fallback:', err);
    setError('Model not found, using fallback');
    setIsLoading(false);
  }

  // Fallback basic car shape
  const FallbackModel = () => (
    <group ref={meshRef} scale={scale} rotation={rotation} position={position}>
      {/* Car body */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[4, 1, 2]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
      </mesh>
      
      {/* Car cabin */}
      <mesh position={[0, 1.2, 0.2]} scale={[0.8, 0.6, 0.7]}>
        <boxGeometry args={[4, 1, 2]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
      </mesh>
      
      {/* Wheels */}
      {[-1.5, 1.5].map((x, i) => (
        <group key={i}>
          {[-0.8, 0.8].map((z, j) => (
            <mesh key={j} position={[x, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
              <meshStandardMaterial color="#2a2a2a" />
            </mesh>
          ))}
        </group>
      ))}
      
      {/* Headlights */}
      <mesh position={[1.8, 0.8, 0.7]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[1.8, 0.8, -0.7]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );

  // If we have a loaded GLTF model, use it
  if (model && model.scene && !error) {
    return (
      <group ref={meshRef} scale={scale} rotation={rotation} position={position}>
        <primitive object={model.scene.clone()} />
        {isLoading && (
          <Html center>
            <div className="bg-slate-800 text-white px-4 py-2 rounded-lg">
              Loading model...
            </div>
          </Html>
        )}
      </group>
    );
  }

  // Use fallback model
  return <FallbackModel />;
};

// Preload common models
useGLTF.preload('/models/tesla-s.glb');
useGLTF.preload('/models/mercedes-eqs.glb');
useGLTF.preload('/models/bmw-i4.glb');
useGLTF.preload('/models/audi-etron.glb');

export default EVModel3D;
