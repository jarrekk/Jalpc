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
    try {
      wavesRef.current = new Audio(WAVES_URL);
      deepRef.current = new Audio(DEEP_URL);

      const handleAudioError = (e: ErrorEvent) => {
        console.warn('Audio failed to load:', e);
      };

      wavesRef.current.addEventListener('error', handleAudioError as any);
      deepRef.current.addEventListener('error', handleAudioError as any);

      wavesRef.current.loop = true;
      deepRef.current.loop = true;
      wavesRef.current.volume = 0;
      deepRef.current.volume = 0;
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }

    return () => {
      wavesRef.current?.pause();
      deepRef.current?.pause();
    };
  }, []);

  const safePlay = async (audio: HTMLAudioElement | null) => {
    if (!audio) return;
    try {
      await audio.play();
    } catch (err) {
      console.warn('Audio playback was prevented or failed:', err);
    }
  };

  const togglePlay = async () => {
    if (!isPlaying) {
      if (currentTrack === 'waves' && wavesRef.current) {
        await safePlay(wavesRef.current);
        gsap.to(wavesRef.current, { volume: 0.5, duration: 2 });
      } else if (currentTrack === 'deep' && deepRef.current) {
        await safePlay(deepRef.current);
        gsap.to(deepRef.current, { volume: 0.5, duration: 2 });
      }
      setIsPlaying(true);
    } else {
      const activeAudios = [wavesRef.current, deepRef.current].filter((a): a is HTMLAudioElement => a !== null);
      gsap.to(activeAudios, {
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

  const playWaves = async () => {
    if (currentTrack === 'waves') return;
    setCurrentTrack('waves');
    if (!isPlaying) return;

    if (wavesRef.current) {
      await safePlay(wavesRef.current);
      gsap.to(wavesRef.current, { volume: 0.5, duration: 2 });
    }
    if (deepRef.current) {
      gsap.to(deepRef.current, {
        volume: 0,
        duration: 2,
        onComplete: () => deepRef.current?.pause(),
      });
    }
  };

  const playDeep = async () => {
    if (currentTrack === 'deep') return;
    setCurrentTrack('deep');
    if (!isPlaying) return;

    if (deepRef.current) {
      await safePlay(deepRef.current);
      gsap.to(deepRef.current, { volume: 0.5, duration: 2 });
    }
    if (wavesRef.current) {
      gsap.to(wavesRef.current, {
        volume: 0,
        duration: 2,
        onComplete: () => wavesRef.current?.pause(),
      });
    }
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
