import { defineCollection, z } from 'astro:content';

const diary = defineCollection({
    type: 'content',
    schema: z.object({
        date: z.coerce.date(),
    }),
});

export const collections = { diary };
