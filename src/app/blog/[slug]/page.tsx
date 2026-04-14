import { getPostBySlug, getAllPosts } from '@/lib/posts';
import '../blog.css';

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
    <article className="blog-content" style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid var(--color-teal)', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--color-shallow)' }}>{post.title}</h1>
        <div style={{ display: 'flex', gap: '1rem', color: 'var(--color-sand-wet)', fontSize: '0.9rem' }}>
          <time dateTime={post.date}>{post.date}</time>
          {post.categories && (Array.isArray(post.categories) ? post.categories.length > 0 : true) && (
            <span>
              • {Array.isArray(post.categories) ? post.categories.join(', ') : post.categories}
            </span>
          )}
        </div>
      </header>
      <div 
        dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
      />
    </article>
  );
}
