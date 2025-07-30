import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronRight, ChevronDown, Loader2, HelpCircle, MessageSquare, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTheme } from "@/context/ThemeContext";
import Footer from "@/components/Footer";

// Mock hook for FAQ data - replace with actual hook when available
const useFAQ = (filters: any) => {
  // Mock FAQ data - replace with real API call
  const mockFAQ = [
    {
      id: "1",
      question: "Làm thế nào để đăng ký thành lập doanh nghiệp trong khu công nghiệp?",
      answer: "Để đăng ký thành lập doanh nghiệp trong khu công nghiệp, bạn cần thực hiện các bước sau:\n\n1. Chuẩn bị hồ sơ theo quy định\n2. Nộp hồ sơ tại cơ quan có thẩm quyền\n3. Chờ kết quả thẩm định\n4. Nhận giấy phép và hoàn tất thủ tục\n\nThời gian xử lý thường từ 15-20 ngày làm việc.",
      category: "Thủ tục hành chính",
      is_featured: true,
      view_count: 1250,
    },
    {
      id: "2", 
      question: "Các chính sách ưu đãi đầu tư hiện tại có gì?",
      answer: "Hiện tại có các chính sách ưu đãi sau:\n\n• Miễn giảm thuế thu nhập doanh nghiệp\n• Ưu đãi về tiền thuê đất\n• Hỗ trợ đào tạo nhân lực\n• Hỗ trợ về hạ tầng kỹ thuật\n\nCụ thể mức ưu đãi phụ thuộc vào lĩnh vực và quy mô đầu tư.",
      category: "Chính sách đầu tư",
      is_featured: true,
      view_count: 980,
    },
    {
      id: "3",
      question: "Quy định về bảo vệ môi trường trong khu công nghiệp?",
      answer: "Các doanh nghiệp hoạt động trong KCN cần tuân thủ:\n\n• Xây dựng và vận hành hệ thống xử lý chất thải\n• Thực hiện giám sát môi trường định kỳ\n• Báo cáo tình hình môi trường hàng quý\n• Đóng phí bảo vệ môi trường theo quy định\n\nVi phạm có thể bị phạt hành chính hoặc đình chỉ hoạt động.",
      category: "Môi trường",
      is_featured: false,
      view_count: 567,
    },
    {
      id: "4",
      question: "Thủ tục xuất nhập khẩu hàng hóa có đơn giản không?",
      answer: "Hiện tại các KCN đã áp dụng nhiều cơ chế thuận lợi:\n\n• Thủ tục một cửa điện tử\n• Kiểm tra chuyên ngành đồng thời\n• Ưu tiên thông quan hàng hóa xuất khẩu\n• Hỗ trợ 24/7 cho các lô hàng khẩn cấp\n\nThời gian thông quan trung bình giảm từ 3-5 ngày xuống còn 1-2 ngày.",
      category: "Thủ tục hành chính",
      is_featured: false,
      view_count: 423,
    },
    {
      id: "5",
      question: "Có những dịch vụ hỗ trợ doanh nghiệp nào?",
      answer: "Ban quản lý cung cấp các dịch vụ:\n\n• Tư vấn pháp lý miễn phí\n• Hỗ trợ kết nối đối tác kinh doanh\n• Đào tạo kỹ năng cho nhân viên\n• Tổ chức các sự kiện networking\n• Hỗ trợ tiếp thị sản phẩm\n\nCác dịch vụ này nhằm giúp doanh nghiệp phát triển bền vững.",
      category: "Dịch vụ hỗ trợ",
      is_featured: false,
      view_count: 356,
    },
  ];

  // Filter by search keyword
  let filteredFAQ = mockFAQ;
  if (filters.keyword) {
    filteredFAQ = mockFAQ.filter(faq => 
      faq.question.toLowerCase().includes(filters.keyword.toLowerCase()) ||
      faq.answer.toLowerCase().includes(filters.keyword.toLowerCase())
    );
  }

  return {
    data: filteredFAQ,
    isLoading: false,
    isError: false,
    error: null,
    totalResults: filteredFAQ.length,
  };
};

