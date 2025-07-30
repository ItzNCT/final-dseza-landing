import React from "react";
import { Link, useParams } from "react-router-dom";
import { useArticles } from "../../hooks/useArticles";
import { useAllNewsCategories } from "../../hooks/useNewsCategories";
import { LoadingSpinner } from "../../components/ui/loading-spinner";
import { ChevronRight, ChevronLeft, Star, Filter } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import MobileArticleCard from "@/components/mobile/MobileArticleCard";

// Function to format title with real categories (reused from ArticleListPage)
const formatTitle = (slug: string, categoriesData?: any[]) => {
  // URL mapping for category routes
  const urlToCategoryMap: { [key: string]: string } = {
    'dau-tu-hop-tac-quoc-te': 'Đầu tư – Hợp tác quốc tế',
    'dao-tao-uom-tao-khoi-nghiep': 'Đào tạo, Ươm tạo khởi nghiệp',
    'chuyen-doi-so': 'Chuyển đổi số',
    'hoat-dong-ban-quan-ly': 'Hoạt động Ban quản lý',
    'tin-khac': 'Tin khác',
    'doanh-nghiep': 'Doanh nghiệp',
    'su-kien': 'Tin tức & Sự kiện',
    'thong-bao': 'Thông báo',
    'hoat-dong': 'Hoạt động',
    'tin-tuc': 'Tin tức',
    'quy-trinh-linh-vuc-dau-tu': 'Quy trình lĩnh vực đầu tư',
    'linh-vuc-khuyen-khich-dau-tu': 'Lĩnh vực thu hút đầu tư',
    'linh-vuc-thu-hut-dau-tu': 'Lĩnh vực thu hút đầu tư',
    'danh-cho-nha-dau-tu': 'Dành cho nhà đầu tư',
    'moi-truong-dau-tu': 'Môi trường đầu tư',
    'ha-tang-giao-thong': 'Hạ tầng giao thông',
    'khoa-hoc-cong-nghe-moi-truong': 'Khoa học công nghệ - Môi trường',
    'logistics': 'Logistics',
    'ha-tang-xa-hoi': 'Hạ tầng xã hội',
    'nguon-nhan-luc': 'Nguồn nhân lực',
    'cai-cach-hanh-chinh': 'Cải cách hành chính',
  };
  
  // Try fixed mapping first
  if (urlToCategoryMap[slug]) {
    return urlToCategoryMap[slug];
  }
  
  // If we have categories data, search in it
  if (categoriesData) {
    const foundCategory = categoriesData.find(cat => 
      cat.name.toLowerCase().includes(slug.replace(/-/g, ' ').toLowerCase()) ||
      slug.replace(/-/g, ' ').toLowerCase().includes(cat.name.toLowerCase())
    );
    if (foundCategory) {
      return foundCategory.name;
    }
  }
  
  // Fallback: format from slug
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Mobile-optimized Article List Page
 * 
 * Displays articles in a vertical list format optimized for mobile screens
 * Features simplified navigation and touch-friendly interactions
 */
const MobileArticleListPage: React.FC = () => {
  const { category, subcategory } = useParams<{ category?: string; subcategory?: string; }>();
  const { data: articles, isLoading, isError } = useArticles();
  const { data: categoriesData } = useAllNewsCategories();
  const { theme } = useTheme();

  // Create dynamic title with real categories
  const pageTitle = category && subcategory 
    ? `${formatTitle(category, categoriesData)} - ${formatTitle(subcategory, categoriesData)}`
    : category 
    ? formatTitle(category, categoriesData)
    : 'Tin tức';

  // Create dynamic description
  const getPageDescription = () => {
    const targetCategory = subcategory || category;
    if (targetCategory === 'su-kien' || targetCategory === 'tin-tuc') {
      return 'Các thông tin mới nhất từ Ban Quản lý Khu Kinh tế Đà Nẵng';
    }
    return `Tin tức về ${pageTitle.toLowerCase()}`;
  };

  // Check if this is a subcategory of su-kien for breadcrumb
  const isSubcategoryOfSuKien = category === 'su-kien' && subcategory;

  // Loading state
  if (isLoading) {
    return (
      <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
        {/* MobileHeader is automatically included by MobileLayout */}
        <main className="flex-1 px-4 py-6">
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center space-y-4">
              <LoadingSpinner size="lg" />
              <p className={`text-base ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                Đang tải tin tức...
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
        {/* MobileHeader is automatically included by MobileLayout */}
        <main className="flex-1 px-4 py-6">
          <div className="text-center py-12">
            <div className={`text-red-500 mb-4`}>
              <p className="text-lg font-semibold mb-2">Có lỗi xảy ra</p>
              <p className="text-sm">Không thể tải tin tức. Vui lòng thử lại sau.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
      {/* MobileHeader is automatically included by MobileLayout */}
      
      {/* Main Content */}
      <main className="flex-1 px-4 py-6 space-y-6">
        
        {/* Mobile Breadcrumb */}
        <div className={`py-2 px-3 rounded-lg ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg/50' : 'bg-dseza-light-secondary-bg/50'}`}>
          <nav className={`flex items-center space-x-2 text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
            <Link 
              to="/" 
              className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
            >
              Trang chủ
            </Link>
            <ChevronRight className="h-3 w-3" />
            
            {isSubcategoryOfSuKien ? (
              <>
                <Link 
                  to="/tin-tuc/su-kien" 
                  className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
                >
                  Tin tức & Sự kiện
                </Link>
                <ChevronRight className="h-3 w-3" />
                <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  {formatTitle(subcategory, categoriesData)}
                </span>
              </>
            ) : (
              <>
                <Link 
                  to="/tin-tuc" 
                  className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
                >
                  Tin tức
                </Link>
                {category && (
                  <>
                    <ChevronRight className="h-3 w-3" />
                    <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                      {formatTitle(category, categoriesData)}
                    </span>
                  </>
                )}
              </>
            )}
          </nav>
        </div>

        {/* Page Header */}
        <div className="text-center py-4">
          <h1 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
            {pageTitle}
          </h1>
          <div className={`w-16 h-1 mx-auto mb-3 rounded-full ${theme === 'dark' ? 'bg-dseza-dark-primary' : 'bg-dseza-light-primary'}`}></div>
          <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
            {getPageDescription()}
          </p>
        </div>

        {/* Results Summary */}
        {articles && articles.length > 0 && (
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-2">
              <Badge 
                variant="secondary" 
                className={`px-3 py-1 text-sm ${
                  theme === 'dark' 
                    ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary border-dseza-dark-primary/30' 
                    : 'bg-dseza-light-primary/20 text-dseza-light-primary border-dseza-light-primary/30'
                }`}
              >
                <Filter className="h-3 w-3 mr-1" />
                {articles.length} bài viết
              </Badge>
              
              {/* Featured articles count */}
              {articles.filter(article => article.is_featured).length > 0 && (
                <Badge 
                  variant="secondary" 
                  className={`px-2 py-1 text-xs ${
                    theme === 'dark' 
                      ? 'bg-yellow-900/20 text-yellow-300 border-yellow-400/30' 
                      : 'bg-yellow-100/80 text-yellow-800 border-yellow-300/30'
                  }`}
                >
                  <Star className="h-3 w-3 mr-1" />
                  {articles.filter(article => article.is_featured).length}
                </Badge>
              )}
            </div>
          </div>
        )}
        
        {/* Articles List */}
        {articles && articles.length > 0 ? (
          <div className="space-y-4">
            {articles.map((article) => (
              <MobileArticleCard
                key={article.id}
                article={article}
                categoryDisplay={formatTitle(subcategory || category || '', categoriesData)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
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
                to="/tin-tuc" 
                className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  theme === 'dark' 
                    ? 'bg-dseza-dark-primary text-dseza-dark-main-text hover:bg-dseza-dark-primary/80' 
                    : 'bg-dseza-light-primary text-white hover:bg-dseza-light-primary/80'
                }`}
              >
                Xem tất cả tin tức
              </Link>
            </div>
          </div>
        )}

        {/* Back Button */}
        {category && (
          <div className="pt-6">
            <Link 
              to={isSubcategoryOfSuKien ? "/tin-tuc/su-kien" : "/tin-tuc"}
              className={`inline-flex items-center px-4 py-3 rounded-lg border font-medium transition-all duration-200 active:scale-95 ${
                theme === 'dark' 
                  ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-secondary-bg' 
                  : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-secondary-bg'
              }`}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              {isSubcategoryOfSuKien ? "Quay lại Sự kiện" : "Quay lại Tin tức"}
            </Link>
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MobileArticleListPage; 