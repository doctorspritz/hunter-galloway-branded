#!/usr/bin/env node

/**
 * WordPress to Astro Content Migration Script
 * 
 * Processes wordpress-export.json (412 pages) and categorizes them
 * into the new semantic structure with appropriate layouts.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load WordPress export data
const wordpressData = JSON.parse(fs.readFileSync(path.join(__dirname, '../wordpress-export.json'), 'utf8'));

// URL pattern mapping for automatic categorization
const urlPatterns = {
  // TOP MONEY PAGE - Special treatment
  '/mortgage-broker-brisbane': {
    newPath: '/mortgage-brokers/brisbane/',
    layout: 'LoanLandingLayout',
    category: 'mortgage-brokers',
    status: 'existing',
    priority: 'TOP_MONEY_PAGE',
    isMoneyPage: true
  },
  
  // Other Mortgage Broker Pages (pSEO) - Keep existing structure  
  '/mortgage-broker-': {
    newPath: '/mortgage-brokers/brisbane/{suburb}/',
    layout: 'LoanLandingLayout', 
    category: 'mortgage-brokers',
    status: 'existing'
  },
  
  // Loan Services - Consolidate scattered pages
  '/first-home-buyer-loans': {
    newPath: '/home-loans/first-home-buyers/',
    layout: 'LoanLandingLayout',
    category: 'home-loans',
    status: 'existing'
  },
  '/get-a-stress-free-first-home-loan': {
    newPath: '/home-loans/first-home-buyers/getting-started/',
    layout: 'GuideLayout',
    category: 'home-loans',
    status: 'existing'
  },
  '/refinance-home-loan': {
    newPath: '/home-loans/refinancing/',
    layout: 'LoanLandingLayout',
    category: 'home-loans',
    status: 'existing'
  },
  '/lower-your-rate': {
    newPath: '/home-loans/refinancing/lower-rates/',
    layout: 'GuideLayout',
    category: 'home-loans',
    status: 'existing'
  },
  '/home-loans-for-doctors': {
    newPath: '/home-loans/professionals/doctors/',
    layout: 'LoanLandingLayout',
    category: 'home-loans',
    status: 'existing'
  },
  '/nurse-home-loan': {
    newPath: '/home-loans/professionals/nurses/',
    layout: 'LoanLandingLayout',
    category: 'home-loans',
    status: 'existing'
  },
  '/guarantor-home-loan': {
    newPath: '/home-loans/specialty/guarantor-loans/',
    layout: 'LoanLandingLayout',
    category: 'home-loans',
    status: 'existing'
  },
  '/investment-loans-queensland': {
    newPath: '/home-loans/investment-properties/',
    layout: 'LoanLandingLayout',
    category: 'home-loans',
    status: 'existing'
  },
  '/your-property-investment-journey': {
    newPath: '/home-loans/investment-properties/getting-started/',
    layout: 'GuideLayout',
    category: 'home-loans',
    status: 'existing'
  },
  '/ready-to-upgrade': {
    newPath: '/home-loans/upgrading/',
    layout: 'LoanLandingLayout',
    category: 'home-loans',
    status: 'existing'
  },
  
  // Calculators & Tools
  '/mortgage-calculator': {
    newPath: '/calculators/mortgage-calculator/',
    layout: 'CalculatorLayout',
    category: 'calculators',
    status: 'existing'
  },
  '/mortgage-vs-rent-calculator': {
    newPath: '/calculators/mortgage-vs-rent/',
    layout: 'CalculatorLayout',
    category: 'calculators',
    status: 'existing'
  },
  '/borrowing-power': {
    newPath: '/calculators/borrowing-capacity/',
    layout: 'CalculatorLayout',
    category: 'calculators',
    status: 'existing'
  },
  
  // Generic Pages
  '/contact': {
    newPath: '/contact/',
    layout: 'GenericPageLayout',
    category: 'company',
    status: 'existing'
  },
  '/about': {
    newPath: '/about/',
    layout: 'GenericPageLayout',
    category: 'company',
    status: 'existing'
  },
  '/our-team': {
    newPath: '/about/our-team/',
    layout: 'GenericPageLayout',
    category: 'company',
    status: 'existing'
  },
  '/free-assessment': {
    newPath: '/contact/',
    layout: 'GenericPageLayout',
    category: 'company',
    status: 'existing'
  },
  
  // Professional Services - Additional patterns
  '/nurses-midwives': {
    newPath: '/home-loans/professionals/nurses/',
    layout: 'LoanLandingLayout',
    category: 'home-loans',
    status: 'existing'
  },
  '/teachers': {
    newPath: '/home-loans/professionals/teachers/',
    layout: 'LoanLandingLayout',
    category: 'home-loans',
    status: 'existing'
  },
  '/kiwi-first-home-buyers': {
    newPath: '/home-loans/first-home-buyers/kiwi-buyers/',
    layout: 'LoanLandingLayout',
    category: 'home-loans',
    status: 'existing'
  },
  
  // Service-related pages
  '/home-loans-brisbane': {
    newPath: '/home-loans/',
    layout: 'LoanLandingLayout',
    category: 'home-loans',
    status: 'existing'
  },
  '/upgrade-my-home': {
    newPath: '/home-loans/upgrading/',
    layout: 'LoanLandingLayout',
    category: 'home-loans',
    status: 'existing'
  },
  '/risk-insurance': {
    newPath: '/home-loans/specialty/insurance/',
    layout: 'LoanLandingLayout',
    category: 'home-loans',
    status: 'existing'
  },
  
  // Educational Content & Guides
  '/queensland-first-home-buyers-grant': {
    newPath: '/resources/blog/grants-schemes/qld-first-home-grant/',
    layout: 'BlogPostLayout',
    category: 'resources',
    status: 'existing'
  },
  '/top-5-hot-spots-in-qld': {
    newPath: '/best-suburbs/australia/queensland/hot-spots/',
    layout: 'BlogPostLayout',
    category: 'best-suburbs',
    status: 'existing'
  },
  '/suburbs-in-brisbane': {
    newPath: '/best-suburbs/australia/queensland/brisbane/',
    layout: 'GuideLayout',
    category: 'best-suburbs',
    status: 'existing'
  },
  '/suburbs-map': {
    newPath: '/best-suburbs/australia/queensland/brisbane/map/',
    layout: 'GenericPageLayout',
    category: 'best-suburbs',
    status: 'existing'
  },
  
  // Tools & Calculators
  '/tools': {
    newPath: '/calculators/',
    layout: 'GenericPageLayout',
    category: 'calculators',
    status: 'existing'
  },
  
  // Company pages
  '/who-we-help': {
    newPath: '/about/who-we-help/',
    layout: 'GenericPageLayout',
    category: 'company',
    status: 'existing'
  },
  '/get-free-assessment': {
    newPath: '/contact/',
    layout: 'GenericPageLayout',
    category: 'company',
    status: 'existing'
  },
  
  // Thank you / result pages (keep for conversion tracking)
  '/thank-you-2': {
    newPath: '/thank-you/',
    layout: 'GenericPageLayout',
    category: 'company',
    status: 'existing'
  },
  '/you-need-at-least-8-deposit': {
    newPath: '/calculators/results/deposit-required/',
    layout: 'GenericPageLayout',
    category: 'calculators',
    status: 'existing'
  },
  '/youre-eligible-for-a-loan': {
    newPath: '/calculators/results/eligible/',
    layout: 'GenericPageLayout',
    category: 'calculators',
    status: 'existing'
  },
  
  // Blog/Educational content
  '/are-you-actually-ready-to-buy-your-first-home': {
    newPath: '/resources/blog/first-home-buyers/readiness-guide/',
    layout: 'BlogPostLayout',
    category: 'resources',
    status: 'existing'
  },
  
  // External tools/partnerships
  '/join-location-genius': {
    newPath: '/resources/tools/location-genius/',
    layout: 'GenericPageLayout',
    category: 'resources',
    status: 'existing'
  },
  '/mortgage-report': {
    newPath: '/resources/tools/mortgage-report/',
    layout: 'GenericPageLayout',
    category: 'resources',
    status: 'existing'
  },
  
  // Legal/misc pages
  '/youtube-disclaimer': {
    newPath: '/legal/youtube-disclaimer/',
    layout: 'GenericPageLayout',
    category: 'company',
    status: 'existing'
  },
  '/test': {
    newPath: null, // Skip test pages
    layout: null,
    category: 'skip',
    status: 'skip'
  },
  
  // Hub content - educational guides
  '/hub': {
    newPath: '/resources/guides/buying-process/',
    layout: 'GuideLayout',
    category: 'resources',
    status: 'existing'
  },
  
  // Educational blog content patterns
  '/best-mortgage-broker-brisbane': {
    newPath: '/resources/blog/guides/choosing-a-broker/',
    layout: 'BlogPostLayout',
    category: 'resources',
    status: 'existing'
  },
  
  // Company/thank you pages
  '/thank-you-referral': {
    newPath: '/thank-you-referral/',
    layout: 'GenericPageLayout',
    category: 'company',
    status: 'existing'
  },
  
  // Settlement process pages - all go under buying process guide
  '/finalise-settlement': {
    newPath: '/resources/guides/buying-process/settlement/',
    layout: 'GuideLayout',
    category: 'resources',
    status: 'existing'
  },
  '/settlement-and-getting-your-keys': {
    newPath: '/resources/guides/buying-process/settlement/getting-keys/',
    layout: 'GuideLayout',
    category: 'resources',
    status: 'existing'
  },
  '/get-the-power-connected-mail-redirected': {
    newPath: '/resources/guides/buying-process/settlement/utilities/',
    layout: 'GuideLayout',
    category: 'resources',
    status: 'existing'
  },
  '/sign-your-loan-documents': {
    newPath: '/resources/guides/buying-process/loan-approval/signing-documents/',
    layout: 'GuideLayout',
    category: 'resources',
    status: 'existing'
  },
  '/arrange-building-pest-inspection': {
    newPath: '/resources/guides/buying-process/inspections/',
    layout: 'GuideLayout',
    category: 'resources',
    status: 'existing'
  },
  '/get-insurance-right-away': {
    newPath: '/resources/guides/buying-process/insurance/',
    layout: 'GuideLayout',
    category: 'resources',
    status: 'existing'
  },
  '/get-formal-approval': {
    newPath: '/resources/guides/buying-process/loan-approval/',
    layout: 'GuideLayout',
    category: 'resources',
    status: 'existing'
  },
  
  // Auction-related content
  '/11-point-auction-bidding-checklist': {
    newPath: '/resources/guides/buying-process/auctions/bidding-checklist/',
    layout: 'GuideLayout',
    category: 'resources',
    status: 'existing'
  },
  '/buy-at-auction': {
    newPath: '/resources/guides/buying-process/auctions/',
    layout: 'GuideLayout',
    category: 'resources',
    status: 'existing'
  },
  
  // General buying process content
  '/buying-a-home': {
    newPath: '/resources/guides/buying-process/',
    layout: 'GuideLayout',
    category: 'resources',
    status: 'existing'
  },
  '/do-your-research': {
    newPath: '/resources/guides/buying-process/research/',
    layout: 'GuideLayout',
    category: 'resources',
    status: 'existing'
  },
  '/make-an-offer': {
    newPath: '/resources/guides/buying-process/making-offers/',
    layout: 'GuideLayout',
    category: 'resources',
    status: 'existing'
  },
  '/value-accurately': {
    newPath: '/resources/guides/buying-process/property-valuation/',
    layout: 'GuideLayout',
    category: 'resources',
    status: 'existing'
  },
  
  // Loan education content
  '/questions': {
    newPath: '/resources/guides/loan-process/broker-questions/',
    layout: 'GuideLayout',
    category: 'resources',
    status: 'existing'
  },
  '/declined': {
    newPath: '/resources/guides/loan-process/loan-declined/',
    layout: 'GuideLayout',
    category: 'resources',
    status: 'existing'
  },
  '/preapproval': {
    newPath: '/resources/guides/loan-process/pre-approval/',
    layout: 'GuideLayout',
    category: 'resources',
    status: 'existing'
  },
  '/choice': {
    newPath: '/resources/guides/loan-types/choosing-right-loan/',
    layout: 'GuideLayout',
    category: 'resources',
    status: 'existing'
  },
  
  // Budget and finance basics
  '/know-your-budget': {
    newPath: '/resources/guides/getting-started/budgeting/',
    layout: 'GuideLayout',
    category: 'resources',
    status: 'existing'
  },
  '/what-can-i-afford': {
    newPath: '/resources/guides/getting-started/affordability/',
    layout: 'GuideLayout',
    category: 'resources',
    status: 'existing'
  },
  '/deposit': {
    newPath: '/resources/guides/getting-started/deposit-requirements/',
    layout: 'GuideLayout',
    category: 'resources',
    status: 'existing'
  },
  '/finance-basics': {
    newPath: '/resources/guides/loan-types/finance-basics/',
    layout: 'GuideLayout',
    category: 'resources',
    status: 'existing'
  },
  
  // Loan type guides
  '/home-equity-loan': {
    newPath: '/resources/guides/loan-types/home-equity/',
    layout: 'GuideLayout',
    category: 'resources',
    status: 'existing'
  },
  '/basic-home-loan': {
    newPath: '/resources/guides/loan-types/basic-home-loan/',
    layout: 'GuideLayout',
    category: 'resources',
    status: 'existing'
  },
  '/line-of-credit': {
    newPath: '/resources/guides/loan-types/line-of-credit/',
    layout: 'GuideLayout',
    category: 'resources',
    status: 'existing'
  },
  
  // Company pages
  '/resources': {
    newPath: '/resources/',
    layout: 'GenericPageLayout',
    category: 'company',
    status: 'existing'
  },
  '/refer-a-friend': {
    newPath: '/refer-a-friend/',
    layout: 'GenericPageLayout',
    category: 'company',
    status: 'existing'
  },
  '/sitemap': {
    newPath: '/sitemap/',
    layout: 'GenericPageLayout',
    category: 'company',
    status: 'existing'
  }
};

// Results tracking
const results = {
  categorized: [],
  manual_review: [],
  aspirational: [],
  total: 0
};

/**
 * Clean HTML content from WordPress export
 */
