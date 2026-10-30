# Security Policy

## Supported versions

Only the latest version on the `main` branch is currently supported.

## Reporting a vulnerability

Please do not publish exploitable security details in a public issue. Contact the maintainer through the email address listed on the GitHub profile, or use GitHub's private vulnerability reporting feature if enabled for this repository.

## Privacy and security notes

- The app has no application backend and does not intentionally transmit tool inputs.
- Password generation uses the browser Web Crypto API (`crypto.getRandomValues`).
- Do not treat a generated password as a substitute for a reputable password manager or your organization's credential policy.
- Review browser extensions and the source code before using any browser-based tool with sensitive data.
