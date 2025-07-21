// src/components/BusinessesAndPartners.tsx
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { usePartners } from "@/hooks/usePartners";
import { Skeleton } from "@/components/ui/skeleton";

// PartnerLogoSkeleton component for loading state
const PartnerLogoSkeleton = () => {
  return (
    <div className="flex-shrink-0 mx-8">
      <Skeleton className="h-8 md:h-12 w-20 md:w-32" />
    </div>
  );
};

/**
 * Businesses and Partners section with continuous scrolling logo carousel
 */
const BusinessesAndPartners: React.FC = () => {
  const { theme } = useTheme();
  const { partners, isLoading, isError, error, hasPartners } = usePartners();

  // Theme-specific styles
  const textColor = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";

  return (
    <section className={cn(
      "py-12 px-4 sm:px-6 lg:px-8",
      theme === "dark" ? "bg-[#2C363F]" : "bg-[#FFFFFF]"
    )}>
      <div className="container mx-auto">
        <h2 className={cn(
          "font-montserrat font-bold text-3xl md:text-4xl mb-16",
          textColor,
          "text-center lg:text-left"
        )}>
          DOANH NGHIỆP VÀ ĐỐI TÁC
        </h2>

        {/* Loading State */}
        {isLoading && (
          <div className="relative w-full overflow-hidden">
            <div className="flex">
              {Array.from({ length: 10 }).map((_, index) => (
                <PartnerLogoSkeleton key={index} />
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-12">
            <p className={cn("text-lg", textColor)}>
              Có lỗi xảy ra khi tải thông tin đối tác.
            </p>
            {error && (
              <p className={cn("text-sm mt-2 opacity-70", textColor)}>
                Chi tiết: {error.message}
              </p>
            )}
          </div>
        )}

        {/* Data State - Continuous scrolling logo carousel */}
        {hasPartners && !isLoading && !isError && (
          <div className="relative w-full overflow-hidden">
            <div className="flex animate-[scroll_60s_linear_infinite] hover:pause">
              {/* First set of logos */}
              {partners.map((partner, index) => (
                <a
                  key={`partner-1-${partner.id}`}
                  href={partner.partnerUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 mx-8 transition-all duration-300 filter grayscale hover:grayscale-0 hover:scale-105"
                  title={partner.name}
                >
                  <img
                    src={partner.logoUrl || '/media/placeholder.svg'}
                    alt={partner.name}
                    className="h-8 md:h-12 w-auto object-contain"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = '/media/placeholder.svg';
                    }}
                  />
                </a>
              ))}

              {/* Duplicate set of logos for seamless scrolling */}
              {partners.map((partner, index) => (
                <a
                  key={`partner-2-${partner.id}`}
                  href={partner.partnerUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 mx-8 transition-all duration-300 filter grayscale hover:grayscale-0 hover:scale-105"
                  title={partner.name}
                >
                  <img
                    src={partner.logoUrl || '/media/placeholder.svg'}
                    alt={partner.name}
                    className="h-8 md:h-12 w-auto object-contain"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = '/media/placeholder.svg';
                    }}
                  />
                </a>
              ))}

              {/* Third set of logos for seamless scrolling */}
              {partners.map((partner, index) => (
                <a
                  key={`partner-3-${partner.id}`}
                  href={partner.partnerUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 mx-8 transition-all duration-300 filter grayscale hover:grayscale-0 hover:scale-105"
                  title={partner.name}
                >
                  <img
                    src={partner.logoUrl || '/media/placeholder.svg'}
                    alt={partner.name}
                    className="h-8 md:h-12 w-auto object-contain"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = '/media/placeholder.svg';
                    }}
                  />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* No Data State */}
        {!hasPartners && !isLoading && !isError && (
          <div className="text-center py-12">
            <p className={cn("text-lg", textColor)}>
              Chưa có thông tin đối tác nào được đăng tải.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BusinessesAndPartners;