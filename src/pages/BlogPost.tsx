import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar, User, BookOpen, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(`
          *,
          profiles:author_id(display_name)
        `)
        .eq("slug", slug)
        .eq("status", "published")
        .lte("published_at", new Date().toISOString())
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  const { data: relatedPosts } = useQuery({
    queryKey: ["related-posts", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, featured_image_url, published_at")
        .eq("status", "published")
        .lte("published_at", new Date().toISOString())
        .neq("slug", slug)
        .order("published_at", { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data;
    },
    enabled: !!slug && !!post,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-CA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Render content with basic formatting (paragraphs)
  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return null;
      
      // Handle single line breaks within paragraphs
      const lines = paragraph.split('\n').map((line, i) => (
        <span key={i}>
          {line}
          {i < paragraph.split('\n').length - 1 && <br />}
        </span>
      ));
      
      return (
        <p key={index} className="mb-4 leading-relaxed">
          {lines}
        </p>
      );
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading story...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <h1 className="font-serif text-2xl font-bold mb-2">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              This story doesn't exist or hasn't been published yet.
            </p>
            <Button asChild>
              <Link to="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Updates
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const authorData = post.profiles as { display_name?: string } | null;

  return (
    <Layout>
      {/* Hero / Header */}
      <article>
        <header className="py-12 md:py-20 gradient-warm">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <Link 
                to="/blog" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Updates
              </Link>

              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time>{formatDate(post.published_at!)}</time>
                </div>
                {authorData?.display_name && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{authorData.display_name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featured_image_url && (
          <div className="container py-8">
            <div className="max-w-4xl mx-auto">
              <img 
                src={post.featured_image_url} 
                alt={post.title}
                className="w-full rounded-xl shadow-lg object-cover aspect-[21/9]"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="py-8 md:py-12">
          <div className="container">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <div className="text-foreground text-lg">
                {renderContent(post.content)}
              </div>
            </div>
          </div>
        </div>

        {/* Footer / Share */}
        <div className="py-8 border-t border-border">
          <div className="container">
            <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-muted-foreground">
                Thank you for following our journey!
              </p>
              <Button asChild variant="outline">
                <Link to="/support">
                  Support Our Trip
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <h2 className="font-serif text-2xl font-bold text-center mb-8">
              More Stories
            </h2>
            <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
              {relatedPosts.map((related) => (
                <Link 
                  key={related.id}
                  to={`/blog/${related.slug}`}
                  className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-[16/9] bg-muted relative overflow-hidden">
                    {related.featured_image_url ? (
                      <img 
                        src={related.featured_image_url} 
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-forest/20 via-terracotta/10 to-sand">
                        <BookOpen className="h-8 w-8 text-primary/30" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                      {related.title}
                    </h3>
                    {related.published_at && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(related.published_at).toLocaleDateString("en-CA", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <NewsletterSection />
    </Layout>
  );
}
