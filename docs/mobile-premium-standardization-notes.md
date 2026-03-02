# Mobile Premium Standardization — Merge Notes

## Scope
- Shared mobile hero consistency extended through `Hero` component.
- Card-heavy template sections moved to `MobileSnapCarousel` for swipe IA on <=768px.
- Legal pages upgraded to include mobile contents shortcuts + persistent CTA.

## Conflict-prone touch points
1. `src/components/page-template.tsx`
   - New `Hero` props: `cta2Href`, `trustCopy`.
2. `src/components/solution-template.tsx`
   - Hero now composed through shared `Hero` primitive.
3. `src/app/products/pricing/page.tsx`
   - Major layout switched from static grids to carousel-first mobile containers.

## Fallback merge order
1. Merge shared primitives first (`page-template`, `pricing-cards`, `work-grid`).
2. Merge template migrations (`solution-template`, `legal-template`).
3. Merge route-level updates (`products/pricing`, `about`, `book`, `contact`, `quote`, `education/ai-for-work`).
4. Merge token polish (`src/styles/globals.css`).

## If conflicts occur
- Keep upstream content arrays and route copy, preserve new carousel wrappers and CTA visibility classes.
- Prefer shared `Hero` usage over route-specific hero markup for reduced duplication.
- For CTA conflict resolution, ensure at least one visible mobile CTA above the fold and one in lower page section.
