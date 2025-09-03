import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useArticles } from "../../hooks/useArticles";
import { useAllNewsCategories } from "../../hooks/useNewsCategories";
import { LoadingSpinner } from "../../components/ui/loading-spinner";
import { ChevronRight, Calendar, ArrowRight, Star, Filter } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileLayout from "@/components/mobile/MobileLayout";
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { generateArticleLink } from "@/utils/generateArticleLink";
import { translatePath } from "@/utils/seo";

// Hàm để định dạng tiêu đề với real categories
const formatTitle = (slug: string, categoriesData?: any[], language: 'vi' | 'en' = 'vi') => {
  // URL mapping cho các category routes với hỗ trợ đa ngôn ngữ
  const urlToCategoryMap: { [key: string]: { vi: string; en: string } } = {
    'dau-tu-hop-tac-quoc-te': {
      vi: 'Đầu tư – Hợp tác quốc tế',
      en: 'Investment – International Cooperation'
    },
    'dao-tao-uom-tao-khoi-nghiep': {
      vi: 'Đào tạo, Ươm tạo khởi nghiệp',
      en: 'Training, Startup Incubation'
    },
    'chuyen-doi-so': {
      vi: 'Chuyển đổi số',
      en: 'Digital Transformation'
    },
    'hoat-dong-ban-quan-ly': {
      vi: 'Hoạt động Ban quản lý',
      en: 'Management Board Activities'
    },
    // Tin tức khác (ensure both vi/en slugs map correctly)
    'tin-tuc-khac': {
      vi: 'Tin khác',
      en: 'Other News'
    },
    'tin-khac': {
      vi: 'Tin khác',
      en: 'Other News'
    },
    'other-news': {
      vi: 'Tin khác',
      en: 'Other News'
    },
    'doanh-nghiep': {
      vi: 'Doanh nghiệp',
      en: 'Enterprises'
    },
    'su-kien': {
      vi: 'Tin tức & Sự kiện',
      en: 'News & Events'
    },
    'events': {
      vi: 'Tin tức & Sự kiện',
      en: 'News & Events'
    },
    'thong-bao': {
      vi: 'Thông báo',
      en: 'Announcements'
    },
    // Press Information
    'thong-tin-bao-chi': {
      vi: 'Thông tin báo chí',
      en: 'Press Information'
    },
    'press-information': {
      vi: 'Thông tin báo chí',
      en: 'Press Information'
    },
    'hoat-dong': {
      vi: 'Hoạt động',
      en: 'Activities'
    },
    'tin-tuc': {
      vi: 'Tin tức',
      en: 'News'
    },
    // Add missing investment-related categories
    'quy-trinh-linh-vuc-dau-tu': {
      vi: 'Quy trình lĩnh vực đầu tư',
      en: 'Investment Process'
    },
    'linh-vuc-khuyen-khich-dau-tu': {
      vi: 'Lĩnh vực thu hút đầu tư',
      en: 'Investment Attraction Fields'
    },
    'linh-vuc-thu-hut-dau-tu': {
      vi: 'Lĩnh vực thu hút đầu tư',
      en: 'Investment Attraction Fields'
    },
    'danh-cho-nha-dau-tu': {
      vi: 'Dành cho nhà đầu tư',
      en: 'For Investors'
    },
    
    // Add investment environment subcategories
    'moi-truong-dau-tu': {
      vi: 'Môi trường đầu tư',
      en: 'Investment Environment'
    },
    'ha-tang-giao-thong': {
      vi: 'Hạ tầng giao thông',
      en: 'Transportation Infrastructure'
    },
    'khoa-hoc-cong-nghe-moi-truong': {
      vi: 'Khoa học công nghệ - Môi trường',
      en: 'Science Technology - Environment'
    },
    'logistics': {
      vi: 'Logistics',
      en: 'Logistics'
    },
    'ha-tang-xa-hoi': {
      vi: 'Hạ tầng xã hội',
      en: 'Social Infrastructure'
    },
    'nguon-nhan-luc': {
      vi: 'Nguồn nhân lực',
      en: 'Human Resources'
    },
    'cai-cach-hanh-chinh': {
      vi: 'Cải cách hành chính',
      en: 'Administrative Reform'
    },
  };
  
  // Trước tiên thử mapping cố định
  if (urlToCategoryMap[slug]) {
    return urlToCategoryMap[slug][language];
  }
  
  // Nếu có categories data thì tìm trong đó
  if (categoriesData) {
    const foundCategory = categoriesData.find(cat => 
      cat.name.toLowerCase().includes(slug.replace(/-/g, ' ').toLowerCase()) ||
      slug.replace(/-/g, ' ').toLowerCase().includes(cat.name.toLowerCase())
    );
    if (foundCategory) {
      return language === 'en' && foundCategory.nameEn ? foundCategory.nameEn : foundCategory.name;
    }
  }
  
  // Fallback: format từ slug
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Hàm format ngày tháng
const formatDate = (dateString: string, lang: 'vi' | 'en' = 'vi') => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const locale = lang === 'en' ? 'en-GB' : 'vi-VN';
  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const ArticleListPage = () => {
  const { category, subcategory } = useParams<{ category: string; subcategory?: string; }>();
  const { data: articles, isLoading, isError } = useArticles();
  const { data: categoriesData } = useAllNewsCategories(); // Use ALL categories instead of just event categories
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  // Tạo tiêu đề động với real categories
  const pageTitle = subcategory 
    ? `${formatTitle(category!, categoriesData, language)} - ${formatTitle(subcategory, categoriesData, language)}`
    : formatTitle(category!, categoriesData, language);

  // Dynamic description based on language with better SEO
  const getPageDescription = () => {
    const targetCategory = subcategory || category;
    if (language === 'en') {
      if (targetCategory === 'su-kien' || targetCategory === 'tin-tuc' || targetCategory === 'events') {
        return 'Discover all the latest news, events and activities from the Management Board of Da Nang Hi-Tech Park and Industrial Zones. Stay updated with official announcements, investment opportunities, and development initiatives.';
      }
      return `Discover the latest information about ${pageTitle.toLowerCase()} from the Management Board of Da Nang Hi-Tech Park and Industrial Zones. Get insights into policies, developments, and opportunities in ${pageTitle.toLowerCase()}.`;
    }
    if (targetCategory === 'su-kien' || targetCategory === 'tin-tuc' || targetCategory === 'events') {
      return 'Khám phá tất cả các thông tin mới nhất, sự kiện và hoạt động từ Ban Quản lý Khu công nghệ cao và các khu công nghiệp Đà Nẵng. Cập nhật các thông báo chính thức, cơ hội đầu tư và các sáng kiến phát triển.';
    }
    return `Khám phá các thông tin mới nhất về ${pageTitle.toLowerCase()} từ Ban Quản lý Khu công nghệ cao và các khu công nghiệp Đà Nẵng. Nắm bắt thông tin về chính sách, phát triển và cơ hội trong lĩnh vực ${pageTitle.toLowerCase()}.`;
  };

  // Enhanced SEO: update document title & meta tags
  useEffect(() => {
    // Set page title
    document.title = `${pageTitle} | DSEZA`;
    
    // Set meta description
    const metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (metaDesc) {
      metaDesc.setAttribute('content', getPageDescription());
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = getPageDescription();
      document.head.appendChild(meta);
    }
    
    // Set language meta tag
    document.documentElement.lang = language;
    
    // Add/update Open Graph meta tags for better social sharing
    const updateOrCreateMetaTag = (property: string, content: string) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (metaTag) {
        metaTag.setAttribute('content', content);
      } else {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        metaTag.setAttribute('content', content);
        document.head.appendChild(metaTag);
      }
    };
    
    updateOrCreateMetaTag('og:title', `${pageTitle} | DSEZA`);
    updateOrCreateMetaTag('og:description', getPageDescription());
    updateOrCreateMetaTag('og:type', 'website');
    updateOrCreateMetaTag('og:url', window.location.href);
    updateOrCreateMetaTag('og:site_name', 'DSEZA - Da Nang Hi-Tech Park and Industrial Zones');
    
    // Twitter Card meta tags
    const updateOrCreateTwitterMetaTag = (name: string, content: string) => {
      let metaTag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (metaTag) {
        metaTag.setAttribute('content', content);
      } else {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', name);
        metaTag.setAttribute('content', content);
        document.head.appendChild(metaTag);
      }
    };
    
    updateOrCreateTwitterMetaTag('twitter:card', 'summary_large_image');
    updateOrCreateTwitterMetaTag('twitter:title', `${pageTitle} | DSEZA`);
    updateOrCreateTwitterMetaTag('twitter:description', getPageDescription());
    
    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonicalLink) {
      canonicalLink.href = window.location.href;
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      canonicalLink.href = window.location.href;
      document.head.appendChild(canonicalLink);
    }
    
    // Add structured data for better SEO
    const addStructuredData = () => {
      // Remove existing structured data
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }
      
      // Create new structured data
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": pageTitle,
        "description": getPageDescription(),
        "url": window.location.href,
        "inLanguage": language === 'en' ? 'en-US' : 'vi-VN',
        "isPartOf": {
          "@type": "WebSite",
          "name": "DSEZA",
          "url": window.location.origin,
          "description": language === 'en' 
            ? "Da Nang Hi-Tech Park and Industrial Zones Management Board"
            : "Ban Quản lý Khu công nghệ cao và các khu công nghiệp Đà Nẵng"
        },
        "publisher": {
          "@type": "Organization",
          "name": "DSEZA",
          "url": window.location.origin
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": language === 'en' ? "Home" : "Trang chủ",
              "item": window.location.origin
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": pageTitle,
              "item": window.location.href
            }
          ]
        }
      };
      
      // Add articles data if available
      if (articles && articles.length > 0) {
        (structuredData as any).mainEntity = {
          "@type": "ItemList",
          "numberOfItems": articles.length,
          "itemListElement": articles.slice(0, 10).map((article, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Article",
              "headline": article.title,
              "description": article.summary,
              "url": `${window.location.origin}${article.path}`,
              "datePublished": article.published_date,
              "publisher": {
                "@type": "Organization",
                "name": "DSEZA"
              },
              ...(article.imageUrl && {
                "image": {
                  "@type": "ImageObject",
                  "url": article.imageUrl.startsWith('http') ? article.imageUrl : `${window.location.origin}${article.imageUrl}`
                }
              })
            }
          }))
        };
      }
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    };
    
    addStructuredData();
    
  }, [pageTitle, language, getPageDescription, articles]);

  // Check if this is a subcategory of su-kien
  const isSubcategoryOfSuKien = category === 'su-kien' && subcategory;
  
  // Check if this is the main su-kien page
  const isSuKienMainPage = category === 'su-kien' && !subcategory;

  // Loading state
  if (isLoading) {
    // Mobile Loading State
    if (isMobile) {
      return (
        <MobileLayout>
          <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
            <main className="flex-1 px-4 py-6">
              <div className="flex justify-center items-center h-64">
                <div className="flex flex-col items-center space-y-4">
                  <LoadingSpinner size="lg" />
                  <p className={`text-base ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                    {language === 'en' ? 'Loading news...' : 'Đang tải tin tức...'}
                  </p>
                </div>
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
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-center items-center h-64">
              <div className="flex flex-col items-center space-y-4">
                <LoadingSpinner size="lg" />
                <p className={`text-lg ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                  {language === 'en' ? 'Loading articles...' : 'Đang tải danh sách bài viết...'}
                </p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (isError) {
    // Mobile Error State
    if (isMobile) {
      return (
        <MobileLayout>
          <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
            <main className="flex-1 px-4 py-6">
              <div className="text-center py-12">
                <div className={`text-red-500 mb-4`}>
                  <p className="text-lg font-semibold mb-2">{language === 'en' ? 'An error occurred' : 'Có lỗi xảy ra'}</p>
                  <p className="text-sm">{language === 'en' ? 'Unable to load news. Please try again later.' : 'Không thể tải tin tức. Vui lòng thử lại sau.'}</p>
                </div>
              </div>
            </main>
            <Footer />
          </div>
        </MobileLayout>
      );
    }

    // Desktop Error State
    return (
      <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
        <TopBar />
        <LogoSearchBar />
        <NavigationBar />
        <main className="flex-1 pt-52">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-12">
              <div className={`text-red-500 mb-4`}>
                <p className="text-xl font-semibold mb-2">{language === 'en' ? 'An error occurred' : 'Có lỗi xảy ra'}</p>
                <p className="text-sm">{language === 'en' ? 'Unable to load articles. Please try again later.' : 'Không thể tải danh sách bài viết. Vui lòng thử lại sau.'}</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
                  to="/" 
                  className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
                >
                  {language === 'en' ? 'Home' : 'Trang chủ'}
                </Link>
                <ChevronRight className="h-2.5 w-2.5" />
                
                {isSubcategoryOfSuKien ? (
                  <>
                    <Link 
                      to={`/${translatePath('news', language)}/${translatePath('event', language)}`}
                      className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
                    >
                      {language === 'en' ? 'News & Events' : 'Tin tức & Sự kiện'}
                    </Link>
                    <ChevronRight className="h-2.5 w-2.5" />
                    <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                      {formatTitle(subcategory!, categoriesData, language)}
                    </span>
                  </>
                ) : (
                  <>
                    <Link 
                      to={"#"}
                      className="hidden"
                    >
                      {language === 'en' ? 'News' : 'Tin tức'}
                    </Link>
                    {category && (
                      <>
                        <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                          {formatTitle(category, categoriesData, language)}
                        </span>
                      </>
                    )}
                  </>
                )}
              </nav>
            </div>

            {/* Page Header - Mobile optimized */}
            <div className="text-center py-3">
              <h1 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {pageTitle}
              </h1>
              <div className={`w-12 h-0.5 mx-auto mb-2 rounded-full ${theme === 'dark' ? 'bg-dseza-dark-primary' : 'bg-dseza-light-primary'}`}></div>
              <p className={`text-xs ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                {getPageDescription()}
              </p>
            </div>

            {/* Results Summary - Mobile optimized */}
            {articles && articles.length > 0 && (
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center space-x-1.5">
                                     <Badge 
                     variant="secondary" 
                     className={`px-2 py-0.5 text-xs ${
                       theme === 'dark' 
                         ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary border-dseza-dark-primary/30' 
                         : 'bg-dseza-light-primary/20 text-dseza-light-primary border-dseza-light-primary/30'
                     }`}
                   >
                     <Filter className="h-2.5 w-2.5 mr-1" />
                     {articles.length} bài viết
                   </Badge>
                  
                  {/* Featured articles count */}
                  {articles.filter(article => article.is_featured).length > 0 && (
                                         <Badge 
                       variant="secondary" 
                       className={`px-1.5 py-0.5 text-xs ${
                         theme === 'dark' 
                           ? 'bg-yellow-900/20 text-yellow-300 border-yellow-400/30' 
                           : 'bg-yellow-100/80 text-yellow-800 border-yellow-300/30'
                       }`}
                     >
                       <Star className="h-2.5 w-2.5 mr-1" />
                       {articles.filter(article => article.is_featured).length}
                     </Badge>
                  )}
                </div>
              </div>
            )}
            
                        {/* Articles List - Mobile optimized single column */}
            {articles && articles.length > 0 ? (
              <div className="space-y-4">
                {articles.map((article) => {
                  const url = generateArticleLink(article, language);
                  return (
                    <Link 
                      to={url} 
                      key={article.id} 
                      className="block group"
                    >
                    <article className={`overflow-hidden rounded-lg shadow-md transition-all duration-200 group-hover:shadow-lg active:scale-[0.98] ${
                      theme === 'dark' 
                        ? 'bg-dseza-dark-secondary border border-dseza-dark-border' 
                        : 'bg-white border border-dseza-light-border'
                    }`}>
                      {/* Image and content in mobile card layout */}
                      <div className="flex">
                        {/* Image Container - smaller for mobile */}
                        <div className="relative flex-shrink-0 w-24 h-24 overflow-hidden">
                          <img 
                            src={article.imageUrl || '/placeholder.svg'} 
                            alt={article.title} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/placeholder.svg';
                            }}
                          />
                          {/* Featured Badge */}
                          {article.is_featured && (
                            <div className="absolute top-1 right-1">
                              <div className={`p-1 rounded-full ${
                                theme === 'dark' 
                                  ? 'bg-yellow-900/80' 
                                  : 'bg-yellow-100'
                              }`}>
                                <Star className={`h-3 w-3 ${
                                  theme === 'dark' ? 'text-yellow-300' : 'text-yellow-800'
                                }`} />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-3">
                          {/* Category and Date */}
                          <div className="flex items-center justify-between mb-2">
                            <Badge 
                              variant="secondary" 
                              className={`px-2 py-1 text-xs ${
                                theme === 'dark' 
                                  ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary' 
                                  : 'bg-dseza-light-primary/20 text-dseza-light-primary'
                              }`}
                            >
                              {article.categories.length > 0 ? article.categories[0] : formatTitle(subcategory || category!, categoriesData, language)}
                            </Badge>
                            <span className={`text-xs ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              {formatDate(article.published_date, language)}
                            </span>
                          </div>

                          {/* Title */}
                          <h2 className={`text-base font-semibold mb-2 line-clamp-2 leading-tight ${
                            theme === 'dark' 
                              ? 'text-dseza-dark-main-text' 
                              : 'text-dseza-light-main-text'
                          }`}>
                            {article.title}
                          </h2>

                          {/* Summary */}
                          <p className={`text-sm line-clamp-2 leading-relaxed ${
                            theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                          }`}>
                            {article.summary}
                          </p>
                        </div>
                      </div>
                    </article>
                  </Link>
                  );
                })}
              </div>
            ) : (
              /* Empty State - Mobile optimized */
              <div className="text-center py-12">
                <div className={`mb-6 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                  <div className="w-16 h-16 mx-auto mb-4 opacity-50">
                    <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                    </svg>
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                    Chưa có bài viết nào
                  </h3>
                  <p className="text-sm mb-4">
                    Hiện tại chưa có bài viết nào trong "{pageTitle}".
                  </p>
                  <Link 
                    to={`/${translatePath('news', language)}`}
                    className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      theme === 'dark' 
                        ? 'bg-dseza-dark-primary text-dseza-dark-main-text hover:bg-dseza-dark-primary/80' 
                        : 'bg-dseza-light-primary text-white hover:bg-dseza-light-primary/80'
                    }`}
                  >
                    {language === 'en' ? 'View all news' : 'Xem tất cả tin tức'}
                  </Link>
                </div>
              </div>
            )}

            {/* Removed back navigation link per request */}

          </main>

          {/* Footer */}
          <Footer />
        </div>
      </MobileLayout>
    );
  }

  // Desktop Layout (original)
  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
      {/* Header - Complete header structure */}
      <TopBar />
      <LogoSearchBar />
      <NavigationBar />
      
      {/* Main Content */}
      <main className="flex-1 pt-52">
        {/* Breadcrumb */}
        <div className={`py-3 ${theme === 'dark' ? 'bg-dseza-dark-secondary/50' : 'bg-dseza-light-secondary/50'} border-b ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
          <div className="container mx-auto px-4">
            <nav className={`flex items-center space-x-2 text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              <Link 
                to="/" 
                className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {language === 'en' ? 'Home' : 'Trang chủ'}
              </Link>
              <ChevronRight className="h-4 w-4" />
              
              {/* Special breadcrumb logic for su-kien routes */}
              {isSubcategoryOfSuKien ? (
                <>
                  {/* For subcategories of su-kien: Trang chủ -> Tin tức & Sự kiện -> Subcategory */}
                  <Link 
                    to={`/${translatePath('news', language)}/${translatePath('event', language)}`}
                    className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
                  >
                    {language === 'en' ? 'News & Events' : 'Tin tức & Sự kiện'}
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                    {formatTitle(subcategory, categoriesData, language)}
                  </span>
                </>
              ) : (
                <>
                  {/* Normal breadcrumb for other routes */}
                  <Link 
                    to={"#"}
                    className="hidden"
                  >
                    {language === 'en' ? 'News' : 'Tin tức'}
                  </Link>
                  {category && (
                    <>
                      <Link 
                        to={`/${translatePath('news', language)}/${category}`} 
                        className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
                      >
                        {formatTitle(category, categoriesData, language)}
                      </Link>
                    </>
                  )}
                  {subcategory && (
                    <>
                      <ChevronRight className="h-4 w-4" />
                      <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                        {formatTitle(subcategory, categoriesData, language)}
                      </span>
                    </>
                  )}
                </>
              )}
            </nav>
          </div>
        </div>

        {/* Page Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
              {pageTitle}
            </h1>
            <div className={`w-24 h-1 mx-auto mb-4 rounded-full ${theme === 'dark' ? 'bg-dseza-dark-primary' : 'bg-dseza-light-primary'}`}></div>
            <p className={`text-lg max-w-2xl mx-auto ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              {getPageDescription()}
            </p>
          </div>

          {/* Results Summary */}
          {articles && articles.length > 0 && (
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-4">
                <Badge 
                  variant="secondary" 
                  className={`px-3 py-1 text-sm ${
                    theme === 'dark' 
                      ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary border-dseza-dark-primary/30' 
                      : 'bg-dseza-light-primary/20 text-dseza-light-primary border-dseza-light-primary/30'
                  }`}
                >
                  {articles.length} {language === 'en' ? (articles.length === 1 ? 'article' : 'articles') : 'bài viết'}
                </Badge>
                {/* Featured articles count */}
                {articles.filter(article => article.is_featured).length > 0 && (
                  <Badge 
                    variant="secondary" 
                    className={`px-3 py-1 text-sm ${
                      theme === 'dark' 
                        ? 'bg-yellow-900/20 text-yellow-300 border-yellow-400/30' 
                        : 'bg-yellow-100/80 text-yellow-800 border-yellow-300/30'
                    }`}
                  >
                    <Star className="h-3 w-3 mr-1" />
                    {articles.filter(article => article.is_featured).length} {language === 'en' ? 'featured events' : 'sự kiện tiêu biểu'}
                  </Badge>
                )}
              </div>
            </div>
          )}
          
          {/* Articles Grid */}
          {articles && articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => {
                const url = generateArticleLink(article, language);
                return (
                  <Link 
                    to={url} 
                    key={article.id} 
                    className="block group"
                  >
                  <article className={`h-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2 ${
                    theme === 'dark' 
                      ? 'bg-dseza-dark-secondary border border-dseza-dark-border' 
                      : 'bg-white border border-dseza-light-border'
                  }`}>
                    {/* Image Container */}
                    <div className="relative overflow-hidden h-48">
                      <img 
                        src={article.imageUrl || '/placeholder.svg'} 
                        alt={article.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge 
                          variant="secondary" 
                          className={`px-2 py-1 text-xs font-medium ${
                            theme === 'dark' 
                              ? 'bg-dseza-dark-primary text-dseza-dark-main-text' 
                              : 'bg-dseza-light-primary text-white'
                          }`}
                        >
                          {article.categories.length > 0 ? article.categories[0] : formatTitle(subcategory || category!, categoriesData, language)}
                        </Badge>
                      </div>

                      {/* Featured Badge */}
                      {article.is_featured && (
                        <div className="absolute top-4 right-4">
                          <Badge 
                            variant="secondary" 
                            className={`px-2 py-1 text-xs font-medium ${
                              theme === 'dark' 
                                ? 'bg-yellow-900/80 text-yellow-300' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            <Star className="h-3 w-3 mr-1" />
                            {language === 'en' ? 'Featured' : 'Tiêu biểu'}
                          </Badge>
                        </div>
                      )}

                      {/* Read More Icon */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <div className={`p-2 rounded-full ${
                          theme === 'dark' 
                            ? 'bg-dseza-dark-primary text-dseza-dark-main-text' 
                            : 'bg-dseza-light-primary text-white'
                        }`}>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Publication Date */}
                      <div className={`flex items-center text-sm mb-3 ${
                        theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                      }`}>
                        <Calendar className="h-4 w-4 mr-2" />
                        <time dateTime={article.published_date}>
                          {formatDate(article.published_date, language)}
                        </time>
                      </div>

                      {/* Title */}
                      <h2 className={`text-xl font-bold mb-3 line-clamp-2 leading-tight transition-colors duration-300 ${
                        theme === 'dark' 
                          ? 'text-dseza-dark-main-text group-hover:text-dseza-dark-primary' 
                          : 'text-dseza-light-main-text group-hover:text-dseza-light-primary'
                      }`}>
                        {article.title}
                      </h2>

                      {/* Summary */}
                      <p className={`text-sm line-clamp-3 leading-relaxed ${
                        theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                      }`}>
                        {article.summary}
                      </p>

                      {/* Categories */}
                      {article.categories.length > 1 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {article.categories.slice(1, 3).map((cat, index) => (
                            <Badge 
                              key={index}
                              variant="outline" 
                              className={`text-xs ${
                                theme === 'dark' 
                                  ? 'border-dseza-dark-border text-dseza-dark-secondary-text' 
                                  : 'border-dseza-light-border text-dseza-light-secondary-text'
                              }`}
                            >
                              {cat}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Read More Link */}
                      <div className="mt-4 pt-4 border-t border-opacity-20 border-gray-300">
                        <span className={`text-sm font-medium transition-colors duration-300 ${
                          theme === 'dark' 
                            ? 'text-dseza-dark-primary group-hover:text-dseza-dark-primary-hover' 
                            : 'text-dseza-light-primary group-hover:text-dseza-light-primary-hover'
                        }`}>
                          {language === 'en' ? 'Read more →' : 'Đọc thêm →'}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <div className={`mb-8 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                <div className="w-24 h-24 mx-auto mb-6 opacity-50">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  {language === 'en' ? 'No articles yet' : 'Chưa có bài viết nào'}
                </h3>
                <p className="text-lg mb-6">
                  {language === 'en' 
                    ? `Currently there are no articles in the "${pageTitle}" category.`
                    : `Hiện tại chưa có bài viết nào trong chuyên mục "${pageTitle}".`
                  }
                </p>
                <Link 
                  to={`/${translatePath('news', language)}`}
                  className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-dseza-dark-primary text-dseza-dark-main-text hover:bg-dseza-dark-primary-hover' 
                      : 'bg-dseza-light-primary text-white hover:bg-dseza-light-primary-hover'
                  }`}
                >
                  <ArrowRight className="h-5 w-5 mr-2" />
                  {language === 'en' ? 'View all news' : 'Xem tất cả tin tức'}
                </Link>
              </div>
            </div>
          )}

          {/* Removed back-to-categories link per request */}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ArticleListPage; 