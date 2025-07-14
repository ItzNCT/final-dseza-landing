// src/components/BusinessesAndPartners.tsx
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { useHomepageData } from "@/hooks/useHomepageData";
import { Skeleton } from "@/components/ui/skeleton";

interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  partnerUrl?: string;
  category?: string;
}

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
  const { data, isLoading, isError } = useHomepageData();

  // Theme-specific styles
  const textColor = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";

  // Fallback partner logos until API implements partners endpoint
  const fallbackPartnerLogos = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Firefox_logo%2C_2019.svg/1200px-Firefox_logo%2C_2019.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/2560px-Logo_of_YouTube_%282015-2017%29.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Dart-logo.png/768px-Dart-logo.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/2560px-PHP-logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/C_Programming_Language.svg/1853px-C_Programming_Language.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1822px-ISO_C%2B%2B_Logo.svg.png",
  ];

  // Convert fallback logos to Partner format for consistency
  const fallbackPartners: Partner[] = fallbackPartnerLogos.map((logo, index) => ({
    id: `fallback-${index}`,
    name: `Partner ${index + 1}`,
    logoUrl: logo,
    partnerUrl: "#",
    category: "technology"
  }));

  // Convert API partners to local Partner format
  const apiPartners: Partner[] = data?.partners?.map((partner) => ({
    id: partner.id,
    name: partner.name,
    logoUrl: partner.logo || '/media/placeholder.svg', // Map 'logo' to 'logoUrl'
    partnerUrl: partner.website || "#",
    category: partner.category
  })) || [];

  // Get partners from API data (fallback to static data until API is ready)
  const partners: Partner[] = apiPartners.length > 0 ? apiPartners : (data?.news ? fallbackPartners : []);

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
          </div>
        )}

        {/* Data State - Continuous scrolling logo carousel */}
        {partners.length > 0 && !isLoading && !isError && (
          <div className="relative w-full overflow-hidden">
            <div className="flex animate-[scroll_60s_linear_infinite] hover:pause">
              {/* First set of logos */}
              {partners.map((partner, index) => (
                <a
                  key={`partner-1-${partner.id || index}`}
                  href={partner.partnerUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 mx-8 transition-all duration-300 filter grayscale hover:grayscale-0 hover:scale-105"
                >
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="h-8 md:h-12 w-auto"
                  />
                </a>
              ))}

              {/* Duplicate set of logos for seamless scrolling */}
              {partners.map((partner, index) => (
                <a
                  key={`partner-2-${partner.id || index}`}
                  href={partner.partnerUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 mx-8 transition-all duration-300 filter grayscale hover:grayscale-0 hover:scale-105"
                >
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="h-8 md:h-12 w-auto"
                  />
                </a>
              ))}

              {/* Third set of logos for seamless scrolling */}
              {partners.map((partner, index) => (
                <a
                  key={`partner-3-${partner.id || index}`}
                  href={partner.partnerUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 mx-8 transition-all duration-300 filter grayscale hover:grayscale-0 hover:scale-105"
                >
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="h-8 md:h-12 w-auto"
                  />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* No Data State */}
        {data && partners.length === 0 && !isLoading && !isError && (
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