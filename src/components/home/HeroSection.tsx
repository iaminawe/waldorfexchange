import { Link } from "react-router-dom";
import { ArrowRight, Heart, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressThermometer } from "@/components/fundraising/ProgressThermometer";
import { useSiteSettings } from "@/hooks/useFundraisingData";
import { SITE_CONFIG } from "@/lib/constants";

export function HeroSection() {
  const { data: settings } = useSiteSettings();
  const communityName = settings?.communityName ?? SITE_CONFIG.communityPlaceholder;

  return (
    <section className="relative overflow-hidden gradient-warm">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-forest/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-terracotta/10 blur-3xl" />
      </div>

      <div className="container relative py-16 md:py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Heart className="h-4 w-4" />
                Class Exchange Fundraiser
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Building Bridges, 
              <span className="text-primary"> Sharing Stories</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              The {SITE_CONFIG.className} class at {SITE_CONFIG.schoolName} is raising funds 
              for a cultural exchange with students from <span className="font-medium text-foreground">{communityName}</span>. 
              Help us create meaningful connections and lasting memories.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="gap-2">
                <Link to="/support">
                  <Heart className="h-5 w-5" />
                  Donate Now
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <Link to="/support#raffle">
                  <Ticket className="h-5 w-5" />
                  Buy Raffle Tickets
                </Link>
              </Button>
            </div>

            <div className="pt-4">
              <Link 
                to="/about" 
                className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
              >
                Learn more about our journey
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Thermometer */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-border/50">
              <ProgressThermometer size="lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