function cleanHtmlContent(htmlContent) {
  if (!htmlContent) return '';
  
  return htmlContent
    // Fix HTML entities
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    // Remove WordPress shortcodes
    .replace(/\[\/?\w+[^\]]*\]/g, '')
    // Clean up extra whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extract suburb name from mortgage broker URL
 */
function extractSuburb(url) {
  const match = url.match(/\/mortgage-broker-(.+)/);
  return match ? match[1] : 'unknown';
}

/**
 * Categorize page based on URL patterns
 */
function categorizePage(pageData) {
  const url = pageData.data.url;
  
  // Check exact matches first
  for (const [pattern, config] of Object.entries(urlPatterns)) {
    if (url === pattern) {
      // Handle skip pages
      if (config.category === 'skip') {
        return { category: 'skip', originalUrl: url };
      }
      return { ...config, matchType: 'exact', originalUrl: url };
    }
  }
  
  // Check pattern matches
  for (const [pattern, config] of Object.entries(urlPatterns)) {
    if (pattern.endsWith('-') && url.startsWith(pattern)) {
      // Special handling for mortgage broker pages
      if (pattern === '/mortgage-broker-') {
        const suburb = extractSuburb(url);
        return {
          ...config,
          newPath: config.newPath.replace('{suburb}', suburb),
          matchType: 'pattern',
          originalUrl: url,
          suburb: suburb
        };
      }
      return { ...config, matchType: 'pattern', originalUrl: url };
    }
  }
  
  // Check partial matches for calculators
  if (url.includes('calculator')) {
    return {
      newPath: `/calculators/${url.replace('/', '').replace('-', '-')}/`,
      layout: 'CalculatorLayout',
      category: 'calculators',
      status: 'existing',
      matchType: 'partial',
      originalUrl: url
    };
  }
  
  // Hub pages need manual review
  if (url.startsWith('/hub/')) {
    return {
      category: 'manual_review',
      reason: 'Hub page - needs content analysis',
      originalUrl: url,
      suggestedPath: '/resources/guides/buying-process/',
      layout: 'GuideLayout'
    };
  }
  
  // Blog-style content
  if (url.includes('review') || url.includes('guide') || url.includes('tips')) {
    return {
      category: 'manual_review',
      reason: 'Blog/educational content - needs categorization',
      originalUrl: url,
      suggestedPath: '/resources/blog/',
      layout: 'BlogPostLayout'
    };
  }
  
  // Default to manual review
  return {
    category: 'manual_review',
    reason: 'No pattern match found',
    originalUrl: url,
    suggestedPath: '/resources/',
    layout: 'GenericPageLayout'
  };
}

