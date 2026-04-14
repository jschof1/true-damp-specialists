# Hardcoded Sweep Checklist

After updating all `src/data/*` files, work through this list. Not every file needs changes for every client — the initial grep sweep tells you which do.

## Step 1: Run the sweep

```bash
rg -i "OLD_CLIENT|OLD_CITY|OLD_INDUSTRY" src/components/ src/pages/ -l
```

Replace the placeholders with the previous client's name, city, and industry-specific terms. For a PM Roofers → Kosshi build, that would be:

```bash
rg -i "pm roofers|pm contract|glasgow|roofing|roofer|chimney|leadwork|roughcast|gutter|damp proof|dry rot" src/components/ src/pages/ -l
```

## Step 2: Work through hits

### Forms
- [ ] `SimpleContactForm.tsx` — service dropdown array, footer/helper text
- [ ] `QuoteWizard.tsx` — all step options (property types, sizes, services, timelines), step titles/descriptions, success message, submit button text

### Home Sections
- [ ] `HeroSection.tsx` — service tags, subtitle, brand name in any CTA or trust line
- [ ] `ServicesSection.tsx` — location label on cards, brand name in phone CTA
- [ ] `AboutSection.tsx` — feature box titles and descriptions, service lists, image alt text
- [ ] `AreasSection.tsx` — Google Maps embed URL (swap to new city)
- [ ] `BeforeAfterGallery.tsx` — image alt text
- [ ] `TrustSignals.tsx` — verify empty certifications array renders nothing (not a crash)
- [ ] `StatsCounter.tsx` — usually auto-updates from content.ts, but verify

### Pages
- [ ] `Reviews.tsx` — entire `reviews` array (names, locations, text, service tags), `stats` array, years-in-business badges, all headings and CTAs
- [ ] `GetQuote.tsx` — page narrative, service lists, trust bullets, "what happens next" copy
- [ ] `DiscountPage.tsx` — marketing copy, social proof strings, borough/city names, offer payload value, fake recent-name arrays
- [ ] `Feedback.tsx` — intro copy, brand name
- [ ] `FeedbackGoogle.tsx` — redirect message text
- [ ] `TermsOfService.tsx` — service descriptions, payment terms, location references, guarantee language
- [ ] `About.tsx` — image alt text, any hardcoded story title
- [ ] `FAQ.tsx` — section titles, intro paragraphs, alt text
- [ ] `Services.tsx` — hero badge text, hero titles, alt text
- [ ] `Areas.tsx` — alt text
- [ ] `Contact.tsx` — alt text
- [ ] `AddCustomer.tsx` — page title
- [ ] `MarketingForm.tsx` — page title, description, body copy

### Area/Service Dynamic Pages
- [ ] `AreaPage.tsx` — `projectStylesByService` map, fallback area object, brand name in template sentences, `getServiceIcon` slug mapping, default stat values

### Layout
- [ ] `TopBar.tsx` — opening hours string, promo line
- [ ] `Header.tsx` — fallback description strings
- [ ] `Footer.tsx` — payment logos section (keep/remove based on client)

### SEO / Schema
- [ ] `JsonLd.tsx` — `@type` array (match client industry), default description, address, og image path
- [ ] `PageTemplate.tsx` — default title, meta description, schema `@type`, address, og image
- [ ] `SEOHead.tsx` — base URL if hardcoded

### Styles
- [ ] `index.css` — design system comment at top (cosmetic only)

## Step 3: Final verification sweep

After all fixes:

```bash
rg -i "OLD_CLIENT|OLD_CITY|OLD_INDUSTRY" src/ -l
```

Remaining hits should only be in:
- Asset filenames (e.g. `pm-contracts/` in import paths — these are fine if images.ts re-exports them)
- Build artifacts that will regenerate

If any `.tsx` file still has old client strings in rendered output, fix it.
