# SakuTools v1.1.2

## Image processing reliability

- Ignore Image Compressor and Image Resizer results when the selected file changes or is cleared while processing is still running.
- Ignore errors from obsolete processing jobs so they do not replace the current selection's status.
- Prevent slower image decoding from overwriting dimensions belonging to a newer Image Resizer selection.

## Cache refresh

- Updated static asset cache keys and the service worker shell cache so clients fetch the v1.1.2 code after deployment.

## Verification status

This is a release candidate. Automated tests and manual browser verification of file replacement, clearing, and rapid selection changes must pass before publishing.
