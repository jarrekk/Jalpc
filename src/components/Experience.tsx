'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, PerspectiveCamera, useGLTF } from '@react-three/drei';
import { useLayoutEffect, useRef, useState, Suspense, Component, ReactNode } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

class ErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function BoatFallback() {
  return (
    <mesh scale={0.5}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#008B8B" wireframe />
    </mesh>
  );
}

function Boat() {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/assets/media/models/boat.glb');

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rocking
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <primitive 
        object={scene} 
        ref={meshRef} 
        scale={1.2} 
        position={[0, -0.5, 0]} 
        rotation={[0, Math.PI / 4, 0]}
      />
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
        z: 10,
        y: -50,
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
      <Canvas shadows>
        <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <ErrorBoundary fallback={<BoatFallback />}>
          <Suspense fallback={<BoatFallback />}>
            <Boat />
          </Suspense>
        </ErrorBoundary>
        <Bubbles />
      </Canvas>
    </div>
  );
}
