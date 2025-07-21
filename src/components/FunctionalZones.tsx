import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/utils/translations";
import { useLanguage } from "@/context/LanguageContext";
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
  imageLarge: string;
}

// MainDisplaySkeleton component for loading state
const MainDisplaySkeleton = () => {
  const { theme } = useTheme();
  
  return (
    <div className="relative h-80 sm:h-96 md:h-[400px] rounded-2xl overflow-hidden mb-8">
      <Skeleton className="absolute inset-0 w-full h-full" />
      
      {/* Bottom left skeleton */}
      <div className="absolute bottom-6 left-6">
        <Skeleton className="h-8 w-64 mb-2 bg-white/20" />
        <div className="flex items-center">
          <Building2 className="w-5 h-5 mr-2 text-white/60" />
          <Skeleton className="h-5 w-32 bg-white/20" />
        </div>
      </div>
      
      {/* Bottom right skeleton */}
      <div className="absolute bottom-6 right-6 text-right">
        <Skeleton className="h-4 w-32 mb-1 bg-white/20" />
        <div className="h-2 w-32 sm:w-48 bg-white/30 rounded-full mb-2">
          <Skeleton className="h-full w-3/4 rounded-full bg-white/20" />
        </div>
        <Skeleton className="h-4 w-28 bg-white/20" />
      </div>
    </div>
  );
};

// ZoneThumbnailSkeleton component for loading state
const ZoneThumbnailSkeleton = () => {
  return (
    <div className="relative h-48 rounded-lg overflow-hidden">
      <Skeleton className="absolute inset-0 w-full h-full" />
      <div className="absolute bottom-0 left-0 right-0">
        <Skeleton className="h-8 w-full bg-white/20" />
      </div>
    </div>
  );
};

// Helper function to map FunctionalZone to ZoneData
const mapFunctionalZoneToZoneData = (zone: FunctionalZone, index: number): ZoneData => {
  return {
    id: parseInt(zone.id.split('-')[1]) || index + 1, // Extract numeric ID or use index
    nameVi: zone.title,
    nameEn: zone.title, // Using same title for both languages for now
    enterprises: zone.enterprises,
    occupancy: zone.occupancyRate, // Use occupancyRate instead of occupancy
    area: zone.area || "Chưa cập nhật",
    imageThumb: zone.thumbnailUrl || zone.imageUrl || zone.imageLarge || "/placeholder.svg",
    imageLarge: zone.imageLarge || zone.imageUrl || "/placeholder.svg"
  };
};

/**
 * Functional Zones section displaying Da Nang's industrial and high-tech zones
 */
