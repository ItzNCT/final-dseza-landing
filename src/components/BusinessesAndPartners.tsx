// src/components/BusinessesAndPartners.tsx
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { usePartners } from "@/hooks/usePartners";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/utils/translations";

// PartnerLogoSkeleton component for loading state
const PartnerLogoSkeleton = () => {
  return (
    <div className="flex-shrink-0 mx-8">
      <Skeleton className="h-16 md:h-20 lg:h-24 w-40 md:w-52 lg:w-60" />
    </div>
  );
};

/**
 * Businesses and Partners section with continuous scrolling logo carousel
 */
const BusinessesAndPartners: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { partners, isLoading, isError, error, hasPartners } = usePartners();

  // Use provided partners list and create a duplicated list for seamless marquee
  const displayedPartners = partners || [];
  const marqueePartners = displayedPartners.length > 0
    ? [...displayedPartners, ...displayedPartners]
    : [];

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
          {t('homepage.businessesAndPartners')}
        </h2>

        {/* Loading State */}
        {isLoading && (
          <div className="relative w-full overflow-hidden">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
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
              {t('partners.error') || 'Có lỗi xảy ra khi tải thông tin đối tác.'}
            </p>
            {error && (
              <p className={cn("text-sm mt-2 opacity-70", textColor)}>
                Chi tiết: {error.message}
              </p>
            )}
          </div>
        )}

        {/* Data State - Continuous marquee of partner logos */}
        {hasPartners && !isLoading && !isError && (
          <div className="mt-6 group" dir="ltr">
            <div className="relative w-full overflow-hidden">
              <div className="marquee-track flex items-center">
                {marqueePartners.map((partner, index) => (
                  <div key={`partner-${partner.id}-${index}`} className="flex-shrink-0 mx-8">
                    <a
                      href={partner.partnerUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block transition-transform duration-300 filter grayscale hover:grayscale-0 hover:scale-105"
                      title={partner.name}
                    >
                      <div className="h-16 md:h-20 lg:h-24 xl:h-28 w-40 md:w-52 lg:w-60 xl:w-64 flex items-center justify-center">
                        <img
                          src={partner.logoUrl || '/media/placeholder.svg'}
                          alt={partner.name}
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/media/placeholder.svg';
                          }}
                        />
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* No Data State */}
        {!hasPartners && !isLoading && !isError && (
          <div className="text-center py-12">
            <p className={cn("text-lg", textColor)}>
              {t('partners.noData') || 'Chưa có thông tin đối tác nào được đăng tải.'}
            </p>
          </div>
        )}
      </div>
      {/* Component-scoped marquee styles */}
      <style>{`
        .marquee-track {
          width: max-content;
          animation: dseza-marquee 40s linear infinite;
        }
        .group:hover .marquee-track {
          animation-play-state: paused;
        }
        @keyframes dseza-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default BusinessesAndPartners;