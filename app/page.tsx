import { getAllTopicMeta } from "@/lib/content";
import TopicExplorer from "@/components/TopicExplorer";

export default function Home() {
  const topics = getAllTopicMeta();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <section className="mb-10 max-w-2xl">
        <span className="mb-3 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
          Learn by understanding, not memorizing
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
          System Design, explained twice.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Every topic comes in two flavours: a{" "}
          <strong className="text-emerald-600 dark:text-emerald-400">
            plain-English
          </strong>{" "}
          version that builds intuition, and the{" "}
          <strong className="text-indigo-600 dark:text-indigo-400">
            standard
          </strong>{" "}
          engineering version you&apos;ll use in interviews and at work. Toggle
          between them on any page.
        </p>
      </section>

      <TopicExplorer topics={topics} />
    </div>
  );
}
