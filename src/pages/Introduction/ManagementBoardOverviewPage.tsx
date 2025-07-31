import React from "react";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Building, 
  ChevronRight,
  Network,
  Download,
  Share2,
  Printer
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/utils/translations";
import { useLanguageRoutes } from "@/utils/routes";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";
import MobileLayout from "@/components/mobile/MobileLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * ManagementBoardOverviewPage component with comprehensive mobile and multilingual support
 * Responsive design that adapts to mobile (<768px) automatically
 */
const ManagementBoardOverviewPage: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const { createUrl } = useLanguageRoutes();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Enhanced action handlers with toast notifications
  const handleDownload = () => {
    toast({
      title: t("managementOverview.downloadingTitle"),
      description: t("managementOverview.downloadingTitle"),
      variant: "default",
    });
    console.log('Downloading document...');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${t("managementOverview.pageTitle")} - DSEZA`,
        text: t("managementOverview.introduction"),
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: t("managementOverview.shareSuccess"),
        description: t("managementOverview.shareSuccess"),
        variant: "default",
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Overview items data with multilingual URLs
  const overviewItems = [
    {
      title: t("managementOverview.organizationalStructure.title"),
      description: t("managementOverview.organizationalStructure.description"),
      icon: Building,
      href: createUrl("/gioi-thieu/gioi-thieu-chung/co-cau-to-chuc")
    },
    {
      title: t("managementOverview.functionsResponsibilities.title"),
      description: t("managementOverview.functionsResponsibilities.description"),
      icon: FileText,
      href: createUrl("/gioi-thieu/gioi-thieu-chung/chuc-nang-nhiem-vu")
    },
    {
      title: t("managementOverview.affiliatedUnits.title"),
      description: t("managementOverview.affiliatedUnits.description"),
      icon: Network,
      href: createUrl("/gioi-thieu/gioi-thieu-chung/don-vi-truc-thuoc")
    }
  ];

  // Mobile Layout
  if (isMobile) {
    return (
      <MobileLayout>
        <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
          {/* Main Content - Mobile optimized */}
          <main className="flex-1 px-4 py-4 space-y-4">
            
            {/* Mobile Breadcrumb */}
            <div className={`py-1 px-2 rounded-lg ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg/50' : 'bg-dseza-light-secondary-bg/50'}`}>
              <nav className={`flex items-center space-x-1 text-xs ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                <Link 
                  to={createUrl("/")}
                  className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
                >
                  {t("common.home")}
                </Link>
                <ChevronRight className="h-2.5 w-2.5" />
                <span className={`${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                  {t("nav.intro")}
                </span>
                <ChevronRight className="h-2.5 w-2.5" />
                <span className={`${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                  {t("managementOverview.breadcrumbGeneral")}
                </span>
                <ChevronRight className="h-2.5 w-2.5" />
                <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  {t("managementOverview.title")}
                </span>
              </nav>
            </div>
            
            {/* Page Header - Mobile optimized */}
            <div className="text-center py-3">
              <h1 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {t("managementOverview.pageTitle")}
              </h1>
              <div className={`w-12 h-0.5 mx-auto mb-2 rounded-full ${theme === 'dark' ? 'bg-dseza-dark-primary' : 'bg-dseza-light-primary'}`}></div>
            </div>

            {/* Introduction Text - Mobile Card */}
            <Card className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
              <CardContent className="p-4">
                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                  {t("managementOverview.introduction")}
                </p>
              </CardContent>
            </Card>

            {/* Overview Cards - Mobile optimized */}
            <div className="space-y-4">
              {overviewItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Link 
                    key={index} 
                    to={item.href}
                    className="block"
                  >
                    <Card className={`transition-all duration-300 hover:shadow-lg ${
                      theme === 'dark' 
                        ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border hover:border-dseza-dark-primary/50' 
                        : 'bg-dseza-light-secondary-bg border-dseza-light-border hover:border-dseza-light-primary/50'
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg flex-shrink-0 ${
                            theme === 'dark' 
                              ? 'bg-dseza-dark-primary/20' 
                              : 'bg-dseza-light-primary/20'
                          }`}>
                            <IconComponent className={`h-5 w-5 ${
                              theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <h3 className={`text-base font-semibold mb-2 ${
                              theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                            }`}>
                              {item.title}
                            </h3>
                            <p className={`text-sm leading-relaxed ${
                              theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                            }`}>
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {/* Share Section - Mobile optimized */}
            <Card className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
              <CardContent className="p-4">
                <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  <Share2 className="h-4 w-4" />
                  {t("managementOverview.shareTitle")}
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleDownload}
                    className={`text-xs h-9 ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}`}
                  >
                    <Download className="w-3 h-3 mr-1" />
                    {t("managementOverview.download")}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleShare}
                    className={`text-xs h-9 ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}`}
                  >
                    <Share2 className="w-3 h-3 mr-1" />
                    {t("managementOverview.share")}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handlePrint}
                    className={`text-xs h-9 ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}`}
                  >
                    <Printer className="w-3 h-3 mr-1" />
                    {t("managementOverview.print")}
                  </Button>
                </div>
              </CardContent>
            </Card>

          </main>

          {/* Footer */}
          <Footer />
        </div>
      </MobileLayout>
    );
  }

  // Desktop Layout (enhanced with multilingual support)
  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
      {/* Header - Complete header structure */}
      <TopBar />
      <LogoSearchBar />
      <NavigationBar />
      
      {/* Main Content */}
      <main className="flex-1 pt-52">
        {/* Breadcrumb */}
        <div className={`py-2 ${theme === 'dark' ? 'bg-dseza-dark-secondary/50' : 'bg-dseza-light-secondary/50'}`}>
          <div className="container mx-auto px-4">
            <nav className={`flex items-center space-x-2 text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              <Link 
                to={createUrl("/")}
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {t("common.home")}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                {t("nav.intro")}
              </span>
              <ChevronRight className="h-4 w-4" />
              <Link 
                to={createUrl("/gioi-thieu/gioi-thieu-chung")}
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {t("managementOverview.breadcrumbGeneral")}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {t("managementOverview.title")}
              </span>
            </nav>
          </div>
        </div>

        {/* Page Content */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Page Title */}
          <h1 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
            {t("managementOverview.pageTitle")}
          </h1>

          {/* Introduction Text */}
          <div className="max-w-4xl mx-auto mb-12">
            <p className={`text-lg leading-relaxed text-center ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              {t("managementOverview.introduction")}
            </p>
          </div>

          {/* Overview Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {overviewItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Link 
                  key={index} 
                  to={item.href}
                  className="group"
                >
                  <Card className={`h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer ${
                    theme === 'dark' 
                      ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border hover:border-dseza-dark-primary/50' 
                      : 'bg-dseza-light-secondary-bg border-dseza-light-border hover:border-dseza-light-primary/50'
                  }`}>
                    <CardHeader className="text-center pb-4">
                      <div className={`mx-auto mb-4 p-4 rounded-full w-20 h-20 flex items-center justify-center ${
                        theme === 'dark' 
                          ? 'bg-dseza-dark-primary/20' 
                          : 'bg-dseza-light-primary/20'
                      }`}>
                        <IconComponent className={`h-10 w-10 ${
                          theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'
                        }`} />
                      </div>
                      <CardTitle className={`text-xl font-bold group-hover:${
                        theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'
                      } transition-colors ${
                        theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                      }`}>
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <CardDescription className={`text-base leading-relaxed ${
                        theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                      }`}>
                        {item.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Share Section */}
          <div className={`mt-12 pt-8 border-t ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
            <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
              <Share2 className="h-5 w-5" />
              {t("managementOverview.shareTitle")}
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDownload}
                className={theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}
              >
                <Download className="w-4 h-4 mr-2" />
                {t("managementOverview.download")}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleShare}
                className={theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}
              >
                <Share2 className="w-4 h-4 mr-2" />
                {t("managementOverview.share")}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePrint}
                className={theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}
              >
                <Printer className="w-4 h-4 mr-2" />
                {t("managementOverview.print")}
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ManagementBoardOverviewPage;
