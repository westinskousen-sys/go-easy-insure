import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Award, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
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
            Digital-First Insurance — Based in Utah, Built for Everywhere
          </div>

          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl">
            Smarter Coverage,{" "}
            <span className="text-primary">Built for Real Life.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Bundle your home and auto. Compare top carriers instantly. Save time and money — without the hassle.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="hero" size="lg" className="gap-2 text-base px-8" onClick={() => navigate("/get-started")}>
              Get My Free Quote <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="hero-outline" size="lg" className="text-base px-8" onClick={() => {
              document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
            }}>
              See How It Works
            </Button>
          </div>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            { icon: Shield, label: "Licensed & Appointed" },
            { icon: Award, label: "A-Rated Carriers" },
            { icon: Zap, label: "Utah-Based Team" },
            { icon: Lock, label: "No Spam. No Selling Your Data." },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card/60 px-3 py-4">
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium text-muted-foreground text-center">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
