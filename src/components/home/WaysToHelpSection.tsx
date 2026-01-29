import { Link } from "react-router-dom";
import { Heart, Ticket, Calendar, ArrowRight } from "lucide-react";
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
    <section className="py-16 md:py-24 bg-sand/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Ways You Can Help
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every contribution, big or small, brings us closer to making this exchange a reality.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Donate Card */}
          <Card className="relative overflow-hidden border-primary/20 hover:border-primary/40 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <CardHeader>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-2">
                <Heart className="h-6 w-6" />
              </div>
              <CardTitle className="font-serif">Make a Donation</CardTitle>
              <CardDescription>
                One-time donations of any amount are gratefully accepted
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                100% of donations go directly toward travel, accommodation, and activities 
                for the exchange program.
              </p>
              <Button asChild className="w-full gap-2">
                <Link to="/support#donate">
                  Donate Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Raffle Card */}
          <Card className="relative overflow-hidden border-terracotta/20 hover:border-terracotta/40 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <CardHeader>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-terracotta/10 text-terracotta mb-2">
                <Ticket className="h-6 w-6" />
              </div>
              <CardTitle className="font-serif">Buy Raffle Tickets</CardTitle>
              <CardDescription>
                Win amazing prizes while supporting our cause
              </CardDescription>
            </CardHeader>
            <CardContent>
              {raffleTiers && raffleTiers.length > 0 ? (
                <ul className="space-y-2 mb-4">
                  {raffleTiers.map((tier) => (
                    <li key={tier.id} className="flex justify-between text-sm">
                      <span>{tier.name}</span>
                      <span className="font-medium">{formatCurrency(Number(tier.price))}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground mb-4">
                  Various ticket packages available at great prices!
                </p>
              )}
              <Button asChild variant="secondary" className="w-full gap-2">
                <Link to="/support#raffle">
                  Get Tickets
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Events Card */}
          <Card className="relative overflow-hidden border-forest/20 hover:border-forest/40 transition-colors md:col-span-2 lg:col-span-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-forest/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <CardHeader>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-forest/10 text-forest mb-2">
                <Calendar className="h-6 w-6" />
              </div>
              <CardTitle className="font-serif">Upcoming Events</CardTitle>
              <CardDescription>
                Join us at community fundraising events
              </CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingEvents && upcomingEvents.length > 0 ? (
                <ul className="space-y-3 mb-4">
                  {upcomingEvents.slice(0, 3).map((event) => (
                    <li key={event.id} className="text-sm">
                      <p className="font-medium">{event.title}</p>
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
              <Button asChild variant="outline" className="w-full gap-2">
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
