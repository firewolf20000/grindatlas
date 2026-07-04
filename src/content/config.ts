import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['idle-games', 'roguelikes', 'tools', 'general']),
    game: z.string().optional(),
    tags: z.array(z.string()).default([]),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('GrindAtlas Editors'),
    featured: z.boolean().default(false),
    toc: z.boolean().default(true),
    faq: z
      .array(z.object({ q: z.string(), a: z.string() }))
      .optional(),
  }),
});

const games = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    category: z.enum(['idle', 'roguelike', 'incremental', 'strategy']),
    developer: z.string().optional(),
    releaseYear: z.number().optional(),
    platforms: z.array(z.string()).default(['Web']),
    shortDescription: z.string(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    website: z.string().url().optional(),
  }),
});

const tools = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    category: z.string(),
    icon: z.string().default('🛠️'),
    relatedGames: z.array(z.string()).default([]),
  }),
});

export const collections = { articles, games, tools };
