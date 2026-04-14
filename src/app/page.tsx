'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const portfolioItems = [
  { 
    id: 1, 
    title: 'SLM-based OT Solution', 
    description: 'An OT security solution based on SLM, focused on practical defense and applied security architecture.', 
    details: 'This project involved developing a comprehensive security solution for Operational Technology (OT) environments using Small Language Models (SLM). It focuses on practical defense mechanisms and the implementation of robust security architectures tailored for industrial control systems.' 
  }
];

const skills = [
  { name: 'Communication', level: 85 },
  { name: 'AI', level: 75 },
  { name: 'Dev', level: 80 },
  { name: 'Python', level: 90 },
  { name: 'Security', level: 85 },
];

const RadarChart = ({ skills }: { skills: { name: string, level: number }[] }) => {
  const size = 300;
  const center = size / 2;
  const radius = center * 0.7;
  const points = skills.length;

  const getCoordinates = (index: number, level: number) => {
    const angle = (Math.PI * 2 * index) / points - Math.PI / 2;
    const x = center + radius * (level / 100) * Math.cos(angle);
    const y = center + radius * (level / 100) * Math.sin(angle);
    return { x, y };
  };

  const axisPoints = skills.map((_, i) => getCoordinates(i, 100));
  const skillPoints = skills.map((s, i) => getCoordinates(i, s.level));

  const polygonPath = skillPoints.map(p => `${p.x},${p.y}`).join(' ');
  const gridCircles = [20, 40, 60, 80, 100];

  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      gsap.from(chartRef.current.querySelectorAll('polygon, line, text'), {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: chartRef.current,
          start: 'top 80%',
        }
      });
    }
  }, []);

  return (
    <div ref={chartRef} className="radar-chart-container" style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid Circles */}
        {gridCircles.map(c => (
          <polygon
            key={c}
            points={skills.map((_, i) => {
              const p = getCoordinates(i, c);
              return `${p.x},${p.y}`;
            }).join(' ')}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
          />
        ))}
        {/* Axes */}
        {axisPoints.map((p, i) => (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={p.x}
            y2={p.y}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
          />
        ))}
        {/* Skill Area */}
        <polygon
          points={polygonPath}
          fill="rgba(0, 255, 255, 0.3)"
          stroke="#00ffff"
          strokeWidth="2"
        />
        {/* Labels */}
        {skills.map((s, i) => {
          const p = getCoordinates(i, 115);
          return (
            <text
              key={i}
              x={p.x}
              y={p.y}
              fill="white"
              fontSize="12"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ fontWeight: 'bold' }}
            >
              {s.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const careerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nameRef.current) {
      gsap.fromTo(nameRef.current, 
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 2, ease: "expo.out" }
      );
    }

    if (careerRef.current) {
      gsap.from(careerRef.current.querySelectorAll('.career-item'), {
        opacity: 0,
        x: -50,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: careerRef.current,
          start: 'top 85%',
        }
      });
    }
  }, []);

  const careerItems = [
    { title: "Intern", organization: "Confidential", period: "2026.01 - 2026.02", description: "Winter Internship focused on security research." },
    { title: "BoB (Best of the Best) Graduate", organization: "KITRI", period: "2025.06 - 2025.12", description: "Completed the 14th Best of the Best information security program, specializing in advanced security research." },
    { title: "Information Security Engineering", organization: "Sangmyung University", period: "2021 - Present", description: "Pursuing a degree in Information Security Engineering, focusing on AI-driven security." }
  ];

  return (
    <div className="home-container" style={{ position: 'relative', zIndex: 20 }}>
      <section id="intro" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="content" style={{ background: 'rgba(0, 26, 51, 0.7)', backdropFilter: 'blur(15px)' }}>
          <h1 ref={nameRef} style={{ fontSize: '6rem', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Lee Sangho
          </h1>
          <div style={{ width: '100px', height: '4px', background: 'var(--color-teal)', margin: '1.5rem auto', borderRadius: '2px' }} />
          <p style={{ fontSize: '1.6rem', fontWeight: 400, color: 'var(--color-shallow)', maxWidth: '800px', margin: '0 auto' }}>
            Security Researcher & AI Enthusiast
          </p>
          <div className="scroll-cue" style={{ marginTop: '4rem', opacity: 0.8 }}>Scroll to Explore ↓</div>
        </div>
      </section>

      <section id="career">
        <div className="content">
          <h2 style={{ fontFamily: "'Playfair Display', serif" }}>Career Journey</h2>
          <div ref={careerRef} className="career-timeline">
            {careerItems.map((item, index) => (
              <div key={index} className="career-item">
                <h3 style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
                <div className="career-org">{item.organization} | {item.period}</div>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about">
        <div className="content">
          <h2>About Me</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '4rem' }}>
            <div style={{ flex: '1', minWidth: '300px', textAlign: 'left' }}>
              <p>
                I am passionate about information security and its intersection with AI. 
                My research currently focuses on AI guardrails and securing Operational Technology (OT) environments. 
                I enjoy continuous learning and applying my knowledge to solve complex security challenges.
              </p>
            </div>
            <div style={{ flex: '1', minWidth: '300px' }}>
              <RadarChart skills={skills} />
            </div>
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="content">
          <h2>Projects</h2>
          <div className="portfolio-grid" style={{ justifyContent: 'center' }}>
            {portfolioItems.map((item) => (
              <div
                key={item.id}
                className="portfolio-card"
                onClick={() => setSelectedItem(item)}
                style={{ maxWidth: '500px', margin: '0 auto' }}
              >
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="blog-teaser">
        <div className="content">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800 }}>Logs & Insights</h2>
          <p>Explore my technical journey and research findings.</p>
          <a href="/blog" className="blog-link">Enter Archive</a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-content">
          <a href="https://github.com/whysocscs" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href="https://linkedin.com/in/whysocscs" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a href="mailto:kudo11111111@gmail.com" aria-label="Email">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-12.015-7.713v13.999h24v-13.999l-12 9.73-12-9.73z"/></svg>
          </a>
        </div>
        <p>© {new Date().getFullYear()} Lee Sangho. All rights reserved.</p>
      </footer>

      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedItem(null)}>×</button>
            <h2>{selectedItem.title}</h2>
            <p>{selectedItem.details}</p>
          </div>
        </div>
      )}
    </div>
  );
}
