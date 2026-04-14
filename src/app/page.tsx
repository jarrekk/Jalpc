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

  const careerItems = [
    { title: "Undergraduate Research Intern", organization: "Sangmyung University", period: "2024 - Present", description: "Focusing on AI guardrails and OT security." },
    { title: "BoB (Best of the Best) Graduate", organization: "KITRI", period: "2023 - 2024", description: "Completed the 12th Best of the Best information security program." },
    { title: "Information Security Engineering Student", organization: "Sangmyung University", period: "2020 - Present", description: "Studying various aspects of information security." }
  ];

  return (
    <div className="home-container">
      <section id="intro">
        <div className="content">
          <h1>Lee Sangho</h1>
          <p>Information Security Engineering student at Sangmyung University, BoB (Best of the Best) graduate, and Undergraduate Research Intern focusing on AI guardrails and OT security.</p>
          <div className="scroll-cue">Scroll Down ↓</div>
        </div>
      </section>

      <section id="career">
        <div className="content">
          <h2>Career</h2>
          <div className="career-timeline">
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

      <section id="about">
        <div className="content">
          <h2>About Me</h2>
          <p>
            I am passionate about information security and its intersection with AI. 
            My research currently focuses on AI guardrails and securing Operational Technology (OT) environments. 
            I enjoy continuous learning and applying my knowledge to solve complex security challenges.
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
          <h2>From the Blog</h2>
          <p>Check out my latest thoughts on security and research.</p>
          <a href="/blog" className="blog-link">Visit Blog</a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-content">
          <a href="https://github.com/whysocscs" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="mailto:kudo11111111@gmail.com">Email</a>
          <a href="https://linkedin.com/in/whysocscs" target="_blank" rel="noopener noreferrer">LinkedIn</a>
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
