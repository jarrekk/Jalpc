import { getAllPosts } from '@/lib/posts';
import HomeClient from '@/components/HomeClient';
import { STANDARD_CATEGORIES } from '@/lib/constants';

export default function Home() {
  const posts = getAllPosts();
  
  const categoryCounts: Record<string, number> = {
    'Development': 0,
    'CTF/Wargame': 0,
    'BugBounty': 0,
    'Technical Document': 0,
    'Paper/Conference': 0,
    'Contest/Certification': 0
  };

  posts.forEach(post => {
    if (post.categories) {
      const cats = (Array.isArray(post.categories) ? post.categories : [post.categories])
        .map(c => c.toLowerCase());
      
      Object.entries(STANDARD_CATEGORIES).forEach(([standardCat, aliases]) => {
        if (aliases.some(alias => cats.includes(alias))) {
          categoryCounts[standardCat]++;
        }
      });
    }
  });

  return <HomeClient categoryCounts={categoryCounts} />;
}
