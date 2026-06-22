import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import {
  getAllSlugs,
  getAllTopicMeta,
  getTopicBySlug,
} from "@/lib/content";
import { mdxComponents } from "@/components/mdx-components";
import { ExplanationModeProvider } from "@/components/ExplanationModeProvider";
import ExplanationToggle from "@/components/ExplanationToggle";
import ProgressButton from "@/components/ProgressButton";
import Sidebar from "@/components/Sidebar";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) return { title: "Topic not found" };
  return { title: topic.title, description: topic.summary };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();

  const allTopics = getAllTopicMeta();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="lg:flex lg:gap-10">
        <Sidebar topics={allTopics} currentSlug={topic.slug} />

        <article className="min-w-0 flex-1">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
          >
            ← All topics
          </Link>

          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
              {topic.category}
            </span>
            <span className="text-xs text-zinc-400 dark:text-zinc-500">
              {topic.readTime} read
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
            {topic.title}
          </h1>
          <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
            {topic.summary}
          </p>

          <ExplanationModeProvider>
            <ExplanationToggle />

            <div className="prose prose-zinc max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-pre:bg-zinc-900 prose-pre:text-zinc-100 prose-a:text-indigo-600 dark:prose-a:text-indigo-400">
              <MDXRemote
                source={topic.content}
                components={mdxComponents}
                options={{
                  mdxOptions: { remarkPlugins: [remarkGfm] },
                }}
              />
            </div>
          </ExplanationModeProvider>

          <div className="mt-10 flex items-center justify-between border-t border-zinc-200 pt-6 dark:border-zinc-800">
            <ProgressButton slug={topic.slug} />
            <Link
              href="/"
              className="text-sm text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
            >
              Back to all topics →
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
