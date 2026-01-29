import { Link } from "react-router-dom";
import { ArrowRight, Users, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/useFundraisingData";
import { SITE_CONFIG } from "@/lib/constants";

export function StorySection() {
  const { data: settings } = useSiteSettings();
  const communityName = settings?.communityName ?? SITE_CONFIG.communityPlaceholder;

  const highlights = [
    {
      icon: Users,
      title: "Cultural Exchange",
      description: "Students from both communities will share their traditions, stories, and ways of life.",
    },
    {
      icon: MapPin,
      title: "Two-Way Journey",
      description: "Our class will visit the northern community, then host students here in Nelson.",
    },
    {
      icon: Sparkles,
      title: "Lifelong Connections",
      description: "Creating friendships and understanding that will last well beyond the classroom.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Why This Exchange Matters
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            This isn't just a field trip—it's an opportunity for young people from very different 
            backgrounds to learn from each other, build genuine relationships, and broaden their 
            understanding of the world.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-12">
          {highlights.map((item) => (
            <div 
              key={item.title}
              className="text-center p-6 rounded-xl bg-sand/50 border border-border/50"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-sm">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4">
                The Journey Ahead
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  First, we'll have the honor of hosting students from{" "}
                  <span className="font-medium text-foreground">{communityName}</span> here in 
                  Nelson, sharing our Waldorf education approach and the beauty of our region.
                </p>
                <p>
                  Then, our {SITE_CONFIG.className} class will travel north to experience 
                  life in their community firsthand, deepening the connections we've built.
                </p>
                <p>
                  Your support makes this transformative experience possible for all the 
                  students involved.
                </p>
              </div>
              <Button asChild className="mt-6 gap-2">
                <Link to="/about">
                  Read Our Full Story
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              {/* Placeholder for future photo */}
              <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-forest/20 via-terracotta/10 to-sand flex items-center justify-center">
                <div className="text-center p-6">
                  <Users className="h-16 w-16 text-primary/40 mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground italic">
                    Photo coming soon: Our class preparing for the journey
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
