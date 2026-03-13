import { motion } from "framer-motion";
import { Layers, MessageSquare, Clock, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Compare Quotes in Seconds",
    description: "Our AI scans 50+ carriers to find you the best coverage at the best price — instantly.",
  },
  {
    icon: MessageSquare,
    title: "24/7 AI Support",
    description: "Get answers to your policy questions anytime, day or night, without waiting on hold.",
  },
  {
    icon: Clock,
    title: "Bind Coverage Instantly",
    description: "No paperwork, no waiting. Get your policy documents in your inbox within minutes.",
  },
  {
    icon: ShieldCheck,
    title: "Independent & Unbiased",
    description: "We work for you, not the carriers. Get honest recommendations tailored to your needs.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Insurance, reimagined.
          </h2>
          <p className="mt-4 text-muted-foreground">
            We combine the trust of an independent agency with the speed of AI to give you a better experience.
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
