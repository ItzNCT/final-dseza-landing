import React from "react";

// Mobile-only home page
//
// This component renders the landing page optimised for small screens.
// It assembles the existing mobile‑friendly components without the
// conditional checks present in the regular Index.tsx file.  By
// centralising mobile specific layouts in their own folder it becomes
// easier to maintain and iterate on the mobile experience separately
// from the desktop version.  Additional sections can be added here
// as dedicated mobile counterparts become available.

import MobileQuickLinksCarousel from "@/components/mobile/MobileQuickLinksCarousel";
import MobileFeaturedEvents from "@/components/mobile/MobileFeaturedEvents";
import MobileNewsSection from "@/components/mobile/MobileNewsSection";
import MobileFunctionalZonesCarousel from "@/components/mobile/MobileFunctionalZonesCarousel";
import MobileInvestmentInformation from "@/components/mobile/MobileInvestmentInformation";

import HeroSection from "@/components/hero/HeroSection";
// import MobileHero from "@/components/mobile/MobileHero"; // Alternatively use mobile-specific hero
import LocationSection from "@/components/LocationSection";
import ResourcesSection from "@/components/ResourcesSection";
import BusinessesAndPartners from "@/components/BusinessesAndPartners";
import Footer from "@/components/Footer";

/**
 * IndexMobilePage
 *
 * The mobile version of the landing page.  We deliberately avoid any
 * responsiveness hooks here – the page itself is only rendered on
 * mobile devices via routing logic in App.tsx.  This keeps the
 * component tree simple and ensures that mobile assets are not
 * unnecessarily loaded when serving the desktop experience.
 */
const IndexMobilePage: React.FC = () => {
  return (
    <main className="min-h-screen">
      {/* Use the same hero section as desktop. Alternatively, uncomment MobileHero import
          above and use <MobileHero /> here for a mobile-optimized hero experience. */}
      <HeroSection />

      <div className="bg-background">
        <MobileQuickLinksCarousel />
        <MobileFeaturedEvents />
        <MobileNewsSection />
        <MobileFunctionalZonesCarousel />
        <MobileInvestmentInformation />
        {/* The following sections currently reuse the desktop versions.  */}
        <LocationSection />
        <ResourcesSection />
        <BusinessesAndPartners />
      </div>

      <Footer />
    </main>
  );
};

export default IndexMobilePage; 