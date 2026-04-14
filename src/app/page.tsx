'use client';

import { useState } from 'react';

const portfolioItems = [
  { id: 1, title: 'Project One', description: 'Deep sea exploration robot.', details: 'Detailed info about Project One...' },
  { id: 2, title: 'Project Two', description: 'Underwater habitat design.', details: 'Detailed info about Project Two...' },
  { id: 3, title: 'Project Three', description: 'Marine life tracking app.', details: 'Detailed info about Project Three...' },
  { id: 4, title: 'Project Four', description: 'Coral reef restoration.', details: 'Detailed info about Project Four...' },
];

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);

  return (
    <div>
      <section id="intro">
        <div className="content">
          <h1>Deep Sea Portfolio</h1>
          <p>Exploring the depths of creativity.</p>
          <div className="scroll-cue">Scroll Down ↓</div>
        </div>
      </section>

      <section id="about">
        <div className="content">
          <h2>About Me</h2>
          <p>I am a creative developer who loves to dive deep into new technologies.</p>
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
          <p>Check out my latest thoughts on marine biology and web development.</p>
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
