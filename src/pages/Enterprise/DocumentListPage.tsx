import React, { useState, useEffect } from "react";
import { Search, Download, FileText, AlertCircle, ExternalLink, ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEnterpriseDocs, EnterpriseDocument } from "../../hooks/useEnterpriseDocs";
import { LoadingSpinner } from "../../components/ui/loading-spinner";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { useLanguage } from "../../context/LanguageContext";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { DocumentCard } from "../../components/ui/DocumentCard"; // Import component mới
import { useTheme } from "../../context/ThemeContext";
import TopBar from "../../components/hero/TopBar";
import LogoSearchBar from "../../components/hero/LogoSearchBar";
import NavigationBar from "../../components/hero/NavigationBar";
import Footer from "../../components/Footer";

// Hàm hỗ trợ định dạng tiêu đề với mapping cho các danh mục cụ thể (đa ngôn ngữ)
const formatTitle = (slug: string = "", language: 'vi' | 'en' = 'vi') => {
  // Mapping cho các category cụ thể với hỗ trợ đa ngôn ngữ
  const categoryTitleMap: { [key: string]: { vi: string; en: string } } = {
    'bao-cao-giam-sat-va-danh-gia-dau-tu': {
      vi: 'Báo cáo giám sát và đánh giá đầu tư',
      en: 'Investment Monitoring and Evaluation Reports'
    },
    'mau-bang-bieu-bao-cao': {
      vi: 'Mẫu bảng biểu báo cáo',
      en: 'Report Form Templates'
    },
    'van-ban-phap-ly': {
      vi: 'Văn bản pháp lý',
      en: 'Legal Documents'
    },
    'tai-lieu-huong-dan': {
      vi: 'Tài liệu hướng dẫn',
      en: 'Guidance Documents'
    },
    'bieu-mau-ho-so': {
      vi: 'Biểu mẫu hồ sơ',
      en: 'Application Forms'
    },
    'quy-dinh-thuc-hien': {
      vi: 'Quy định thực hiện',
      en: 'Implementation Regulations'
    },
    'thu-tuc-ho-so-du-lieu-moi-truong': {
      vi: 'Thủ tục - Hồ sơ - Dữ liệu môi trường',
      en: 'Environmental Procedures - Documents - Data'
    },
    // English specific mappings
    'investment-monitoring-evaluation-reports': {
      vi: 'Báo cáo giám sát và đánh giá đầu tư',
      en: 'Investment Monitoring and Evaluation Reports'
    },
    'report-forms-templates': {
      vi: 'Mẫu bảng biểu báo cáo',
      en: 'Report Form Templates'
    },
    'legal-documents': {
      vi: 'Văn bản pháp lý',
      en: 'Legal Documents'
    },
    'guidance-documents': {
      vi: 'Tài liệu hướng dẫn',
      en: 'Guidance Documents'
    },
    'application-forms': {
      vi: 'Biểu mẫu hồ sơ',
      en: 'Application Forms'
    },
    'implementation-regulations': {
      vi: 'Quy định thực hiện',
      en: 'Implementation Regulations'
    },
    'procedures-records-environmental-data': {
      vi: 'Thủ tục - Hồ sơ - Dữ liệu môi trường',
      en: 'Environmental Procedures - Documents - Data'
    },
    'environmental-procedures-documents-data': {
      vi: 'Thủ tục - Hồ sơ - Dữ liệu môi trường',
      en: 'Environmental Procedures - Documents - Data'
    },
  };

  // Kiểm tra xem có mapping cụ thể không
  if (categoryTitleMap[slug]) {
    return categoryTitleMap[slug][language];
  }

  // Fallback: capitalize từng từ
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Function to handle file download
const handleDownload = (fileUrl: string, title: string) => {
  if (!fileUrl) {
    console.warn('No file URL available for:', title);
    return;
  }
  
  console.log('📥 Downloading file:', fileUrl);
  window.open(fileUrl, '_blank', 'noopener,noreferrer');
};

const DocumentListPage: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const { docCategory, docCategorySlug } = useParams<{ 
    docCategory?: string; 
    docCategorySlug?: string; 
  }>();
  const { data: documents, isLoading, isError, error } = useEnterpriseDocs();
  const [searchTerm, setSearchTerm] = useState("");

  // Sử dụng docCategorySlug nếu có, nếu không thì fallback về docCategory (để tương thích với route cũ)
  const categoryParam = docCategorySlug || docCategory;

  // KIỂM TRA ĐỂ CHỌN GIAO DIỆN (hỗ trợ cả tiếng Anh và tiếng Việt)
  const isEnvironmentalPage = categoryParam === "thu-tuc-ho-so-du-lieu-moi-truong" || 
                             categoryParam === "procedures-records-environmental-data" ||
                             categoryParam === "environmental-procedures-documents-data";

  // Dynamic breadcrumb links based on language and current path
  const getBreadcrumbLinks = () => {
    const isEnterpriseRoute = window.location.pathname.includes('/enterprises/');
    const isDocumentRoute = window.location.pathname.includes('/tai-lieu/');
    const isVanBanRoute = window.location.pathname.includes('/van-ban/');
    
    if (language === 'en') {
      return {
        home: '/',
        enterprise: isEnterpriseRoute ? '/enterprises' : '/business',
        documents: isEnterpriseRoute ? '/enterprises/reports-data' : '/business/reports-data',
        enterpriseLabel: isEnterpriseRoute ? 'Enterprises' : 'Business',
        documentsLabel: 'Reports & Data'
      };
    } else {
      return {
        home: '/',
        enterprise: '/doanh-nghiep',
        documents: isDocumentRoute ? '/doanh-nghiep/tai-lieu' : (isVanBanRoute ? '/doanh-nghiep/van-ban' : '/doanh-nghiep/bao-cao-du-lieu'),
        businessLabel: 'Doanh nghiệp',
        documentsLabel: isDocumentRoute ? 'Tài liệu' : (isVanBanRoute ? 'Văn bản' : 'Báo cáo dữ liệu')
      };
    }
  };

  const breadcrumbLinks = getBreadcrumbLinks();

  // Filter documents by search term only (category filtering is now handled by the API)
  const filteredDocuments = (documents || []).filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.docNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const isDark = theme === 'dark';
  const bgClass = isDark ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg';
  const textClass = isDark ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text';
  const secondaryTextClass = isDark ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text';
  const cardClass = isDark ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary';
  const borderClass = isDark ? 'border-dseza-dark-border' : 'border-dseza-light-border';

  // Get page title and description based on language
  const pageTitle = formatTitle(categoryParam, language);
  const getPageDescription = () => {
    if (language === 'en') {
      switch(categoryParam) {
        case 'bao-cao-giam-sat-va-danh-gia-dau-tu':
        case 'investment-monitoring-evaluation-reports':
          return 'Periodic reports on investment implementation and project effectiveness evaluation in the high-tech park.';
        case 'mau-bang-bieu-bao-cao':
        case 'report-forms-templates':
          return 'Standard report forms and templates for enterprises to comply with reporting regulations.';
        case 'thu-tuc-ho-so-du-lieu-moi-truong':
        case 'procedures-records-environmental-data':
        case 'environmental-procedures-documents-data':
          return 'Environmental procedures, documents and data necessary for enterprises to implement environmental protection processes.';
        default:
          return 'Collection of documents, guidance materials and forms necessary for enterprises.';
      }
    } else {
      switch(categoryParam) {
        case 'bao-cao-giam-sat-va-danh-gia-dau-tu':
        case 'investment-monitoring-evaluation-reports':
          return 'Các báo cáo định kỳ về tình hình thực hiện đầu tư và đánh giá hiệu quả dự án trong khu công nghệ cao.';
        case 'mau-bang-bieu-bao-cao':
        case 'report-forms-templates':
          return 'Các mẫu biểu, bảng biểu chuẩn để doanh nghiệp thực hiện báo cáo theo quy định.';
        case 'thu-tuc-ho-so-du-lieu-moi-truong':
        case 'procedures-records-environmental-data':
        case 'environmental-procedures-documents-data':
          return 'Thủ tục, hồ sơ và dữ liệu môi trường cần thiết cho doanh nghiệp thực hiện các quy trình bảo vệ môi trường.';
        default:
          return 'Tập hợp các tài liệu, văn bản hướng dẫn và biểu mẫu cần thiết cho doanh nghiệp.';
      }
    }
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
    
    // Add/update Open Graph meta tags
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
    
  }, [pageTitle, language, getPageDescription]);

  // Giao diện dạng thẻ (Card)
  const renderCardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredDocuments?.map((doc) => (
        <DocumentCard 
          key={doc.id}
          id={doc.id}
          title={doc.title}
          docNumber={doc.docNumber}
          releaseDate={doc.releaseDate}
          path={language === 'en' 
            ? (window.location.pathname.includes('/enterprises/') 
                ? `/enterprises/documents/detail/${doc.id}` 
                : `/business/documents/detail/${doc.id}`)
            : (window.location.pathname.includes('/tai-lieu/') 
                ? `/doanh-nghiep/tai-lieu/chi-tiet/${doc.id}`
                : (window.location.pathname.includes('/van-ban/') 
                    ? `/doanh-nghiep/van-ban/chi-tiet/${doc.id}`
                    : `/doanh-nghiep/bao-cao-du-lieu/chi-tiet/${doc.id}`))}
        />
      ))}
    </div>
  );
  
  // Giao diện dạng bảng (Table)
  const renderTableView = () => (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className={isDark ? 'border-dseza-dark-border' : 'border-dseza-light-border'}>
            <TableHead className="w-[200px]">{language === 'en' ? 'Number/Symbol' : 'Số/Ký hiệu'}</TableHead>
            <TableHead>{language === 'en' ? 'Document Name' : 'Tên tài liệu'}</TableHead>
            <TableHead className="w-[150px]">{language === 'en' ? 'Issue Date' : 'Ngày ban hành'}</TableHead>
            <TableHead className="w-[120px] text-center">{language === 'en' ? 'Download' : 'Tải về'}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((doc) => (
              <TableRow 
                key={doc.id}
                className={`
                  ${isDark ? 'border-dseza-dark-border hover:bg-dseza-dark-hover' : 'border-dseza-light-border hover:bg-dseza-light-hover'}
                  transition-colors duration-200
                `}
              >
                <TableCell className="font-medium">
                  <span className={doc.docNumber === 'N/A' ? 'italic opacity-50' : ''}>
                    {doc.docNumber}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="max-w-md">
                    <p className="font-medium leading-relaxed">
                      {doc.title || (language === 'en' ? 'No title' : 'Không có tiêu đề')}
                    </p>
                  </div>
                </TableCell>
                <TableCell className={secondaryTextClass}>
                  {doc.releaseDate || 'N/A'}
                </TableCell>
                <TableCell className="text-center">
                  {doc.fileUrl ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className={`
                        inline-flex items-center space-x-2
                        ${isDark 
                          ? 'border-dseza-dark-primary text-dseza-dark-primary hover:bg-dseza-dark-primary hover:text-dseza-dark-main-text' 
                          : 'border-dseza-light-primary text-dseza-light-primary hover:bg-dseza-light-primary hover:text-dseza-light-main-bg'
                        }
                        transition-colors duration-200
                      `}
                      onClick={() => handleDownload(doc.fileUrl, doc.title)}
                    >
                      <Download className="w-4 h-4" />
                      <span>{language === 'en' ? 'Download' : 'Tải file'}</span>
                    </Button>
                  ) : (
                    <span className={`text-sm ${secondaryTextClass} italic`}>
                      {language === 'en' ? 'No file available' : 'Không có file'}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-16">
                <div className={secondaryTextClass}>
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">
                    {!isError && documents && documents.length === 0 
                      ? (language === 'en' 
                          ? `The "${formatTitle(categoryParam, language)}" category currently has no documents`
                          : `Danh mục "${formatTitle(categoryParam, language)}" hiện tại chưa có tài liệu`)
                      : searchTerm
                        ? (language === 'en' 
                            ? `No documents match the keyword "${searchTerm}"`
                            : `Không có tài liệu nào phù hợp với từ khóa "${searchTerm}"`)
                        : (language === 'en' ? "No documents found" : "Không tìm thấy tài liệu nào")
                    }
                  </p>
                  <p className="text-sm">
                    {!isError && documents && documents.length === 0 
                      ? (language === 'en' 
                          ? "The system is updating documents for this category. Please check back later or browse other categories."
                          : "Hệ thống đang cập nhật tài liệu cho danh mục này. Vui lòng quay lại sau hoặc kiểm tra danh mục khác.")
                      : searchTerm
                        ? (language === 'en' 
                            ? "Try different keywords or clear the search filter."
                            : "Hãy thử từ khóa khác hoặc xóa bộ lọc tìm kiếm.")
                        : (language === 'en' 
                            ? "Please try refreshing the page or contact the administrator."
                            : "Hãy thử tải lại trang hoặc liên hệ với quản trị viên.")
                    }
                  </p>
                  {!isError && documents && documents.length === 0 && (
                    <div className="mt-6">
                      <Link
                        to={breadcrumbLinks.documents}
                        className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isDark 
                            ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary hover:bg-dseza-dark-primary/30' 
                            : 'bg-dseza-light-primary/20 text-dseza-light-primary hover:bg-dseza-light-primary/30'
                        }`}
                      >
                        ← {language === 'en' ? 'View other categories' : 'Xem các danh mục khác'}
                      </Link>
                    </div>
                  )}
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className={`min-h-screen flex flex-col ${bgClass}`}>
      {/* Header components */}
      <TopBar />
      <LogoSearchBar />
      <NavigationBar />

      {/* Main content */}
      <main className="flex-1 pt-52">
        {/* Breadcrumb */}
        <div className={`py-3 ${isDark ? 'bg-dseza-dark-secondary/50' : 'bg-dseza-light-secondary/50'} border-b ${borderClass}`}>
          <div className="container mx-auto px-4">
            <nav className={`flex items-center space-x-2 text-sm ${secondaryTextClass}`}>
              <Link 
                to={breadcrumbLinks.home} 
                className={`transition-colors hover:underline ${isDark ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {language === 'en' ? 'Home' : 'Trang chủ'}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link 
                to={breadcrumbLinks.enterprise} 
                className={`transition-colors hover:underline ${isDark ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {breadcrumbLinks.enterpriseLabel}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link 
                to={breadcrumbLinks.documents} 
                className={`transition-colors hover:underline ${isDark ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {breadcrumbLinks.documentsLabel}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${textClass}`}>
                {formatTitle(categoryParam, language)}
              </span>
            </nav>
          </div>
        </div>

        {/* Page Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
                      <div className="mb-12 text-center">
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${textClass}`}>
              {pageTitle}
            </h1>
            <div className={`w-24 h-1 mx-auto mb-4 rounded-full ${isDark ? 'bg-dseza-dark-primary' : 'bg-dseza-light-primary'}`}></div>
            <div className="flex items-center justify-center space-x-2 text-lg">
              <FileText className="w-5 h-5" />
              <span className={secondaryTextClass}>
                {language === 'en' ? 'Enterprise Documents' : 'Tài liệu doanh nghiệp'} • {pageTitle}
              </span>
            </div>
            <p className={`text-sm mt-4 max-w-2xl mx-auto ${secondaryTextClass}`}>
              {getPageDescription()}
            </p>
          </div>

              {/* Results Summary */}
          {documents && documents.length > 0 && (
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-4">
                <div className={`px-3 py-1 text-sm rounded-md ${isDark ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary border border-dseza-dark-primary/30' : 'bg-dseza-light-primary/20 text-dseza-light-primary border border-dseza-light-primary/30'}`}>
                  {filteredDocuments.length} / {documents.length} {language === 'en' ? (filteredDocuments.length === 1 ? 'document' : 'documents') : 'tài liệu'}
                </div>
              </div>
            </div>
          )}

          {/* Search section */}
          <div className={`p-6 rounded-lg ${cardClass} ${borderClass} border mb-8`}>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder={language === 'en' ? "Search by document name or number..." : "Tìm kiếm theo tên tài liệu hoặc số ký hiệu..."}
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>



          {/* Error Alert */}
          {isError && (
            <Alert className="mb-8">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {language === 'en' 
                  ? `Error loading documents: ${error?.message || 'Unknown error'}`
                  : `Có lỗi xảy ra khi tải tài liệu: ${error?.message || 'Lỗi không xác định'}`
                }
                <br />
                <span className="text-sm opacity-75">
                  {language === 'en' 
                    ? 'Please try again later or contact the administrator.'
                    : 'Vui lòng thử lại sau hoặc liên hệ với quản trị viên.'
                  }
                </span>
              </AlertDescription>
            </Alert>
          )}

          {/* Content area */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <LoadingSpinner size="lg" />
                <p className={`mt-4 text-sm ${secondaryTextClass}`}>
                  {language === 'en' ? 'Loading document list...' : 'Đang tải danh sách tài liệu...'}
                </p>
              </div>
            </div>
          ) : filteredDocuments && filteredDocuments.length > 0 ? (
            isEnvironmentalPage ? renderCardView() : (
              <div className={`rounded-lg ${cardClass} ${borderClass} border overflow-hidden`}>
                {renderTableView()}
              </div>
            )
          ) : (
            <div className={`rounded-lg ${cardClass} ${borderClass} border overflow-hidden`}>
              <div className="text-center py-16">
                <div className={secondaryTextClass}>
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">
                    {!isError && documents && documents.length === 0 
                      ? (language === 'en' 
                          ? `The "${pageTitle}" category currently has no documents`
                          : `Danh mục "${pageTitle}" hiện tại chưa có tài liệu`)
                      : searchTerm
                        ? (language === 'en' 
                            ? `No documents match the keyword "${searchTerm}"`
                            : `Không có tài liệu nào phù hợp với từ khóa "${searchTerm}"`)
                        : (language === 'en' ? "No documents found" : "Không tìm thấy tài liệu nào")
                    }
                  </p>
                  <p className="text-sm">
                    {!isError && documents && documents.length === 0 
                      ? (language === 'en' 
                          ? "The system is updating documents for this category. Please check back later or browse other categories."
                          : "Hệ thống đang cập nhật tài liệu cho danh mục này. Vui lòng quay lại sau hoặc kiểm tra danh mục khác.")
                      : searchTerm
                        ? (language === 'en' 
                            ? "Try different keywords or clear the search filter."
                            : "Hãy thử từ khóa khác hoặc xóa bộ lọc tìm kiếm.")
                        : (language === 'en' 
                            ? "Please try refreshing the page or contact the administrator."
                            : "Hãy thử tải lại trang hoặc liên hệ với quản trị viên.")
                    }
                  </p>
                  {!isError && documents && documents.length === 0 && (
                    <div className="mt-6">
                      <Link
                        to={breadcrumbLinks.documents}
                        className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isDark 
                            ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary hover:bg-dseza-dark-primary/30' 
                            : 'bg-dseza-light-primary/20 text-dseza-light-primary hover:bg-dseza-light-primary/30'
                        }`}
                      >
                        ← {language === 'en' ? 'View other categories' : 'Xem các danh mục khác'}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Summary info */}
          {filteredDocuments.length > 0 && (
            <div className={`mt-8 text-sm ${secondaryTextClass} text-center`}>
              {language === 'en' 
                ? `Showing ${filteredDocuments.length} ${filteredDocuments.length === 1 ? 'document' : 'documents'}`
                : `Hiển thị ${filteredDocuments.length} tài liệu`
              }
              {searchTerm && (language === 'en' 
                ? ` matching keyword "${searchTerm}"`
                : ` phù hợp với từ khóa "${searchTerm}"`
              )}
              {documents && documents.length !== filteredDocuments.length && (language === 'en'
                ? ` (out of ${documents.length} total ${documents.length === 1 ? 'document' : 'documents'})`
                : ` (từ tổng số ${documents.length} tài liệu)`
              )}
            </div>
          )}

          {/* Back to Enterprise Button */}
          <div className="mt-16 text-center">
            <Link 
              to={breadcrumbLinks.documents}
              className={`inline-flex items-center px-6 py-3 rounded-lg border-2 font-medium transition-all duration-300 hover:-translate-y-1 ${
                isDark 
                  ? 'border-dseza-dark-primary text-dseza-dark-primary hover:bg-dseza-dark-primary hover:text-dseza-dark-main-text' 
                  : 'border-dseza-light-primary text-dseza-light-primary hover:bg-dseza-light-primary hover:text-white'
              }`}
            >
              ← {language === 'en' ? `Back to ${breadcrumbLinks.documentsLabel}` : `Quay lại ${breadcrumbLinks.documentsLabel}`}
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DocumentListPage; 