import { Link } from "react-router-dom";
import { Heart, Ticket, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRaffleTiers, useUpcomingEvents } from "@/hooks/useFundraisingData";

export function WaysToHelpSection() {
  const { data: raffleTiers } = useRaffleTiers();
  const { data: upcomingEvents } = useUpcomingEvents();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="py-16 md:py-24 bg-lavender-light/20">
      <div className="container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-coral/20 text-coral-dark text-sm font-bold mb-4">
            <Sparkles className="h-4 w-4" />
            Join the Fun!
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ways You Can Help 🙌
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every contribution, big or small, brings us closer to making this exchange a reality!
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Donate Card */}
          <Card className="relative overflow-hidden rounded-3xl border-3 border-coral/30 hover:border-coral/60 transition-colors hover:scale-[1.02] transition-transform">
            <div className="absolute top-0 right-0 w-40 h-40 bg-coral/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <CardHeader>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-coral/20 text-coral mb-3">
                <Heart className="h-7 w-7" />
              </div>
              <CardTitle className="font-display text-xl">Make a Donation</CardTitle>
              <CardDescription className="text-base">
                One-time donations of any amount are gratefully accepted! 💝
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                100% of donations go directly toward travel, accommodation, and activities 
                for the exchange program.
              </p>
              <Button asChild className="w-full gap-2 rounded-xl font-bold bg-coral hover:bg-coral-dark">
                <Link to="/support#donate">
                  Donate Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Raffle Card */}
          <Card className="relative overflow-hidden rounded-3xl border-3 border-teal/30 hover:border-teal/60 transition-colors hover:scale-[1.02] transition-transform">
            <div className="absolute top-0 right-0 w-40 h-40 bg-teal/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <CardHeader>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal/20 text-teal mb-3">
                <Ticket className="h-7 w-7" />
              </div>
              <CardTitle className="font-display text-xl">Buy Raffle Tickets</CardTitle>
              <CardDescription className="text-base">
                Win amazing prizes while supporting our cause! 🎟️
              </CardDescription>
            </CardHeader>
            <CardContent>
              {raffleTiers && raffleTiers.length > 0 ? (
                <ul className="space-y-2 mb-4">
                  {raffleTiers.map((tier) => (
                    <li key={tier.id} className="flex justify-between text-sm">
                      <span className="font-medium">{tier.name}</span>
                      <span className="font-bold text-teal">{formatCurrency(Number(tier.price))}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground mb-4">
                  Various ticket packages available at great prices!
                </p>
              )}
              <Button asChild variant="outline" className="w-full gap-2 rounded-xl font-bold border-2 border-teal text-teal hover:bg-teal hover:text-white">
                <Link to="/support#raffle">
                  Get Tickets
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Events Card */}
          <Card className="relative overflow-hidden rounded-3xl border-3 border-sunny/30 hover:border-sunny/60 transition-colors md:col-span-2 lg:col-span-1 hover:scale-[1.02] transition-transform">
            <div className="absolute top-0 right-0 w-40 h-40 bg-sunny/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <CardHeader>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sunny/20 text-sunny-dark mb-3">
                <Calendar className="h-7 w-7" />
              </div>
              <CardTitle className="font-display text-xl">Upcoming Events</CardTitle>
              <CardDescription className="text-base">
                Join us at community fundraising events! 🎪
              </CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingEvents && upcomingEvents.length > 0 ? (
                <ul className="space-y-3 mb-4">
                  {upcomingEvents.slice(0, 3).map((event) => (
                    <li key={event.id} className="text-sm">
                      <p className="font-bold">{event.title}</p>
                      <p className="text-muted-foreground">
                        {new Date(event.event_date).toLocaleDateString("en-CA", {
                          month: "short",
                          day: "numeric",
                        })}
                        {event.location && ` • ${event.location}`}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground mb-4">
                  Candy gram deliveries, can drives, grocery card sales, and more! 
                  Check back soon for upcoming events.
                </p>
              )}
              <Button asChild variant="outline" className="w-full gap-2 rounded-xl font-bold border-2 border-sunny text-sunny-dark hover:bg-sunny hover:text-white">
                <Link to="/support#events">
                  View All Events
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
