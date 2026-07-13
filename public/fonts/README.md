# Brand fonts

Drop the licensed font files here with these **exact** filenames and the site will
pick them up automatically (they're wired via `@font-face` in `app/globals.css`).
`.woff2` is preferred; `.otf`/`.ttf` also work if you rename the extension in the
`src` list. Until the files are present, the site falls back to Archivo / Inter /
Barlow Condensed so nothing looks broken.

| Font (role)                                   | Expected file(s)                                            |
| --------------------------------------------- | ----------------------------------------------------------- |
| **Agrandir** — all titles / headlines         | `agrandir.woff2` (and/or `agrandir.otf`)                    |
| **Neue Einstellung** — all body text          | `neue-einstellung.woff2` (and/or `.otf`)                    |
| **FoundationTitlesHand** — navbar wordmark     | `foundation-titles-hand.woff2` (and/or `.otf`)             |
| **FabioloSmallCap Regular** — navbar tagline   | `fabiolo-smallcap.woff2` (and/or `.otf`)                    |

If a family ships as multiple weight files, add extra `@font-face` blocks in
`app/globals.css` (one per weight) pointing at each file.
