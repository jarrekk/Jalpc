'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { PostData } from '@/lib/posts';
import styles from '@/app/blog/blog.module.css';
import { CATEGORY_ICONS, STANDARD_CATEGORIES } from '@/lib/constants';

interface BlogListProps {
  posts: PostData[];
}

const CATEGORIES = Object.keys(CATEGORY_ICONS);

export default function BlogList({ posts }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts;
    
    return posts.filter((post) => {
      const postCategories = (Array.isArray(post.categories) 
        ? post.categories 
        : (typeof post.categories === 'string' ? [post.categories] : []))
        .map(c => c.trim().toLowerCase());
      
      if (selectedCategory === 'Etc') {
        const allAliases = Object.values(STANDARD_CATEGORIES).flat();
        return postCategories.every(c => !allAliases.includes(c)) || postCategories.length === 0;
      }

      const aliases = STANDARD_CATEGORIES[selectedCategory]?.map(a => a.toLowerCase()) || [selectedCategory.toLowerCase()];
      return postCategories.some(c => aliases.includes(c));
    });
  }, [posts, selectedCategory]);

  if (!selectedCategory) {
    return (
      <div className={styles.categoryGridContainer}>
        <header className={styles.header}>
          <h1>Archive</h1>
          <p>Technical journey and research findings</p>
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
                  const pcats = (Array.isArray(p.categories) ? p.categories : [p.categories || '']).map(c => c.trim().toLowerCase());
                  if (cat === 'Etc') {
                    const allAliases = Object.values(STANDARD_CATEGORIES).flat();
                    return pcats.every(c => !allAliases.includes(c)) || pcats.length === 0;
                  }
                  const aliases = STANDARD_CATEGORIES[cat]?.map(a => a.toLowerCase()) || [cat.toLowerCase()];
                  return pcats.some(c => aliases.includes(c));
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
      <aside className={styles.sidebar}>
        <button onClick={() => setSelectedCategory(null)} className={styles.backButton}>
          ← Back to Archive
        </button>
        <div className={styles.sidebarSection}>
          <h3>Current Domain</h3>
          <div className={styles.activeCategoryDisplay}>
            <span>{CATEGORY_ICONS[selectedCategory]}</span>
            <strong>{selectedCategory}</strong>
          </div>
        </div>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>{selectedCategory}</h1>
          <p>{filteredPosts.length} posts discovered</p>
        </header>

        <div className={styles.postGrid}>
          {filteredPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.postItem}>
              <article className={styles.postArticle}>
                <div className={styles.postHeader}>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <time className={styles.postDate}>{post.date}</time>
                </div>
                {post.desc && <p className={styles.postDesc}>{post.desc}</p>}
                <div className={styles.tagContainer}>
                  {Array.isArray(post.categories) && post.categories.map((cat: string) => (
                    <span key={cat} className={styles.tag}>{cat}</span>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </div>
        
        {filteredPosts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '10rem 0', opacity: 0.5 }}>
            <p>No posts found in this category.</p>
          </div>
        )}
      </main>
    </div>
  );
}
