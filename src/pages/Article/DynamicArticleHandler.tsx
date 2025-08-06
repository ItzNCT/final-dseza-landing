import React from "react";
import { useTranslation } from "react-i18next";
import { useParams, Navigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useArticle, fetchAllArticlesDebugInfo } from "@/api/hooks";
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
 * Helper function to extract potential UUID from path
 */
const extractUuidFromPath = (path: string): string | null => {
  // Look for UUID pattern (8-4-4-4-12 characters)
  const uuidPattern = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
  const match = path.match(uuidPattern);
  return match ? match[0] : null;
};

/**
 * Helper function to extract hash/ID from the end of path
 */
const extractHashFromPath = (path: string): string | null => {
  // Look for hash-like pattern at the end (like dc58d5a6)
  const hashPattern = /[a-f0-9]{6,}$/i;
  const match = path.match(hashPattern);
  return match ? match[0] : null;
};

/* useSmartArticleFetch removed after migration to useArticle */
// = (identifier: string, language: 'vi' | 'en') => {
/*
  const [searchState, setSearchState] = React.useState<{
    data: any;
    isLoading: boolean;
    isError: boolean;
    error: any;
    strategy: string;
  }>({
    data: null,
    isLoading: true,
    isError: false,
    error: null,
    strategy: ''
  });

  React.useEffect(() => {
    let isCancelled = false;

    const findArticle = async () => {
      try {
        setSearchState(prev => ({ ...prev, isLoading: true, isError: false }));

        console.log('🔍 SmartArticleFetch - Starting search for:', identifier, 'Language:', language);

        // Strategy 1: Check if identifier contains a full UUID
        const potentialUuid = extractUuidFromPath(identifier);
        if (potentialUuid) {
          console.log('✅ Strategy 1: Found potential UUID:', potentialUuid);
          try {
            const response = await fetch(`${import.meta.env.VITE_DRUPAL_JSON_API_BASE_URL || 'https://dseza-backend.lndo.site'}/${language === 'en' ? 'en' : 'vi'}/jsonapi/node/bai-viet/${potentialUuid}?include=field_chuyen_muc,field_anh_dai_dien,field_anh_dai_dien.field_media_image,field_noi_dung_bai_viet,field_noi_dung_bai_viet.field_file_dinh_kem,field_noi_dung_bai_viet.field_file_dinh_kem.field_media_document`, {
              headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Accept-Language': language,
                'Content-Language': language,
              }
            });

            if (response.ok && !isCancelled) {
              const data = await response.json();
              console.log('🎯 Strategy 1 SUCCESS: Found article by UUID');
              setSearchState({
                data: { data: data.data, included: data.included },
                isLoading: false,
                isError: false,
                error: null,
                strategy: 'uuid'
              });
              return;
            }
          } catch (error) {
            console.log('❌ Strategy 1 failed:', error);
          }
        }

        // Strategy 2: Fetch all articles and find by matching criteria
        console.log('🔄 Strategy 2: Fetching all articles for smart matching...');
        const allArticles = await fetchAllArticlesDebugInfo(language);
        
        if (isCancelled) return;

        console.log('📋 Available articles:', allArticles.length);

        // Try to find by various matching criteria
        let matchedArticle = null;

        // Match by path alias (exact)
        const pathAlias = identifier.startsWith('/') ? identifier : `/${identifier}`;
        matchedArticle = allArticles.find(article => 
          article.pathAlias === pathAlias
        );

        if (matchedArticle) {
          console.log('🎯 Strategy 2A SUCCESS: Found by exact path alias');
        } else {
          // Match by hash/ID at the end
          const hash = extractHashFromPath(identifier);
          if (hash) {
            matchedArticle = allArticles.find(article => 
              article.pathAlias?.includes(hash) ||
              article.uuid?.includes(hash) ||
              article.title?.toLowerCase().includes(hash.toLowerCase())
            );
            
            if (matchedArticle) {
              console.log('🎯 Strategy 2B SUCCESS: Found by hash matching:', hash);
            }
          }
        }

        if (!matchedArticle) {
          // Match by title similarity (fallback)
          const searchTerms = identifier.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .split('-')
            .filter(term => term.length > 3);

          matchedArticle = allArticles.find(article => {
            const title = article.title?.toLowerCase() || '';
            return searchTerms.some(term => title.includes(term));
          });

          if (matchedArticle) {
            console.log('🎯 Strategy 2C SUCCESS: Found by title similarity');
          }
        }

        if (matchedArticle) {
          // Fetch full article data using UUID
          console.log('📡 Fetching full article data for UUID:', matchedArticle.uuid);
          try {
            const response = await fetch(`${import.meta.env.VITE_DRUPAL_JSON_API_BASE_URL || 'https://dseza-backend.lndo.site'}/${language === 'en' ? 'en' : 'vi'}/jsonapi/node/bai-viet/${matchedArticle.uuid}?include=field_chuyen_muc,field_anh_dai_dien,field_anh_dai_dien.field_media_image,field_noi_dung_bai_viet,field_noi_dung_bai_viet.field_file_dinh_kem,field_noi_dung_bai_viet.field_file_dinh_kem.field_media_document`, {
              headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Accept-Language': language,
                'Content-Language': language,
              }
            });

            if (response.ok && !isCancelled) {
              const data = await response.json();
              console.log('✅ Full article data fetched successfully');
              setSearchState({
                data: { data: data.data, included: data.included },
                isLoading: false,
                isError: false,
                error: null,
                strategy: 'smart-match'
              });
              return;
            }
          } catch (error) {
            console.error('❌ Failed to fetch full article data:', error);
          }
        }

        // All strategies failed
        console.log('❌ All strategies failed');
        if (!isCancelled) {
          setSearchState({
            data: null,
            isLoading: false,
            isError: true,
            error: new Error(`No article found with identifier: ${identifier}`),
            strategy: 'failed'
          });
        }

      } catch (error) {
        console.error('❌ SmartArticleFetch error:', error);
        if (!isCancelled) {
          setSearchState({
            data: null,
            isLoading: false,
            isError: true,
            error: error,
            strategy: 'error'
          });
        }
      }
    };

    findArticle();

    return () => {
      isCancelled = true;
    };
  }, [identifier, language]);

  return searchState;
};
*/

