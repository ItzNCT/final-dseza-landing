import React, { useState } from "react";
import { HelpCircle, Search, Plus, User, Calendar, ChevronRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

/**
 * QnAListPage component for displaying Q&A list with filters and pagination
 */
const QnAListPage: React.FC = () => {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    content: "",
    category: "",
    dateFrom: "",
    dateTo: "",
  });

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    console.log("Searching with filters:", filters);
    // Implement search logic here
  };

  const handleCreateQuestion = () => {
    console.log("Creating new question");
    // Implement create question logic here
  };

  // Sample Q&A data
  const qaData = [
    {
      id: 1,
      question: "Làm thế nào để đăng ký doanh nghiệp tại Khu Kinh tế Đà Nẵng?",
      sender: "Nguyễn Văn Minh",
      sendDate: "15/07/2025",
      category: "Thủ tục hành chính",
      status: "Đã trả lời"
    },
    {
      id: 2,
      question: "Các ưu đãi đầu tư dành cho doanh nghiệp công nghệ cao là gì?",
      sender: "Lê Thị Phương Nhi",
      sendDate: "06/03/2019",
      category: "Chính sách ưu đãi",
      status: "Đã trả lời"
    },
    {
      id: 3,
      question: "Quy trình xin phép xây dựng nhà máy trong khu công nghiệp?",
      sender: "Trần Đức Long",
      sendDate: "22/06/2025",
      category: "Quy hoạch xây dựng",
      status: "Đang xử lý"
    },
    {
      id: 4,
      question: "Chính sách hỗ trợ nhà ở cho công nhân lao động như thế nào?",
      sender: "Phạm Thị Mai",
      sendDate: "08/07/2025",
      category: "Chính sách lao động",
      status: "Đã trả lời"
    },
    {
      id: 5,
      question: "Thủ tục xin cấp giấy phép hoạt động sản xuất kinh doanh?",
      sender: "Hoàng Văn Tùng",
      sendDate: "29/06/2025",
      category: "Giấy phép kinh doanh",
      status: "Đã trả lời"
    },
    {
      id: 6,
      question: "Làm sao để tiếp cận các chương trình hỗ trợ khởi nghiệp?",
      sender: "Vũ Thị Lan",
      sendDate: "12/07/2025",
      category: "Hỗ trợ khởi nghiệp",
      status: "Đang xử lý"
    }
  ];

  const totalQuestions = qaData.length;
  const questionsPerPage = 6;
  const totalPages = Math.ceil(totalQuestions / questionsPerPage);

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
              <a 
                href="/" 
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Trang chủ
              </a>
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
            <Button 
              onClick={handleCreateQuestion} 
              className={`flex items-center gap-2 ${theme === 'dark' ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary/80 text-dseza-dark-main-bg' : 'bg-dseza-light-primary hover:bg-dseza-light-primary/80 text-white'}`}
            >
              <Plus className="h-4 w-4" />
              Tạo câu hỏi
            </Button>
          </div>

          {/* Filter Area */}
          <div className={`p-6 rounded-lg mb-8 ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-dseza-light-secondary-bg'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Content Search */}
              <div className="space-y-2">
                <Label htmlFor="content" className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>
                  Nội dung tìm
                </Label>
                <Input
                  id="content"
                  placeholder="Nhập từ khóa tìm kiếm"
                  value={filters.content}
                  onChange={(e) => handleFilterChange("content", e.target.value)}
                  className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'}`}
                />
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <Label htmlFor="category" className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>
                  Lĩnh vực
                </Label>
                <Select onValueChange={(value) => handleFilterChange("category", value)}>
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
                className={`px-8 ${theme === 'dark' ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary/80 text-dseza-dark-main-bg' : 'bg-dseza-light-primary hover:bg-dseza-light-primary/80 text-white'}`}
              >
                <Search className="h-4 w-4 mr-2" />
                Tìm kiếm
              </Button>
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-6">
            
            {/* Questions Title */}
            <h2 className={`text-2xl font-semibold mb-6 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
              CÂU HỎI
            </h2>

            {/* Results Count */}
            <div className={`text-sm mb-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              Hiển thị {totalQuestions} câu hỏi
            </div>

            {/* Questions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {qaData.map((qa) => (
                <div 
                  key={qa.id} 
                  className={`p-4 flex items-start gap-4 rounded-lg hover:shadow-md transition-shadow ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-dseza-light-secondary-bg'}`}
                >
                  <div className="flex-shrink-0">
                    <HelpCircle className={`h-6 w-6 mt-1 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    {/* Question Link */}
                    <a 
                      href={`/qna/${qa.id}`}
                      className={`font-bold block mb-2 leading-tight transition-colors ${theme === 'dark' ? 'text-dseza-dark-main-text hover:text-dseza-dark-primary' : 'text-dseza-light-main-text hover:text-dseza-light-primary'}`}
                    >
                      {qa.question}
                    </a>

                    {/* Category Badge */}
                    <div className="mb-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${theme === 'dark' ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
                        {qa.category}
                      </span>
                    </div>

                    {/* Sender and Date Info */}
                    <div className={`flex flex-col sm:flex-row sm:items-center gap-2 text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>Người gửi: {qa.sender}</span>
                      </div>
                      <span className="hidden sm:inline">|</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Ngày gửi: {qa.sendDate}</span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="mt-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        qa.status === "Đã trả lời" 
                          ? (theme === 'dark' ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800')
                          : (theme === 'dark' ? 'bg-yellow-900/50 text-yellow-300' : 'bg-yellow-100 text-yellow-800')
                      }`}>
                        {qa.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                      }}
                      className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : ''} ${theme === 'dark' ? 'text-dseza-dark-main-text hover:text-dseza-dark-primary' : 'text-dseza-light-main-text hover:text-dseza-light-primary'}`}
                    />
                  </PaginationItem>
                  
                  <PaginationItem>
                    <PaginationLink 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(1);
                      }}
                      isActive={currentPage === 1}
                      className={`${currentPage === 1 ? (theme === 'dark' ? 'bg-dseza-dark-primary text-dseza-dark-main-bg' : 'bg-dseza-light-primary text-white') : (theme === 'dark' ? 'text-dseza-dark-main-text hover:text-dseza-dark-primary' : 'text-dseza-light-main-text hover:text-dseza-light-primary')}`}
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
                          setCurrentPage(2);
                        }}
                        isActive={currentPage === 2}
                        className={`${currentPage === 2 ? (theme === 'dark' ? 'bg-dseza-dark-primary text-dseza-dark-main-bg' : 'bg-dseza-light-primary text-white') : (theme === 'dark' ? 'text-dseza-dark-main-text hover:text-dseza-dark-primary' : 'text-dseza-light-main-text hover:text-dseza-light-primary')}`}
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
                            setCurrentPage(totalPages);
                          }}
                          isActive={currentPage === totalPages}
                          className={`${currentPage === totalPages ? (theme === 'dark' ? 'bg-dseza-dark-primary text-dseza-dark-main-bg' : 'bg-dseza-light-primary text-white') : (theme === 'dark' ? 'text-dseza-dark-main-text hover:text-dseza-dark-primary' : 'text-dseza-light-main-text hover:text-dseza-light-primary')}`}
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
                        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                      }}
                      className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''} ${theme === 'dark' ? 'text-dseza-dark-main-text hover:text-dseza-dark-primary' : 'text-dseza-light-main-text hover:text-dseza-light-primary'}`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

            {/* Statistics Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-800'}`}>
                  Tổng câu hỏi
                </h3>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                  {totalQuestions}
                </p>
              </div>
              
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-green-300' : 'text-green-800'}`}>
                  Đã trả lời
                </h3>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                  {qaData.filter(qa => qa.status === "Đã trả lời").length}
                </p>
              </div>
              
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
                <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-800'}`}>
                  Đang xử lý
                </h3>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>
                  {qaData.filter(qa => qa.status === "Đang xử lý").length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default QnAListPage; 