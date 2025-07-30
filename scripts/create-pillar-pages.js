#!/usr/bin/env node

/**
 * Create pillar pages for each taxonomy level
 * 
 * Generates landing pages and category hubs to organize content
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Pillar page definitions for each taxonomy level
 */
const pillarPages = [
  // Top-level navigation pages (will be regular Astro pages, not content collections)
  {
    path: 'src/pages/home-loans.astro',
    title: 'Home Loans Brisbane | Expert Mortgage Services',
    description: 'Find the perfect home loan with Hunter Galloway. First home buyers, refinancing, investment properties, and professional loan services across Brisbane.',
    layout: 'LoanLandingLayout',
    type: 'service-hub',
    content: `
## All Home Loan Services

Whether you're a first home buyer, looking to refinance, or investing in property, our expert mortgage brokers will find you the perfect loan.

### Our Services
- **First Home Buyers** - Get into the market with confidence
- **Refinancing** - Lower your rate and save money  
- **Investment Properties** - Build your property portfolio
- **Professional Loans** - Specialist rates for doctors, nurses, teachers
- **Upgrading** - Move to your dream home
- **Specialty Loans** - Guarantor loans and unique situations

### Why Choose Hunter Galloway?
- Access to 30+ lenders
- No brokerage fees
- Award-winning service
- Highest approval rates in Australia
`
  },
  
  {
    path: 'src/pages/calculators.astro',
    title: 'Home Loan Calculators | Free Mortgage Tools',
    description: 'Free home loan calculators to help you plan your purchase. Calculate borrowing power, repayments, stamp duty, and more.',
    layout: 'GenericPageLayout',
    type: 'tools-hub',
    content: `
## Free Home Loan Calculators

Make informed decisions with our comprehensive range of mortgage calculators and planning tools.

### Available Calculators
- **Borrowing Capacity** - How much can you borrow?
- **Mortgage Calculator** - Estimate your repayments
- **Stamp Duty Calculator** - Calculate state-specific costs  
- **Mortgage vs Rent** - Should you buy or rent?
- **Deposit Calculator** - How much deposit do you need?

### Planning Tools
All our calculators are free to use and provide instant results to help you plan your home loan journey.
`
  },

  {
    path: 'src/pages/resources.astro', 
    title: 'Home Buying Resources | Guides & Educational Content',
    description: 'Everything you need to know about buying a home. Step-by-step guides, market insights, and expert advice from Brisbane mortgage brokers.',
    layout: 'GenericPageLayout',
    type: 'education-hub',
    content: `
## Home Buying Resources

Your complete guide to navigating the home buying process with confidence.

### Step-by-Step Guides
- **Buying Process** - From pre-approval to settlement
- **First Home Buyers** - Everything you need to get started
- **Investment Properties** - Build your portfolio strategically
- **Loan Types** - Understanding your options

### Market Insights
- **Best Suburbs** - Where to buy in Brisbane
- **Market Updates** - Latest trends and forecasts
- **Government Grants** - Available schemes and eligibility

### Tools & Resources
- **Calculators** - Plan your purchase
- **Checklists** - Stay organized
- **Case Studies** - Real success stories
`
  },

  {
    path: 'src/pages/mortgage-brokers.astro',
    title: 'Mortgage Brokers | Local Service Across Australia', 
    description: 'Expert mortgage brokers providing personalized service across Australia. Find your local Hunter Galloway broker today.',
    layout: 'GenericPageLayout',
    type: 'location-hub',
    content: `
## Local Mortgage Broker Services

Hunter Galloway provides expert mortgage broker services across Australia, with specialized local knowledge in every market.

### Brisbane - Our Home Base ⭐️
**[Get started with Brisbane's #1 mortgage broker](/mortgage-brokers/brisbane/)**

Brisbane is our specialty, with award-winning service and the highest approval rates in Queensland.

### Service Areas
- **Queensland** - Brisbane, Gold Coast, Sunshine Coast
- **New South Wales** - Sydney and surrounding areas
- **Victoria** - Melbourne metro and regional
- **Western Australia** - Perth and surrounds

### Why Local Matters
- Market-specific knowledge
- Local lender relationships  
- Understanding of regional property markets
- Personalized service in your area
`
  },

  {
    path: 'src/pages/best-suburbs.astro',
    title: 'Best Suburbs Brisbane | Property Market Intelligence',
    description: 'Discover the best suburbs in Brisbane for families, first home buyers, and investors. Expert market analysis and suburb guides.',
    layout: 'GenericPageLayout', 
    type: 'market-hub',
    content: `
## Best Suburbs in Brisbane

Data-driven suburb analysis to help you make the right property choice.

### Find Your Perfect Suburb
- **For Families** - Schools, parks, and community
- **For First Home Buyers** - Affordable areas with growth potential  
- **For Investors** - High rental yields and capital growth
- **For Professionals** - Easy commute and lifestyle

### Market Intelligence
- **Growth Forecasts** - Where values are heading
- **Rental Yields** - Investment return analysis
- **Infrastructure** - Upcoming developments
- **Lifestyle Factors** - What makes each area special

### Queensland Coverage
Starting with Brisbane, expanding to Gold Coast and Sunshine Coast data.
`
  }
];

