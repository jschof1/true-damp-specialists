# True Damp Client Update Reconciliation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a reliable workflow for reconciling Rob's latest True Damp website feedback against the current site, finishing the remaining content/imagery/SEO work, and producing a clear client-facing update list.

**Architecture:** Treat this as a requirements-reconciliation and quality-assurance project before any further broad redesign. Capture source feedback from HighLevel/Gmail and the pasted email, convert it into a tracked checklist, map each item to existing repo files and live URLs, then implement remaining changes in small commits with build, SEO, and browser verification after each risk-bearing pass.

**Tech Stack:** React 18, Vite, TypeScript, Tailwind CSS, React Router, `react-helmet-async`, JSON/data-driven content in `data/content.json` and `src/data/*.ts`, build-time prerendering via `scripts/prerender.ts`, sitemap generation via `scripts/generate-sitemap.ts`, SEO verification via `scripts/verify-seo-build.ts`, Cloudflare Pages routing via `public/_redirects`.

---

## Working Rules

- Do not start another broad content pass until the source-feedback checklist exists.
- Keep Rob's wording direction intact: consultancy-led, technical, visual, detailed, and not generic contractor copy.
- Treat the pasted email as confirmed source material; mark HighLevel/Gmail findings as pending until the connector can be read.
- Prefer real project imagery and thermal photos where supplied. Do not replace imagery with more generic stock unless it is a deliberate temporary placeholder.
- Keep `/feedback` private from search indexing through page-level `noindex,nofollow`; do not put it in the sitemap.
- Commit after each coherent task group so regressions can be rolled back cleanly.
- Do not use destructive git commands. Preserve any unrelated user changes.

## Source Requirements Already Known

Rob asked for:

- Replace wording like "premium building pathology" with "Specialist Damp & Moisture Investigations".
- Make the site more premium, technical, consultancy-led, and less like standard contractor marketing.
- Make case studies feel like genuine investigations showing how moisture behaves, thermal/environmental analysis, root-cause diagnosis, failed previous repairs, and staged remediation thinking.
- Avoid heavily shortening the wording because the detail is part of the USP.
- Use large imagery, clean spacing, and strong mobile readability.
- Make thermal images and real project photos a major feature.
- Reduce generic stock imagery where possible.
- Make case studies one of the strongest trust-building areas.
- Check SEO/backend details such as JSON-LD, sitemap, robots, redirects, prerendering, and route handling.
- Fix `/feedback` and ensure the 5-star review path goes to `https://g.page/r/CU-GUEpjknolEBM/review`.

## Current Known Repo State

- Latest pushed route fixes:
  - `73e9e50` sets the requested Google review URL.
  - `3566d35` prerenders noindex utility routes including `/feedback`.
  - `dc138df` hardens Cloudflare route handling for `/feedback`.
  - `b8605eb` adds the trailing-slash React route `/feedback/`.
- `src/App.tsx` has routes for `/feedback` and `/feedback/`.
- `public/_redirects` explicitly maps `/feedback` and `/feedback/` to `feedback/index.html`.
- `src/pages/FeedbackPage.tsx` has `noindex,nofollow` and redirects 5-star users through `siteSettings.feedbackGoogleReviewUrl`.
- `src/data/siteSettings.ts` has `feedbackGoogleReviewUrl: "https://g.page/r/CU-GUEpjknolEBM/review"`.
- `public/robots.txt` no longer blocks `/feedback`, allowing crawlers to see its `noindex` directive if discovered.
- `src/routes.ts` marks `/feedback` as `noindex: true`, so it is excluded from `public/sitemap.xml`.

---

### Task 1: Recover and Save the Full Client Feedback Source

**Files:**
- Create: `docs/client-feedback/2026-05-20-rob-feedback-source.md`
- Modify: none in production code

**Step 1: Check connector availability**

Run HighLevel search from Codex tools:

```text
Search HighLevel for: recent conversations emails Rob True Damp Specialists website case studies imagery Specialist Damp Moisture Investigations
```

Expected:
- If HighLevel works, collect message dates, sender, subject/conversation, and the full relevant text.
- If HighLevel still fails with MCP handshake timeout, record the failure exactly in the source doc.

**Step 2: Check Gmail fallback**

Run Gmail searches:

```text
newer_than:180d ("True Damp" OR truedamp OR "True Damp Specialists" OR "premium building pathology" OR "Specialist Damp & Moisture Investigations") -in:spam -in:trash
newer_than:180d (from:rob OR Rob) (website OR case OR imagery OR damp OR feedback OR review OR SEO) -in:spam -in:trash
```

