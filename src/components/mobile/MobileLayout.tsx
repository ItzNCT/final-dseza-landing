
import React from "react";
import MobileHeader from "./MobileHeader";
import MobileHero from "./MobileHero";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "react-router-dom";

interface MobileLayoutProps {
  children?: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Pages where hero should be hidden
  const shouldHideHero = location.pathname.includes('lien-he') || 
                        location.pathname.includes('contact') ||
                        location.pathname.includes('bai-viet') ||
                        location.pathname.includes('article') ||
                        location.pathname.includes('tin-tuc') ||
                        location.pathname.includes('news') ||
                        location.pathname.includes('cac-khu-chuc-nang') ||
                        location.pathname.includes('functional');
  
  // Only render mobile components if on mobile device
  if (!isMobile) {
    return <>{children}</>;
  }
  
  return (
    <div className="min-h-screen">
      <MobileHeader />
      {!shouldHideHero && <MobileHero />}
      {children}
    </div>
  );
};

export default MobileLayout;
