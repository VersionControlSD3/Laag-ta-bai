# Repository Initialization

## Prerequisites

- Node.js 20.19+ (or 22.12+) and npm.
- A Supabase project if you need the hosted backend.
- Docker Desktop if you want to run the Supabase stack locally.

## Install and run the frontend

From the repository root:

```sh
npm ci
npm run dev
```

Vite prints the local development URL when the server starts. Keep the terminal
running while developing.

Create a `.env` file in the repository root for Supabase settings:

```dotenv
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<publishable-key>
```

Get these values from the Supabase project settings. For local Supabase
development, use the local API URL and publishable/anon key reported by the
Supabase CLI instead. Restart the Vite server after changing environment
variables.

This checkout uses hosted staging for `npm run dev` through the ignored
`.env.development.local` file. It overrides the duplicate production/staging
entries in `.env`. Keep deployment settings in Vercel's environment variables.
The shared client is exported from `src/lib/supabase.ts`; import it with
`import { supabase } from './lib/supabase'` from files directly in `src/`.

Only values prefixed with `VITE_` are available to frontend code, which means
they are public in the built application. Use a publishable/anon key here;
never put a service-role key, database password, or other secret in a `VITE_`
variable. `.env` is ignored by Git; do not commit it or share its values.

## Supabase database

The Supabase CLI is included as a project dependency and can be run with
`npx supabase`. The migration in `supabase/migrations/` creates the
`public.users` table.

To use the local Supabase stack:

```sh
npx supabase start
npx supabase status
```

The status output includes local connection values. Configure the frontend
environment variables above with the local API URL and publishable/anon key.
To stop the local stack, run:

```sh
npx supabase stop
```

For a hosted Supabase project, authenticate and link this checkout before
pushing database migrations:

```sh
npx supabase login
npx supabase link --project-ref <project-ref>
npx supabase db push
```

Review migrations before applying them to a shared or production database.
`supabase/config.toml` currently enables seeding from `./seed.sql`, but that
file is not present in this repository. If a local database reset reports that
the seed file is missing, add the intended seed file or update the seed
configuration before resetting.

## Checks and production build

```sh
npm run lint
npm run build
npm run preview
```

`npm run build` runs the TypeScript project build and creates production assets
in `dist/`. `npm run preview` serves that build locally.

## Project layout

- `src/` — React and TypeScript application.
- `public/` — static assets.
- `supabase/config.toml` — local Supabase configuration.
- `supabase/migrations/` — versioned database migrations.
- `package.json` and `package-lock.json` — scripts and pinned dependencies.
