import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePublishedPosts } from "@/hooks/useFundraisingData";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function Blog() {
  const { data: posts, isLoading } = usePublishedPosts();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 gradient-warm">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Updates & Stories
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Follow along as we prepare for our exchange, document our journey, 
              and share the experiences that shape our students.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 md:py-24">
        <div className="container">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-pulse-gentle">
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Loading stories...</p>
              </div>
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article 
                  key={post.id}
                  className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Featured Image */}
                  <div className="aspect-[16/9] bg-muted relative overflow-hidden">
                    {post.featured_image_url ? (
                      <img 
                        src={post.featured_image_url} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-forest/20 via-terracotta/10 to-sand">
                        <BookOpen className="h-12 w-12 text-primary/30" />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <time>{formatDate(post.published_at!)}</time>
                    </div>

                    {/* Title */}
                    <h2 className="font-serif text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Read More */}
                    <div className="flex items-center justify-end">
                      <Link 
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                <BookOpen className="h-10 w-10 text-primary" />
              </div>
              <h2 className="font-serif text-2xl font-bold mb-4">
                Stories Coming Soon
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Our students are getting ready to share their journey with you. 
                Sign up for updates to be notified when new stories are posted!
              </p>
              <Button asChild variant="outline">
                <a href="#newsletter">Get Notified</a>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <div id="newsletter">
        <NewsletterSection />
      </div>
    </Layout>
  );
}
