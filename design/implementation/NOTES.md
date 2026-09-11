# First implementation — System

Selected reference: `design/mockups/04-system.png`.

## Validation

All final commands completed with exit status 0:

1. `npm run check` — syntax checks of app, project data, build and preview server.
2. `npm test` — PASS: carousel boundaries, three demo projects, owner contacts, unique IDs, anchors, assets, accessibility hooks, no data collection.
3. `npm run build` — `Build complete: dist/index.html`.
4. Bundled Node + `tests/browser.cjs` with bundled Playwright in NODE_PATH — `result: PASS`; exact viewport metrics and behavioral checks are in `verification.json`.

Desktop and mobile screenshots were visually reviewed against the selected reference. During testing, a carousel clipping issue was found and corrected: old slides no longer overlap the project controls. Final browser tests passed for all six widths, 320 through 1440 px.

Browser test environment: installed Google Chrome in an isolated headless profile. The bundled Playwright headless-shell executable was absent, so the test explicitly uses the existing Chrome channel.

## Scope and next content

This is a local first implementation, not a published production site. Project previews are demos, plainly labeled, and have detail dialogs instead of fabricated client URLs. Owner-provided Telegram and email are connected without sending messages automatically. No accounts, customer records, secrets, trackers or tenant data are stored.

## Reversal

All implementation changes are one atomic Git commit. To reverse them without rewriting history, run `git revert <implementation-commit>` from a clean checkout, using the commit shown in the delivery message. Earlier design concepts and untracked `design/assets` are separate from this commit.
