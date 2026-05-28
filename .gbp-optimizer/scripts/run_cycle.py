#!/usr/bin/env python3
import argparse
import json
import os
from datetime import date
from pathlib import Path


CHECKS = {
    "weekly": [
        ("reviews", "Check new reviews and draft replies."),
        ("photos", "Request or upload fresh real work photos."),
        ("posts", "Draft one GBP post focused on proof, FAQ, offer, or seasonal need."),
        ("competitors", "Capture obvious competitor movement: reviews, photos, posts, categories.")
    ],
    "monthly": [
        ("profile", "Audit GBP categories, services, products, description, links, hours, attributes, photos, Q&A."),
        ("website", "Audit GBP-linked page for local relevance, NAP, schema, trust proof, CTA, and service depth."),
        ("nap", "Check NAP consistency across site, schema, GBP, and important citations."),
        ("reviews", "Review velocity, unanswered reviews, review request campaign, and competitor review gap."),
        ("tasks", "Re-rank the action queue by impact, confidence, ease, and risk.")
    ],
    "quarterly": [
        ("strategy", "Reassess primary category, money services, service areas, and location-page strategy."),
        ("competitors", "Run full competitor gap analysis."),
        ("citations", "Plan citation cleanup/building and genuine local/industry backlinks."),
        ("technical", "Check schema, indexability, mobile UX, speed, tracking, and conversion paths."),
        ("reporting", "Summarise ranking, leads, review growth, and completed optimisations.")
    ]
}


REQUIRED_CLIENT_FIELDS = [
    "business_name",
    "gbp_url",
    "website",
    "primary_phone",
    "primary_category",
    "money_services",
    "target_locations"
]


def load_json(path):
    if not path.exists():
        return {}
    return json.loads(path.read_text(encoding="utf-8"))


def missing_client_fields(client):
    missing = []
    for field in REQUIRED_CLIENT_FIELDS:
        value = client.get(field)
        if value in ("", None, []):
            missing.append(field)
    return missing


def discover_site_signals(repo):
    candidates = []
    for pattern in ("**/*.html", "**/*.tsx", "**/*.jsx", "**/*.astro", "**/*.md", "**/*.json"):
        candidates.extend(repo.glob(pattern))
    skip = {".git", "node_modules", "dist", "build", ".next", ".gbp-optimizer"}
    signals = {
        "local_business_schema": False,
        "nap_terms": False,
        "reviews_or_testimonials": False,
        "service_area_terms": False,
        "map_or_directions": False,
        "tap_to_call": False,
    }
    scanned = 0
    for path in candidates[:400]:
        if any(part in skip for part in path.parts):
            continue
        try:
            text = path.read_text(encoding="utf-8", errors="ignore").lower()
        except OSError:
            continue
        scanned += 1
        signals["local_business_schema"] |= "localbusiness" in text or "schema.org" in text
        signals["nap_terms"] |= "address" in text and ("phone" in text or "tel:" in text)
        signals["reviews_or_testimonials"] |= "review" in text or "testimonial" in text
        signals["service_area_terms"] |= "service area" in text or "areas we cover" in text
        signals["map_or_directions"] |= "google.com/maps" in text or "directions" in text
        signals["tap_to_call"] |= "tel:" in text
    return scanned, signals


