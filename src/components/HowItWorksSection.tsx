import { motion } from "framer-motion";
import { UserPlus, SlidersHorizontal, CheckCircle2 } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Tell Us About You", description: "Answer a few quick questions about what you need covered." },
  { icon: SlidersHorizontal, title: "Compare & Customize", description: "Our AI finds the best quotes and lets you tailor your coverage." },
  { icon: CheckCircle2, title: "Get Insured", description: "Bind your policy instantly and get your documents via email." },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="border-t border-border bg-card py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">How It Works</h2>
          <p className="mt-4 text-muted-foreground">Three simple steps to smarter coverage.</p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-10 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <step.icon className="h-6 w-6 text-primary" />
                <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
