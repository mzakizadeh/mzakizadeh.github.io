import { defineConfig } from 'astro/config';
import { toString } from 'mdast-util-to-string';

import preact from "@astrojs/preact";
import getReadingTime from 'reading-time';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    // readingTime.text will give us minutes read as a friendly string,
    // i.e. "3 min read"
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [preact(), mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
});