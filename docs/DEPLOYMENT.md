# Hosting the storefront

The application is `frontend/`, a Next.js server application. It is **not a static export**: payments, recipes, support forms and order reconciliation need server routes.

## Fixed deployment failure

The Netlify PR #4 deploy log reported:

```
Node v20.20.2
firebase-admin@14.5.0 required node >=22
Cannot find module '@google-cloud/firestore'
Failed to collect page data for /api/ai-recipe
```

It also resolved the publish directory to `frontend/out`. This change pins Node 22, declares the required Firestore package directly, includes optional dependencies during installation and publishes `.next` with the automatic Netlify Next.js adapter. The explicit Next.js workspace/tracing root removes ambiguity from the repository's two lockfiles. Preview builds no longer point their API URL at a visitor's localhost.

## Netlify

Use the root `netlify.toml` (base `frontend`, command `npm run build`, publish `.next`). The Next.js adapter is automatically installed by Netlify. Do not disable the adapter or restore `output: "export"`. If a project-level function runtime is explicitly set to Node 20, update that override to Node 22 as well. Do not use an SPA rewrite that turns `/api/*` into HTML.

## Vercel

Set **Root Directory to `frontend`**, Framework Preset to **Next.js**, and Node.js to **22.x** in Project Settings. `frontend/vercel.json` supplies deterministic install/build commands. Leave Output Directory at `.next`. The obsolete root-level Vercel configuration was removed because it referred to scripts/output that were not at the repository root. Root npm scripts now delegate to the frontend for local convenience; they are not a substitute for Vercel's Root Directory setting.

No Vercel account configuration was changed by this PR. The observed failing provider was Netlify; Vercel settings must match the above before deploying there.

## Environment and runtime

Configure the applicable public Firebase build variables and server-only credentials using `frontend/.env.example` and `PAYMENTS-PWA-SETUP.md`. Never prefix private credentials with `NEXT_PUBLIC_`. Do not enable commerce until the provider setup and live-domain acceptance checks are complete.

`NEXT_PUBLIC_API_URL` is optional and refers only to the legacy Python analytics backend. When absent in production, telemetry is disabled and analytics reports unavailable; it does not call localhost or display fabricated metrics. Preview environments should use an explicitly configured reachable test backend if analytics is required.

After deployment, verify `/home`, `/products`, `/cook`, `/manifest.webmanifest` and an API route. A missing-configuration/authentication JSON response proves the API is mounted; a static HTML 404 does not. Then complete provider-specific tests before accepting customer payments.
