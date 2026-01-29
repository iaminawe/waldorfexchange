import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-lavender/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-18 items-center justify-between py-2">
        {/* Logo / Site Title */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-coral to-sunny text-white font-display font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
            W
          </div>
          <div className="hidden sm:block">
            <p className="font-display font-bold text-foreground leading-tight text-lg">
              {SITE_CONFIG.schoolName}
            </p>
            <p className="text-sm text-teal font-semibold">
              {SITE_CONFIG.className} Exchange ✨
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "px-4 py-2 text-sm font-bold rounded-xl transition-all",
                location.pathname === link.href
                  ? "bg-lavender/30 text-lavender-dark"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-3 rounded-xl font-bold gap-2 bg-coral hover:bg-coral-dark">
            <Link to="/support">
              <Sparkles className="h-4 w-4" />
              Donate
            </Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden rounded-xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t-2 border-lavender/30 bg-background">
          <div className="container py-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-3 text-base font-bold rounded-xl transition-colors",
                  location.pathname === link.href
                    ? "bg-lavender/30 text-lavender-dark"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="w-full mt-3 rounded-xl font-bold gap-2 bg-coral hover:bg-coral-dark">
              <Link to="/support" onClick={() => setMobileMenuOpen(false)}>
                <Sparkles className="h-4 w-4" />
                Donate Now
              </Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
