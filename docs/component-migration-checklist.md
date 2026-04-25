# Component Migration Checklist

This checklist maps old shared component names to the new phased refactor structure so teams can migrate route-by-route without regressions.

## Layout layer

- `site-chrome.tsx -> layout/SiteShell.tsx` (`SiteShell`, `CookieBanner`, `MobileStickyCtaBar`, `BotpressLauncher`)
- `site-chrome.tsx -> layout/Header.tsx`
- `site-chrome.tsx -> layout/MobileMenu.tsx`
- `site-chrome.tsx -> layout/Footer.tsx`
- `page-template.tsx:Hero -> layout/PageHero.tsx`
- `ui/section.tsx -> layout/SectionShell.tsx`

## Content layer

- `ui/feature-grid.tsx -> content/FeatureBentoGrid.tsx`
- `ui/work-proof-gallery.tsx -> content/ProofGallery.tsx`
- `ui/pricing-cards.tsx -> content/PricingSystemCard.tsx` (card primitive)
- `ui/steps.tsx -> content/ProcessTimeline.tsx`
- `home-page stat cards -> content/TrustGrid.tsx`

## Visual system layer

- `ui/card.tsx -> visual-system/GlassPanel.tsx` (glass variant)
- `ui/pill.tsx -> visual-system/StatusPill.tsx` (status variant)
- `home-page before/after cards -> visual-system/BeforeAfterWorkflow.tsx`
- `home-page metrics -> visual-system/SystemMetric.tsx`
- `new visual primitives -> AnimatedGridBackground, WorkflowNode, MotionConnector, ActivityFeed, SystemOrbit`

## Route migration status

- [x] `src/app/page.tsx` slimmed to a section composer (`HomePageSections`).
- [x] `src/app/solutions/page.tsx` slimmed to a section composer (`SolutionsPageSections`).
- [ ] Move remaining route-level inline sections into `src/components/content/*` modules as follow-up.

## Regression checks during phased rollout

- Validate primary CTAs still point to existing paths (`/quote`, `/work`, `/book`, `/solutions/*`).
- Confirm header/footer/legal links are unchanged.
- Confirm mobile menu open/close body-lock and keyboard escape behavior.
- Confirm sticky mobile CTA hide/show behavior around hero and footer boundaries.
