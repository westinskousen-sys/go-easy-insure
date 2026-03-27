import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Shield, LogOut, FileText, ClipboardList, Settings,
  Car, Home, Heart, Briefcase, Activity, Umbrella,
  Download, Calendar, DollarSign, ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const policyTypeIcons: Record<string, React.ReactNode> = {
  auto: <Car className="h-5 w-5" />,
  home: <Home className="h-5 w-5" />,
  renters: <Home className="h-5 w-5" />,
  life: <Heart className="h-5 w-5" />,
  health: <Activity className="h-5 w-5" />,
  business: <Briefcase className="h-5 w-5" />,
};

const statusColors: Record<string, string> = {
  active: "bg-accent/10 text-accent border-accent/20",
  pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
  expired: "bg-muted text-muted-foreground border-border",
};

const Portal = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Change request form state
  const [selectedPolicyId, setSelectedPolicyId] = useState("");
  const [changeType, setChangeType] = useState("");
  const [changeDescription, setChangeDescription] = useState("");
  const [submittingChange, setSubmittingChange] = useState(false);

  // Fetch policies
  const { data: policies = [], isLoading: loadingPolicies } = useQuery({
    queryKey: ["policies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("policies")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  // Fetch documents
  const { data: documents = [], isLoading: loadingDocs } = useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("documents")
        .select("*, policies(policy_number, type)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  // Fetch change requests
  const { data: changeRequests = [], isLoading: loadingChanges, refetch: refetchChanges } = useQuery({
    queryKey: ["change-requests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("policy_change_requests")
        .select("*, policies(policy_number, type)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  // Fetch profile
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user!.id)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleSubmitChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPolicyId || !changeType || !changeDescription) return;
    setSubmittingChange(true);
    try {
      const { error } = await supabase.from("policy_change_requests").insert({
        user_id: user!.id,
        policy_id: selectedPolicyId,
        change_type: changeType,
        description: changeDescription,
      });
      if (error) throw error;
      toast({ title: "Request submitted", description: "We'll review your change request shortly." });
      setSelectedPolicyId("");
      setChangeType("");
      setChangeDescription("");
      refetchChanges();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setSubmittingChange(false);
    }
  };

  const activePolicies = policies.filter((p) => p.status === "active");
  const totalPremium = activePolicies.reduce((sum, p) => sum + (Number(p.premium_monthly) || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-heading text-lg font-bold text-foreground"
          >
            <Shield className="h-6 w-6 text-primary" />
            Sol Insurance
          </button>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {profile?.full_name || user?.email}
            </span>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-1">
              <LogOut className="h-4 w-4" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome & Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-heading text-3xl font-bold text-foreground">
            Welcome back, {profile?.full_name?.split(" ")[0] || "there"} 👋
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage your policies, documents, and coverage from one place.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Active Policies", value: activePolicies.length, icon: Umbrella, color: "text-primary" },
            { label: "Monthly Premium", value: `$${totalPremium.toFixed(2)}`, icon: DollarSign, color: "text-accent" },
            { label: "Documents", value: documents.length, icon: FileText, color: "text-primary" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-lg bg-primary/5 p-2 ${color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="text-2xl font-bold text-foreground">{value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="policies" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 sm:w-auto sm:grid-cols-none sm:inline-flex">
            <TabsTrigger value="policies" className="gap-1.5">
              <ClipboardList className="h-4 w-4" /> Policies
            </TabsTrigger>
            <TabsTrigger value="documents" className="gap-1.5">
              <FileText className="h-4 w-4" /> Documents
            </TabsTrigger>
            <TabsTrigger value="changes" className="gap-1.5">
              <Settings className="h-4 w-4" /> Changes
            </TabsTrigger>
          </TabsList>

          {/* Policies Tab */}
          <TabsContent value="policies" className="space-y-4">
            {loadingPolicies ? (
              <div className="flex justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : policies.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
                <Umbrella className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
                <h3 className="font-heading text-lg font-semibold text-foreground">No policies yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Get started by requesting a quote to find the best coverage for you.
                </p>
                <Button variant="hero" className="mt-4" onClick={() => navigate("/get-started")}>
                  Get a Quote
                </Button>
              </div>
            ) : (
              policies.map((policy) => (
                <div
                  key={policy.id}
                  className="group rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/5 p-2.5 text-primary">
                        {policyTypeIcons[policy.type] || <Shield className="h-5 w-5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-heading font-semibold text-foreground capitalize">
                            {policy.type} Insurance
                          </h3>
                          <Badge variant="outline" className={statusColors[policy.status]}>
                            {policy.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {policy.carrier} · #{policy.policy_number}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-3.5 w-3.5" />
                            ${Number(policy.premium_monthly).toFixed(2)}/mo
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(policy.start_date).toLocaleDateString()}
                            {policy.end_date && ` – ${new Date(policy.end_date).toLocaleDateString()}`}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="hidden h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground sm:block" />
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-4">
            {loadingDocs ? (
              <div className="flex justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : documents.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
                <FileText className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
                <h3 className="font-heading text-lg font-semibold text-foreground">No documents yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your insurance documents will appear here once your policies are set up.
                </p>
              </div>
            ) : (
              documents.map((doc: any) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/5 p-2 text-primary">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{doc.name}</p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {doc.type.replace(/_/g, " ")}
                        {doc.policies && ` · ${doc.policies.type} #${doc.policies.policy_number}`}
                      </p>
                    </div>
                  </div>
                  {doc.file_url && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={doc.file_url} target="_blank" rel="noreferrer" className="gap-1">
                        <Download className="h-4 w-4" /> Download
                      </a>
                    </Button>
                  )}
                </div>
              ))
            )}
          </TabsContent>

          {/* Changes Tab */}
          <TabsContent value="changes" className="space-y-6">
            {/* Submit new change request */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-4 font-heading text-lg font-semibold text-foreground">
                Request a Policy Change
              </h3>
              {policies.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  You need an active policy to request changes.
                </p>
              ) : (
                <form onSubmit={handleSubmitChange} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Policy</Label>
                      <Select value={selectedPolicyId} onValueChange={setSelectedPolicyId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a policy" />
                        </SelectTrigger>
                        <SelectContent>
                          {policies.map((p) => (
                            <SelectItem key={p.id} value={p.id}>
                              {p.type} · #{p.policy_number}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Type of Change</Label>
                      <Select value={changeType} onValueChange={setChangeType}>
                        <SelectTrigger>
                          <SelectValue placeholder="What kind of change?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="coverage_update">Update Coverage</SelectItem>
                          <SelectItem value="add_driver">Add Driver</SelectItem>
                          <SelectItem value="remove_driver">Remove Driver</SelectItem>
                          <SelectItem value="address_change">Change Address</SelectItem>
                          <SelectItem value="cancel">Cancel Policy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Describe the change</Label>
                    <Textarea
                      placeholder="Tell us what you'd like to change..."
                      value={changeDescription}
                      onChange={(e) => setChangeDescription(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="hero"
                    disabled={submittingChange || !selectedPolicyId || !changeType || !changeDescription}
                  >
                    {submittingChange ? "Submitting..." : "Submit Request"}
                  </Button>
                </form>
              )}
            </div>

            {/* Previous requests */}
            {loadingChanges ? (
              <div className="flex justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : changeRequests.length > 0 && (
              <div>
                <h3 className="mb-3 font-heading text-lg font-semibold text-foreground">
                  Previous Requests
                </h3>
                <div className="space-y-3">
                  {changeRequests.map((req: any) => (
                    <div
                      key={req.id}
                      className="rounded-xl border border-border bg-card p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-foreground capitalize">
                            {req.change_type.replace(/_/g, " ")}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {req.policies?.type} · #{req.policies?.policy_number}
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">{req.description}</p>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            req.status === "approved"
                              ? statusColors.active
                              : req.status === "denied"
                              ? statusColors.cancelled
                              : statusColors.pending
                          }
                        >
                          {req.status}
                        </Badge>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Submitted {new Date(req.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Portal;
