# Hunter Galloway Comprehensive Site Structure

## Current Content Analysis

### Top-Level Navigation (Primary Services)
- Homepage
- Home Loans 
- Calculators
- Resources
- Contact
- About Us

### Content Archetypes Identified
1. **Service Pages** (loan types, professional categories)
2. **Educational Guides** (buying process, loan education)
3. **Location-Based Content** (property markets, mortgage brokers)
4. **Tools & Calculators** (interactive tools)
5. **Market Intelligence** (best suburbs, market data)
6. **Editorial Content** (blog posts, reviews, grants/schemes)

## Proposed Semantic Structure

### 1. Top-Level Navigation (User Intent-Based)
```
/                           # Homepage
/home-loans/               # Service hub (replaces scattered loan pages)
/calculators/              # Tools hub
/resources/                # Educational content hub
/locations/                # Geographic content hub
/about/                    # Company info
/contact/                  # Contact/assessment
```

### 2. Service Pages - `/home-loans/` (Business-First)
```
/home-loans/
├── first-home-buyers/          # Primary service
│   ├── getting-started/        # Guide
│   ├── grants-and-schemes/     # Government programs
│   └── case-studies/           # Success stories
├── refinancing/                # Primary service
│   ├── when-to-refinance/      # Guide
│   ├── rate-comparison/        # Tools
│   └── savings-calculator/     # Interactive
├── investment-properties/      # Primary service
│   ├── getting-started/
│   ├── tax-benefits/
│   └── portfolio-loans/
├── upgrading/                  # Moving up
├── professionals/              # Professional categories
│   ├── doctors/
│   ├── nurses/
│   ├── teachers/
│   ├── lawyers/
│   └── self-employed/
└── specialty/                  # Specialty loans
    ├── guarantor-loans/
    ├── low-deposit/
    └── construction/
```

### 3. Tools Hub - `/calculators/` (Functionality-First)
```
/calculators/
├── borrowing-capacity/         # Primary tool
├── mortgage-repayments/        # Primary tool  
├── stamp-duty/                # State-specific
├── mortgage-vs-rent/          # Comparison
├── refinancing-savings/       # Service-specific
├── deposit-calculator/        # Savings planning
└── affordability/             # Income analysis
```

### 4. Educational Hub - `/resources/` (Learning-First)
```
/resources/
├── guides/                    # Step-by-step education
│   ├── buying-process/        # First-time buyers
│   │   ├── getting-started/
│   │   ├── pre-approval/
│   │   ├── property-search/
│   │   ├── making-offers/
│   │   └── settlement/
│   ├── loan-types/           # Product education
│   │   ├── variable-vs-fixed/
│   │   ├── interest-only/
│   │   └── offset-accounts/
│   └── market-insights/      # Industry knowledge
├── blog/                     # All editorial content
│   ├── bank-reviews/         # Lender analysis
│   ├── grants-schemes/       # Government programs
│   ├── employment-types/     # Profession-specific
│   └── market-updates/       # Industry news
├── case-studies/             # Success stories
├── faqs/                     # Common questions
└── glossary/                 # Mortgage terminology
```

### 5. Property Markets Hub - `/property-markets/` (Market Intelligence)
```
/property-markets/
├── australia/
│   ├── queensland/
│   │   ├── brisbane/
│   │   │   ├── market-overview/      # General market data
│   │   │   ├── price-trends/         # Historical data
│   │   │   ├── growth-forecasts/     # Future predictions
│   │   │   └── investment-hotspots/  # Investment focus
│   │   ├── gold-coast/
│   │   └── sunshine-coast/
│   ├── new-south-wales/
│   │   └── sydney/
│   ├── victoria/
│   │   └── melbourne/
│   └── western-australia/
│       └── perth/
```

### 6. Best Suburbs Hub - `/best-suburbs/` (Lifestyle & Investment Rankings)
```
/best-suburbs/
├── australia/
│   ├── best-states/                  # Future expansion
│   ├── best-cities/                  # Future expansion  
│   └── queensland/
│       ├── brisbane/
│       │   ├── for-families/         # Family-focused rankings
│       │   ├── for-first-home-buyers/ # Affordability focus
│       │   ├── for-investors/        # ROI focus
│       │   ├── for-professionals/    # Commute/lifestyle
│       │   ├── up-and-coming/        # Growth potential
│       │   └── luxury/               # Premium market
│       ├── gold-coast/
│       └── sunshine-coast/
```

