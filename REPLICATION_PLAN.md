# Hunter Galloway Homepage Replication Plan

## Overview
Create an exact pixel-perfect replica of huntergalloway.com.au homepage in Astro using the complete WordPress theme assets from `/hg-new-site/hunter-galloway/`.

## Source Material
- **PHP Template**: `/hg-new-site/hunter-galloway/front-page.php`
- **Assets**: `/hg-new-site/hunter-galloway/assets/`
- **Styles**: `/hg-new-site/hunter-galloway/assets/css/`
- **Images**: `/hg-new-site/hunter-galloway/assets/img/`
- **Fonts**: `/hg-new-site/hunter-galloway/assets/fonts/`

## Phase 1: Asset Migration ✅
1. **Copy fonts** from theme to `public/fonts/` - Gotham Pro family
2. **Copy images** from theme to `public/images/` - All hero, award, logo images
3. **Extract CSS styles** from theme's CSS files for exact styling reference

## Phase 2: Component Recreation 
4. **Awards component** - Extract from `template-parts/blocks/awards.php`
5. **Header/Navigation** - From `header.php` with exact styling
6. **Footer** - From `footer.php` with all sections
7. **Calculator components** - From calculators folder (mortgage vs rent, etc.)

## Phase 3: Homepage Sections (from front-page.php)
8. **Hero section** - "Get a home loan with full guidance" with:
   - Checkmark list (97% approval, 30+ banks, #1 rated)
   - "Calculate my borrowing capacity" CTA
   - Hero image (family with cardboard roof)
   - 14 years experience + Google reviews badges

9. **Awards section** - Display award badges from `awards.php`

10. **Loan purpose section** - 4 cards with background images:
    - Buy My First Home (Most Popular badge)
    - Refinance My Loan 
    - Upgrade My Home
    - Invest in Property

11. **Banks section** - 30+ lender logos grid with exact styling

12. **Mortgage vs Rent calculator** - Interactive slider section:
    - "Compare your current rent with your mortgage payment"
    - Slider input $100-$2500
    - Yellow "Calculate" button

13. **Map section** - Brisbane property exploration:
    - "Looking for property in Brisbane?"
    - Features list (prices, transport, schools, green zones)
    - "Explore map" CTA

14. **Why choose us** - Stats section:
    - 97% loan approval rate
    - 14 years of experience  
    - 2,000+ Happy customers
    - 30+ Banks and lenders

## Phase 4: Styling & Polish
15. **Extract exact colors** from `style.css`:
    - Primary yellow: #EC9B16
    - Black text: #000000
    - Background grays: #f4f4f4

16. **Match typography** - Gotham Pro fonts from assets
17. **Responsive design** - Mobile/desktop breakpoints from CSS
18. **Interactive elements** - Hover states, animations, tooltips

## Phase 5: Deploy
19. **Test build locally** - Ensure no errors
20. **Deploy to Netlify** - Push to GitHub for auto-deploy

## Key Files to Replicate
- `front-page.php` → `src/pages/index.astro`
- `template-parts/blocks/awards.php` → `src/components/Awards.astro`
- `assets/css/pages/front-page.css` → Tailwind classes
- `assets/img/img_new/` → `public/images/`

## Success Criteria
- Exact visual match to huntergalloway.com.au
- All sections present and functional
- Correct colors, fonts, spacing
- Responsive design working
- All images displaying correctly
- Interactive elements functional

---

## Progress Tracking
- [ ] Phase 1: Asset Migration
- [ ] Phase 2: Component Recreation  
- [ ] Phase 3: Homepage Sections
- [ ] Phase 4: Styling & Polish
- [ ] Phase 5: Deploy

Last Updated: 2025-07-30