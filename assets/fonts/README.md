# Fonts

Everything here is served from this site. Nothing is loaded from a font service.

| File                        | Font            | Used for               | License                                   | License text            |
| --------------------------- | --------------- | ---------------------- | ----------------------------------------- | ----------------------- |
| `Dracutaz.woff2`            | Dracutaz        | Title lettering        | 1001Fonts Free For Commercial Use (FFC)   | `Dracutaz-LICENSE.txt`  |
| `MPLUS1-latin-wght.woff2`   | M PLUS 1        | Text                   | SIL Open Font License 1.1                 | `MPLUS1-OFL.txt`        |
| `EastSeaDokdo-latin.woff2`  | East Sea Dokdo  | Hand-lettered notes    | SIL Open Font License 1.1                 | `EastSeaDokdo-OFL.txt`  |
| `ReggaeOne-kana.woff2`      | Reggae One      | Japanese sound effects | SIL Open Font License 1.1                 | `ReggaeOne-OFL.txt`     |

## Dracutaz

By Dhabee Studio, from https://www.1001fonts.com/dracutaz-font.html. Free for personal and commercial use. The terms that shape how it is used here:

- **No modification.** The file is the designer's `Dracutaz.ttf` repackaged as WOFF2, which the license allows. Glyphs, names and metrics are untouched. Do not subset it, rename it or edit glyphs.
- **Embedding yes, redistribution no.** A web page may embed it, but must not offer it as a download. Keep only the web font here: do not add the original zip, TTF or OTF to this repository, and do not link to the font file.

## Muneban (not included)

By idealistudio, from https://www.1001fonts.com/muneban-font.html. It is free for personal use only, and its readme says commercial use needs a paid license (sold on Creative Market, linked from that page). A site used to find work is a gray area at best, so it is not shipped here.

East Sea Dokdo stands in for it. To switch once Muneban is licensed for this site:

1. Put `Muneban-Regular.woff2` in this folder.
2. In `css/style.css`, uncomment the `@font-face` block for Muneban near the top.
3. In the same file, put `"Muneban"` first in the `--hand` token.

## The open fonts

M PLUS 1 and East Sea Dokdo are the Latin subsets published by Fontsource, unchanged. Reggae One is cut down to katakana and a few punctuation marks, which the Open Font License permits.
