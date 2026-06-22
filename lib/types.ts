export type ExplanationMode = "layman" | "standard";

export interface TopicFrontmatter {
  title: string;
  slug: string;
  category: string;
  order: number;
  summary: string;
  keywords: string[];
  readTime: string;
}

export type TopicMeta = TopicFrontmatter;

export interface Topic extends TopicFrontmatter {
  /** Raw MDX body (frontmatter stripped) */
  content: string;
}
