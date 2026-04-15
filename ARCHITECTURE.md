# Linkwarden Browser Extension Architecture

## Overview

This project is a browser extension for [Linkwarden](https://github.com/linkwarden/linkwarden), built using Manifest V3. It provides users with the ability to add links, save all open tabs, and search their Linkwarden bookmarks directly from the browser.

## Tech Stack

- **Core:** React, TypeScript, HTML, CSS
- **Build Tool:** Vite (with `@vitejs/plugin-react` and `webextension-polyfill`)
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI primitives (shadcn/ui style component architecture), `lucide-react` for icons, `react-hook-form` + `zod` for form validation
- **Browser API:** Standard WebExtensions API (compatible with Chrome and Firefox)

## Project Structure

The project is structured into several key entry points typical for a browser extension:

### 1. Background Script / Service Worker (`src/pages/Background/index.ts`)
This is the core background process of the extension. It handles:
- **Context Menus:** Creating and handling right-click context menu actions ("Add link to Linkwarden", "Save all tabs to Linkwarden").
- **Omnibox (Address Bar) Integration:** Allows users to type `lk` followed by a space in the address bar to search their Linkwarden bookmarks or quickly add links.
- **Badge Updates:** Listens for tab changes and activations to update the extension icon's badge.
- **Bookmark Syncing (WIP/Commented Out):** There is code in place (currently commented out) designed to sync native browser bookmarks with Linkwarden.

### 2. Popup (`src/pages/Popup/`)
The React application injected into the small popup window when the user clicks the extension icon in the toolbar.
- Provides a form (`BookmarkForm.tsx`) to quickly save the current tab to Linkwarden.
- Handles theme toggling and links to the Options page.

### 3. Options (`src/pages/Options/`)
The React application for the extension's settings page.
- Allows the user to configure the connection to their Linkwarden instance (`Base URL`, `API Key`).
- Configures default saving preferences (e.g., Default Collection).

### 4. Shared Libraries (`src/@/lib/` & `src/@/components/`)
- **`components/`**: Reusable React components, largely composed of Radix UI primitives and styled with Tailwind.
- **`lib/`**: Utility functions, including API fetching logic (`actions/links.ts`), configuration management (`config.ts`), caching mechanisms (`cache.ts`), and general browser utilities (`utils.ts`).

## Data Flow
1. **Configuration:** User sets up their Base URL and API credentials in the Options page. This config is saved using the browser's storage API.
2. **Action:** User interacts with the extension (e.g., clicks "Save" in the popup, uses the context menu to save tabs).
3. **Execution:** The extension uses `fetch` (via functions in `src/@/lib/actions/links.ts`) to communicate with the user's configured Linkwarden API endpoint.
