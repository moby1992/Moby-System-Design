# Deploying to Vercel

This is a standard Next.js (App Router) app and deploys to Vercel with **zero
configuration**. Pick one of the two paths below.

## Option A — Native Git integration (recommended, simplest)

No secrets, no workflow. Vercel watches the repo and deploys on every push,
with automatic preview deployments for pull requests.

1. Go to <https://vercel.com/new>.
2. **Import** the `moby1992/Moby-System-Design` repository (authorize GitHub if
   prompted).
3. Framework preset is auto-detected as **Next.js** — leave all build settings
   at their defaults:
   - Build command: `next build`
   - Output: handled automatically
   - Install command: `npm install`
4. Click **Deploy**. Your production URL appears within a minute, and every push
   to `main` redeploys automatically.

> If you use this option, delete `.github/workflows/deploy-vercel.yml` so you
> don't get duplicate deployments.

## Option B — GitHub Actions (CI-driven)

Use this if you'd rather not grant Vercel access to the repo, or want deploys
gated behind CI. The workflow at `.github/workflows/deploy-vercel.yml` runs on
every push to `main`.

1. Create the Vercel project once locally and capture its IDs:

   ```bash
   npm i -g vercel
   vercel link        # follow prompts; creates .vercel/project.json
   cat .vercel/project.json   # contains "orgId" and "projectId"
   ```

2. Create a token at <https://vercel.com/account/tokens>.
3. In GitHub: **Settings → Secrets and variables → Actions → New repository
   secret**, add:
   - `VERCEL_TOKEN` — the access token
   - `VERCEL_ORG_ID` — `orgId` from `project.json`
   - `VERCEL_PROJECT_ID` — `projectId` from `project.json`
4. Push to `main` (or run the workflow manually via **Actions → Deploy to
   Vercel → Run workflow**). The job builds with `vercel build --prod` and ships
   with `vercel deploy --prebuilt --prod`.

## Notes

- `npm run build` already passes and statically generates every topic page, so
  the production deploy is a straightforward static + RSC build.
- No environment variables are required by the app itself.
