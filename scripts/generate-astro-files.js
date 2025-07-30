#!/usr/bin/env node

/**
 * Generate Astro files from categorized WordPress content
 * 
 * Creates actual .md files in content collections from migration results
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load categorized migration results
const categorizedResults = JSON.parse(fs.readFileSync(path.join(__dirname, '../migration-results-categorized.json'), 'utf8'));
const wordpressData = JSON.parse(fs.readFileSync(path.join(__dirname, '../wordpress-export.json'), 'utf8'));

// Create a lookup map for WordPress content
const contentMap = new Map();
wordpressData.forEach(page => {
  contentMap.set(page.data.url, page);
});

/**
 * Clean HTML content and convert to Markdown-like format
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
    .replace(/&#038;/g, '&')
    // Remove WordPress shortcodes
    .replace(/\[\/?[\w\s="'-]*\]/g, '')
    // Clean up extra whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extract content from WordPress page data
 */
function extractContent(wordpressPage) {
  let content = '';
  
  if (wordpressPage.blocks && wordpressPage.blocks.length > 0) {
    content = wordpressPage.blocks
      .map(block => {
        if (block.component && block.component.options && block.component.options.text) {
          return cleanHtmlContent(block.component.options.text);
        }
        return '';
      })
      .filter(text => text.length > 0)
      .join('\n\n');
  }
  
  return content || '<!-- Content needs to be added from WordPress -->';
}

/**
 * Generate frontmatter for different content types
 */
function generateFrontmatter(categorizedPage, wordpressPage) {
  const baseData = {
    title: wordpressPage.data.title || categorizedPage.name,
    description: wordpressPage.data.description || '',
    originalUrl: categorizedPage.originalUrl,
    publishDate: wordpressPage.data.publishedDate || new Date().toISOString(),
    lastModified: wordpressPage.data.lastModified || null,
    wordpressId: wordpressPage.data.wordpressId ? parseInt(wordpressPage.data.wordpressId) : null,
  };

  // Category-specific frontmatter
  switch (categorizedPage.category) {
    case 'mortgage-brokers':
      const suburb = categorizedPage.newPath.split('/').pop().replace('/', '');
      return {
        ...baseData,
        suburb: suburb,
        location: {
          country: 'australia',
          state: 'qld', 
          city: 'brisbane',
          suburb: suburb
        },
        isMoneyPage: categorizedPage.originalUrl === '/mortgage-broker-brisbane',
        priority: categorizedPage.originalUrl === '/mortgage-broker-brisbane' ? 'TOP_MONEY_PAGE' : 'medium'
      };

    case 'home-loans':
      let serviceType = 'specialty';
      if (categorizedPage.newPath.includes('first-home-buyers')) serviceType = 'first-home-buyers';
      else if (categorizedPage.newPath.includes('refinancing')) serviceType = 'refinancing';
      else if (categorizedPage.newPath.includes('investment-properties')) serviceType = 'investment-properties';
      else if (categorizedPage.newPath.includes('upgrading')) serviceType = 'upgrading';
      else if (categorizedPage.newPath.includes('professionals')) serviceType = 'professionals';
      
      return {
        ...baseData,
        serviceType,
        profession: categorizedPage.newPath.includes('doctors') ? 'doctors' : 
                   categorizedPage.newPath.includes('nurses') ? 'nurses' :
                   categorizedPage.newPath.includes('teachers') ? 'teachers' : null
      };

    case 'resources':
      let category = 'guides';
      if (categorizedPage.newPath.includes('/blog/')) category = 'blog';
      else if (categorizedPage.newPath.includes('/tools/')) category = 'tools';
      
      return {
        ...baseData,
        category,
        subcategory: categorizedPage.newPath.split('/').slice(-2, -1)[0] || null,
        featured: false
      };

    case 'calculators':
      let calculatorType = 'mortgage-calculator';
      if (categorizedPage.newPath.includes('borrowing-capacity')) calculatorType = 'borrowing-capacity';
      else if (categorizedPage.newPath.includes('stamp-duty')) calculatorType = 'stamp-duty';
      else if (categorizedPage.newPath.includes('mortgage-vs-rent')) calculatorType = 'mortgage-vs-rent';
      
      return {
        ...baseData,
        calculatorType,
        interactive: true
      };

    case 'best-suburbs':
      return {
        ...baseData,
        location: {
          country: 'australia',
          state: 'queensland',
          city: categorizedPage.newPath.includes('brisbane') ? 'brisbane' : null
        },
        contentType: categorizedPage.newPath.includes('hot-spots') ? 'hotspots' : 'lifestyle-guide'
      };

    case 'company':
      let pageType = 'about';
      if (categorizedPage.newPath.includes('contact')) pageType = 'contact';
      else if (categorizedPage.newPath.includes('legal')) pageType = 'legal';
      else if (categorizedPage.newPath.includes('thank-you')) pageType = 'thank-you';
      else if (categorizedPage.newPath.includes('referral')) pageType = 'referral';
      
      return {
        ...baseData,
        pageType
      };

    default:
      return baseData;
  }
}

