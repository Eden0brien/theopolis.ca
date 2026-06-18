import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// English-only site. Content is organised one markdown file per page/entry.
//   src/content/pages/about.md   → id "about"
// Routes call getEntry('pages', slug).

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Optional hero/eyebrow shown above the H1.
    eyebrow: z.string().optional(),
    legal: z.boolean().optional(),
  }),
});

// Exhibition artworks for sale (the "Buy 2026 Exhibition Art" gallery).
const artworks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artworks' }),
  schema: z.object({
    title: z.string(),
    artist: z.string(),
    // Price as a display string ("$700") or "NFS" (not for sale).
    price: z.string(),
    status: z.enum(['available', 'sold', 'nfs']).default('available'),
    buyUrl: z.string().optional(),
    image: z.string().optional(),
    order: z.number().optional(),
  }),
});

// Artist Fraternity members.
const artists = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artists' }),
  schema: z.object({
    name: z.string(),
    role: z.string().optional(),
    image: z.string().optional(),
    links: z
      .array(z.object({ label: z.string(), url: z.string() }))
      .optional(),
    order: z.number().optional(),
  }),
});

// The Tempest — quarterly journal of arts and letters (no posts yet).
const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string().optional(),
    summary: z.string().optional(),
    cover: z.string().optional(),
  }),
});

export const collections = { pages, artworks, artists, journal };
