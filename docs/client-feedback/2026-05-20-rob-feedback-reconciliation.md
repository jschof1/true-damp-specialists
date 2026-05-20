# Rob Feedback Reconciliation - 2026-05-20

HighLevel/Gmail direct read is still pending because connector startup failed with `MCP startup failed: timed out handshaking with MCP server after 30s`. This checklist reconciles the confirmed pasted feedback in `docs/client-feedback/2026-05-20-rob-feedback-source.md` against the current repo state.

| Requirement | Current status | Evidence | Remaining action | Owner |
| --- | --- | --- | --- | --- |
| Replace "premium building pathology" | Done for site/source code | Requested `rg` search found no `premium building pathology` matches in `src`, `data`, `public`, or `scripts`; the phrase still appears in planning/source-feedback docs as quoted client context. | Keep the phrase out of future production copy passes. | Dev |
| Use preferred "Specialist Damp & Moisture Investigations" wording | Done | `data/content.json:206`, `data/content.json:865`, `data/content.json:1308`; `src/data/services.ts:148-150`; `src/data/reviews.json:29`; `src/data/fallbackReviews.ts:24`. | Final visual QA on visible page headings after next build/deploy. | Dev |
| Make case studies investigation-led, not generic damp summaries | Mostly done | `data/content.json:865-873` frames case studies around evidence, diagnosis, moisture behaviour, thermal/environmental evidence and failed repairs; project copy at `data/content.json:1313-1364` uses root-cause and staged-remediation detail. | Add deeper project-specific evidence once Rob supplies real notes, images or redacted reports. | Dev + Rob |
| Avoid heavily shortening wording | Done | Long-form case study descriptions remain in `data/content.json:1313-1364`; gallery copy says detail is preserved at `data/content.json:872-873`. | Monitor during future design/content edits so mobile presentation improves without cutting the diagnostic substance. | Dev |
| Large imagery and clean spacing | Partial | Portfolio hero uses a full-width image background at `src/pages/PortfolioPage.tsx:44-55`; case-study cards use `aspect-[16/10]` imagery and responsive spacing at `src/pages/PortfolioPage.tsx:104-204`. | Browser QA on mobile/desktop; replace placeholder/generic imagery with real project media. | Dev + Rob |
| Mobile readability for detailed pages | Partial | Responsive portfolio typography and spacing are present at `src/pages/PortfolioPage.tsx:57-77` and `src/pages/PortfolioPage.tsx:94-204`. | Run browser checks on content-heavy pages and adjust line length, card density, and image/text rhythm where needed. | Dev |
| Make thermal/project photos a major feature | Partial | Thermal language appears throughout services and content: `data/content.json:42`, `data/content.json:689`, `src/data/services.ts:90-104`, `src/data/services.ts:153-159`; thermal asset imported on portfolio and other pages, e.g. `src/pages/PortfolioPage.tsx:15`. | Add real thermal images per case study and service page once Rob provides public-safe assets. | Rob + Dev |
| Reduce generic stock imagery | Outstanding | Image generation script includes stock/generic prompts at `scripts/generate-images-nano-banana.sh:59` and `scripts/generate-images-nano-banana.sh:74`; current portfolio and CTA imagery still appears asset-driven rather than verified real project media. | Build image inventory and classify each asset as real, generated, stock-like, or unknown before replacing. | Dev |
| Make case studies a strong trust-building area | Mostly done | `/portfolio` route has high sitemap priority and weekly changefreq at `src/routes.ts:98-104`; page copy explicitly positions evidence-led case studies in `data/content.json:865-873`; project summaries at `data/content.json:1313-1364` show failed prior advice and diagnosis-led outcomes. | Strengthen with real photos, thermal evidence, report excerpts, and any permission-cleared outcomes/testimonials. | Dev + Rob |
| SEO metadata and JSON-LD | Mostly done | `src/components/SEO.tsx:189-217` sets robots/canonical/social tags and emits `application/ld+json`; portfolio page uses the active `SEO` component at `src/pages/PortfolioPage.tsx:29-37`; generated route HTML should be checked after each build. | Run SEO artifact audit after next production-code pass and fix any build/prerender failures. | Dev |
| Sitemap, robots and noindex handling | Mostly done | `public/robots.txt:1-7` allows crawl and advertises the sitemap; `public/sitemap.xml:1-80` lists indexable pages and does not show `/feedback` in inspected output; `src/routes.ts:125-130` marks `/feedback` as `noindex`; `src/routes.ts:170` filters `indexableRoutes`. | Re-run sitemap generation/SEO verification after route changes; confirm deployed `robots.txt` and `sitemap.xml` match source. | Dev |
| `/feedback` route | Implemented, pending link-strategy decision | React routes exist at `src/App.tsx:51-52`; Cloudflare redirects map `/feedback` and `/feedback/` to `feedback/index.html` at `public/_redirects:3-4`; route manifest marks `/feedback` as noindex at `src/routes.ts:125-130`. | Browser-test the live/private review flow and confirm whether Rob wants `/feedback`, a QR-specific URL, or another private link. | Dev + Rob |
| Exact Google review URL for 5-star path | Done | `src/data/siteSettings.ts:30` sets `feedbackGoogleReviewUrl` to `https://g.page/r/CU-GUEpjknolEBM/review`; `src/pages/FeedbackPage.tsx:30-32` redirects 5-star clicks to that setting. | None unless Rob changes the Google Business profile/review URL. | Dev |
| Keep `/feedback` private from search indexing | Done | Page-level robots tags are set in `src/pages/FeedbackPage.tsx:72-77`; route manifest noindex at `src/routes.ts:125-130`; `/feedback` is absent from inspected `public/sitemap.xml:1-80`; `public/robots.txt:1-7` does not block `/feedback`, allowing crawlers to see page-level noindex if discovered. | Confirm deployed prerendered `/feedback/index.html` contains the same noindex tags. | Dev |
| Leads quieter; materials Rob can provide | Blocked pending Rob | Source feedback says leads have been quieter and Rob can provide materials, imagery, reports, case studies, or content; captured in `docs/client-feedback/2026-05-20-rob-feedback-source.md`. | Ask Rob for permission-cleared real project photos, thermal images, redacted report excerpts, and case notes. | Rob |
| HighLevel/Gmail source reconciliation | Pending connector access | Source doc records HighLevel and Gmail blocked by MCP handshake timeout; direct read has not been completed. | Retry HighLevel/Gmail once connectors start, then update source and reconciliation docs if additional requirements appear. | Dev |

