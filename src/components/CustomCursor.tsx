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
        viewBox="0 0 100 100"
        fill="white"
        style={{
          width: '100%',
          height: '100%',
          transform: 'rotate(-20deg)'
        }}
      >
        <path d="M95.5,41.4c-4.3-8.8-13.6-14.8-24.1-16.1c-4.4-0.5-8.9-0.1-13.2,1.2c-5.5-5.7-13.1-9.2-21.6-9.2c-10,0-18.9,4.8-24.5,12.2 c-3.2,4.2-5.1,9.4-5.1,15c0,1.2,0.1,2.4,0.3,3.6c-1.8,1.2-3.4,2.8-4.5,4.7C0.7,56.4,2,61.4,5.8,63.6c1.1,0.6,2.2,0.9,3.4,1 c2.2,4.8,6.1,8.7,11,11c0.1,1.2,0.4,2.3,1,3.4c2.2,3.8,7.2,5.1,10.8,2.9c1.9-1.1,3.5-2.7,4.7-4.5c1.2,0.2,2.4,0.3,3.6,0.3 c5.6,0,10.8-1.9,15-5.1c7.4-5.6,12.2-14.5,12.2-24.5c0-8.5-3.5-16.1-9.2-21.6c1.3-4.3,1.7-8.8,1.2-13.2 C88.2,23.3,94.2,32.6,95.5,41.4z M40.4,21.8c6.6,0,12.6,2.7,17,7.1c-0.1,0-0.2,0-0.3,0c-11.7,0-21.2,9.5-21.2,21.2 c0,0.1,0,0.2,0,0.3c-4.4-4.4-7.1-10.4-7.1-17C28.8,27.1,34,21.8,40.4,21.8z" />
      </svg>
    </div>
  );
}
