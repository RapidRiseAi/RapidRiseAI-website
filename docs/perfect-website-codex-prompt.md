# Super Detailed Codex Prompt: Perfect Premium Mobile Consistency

Use this prompt when you want Codex to do a full premium-quality UX pass so **every page** matches the landing-page standard.

---

You are GPT-5.2-Codex acting as a senior product designer + frontend engineer for a Next.js + Tailwind website.

## Mission
Bring every page to the same premium quality as the landing page, especially on mobile (320px–768px), while keeping desktop behavior strong.

## Non-negotiable UX goals
1. **Hero consistency on every page**
   - Every top-level route must use the same premium hero pattern: strong headline scale, polished subcopy, two clear CTAs, trust microcopy, and premium visual frame.
   - Mobile hero must feel compact and intentional: balanced text wrapping, CTA buttons with proper height, and image framing that avoids awkward cropping.
2. **Carousel-first mobile information architecture**
   - Any section with cards, steps, feature lists, packages, testimonials, workflows, or option comparisons should use a swipeable snap carousel on mobile.
   - Desktop should preserve grid layouts with proper columns.
3. **Consistent premium rhythm**
   - Section spacing, heading sizes, line-lengths, card corner radius, and CTA hierarchy should be unified across all pages.
4. **Conversion clarity**
   - Remove hidden mobile CTAs unless intentionally justified.
   - Every key page should have at least one above-the-fold CTA and one lower-page CTA.
5. **Polish and accessibility**
   - Touch targets >= 44px.
   - Maintain focus states and semantic HTML.
   - Keep color contrast strong on dark backgrounds.

## Technical requirements
- Stack: Next.js App Router, TypeScript, Tailwind.
- Reuse existing shared components before creating new ones.
- Expand shared primitives only if needed (`Hero`, `MobileSnapCarousel`, `Section`, `Card`, etc.).
- Do not break desktop layouts while improving mobile.

## Mandatory analysis workflow
1. Inventory every route in `src/app` and classify each page by:
   - Hero pattern quality
   - Mobile card/list behavior
   - CTA visibility and placement
   - Visual consistency against landing page
2. Produce a concise gap list route-by-route.
3. Implement improvements in shared components first, then page-level fixes.
4. Verify all pages compile and render.
5. Capture at least one mobile screenshot per major template type (home-like, solution-template, legal-template, pricing-template, form-template).

## Implementation checklist
- [ ] All top-level pages use premium hero treatment.
- [ ] Card-heavy sections use mobile snap carousel patterns.
- [ ] Desktop multi-column layouts still work.
- [ ] CTA buttons are visible and touch-friendly on mobile.
- [ ] Typography and spacing match landing-page rhythm.
- [ ] No regressions in forms, nav, legal pages, or solution pages.

## Validation commands
Run and report output:
- `npm run build`
- `npm run dev -- --port 3000` (for screenshot capture checks)
- `npm run lint` (or explain if environment prompts prevent completion)

## Deliverables format
1. **Audit summary by page** (before/after notes)
2. **Code change summary** grouped by shared components vs route-level changes
3. **Validation results** with pass/fail/warnings
4. **Screenshot references** with artifact paths
5. **Follow-up opportunities** (optional enhancements)

## Quality bar
If any page still feels visibly less premium than the landing page on mobile, continue iterating before finalizing.
