# GitHub Actions checks and Vercel deployment

The existing Vercel Git integration continues to deploy this project.
GitHub Actions runs checks only and requires no Vercel secrets.

The `CI` workflow runs on pull requests targeting `main`, pushes to `main`, and
manual runs. With Node.js 22, it runs `npm ci`, `npm run lint`, and `npm run build`
(TypeScript and Vite). There is no automated test suite in the project yet.

## Setup

1. Commit and push these files, then verify **Actions > CI** passes.
2. In GitHub branch protection or a ruleset for `main`, require the
   **Lint and build** check and pull requests before merging. Restrict direct
   pushes and bypass permissions if every production change must pass CI.
3. Keep the existing Vercel project connected to this repository. Verify its
   production branch is `main` and Node.js version is 22. `vercel.json` specifies
   Vite, `npm ci`, `npm run build`, and the `dist` output directory.

Vercel handles previews and production deployments using the existing project
settings. CI and Vercel run independently: failed CI does not stop deployment
on a direct push to `main`. Required PR checks protect the merge path.

## Environment variables

Keep `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in Vercel's
Production and Preview environments as appropriate. Use only a public
publishable/anon key; Vite embeds `VITE_` values in browser assets.
The starter UI does not use Supabase yet. CI runs without production credentials.
See [Instruction.md](../Instruction.md) for local setup.

No `VERCEL_TOKEN`, `VERCEL_ORG_ID`, or `VERCEL_PROJECT_ID` secrets or Vercel CLI
linking are needed for this workflow.

## Supabase migrations

Review and apply migrations separately using the hosted Supabase commands in
[Instruction.md](../Instruction.md), before releasing frontend changes that
depend on them. CI does not apply database migrations.

## Troubleshooting and rollback

- Inspect **Actions > CI > Lint and build** for check failures. Reproduce with
  `npm ci`, `npm run lint`, and `npm run build` locally. Use `npm.cmd` if
  PowerShell blocks npm scripts.
- Inspect Vercel deployment logs for deployment failures and verify environment
  variables and Git settings.
- Revert faulty changes through a pull request or roll back in Vercel.
  Frontend rollback does not undo database migrations.

Reference: [Vercel for GitHub](https://vercel.com/docs/git/vercel-for-github).