Expected:
- If Gmail works, collect relevant message IDs and read the complete thread.
- If Gmail fails, record the connector failure in the source doc.

**Step 3: Create the source feedback document**

Create `docs/client-feedback/2026-05-20-rob-feedback-source.md`:

```markdown
# Rob Feedback Source - 2026-05-20

## Connector Status

- HighLevel: [available/blocked, exact result]
- Gmail: [available/blocked, exact result]

## Confirmed Pasted Email

[Paste Rob's supplied email text here verbatim from the conversation.]

## Additional Email/GHL Notes

| Date | Source | Subject/Conversation | Requirement | Confidence |
| --- | --- | --- | --- | --- |
| 2026-05-20 | Pasted email | Website feedback | Replace "premium building pathology" wording | Confirmed |

## Open Questions For Rob

- Can he provide real project photos and thermal images for the case studies?
- Can he provide redacted reports or case notes for deeper case study pages?
- Does he want the feedback funnel shared as `/feedback` or a QR-specific URL?
```

**Step 4: Commit**

```bash
git add docs/client-feedback/2026-05-20-rob-feedback-source.md
git commit -m "docs: capture Rob feedback source"
```

Expected:
- A permanent source-of-truth document exists before more edits are made.

---

### Task 2: Create the Reconciliation Checklist

**Files:**
- Create: `docs/client-feedback/2026-05-20-rob-feedback-reconciliation.md`
- Read: `data/content.json`
- Read: `src/data/services.ts`
- Read: `src/routes.ts`
- Read: `src/pages/PortfolioPage.tsx`
- Read: `src/pages/FeedbackPage.tsx`
- Read: `src/components/SEO.tsx`
- Read: `public/_redirects`
- Read: `public/robots.txt`
- Read: `public/sitemap.xml`

**Step 1: Search the repo for each requirement**

Run:

```bash
cd /Users/jack/Documents/GitHub/true-damp-specialists
rg -n "premium building pathology|Specialist Damp & Moisture Investigations|thermal|case stud|stock|feedbackGoogleReviewUrl|/feedback|noindex|application/ld\\+json|sitemap|robots" src data public scripts
```

Expected:
- Every known requirement has evidence or a gap.

**Step 2: Create the reconciliation matrix**

Create `docs/client-feedback/2026-05-20-rob-feedback-reconciliation.md`:

```markdown
# Rob Feedback Reconciliation - 2026-05-20

| Requirement | Current status | Evidence | Remaining action | Owner |
| --- | --- | --- | --- | --- |
| Replace "premium building pathology" | Done / verify no remaining matches | `rg` result | Remove any remaining instances | Dev |
| Use "Specialist Damp & Moisture Investigations" | Done | `data/content.json`, `src/data/services.ts` | Verify visible pages | Dev |
| Case studies feel investigative | Partially done | `data/content.json`, `/portfolio` | Add real photos and deeper project-specific detail | Dev + Rob |
| Do not over-shorten wording | Done / monitor | Long-form case study copy retained | QA mobile readability | Dev |
| Large imagery and clean spacing | Partial | Portfolio and service imagery in current UI | Replace generic assets with real project media | Rob + Dev |
| Thermal/project photos major feature | Partial | Thermal asset appears across service/CTA pages | Add real thermal photos per case study | Rob + Dev |
| Avoid generic stock | Outstanding | Existing generated/stock-style assets in `public/assets` and `src/assets` | Build image asset inventory | Dev |
| SEO/JSON-LD strong | Mostly done | `src/components/SEO.tsx`, route schemas | Run SEO artifact audit and fix any failures | Dev |
| `/feedback` works | Done | `src/App.tsx`, `public/_redirects`, live browser test | Monitor after deploy | Dev |
| 5-star review URL exact | Done | `src/data/siteSettings.ts` | None | Dev |
```

**Step 3: Commit**

```bash
git add docs/client-feedback/2026-05-20-rob-feedback-reconciliation.md
git commit -m "docs: reconcile Rob website feedback"
```

Expected:
- The project has a factual "done / partial / outstanding" map.

---

### Task 3: Build the Image Asset Inventory and Replacement Plan

