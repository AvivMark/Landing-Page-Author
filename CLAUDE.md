# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A single-page Hebrew (RTL) landing page for author **יוסיפיה פורת** (Yosifiya Porat). The site is a static site with no build step, framework, or package manager.

## Development

Open `index.html` directly in a browser — no server required:
```bash
open index.html
```

For local development with a server (useful for testing Google OAuth):
```bash
python3 -m http.server 8000
```

There are no tests, linters, or build steps.

## Architecture

The project has two files that matter:

- **`config.js`** — All site content (text, book data, images, contact info, colors, admin auth settings). Designed for non-developers to edit. Comments are in Hebrew. Defines a global `SITE_CONFIG` object.
- **`index.html`** — Single-file page with embedded CSS (~870 lines) and JS (~740 lines). Reads `SITE_CONFIG` at load time and dynamically renders all content.

### Key Concepts

**Config-driven rendering**: All text, images, and colors come from `config.js`. The HTML has empty placeholder elements (e.g., `id="hero-name"`) that JS populates from config. Elements get `data-editable` attributes for inline editing.

**Visual editor**: An in-browser editing system lets authorized users click text/images to edit them directly. Edits are saved to `localStorage` and merged into `SITE_CONFIG` on page load. Users can download an updated `config.js` file.

**Google OAuth gating**: Edit mode is protected by Google Sign-In. The `admin.allowedEmails` array in config controls access. When `googleClientId` is set to `"YOUR_GOOGLE_CLIENT_ID_HERE"`, auth is bypassed for local development.

**Canvas particles**: The hero section uses a `<canvas>` element with floating dust particles, paused via `IntersectionObserver` when not visible.

## Language & RTL

The entire page is in Hebrew with `dir="rtl"`. All UI labels, comments in config.js, and user-facing strings must remain in Hebrew. Fonts: Frank Ruhl Libre (headings), Heebo (body).
