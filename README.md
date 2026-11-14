# Nuwahereza Peter: portfolio

Personal site of Nuwahereza Peter, ML/AI engineer (Python) in Kampala, Uganda.
Live at <https://nuwahereza-eng.github.io/my_portifolio/>.

## Stack

Plain HTML, CSS and JavaScript. No build step and no frameworks.

- `index.html`: all page content
- `css/styles.css`: styles, with light and dark themes as CSS variables
- `js/script.js`: theme toggle, mobile menu, scroll reveal, contact form
- `config/config.js`: EmailJS keys and contact details for the form
- `assets/images/`: portrait (`peter-*.webp/jpg`) and social preview (`og-image.jpg`)

EmailJS loads only when a visitor starts filling in the contact form. If EmailJS is not configured,
the form opens the visitor's email app instead.

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

`.github/workflows/static.yml` publishes the repository to GitHub Pages on every push to `main`.

## Editing content

- Projects: the `<article class="card project">` blocks in the Projects section of `index.html`.
- Experience: the `.timeline` lists in the Experience section.
- Social preview: `og-image.jpg` is 1200×630. Update the `og:` meta tags if you rename it.