### 7. Mortgage Brokers Hub - `/mortgage-brokers/` (Local Service Pages)
```
/mortgage-brokers/
├── brisbane/                         # TOP MONEY PAGE - 1-click from homepage
│   ├── [main Brisbane service page]  # High-converting landing page
│   ├── paddington/                   # Individual suburb pages
│   ├── milton/
│   ├── toowong/  
│   ├── kelvin-grove/
│   └── [60+ other Brisbane suburbs]/
├── australia/                        # Other locations hierarchy
│   ├── queensland/
│   │   ├── gold-coast/
│   │   └── sunshine-coast/
│   ├── new-south-wales/
│   │   └── sydney/
│   ├── victoria/
│   │   └── melbourne/
│   └── western-australia/
│       └── perth/
```

### 6. Company Pages - `/about/`
```
/about/
├── our-story/
├── our-team/
├── awards/
├── careers/
├── media/
└── partnerships/
```

## Content Type Mapping

### Current Content → New Structure
```
BLOG POSTS BY CATEGORY:
• Bank reviews → /resources/blog/bank-reviews/
• Grants/schemes → /resources/blog/grants-schemes/
• Employment types → /resources/blog/employment-types/
• Loan type posts → /resources/blog/loan-types/
• Market updates → /resources/blog/market-updates/

GUIDES & EDUCATION:
• First home buyer guides → /home-loans/first-home-buyers/
• Investment guides → /home-loans/investment-properties/
• Process guides → /resources/guides/buying-process/

LOCATION CONTENT:
• Property market analysis → /locations/australia/property-markets/
• Best suburbs content → /locations/australia/property-markets/{state}/{city}/best-suburbs/
• Mortgage broker pages → /locations/australia/mortgage-brokers/{state}/{city}/{suburb}/

TOOLS & CALCULATORS:
• All calculators → /calculators/{calculator-name}/
• Interactive tools → /calculators/{tool-name}/
```

## SEO & UX Benefits

### 1. Clear Information Architecture
- **Users find related content easily** (all loan types under /home-loans/)
- **Logical content progression** (service → guide → tools → location)
- **Reduced decision paralysis** (clear categorization)

### 2. SEO Topic Clustering
- **Service clusters** around main loan types
- **Location clusters** for local SEO
- **Educational clusters** for informational queries
- **Tool clusters** for functional searches

### 3. Scalability
- **Easy to add new locations** (states → cities → suburbs)
- **Easy to add new services** (new loan types)
- **Easy to add new content types** (guides, tools, etc.)

### 4. Internal Linking Strategy
```
Homepage → Service Pages → Guides → Tools → Locations
Service Pages ↔ Related Guides ↔ Relevant Tools
Location Pages → Local Services → Local Market Data
Blog Posts → Related Services → Relevant Tools
```

## Implementation Priorities

### Phase 1: Core Structure (Week 1)
- Set up main navigation structure
- Migrate high-traffic service pages
- Create location hub foundation

### Phase 2: Content Organization (Week 2)
- Organize blog posts by category
- Create guide section structure
- Set up calculator hub

### Phase 3: Location Content (Week 3)
- Organize suburb broker pages
- Create market intelligence pages
- Set up best suburbs structure

### Phase 4: Enhancement (Week 4)
- Add internal linking
- Create content connections
- SEO optimization

## Questions for Validation

1. **Service Priority**: Which loan types drive most conversions? (prioritize in /home-loans/)
2. **Location Priority**: Which geographic areas are most important? (focus migration effort)
3. **Content Performance**: Which blog categories perform best? (prioritize in /resources/)
4. **User Behavior**: Do people navigate by service or location first? (affects navigation)

This structure provides clear user paths while maintaining SEO value through strategic URL organization and topic clustering.

## TOP MONEY PAGE Treatment

### `/mortgage-broker-brisbane` → `/mortgage-brokers/brisbane/`
**Special Requirements:**
- **1-click from homepage** - Primary CTA and navigation prominence
- **Internal linking priority** - All pages should link to this when relevant
- **Crawl optimization** - High priority in sitemap, internal linking
- **Conversion optimization** - Enhanced layout, testimonials, local proof

### Updated Navigation Structure
```
Primary Navigation:
├── Home Loans          # Service hub
├── Calculators         # Tools hub  
├── Resources           # Educational hub
├── Property Markets    # Market intelligence
├── Best Suburbs        # Lifestyle rankings
├── Mortgage Brokers    # Local services hub
│   └── Brisbane ⭐️     # TOP MONEY PAGE - featured prominently
├── About              # Company info
└── Contact            # Get started
```

### Homepage Internal Linking Strategy
- **Hero CTA** → `/mortgage-brokers/brisbane/` (primary conversion path)
- **Service cards** → Link to relevant services but also Brisbane page
- **Footer** → Brisbane prominently featured in location section
- **Breadcrumbs** → Always show path back to Brisbane page from suburb pages