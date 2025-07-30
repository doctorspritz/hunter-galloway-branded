import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog collection (existing)
const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

// Mortgage Broker pages (pSEO suburb pages)
const mortgageBrokers = defineCollection({
	loader: glob({ base: './src/content/mortgage-brokers', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		suburb: z.string(),
		location: z.object({
			country: z.string(),
			state: z.string(),
			city: z.string(),
			suburb: z.string(),
		}),
		isMoneyPage: z.boolean().optional(),
		priority: z.enum(['TOP_MONEY_PAGE', 'high', 'medium', 'low']).optional(),
		originalUrl: z.string(),
		publishDate: z.string(),
		lastModified: z.string().optional(),
		wordpressId: z.number().optional(),
	}),
});

// Home Loan service pages
const homeLoans = defineCollection({
	loader: glob({ base: './src/content/home-loans', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		serviceType: z.enum([
			'first-home-buyers',
			'refinancing', 
			'investment-properties',
			'upgrading',
			'professionals',
			'specialty'
		]),
		profession: z.string().optional(), // for professional loans
		originalUrl: z.string(),
		publishDate: z.string(),
		lastModified: z.string().optional(),
		wordpressId: z.number().optional(),
	}),
});

// Educational resources and guides
const resources = defineCollection({
	loader: glob({ base: './src/content/resources', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		category: z.enum([
			'guides',
			'blog',
			'tools',
			'case-studies',
			'faqs'
		]),
		subcategory: z.string().optional(),
		originalUrl: z.string(),
		publishDate: z.string(),
		lastModified: z.string().optional(),
		wordpressId: z.number().optional(),
		featured: z.boolean().optional(),
	}),
});

// Calculator and tool pages
const calculators = defineCollection({
	loader: glob({ base: './src/content/calculators', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		calculatorType: z.enum([
			'mortgage-calculator',
			'borrowing-capacity',
			'stamp-duty',
			'mortgage-vs-rent',
			'refinancing-savings',
			'deposit-calculator',
			'affordability'
		]),
		originalUrl: z.string(),
		publishDate: z.string(),
		lastModified: z.string().optional(),
		wordpressId: z.number().optional(),
		interactive: z.boolean().optional(),
	}),
});

// Best Suburbs content
const bestSuburbs = defineCollection({
	loader: glob({ base: './src/content/best-suburbs', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		location: z.object({
			country: z.string(),
			state: z.string(),
			city: z.string().optional(),
		}),
		contentType: z.enum(['rankings', 'market-data', 'lifestyle-guide', 'hotspots']),
		originalUrl: z.string(),
		publishDate: z.string(),
		lastModified: z.string().optional(),
		wordpressId: z.number().optional(),
	}),
});

// Company pages
const company = defineCollection({
	loader: glob({ base: './src/content/company', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pageType: z.enum(['about', 'contact', 'legal', 'thank-you', 'referral']),
		originalUrl: z.string(),
		publishDate: z.string(),
		lastModified: z.string().optional(),
		wordpressId: z.number().optional(),
	}),
});

export const collections = {
	blog,
	'mortgage-brokers': mortgageBrokers,
	'home-loans': homeLoans,
	resources,
	calculators,
	'best-suburbs': bestSuburbs,
	company,
};