/**
 * Content collection pillar pages (these go in content collections)
 */
const contentPillarPages = [
  // Home Loans collection pillars
  {
    collection: 'home-loans',
    path: 'first-home-buyers/index.md',
    frontmatter: {
      title: 'First Home Buyer Loans | Get Into Your First Home',
      description: 'Expert first home buyer loans with no brokerage fees. Government grants, low deposit options, and step-by-step guidance.',
      serviceType: 'first-home-buyers',
      originalUrl: '/first-home-buyer-loans',
      publishDate: new Date().toISOString(),
    },
    content: `
# First Home Buyer Loans

Getting into your first home is an exciting milestone. Our specialist first home buyer team will guide you through every step.

## What We Offer
- **No brokerage fees** - Save thousands on your first purchase
- **Low deposit options** - Get in with as little as 5% deposit
- **Government grant assistance** - Maximize your eligible benefits
- **Pre-approval** - Shop with confidence

## Our Process
1. **Free consultation** - Understand your options
2. **Pre-approval** - Know your budget
3. **Property search** - Find the perfect home
4. **Settlement** - Move into your new home

## Get Started
Ready to take the first step? Book your free consultation today.
`
  },

  {
    collection: 'home-loans', 
    path: 'professionals/index.md',
    frontmatter: {
      title: 'Home Loans for Professionals | Doctors, Nurses, Teachers',
      description: 'Specialist home loans for medical professionals, teachers, and other qualified occupations. No LMI options and preferred rates.',
      serviceType: 'professionals',
      originalUrl: '/home-loans-professionals',
      publishDate: new Date().toISOString(),
    },
    content: `
# Professional Home Loans

Specialized lending solutions for qualified professionals with preferential rates and terms.

## Who Qualifies
- **Medical Professionals** - Doctors, specialists, dentists
- **Nurses & Midwives** - Registered nursing professionals  
- **Teachers** - Primary, secondary, and tertiary educators
- **Other Professionals** - Accountants, lawyers, engineers

## Professional Benefits
- **No LMI up to 90%** - Save on lenders mortgage insurance
- **Preferred interest rates** - Access to exclusive rates
- **Higher borrowing capacity** - Based on professional income
- **Flexible deposit options** - Low deposit solutions

## Our Professional Services
Tailored lending solutions that recognize your professional status and earning potential.
`
  },

  // Resources collection pillars
  {
    collection: 'resources',
    path: 'guides/index.md',
    frontmatter: {
      title: 'Home Buying Guides | Step-by-Step Property Purchase Help',
      description: 'Comprehensive guides for buying property in Australia. From first home buyers to investment strategies.',
      category: 'guides',
      originalUrl: '/guides',
      publishDate: new Date().toISOString(),
      featured: true
    },
    content: `
# Home Buying Guides

Everything you need to know about buying property in Australia, from your first home to building an investment portfolio.

## Getting Started
- **Know Your Budget** - Understanding what you can afford
- **Loan Pre-approval** - Get ready to buy
- **Deposit Requirements** - How much you need to save

## The Buying Process  
- **Property Research** - Finding the right area
- **Making Offers** - Negotiation strategies
- **Building Inspections** - Protecting your investment
- **Settlement** - Final steps to ownership

## Advanced Strategies
- **Investment Properties** - Building wealth through property
- **Portfolio Growth** - Expanding your investments
- **Market Timing** - When to buy and sell
`
  },

  {
    collection: 'resources',
    path: 'guides/buying-process/index.md', 
    frontmatter: {
      title: 'Home Buying Process | Complete Step-by-Step Guide',
      description: 'Master the home buying process with our comprehensive guide. From research to settlement, everything you need to know.',
      category: 'guides',
      subcategory: 'buying-process',
      originalUrl: '/buying-process-guide',
      publishDate: new Date().toISOString(),
      featured: true
    },
    content: `
# The Complete Home Buying Process

Your step-by-step guide to purchasing property in Australia.

## Phase 1: Preparation
- **Assess Your Situation** - Financial readiness check
- **Get Pre-approved** - Know your borrowing capacity  
- **Set Your Budget** - Include all costs
- **Choose Your Team** - Broker, solicitor, inspector

## Phase 2: Property Search
- **Research Areas** - Find the right location
- **Attend Inspections** - Evaluate properties
- **Due Diligence** - Check everything thoroughly
- **Property Valuation** - Ensure fair price

## Phase 3: Making an Offer
- **Negotiation Strategy** - Get the best price
- **Contract Review** - Understand terms
- **Formal Approval** - Finalize your loan
- **Building Inspection** - Final checks

## Phase 4: Settlement
- **Final Walkthrough** - Ensure property condition
- **Sign Documents** - Complete the purchase
- **Get Your Keys** - Move into your new home
- **Post-Settlement** - Insurance, utilities, moving
`
  },

  // Mortgage Brokers collection pillars  
  {
    collection: 'mortgage-brokers',
    path: 'index.md',
    frontmatter: {
      title: 'Mortgage Brokers Australia | Local Expert Service',
      description: 'Hunter Galloway mortgage brokers across Australia. Award-winning service with local market expertise.',
      suburb: '',
      location: {
        country: 'australia',
        state: '',
        city: '',
        suburb: ''
      },
      originalUrl: '/mortgage-brokers',
      publishDate: new Date().toISOString(),
      priority: 'high'
    },
    content: `
# Mortgage Brokers Across Australia

Hunter Galloway provides expert mortgage broker services nationwide, with deep local market knowledge in every area we serve.

## Our Locations

### Queensland
- **[Brisbane](/mortgage-brokers/brisbane/)** ⭐️ - Our flagship location and specialty
- **Gold Coast** - Coming soon
- **Sunshine Coast** - Coming soon

### Other States
- **Sydney, NSW** - Major metro coverage
- **Melbourne, VIC** - Complete metro service  
- **Perth, WA** - Established presence

## Why Choose Local Expertise
- **Market Knowledge** - Understanding of local property trends
- **Lender Relationships** - Established connections with regional lenders
- **Regulatory Expertise** - State-specific requirements and processes
- **Personal Service** - Face-to-face consultations available

## Our Promise
Wherever you are in Australia, you'll receive the same award-winning service that's made us Brisbane's #1 mortgage broker.
`
  }
];

