# Antonio Puceski — Portfolio

Personal software-engineering portfolio for [Antonio Puceski](https://github.com/AntonioPuceski), built with React, TypeScript, and Vite.

## Local development

```bash
pnpm install
pnpm dev
```

## Quality checks

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

The site is configured for root-level hosting at `https://antoniopuceski.github.io`. Pushes to `master` deploy automatically through GitHub Actions.

## Project previews

Project media is configured in `app/data.ts` and stored under `public/projects/`.
Add a `media` entry with a short source label, disclosure, captioned image list,
video path and video caption. Cards without media keep their existing artwork.
Screenshots load lazily; videos are mounted only inside the open gallery and use
`preload="none"`. The native dialog supports Escape, focus containment and return
to the originating card. Closing the dialog unmounts its player.

Current previews: Smart Incident Detection, GymTracker, Computer Vision Sensor Hub
and Live Flight Tracker. Demo/fixture/synthetic inputs are labeled in the gallery.
