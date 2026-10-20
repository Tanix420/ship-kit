# PLAN.md — scope of record

**Rule for agents:** if it is not in this table, do not build it. Propose by
adding a row under "Proposed" and asking the owner.

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| 1 | Static page served from `public/` at `/` | shipped | served by `server.js` |
| 2 | `GET /api/health` JSON endpoint | shipped | returns `{ ok: true }` |
| 3 | Build script producing `dist/` | shipped | `npm run build` |
| 4 | Path-traversal protection on static handler | shipped | returns 403 outside `public/` |
| 5 | 404 handler for unknown paths | shipped | plain text |

## Proposed

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| A | Dark-mode toggle | proposed | waiting owner approval |
| B | `/api/version` endpoint | proposed | would expose build-info.json |

## Definition of shipped

`./verify.sh` green + a test in `test/` covering the feature + this table updated.
