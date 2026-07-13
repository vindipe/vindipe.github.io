# Vincenzo Di Perna — Personal Website

This repository contains the source code of my personal website.

The website presents my professional profile, research work, projects, publications, tutorials, CV, and contact information.

## Stack

- Astro
- Tailwind CSS
- DaisyUI
- GitHub Pages
- pnpm

## Local development

Install dependencies:

```bash
pnpm install
```

Run the local development server:

```bash
pnpm run dev
```

Build the static site:

```bash
pnpm run build
```

Preview the production build locally:

```bash
pnpm run preview
```

## Project structure

```text
src/
├── components/
├── layouts/
├── pages/
└── styles/

public/
├── cv/
├── data/
├── og/
├── research/
├── theses/
└── site assets
```

Main public pages:

- Home
- Projects
- Research
- Tutorials
- CV
- Contact

## Deployment

The site is deployed to GitHub Pages through GitHub Actions.

Every push to `main` runs the Astro build, uploads the generated `dist/` directory as a Pages artifact, and deploys it to the `github-pages` environment.

## Notes for development

The first public version intentionally excludes:

- Blog
- Store
- Services
- RSS
- demo template content
- early-stage project names not intended for publication

## Credits

This website is based on the Astrofy template by Manuel Ernesto, licensed under the MIT License.

Website content, personal material, images, and text are © Vincenzo Di Perna unless otherwise stated.
