import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-4 border-lavender/50 bg-lavender-light/30">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* About Section */}
          <div>
            <h3 className="font-display font-bold text-xl mb-3 text-teal">
              {SITE_CONFIG.className} Class Exchange 🌟
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Supporting our students' journey to connect with indigenous communities 
              in Northern Saskatchewan through cultural exchange and mutual learning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-xl mb-3 text-coral">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-teal font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/auth"
                  className="text-sm text-muted-foreground hover:text-teal font-medium transition-colors"
                >
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-xl mb-3 text-sunny-dark">Contact</h3>
            <address className="not-italic text-sm text-muted-foreground space-y-1">
              <p className="font-medium">{SITE_CONFIG.schoolName}</p>
              <p>Nelson, British Columbia</p>
              <p className="pt-2">
                <a 
                  href="mailto:class-exchange@nelsonwaldorf.org"
                  className="hover:text-teal font-medium transition-colors"
                >
                  📧 class-exchange@nelsonwaldorf.org
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t-2 border-lavender/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            © {currentYear} {SITE_CONFIG.schoolName}. All rights reserved.
          </p>
          <p className="flex items-center gap-1 font-medium">
            Made with <Heart className="h-4 w-4 text-coral fill-coral animate-pulse" /> by the {SITE_CONFIG.className} Class
          </p>
        </div>
      </div>
    </footer>
  );
}
