-- Make all seeded blog posts visible now by setting published_at to today.
-- The original dates are preserved in the post content/context.
UPDATE public.blog_posts
SET published_at = '2026-04-18T08:00:00-07:00'
WHERE status = 'published'
  AND published_at > now();
