import { useState } from "react";
import { Mail, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast({
        title: "Invalid email",
        description: result.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ 
          email: email.toLowerCase().trim(),
          is_confirmed: true, // Auto-confirm for simplicity
        });

      if (error) {
        if (error.code === "23505") {
          // Duplicate email
          toast({
            title: "Already subscribed",
            description: "This email is already on our mailing list!",
          });
        } else {
          throw error;
        }
      } else {
        setIsSubscribed(true);
        toast({
          title: "You're subscribed!",
          description: "Thank you for joining our mailing list.",
        });
      }
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-foreground/10 mb-6">
            <Mail className="h-8 w-8" />
          </div>

          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Stay Updated on Our Journey
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Sign up for occasional updates about our fundraising progress, trip preparations, 
            and stories from the exchange. We promise not to spam you!
          </p>

          {isSubscribed ? (
            <div className="flex items-center justify-center gap-3 p-6 rounded-xl bg-primary-foreground/10">
              <CheckCircle className="h-6 w-6 text-success" />
              <p className="font-medium">
                Thank you! You're now on our mailing list.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-primary-foreground text-foreground placeholder:text-muted-foreground"
                disabled={isSubmitting}
              />
              <Button 
                type="submit" 
                variant="secondary"
                disabled={isSubmitting}
                className="gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          )}

          <p className="text-sm text-primary-foreground/60 mt-4">
            Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
