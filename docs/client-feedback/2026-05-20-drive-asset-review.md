# True Damp Drive Asset Review

Date: 2026-05-20

## Source

- User-supplied Drive folder: `https://drive.google.com/drive/folders/1aFMghebhZxhcVoozIiGbxK0CMw9_QOI7`
- Local synced folder: `/Users/jack/Library/CloudStorage/GoogleDrive-jack@aspectstudio.net/.shortcut-targets-by-id/1aFMghebhZxhcVoozIiGbxK0CMw9_QOI7/True Damp Specialists Photos`
- Connector status: Google Drive, Gmail/HighLevel and Slack connector startup attempts timed out, so the review used the local synced Drive folder.

## Inventory

- Photos: 114 total (`82` HEIC, `26` JPG, `6` JPEG).
- PDFs: 23 total.
- Contact sheet generated for review: `/tmp/true-damp-drive-review/contact-sheets/sheet-00.jpg`.
- Image index generated for traceability: `/tmp/true-damp-drive-review/image-index.tsv`.

## Published Now

Real project imagery has replaced the generated/stock-like gallery and service visuals:

- Hero and OG image: close-up external investigation image from Drive.
- Portfolio/case study cards: external moisture, ceiling water staining, listed fabric, roof junction, mould/ventilation, and thermal imaging images.
- Service cards/detail heroes: masonry/external survey, thermal diagnostics, mould, building fabric, roof junction, and remedial fabric images.

## Placement Audit

Reviewed again on 2026-05-20 to make sure images were not just visually interesting but contextually right.

| Placement | Image rationale | Decision |
| --- | --- | --- |
| Homepage hero / OG | Close-up scaffolded external wall investigation. Strong first impression for real inspection work without showing a complete identifiable home. | Keep |
| Grade II listed terrace — external moisture | Same scaffolded exposed external masonry/rainwater context. It supports the external moisture and heritage fabric story. | Keep |
| Escape of water in converted factory flat | Ceiling staining and localised moisture marking. It is not a full project scene, but it represents escape-of-water evidence without exposing private details. | Keep |
| Listed barn conversion — no active dampness confirmed | Changed from a stripped/remedial-looking wall to a clean interior conversion room, because the case is about confirming no active dampness rather than showing damage. | Updated |
| Second opinion overturns recommended damp treatment | Roof junction/flashing detail. This directly supports the external defect/rainwater ingress explanation. | Keep |
| Repeated mould complaint traced to ventilation failure | Visible mould growth at ceiling/wall junction. This directly supports mould and ventilation failure copy. | Keep |
| Remedial specification for complex basement moisture | Changed from a thermal image to lower masonry and ground/interface detail, which better fits below-ground moisture pathway and specification thinking. | Updated |
| Damp & mould assessment service | Exposed masonry/fabric detail. Acceptable for broad diagnostic assessment, though future shots showing Rob using instruments would be stronger. | Keep |
| Specialist Damp & Moisture Investigations service | Thermal image showing temperature/moisture pattern context. Strong fit for the technical investigation positioning. | Keep |
| Mould/condensation service | Bathroom/ceiling mould pattern image. Direct fit. | Keep |
| Basement/waterproofing service | Changed to lower masonry and ground/interface detail to better match below-ground waterproofing risk. | Updated |
| External defects service | Roof junction/flashing detail. Direct fit. | Keep |
| Remedial specifications service | Exposed wall/fabric condition where specification decisions are needed. Fit is acceptable. | Keep |

Note: unless Rob confirms exact project-to-photo matching, the images should be treated as representative real project evidence rather than a claim that every card image is from that exact named case.

Public-facing guidance PDFs have been copied into `/public/reports` and linked from the Reports page:

- `condensation-bs-5250.pdf`
- `mould-cleaning-redecoration-ventilation.pdf`
- `understanding-moisture-in-buildings.pdf`
- `why-bedrooms-are-common-rooms-for-mould.pdf`
- `why-damp-keeps-coming-back-after-repairs.pdf`
- `why-does-that-damp-patch-move.pdf`
- `why-external-inspections-matter.pdf`
- `why-most-damp-diagnoses-get-it-wrong.pdf`
- `why-insulation-matters-before-diagnosing-damp.pdf`
- `thermal-imaging-in-damp-diagnosis.pdf`
- `three-moisture-mechanisms.pdf`

## Held Back

The sample report PDFs contain client/property identifiers and should not be published raw. They remain listed as previews until redacted public versions are approved.

The competitor survey PDFs should be treated as internal research only.

## SEO Notes

- Reports page JSON-LD now includes `CreativeWork` URLs and `encodingFormat: application/pdf` for published PDFs.
- The report copy now describes available guidance rather than claiming everything is still pending.
- The production site source still has no `premium building pathology` wording in `src`, `data`, `public`, or `scripts`.

## Duplicate Image Reduction

Reviewed again after feedback that too many repeated images were visible.

- Replaced the homepage hero/OG image with a different real project photo so it no longer mirrors the red scaffolded case-study image.
- Replaced the older shared generated/stock-like general damp assets with distinct real Drive photos for thermal imaging, roof junctions, exposed masonry, mould, inspection context and lower-wall moisture detail.
- Kept the visible case study and service images representative but distinct; some subjects are naturally similar because the supplied project photography is mostly masonry, roof junction, mould and thermal evidence.
- Removed unused older generated/public JPEGs for service cards and gallery cards so the repo no longer carries duplicate-looking legacy assets that are not used by the site.
