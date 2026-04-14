---
name: client-site-rebrand
description: "Rebrand an existing Vite + React + Tailwind + shadcn template site for a new client using a single business brief document. Covers data files, hardcoded component strings, forms, schema markup, theme, SEO metadata, image prompt generation, and build verification. Use this skill whenever the user wants to update, rebrand, reskin, or repurpose a template website for a new client — even if they just say 'update the site with this doc' or 'rebrand for new client' or 'apply this brief'. Also trigger when the user provides a markdown file with business details and expects the site to be rebuilt around it. This skill is designed for the UK Trade Leads / Aspect Studio template architecture but works for any data-driven React site with centralized content files."
---

# Client Site Rebrand

Take an existing template site and rebrand it completely for a new client using a single business brief document.

This skill was born from real multi-client builds — roofing companies rebranded to construction subcontractors, plumbing sites turned into landscaping sites, etc. The pattern is always the same: swap out all the data, sweep the hardcoded strings in components, update forms and schema, generate image prompts, verify the build.

## When To Use This

- User says "update the site for [client]" or "rebrand for [new business]"
- User provides a markdown doc with business info and expects site updates
- User says something like "/update-site using doc" or "apply this brief"
- User wants to repurpose a template for a different client or industry

## Required Input

A single document (markdown preferred, but messy notes work too) containing business information. The document should ideally cover:

- Business name and contact details
- Services offered
- Service areas / locations
- Industry and target audience
- Any brand direction (colours, tone)

If fields are missing, infer conservatively and log assumptions. Read `references/business-brief-template.md` for the ideal structure — but never block on format quality.

## The Two Content Layers

Template sites have content in two places. Both need updating:

**Layer 1 — Data files** (`src/data/*`): The primary editing surface. Most page content, SEO metadata, services, areas, and settings live here. Changing these files propagates automatically to most components.

**Layer 2 — Hardcoded component strings**: Service dropdown options, form step labels, wizard options, review data, legal copy, alt text, map embeds, trust badges, CTA text, and marketing copy that lives directly in `.tsx` files. These don't update when you change data files — they need manual sweeps.

Skipping Layer 2 is the most common mistake. It leaves the old client's name, city, and services scattered through the live site.

## Execution Workflow

### Phase 1: Normalize the Brief

Before touching any code, convert the raw brief into a structured format:

1. **Business identity** — legal name, trading name, short name, tagline, years in business
2. **Contact and operations** — phone, email, address, service area, hours
3. **Services** — names, slugs, short descriptions (minimum 3)
4. **Areas** — names, slugs, regions, neighbourhoods (minimum 3)
5. **Core page copy intent** — home/about/contact/FAQ positioning
6. **SEO direction** — title patterns, meta descriptions, priority keywords
7. **Theme direction** — colours, typography mood, style keywords
8. **Social proof** — testimonials, certifications, trust signals
9. **Constraints** — must-keep routes, must-avoid wording, compliance
10. **Assets** — logos, photos, brand references

If URLs are provided (existing site, competitors), scrape supporting data and merge with brief notes. Brief instructions win when there's a conflict.

Log every assumption you make. This list becomes part of the final handoff.

### Phase 2: Update Data Files (Layer 1)

Update these files in this exact order. The order matters because later files reference earlier ones.

**Step 1: `src/data/siteSettings.ts`**
- Replace business name, phone, email, address, service area
- Set webhook URLs to placeholders if not provided (flag for follow-up)
- Set social/review URLs to empty strings if not provided

**Step 2: `src/data/theme.ts`**
- Add a new theme preset with the client's brand colours
- If no colours provided, pick an industry-appropriate palette
- Update the active theme export at the bottom of the file
- Keep HSL format expected by the codebase

**Step 3: `src/data/content.ts`**
This is the biggest single file. Every string needs rewriting:
- `brand` — business name, short name, service area label, byline
- `cta` — call-to-action text
- `layout.header` / `layout.footer` — nav links, company blurb, service/area links
- `home.*` — hero, about, services, process, guarantee, testimonials, FAQ, areas, trust signals
- `about` / `faqPage` / `servicesPage` / `areasPage` / `contactPage` — full page copy
- `routeSeo` — every route title and description

Frame all copy for the client's industry and target audience. A B2B subcontractor supply company sounds different from a residential roofer.

**Step 4: `src/data/services.ts`**
- Replace the entire services array
- Each service needs: title, slug, description, heroText, images, benefits, features, process steps, FAQs
- Use consistent process steps across services (customise per client)
- Point images to placeholder paths in the client's asset directory

**Step 5: `src/data/areas.ts`**
- Replace entirely with the client's service areas
- Use real neighbourhoods for each area
- Write area descriptions that reference the client's services
- Group areas into regions

**Step 6: `src/data/projects.ts`**
- Replace with client-relevant project examples
- Use placeholder images, flag for replacement

**Step 7: `src/data/images.ts`**
- Update all image exports to point to new asset paths
- Create placeholder SVGs or point to a single placeholder if real assets aren't available
- Flag every image that needs replacement

