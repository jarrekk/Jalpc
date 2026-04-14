'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { PostData } from '@/lib/posts';
import styles from '@/app/blog/blog.module.css';

interface BlogListProps {
  posts: PostData[];
}

const CATEGORY_ICONS: Record<string, string> = {
  'Development': '💻',
  'CTF/Wargame': '🏁',
  'BugBounty': '🛡️',
  'Technical Document': '📄',
  'Paper/Conference': '📚',
  'Contest/Certification': '🏆',
  'Etc': '⚓'
};

const CATEGORIES = Object.keys(CATEGORY_ICONS);

export default function BlogList({ posts }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts;
    
    return posts.filter((post) => {
      const postCategories = Array.isArray(post.categories) 
        ? post.categories.map(c => c.trim().toLowerCase()) 
        : (typeof post.categories === 'string' ? [post.categories.trim().toLowerCase()] : []);
      
      const target = selectedCategory.toLowerCase();

      if (target === 'etc') {
        const mainCats = CATEGORIES.filter(c => c !== 'Etc').map(c => c.toLowerCase());
        return postCategories.some(c => !mainCats.includes(c)) || postCategories.length === 0;
      }

      // Broad matching for categories
      if (target === 'development') {
        return postCategories.some(c => ['development', 'web', 'python', 'system', 'programming'].includes(c));
      }
      if (target === 'ctf/wargame') {
        return postCategories.some(c => ['ctf/wargame', 'ctf-wargame', 'ctf', 'pwn', 'web', 'reverse', 'crypto', 'wargame'].includes(c));
      }
      if (target === 'bugbounty') {
        return postCategories.some(c => ['bugbounty', 'bug bounty', 'security', 'research', 'vulnerability'].includes(c));
      }
      if (target === 'technical document') {
        return postCategories.some(c => ['technical document', 'technicaldocument', 'document', 'guide', 'tutorial'].includes(c));
      }
      if (target === 'paper/conference') {
        return postCategories.some(c => ['paper/conference', 'paper-conference', 'paper', 'conference', 'academic', 'publication'].includes(c));
      }
      if (target === 'contest/certification') {
        return postCategories.some(c => ['contest/certification', 'contest-certification', 'contest', 'certification', 'award'].includes(c));
      }

      return postCategories.includes(target);
    });
  }, [posts, selectedCategory]);

  const subCategories = useMemo(() => {
    const cats = new Set<string>();
    filteredPosts.forEach(post => {
      if (Array.isArray(post.categories)) {
        post.categories.forEach(c => cats.add(c.trim()));
      } else if (typeof post.categories === 'string') {
        cats.add(post.categories.trim());
      }
    });
    return Array.from(cats).sort();
  }, [filteredPosts]);

  if (!selectedCategory) {
    return (
      <div className={styles.categoryGridContainer}>
        <header className={styles.header} style={{ marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-display)', textTransform: 'uppercase' }}>Archive</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.6 }}>Explore by technical domain</p>
        </header>
        <div className={styles.categoryGrid}>
          {CATEGORIES.map(cat => (
            <div 
              key={cat} 
              className={styles.categoryCard}
              onClick={() => setSelectedCategory(cat)}
            >
              <span className={styles.categoryIcon}>{CATEGORY_ICONS[cat]}</span>
              <h2 className={styles.categoryTitle}>{cat}</h2>
              <span className={styles.postCount}>
                {posts.filter(p => {
                  const pcats = Array.isArray(p.categories) ? p.categories.map(c => c.toLowerCase()) : [];
                  if (cat === 'Etc') {
                    const mainCats = CATEGORIES.filter(c => c !== 'Etc').map(c => c.toLowerCase());
                    return pcats.some(c => !mainCats.includes(c)) || pcats.length === 0;
                  }
                  const target = cat.toLowerCase();
                  if (target === 'development') return pcats.some(c => ['development', 'web', 'python', 'system', 'programming'].includes(c));
                  if (target === 'ctf/wargame') return pcats.some(c => ['ctf/wargame', 'ctf-wargame', 'ctf', 'pwn', 'web', 'reverse', 'crypto', 'wargame'].includes(c));
                  if (target === 'bugbounty') return pcats.some(c => ['bugbounty', 'bug bounty', 'security', 'research', 'vulnerability'].includes(c));
                  if (target === 'technical document') return pcats.some(c => ['technical document', 'technicaldocument', 'document', 'guide', 'tutorial'].includes(c));
                  if (target === 'paper/conference') return pcats.some(c => ['paper/conference', 'paper-conference', 'paper', 'conference', 'academic', 'publication'].includes(c));
                  if (target === 'contest/certification') return pcats.some(c => ['contest/certification', 'contest-certification', 'contest', 'certification', 'award'].includes(c));
                  return pcats.includes(target);
                }).length} Posts
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.blogLayout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <button 
          onClick={() => setSelectedCategory(null)}
          className={styles.backButton}
        >
          ← All Categories
        </button>
        <div className={styles.sidebarSection}>
          <h3>Current</h3>
          <div className={styles.activeCategoryDisplay}>
            <span>{CATEGORY_ICONS[selectedCategory]}</span>
            <strong>{selectedCategory}</strong>
          </div>
        </div>
        <div className={styles.sidebarSection}>
          <h3>Sub-categories</h3>
          <ul className={styles.subCategoryList}>
            {subCategories.map(sub => (
              <li key={sub} className={styles.subCategoryItem}>
                #{sub}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>{selectedCategory}</h1>
          <p>{filteredPosts.length} posts discovered</p>
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

