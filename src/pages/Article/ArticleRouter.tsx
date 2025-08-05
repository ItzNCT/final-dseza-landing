import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useArticle } from "@/api/hooks";
import { getArticleUrl } from "@/utils/seo";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileLayout from "@/components/mobile/MobileLayout";
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";
import ArticleDetailPage from "./ArticleDetailPage";
import { ArticleDetailPageContext } from "./DynamicArticleHandler";

/**
 * ArticleRouter component handles both UUID and path-based article routing
 * This component:
 * 1. Extracts the identifier from URL params
 * 2. Uses useArticle hook to fetch article data (auto-detects UUID vs path)
 * 3. Derives canonical URL and redirects if needed
 * 4. Renders ArticleDetailPage with the article data
 */
const ArticleRouter: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const { identifier } = useParams<{ identifier: string }>();
  
  console.log('🔍 ArticleRouter - Identifier:', identifier, 'Language:', language);
  
  // Fetch article using the smart hook that detects UUID vs path
  const { data, isLoading, isError, error } = useArticle(identifier || '', language);
  
  // Loading state - reuse the same loading UI as DynamicArticleHandler
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
    console.log('❌ ArticleRouter - Error or no data:', { isError, error, hasData: !!data?.data });
    
    if (isMobile) {
      return (
        <MobileLayout>
          <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
            <main className="flex-1 px-4 py-2">
              <div className="text-center">
                <h1 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  {language === 'en' ? 'Article not found' : 'Không tìm thấy bài viết'}
                </h1>
                <p className={`mb-6 text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                  {language === 'en' 
                    ? "The article you are looking for does not exist or has been moved."
                    : "Bài viết bạn tìm kiếm không tồn tại hoặc đã được di chuyển."}
                </p>
                <Button 
                  onClick={() => window.history.back()}
                  className={`w-full mb-4 ${theme === 'dark' ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary/80' : 'bg-dseza-light-primary hover:bg-dseza-light-primary/80'}`}
                >
                  {language === 'en' ? 'Go back' : 'Quay lại'}
                </Button>
                
                {/* Debug info for mobile */}
                <div className={`text-xs p-3 rounded border ${theme === 'dark' ? 'text-dseza-dark-secondary-text border-dseza-dark-border bg-dseza-dark-secondary-bg/50' : 'text-dseza-light-secondary-text border-dseza-light-border bg-dseza-light-secondary-bg/30'}`}>
                  <p className="font-medium mb-1">Identifier: {identifier}</p>
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
                {language === 'en' ? 'Article not found' : 'Không tìm thấy bài viết'}
              </h1>
              <p className={`mb-8 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                {language === 'en' 
                  ? "The article you are looking for does not exist or has been moved."
                  : "Bài viết bạn tìm kiếm không tồn tại hoặc đã được di chuyển."}
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
                  <p>Identifier: {identifier}</p>
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

  // Success - article found
  console.log('✅ ArticleRouter - Article found:', data);
  
  // Derive canonical URL using getArticleUrl
  const canonicalUrl = getArticleUrl(language, data.data);
  const currentPath = window.location.pathname;
  
  console.log('🔗 ArticleRouter - Current path:', currentPath, 'Canonical URL:', canonicalUrl);
  
  // If current path doesn't match canonical URL, redirect
  if (currentPath !== canonicalUrl) {
    console.log('🔄 ArticleRouter - Redirecting to canonical URL:', canonicalUrl);
    return <Navigate replace to={canonicalUrl} />;
  }

  // Render ArticleDetailPage with pre-fetched data via context
  console.log('✅ ArticleRouter - Rendering ArticleDetailPage with pre-fetched data');
  
  return (
    <ArticleDetailPageContext.Provider value={{ 
      overrideData: data,
      overrideUuid: data.data.id 
    }}>
      <ArticleDetailPage />
    </ArticleDetailPageContext.Provider>
  );
};

export default ArticleRouter;