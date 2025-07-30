# Hunter Galloway Layout Templates Plan

Based on analysis of the WordPress PHP templates, here are the 6 core layouts needed:

## 1. HomeLayout.astro ✅ (Already exists as index.astro)
**Source**: `front-page.php`
**Usage**: Homepage only
**Features**: Hero, awards, loan purpose cards, banks, calculator, map, stats

## 2. BlogPostLayout.astro
**Source**: `single.php`, `post-single-1.php`
**Usage**: `/blog/*` posts
**Features**: Article layout with breadcrumbs, meta, and content

## 3. GuideLayout.astro (Long-form Hub)
**Source**: `page-get-a-stress-free-first-home-loan.php`, `page-your-property-investment-journey.php`
**Usage**: `/resources/*`, `/loans/first-home/`
**Features**: Hero section, detailed content sections, lead forms, testimonials

## 4. CalculatorLayout.astro
**Source**: `page-mortgage-calculator.php`, `page-mortgage-vs-rent-calculator.php`, `calculate-*.php`
**Usage**: `/stamp-duty-calculator-queensland/`, `/mortgage-calculator/`
**Features**: Calculator React component, explanatory content below

## 5. LoanLandingLayout.astro
**Source**: `page-first-home-buyer-loans.php`, `page-refinance-home-loan.php`, `nurse-home-loan.php`, `home-loans-for-doctors.php`
**Usage**: `/home-loans/*`
**Features**: Hero with benefits, feature grid, lead form, social proof

## 6. GenericPageLayout.astro
**Source**: `page-contact.php`, `page-ourteam.php`, `page-whatwedo.php`
**Usage**: `/contact`, `/about-us`, `/team`
**Features**: Simple content wrapper with optional forms

## Key Components to Extract:
- `LeadForm.astro` (from `blocks/assessment-form.php`)
- `TrustBadges.astro` (from `blocks/badges.php`)
- `Rating.astro` (from `blocks/rating.php`)
- `CalculateCapacity.tsx` (from `template-parts/calculators/calculate-capacity.php`)

## Implementation Order:
1. Extract reusable components from blocks/
2. Create the 6 layout templates
3. Convert existing WordPress pages to use appropriate layouts
4. Test and refine

## File Mapping:
### Blog Posts → BlogPostLayout
- All posts in `/blog/`

### Guides → GuideLayout
- `/get-a-stress-free-first-home-loan/`
- `/your-property-investment-journey/`
- `/ready-to-upgrade/`
- `/lower-your-rate/`

### Calculators → CalculatorLayout
- `/mortgage-calculator/`
- `/mortgage-vs-rent-calculator/`
- `/stamp-duty-calculator-queensland/`

### Loan Landing Pages → LoanLandingLayout
- `/first-home-buyer-loans/`
- `/refinance-home-loan/`
- `/home-loans-for-doctors/`
- `/nurse-home-loan/`
- `/investment-loans-queensland/`
- `/guarantor-home-loan/`

### Generic Pages → GenericPageLayout
- `/contact/`
- `/about/`
- `/our-team/`
- `/resources/`

This structure will handle all ~65 PHP files with just 6 reusable templates plus components.