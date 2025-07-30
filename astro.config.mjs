// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://huntergalloway.com.au',
	integrations: [
		mdx(), 
		sitemap(), 
		tailwind({
			config: { path: './tailwind.config.js' }
		}),
		react()
	],
});
