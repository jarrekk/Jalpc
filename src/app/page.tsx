'use client';

import { useState } from 'react';

const portfolioItems = [
  { 
    id: 1, 
    title: 'SLM-based OT Solution', 
    description: 'An OT security solution based on SLM, focused on practical defense and applied security architecture.', 
    details: 'This project involved developing a comprehensive security solution for Operational Technology (OT) environments using Small Language Models (SLM). It focuses on practical defense mechanisms and the implementation of robust security architectures tailored for industrial control systems.' 
  },
  { id: 2, title: 'Project Two', description: 'Underwater habitat design.', details: 'Detailed info about Project Two...' },
  { id: 3, title: 'Project Three', description: 'Marine life tracking app.', details: 'Detailed info about Project Three...' },
  { id: 4, title: 'Project Four', description: 'Coral reef restoration.', details: 'Detailed info about Project Four...' },
];

const skills = [
  { name: 'Communication', level: 60 },
  { name: 'AI Knowledge', level: 55 },
  { name: 'Development', level: 58 },
  { name: 'Python', level: 57 },
  { name: 'Security Knowledge', level: 56 },
];

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);

  return (
    <div className="home-container">
      <section id="intro">
        <div className="content">
          <h1>whysocscs</h1>
          <p>Full Stack Engineer | Security Researcher | Traveler</p>
          <div className="scroll-cue">Scroll Down ↓</div>
        </div>
      </section>

      <section id="about">
        <div className="content">
          <h2>About Me</h2>
          <p>
            I am a Full Stack engineer with website development, automation Ops and writing scripts experience. 
            Life is a continuous learning process, so work makes me more rigorous, travel makes my life more colorful. 
            I can make lots of friends when I coding and travel.
          </p>
          
          <div className="skills-container" style={{ marginTop: '2rem' }}>
            <h3>Skills</h3>
            <div style={{ display: 'grid', gap: '10px', maxWidth: '400px', margin: '0 auto' }}>
              {skills.map(skill => (
                <div key={skill.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px' }}>
                    <div style={{ width: `${skill.level}%`, height: '100%', background: '#00ffff', borderRadius: '4px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio">
        <div className="content">
          <h2>Portfolio</h2>
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
          <h2>From the Blog</h2>
          <p>Check out my latest thoughts on security and web development.</p>
          <a href="/blog" className="blog-link">Visit Blog</a>
        </div>
      </section>

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
