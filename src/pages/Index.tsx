
import React from "react";
import HeroSection from "@/components/hero/HeroSection";
import QuickAccessButtons from "@/components/QuickAccessButtons";
import FeaturedEvents from "@/components/FeaturedEvents";
import NewsSection from "@/components/NewsSection";
import FunctionalZones from "@/components/FunctionalZones";
import InvestmentInformation from "@/components/InvestmentInformation";
import LocationSection from "@/components/LocationSection";
import ResourcesSection from "@/components/ResourcesSection";
import BusinessesAndPartners from "@/components/BusinessesAndPartners";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileQuickLinksCarousel from "@/components/mobile/MobileQuickLinksCarousel";
import MobileFeaturedEvents from "@/components/mobile/MobileFeaturedEvents";
import MobileNewsSection from "@/components/mobile/MobileNewsSection";
import MobileFunctionalZonesCarousel from "@/components/mobile/MobileFunctionalZonesCarousel";

const Index: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Content Sections */}
      <div className="bg-background">
        {/* Quick Access Buttons - show desktop or mobile version based on viewport */}
        {isMobile ? <MobileQuickLinksCarousel /> : <QuickAccessButtons />}
        
        {/* Featured Events Section - show desktop or mobile version based on viewport */}
        {isMobile ? <MobileFeaturedEvents /> : <FeaturedEvents />}
        
        {/* News Section - show desktop or mobile version based on viewport */}
        {isMobile ? <MobileNewsSection /> : <NewsSection />}
        
        {/* Functional Zones Section - show desktop or mobile version based on viewport */}
        {isMobile ? <MobileFunctionalZonesCarousel /> : <FunctionalZones />}
        
        {/* Investment Information Section */}
        <InvestmentInformation />
        
        {/* Location Map Section */}
        <LocationSection />
        
        {/* Resources Section */}
        <ResourcesSection />
        
        {/* Businesses and Partners Section */}
        <BusinessesAndPartners />
      </div>
      
      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Index;
