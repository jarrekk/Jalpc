import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Blog</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map((post) => (
          <li key={post.slug} style={{ marginBottom: '2rem', borderBottom: '1px solid #333', paddingBottom: '1.5rem' }}>
            <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: '#9ADCD9' }}>
                {post.title}
              </h2>
              <p style={{ color: '#DCC6A0', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{post.date}</p>
              {post.desc && <p style={{ color: '#F4E7C1', opacity: 0.9 }}>{post.desc}</p>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
