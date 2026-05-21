# OpenTrials Platform

AI-native analytics infrastructure for messy operational datasets.

## Tagline
Adaptive SaaS-grade analytics for real-world data that changes faster than the schema.

## Executive Project Overview
OpenTrials Platform is a production-minded prototype built to prove a full-stack, AI-assisted analytics workflow for noisy business datasets. It combines a Next.js dashboard with a FastAPI backend, dynamic schema inference, and a data-first analytics engine to deliver immediate insight from CSV uploads, not just polished reports.

This is not a research demo. It is a technical showcase of end-to-end ownership, developer-first tooling, and product-focused iteration aimed at shipping a platform that can be extended into a SaaS product.

## Problem Statement
Most teams still treat analytics like a two-week report: data arrives in inconsistent CSVs, the schema changes mid-flight, and the engineering work becomes a one-off integration.

Real product teams need a system that can intake messy business data, infer structure, extract signals, and surface insights without requiring a hand-tuned database migration for every file.

## Why Existing Systems Fail
- Legacy dashboards demand strict data contracts and break when a column name changes.
- Many analytics tools are optimized for clean, normalized warehouses, not ad hoc CSV pipelines.
- Existing BI stacks assume the schema is known before the data lands, which does not match how early-stage operations actually work.
- Teams end up rebuilding data models manually or relying on slow ETL cycles instead of shipping insights.

## Product Vision
OpenTrials Platform is a foundation for an AI-enhanced analytics product that adapts to changing datasets, reduces integration friction, and gives business operators actionable visibility in one place.

The goal is to support any dataset that looks like a real-world export: mixed numeric and categorical fields, time-based events, and incremental datasets with evolving labels.

## AI-Assisted Development Workflow
This project was built with an AI-native engineering cadence:

- Concept validation and architecture sketching with Claude-assisted prompts.
- Iterative feature planning driven by fast prototype feedback loops.
- AI-assisted debugging for data parsing edge cases and schema inference anomalies.
- Code generation used selectively for boilerplate, while core systems were designed manually.

That means I used AI to amplify execution speed, not to replace engineering judgment.

## Technical Architecture Overview
- Frontend: `Next.js`, `TypeScript`, `Tailwind CSS`, `Framer Motion`, `Recharts`
- Backend: `FastAPI`, `SQLAlchemy`, `PostgreSQL`-ready data layer, `Pandas` for ingestion
- Data engine: schema-flexible ingestion, adaptive metadata, analytics aggregation
- Deployment model: container-friendly backend + static frontend ready for VPS or cloud deployment

The architecture is intentionally modular: upload handling, schema interpretation, analytics services, and UI rendering operate as separate layers.

## Frontend Engineering Decisions
- Built a responsive dashboard with data-driven components, not hardcoded pages.
- Used `TypeScript` to enforce typed contracts between UI and backend API models.
- Designed the frontend to render dynamically based on inferred dataset schema and analytics metadata.
- Kept the UI lean and usable with real data patterns instead of ornamental UI polish.

## Backend Engineering Decisions
- Implemented the API with `FastAPI` for fast iteration and clear request/response validation.
- Separated ingestion, schema discovery, and analytics into dedicated service layers.
- Chose `SQLAlchemy` and a PostgreSQL-ready repository model to support a SaaS migration path.
- Used `Pandas` where it makes sense for messy CSV processing, while keeping the core backend service-oriented.

## Dynamic Schema Engine Explanation
The ingestion engine is built to be dataset-agnostic:

- CSV inputs are analyzed at upload time.
- Column types are inferred, labels are normalized, and metadata is generated.
- The platform maps raw data into a flexible analytics model rather than forcing a rigid schema.
- This enables dashboards and summaries to be created automatically for new or changed datasets.

That is the core product capability: adapt to changing data context instead of freezing the data shape.

## Engineering Challenges Solved
- Handled inconsistent CSV uploads with automated type inference and normalization.
- Built a frontend that adapts to dataset shape instead of requiring manual UI changes.
- Kept the backend modular so ingestion logic is separate from analytics and API routing.
- Verified edge cases like missing values, unexpected column names, and mixed data types.

## Scalability & Product Thinking
The codebase reflects a move toward scalable SaaS:

- Data ingestion is isolated so storage can migrate from in-memory/Pandas to a database-backed pipeline.
- API contracts are versionable and typed for future client growth.
- Frontend components are reusable and can support new visual modules without rewriting core logic.
- The system is designed to scale from prototype uploads to a multi-tenant analytics product.

## SaaS-Oriented Thinking
This project is built around real SaaS product signals:

- A data-first onboarding flow for new datasets
- User-facing insight delivery over raw data dumps
- An extensible backend that can support secure asset storage and dataset metadata
- A frontend experience that supports continuous iteration and deployment

## UX / Product Design Philosophy
The UI is intentionally practical:

- Focus on clarity over decoration.
- Surface the data story early: schema summary, value ranges, row counts, and charted trends.
- Treat each dataset as a product asset with metadata, not just a file upload.
- Support rapid hypothesis testing by enabling fast dataset replacement and rerendering.

## Real-World Use Cases
- Early-stage ops teams processing exports from CRM, marketing tools, and manual spreadsheets.
- Field research teams collecting observations in inconsistent CSV formats.
- Product analysts validating new datasets before committing to a BI warehouse.
- Small SaaS teams wanting a lightweight adaptive analytics layer for inboxed data.

## Future Product Roadmap
1. Multi-dataset workspace and dataset versioning
2. Automated dataset lineage and schema drift alerts
3. Role-based access for analyst / operator workflows
4. AI-assisted insight generation and anomaly detection
5. Deployment-ready SaaS packaging with cloud storage and auth

## Deployment & Shipping Mentality
This project is structured to ship:

- Local dev by default with `npm run dev` wired to the frontend.
- Production build paths already defined for static Next.js output.
- Backend built as a container-friendly FastAPI service.
- Code structure ready for incremental deployment to a VPS, Docker host, or cloud service.

## Why This Project Demonstrates Startup Readiness
- It shows end-to-end ownership across frontend, backend, and data logic.
- It solves a messy real-world problem instead of an academic example.
- It is built to iterate quickly and adapt to changing requirements.
- It demonstrates a product mindset and engineering tradeoffs.
- It uses AI as an execution accelerator rather than a substitute for technical judgment.

## Recruiter-Focused Closing
OpenTrials Platform is a working showcase of a builder mindset: pragmatic architecture, AI-native iteration, and fast-moving feature delivery. It is intentionally shaped around real product value and scalable engineering, not a classroom exercise.

---

## Quick Start
1. `npm install`
2. `npm run dev`

> Frontend development is proxied to `open-trials-platform/frontend/frontend`, while the backend is ready to extend as a deployment-ready FastAPI service.
