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

const FeaturesSection = () => {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Insurance, radically simplified.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Sol Insurance is a modern, AI-powered agency specializing in home, auto, and renters insurance. We make it radically simple to bundle them together so you get better coverage at a better price.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            We're not a call center. We're not a legacy broker with a fax machine. Sol was built from the ground up on smart technology.
          </p>
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
