import { Link } from "react-router-dom";
import { ArrowRight, Heart, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressThermometer } from "@/components/fundraising/ProgressThermometer";
import { useSiteSettings } from "@/hooks/useFundraisingData";
import { SITE_CONFIG } from "@/lib/constants";
import nelsonHero from "@/assets/nelson-hero.jpeg";

export function HeroSection() {
  const { data: settings } = useSiteSettings();
  const communityName = settings?.communityName ?? SITE_CONFIG.communityPlaceholder;

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={nelsonHero} 
          alt="Nelson bridge at sunset with mountains" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/50" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card/90 text-primary text-sm font-bold">
                ✨ Class Exchange Fundraiser
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
              Building Bridges, Sharing Stories
            </h1>

            <p className="text-lg text-white/90 max-w-xl mx-auto lg:mx-0 leading-relaxed drop-shadow">
              The {SITE_CONFIG.className} class at {SITE_CONFIG.schoolName} is raising funds 
              for a cultural exchange with students from <span className="font-semibold text-white">{communityName}</span>. 
              Help us create unforgettable memories!
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button asChild size="lg" className="gap-2 rounded-xl font-bold">
                <Link to="/support">
                  <Heart className="h-5 w-5" />
                  Donate Now
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2 rounded-xl font-bold bg-card/90 hover:bg-card border-card">
                <Link to="/support#raffle">
                  <Ticket className="h-5 w-5" />
                  Buy Raffle Tickets
                </Link>
              </Button>
            </div>

            <div className="pt-2">
              <Link 
                to="/about" 
                className="inline-flex items-center gap-2 text-white hover:text-primary-foreground hover:underline font-semibold drop-shadow"
              >
                Learn more about our journey
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Thermometer */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border">
              <ProgressThermometer size="md" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