/**
 * Generate Astro frontmatter
 */
function generateFrontmatter(pageData, categorization) {
  const frontmatter = {
    layout: `../../layouts/${categorization.layout}.astro`,
    title: pageData.data.title,
    description: pageData.data.description,
    publishDate: pageData.data.publishedDate,
    lastModified: pageData.data.lastModified,
    wordpressId: pageData.data.wordpressId,
    wordpressSlug: pageData.data.wordpressSlug,
    originalUrl: pageData.data.url,
    newUrl: categorization.newPath,
    status: categorization.status || 'existing',
    category: categorization.category
  };
  
  // Add suburb info for mortgage broker pages
  if (categorization.suburb) {
    frontmatter.suburb = categorization.suburb;
    frontmatter.location = {
      country: 'australia',
      state: 'qld',
      city: 'brisbane',
      suburb: categorization.suburb
    };
  }
  
  return frontmatter;
}

/**
 * Generate Astro page content
 */
function generatePageContent(pageData, categorization) {
  const frontmatter = generateFrontmatter(pageData, categorization);
  
  // Extract content from blocks
  let content = '';
  if (pageData.blocks && pageData.blocks.length > 0) {
    content = pageData.blocks
      .map(block => {
        if (block.component && block.component.options && block.component.options.text) {
          return cleanHtmlContent(block.component.options.text);
        }
        return '';
      })
      .filter(text => text.length > 0)
      .join('\n\n');
  }
  
  const yamlFrontmatter = Object.entries(frontmatter)
    .map(([key, value]) => {
      if (typeof value === 'object') {
        return `${key}:\n${Object.entries(value).map(([k, v]) => `  ${k}: "${v}"`).join('\n')}`;
      }
      return `${key}: "${value}"`;
    })
    .join('\n');
  
  return `---\n${yamlFrontmatter}\n---\n\n${content || '<!-- Content needs manual review -->'}\n`;
}

