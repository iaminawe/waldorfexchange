import { Link } from "react-router-dom";
import { ArrowRight, Users, MapPin, Sparkles, Calendar, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteSettings, usePublishedPosts } from "@/hooks/useFundraisingData";
import { SITE_CONFIG } from "@/lib/constants";

export function StorySection() {
  const { data: settings } = useSiteSettings();
  const communityName = settings?.communityName ?? SITE_CONFIG.communityPlaceholder;
  const { data: posts } = usePublishedPosts(1);
  const latestPost = posts?.[0];

  const highlights = [
    {
      icon: Users,
      title: "Cultural Exchange",
      description: "An invitation into a living Métis community with deep roots, strong traditions, and a powerful sense of shared responsibility.",
    },
    {
      icon: MapPin,
      title: "Two-Way Journey",
      description: "We host visitors in Nelson first, then travel to Sakitawak — Cree for \"where the rivers meet\" — to experience their community.",
    },
    {
      icon: Sparkles,
      title: "Lifelong Connections",
      description: "Meaningful cultural learning, connection to place and history, and the chance to grow into more thoughtful young people.",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Why This Exchange Matters
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            This is not a typical school trip. It's an invitation into a community shaped by
            waterways, stories, language, and generations of people who value respect,
            cooperation, and care for one another.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {highlights.map((item) => (
            <div 
              key={item.title}
              className="text-center p-6 rounded-xl bg-muted/50 border border-border"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        {latestPost && (
          <div className="bg-card rounded-2xl p-8 md:p-10 border border-border">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="h-4 w-4" />
                  <time>
                    {new Date(latestPost.published_at!).toLocaleDateString("en-CA", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  {latestPost.title}
                </h3>
                {latestPost.excerpt && (
                  <p className="text-muted-foreground leading-relaxed">
                    {latestPost.excerpt}
                  </p>
                )}
                <Button asChild className="mt-6 gap-2 rounded-xl font-bold">
                  <Link to={`/blog/${latestPost.slug}`}>
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative">
                {latestPost.featured_image_url ? (
                  <img
                    src={latestPost.featured_image_url}
                    alt={latestPost.title}
                    className="aspect-[4/3] rounded-xl object-cover w-full"
                  />
                ) : (
                  <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-forest/20 via-terracotta/10 to-sand border border-border flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-primary/30" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