/**
 * Ensure directory exists
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Create Astro page content
 */
function createAstroPageContent(page) {
  return `---
import ${page.layout} from '../layouts/${page.layout}.astro';
---

<${page.layout} 
  title="${page.title}"
  description="${page.description}"
>
  <main class="max-w-4xl mx-auto px-4 py-12">
    <div class="prose prose-lg max-w-none">
${page.content.split('\n').map(line => '      ' + line).join('\n')}
    </div>
  </main>
</${page.layout}>
`;
}

/**
 * Create content collection markdown content
 */
function createMarkdownContent(frontmatter, content) {
  const yamlFrontmatter = Object.entries(frontmatter)
    .map(([key, value]) => {
      if (value === null || value === undefined) return null;
      if (typeof value === 'object') {
        const objContent = Object.entries(value)
          .map(([k, v]) => `  ${k}: "${v}"`)
          .join('\n');
        return `${key}:\n${objContent}`;
      }
      if (typeof value === 'boolean') {
        return `${key}: ${value}`;
      }
      return `${key}: "${value}"`;
    })
    .filter(line => line !== null)
    .join('\n');
  
  return `---\n${yamlFrontmatter}\n---\n${content}\n`;
}

/**
 * Generate all pillar pages
 */
function createPillarPages() {
  console.log('🏛️  Creating pillar pages for taxonomy structure...\n');
  
  let created = 0;
  let errors = 0;
  
  // Create Astro page pillar pages
  pillarPages.forEach(page => {
    try {
      const fullPath = path.join(__dirname, '..', page.path);
      const dirPath = path.dirname(fullPath);
      
      ensureDirectoryExists(dirPath);
      
      const content = createAstroPageContent(page);
      fs.writeFileSync(fullPath, content, 'utf8');
      
      console.log(`✅ Created: ${page.path}`);
      created++;
    } catch (error) {
      console.error(`❌ Error creating ${page.path}:`, error.message);
      errors++;
    }
  });
  
  // Create content collection pillar pages
  contentPillarPages.forEach(page => {
    try {
      const fullPath = path.join(__dirname, '../src/content', page.collection, page.path);
      const dirPath = path.dirname(fullPath);
      
      ensureDirectoryExists(dirPath);
      
      const content = createMarkdownContent(page.frontmatter, page.content);
      fs.writeFileSync(fullPath, content, 'utf8');
      
      console.log(`✅ Created: src/content/${page.collection}/${page.path}`);
      created++;
    } catch (error) {
      console.error(`❌ Error creating content/${page.collection}/${page.path}:`, error.message);
      errors++;
    }
  });
  
  console.log('\n🏛️  Pillar Page Creation Complete!\n');
  console.log('='.repeat(50));
  console.log(`Pillar Pages Created: ${created}`);
  console.log(`Errors: ${errors}`);
  console.log('='.repeat(50));
  
  console.log('\n📋 Created Pillar Pages:');
  console.log('  🔹 Top-level navigation hubs (Astro pages)');
  console.log('  🔹 Service category landing pages');
  console.log('  🔹 Resource collection hubs');
  console.log('  🔹 Taxonomy index pages');
  
  console.log('\n🎯 Next: Update navigation to link to pillar pages');
}

// Run the pillar page creation
createPillarPages();