'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { PostData } from '@/lib/posts';
import styles from '@/app/blog/blog.module.css';

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
      if (postCategories.includes(mainTarget)) return true;
      
      const subs = CATEGORY_STRUCTURE[selectedMainCategory].map(s => s.toLowerCase());
      if (subs.some(sub => postCategories.includes(sub))) return true;

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
    <div className={styles.blogLayout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2>Categories</h2>
        <nav>
          <ul className={styles.categoryList}>
            {Object.keys(CATEGORY_STRUCTURE).map(mainCat => (
              <li key={mainCat} className={styles.mainCategoryItem}>
                <button
                  onClick={() => handleMainCategoryClick(mainCat)}
                  className={`${styles.categoryButton} ${selectedMainCategory === mainCat ? styles.activeCategory : ''}`}
                >
                  {mainCat}
                </button>
                {selectedMainCategory === mainCat && CATEGORY_STRUCTURE[mainCat].length > 0 && (
                  <ul className={styles.subCategoryList}>
                    {CATEGORY_STRUCTURE[mainCat].map(subCat => (
                      <li key={subCat}>
                        <button
                          onClick={() => setSelectedSubCategory(subCat === selectedSubCategory ? null : subCat)}
                          className={`${styles.subCategoryButton} ${selectedSubCategory === subCat ? styles.activeSubCategory : ''}`}
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
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>Blog</h1>
          <p>
            {selectedMainCategory} {selectedSubCategory ? `> ${selectedSubCategory}` : ''} ({filteredPosts.length} posts)
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
