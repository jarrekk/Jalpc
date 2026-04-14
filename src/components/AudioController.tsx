'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const WAVES_URL = '/assets/media/audio/waves.mp3';
const DEEP_URL = '/assets/media/audio/deep_ambient.mp3';

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
          <button 
            onClick={playWaves} 
            style={{ 
              padding: '10px', 
              cursor: 'pointer', 
              background: currentTrack === 'waves' ? 'rgba(255,255,255,0.4)' : 'transparent',
              border: '1px solid white',
              color: 'white',
              borderRadius: '5px'
            }}
          >
            Waves
          </button>
          <button 
            onClick={playDeep} 
            style={{ 
              padding: '10px', 
              cursor: 'pointer',
              background: currentTrack === 'deep' ? 'rgba(255,255,255,0.4)' : 'transparent',
              border: '1px solid white',
              color: 'white',
              borderRadius: '5px'
            }}
          >
            Deep
          </button>
        </>
      )}
    </div>
  );
}
