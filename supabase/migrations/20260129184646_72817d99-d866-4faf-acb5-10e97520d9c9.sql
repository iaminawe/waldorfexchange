-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('teacher', 'student_editor');

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Create profiles table for user display info
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create site_settings table for configurable content
CREATE TABLE public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL UNIQUE,
    value JSONB NOT NULL DEFAULT '{}',
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default settings
INSERT INTO public.site_settings (key, value) VALUES
('fundraising_goal', '{"amount": 10000, "currency": "CAD"}'),
('community_name', '{"name": "Northern Saskatchewan Indigenous Community", "placeholder": true}'),
('school_info', '{"name": "Nelson Waldorf School", "class": "Grade 8/9"}');

-- Create donations table
CREATE TABLE public.donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_name TEXT NOT NULL,
    donor_email TEXT,
    amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
    message TEXT,
    is_anonymous BOOLEAN NOT NULL DEFAULT false,
    source TEXT NOT NULL DEFAULT 'online', -- 'online', 'cash', 'event'
    stripe_payment_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create raffle_tiers table for pricing options
CREATE TABLE public.raffle_tiers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    ticket_count INTEGER NOT NULL CHECK (ticket_count > 0),
    price DECIMAL(10,2) NOT NULL CHECK (price > 0),
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default raffle tiers
INSERT INTO public.raffle_tiers (name, ticket_count, price, sort_order) VALUES
('Single', 1, 5.00, 1),
('Bundle of 5', 5, 20.00, 2),
('Best Value - 12 Pack', 12, 40.00, 3);

-- Create raffle_purchases table
CREATE TABLE public.raffle_purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    purchaser_name TEXT NOT NULL,
    purchaser_email TEXT NOT NULL,
    tier_id UUID REFERENCES public.raffle_tiers(id) NOT NULL,
    ticket_numbers TEXT[] NOT NULL DEFAULT '{}',
    stripe_payment_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image_url TEXT,
    author_id UUID REFERENCES auth.users(id) NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
    published_at TIMESTAMP WITH TIME ZONE,
    scheduled_for TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog_images table for photo galleries
CREATE TABLE public.blog_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    blog_post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE NOT NULL,
    image_url TEXT NOT NULL,
    caption TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create newsletter_subscribers table
CREATE TABLE public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    is_confirmed BOOLEAN NOT NULL DEFAULT false,
    confirmation_token TEXT,
    subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Create email_campaigns table for admin campaigns
CREATE TABLE public.email_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject TEXT NOT NULL,
    content TEXT NOT NULL,
    sent_by UUID REFERENCES auth.users(id),
    sent_at TIMESTAMP WITH TIME ZONE,
    recipient_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create upcoming_events table for info display
CREATE TABLE public.upcoming_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Security definer function to check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Convenience function to check if current user is a teacher
CREATE OR REPLACE FUNCTION public.is_teacher()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'teacher')
$$;

-- Convenience function to check if current user is a student editor
CREATE OR REPLACE FUNCTION public.is_student_editor()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'student_editor')
$$;

-- Function to check if user can manage blog posts
CREATE OR REPLACE FUNCTION public.can_manage_blog()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.is_teacher() OR public.is_student_editor()
$$;

-- Function to get total amount raised
CREATE OR REPLACE FUNCTION public.get_total_raised()
RETURNS DECIMAL
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT SUM(amount) FROM public.donations) +
    (SELECT COALESCE(SUM(rt.price), 0) 
     FROM public.raffle_purchases rp 
     JOIN public.raffle_tiers rt ON rp.tier_id = rt.id),
    0
  )
$$;

-- Updated at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Apply updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.raffle_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.raffle_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.upcoming_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_roles
CREATE POLICY "Teachers can manage all roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.is_teacher())
  WITH CHECK (public.is_teacher());

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for profiles
CREATE POLICY "Profiles are publicly viewable"
  ON public.profiles FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for site_settings
CREATE POLICY "Anyone can view site settings"
  ON public.site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Only teachers can modify site settings"
  ON public.site_settings FOR ALL
  TO authenticated
  USING (public.is_teacher())
  WITH CHECK (public.is_teacher());

-- RLS Policies for donations (teachers only for management, anon for public donor wall)
CREATE POLICY "Teachers can manage all donations"
  ON public.donations FOR ALL
  TO authenticated
  USING (public.is_teacher())
  WITH CHECK (public.is_teacher());

CREATE POLICY "Public can view non-anonymous donations for donor wall"
  ON public.donations FOR SELECT
  TO anon, authenticated
  USING (is_anonymous = false);

-- RLS Policies for raffle_tiers (public read, teacher manage)
CREATE POLICY "Anyone can view active raffle tiers"
  ON public.raffle_tiers FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Teachers can manage raffle tiers"
  ON public.raffle_tiers FOR ALL
  TO authenticated
  USING (public.is_teacher())
  WITH CHECK (public.is_teacher());

-- RLS Policies for raffle_purchases (teacher only)
CREATE POLICY "Teachers can manage raffle purchases"
  ON public.raffle_purchases FOR ALL
  TO authenticated
  USING (public.is_teacher())
  WITH CHECK (public.is_teacher());

-- RLS Policies for blog_posts
CREATE POLICY "Published posts are publicly viewable"
  ON public.blog_posts FOR SELECT
  TO anon, authenticated
  USING (status = 'published' AND published_at <= now());

CREATE POLICY "Admins can view all posts"
  ON public.blog_posts FOR SELECT
  TO authenticated
  USING (public.can_manage_blog());

CREATE POLICY "Admins can create posts"
  ON public.blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (public.can_manage_blog() AND author_id = auth.uid());

CREATE POLICY "Admins can update posts"
  ON public.blog_posts FOR UPDATE
  TO authenticated
  USING (public.can_manage_blog())
  WITH CHECK (public.can_manage_blog());

CREATE POLICY "Teachers can delete any post"
  ON public.blog_posts FOR DELETE
  TO authenticated
  USING (public.is_teacher());

CREATE POLICY "Editors can delete own posts"
  ON public.blog_posts FOR DELETE
  TO authenticated
  USING (public.is_student_editor() AND author_id = auth.uid());

-- RLS Policies for blog_images
CREATE POLICY "Blog images are publicly viewable"
  ON public.blog_images FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can manage blog images"
  ON public.blog_images FOR ALL
  TO authenticated
  USING (public.can_manage_blog())
  WITH CHECK (public.can_manage_blog());

-- RLS Policies for newsletter_subscribers (teacher only)
CREATE POLICY "Teachers can manage subscribers"
  ON public.newsletter_subscribers FOR ALL
  TO authenticated
  USING (public.is_teacher())
  WITH CHECK (public.is_teacher());

-- RLS Policies for email_campaigns (teacher only)
CREATE POLICY "Teachers can manage email campaigns"
  ON public.email_campaigns FOR ALL
  TO authenticated
  USING (public.is_teacher())
  WITH CHECK (public.is_teacher());

-- RLS Policies for upcoming_events
CREATE POLICY "Active events are publicly viewable"
  ON public.upcoming_events FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Teachers can manage events"
  ON public.upcoming_events FOR ALL
  TO authenticated
  USING (public.is_teacher())
  WITH CHECK (public.is_teacher());

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for blog images
CREATE POLICY "Blog images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');

CREATE POLICY "Admins can upload blog images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'blog-images' AND public.can_manage_blog());

CREATE POLICY "Admins can update blog images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'blog-images' AND public.can_manage_blog());

CREATE POLICY "Teachers can delete blog images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'blog-images' AND public.is_teacher());