import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { StorySection } from "@/components/home/StorySection";
import { WaysToHelpSection } from "@/components/home/WaysToHelpSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function Index() {
  return (
    <Layout>
      <HeroSection />
      <StorySection />
      <WaysToHelpSection />
      <NewsletterSection />
    </Layout>
  );
}