/**
 * Main processing function
 */
function processWordPressExport() {
  console.log(`🚀 Processing ${wordpressData.length} WordPress pages...\n`);
  
  results.total = wordpressData.length;
  
  wordpressData.forEach((page, index) => {
    const categorization = categorizePage(page);
    
    if (categorization.category === 'skip') {
      // Skip test pages and other unwanted content
      console.log(`⏭️  Skipping: ${page.data.url}`);
    } else if (categorization.category === 'manual_review') {
      results.manual_review.push({
        name: page.name,
        url: page.data.url,
        reason: categorization.reason,
        suggestedPath: categorization.suggestedPath,
        layout: categorization.layout
      });
    } else {
      results.categorized.push({
        name: page.name,
        originalUrl: page.data.url,
        newPath: categorization.newPath,
        layout: categorization.layout,
        category: categorization.category,
        matchType: categorization.matchType,
        status: categorization.status
      });
      
      // TODO: Generate actual .astro files (next step)
      // const pageContent = generatePageContent(page, categorization);
      // writePageFile(categorization.newPath, pageContent);
    }
    
    // Progress indicator
    if ((index + 1) % 50 === 0) {
      console.log(`📄 Processed ${index + 1}/${results.total} pages...`);
    }
  });
  
  // Generate reports
  generateReports();
}

