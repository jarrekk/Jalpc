import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), '_legacy/_posts');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  categories?: string | string[];
  generatedTags?: string[];
  [key: string]: any;
}

export interface PostWithContent extends PostData {
  contentHtml: string;
}

function generateTags(content: string, title: string): string[] {
  const lowerContent = content.toLowerCase();
  const lowerTitle = title.toLowerCase();
  const generatedTags = new Set<string>();
  
  const keywordDictionary = [
    'Jekyll', 'GitHub', 'CTF', 'Bob', 'Fuzzing', 'Linux', 'Python', 
    'Algorithm', 'Network', 'Security', 'AI', 'Web',
    'LLM', 'React', 'Next.js', 'Vulnerability', 'Exploit', 'Pwn',
    'Kernel', 'Syscall', 'Driver', 'Rootkit', 'Modbus', 'Packet',
    'Syzkaller', 'Syzdirect', 'Recall', 'Precision', 'Confusion Matrix',
    'Llama Guard', 'LLM Safeguard', 'Dataset', 'Docker', 'Automation'
  ];

  keywordDictionary.forEach(kw => {
    const lowerKw = kw.toLowerCase();
    if (lowerContent.includes(lowerKw) || lowerTitle.includes(lowerKw)) {
      generatedTags.add(kw);
    }
  });

  return Array.from(generatedTags).slice(0, 4);
}

export function getAllPosts(): PostData[] {
  // Get file names under /_legacy/_posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);
      
      const generatedTags = generateTags(matterResult.content, matterResult.data.title || slug);

      // Extract date from filename if not present in frontmatter or to ensure consistency
      // Jekyll format: YYYY-MM-DD-title.md
      const dateMatch = fileName.match(/^(\d{4}-\d{2}-\d{2})/);
      const filenameDate = dateMatch ? dateMatch[1] : '';

      // Combine the data with the slug
      return {
        ...matterResult.data,
        slug,
        title: matterResult.data.title || slug,
        date: matterResult.data.date ? (typeof matterResult.data.date === 'string' ? matterResult.data.date : matterResult.data.date.toISOString().split('T')[0]) : filenameDate,
        categories: matterResult.data.categories || [],
        generatedTags,
      } as PostData;
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostBySlug(slug: string): Promise<PostWithContent> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  
  const generatedTags = generateTags(matterResult.content, matterResult.data.title || slug);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  const dateMatch = slug.match(/^(\d{4}-\d{2}-\d{2})/);
  const filenameDate = dateMatch ? dateMatch[1] : '';

  // Combine the data with the slug and contentHtml
  return {
    ...matterResult.data,
    slug,
    contentHtml,
    title: matterResult.data.title || slug,
    date: matterResult.data.date ? (typeof matterResult.data.date === 'string' ? matterResult.data.date : matterResult.data.date.toISOString().split('T')[0]) : filenameDate,
    categories: matterResult.data.categories || [],
    generatedTags,
  };
}
