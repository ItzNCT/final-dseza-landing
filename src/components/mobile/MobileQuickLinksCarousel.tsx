import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { 
  Briefcase, 
  FileText, 
  SearchCheck, 
  MessageSquare, 
  Calendar,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/utils/translations";
import { useHomepageData } from "@/hooks/useHomepageData";
import { Skeleton } from "@/components/ui/skeleton";

// Icon mapping for dynamic icons from API
const iconMap: Record<string, JSX.Element> = {
  Briefcase: <Briefcase size={40} />,
  FileText: <FileText size={40} />,
  SearchCheck: <SearchCheck size={40} />,
  MessageSquare: <MessageSquare size={40} />,
  Calendar: <Calendar size={40} />,
};

/**
 * Mobile-specific quick links carousel component
 */
const MobileQuickLinksCarousel: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  
  // Fetch dynamic data from API
  const { data, isLoading, isError } = useHomepageData();
  
  // Get theme-specific styles
  const sectionBg = theme === "dark" ? "bg-dseza-dark-main-bg" : "bg-dseza-light-main-bg";
  const cardBg = theme === "dark" ? "bg-dseza-dark-secondary-bg" : "bg-dseza-light-secondary-bg";
  const cardBorder = theme === "dark" ? "border-dseza-dark-border" : "border-dseza-light-border";
  const iconColor = theme === "dark" ? "text-dseza-dark-primary-accent" : "text-dseza-light-primary-accent";
  const textColor = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";

  // New hover styles matching PC version
  const cardHoverBgAccent = theme === "dark" ? "hover:bg-dseza-dark-primary-accent/10" : "hover:bg-dseza-light-primary-accent/10";
  const cardHoverBorderAccent = theme === "dark" ? "hover:border-dseza-dark-primary-accent" : "hover:border-dseza-light-primary-accent";
  const iconHoverColor = theme === "dark" ? "group-hover:text-dseza-dark-primary-accent-hover" : "group-hover:text-dseza-light-primary-accent-hover";
  const textHoverColor = theme === "dark" ? "group-hover:text-dseza-dark-primary-accent" : "group-hover:text-dseza-light-primary-accent";

  // Handle loading state
  if (isLoading) {
    return (
      <section className={cn(sectionBg, "py-8 px-0 w-full")} aria-label="Quick access links">
        <div className="scrollbar-hide px-4 flex overflow-x-auto space-x-3 pb-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="w-[140px] h-[160px] flex-shrink-0">
              <Skeleton className="w-full h-full rounded-xl" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <section className={cn(sectionBg, "py-8 px-4 w-full")} aria-label="Quick access links">
        <div className="flex flex-col items-center justify-center py-8">
          <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
          <p className={cn(
            "text-sm text-center",
            textColor
          )}>
            Không thể tải dữ liệu truy cập nhanh. Vui lòng thử lại sau.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={cn(sectionBg, "py-8 px-0 w-full")} aria-label="Quick access links">
      {/* Scrollable carousel container */}
      <div className="scrollbar-hide px-4 flex overflow-x-auto space-x-3 pb-4" 
        role="region" 
        aria-label="Scrollable quick access links">
        {data?.quickAccessLinks?.map((card, index) => (
          <a
            key={index}
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group", // Added group class
              cardBg,
              cardBorder,
              cardHoverBgAccent, // Applied new hover background
              cardHoverBorderAccent, // Applied new hover border
              "w-[140px] h-[160px] flex-shrink-0",
              "flex flex-col justify-center items-center text-center",
              "rounded-xl p-4 border", // Ensure border is applied for hover to take effect
              "cursor-pointer transition-all duration-300 ease-in-out",
              "hover:scale-105 active:scale-102 hover:shadow-xl" // Enhanced hover effects
            )}
            aria-label={t(card.textKey)}
          >
            <div className={cn(
              iconColor,
              iconHoverColor, // Icon hover color
              "mb-2.5 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:-translate-y-1" // Icon animation
            )}>
              {iconMap[card.icon] || <Briefcase size={40} />}
            </div>
            <span className={cn(
              textColor,
              textHoverColor, // Text hover color
              "font-inter font-medium text-sm leading-snug transition-colors duration-300" // Added transition-colors
            )}>
              {t(card.textKey)}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default MobileQuickLinksCarousel;