import { Calendar, Clock, MapPin, Ticket, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const shows = [
  { date: "May 7", day: "Thursday", time: "6:00 PM" },
  { date: "May 8", day: "Friday", time: "4:00 PM" },
  { date: "May 8", day: "Friday", time: "7:30 PM" },
];

export function DinnerTheatreSection() {
  return (
    <section className="py-16 md:py-24 bg-primary/5">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-terracotta/10 text-terracotta text-sm font-bold tracking-wider uppercase mb-4">
            <UtensilsCrossed className="h-4 w-4" />
            Featured Fundraiser Event
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-3 tracking-tight">
            Mystery at the <span className="text-primary">Grand Hotel</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A 1920s Dinner Theatre Production by Class 8/9
          </p>
        </div>

        {/* Content grid */}
        <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto items-start">
          {/* Left: Description */}
          <div className="space-y-6">
            <Card className="rounded-2xl border-2 border-primary/15 p-6 md:p-8">
              <p className="text-foreground/85 leading-relaxed text-lg">
                Step into the grand dining room of an elegant 1920s hotel for an
                evening of mystery, intrigue, and fine dining. Our Class 8/9
                actors will serve you a{" "}
                <strong className="text-primary">three-course meal</strong>{" "}
                during intermissions &mdash; all while staying in character!
              </p>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Who committed the crime? Join us for this immersive dinner
                theatre experience and help solve the mystery. All proceeds
                support the class exchange trip to Île-à-la-Crosse,
                Saskatchewan.
              </p>
            </Card>

            {/* Venue & pricing */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="rounded-xl border-2 border-primary/15 p-5">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm font-semibold uppercase tracking-wide">
                    Venue
                  </span>
                </div>
                <p className="font-display text-lg font-bold">Taghum Hall</p>
              </Card>
              <Card className="rounded-xl border-2 border-primary/15 p-5">
                <div className="flex items-center gap-2 text-terracotta mb-2">
                  <Ticket className="h-4 w-4" />
                  <span className="text-sm font-semibold uppercase tracking-wide">
                    Tickets
                  </span>
                </div>
                <p className="font-display font-bold">
                  <span className="text-lg">$35</span>
                  <span className="text-muted-foreground text-sm"> adult</span>
                </p>
                <p className="font-display font-bold">
                  <span className="text-lg">$22</span>
                  <span className="text-muted-foreground text-sm"> youth</span>
                </p>
              </Card>
            </div>

            <p className="text-xs text-muted-foreground italic pl-1">
              * Recommended for ages 6 and up. Pricing subject to change.
            </p>
          </div>

          {/* Right: Show times */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold text-primary flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5" />
              Three Performances
            </h3>

            {shows.map((show, i) => (
              <Card
                key={i}
                className="group rounded-xl border-2 border-primary/15 hover:border-primary/30 p-5 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display text-lg font-bold">
                      {show.day}, {show.date}
                    </p>
                    <div className="flex items-center gap-2 text-muted-foreground mt-1">
                      <Clock className="h-4 w-4" />
                      <span>{show.time}</span>
                    </div>
                  </div>
                  <div className="text-primary/50 group-hover:text-primary transition-colors">
                    <UtensilsCrossed className="h-6 w-6" />
                  </div>
                </div>
              </Card>
            ))}

            {/* CTA */}
            <div className="pt-4 space-y-3">
              <Button
                asChild
                size="lg"
                className="w-full gap-2 rounded-xl font-bold text-lg h-14"
              >
                <Link to="/support#events">
                  <Ticket className="h-5 w-5" />
                  Get Your Tickets
                </Link>
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Tickets also available from Class 8/9 students at the Co-op
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
