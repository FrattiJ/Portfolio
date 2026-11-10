# Jacob Fratti, personal site

A one-page professional site for the resume: who I am, what I am looking for, experience, projects, skills and education.

Plain HTML, CSS, and JavaScript. No framework, no build step, no dependencies.

## Editing content

**You only need to edit [`js/content.js`](js/content.js).** Every section of the site is generated from it.

| Want to...                      | Edit this in `content.js`                     |
| ------------------------------- | --------------------------------------------- |
| Change headline or intro        | `title`, `tagline`, `intro`                   |
| Change the four numbers         | `highlights`                                  |
| Update About or career goals    | `about`, `goals`                              |
| Add a project                   | Copy an entry in `projects`, set its `group`  |
| Update experience or education  | `resume.experience`, `resume.education`       |
| Add a resume PDF                | Save as `assets/resume.pdf`, set `resume.pdf` |
| Add LinkedIn or email           | `links` (the first link is the main button)   |

Search the file for `TODO` to find what is still waiting on you.

Each project has a shareable link, e.g. `yoursite/#project/pricing-tool` opens that write-up directly. Light and dark mode follow the visitor's system setting, with a toggle in the nav.

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
assets/           resume PDF
```
