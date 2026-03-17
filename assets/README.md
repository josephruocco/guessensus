# Guessensus Asset Sourcing

Every image used by the game needs metadata. Do not drop random files into the
repo without recording where they came from and what license they use.

## Required per asset

- `id`: matches the round id in `app.js`
- `image`: local relative path
- `sourceUrl`: original page for the asset
- `title`: source title
- `creator`: photographer, illustrator, institution, or `Unknown`
- `license`: short identifier such as `CC0`, `CC BY 4.0`, `Public Domain`
- `attribution`: exact attribution line to display if needed

## Folder layout

- `assets/manifest.json`: metadata registry for all sourced images
- `assets/images/`: local image files used by the app

## Suggested sources

- Dinosaurs, pasta: Wikimedia Commons
- Stock photos: Pexels or Unsplash
- Old book covers: NYPL Digital Collections, Smithsonian Open Access, The Met

## Workflow

1. Find an image with a license you can actually use.
2. Download it into `assets/images/`.
3. Add its metadata to `assets/manifest.json`.
4. Match the `id` to the round item in `app.js`.
5. Keep the file local. Do not hotlink remote images in production.
