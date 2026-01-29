import { Link } from "react-router-dom";
import { ArrowRight, Heart, Ticket, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressThermometer } from "@/components/fundraising/ProgressThermometer";
import { useSiteSettings } from "@/hooks/useFundraisingData";
import { SITE_CONFIG } from "@/lib/constants";

export function HeroSection() {
  const { data: settings } = useSiteSettings();
  const communityName = settings?.communityName ?? SITE_CONFIG.communityPlaceholder;

  return (
    <section className="relative overflow-hidden gradient-hero">
      {/* Fun decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-coral/20 animate-float" style={{ animationDelay: "0s" }} />
        <div className="absolute top-32 right-20 w-16 h-16 rounded-full bg-sunny/30 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full bg-teal/20 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-40 right-1/3 w-12 h-12 rounded-full bg-lavender/40 animate-float" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-1/2 left-5 w-8 h-8 rounded-full bg-mint/30 animate-bounce-gentle" />
      </div>

      <div className="container relative py-16 md:py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-sunny/30 text-sunny-dark text-sm font-bold border-2 border-sunny/50">
                <Sparkles className="h-4 w-4" />
                Class Exchange Fundraiser
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Building Bridges, 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral via-sunny to-teal"> Sharing Stories</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              The {SITE_CONFIG.className} class at {SITE_CONFIG.schoolName} is raising funds 
              for an awesome cultural exchange with students from <span className="font-bold text-teal">{communityName}</span>! 
              Help us make unforgettable memories! 🎉
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="gap-2 rounded-xl font-bold text-base bg-coral hover:bg-coral-dark fun-shadow">
                <Link to="/support">
                  <Heart className="h-5 w-5" />
                  Donate Now
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2 rounded-xl font-bold text-base border-2 border-teal text-teal hover:bg-teal hover:text-white">
                <Link to="/support#raffle">
                  <Ticket className="h-5 w-5" />
                  Buy Raffle Tickets
                </Link>
              </Button>
            </div>

            <div className="pt-4">
              <Link 
                to="/about" 
                className="inline-flex items-center gap-2 text-lavender-dark hover:text-lavender font-bold group"
              >
                Learn more about our journey
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Thermometer */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-card/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-4 border-lavender/30">
              <ProgressThermometer size="lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