## Immediate Next Actions

1. Create the image inventory and replacement plan so generic/generated assets can be separated from real project media.
2. Ask Rob for a permission-cleared media pack: real project photos, thermal images, redacted report excerpts, and short case notes for each strong case study.
3. Browser-test `/portfolio`, key service pages, and `/feedback` on mobile and desktop after the next production-code pass.
4. Re-run sitemap generation, prerendering, and SEO verification after any route/content changes.
5. Retry HighLevel/Gmail connector access and update the source/reconciliation docs if more client feedback is recovered.

## Evidence Commands Run

```bash
rg -n "premium building pathology|Specialist Damp & Moisture Investigations|thermal|case stud|stock|feedbackGoogleReviewUrl|/feedback|noindex|application/ld\\+json|sitemap|robots" src data public scripts
sed -n '1,260p' docs/client-feedback/2026-05-20-rob-feedback-source.md
nl -ba data/content.json | sed -n '190,235p;850,890p;930,1045p;1298,1315p'
nl -ba src/data/services.ts | sed -n '80,165p;205,225p'
nl -ba src/routes.ts | sed -n '90,132p;160,172p'
nl -ba src/pages/FeedbackPage.tsx | sed -n '25,85p'
nl -ba src/App.tsx | sed -n '45,55p'
nl -ba public/_redirects | sed -n '1,8p'
nl -ba public/robots.txt | sed -n '1,12p'
nl -ba public/sitemap.xml | sed -n '1,80p'
nl -ba src/components/SEO.tsx | sed -n '180,220p'
nl -ba src/data/siteSettings.ts | sed -n '24,34p'
nl -ba src/pages/PortfolioPage.tsx | sed -n '1,90p'
nl -ba src/pages/PortfolioPage.tsx | sed -n '90,210p'
nl -ba data/content.json | sed -n '1310,1395p'
rg -n "premium building pathology" src data public scripts
```
