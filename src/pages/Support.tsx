import { Layout } from "@/components/layout/Layout";
import { Heart, Ticket, Calendar, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRaffleTiers, useUpcomingEvents } from "@/hooks/useFundraisingData";
import { ProgressBar } from "@/components/fundraising/ProgressBar";

export default function Support() {
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
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 gradient-warm">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Ways to Support
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every contribution brings us closer to our goal. Choose how you'd like to help!
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <ProgressBar />
          </div>
        </div>
      </section>

      {/* Donate Section */}
      <section id="donate" className="py-16 md:py-24 scroll-mt-20">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Heart className="h-4 w-4" />
                General Donations
              </div>
              <h2 className="font-serif text-3xl font-bold mb-4">
                Make a Donation
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Your donation goes directly toward making this cultural exchange 
                  possible. We're grateful for contributions of any size.
                </p>
                <p>
                  All donations are tracked and managed by the class parents and 
                  teachers to ensure transparency.
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>100% goes to trip costs</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Option to leave a message of support</span>
                </div>
              </div>
            </div>

            <Card className="border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="font-serif text-2xl">Donate Any Amount</CardTitle>
                <CardDescription>
                  Online payments coming soon! For now, please contact us to make a donation.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="p-8 rounded-xl bg-muted/50 mb-6">
                  <p className="text-muted-foreground mb-4">
                    Stripe integration for secure online donations is being set up.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    In the meantime, you can donate by cash or cheque at school events, 
                    or contact us directly.
                  </p>
                </div>
                <Button disabled className="w-full gap-2">
                  <Heart className="h-4 w-4" />
                  Online Donations Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Raffle Section */}
      <section id="raffle" className="py-16 md:py-24 bg-sand/30 scroll-mt-20">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-sm font-medium mb-4">
              <Ticket className="h-4 w-4" />
              Raffle Tickets
            </div>
            <h2 className="font-serif text-3xl font-bold mb-4">
              Win Great Prizes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Purchase raffle tickets for a chance to win amazing prizes 
              while supporting our exchange program!
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {raffleTiers && raffleTiers.length > 0 ? (
              raffleTiers.map((tier, index) => (
                <Card 
                  key={tier.id}
                  className={`relative ${index === raffleTiers.length - 1 ? "border-terracotta/40 ring-2 ring-terracotta/20" : ""}`}
                >
                  {index === raffleTiers.length - 1 && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-terracotta text-terracotta-foreground text-xs font-medium px-3 py-1 rounded-full">
                        Best Value
                      </span>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="font-serif text-xl">{tier.name}</CardTitle>
                    <CardDescription>
                      {tier.ticket_count} ticket{tier.ticket_count > 1 ? "s" : ""}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="font-serif text-4xl font-bold text-terracotta mb-6">
                      {formatCurrency(Number(tier.price))}
                    </p>
                    <Button 
                      variant={index === raffleTiers.length - 1 ? "default" : "outline"}
                      className="w-full gap-2"
                      disabled
                    >
                      <Ticket className="h-4 w-4" />
                      Coming Soon
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-muted-foreground">
                  Raffle ticket options will be available soon!
                </p>
              </div>
            )}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Raffle tickets go on sale <strong className="text-foreground">April 28</strong>!
              Available online and from Class 8/9 students at the Co-op.
            </p>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-16 md:py-24 scroll-mt-20">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/10 text-forest text-sm font-medium mb-4">
              <Calendar className="h-4 w-4" />
              Upcoming Events
            </div>
            <h2 className="font-serif text-3xl font-bold mb-4">
              Join Us at Community Events
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Throughout the year, we're hosting various fundraising events. 
              Come say hi and support our cause!
            </p>
          </div>

          {upcomingEvents && upcomingEvents.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {upcomingEvents.map((event) => (
                <Card key={event.id}>
                  <CardHeader>
                    <div className="text-sm text-terracotta font-medium">
                      {new Date(event.event_date).toLocaleDateString("en-CA", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <CardTitle className="font-serif">{event.title}</CardTitle>
                    {event.location && (
                      <CardDescription className="flex items-center gap-1">
                        📍 {event.location}
                      </CardDescription>
                    )}
                  </CardHeader>
                  {event.description && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {event.description}
                      </p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <Card className="text-center p-8">
                <Calendar className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Events Coming Soon</h3>
                <p className="text-muted-foreground">
                  We're planning candy gram deliveries, can drives, grocery card sales, 
                  and more! Check back soon for dates and details.
                </p>
              </Card>
            </div>
          )}

          <div className="mt-12 text-center">
            <div className="inline-block bg-card border border-border rounded-xl p-6 max-w-md">
              <h3 className="font-semibold mb-2">Want to help organize?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Parent volunteers are always welcome! Contact us if you'd like 
                to help with an upcoming event.
              </p>
              <Button variant="outline" className="gap-2">
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
