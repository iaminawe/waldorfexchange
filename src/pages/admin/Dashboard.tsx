import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTotalRaised, useSiteSettings, useRecentDonors, usePublishedPosts } from "@/hooks/useFundraisingData";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Heart, Ticket, Users, BookOpen, TrendingUp } from "lucide-react";
import { ProgressBar } from "@/components/fundraising/ProgressBar";

export default function AdminDashboard() {
  const { data: settings } = useSiteSettings();
  const { data: totalRaised = 0 } = useTotalRaised();
  const { data: recentDonors } = useRecentDonors(5);
  const { data: recentPosts } = usePublishedPosts(3);

  // Get subscriber count
  const { data: subscriberCount = 0 } = useQuery({
    queryKey: ["subscriber-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("newsletter_subscribers")
        .select("*", { count: "exact", head: true })
        .is("unsubscribed_at", null);
      
      if (error) throw error;
      return count || 0;
    },
  });

  // Get donation count
  const { data: donationCount = 0 } = useQuery({
    queryKey: ["donation-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("donations")
        .select("*", { count: "exact", head: true });
      
      if (error) throw error;
      return count || 0;
    },
  });

  // Get raffle purchase count
  const { data: raffleCount = 0 } = useQuery({
    queryKey: ["raffle-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("raffle_purchases")
        .select("*", { count: "exact", head: true });
      
      if (error) throw error;
      return count || 0;
    },
  });

  const goal = settings?.fundraisingGoal.amount ?? 10000;
  const percentage = Math.min((totalRaised / goal) * 100, 100);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <AdminLayout title="Dashboard">
      {/* Progress Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Fundraising Progress
          </CardTitle>
          <CardDescription>
            {percentage.toFixed(0)}% of the way to our goal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProgressBar />
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
            <Heart className="h-4 w-4 text-terracotta" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRaised)}</div>
            <p className="text-xs text-muted-foreground">
              from {donationCount} donations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Raffle Sales</CardTitle>
            <Ticket className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{raffleCount}</div>
            <p className="text-xs text-muted-foreground">
              ticket purchases
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
            <Users className="h-4 w-4 text-forest" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscriberCount}</div>
            <p className="text-xs text-muted-foreground">
              email subscribers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <BookOpen className="h-4 w-4 text-bark" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentPosts?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              published posts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Donations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Donations</CardTitle>
          </CardHeader>
          <CardContent>
            {recentDonors && recentDonors.length > 0 ? (
              <div className="space-y-4">
                {recentDonors.map((donor) => (
                  <div key={donor.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{donor.donor_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(donor.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="font-semibold text-terracotta">
                      {formatCurrency(Number(donor.amount))}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No donations yet
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Posts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Posts</CardTitle>
          </CardHeader>
          <CardContent>
            {recentPosts && recentPosts.length > 0 ? (
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id}>
                    <p className="font-medium line-clamp-1">{post.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {post.published_at && new Date(post.published_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No posts published yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