/**
 * Generate file path from new URL path
 */
function generateFilePath(newPath, category) {
  // Remove leading/trailing slashes and convert to file path
  const cleanPath = newPath.replace(/^\/|\/$/g, '');
  const pathParts = cleanPath.split('/');
  
  // Map category to content collection directory
  const categoryMap = {
    'mortgage-brokers': 'mortgage-brokers',
    'home-loans': 'home-loans', 
    'resources': 'resources',
    'calculators': 'calculators',
    'best-suburbs': 'best-suburbs',
    'company': 'company'
  };
  
  const collectionDir = categoryMap[category];
  
  // Remove the collection name from path if it's duplicated
  const filteredParts = pathParts.filter(part => part !== collectionDir);
  
  // Create nested directory structure
  const fileName = filteredParts.pop() || 'index';
  const directories = filteredParts;
  
  return {
    directories: directories.length ? directories.join('/') : '',
    fileName: `${fileName}.md`
  };
}

/**
 * Create markdown file content
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
      if (typeof value === 'boolean' || typeof value === 'number') {
        return `${key}: ${value}`;
      }
      // Escape quotes in string values
      const escapedValue = value.replace(/"/g, '\\"');
      return `${key}: "${escapedValue}"`;
    })
    .filter(line => line !== null)
    .join('\n');
  
  return `---\n${yamlFrontmatter}\n---\n\n${content}\n`;
}

/**
 * Ensure directory exists
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Main file generation function
 */
function generateAstroFiles() {
  console.log(`🚀 Generating Astro files from ${categorizedResults.length} categorized pages...\n`);
  
  const stats = {
    created: 0,
    errors: 0,
    categories: {}
  };
  
  categorizedResults.forEach((categorizedPage, index) => {
    try {
      // Get WordPress content
      const wordpressPage = contentMap.get(categorizedPage.originalUrl);
      if (!wordpressPage) {
        console.log(`⚠️  No WordPress content found for: ${categorizedPage.originalUrl}`);
        stats.errors++;
        return;
      }
      
      // Generate frontmatter and content
      const frontmatter = generateFrontmatter(categorizedPage, wordpressPage);
      const content = extractContent(wordpressPage);
      
      // Generate file path
      const { directories, fileName } = generateFilePath(categorizedPage.newPath, categorizedPage.category);
      
      // Create full directory path
      const collectionDir = path.join(__dirname, '../src/content', categorizedPage.category);
      const fullDirPath = directories ? path.join(collectionDir, directories) : collectionDir;
      const fullFilePath = path.join(fullDirPath, fileName);
      
      // Ensure directory exists
      ensureDirectoryExists(fullDirPath);
      
      // Create markdown content
      const markdownContent = createMarkdownContent(frontmatter, content);
      
      // Write file
      fs.writeFileSync(fullFilePath, markdownContent, 'utf8');
      
      // Update stats
      stats.created++;
      stats.categories[categorizedPage.category] = (stats.categories[categorizedPage.category] || 0) + 1;
      
      // Progress indicator
      if ((index + 1) % 10 === 0) {
        console.log(`📄 Generated ${index + 1}/${categorizedResults.length} files...`);
      }
      
    } catch (error) {
      console.error(`❌ Error generating file for ${categorizedPage.originalUrl}:`, error.message);
      stats.errors++;
    }
  });
  
  // Final report
  console.log('\n📊 File Generation Complete!\n');
  console.log('='.repeat(50));
  console.log(`Total Files Created: ${stats.created}`);
  console.log(`Errors: ${stats.errors}`);
  console.log('='.repeat(50));
  
  console.log('\n📈 Files by Category:');
  Object.entries(stats.categories).forEach(([category, count]) => {
    console.log(`  ${category}: ${count} files`);
  });
  
  console.log('\n✅ All Astro content files have been generated!');
  console.log('📁 Files are organized in: src/content/[collection]/');
}

// Run the file generation
generateAstroFiles();