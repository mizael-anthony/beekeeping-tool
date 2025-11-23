# Repository Guidelines

## Project Structure & Module Organization
- App router lives in `app/` with `layout.tsx` wiring global fonts/providers and `page.tsx` as the home screen. Global styles are in `app/globals.css` (Tailwind v4 + CSS variables).
- Shared UI (shadcn-style) components sit in `components/ui/` (buttons, inputs, form wrappers, toast bridge).
- Domain helpers live in `lib/` (`supabase/` clients for browser/server/middleware, `providers/react-query-provider.tsx`, `utils.ts` with `cn` helper). Path alias `@/*` maps to repo root.
- Static assets go in `public/`. Add validation schemas under `schemas/` as they are introduced.

## Build, Test, and Development Commands
- Install deps once with `pnpm install` (keep `pnpm-lock.yaml` authoritative).
- Run locally: `pnpm dev` (Next.js dev server on port 3000).
- Production build: `pnpm build`; preview the built app with `pnpm start`.
- Linting: `pnpm lint` (Next.js Core Web Vitals + TypeScript rules).

## Coding Style & Naming Conventions
- Language: TypeScript with strict mode; prefer typed props and explicit return types on utilities.
- Components: default to function components; add `"use client"` when needed. Keep server-only logic (cookies, headers) out of client files.
- Styling: Tailwind utility-first; reuse tokens from `app/globals.css`. For conditional classes, use `cn(...)` from `lib/utils`.
- Imports: use `@/components/...`, `@/lib/...` etc. Keep file names kebab-case (`react-query-provider.tsx`, `auth.ts`).
- Formatting: semicolons on; 2-space indentation; follow ESLint feedback before pushing.

## Testing Guidelines
- No automated test suite is present yet; add tests alongside features using `.test.ts(x)` or `.spec.ts(x)` naming.
- Favor component tests for UI (React Testing Library) and unit tests for utilities. Stub Supabase/network calls; avoid hitting live services in CI.
- Run `pnpm lint` before opening a PR; add a `pnpm test` script if you introduce a runner.

## Commit & Pull Request Guidelines
- Use focused commits; prefer Conventional Commit prefixes (`feat:`, `fix:`, `chore:`, `docs:`) for clarity and changelog friendliness.
- PRs should include: concise description of the change, screenshots/GIFs for UI updates, notes on migrations/config changes, and how to verify (commands or steps).
- Reference related issues/tasks in descriptions. Keep branches rebased onto `main` to reduce noise.

## Security & Configuration
- Required env vars: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (set in `.env.local`, never committed). Ensure values are present for browser, server, and middleware clients.
- Avoid committing secrets or build artifacts (`.next/`, `out/`). Validate that third-party scripts or fonts are loaded via HTTPS.

## Important
- Always use Shadcn UI component as possible