/**
 * DynamicArticleHandler component handles SEO-friendly URLs from Drupal path aliases
 * This component uses smart fetching strategies:
 * 1. Try to extract UUID from path and fetch directly
 * 2. Fetch all articles and find by matching criteria (path, hash, title)
 * 3. If found, renders the ArticleDetailPage with the article data
 * 4. If not found, shows 404 error with debug information
 * 
 * @example
 * URL: /vi/powerful-decentralization-in-planning-adjustment-real-power-opportunities-for-localities-and-businesses-dc58d5a6
 * Will find article using smart matching and render it.
 */
const DynamicArticleHandler: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const { "*": wildcardPath } = useParams();
  
  // Construct the identifier from the wildcard
  const identifier = wildcardPath || '';
  
  console.log('🔍 DynamicArticleHandler - Identifier:', identifier, 'Language:', language);
  
  // Fetch article via unified hook
  const { data, isLoading, isError, error } = useArticle(identifier, language);
  const strategy = 'useArticle';
  
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
                  <p className="font-medium mb-1">Identifier: {identifier}</p>
                  <p>Language: {language}</p>
                  <p>Strategy: {strategy}</p>
                  <p>Hash: {extractHashFromPath(identifier) || 'none'}</p>
                  <p>UUID: {extractUuidFromPath(identifier) || 'none'}</p>
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
                  <p><strong>Identifier:</strong> {identifier}</p>
                  <p><strong>Language:</strong> {language}</p>
                  <p><strong>Strategy:</strong> {strategy}</p>
                  <p><strong>Extracted Hash:</strong> {extractHashFromPath(identifier) || 'none'}</p>
                  <p><strong>Extracted UUID:</strong> {extractUuidFromPath(identifier) || 'none'}</p>
                  <p><strong>Full URL:</strong> {window.location.href}</p>
                  {error && (
                    <p className="mt-2 text-red-500">
                      <strong>Error:</strong> {error.message}
                    </p>
                  )}
                  
                  <div className="mt-4">
                    <p className="font-semibold mb-2">API Endpoints Tried:</p>
                    <ul className="text-xs space-y-1">
                      <li>1. UUID Direct: /jsonapi/node/bai-viet/{'{UUID}'}</li>
                      <li>2. Smart Match: fetchAllArticlesDebugInfo + pattern matching</li>
                      <li>3. Hash Match: articles containing '{extractHashFromPath(identifier)}'</li>
                      <li>4. Title Match: articles with similar title words</li>
                    </ul>
                  </div>
                  
                  <div className="mt-4">
                    <p className="font-semibold mb-2">Suggestions:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Check if article exists in Drupal backend</li>
                      <li>• Try accessing: <a href="/vi/tin-tuc" className={`${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>/vi/tin-tuc</a></li>
                      <li>• Use correct UUID format: 12345678-1234-1234-1234-123456789012</li>
                    </ul>
                  </div>
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
  console.log('✅ DynamicArticleHandler - Article found using strategy:', strategy);
  console.log('📊 Article data preview:', {
    title: data?.data?.attributes?.title,
    uuid: data?.data?.id,
    strategy: strategy
  });
  
  // Create a custom ArticleDetailPageWithData that passes pre-fetched data
  return <ArticleDetailPageWithData articleData={data} pathAlias={`/${identifier}`} />;
};

// Debug utility function - can be called from browser console
// Usage: window.testArticleFetch('powerful-decentralization-in-planning-adjustment-real-power-opportunities-for-localities-and-businesses-dc58d5a6', 'en')
if (typeof window !== 'undefined') {
  (window as any).testArticleFetch = async (identifier: string, language: 'vi' | 'en' = 'vi') => {
    console.log('🧪 Testing article fetch for:', identifier, 'Language:', language);
    
    try {
      // Test UUID extraction
      const uuid = extractUuidFromPath(identifier);
      const hash = extractHashFromPath(identifier);
      
      console.log('📊 Extraction results:', { uuid, hash });
      
      // Test fetchAllArticlesDebugInfo
      const articles = await fetchAllArticlesDebugInfo(language);
      console.log('📋 Available articles:', articles.length);
      console.table(articles.slice(0, 10)); // Show first 10 articles
      
      // Test hash matching
      let hashMatches: any[] = [];
      if (hash) {
        hashMatches = articles.filter(article => 
          article.pathAlias?.includes(hash) ||
          article.uuid?.includes(hash) ||
          article.title?.toLowerCase().includes(hash.toLowerCase())
        );
        console.log('🔍 Hash matches:', hashMatches);
      }
      
      // Test title similarity
      const searchTerms = identifier.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .split('-')
        .filter(term => term.length > 3);
      
      const titleMatches = articles.filter(article => {
        const title = article.title?.toLowerCase() || '';
        return searchTerms.some(term => title.includes(term));
      });
      
      console.log('📝 Title similarity matches:', titleMatches);
      
      return { uuid, hash, articles: articles.length, hashMatches, titleMatches };
      
    } catch (error) {
      console.error('❌ Test failed:', error);
      return { error };
    }
  };
}

export default DynamicArticleHandler;