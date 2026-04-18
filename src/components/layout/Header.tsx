import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { RoughEdge } from "@/components/ui/OrganicDivider";
import nwsLogo from "@/assets/nws-logo-header.svg";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo / Site Title - logo overflows the header */}
        <Link to="/" className="flex items-center gap-3 group relative">
          <img
            src={nwsLogo}
            alt="Nelson Waldorf School"
            className="h-[100px] w-auto -my-6 relative z-10 drop-shadow-md"
          />
          <div className="hidden sm:block">
            <p className="font-display font-bold text-foreground leading-tight">
              {SITE_CONFIG.schoolName}
            </p>
            <p className="text-xs text-muted-foreground font-medium">
              {SITE_CONFIG.className} Exchange
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
                "px-3 py-2 text-sm font-semibold rounded-lg transition-colors",
                location.pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-2 rounded-lg font-bold">
            <Link to="/support">Donate</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-border bg-background">
          <div className="container py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-2 text-sm font-semibold rounded-lg transition-colors",
                  location.pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="w-full mt-3 rounded-lg font-bold">
              <Link to="/support" onClick={() => setMobileMenuOpen(false)}>
                Donate Now
              </Link>
            </Button>
          </div>
        </nav>
      )}

      {/* Rough organic edge below the header - flipped so the bumps point downward */}
      <RoughEdge flip className="text-background absolute -bottom-[7px] md:-bottom-[11px] lg:-bottom-[15px] left-0 right-0 pointer-events-none" />
    </header>
  );
}