**Files:**
- Create: `docs/client-feedback/2026-05-20-image-inventory.md`
- Read: `public/assets/*`
- Read: `src/assets/**/*`
- Read: `docs/true-damp-image-prompts.md`
- Read: `scripts/generate-images-nano-banana.sh`
- Read: `data/content.json`
- Read: `src/pages/PortfolioPage.tsx`
- Read: `src/data/services.ts`

**Step 1: Inventory current imagery**

Run:

```bash
cd /Users/jack/Documents/GitHub/true-damp-specialists
find public/assets src/assets -type f \\( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" -o -iname "*.svg" \\) | sort
```

Expected:
- Full list of available imagery.

**Step 2: Map images to page usage**

Run:

```bash
rg -n "assets/|@/assets|imageKey|ctaBackground|heroBackground|imgThermal|portfolio-case|thermal" src data docs scripts
```

Expected:
- Each image can be classified as real, generated, stock-like, or unknown.

**Step 3: Create the inventory document**

Create `docs/client-feedback/2026-05-20-image-inventory.md`:

```markdown
# True Damp Image Inventory - 2026-05-20

## Image Classification

| Asset | Used on | Type | Keep / Replace | Notes |
| --- | --- | --- | --- | --- |
| `src/assets/general/damp-survey-thermal-imaging.webp` | CTA/service pages | Generated/stock-like unless verified | Replace when Rob supplies real thermal photo | Strong thematic fit but not confirmed real |

## Priority Replacement Requests For Rob

1. 6-10 real project photos from completed damp/moisture investigations.
2. 4-6 thermal images that can be shown publicly.
3. 2-3 exterior defect photos showing drainage, masonry, roofing, or bridging causes.
4. 2 redacted report screenshots or excerpts showing the technical reporting style.
5. Permission notes for each image: public OK, anonymise, or internal only.

## Target Placement

| Page/Section | Ideal Image Type | Minimum Count |
| --- | --- | ---: |
| `/portfolio` case studies | Real project + thermal image pairing | 6 |
| Homepage trust/case area | Strong real investigation photo | 1 |
| Services diagnostics page | Thermal/moisture profiling photo | 1 |
| Reports page | Redacted report or technical image | 1 |
```

**Step 4: Commit**

```bash
git add docs/client-feedback/2026-05-20-image-inventory.md
git commit -m "docs: plan True Damp image replacements"
```

Expected:
- Rob can be asked for a precise media pack instead of a vague "send photos" request.

---

### Task 4: Patch Any Remaining Copy/Wording Gaps

**Files:**
- Modify: `data/content.json`
- Modify: `src/data/services.ts`
- Modify: `src/routes.ts`
- Modify only if needed: relevant page/component files found by `rg`

**Step 1: Write a content regression check**

Run:

```bash
cd /Users/jack/Documents/GitHub/true-damp-specialists
rg -n "premium building pathology|generic damp summaries|typical contractor marketing" src data public
```

Expected:
- No unwanted phrase remains, unless it is quoted in a private documentation file.

**Step 2: Update remaining wording**

If a production file still contains unwanted wording, replace it with:

```text
Specialist Damp & Moisture Investigations
```

For broader sentence rewrites, use this pattern:

```text
We carry out specialist damp and moisture investigations focused on how moisture behaves, what the building fabric is doing, and why previous repairs may have failed.
```

Expected:
- Production content consistently uses Rob's preferred positioning.

**Step 3: Run build**

```bash
npm run build
```

Expected:
- Build passes.
- SEO verification passes.

**Step 4: Commit**

```bash
git add data/content.json src/data/services.ts src/routes.ts
git commit -m "copy: align True Damp investigation wording"
```

Expected:
- Only actual production wording changes are committed.

---

### Task 5: Strengthen Portfolio/Case Study Presentation Without Waiting For New Images

**Files:**
- Modify: `data/content.json`
- Modify: `src/pages/PortfolioPage.tsx`
- Modify if needed: `src/components/ProjectGallery.tsx`
- Test manually: `/portfolio`

**Step 1: Review current case study structure**

Run:

```bash
rg -n '"portfolio"|caseStudies|investigation|thermal|previous repairs|remediation' data/content.json src/pages/PortfolioPage.tsx src/components
```

Expected:
- Identify whether the copy already covers investigation method, moisture behaviour, root cause, failed repair logic, and staged remediation.

**Step 2: Add missing case-study fields only if needed**

If the content model is too flat, add fields like:

