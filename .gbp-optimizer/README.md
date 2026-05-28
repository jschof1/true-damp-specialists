# GBP Optimizer Workspace

This folder turns the client repo into an ongoing Google Business Profile and local SEO operating system.

Start with:

1. Fill `client.json`.
2. Run the prompts in `prompts/` with current GBP/site evidence.
3. Keep `tasks.md`, `audit.md`, `logs/`, and `evidence/` updated after every optimisation cycle.

Live GBP edits require approval unless `client.json` explicitly says otherwise.

Useful commands:

```bash
python3 .gbp-optimizer/scripts/run_cycle.py --mode weekly
python3 .gbp-optimizer/scripts/run_cycle.py --mode monthly
python3 .gbp-optimizer/scripts/validate_workspace.py
```
