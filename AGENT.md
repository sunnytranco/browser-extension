# Agent Workflow for Linkwarden Extension

This document outlines the standard operating procedure for the Antigravity AI Agent when working on this project.

## Initialization Checklist (Start of New Session)

Whenever a new session begins or a major context switch occurs, the agent **MUST** perform the following steps before making any code modifications or proposing significant architectural changes:

1. **Read Core Context:**
   - [ ] Read `README.md` to understand the project's high-level purpose and usage.
   - [ ] Read `ARCHITECTURE.md` to understand the tech stack, component structure, and data flow.
   - [ ] Read `AGENT.md` (this file) to refresh the workflow policies.

2. **Verify Environment:**
   - [ ] Check `package.json` to be aware of the dependencies, scripts, and any updates to the tech stack (e.g., Vite, React, Tailwind).
   - [ ] Review `manifest.json` to understand the current extension permissions, background scripts, and entry points.

3. **Assess the Task:**
   - [ ] Determine which part of the extension the task targets (Background, Popup, Options, Content Scripts, etc.).
   - [ ] Identify the shared components (`src/@/components/`) or libraries (`src/@/lib/`) that may need to be updated or utilized.

## Development Guidelines

- **UI consistency:** All new UI components should be built using Tailwind CSS and, if applicable, Radix UI primitives to match the existing design language.
- **Typing:** Strict TypeScript typing should be maintained for all new code.
- **Browser APIs:** Prefer using the `getBrowser()` utility (which abstracts `webextension-polyfill`) for interacting with browser APIs to maintain cross-browser compatibility (Chrome/Firefox).
- **Tooling:** Avoid generic commands when specific APIs are available. Do not modify formatting configs (`.prettierrc`, `.eslintrc.cjs`) unless explicitly requested.
