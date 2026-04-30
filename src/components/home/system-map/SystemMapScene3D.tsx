'use client';

import { Html, Line } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import Link from 'next/link';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { Group } from 'three';
import { accentStyles, systemMapDestinations } from './SystemMapData';

type Props = {
  activeId: string;
  setHoveredId: (id: string | null) => void;
  reducedMotion: boolean;
};

function Scene({ activeId, setHoveredId, reducedMotion }: Props) {
  const ringRef = useRef<Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  const nodes = useMemo(() => Array.from({ length: 140 }, (_, i) => ({ x: -6.7 + ((i * 0.73) % 13.4), z: -4.2 + ((i * 1.13) % 8.4), y: 0.02 + (i % 4) * 0.004, s: 0.02 + (i % 5) * 0.005 })), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ringRef.current && !reducedMotion) ringRef.current.scale.setScalar(1 + Math.sin(t / 2.5) * 0.03);
    if (coreRef.current && !reducedMotion) coreRef.current.scale.setScalar(1 + Math.sin(t * 1.8) * 0.07);
    const active = systemMapDestinations.find((item) => item.id === activeId);
    if (active && pulseRef.current && !reducedMotion) {
      const curve = new THREE.CatmullRomCurve3(active.routePoints.map((p) => new THREE.Vector3(...p)));
      pulseRef.current.position.copy(curve.getPoint((t * 0.22) % 1));
    }
  });

  return <>
    <ambientLight intensity={0.45} color='#7FBFFF' />
    <directionalLight position={[4, 8, 5]} intensity={0.7} color='#DFF8FF' />
    <pointLight position={[0, 0.7, 0]} intensity={4} distance={6} color='#32E6FF' />
    <pointLight position={[0, 0.3, 4]} intensity={1.2} distance={8} color='#1479FF' />
    <pointLight position={[4, 0.5, 1]} intensity={0.8} distance={6} color='#8B5CFF' />

    <mesh position={[0, -0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[14, 9]} />
      <meshStandardMaterial color='#03101D' transparent opacity={0.76} roughness={0.65} metalness={0.08} />
    </mesh>
    <mesh position={[0, -0.079, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[6.9, 7.02, 64]} />
      <meshBasicMaterial color='#32E6FF' transparent opacity={0.26} />
    </mesh>

    {Array.from({ length: 29 }).map((_, i) => {
      const z = -4.5 + i * 0.32;
      return <Line key={`gz${i}`} points={[[-7, 0.01, z], [7, 0.01, z]]} color='#1F8CFF' lineWidth={i % 4 === 0 ? 0.9 : 0.45} transparent opacity={i % 4 === 0 ? 0.24 : 0.14} />;
    })}
    {Array.from({ length: 29 }).map((_, i) => {
      const x = -7 + i * 0.5;
      return <Line key={`gx${i}`} points={[[x, 0.01, -4.5], [x, 0.01, 4.5]]} color='#32E6FF' lineWidth={i % 4 === 0 ? 0.9 : 0.45} transparent opacity={i % 4 === 0 ? 0.2 : 0.11} />;
    })}
    {nodes.map((n, i) => <mesh key={`n${i}`} position={[n.x, n.y, n.z]}><sphereGeometry args={[n.s, 8, 8]} /><meshBasicMaterial color={i % 13 === 0 ? '#8B5CFF' : i % 17 === 0 ? '#27EF7D' : '#32E6FF'} transparent opacity={0.35} /></mesh>)}

    <group position={[0, 0.12, 0]}>
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[1.15, 1.15, 0.16, 48]} />
        <meshStandardMaterial color='#071b33' emissive='#32E6FF' emissiveIntensity={0.18} />
      </mesh>
      <group ref={ringRef} position={[0, 0.2, 0]}>
        {[1.25, 0.95, 0.65].map((r, idx) => <mesh key={r} rotation={[Math.PI / 2, 0, 0]} position={[0, idx * 0.015, 0]}><torusGeometry args={[r, 0.015 - idx * 0.002, 12, 80]} /><meshBasicMaterial color='#32E6FF' transparent opacity={0.72 - idx * 0.18} /></mesh>)}
      </group>
      <mesh ref={coreRef} position={[0, 0.35, 0]}><sphereGeometry args={[0.2, 24, 24]} /><meshStandardMaterial color='#32E6FF' emissive='#32E6FF' emissiveIntensity={3.2} /></mesh>
      <Html position={[0, 0.72, 0]} center transform distanceFactor={9} sprite>
        <div className='pointer-events-none rounded-2xl border border-cyan-300/40 bg-slate-950/70 px-4 py-2 text-center shadow-[0_0_30px_rgba(50,230,255,.4)]'>
          <p className='text-[20px] font-black text-cyan-300'>Rapid Rise AI</p>
          <p className='text-[10px] uppercase tracking-[.14em] text-cyan-50/90'>CAPTURE • ROUTE</p>
          <p className='text-[10px] uppercase tracking-[.14em] text-cyan-50/90'>TRACK • AUTOMATE • REPORT</p>
        </div>
      </Html>
    </group>

    {systemMapDestinations.map((item) => {
      const accent = accentStyles[item.accent];
      const isActive = activeId === item.id;
      const curve = new THREE.CatmullRomCurve3(item.routePoints.map((p) => new THREE.Vector3(...p)));
      const points = curve.getPoints(36).map((p) => [p.x, p.y, p.z] as [number, number, number]);
      return <group key={item.id}>
        <Line points={points} color={accent.main} lineWidth={isActive ? 2.2 : 1.4} transparent opacity={isActive ? 0.95 : 0.28} />
        <Line points={points} color={accent.main} lineWidth={isActive ? 7.5 : 4.5} transparent opacity={isActive ? 0.25 : 0.14} />
        <mesh position={[item.scenePosition[0], 0.05, item.scenePosition[2]]}><sphereGeometry args={[isActive ? 0.09 : 0.07, 16, 16]} /><meshStandardMaterial color={accent.main} emissive={accent.main} emissiveIntensity={isActive ? 2.4 : 1.2} /></mesh>
        <mesh position={[item.scenePosition[0], 0.08, item.scenePosition[2]]}><cylinderGeometry args={[item.id === 'services' ? 0.78 : 0.66, item.id === 'services' ? 0.78 : 0.66, 0.09, 28]} /><meshStandardMaterial color='#071b33' emissive={accent.main} emissiveIntensity={isActive ? 0.5 : 0.24} /></mesh>
        <mesh position={[item.scenePosition[0], 0.03, item.scenePosition[2]]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[0.64, 0.82, 32]} /><meshBasicMaterial color={accent.main} transparent opacity={isActive ? 0.36 : 0.2} /></mesh>
        <Html position={[item.scenePosition[0], 1.22 + (item.scenePosition[2] > 2.5 ? 0.12 : 0), item.scenePosition[2]]} center transform distanceFactor={7.8} sprite>
          <Link
            href={item.href}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setHoveredId(item.id)}
            onBlur={() => setHoveredId(null)}
            className='map3d-card relative block min-h-[122px] w-[210px] rounded-[18px] border p-4 transition-all duration-200 hover:-translate-y-1'
            style={{ '--accent': accent.main, '--accent-glow': accent.glow, transform: `scale(${item.scale})` } as import('react').CSSProperties}
          >
            <span className='absolute right-3 top-3 rounded-full border px-2 py-1 text-[10px] font-black uppercase tracking-[.08em]' style={{ borderColor: `${accent.main}88`, color: accent.main, background: accent.soft }}>{item.tag}</span>
            <span className='mb-3 inline-flex h-[44px] w-[44px] items-center justify-center rounded-[13px] border' style={{ borderColor: `${accent.main}8c`, background: accent.soft, boxShadow: `0 0 24px ${accent.glow}` }}><item.icon className='h-6 w-6' style={{ color: accent.main }} /></span>
            <p className='text-[17px] font-black leading-tight text-[#F6FAFF]'>{item.title}</p>
            <p className='mt-1 text-[12.5px] leading-[1.35] text-[rgba(220,232,255,.78)]'>{item.description}</p>
          </Link>
        </Html>
      </group>;
    })}
    <mesh ref={pulseRef}><sphereGeometry args={[0.08, 16, 16]} /><meshStandardMaterial color='#ffffff' emissive='#32E6FF' emissiveIntensity={3} /></mesh>
  </>;
}

export function SystemMapScene3D(props: Props) {
  return <div className='absolute inset-0 z-[3]'>
    <Canvas dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }} camera={{ position: [0, 8.5, 10.5], fov: 45, near: 0.1, far: 100 }}>
      <Scene {...props} />
    </Canvas>
  </div>;
}
