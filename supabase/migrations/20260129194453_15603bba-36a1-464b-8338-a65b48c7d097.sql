-- Create a public view that only exposes safe donor information
-- This excludes sensitive fields: donor_email, stripe_payment_id
CREATE VIEW public.donations_public
WITH (security_invoker=on) AS
  SELECT 
    id,
    donor_name,
    message,
    amount,
    created_at,
    is_anonymous
  FROM public.donations
  WHERE is_anonymous = false;

-- Update the public SELECT policy to be more restrictive
-- Drop the existing public policy
DROP POLICY IF EXISTS "Public can view non-anonymous donations for donor wall" ON public.donations;

-- Create a new policy that only allows teachers to view full donation records
-- Public users should use the donations_public view instead
CREATE POLICY "Only teachers can view full donation records"
  ON public.donations
  FOR SELECT
  USING (is_teacher());