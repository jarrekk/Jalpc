'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, PerspectiveCamera } from '@react-three/drei';
import { useLayoutEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Boat() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[1, 0.5, 2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </Float>
  );
}

function Bubbles({ count = 1000 }) {
  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  });

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.position.y = (state.clock.elapsedTime * 0.5) % 50 - 25;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useLayoutEffect(() => {
    const colors = [
      '#F4E7C1', // sand-light
      '#DCC6A0', // sand-wet
      '#9ADCD9', // shallow
      '#008B8B', // teal
      '#003366', // midsea
      '#001A33', // deep
    ];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    colors.forEach((color, i) => {
      if (i < colors.length - 1) {
        tl.to('body', {
          backgroundColor: colors[i + 1],
          duration: 1,
          ease: 'none',
        });
      }
    });

    if (cameraRef.current) {
      gsap.to(cameraRef.current.position, {
        z: 15,
        y: -30,
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      <Canvas>
        <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Boat />
        <Bubbles />
      </Canvas>
    </div>
  );
}
