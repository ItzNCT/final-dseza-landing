import { Link, useParams } from "react-router-dom";
import { useArticles } from "../../hooks/useArticles";
import { useAllNewsCategories } from "../../hooks/useNewsCategories";
import { LoadingSpinner } from "../../components/ui/loading-spinner";
import { ChevronRight, Calendar, ArrowRight, Star } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";

// Hàm để định dạng tiêu đề với real categories
const formatTitle = (slug: string, categoriesData?: any[]) => {
  // URL mapping cho các category routes
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
    // Add missing investment-related categories
    'quy-trinh-linh-vuc-dau-tu': 'Quy trình lĩnh vực đầu tư',
    'linh-vuc-khuyen-khich-dau-tu': 'Lĩnh vực thu hút đầu tư',
    'linh-vuc-thu-hut-dau-tu': 'Lĩnh vực thu hút đầu tư', // Alternative slug
    'danh-cho-nha-dau-tu': 'Dành cho nhà đầu tư', // Parent category
    
    // Add investment environment subcategories
    'moi-truong-dau-tu': 'Môi trường đầu tư', // Parent category
    'ha-tang-giao-thong': 'Hạ tầng giao thông',
    'khoa-hoc-cong-nghe-moi-truong': 'Khoa học công nghệ - Môi trường',
    'logistics': 'Logistics',
    'ha-tang-xa-hoi': 'Hạ tầng xã hội',
    'nguon-nhan-luc': 'Nguồn nhân lực',
    'cai-cach-hanh-chinh': 'Cải cách hành chính',
  };
  
  // Trước tiên thử mapping cố định
  if (urlToCategoryMap[slug]) {
    return urlToCategoryMap[slug];
  }
  
  // Nếu có categories data thì tìm trong đó
  if (categoriesData) {
    const foundCategory = categoriesData.find(cat => 
      cat.name.toLowerCase().includes(slug.replace(/-/g, ' ').toLowerCase()) ||
      slug.replace(/-/g, ' ').toLowerCase().includes(cat.name.toLowerCase())
    );
    if (foundCategory) {
      return foundCategory.name;
    }
  }
  
  // Fallback: format từ slug
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Hàm format ngày tháng
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
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

  // Tạo tiêu đề động với real categories
  const pageTitle = subcategory 
    ? `${formatTitle(category!, categoriesData)} - ${formatTitle(subcategory, categoriesData)}`
    : formatTitle(category!, categoriesData);

  // Tạo description động
  const getPageDescription = () => {
    const targetCategory = subcategory || category;
    if (targetCategory === 'su-kien' || targetCategory === 'tin-tuc') {
      return 'Khám phá tất cả các thông tin mới nhất, sự kiện và hoạt động từ Ban Quản lý Khu công nghệ cao và các khu công nghiệp Đà Nẵng';
    }
    return `Khám phá các thông tin mới nhất về ${pageTitle.toLowerCase()} từ Ban Quản lý Khu công nghệ cao và các khu công nghiệp Đà Nẵng`;
  };

  // Check if this is a subcategory of su-kien
  const isSubcategoryOfSuKien = category === 'su-kien' && subcategory;
  
  // Check if this is the main su-kien page
  const isSuKienMainPage = category === 'su-kien' && !subcategory;

  // Loading state
  if (isLoading) {
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
                  Đang tải danh sách bài viết...
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
    return (
      <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
        <TopBar />
        <LogoSearchBar />
        <NavigationBar />
        <main className="flex-1 pt-52">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-12">
              <div className={`text-red-500 mb-4`}>
                <p className="text-xl font-semibold mb-2">Có lỗi xảy ra</p>
                <p className="text-sm">Không thể tải danh sách bài viết. Vui lòng thử lại sau.</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
                Trang chủ
              </Link>
              <ChevronRight className="h-4 w-4" />
              
              {/* Special breadcrumb logic for su-kien routes */}
              {isSubcategoryOfSuKien ? (
                <>
                  {/* For subcategories of su-kien: Trang chủ -> Tin tức & Sự kiện -> Subcategory */}
                  <Link 
                    to="/tin-tuc/su-kien" 
                    className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
                  >
                    Tin tức & Sự kiện
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                    {formatTitle(subcategory, categoriesData)}
                  </span>
                </>
              ) : (
                <>
                  {/* Normal breadcrumb for other routes */}
                  <Link 
                    to="/tin-tuc" 
                    className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
                  >
                    Tin tức
                  </Link>
                  {category && (
                    <>
                      <ChevronRight className="h-4 w-4" />
                      <Link 
                        to={`/tin-tuc/${category}`} 
                        className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
                      >
                        {formatTitle(category, categoriesData)}
                      </Link>
                    </>
                  )}
                  {subcategory && (
                    <>
                      <ChevronRight className="h-4 w-4" />
                      <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                        {formatTitle(subcategory, categoriesData)}
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
                  {articles.length} bài viết
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
                    {articles.filter(article => article.is_featured).length} sự kiện tiêu biểu
                  </Badge>
                )}
              </div>
            </div>
          )}
          
          {/* Articles Grid */}
          {articles && articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Link 
                  to={article.path} 
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
                          {article.categories.length > 0 ? article.categories[0] : formatTitle(subcategory || category!, categoriesData)}
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
                            Tiêu biểu
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
                          {formatDate(article.published_date)}
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
                          Đọc thêm →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
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
                  Chưa có bài viết nào
                </h3>
                <p className="text-lg mb-6">
                  Hiện tại chưa có bài viết nào trong chuyên mục "{pageTitle}".
                </p>
                <Link 
                  to="/tin-tuc" 
                  className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-dseza-dark-primary text-dseza-dark-main-text hover:bg-dseza-dark-primary-hover' 
                      : 'bg-dseza-light-primary text-white hover:bg-dseza-light-primary-hover'
                  }`}
                >
                  <ArrowRight className="h-5 w-5 mr-2" />
                  Xem tất cả tin tức
                </Link>
              </div>
            </div>
          )}

          {/* Back to Categories Button - Conditional Logic */}
          {!isSuKienMainPage && (
            <div className="mt-16 text-center">
              <Link 
                to={isSubcategoryOfSuKien ? "/tin-tuc/su-kien" : "/tin-tuc"}
                className={`inline-flex items-center px-6 py-3 rounded-lg border-2 font-medium transition-all duration-300 hover:-translate-y-1 ${
                  theme === 'dark' 
                    ? 'border-dseza-dark-primary text-dseza-dark-primary hover:bg-dseza-dark-primary hover:text-dseza-dark-main-text' 
                    : 'border-dseza-light-primary text-dseza-light-primary hover:bg-dseza-light-primary hover:text-white'
                }`}
              >
                ← {isSubcategoryOfSuKien ? "Quay lại Tin tức & Sự kiện" : "Quay lại danh mục tin tức"}
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ArticleListPage; 