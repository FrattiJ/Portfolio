# FrattiJ Portfolio

One place for everything: code projects, resume, videos, art, and what is coming next.

Plain HTML, CSS, and JavaScript. No framework, no build step, no dependencies.

## Editing content

**You only need to edit [`js/content.js`](js/content.js).** Every section of the site is generated from it.

| Want to...                 | Edit this in `content.js`                         |
| -------------------------- | ------------------------------------------------- |
| Change name, tagline, bio  | `name`, `tagline`, `intro`, `about`               |
| Add a project              | Copy an entry in `projects` and change it         |
| Write "how I did it"       | The `process` list inside a project               |
| Update plans               | `roadmap` (columns: `now`, `next`, `later`)       |
| Add a YouTube video        | `youtube.videos` (use the ID after `v=` in a URL) |
| Add artwork                | Put the image in `assets/art/`, add to `art`      |
| Update resume              | `resume.experience`, `resume.education`           |
| Add a resume PDF           | Save as `assets/resume.pdf`, set `resume.pdf`     |

Search the file for `TODO` to find every placeholder.

Things that happen automatically:

- Your latest public GitHub repos are pulled in live under "Latest on GitHub" (set `githubUser` to `""` to turn off).
- The Videos section shows a "coming soon" panel with your planned topics until you add your first video.
- Projects and art without images get a generated color tile, so nothing looks broken while you fill things in.
- Each project has a shareable link, e.g. `yoursite/#project/this-site` opens that project directly.
- Light and dark mode follow the visitor's system setting, with a toggle in the nav.

## Previewing locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Publishing on GitHub Pages (free)

1. Merge this into your `main` branch.
2. On GitHub: **Settings > Pages > Build and deployment > Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
3. The site will be live at `https://frattij.github.io/Portfolio/` within a minute or two.

For a nicer URL, rename the repo to `FrattiJ.github.io` and it will be served at `https://frattij.github.io/`. You can also attach a custom domain in the same Pages settings.

## Structure

```
index.html        page skeleton
css/style.css     all styling (colors are tokens at the top)
js/content.js     YOUR CONTENT
js/main.js        renders content into the page
assets/           images, art, resume PDF
```
