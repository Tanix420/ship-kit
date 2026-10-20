# AGENTS.md — Ship Kit agent contract

This file is the single source of truth for any AI coding agent working in this
repo (Claude Code, Cursor, Codex, Copilot, Windsurf...). Humans: the same rules
apply to you.

If any other file conflicts with this one, this file wins.

## 0. Read order
1. `AGENTS.md` (this file)
2. `PLAN.md` (current scope — what is allowed to exist)
3. `README.md` (how to run things)

## 1. The verification loop (most important rule)

You are NOT done when the code looks right. You are done when:

    ./verify.sh

exits `0` and prints `ALL CHECKS PASSED`.

- Run it after every change, before you report anything.
- If it fails: fix the code and re-run. If it fails twice for the same reason,
  STOP and report the exact error output. Do not keep guessing.
- Never edit a test just to make it pass. If you believe a test is wrong, say
  so in one sentence and ask the owner.
- Never report success with fewer checks than `verify.sh` runs.

## 2. Scope guard

- Implement only features listed in `PLAN.md`.
- A feature not in `PLAN.md` does not exist. If you think it should, add it to
  the "Proposed" section of `PLAN.md` and ask the owner. Do not implement it
  "while you're in there".
- One feature per task. No drive-by refactors, no renaming sprees, no
  "improvements" to files you were not asked to touch.

## 3. Conventions

- Stack: Node.js >= 18. Zero runtime dependencies. Nothing to `npm install`.
- `server.js` serves static files from `public/` and exposes `GET /api/health`.
- Tests live in `test/` and use the built-in `node:test` runner. Run: `npm test`.
- Build outputs to `dist/` (never commit `dist/`).
- File names: kebab-case. Functions: small, named, boring on purpose.
- Comments explain WHY, not WHAT.
- No new dependencies without a `PLAN.md` decision by the owner. This is a
  feature, not a formality: dependencies are the #1 way agent projects rot.

## 4. Never touch without owner approval

- `package.json` dependencies
- `.github/`, `LICENSE`, `AGENTS.md` (you may append to "Notes from agents" at
  the bottom; you may not change the rules)
- Files in `verified-snapshots/` if present

## 5. Commit discipline

- Conventional commits: `feat:`, `fix:`, `docs:`, `chore:`, `test:`.
- One logical change per commit.
- `verify.sh` green before every commit. No exceptions.

## 6. Definition of Done

A task is Done only when ALL of these are true:

- [ ] `./verify.sh` exits 0
- [ ] New behavior has a test in `test/`
- [ ] `PLAN.md` status updated for the feature
- [ ] No `TODO` / `FIXME` left in your diff
- [ ] Your summary to the owner is honest: what you did, what you did not do,
      what is untested

## Notes from agents

(Append dated, signed observations here. Do not edit rules above.)
