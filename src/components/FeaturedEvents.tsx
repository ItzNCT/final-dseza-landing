import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays } from "lucide-react";
import { useTranslation } from "@/utils/translations";
import { useLanguage } from "@/context/LanguageContext";
import { useHomepageData } from "@/hooks/useHomepageData";
import { getImageWithFallback } from "@/utils/drupal";

type EventCardProps = {
  id: string;
  image: string;
  date: string;
  title: string;
  titleEn?: string;
  excerpt?: string;
  excerptEn?: string;
  featured?: boolean;
  isLarge?: boolean;
};

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
    return dateString; // Fallback to original string if parsing fails
  }
};

// EventCardSkeleton component for loading state
const EventCardSkeleton = ({ isLarge = false }: { isLarge?: boolean }) => {
  const isFeature = isLarge;
  
  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl",
      isFeature ? 'col-span-2 row-span-2' : ''
    )}>
      <AspectRatio ratio={1/1}>
        <Skeleton className="absolute inset-0" />
      </AspectRatio>
      
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent p-4">
        <div className="flex items-center gap-2 mb-2">
          <CalendarDays className="h-4 w-4 text-white/60" />
          <Skeleton className="h-3 w-20 bg-white/20" />
        </div>
        <Skeleton className={cn(
          "bg-white/20 mb-2",
          isFeature ? 'h-6 w-full' : 'h-4 w-3/4'
        )} />
        {isFeature && (
          <Skeleton className="h-4 w-full bg-white/20" />
        )}
      </div>
    </div>
  );
};

const EventCard = ({ id, image, date, title, titleEn, excerpt, excerptEn, featured = false, isLarge = false }: EventCardProps) => {
  const isFeature = featured || isLarge;
  const { language } = useLanguage();
  
  const displayTitle = language === 'en' && titleEn ? titleEn : title;
  const displayExcerpt = language === 'en' && excerptEn ? excerptEn : excerpt;
  
  return (
    <Link 
      to={`/su-kien/${id}`}
      className={cn(
        "relative overflow-hidden rounded-xl group block", // Added 'block' for proper link display
        isFeature ? 'col-span-2 row-span-2' : ''
      )}
    >
      <AspectRatio ratio={1/1}>
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-105" // Added image zoom on hover
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </AspectRatio>
      {/* Overlay for darkening effect on hover */}
      <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/50"></div>
      
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent p-4">
        <div className="flex items-center gap-2 mb-2 text-white/80">
          <CalendarDays className="h-4 w-4" />
          <span className="text-xs">{date}</span>
        </div>
        <h3 className={cn(
          "text-white transition-all duration-300 ease-in-out", // Added transition for font weight
          "group-hover:font-extrabold", // Make title bolder on hover
          isFeature ? 'text-xl mb-2 font-bold' : 'text-base font-semibold' // Adjusted base font weight
        )}>
          <span className="hover:underline">{displayTitle}</span>
        </h3>
        {isFeature && displayExcerpt && (
          <p className="text-white/80 text-sm line-clamp-2">{displayExcerpt}</p>
        )}
      </div>
    </Link>
  );
};

/**
 * Featured events section displaying prominent events
 */
const FeaturedEvents: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { data, isLoading, isError } = useHomepageData();
  const textColor = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";

  return (
    <section className={cn(
      "py-12 px-4 sm:px-6 lg:px-8",
      theme === "dark" ? "bg-[#2C363F]" : "bg-[#F2F2F2]"
    )}>
      <div className="container mx-auto">
        <h2 className={cn(
          "font-montserrat font-bold text-3xl md:text-4xl mb-8 text-center",
          textColor
        )}>
          {t('featuredEvents.title')}
        </h2>
        
        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <EventCardSkeleton isLarge={true} />
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-12">
            <p className={cn("text-lg", textColor)}>
              {t('common.errorLoading') || 'Có lỗi xảy ra khi tải dữ liệu sự kiện.'}
            </p>
          </div>
        )}

        {/* Data State */}
        {data?.events && !isLoading && !isError && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {data.events.map((event, index: number) => (
              <EventCard 
                key={event.id || index}
                id={event.id}
                date={formatDate(event.start_date)}
                title={event.title}
                titleEn={event.title} // API doesn't have separate English titles yet
                excerpt={event.description}
                excerptEn={event.description} // API doesn't have separate English descriptions yet
                image={getImageWithFallback(event.featured_image)}
                isLarge={index === 0}
              />
            ))}
          </div>
        )}

        {/* No Data State */}
        {data && !data.events?.length && !isLoading && !isError && (
          <div className="text-center py-12">
            <p className={cn("text-lg", textColor)}>
              {t('featuredEvents.noEvents') || 'Chưa có sự kiện nào được đăng tải.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedEvents;