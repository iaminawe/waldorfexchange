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
      time: "Now",
      description: "Fundraising, cultural learning, and building anticipation",
      status: "current",
    },
    {
      phase: "Hosting in Nelson",
      time: "April 2026",
      description: "Students from Île-à-la-Crosse visit us at our school in Nelson",
      status: "upcoming",
    },
    {
      phase: "Travel to Saskatchewan",
      time: "June 2026",
      description: "Our class travels to Île-à-la-Crosse shortly before the end of the school year",
      status: "upcoming",
    },
    {
      phase: "Reflection",
      time: "Summer 2026",
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
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
              Experience Canada Exchange
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              About the Exchange
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A reciprocal exchange connecting {SITE_CONFIG.className} at{" "}
              {SITE_CONFIG.schoolName} with the {communityName} in Saskatchewan.
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
                What Is the Experience Canada Exchange?
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Our school has officially been twinned with the{" "}
                  <span className="font-medium text-foreground">{communityName}</span> in Saskatchewan 
                  through the Experience Canada Exchange program. This exchange will become our{" "}
                  {SITE_CONFIG.className} year-end trip!
                </p>
                <p>
                  This is a <span className="font-medium text-foreground">reciprocal exchange</span>, meaning both groups 
                  host and travel. In <span className="font-medium text-foreground">April</span>, students from Île-à-la-Crosse 
                  will visit us at our school in Nelson. Then in <span className="font-medium text-foreground">June</span>, 
                  our students travel to Saskatchewan, shortly before the end of the school year.
                </p>
                <p>
                  This timing was agreed upon after conversations with the Friendship Centre 
                  coordinator and fits well within our school calendars, allowing for a 
                  meaningful exchange experience.
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
                    Nelson, BC ↔ Île-à-la-Crosse, Saskatchewan
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Reciprocal Exchange</h3>
                  <p className="text-sm text-muted-foreground">
                    They visit us in April • We travel in June
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-forest/10 text-forest flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{SITE_CONFIG.className} Year-End Trip</h3>
                  <p className="text-sm text-muted-foreground">
                    A meaningful journey for our students
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sunny/10 text-sunny flex items-center justify-center">
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
                In Île-à-la-Crosse (June)
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Traditional Métis ceremonies and storytelling
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
                When We Host in Nelson (April)
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
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold flex items-center gap-2">
                            {item.phase}
                            {item.status === "current" && (
                              <span className="text-xs bg-terracotta text-terracotta-foreground px-2 py-0.5 rounded">
                                Current Phase
                              </span>
                            )}
                          </h3>
                          <span className="text-xs font-medium text-muted-foreground">
                            {item.time}
                          </span>
                        </div>
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
