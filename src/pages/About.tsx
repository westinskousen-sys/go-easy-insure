import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Zap, Users, Shield, TrendingUp } from "lucide-react";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>

        {/* Hero */}
        <section className="pt-24 pb-16 container mx-auto px-4 max-w-3xl text-center">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
            Why We Built Sol
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-foreground mb-6">
            Insurance was broken.<br /> We're fixing it.
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            The industry hadn't changed in 50 years. Agents quoting one or two 
            carriers. Renewals nobody shops. Premiums that quietly climb. 
            Customers left in the dark. We built Sol to flip that.
          </p>
        </section>

        {/* Story */}
        <section className="bg-slate-50 py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-heading text-3xl font-extrabold text-foreground mb-6">
              The system wasn't built for you.
            </h2>
            <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
              <p>
                We spent years working inside traditional brokerages. We watched 
                good clients get underserved — not out of malice, but out of 
                a model that was never designed with them in mind. One agent, 
                a handful of carrier relationships, and no real incentive to 
                keep shopping once the policy was bound.
              </p>
              <p>
                At renewal, premiums crept up. Nobody called. Nobody compared. 
                The client just paid more — year after year — because switching 
                felt complicated and nobody made it easy.
              </p>
              <p>
                That's the problem Sol was built to solve.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-heading text-3xl font-extrabold text-foreground mb-6">
              Power back to the customer.
            </h2>
            <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
              <p>
                Sol is an AI-native insurance agency. That means we use 
                technology to do what used to take hours — instantly comparing 
                top carriers, surfacing the best bundle, flagging coverage gaps 
                — so you get a smarter policy in minutes, not days.
              </p>
              <p>
                We're not a call center. We're not a lead generation site 
                selling your information to the highest bidder. We're a licensed 
                agency that works for you — and we use AI to make that 
                relationship faster, smarter, and more transparent than anything 
                that's come before.
              </p>
              <p>
                The middleman didn't add value. We cut them out and gave it 
                back to you.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-slate-50 py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="font-heading text-3xl font-extrabold text-foreground text-center mb-12">
              What we stand for.
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Users,
                  title: "Client first, always",
                  desc: "We're appointed with multiple carriers because our loyalty is to you, not them. We shop your coverage every renewal — automatically.",
                },
                {
                  icon: Zap,
                  title: "AI-powered, human-backed",
                  desc: "Technology handles the heavy lifting. Real licensed advisors handle the judgment calls. You get the best of both.",
                },
                {
                  icon: Shield,
                  title: "Radical transparency",
                  desc: "No spam. No selling your data. No surprise fees. You see exactly what you're buying and exactly what it costs.",
                },
                {
                  icon: TrendingUp,
                  title: "Built to save you money",
                  desc: "Bundling home and auto with the right carrier can save $500–$900 a year. We find that deal every time — not just once.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-white rounded-xl p-6 border border-border shadow-sm"
                >
                  <Icon className="h-6 w-6 text-primary mb-3" />
                  <h3 className="font-heading font-bold text-foreground text-lg mb-2">
                    {title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founders */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-extrabold text-foreground mb-4">
              Built by people who know the industry.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Westin and Parker bring years of experience across commercial 
              brokerage, insurtech, and independent agency work. They've seen 
              what breaks, what the customer deserves, and exactly how to 
              build something better.
            </p>
            <Button size="lg" onClick={() => navigate("/get-started")}>
              See What Sol Can Do For You →
            </Button>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default About;
