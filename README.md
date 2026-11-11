# Jacob Fratti, personal site

A one-page professional site for the resume: who I am, what I am looking for, experience, projects, skills and education. It is drawn as a punk manga cover: brush lettering, manga focus lines, price-gun stickers for the headline numbers, panels for the roles, and a night spread of covers for the projects.

Plain HTML, CSS, and JavaScript. No framework, no build step, no dependencies, no third-party requests.

## Editing content

**You only need to edit [`js/content.js`](js/content.js).** Every section of the site is generated from it.

| Want to...                      | Edit this in `content.js`                              |
| ------------------------------- | ------------------------------------------------------ |
| Change headline or intro        | `title`, `tagline`, `intro`                            |
| Change the stickers on the cover | `highlights` (add `was: "..."` to print a markdown)   |
| Update About or career goals    | `about`, `goals`                                       |
| Add a project                   | Copy an entry in `projects`, set its `group`           |
| Update experience or education  | `resume.experience`, `resume.education`                |
| Change the links                | `links` (the first link is the main button)            |

Each project has a shareable link, e.g. `https://frattij.github.io/#project/pricing-tool` opens that write-up directly. The button at the right of the top bar opens a palette picker: Ink and Night (black and white with one red accent, following the visitor's system setting until they choose), plus six palettes that take their ground and lettering colour from Dorohedoro covers. The choice is remembered on that device. The Projects section is always the dark side of the current palette.

Two things live outside `content.js` because link previews cannot run JavaScript: the `<title>` and the `og:` tags at the top of [`index.html`](index.html), and the preview card [`assets/share.jpg`](assets/share.jpg), which is a 1200 x 630 screenshot of the cover. Update them if the name, title or cover changes.

## Look and type

Colors and fonts are tokens at the top of [`css/style.css`](css/style.css). Each palette is one short block there; to add one, copy a block, give it an id, and list it in `PALETTES` in [`js/main.js`](js/main.js).

| Role                   | Font            | License                                              |
| ---------------------- | --------------- | ---------------------------------------------------- |
| Title lettering        | Dracutaz        | 1001Fonts Free For Commercial Use, by Dhabee Studio  |
| Text                   | M PLUS 1        | SIL Open Font License 1.1                            |
| Hand-lettered notes    | East Sea Dokdo  | SIL Open Font License 1.1                            |
| Japanese sound effects | Reggae One      | SIL Open Font License 1.1                            |

All four are self-hosted in [`assets/fonts`](assets/fonts), with their license texts beside them. See [`assets/fonts/README.md`](assets/fonts/README.md) for the terms that matter, including how to switch the hand-lettered notes to Muneban once it is licensed for this site.

## Previewing locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Publishing on GitHub Pages (free)

This repository is named `frattij.github.io`, so with **Settings > Pages > Build and deployment > Source: Deploy from a branch** set to `main` and `/ (root)`, whatever is on `main` is live at https://frattij.github.io/ a minute or two after each merge.

## Structure

```
index.html        page skeleton, link-preview tags
css/style.css     all styling (colors and fonts are tokens at the top)
js/content.js     YOUR CONTENT
js/main.js        renders content into the page
assets/fonts/     self-hosted web fonts and their licenses
assets/           favicon, link-preview card, project images if any
.claude/skills/   design skills for Claude Code sessions (not part of the site)
```

## Design skills for Claude Code

[`.claude/skills`](.claude/skills) holds five skills that Claude Code loads automatically when it works in this repository: Frontend Design, Web Interface Guidelines, UI/UX Pro Max, Web Design Engineer and Playwright CLI. Sources, pinned versions, licenses and update commands are in [`.claude/skills/README.md`](.claude/skills/README.md).
