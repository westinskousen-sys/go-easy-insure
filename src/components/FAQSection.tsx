import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "What types of insurance does Sol offer?",
    a: "We specialize in personal lines insurance — home, auto, and renters. We focus on bundles (home + auto, renters + auto) because that's where our customers get the most value.",
  },
  {
    q: "How does Sol find me the best rate?",
    a: "Sol shops multiple top-rated carriers simultaneously and presents you with real, bindable quotes. We're not tied to one company — our job is to find the best fit for you.",
  },
  {
    q: "Is Sol a real insurance agency?",
    a: "Yes. Sol Insurance is a licensed insurance agency. Your policies are backed by A-rated carriers — Sol handles the shopping, quoting, and service so you don't have to.",
  },
  {
    q: "Why should I bundle my home and auto (or renters and auto)?",
    a: "Bundling typically unlocks multi-policy discounts from carriers, meaning you pay less than if you bought each policy separately. It also simplifies your insurance — one agency, one renewal conversation.",
  },
  {
    q: "Will I work with a real person if I have questions?",
    a: "Yes. While our quoting process is fast and digital, our team is available to help you understand your options, make changes, or handle claims support.",
  },
  {
    q: "How is Sol different from going directly to an insurance company?",
    a: "When you go direct, you only see one company's rates. Sol shops multiple carriers at once so you can compare and get the best value — without having to do it yourself.",
  },
  {
    q: "Is my information safe?",
    a: "Absolutely. We use industry-standard encryption and never sell your personal data to third parties.",
  },
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
