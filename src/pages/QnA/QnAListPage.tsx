import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HelpCircle, Search, Plus, User, Calendar, ChevronRight, AlertCircle } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useQuestions } from "@/api/hooks";
import { useLanguage } from "@/context/LanguageContext";
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
import MobileLayout from "@/components/mobile/MobileLayout";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * QnAListPage component for displaying Q&A list with filters and pagination
 */
const QnAListPage: React.FC = () => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  
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

  const { language } = useLanguage();
  // Fetch questions using the API hook
  const { 
    questions, 
    isLoading, 
    isError, 
    error, 
    totalResults, 
    hasQuestions,
    refetch 
  } = useQuestions(searchFilters, language);

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
    return date.toLocaleDateString(language === 'en' ? 'en-GB' : 'vi-VN');
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

  // Mobile layout
  if (isMobile) {
    return (
      <MobileLayout>
        <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
          <main className="flex-1 px-4 py-4 space-y-4">
            {/* Breadcrumb */}
            <div className={`${theme === 'dark' ? 'bg-dseza-dark-secondary/30' : 'bg-dseza-light-secondary/30'} rounded-lg px-2 py-1`}>
              <nav className={`flex items-center space-x-1 text-xs ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                <Link to={`/${language}`} className={`${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'} hover:underline`}>
                  {language === 'en' ? 'Home' : 'Trang chủ'}
                </Link>
                <ChevronRight className="h-2.5 w-2.5" />
                <span className={`${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'} font-medium`}>
                  {language === 'en' ? 'Q&A' : 'Hỏi đáp'}
                </span>
              </nav>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between">
              <h1 className={`${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'} text-xl font-bold`}>{language === 'en' ? 'Q&A List' : 'Danh sách câu hỏi đáp'}</h1>
              <Link to={`/${language}/${language === 'en' ? 'utilities/qna/create' : 'tien-ich/hoi-dap/tao-moi'}`}>
                <Button className={`${theme === 'dark' ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary/80 text-dseza-dark-main-bg' : 'bg-dseza-light-primary hover:bg-dseza-light-primary/80 text-white'} h-9 px-3`}>{language === 'en' ? 'Create' : 'Tạo mới'}</Button>
              </Link>
            </div>

            {/* Filters */}
            <div className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-dseza-light-secondary-bg'} p-3 rounded-lg space-y-3`}>
              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="keyword" className={`${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{language === 'en' ? 'Search content' : 'Nội dung tìm'}</Label>
                  <Input id="keyword" placeholder={language === 'en' ? 'Enter keywords' : 'Nhập từ khóa tìm kiếm'} value={filters.keyword} onChange={(e) => handleFilterChange('keyword', e.target.value)} className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'} h-9`} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="topic" className={`${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{language === 'en' ? 'Topic' : 'Lĩnh vực'}</Label>
                    <Select value={filters.topic} onValueChange={(value) => handleFilterChange('topic', value)}>
                      <SelectTrigger className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text'} h-9`}>
                        <SelectValue placeholder={language === 'en' ? 'Select topic' : 'Chọn lĩnh vực'} />
                      </SelectTrigger>
                      <SelectContent className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text'}`}>
                        <SelectItem value="all">{language === 'en' ? 'All' : 'Tất cả'}</SelectItem>
                        <SelectItem value="thu-tuc-hanh-chinh">{language === 'en' ? 'Administrative procedures' : 'Thủ tục hành chính'}</SelectItem>
                        <SelectItem value="chinh-sach-uu-dai">{language === 'en' ? 'Incentive policies' : 'Chính sách ưu đãi'}</SelectItem>
                        <SelectItem value="quy-hoach-xay-dung">{language === 'en' ? 'Construction planning' : 'Quy hoạch xây dựng'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="dateFrom" className={`${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{language === 'en' ? 'From date' : 'Từ ngày'}</Label>
                    <Input id="dateFrom" type="date" value={filters.dateFrom} onChange={(e) => handleFilterChange('dateFrom', e.target.value)} className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text'} h-9`} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="dateTo" className={`${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{language === 'en' ? 'To date' : 'Đến ngày'}</Label>
                    <Input id="dateTo" type="date" value={filters.dateTo} onChange={(e) => handleFilterChange('dateTo', e.target.value)} className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text'} h-9`} />
                  </div>
                  <div className="flex items-end justify-end">
                    <Button onClick={handleSearch} disabled={isLoading} className={`${theme === 'dark' ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary/80 text-dseza-dark-main-bg' : 'bg-dseza-light-primary hover:bg-dseza-light-primary/80 text-white'} h-9 px-4`}>{isLoading ? (language === 'en' ? 'Searching...' : 'Đang tìm kiếm...') : (language === 'en' ? 'Search' : 'Tìm kiếm')}</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            {isError && (
              <Alert className={`mb-2 ${theme === 'dark' ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'}`}>
                <AlertDescription className={theme === 'dark' ? 'text-red-300' : 'text-red-800'}>
                  {language === 'en' ? 'An error occurred while loading data' : 'Có lỗi xảy ra khi tải dữ liệu'}: {error?.message || (language === 'en' ? 'Please try again later' : 'Vui lòng thử lại sau')}
                </AlertDescription>
              </Alert>
            )}

            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <QuestionSkeleton key={index} />
                ))}
              </div>
            ) : hasQuestions ? (
              <div className="space-y-3">
                {questions.map((question: any) => (
                  <div key={question.id} className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-dseza-light-secondary-bg'} p-3 rounded-lg`}>
                    <Link to={`/${language}/${language === 'en' ? 'utilities/qna' : 'tien-ich/hoi-dap'}/${question.id}`} className={`${theme === 'dark' ? 'text-dseza-dark-main-text hover:text-dseza-dark-primary' : 'text-dseza-light-main-text hover:text-dseza-light-primary'} font-semibold block mb-1`}>
                      {question.attributes?.title || (language === 'en' ? 'Untitled question' : 'Câu hỏi không có tiêu đề')}
                    </Link>
                    {question.attributes?.field_linh_vuc && (
                      <div className="mb-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${theme === 'dark' ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>{question.attributes.field_linh_vuc}</span>
                      </div>
                    )}
                    <div className={`${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'} text-xs`}>{formatDate(question.attributes?.created)}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`text-center py-12 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>{language === 'en' ? 'No questions found' : 'Không tìm thấy câu hỏi nào'}</div>
            )}

            {/* Pagination */}
            {!isLoading && hasQuestions && totalPages > 1 && (
              <div className="flex justify-between items-center text-sm">
                <Button variant="outline" size="sm" disabled={filters.page === 1} onClick={() => handlePageChange(filters.page - 1)}>{language === 'en' ? 'Previous' : 'Trước'}</Button>
                <span className={`${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>{filters.page}/{totalPages}</span>
                <Button variant="outline" size="sm" disabled={filters.page === totalPages} onClick={() => handlePageChange(filters.page + 1)}>{language === 'en' ? 'Next' : 'Sau'}</Button>
              </div>
            )}
          </main>
          <Footer />
        </div>
      </MobileLayout>
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
        <div className={`py-2 ${theme === 'dark' ? 'bg-dseza-dark-secondary/50' : 'bg-dseza-light-secondary/50'}`}>
          <div className="container mx-auto px-4">
            <nav className={`flex items-center space-x-2 text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              <Link 
                to={`/${language}`} 
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {language === 'en' ? 'Home' : 'Trang chủ'}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {language === 'en' ? 'Q&A' : 'Hỏi đáp'}
              </span>
            </nav>
          </div>
        </div>

        {/* QnA Content */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          
          {/* Header Action Area */}
          <div className="flex justify-between items-center mb-8">
            <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
              {language === 'en' ? 'Q&A List' : 'Danh sách câu hỏi đáp'}
            </h1>
            <Link to={`/${language}/${language === 'en' ? 'utilities/qna/create' : 'tien-ich/hoi-dap/tao-moi'}`}>
              <Button 
                className={`flex items-center gap-2 ${theme === 'dark' ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary/80 text-dseza-dark-main-bg' : 'bg-dseza-light-primary hover:bg-dseza-light-primary/80 text-white'}`}
              >
                <Plus className="h-4 w-4" />
                {language === 'en' ? 'Create question' : 'Tạo câu hỏi'}
              </Button>
            </Link>
          </div>

          {/* Filter Area */}
          <div className={`p-6 rounded-lg mb-8 ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-dseza-light-secondary-bg'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Keyword Search */}
              <div className="space-y-2">
                <Label htmlFor="keyword" className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>
                  {language === 'en' ? 'Search content' : 'Nội dung tìm'}
                </Label>
                <Input
                  id="keyword"
                  placeholder={language === 'en' ? 'Enter keywords' : 'Nhập từ khóa tìm kiếm'}
                  value={filters.keyword}
                  onChange={(e) => handleFilterChange("keyword", e.target.value)}
                  className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'}`}
                />
              </div>

              {/* Topic Filter */}
              <div className="space-y-2">
                <Label htmlFor="topic" className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>
                  {language === 'en' ? 'Topic' : 'Lĩnh vực'}
                </Label>
                <Select value={filters.topic} onValueChange={(value) => handleFilterChange("topic", value)}>
                  <SelectTrigger className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text'}`}>
                    <SelectValue placeholder={language === 'en' ? 'Select topic' : 'Chọn lĩnh vực'} />
                  </SelectTrigger>
                  <SelectContent className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text'}`}>
                    <SelectItem value="all">{language === 'en' ? 'All' : 'Tất cả'}</SelectItem>
                    <SelectItem value="thu-tuc-hanh-chinh">{language === 'en' ? 'Administrative procedures' : 'Thủ tục hành chính'}</SelectItem>
                    <SelectItem value="chinh-sach-uu-dai">{language === 'en' ? 'Incentive policies' : 'Chính sách ưu đãi'}</SelectItem>
                    <SelectItem value="quy-hoach-xay-dung">{language === 'en' ? 'Construction planning' : 'Quy hoạch xây dựng'}</SelectItem>
                    <SelectItem value="chinh-sach-lao-dong">{language === 'en' ? 'Labor policies' : 'Chính sách lao động'}</SelectItem>
                    <SelectItem value="giay-phep-kinh-doanh">{language === 'en' ? 'Business license' : 'Giấy phép kinh doanh'}</SelectItem>
                    <SelectItem value="ho-tro-khoi-nghiep">{language === 'en' ? 'Startup support' : 'Hỗ trợ khởi nghiệp'}</SelectItem>
                    <SelectItem value="ha-tang-ky-thuat">{language === 'en' ? 'Technical infrastructure' : 'Hạ tầng kỹ thuật'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date From */}
              <div className="space-y-2">
                <Label htmlFor="dateFrom" className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>
                  {language === 'en' ? 'From date' : 'Thời gian từ ngày'}
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
                  {language === 'en' ? 'To date' : 'Đến ngày'}
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
                {isLoading ? (language === 'en' ? 'Searching...' : 'Đang tìm kiếm...') : (language === 'en' ? 'Search' : 'Tìm kiếm')}
              </Button>
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-6">
            
            {/* Questions Title */}
            <h2 className={`text-2xl font-semibold mb-6 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
              {language === 'en' ? 'QUESTIONS' : 'CÂU HỎI'}
            </h2>

            {/* Error State */}
            {isError && (
              <Alert className={`mb-6 ${theme === 'dark' ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'}`}>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className={theme === 'dark' ? 'text-red-300' : 'text-red-800'}>
                  {language === 'en' ? 'An error occurred while loading data' : 'Có lỗi xảy ra khi tải dữ liệu'}: {error?.message || (language === 'en' ? 'Please try again later' : 'Vui lòng thử lại sau')}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => refetch()} 
                    className="ml-2"
                  >
                    {language === 'en' ? 'Retry' : 'Thử lại'}
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {/* Results Count */}
            {!isLoading && (
              <div className={`text-sm mb-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                {totalResults > 0 
                  ? (language === 'en' ? `Showing ${totalResults} questions` : `Hiển thị ${totalResults} câu hỏi`) 
                  : (language === 'en' ? 'No questions found' : 'Không tìm thấy câu hỏi nào')}
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
                        to={`/${language}/${language === 'en' ? 'utilities/qna' : 'tien-ich/hoi-dap'}/${question.id}`}
                        className={`font-bold block mb-2 leading-tight transition-colors ${theme === 'dark' ? 'text-dseza-dark-main-text hover:text-dseza-dark-primary' : 'text-dseza-light-main-text hover:text-dseza-light-primary'}`}
                      >
                        {question.attributes?.title || (language === 'en' ? 'Untitled question' : 'Câu hỏi không có tiêu đề')}
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
                        {question.attributes?.field_nguoi_gui && (
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{language === 'en' ? 'Sender' : 'Người gửi'}: {question.attributes.field_nguoi_gui}</span>
                          </div>
                        )}
                        {question.attributes?.field_nguoi_gui && question.attributes?.created && (
                          <span className="hidden sm:inline">|</span>
                        )}
                        {question.attributes?.created && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{language === 'en' ? 'Submitted' : 'Ngày gửi'}: {formatDate(question.attributes.created)}</span>
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
                            {question.attributes.field_trang_thai === "answered"
                              ? (language === 'en' ? 'Answered' : 'Đã trả lời')
                              : (question.attributes.field_trang_thai || (language === 'en' ? 'Processing' : 'Đang xử lý'))}
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
                  {language === 'en' ? 'No questions found' : 'Không tìm thấy câu hỏi nào'}
                </h3>
                <p className="mb-4">{language === 'en' ? 'Try changing filters or create a new question' : 'Hãy thử thay đổi bộ lọc tìm kiếm hoặc tạo câu hỏi mới'}</p>
                <Link to={`/${language}/${language === 'en' ? 'utilities/qna/create' : 'tien-ich/hoi-dap/tao-moi'}`}>
                  <Button className={`${theme === 'dark' ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary/80 text-dseza-dark-main-bg' : 'bg-dseza-light-primary hover:bg-dseza-light-primary/80 text-white'}`}>
                    <Plus className="h-4 w-4 mr-2" />
                    {language === 'en' ? 'Create the first question' : 'Tạo câu hỏi đầu tiên'}
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


          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default QnAListPage; 