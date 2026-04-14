'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { PostData } from '@/lib/posts';

interface BlogListProps {
  posts: PostData[];
}

const CATEGORY_STRUCTURE: Record<string, string[]> = {
  'All': [],
  'Development': ['Web', 'Python', 'System'],
  'CTF-Wargame': ['Pwn', 'Web', 'Reverse', 'Crypto'],
  'Security': ['BugBounty', 'Research'],
  'Academic': ['TechnicalDocument', 'Paper-Conference'],
  'Others': ['Contest-Certification', 'Etc', 'HTML']
};

export default function BlogList({ posts }: BlogListProps) {
  const [selectedMainCategory, setSelectedMainCategory] = useState('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const postCategories = Array.isArray(post.categories) 
        ? post.categories.map(c => c.trim().toLowerCase()) 
        : (typeof post.categories === 'string' ? [post.categories.trim().toLowerCase()] : []);
      
      if (selectedMainCategory === 'All') return true;

      const mainTarget = selectedMainCategory.toLowerCase();
      const subTarget = selectedSubCategory?.toLowerCase();

      // If a sub-category is selected, match it
      if (subTarget) {
        return postCategories.includes(subTarget) || 
               post.title.toLowerCase().includes(subTarget) ||
               (post.desc && post.desc.toLowerCase().includes(subTarget));
      }

      // If only main category is selected
      // Check if post category matches main category
      if (postCategories.includes(mainTarget)) return true;
      
      // Special case for grouped categories
      const subs = CATEGORY_STRUCTURE[selectedMainCategory].map(s => s.toLowerCase());
      if (subs.some(sub => postCategories.includes(sub))) return true;

      // Special handling for TechnicalDocument vs Technical Document
      if (mainTarget === 'academic' && (postCategories.includes('technicaldocument') || postCategories.includes('technical document') || postCategories.includes('paper-conference'))) {
        return true;
      }
      
      if (mainTarget === 'security' && (postCategories.includes('bugbounty'))) {
        return true;
      }

      if (mainTarget === 'others' && (postCategories.includes('etc') || postCategories.includes('contest-certification') || postCategories.includes('html') || postCategories.includes('blog'))) {
        return true;
      }

      return false;
    });
  }, [posts, selectedMainCategory, selectedSubCategory]);

  const handleMainCategoryClick = (cat: string) => {
    setSelectedMainCategory(cat);
    setSelectedSubCategory(null);
  };

  return (
    <div className="blog-layout" style={{ display: 'flex', minHeight: '100vh', color: 'white', background: 'transparent' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '280px', 
        padding: '4rem 2rem', 
        borderRight: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(0, 26, 51, 0.2)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--color-shallow)' }}>Categories</h2>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {Object.keys(CATEGORY_STRUCTURE).map(mainCat => (
              <li key={mainCat} style={{ marginBottom: '1rem' }}>
                <button
                  onClick={() => handleMainCategoryClick(mainCat)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: selectedMainCategory === mainCat ? 'var(--color-shallow)' : 'rgba(255,255,255,0.7)',
                    fontSize: '1.1rem',
                    fontWeight: selectedMainCategory === mainCat ? '700' : '400',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                    padding: '0.5rem 0',
                    transition: 'color 0.2s'
                  }}
                >
                  {mainCat}
                </button>
                {selectedMainCategory === mainCat && CATEGORY_STRUCTURE[mainCat].length > 0 && (
                  <ul style={{ listStyle: 'none', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                    {CATEGORY_STRUCTURE[mainCat].map(subCat => (
                      <li key={subCat}>
                        <button
                          onClick={() => setSelectedSubCategory(subCat === selectedSubCategory ? null : subCat)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: selectedSubCategory === subCat ? 'white' : 'rgba(255,255,255,0.5)',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            textAlign: 'left',
                            width: '100%',
                            padding: '0.3rem 0',
                            transition: 'color 0.2s'
                          }}
                        >
                          {subCat}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '4rem 3rem', maxWidth: '1000px' }}>
        <header style={{ marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.03em' }}>Blog</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem' }}>
            {selectedMainCategory} {selectedSubCategory ? `> ${selectedSubCategory}` : ''} ({filteredPosts.length} posts)
          </p>
        </header>

        <div style={{ display: 'grid', gap: '2.5rem' }}>
          {filteredPosts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`} 
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <article style={{
                paddingBottom: '2.5rem',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                transition: 'opacity 0.2s'
              }}
              className="blog-item"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>
                    {post.title}
                  </h2>
                  <time style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', whiteSpace: 'nowrap', marginLeft: '2rem' }}>
                    {post.date}
                  </time>
                </div>
                {post.desc && (
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    {post.desc}
                  </p>
                )}
                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                  {Array.isArray(post.categories) && post.categories.map((cat: string) => (
                    <span key={cat} style={{ 
                      fontSize: '0.75rem', 
                      color: 'var(--color-shallow)',
                      background: 'rgba(154, 220, 217, 0.1)', 
                      padding: '4px 12px', 
                      borderRadius: '20px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {cat}
                    </span>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </div>
        
        {filteredPosts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '10rem 0', opacity: 0.5 }}>
            <p style={{ fontSize: '1.2rem' }}>No posts found in this category.</p>
          </div>
        )}
      </main>

      <style jsx>{`
        .blog-item:hover {
          opacity: 0.8;
        }
        @media (max-width: 768px) {
          .blog-layout {
            flex-direction: column;
          }
          aside {
            width: 100% !important;
            height: auto !important;
            position: relative !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            padding: 2rem !important;
          }
          main {
            padding: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
