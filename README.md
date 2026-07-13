# Vibe Coding Portfolio

Static portfolio site for ARTGR 5840 projects. Open `index.html` in a browser, or use a local server (recommended).

## Preview locally

From this folder:

```bash
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

---

## Add a new project

### 1. Create the project folder

Add a folder at the portfolio root named after your project (e.g. `MyApp/`).

```
MyApp/
├── content.md      # case-study copy (required)
├── index.html      # case-study page (generated or hand-written)
└── assets/         # all images for this project
    ├── cover_myapp.png
    ├── mockup_hero_myapp.png   # optional; falls back to cover
    └── screenshot1_myapp.png   # gallery shots (optional)
```

**Slug rule:** lowercase title, spaces → hyphens (`My App` → `my-app`). Use underscores in filenames (`cover_my_app.png`).

### 2. Write `content.md`

Copy the structure from `PulseFit/content.md` or `MovieMatcher/content.md`. Required frontmatter:

```yaml
---
title: MyApp
category: Prototyping
year: 2026
subhead: One-line summary.
cardDescription: Short blurb for the home-page card.
liveUrl: https://your-app.example.com   # optional
coverAlt: Describe the cover image
---
```

Required sections: **Overview**, **Challenge**, **Solution**, **Process**, **Outcomes**.  
Optional: Sketching, Information architecture, Visual development, Style guide, Gallery, Deployment.

### 3. Add images to `assets/`

| File | Purpose |
|------|---------|
| `cover_{slug}.png` | Home-page card thumbnail |
| `mockup_hero_{slug}.png` | Hero on case-study page (optional) |
| `screenshot1_{slug}.png` … | Gallery images (do not reuse cover/hero) |

### 4. Generate the case-study page and home card

**Easiest — ask Cursor:**

> Add a new project page for **MyApp** to this portfolio.

Cursor uses the **portfolio-project-page** skill to generate `MyApp/index.html` and prepend a card to `index.html`. Follow [DESIGN.md](DESIGN.md) for layout rules.

**If you changed Cursor accounts** and lost the skill, recreate it:

1. In Cursor: **Settings → Rules → Agent Skills → Add skill**
2. Or copy the skill folder to `~/.cursor/skills/portfolio-project-page/` on your machine
3. The skill needs: `SKILL.md`, `reference.md`, and `templates/` (`content.md.template`, `project-page.html`, `project-card.html`)

**Manual fallback:** copy `PulseFit/index.html` into your project folder, update paths/text, then add a `<article class="project-card">` block at the top of `.projects__grid` in `index.html` (see existing MovieMatcher or PulseFit cards).

### 5. Verify

- [ ] Cover and screenshots live under `{Project}/assets/`
- [ ] Home card links to `{Project}/index.html`
- [ ] **Live app →** link appears when `liveUrl` is set
- [ ] Case-study page has **← Back to projects** linking to `../index.html#projects`
- [ ] Preview with `python3 -m http.server 8080` and click through

---

## Capture screenshots from a running app (optional)

If your app runs locally, you can automate portfolio images like MovieMatcher does:

1. Start your app (e.g. on port 8765).
2. Install deps: `pip install Pillow`
3. Adapt and run a script like `MovieMatcher/_dev/_build_portfolio_images.py` (uses headless Chrome to screenshot pages and build cover/hero images).

---

## Key files

| File | Role |
|------|------|
| `index.html` | Home page + featured project cards |
| `tokens.css` / `styles.css` | Portfolio design system |
| `DESIGN.md` | Layout and token rules for AI and hand edits |
| `{Project}/content.md` | Source copy for each case study |
| `{Project}/index.html` | Individual case-study page |

Case-study styles are shared in `styles.css` under `/* PulseFit case study */` — all project pages use the `pulsefit-case` body class.
