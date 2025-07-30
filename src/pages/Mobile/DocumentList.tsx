import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Search, ChevronRight, ChevronLeft, Loader2, Filter, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useTheme } from "@/context/ThemeContext";
import Footer from "@/components/Footer";
import MobileDocumentCard from "@/components/mobile/MobileDocumentCard";

// Mock hook for documents - replace with actual hook when available
const useDocuments = (filters: any) => {
  // Mock data - replace with real API call
  const mockDocuments = [
    {
      id: "1",
      title: "Quy định về hoạt động đầu tư trong Khu công nghệ cao Đà Nẵng",
      summary: "Văn bản quy định chi tiết về các thủ tục, điều kiện và quy trình đầu tư trong khu công nghệ cao.",
      category: "Văn bản pháp luật",
      published_date: "2024-01-15",
      file_url: "/documents/quy-dinh-dau-tu.pdf",
      view_url: "/van-ban/view/1",
      file_size: "2048000",
      file_type: "pdf",
      is_featured: true,
    },
    {
      id: "2", 
      title: "Hướng dẫn thủ tục thành lập doanh nghiệp",
      summary: "Tài liệu hướng dẫn chi tiết các bước thành lập doanh nghiệp trong các khu công nghiệp.",
      category: "Hướng dẫn",
      published_date: "2024-01-10",
      file_url: "/documents/huong-dan-thanh-lap.docx",
      view_url: "/van-ban/view/2",
      file_size: "1536000",
      file_type: "docx",
      is_featured: false,
    },
    {
      id: "3",
      title: "Báo cáo thống kê doanh nghiệp năm 2023",
      summary: "Báo cáo tổng hợp tình hình hoạt động và thống kê các doanh nghiệp trong năm 2023.",
      category: "Báo cáo",
      published_date: "2024-01-05",
      file_url: "/documents/bao-cao-2023.xlsx",
      view_url: "/van-ban/view/3",
      file_size: "5120000",
      file_type: "xlsx",
      is_featured: false,
    },
  ];

  return {
    data: mockDocuments,
    isLoading: false,
    isError: false,
    error: null,
    totalResults: mockDocuments.length,
  };
};

