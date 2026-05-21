# OpenTrials Platform Frontend

This is the Next.js frontend for OpenTrials Platform, an adaptive analytics product prototype for messy CSV datasets.

## Local development

From the repo root:

```bash
npm install
npm run dev
```

The frontend runs from `open-trials-platform/frontend/frontend` and is configured to communicate with the backend API.

## What this frontend does

- Renders adaptive dashboards from uploaded datasets
- Supports dynamic schema inference and dataset onboarding
- Uses TypeScript, Tailwind CSS, Framer Motion, and Recharts for a polished data product experience

## Notes for reviewers

- The main landing experience is in `app/page.tsx`
- The upload flow is in `app/upload/page.tsx`
- Documentation and dataset guidance are in `app/docs/page.tsx`

## Production build

```bash
npm run build
```

The app is structured for static deployment with client-side data ingestion and API-driven analytics.
