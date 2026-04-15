import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RefreshCw, Megaphone, ClipboardCheck } from "lucide-react";

const BORSection = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-slate-50 py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-4">
          Already have insurance? Let Sol manage it.
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
          Sign a simple Broker of Record letter and we'll handle renewals,
          claims support, and coverage reviews — at no cost to you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
          {[
            { icon: RefreshCw, label: "We handle renewals" },
            { icon: Megaphone, label: "Claims advocacy" },
            { icon: ClipboardCheck, label: "Annual coverage review" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 bg-white rounded-xl px-8 py-6 shadow-sm border border-border"
            >
              <Icon className="h-6 w-6 text-primary" />
              <span className="font-medium text-foreground">{label}</span>
            </div>
          ))}
        </div>
        <Button
          size="lg"
          onClick={() => navigate("/bor")}
          className="px-10"
        >
          Get Started →
        </Button>
      </div>
    </section>
  );
};

export default BORSection;
