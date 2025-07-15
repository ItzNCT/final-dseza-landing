import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HelpCircle, Search, Plus, User, Calendar, ChevronRight, AlertCircle } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useQuestions } from "@/api/hooks";
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Alert, AlertDescription } from "@/components/ui/alert";

/**
 * QnAListPage component for displaying Q&A list with filters and pagination
 */
const QnAListPage: React.FC = () => {
  const { theme } = useTheme();
  
  // Filter state management
  const [filters, setFilters] = useState({
    keyword: "",
    topic: "all",
    dateFrom: "",
    dateTo: "",
    page: 1,
    pageSize: 6,
  });

  // Debounced search state to avoid excessive API calls
  const [searchFilters, setSearchFilters] = useState(filters);

  // Fetch questions using the API hook
  const { 
    questions, 
    isLoading, 
    isError, 
    error, 
    totalResults, 
    hasQuestions,
    refetch 
  } = useQuestions(searchFilters);

  // Handle filter changes
  const handleFilterChange = (field: keyof typeof filters, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
      // Reset to page 1 when changing filters
      ...(field !== 'page' && { page: 1 })
    }));
  };

  // Handle search button click
  const handleSearch = () => {
    setSearchFilters({ ...filters });
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    const newFilters = { ...filters, page };
    setFilters(newFilters);
    setSearchFilters(newFilters);
  };

  // Calculate pagination
  const totalPages = Math.ceil(totalResults / filters.pageSize);

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  // Skeleton loading component
  const QuestionSkeleton = () => (
    <div className={`p-4 flex items-start gap-4 rounded-lg ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-dseza-light-secondary-bg'}`}>
      <Skeleton className="h-6 w-6 rounded-full mt-1" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex gap-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
      {/* Header - Complete header structure */}
      <TopBar />
      <LogoSearchBar />
      <NavigationBar />
      
      {/* Main Content */}
      <main className="flex-1 pt-52">
        {/* Breadcrumb */}
        <div className={`py-2 ${theme === 'dark' ? 'bg-dseza-dark-secondary/50' : 'bg-dseza-light-secondary/50'}`}>
          <div className="container mx-auto px-4">
            <nav className={`flex items-center space-x-2 text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              <Link 
                to="/" 
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Trang chủ
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Hỏi đáp
              </span>
            </nav>
          </div>
        </div>

        {/* QnA Content */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          
          {/* Header Action Area */}
          <div className="flex justify-between items-center mb-8">
            <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
              Danh sách câu hỏi đáp
            </h1>
            <Link to="/tien-ich/hoi-dap/tao-moi">
              <Button 
                className={`flex items-center gap-2 ${theme === 'dark' ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary/80 text-dseza-dark-main-bg' : 'bg-dseza-light-primary hover:bg-dseza-light-primary/80 text-white'}`}
              >
                <Plus className="h-4 w-4" />
                Tạo câu hỏi
              </Button>
            </Link>
          </div>

          {/* Filter Area */}
          <div className={`p-6 rounded-lg mb-8 ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-dseza-light-secondary-bg'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Keyword Search */}
              <div className="space-y-2">
                <Label htmlFor="keyword" className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>
                  Nội dung tìm
                </Label>
                <Input
                  id="keyword"
                  placeholder="Nhập từ khóa tìm kiếm"
                  value={filters.keyword}
                  onChange={(e) => handleFilterChange("keyword", e.target.value)}
                  className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'}`}
                />
              </div>

              {/* Topic Filter */}
              <div className="space-y-2">
                <Label htmlFor="topic" className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>
                  Lĩnh vực
                </Label>
                <Select value={filters.topic} onValueChange={(value) => handleFilterChange("topic", value)}>
                  <SelectTrigger className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text'}`}>
                    <SelectValue placeholder="Chọn lĩnh vực" />
                  </SelectTrigger>
                  <SelectContent className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text'}`}>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="thu-tuc-hanh-chinh">Thủ tục hành chính</SelectItem>
                    <SelectItem value="chinh-sach-uu-dai">Chính sách ưu đãi</SelectItem>
                    <SelectItem value="quy-hoach-xay-dung">Quy hoạch xây dựng</SelectItem>
                    <SelectItem value="chinh-sach-lao-dong">Chính sách lao động</SelectItem>
                    <SelectItem value="giay-phep-kinh-doanh">Giấy phép kinh doanh</SelectItem>
                    <SelectItem value="ho-tro-khoi-nghiep">Hỗ trợ khởi nghiệp</SelectItem>
                    <SelectItem value="ha-tang-ky-thuat">Hạ tầng kỹ thuật</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date From */}
              <div className="space-y-2">
                <Label htmlFor="dateFrom" className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>
                  Thời gian từ ngày
                </Label>
                <Input
                  id="dateFrom"
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
                  className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text'}`}
                />
              </div>

              {/* Date To */}
              <div className="space-y-2">
                <Label htmlFor="dateTo" className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>
                  Đến ngày
                </Label>
                <Input
                  id="dateTo"
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange("dateTo", e.target.value)}
                  className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text'}`}
                />
              </div>

            </div>

            {/* Search Button */}
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={handleSearch} 
                disabled={isLoading}
                className={`px-8 ${theme === 'dark' ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary/80 text-dseza-dark-main-bg' : 'bg-dseza-light-primary hover:bg-dseza-light-primary/80 text-white'}`}
              >
                <Search className="h-4 w-4 mr-2" />
                {isLoading ? 'Đang tìm kiếm...' : 'Tìm kiếm'}
              </Button>
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-6">
            
            {/* Questions Title */}
            <h2 className={`text-2xl font-semibold mb-6 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
              CÂU HỎI
            </h2>

            {/* Error State */}
            {isError && (
              <Alert className={`mb-6 ${theme === 'dark' ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'}`}>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className={theme === 'dark' ? 'text-red-300' : 'text-red-800'}>
                  Có lỗi xảy ra khi tải dữ liệu: {error?.message || 'Vui lòng thử lại sau'}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => refetch()} 
                    className="ml-2"
                  >
                    Thử lại
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {/* Results Count */}
            {!isLoading && (
              <div className={`text-sm mb-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                {totalResults > 0 ? `Hiển thị ${totalResults} câu hỏi` : 'Không tìm thấy câu hỏi nào'}
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <QuestionSkeleton key={index} />
                ))}
              </div>
            )}

            {/* Questions Grid */}
            {!isLoading && hasQuestions && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {questions.map((question: any) => (
                  <div 
                    key={question.id} 
                    className={`p-4 flex items-start gap-4 rounded-lg hover:shadow-md transition-shadow ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-dseza-light-secondary-bg'}`}
                  >
                    <div className="flex-shrink-0">
                      <HelpCircle className={`h-6 w-6 mt-1 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      {/* Question Link */}
                      <Link 
                        to={`/tien-ich/hoi-dap/${question.id}`}
                        className={`font-bold block mb-2 leading-tight transition-colors ${theme === 'dark' ? 'text-dseza-dark-main-text hover:text-dseza-dark-primary' : 'text-dseza-light-main-text hover:text-dseza-light-primary'}`}
                      >
                        {question.attributes?.title || 'Câu hỏi không có tiêu đề'}
                      </Link>

                      {/* Category Badge */}
                      {question.attributes?.field_linh_vuc && (
                        <div className="mb-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${theme === 'dark' ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
                            {question.attributes.field_linh_vuc}
                          </span>
                        </div>
                      )}

                      {/* Sender and Date Info */}
                      <div className={`flex flex-col sm:flex-row sm:items-center gap-2 text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                        {question.attributes?.field_ten_nguoi_gui && (
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>Người gửi: {question.attributes.field_ten_nguoi_gui}</span>
                          </div>
                        )}
                        {question.attributes?.field_ten_nguoi_gui && question.attributes?.created && (
                          <span className="hidden sm:inline">|</span>
                        )}
                        {question.attributes?.created && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>Ngày gửi: {formatDate(question.attributes.created)}</span>
                          </div>
                        )}
                      </div>

                      {/* Status */}
                      {question.attributes?.field_trang_thai && (
                        <div className="mt-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            question.attributes.field_trang_thai === "answered" || question.attributes.field_trang_thai === "Đã trả lời"
                              ? (theme === 'dark' ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800')
                              : (theme === 'dark' ? 'bg-yellow-900/50 text-yellow-300' : 'bg-yellow-100 text-yellow-800')
                          }`}>
                            {question.attributes.field_trang_thai === "answered" ? "Đã trả lời" : (question.attributes.field_trang_thai || "Đang xử lý")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !hasQuestions && !isError && (
              <div className={`text-center py-12 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                <HelpCircle className={`h-16 w-16 mx-auto mb-4 ${theme === 'dark' ? 'text-dseza-dark-secondary' : 'text-dseza-light-secondary'}`} />
                <h3 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  Không tìm thấy câu hỏi nào
                </h3>
                <p className="mb-4">Hãy thử thay đổi bộ lọc tìm kiếm hoặc tạo câu hỏi mới</p>
                <Link to="/tien-ich/hoi-dap/tao-moi">
                  <Button className={`${theme === 'dark' ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary/80 text-dseza-dark-main-bg' : 'bg-dseza-light-primary hover:bg-dseza-light-primary/80 text-white'}`}>
                    <Plus className="h-4 w-4 mr-2" />
                    Tạo câu hỏi đầu tiên
                  </Button>
                </Link>
              </div>
            )}

            {/* Pagination */}
            {!isLoading && hasQuestions && totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          if (filters.page > 1) handlePageChange(filters.page - 1);
                        }}
                        className={`${filters.page === 1 ? 'pointer-events-none opacity-50' : ''} ${theme === 'dark' ? 'text-dseza-dark-main-text hover:text-dseza-dark-primary' : 'text-dseza-light-main-text hover:text-dseza-light-primary'}`}
                      />
                    </PaginationItem>
                    
                    <PaginationItem>
                      <PaginationLink 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(1);
                        }}
                        isActive={filters.page === 1}
                        className={`${filters.page === 1 ? (theme === 'dark' ? 'bg-dseza-dark-primary text-dseza-dark-main-bg' : 'bg-dseza-light-primary text-white') : (theme === 'dark' ? 'text-dseza-dark-main-text hover:text-dseza-dark-primary' : 'text-dseza-light-main-text hover:text-dseza-light-primary')}`}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    
                    {totalPages > 1 && (
                      <PaginationItem>
                        <PaginationLink 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(2);
                          }}
                          isActive={filters.page === 2}
                          className={`${filters.page === 2 ? (theme === 'dark' ? 'bg-dseza-dark-primary text-dseza-dark-main-bg' : 'bg-dseza-light-primary text-white') : (theme === 'dark' ? 'text-dseza-dark-main-text hover:text-dseza-dark-primary' : 'text-dseza-light-main-text hover:text-dseza-light-primary')}`}
                        >
                          2
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    
                    {totalPages > 2 && (
                      <>
                        <PaginationItem>
                          <PaginationEllipsis className={theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'} />
                        </PaginationItem>
                        
                        <PaginationItem>
                          <PaginationLink 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(totalPages);
                            }}
                            isActive={filters.page === totalPages}
                            className={`${filters.page === totalPages ? (theme === 'dark' ? 'bg-dseza-dark-primary text-dseza-dark-main-bg' : 'bg-dseza-light-primary text-white') : (theme === 'dark' ? 'text-dseza-dark-main-text hover:text-dseza-dark-primary' : 'text-dseza-light-main-text hover:text-dseza-light-primary')}`}
                          >
                            {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      </>
                    )}
                    
                    <PaginationItem>
                      <PaginationNext 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          if (filters.page < totalPages) handlePageChange(filters.page + 1);
                        }}
                        className={`${filters.page === totalPages ? 'pointer-events-none opacity-50' : ''} ${theme === 'dark' ? 'text-dseza-dark-main-text hover:text-dseza-dark-primary' : 'text-dseza-light-main-text hover:text-dseza-light-primary'}`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}

            {/* Statistics Summary */}
            {!isLoading && hasQuestions && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                  <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-800'}`}>
                    Tổng câu hỏi
                  </h3>
                  <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                    {totalResults}
                  </p>
                </div>
                
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                  <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-green-300' : 'text-green-800'}`}>
                    Đã trả lời
                  </h3>
                  <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                    {questions.filter((q: any) => q.attributes?.field_trang_thai === "answered" || q.attributes?.field_trang_thai === "Đã trả lời").length}
                  </p>
                </div>
                
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
                  <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-800'}`}>
                    Đang xử lý
                  </h3>
                  <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>
                    {questions.filter((q: any) => q.attributes?.field_trang_thai !== "answered" && q.attributes?.field_trang_thai !== "Đã trả lời").length}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default QnAListPage; 