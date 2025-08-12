import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";
import DocumentSideNav from "@/pages/Document/Layout/DocumentSideNav";
import { ChevronRight } from "lucide-react";
import MobileLayout from "@/components/mobile/MobileLayout";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguageRoutes } from "@/utils/routes";

const DocumentTabLayout: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const { createUrl } = useLanguageRoutes();

  // Translated labels
  const homeLabel = language === "en" ? "Home" : "Trang chủ";
  const pageTitle = language === "en" ? "Legal Document Lookup" : "Tra cứu Văn bản Pháp quy";

  if (isMobile) {
    return (
      <MobileLayout>
        <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-dseza-dark-main-bg" : "bg-dseza-light-main-bg"}`}>
          <main className="flex-1 px-4 py-4 space-y-4">
            {/* Breadcrumb - Mobile */}
            <div className={`${theme === 'dark' ? 'bg-dseza-dark-secondary/30' : 'bg-dseza-light-secondary/30'} rounded-lg px-2 py-1`}>
              <nav className={`flex items-center space-x-1 text-xs ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                <Link to={createUrl('')} className={`${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'} hover:underline`}>
                  {homeLabel}
                </Link>
                <ChevronRight className="h-2.5 w-2.5" />
                <span className={`${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'} font-medium`}>{pageTitle}</span>
              </nav>
            </div>

            {/* Title */}
            <div className="text-center">
              <h1 className={`${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'} text-xl font-bold`}>{pageTitle}</h1>
              <div className={`${theme === 'dark' ? 'bg-dseza-dark-primary' : 'bg-dseza-light-primary'} w-12 h-0.5 mx-auto mt-2 rounded-full`} />
            </div>

            {/* Side Nav (top) + Content */}
            <div className="space-y-3">
              <DocumentSideNav />
              <div className={`min-h-[400px] rounded-lg border ${theme === 'dark' ? 'bg-dseza-dark-secondary border-dseza-dark-border' : 'bg-dseza-light-secondary border-dseza-light-border'}`}>
                <Outlet />
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </MobileLayout>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === "dark" ? "bg-dseza-dark-main-bg" : "bg-dseza-light-main-bg"
      }`}
    >
      {/* Header - Complete header structure */}
      <TopBar />
      <LogoSearchBar />
      <NavigationBar />

      {/* Breadcrumb */}
      <div
        className={`py-2 mt-52 ${
          theme === "dark" ? "bg-dseza-dark-secondary/50" : "bg-dseza-light-secondary/50"
        }`}
      >
        <div className="container mx-auto px-4">
          <nav
            className={`flex items-center space-x-2 text-sm ${
              theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text"
            }`}
          >
            <Link
              to={createUrl('')}
              className={`transition-colors ${
                theme === "dark" ? "hover:text-dseza-dark-primary" : "hover:text-dseza-light-primary"
              }`}
            >
              {homeLabel}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span
              className={`font-medium ${
                theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text"
              }`}
            >
              {pageTitle}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content - 2 Column Layout */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Page Title */}
          <h1
            className={`text-3xl md:text-4xl font-bold mb-8 text-center ${
              theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text"
            }`}
          >
            {pageTitle}
          </h1>

          {/* 2 Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Column - Navigation (1/4 width) */}
            <div className="lg:col-span-1">
              <DocumentSideNav />
            </div>

            {/* Right Column - Content (3/4 width) */}
            <div className="lg:col-span-3">
              <div
                className={`min-h-[600px] rounded-lg border ${
                  theme === "dark"
                    ? "bg-dseza-dark-secondary border-dseza-dark-border"
                    : "bg-dseza-light-secondary border-dseza-light-border"
                }`}
              >
                {/* Content will be rendered by Outlet */}
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DocumentTabLayout;
