// src/components/LocationSection.tsx
import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
// Tabs, TabsList, TabsTrigger, TabsContent không còn được sử dụng trực tiếp ở đây
// nếu bạn chỉ dùng button như hiện tại. Nếu muốn quay lại dùng component Tabs của shadcn thì cần giữ lại.
import { useTranslation } from "@/utils/translations";

const LocationSection: React.FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("vr-tour");
  const { t } = useTranslation();

  // Theme-specific styles
  const textColor = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";
  const secondaryTextColor = theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text";
  const accentColor = theme === "dark" ? "text-dseza-dark-primary-accent" : "text-dseza-light-primary-accent";
  const accentBgColor = theme === "dark" ? "bg-dseza-dark-primary-accent" : "bg-dseza-light-primary-accent";
  const secondaryBgColor = theme === "dark" ? "bg-[#020817]" : "bg-dseza-light-secondary-bg"; // Panel content background
  const tabActiveText = theme === "dark" ? "text-dseza-dark-main-bg" : "text-white";
  
  // Tab base background (khi không active, không hover)
  const tabDefaultBg = theme === "dark" ? "bg-dseza-dark-secondary-bg" : "bg-dseza-light-secondary-bg";
  
  // Tab hover background (khi không active) - dùng màu hover chung của theme, có thể điều chỉnh độ trong suốt
  const tabInactiveHoverBg = theme === "dark" ? "hover:bg-dseza-dark-hover-bg/70" : "hover:bg-dseza-light-hover-bg/70";
  // Tab hover text color (khi không active) - sẽ là màu accent
  const tabInactiveHoverTextColor = theme === "dark" ? `hover:${accentColor}` : `hover:${accentColor}`;


  return (
    <section className={cn(
      "py-12 px-4 sm:px-6 lg:px-8", 
      theme === "dark" ? "bg-[#1E272F]" : "bg-white" 
    )}>
      <div className="container mx-auto">
        <h2 className={cn(
          "font-montserrat font-bold text-2xl md:text-3xl mb-8", 
          textColor,
          "text-center lg:text-left"
        )}>
          {t('location.title')}
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column: tabs */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <button
              className={cn(
                "px-6 py-4 rounded-lg font-montserrat font-semibold text-base md:text-lg transition-all duration-300 ease-in-out text-center", 
                activeTab === "vr-tour" ?
                  cn(accentBgColor, tabActiveText, "hover:scale-103 hover:shadow-md") : // Thêm hover cho tab active
                  cn(tabDefaultBg, textColor, tabInactiveHoverBg, tabInactiveHoverTextColor) // Áp dụng hover mới cho tab inactive
              )}
              onClick={() => setActiveTab("vr-tour")}
            >
              {t('location.vrTour')}
            </button>
            
            <button
              className={cn(
                "px-6 py-4 rounded-lg font-montserrat font-semibold text-base md:text-lg transition-all duration-300 ease-in-out text-center", 
                activeTab === "digital-map" ?
                  cn(accentBgColor, tabActiveText, "hover:scale-103 hover:shadow-md") : // Thêm hover cho tab active
                  cn(tabDefaultBg, textColor, tabInactiveHoverBg, tabInactiveHoverTextColor) // Áp dụng hover mới cho tab inactive
              )}
              onClick={() => setActiveTab("digital-map")}
            >
              {t('location.digitalMap')}
            </button>
          </div>
          
          {/* Right column: content display */}
          <div className="w-full lg:w-2/3">
            {activeTab === "vr-tour" ? (
              <div className={cn(
                "rounded-lg h-72 sm:h-80 md:h-96 p-4 md:p-6 flex flex-col items-center justify-center", 
                secondaryBgColor
              )}>
                <p className={cn("text-lg md:text-xl font-montserrat text-center", textColor)}>
                  VR 360 Tour Placeholder
                </p>
                <a
                  href="https://dseza.danang.gov.vn/vr360/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn("mt-4", accentColor, "underline text-sm md:text-base hover:opacity-80 transition-opacity")} 
                >
                  https://dseza.danang.gov.vn/vr360/
                </a>
              </div>
            ) : (
              <div className={cn(
                "rounded-lg h-72 sm:h-80 md:h-96 p-4 md:p-6 flex flex-col items-center justify-center", 
                secondaryBgColor
              )}>
                <h3 className={cn("text-lg md:text-xl font-montserrat font-medium mb-3 md:mb-4 text-center", textColor)}>
                  {t('location.digitalMapTitle')}
                </h3>
                <p className={cn("text-sm md:text-base font-inter text-center max-w-lg leading-relaxed", secondaryTextColor)}>
                  {t('location.digitalMapDescription')}
                </p>
                <Button
                  asChild
                  className={cn(
                    "mt-4 md:mt-6 px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base transition-all duration-300 ease-in-out", // Added transition
                    accentBgColor,
                    theme === "dark" ? 
                      "text-dseza-dark-main-bg hover:bg-dseza-dark-primary-accent-hover hover:scale-105" : // Added scale
                      "text-white hover:bg-dseza-light-primary-accent-hover hover:scale-105" // Added scale
                  )}
                >
                  <a href="https://maps.dseza.vn/" target="_blank" rel="noopener noreferrer">
                    {t('location.accessDigitalMap')}
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;