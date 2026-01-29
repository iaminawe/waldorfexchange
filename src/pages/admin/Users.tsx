import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Loader2, Users, Shield } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

interface RoleForm {
  userId: string;
  role: AppRole;
}

export default function AdminUsers() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<RoleForm>({ userId: "", role: "student_editor" });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: roles, isLoading } = useQuery({
    queryKey: ["admin-user-roles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("*, profiles(display_name)")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const { data: profiles } = useQuery({
    queryKey: ["all-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("user_id, display_name")
        .order("display_name");
      
      if (error) throw error;
      return data;
    },
  });

  const addRole = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("user_roles").insert({
        user_id: form.userId,
        role: form.role,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-user-roles"] });
      setDialogOpen(false);
      setForm({ userId: "", role: "student_editor" });
      toast({ title: "Role assigned" });
    },
    onError: (error: Error) => {
      toast({ title: "Error assigning role", description: error.message, variant: "destructive" });
    },
  });

  const deleteRole = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("user_roles").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-user-roles"] });
      toast({ title: "Role removed" });
    },
    onError: (error: Error) => {
      toast({ title: "Error removing role", description: error.message, variant: "destructive" });
    },
  });

  // Filter out users who already have roles
  const usersWithoutRoles = profiles?.filter(
    p => !roles?.some(r => r.user_id === p.user_id)
  ) || [];

  return (
    <AdminLayout title="User Management">
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Admin Users
              </CardTitle>
              <CardDescription>
                Manage who can access the admin dashboard
              </CardDescription>
            </div>
            <Button onClick={() => setDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add User
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
              </div>
            ) : roles && roles.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="hidden md:table-cell">Added</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((role) => {
                      const profileData = role.profiles as { display_name?: string } | null;
                      return (
                        <TableRow key={role.id}>
                          <TableCell className="font-medium">
                            {profileData?.display_name || "Unknown User"}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Shield className={`h-4 w-4 ${
                                role.role === "teacher" ? "text-primary" : "text-muted-foreground"
                              }`} />
                              <span className="capitalize">{role.role.replace("_", " ")}</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {new Date(role.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteRole.mutate(role.id)}
                              disabled={deleteRole.isPending}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No admin users configured yet.
              </div>
            )}
          </CardContent>
        </Card>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Admin User</DialogTitle>
              <DialogDescription>
                Grant admin access to a registered user
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); addRole.mutate(); }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="user">User *</Label>
                {usersWithoutRoles.length > 0 ? (
                  <Select value={form.userId} onValueChange={(value) => setForm({ ...form, userId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a user" />
                    </SelectTrigger>
                    <SelectContent>
                      {usersWithoutRoles.map((profile) => (
                        <SelectItem key={profile.user_id} value={profile.user_id}>
                          {profile.display_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-sm text-muted-foreground py-2">
                    All registered users already have roles assigned.
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select value={form.role} onValueChange={(value: AppRole) => setForm({ ...form, role: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teacher">Teacher (Full Access)</SelectItem>
                    <SelectItem value="student_editor">Student Editor (Blog Only)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={addRole.isPending || !form.userId}>
                  {addRole.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  Add User
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
