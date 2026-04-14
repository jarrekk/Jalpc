import { getPostBySlug, getAllPosts } from '@/lib/posts';
import styles from '../blog.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <div className={styles.blogLayout} style={{ justifyContent: 'center', background: '#ffffff' }}>
      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <h1 className={styles.articleTitle} style={{ fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{post.title}</h1>
          <div className={styles.articleMeta}>
            <time dateTime={post.date}>{post.date}</time>
            {post.categories && (Array.isArray(post.categories) ? post.categories.length > 0 : true) && (
              <span>
                • {Array.isArray(post.categories) ? post.categories.join(', ') : post.categories}
              </span>
            )}
          </div>
          {post.generatedTags && post.generatedTags.length > 0 && (
            <div className={styles.tagContainer} style={{ marginTop: '1.5rem' }}>
              {post.generatedTags.map((tag: string) => (
                <span key={tag} className={styles.tag} style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '0.8rem', padding: '6px 12px' }}>
                  # {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        <div 
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
        />
      </article>
    </div>
  );
}
