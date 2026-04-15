import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CheckPolicy = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 container mx-auto px-4 text-center">
        <h1 className="font-heading text-3xl font-extrabold text-foreground mb-4">
          Policy Check Coming Soon.
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
          We're integrating with Canopy Connect so you can link your existing
          insurance and get an instant AI-powered coverage analysis. Check back
          soon.
        </p>
        <Button onClick={() => navigate("/")}>Back to Home</Button>
      </main>
      <Footer />
    </div>
  );
};

export default CheckPolicy;
