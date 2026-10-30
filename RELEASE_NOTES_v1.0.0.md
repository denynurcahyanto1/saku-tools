# SakuTools v1.0.0

**Release date:** 2026-10-30

SakuTools v1.0.0 is the first public release of a free, privacy-first toolbox for everyday digital tasks and developer workflows.

## What's included

- **Text Toolkit** — count words, characters, lines, and estimated reading time; change letter case; clean whitespace; remove duplicate lines.
- **JSON Formatter** — validate, pretty-print, and minify JSON.
- **Base64 Encoder / Decoder** — Unicode-safe text conversion.
- **URL Encoder / Decoder** — encode and decode URL components.
- **Password Generator** — generate 8–64 character passwords with selectable character groups using the browser Web Crypto API.
- **UUID v4 Generator** — generate one or more random UUID v4 identifiers.
- **Discount Calculator** — calculate savings and final prices.

## App experience

- English and Bahasa Indonesia interface.
- Dark and light themes.
- Responsive desktop and mobile layout.
- Progressive Web App manifest and installable app experience.
- Service-worker app-shell caching for offline use after the first successful visit.
- No account, tool-input upload endpoint, analytics, advertisements, or third-party runtime JavaScript dependencies.

## Quality checks

The project includes a Node.js test suite for core utility functions. The maintainer's reported manual acceptance test passed all seven tools and the desktop, mobile, theme, language, and offline checks in Chrome.

To run the automated tests locally:

```bash
npm test
```

## Install / use

Open the GitHub Pages site after deployment:

https://denytyz.github.io/saku-tools/

## Notes

SakuTools processes tool inputs in the browser. This is a privacy-oriented design, not an absolute security guarantee; browser extensions, compromised devices, and modified deployments may still access page content. Review the source before using any browser tool with highly sensitive information.

## Contributors

Created and maintained by [DenyTyz](https://github.com/DenyTyz).

Released under the [MIT License](LICENSE).
