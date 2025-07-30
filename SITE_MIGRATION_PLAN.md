# Hunter Galloway Complete Site Migration Plan

## Overview
Migrate the entire huntergalloway.com.au WordPress site to Astro while preserving:
- ✅ URL structure (exact same paths)
- ✅ SEO metadata (titles, descriptions, images)
- ✅ Image assets and optimization
- ✅ Content structure and formatting
- ✅ Search engine rankings

## Site Structure Analysis

### 1. Pages (from page-sitemap.xml)
**~150 pages categorized as:**

#### A. Location-Based Pages (60+ pages)
- **Pattern**: `/mortgage-broker-{suburb}/`
- **Layout**: `LoanLandingLayout.astro`
- **Examples**: 
  - `/mortgage-broker-paddington/`
  - `/mortgage-broker-milton/`
  - `/mortgage-broker-kelvin-grove/`
  - `/mortgage-broker-toowong/`

#### B. Loan Type Pages (15+ pages)
- **Pattern**: `/{loan-type}/`
- **Layout**: `LoanLandingLayout.astro`
- **Examples**:
  - `/first-home-buyer-loans/`
  - `/refinance-home-loan/`
  - `/home-loans-for-doctors/`
  - `/nurse-home-loan/`
  - `/guarantor-home-loan/`

#### C. Long-Form Guides (10+ pages)
- **Pattern**: `/{guide-name}/`
- **Layout**: `GuideLayout.astro`
- **Examples**:
  - `/get-a-stress-free-first-home-loan/`
  - `/your-property-investment-journey/`
  - `/ready-to-upgrade/`
  - `/lower-your-rate/`

#### D. Calculators & Tools (8+ pages)
- **Pattern**: `/{tool-name}/`
- **Layout**: `CalculatorLayout.astro`
- **Examples**:
  - `/mortgage-calculator/`
  - `/mortgage-vs-rent-calculator/`
  - `/borrowing-power/`
  - `/stamp-duty-calculator/`

#### E. Hub/Educational Content (30+ pages)
- **Pattern**: `/hub/{topic}/`
- **Layout**: `GuideLayout.astro`
- **Examples**:
  - `/hub/know-your-budget/`
  - `/hub/do-your-research/`
  - `/hub/make-an-offer/`

#### F. Generic Pages (10+ pages)
- **Layout**: `GenericPageLayout.astro`
- **Examples**:
  - `/contact/`
  - `/about/`
  - `/our-team/`
  - `/resources/`

### 2. Blog Posts (from post-sitemap.xml)
**~100+ blog posts categorized as:**

#### A. Educational Content (50+ posts)
- **Layout**: `BlogPostLayout.astro`
- **Categories**: First home buyers, loan types, financial advice
- **Examples**:
  - `/first-home-buyer-myths/`
  - `/lmi-calculator/`
  - `/home-loan-process/`

#### B. Bank/Lender Reviews (20+ posts)
- **Layout**: `BlogPostLayout.astro`
- **Pattern**: `/{bank-name}-home-loan-review/`

#### C. Calculators & Tools (10+ posts)
- **Layout**: Mix of `BlogPostLayout.astro` and `CalculatorLayout.astro`

## Migration Strategy

### Phase 1: Infrastructure Setup ✅
- [x] Homepage replicated exactly
- [x] 6 layout templates created
- [x] Component library established
- [x] Asset pipeline working

### Phase 2: Automated Content Migration
#### A. Generate Page Files from WordPress Export
```bash
# Create migration script
node scripts/migrate-wordpress-content.js
```

**Script will:**
1. Parse `wordpress-export.json`
2. Generate `.astro` files for each page/post
3. Assign appropriate layout based on URL patterns
4. Extract and clean HTML content
5. Set proper frontmatter (title, description, slug, etc.)

