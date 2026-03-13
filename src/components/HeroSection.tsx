import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground">
            <Zap className="h-3.5 w-3.5 text-accent" />
            AI-Powered Insurance — No Agents Required
          </div>

          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl">
            Smarter Insurance,{" "}
            <span className="text-primary">Instantly.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Compare quotes, customize coverage, and get insured in minutes — all powered by AI, no paperwork or phone calls needed.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="hero" size="lg" className="gap-2 text-base px-8">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="hero-outline" size="lg" className="text-base px-8">
              Learn More
            </Button>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-6"
        >
          {[
            { icon: Shield, label: "Carriers", value: "50+" },
            { icon: BarChart3, label: "Avg. Savings", value: "32%" },
            { icon: Zap, label: "Quote Time", value: "<2 min" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold text-foreground md:text-3xl">{value}</span>
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
