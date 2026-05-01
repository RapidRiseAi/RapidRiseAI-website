'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { Group } from 'three';

type Props = { reducedMotion: boolean };

function Scene({ reducedMotion }: Props) {
  const ringRef = useRef<Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const nodes = useMemo(() => Array.from({ length: 140 }, (_, i) => ({ x: -6.6 + ((i * 0.77) % 13.2), z: -4.1 + ((i * 1.09) % 8.2), s: 0.02 + (i % 4) * 0.006 })), []);

  useFrame(({ clock }) => {
    if (reducedMotion) return;
    const t = clock.getElapsedTime();
    if (ringRef.current) ringRef.current.scale.setScalar(1 + Math.sin(t / 2.5) * 0.035);
    if (coreRef.current) coreRef.current.scale.setScalar(1 + Math.sin(t * 1.8) * 0.08);
  });

  return <>
    <ambientLight intensity={0.45} color='#7FBFFF' />
    <directionalLight position={[4, 8, 5]} intensity={0.7} color='#DFF8FF' />
    <pointLight position={[0, 0.7, 0]} intensity={4.2} distance={7} color='#32E6FF' />
    <pointLight position={[0, 0.3, 4]} intensity={1.2} distance={8} color='#1479FF' />
    <pointLight position={[4, 0.5, 1]} intensity={0.8} distance={6} color='#8B5CFF' />

    <mesh position={[0, -0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[13.5, 8.5]} />
      <meshStandardMaterial color='#03101D' transparent opacity={0.76} roughness={0.65} metalness={0.08} />
    </mesh>

    {Array.from({ length: 30 }).map((_, i) => {
      const z = -4.25 + i * 0.29;
      return <mesh key={`z${i}`} position={[0, 0.01, z]}><boxGeometry args={[13.5, 0.003, 0.006]} /><meshBasicMaterial color={i % 5 === 0 ? '#32E6FF' : '#1F8CFF'} transparent opacity={i % 5 === 0 ? 0.24 : 0.12} /></mesh>;
    })}
    {Array.from({ length: 30 }).map((_, i) => {
      const x = -6.75 + i * 0.46;
      return <mesh key={`x${i}`} position={[x, 0.01, 0]}><boxGeometry args={[0.006, 0.003, 8.5]} /><meshBasicMaterial color={i % 5 === 0 ? '#32E6FF' : '#1F8CFF'} transparent opacity={i % 5 === 0 ? 0.22 : 0.11} /></mesh>;
    })}

    {nodes.map((n, i) => <mesh key={i} position={[n.x, 0.02, n.z]}><sphereGeometry args={[n.s, 8, 8]} /><meshBasicMaterial color={i % 12 === 0 ? '#8B5CFF' : i % 19 === 0 ? '#27EF7D' : '#32E6FF'} transparent opacity={0.35} /></mesh>)}

    <group position={[0, 0.15, 0]}>
      <mesh position={[0, 0.08, 0]}><cylinderGeometry args={[1.15, 1.15, 0.16, 48]} /><meshStandardMaterial color='#071b33' emissive='#32E6FF' emissiveIntensity={0.2} /></mesh>
      <group ref={ringRef} position={[0, 0.21, 0]}>
        {[1.25, 0.95, 0.65].map((r, i) => <mesh key={r} rotation={[Math.PI / 2, 0, 0]} position={[0, i * 0.014, 0]}><torusGeometry args={[r, 0.016 - i * 0.002, 12, 80]} /><meshBasicMaterial color='#32E6FF' transparent opacity={0.75 - i * 0.17} /></mesh>)}
      </group>
      <mesh ref={coreRef} position={[0, 0.35, 0]}><sphereGeometry args={[0.21, 22, 22]} /><meshStandardMaterial color='#32E6FF' emissive='#32E6FF' emissiveIntensity={3.2} /></mesh>
    </group>
  </>;
}

export function SystemMapScene3D({ reducedMotion }: Props) {
  return <div className='pointer-events-none absolute inset-0 z-[2]'>
    <Canvas dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }} camera={{ position: [0, 7.5, 9.5], fov: 45, near: 0.1, far: 100 }}>
      <Scene reducedMotion={reducedMotion} />
    </Canvas>
  </div>;
}
