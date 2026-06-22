import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Topic not found
      </h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        We couldn&apos;t find that System Design topic.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Browse all topics
      </Link>
    </div>
  );
}
