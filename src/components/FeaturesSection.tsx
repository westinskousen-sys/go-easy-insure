import { motion } from "framer-motion";
import { Layers, MessageSquare, Clock, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Shop Dozens of Carriers Instantly",
    description: "We compare quotes from multiple top-rated carriers in seconds — so you get the best coverage at the best price without lifting a finger.",
  },
  {
    icon: ShieldCheck,
    title: "Independent & Unbiased",
    description: "We work for you, not the carriers. As an independent agency, we give you honest recommendations tailored to your actual needs.",
  },
  {
    icon: Clock,
    title: "Bind Coverage in Minutes",
    description: "No paperwork, no fax machines, no runaround. Get real, bindable quotes and your policy documents in minutes — not days.",
  },
  {
    icon: MessageSquare,
    title: "Real People When You Need Them",
    description: "Our quoting process is fast and digital, but our team is always available to help you understand your options or handle claims.",
  },
];

const howItWorks = [
  {
    icon: Layers,
    title: "1. Compare Top Carriers",
    description: "Answer a few quick questions and we instantly shop multiple A-rated carriers for you.",
  },
  {
    icon: ShieldCheck,
    title: "2. Choose the Best Fit",
    description: "Review clear options side-by-side so you can pick the right coverage with confidence.",
  },
  {
    icon: Clock,
    title: "3. Bind in Minutes",
    description: "Finalize online and get your policy documents fast, without paperwork or back-and-forth.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="about" className="pt-0 pb-20 md:pt-0 md:pb-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Insurance, radically simplified.
          </h2>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-3">
          {howItWorks.map((step) => (
            <div key={step.title} className="rounded-xl border border-border bg-card p-5 text-left">
              <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-2.5">
                <step.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-2.5">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
