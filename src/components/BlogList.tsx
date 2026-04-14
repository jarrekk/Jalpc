'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PostData } from '@/lib/posts';

const CATEGORIES = [
  'All',
  'Blog',
  'Development',
  'CTF-Wargame',
  'BugBounty',
  'Technical Document',
  'Paper-Conference',
  'Contest-Certification',
  'Etc'
];

interface BlogListProps {
  posts: PostData[];
}

export default function BlogList({ posts }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = posts.filter((post) => {
    if (selectedCategory === 'All') return true;
    
    const postCategories = Array.isArray(post.categories) 
      ? post.categories.map(c => c.trim().toLowerCase()) 
      : (typeof post.categories === 'string' ? [post.categories.trim().toLowerCase()] : []);
      
    const target = selectedCategory.toLowerCase();
    
    // Special handling for "Technical Document" mapping
    if (target === 'technical document') {
        return postCategories.includes('technicaldocument') || postCategories.includes('technical document');
    }
    
    return postCategories.includes(target);
  });

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 2rem' }}>
      <h1 style={{ fontSize: '3.5rem', marginBottom: '3rem', textAlign: 'center', color: 'var(--color-shallow)' }}>
        Blog
      </h1>

      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '10px', 
        justifyContent: 'center', 
        marginBottom: '4rem' 
      }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '0.6rem 1.2rem',
              borderRadius: '25px',
              border: `1px solid ${selectedCategory === cat ? 'var(--color-shallow)' : 'rgba(255,255,255,0.2)'}`,
              background: selectedCategory === cat ? 'var(--color-shallow)' : 'transparent',
              color: selectedCategory === cat ? 'var(--color-deep)' : 'white',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              transition: 'all 0.3s ease'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ 
        display: 'grid', 
        gap: '2rem',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
      }}>
        {filteredPosts.map((post) => (
          <Link 
            key={post.slug} 
            href={`/blog/${post.slug}`} 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '2rem',
              borderRadius: '15px',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'transform 0.3s ease, border-color 0.3s ease',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
            className="blog-card"
            >
              <p style={{ color: 'var(--color-shallow)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                {post.date}
              </p>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'white' }}>
                {post.title}
              </h2>
              {post.desc && (
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: '1.5', flexGrow: 1 }}>
                  {post.desc}
                </p>
              )}
              <div style={{ marginTop: '1rem', display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                {Array.isArray(post.categories) && post.categories.map((cat: string) => (
                  <span key={cat} style={{ fontSize: '0.7rem', background: 'rgba(0,139,139,0.3)', padding: '2px 8px', borderRadius: '4px' }}>
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredPosts.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '4rem', opacity: 0.5 }}>No posts found in this category.</p>
      )}
    </div>
  );
}
