# prompts.md — copy-paste prompts that make agents follow the contract

These assume your agent reads `AGENTS.md` (Claude Code reads `CLAUDE.md`/repo
instructions automatically; for others, paste the file or use the tool's rules
feature). Each prompt below ends with the only definition of "done" the agent
is allowed to have.

---

### 1. First task (cold start)

> Read AGENTS.md and PLAN.md fully before doing anything. Then implement task
> #1 from PLAN.md. Follow every convention in AGENTS.md. When you believe you
> are done, run `./verify.sh` and show me the full output. You are done only if
> it prints ALL CHECKS PASSED. If it fails, fix and re-run; if it fails twice
> for the same reason, stop and show me the exact error.

### 2. The verify loop (use after every change)

> Make the change, then run `./verify.sh`. Paste its output in your reply
> verbatim. Do not summarize it — paste it. If any line says VERIFY FAILED,
> you are not done.

### 3. Scope-creep blocker

> Before you write any code: list the exact feature(s) from PLAN.md you are
> about to implement. If your planned work includes anything not in PLAN.md,
> add it to "Proposed" and ask me first. Do not refactor files unrelated to
> this task.

### 4. Test-or-it-didn't-happen

> Every new behavior needs a test in test/ using node:test. Write the test
> first, watch it fail, then implement until `./verify.sh` passes. Show me the
> failing output before the fix and the passing output after.

### 5. The honest report (end of task)

> Report: (1) what you changed, (2) which PLAN.md row this maps to, (3) the
> final verify.sh output, (4) anything you did NOT test, (5) any TODO/FIXME you
> left and why. If any answer is "none", say "none" — do not pad.

### 6. Dependency refusal

> Do not add any dependency. If you believe one is required, stop, add it to
> PLAN.md under Proposed with a one-line justification, and ask me. The stack
> is Node built-ins only by decision, not by accident.

---

**Why these work:** they replace the agent's private definition of "done" with
one that is external (`verify.sh` output you can see), visible (paste, don't
summarize), and slow to cheat (tests before implementation). The contract does
the parenting so you don't have to.
