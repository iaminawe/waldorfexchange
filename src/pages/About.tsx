import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Users, Heart, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/useFundraisingData";
import { SITE_CONFIG } from "@/lib/constants";

export default function About() {
  const { data: settings } = useSiteSettings();
  const communityName = settings?.communityName ?? SITE_CONFIG.communityPlaceholder;

  const timeline = [
    {
      phase: "Preparation",
      description: "Fundraising, cultural learning, and building anticipation",
      status: "current",
    },
    {
      phase: "Northern Visit",
      description: `Our class travels to ${communityName}`,
      status: "upcoming",
    },
    {
      phase: "Hosting",
      description: "We welcome students to Nelson and share our community",
      status: "upcoming",
    },
    {
      phase: "Reflection",
      description: "Sharing our experiences and maintaining connections",
      status: "upcoming",
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 gradient-warm">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              About the Exchange
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A transformative journey connecting young people from{" "}
              {SITE_CONFIG.schoolName} with students from {communityName}.
            </p>
          </div>
        </div>
      </section>

      {/* The Exchange Program */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="font-serif text-3xl font-bold mb-6">
                What Is This Exchange?
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The Class Exchange Program is a cornerstone of Waldorf education's 
                  commitment to fostering global citizenship and cultural understanding. 
                  For our {SITE_CONFIG.className} class, this means embarking on a 
                  meaningful journey to northern Saskatchewan.
                </p>
                <p>
                  Over the course of this program, our students will travel to{" "}
                  <span className="font-medium text-foreground">{communityName}</span>{" "}
                  to experience life in an indigenous community. They'll participate in 
                  traditional activities, learn from elders, and form genuine friendships 
                  with local students.
                </p>
                <p>
                  Later in the year, we'll have the honor of hosting those same students 
                  here in Nelson, sharing our Waldorf approach to learning and the natural 
                  beauty of our region.
                </p>
              </div>
            </div>
            <div className="bg-sand/50 rounded-2xl p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Two Communities</h3>
                  <p className="text-sm text-muted-foreground">
                    Nelson, BC and {communityName}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{SITE_CONFIG.className} Students</h3>
                  <p className="text-sm text-muted-foreground">
                    Young people ready to learn and grow together
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-forest/10 text-forest flex items-center justify-center">
                  <Heart className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Lasting Impact</h3>
                  <p className="text-sm text-muted-foreground">
                    Friendships and understanding that extend far beyond the visit
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Students Will Experience */}
      <section className="py-16 md:py-24 bg-sand/30">
        <div className="container">
          <h2 className="font-serif text-3xl font-bold text-center mb-12">
            What Students Will Experience
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-card rounded-xl p-8 border border-border">
              <h3 className="font-serif text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">🏔️</span>
                In the Northern Community
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Traditional indigenous ceremonies and storytelling
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Land-based learning activities
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Sharing meals and daily life with host families
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Learning about history, language, and culture
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Building genuine friendships across cultures
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-8 border border-border">
              <h3 className="font-serif text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">🌲</span>
                When We Host in Nelson
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-terracotta mt-1">•</span>
                  Waldorf education experiences and projects
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-terracotta mt-1">•</span>
                  Exploring the Kootenay region's natural beauty
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-terracotta mt-1">•</span>
                  Hands-on arts, crafts, and music sessions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-terracotta mt-1">•</span>
                  Community gatherings and shared celebrations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-terracotta mt-1">•</span>
                  Creating lasting memories together
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="font-serif text-3xl font-bold text-center mb-12">
            Our Journey Timeline
          </h2>

          <div className="max-w-2xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={item.phase} className="relative pl-12">
                    {/* Dot */}
                    <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      item.status === "current" 
                        ? "bg-terracotta text-terracotta-foreground" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      <Calendar className="h-4 w-4" />
                    </div>

                    <div className={`p-4 rounded-lg ${
                      item.status === "current" ? "bg-terracotta/10" : "bg-muted/50"
                    }`}>
                      <h3 className="font-semibold flex items-center gap-2">
                        {item.phase}
                        {item.status === "current" && (
                          <span className="text-xs bg-terracotta text-terracotta-foreground px-2 py-0.5 rounded">
                            Current Phase
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Help Make This Journey Possible
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Your support directly funds travel, accommodation, and meaningful 
            experiences for all the students involved in this exchange.
          </p>
          <Button asChild size="lg" variant="secondary" className="gap-2">
            <Link to="/support">
              Support Our Trip
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
