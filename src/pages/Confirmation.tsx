import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const Confirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="container mx-auto flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-2xl border-border bg-card text-center shadow-sm">
          <CardContent className="px-6 py-12 md:px-10">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-600" />

            <h1 className="mt-6 text-3xl font-bold text-foreground md:text-4xl">
              You're in good hands.
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              We're finding your best rates across top carriers. Expect a quote summary in your inbox within a few minutes.
            </p>

            <p className="mt-4 text-sm text-muted-foreground">
              Questions? Reach us at hello@solinsurance.com
            </p>

            <Button variant="hero" className="mt-8" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Confirmation;
