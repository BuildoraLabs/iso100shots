# ISO100SHOTS: connect the existing gallery to Supabase

This change keeps the current local gallery intact and appends rows from `public.photos` where `status = 'published'`.

## 1. Set Vercel environment variables

In Vercel → project for `iso100shots` → Settings → Environment Variables, add:

- `NEXT_PUBLIC_SUPABASE_URL` = `https://rsvgqouajgzupfttedw.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = the project's publishable key (or legacy anon key) from Supabase → Project Settings → API Keys.

Use the public/publishable/anon key only. Do **not** use a `service_role` or secret key in a `NEXT_PUBLIC_` variable.

Apply to Production and Preview, then redeploy after adding the variables.

## 2. Database expectations

The `public.photos` table should have these columns: `id`, `title`, `slug`, `caption`, `alt_text`, `keywords`, `category`, `image_path`, `image_url`, `status`, `featured`, and `created_at`.

The public SELECT RLS policy must allow only `status = 'published'`. Public Storage URLs in `image_url` are expected for images intended for the public portfolio.

For the first test photo, `status` must be exactly `published` (lowercase). Category values such as `Landscape` are mapped to the existing `Landscapes Light` filter.

## 3. Deploy safely

1. Commit these code changes to a branch and push to GitHub.
2. Let Vercel create a Preview Deployment and test it first.
3. Check that the existing 24 local images still appear and the new Supabase image appears once.
4. If correct, merge/deploy to Production.

New published rows should become visible within about 60 seconds. The existing local photos are not migrated or removed by this change.
