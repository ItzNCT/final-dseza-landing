// src/components/mobile/MobileFunctionalZonesCarousel.tsx
import React from "react";
import { Building2 } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/utils/translations";
import { useFunctionalZones, type FunctionalZone } from "@/hooks/useFunctionalZones";
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface ZoneData {
  id: number;
  nameVi: string;
  nameEn: string;
  enterprises: number;
  occupancy: number;
  area: string;
  imageThumb: string;
}

// Helper function to map FunctionalZone to ZoneData
const mapFunctionalZoneToZoneData = (zone: FunctionalZone, index: number): ZoneData => {
  return {
    id: parseInt(zone.id.split('-')[1]) || index + 1,
    nameVi: zone.title,
    nameEn: zone.title, // Using same title for both languages for now
    enterprises: zone.enterprises,
    occupancy: zone.occupancyRate,
    area: zone.area || "Chưa cập nhật",
    imageThumb: zone.thumbnailUrl || zone.imageUrl || zone.imageLarge || "/placeholder.svg"
  };
};

// ZoneCardSkeleton component for loading state
const ZoneCardSkeleton = () => {
  const { theme } = useTheme();
  const cardBg = theme === "dark" ? "bg-dseza-dark-secondary-bg" : "bg-dseza-light-secondary-bg";
  const cardBorder = theme === "dark" ? "border-dseza-dark-border" : "border-dseza-light-border";

  return (
    <div className="w-[220px] flex-shrink-0">
      <div className={cn("rounded-lg overflow-hidden border", cardBg, cardBorder)}>
        <Skeleton className="aspect-[4/3] w-full" />
        <div className="p-3">
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <div className="flex items-center mb-2">
            <Skeleton className="h-4 w-4 mr-2 rounded-full" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-3 w-16 mb-1" />
          <Skeleton className="h-2 w-full rounded-full mb-1" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
};

const MobileFunctionalZonesCarousel: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const { data: functionalZonesData, isLoading, isError, error } = useFunctionalZones(language);

  // Fallback zones data if API fails - using local images
  const fallbackZonesData: ZoneData[] = [
    { 
      id: 1, 
      nameVi: "Khu công nghệ Cao Đà Nẵng", 
      nameEn: "Danang High-Tech Park",
      enterprises: 32, 
      occupancy: 42.85, 
      area: "1,128.4 ha", 
      imageThumb: "/media/FunctionalZones/KCNC1.jpg"
    },
    { 
      id: 2, 
      nameVi: "Hòa Khánh mở rộng", 
      nameEn: "Hoa Khanh Expanded",
      enterprises: 42, 
      occupancy: 100, 
      area: "132.34 ha", 
      imageThumb: "/media/FunctionalZones/HKMR.jpg"
    },
    { 
      id: 3, 
      nameVi: "Khu công nghiệp Đà Nẵng", 
      nameEn: "Danang Industrial Zone",
      enterprises: 45, 
      occupancy: 100, 
      area: "50.1 ha", 
      imageThumb: "/media/FunctionalZones/KCNC1.jpg"
    },
    { 
      id: 4, 
      nameVi: "Hòa Khánh", 
      nameEn: "Hoa Khanh",
      enterprises: 228, 
      occupancy: 100, 
      area: "394 ha", 
      imageThumb: "/media/FunctionalZones/HKMR.jpg"
    },
    { 
      id: 5, 
      nameVi: "Khu công nghiệp Liên Chiểu", 
      nameEn: "Lien Chieu Industrial Zone",
      enterprises: 36, 
      occupancy: 60.07, 
      area: "289.35 ha", 
      imageThumb: "/media/FunctionalZones/KCNC1.jpg"
    },
    { 
      id: 6, 
      nameVi: "Khu công nghiệp dịch vụ Thủy sản Đà Nẵng", 
      nameEn: "Danang Seafood Service Industrial Zone",
      enterprises: 56, 
      occupancy: 100, 
      area: "50.63 ha", 
      imageThumb: "/media/FunctionalZones/HKMR.jpg"
    },
    { 
      id: 7, 
      nameVi: "Hòa Cầm", 
      nameEn: "Hoa Cam",
      enterprises: 81, 
      occupancy: 97.66, 
      area: "149.84 ha", 
      imageThumb: "/media/FunctionalZones/KCNC1.jpg"
    },
    { 
      id: 8, 
      nameVi: "Khu công nghệ thông tin tập trung", 
      nameEn: "Concentrated IT Zone",
      enterprises: 5, 
      occupancy: 31.82, 
      area: "131.1 ha", 
      imageThumb: "/media/FunctionalZones/HKMR.jpg"
    }
  ];

  // Map API data to ZoneData format, with fallback to static data if no API data
  const functionalZones: ZoneData[] = functionalZonesData 
    ? functionalZonesData.map(mapFunctionalZoneToZoneData)
    : (isError ? fallbackZonesData : []);

  const getZoneName = (zone: ZoneData): string => {
    return language === 'vi' ? zone.nameVi : zone.nameEn;
  };

  // Theme-specific styles using dseza variables to match PC version
  const sectionBg = theme === "dark" ? "bg-[#2C363F]" : "bg-[#F2F2F2]";
  const titleText = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";
  const cardBg = theme === "dark" ? "bg-dseza-dark-secondary-bg" : "bg-dseza-light-secondary-bg";
  const cardBorder = theme === "dark" ? "border-dseza-dark-border" : "border-dseza-light-border";
  const cardHoverBg = theme === "dark" ? "hover:bg-dseza-dark-hover-bg" : "hover:bg-dseza-light-hover-bg";
  const mainText = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";
  const secondaryText = theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text";
  const primaryAccent = theme === "dark" ? "bg-dseza-dark-primary-accent" : "bg-dseza-light-primary-accent";
  const fillBarTrack = theme === "dark" ? "bg-dseza-dark-border" : "bg-dseza-light-border";

  return (
    <section className={cn("py-8 overflow-x-hidden", sectionBg)}>
      {/* Section title */}
      <h2 className={cn(
        "font-montserrat font-bold text-2xl mb-6 mx-4 text-left",
        titleText
      )}>
        {t('functionalZones.title')}
      </h2>

      {/* Loading State */}
      {isLoading && (
        <div className="px-4">
          <div className="flex justify-center items-center py-8">
            <LoadingSpinner size="lg" className={titleText} />
            <span className={cn("ml-3 text-sm", titleText)}>
              {t('common.loading') || 'Đang tải dữ liệu khu chức năng...'}
            </span>
          </div>
          {/* Loading carousel */}
          <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
            {Array.from({ length: 4 }).map((_, index) => (
              <ZoneCardSkeleton key={index} />
            ))}
          </div>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="px-4 text-center py-8">
          <div className="flex justify-center items-center mb-4">
            <div className={cn("p-3 rounded-full", theme === "dark" ? "bg-red-900/20" : "bg-red-100")}>
              <Building2 className={cn("w-6 h-6", theme === "dark" ? "text-red-400" : "text-red-600")} />
            </div>
          </div>
          <p className={cn("text-sm mb-2", titleText)}>
            {t('common.errorLoading') || 'Không thể tải dữ liệu khu chức năng từ server.'}
          </p>
          <p className={cn("text-xs opacity-70", secondaryText)}>
            {error?.message || 'Đang hiển thị dữ liệu dự phòng.'}
          </p>
        </div>
      )}

      {/* Data State */}
      {functionalZones.length > 0 && !isLoading && (
        <div className="px-4">
          {/* Horizontal scrollable carousel */}
          <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide" 
               role="region" 
               aria-label="Scrollable functional zones">
            {functionalZones.map((zone) => (
              <div key={zone.id} className="w-[220px] flex-shrink-0">
                <div className={cn(
                  "group h-full flex flex-col transition-all duration-300 ease-in-out",
                  "hover:scale-[1.03] active:scale-[0.98]"
                )}>
                  {/* Image card */}
                  <div className={cn(
                    "rounded-lg overflow-hidden border transition-all duration-300",
                    cardBg,
                    cardBorder,
                    cardHoverBg,
                    "hover:shadow-lg"
                  )}>
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={zone.imageThumb}
                        alt={getZoneName(zone)}
                        className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                    </div>

                    {/* Info block */}
                    <div className="pt-3 px-3 pb-3 text-left">
                      {/* Zone name and enterprises */}
                      <div className="mb-3">
                        <h3 className={cn(
                          "font-montserrat font-semibold text-base mb-2 line-clamp-2",
                          mainText
                        )}>
                          {getZoneName(zone)}
                        </h3>
                        <div className={cn(
                          "flex items-center text-xs",
                          secondaryText
                        )}>
                          <Building2 className="w-4 h-4 mr-1.5 flex-shrink-0" />
                          <span>{zone.enterprises} {t('functionalZones.enterprises')}</span>
                        </div>
                      </div>

                      {/* Occupancy rate and area */}
                      <div>
                        <div className={cn("text-xs mb-1", secondaryText)}>
                          {t('functionalZones.occupancyRate')}: {zone.occupancy}%
                        </div>
                        <div className={cn("h-2 w-full rounded-full mb-2", fillBarTrack)}>
                          <div
                            className={cn("h-full rounded-full", primaryAccent)}
                            style={{ width: `${zone.occupancy}%` }}
                          ></div>
                        </div>
                        <div className={cn("text-xs", secondaryText)}>
                          {t('functionalZones.area')}: {zone.area}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* API Data Indicator */}
          {functionalZonesData && (
            <div className="mt-4 text-center">
              <span className={cn("text-xs opacity-70", secondaryText)}>
                {t('functionalZones.dataSource') || 'Dữ liệu được cập nhật từ hệ thống'}
              </span>
            </div>
          )}
        </div>
      )}

      {/* No Data State */}
      {!isLoading && !isError && functionalZones.length === 0 && (
        <div className="px-4 text-center py-8">
          <div className="flex justify-center items-center mb-4">
            <div className={cn("p-3 rounded-full", theme === "dark" ? "bg-gray-800" : "bg-gray-100")}>
              <Building2 className={cn("w-6 h-6", theme === "dark" ? "text-gray-400" : "text-gray-600")} />
            </div>
          </div>
          <p className={cn("text-sm", titleText)}>
            {t('functionalZones.noZones') || 'Chưa có thông tin về các khu chức năng.'}
          </p>
        </div>
      )}
    </section>
  );
};

export default MobileFunctionalZonesCarousel;