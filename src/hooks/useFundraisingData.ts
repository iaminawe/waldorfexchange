import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SITE_CONFIG } from "@/lib/constants";

interface FundraisingGoal {
  amount: number;
  currency: string;
}

interface SiteSettings {
  fundraisingGoal: FundraisingGoal;
  communityName: string;
  isPlaceholder: boolean;
}

// Type for the secure public donor view (excludes sensitive data)
export interface PublicDonor {
  id: string;
  donor_name: string;
  message: string | null;
  amount: number;
  created_at: string;
}

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async (): Promise<SiteSettings> => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value");
      
      if (error) throw error;

      const settings = data?.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {} as Record<string, unknown>) || {};

      const goalData = settings.fundraising_goal as { amount?: number; currency?: string } | undefined;
      const communityData = settings.community_name as { name?: string; placeholder?: boolean } | undefined;

      return {
        fundraisingGoal: {
          amount: goalData?.amount ?? SITE_CONFIG.defaultGoal,
          currency: goalData?.currency ?? SITE_CONFIG.currency,
        },
        communityName: communityData?.name ?? SITE_CONFIG.communityPlaceholder,
        isPlaceholder: communityData?.placeholder ?? true,
      };
    },
  });
}

export function useTotalRaised() {
  return useQuery({
    queryKey: ["total-raised"],
    queryFn: async (): Promise<number> => {
      // Get donation totals
      const { data: donations, error: donationsError } = await supabase
        .from("donations")
        .select("amount");
      
      if (donationsError) throw donationsError;

      // Get raffle purchase totals
      const { data: rafflePurchases, error: raffleError } = await supabase
        .from("raffle_purchases")
        .select("tier_id, raffle_tiers(price)");
      
      if (raffleError) throw raffleError;

      const donationTotal = donations?.reduce((sum, d) => sum + Number(d.amount), 0) || 0;
      const raffleTotal = rafflePurchases?.reduce((sum, rp) => {
        const tierData = rp.raffle_tiers as { price?: number } | null;
        return sum + (tierData?.price || 0);
      }, 0) || 0;

      return donationTotal + raffleTotal;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

export function useRecentDonors(limit = 10) {
  return useQuery<PublicDonor[]>({
    queryKey: ["recent-donors", limit],
    queryFn: async (): Promise<PublicDonor[]> => {
      // Use the secure public view that excludes sensitive data (email, payment IDs)
      const { data, error } = await supabase
        .from("donations_public" as any)
        .select("id, donor_name, message, amount, created_at")
        .order("created_at", { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return (data as unknown as PublicDonor[]) || [];
    },
  });
}

export function useRaffleTiers() {
  return useQuery({
    queryKey: ["raffle-tiers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("raffle_tiers")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      
      if (error) throw error;
      return data;
    },
  });
}

export function usePublishedPosts(limit?: number) {
  return useQuery({
    queryKey: ["published-posts", limit],
    queryFn: async () => {
      let query = supabase
        .from("blog_posts")
        .select(`
          id,
          title,
          slug,
          excerpt,
          featured_image_url,
          published_at,
          author_id
        `)
        .eq("status", "published")
        .lte("published_at", new Date().toISOString())
        .order("published_at", { ascending: false });
      
      if (limit) {
        query = query.limit(limit);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
  });
}

export function useUpcomingEvents() {
  return useQuery({
    queryKey: ["upcoming-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("upcoming_events")
        .select("*")
        .eq("is_active", true)
        .gte("event_date", new Date().toISOString())
        .order("event_date");
      
      if (error) throw error;
      return data;
    },
  });
}
