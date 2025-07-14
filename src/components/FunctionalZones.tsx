import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/utils/translations";
import { useLanguage } from "@/context/LanguageContext";
import { useHomepageData } from "@/hooks/useHomepageData";
import { Skeleton } from "@/components/ui/skeleton";

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

/**
 * Functional Zones section displaying Da Nang's industrial and high-tech zones
 */
const FunctionalZones: React.FC = () => {
  const { theme } = useTheme();
  const [selectedZone, setSelectedZone] = useState<number>(1);
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { data, isLoading, isError } = useHomepageData();
  
  // Theme-specific styles
  const textColor = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";
  const primaryAccent = theme === "dark" ? "bg-dseza-dark-primary-accent" : "bg-dseza-light-primary-accent";
  const secondaryAccent = theme === "dark" ? "bg-dseza-dark-secondary-accent" : "bg-dseza-light-secondary-accent";
  
  const getZoneName = (zone: ZoneData): string => {
    return language === 'vi' ? zone.nameVi : zone.nameEn;
  };

  // Fallback zones data until API implements functionalZones
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
      imageThumb: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80", 
      imageLarge: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
    },
    { 
      id: 4, 
      nameVi: "Hòa Khánh", 
      nameEn: "Hoa Khanh",
      enterprises: 228, 
      occupancy: 100, 
      area: "394 ha", 
      imageThumb: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80", 
      imageLarge: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
    },
    { 
      id: 5, 
      nameVi: "Khu công nghiệp Liên Chiểu", 
      nameEn: "Lien Chieu Industrial Zone",
      enterprises: 36, 
      occupancy: 60.07, 
      area: "289.35 ha", 
      imageThumb: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80", 
      imageLarge: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
    },
    { 
      id: 6, 
      nameVi: "Khu công nghiệp dịch vụ Thủy sản Đà Nẵng", 
      nameEn: "Danang Seafood Service Industrial Zone",
      enterprises: 56, 
      occupancy: 100, 
      area: "50.63 ha", 
      imageThumb: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80", 
      imageLarge: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
    },
    { 
      id: 7, 
      nameVi: "Hòa Cầm", 
      nameEn: "Hoa Cam",
      enterprises: 81, 
      occupancy: 97.66, 
      area: "149.84 ha", 
      imageThumb: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80", 
      imageLarge: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
    },
    { 
      id: 8, 
      nameVi: "Khu công nghệ thông tin tập trung", 
      nameEn: "Concentrated IT Zone",
      enterprises: 5, 
      occupancy: 31.82, 
      area: "131.1 ha", 
      imageThumb: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80", 
      imageLarge: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
    }
  ];

  // Get functional zones from API data (fallback to static data until API is ready)
  // TODO: Replace with data?.functionalZones when API implements this endpoint
  const functionalZones = data?.news ? fallbackZonesData : [];
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
            <p className={cn("text-lg", textColor)}>
              {t('common.errorLoading') || 'Có lỗi xảy ra khi tải dữ liệu khu chức năng.'}
            </p>
          </div>
        )}

        {/* Data State */}
        {functionalZones.length > 0 && !isLoading && !isError && currentZone && (
          <>
            {/* Large interactive display panel */}
            <div 
              className="relative h-80 sm:h-96 md:h-[400px] rounded-2xl overflow-hidden mb-8" 
              style={{
                backgroundImage: `url(${currentZone.imageLarge})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
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
                  style={{
                    backgroundImage: `url(${zone.imageThumb})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
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
          </>
        )}

        {/* No Data State */}
        {data && functionalZones.length === 0 && !isLoading && !isError && (
          <div className="text-center py-12">
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
