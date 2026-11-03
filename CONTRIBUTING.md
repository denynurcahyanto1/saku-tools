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
- Pull requests targeting `main` must pass the `CI / test` check before merge.
- For local preview, run `python -m http.server 8000` in the repository root and open `http://localhost:8000`.

## Pull requests

Explain the user problem, include manual test steps, and add automated tests for reusable core logic where practical. Keep pull requests focused and update the README if user-facing behavior changes. Do not merge until required CI checks pass.

## Verified releases

1. Merge the reviewed change to `main` after CI passes.
2. Update `package.json` to the intended release version and merge that change.
3. Create and push a matching `vMAJOR.MINOR.PATCH` tag on a commit in `main`.
4. In GitHub Actions, run **Verified release** and provide that tag. The workflow confirms the tag is on `main`, checks that it matches `package.json`, and runs `npm test`.
5. The `publish` job waits for approval through the `github-pages` environment, then creates the GitHub Release and deploys that tag to Pages.

### Required GitHub settings

- Protect `main`: require pull requests and require the `CI / test` status check before merging. Disable direct pushes and force pushes for maintainers who should use the reviewed flow.
- In **Settings → Environments → github-pages**, add at least one required reviewer. Without this protection, the publish job is not approval-gated.
- Restrict the `github-pages` environment to the `main` branch and version tags if the repository's environment rules allow both. The workflow itself validates that the selected tag points to `main`.
