import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="border-t border-border py-10">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground md:flex-row">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <div className="flex items-center gap-2 font-heading font-semibold text-foreground">
            <Shield className="h-4 w-4 text-primary" />
            Sol Insurance
          </div>
          <span className="text-xs">Smarter coverage, built for real life.</span>
        </div>
        <p>© {new Date().getFullYear()} Sol Insurance. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
