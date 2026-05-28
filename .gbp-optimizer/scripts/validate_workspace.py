#!/usr/bin/env python3
import argparse
import json
import sys
from pathlib import Path


REQUIRED_FILES = [
    ".gbp-optimizer/client.json",
    ".gbp-optimizer/tasks.md",
    ".gbp-optimizer/audit.md",
    ".gbp-optimizer/cadence.md",
    ".gbp-optimizer/scorecard.json",
    ".gbp-optimizer/scripts/run_cycle.py",
    ".gbp-optimizer/prompts/audit.md",
    ".gbp-optimizer/prompts/computer-use-implementation.md",
    ".gbp-optimizer/prompts/eu-computer-use-preflight.md",
    ".gbp-optimizer/prompts/ghl-api-check.md",
    ".gbp-optimizer/prompts/ghl-social-calendar.md",
    ".gbp-optimizer/prompts/ghl-review-campaign.md",
    ".gbp-optimizer/prompts/approval-draft.md",
    ".gbp-optimizer/prompts/citation-cleanup.md",
    ".gbp-optimizer/prompts/monthly-report.md",
]

REQUIRED_DIRS = [
    ".gbp-optimizer/evidence",
    ".gbp-optimizer/logs",
    ".gbp-optimizer/cycles",
    ".gbp-optimizer/approvals",
    ".gbp-optimizer/social",
]

CLIENT_KEYS = [
    "business_name",
    "gbp_url",
    "website",
    "primary_phone",
    "primary_category",
    "money_services",
    "target_locations",
    "gohighlevel",
    "computer_use",
    "approval_required_for_live_gbp_edits",
]

SCORE_KEYS = [
    "gbp_categories",
    "gbp_completeness",
    "reviews",
    "website_local_relevance",
    "nap_citations",
    "photos_proof_activity",
    "competitor_gap",
    "links_prominence",
    "measurement_process",
]


def check(condition, message, failures):
    if condition:
        print(f"PASS {message}")
    else:
        print(f"FAIL {message}")
        failures.append(message)


def load_json(path, failures):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:
        failures.append(f"Invalid JSON {path}: {exc}")
        return {}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo", default=".", help="Client repository root")
    args = parser.parse_args()
    repo = Path(args.repo).expanduser().resolve()
    failures = []

    for rel in REQUIRED_DIRS:
        check((repo / rel).is_dir(), f"directory exists: {rel}", failures)

    for rel in REQUIRED_FILES:
        check((repo / rel).is_file(), f"file exists: {rel}", failures)

    client_path = repo / ".gbp-optimizer/client.json"
    client = load_json(client_path, failures) if client_path.exists() else {}
    for key in CLIENT_KEYS:
        check(key in client, f"client.json has key: {key}", failures)

    ghl = client.get("gohighlevel", {})
    check("social_planner_enabled" in ghl, "client.json tracks GHL social planner", failures)
    check("review_workflow_id" in ghl, "client.json tracks GHL review workflow", failures)

    cu = client.get("computer_use", {})
    check("require_eu_activate_preflight" in cu, "client.json tracks EU Computer Use preflight", failures)

    score_path = repo / ".gbp-optimizer/scorecard.json"
    score = load_json(score_path, failures) if score_path.exists() else {}
    scores = score.get("scores", {})
    for key in SCORE_KEYS:
        check(key in scores, f"scorecard has area: {key}", failures)

    task_text = (repo / ".gbp-optimizer/tasks.md").read_text(encoding="utf-8", errors="ignore") if (repo / ".gbp-optimizer/tasks.md").exists() else ""
    for phrase in ("Capture current GBP screenshots", "Check NAP consistency", "Compare top 3 local competitors"):
        check(phrase in task_text, f"starter task present: {phrase}", failures)

    prompts = "\n".join(
        p.read_text(encoding="utf-8", errors="ignore")
        for p in (repo / ".gbp-optimizer/prompts").glob("*.md")
    ) if (repo / ".gbp-optimizer/prompts").exists() else ""
    for phrase in ("gohighlevel-social-post-planner", "gohighlevel-api", "codex-computer-use-eu-activate", "approval"):
        check(phrase in prompts, f"prompt coverage includes: {phrase}", failures)

    if failures:
        print("\nWorkspace validation failed:")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print("\nWorkspace validation passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
