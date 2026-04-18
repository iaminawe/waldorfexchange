import { Link } from "react-router-dom";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import { usePublishedPosts } from "@/hooks/useFundraisingData";

export function LatestUpdatesSection() {
  const { data: posts, isLoading } = usePublishedPosts();

  const recentPosts = posts?.slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-CA", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) return null;
  if (!recentPosts || recentPosts.length === 0) return null;

  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Latest Updates
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow along as we prepare for our exchange journey.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {recentPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-[16/9] bg-muted relative overflow-hidden">
                {post.featured_image_url ? (
                  <img
                    src={post.featured_image_url}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-forest/20 via-terracotta/10 to-sand">
                    <BookOpen className="h-10 w-10 text-primary/30" />
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-3.5 w-3.5" />
                  <time>{formatDate(post.published_at!)}</time>
                </div>
                <h3 className="font-serif text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors mb-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            View All Updates
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
