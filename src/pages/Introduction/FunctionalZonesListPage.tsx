import React from "react";
import { Link } from "react-router-dom";
import { 
  ChevronRight,
  Building2, 
  MapPin, 
  TrendingUp,
  Users
} from 'lucide-react';
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/utils/translations";
import { useFunctionalZones } from "@/hooks/useFunctionalZones";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Badge } from "@/components/ui/badge";

// Import complete header structure
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";

/**
 * FunctionalZonesListPage - Trang danh sách các khu chức năng
 * Hiển thị tất cả các khu chức năng trong DSEZA với layout card dọc
 */
const FunctionalZonesListPage: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const { data: functionalZones, isLoading, isError, error } = useFunctionalZones();

  const textColor = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";
  const secondaryTextColor = theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text";
  const cardBackground = theme === "dark" ? "bg-dseza-dark-secondary" : "bg-dseza-light-main-bg";
  const borderColor = theme === "dark" ? "border-dseza-dark-border" : "border-dseza-light-border";
  const hoverColor = theme === "dark" ? "hover:bg-dseza-dark-hover" : "hover:bg-dseza-light-hover";

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
      {/* Complete Header Structure */}
      <TopBar />
      <LogoSearchBar />
      <NavigationBar />
      
      {/* Main Content */}
      <main className="flex-1 pt-52">
        {/* Breadcrumb */}
        <div className={`py-2 ${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`}>
          <div className="container mx-auto px-4">
            <nav className={`flex items-center space-x-2 text-sm ${secondaryTextColor}`}>
              <Link 
                to="/" 
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary-accent' : 'hover:text-dseza-light-primary-accent'}`}
              >
                Trang chủ
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link 
                to="/gioi-thieu" 
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary-accent' : 'hover:text-dseza-light-primary-accent'}`}
              >
                Giới thiệu
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${textColor}`}>
                Các Khu chức năng
              </span>
            </nav>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 py-8">
          <article className="max-w-6xl mx-auto">
            {/* Article Header */}
            <header className="mb-8">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${textColor}`}>
                Các Khu chức năng
              </h1>
              <p className={`text-lg ${secondaryTextColor}`}>
                Khám phá các khu công nghệ cao, khu công nghiệp và khu chức năng đặc biệt tại Đà Nẵng
              </p>
            </header>

            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-20">
                <LoadingSpinner size="lg" className={textColor} />
                <p className={`mt-4 text-lg font-medium ${textColor}`}>
                  {t('common.loading') || 'Đang tải dữ liệu các khu chức năng...'}
                </p>
              </div>
            )}

            {/* Error State */}
            {isError && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className={cn(
                  "p-4 rounded-full mb-6",
                  theme === "dark" ? "bg-dseza-dark-hover" : "bg-dseza-light-hover"
                )}>
                  <Building2 className={cn(
                    "w-12 h-12",
                    theme === "dark" ? "text-red-400" : "text-red-600"
                  )} />
                </div>
                <h2 className={cn("text-2xl font-bold mb-4", textColor)}>
                  {t('common.errorTitle') || 'Có lỗi xảy ra'}
                </h2>
                <p className={cn("text-lg text-center max-w-md", textColor)}>
                  {t('common.errorLoading') || 'Không thể tải dữ liệu các khu chức năng từ server.'}
                </p>
                {error && (
                  <p className={cn("text-sm mt-2 opacity-70", textColor)}>
                    {error.message}
                  </p>
                )}
              </div>
            )}

            {/* No Data State */}
            {!isLoading && !isError && (!functionalZones || functionalZones.length === 0) && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className={cn(
                  "p-4 rounded-full mb-6",
                  theme === "dark" ? "bg-dseza-dark-hover" : "bg-dseza-light-hover"
                )}>
                  <Building2 className={cn(
                    "w-12 h-12",
                    secondaryTextColor
                  )} />
                </div>
                <h2 className={cn("text-2xl font-bold mb-4", textColor)}>
                  {t('functionalZones.noDataTitle') || 'Chưa có dữ liệu'}
                </h2>
                <p className={cn("text-lg text-center", textColor)}>
                  {t('functionalZones.noZones') || 'Chưa có thông tin về các khu chức năng.'}
                </p>
              </div>
            )}

            {/* Main Content - Functional Zones Grid */}
            {functionalZones && functionalZones.length > 0 && !isLoading && (
              <div className="space-y-8">
                {functionalZones.map((zone) => (
                  <Link
                    key={zone.id}
                    to={zone.path}
                    className="block group"
                  >
                    <div className={cn(
                      "rounded-xl overflow-hidden shadow-md transition-all duration-300",
                      "group-hover:shadow-xl group-hover:scale-[1.02] border",
                      cardBackground,
                      borderColor,
                      hoverColor
                    )}>
                      <div className="flex flex-col lg:flex-row">
                        {/* Image Section - 1/3 width on desktop */}
                        <div className="lg:w-1/3 h-64 lg:h-80 relative overflow-hidden">
                          {zone.imageUrl ? (
                            <img
                              src={zone.imageUrl}
                              alt={zone.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              loading="lazy"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder.svg';
                              }}
                            />
                          ) : (
                            <div className={cn(
                              "w-full h-full flex items-center justify-center",
                              theme === "dark" ? "bg-dseza-dark-hover" : "bg-dseza-light-hover"
                            )}>
                              <Building2 className={cn(
                                "w-16 h-16",
                                secondaryTextColor
                              )} />
                            </div>
                          )}
                        </div>

                        {/* Content Section - 2/3 width on desktop */}
                        <div className="lg:w-2/3 p-6 lg:p-8 flex flex-col justify-between">
                          {/* Title and Summary */}
                          <div className="flex-1">
                            <h3 className={cn(
                              "font-montserrat font-bold text-xl lg:text-2xl mb-3 transition-colors duration-300",
                              textColor,
                              theme === "dark" ? "group-hover:text-dseza-dark-primary-accent" : "group-hover:text-dseza-light-primary-accent"
                            )}>
                              {zone.title}
                            </h3>
                            
                            {zone.summary && (
                              <p className={cn(
                                "text-base lg:text-lg mb-6 line-clamp-3",
                                secondaryTextColor
                              )}>
                                {zone.summary}
                              </p>
                            )}
                          </div>

                          {/* Statistics Section */}
                          <div className="space-y-4">
                            {/* Key Statistics Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {zone.enterprises > 0 && (
                                <div className="flex items-center space-x-3">
                                  <div className={cn(
                                    "p-2 rounded-lg",
                                    theme === "dark" ? "bg-dseza-dark-primary-accent/20" : "bg-dseza-light-primary-accent/20"
                                  )}>
                                    <Users className={cn(
                                      "w-5 h-5",
                                      theme === "dark" ? "text-dseza-dark-primary-accent" : "text-dseza-light-primary-accent"
                                    )} />
                                  </div>
                                  <div>
                                    <div className={cn("text-sm", secondaryTextColor)}>
                                      Doanh nghiệp
                                    </div>
                                    <div className={cn("text-lg font-semibold", textColor)}>
                                      {zone.enterprises}
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {zone.area && (
                                <div className="flex items-center space-x-3">
                                  <div className={cn(
                                    "p-2 rounded-lg",
                                    theme === "dark" ? "bg-dseza-dark-secondary-accent/20" : "bg-dseza-light-secondary-accent/20"
                                  )}>
                                    <MapPin className={cn(
                                      "w-5 h-5",
                                      theme === "dark" ? "text-dseza-dark-secondary-accent" : "text-dseza-light-secondary-accent"
                                    )} />
                                  </div>
                                  <div>
                                    <div className={cn("text-sm", secondaryTextColor)}>
                                      Diện tích
                                    </div>
                                    <div className={cn("text-lg font-semibold", textColor)}>
                                      {zone.area}
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {zone.occupancyRate > 0 && (
                                <div className="flex items-center space-x-3">
                                  <div className={cn(
                                    "p-2 rounded-lg",
                                    theme === "dark" ? "bg-orange-500/20" : "bg-orange-100"
                                  )}>
                                    <TrendingUp className={cn(
                                      "w-5 h-5",
                                      theme === "dark" ? "text-orange-400" : "text-orange-600"
                                    )} />
                                  </div>
                                  <div>
                                    <div className={cn("text-sm", secondaryTextColor)}>
                                      Tỉ lệ lấp đầy
                                    </div>
                                    <div className={cn("text-lg font-semibold", textColor)}>
                                      {zone.occupancyRate}%
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Status Badges */}
                            <div className="flex flex-wrap gap-2">
                              {zone.occupancyRate >= 90 && (
                                <Badge variant="default" className="bg-red-500 hover:bg-red-600 text-white">
                                  Gần đầy
                                </Badge>
                              )}
                              {zone.occupancyRate >= 70 && zone.occupancyRate < 90 && (
                                <Badge variant="default" className="bg-orange-500 hover:bg-orange-600 text-white">
                                  Tỉ lệ cao
                                </Badge>
                              )}
                              {zone.occupancyRate >= 40 && zone.occupancyRate < 70 && (
                                <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                                  Trung bình
                                </Badge>
                              )}
                              {zone.occupancyRate < 40 && zone.occupancyRate > 0 && (
                                <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-white">
                                  Còn trống
                                </Badge>
                              )}
                              {zone.enterprises >= 50 && (
                                <Badge variant="outline" className={cn(
                                  "border-current",
                                  theme === "dark" ? "text-dseza-dark-secondary-accent border-dseza-dark-secondary-accent" : "text-dseza-light-secondary-accent border-dseza-light-secondary-accent"
                                )}>
                                  Quy mô lớn
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}

                {/* Footer Note */}
                <div className="mt-12 text-center">
                  <p className={cn("text-sm opacity-70", textColor)}>
                    {t('functionalZones.dataSource') || 'Dữ liệu được cập nhật từ hệ thống DSEZA'}
                  </p>
                </div>
              </div>
            )}
          </article>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FunctionalZonesListPage;
