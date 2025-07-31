
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
                        location.pathname.includes('functional') ||
                        location.pathname.includes('thu-ngo') ||
                        location.pathname.includes('welcome') ||
                        location.pathname.includes('open-letter') ||
                        location.pathname.includes('introduction') ||
                        location.pathname.includes('gioi-thieu') ||
                        location.pathname.includes('don-vi-truc-thuoc') ||
                        location.pathname.includes('affiliated-units') ||
                        location.pathname.includes('subsidiary-units') ||
                        location.pathname.includes('co-cau-to-chuc') ||
                        location.pathname.includes('departments') ||
                        location.pathname.includes('chuc-nang-nhiem-vu') ||
                        location.pathname.includes('functions-duties') ||
                        location.pathname.includes('tong-quan-ve-ban-quan-ly') ||
                        location.pathname.includes('management-overview') ||
                        location.pathname.includes('tong-quan-ve-da-nang') ||
                        location.pathname.includes('danang-overview');
  
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
