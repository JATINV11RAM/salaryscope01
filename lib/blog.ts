import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const blogDirectory = path.join(process.cwd(), "content", "blog");

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  slug: string;
  category: string;
  readingTime: string;
};

export type BlogPost = BlogFrontmatter & { content: string };

function readPost(fileName: string): BlogPost {
  const raw = fs.readFileSync(path.join(blogDirectory, fileName), "utf8");
  const { data, content } = matter(raw);
  return { ...(data as BlogFrontmatter), content };
}

export function getAllPosts(): BlogPost[] {
  return fs
    .readdirSync(blogDirectory)
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map(readPost)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}
