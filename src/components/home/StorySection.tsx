import { Link } from "react-router-dom";
import { ArrowRight, Users, MapPin, Sparkles, Star } from "lucide-react";
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
      color: "coral",
    },
    {
      icon: MapPin,
      title: "Two-Way Journey",
      description: "We host visitors first, then travel north to experience their community.",
      color: "teal",
    },
    {
      icon: Sparkles,
      title: "Lifelong Connections",
      description: "Creating friendships and understanding that will last well beyond the classroom.",
      color: "sunny",
    },
  ];

  const colorClasses = {
    coral: { bg: "bg-coral/10", text: "text-coral", border: "border-coral/30" },
    teal: { bg: "bg-teal/10", text: "text-teal", border: "border-teal/30" },
    sunny: { bg: "bg-sunny/10", text: "text-sunny-dark", border: "border-sunny/30" },
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lavender/20 text-lavender-dark text-sm font-bold mb-4">
            <Star className="h-4 w-4" />
            Why This Matters
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Why This Exchange Matters
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            This isn't just a field trip—it's an opportunity for young people from very different 
            backgrounds to learn from each other, build genuine relationships, and broaden their 
            understanding of the world! 🌍
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {highlights.map((item) => {
            const colors = colorClasses[item.color as keyof typeof colorClasses];
            return (
              <div 
                key={item.title}
                className={`text-center p-8 rounded-3xl ${colors.bg} border-3 ${colors.border} hover:scale-105 transition-transform`}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${colors.bg} ${colors.text} mb-4`}>
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-lavender-light/50 to-teal/10 rounded-3xl p-8 md:p-12 border-3 border-lavender/30">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
                The Journey Ahead 🚀
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  First, we'll have the honor of hosting students from{" "}
                  <span className="font-bold text-teal">{communityName}</span> here in 
                  Nelson, sharing our Waldorf education approach and the beauty of our region.
                </p>
                <p>
                  Then, our {SITE_CONFIG.className} class will travel north to experience 
                  life in their community firsthand, deepening the connections we've built.
                </p>
                <p>
                  Your support makes this transformative experience possible for all the 
                  students involved! 💪
                </p>
              </div>
              <Button asChild className="mt-6 gap-2 rounded-xl font-bold bg-teal hover:bg-teal-dark">
                <Link to="/about">
                  Read Our Full Story
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              {/* Placeholder for future photo */}
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-coral/20 via-sunny/20 to-teal/20 flex items-center justify-center border-3 border-dashed border-lavender">
                <div className="text-center p-6">
                  <div className="text-6xl mb-4">📸</div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Photo coming soon: Our class preparing for the journey!
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
