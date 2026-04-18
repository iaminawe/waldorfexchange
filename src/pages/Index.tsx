import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { DinnerTheatreSection } from "@/components/home/DinnerTheatreSection";
import { StorySection } from "@/components/home/StorySection";
import { WaysToHelpSection } from "@/components/home/WaysToHelpSection";
import { LatestUpdatesSection } from "@/components/home/LatestUpdatesSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { RoughEdge } from "@/components/ui/OrganicDivider";

export default function Index() {
  return (
    <Layout>
      <HeroSection />
      <DinnerTheatreSection />
      <StorySection />
      {/* Rough edge transition into the muted "Ways to Help" section */}
      <RoughEdge className="text-muted/30" />
      <WaysToHelpSection />
      <LatestUpdatesSection />
      {/* Rough edge transition into the green newsletter section */}
      <RoughEdge className="text-primary" />
      <NewsletterSection />
    </Layout>
  );
}
