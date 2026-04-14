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

  return (
    <div className={styles.blogLayout}>
      <aside className={styles.sidebar}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#111', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Archive
        </h2>
        <ul className={styles.categoryList}>
          <li className={styles.mainCategoryItem}>
            <button 
              onClick={() => setSelectedCategory(null)} 
              className={`${styles.categoryButton} ${!selectedCategory ? styles.activeCategory : ''}`}
            >
              All Posts
            </button>
          </li>
          {CATEGORIES.map(cat => (
            <li key={cat} className={styles.mainCategoryItem}>
              <button 
                onClick={() => setSelectedCategory(cat)} 
                className={`${styles.categoryButton} ${selectedCategory === cat ? styles.activeCategory : ''}`}
              >
                <span style={{ marginRight: '0.5rem' }}>{CATEGORY_ICONS[cat]}</span>
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>{selectedCategory || 'Archive'}</h1>
          <p>{filteredPosts.length} posts discovered in this domain</p>
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
                  {(Array.isArray(post.categories) ? post.categories : [post.categories || '']).map((cat: string) => (
                    cat && <span key={cat} className={styles.tag}>{cat}</span>
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
