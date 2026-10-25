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


## Analytics

Dashboard: https://antoniopuceski.goatcounter.com/ (sign-in required).
GoatCounter counts unique visits per session, not identified people; the same person
on multiple devices or returning later may count again. Collection starts at deployment.
Click events count every activation (no_session), including repeated clicks, separately
from visits. A video-select event means choosing the video tab, not watching the video.
CV and email events indicate intent, not successful delivery of an email.

Open https://antoniopuceski.github.io/#analytics-off once in each personal browser
(PC and phone) to exclude it. This persists until site data is cleared. Use
#analytics-on to reverse. If storage is blocked, the banner explains the limitation.
Local/preview hosts do not load analytics. Blockers may prevent collection.

public/analytics.js delegates explicit data-analytics events for React-rendered UI.
It sends no form contents, arbitrary DOM text, query strings, or persistent visitor IDs.
Referrers are reduced to origins. The privacy page explains collection and opt-out.
The endpoint is public configuration, not a secret; never add account/API credentials.
