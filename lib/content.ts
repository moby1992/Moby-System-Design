import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Topic, TopicFrontmatter, TopicMeta } from "./types";

const TOPICS_DIR = path.join(process.cwd(), "content", "topics");

function readTopicFile(fileName: string): Topic {
  const fullPath = path.join(TOPICS_DIR, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as Partial<TopicFrontmatter>;
  const slug = fm.slug ?? fileName.replace(/\.mdx?$/, "");

  return {
    title: fm.title ?? slug,
    slug,
    category: fm.category ?? "General",
    order: fm.order ?? 999,
    summary: fm.summary ?? "",
    keywords: fm.keywords ?? [],
    readTime: fm.readTime ?? "5 min",
    content,
  };
}

/** All topics sorted by category, then by `order`. */
export function getAllTopics(): Topic[] {
  if (!fs.existsSync(TOPICS_DIR)) return [];
  return fs
    .readdirSync(TOPICS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map(readTopicFile)
    .sort(
      (a, b) =>
        a.category.localeCompare(b.category) || a.order - b.order,
    );
}

/** Lightweight metadata list (no MDX body) for nav, search, and cards. */
export function getAllTopicMeta(): TopicMeta[] {
  return getAllTopics().map(
    ({ title, slug, category, order, summary, keywords, readTime }) => ({
      title,
      slug,
      category,
      order,
      summary,
      keywords,
      readTime,
    }),
  );
}

export function getTopicBySlug(slug: string): Topic | undefined {
  return getAllTopics().find((t) => t.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAllTopics().map((t) => t.slug);
}
