# System Design Learn

A responsive web app for learning software **System Design**. Every topic is
explained twice — once in plain, layman's English to build intuition, and once
in standard engineering language for interviews and real work. A toggle on each
topic switches between the two registers.

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, and
**MDX**.

## Features

- **Dual explanations** — `Simple` ⇄ `Standard` toggle on every topic, persisted
  in `localStorage`.
- **MDX content** — each topic is one Markdown/MDX file; adding a topic is just
  dropping in a new file.
- **Diagrams** — architecture diagrams rendered with Mermaid.
- **Dark mode** — system-aware, toggleable, no flash (via `next-themes`).
- **Search** — fuzzy search across topics (Fuse.js).
- **Progress tracking** — mark topics complete; progress bar and badges, stored
  locally in the browser.
- **Responsive** — mobile-first; the topic sidebar collapses into a drawer.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (static-generates every topic)
npm run lint
```

## Project structure

```
app/
  layout.tsx                # Shell: ThemeProvider, header, footer
  page.tsx                  # Home: hero + searchable topic grid
  topics/[slug]/page.tsx    # Renders a topic's MDX + toggle + progress
components/                 # UI + the layman/standard mechanism
  ExplanationModeProvider.tsx  # React context, persisted to localStorage
  Layman.tsx / Standard.tsx    # Mode-gated content blocks used in MDX
  Mermaid.tsx                  # Client-side diagram renderer
  Sidebar.tsx, TopicCard.tsx, TopicExplorer.tsx, ...
lib/
  content.ts                # Reads & parses content/topics/*.mdx
  useProgress.ts            # localStorage progress hook
  types.ts
content/topics/*.mdx        # The learning content
```

## Adding a new topic

1. Create `content/topics/your-topic.mdx`.
2. Add frontmatter:

   ```yaml
   ---
   title: Your Topic
   slug: your-topic
   category: Performance
   order: 2
   summary: One-line description shown on cards and search.
   keywords: [keyword1, keyword2]
   readTime: 6 min
   ---
   ```

3. Write the body, interleaving the two registers:

   ```mdx
   <Layman>

   A friendly analogy that builds intuition...

   </Layman>

   <Standard>

   The precise, formal engineering explanation...

   </Standard>

   <Mermaid chart={`flowchart LR
     A[Client] --> B[Server]
   `} />
   ```

That's it — the topic is picked up automatically and statically generated at
build time.