#### B. URL Pattern Mapping
```javascript
const layoutMapping = {
  '/mortgage-broker-*': 'LoanLandingLayout',
  '/hub/*': 'GuideLayout', 
  '/*-calculator*': 'CalculatorLayout',
  '/first-home-buyer-loans': 'LoanLandingLayout',
  '/refinance-home-loan': 'LoanLandingLayout',
  '/get-a-stress-free-*': 'GuideLayout',
  '/your-property-*': 'GuideLayout',
  // Blog posts
  '/blog/*': 'BlogPostLayout',
  // Generic pages
  '/contact': 'GenericPageLayout',
  '/about': 'GenericPageLayout'
};
```

### Phase 3: Asset Migration
#### A. Image Migration Strategy
1. **Extract from WordPress**: All images referenced in content
2. **Optimize**: Convert to WebP/AVIF with multiple sizes
3. **CDN Setup**: Use Astro's image optimization
4. **Fallbacks**: Keep original formats for compatibility

#### B. SEO Asset Migration
1. **Meta Descriptions**: Extract from WordPress export
2. **Open Graph Images**: Download and optimize featured images
3. **Schema Markup**: Convert WordPress JSON-LD to Astro components
4. **Breadcrumbs**: Generate based on URL structure

### Phase 4: Content Processing
#### A. HTML Cleaning (Already Implemented)
- ✅ Fix malformed entities
- ✅ Clean WordPress shortcodes  
- ✅ Convert to valid HTML5

#### B. Link Processing
- Convert internal WordPress links to Astro routes
- Update image paths to new asset structure
- Fix relative/absolute URL inconsistencies

### Phase 5: SEO Preservation
#### A. URL Redirects
- Generate `_redirects` file for Netlify
- Map any changed URLs to new structure
- Handle WordPress query parameters

#### B. Sitemap Generation
- Use Astro's sitemap plugin
- Match original sitemap structure
- Include proper lastmod dates

## Implementation Scripts Needed

### 1. Content Migration Script
```javascript
// scripts/migrate-wordpress-content.js
const fs = require('fs');
const path = require('path');

const wordpressData = require('../wordpress-export.json');

// Process each page/post and generate .astro files
// Assign layouts based on URL patterns
// Clean HTML content
// Extract metadata
```

### 2. Image Migration Script  
```javascript
// scripts/migrate-images.js
// Download all referenced images
// Optimize and convert formats
// Update image references in content
```

### 3. SEO Migration Script
```javascript
// scripts/migrate-seo.js  
// Extract meta descriptions
// Generate Open Graph data
// Convert schema markup
```

## Quality Assurance

### 1. Pre-Launch Checklist
- [ ] All URLs from sitemap accessible (200 status)
- [ ] Meta descriptions preserved
- [ ] Images loading correctly
- [ ] Internal links working
- [ ] Forms functional
- [ ] Performance benchmarks met

### 2. SEO Validation
- [ ] Google Search Console validation
- [ ] Sitemap submission
- [ ] Core Web Vitals testing
- [ ] Mobile-friendly testing

### 3. Content Validation
- [ ] Visual comparison with original pages
- [ ] Form submissions working
- [ ] Calculator functionality
- [ ] Lead generation flows

## Timeline Estimate

1. **Scripts Development**: 1-2 days
2. **Content Migration**: 1 day (automated)
3. **Asset Migration**: 1 day
4. **Testing & QA**: 1-2 days
5. **SEO Validation**: 1 day

**Total**: 5-7 days for complete migration

## Risk Mitigation

1. **Backup Strategy**: Keep original WordPress export
2. **Rollback Plan**: DNS can point back to WordPress
3. **Gradual Migration**: Test with subset of pages first
4. **Performance Monitoring**: Set up before launch

## Success Metrics

- **Performance**: >90 Lighthouse scores
- **SEO**: Maintain current search rankings
- **Functionality**: All forms/calculators working
- **Content**: 100% of pages migrated successfully

---

**Next Steps**: 
1. Create migration scripts
2. Test with 10-20 sample pages
3. Full content migration
4. Deploy and validate