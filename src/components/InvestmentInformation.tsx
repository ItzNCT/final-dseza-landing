import React, { useState, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "@/utils/translations";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInvestmentCards, InvestmentCard } from "@/hooks/useInvestmentCards";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const InvestmentInformation: React.FC = () => {
  const { theme } = useTheme();
  const { t, language } = useTranslation();
  const [activeTab, setActiveTab] = useState<"investors" | "environment">("investors");
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Fetch investment cards using the custom hook
  const { data: investmentCards, isLoading, isError } = useInvestmentCards(language);
  
  // Theme-specific styles
  const textColor = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";
  const secondaryTextColor = theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text";
  const accentColor = theme === "dark" ? "text-dseza-dark-primary-accent" : "text-dseza-light-primary-accent";
  
  // Updated hover colors for navigation arrows
  const navArrowHoverBgColor = theme === "dark" ? "hover:bg-dseza-dark-primary-accent/20" : "hover:bg-dseza-light-primary-accent/20";
  const navArrowHoverTextColor = theme === "dark" ? "hover:text-dseza-dark-primary-accent" : "hover:text-dseza-light-primary-accent";
  
  // Filter investment cards by category
  const forInvestorsCategory = language === 'en' ? 'For Investors' : 'Dành cho nhà đầu tư';
  const investmentEnvironmentCategory = language === 'en' ? 'Investment Environment' : 'Môi trường đầu tư';

  const forInvestorsData = investmentCards?.filter(card => 
    card.category === 'Dành cho nhà đầu tư'
  ) || [];
  
  const investmentEnvironmentData = investmentCards?.filter(card => 
    card.category === 'Môi trường đầu tư'
  ) || [];
  
  const currentCards = activeTab === "investors" ? forInvestorsData : investmentEnvironmentData;
  
  const cardWidth = 320; 
  const cardGap = 16; 
  const scrollAmount = cardWidth + cardGap;

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    const maxScrollLeft = scrollWidth - clientWidth;

    if (direction === "left") {
      if (scrollLeft <= 0) {
        carouselRef.current.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
      } else {
        carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    } else { 
      if (scrollLeft >= maxScrollLeft - 5) { 
        carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };
  
  return (
    <section className={cn(
      "py-12 px-4 sm:px-6 lg:px-8",
      theme === "dark" ? "bg-[#1D262E]" : "bg-[#FFFFFF]"
    )}>
      <div className="container mx-auto">
        <h2 className={cn(
          "font-montserrat font-bold text-3xl md:text-4xl mb-8",
          textColor
        )}>
          {t('homepage.investmentInfo')}
        </h2>
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <LoadingSpinner size="lg" className={textColor} />
          </div>
        )}
        
        {/* Error State */}
        {isError && (
          <div className="text-center py-16">
            <p className={cn("text-lg", textColor)}>
              {language === 'en' ? 'An error occurred while loading investment information. Please try again later.' : 'Đã xảy ra lỗi khi tải thông tin đầu tư. Vui lòng thử lại sau.'}
            </p>
          </div>
        )}
        
        {/* Content */}
        {!isLoading && !isError && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left column: tabs and navigation */}
            <div className="w-full lg:w-1/3">
              <div className="mb-8">
                <button 
                  className={cn(
                    "block font-montserrat font-semibold text-xl mb-4 transition-colors duration-300",
                    activeTab === "investors" ? accentColor : secondaryTextColor,
                    activeTab !== "investors" && (theme === "dark" ? "hover:text-dseza-dark-primary-accent-hover" : "hover:text-dseza-light-primary-accent-hover")
                  )}
                  onClick={() => setActiveTab("investors")}
                >
                  {t('investment.forInvestors')}
                </button>
                
                <button 
                  className={cn(
                    "block font-montserrat font-semibold text-xl mb-4 transition-colors duration-300",
                    activeTab === "environment" ? accentColor : secondaryTextColor,
                    activeTab !== "environment" && (theme === "dark" ? "hover:text-dseza-dark-primary-accent-hover" : "hover:text-dseza-light-primary-accent-hover")
                  )}
                  onClick={() => setActiveTab("environment")}
                >
                  {t('investment.investmentEnvironment')}
                </button>
              </div>
              
              {/* Only show navigation arrows if there are cards */}
              {currentCards.length > 0 && (
                <div className="flex space-x-4">
                  <button 
                    className={cn(
                      "p-2 rounded-full transition-colors duration-300",
                      secondaryTextColor, 
                      navArrowHoverBgColor,
                      navArrowHoverTextColor
                    )}
                    onClick={() => scrollCarousel("left")}
                  >
                    <ArrowLeft className="w-8 h-8" />
                  </button>
                  
                  <button 
                    className={cn(
                      "p-2 rounded-full transition-colors duration-300",
                      secondaryTextColor, 
                      navArrowHoverBgColor,
                      navArrowHoverTextColor
                    )}
                    onClick={() => scrollCarousel("right")}
                  >
                    <ArrowRight className="w-8 h-8" />
                  </button>
                </div>
              )}
            </div>
            
            {/* Right column: card carousel */}
            <div className="w-full lg:w-2/3">
              {/* Cards Display */}
              {currentCards.length > 0 ? (
                <div 
                  ref={carouselRef}
                  className="flex overflow-x-auto scrollbar-none gap-4 pb-4 snap-x"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {currentCards.map((card: InvestmentCard) => {
                    // Check if URL is external (starts with http/https) vs internal (starts with /)
                    const isExternalUrl = card.url.startsWith('http');
                    
                    return (
                      <a
                        key={card.id}
                        href={card.url}
                        target={isExternalUrl ? "_blank" : "_self"}
                        rel={isExternalUrl ? "noopener noreferrer" : undefined}
                        className="group min-w-[280px] sm:min-w-[320px] h-64 rounded-lg overflow-hidden relative flex-shrink-0 snap-start transition-transform duration-300 hover:scale-[1.05]"
                      >
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110" 
                        style={{ 
                          backgroundImage: `url(${card.imageUrl || '/placeholder.svg'})` 
                        }}
                      ></div>
                      <div className="absolute inset-0 bg-black/40 transition-all duration-300 group-hover:bg-black/60"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className={cn(
                          "font-montserrat font-semibold text-lg text-white transition-colors duration-300",
                          "group-hover:text-white/90"
                        )}>
                          {card.title}
                        </h3>
                      </div>
                    </a>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className={cn("text-lg", textColor)}>
                    {activeTab === "environment" 
                      ? (language === 'en' ? 'No investment environment information has been posted yet.' : 'Chưa có thông tin môi trường đầu tư nào được đăng tải.') 
                      : (language === 'en' ? 'No investor information has been posted yet.' : 'Chưa có thông tin dành cho nhà đầu tư nào được đăng tải.') }
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InvestmentInformation;