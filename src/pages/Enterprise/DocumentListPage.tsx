import React, { useState } from "react";
import { Search, Download, FileText, AlertCircle, ExternalLink, ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEnterpriseDocs, EnterpriseDocument } from "../../hooks/useEnterpriseDocs";
import { LoadingSpinner } from "../../components/ui/loading-spinner";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Alert, AlertDescription } from "../../components/ui/alert";
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

// Hàm hỗ trợ định dạng tiêu đề với mapping cho các danh mục cụ thể
const formatTitle = (slug: string = "") => {
  // Mapping cho các category cụ thể với tiếng Việt có dấu
  const categoryTitleMap: { [key: string]: string } = {
    'bao-cao-giam-sat-va-danh-gia-dau-tu': 'Báo cáo giám sát và đánh giá đầu tư',
    'mau-bang-bieu-bao-cao': 'Mẫu bảng biểu báo cáo',
    'van-ban-phap-ly': 'Văn bản pháp lý',
    'tai-lieu-huong-dan': 'Tài liệu hướng dẫn',
    'bieu-mau-ho-so': 'Biểu mẫu hồ sơ',
    'quy-dinh-thuc-hien': 'Quy định thực hiện',
    'thu-tuc-ho-so-du-lieu-moi-truong': 'Thủ tục - Hồ sơ - Dữ liệu môi trường',
  };

  // Kiểm tra xem có mapping cụ thể không
  if (categoryTitleMap[slug]) {
    return categoryTitleMap[slug];
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
  const { docCategory, docCategorySlug } = useParams<{ 
    docCategory?: string; 
    docCategorySlug?: string; 
  }>();
  const { data: documents, isLoading, isError, error } = useEnterpriseDocs();
  const [searchTerm, setSearchTerm] = useState("");

  // Sử dụng docCategorySlug nếu có, nếu không thì fallback về docCategory (để tương thích với route cũ)
  const categoryParam = docCategorySlug || docCategory;

  // KIỂM TRA ĐỂ CHỌN GIAO DIỆN
  const isEnvironmentalPage = categoryParam === "thu-tuc-ho-so-du-lieu-moi-truong";

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
          path={`/doanh-nghiep/tai-lieu/chi-tiet/${doc.id}`} // Đường dẫn tới trang xem chi tiết
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
            <TableHead className="w-[200px]">Số/Ký hiệu</TableHead>
            <TableHead>Tên tài liệu</TableHead>
            <TableHead className="w-[150px]">Ngày ban hành</TableHead>
            <TableHead className="w-[120px] text-center">Tải về</TableHead>
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
                      {doc.title || 'Không có tiêu đề'}
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
                      <span>Tải file</span>
                    </Button>
                  ) : (
                    <span className={`text-sm ${secondaryTextClass} italic`}>
                      Không có file
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
                      ? `Danh mục "${formatTitle(categoryParam)}" hiện tại chưa có tài liệu`
                      : searchTerm
                        ? `Không có tài liệu nào phù hợp với từ khóa "${searchTerm}"`
                        : "Không tìm thấy tài liệu nào"
                    }
                  </p>
                  <p className="text-sm">
                    {!isError && documents && documents.length === 0 
                      ? "Hệ thống đang cập nhật tài liệu cho danh mục này. Vui lòng quay lại sau hoặc kiểm tra danh mục khác."
                      : searchTerm
                        ? "Hãy thử từ khóa khác hoặc xóa bộ lọc tìm kiếm."
                        : "Hãy thử tải lại trang hoặc liên hệ với quản trị viên."
                    }
                  </p>
                  {!isError && documents && documents.length === 0 && (
                    <div className="mt-6">
                      <Link
                        to="/doanh-nghiep/bao-cao-du-lieu"
                        className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isDark 
                            ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary hover:bg-dseza-dark-primary/30' 
                            : 'bg-dseza-light-primary/20 text-dseza-light-primary hover:bg-dseza-light-primary/30'
                        }`}
                      >
                        ← Xem các danh mục khác
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
                to="/" 
                className={`transition-colors hover:underline ${isDark ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Trang chủ
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link 
                to="/doanh-nghiep" 
                className={`transition-colors hover:underline ${isDark ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Doanh nghiệp
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link 
                to="/doanh-nghiep/bao-cao-du-lieu" 
                className={`transition-colors hover:underline ${isDark ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Báo cáo dữ liệu
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${textClass}`}>
                {formatTitle(categoryParam)}
              </span>
            </nav>
          </div>
        </div>

        {/* Page Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
                      <div className="mb-12 text-center">
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${textClass}`}>
              {formatTitle(categoryParam)}
            </h1>
            <div className={`w-24 h-1 mx-auto mb-4 rounded-full ${isDark ? 'bg-dseza-dark-primary' : 'bg-dseza-light-primary'}`}></div>
            <div className="flex items-center justify-center space-x-2 text-lg">
              <FileText className="w-5 h-5" />
              <span className={secondaryTextClass}>
                Tài liệu doanh nghiệp • {formatTitle(categoryParam)}
              </span>
            </div>
            <p className={`text-sm mt-4 max-w-2xl mx-auto ${secondaryTextClass}`}>
              {categoryParam === 'bao-cao-giam-sat-va-danh-gia-dau-tu' 
                ? 'Các báo cáo định kỳ về tình hình thực hiện đầu tư và đánh giá hiệu quả dự án trong khu công nghệ cao.'
                : categoryParam === 'mau-bang-bieu-bao-cao'
                ? 'Các mẫu biểu, bảng biểu chuẩn để doanh nghiệp thực hiện báo cáo theo quy định.'
                : categoryParam === 'thu-tuc-ho-so-du-lieu-moi-truong'
                ? 'Thủ tục, hồ sơ và dữ liệu môi trường cần thiết cho doanh nghiệp thực hiện các quy trình bảo vệ môi trường.'
                : 'Tập hợp các tài liệu, văn bản hướng dẫn và biểu mẫu cần thiết cho doanh nghiệp.'
              }
            </p>
          </div>

          {/* Results Summary */}
          {documents && documents.length > 0 && (
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-4">
                <div className={`px-3 py-1 text-sm rounded-md ${isDark ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary border border-dseza-dark-primary/30' : 'bg-dseza-light-primary/20 text-dseza-light-primary border border-dseza-light-primary/30'}`}>
                  {filteredDocuments.length} / {documents.length} tài liệu
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
                    placeholder="Tìm kiếm theo tên tài liệu hoặc số ký hiệu..."
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
                Có lỗi xảy ra khi tải tài liệu: {error?.message || 'Lỗi không xác định'}
                <br />
                <span className="text-sm opacity-75">
                  Vui lòng thử lại sau hoặc liên hệ với quản trị viên.
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
                  Đang tải danh sách tài liệu...
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
                      ? `Danh mục "${formatTitle(categoryParam)}" hiện tại chưa có tài liệu`
                      : searchTerm
                        ? `Không có tài liệu nào phù hợp với từ khóa "${searchTerm}"`
                        : "Không tìm thấy tài liệu nào"
                    }
                  </p>
                  <p className="text-sm">
                    {!isError && documents && documents.length === 0 
                      ? "Hệ thống đang cập nhật tài liệu cho danh mục này. Vui lòng quay lại sau hoặc kiểm tra danh mục khác."
                      : searchTerm
                        ? "Hãy thử từ khóa khác hoặc xóa bộ lọc tìm kiếm."
                        : "Hãy thử tải lại trang hoặc liên hệ với quản trị viên."
                    }
                  </p>
                  {!isError && documents && documents.length === 0 && (
                    <div className="mt-6">
                      <Link
                        to="/doanh-nghiep/bao-cao-du-lieu"
                        className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isDark 
                            ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary hover:bg-dseza-dark-primary/30' 
                            : 'bg-dseza-light-primary/20 text-dseza-light-primary hover:bg-dseza-light-primary/30'
                        }`}
                      >
                        ← Xem các danh mục khác
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
              Hiển thị {filteredDocuments.length} tài liệu
              {searchTerm && ` phù hợp với từ khóa "${searchTerm}"`}
              {documents && documents.length !== filteredDocuments.length && 
                ` (từ tổng số ${documents.length} tài liệu)`
              }
            </div>
          )}

          {/* Back to Enterprise Button */}
          <div className="mt-16 text-center">
            <Link 
              to="/doanh-nghiep/bao-cao-du-lieu"
              className={`inline-flex items-center px-6 py-3 rounded-lg border-2 font-medium transition-all duration-300 hover:-translate-y-1 ${
                isDark 
                  ? 'border-dseza-dark-primary text-dseza-dark-primary hover:bg-dseza-dark-primary hover:text-dseza-dark-main-text' 
                  : 'border-dseza-light-primary text-dseza-light-primary hover:bg-dseza-light-primary hover:text-white'
              }`}
            >
              ← Quay lại Báo cáo dữ liệu
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