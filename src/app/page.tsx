import { getAllPosts } from '@/lib/posts';
import HomeClient from '@/components/HomeClient';

export default function Home() {
  const posts = getAllPosts();
  
  // Calculate category counts
  const categoryCounts: Record<string, number> = {};
  posts.forEach(post => {
    if (post.categories) {
      const cats = Array.isArray(post.categories) ? post.categories : [post.categories];
      cats.forEach(cat => {
        if (cat) {
          categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
        }
      });
    }
  });

  // Sort categories by count
  const sortedCategoryCounts = Object.fromEntries(
    Object.entries(categoryCounts).sort(([, a], [, b]) => b - a)
  );

  return <HomeClient categoryCounts={sortedCategoryCounts} />;
}
