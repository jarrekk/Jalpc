'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const WAVES_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; // Placeholder
const DEEP_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'; // Placeholder

export default function AudioController() {
  const wavesRef = useRef<HTMLAudioElement | null>(null);
  const deepRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<'waves' | 'deep'>('waves');

  useEffect(() => {
    wavesRef.current = new Audio(WAVES_URL);
    deepRef.current = new Audio(DEEP_URL);
    wavesRef.current.loop = true;
    deepRef.current.loop = true;
    wavesRef.current.volume = 0;
    deepRef.current.volume = 0;

    return () => {
      wavesRef.current?.pause();
      deepRef.current?.pause();
    };
  }, []);

  const togglePlay = () => {
    if (!isPlaying) {
      if (currentTrack === 'waves') {
        wavesRef.current?.play();
        gsap.to(wavesRef.current!, { volume: 0.5, duration: 2 });
      } else {
        deepRef.current?.play();
        gsap.to(deepRef.current!, { volume: 0.5, duration: 2 });
      }
      setIsPlaying(true);
    } else {
      gsap.to([wavesRef.current!, deepRef.current!], {
        volume: 0,
        duration: 2,
        onComplete: () => {
          wavesRef.current?.pause();
          deepRef.current?.pause();
        },
      });
      setIsPlaying(false);
    }
  };

  const playWaves = () => {
    if (currentTrack === 'waves') return;
    setCurrentTrack('waves');
    if (!isPlaying) return;

    wavesRef.current?.play();
    gsap.to(wavesRef.current!, { volume: 0.5, duration: 2 });
    gsap.to(deepRef.current!, {
      volume: 0,
      duration: 2,
      onComplete: () => deepRef.current?.pause(),
    });
  };

  const playDeep = () => {
    if (currentTrack === 'deep') return;
    setCurrentTrack('deep');
    if (!isPlaying) return;

    deepRef.current?.play();
    gsap.to(deepRef.current!, { volume: 0.5, duration: 2 });
    gsap.to(wavesRef.current!, {
      volume: 0,
      duration: 2,
      onComplete: () => wavesRef.current?.pause(),
    });
  };

  // Automatically switch based on scroll could be added here or called from Experience.tsx
  // For now, providing a simple UI toggle

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 100,
        display: 'flex',
        gap: '10px',
      }}
    >
      <button
        onClick={togglePlay}
        style={{
          background: 'rgba(255,255,255,0.2)',
          border: '1px solid white',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {isPlaying ? 'Pause Audio' : 'Play Audio'}
      </button>
      {isPlaying && (
        <>
          <button onClick={playWaves} style={{ padding: '10px', cursor: 'pointer' }}>
            Waves
          </button>
          <button onClick={playDeep} style={{ padding: '10px', cursor: 'pointer' }}>
            Deep
          </button>
        </>
      )}
    </div>
  );
}
