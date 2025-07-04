import { defineCollection, z } from 'astro:content';

const newsCollection = defineCollection({
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
        image: z.string().optional(),
    }),
});

export const collections = {
    'news': newsCollection,
    'blog': blogCollection,
    'featured': featuredCollection,
};