**Step 8: `src/data/seoData.ts`**
- Update dynamic SEO helpers to reference the new client and location
- Update region themes map
- Update fallback service slugs

### Phase 3: Sweep Hardcoded Components (Layer 2)

After data files are done, sweep components for hardcoded strings. This is where most "missed rebrand" bugs live.

**Run a string sweep first:**
```bash
rg -i "old_client_name|old_city|old_service_term" src/components/ src/pages/ --type ts --type tsx
```

Replace `old_client_name`, `old_city`, and `old_service_term` with the previous client's specifics (e.g. "PM Roofers", "Glasgow", "roofing").

**Files that almost always need manual updates:**

| File | What's hardcoded |
|------|-----------------|
| `SimpleContactForm.tsx` | Service dropdown options, footer text |
| `QuoteWizard.tsx` | All wizard step options, labels, success messages |
| `HeroSection.tsx` | Service tags, subtitle text, brand name in CTA |
| `ServicesSection.tsx` | Location labels, brand name in CTA |
| `AboutSection.tsx` | Feature box labels, service lists, image alt text |
| `AreasSection.tsx` | Google Maps embed URL (swap city) |
| `Reviews.tsx` | Entire reviews array, stats, service tags, location names |
| `AreaPage.tsx` | Service-to-display-name map, fallback area data, brand name in copy |
| `GetQuote.tsx` | Page narrative, service lists, trust bullets |
| `DiscountPage.tsx` | Marketing copy, social proof strings, offer payload |
| `Feedback.tsx` | Intro copy, brand name |
| `FeedbackGoogle.tsx` | Redirect message |
| `TermsOfService.tsx` | Service descriptions, payment terms, location references |
| `TopBar.tsx` | Opening hours, promo line |
| `JsonLd.tsx` | Schema @type, address, description |
| `PageTemplate.tsx` | Default title, meta description, schema |
| `AddCustomer.tsx` | Page title |
| `MarketingForm.tsx` | Page title, description |
| `Header.tsx` | Fallback descriptions |
| `Footer.tsx` | Payment section (if applicable) |
| `index.css` | Design system comment (cosmetic) |

Not every file will need changes for every client. The sweep catches what does.

### Phase 4: New Pages (If Needed)

Check the brief for requirements that don't map to existing routes:
- Recruitment / "Join Our Team" page
- Industry-specific landing pages
- New form types

Create new pages following existing patterns. Add routes, update nav links in `content.ts`.

### Phase 5: Image Prompt Generation

Generate a line-by-line list of image prompts covering:
- Logo (if not provided)
- Hero background
- Coverage/area image
- Team/about image
- Craftsmanship detail image
- One image per service
- One image per project case study
- Open Graph / social sharing image

Each prompt should specify:
- Subject and composition
- Style direction (photorealistic, premium commercial photography)
- Brand colour grade reference
- Aspect ratio (16:9 for heroes, flexible for cards)
- "no text, no watermark" suffix

Save prompts to `<client>-image-prompts.txt` in the project root, one prompt per line.

### Phase 6: Verify

**String sweep** — Confirm no old client references remain:
```bash
rg -i "old_client|old_city|old_industry_term" src/ --type ts --type tsx -l
```

Only legacy asset filenames (which don't render to users) should remain.

**Build check:**
```bash
npm install   # ensure deps are present
npm run build
```

The build must pass. If it fails, fix the issue before proceeding.

**Lint check** — Run lints on edited files and fix any introduced errors.

### Phase 7: Handoff

Return a structured summary:

1. **Changed files list** — every file modified
2. **Normalized brief summary** — what was inferred vs explicit
3. **Assumptions log** — every default used due to missing input
4. **Verification results** — string sweep, build pass/fail
5. **Manual follow-ups required** — images to generate, webhooks to configure, GBP to create, favicons to regenerate
6. **Image prompts file location**
7. **Recommendations** — anything that would improve the site beyond what the brief specified

## Key Principles

**Data first, components second.** Always update `src/data/*` before touching components. Most content propagates automatically.

**Don't invent what you don't know.** If the brief doesn't specify testimonials, use clearly labelled placeholders. If it doesn't specify hours, don't make them up — leave a TODO.

**Industry framing matters.** A B2B subcontractor supply company says "We supply expert dry lining subcontractors" not "We do dry lining." A residential plumber says "24/7 emergency plumber" not "Plumbing subcontractor supply." Read the brief's target audience and frame all copy accordingly.

**The sweep is not optional.** The hardcoded component sweep (Phase 3) is where builds fail in production. A single "Glasgow" in a hero section or "RoofingContractor" in schema markup will embarrass the client. Run the grep. Fix every hit.

**Build must pass.** Never hand off a site that doesn't build. If prerender or SEO generation fails, it means routes or data are inconsistent — fix it.

## Reference Files

- `references/business-brief-template.md` — Ideal brief structure (messy input friendly)
- `references/file-map.md` — Which brief fields map to which files
- `references/hardcoded-sweep-checklist.md` — Component-by-component checklist for Layer 2

Read `references/file-map.md` before starting Phase 2 to understand the update order and completion criteria.
