import { getAllPosts } from '@/lib/posts';
import HomeClient from '@/components/HomeClient';

export default function Home() {
  const posts = getAllPosts();
  
  // Standardized categories
  const STANDARD_CATEGORIES: Record<string, string[]> = {
    'Development': ['development', 'web', 'python', 'system'],
    'CTF/Wargame': ['ctf/wargame', 'ctf-wargame', 'ctf', 'pwn', 'web', 'reverse', 'crypto'],
    'BugBounty': ['bugbounty', 'bug bounty', 'security', 'research'],
    'Technical Document': ['technical document', 'technicaldocument', 'document'],
    'Paper/Conference': ['paper/conference', 'paper-conference', 'paper', 'conference', 'academic'],
    'Contest/Certification': ['contest/certification', 'contest-certification', 'contest', 'certification', 'others']
  };

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