/**
 * Generate migration reports
 */
function generateReports() {
  console.log('\n📊 Migration Analysis Complete!\n');
  
  // Summary stats
  console.log('='.repeat(50));
  console.log(`Total Pages: ${results.total}`);
  console.log(`Auto-Categorized: ${results.categorized.length}`);
  console.log(`Manual Review Needed: ${results.manual_review.length}`);
  console.log(`Success Rate: ${Math.round((results.categorized.length / results.total) * 100)}%`);
  console.log('='.repeat(50));
  
  // Category breakdown
  const categoryStats = {};
  results.categorized.forEach(page => {
    categoryStats[page.category] = (categoryStats[page.category] || 0) + 1;
  });
  
  console.log('\n📈 Auto-Categorized Breakdown:');
  Object.entries(categoryStats).forEach(([category, count]) => {
    console.log(`  ${category}: ${count} pages`);
  });
  
  // Manual review list
  console.log('\n⚠️  Manual Review Required:');
  results.manual_review.slice(0, 10).forEach(page => {
    console.log(`  • ${page.url} - ${page.reason}`);
  });
  
  if (results.manual_review.length > 10) {
    console.log(`  ... and ${results.manual_review.length - 10} more`);
  }
  
  // Write detailed reports to files
  fs.writeFileSync(path.join(__dirname, '../migration-results-categorized.json'), JSON.stringify(results.categorized, null, 2));
  fs.writeFileSync(path.join(__dirname, '../migration-results-manual-review.json'), JSON.stringify(results.manual_review, null, 2));
  
  console.log('\n✅ Reports saved:');
  console.log('  - migration-results-categorized.json');
  console.log('  - migration-results-manual-review.json');
  console.log('\n🎯 Next: Review manual categorization list and run file generation');
}

// Run the migration analysis 
processWordPressExport();

export { processWordPressExport, categorizePage, cleanHtmlContent };