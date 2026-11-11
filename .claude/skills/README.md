# Design skills in this project

Claude Code loads every folder here that has a `SKILL.md`. These are copies of public skills, pinned to the commit that was reviewed on 2026-11-11. They are tooling for working on the site and are not part of the site itself.

| Skill folder             | What it is for                                         | Source                                                                                   | Pinned commit | License                    |
| ------------------------ | ------------------------------------------------------ | ---------------------------------------------------------------------------------------- | ------------- | -------------------------- |
| `frontend-design`        | Art direction: palette, type, layout, avoiding defaults | https://github.com/anthropics/skills (`skills/frontend-design`)                          | `2c5958e`     | Apache 2.0 (`LICENSE.txt`) |
| `web-design-guidelines`  | Audit against the Vercel Web Interface Guidelines      | https://github.com/vercel-labs/agent-skills (`skills/web-design-guidelines`)             | `1a2c79d`     | MIT, per the repository README |
| `ui-ux-pro-max`          | Searchable styles, palettes, pairings, UX rules        | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill (v2.15.0)                        | `6ae86f6`     | MIT (`LICENSE`)            |
| `web-design-engineer`    | Design process, redesign protocol, critique rubric     | https://github.com/ConardLi/garden-skills (`skills/web-design-engineer`)                 | `08150e7`     | MIT (`LICENSE`)            |
| `playwright-cli`         | Browser checks from the terminal                       | https://github.com/microsoft/playwright-cli (`skills/playwright-cli`)                    | `8297c9b`     | Apache 2.0 (`LICENSE`)     |

Notes:

- `ui-ux-pro-max/SKILL.md` is rendered from that project's own template the way its installer does for a per-project Claude Code install, so its commands point at `.claude/skills/ui-ux-pro-max/scripts/search.py`. Only the main skill is here. Its installer also adds six companion skills (brand, slides, banner design and so on) that this site has no use for.
- `web-design-guidelines` fetches the current rules from https://github.com/vercel-labs/web-interface-guidelines each time it runs.
- `playwright-cli` needs the `playwright-cli` command, or a Playwright install recent enough to offer `npx playwright cli`.

## Not installed: Taste Skill

`design-taste-frontend` (https://github.com/Leonxlnx/taste-skill, MIT, reviewed at `f6b7657`) is not copied in. Version 2.5 is a 40 MB kit of 1,631 files (stock photographs, 3D renders, icon sets, shader effects) built to produce clean company sites in the style of figma.com, and its house rules (nothing tilted, no grain, flat grounds, a dealt palette, real photographs) pull against this site's look. To add it anyway:

```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend" --agent claude-code --copy
```

## Updating

Run the matching command from the repository root, then review the diff before committing.

```bash
npx skills add anthropics/skills --skill frontend-design --agent claude-code --copy
```

```bash
npx skills add vercel-labs/agent-skills --skill web-design-guidelines --agent claude-code --copy
```

```bash
npx skills add ConardLi/garden-skills --skill web-design-engineer --agent claude-code --copy
```

```bash
npx skills add microsoft/playwright-cli --skill playwright-cli --agent claude-code --copy
```

```bash
npx ui-ux-pro-max-cli init --ai claude --force
```
