import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Car,
  Home,
  Heart,
  Building2,
  Umbrella,
  Shield,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type InsuranceLine =
  | "auto"
  | "home"
  | "renters"
  | "life"
  | "health"
  | "business";

interface QuestionDef {
  id: string;
  label: string;
  why: string;
  type: "text" | "number" | "select" | "date";
  placeholder?: string;
  options?: string[];
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const LINES: {
  id: InsuranceLine;
  label: string;
  icon: React.ElementType;
  desc: string;
}[] = [
  { id: "auto", label: "Auto", icon: Car, desc: "Cars, trucks, motorcycles" },
  { id: "home", label: "Homeowners", icon: Home, desc: "Owner-occupied homes" },
  { id: "renters", label: "Renters", icon: Home, desc: "Rental properties" },
  { id: "life", label: "Life", icon: Heart, desc: "Term & whole life" },
  { id: "health", label: "Health", icon: Shield, desc: "Medical coverage" },
  {
    id: "business",
    label: "Business",
    icon: Building2,
    desc: "Commercial & liability",
  },
];

const BASIC_QUESTIONS: QuestionDef[] = [
  {
    id: "fullName",
    label: "Full Legal Name",
    why: "Carriers require your legal name to generate an accurate quote.",
    type: "text",
    placeholder: "Jane Doe",
  },
  {
    id: "email",
    label: "Email Address",
    why: "We'll send your quotes here — we never spam.",
    type: "text",
    placeholder: "jane@example.com",
  },
  {
    id: "phone",
    label: "Phone Number",
    why: "Some carriers offer better rates when they can verify your identity by phone.",
    type: "text",
    placeholder: "(555) 123-4567",
  },
  {
    id: "dob",
    label: "Date of Birth",
    why: "Age is one of the biggest rating factors across all insurance types.",
    type: "date",
  },
  {
    id: "zip",
    label: "ZIP Code",
    why: "Rates vary significantly by location due to local risk factors.",
    type: "text",
    placeholder: "90210",
  },
];

const LINE_QUESTIONS: Record<InsuranceLine, QuestionDef[]> = {
  auto: [
    {
      id: "auto_year",
      label: "Vehicle Year",
      why: "Newer vehicles cost more to repair, which affects your premium.",
      type: "number",
      placeholder: "2022",
    },
    {
      id: "auto_make",
      label: "Vehicle Make",
      why: "Certain makes have different safety ratings and theft rates.",
      type: "text",
      placeholder: "Toyota",
    },
    {
      id: "auto_model",
      label: "Vehicle Model",
      why: "The specific model determines repair costs and crash-test performance.",
      type: "text",
      placeholder: "Camry",
    },
    {
      id: "auto_vin",
      label: "VIN (optional)",
      why: "A VIN lets us pull exact specs and give the most accurate quote.",
      type: "text",
      placeholder: "1HGCM82633A004352",
    },
    {
      id: "auto_usage",
      label: "Primary Use",
      why: "Commute vs. pleasure driving affects your risk profile.",
      type: "select",
      options: ["Commute", "Pleasure", "Business", "Rideshare"],
    },
    {
      id: "auto_miles",
      label: "Annual Miles Driven",
      why: "Low-mileage drivers often qualify for significant discounts.",
      type: "number",
      placeholder: "12000",
    },
  ],
  home: [
    {
      id: "home_year",
      label: "Year Built",
      why: "Older homes may have outdated wiring or plumbing that affects rates.",
      type: "number",
      placeholder: "1995",
    },
    {
      id: "home_sqft",
      label: "Square Footage",
      why: "Larger homes cost more to rebuild, which determines your coverage limit.",
      type: "number",
      placeholder: "2000",
    },
    {
      id: "home_type",
      label: "Construction Type",
      why: "Frame, masonry, and other materials have different fire and weather resistance.",
      type: "select",
      options: ["Wood Frame", "Masonry", "Steel", "Other"],
    },
    {
      id: "home_roof",
      label: "Roof Age (years)",
      why: "Roofs older than 15 years can significantly increase premiums.",
      type: "number",
      placeholder: "5",
    },
  ],
  renters: [
    {
      id: "renters_value",
      label: "Estimated Personal Property Value",
      why: "This determines how much coverage you need for your belongings.",
      type: "number",
      placeholder: "15000",
    },
    {
      id: "renters_unit",
      label: "Unit Type",
      why: "Apartments, condos, and houses have different risk profiles.",
      type: "select",
      options: ["Apartment", "Condo", "Townhouse", "House"],
    },
  ],
  life: [
    {
      id: "life_coverage",
      label: "Desired Coverage Amount",
      why: "This is the payout your beneficiaries receive — typically 10–12× your annual income.",
      type: "select",
      options: ["$100,000", "$250,000", "$500,000", "$1,000,000", "$2,000,000+"],
    },
    {
      id: "life_term",
      label: "Term Length",
      why: "Longer terms lock in today's rate but cost more per month.",
      type: "select",
      options: ["10 years", "15 years", "20 years", "30 years", "Whole Life"],
    },
    {
      id: "life_tobacco",
      label: "Tobacco Use (last 12 months)?",
      why: "Tobacco use is a major health risk factor and significantly impacts life insurance rates.",
      type: "select",
      options: ["No", "Yes"],
    },
  ],
  health: [
    {
      id: "health_members",
      label: "Number of People to Cover",
      why: "We need to know if this is individual, couple, or family coverage.",
      type: "number",
      placeholder: "1",
    },
    {
      id: "health_type",
      label: "Plan Preference",
      why: "Different plan types balance premium cost vs. out-of-pocket expenses.",
      type: "select",
      options: ["HMO", "PPO", "EPO", "No Preference"],
    },
    {
      id: "health_income",
      label: "Household Income (approx.)",
      why: "Income determines if you qualify for subsidies on marketplace plans.",
      type: "select",
      options: ["Under $30k", "$30k–$50k", "$50k–$75k", "$75k–$100k", "$100k+"],
    },
  ],
  business: [
    {
      id: "biz_type",
      label: "Business Type",
      why: "Industry and structure determine which coverages you're required to carry.",
      type: "text",
      placeholder: "LLC, Restaurant, Consulting…",
    },
    {
      id: "biz_employees",
      label: "Number of Employees",
      why: "Employee count affects workers' comp and liability requirements.",
      type: "number",
      placeholder: "5",
    },
    {
      id: "biz_revenue",
      label: "Annual Revenue (approx.)",
      why: "Revenue helps carriers assess exposure and set coverage limits.",
      type: "select",
      options: [
        "Under $100k",
        "$100k–$500k",
        "$500k–$1M",
        "$1M–$5M",
        "$5M+",
      ],
    },
    {
      id: "biz_coverage",
      label: "Coverage Needed",
      why: "Different policies cover different risks — select all that apply.",
      type: "select",
      options: [
        "General Liability",
        "Professional Liability",
        "Workers' Comp",
        "Commercial Property",
        "Business Auto",
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const GetStarted = () => {
  const navigate = useNavigate();
  const [selectedLines, setSelectedLines] = useState<InsuranceLine[]>([]);
  const [currentStep, setCurrentStep] = useState(0); // 0 = pick lines, 1 = basic, 2+ = line-specific, last = review
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submittingQuote, setSubmittingQuote] = useState(false);

  const toggleLine = (line: InsuranceLine) =>
    setSelectedLines((prev) =>
      prev.includes(line) ? prev.filter((l) => l !== line) : [...prev, line]
    );

  /* Steps: [pick lines] + [basic info] + [one per selected line] + [review] */
  const steps = useMemo(() => {
    const s: { title: string; questions: QuestionDef[] }[] = [
      { title: "Choose Coverage", questions: [] },
      { title: "Basic Info", questions: BASIC_QUESTIONS },
    ];
    selectedLines.forEach((line) => {
      const meta = LINES.find((l) => l.id === line)!;
      s.push({ title: meta.label, questions: LINE_QUESTIONS[line] });
    });
    s.push({ title: "Review", questions: [] });
    return s;
  }, [selectedLines]);

  const totalSteps = steps.length;
  const progress = Math.round((currentStep / (totalSteps - 1)) * 100);
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;

  const canAdvance = () => {
    if (currentStep === 0) return selectedLines.length > 0;
    if (isLast) return true;
    // require non-optional fields filled
    const step = steps[currentStep];
    return step.questions.every((q) => {
      if (q.id.includes("optional") || q.id === "auto_vin") return true;
      return !!answers[q.id]?.trim();
    });
  };

  const setAnswer = (id: string, val: string) =>
    setAnswers((prev) => ({ ...prev, [id]: val }));

  const handleSubmitQuoteLead = async () => {
    if (submittingQuote) return;
    setSubmittingQuote(true);

    try {
      const payload = {
        full_name: answers.fullName || null,
        email: answers.email || null,
        phone: answers.phone || null,
        date_of_birth: answers.dob || null,
        zip_code: answers.zip || null,
        coverage_lines: selectedLines,
        raw_answers: answers,
      };

      const { error } = await (supabase as any).from("quote_leads").insert(payload);
      if (error) throw error;

      navigate("/confirmation");
    } catch (error) {
      console.error("Failed to submit quote lead:", error);
    } finally {
      setSubmittingQuote(false);
    }
  };

  const renderField = (q: QuestionDef) => (
    <div key={q.id} className="space-y-1.5">
      <Label htmlFor={q.id} className="text-sm font-medium text-foreground">
        {q.label}
      </Label>
      {q.type === "select" ? (
        <select
          id={q.id}
          value={answers[q.id] || ""}
          onChange={(e) => setAnswer(q.id, e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="">Select…</option>
          {q.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <Input
          id={q.id}
          type={q.type === "number" ? "number" : q.type === "date" ? "date" : "text"}
          placeholder={q.placeholder}
          value={answers[q.id] || ""}
          onChange={(e) => setAnswer(q.id, e.target.value)}
        />
      )}
      <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
        <HelpCircle className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
        {q.why}
      </p>
    </div>
  );

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-background">
      {/* Header bar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-heading text-lg font-bold text-foreground"
          >
            <Shield className="h-6 w-6 text-primary" />
            Sol Insurance
          </button>
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {totalSteps}
          </span>
        </div>
        {/* Progress bar */}
        <Progress value={progress} className="h-1 rounded-none" />
      </header>

      <main className="container mx-auto max-w-2xl px-4 pt-28 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
          >
            {/* -------- Step 0: Choose lines -------- */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="text-center">
                  <Umbrella className="mx-auto h-10 w-10 text-primary" />
                  <h1 className="mt-3 text-3xl font-bold text-foreground">
                    What do you need covered?
                  </h1>
                  <p className="mt-2 text-muted-foreground">
                    Select all the types of insurance you're interested in. We'll
                    only ask relevant questions for what you pick.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {LINES.map(({ id, label, icon: Icon, desc }) => {
                    const selected = selectedLines.includes(id);
                    return (
                      <button
                        key={id}
                        onClick={() => toggleLine(id)}
                        className={`group flex items-center gap-4 rounded-lg border-2 p-4 text-left transition-all ${
                          selected
                            ? "border-primary bg-primary/5"
                            : "border-border bg-card hover:border-primary/30"
                        }`}
                      >
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                            selected
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-muted-foreground group-hover:text-foreground"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <span className="font-semibold text-foreground">
                            {label}
                          </span>
                          <p className="text-xs text-muted-foreground">{desc}</p>
                        </div>
                        <Checkbox
                          checked={selected}
                          className="pointer-events-none"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* -------- Middle steps: questions -------- */}
            {currentStep > 0 && !isLast && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground">
                    {steps[currentStep].title}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {currentStep === 1
                      ? "We need a few basics to get started."
                      : `Tell us about your ${steps[currentStep].title.toLowerCase()} coverage needs.`}
                  </p>
                </div>
                <Card>
                  <CardContent className="space-y-5 pt-6">
                    {steps[currentStep].questions.map(renderField)}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* -------- Last step: Review -------- */}
            {isLast && (
              <div className="space-y-6">
                <div className="text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
                  <h2 className="mt-3 text-2xl font-bold text-foreground">
                    You're all set!
                  </h2>
                  <p className="mt-1 text-muted-foreground">
                    Review your information below, then submit to get your
                    personalized quotes.
                  </p>
                </div>

                {/* Summary cards */}
                <Card>
                  <CardContent className="divide-y divide-border pt-6">
                    {steps.slice(1, -1).map((step) => (
                      <div key={step.title} className="py-4 first:pt-0 last:pb-0">
                        <h3 className="mb-2 text-sm font-semibold text-primary">
                          {step.title}
                        </h3>
                        <dl className="grid gap-1 text-sm sm:grid-cols-2">
                          {step.questions.map((q) => (
                            <div key={q.id}>
                              <dt className="text-muted-foreground">{q.label}</dt>
                              <dd className="font-medium text-foreground">
                                {answers[q.id] || "—"}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setCurrentStep((s) => s - 1)}
            disabled={isFirst}
            className="gap-1"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>

          {isLast ? (
            <Button
              variant="hero"
              size="lg"
              className="gap-2 px-10"
              onClick={handleSubmitQuoteLead}
              disabled={submittingQuote}
            >
              {submittingQuote ? "Submitting..." : "Get My Quotes"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="hero"
              onClick={() => setCurrentStep((s) => s + 1)}
              disabled={!canAdvance()}
              className="gap-1"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default GetStarted;
