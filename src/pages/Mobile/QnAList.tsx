import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronRight, ChevronLeft, Loader2, Filter, MessageSquare, Plus, X } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useTheme } from "@/context/ThemeContext";
import Footer from "@/components/Footer";
import MobileQnACard from "@/components/mobile/MobileQnACard";

// Mock hook for Q&A data - replace with actual hook when available
const useQnAList = (filters: any) => {
  // Mock data - replace with real API call
  const mockQnA = [
    {
      id: "1",
      title: "Thủ tục đăng ký thành lập doanh nghiệp trong KCN có gì khác biệt?",
      excerpt: "Tôi muốn biết quy trình đăng ký thành lập doanh nghiệp trong khu công nghiệp có những điểm khác biệt gì so với đăng ký thông thường không?",
      author: "Nguyễn Văn A",
      status: "answered",
      created_date: "2024-01-15",
      answer_count: 2,
      category: "Thủ tục hành chính",
      is_answered: true,
      view_url: "/tien-ich/hoi-dap/1",
    },
    {
      id: "2",
      title: "Chính sách ưu đãi đầu tư cho doanh nghiệp công nghệ cao?",
      excerpt: "Xin cho biết các chính sách ưu đãi cụ thể về thuế, đất đai cho các doanh nghiệp hoạt động trong lĩnh vực công nghệ cao.",
      author: "Trần Thị B",
      status: "pending",
      created_date: "2024-01-12",
      answer_count: 0,
      category: "Chính sách đầu tư",
      is_answered: false,
      view_url: "/tien-ich/hoi-dap/2",
    },
    {
      id: "3",
      title: "Quy định về môi trường trong các khu công nghiệp",
      excerpt: "Các quy định về bảo vệ môi trường mà doanh nghiệp cần tuân thủ khi hoạt động trong KCN như thế nào?",
      author: "Lê Văn C",
      status: "new",
      created_date: "2024-01-10",
      answer_count: 1,
      category: "Môi trường",
      is_answered: false,
      view_url: "/tien-ich/hoi-dap/3",
    },
  ];

  return {
    data: mockQnA,
    isLoading: false,
    isError: false,
    error: null,
    totalResults: mockQnA.length,
  };
};

/**
 * Mobile-optimized Q&A List Page
 * 
 * Displays user-submitted questions in a vertical list format optimized for mobile screens
 * Features search functionality and category filtering for mobile devices
 */
