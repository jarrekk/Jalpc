import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

const postsDirectory = path.join(process.cwd(), '_legacy/_posts');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  categories?: string | string[];
  tags?: string[];
  [key: string]: any;
}

export interface PostWithContent extends PostData {
  contentHtml: string;
}

function getTags(data: any, title: string): string[] {
  let tags: string[] = [];
  
  if (data.tags && Array.isArray(data.tags)) {
    tags = [...data.tags];
  }

  // Manual Correction for "카테고리 없음"
  if (tags.length === 1 && tags[0] === "카테고리 없음") {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("cic dataset")) {
      tags = ["Packet Analysis"];
    } else if (lowerTitle.includes("modbus")) {
      tags = ["ICS/OT Security"];
    }
  }

  return tags.slice(0, 4);
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
      const title = matterResult.data.title || slug;
      const tags = getTags(matterResult.data, title);

      // Extract date from filename if not present in frontmatter or to ensure consistency
      // Jekyll format: YYYY-MM-DD-title.md
      const dateMatch = fileName.match(/^(\d{4}-\d{2}-\d{2})/);
      const filenameDate = dateMatch ? dateMatch[1] : '';

      // Combine the data with the slug
      return {
        ...matterResult.data,
        slug,
        title,
        date: matterResult.data.date ? (typeof matterResult.data.date === 'string' ? matterResult.data.date : matterResult.data.date.toISOString().split('T')[0]) : filenameDate,
        categories: matterResult.data.categories || [],
        tags,
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
  const title = matterResult.data.title || slug;
  const tags = getTags(matterResult.data, title);

  // Use remark and rehype to convert markdown into HTML string, supporting raw HTML tags
  const processedContent = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  const dateMatch = slug.match(/^(\d{4}-\d{2}-\d{2})/);
  const filenameDate = dateMatch ? dateMatch[1] : '';

  // Combine the data with the slug and contentHtml
  return {
    ...matterResult.data,
    slug,
    contentHtml,
    title,
    date: matterResult.data.date ? (typeof matterResult.data.date === 'string' ? matterResult.data.date : matterResult.data.date.toISOString().split('T')[0]) : filenameDate,
    categories: matterResult.data.categories || [],
    tags,
  };
}
