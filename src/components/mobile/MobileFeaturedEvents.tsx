
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { useTranslation } from "@/utils/translations";
import { useLanguage } from "@/context/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";
import { useHomepageData } from "@/hooks/useHomepageData";
import { getImageWithFallback } from "@/utils/drupal";

// Define types for event data
interface EventCardProps {
  id: string;
  image: string;
  date: string;
  title: string;
  titleEn?: string;
  excerpt?: string;
  excerptEn?: string;
  url?: string;
}

/**
 * Individual mobile event card component
 */
const MobileEventCard: React.FC<EventCardProps> = ({ 
  id, image, date, title, titleEn, excerpt, excerptEn, url = "#" 
}) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  
  // Use translated content if available
  const displayTitle = language === 'en' && titleEn ? titleEn : title;
  const displayExcerpt = language === 'en' && excerptEn ? excerptEn : excerpt;
  
  // Theme-specific styles
  const cardBg = theme === "dark" ? "bg-[#2C3640]" : "bg-[#F2F2F2]";
  const mainText = theme === "dark" ? "text-white" : "text-black";
  const secondaryText = theme === "dark" ? "text-[#B0BEC5]" : "text-[#545454]";
  const shadowStyle = theme === "dark" ? "shadow-lg shadow-black/25" : "shadow-lg";
  const hoverShadow = theme === "dark" ? "hover:shadow-xl hover:shadow-black/35" : "hover:shadow-xl";
  
  return (
    <Link
      to={`/su-kien/${id}`}
      className={cn(
        "block rounded-xl overflow-hidden",
        cardBg,
        shadowStyle,
        hoverShadow,
        "transition-transform duration-300 ease-in-out",
        "hover:scale-[1.01] active:scale-[0.99]",
        "cursor-pointer"
      )}
    >
      {/* Event Image (16:9 aspect ratio) */}
      <div className="w-full aspect-video relative">
        <img
          src={image}
          alt={displayTitle}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Text Content Area */}
      <div className="p-4">
        {/* Event Date */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <Calendar className={cn("h-3.5 w-3.5", secondaryText)} />
          <p className={cn("text-xs font-inter font-normal", secondaryText)}>
            {date}
          </p>
        </div>
        
        {/* Event Title */}
        <h3 className={cn("font-montserrat font-semibold text-lg mb-2 line-clamp-3", mainText)}>
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
  const cardBg = theme === "dark" ? "bg-[#2C3640]" : "bg-[#F2F2F2]";
  
  return (
    <div className={cn("rounded-xl overflow-hidden", cardBg, "shadow-lg")}>
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
  const { data, isLoading, isError } = useHomepageData();
  
  // Theme-specific styles for the section container
  const sectionBg = theme === "dark" ? "bg-[#1E272F]" : "bg-white";
  const titleText = theme === "dark" ? "text-white" : "text-black";
  
  // Format date function
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

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
              date={formatDate(event.start_date)}
              title={event.title}
              titleEn={event.title} // API doesn't have separate English titles yet
              excerpt={event.description}
              excerptEn={event.description} // API doesn't have separate English descriptions yet
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
