import { defineConfig } from 'astro/config';
import preact from "@astrojs/preact";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [preact(), mdx(), sitemap()]
});