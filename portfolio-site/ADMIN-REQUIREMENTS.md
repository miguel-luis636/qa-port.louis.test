# Private Admin Console — Requirements

## Goal
Miguel Luis must be able to maintain his public cyberpunk QA portfolio without editing source code or relying on an assistant.

## Content types
- Experiences: employer, position, employment type, start/end dates, responsibilities, tools, outcomes, public/private disclosure flags, sort order.
- Projects: title, category, summary, problem, approach, tools, evidence, GitHub/demo URLs, images, featured flag, sort order.
- Achievements: title, issuer, date, description, credential URL, image.
- Skills: name, category, proficiency (optional), display order.
- Profile: headline, biography, contact links, resume.
- Site settings: intro enabled, theme options, localization later.

## Admin workflow
- Owner-only login.
- Create, edit, delete and reorder entries.
- Draft, preview and publish/unpublish.
- Upload image and document assets safely.
- Confirmation before destructive actions.
- Mobile-friendly admin UI with the same cyberpunk identity.

## Security and quality
- Enforce authorization on the backend and database, not merely in UI or via hidden routes.
- Never expose service-role keys or secrets in frontend source.
- Apply database row-level security or equivalent server-side policy.
- Validate and sanitize user content; validate file types/sizes and external URLs.
- Protect against unauthorized writes; use HTTPS, secure sessions and rate limiting.
- Avoid placing confidential employer/client information on public pages.
- Accessibility, responsive layout, reduced-motion support and sensible loading/error states.

## Architecture decision pending
Recommended direction: React + Vite + TypeScript + Tailwind for frontend, Supabase Auth/Postgres/Storage for CMS backend, deployed with a custom name-only domain or GitHub Pages where compatible.
This is a proposal, not yet implemented or provisioned. Domain ownership, backend provider and authentication account require Miguel's confirmation.

## Public URL
Public domain should contain Miguel's name, not ChatGPT or an AI tool brand. Availability must be verified before claiming a domain.

## Status
Requirements recorded. No admin account, database, hosting or authentication has been created yet.
