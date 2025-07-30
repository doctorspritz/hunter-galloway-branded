# Hunter Galloway Site Semantic Restructure Plan

## Current Issues with URL Structure

### Problems:
1. **Inconsistent naming**: `/first-home-buyer-loans` vs `/get-a-stress-free-first-home-loan`
2. **Keyword stuffing**: 60+ `/mortgage-broker-{suburb}` pages (SEO over-optimization)
3. **Poor information architecture**: Related content scattered across different URL patterns
4. **User navigation confusion**: Hard to find related services
5. **Maintenance burden**: 412 individual pages to manage

## Proposed Semantic Structure

### 1. Services-First Architecture
```
/services/
  ├── first-home-buyers/           (Guide + Landing)
  ├── refinancing/                 (Guide + Landing) 
  ├── investment-properties/       (Guide + Landing)
  ├── upgrading/                   (Guide + Landing)
  ├── doctors-nurses/              (Profession-specific)
  ├── guarantor-loans/             (Specialty service)
  └── commercial/                  (Business loans)
```

### 2. Tools & Calculators Hub
```
/tools/
  ├── mortgage-calculator/
  ├── borrowing-capacity/
  ├── stamp-duty-calculator/
  ├── mortgage-vs-rent/
  ├── repayment-calculator/
  └── affordability-checker/
```

### 3. Educational Content Hub
```
/guides/
  ├── buying-process/              (Step-by-step guides)
  │   ├── getting-started/
  │   ├── pre-approval/
  │   ├── house-hunting/
  │   ├── making-offers/
  │   └── settlement/
  ├── loan-types/                  (Educational content)
  ├── market-insights/             (Market data, trends)
  └── faqs/                        (Common questions)
```

### 4. Location-Based Content (Consolidated)
```
/locations/
  ├── brisbane/                    (Main hub)
  │   ├── north/                   (Regional grouping)
  │   ├── south/
  │   ├── east/
  │   ├── west/
  │   └── cbd/
  ├── gold-coast/                  (Future expansion)
  ├── sunshine-coast/
  └── perth/                       (Already mentioned in export)
```

### 5. Company Information
```
/about/
  ├── our-team/
  ├── awards/
  ├── careers/
  └── contact/

/resources/
  ├── blog/                        (All blog posts)
  ├── case-studies/
  ├── downloads/
  └── suburb-reports/
```

## Detailed Restructure Proposal

### Current → New URL Mapping

#### A. Loan Services (Consolidate 15+ scattered pages)
```
CURRENT                              → NEW
/first-home-buyer-loans             → /services/first-home-buyers/
/get-a-stress-free-first-home-loan  → /services/first-home-buyers/getting-started/
/refinance-home-loan                → /services/refinancing/
/lower-your-rate                    → /services/refinancing/lower-rates/
/home-loans-for-doctors             → /services/doctors-nurses/
/nurse-home-loan                    → /services/doctors-nurses/nurses/
/guarantor-home-loan                → /services/guarantor-loans/
/investment-loans-queensland        → /services/investment-properties/
/your-property-investment-journey   → /services/investment-properties/getting-started/
/ready-to-upgrade                   → /services/upgrading/
```

#### B. Location Pages (Consolidate 60+ individual pages)
```
CURRENT                              → NEW
/mortgage-broker-paddington         → /locations/brisbane/west/paddington/
/mortgage-broker-milton             → /locations/brisbane/west/milton/
/mortgage-broker-kelvin-grove       → /locations/brisbane/west/kelvin-grove/
/mortgage-broker-toowong            → /locations/brisbane/west/toowong/
/mortgage-broker-bracken-ridge      → /locations/brisbane/north/bracken-ridge/
/mortgage-broker-aspley             → /locations/brisbane/north/aspley/
```

#### C. Tools & Calculators (Clean organization)
```
CURRENT                              → NEW
/mortgage-calculator                → /tools/mortgage-calculator/
/mortgage-vs-rent-calculator        → /tools/mortgage-vs-rent/
/borrowing-power                    → /tools/borrowing-capacity/
/stamp-duty-calculator              → /tools/stamp-duty-calculator/
```

#### D. Educational Content
```
CURRENT                              → NEW
/hub/*                              → /guides/buying-process/*
/first-home-buyer-myths             → /guides/first-home-buyers/myths/
/lmi-calculator                     → /guides/loan-types/lmi-explained/
/home-loan-process                  → /guides/buying-process/loan-process/
```

## Benefits of Restructure

### 1. SEO Advantages
- **Topic clustering**: Related content grouped together
- **Reduced keyword cannibalization**: No more 60+ pages competing for "mortgage broker Brisbane"
- **Better internal linking**: Logical hierarchy for link equity
- **Featured snippets**: Better chance with organized FAQ/guide structure

### 2. User Experience
- **Intuitive navigation**: Users find related services easily
- **Reduced decision paralysis**: Clear service categories vs 60+ suburb pages
- **Better conversion paths**: Guide users from education → service → contact

### 3. Maintenance Benefits
- **Easier content management**: Logical folder structure
- **Template reuse**: Fewer unique page types needed
- **Scalability**: Easy to add new locations/services

### 4. Business Benefits
- **Lead quality**: Users self-qualify through service categories
- **Market expansion**: Easy to add new cities/regions
- **Content strategy**: Clear content gaps and opportunities

## Implementation Strategy

### Option A: Full Restructure (Recommended)
**Pros**: Clean slate, optimal SEO, better UX
**Cons**: Requires 301 redirects, temporary SEO impact
**Timeline**: 2-3 weeks
**Risk**: Medium (but manageable with proper redirects)

### Option B: Gradual Migration
**Pros**: Lower risk, maintain current SEO
**Cons**: Inconsistent structure during transition
**Timeline**: 2-3 months
**Risk**: Low

### Option C: Hybrid Approach
**Pros**: Keep high-performing pages, restructure the rest
**Cons**: Still somewhat inconsistent
**Timeline**: 1-2 weeks
**Risk**: Low-Medium

## Recommended Approach: Option A (Full Restructure)

### Why Full Restructure?
1. **Current structure is already problematic** (60+ competing suburb pages)
2. **Migration is the perfect time** - we're already changing everything
3. **Long-term benefits outweigh short-term SEO risk**
4. **Proper 301 redirects minimize SEO impact**

### Implementation Plan:
1. **Create new semantic structure** in Astro
2. **Generate comprehensive 301 redirect map**
3. **Migrate content to new URLs**
4. **Set up monitoring** for traffic/rankings
5. **Update internal links** and sitemaps

## Questions for Decision:

1. **Are you comfortable with temporary SEO impact** (~2-4 weeks) for long-term benefits?
2. **Which current pages drive the most traffic/conversions?** (we should prioritize these)
3. **Are there any specific URL patterns you want to preserve?**
4. **Do you have Google Analytics data** to understand current page performance?

---

**My Recommendation**: Do the full restructure now during migration. It's the best time to fix these structural issues, and the long-term benefits far outweigh the short-term risks.