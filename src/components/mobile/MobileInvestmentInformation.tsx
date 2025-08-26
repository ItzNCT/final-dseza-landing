import React, { useState, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "@/utils/translations";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInvestmentCards, InvestmentCard } from "@/hooks/useInvestmentCards";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Skeleton } from "@/components/ui/skeleton";

// CardSkeleton component for loading state
const CardSkeleton = () => {
  const { theme } = useTheme();
  
  return (
    <div className="min-w-[280px] h-56 rounded-lg overflow-hidden flex-shrink-0">
      <Skeleton className="w-full h-full" />
    </div>
  );
};

const MobileInvestmentInformation: React.FC = () => {
  const { theme } = useTheme();
  const { t, language } = useTranslation();
  const [activeTab, setActiveTab] = useState<"investors" | "environment">("investors");
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Fetch investment cards using the current language
  const { data: investmentCards, isLoading, isError } = useInvestmentCards(language);

  // Theme-specific styles using dseza variables to match PC version
  const sectionBg = theme === "dark" ? "bg-[#1D262E]" : "bg-[#FFFFFF]";
  const titleText = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";
  const secondaryTextColor = theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text";
  const accentColor = theme === "dark" ? "text-dseza-dark-primary-accent" : "text-dseza-light-primary-accent";
  const navArrowHoverBgColor = theme === "dark" ? "hover:bg-dseza-dark-primary-accent/20" : "hover:bg-dseza-light-primary-accent/20";
  const navArrowHoverTextColor = theme === "dark" ? "hover:text-dseza-dark-primary-accent" : "hover:text-dseza-light-primary-accent";

  // Tab button styles
  const activeTabBg = theme === "dark" ? "bg-dseza-dark-primary-accent" : "bg-dseza-light-primary-accent";
  const activeTabText = theme === "dark" ? "text-dseza-dark-main-bg" : "text-white";
  const inactiveTabBg = theme === "dark" ? "bg-dseza-dark-secondary-bg" : "bg-dseza-light-secondary-bg";
  const inactiveTabText = theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text";
  const inactiveTabHoverBg = theme === "dark" ? "hover:bg-dseza-dark-hover-bg" : "hover:bg-dseza-light-hover-bg";

  // Filter investment cards by category (use localized category names)
  const forInvestorsCategory = language === 'en' ? 'For Investors' : 'Dành cho nhà đầu tư';
  const investmentEnvironmentCategory = language === 'en' ? 'Investment Environment' : 'Môi trường đầu tư';

  // Be tolerant to missing taxonomy translations by accepting both VI and EN names
  const forInvestorsAliases = new Set(['Dành cho nhà đầu tư', 'For Investors']);
  const investmentEnvironmentAliases = new Set(['Môi trường đầu tư', 'Investment Environment']);

  const forInvestorsData = (investmentCards || []).filter(card => 
    card.category === forInvestorsCategory || forInvestorsAliases.has(card.category)
  );
  
  const investmentEnvironmentData = (investmentCards || []).filter(card => 
    card.category === investmentEnvironmentCategory || investmentEnvironmentAliases.has(card.category)
  );
  
  const currentCards = activeTab === "investors" ? forInvestorsData : investmentEnvironmentData;

  const cardWidth = 280;
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
    <section className={cn("py-8 px-4", sectionBg)}>
      {/* Section Title */}
      <h2 className={cn(
        "font-montserrat font-bold text-2xl mb-6 text-left",
        titleText
      )}>
        {t("homepage.investmentInfo")}
      </h2>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-16">
          <LoadingSpinner size="lg" className={titleText} />
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="text-center py-16">
          <p className={cn("text-lg", titleText)}>
            {language === 'en' 
              ? 'An error occurred while loading investment information. Please try again later.' 
              : 'Đã xảy ra lỗi khi tải thông tin đầu tư. Vui lòng thử lại sau.'}
          </p>
        </div>
      )}

      {/* Content */}
      {!isLoading && !isError && (
        <>
          {/* Tabs and Navigation Controls */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex space-x-3">
              <button
                className={cn(
                  "font-montserrat font-semibold text-base py-2 px-3 rounded-md transition-colors duration-300",
                  activeTab === "investors" 
                    ? cn(activeTabBg, activeTabText)
                    : cn(inactiveTabBg, inactiveTabText, inactiveTabHoverBg)
                )}
                onClick={() => setActiveTab("investors")}
              >
                {t("investment.forInvestors")}
              </button>
              <button
                className={cn(
                  "font-montserrat font-semibold text-base py-2 px-3 rounded-md transition-colors duration-300",
                  activeTab === "environment"
                    ? cn(activeTabBg, activeTabText)
                    : cn(inactiveTabBg, inactiveTabText, inactiveTabHoverBg)
                )}
                onClick={() => setActiveTab("environment")}
              >
                {t("investment.investmentEnvironment")}
              </button>
            </div>
            
            {/* Navigation arrows - only show if there are cards */}
            {currentCards.length > 0 && (
              <div className="flex space-x-2">
                <button
                  className={cn(
                    "p-2 rounded-full transition-colors duration-300",
                    secondaryTextColor,
                    navArrowHoverBgColor,
                    navArrowHoverTextColor
                  )}
                  onClick={() => scrollCarousel("left")}
                  aria-label="Scroll left"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  className={cn(
                    "p-2 rounded-full transition-colors duration-300",
                    secondaryTextColor,
                    navArrowHoverBgColor,
                    navArrowHoverTextColor
                  )}
                  onClick={() => scrollCarousel("right")}
                  aria-label="Scroll right"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Cards Display */}
          {currentCards.length > 0 ? (
            <div
              ref={carouselRef}
              className="flex overflow-x-auto scrollbar-hide gap-4 pb-4 snap-x"
              role="region"
              aria-label="Investment information cards"
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
                    className="group min-w-[280px] h-56 rounded-lg overflow-hidden relative flex-shrink-0 snap-start transition-transform duration-300 hover:scale-[1.05]"
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
              <p className={cn("text-lg", titleText)}>
                {activeTab === "environment" 
                  ? (language === 'en' 
                      ? 'No investment environment information has been posted yet.' 
                      : 'Chưa có thông tin môi trường đầu tư nào được đăng tải.')
                  : (language === 'en' 
                      ? 'No investor information has been posted yet.' 
                      : 'Chưa có thông tin dành cho nhà đầu tư nào được đăng tải.')}
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default MobileInvestmentInformation;