```json
{
  "investigationFocus": "Moisture movement, thermal bridging and failed previous repairs",
  "evidenceUsed": ["Moisture profiling", "Thermal imaging", "Environmental readings", "External defect review"],
  "diagnosis": "The visible symptoms were consistent with condensation risk amplified by cold bridging rather than a simple rising damp issue.",
  "whyPreviousRepairsFailed": "Previous works treated visible finishes without addressing the moisture pathway or surface temperature conditions.",
  "stagedRemediation": ["Stabilise internal environment", "Address external defect", "Improve ventilation", "Monitor before decorative repair"]
}
```

Expected:
- The page can show technical depth without burying the reader.

**Step 3: Update the portfolio layout**

In `src/pages/PortfolioPage.tsx`, make each case study expose:

```tsx
<section>
  <h2>{caseStudy.title}</h2>
  <p>{caseStudy.description}</p>
  <dl>
    <dt>Investigation focus</dt>
    <dd>{caseStudy.investigationFocus}</dd>
    <dt>Evidence used</dt>
    <dd>{caseStudy.evidenceUsed.join(", ")}</dd>
    <dt>Why the previous approach failed</dt>
    <dd>{caseStudy.whyPreviousRepairsFailed}</dd>
  </dl>
</section>
```

Adapt to the existing component style rather than pasting this literally if the current component already has an equivalent structure.

**Step 4: Test mobile readability**

