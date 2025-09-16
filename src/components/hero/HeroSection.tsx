
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import HeroBackground from "./HeroBackground";
import TopBar from "./TopBar";
import LogoSearchBar from "./LogoSearchBar";
import NavigationBar from "./NavigationBar";
import Banner from "@/components/banner";
import { useBanners } from "@/api/hooks";

/**
 * Complete hero section component
 */
const HeroSection: React.FC = () => {
  const isMobile = useIsMobile();
  const { slides, isLoading } = useBanners('vi');
  
  // Don't render desktop hero on mobile
  if (isMobile) {
    return null;
  }
  
  return (
    <>
      <section className="relative h-screen w-screen overflow-hidden" style={{ backgroundColor: '#2c3640' }}>
        <HeroBackground />
        <TopBar />
        <LogoSearchBar />
        <NavigationBar />
      </section>
      {/* Banner: hiển thị ngay bên dưới phần HeroBackground */}
      {!isLoading && slides?.length > 0 && (
        <div className="w-full" style={{ backgroundColor: '#2c3640' }}>
          <div className="container mx-auto px-6">
            <Banner
              slides={slides}
              autoPlayMs={5000}
              showArrows={false}
              showDots
              useImageAspectRatio
              imageFit="contain"
              objectPosition="center"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;
