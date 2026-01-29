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
    <section className="bg-muted/50">
      <div className="container py-12 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold">
                ✨ Class Exchange Fundraiser
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Building Bridges, Sharing Stories
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              The {SITE_CONFIG.className} class at {SITE_CONFIG.schoolName} is raising funds 
              for a cultural exchange with students from <span className="font-semibold text-foreground">{communityName}</span>. 
              Help us create unforgettable memories!
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button asChild size="lg" className="gap-2 rounded-xl font-bold">
                <Link to="/support">
                  <Heart className="h-5 w-5" />
                  Donate Now
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2 rounded-xl font-bold">
                <Link to="/support#raffle">
                  <Ticket className="h-5 w-5" />
                  Buy Raffle Tickets
                </Link>
              </Button>
            </div>

            <div className="pt-2">
              <Link 
                to="/about" 
                className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
              >
                Learn more about our journey
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Photo + Thermometer */}
          <div className="flex flex-col items-center gap-8">
            {/* Placeholder Photo */}
            <div className="w-full max-w-md">
              <div className="aspect-[4/3] rounded-2xl bg-muted border-2 border-border overflow-hidden">
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-primary/5 to-accent/5">
                  <span className="text-5xl mb-3">📸</span>
                  <p className="font-display text-lg font-semibold text-foreground mb-1">
                    Class Photo Coming Soon
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Our {SITE_CONFIG.className} class preparing for the exchange
                  </p>
                </div>
              </div>
            </div>

            {/* Thermometer */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
              <ProgressThermometer size="md" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
