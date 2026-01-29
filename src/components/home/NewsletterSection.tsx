import { useState } from "react";
import { Mail, CheckCircle, Loader2, Send } from "lucide-react";
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
          is_confirmed: true,
        });

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already subscribed! 🎉",
            description: "This email is already on our mailing list!",
          });
        } else {
          throw error;
        }
      } else {
        setIsSubscribed(true);
        toast({
          title: "You're subscribed! 🎉",
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
    <section className="py-16 md:py-24 bg-gradient-to-br from-teal via-teal-dark to-teal text-white relative overflow-hidden">
      {/* Fun background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/10 animate-float" />
        <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-white/10 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-sunny/20 animate-bounce-gentle" />
      </div>

      <div className="container relative">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/20 mb-6">
            <Mail className="h-10 w-10" />
          </div>

          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Stay in the Loop! 📬
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Sign up for updates about our fundraising progress, trip preparations, 
            and stories from the exchange. We promise not to spam you!
          </p>

          {isSubscribed ? (
            <div className="flex items-center justify-center gap-3 p-6 rounded-2xl bg-white/20 border-2 border-white/30">
              <CheckCircle className="h-8 w-8 text-sunny" />
              <p className="font-bold text-lg">
                Awesome! You're now on our mailing list! 🎉
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white text-foreground placeholder:text-muted-foreground rounded-xl h-12 text-base border-2 border-white/50 focus:border-sunny"
                disabled={isSubmitting}
              />
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="gap-2 rounded-xl h-12 font-bold bg-sunny hover:bg-sunny-dark text-sunny-dark hover:text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Joining...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Subscribe
                  </>
                )}
              </Button>
            </form>
          )}

          <p className="text-sm text-white/60 mt-4">
            Unsubscribe anytime. We respect your privacy. ✌️
          </p>
        </div>
      </div>
    </section>
  );
}
