import { defineConfig } from 'astro/config';
import { toString } from 'mdast-util-to-string';
import { execSync } from "child_process";

import preact from "@astrojs/preact";
import getReadingTime from 'reading-time';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import partytown from '@astrojs/partytown';

export function remarkModifiedTime() {
  return function (tree, file) {
    const filepath = file.history[0];
    const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
    file.data.astro.frontmatter.lastModified = result.toString();
  };
}

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
  site: 'https://mzakizadeh.com',
  integrations: [
    preact(),
    mdx(),
    sitemap({ filter: (page) => !page.startsWith('https://mzakizadeh.com/blog') }),
    partytown({ config: { forward: ["dataLayer.push"] } }),
  ],
  markdown: {
    remarkPlugins: [remarkModifiedTime, remarkReadingTime],
  },
});
