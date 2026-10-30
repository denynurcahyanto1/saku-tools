# SakuTools v1.1.0 — More tools, same privacy-first approach

This release expands SakuTools from seven to thirteen tools.

## New tools

- **QR Code Generator** — make downloadable QR images locally, with UTF-8 support and error-correction selection.
- **Color Picker & Converter** — choose a color and copy HEX, RGB, and HSL values.
- **Image Compressor** — compress JPG, PNG, and WebP images in-browser and download the result.
- **Image Resizer** — resize images up to 8192 px per dimension, optionally preserving aspect ratio.
- **Markdown Editor** — edit and preview a safe Markdown subset; raw HTML input is escaped.
- **Timestamp Converter** — convert Unix seconds/milliseconds and local date/time values.

## Improvements

- Updated the service-worker cache version so v1.1 assets are fetched.
- Added a 512×512 PNG app icon alongside the SVG icon for PWA installation.
- Added automated tests for color conversion, timestamp conversion, and QR matrix generation.
- QR generator library is vendored locally under its MIT license; no third-party CDN is used.
- GitHub Pages deployment now runs automated tests before publishing the site.

## Privacy and technical notes

Image files are processed in the browser and are not uploaded to SakuTools. Image tools accept JPEG, PNG, and WebP files up to 20 MB and 40 megapixels. Animated images are converted to still images. Markdown preview escapes raw HTML and supports a small safe subset of Markdown.

## Testing

Run `npm test` with Node.js 20 or newer. Also verify QR output with a phone camera, image downloads in each format, and offline behavior after the first load.
