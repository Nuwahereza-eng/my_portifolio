# Nuwahereza Peter: portfolio

Personal site of Nuwahereza Peter, ML/AI engineer (Python) in Kampala, Uganda.
Live at <https://nuwahereza-eng.github.io/my_portifolio/>.

## Stack

Plain HTML, CSS and JavaScript. No build step, no frameworks, no external requests at load time.

- `index.html`: the page
- `cv.html`: one-page CV that prints to A4 ("Save as PDF")
- `css/styles.css`: styles. Dark theme by default, light theme via `[data-theme="light"]`
- `js/script.js`: theme toggle, mobile menu, active nav link, scroll fade-in, hero network animation
- `assets/fonts/`: self-hosted Inter and JetBrains Mono (latin subset, SIL Open Font License, see `OFL-*.txt`)
- `assets/images/`: portrait (`peter-*.webp/jpg`), social preview (`og-image.jpg`, 1200×630), icons
- `favicon.svg`

The hero animation starts after the page has loaded, runs at about 30 fps, pauses when off screen or in a
background tab, and does not run when the visitor's system asks for reduced motion.

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

`.github/workflows/static.yml` publishes the repository to GitHub Pages on every push to `main`.

## Editing content

- Projects: `<article class="project">` blocks. Add `project--featured` to make a card full width with a result panel.
- Experience: the `.timeline` lists. Add `is-current` to the current role.
- Keep `cv.html` in step with the page when roles or projects change.