/**
 * Mobile-optimized FAQ Page
 * 
 * Displays frequently asked questions in an accordion format optimized for mobile screens
 * Features search functionality for quick access to relevant information
 */
const MobileFaqPage: React.FC = () => {
  const { theme } = useTheme();
  
  const [filters, setFilters] = useState({
    keyword: "",
  });

  // Fetch FAQ data using the hook
  const { data: faqList, isLoading, isError, error, totalResults } = useFAQ(filters);

  const handleSearch = (keyword: string) => {
    setFilters({ keyword });
  };

  const clearSearch = () => {
    setFilters({ keyword: "" });
  };

  // Featured FAQs (for quick access)
  const featuredFAQs = faqList?.filter(faq => faq.is_featured) || [];
  const otherFAQs = faqList?.filter(faq => !faq.is_featured) || [];

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
                Đang tải câu hỏi thường gặp...
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
              <p className="text-sm">Không thể tải câu hỏi thường gặp. Vui lòng thử lại sau.</p>
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
            <Link 
              to="/tien-ich" 
              className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
            >
              Tiện ích
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
              Câu hỏi thường gặp
            </span>
          </nav>
        </div>

        {/* Page Header */}
        <div className="text-center py-4">
          <h1 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
            Câu hỏi thường gặp
          </h1>
          <div className={`w-16 h-1 mx-auto mb-3 rounded-full ${theme === 'dark' ? 'bg-dseza-dark-primary' : 'bg-dseza-light-primary'}`}></div>
          <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
            Những thắc mắc phổ biến và câu trả lời
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Input
            placeholder="Tìm kiếm câu hỏi..."
            value={filters.keyword}
            onChange={(e) => handleSearch(e.target.value)}
            className={`h-12 pl-10 pr-4 text-base ${
              theme === 'dark' 
                ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' 
                : 'bg-white border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'
            }`}
          />
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
            theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
          }`} />
        </div>

        {/* Results Summary */}
        {faqList && faqList.length > 0 && (
          <div className="flex items-center justify-between py-2">
            <Badge 
              variant="secondary" 
              className={`px-3 py-1 text-sm ${
                theme === 'dark' 
                  ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary border-dseza-dark-primary/30' 
                  : 'bg-dseza-light-primary/20 text-dseza-light-primary border-dseza-light-primary/30'
              }`}
            >
              <HelpCircle className="h-3 w-3 mr-1" />
              {faqList.length} câu hỏi
            </Badge>
            
            {/* Featured FAQs count */}
            {featuredFAQs.length > 0 && (
              <Badge 
                variant="secondary" 
                className={`px-2 py-1 text-xs ${
                  theme === 'dark' 
                    ? 'bg-yellow-900/20 text-yellow-300 border-yellow-400/30' 
                    : 'bg-yellow-100/80 text-yellow-800 border-yellow-300/30'
                }`}
              >
                {featuredFAQs.length} phổ biến
              </Badge>
            )}
          </div>
        )}

        {/* FAQ Content */}
        {faqList && faqList.length > 0 ? (
          <div className="space-y-6">
            
            {/* Featured FAQs */}
            {featuredFAQs.length > 0 && (
              <div className="space-y-4">
                <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  Câu hỏi phổ biến
                </h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {featuredFAQs.map((faq) => (
                    <AccordionItem
                      key={faq.id}
                      value={faq.id}
                      className={`border rounded-lg px-4 ${
                        theme === 'dark' 
                          ? 'border-dseza-dark-border bg-dseza-dark-secondary-bg' 
                          : 'border-dseza-light-border bg-white'
                      }`}
                    >
                      <AccordionTrigger className={`hover:no-underline py-4 text-left ${
                        theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                      }`}>
                        <div className="flex items-start gap-3 text-sm font-medium">
                          <HelpCircle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                            theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'
                          }`} />
                          <span className="line-clamp-2 leading-tight">{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className={`pb-4 text-sm leading-relaxed ${
                        theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                      }`}>
                        <div className="ml-7">
                          {faq.answer.split('\n').map((line, index) => (
                            <p key={index} className={line.trim() === '' ? 'h-2' : ''}>
                              {line}
                            </p>
                          ))}
                          
                          {/* Category and view count */}
                          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-opacity-20 border-gray-300">
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                theme === 'dark' 
                                  ? 'border-dseza-dark-border text-dseza-dark-secondary-text' 
                                  : 'border-dseza-light-border text-dseza-light-secondary-text'
                              }`}
                            >
                              {faq.category}
                            </Badge>
                            <span className={`text-xs ${
                              theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                            }`}>
                              {faq.view_count} lượt xem
                            </span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}

            {/* Other FAQs */}
            {otherFAQs.length > 0 && (
              <div className="space-y-4">
                {featuredFAQs.length > 0 && (
                  <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                    Các câu hỏi khác
                  </h2>
                )}
                <Accordion type="single" collapsible className="space-y-3">
                  {otherFAQs.map((faq) => (
                    <AccordionItem
                      key={faq.id}
                      value={faq.id}
                      className={`border rounded-lg px-4 ${
                        theme === 'dark' 
                          ? 'border-dseza-dark-border bg-dseza-dark-secondary-bg' 
                          : 'border-dseza-light-border bg-white'
                      }`}
                    >
                      <AccordionTrigger className={`hover:no-underline py-4 text-left ${
                        theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                      }`}>
                        <div className="flex items-start gap-3 text-sm font-medium">
                          <HelpCircle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                            theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'
                          }`} />
                          <span className="line-clamp-2 leading-tight">{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className={`pb-4 text-sm leading-relaxed ${
                        theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                      }`}>
                        <div className="ml-7">
                          {faq.answer.split('\n').map((line, index) => (
                            <p key={index} className={line.trim() === '' ? 'h-2' : ''}>
                              {line}
                            </p>
                          ))}
                          
                          {/* Category and view count */}
                          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-opacity-20 border-gray-300">
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                theme === 'dark' 
                                  ? 'border-dseza-dark-border text-dseza-dark-secondary-text' 
                                  : 'border-dseza-light-border text-dseza-light-secondary-text'
                              }`}
                            >
                              {faq.category}
                            </Badge>
                            <span className={`text-xs ${
                              theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                            }`}>
                              {faq.view_count} lượt xem
                            </span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <div className={`mb-6 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              <div className="w-16 h-16 mx-auto mb-4 opacity-50">
                <HelpCircle className="w-full h-full" />
              </div>
              <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Không tìm thấy câu hỏi nào
              </h3>
              <p className="text-sm mb-4">
                Thử sử dụng từ khóa khác hoặc xóa bộ lọc.
              </p>
              <Button 
                onClick={clearSearch}
                variant="outline"
                className={`${
                  theme === 'dark' 
                    ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-secondary-bg' 
                    : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-secondary-bg'
                }`}
              >
                Xóa tìm kiếm
              </Button>
            </div>
          </div>
        )}

        {/* Contact Support */}
        <div className={`mt-8 p-4 rounded-lg border ${
          theme === 'dark' 
            ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' 
            : 'bg-dseza-light-secondary-bg border-dseza-light-border'
        }`}>
          <h3 className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
            Không tìm thấy câu trả lời?
          </h3>
          <p className={`text-xs mb-3 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
            Đặt câu hỏi mới để nhận được hỗ trợ từ cộng đồng và chuyên gia.
          </p>
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              className={`flex-1 h-9 text-xs ${
                theme === 'dark' 
                  ? 'bg-dseza-dark-primary text-dseza-dark-main-bg hover:bg-dseza-dark-primary/80' 
                  : 'bg-dseza-light-primary text-white hover:bg-dseza-light-primary/80'
              }`}
            >
              <Link to="/tien-ich/hoi-dap/tao-moi">
                <Plus className="h-3 w-3 mr-1" />
                Đặt câu hỏi
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className={`flex-1 h-9 text-xs ${
                theme === 'dark' 
                  ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-secondary-bg' 
                  : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-secondary-bg'
              }`}
            >
              <Link to="/tien-ich/hoi-dap">
                <MessageSquare className="h-3 w-3 mr-1" />
                Xem Q&A
              </Link>
            </Button>
          </div>
        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MobileFaqPage; 