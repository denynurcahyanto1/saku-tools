# SakuTools — Small tools, big help

**Current version: v1.1.0**

A free, bilingual (English / Bahasa Indonesia), privacy-first toolbox for everyday tasks and digital work. SakuTools runs in your browser: no account, no app backend, no tool-input uploads, and no remote runtime dependencies.

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
| QR Code generator | Create downloadable QR images locally with UTF-8 support |
| Color picker | Choose colors and convert HEX, RGB, and HSL values |
| Image compressor | Compress JPG, PNG, and WebP images in the browser |
| Image resizer | Resize images with an optional aspect-ratio lock |
| Markdown editor | Write and preview a safe Markdown subset; raw HTML is escaped |
| Timestamp converter | Convert Unix seconds/milliseconds and local date/time |

The interface can be switched between English and Bahasa Indonesia. A light/dark theme toggle and service-worker app-shell cache are included. The app can be installed as a PWA in supported browsers.

## Privacy by design

- The application is static; there is no server endpoint for tool inputs.
- Text transformations, JSON parsing, Base64/URL conversions, calculations, password generation, UUID generation, QR creation, color conversion, Markdown preview, and image processing run in the browser.
- The repository includes no analytics, advertising, or remote JavaScript dependencies. QR generation uses a locally bundled MIT-licensed library.
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
│   ├── icons/icon.svg, icon-192.png, icon-512.png
│   └── js/
│       ├── app.js
│       ├── core.js
│       └── vendor/ (qrcode-generator, MIT)
├── tests/core.test.js and qr.test.js
├── index.html
├── manifest.webmanifest
├── service-worker.js
├── package.json
├── LICENSE
├── THIRD_PARTY_NOTICES.md
├── RELEASE_NOTES_v1.1.0.md
├── SECURITY.md
└── CONTRIBUTING.md
```

## Tech and compatibility

- Semantic HTML, CSS, and vanilla JavaScript modules
- Browser APIs: Web Crypto, Clipboard, Service Worker, Web App Manifest, `TextEncoder` / `TextDecoder`
- Modern browsers are recommended; secure-context browser APIs work on HTTPS and localhost
- No build system or production dependency installation required

## Third-party notices

QR Code generation uses [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) by Kazuhiko Arase, licensed under MIT. The source is bundled locally; it is not loaded from a remote CDN. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## License

The SakuTools application is MIT-licensed — see [LICENSE](LICENSE). The vendored QR library retains its upstream MIT copyright notice.
