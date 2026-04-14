#!/usr/bin/env bash
# Generate damp-specialist marketing images with nano-banana, then convert to WebP for src/assets/general.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
NB=~/.local/bin/nano-banana
PUB="$ROOT/public/assets"
GEN="$ROOT/src/assets/general"
AREAS="$ROOT/src/assets/areas"
mkdir -p "$PUB" "$GEN" "$AREAS"

gen() {
  local prompt=$1
  local out=$2
  local aspect=${3:-16:9}
  local size=${4:-2K}
  local dir=${5:-$PUB}
  echo "=== $out ($dir) ==="
  "$NB" "$prompt" -o "$out" -a "$aspect" -s "$size" -d "$dir"
}

to_webp() {
  local jpeg=$1
  local webp=$2
  cwebp -q 85 "$jpeg" -o "$webp" 2>/dev/null || magick "$jpeg" -quality 85 "$webp"
}

# --- Public /assets (*.jpeg referenced in components) ---
gen "Photorealistic wide 16:9 hero: UK chartered building surveyor in hi-vis vest using a pin-type moisture meter on a plastered interior wall of a period terraced house, clipboard, natural daylight, calm professional documentary photography, no text, no logos" "true-damp-hero-survey"

gen "Same subject matter as a damp survey hero: surveyor assessing wall moisture in a British home interior, cinematic natural light, suitable for social sharing, no text, no logos" "true-damp-hero-og" "16:9"

gen "Two professional building consultants in smart-casual attire reviewing damp survey photographs and floor plans on a laptop at a tidy office desk, UK setting, trustworthy team shot, no logos, no readable text" "true-damp-diagnostics-team" "4:3"

gen "Close-up of surveyor with thermal imaging camera aimed at an interior corner, subtle heat map on display, UK residential property, technical and credible, no text overlays" "true-damp-service-survey" "4:3"

gen "Building pathology inspection: surveyor inspecting exposed timber and masonry with endoscope-style tool, dust sheet, careful diagnostics mood, UK home, no text" "true-damp-service-diagnostics" "4:3"

gen "Mould and condensation context: well-lit bedroom corner with visible mould staining being inspected with moisture meter, ventilation grille in frame, factual documentary style, no text" "true-damp-service-mould" "4:3"

gen "Basement waterproofing: white tanking membrane and drainage channel detail being checked by a specialist in a UK basement conversion, clean professional site photo, no text" "true-damp-service-waterproofing" "4:3"

gen "Exterior defects survey: surveyor on ladders inspecting brickwork, pointing and gutterline of a UK semi-detached house, overcast daylight, no text, no logos" "true-damp-service-external" "4:3"

gen "Desk scene: damp report draft on screen, highlighted specification notes, ruler and scale bar, professional consultant preparing remedial specification, no readable client text" "true-damp-service-specifications" "4:3"

gen "Before and after style split feel in one image: left side damp stained wall, right side repaired replastered wall in a UK living room, balanced composition, realistic, no text" "true-damp-portfolio-case-study-1" "16:9"

gen "Mould remediation case study: cleaned treated wall area with air mover equipment in a UK flat, professional restoration photography, no text" "true-damp-portfolio-case-study-2" "16:9"

gen "Basement waterproofing completion: tidy tanked walls and light well in a UK basement, bright and reassuring, no text" "true-damp-portfolio-case-study-3" "16:9"

# --- src/assets/general: generate JPEG in public then convert to expected .webp filenames ---
gen "Soft-focus background plate: blurred interior of UK home during damp survey, surveyor silhouette, neutral warm tones, suitable as website section backdrop behind text, no text" "tmp-general-cta" "21:9" "2K"
to_webp "$PUB/tmp-general-cta.jpeg" "$GEN/kitchen-before-after-kitchen-wrapping-1.webp"

gen "Wide interior of a UK hallway and living room with natural light, welcoming contact page hero background, no people, no text" "tmp-contact-hero" "21:9" "2K"
to_webp "$PUB/tmp-contact-hero.jpeg" "$GEN/furniture-wrapping-2.webp"

gen "Plain white UK commercial panel van parked on a residential street, side view, generic unbranded vehicle suitable as stock, daylight, no logos or readable text" "tmp-van" "16:9" "2K"
to_webp "$PUB/tmp-van.jpeg" "$GEN/branded-van-wraps-and-tints.webp"