Run:

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4175
```

Open:

```text
http://127.0.0.1:4175/portfolio
```

Expected:
- Cards do not overflow on mobile widths.
- Long technical text is scannable.
- Images have stable aspect ratios.

**Step 5: Commit**

```bash
git add data/content.json src/pages/PortfolioPage.tsx src/components/ProjectGallery.tsx
git commit -m "feat: strengthen investigation-led case studies"
```

Expected:
- Case studies are stronger even before Rob supplies better images.

---

### Task 6: Integrate Rob's Real Project Images When Supplied

**Files:**
- Add: `src/assets/projects/*`
- Modify: `data/content.json`
- Modify: `src/pages/PortfolioPage.tsx`
- Modify: `src/data/services.ts` if service imagery changes
- Modify: `src/pages/ReportsPage.tsx` if report imagery is supplied

**Step 1: Prepare image filenames**

Use descriptive lowercase filenames:

```text
src/assets/projects/thermal-cold-bridging-bedroom.webp
src/assets/projects/external-defect-masonry-weathering.webp
src/assets/projects/moisture-profile-wall-base.webp
src/assets/projects/redacted-report-moisture-summary.webp
```

Expected:
- Assets can be understood without opening them.

**Step 2: Optimise images before adding**

Use the repo's existing image conventions. If manual optimisation is needed, create WebP outputs under `src/assets/projects/`.

Expected:
- No huge unoptimised raw photos are committed.

**Step 3: Wire images into case studies**

In `data/content.json`, map each case study to supplied images:

```json
{
  "image": "thermal-cold-bridging-bedroom",
  "imageAlt": "Thermal image showing a cold bridging pattern during a damp and mould investigation"
}
```

Expected:
- Thermal and real project photos become primary trust assets.

**Step 4: Add alt text**

Use alt text that describes the diagnostic evidence:

```text
Thermal image showing a cold surface junction assessed during a specialist damp and moisture investigation
```

Expected:
- Accessibility and image SEO are improved without keyword stuffing.

**Step 5: Build and visual QA**

```bash
npm run build
```

Expected:
- Build passes.
- Image imports resolve.
- No CLS-risk layout shifts from missing dimensions/aspect ratios.

**Step 6: Commit**

```bash
git add src/assets/projects data/content.json src/pages/PortfolioPage.tsx src/data/services.ts src/pages/ReportsPage.tsx
git commit -m "feat: add real True Damp project imagery"
```

Expected:
- Real imagery becomes part of the site instead of remaining a request.

---

### Task 7: Run a Technical SEO and Structured Data QA Pass

**Files:**
- Modify if needed: `src/components/SEO.tsx`
- Modify if needed: `src/pages/*Page.tsx`
- Modify if needed: `src/routes.ts`
- Modify if needed: `scripts/verify-seo-build.ts`
- Modify if needed: `scripts/generate-sitemap.ts`
- Modify if needed: `public/robots.txt`
- Modify if needed: `public/_redirects`

**Step 1: Run the production build**

```bash
npm run build
```

Expected:
- Build passes.
- SEO verification passes.

**Step 2: Inspect generated key artifacts**

Run:

```bash
test -f dist/client/sitemap.xml
test -f dist/client/robots.txt
test -f dist/client/feedback/index.html
rg -n "https://www.truedampspecialists.co.uk|noindex, nofollow|application/ld\\+json|Feedback \\| True Damp Specialists" dist/client public src
```

Expected:
- Sitemap and robots exist in build output.
- `/feedback` HTML exists and has `noindex,nofollow`.
- Public/indexable pages have schema.

**Step 3: Check sitemap does not include noindex routes**

Run:

```bash
rg -n "/feedback|/discount|/add-customer|/marketing-form" public/sitemap.xml dist/client/sitemap.xml
```

Expected:
- No matches.

**Step 4: Check feedback route publicly**

Run:

```bash
curl -I -L https://truedampspecialists.co.uk/feedback
curl -sL https://truedampspecialists.co.uk/feedback | rg -n "Feedback \\| True Damp Specialists|How was your experience\\?|noindex, nofollow|Page not found|404"
```

Expected:
- HTTP flow ends in `200`.
- Feedback title and H1 are present.
- `noindex,nofollow` is present.
- No 404 text is present.

**Step 5: Improve the verifier if gaps are found**

If `scripts/verify-seo-build.ts` still checks only indexable routes, consider adding a lightweight utility-route assertion:

```ts
const requiredNoindexRoutes = routes.filter(route => route.noindex);
for (const route of requiredNoindexRoutes) {
  const filePath = path.join(distDir, route.outputPath);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing noindex HTML file: ${route.outputPath} (path: ${route.path})`);
    errors++;
  }
}
```

Expected:
- Future `/feedback` regressions fail the build before deployment.

**Step 6: Commit**

```bash
git add src/components/SEO.tsx src/pages src/routes.ts scripts public
git commit -m "test: strengthen SEO route verification"
```

Expected:
- Only commit changed files. If no changes were needed, do not create an empty commit.

---

### Task 8: Produce the Client-Facing Done/Needed Update

**Files:**
- Create: `docs/client-update-2026-05-20-rob-feedback-followup.md`
- Read: `docs/client-feedback/2026-05-20-rob-feedback-reconciliation.md`
- Read: `docs/client-feedback/2026-05-20-image-inventory.md`

**Step 1: Draft the update**

Create `docs/client-update-2026-05-20-rob-feedback-followup.md`:

```markdown
# True Damp Website Feedback Follow-up - 2026-05-20

## Completed

- Updated site positioning toward "Specialist Damp & Moisture Investigations".
- Strengthened case study copy around investigation, moisture behaviour, root cause and staged remediation.
- Checked and strengthened SEO build foundations: route manifest, sitemap, robots, prerendering, metadata and JSON-LD.
- Fixed the `/feedback` route and Google review destination.

## Still Needed From Rob

- Real project photos that are safe to publish.
- Thermal images that can be shown publicly.
- Redacted report excerpts or screenshots.
- Any extra case notes for deeper investigation-led case studies.

## Suggested Next Website Pass

1. Replace generic imagery with real project/thermal images.
2. Add more project-specific case study detail where Rob supplies notes.
3. Run final mobile and SEO QA after imagery is integrated.
```

**Step 2: Commit**

```bash
git add docs/client-update-2026-05-20-rob-feedback-followup.md
git commit -m "docs: draft Rob feedback follow-up"
```

Expected:
- Jack has a ready summary to send or adapt.

---

### Task 9: Final Verification and Push

**Files:**
- Modify: none unless verification reveals a defect

**Step 1: Run full verification**

```bash
cd /Users/jack/Documents/GitHub/true-damp-specialists
npm run build
npm run lint
git status --short
```

Expected:
- Build passes.
- Lint either passes or only shows known existing warnings.
- Working tree is clean after commits.

**Step 2: Check live route after push**

After pushing:

```bash
git push origin main
curl -I -L https://truedampspecialists.co.uk/feedback
curl -sL https://truedampspecialists.co.uk/feedback | rg -n "Feedback \\| True Damp Specialists|How was your experience\\?|noindex, nofollow|Page not found|404"
```

Expected:
- Live route returns feedback page, not 404.

**Step 3: Final report to Jack**

Report:

```text
Done:
- [specific committed changes]

Still needed from Rob:
- [specific media/content asks]

Verified:
- npm run build
- npm run lint
- live /feedback check
```

Expected:
- Jack knows exactly what was done, what remains with Rob, and what is technically verified.

