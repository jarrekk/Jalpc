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
    <div className={styles.blogLayout} style={{ justifyContent: 'center' }}>
      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <h1 className={styles.articleTitle}>{post.title}</h1>
          <div className={styles.articleMeta}>
            <time dateTime={post.date}>{post.date}</time>
            {post.categories && (Array.isArray(post.categories) ? post.categories.length > 0 : true) && (
              <span>
                • {Array.isArray(post.categories) ? post.categories.join(', ') : post.categories}
              </span>
            )}
          </div>
        </header>
        <div 
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
        />
      </article>
    </div>
  );
}
