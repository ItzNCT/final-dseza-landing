import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from 'lucide-react';
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/utils/translations";
import { cn } from "@/lib/utils";

// Import complete header structure
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";

interface FunctionalzoneLayoutProps {
  children: React.ReactNode;
  title: string;
  breadcrumbItems?: Array<{
    label: string;
    href?: string;
  }>;
  className?: string;
}

/**
 * FunctionalzoneLayout - Layout chung cho các trang Khu công nghiệp
 * Cung cấp header, breadcrumb, footer và styling nhất quán
 */
const FunctionalzoneLayout: React.FC<FunctionalzoneLayoutProps> = ({
  children,
  title,
  breadcrumbItems = [],
  className
}) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const location = useLocation();

  const textColor = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";
  const secondaryTextColor = theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text";
  const borderColor = theme === "dark" ? "border-dseza-dark-border" : "border-dseza-light-border";

  // Breadcrumb mặc định
  const defaultBreadcrumbs = [
    { label: t("home"), href: "/" },
    { label: t("functionalZones"), href: "/functionalzone" },
    ...breadcrumbItems
  ];

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
      {/* Complete Header Structure */}
      <TopBar />
      <LogoSearchBar />
      <NavigationBar />
      
      {/* Main Content */}
      <main className="flex-1 pt-52">
        {/* Breadcrumb */}
        <div className={`py-3 ${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'} ${borderColor} border-b`}>
          <div className="container mx-auto px-4">
            <nav className="flex items-center space-x-2 text-sm">
              {defaultBreadcrumbs.map((item, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
                  {item.href ? (
                    <Link 
                      to={item.href} 
                      className={`${secondaryTextColor} hover:${textColor} transition-colors duration-200`}
                    >
                      {index === 0 && <Home className="w-4 h-4 inline mr-1" />}
                      {item.label}
                    </Link>
                  ) : (
                    <span className={textColor}>
                      {item.label}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>
        </div>

        {/* Page Title */}
        <div className="container mx-auto px-4 py-6">
          <h1 className={`text-3xl font-bold ${textColor} mb-6`}>
            {title}
          </h1>
        </div>

        {/* Page Content */}
        <div className={cn("container mx-auto px-4 pb-8", className)}>
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FunctionalzoneLayout; 