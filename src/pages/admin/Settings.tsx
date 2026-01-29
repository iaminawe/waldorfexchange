import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useSiteSettings } from "@/hooks/useFundraisingData";
import { Loader2, Settings, Target, Building } from "lucide-react";

export default function AdminSettings() {
  const { data: settings, isLoading } = useSiteSettings();
  const [goalAmount, setGoalAmount] = useState("");
  const [communityName, setCommunityName] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (settings) {
      setGoalAmount(settings.fundraisingGoal.amount.toString());
      setCommunityName(settings.communityName);
    }
  }, [settings]);

  const updateGoal = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("site_settings")
        .upsert({
          key: "fundraising_goal",
          value: { amount: parseFloat(goalAmount), currency: "CAD" },
        }, { onConflict: "key" });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast({ title: "Fundraising goal updated" });
    },
    onError: (error: Error) => {
      toast({ title: "Error updating goal", description: error.message, variant: "destructive" });
    },
  });

  const updateCommunityName = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("site_settings")
        .upsert({
          key: "community_name",
          value: { name: communityName, placeholder: false },
        }, { onConflict: "key" });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast({ title: "Community name updated" });
    },
    onError: (error: Error) => {
      toast({ title: "Error updating name", description: error.message, variant: "destructive" });
    },
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  if (isLoading) {
    return (
      <AdminLayout title="Settings">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Settings">
      <div className="space-y-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Fundraising Goal
            </CardTitle>
            <CardDescription>
              Set the target amount for your fundraising campaign
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); updateGoal.mutate(); }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goal">Goal Amount (CAD)</Label>
                <Input
                  id="goal"
                  type="number"
                  min="0"
                  step="100"
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(e.target.value)}
                  placeholder="10000"
                />
                {settings && (
                  <p className="text-sm text-muted-foreground">
                    Current goal: {formatCurrency(settings.fundraisingGoal.amount)}
                  </p>
                )}
              </div>
              <Button type="submit" disabled={updateGoal.isPending}>
                {updateGoal.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Update Goal
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Community Name
            </CardTitle>
            <CardDescription>
              The partner community name shown on the website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); updateCommunityName.mutate(); }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="community-name">Community Name</Label>
                <Input
                  id="community-name"
                  value={communityName}
                  onChange={(e) => setCommunityName(e.target.value)}
                  placeholder="Partner Community"
                />
                {settings?.isPlaceholder && (
                  <p className="text-sm text-warning">
                    Currently showing placeholder text
                  </p>
                )}
              </div>
              <Button type="submit" disabled={updateCommunityName.isPending}>
                {updateCommunityName.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Update Name
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
