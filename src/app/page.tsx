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
    const cats = (Array.isArray(post.categories) ? post.categories : [post.categories])
      .filter((c): c is string => !!c)
      .map(c => c.toLowerCase());
    
    const tags = post.tags || [];

    Object.entries(STANDARD_CATEGORIES).forEach(([standardCat, aliases]) => {
      const hasMatch = aliases.some(alias => 
        cats.includes(alias.toLowerCase()) || 
        tags.some(t => t.toLowerCase() === alias.toLowerCase())
      );

      if (hasMatch) {
        categoryStats[standardCat].count++;
        tags.forEach(tag => {
          const lowerTag = tag.toLowerCase();
          // Only add tags that are not the standard category itself or its aliases
          if (lowerTag !== standardCat.toLowerCase() && !aliases.includes(lowerTag)) {
            categoryStats[standardCat].subCategories.add(tag);
          }
        });
      }
    });
  });

  // Convert Sets to arrays and sort by frequency or just limit
  const categoryData = Object.entries(categoryStats).reduce((acc, [cat, stats]) => {
    // Sort subcategories by some heuristic if possible, or just take first few
    // Here we just take the first 4 unique tags as per instructions
    acc[cat] = {
      count: stats.count,
      subCategories: Array.from(stats.subCategories).slice(0, 4)
    };
    return acc;
  }, {} as Record<string, { count: number; subCategories: string[] }>);

  return <HomeClient categoryData={categoryData} />;
}