gen "Modern UK apartment building facade and entrance, architectural photography, overcast sky, clean lines, quote page hero background, no text" "tmp-arch" "21:9" "2K"
to_webp "$PUB/tmp-arch.jpeg" "$GEN/architectural-film-6.webp"

gen "Residential living room corner before remediation: visible damp staining low on wall, factual photo" "tmp-gal-furniture" "4:3" "2K"
to_webp "$PUB/tmp-gal-furniture.jpeg" "$GEN/furniture-before-after-wrapping-2.webp"

gen "Commercial office corridor with water stain on ceiling tile being inspected, UK building, documentary" "tmp-gal-office" "4:3" "2K"
to_webp "$PUB/tmp-gal-office.jpeg" "$GEN/office-space-wrapping-result.webp"

gen "Built-in wardrobe wall with damp patch at skirting in UK bedroom, inspection context" "tmp-gal-wardrobe" "4:3" "2K"
to_webp "$PUB/tmp-gal-wardrobe.jpeg" "$GEN/wardrobe-wrapping-result-4.webp"

gen "Refurbished kitchen with neutral cabinets after damp-related replastering, bright and clean, stock interior" "tmp-gal-k1" "4:3" "2K"
to_webp "$PUB/tmp-gal-k1.jpeg" "$GEN/kitchen-grey-gloss-island.webp"

gen "Kitchen diner with wood-effect units, family home UK, natural light" "tmp-gal-k2" "4:3" "2K"
to_webp "$PUB/tmp-gal-k2.jpeg" "$GEN/kitchen-grey-wood-concrete.webp"

gen "Contemporary dark kitchen units with under-cabinet lighting, moody but professional interior photo" "tmp-gal-k3" "4:3" "2K"
to_webp "$PUB/tmp-gal-k3.jpeg" "$GEN/kitchen-black-gloss-backlit.webp"

gen "Kitchen with blue painted units and marble-effect worktop, UK home, daytime" "tmp-gal-k4" "4:3" "2K"
to_webp "$PUB/tmp-gal-k4.jpeg" "$GEN/kitchen-royal-blue-marble.webp"

gen "UK specialist inspecting exterior cavity wall with borescope cable, brick house, detail shot" "tmp-gal-jag" "16:9" "2K"
to_webp "$PUB/tmp-gal-jag.jpeg" "$GEN/jaguar-window-tinting.webp"

gen "Ground-level view of French doors and patio of UK house, drainage channel visible, moisture survey context" "tmp-gal-ford" "16:9" "2K"
to_webp "$PUB/tmp-gal-ford.jpeg" "$GEN/ford-focus-window-tinting.webp"

# Blog / cards icon
"$NB" "Minimal flat app icon: house silhouette with single water droplet, teal and slate colours, centred, square, no text, no letters" -o tmp-logo-icon -a 1:1 -s 512 -d "$PUB"
to_webp "$PUB/tmp-logo-icon.jpeg" "$ROOT/src/assets/logo-icon.webp"

# Area thumbnails (generic UK street scenes; filenames match area slugs)
area_gen() {
  local slug=$1
  local place=$2
  echo "=== area $slug ==="
  "$NB" "Aerial oblique photograph of typical ${place} UK residential streets and rooftops, soft daylight, realistic, no text, no logos" -o "$slug" -a 16:9 -s 1K -d "$AREAS"
  magick "$AREAS/${slug}.jpeg" -resize 1200x675^ -gravity center -extent 1200x675 "$AREAS/${slug}.png"
  rm -f "$AREAS/${slug}.jpeg"
}

area_gen "watford" "Watford Hertfordshire suburban"
area_gen "central-london" "Central London dense terraces and mansion blocks"
area_gen "st-albans" "St Albans historic cathedral city"
area_gen "high-wycombe" "High Wycombe Chilterns edge town"
area_gen "luton" "Luton Bedfordshire urban residential"
area_gen "hemel-hempstead" "Hemel Hempstead new town residential"
area_gen "oxford" "Oxford spires and rooftops"
area_gen "aylesbury" "Aylesbury Buckinghamshire market town"

# Remove temp JPEGs used only for conversion
rm -f "$PUB"/tmp-*.jpeg

echo "Done. Verify: ls $PUB/*.jpeg $GEN/*.webp $AREAS/*.png"
