import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";
import { OrganicDivider } from "@/components/ui/OrganicDivider";
import footerBg from "@/assets/footer-trees.jpg";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${footerBg})` }}
    >
      {/* Content positioned over the tree background */}
      <div className="container relative z-10 pt-48 md:pt-64 lg:pt-80 pb-12">
        {/* Land acknowledgment with organic dividers */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <OrganicDivider color="hsl(17,15%,25%)" className="mb-4" />
          <p className="text-sm text-foreground/80 leading-relaxed italic">
            Nelson Waldorf School respectfully acknowledges that we live, work and play within the
            unceded traditional territory of the Ktunaxa, the Syilx, and the Sinixt peoples.
          </p>
          <OrganicDivider color="hsl(17,15%,25%)" className="mt-4" />
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* About Section */}
          <div>
            <h3 className="font-display font-bold text-lg mb-3 text-foreground">
              {SITE_CONFIG.className} Class Exchange
            </h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Supporting our students' journey to connect with indigenous communities
              in Northern Saskatchewan through cultural exchange and mutual learning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-3 text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-foreground/70 hover:text-primary font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/auth"
                  className="text-sm text-foreground/70 hover:text-primary font-medium transition-colors"
                >
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-lg mb-3 text-foreground">Contact</h3>
            <address className="not-italic text-sm text-foreground/70 space-y-1">
              <p className="font-medium text-foreground">{SITE_CONFIG.schoolName}</p>
              <p>Nelson, British Columbia</p>
              <p className="pt-2">
                <a
                  href="mailto:class-exchange@nelsonwaldorf.org"
                  className="hover:text-primary font-medium transition-colors"
                >
                  class-exchange@nelsonwaldorf.org
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <OrganicDivider color="hsl(17,15%,25%)" className="mt-8 mb-4" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-foreground/60">
          <p>
            &copy; {currentYear} {SITE_CONFIG.schoolName}. All rights reserved.
          </p>
          <p className="flex items-center gap-1 font-medium">
            Made with <Heart className="h-4 w-4 text-terracotta fill-terracotta" /> by the {SITE_CONFIG.className} Class
          </p>
        </div>
      </div>
    </footer>
  );
}
