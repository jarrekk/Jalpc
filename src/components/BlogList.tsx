'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { PostData } from '@/lib/posts';
import styles from '@/app/blog/blog.module.css';

interface BlogListProps {
  posts: PostData[];
}

const CATEGORY_ICONS: Record<string, string> = {
  'All': '🌊',
  'Development': '💻',
  'CTF/Wargame': '🏁',
  'BugBounty': '🛡️',
  'Technical Document': '📄',
  'Paper/Conference': '📚',
  'Contest/Certification': '🏆'
};

const CATEGORIES = Object.keys(CATEGORY_ICONS);

export default function BlogList({ posts }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (selectedCategory === 'All') return true;
      
      const postCategories = Array.isArray(post.categories) 
        ? post.categories.map(c => c.trim().toLowerCase()) 
        : (typeof post.categories === 'string' ? [post.categories.trim().toLowerCase()] : []);
      
      const target = selectedCategory.toLowerCase();

      // Broad matching for categories
      if (target === 'development') {
        return postCategories.some(c => ['development', 'web', 'python', 'system'].includes(c));
      }
      if (target === 'ctf/wargame') {
        return postCategories.some(c => ['ctf/wargame', 'ctf-wargame', 'ctf', 'pwn', 'web', 'reverse', 'crypto'].includes(c));
      }
      if (target === 'bugbounty') {
        return postCategories.some(c => ['bugbounty', 'bug bounty', 'security', 'research'].includes(c));
      }
      if (target === 'technical document') {
        return postCategories.some(c => ['technical document', 'technicaldocument', 'document'].includes(c));
      }
      if (target === 'paper/conference') {
        return postCategories.some(c => ['paper/conference', 'paper-conference', 'paper', 'conference', 'academic'].includes(c));
      }
      if (target === 'contest/certification') {
        return postCategories.some(c => ['contest/certification', 'contest-certification', 'contest', 'certification', 'others'].includes(c));
      }

      return postCategories.includes(target);
    });
  }, [posts, selectedCategory]);

  return (
    <div className={styles.blogLayout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2 style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2rem', opacity: 0.7 }}>Categories</h2>
        <nav>
          <ul className={styles.categoryList}>
            {CATEGORIES.map(cat => (
              <li key={cat} className={styles.mainCategoryItem}>
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`${styles.categoryButton} ${selectedCategory === cat ? styles.activeCategory : ''}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', textAlign: 'left' }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{CATEGORY_ICONS[cat]}</span>
                  <span>{cat}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 style={{ fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Archive</h1>
          <p>
            {selectedCategory} ({filteredPosts.length} posts)
          </p>
        </header>

        <div className={styles.postGrid}>
          {filteredPosts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`} 
              className={styles.postItem}
            >
              <article className={styles.postArticle}>
                <div className={styles.postHeader}>
                  <h2 className={styles.postTitle}>
                    {post.title}
                  </h2>
                  <time className={styles.postDate}>
                    {post.date}
                  </time>
                </div>
                {post.desc && (
                  <p className={styles.postDesc}>
                    {post.desc}
                  </p>
                )}
                <div className={styles.tagContainer}>
                  {Array.isArray(post.categories) && post.categories.map((cat: string) => (
                    <span key={cat} className={styles.tag}>
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
    </div>
  );
}
