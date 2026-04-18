import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Users, Heart, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/useFundraisingData";
import { SITE_CONFIG } from "@/lib/constants";
import ilcWelcome from "@/assets/ile-a-la-crosse-welcome.png";
import historicMap from "@/assets/historic-map-texture.png";

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
      time: "May 2026",
      description: "Welcoming students from Île-à-la-Crosse to our school and community",
      status: "upcoming",
    },
    {
      phase: "Travel to Saskatchewan",
      time: "June 2026",
      description: "Our class travels to Île-à-la-Crosse (Sakitawak) to experience life in their community",
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
              {SITE_CONFIG.schoolName} with Île-à-la-Crosse (Sakitawak), Saskatchewan — the
              second oldest settlement in the province and the Métis Capital of the North.
            </p>
          </div>
        </div>
      </section>

      {/* The Exchange Program */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Historic map background texture */}
        <div
          className="absolute inset-0 opacity-[0.06] bg-center bg-cover pointer-events-none"
          style={{ backgroundImage: `url(${historicMap})` }}
        />
        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="font-serif text-3xl font-bold mb-6">
                What Is the Experience Canada Exchange?
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Our school has officially been twinned with the{" "}
                  <span className="font-medium text-foreground">{communityName}</span> in Saskatchewan
                  through the Experience Canada Exchange program. Île-à-la-Crosse — known locally
                  as <span className="font-medium text-foreground">Sakitawak</span>, which is Cree
                  for "where the rivers meet" — is the second oldest settlement in Saskatchewan,
                  founded in 1776, and is often called the Métis Capital of the North.
                </p>
                <p>
                  This is not a typical school trip. It is an invitation into a living community
                  with deep roots, strong traditions, and a powerful sense of shared responsibility.
                  Île-à-la-Crosse is a place shaped by waterways, stories, language, land-based
                  knowledge, and generations of people who value respect, cooperation, and care
                  for one another.
                </p>
                <p>
                  This is a <span className="font-medium text-foreground">reciprocal exchange</span>, meaning both groups
                  host and travel. In <span className="font-medium text-foreground">May</span>, students from Île-à-la-Crosse
                  will visit us at our school in Nelson. Then in <span className="font-medium text-foreground">June</span>,
                  our students travel to Saskatchewan to experience life in their community firsthand.
                </p>
              </div>
            </div>
            <div className="bg-sand/50 rounded-2xl p-8 space-y-6">
              <img
                src={ilcWelcome}
                alt="Welcome to the Northern Village of Île-à-la-Crosse sign"
                className="w-full rounded-xl object-cover"
              />
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
                    They visit us in May • We travel in June
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
                In Île-à-la-Crosse / Sakitawak (June)
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Meaningful cultural learning with a Métis community
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Connection to place and history in one of Saskatchewan's oldest settlements
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Land-based learning and outdoor experiences in northern Saskatchewan's beautiful landscape
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Learning about Cree and Michif language, stories, and traditions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Growing into more responsible, thoughtful young people through community connection
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-8 border border-border">
              <h3 className="font-serif text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-2xl">🌲</span>
                When We Host in Nelson (May)
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
