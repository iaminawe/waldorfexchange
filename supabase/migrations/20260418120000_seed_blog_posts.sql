-- Seed blog posts for the exchange site.
-- All posts are inserted as "published" for preview purposes.
-- Before the site goes live, unpublish all except the first post,
-- then publish them on the scheduled dates.
--
-- Posts use the first available auth user as author.
-- If no users exist yet, the migration is a no-op.

DO $$
DECLARE
  v_author_id UUID;
BEGIN
  -- Get the first available user to use as author
  SELECT id INTO v_author_id FROM auth.users ORDER BY created_at ASC LIMIT 1;

  IF v_author_id IS NULL THEN
    RAISE NOTICE 'No auth users found — skipping blog post seed';
    RETURN;
  END IF;

  -- Post 1: Launch post — The Journey Ahead (publish date: Apr 18)
  INSERT INTO public.blog_posts (title, slug, content, excerpt, author_id, status, published_at)
  VALUES (
    'The Journey Ahead: Welcoming Île-à-la-Crosse to Nelson',
    'the-journey-ahead',
    E'We are thrilled to share that our Class 8/9 has been officially matched with the community of Île-à-la-Crosse, Saskatchewan — known locally as Sakitawak, which is Cree for "where the rivers meet" — through the Experiences Canada exchange program.\n\nÎle-à-la-Crosse is the second oldest settlement in Saskatchewan, founded in 1776, and is often called the Métis Capital of the North. It is a place shaped by waterways, stories, language, land-based knowledge, and generations of people who value respect, cooperation, and care for one another.\n\nThis is not a typical school trip. It is an invitation into a living community with deep roots, strong traditions, and a powerful sense of shared responsibility. We are honoured to be part of this exchange, and we are looking forward to welcoming students from Île-à-la-Crosse to Nelson this May.\n\nWhen they arrive, we will share our Waldorf education approach, explore the beauty of the Kootenay region together, and begin building the friendships that will carry us through to our own journey north in June.\n\nWe want every student to be ready for this experience — not just logistically, but as thoughtful, respectful young people prepared to enter another community with its own history, values, and ways of being. That preparation starts now, in our classrooms and in our conversations at home.\n\nThis exchange offers our students meaningful cultural learning, connection to place and history, outdoor experiences in one of northern Saskatchewan''s most beautiful regions, and the chance to grow into more responsible, thoughtful young people.\n\nWe can''t wait to share this journey with you. Follow along here for updates, and please consider supporting our fundraising efforts — every contribution helps make this experience possible for all of our students.',
    'Our Class 8/9 has been matched with Île-à-la-Crosse (Sakitawak), Saskatchewan through Experiences Canada. We look forward to welcoming their students to Nelson this May before we travel north in June.',
    v_author_id,
    'published',
    '2026-04-18T09:00:00-07:00'
  )
  ON CONFLICT (slug) DO NOTHING;

  -- Post 2: Fundraising kickoff (scheduled: Apr 22)
  INSERT INTO public.blog_posts (title, slug, content, excerpt, author_id, status, published_at)
  VALUES (
    'How You Can Help: Fundraising for the Exchange',
    'how-you-can-help-fundraising',
    E'Our fundraising goal of $10,000 covers travel, accommodation, meals, and meaningful experiences for all students involved in the exchange. We are making great progress, but we need your help to get there!\n\nThere are several ways you can support our trip:\n\nDonate directly — Every dollar counts, whether it''s $10 or $100. Donations go straight toward making this exchange accessible for every student in our class. You can donate through our website at any time.\n\nBuy raffle tickets — We have some fantastic prizes lined up. Raffle tickets are affordable and make a real difference. Check our Support page for details on prizes and how to purchase.\n\nAttend our events — We are hosting a Mystery Dinner Theatre at Taghum Hall in May! This is a wonderful evening out that directly supports our exchange. Tickets and details are available on our website.\n\nSpread the word — Share our website and social media posts with friends, family, and colleagues. The more people who know about our exchange, the more support we can gather.\n\nWe are so grateful to everyone who has contributed so far. Your generosity is helping our students prepare for an experience that will stay with them for years to come.\n\nThank you for believing in the power of connection and cultural exchange!',
    'Our $10,000 fundraising goal covers travel, meals, and experiences for all students. Here are all the ways you can help — from donations and raffle tickets to attending our upcoming events.',
    v_author_id,
    'published',
    '2026-04-22T09:00:00-07:00'
  )
  ON CONFLICT (slug) DO NOTHING;

  -- Post 3: Raffle launch (scheduled: Apr 28)
  INSERT INTO public.blog_posts (title, slug, content, excerpt, author_id, status, published_at)
  VALUES (
    'Raffle Now Open — Great Prizes, Great Cause!',
    'raffle-now-open',
    E'Our exchange raffle is officially open! This is one of the easiest and most fun ways to support our students'' journey to Île-à-la-Crosse.\n\nWe have put together a collection of prizes donated by generous local businesses and community members. Every ticket purchased goes directly toward funding the exchange trip.\n\nTickets are available in singles or bundles — check our Support page for pricing and details. The more tickets you buy, the better your chances and the more you help our students!\n\nWinners will be drawn at our Mystery Dinner Theatre event in May, so you can be there in person to see if your name is called.\n\nThank you to all the local businesses who donated prizes. Your support means the world to our class and our school community.\n\nHead to our Support page to grab your tickets today!',
    'Our raffle is officially open with great prizes from local businesses! Every ticket helps fund the exchange. Winners drawn at the Dinner Theatre in May.',
    v_author_id,
    'published',
    '2026-04-28T09:00:00-07:00'
  )
  ON CONFLICT (slug) DO NOTHING;

  -- Post 4: Preparing to welcome guests (scheduled: May 5)
  INSERT INTO public.blog_posts (title, slug, content, excerpt, author_id, status, published_at)
  VALUES (
    'Preparing to Welcome Our Guests from the North',
    'preparing-to-welcome-our-guests',
    E'With the exchange visit just around the corner, our class is busy preparing to welcome the students from Île-à-la-Crosse to Nelson.\n\nThe students have been learning about Métis history and culture, the geography of northern Saskatchewan, and what life looks like in a community like Sakitawak — a place shaped by waterways, fur trade history, and the Cree and Michif languages that are still spoken there today.\n\nWe have been planning activities that will give our guests a real taste of life in the Kootenays: nature walks, hands-on arts and crafts sessions, music, and community gatherings. We want them to feel welcomed, respected, and at home.\n\nOur students are also reflecting on what it means to be a good host. This exchange is reciprocal — the way we welcome their community sets the tone for how we will be received when we travel north. We are talking about respect, curiosity, listening, and the importance of showing up with an open heart.\n\nWe are also coordinating with host families who will be opening their homes during the visit. If you are interested in hosting or helping out during the May visit, please reach out to the school.\n\nStay tuned for photos and stories once our guests arrive!',
    'Our class is preparing to welcome students from Île-à-la-Crosse — learning about Métis culture, planning activities, and reflecting on what it means to be thoughtful hosts.',
    v_author_id,
    'published',
    '2026-05-05T09:00:00-07:00'
  )
  ON CONFLICT (slug) DO NOTHING;

  -- Post 5: Midpoint fundraising update (scheduled: May 19)
  INSERT INTO public.blog_posts (title, slug, content, excerpt, author_id, status, published_at)
  VALUES (
    'Fundraising Update: We Are Getting Closer!',
    'fundraising-update-getting-closer',
    E'We wanted to take a moment to thank everyone who has donated, bought raffle tickets, or shared our campaign so far. Your support is making a real difference.\n\nOur fundraising thermometer is climbing, and we are feeling the momentum! But we still have a way to go to reach our $10,000 goal, and every contribution — big or small — helps us get there.\n\nHere are a few ways you can help us in the home stretch:\n\nShare our website with someone who hasn''t seen it yet. A quick text or email to a friend or family member can go a long way.\n\nPick up a few extra raffle tickets. They make great gifts, and you might win something wonderful.\n\nJoin us at the Mystery Dinner Theatre! Tickets are selling and it promises to be an unforgettable evening.\n\nWe are so proud of what our class and community have accomplished together. This exchange is about more than fundraising — it is about showing our students that their community believes in them and in the power of connection across cultures.\n\nThank you for being part of this journey!',
    'A heartfelt thank you to everyone who has supported us so far. We are making progress toward our $10,000 goal — here is how you can help us in the home stretch.',
    v_author_id,
    'published',
    '2026-05-19T09:00:00-07:00'
  )
  ON CONFLICT (slug) DO NOTHING;

  -- Post 6: Countdown to travel (scheduled: Jun 8)
  INSERT INTO public.blog_posts (title, slug, content, excerpt, author_id, status, published_at)
  VALUES (
    'Bags Are (Almost) Packed: Countdown to Sakitawak',
    'countdown-to-sakitawak',
    E'The day is almost here. Our Class 8/9 is in the final stages of preparing for our journey to Île-à-la-Crosse — Sakitawak — in northern Saskatchewan.\n\nAfter months of fundraising, learning, and building connections, our students are ready to experience this community firsthand. They will spend time with their host families, participate in land-based learning, hear stories from Elders, and explore one of the most beautiful and historically rich regions in the province.\n\nWe want to remind everyone that we are guests in a Métis community with a long memory and a strong sense of care for land, language, and relationships. Our students'' behaviour reflects not just on themselves, but on our school and our ability to continue participating in exchanges like this in the future.\n\nOur students understand this responsibility, and they are rising to meet it.\n\nWe will be sharing photos and updates during the trip, so keep an eye on this page and our social media channels.\n\nA huge thank you to every single person who donated, bought raffle tickets, attended the dinner theatre, or simply cheered us on. You made this possible.\n\nSakitawak, here we come!',
    'The countdown is on! Our class is in the final stages of preparing for our journey to Sakitawak. Thank you to everyone who made this possible.',
    v_author_id,
    'published',
    '2026-06-08T09:00:00-07:00'
  )
  ON CONFLICT (slug) DO NOTHING;

END $$;
