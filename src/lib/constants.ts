// Site-wide constants that can be easily updated for future class trips
export const SITE_CONFIG = {
  schoolName: "Nelson Waldorf School",
  className: "Class 8/9",
  tripYear: "2026",
  defaultGoal: 10000,
  currency: "CAD",
  communityPlaceholder: "Île-à-la-Crosse Friendship Centre",
  partnerLocation: "Île-à-la-Crosse, Saskatchewan",
  programName: "Experience Canada Exchange",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About the Trip" },
  { href: "/support", label: "Ways to Support" },
  { href: "/donors", label: "Donor Wall" },
  { href: "/blog", label: "Updates" },
] as const;

export const RAFFLE_TIERS_DEFAULT = [
  { name: "Single", ticketCount: 1, price: 5 },
  { name: "Bundle of 5", ticketCount: 5, price: 20 },
  { name: "Best Value - 12 Pack", ticketCount: 12, price: 40 },
] as const;
