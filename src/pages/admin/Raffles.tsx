import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Loader2, Edit2, Ticket } from "lucide-react";

interface TierForm {
  id?: string;
  name: string;
  price: string;
  ticket_count: string;
  is_active: boolean;
}

const defaultTierForm: TierForm = {
  name: "",
  price: "",
  ticket_count: "1",
  is_active: true,
};

export default function AdminRaffles() {
  const [tierDialogOpen, setTierDialogOpen] = useState(false);
  const [tierForm, setTierForm] = useState<TierForm>(defaultTierForm);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: tiers, isLoading: tiersLoading } = useQuery({
    queryKey: ["admin-raffle-tiers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("raffle_tiers")
        .select("*")
        .order("sort_order");
      
      if (error) throw error;
      return data;
    },
  });

  const { data: purchases, isLoading: purchasesLoading } = useQuery({
    queryKey: ["admin-raffle-purchases"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("raffle_purchases")
        .select("*, raffle_tiers(name, price)")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const saveTier = useMutation({
    mutationFn: async () => {
      if (tierForm.id) {
        const { error } = await supabase
          .from("raffle_tiers")
          .update({
            name: tierForm.name,
            price: parseFloat(tierForm.price),
            ticket_count: parseInt(tierForm.ticket_count),
            is_active: tierForm.is_active,
          })
          .eq("id", tierForm.id);
        if (error) throw error;
      } else {
        const maxSort = tiers?.reduce((max, t) => Math.max(max, t.sort_order), 0) || 0;
        const { error } = await supabase.from("raffle_tiers").insert({
          name: tierForm.name,
          price: parseFloat(tierForm.price),
          ticket_count: parseInt(tierForm.ticket_count),
          is_active: tierForm.is_active,
          sort_order: maxSort + 1,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-raffle-tiers"] });
      queryClient.invalidateQueries({ queryKey: ["raffle-tiers"] });
      setTierDialogOpen(false);
      setTierForm(defaultTierForm);
      toast({ title: tierForm.id ? "Tier updated" : "Tier created" });
    },
    onError: (error: Error) => {
      toast({ title: "Error saving tier", description: error.message, variant: "destructive" });
    },
  });

  const deleteTier = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("raffle_tiers").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-raffle-tiers"] });
      queryClient.invalidateQueries({ queryKey: ["raffle-tiers"] });
      toast({ title: "Tier deleted" });
    },
    onError: (error: Error) => {
      toast({ title: "Error deleting tier", description: error.message, variant: "destructive" });
    },
  });

  const openEditTier = (tier: NonNullable<typeof tiers>[number]) => {
    setTierForm({
      id: tier.id,
      name: tier.name,
      price: tier.price.toString(),
      ticket_count: tier.ticket_count.toString(),
      is_active: tier.is_active,
    });
    setTierDialogOpen(true);
  };

  const openNewTier = () => {
    setTierForm(defaultTierForm);
    setTierDialogOpen(true);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
    }).format(value);
  };

  const totalRevenue = purchases?.reduce((sum, p) => {
    const tierData = p.raffle_tiers as { price?: number } | null;
    return sum + (tierData?.price || 0);
  }, 0) || 0;

  return (
    <AdminLayout title="Raffles">
      <div className="space-y-6">
        <Tabs defaultValue="tiers">
          <TabsList>
            <TabsTrigger value="tiers">Ticket Tiers</TabsTrigger>
            <TabsTrigger value="purchases">Purchases</TabsTrigger>
          </TabsList>

          <TabsContent value="tiers" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Ticket className="h-5 w-5" />
                    Raffle Tiers
                  </CardTitle>
                  <CardDescription>
                    Configure ticket pricing and packages
                  </CardDescription>
                </div>
                <Button onClick={openNewTier} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Tier
                </Button>
              </CardHeader>
              <CardContent>
                {tiersLoading ? (
                  <div className="text-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
                  </div>
                ) : tiers && tiers.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Tickets</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="w-[80px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tiers.map((tier) => (
                          <TableRow key={tier.id}>
                            <TableCell className="font-medium">{tier.name}</TableCell>
                            <TableCell>{formatCurrency(Number(tier.price))}</TableCell>
                            <TableCell>{tier.ticket_count}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                tier.is_active 
                                  ? "bg-success/10 text-success" 
                                  : "bg-muted text-muted-foreground"
                              }`}>
                                {tier.is_active ? "Active" : "Inactive"}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => openEditTier(tier)}
                                >
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => deleteTier.mutate(tier.id)}
                                  disabled={deleteTier.isPending}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No raffle tiers configured yet.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="purchases" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Raffle Purchases</CardTitle>
                <CardDescription>
                  {purchases?.length || 0} purchases totaling {formatCurrency(totalRevenue)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {purchasesLoading ? (
                  <div className="text-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
                  </div>
                ) : purchases && purchases.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Purchaser</TableHead>
                          <TableHead>Tier</TableHead>
                          <TableHead className="hidden md:table-cell">Ticket #s</TableHead>
                          <TableHead className="hidden md:table-cell">Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {purchases.map((purchase) => {
                          const tierData = purchase.raffle_tiers as { name?: string; price?: number } | null;
                          return (
                            <TableRow key={purchase.id}>
                              <TableCell>
                                <div>
                                  <p className="font-medium">{purchase.purchaser_name}</p>
                                  <p className="text-sm text-muted-foreground">{purchase.purchaser_email}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p>{tierData?.name || "Unknown"}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {tierData?.price ? formatCurrency(tierData.price) : "—"}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {purchase.ticket_numbers.length > 0 
                                  ? purchase.ticket_numbers.join(", ")
                                  : "—"
                                }
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {new Date(purchase.created_at).toLocaleDateString()}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No raffle purchases yet.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={tierDialogOpen} onOpenChange={setTierDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{tierForm.id ? "Edit Tier" : "Add Tier"}</DialogTitle>
              <DialogDescription>
                {tierForm.id ? "Update tier details" : "Create a new raffle ticket tier"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); saveTier.mutate(); }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tier-name">Name *</Label>
                <Input
                  id="tier-name"
                  value={tierForm.name}
                  onChange={(e) => setTierForm({ ...tierForm, name: e.target.value })}
                  placeholder="e.g., Single Ticket"
                  required
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="tier-price">Price *</Label>
                  <Input
                    id="tier-price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={tierForm.price}
                    onChange={(e) => setTierForm({ ...tierForm, price: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tier-tickets">Ticket Count *</Label>
                  <Input
                    id="tier-tickets"
                    type="number"
                    min="1"
                    value={tierForm.ticket_count}
                    onChange={(e) => setTierForm({ ...tierForm, ticket_count: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="tier-active"
                  checked={tierForm.is_active}
                  onCheckedChange={(checked) => setTierForm({ ...tierForm, is_active: checked })}
                />
                <Label htmlFor="tier-active">Active (visible on website)</Label>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setTierDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saveTier.isPending}>
                  {saveTier.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  {tierForm.id ? "Update" : "Create"} Tier
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
