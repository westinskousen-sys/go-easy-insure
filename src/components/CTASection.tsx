import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  const navigate = useNavigate();
  return (
    <section className="border-t border-border bg-card py-20 md:py-28">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">
          Ready to simplify your insurance?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Bundle your home and auto, compare top carriers, and get covered in minutes — not days.
        </p>
        <Button variant="hero" size="lg" className="mt-8 gap-2 text-base px-10" onClick={() => navigate("/get-started")}>
          Get My Free Quote <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
