import { defineCollection, z } from 'astro:content';

const diaryCollection = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.coerce.date(),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

const featuredCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    body: z.string(),
    href: z.string(),
    type: z.enum(['research', 'github', 'blog', 'project', 'publication']),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'diary': diaryCollection,
  'blog': blogCollection,
  'featured': featuredCollection,
};
