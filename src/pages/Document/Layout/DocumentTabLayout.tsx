import React from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";
import DocumentSideNav from "@/pages/Document/Layout/DocumentSideNav";
import { ChevronRight } from "lucide-react";

const DocumentTabLayout: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();

  // Translated labels
  const homeLabel = language === "en" ? "Home" : "Trang chủ";
  const pageTitle = language === "en" ? "Legal Document Lookup" : "Tra cứu Văn bản Pháp quy";

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
            <a
              href="/"
              className={`transition-colors ${
                theme === "dark" ? "hover:text-dseza-dark-primary" : "hover:text-dseza-light-primary"
              }`}
            >
              {homeLabel}
            </a>
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
