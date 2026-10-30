# Contributing to SakuTools

Thanks for helping make practical tools available to more people.

## Principles

1. Prefer small, focused tools that solve a real task.
2. Keep processing in the browser. Do not introduce uploads, analytics, advertising, or remote execution for tool inputs.
3. Avoid runtime dependencies unless they provide a clear accessibility, security, or maintenance benefit.
4. Support keyboard navigation, readable contrast, clear errors, and reduced-motion preferences.
5. Never implement security-sensitive randomness with `Math.random()`.

## Development

- Requires Node.js 20 or newer for the test suite.
- The app itself is static and has no build step or runtime package dependencies.
- Run tests with `npm test`.
- For local preview, run `python -m http.server 8000` in the repository root and open `http://localhost:8000`.

## Pull requests

Explain the user problem, include manual test steps, and add automated tests for reusable core logic where practical. Keep pull requests focused and update the README if user-facing behavior changes.