const MobileQnAListPage: React.FC = () => {
  const { theme } = useTheme();
  
  const [filters, setFilters] = useState({
    keyword: "",
    category: "",
    status: "",
    page: 1,
    pageSize: 10,
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch Q&A data using the hook
  const { data: qnaList, isLoading, isError, error, totalResults } = useQnAList(filters);

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
      category: "",
      status: "",
      page: 1,
      pageSize: 10,
    });
  };

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
                Đang tải câu hỏi...
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
              <p className="text-sm">Không thể tải câu hỏi. Vui lòng thử lại sau.</p>
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
              to="/tien-ich" 
              className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
            >
              Tiện ích
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
              Hỏi đáp
            </span>
          </nav>
        </div>

        {/* Page Header */}
        <div className="text-center py-4">
          <h1 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
            Hỏi đáp
          </h1>
          <div className={`w-16 h-1 mx-auto mb-3 rounded-full ${theme === 'dark' ? 'bg-dseza-dark-primary' : 'bg-dseza-light-primary'}`}></div>
          <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
            Câu hỏi từ cộng đồng và phản hồi
          </p>
        </div>

        {/* Add Question Button */}
        <div className="flex justify-center">
          <Button
            asChild
            className={`h-12 px-6 ${
              theme === 'dark' 
                ? 'bg-dseza-dark-primary text-dseza-dark-main-bg hover:bg-dseza-dark-primary/80' 
                : 'bg-dseza-light-primary text-white hover:bg-dseza-light-primary/80'
            }`}
          >
            <Link to="/tien-ich/hoi-dap/tao-moi">
              <Plus className="h-4 w-4 mr-2" />
              Đặt câu hỏi mới
            </Link>
          </Button>
        </div>

        {/* Mobile Search and Filter */}
        <div className="space-y-4">
          
          {/* Search Bar */}
          <div className="relative">
            <Input
              placeholder="Tìm kiếm câu hỏi..."
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
                  {(filters.category || filters.status) && (
                    <Badge variant="secondary" className="ml-2">
                      {[filters.category, filters.status].filter(Boolean).length}
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
                      <SelectItem value="thu-tuc-hanh-chinh">Thủ tục hành chính</SelectItem>
                      <SelectItem value="chinh-sach-dau-tu">Chính sách đầu tư</SelectItem>
                      <SelectItem value="moi-truong">Môi trường</SelectItem>
                      <SelectItem value="tai-chinh">Tài chính</SelectItem>
                      <SelectItem value="nhan-su">Nhân sự</SelectItem>
                      <SelectItem value="khac">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status Filter */}
                <div className="space-y-2">
                  <Label className={`text-sm font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                    Trạng thái
                  </Label>
                  <Select onValueChange={(value) => handleFilterChange("status", value)} value={filters.status || "all"}>
                    <SelectTrigger className={`h-11 ${
                      theme === 'dark' 
                        ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text' 
                        : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text'
                    }`}>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent className={`${
                      theme === 'dark' 
                        ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' 
                        : 'bg-white border-dseza-light-border'
                    }`}>
                      <SelectItem value="all">Tất cả trạng thái</SelectItem>
                      <SelectItem value="answered">Đã trả lời</SelectItem>
                      <SelectItem value="pending">Chờ phản hồi</SelectItem>
                      <SelectItem value="new">Mới</SelectItem>
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
        {qnaList && qnaList.length > 0 && (
          <div className="flex items-center justify-between py-2">
            <Badge 
              variant="secondary" 
              className={`px-3 py-1 text-sm ${
                theme === 'dark' 
                  ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary border-dseza-dark-primary/30' 
                  : 'bg-dseza-light-primary/20 text-dseza-light-primary border-dseza-light-primary/30'
              }`}
            >
              <MessageSquare className="h-3 w-3 mr-1" />
              {qnaList.length} câu hỏi
            </Badge>
            
            {/* Answered questions count */}
            {qnaList.filter((q: any) => q.is_answered).length > 0 && (
              <Badge 
                variant="secondary" 
                className={`px-2 py-1 text-xs ${
                  theme === 'dark' 
                    ? 'bg-green-900/20 text-green-300 border-green-400/30' 
                    : 'bg-green-100/80 text-green-800 border-green-300/30'
                }`}
              >
                {qnaList.filter((q: any) => q.is_answered).length} đã trả lời
              </Badge>
            )}
          </div>
        )}
        
        {/* Q&A List */}
        {qnaList && qnaList.length > 0 ? (
          <div className="space-y-4">
            {qnaList.map((qna: any) => (
              <MobileQnACard
                key={qna.id}
                qna={qna}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <div className={`mb-6 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              <div className="w-16 h-16 mx-auto mb-4 opacity-50">
                <MessageSquare className="w-full h-full" />
              </div>
              <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Chưa có câu hỏi nào
              </h3>
              <p className="text-sm mb-4">
                Hãy là người đầu tiên đặt câu hỏi cho cộng đồng.
              </p>
              <Button 
                asChild
                className={`${
                  theme === 'dark' 
                    ? 'bg-dseza-dark-primary text-dseza-dark-main-bg hover:bg-dseza-dark-primary/80' 
                    : 'bg-dseza-light-primary text-white hover:bg-dseza-light-primary/80'
                }`}
              >
                <Link to="/tien-ich/hoi-dap/tao-moi">
                  <Plus className="h-4 w-4 mr-2" />
                  Đặt câu hỏi đầu tiên
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="pt-6 space-y-3">
          <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
            Liên kết hữu ích
          </h3>
          <div className="space-y-2">
            <Link 
              to="/tien-ich/cau-hoi-thuong-gap"
              className={`block px-4 py-3 rounded-lg border font-medium transition-all duration-200 active:scale-95 ${
                theme === 'dark' 
                  ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-secondary-bg' 
                  : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-secondary-bg'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>Câu hỏi thường gặp</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </Link>
          </div>
        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MobileQnAListPage; 