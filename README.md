# Ship Kit lite

**An agent-ready repo template for people who build with AI coding agents.**

You give your AI agent a task. It writes code. Then it declares "done" — and it
isn't: conventions ignored, no tests, scope creep, nothing deployable. Ship Kit
fixes that with one file and one script:

- **`AGENTS.md`** — the contract your agent reads before touching anything:
  read order, conventions, scope rules, commit discipline, and a Definition of
  Done that cannot be faked.
- **`verify.sh`** — the gate. An agent is not done when the code *looks* right.
  It is done when `./verify.sh` exits 0. Syntax check → tests → build, with
  loud failure modes.
- **`PLAN.md`** — scope of record. If a feature isn't in the table, the agent
  doesn't build it.
- **A working zero-dependency demo app** — Node ≥ 18, built-in `node:test`
  runner, static server + JSON endpoint, path-traversal guard. Nothing to
  `npm install`. Nothing to audit.
- **`prompts.md`** — copy-paste prompts that make the agent follow the contract.

## Quickstart

```bash
git clone https://github.com/Tanix420/ship-kit.git your-project
cd your-project
./verify.sh          # gate check — should print ALL CHECKS PASSED
node server.js       # demo app at http://localhost:3000
```

Then open the folder with your AI agent (Claude Code, Cursor, Codex, Copilot…)
and give it **one** task from `PLAN.md`. The point is not the demo app — it is
that every change your agent makes now has to survive `verify.sh`.

## Verified, not promised

Everything below was run by the kit author on **Node v18.20.4** before publishing:

- `./verify.sh` exits 0 and prints `ALL CHECKS PASSED` (syntax sweep, 4 tests, build).
- `node --test test/` → **4/4 pass** (landing page, health endpoint, 404, traversal guard).
- Live smoke test: `GET /` → 200, `GET /api/health` → `{"ok":true}`, unknown path → 404.

If a claim here is ever wrong, open an issue — that is a bug in the product.

## What the paid version adds (planned)

The free repo is the complete core loop. A paid full kit is planned with:
GitHub Actions CI (PR checks), Cursor/Claude-specific instruction variants, a
scope-guard change-request template, release checklist + changelog discipline,
extra prompt playbooks (debug loop, refactor guard, dependency vetting), and a
second template variant. **No buy link until checkout actually exists — nothing
here is for sale yet.**

## Requirements

- Node.js ≥ 18 (uses only built-ins: `node:test`, `node:http`, `node:fs`)
- bash (for `verify.sh`)

## License

MIT.
