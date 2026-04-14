import { getAllPosts } from '@/lib/posts';
import HomeClient from '@/components/HomeClient';
import { STANDARD_CATEGORIES } from '@/lib/constants';

export default function Home() {
  const posts = getAllPosts();
  
  const categoryStats: Record<string, { count: number; subCategories: Set<string> }> = {
    'Development': { count: 0, subCategories: new Set() },
    'CTF/Wargame': { count: 0, subCategories: new Set() },
    'BugBounty': { count: 0, subCategories: new Set() },
    'Technical Document': { count: 0, subCategories: new Set() },
    'Paper/Conference': { count: 0, subCategories: new Set() },
    'Contest/Certification': { count: 0, subCategories: new Set() }
  };

  posts.forEach(post => {
    if (post.categories) {
      const cats = (Array.isArray(post.categories) ? post.categories : [post.categories])
        .map(c => c.toLowerCase());
      
      const subTags = (Array.isArray(post.categories) ? post.categories : [post.categories]);

      Object.entries(STANDARD_CATEGORIES).forEach(([standardCat, aliases]) => {
        if (aliases.some(alias => cats.includes(alias))) {
          categoryStats[standardCat].count++;
          subTags.forEach(tag => {
            // Only add tags that are not the standard category itself (case insensitive)
            if (tag.toLowerCase() !== standardCat.toLowerCase() && !aliases.includes(tag.toLowerCase())) {
              categoryStats[standardCat].subCategories.add(tag);
            }
          });
        }
      });
    }
  });

  // Convert Sets to arrays for the client component
  const categoryData = Object.entries(categoryStats).reduce((acc, [cat, stats]) => {
    acc[cat] = {
      count: stats.count,
      subCategories: Array.from(stats.subCategories).slice(0, 5) // Limit to top 5 subcategories
    };
    return acc;
  }, {} as Record<string, { count: number; subCategories: string[] }>);

  return <HomeClient categoryData={categoryData} />;
}
