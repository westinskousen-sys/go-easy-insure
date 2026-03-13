import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Is InsureAI a real insurance agency?", a: "Yes! We're a licensed, independent insurance agency. We work with 50+ top-rated carriers to find you the best coverage." },
  { q: "How does the AI work?", a: "Our AI analyzes your needs and compares quotes from dozens of carriers in real-time, finding you the best price and coverage combination in seconds." },
  { q: "What types of insurance do you offer?", a: "We offer auto, home, renters, life, and business insurance — all available through our self-serve platform." },
  { q: "Can I talk to a real person?", a: "Absolutely. While our AI handles most tasks, you can always reach a licensed agent through our chat or by scheduling a call." },
  { q: "How fast can I get a policy?", a: "Most customers are fully insured within 5 minutes. You'll receive your policy documents via email instantly after binding." },
];

const FAQSection = () => {
  return (
    <section id="faqs" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-muted-foreground">Everything you need to know about getting started.</p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="rounded-xl border border-border bg-card px-5">
                <AccordionTrigger className="text-left text-sm font-semibold text-foreground hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
