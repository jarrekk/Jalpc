'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: '40px',
        height: '40px',
        marginLeft: '-20px',
        marginTop: '-20px',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'transform 0.1s ease-out',
        filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.5))'
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="white"
        style={{
          width: '100%',
          height: '100%',
          transform: 'rotate(20deg)'
        }}
      >
        <path d="M1.1,12C2,12.1 4.6,12.2 6.5,10.8C8.4,9.4 9.5,8.1 11.2,7.5C12.9,6.9 15.5,6.5 17.5,7.5C19.5,8.5 20.5,10.5 20,12.5C19.5,14.5 17.5,15.5 15.5,15.5C13.5,15.5 12,14.5 11,14C10,13.5 8,13.5 6,14C4,14.5 2,16 1,15V12M22,10C22.5,10 23,10.5 23,11C23,11.5 22.5,12 22,12C21.5,12 21,11.5 21,11C21,10.5 21.5,10 22,10M20,7C20.5,7 21,7.5 21,8C21,8.5 20.5,9 20,9C19.5,9 19,8.5 19,8C19,7.5 19.5,7 20,7Z" />
      </svg>
    </div>
  );
}
