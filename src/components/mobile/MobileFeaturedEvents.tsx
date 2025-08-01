
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";
import { useTranslation } from "@/utils/translations";
import { useLanguage } from "@/context/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";
import { useHomepageData } from "@/hooks/useHomepageData";
import { getImageWithFallback, generateArticleUrl } from "@/utils/drupal";

// Define types for event data
interface EventCardProps {
  id: string;
  image: string;
  date: string;
  title: string;
  titleEn?: string;
  excerpt?: string;
  excerptEn?: string;
  path_alias?: string;
  url?: string;
}

// Format date function with language support
const formatDate = (dateString: string, language: 'vi' | 'en' = 'vi'): string => {
  try {
    const date = new Date(dateString);
    const locale = language === 'en' ? 'en-US' : 'vi-VN';
    const options: Intl.DateTimeFormatOptions = language === 'en' 
      ? { month: 'long', day: 'numeric', year: 'numeric' }
      : { day: '2-digit', month: '2-digit', year: 'numeric' };
    
    return date.toLocaleDateString(locale, options);
  } catch (error) {
    return dateString;
  }
};

/**
 * Individual mobile event card component
 */
const MobileEventCard: React.FC<EventCardProps> = ({ 
  id, image, date, title, titleEn, excerpt, excerptEn, path_alias, url 
}) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  
  // Use title and excerpt directly since they're already from the correct language API endpoint
  const displayTitle = title; // title is already in the correct language from API endpoint
  const displayExcerpt = excerpt; // excerpt is already in the correct language from API endpoint
  
  // Theme-specific styles using dseza variables
  const cardBg = theme === "dark" ? "bg-dseza-dark-secondary-bg" : "bg-dseza-light-secondary-bg";
  const cardBorder = theme === "dark" ? "border-dseza-dark-border" : "border-dseza-light-border";
  const mainText = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";
  const secondaryText = theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text";
  const cardHoverBg = theme === "dark" ? "hover:bg-dseza-dark-hover-bg" : "hover:bg-dseza-light-hover-bg";
  const titleHoverColor = theme === "dark" ? "hover:text-dseza-dark-primary-accent" : "hover:text-dseza-light-primary-accent";
  
  return (
    <Link
      to={url || generateArticleUrl({ id, path_alias }, language)}
      className={cn(
        "group block rounded-xl overflow-hidden border transition-all duration-300 ease-in-out",
        cardBg,
        cardBorder,
        cardHoverBg,
        "hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]",
        "cursor-pointer"
      )}
    >
      {/* Event Image (16:9 aspect ratio) */}
      <div className="w-full aspect-video relative overflow-hidden">
        <img
          src={image}
          alt={displayTitle}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        {/* Overlay for hover effect */}
        <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/20"></div>
      </div>
      
      {/* Text Content Area */}
      <div className="p-4">
        {/* Event Date */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <CalendarDays className={cn("h-3.5 w-3.5", secondaryText)} />
          <p className={cn("text-xs font-inter font-normal", secondaryText)}>
            {date}
          </p>
        </div>
        
        {/* Event Title */}
        <h3 className={cn(
          "font-montserrat font-semibold text-lg mb-2 line-clamp-3 transition-colors duration-300",
          mainText,
          titleHoverColor
        )}>
          {displayTitle}
        </h3>
        
        {/* Event Snippet (if available) */}
        {displayExcerpt && (
          <p className={cn("font-inter font-normal text-sm line-clamp-2", secondaryText)}>
            {displayExcerpt}
          </p>
        )}
      </div>
    </Link>
  );
};

/**
 * Loading placeholder for event cards
 */
const EventCardSkeleton: React.FC = () => {
  const { theme } = useTheme();
  const cardBg = theme === "dark" ? "bg-dseza-dark-secondary-bg" : "bg-dseza-light-secondary-bg";
  const cardBorder = theme === "dark" ? "border-dseza-dark-border" : "border-dseza-light-border";
  
  return (
    <div className={cn("rounded-xl overflow-hidden border", cardBg, cardBorder)}>
      <Skeleton className="w-full aspect-video" />
      <div className="p-4">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Skeleton className="h-3.5 w-3.5 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-7 w-full mb-2" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4 mt-1" />
      </div>
    </div>
  );
};

/**
 * Mobile-specific featured events section
 */
const MobileFeaturedEvents: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { data, isLoading, isError } = useHomepageData(language);
  
  // Theme-specific styles using dseza variables to match PC version
  const sectionBg = theme === "dark" ? "bg-[#2C363F]" : "bg-[#F2F2F2]";
  const titleText = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";

  return (
    <section className={cn(
      sectionBg,
      "py-8 px-4 w-full"
    )}>
      {/* Section Title */}
      <h2 className={cn(
        "font-montserrat font-bold text-2xl text-center mb-6",
        titleText
      )}>
        {t('featuredEvents.title') || "SỰ KIỆN TIÊU ĐIỂM"}
      </h2>
      
      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col space-y-4">
          {[...Array(3)].map((_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="text-center py-8">
          <p className={cn("text-lg", titleText)}>
            {t('common.errorLoading') || 'Có lỗi xảy ra khi tải dữ liệu sự kiện.'}
          </p>
        </div>
      )}

      {/* Data State */}
      {data?.events && !isLoading && !isError && (
        <div className="flex flex-col space-y-4">
          {data.events.map((event) => (
            <MobileEventCard
              key={event.id}
              id={event.id}
              image={getImageWithFallback(event.featured_image)}
              date={formatDate(event.start_date, language)}
              title={event.title}
              titleEn={event.titleEn}
              excerpt={event.description}
              excerptEn={event.descriptionEn}
              path_alias={event.path_alias}
            />
          ))}
        </div>
      )}

      {/* No Data State */}
      {data && !data.events?.length && !isLoading && !isError && (
        <div className="text-center py-8">
          <p className={cn("text-lg", titleText)}>
            {t('featuredEvents.noEvents') || 'Chưa có sự kiện nào được đăng tải.'}
          </p>
        </div>
      )}
    </section>
  );
};

export default MobileFeaturedEvents;