const FunctionalZones: React.FC = () => {
  const { theme } = useTheme();
  const [selectedZone, setSelectedZone] = useState<number>(1);
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { data: functionalZonesData, isLoading, isError, error } = useFunctionalZones();
  
  // Theme-specific styles
  const textColor = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";
  const primaryAccent = theme === "dark" ? "bg-dseza-dark-primary-accent" : "bg-dseza-light-primary-accent";
  const secondaryAccent = theme === "dark" ? "bg-dseza-dark-secondary-accent" : "bg-dseza-light-secondary-accent";
  
  const getZoneName = (zone: ZoneData): string => {
    return language === 'vi' ? zone.nameVi : zone.nameEn;
  };

  // Fallback zones data if API fails - using local images
  const fallbackZonesData: ZoneData[] = [
    { 
      id: 1, 
      nameVi: "Khu công nghệ Cao Đà Nẵng", 
      nameEn: "Danang High-Tech Park",
      enterprises: 32, 
      occupancy: 42.85, 
      area: "1,128.4 ha", 
      imageThumb: "/media/FunctionalZones/KCNC1.jpg", 
      imageLarge: "/media/FunctionalZones/KCNC1.jpg" 
    },
    { 
      id: 2, 
      nameVi: "Hòa Khánh mở rộng", 
      nameEn: "Hoa Khanh Expanded",
      enterprises: 42, 
      occupancy: 100, 
      area: "132.34 ha", 
      imageThumb: "/media/FunctionalZones/HKMR.jpg", 
      imageLarge: "/media/FunctionalZones/HKMR.jpg" 
    },
    { 
      id: 3, 
      nameVi: "Khu công nghiệp Đà Nẵng", 
      nameEn: "Danang Industrial Zone",
      enterprises: 45, 
      occupancy: 100, 
      area: "50.1 ha", 
      imageThumb: "/media/FunctionalZones/KCNC1.jpg", 
      imageLarge: "/media/FunctionalZones/KCNC1.jpg" 
    },
    { 
      id: 4, 
      nameVi: "Hòa Khánh", 
      nameEn: "Hoa Khanh",
      enterprises: 228, 
      occupancy: 100, 
      area: "394 ha", 
      imageThumb: "/media/FunctionalZones/HKMR.jpg", 
      imageLarge: "/media/FunctionalZones/HKMR.jpg" 
    },
    { 
      id: 5, 
      nameVi: "Khu công nghiệp Liên Chiểu", 
      nameEn: "Lien Chieu Industrial Zone",
      enterprises: 36, 
      occupancy: 60.07, 
      area: "289.35 ha", 
      imageThumb: "/media/FunctionalZones/KCNC1.jpg", 
      imageLarge: "/media/FunctionalZones/KCNC1.jpg" 
    },
    { 
      id: 6, 
      nameVi: "Khu công nghiệp dịch vụ Thủy sản Đà Nẵng", 
      nameEn: "Danang Seafood Service Industrial Zone",
      enterprises: 56, 
      occupancy: 100, 
      area: "50.63 ha", 
      imageThumb: "/media/FunctionalZones/HKMR.jpg", 
      imageLarge: "/media/FunctionalZones/HKMR.jpg" 
    },
    { 
      id: 7, 
      nameVi: "Hòa Cầm", 
      nameEn: "Hoa Cam",
      enterprises: 81, 
      occupancy: 97.66, 
      area: "149.84 ha", 
      imageThumb: "/media/FunctionalZones/KCNC1.jpg", 
      imageLarge: "/media/FunctionalZones/KCNC1.jpg" 
    },
    { 
      id: 8, 
      nameVi: "Khu công nghệ thông tin tập trung", 
      nameEn: "Concentrated IT Zone",
      enterprises: 5, 
      occupancy: 31.82, 
      area: "131.1 ha", 
      imageThumb: "/media/FunctionalZones/HKMR.jpg", 
      imageLarge: "/media/FunctionalZones/HKMR.jpg" 
    }
  ];

  // Map API data to ZoneData format, with fallback to static data if no API data
  const functionalZones: ZoneData[] = functionalZonesData 
    ? functionalZonesData.map(mapFunctionalZoneToZoneData)
    : (isError ? fallbackZonesData : []);
  
  const currentZone = functionalZones.find((zone: ZoneData) => zone.id === selectedZone) || functionalZones[0];
  
  return (
    <section className={cn(
      "py-12 px-4 sm:px-6 lg:px-8",
      theme === "dark" ? "bg-[#2C363F]" : "bg-[#F2F2F2]"
    )}>
      <div className="container mx-auto">
        <h2 className={cn(
          "font-montserrat font-bold text-2xl md:text-3xl mb-8 text-left",
          textColor
        )}>
          {t('functionalZones.title')}
        </h2>
        
        {/* Loading State */}
        {isLoading && (
          <>
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner size="lg" className={textColor} />
              <span className={cn("ml-3 text-lg", textColor)}>
                {t('common.loading') || 'Đang tải dữ liệu khu chức năng...'}
              </span>
            </div>
            
            <MainDisplaySkeleton />
            
            {/* Grid of zone thumbnail skeletons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <ZoneThumbnailSkeleton key={index} />
              ))}
            </div>
          </>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-12">
            <div className="flex justify-center items-center mb-4">
              <div className={cn("p-3 rounded-full", theme === "dark" ? "bg-red-900/20" : "bg-red-100")}>
                <Building2 className={cn("w-8 h-8", theme === "dark" ? "text-red-400" : "text-red-600")} />
              </div>
            </div>
            <h3 className={cn("text-xl font-semibold mb-2", textColor)}>
              {t('common.errorTitle') || 'Có lỗi xảy ra'}
            </h3>
            <p className={cn("text-lg mb-4", textColor)}>
              {t('common.errorLoading') || 'Không thể tải dữ liệu khu chức năng từ server.'}
            </p>
            <p className={cn("text-sm opacity-70", textColor)}>
              {error?.message || 'Đang hiển thị dữ liệu dự phòng.'}
            </p>
          </div>
        )}

        {/* Data State */}
        {functionalZones.length > 0 && !isLoading && currentZone && (
          <>
            {/* Large interactive display panel */}
            <div className="relative h-80 sm:h-96 md:h-[400px] rounded-2xl overflow-hidden mb-8">
              <img 
                src={currentZone.imageLarge}
                alt={getZoneName(currentZone)}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
              <div className="absolute inset-0 bg-black/40"></div>
              
              {/* Bottom left - Zone name and enterprise info */}
              <div className="absolute bottom-6 left-6">
                <h3 className="font-montserrat font-bold text-2xl md:text-3xl text-white mb-2">
                  {getZoneName(currentZone)}
                </h3>
                <div className="flex items-center text-white">
                  <Building2 className="w-5 h-5 mr-2" />
                  <span className="font-inter text-lg">{currentZone.enterprises} {t('functionalZones.enterprises')}</span>
                </div>
              </div>
              
              {/* Bottom right - Occupancy and area info */}
              <div className="absolute bottom-6 right-6 text-right">
                <p className="text-white font-inter mb-1">{t('functionalZones.occupancyRate')}: {currentZone.occupancy}%</p>
                <div className="h-2 w-32 sm:w-48 bg-white/30 rounded-full mb-2">
                  <div 
                    className={`h-full rounded-full ${primaryAccent}`}
                    style={{ width: `${currentZone.occupancy}%` }}
                  ></div>
                </div>
                <p className="text-white font-inter">{t('functionalZones.area')}: {currentZone.area}</p>
              </div>
            </div>
            
            {/* Grid of zone thumbnails */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {functionalZones.map((zone: ZoneData) => (
                <div 
                  key={zone.id}
                  className={cn(
                    "relative h-48 rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105",
                    zone.id === selectedZone ? "ring-2 ring-offset-2" : "",
                    theme === "dark" ? "ring-dseza-dark-primary-accent" : "ring-dseza-light-primary-accent"
                  )}
                  onClick={() => setSelectedZone(zone.id)}
                >
                  <img 
                    src={zone.imageThumb}
                    alt={getZoneName(zone)}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0">
                    <div className={cn(
                      "px-3 py-2 font-montserrat font-medium text-white text-xs",
                      zone.id === selectedZone ? primaryAccent : secondaryAccent
                    )}>
                      {getZoneName(zone)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* API Data Indicator */}
            {functionalZonesData && (
              <div className="mt-6 text-center">
                <span className={cn("text-sm opacity-70", textColor)}>
                  {t('functionalZones.dataSource') || 'Dữ liệu được cập nhật từ hệ thống'}
                </span>
              </div>
            )}
          </>
        )}

        {/* No Data State */}
        {!isLoading && !isError && functionalZones.length === 0 && (
          <div className="text-center py-12">
            <div className="flex justify-center items-center mb-4">
              <div className={cn("p-3 rounded-full", theme === "dark" ? "bg-gray-800" : "bg-gray-100")}>
                <Building2 className={cn("w-8 h-8", theme === "dark" ? "text-gray-400" : "text-gray-600")} />
              </div>
            </div>
            <h3 className={cn("text-xl font-semibold mb-2", textColor)}>
              {t('functionalZones.noDataTitle') || 'Chưa có dữ liệu'}
            </h3>
            <p className={cn("text-lg", textColor)}>
              {t('functionalZones.noZones') || 'Chưa có thông tin về các khu chức năng.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FunctionalZones;
