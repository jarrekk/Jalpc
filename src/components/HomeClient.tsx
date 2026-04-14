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
  },
  { 
    id: 2, 
    title: 'Syzdirect (In Progress)', 
    description: 'Directed greybox fuzzing for Linux kernel, focusing on efficiency and path discovery.', 
    details: 'Syzdirect is a directed greybox fuzzer for the Linux kernel. It aims to improve the efficiency of vulnerability discovery by directing the fuzzer towards specific target code areas, leveraging advanced path discovery techniques.' 
  },
  { 
    id: 3, 
    title: 'Honeypot (In Progress)', 
    description: 'Advanced deception system for threat intelligence gathering and attacker behavior analysis.', 
    details: 'This project focuses on building an advanced honeypot system designed to gather high-fidelity threat intelligence. It employs sophisticated deception techniques to analyze attacker behavior and identify emerging threats in real-time.' 
  }
];

const careerItems = [
  { title: "Undergraduate Research Intern", organization: "Confidential", period: "2026.01 - 2026.02", description: "Winter Internship focused on security research and AI guardrails." },
  { title: "BoB (Best of the Best) Graduate", organization: "KITRI", period: "2025.06 - 2025.12", description: "Completed the 14th Best of the Best information security program, specializing in advanced security research." },
  { title: "Information Security Engineering", organization: "Sangmyung University", period: "2021 - Present", description: "Pursuing a degree in Information Security Engineering, focusing on AI-driven security." }
];

interface HomeClientProps {
  categoryCounts: Record<string, number>;
}

export default function HomeClient({ categoryCounts }: HomeClientProps) {
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const careerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nameRef.current) {
      gsap.fromTo(nameRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, ease: "expo.out" }
      );
    }

    if (careerRef.current) {
      gsap.from(careerRef.current.querySelectorAll('.career-item'), {
        opacity: 0,
        x: -30,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: careerRef.current,
          start: 'top 90%',
        }
      });
    }
  }, []);

  return (
    <div className="home-container" style={{ position: 'relative', zIndex: 20 }}>
      <section id="intro" style={{ minHeight: 'auto', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h1 ref={nameRef} style={{ fontSize: '5rem', marginBottom: '0.5rem' }}>
            Lee Sangho
          </h1>
          <p style={{ fontSize: '1.2rem', fontWeight: 600, color: '#444', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Security Researcher & AI Guardrail
          </p>
          <div className="scroll-cue" style={{ marginTop: '2rem' }}>↓</div>
        </div>
      </section>

      <section id="career">
        <div className="content">
          <h2>Career</h2>
          <div ref={careerRef} className="career-timeline">
            {careerItems.map((item, index) => (
              <div key={index} className="career-item">
                <h3>{item.title}</h3>
                <div className="career-org">{item.organization} | {item.period}</div>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="content">
          <h2>Projects</h2>
          <div className="portfolio-grid">
            {portfolioItems.map((item) => (
              <div
                key={item.id}
                className="portfolio-card"
                onClick={() => setSelectedItem(item)}
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
          <h2>Logs & Insights</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
            {Object.entries(categoryCounts).map(([category, count]) => (
              <div key={category} style={{ background: 'rgba(0,0,0,0.05)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 600 }}>
                {category} <span style={{ color: 'var(--color-teal)' }}>{count}</span>
              </div>
            ))}
          </div>
          <p>Technical journey and research findings.</p>
          <a href="/blog" className="blog-link" style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Enter Archive</a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-content">
          <a href="https://github.com/whysocscs" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href="https://linkedin.com/in/whysocscs" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
        </div>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>© {new Date().getFullYear()} Lee Sangho</p>
      </footer>

      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ background: '#fff', color: '#000' }}>
            <button className="close-btn" onClick={() => setSelectedItem(null)} style={{ color: '#000' }}>×</button>
            <h2>{selectedItem.title}</h2>
            <p>{selectedItem.details}</p>
          </div>
        </div>
      )}
    </div>
  );
}
