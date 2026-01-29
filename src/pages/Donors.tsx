import { Layout } from "@/components/layout/Layout";
import { Heart, User } from "lucide-react";
import { useRecentDonors } from "@/hooks/useFundraisingData";
import { ProgressBar } from "@/components/fundraising/ProgressBar";

export default function Donors() {
  const { data: donors, isLoading } = useRecentDonors(50);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-CA", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 gradient-warm">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Our Generous Supporters
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Thank you to everyone who has contributed to making this exchange possible. 
              Your generosity means the world to our students!
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <ProgressBar />
          </div>
        </div>
      </section>

      {/* Donor Wall */}
      <section className="py-16 md:py-24">
        <div className="container">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-pulse-gentle">
                <Heart className="h-12 w-12 text-terracotta mx-auto mb-4" />
                <p className="text-muted-foreground">Loading our wonderful supporters...</p>
              </div>
            </div>
          ) : donors && donors.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {donors.map((donor) => (
                <div 
                  key={donor.id}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold truncate">{donor.donor_name}</h3>
                        <span className="text-sm text-terracotta font-medium">
                          {formatCurrency(Number(donor.amount))}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(donor.created_at)}
                      </p>
                      {donor.message && (
                        <p className="text-sm text-muted-foreground mt-3 italic">
                          "{donor.message}"
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-terracotta/10 mb-6">
                <Heart className="h-10 w-10 text-terracotta" />
              </div>
              <h2 className="font-serif text-2xl font-bold mb-4">
                Be Our First Donor!
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Your name could be the first on our donor wall. Every contribution, 
                big or small, makes a difference for our students.
              </p>
            </div>
          )}

          {/* Anonymous donors note */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              <Heart className="inline h-4 w-4 text-terracotta mr-1" />
              Some generous supporters have chosen to remain anonymous. 
              Thank you to all our donors, named and unnamed!
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
