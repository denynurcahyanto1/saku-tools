# SakuTools — Small tools, big help

A free, bilingual (English / Bahasa Indonesia), privacy-first toolbox for everyday tasks and digital work. SakuTools runs in your browser: no account, no app backend, no tool-input uploads, and no third-party runtime libraries.

**Live site:** https://denytyz.github.io/saku-tools/ (available after GitHub Pages deployment succeeds)

## Tools included

| Tool | What it does |
|---|---|
| Text toolkit | Word, character, line, and reading-time counts; uppercase/lowercase/title/sentence case; whitespace cleanup; duplicate-line removal |
| JSON formatter | Parse/validate JSON, pretty-print, or minify |
| Base64 | Unicode-safe text encode/decode |
| URL | Encode/decode URL components |
| Password generator | Generate 8–64 character passwords using browser cryptographic randomness and selectable character sets |
| UUID v4 | Generate one or multiple random v4 identifiers |
| Discount calculator | Calculate savings and final price |

The interface can be switched between English and Bahasa Indonesia. A light/dark theme toggle and service-worker app-shell cache are included. The app can be installed as a PWA in supported browsers.

## Privacy by design

- The application is static; there is no server endpoint for tool inputs.
- Text transformations, JSON parsing, Base64/URL conversions, calculations, password generation, and UUID generation run in the browser.
- The repository includes no analytics, advertising, or external JavaScript dependencies.
- The service worker caches the app shell for offline use after the first successful load.

This is a best-effort privacy design, not a blanket security guarantee. Browser extensions, compromised devices, browser developer tools, or modified deployments can still access page content. Review the source before processing highly sensitive material.

## Run locally

The app has no build step. With Python installed:

```bash
python -m http.server 8000
```

Open http://localhost:8000.

For development tests (Node.js 20+):

```bash
npm test
```

## Deploy to GitHub Pages

The repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml`. Set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. Every push to `main` then publishes the static site, and the workflow can also be run manually from the Actions tab.

The workflow uses GitHub's Pages artifact deployment pattern with `pages: write` and `id-token: write` permissions.

## Project structure

```text
.
├── .github/workflows/deploy.yml
├── assets/
│   ├── css/styles.css
│   ├── icons/icon.svg
│   └── js/
│       ├── app.js
│       └── core.js
├── tests/core.test.js
├── index.html
├── manifest.webmanifest
├── service-worker.js
├── package.json
├── LICENSE
├── SECURITY.md
└── CONTRIBUTING.md
```

## Tech and compatibility

- Semantic HTML, CSS, and vanilla JavaScript modules
- Browser APIs: Web Crypto, Clipboard, Service Worker, Web App Manifest, `TextEncoder` / `TextDecoder`
- Modern browsers are recommended; secure-context browser APIs work on HTTPS and localhost
- No build system or production dependency installation required

## License

MIT — see [LICENSE](LICENSE).
