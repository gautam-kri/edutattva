# Brand fonts (installed)

Self-hosted brand fonts, wired via `@font-face` in `app/globals.css`:

| Family (role) | Files (weight) |
| --- | --- |
| **Agrandir** — titles | `agrandir-regular.woff2` (400), `agrandir-bold.woff2` (700), `agrandir-heavy.woff2` (800–900) |
| **Neue Einstellung** — body | `neue-einstellung-{regular,medium,semibold,bold}.woff2` (400/500/600/700) |
| **FoundationTitlesHand** — navbar/footer wordmark | `foundation-titles-hand-{regular,semibold}.woff2` (400 / 600–900) |
| **FabioloSmallCap Regular** — navbar tagline | `fabiolo-smallcap.woff2` (400) |

To add/replace a weight, drop the `.woff2` in here and add/adjust the matching
`@font-face` block in `app/globals.css`.
