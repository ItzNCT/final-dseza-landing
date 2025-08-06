import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useArticle, fetchAllArticlesDebugInfo } from "@/api/hooks";
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
 * Helper function to extract potential UUID from identifier
 */
const extractUuidFromIdentifier = (identifier: string): string | null => {
  // Look for UUID pattern (8-4-4-4-12 characters)
  const uuidPattern = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
  const match = identifier.match(uuidPattern);
  return match ? match[0] : null;
};

/**
 * Helper function to check if identifier is a direct UUID
 */
const isDirectUuid = (identifier: string): boolean => {
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidPattern.test(identifier);
};

/**
 * Helper function to extract hash/ID from the end of identifier
 */
const extractHashFromIdentifier = (identifier: string): string | null => {
  // Look for hash-like pattern at the end (like dc58d5a6)
  const hashPattern = /[a-f0-9]{6,}$/i;
  const match = identifier.match(hashPattern);
  return match ? match[0] : null;
};

/**
 * Smart Article Router Fetch Hook - optimized for routing scenarios
 */
const useSmartArticleRouterFetch = (identifier: string, language: 'vi' | 'en') => {
  const [fetchState, setFetchState] = React.useState<{
    data: any;
    isLoading: boolean;
    isError: boolean;
    error: any;
    strategy: string;
    redirectUrl?: string;
  }>({
    data: null,
    isLoading: true,
    isError: false,
    error: null,
    strategy: '',
    redirectUrl: undefined
  });

  React.useEffect(() => {
    let isCancelled = false;

    const findArticle = async () => {
      try {
        setFetchState(prev => ({ ...prev, isLoading: true, isError: false }));

        console.log('🔍 SmartArticleRouterFetch - Starting search for:', identifier, 'Language:', language);

        // Strategy 1: Direct UUID fetch (most efficient for /bai-viet/{uuid} routes)
        if (isDirectUuid(identifier)) {
          console.log('✅ Strategy 1: Direct UUID detected:', identifier);
          try {
            const response = await fetch(`${import.meta.env.VITE_DRUPAL_JSON_API_BASE_URL || 'https://dseza-backend.lndo.site'}/${language === 'en' ? 'en' : 'vi'}/jsonapi/node/bai-viet/${identifier}?include=field_chuyen_muc,field_anh_dai_dien,field_anh_dai_dien.field_media_image,field_noi_dung_bai_viet,field_noi_dung_bai_viet.field_file_dinh_kem,field_noi_dung_bai_viet.field_file_dinh_kem.field_media_document`, {
              headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Accept-Language': language,
                'Content-Language': language,
              }
            });

            if (response.ok && !isCancelled) {
              const data = await response.json();
              console.log('🎯 Strategy 1 SUCCESS: Found article by direct UUID');
              setFetchState({
                data: { data: data.data, included: data.included },
                isLoading: false,
                isError: false,
                error: null,
                strategy: 'direct-uuid'
              });
              return;
            }
          } catch (error) {
            console.log('❌ Strategy 1 failed:', error);
          }
        }

        // Strategy 2: Extract UUID from complex identifier
        const potentialUuid = extractUuidFromIdentifier(identifier);
        if (potentialUuid && potentialUuid !== identifier) {
          console.log('✅ Strategy 2: Found embedded UUID:', potentialUuid);
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
              console.log('🎯 Strategy 2 SUCCESS: Found article by embedded UUID');
              
              // Generate canonical URL for redirect
              const canonicalUrl = getArticleUrl(language, data.data);
              
              setFetchState({
                data: { data: data.data, included: data.included },
                isLoading: false,
                isError: false,
                error: null,
                strategy: 'embedded-uuid',
                redirectUrl: canonicalUrl
              });
              return;
            }
          } catch (error) {
            console.log('❌ Strategy 2 failed:', error);
          }
        }

        // Strategy 3: Smart matching using all articles (fallback)
        console.log('🔄 Strategy 3: Fetching all articles for smart matching...');
        const allArticles = await fetchAllArticlesDebugInfo(language);
        
        if (isCancelled) return;

        console.log('📋 Available articles:', allArticles.length);

        let matchedArticle = null;

        // Try hash matching first
        const hash = extractHashFromIdentifier(identifier);
        if (hash) {
          matchedArticle = allArticles.find(article => 
            article.pathAlias?.includes(hash) ||
            article.uuid?.includes(hash) ||
            article.title?.toLowerCase().includes(hash.toLowerCase())
          );
          
          if (matchedArticle) {
            console.log('🎯 Strategy 3A SUCCESS: Found by hash matching:', hash);
          }
        }

        // Try path alias matching
        if (!matchedArticle) {
          const pathAlias = identifier.startsWith('/') ? identifier : `/${identifier}`;
          matchedArticle = allArticles.find(article => 
            article.pathAlias === pathAlias
          );
          
          if (matchedArticle) {
            console.log('🎯 Strategy 3B SUCCESS: Found by path alias matching');
          }
        }

        // Try title similarity matching
        if (!matchedArticle) {
          const searchTerms = identifier.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .split('-')
            .filter(term => term.length > 3);

          matchedArticle = allArticles.find(article => {
            const title = article.title?.toLowerCase() || '';
            return searchTerms.some(term => title.includes(term));
          });

          if (matchedArticle) {
            console.log('🎯 Strategy 3C SUCCESS: Found by title similarity');
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
              
              // Generate canonical URL for redirect
              const canonicalUrl = getArticleUrl(language, data.data);
              
              setFetchState({
                data: { data: data.data, included: data.included },
                isLoading: false,
                isError: false,
                error: null,
                strategy: 'smart-match',
                redirectUrl: canonicalUrl
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
          setFetchState({
            data: null,
            isLoading: false,
            isError: true,
            error: new Error(`No article found with identifier: ${identifier}`),
            strategy: 'failed'
          });
        }

      } catch (error) {
        console.error('❌ SmartArticleRouterFetch error:', error);
        if (!isCancelled) {
          setFetchState({
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

  return fetchState;
};

/**
 * ArticleRouter component handles both UUID and path-based article routing
 * This component uses smart fetching strategies:
 * 1. Direct UUID fetch for /bai-viet/{uuid} routes
 * 2. Extract UUID from complex identifiers 
 * 3. Smart matching using hash, path alias, and title similarity
 * 4. Automatic canonical URL redirects
 * 5. Renders ArticleDetailPage with the article data
 */
const ArticleRouter: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const { identifier } = useParams<{ identifier: string }>();
  
  console.log('🔍 ArticleRouter - Identifier:', identifier, 'Language:', language);
  
  // Use smart article router fetch
  const { data, isLoading, isError, error, strategy, redirectUrl } = useSmartArticleRouterFetch(identifier || '', language);
  
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
                  <p>Strategy: {strategy}</p>
                  <p>Direct UUID: {isDirectUuid(identifier || '') ? 'Yes' : 'No'}</p>
                  <p>Extracted UUID: {extractUuidFromIdentifier(identifier || '') || 'none'}</p>
                  <p>Extracted Hash: {extractHashFromIdentifier(identifier || '') || 'none'}</p>
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
                  <p><strong>Identifier:</strong> {identifier}</p>
                  <p><strong>Language:</strong> {language}</p>
                  <p><strong>Strategy:</strong> {strategy}</p>
                  <p><strong>Is Direct UUID:</strong> {isDirectUuid(identifier || '') ? 'Yes' : 'No'}</p>
                  <p><strong>Extracted UUID:</strong> {extractUuidFromIdentifier(identifier || '') || 'none'}</p>
                  <p><strong>Extracted Hash:</strong> {extractHashFromIdentifier(identifier || '') || 'none'}</p>
                  <p><strong>Full URL:</strong> {window.location.href}</p>
                  {error && (
                    <p className="mt-2 text-red-500">
                      <strong>Error:</strong> {error.message}
                    </p>
                  )}
                  
                  <div className="mt-4">
                    <p className="font-semibold mb-2">Fetch Strategies Tried:</p>
                    <ul className="text-xs space-y-1">
                      <li>1. Direct UUID: {isDirectUuid(identifier || '') ? '✅ Applied' : '❌ N/A'}</li>
                      <li>2. Embedded UUID: {extractUuidFromIdentifier(identifier || '') ? '✅ Applied' : '❌ N/A'}</li>
                      <li>3. Hash Matching: {extractHashFromIdentifier(identifier || '') ? '✅ Applied' : '❌ N/A'}</li>
                      <li>4. Path Alias: ✅ Always applied</li>
                      <li>5. Title Similarity: ✅ Always applied</li>
                    </ul>
                  </div>
                  
                  <div className="mt-4">
                    <p className="font-semibold mb-2">Suggestions:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Check if article exists in Drupal backend</li>
                      <li>• Try using direct UUID format: 12345678-1234-1234-1234-123456789012</li>
                      <li>• Verify article is published and available in {language === 'en' ? 'English' : 'Vietnamese'}</li>
                      <li>• Use browser console: testArticleFetch('{identifier}', '{language}') for debugging</li>
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

  // Success - article found
  console.log('✅ ArticleRouter - Article found using strategy:', strategy);
  console.log('📊 Article data preview:', {
    title: data?.data?.attributes?.title,
    uuid: data?.data?.id,
    strategy: strategy,
    redirectUrl: redirectUrl
  });
  
  // Handle automatic redirects from smart fetching
  if (redirectUrl) {
    const currentPath = window.location.pathname;
    console.log('🔄 ArticleRouter - Smart redirect:', { currentPath, redirectUrl, strategy });
    
    if (currentPath !== redirectUrl) {
      console.log('🔄 ArticleRouter - Redirecting to canonical URL from smart fetch:', redirectUrl);
      return <Navigate replace to={redirectUrl} />;
    }
  } else {
    // Fallback: derive canonical URL using getArticleUrl if no redirectUrl provided
    const canonicalUrl = getArticleUrl(language, data.data);
    const currentPath = window.location.pathname;
    
    console.log('🔗 ArticleRouter - Fallback canonical check:', { currentPath, canonicalUrl });
    
    // If current path doesn't match canonical URL, redirect
    if (currentPath !== canonicalUrl) {
      console.log('🔄 ArticleRouter - Redirecting to fallback canonical URL:', canonicalUrl);
      return <Navigate replace to={canonicalUrl} />;
    }
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

// Debug utility function for ArticleRouter - can be called from browser console
// Usage: window.testArticleRouter('powerful-decentralization-in-planning-adjustment-real-power-opportunities-for-localities-and-businesses-dc58d5a6', 'en')
if (typeof window !== 'undefined') {
  (window as any).testArticleRouter = async (identifier: string, language: 'vi' | 'en' = 'vi') => {
    console.log('🧪 Testing ArticleRouter fetch for:', identifier, 'Language:', language);
    
    try {
      // Test UUID and hash extraction
      const isDirectUuidResult = isDirectUuid(identifier);
      const extractedUuid = extractUuidFromIdentifier(identifier);
      const extractedHash = extractHashFromIdentifier(identifier);
      
      console.log('📊 Extraction results:', { 
        isDirectUuid: isDirectUuidResult, 
        extractedUuid, 
        extractedHash 
      });
      
      // Test direct UUID fetch if applicable
      if (isDirectUuidResult) {
        console.log('🎯 Testing direct UUID fetch...');
        try {
          const response = await fetch(`${import.meta.env.VITE_DRUPAL_JSON_API_BASE_URL || 'https://dseza-backend.lndo.site'}/${language === 'en' ? 'en' : 'vi'}/jsonapi/node/bai-viet/${identifier}?include=field_chuyen_muc,field_anh_dai_dien,field_anh_dai_dien.field_media_image,field_noi_dung_bai_viet,field_noi_dung_bai_viet.field_file_dinh_kem,field_noi_dung_bai_viet.field_file_dinh_kem.field_media_document`, {
            headers: {
              'Accept': 'application/vnd.api+json',
              'Content-Type': 'application/vnd.api+json',
              'Accept-Language': language,
              'Content-Language': language,
            }
          });
          
          console.log('📡 Direct UUID fetch response:', response.status, response.statusText);
          
          if (response.ok) {
            const data = await response.json();
            console.log('✅ Direct UUID fetch successful:', {
              title: data.data?.attributes?.title,
              uuid: data.data?.id
            });
            
            // Test canonical URL generation
            const canonicalUrl = getArticleUrl(language, data.data);
            console.log('🔗 Generated canonical URL:', canonicalUrl);
            
            return { success: true, strategy: 'direct-uuid', data, canonicalUrl };
          } else {
            const error = await response.text();
            console.log('❌ Direct UUID fetch failed:', error);
          }
        } catch (error) {
          console.log('❌ Direct UUID fetch error:', error);
        }
      }
      
      // Test embedded UUID fetch if applicable
      if (extractedUuid && extractedUuid !== identifier) {
        console.log('🎯 Testing embedded UUID fetch...');
        try {
          const response = await fetch(`${import.meta.env.VITE_DRUPAL_JSON_API_BASE_URL || 'https://dseza-backend.lndo.site'}/${language === 'en' ? 'en' : 'vi'}/jsonapi/node/bai-viet/${extractedUuid}?include=field_chuyen_muc,field_anh_dai_dien,field_anh_dai_dien.field_media_image,field_noi_dung_bai_viet,field_noi_dung_bai_viet.field_file_dinh_kem,field_noi_dung_bai_viet.field_file_dinh_kem.field_media_document`, {
            headers: {
              'Accept': 'application/vnd.api+json',
              'Content-Type': 'application/vnd.api+json',
              'Accept-Language': language,
              'Content-Language': language,
            }
          });
          
          console.log('📡 Embedded UUID fetch response:', response.status, response.statusText);
          
          if (response.ok) {
            const data = await response.json();
            console.log('✅ Embedded UUID fetch successful:', {
              title: data.data?.attributes?.title,
              uuid: data.data?.id
            });
            
            const canonicalUrl = getArticleUrl(language, data.data);
            console.log('🔗 Generated canonical URL:', canonicalUrl);
            
            return { success: true, strategy: 'embedded-uuid', data, canonicalUrl };
          } else {
            const error = await response.text();
            console.log('❌ Embedded UUID fetch failed:', error);
          }
        } catch (error) {
          console.log('❌ Embedded UUID fetch error:', error);
        }
      }
      
      // Test smart matching
      console.log('🎯 Testing smart matching...');
      const articles = await fetchAllArticlesDebugInfo(language);
      console.log('📋 Available articles for matching:', articles.length);
      
      // Hash matching
      let hashMatches: any[] = [];
      if (extractedHash) {
        hashMatches = articles.filter(article => 
          article.pathAlias?.includes(extractedHash) ||
          article.uuid?.includes(extractedHash) ||
          article.title?.toLowerCase().includes(extractedHash.toLowerCase())
        );
        console.log('🔍 Hash matches:', hashMatches);
      }
      
      // Path alias matching
      const pathAlias = identifier.startsWith('/') ? identifier : `/${identifier}`;
      const pathMatches = articles.filter(article => article.pathAlias === pathAlias);
      console.log('📂 Path alias matches:', pathMatches);
      
      // Title similarity matching
      const searchTerms = identifier.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .split('-')
        .filter(term => term.length > 3);
      
      const titleMatches = articles.filter(article => {
        const title = article.title?.toLowerCase() || '';
        return searchTerms.some(term => title.includes(term));
      });
      console.log('📝 Title similarity matches:', titleMatches);
      
      return { 
        success: false, 
        strategy: 'smart-match-test', 
        extraction: { isDirectUuidResult, extractedUuid, extractedHash },
        articles: articles.length,
        matches: {
          hash: hashMatches,
          path: pathMatches,
          title: titleMatches
        }
      };
      
    } catch (error) {
      console.error('❌ ArticleRouter test failed:', error);
      return { success: false, error };
    }
  };
}

export default ArticleRouter;