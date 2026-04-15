import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Shield, TrendingDown } from "lucide-react";

const CheckPolicySection = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-[#0f172a] py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-white">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold mb-4">
              See if you're overpaying.
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Connect your existing insurance in 30 seconds. Our AI will analyze
              your coverage, find gaps, and show you if you can save.
            </p>
            <Button
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8"
              onClick={() => navigate("/check-policy")}
            >
              Check My Policy →
            </Button>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            {[
              { icon: Zap, label: "Instant coverage analysis" },
              { icon: TrendingDown, label: "AI-powered savings recommendations" },
              { icon: Shield, label: "No switching required yet" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 bg-white/10 rounded-xl px-5 py-4 text-white font-medium"
              >
                <Icon className="h-5 w-5 text-blue-400 shrink-0" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckPolicySection;
