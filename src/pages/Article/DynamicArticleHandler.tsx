import React from "react";
import { useTranslation } from "react-i18next";
import { useParams, Navigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useArticleByPath } from "@/api/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileLayout from "@/components/mobile/MobileLayout";
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";
import ArticleDetailPage from "./ArticleDetailPage";

/**
 * ArticleDetailPageWithData component that renders ArticleDetailPage with pre-fetched data
 * This preserves the SEO-friendly URL while providing the article data
 */
interface ArticleDetailPageWithDataProps {
  articleData: any;
  pathAlias: string;
}

const ArticleDetailPageWithData: React.FC<ArticleDetailPageWithDataProps> = ({ articleData, pathAlias }) => {
  // Extract UUID from the articleData to pass to ArticleDetailPage
  const uuid = articleData?.data?.id || '';
  
  console.log('🎯 ArticleDetailPageWithData - Rendering with UUID:', uuid, 'Path:', pathAlias);
  
  // Pass pre-fetched data directly to ArticleDetailPage via context
  // No need for MemoryRouter - just provide the data and UUID via context
  return (
    <ArticleDetailPageContext.Provider value={{ 
      overrideData: articleData,
      overrideUuid: uuid 
    }}>
      <ArticleDetailPage />
    </ArticleDetailPageContext.Provider>
  );
};

// Create context for passing data to ArticleDetailPage
interface ArticleDetailContextType {
  overrideData?: any;
  overrideUuid?: string;
}

export const ArticleDetailPageContext = React.createContext<ArticleDetailContextType>({});

/**
 * DynamicArticleHandler component handles SEO-friendly URLs from Drupal path aliases
 * This component:
 * 1. Extracts the path from URL params
 * 2. Fetches the article using path alias
 * 3. If found, renders the ArticleDetailPage with the article data
 * 4. If not found, shows 404 error
 * 
 * @example
 * URL: /vi/trung-tam-dich-vu-tong-hop-khu-cong-nghe-cao-da-nang-lam-viec-voi-phan-vien-khoa-hoc-an-toan-ve-sinh-lao-dong-va-bao-ve-moi-truong-mien-trung
 * Will fetch article with that path alias and render it.
 */
const DynamicArticleHandler: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const { "*": wildcardPath } = useParams();
  
  // Construct the full path from the wildcard
  const pathAlias = wildcardPath ? `/${wildcardPath}` : '';
  
  console.log('🔍 DynamicArticleHandler - Path alias:', pathAlias, 'Language:', language);
  
  // Fetch article by path alias
  const { data, isLoading, isError, error } = useArticleByPath(pathAlias, language);
  
  // Loading state
  if (isLoading) {
    if (isMobile) {
      return (
        <MobileLayout>
          <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
            <main className="flex-1 px-4 py-2 space-y-3">
              {/* Title Skeleton */}
              <div className="space-y-3">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <div className="flex flex-wrap gap-3">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-16" />
                </div>
              </div>

              {/* Image Skeleton */}
              <Skeleton className="w-full h-48 rounded-lg" />

              {/* Content Skeleton */}
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </main>

            <Footer />
          </div>
        </MobileLayout>
      );
    }

    // Desktop Loading State
    return (
      <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
        <TopBar />
        <LogoSearchBar />
        <NavigationBar />
        
        <main className="flex-1 pt-52">
          {/* Breadcrumb Skeleton */}
          <div className={`py-4 ${theme === 'dark' ? 'bg-dseza-dark-secondary/50' : 'bg-dseza-light-secondary/50'}`}>
            <div className="container mx-auto px-4">
              <Skeleton className="h-4 w-96" />
            </div>
          </div>

          {/* Article Content Skeleton */}
          <div className="container mx-auto px-4 py-8">
            <article className="max-w-4xl mx-auto">
              <header className="mb-8">
                <Skeleton className="h-10 w-full mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <div className="flex gap-4 mb-6">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </header>

              <Skeleton className="w-full h-96 rounded-lg mb-8" />

              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </article>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // Error state - article not found or other error
  if (isError || !data?.data) {
    console.log('❌ DynamicArticleHandler - Error or no data:', { isError, error, hasData: !!data?.data });
    
    if (isMobile) {
      return (
        <MobileLayout>
          <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
            <main className="flex-1 px-4 py-2">
              <div className="text-center">
                <h1 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  {language === 'en' ? 'Page not found' : 'Không tìm thấy trang'}
                </h1>
                <p className={`mb-6 text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                  {language === 'en' 
                    ? "The page you are looking for does not exist or has been moved."
                    : "Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển."}
                </p>
                <Button 
                  onClick={() => window.history.back()}
                  className={`w-full mb-4 ${theme === 'dark' ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary/80' : 'bg-dseza-light-primary hover:bg-dseza-light-primary/80'}`}
                >
                  {language === 'en' ? 'Go back' : 'Quay lại'}
                </Button>
                
                {/* Debug info for mobile */}
                <div className={`text-xs p-3 rounded border ${theme === 'dark' ? 'text-dseza-dark-secondary-text border-dseza-dark-border bg-dseza-dark-secondary-bg/50' : 'text-dseza-light-secondary-text border-dseza-light-border bg-dseza-light-secondary-bg/30'}`}>
                  <p className="font-medium mb-1">Path: {pathAlias}</p>
                  <p>Language: {language}</p>
                  {error && <p className="text-red-500 mt-1">Error: {error.message}</p>}
                </div>
              </div>
            </main>

            <Footer />
          </div>
        </MobileLayout>
      );
    }

    // Desktop Not Found State
    return (
      <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
        <TopBar />
        <LogoSearchBar />
        <NavigationBar />
        
        <main className="flex-1 pt-52">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {language === 'en' ? 'Page not found' : 'Không tìm thấy trang'}
              </h1>
              <p className={`mb-8 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                {language === 'en' 
                  ? "The page you are looking for does not exist or has been moved."
                  : "Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển."}
              </p>
              
              <div className="space-y-4">
                <Button 
                  onClick={() => window.history.back()}
                  className={theme === 'dark' ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary/80' : 'bg-dseza-light-primary hover:bg-dseza-light-primary/80'}
                >
                  {language === 'en' ? 'Go back' : 'Quay lại'}
                </Button>
                
                {/* Debug Information */}
                <div className={`text-sm border p-4 rounded-lg ${theme === 'dark' ? 'text-dseza-dark-secondary-text border-dseza-dark-border bg-dseza-dark-secondary-bg/50' : 'text-dseza-light-secondary-text border-dseza-light-border bg-dseza-light-secondary-bg/50'}`}>
                  <p className="font-semibold mb-2">Debug Information:</p>
                  <p>Requested path: {pathAlias}</p>
                  <p>Language: {language}</p>
                  <p>Full URL: {window.location.href}</p>
                  {error && (
                    <p className="mt-2 text-red-500">
                      Error: {error.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // Success - article found, render ArticleDetailPage directly to preserve SEO URL
  console.log('✅ DynamicArticleHandler - Article found, rendering ArticleDetailPage with pre-fetched data');
  
  // Create a custom ArticleDetailPageWithData that passes pre-fetched data
  return <ArticleDetailPageWithData articleData={data} pathAlias={pathAlias} />;
};

export default DynamicArticleHandler;