def append_task(tasks_path, priority, task, evidence, impact="Medium", risk="Low"):
    line = f"| {priority} | {task} | {evidence} | {impact} | {risk} | Codex | Open |\n"
    existing = tasks_path.read_text(encoding="utf-8") if tasks_path.exists() else ""
    if task in existing:
        return False
    marker = "## Completed"
    if marker in existing:
        existing = existing.replace(marker, line + marker)
    else:
        existing += "\n" + line
    tasks_path.write_text(existing, encoding="utf-8")
    return True


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo", default=".", help="Client repo root")
    parser.add_argument("--mode", choices=["weekly", "monthly", "quarterly"], default="monthly")
    args = parser.parse_args()

    repo = Path(args.repo).resolve()
    root = repo / ".gbp-optimizer"
    root.mkdir(exist_ok=True)
    cycles = root / "cycles"
    cycles.mkdir(exist_ok=True)
    approvals = root / "approvals"
    approvals.mkdir(exist_ok=True)

    client = load_json(root / "client.json")
    missing = missing_client_fields(client)
    scanned, site_signals = discover_site_signals(repo)
    ghl = client.get("gohighlevel", {})
    computer_use = client.get("computer_use", {})
    ghl_env_ready = bool(os.environ.get("HIGHLEVEL_TOKEN") and os.environ.get("HIGHLEVEL_LOCATION_ID"))

    today = date.today().isoformat()
    report = cycles / f"{today}-{args.mode}.md"

    lines = [
        f"# GBP Optimisation Cycle: {today} ({args.mode})",
        "",
        "## Client",
        "",
        f"- Business: {client.get('business_name') or 'Missing'}",
        f"- GBP: {client.get('gbp_url') or 'Missing'}",
        f"- Website: {client.get('website') or 'Missing'}",
        f"- Primary category: {client.get('primary_category') or 'Missing'}",
        f"- GoHighLevel enabled: {'yes' if ghl.get('enabled') else 'no'}",
        f"- GHL env present: {'yes' if ghl_env_ready else 'no'}",
        f"- Computer Use EU preflight required: {'yes' if computer_use.get('require_eu_activate_preflight', True) else 'no'}",
        f"- Computer Use last verified: {computer_use.get('last_verified') or 'Missing'}",
        "",
        "## Setup Gaps",
        ""
    ]
    if missing:
        lines.extend([f"- Missing `{field}` in `client.json`." for field in missing])
    else:
        lines.append("- No required client fields are missing.")

    lines.extend(["", "## Site Signal Scan", "", f"- Files scanned: {scanned}"])
    for key, value in site_signals.items():
        lines.append(f"- {key}: {'yes' if value else 'no'}")

    lines.extend(["", "## Due Checks", ""])
    for key, description in CHECKS[args.mode]:
        lines.append(f"- [{key}] {description}")

    lines.extend(["", "## Integration Checks", ""])
    if ghl.get("enabled"):
        lines.append("- GHL is enabled in client.json.")
        if ghl_env_ready:
            lines.append("- GHL environment variables are present; run `prompts/ghl-api-check.md` before writes.")
        else:
            lines.append("- GHL environment variables are missing; authenticated GHL actions are blocked.")
        if ghl.get("social_planner_enabled"):
            lines.append("- GHL Social Planner is enabled; use `prompts/ghl-social-calendar.md` for GBP post CSV planning.")
    else:
        lines.append("- GHL is not enabled in client.json; use CSV/post drafts only unless the client uses GHL.")

    if computer_use.get("require_eu_activate_preflight", True) and not computer_use.get("last_verified"):
        lines.append("- Computer Use has not been verified; run `prompts/eu-computer-use-preflight.md` before live browser edits.")

    lines.extend([
        "",
        "## Recommended Next Actions",
        "",
        "Use the google-business-optimizer skill to turn this report into a ranked `tasks.md` update and any approval drafts needed.",
    ])

    report.write_text("\n".join(lines) + "\n", encoding="utf-8")

    tasks = root / "tasks.md"
    added = 0
    for field in missing:
        if append_task(tasks, "P0", f"Fill client.json `{field}`", "Cycle setup gap", "High", "Low"):
            added += 1
    if not site_signals["local_business_schema"]:
        added += append_task(tasks, "P1", "Check/add LocalBusiness schema on the GBP-linked page", "Site scan did not find LocalBusiness/schema.org", "High", "Medium")
    if not site_signals["tap_to_call"]:
        added += append_task(tasks, "P1", "Check/add tap-to-call phone link on key local pages", "Site scan did not find tel: link", "Medium", "Low")
    if not site_signals["reviews_or_testimonials"]:
        added += append_task(tasks, "P1", "Add review/testimonial proof to GBP-linked page", "Site scan did not find review/testimonial language", "High", "Low")
    if ghl.get("enabled") and not ghl_env_ready:
        added += append_task(tasks, "P0", "Provide/test GoHighLevel credentials before authenticated GHL actions", "GHL enabled but HIGHLEVEL_TOKEN/HIGHLEVEL_LOCATION_ID missing", "High", "Low")
    if ghl.get("social_planner_enabled"):
        added += append_task(tasks, "P1", "Create next GBP post batch with GoHighLevel Social Planner CSV", "GHL Social Planner enabled in client.json", "Medium", "Low")
    if computer_use.get("require_eu_activate_preflight", True) and not computer_use.get("last_verified"):
        added += append_task(tasks, "P0", "Run EU Computer Use preflight before live GBP browser edits", "Computer Use not verified in client.json", "High", "Low")

    print(f"Wrote {report}")
    print(f"Added {added} task(s)")


if __name__ == "__main__":
    main()
