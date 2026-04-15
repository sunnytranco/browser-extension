# Agent Workflow for Linkwarden Extension

This document outlines the standard operating procedure for the Antigravity AI Agent when working on this project.

---

## Initialization Checklist (Start of New Session)

Whenever a new session begins or a major context switch occurs, the agent **MUST** perform the following steps before making any code modifications or proposing significant architectural changes:

1. **Read Core Context:**
   - [ ] Read `README.md` to understand the project's high-level purpose and usage.
   - [ ] Read `ARCHITECTURE.md` to understand the tech stack, component structure, and data flow.
   - [ ] Read `AGENT.md` (this file) to refresh the workflow policies.

2. **Verify Environment:**
   - [ ] Check `package.json` to be aware of the dependencies, scripts, and any updates to the tech stack (e.g., Vite, React, Tailwind).
   - [ ] Review `manifest.json` to understand the current extension permissions, background scripts, and entry points.

3. **Verify Git State:**
   - [ ] Run `git branch` — confirm the current branch.
   - [ ] If not on `ai-dev`, run `git checkout ai-dev` before doing anything.
   - [ ] Create a new session branch off `ai-dev` (see **Git Workflow** below).

4. **Assess the Task:**
   - [ ] Determine which part of the extension the task targets (Background, Popup, Options, Content Scripts, etc.).
   - [ ] Identify shared components (`src/@/components/`) or libraries (`src/@/lib/`) that may need to be updated or utilized.

---

## Git Workflow

### Permanent Branches
| Branch | Purpose |
|--------|---------|
| `main` | Upstream / stable base — do **not** commit directly |
| `ai-dev` | Primary AI development branch — all agent work lives here |

### Per-Session Branching Rules

Follow this pattern **every working session**:

```
# 1. Start session — ensure we're on ai-dev and up to date
git checkout ai-dev
git pull origin ai-dev

# 2. Create a new session branch named by date + short topic
#    Format: session/YYYY-MM-DD-<short-topic>
git checkout -b session/YYYY-MM-DD-<short-topic>

# 3. Do all work on the session branch

# 4. End session — commit, then merge back into ai-dev
git add -A
git commit -m "<type>: <description>"
git checkout ai-dev
git merge session/YYYY-MM-DD-<short-topic>
git push origin ai-dev

# 5. (Optional) Delete the session branch after merge
git branch -d session/YYYY-MM-DD-<short-topic>
```

### Commit Message Convention
Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` — new feature
- `fix:` — bug fix
- `refactor:` — code restructuring
- `docs:` — documentation only
- `chore:` — tooling, deps, config

### Remote
- **Remote name:** `origin`
- **Remote URL:** `git@github.com:sunnytranco/browser-extension.git`

---

## Development Guidelines

- **UI consistency:** All new UI components must use Tailwind CSS and, where applicable, Radix UI primitives to match the existing design language.
- **Typing:** Strict TypeScript typing must be maintained for all new code.
- **Browser APIs:** Use the `getBrowser()` utility (which wraps `webextension-polyfill`) for cross-browser compatibility (Chrome/Firefox).
- **Config changes:** Any new persistent setting must be added to:
  1. `src/@/lib/validators/config.ts` (schema + type)
  2. `src/@/lib/config.ts` (DEFAULTS + clearConfig)
  3. `src/@/lib/validators/optionsForm.ts` (form schema)
  4. `src/@/components/OptionsForm.tsx` (defaultValues, reset, save, and UI)
- **Tooling:** Do not modify formatting configs (`.prettierrc`, `.eslintrc.cjs`) unless explicitly requested.
- **Build versioning:** Every commit merged into `ai-dev` must update the build version number:
  - In `package.json`: set `"version"` to `"<semver>-ai-b<NNN>"` (e.g., `"1.5.1-ai-b001"`, `"1.5.1-ai-b002"`, ...).
  - In `manifest.json`: the `"version"` field must remain numeric (Chrome/Firefox requirement). Add or update `"version_name"` to the same `"<semver>-ai-b<NNN>"` string — this field is displayed in `chrome://extensions` and is free-form.
  - Increment `<NNN>` by 1 for each new session commit merged to `ai-dev`.
