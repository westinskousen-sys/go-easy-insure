import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2 } from "lucide-react";

const BOR = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    carrier: "",
    policy_type: "",
    policy_number: "",
    signature: "",
  });

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const canSubmit =
    form.full_name &&
    form.email &&
    form.carrier &&
    form.policy_type &&
    form.signature &&
    authorized;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("bor_requests").insert({
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        carrier: form.carrier,
        policy_type: form.policy_type,
        policy_number: form.policy_number,
        signature: form.signature,
        signed_at: new Date().toISOString(),
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error("BOR submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 container mx-auto px-4 max-w-2xl">
        {submitted ? (
          <div className="text-center py-20">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
              You're all set.
            </h2>
            <p className="text-muted-foreground mb-6">
              We'll be in touch within one business day.
            </p>
            <Button onClick={() => navigate("/")}>Back to Home</Button>
          </div>
        ) : (
          <>
            <div className="text-center mb-10">
              <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                Let Sol Insurance Go to Bat for You.
              </h1>
              <p className="text-muted-foreground text-lg">
                Signing a Broker of Record letter takes 2 minutes and costs you
                nothing. It simply means Sol Insurance becomes your advocate —
                handling renewals, shopping your coverage annually, and
                supporting you through claims.
              </p>
            </div>
            <Card>
              <CardContent className="space-y-5 pt-6">
                {[
                  { label: "Full Name", field: "full_name", placeholder: "Jane Doe" },
                  { label: "Email", field: "email", placeholder: "jane@example.com" },
                  { label: "Phone", field: "phone", placeholder: "(555) 123-4567" },
                  { label: "Current Insurance Carrier", field: "carrier", placeholder: "State Farm, Progressive…" },
                ].map(({ label, field, placeholder }) => (
                  <div key={field} className="space-y-1.5">
                    <Label>{label}</Label>
                    <Input
                      placeholder={placeholder}
                      value={form[field as keyof typeof form]}
                      onChange={(e) => set(field, e.target.value)}
                    />
                  </div>
                ))}

                <div className="space-y-1.5">
                  <Label>Policy Type</Label>
                  <select
                    className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
                    value={form.policy_type}
                    onChange={(e) => set("policy_type", e.target.value)}
                  >
                    <option value="">Select…</option>
                    {["Auto", "Home", "Renters", "Bundle", "Other"].map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label>Policy Number (optional)</Label>
                  <Input
                    placeholder="Optional"
                    value={form.policy_number}
                    onChange={(e) => set("policy_number", e.target.value)}
                  />
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Checkbox
                    id="authorize"
                    checked={authorized}
                    onCheckedChange={(v) => setAuthorized(!!v)}
                  />
                  <label htmlFor="authorize" className="text-sm text-muted-foreground leading-snug cursor-pointer">
                    I authorize Sol Insurance to act as my Broker of Record for
                    the policy listed above.
                  </label>
                </div>

                <div className="space-y-1.5">
                  <Label>Electronic Signature — type your full name</Label>
                  <Input
                    placeholder="Jane Doe"
                    value={form.signature}
                    onChange={(e) => set("signature", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    By typing your name above you agree this constitutes a
                    legally binding electronic signature.
                  </p>
                </div>

                <Button
                  className="w-full mt-2"
                  disabled={!canSubmit || loading}
                  onClick={handleSubmit}
                >
                  {loading ? "Submitting…" : "Sign & Submit"}
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BOR;