// Function to format category title
const formatCategoryTitle = (category?: string) => {
  const categoryMap: { [key: string]: string } = {
    'van-ban-phap-luat': 'Văn bản pháp luật',
    'huong-dan': 'Hướng dẫn thủ tục',
    'bao-cao': 'Báo cáo',
    'thong-bao': 'Thông báo',
    'tai-lieu-kỹ-thuat': 'Tài liệu kỹ thuật',
    'doanh-nghiep': 'Tài liệu doanh nghiệp',
  };
  
  if (!category) return 'Tất cả văn bản';
  return categoryMap[category] || category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Mobile-optimized Document List Page
 * 
 * Displays documents in a vertical list format optimized for mobile screens
 * Features simplified search and filtering for mobile devices
 */
const MobileDocumentListPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const { theme } = useTheme();
  
  const [filters, setFilters] = useState({
    keyword: "",
    category: category || "",
    file_type: "",
    page: 1,
    pageSize: 10,
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch documents data using the hook
  const { data: documents, isLoading, isError, error, totalResults } = useDocuments(filters);

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value === "all" ? "" : value,
      page: 1, // Reset to first page when filters change
    }));
  };

  const handleSearch = () => {
    // Trigger refetch by updating filters
    setFilters(prev => ({ ...prev }));
  };

  const clearFilters = () => {
    setFilters({
      keyword: "",
      category: category || "",
      file_type: "",
      page: 1,
      pageSize: 10,
    });
  };

  // Page title
  const pageTitle = formatCategoryTitle(category);

  // Loading state
  if (isLoading) {
    return (
      <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
        {/* MobileHeader is automatically included by MobileLayout */}
        <main className="flex-1 px-4 py-6">
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p className={`text-base ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                Đang tải văn bản...
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
              <p className="text-sm">Không thể tải văn bản. Vui lòng thử lại sau.</p>
            </div>
            <Button 
              onClick={handleSearch}
              variant="outline"
              className={`${
                theme === 'dark' 
                  ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-secondary-bg' 
                  : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-secondary-bg'
              }`}
            >
              Thử lại
            </Button>
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
            <Link 
              to="/van-ban" 
              className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
            >
              Văn bản
            </Link>
            {category && (
              <>
                <ChevronRight className="h-3 w-3" />
                <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  {formatCategoryTitle(category)}
                </span>
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
            Danh sách văn bản và tài liệu
          </p>
        </div>

        {/* Mobile Search and Filter */}
        <div className="space-y-4">
          
          {/* Search Bar */}
          <div className="relative">
            <Input
              placeholder="Tìm kiếm văn bản..."
              value={filters.keyword}
              onChange={(e) => handleFilterChange("keyword", e.target.value)}
              className={`h-12 pl-10 pr-4 text-base ${
                theme === 'dark' 
                  ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' 
                  : 'bg-white border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'
              }`}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
              theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
            }`} />
          </div>

          {/* Filter Toggle */}
          <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className={`w-full h-12 justify-between ${
                  theme === 'dark' 
                    ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-secondary-bg' 
                    : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-secondary-bg'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Bộ lọc</span>
                  {(filters.category || filters.file_type) && (
                    <Badge variant="secondary" className="ml-2">
                      {[filters.category, filters.file_type].filter(Boolean).length}
                    </Badge>
                  )}
                </div>
                <ChevronRight className={`h-4 w-4 transform transition-transform ${isFilterOpen ? 'rotate-90' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className={`mt-4 p-4 rounded-lg border space-y-4 ${
                theme === 'dark' 
                  ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' 
                  : 'bg-white border-dseza-light-border'
              }`}>
                
                {/* Category Filter */}
                <div className="space-y-2">
                  <Label className={`text-sm font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                    Danh mục
                  </Label>
                  <Select onValueChange={(value) => handleFilterChange("category", value)} value={filters.category || "all"}>
                    <SelectTrigger className={`h-11 ${
                      theme === 'dark' 
                        ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text' 
                        : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text'
                    }`}>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent className={`${
                      theme === 'dark' 
                        ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' 
                        : 'bg-white border-dseza-light-border'
                    }`}>
                      <SelectItem value="all">Tất cả danh mục</SelectItem>
                      <SelectItem value="van-ban-phap-luat">Văn bản pháp luật</SelectItem>
                      <SelectItem value="huong-dan">Hướng dẫn thủ tục</SelectItem>
                      <SelectItem value="bao-cao">Báo cáo</SelectItem>
                      <SelectItem value="thong-bao">Thông báo</SelectItem>
                      <SelectItem value="tai-lieu-ky-thuat">Tài liệu kỹ thuật</SelectItem>
                      <SelectItem value="doanh-nghiep">Tài liệu doanh nghiệp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* File Type Filter */}
                <div className="space-y-2">
                  <Label className={`text-sm font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                    Loại tệp
                  </Label>
                  <Select onValueChange={(value) => handleFilterChange("file_type", value)} value={filters.file_type || "all"}>
                    <SelectTrigger className={`h-11 ${
                      theme === 'dark' 
                        ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text' 
                        : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text'
                    }`}>
                      <SelectValue placeholder="Chọn loại tệp" />
                    </SelectTrigger>
                    <SelectContent className={`${
                      theme === 'dark' 
                        ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' 
                        : 'bg-white border-dseza-light-border'
                    }`}>
                      <SelectItem value="all">Tất cả loại tệp</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="doc">DOC/DOCX</SelectItem>
                      <SelectItem value="xls">XLS/XLSX</SelectItem>
                      <SelectItem value="ppt">PPT/PPTX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Filter Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={handleSearch}
                    className={`flex-1 h-11 ${
                      theme === 'dark' 
                        ? 'bg-dseza-dark-primary text-dseza-dark-main-bg hover:bg-dseza-dark-primary/80' 
                        : 'bg-dseza-light-primary text-white hover:bg-dseza-light-primary/80'
                    }`}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Tìm kiếm
                  </Button>
                  
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className={`h-11 ${
                      theme === 'dark' 
                        ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-secondary-bg' 
                        : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-secondary-bg'
                    }`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Results Summary */}
        {documents && documents.length > 0 && (
          <div className="flex items-center justify-between py-2">
            <Badge 
              variant="secondary" 
              className={`px-3 py-1 text-sm ${
                theme === 'dark' 
                  ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary border-dseza-dark-primary/30' 
                  : 'bg-dseza-light-primary/20 text-dseza-light-primary border-dseza-light-primary/30'
              }`}
            >
              <FileText className="h-3 w-3 mr-1" />
              {documents.length} văn bản
            </Badge>
            
            {/* Featured documents count */}
            {documents.filter((doc: any) => doc.is_featured).length > 0 && (
              <Badge 
                variant="secondary" 
                className={`px-2 py-1 text-xs ${
                  theme === 'dark' 
                    ? 'bg-yellow-900/20 text-yellow-300 border-yellow-400/30' 
                    : 'bg-yellow-100/80 text-yellow-800 border-yellow-300/30'
                }`}
              >
                {documents.filter((doc: any) => doc.is_featured).length} quan trọng
              </Badge>
            )}
          </div>
        )}
        
        {/* Documents List */}
        {documents && documents.length > 0 ? (
          <div className="space-y-4">
            {documents.map((document: any) => (
              <MobileDocumentCard
                key={document.id}
                document={document}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <div className={`mb-6 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              <div className="w-16 h-16 mx-auto mb-4 opacity-50">
                <FileText className="w-full h-full" />
              </div>
              <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Không tìm thấy văn bản
              </h3>
              <p className="text-sm mb-4">
                Không có văn bản nào phù hợp với bộ lọc hiện tại.
              </p>
              <Button 
                onClick={clearFilters}
                className={`${
                  theme === 'dark' 
                    ? 'bg-dseza-dark-primary text-dseza-dark-main-bg hover:bg-dseza-dark-primary/80' 
                    : 'bg-dseza-light-primary text-white hover:bg-dseza-light-primary/80'
                }`}
              >
                Xóa bộ lọc
              </Button>
            </div>
          </div>
        )}

        {/* Back Button */}
        {category && (
          <div className="pt-6">
            <Link 
              to="/van-ban"
              className={`inline-flex items-center px-4 py-3 rounded-lg border font-medium transition-all duration-200 active:scale-95 ${
                theme === 'dark' 
                  ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-secondary-bg' 
                  : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-secondary-bg'
              }`}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Quay lại Văn bản
            </Link>
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MobileDocumentListPage; 