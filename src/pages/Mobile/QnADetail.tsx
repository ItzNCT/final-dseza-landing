import React from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight, ChevronLeft, Calendar, User, MessageSquare, CheckCircle, Clock, ThumbsUp, Reply } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/context/ThemeContext";
import Footer from "@/components/Footer";
import MobileQnACard from "@/components/mobile/MobileQnACard";

// Mock hook for Q&A detail data - replace with actual hook when available
const useQnADetail = (id: string) => {
  // Mock data - replace with real API call
  const mockQnADetail = {
    id: "1",
    title: "Thủ tục đăng ký thành lập doanh nghiệp trong KCN có gì khác biệt?",
    content: "Tôi muốn biết quy trình đăng ký thành lập doanh nghiệp trong khu công nghiệp có những điểm khác biệt gì so với đăng ký thông thường không? Đặc biệt là về thời gian xử lý, hồ sơ cần thiết và các khoản phí phát sinh.\n\nHiện tại công ty tôi đang có ý định đầu tư vào KCN Hòa Khánh và cần chuẩn bị hồ sơ trước. Mong quý Ban quản lý có thể tư vấn cụ thể.",
    author: "Nguyễn Văn A",
    author_title: "Giám đốc ABC Company",
    status: "answered",
    created_date: "2024-01-15T08:00:00Z",
    updated_date: "2024-01-16T14:30:00Z",
    answer_count: 2,
    view_count: 128,
    like_count: 15,
    category: "Thủ tục hành chính",
    is_answered: true,
    tags: ["đăng ký doanh nghiệp", "KCN", "thủ tục"],
    answers: [
      {
        id: "1",
        content: "Cảm ơn bạn đã quan tâm đến đầu tư tại KCN Hòa Khánh. Dưới đây là những điểm khác biệt chính trong thủ tục đăng ký:\n\n**1. Thời gian xử lý nhanh hơn:**\n- Thời gian xử lý: 10-15 ngày (thay vì 20-25 ngày)\n- Có cơ chế xử lý ưu tiên cho dự án FDI\n\n**2. Hồ sơ bổ sung:**\n- Đánh giá tác động môi trường (EIA)\n- Kế hoạch sử dụng đất chi tiết\n- Cam kết về công nghệ và thiết bị\n\n**3. Ưu đãi đặc biệt:**\n- Miễn phí tư vấn pháp lý\n- Hỗ trợ thủ tục một cửa\n- Ưu đãi về tiền thuê đất năm đầu\n\nNếu cần tư vấn chi tiết, bạn có thể liên hệ trực tiếp qua hotline: 0236 3666 117.",
        author: "Ban Quản lý KCN",
        author_title: "Chuyên viên tư vấn",
        created_date: "2024-01-15T14:30:00Z",
        like_count: 12,
        is_official: true,
        is_best_answer: true,
      },
      {
        id: "2",
        content: "Bổ sung thêm thông tin từ kinh nghiệm thực tế:\n\nTôi đã thành lập DN tại KCN Hòa Khánh năm 2023. Ngoài những gì Ban quản lý đã nêu, tôi muốn chia sẻ:\n\n- Nên chuẩn bị trước bản dịch công chứng tất cả giấy tờ\n- Cần có tài khoản ngân hàng tại Việt Nam trước khi nộp hồ sơ\n- Thủ tục online rất tiện lợi, ít phải đi lại\n\nChúc bạn thành công!",
        author: "Trần Minh B",
        author_title: "Doanh nhân",
        created_date: "2024-01-16T09:15:00Z",
        like_count: 8,
        is_official: false,
        is_best_answer: false,
      }
    ]
  };

  return {
    data: mockQnADetail,
    isLoading: false,
    isError: false,
    error: null,
  };
};

/**
 * Mobile-optimized Q&A Detail Page
 * 
 * Displays full question and answers in a mobile-friendly format
 * Features easy navigation and interaction for mobile users
 */
const MobileQnADetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  
  // Fetch Q&A detail data using the hook
  const { data: qnaDetail, isLoading, isError, error } = useQnADetail(id || "1");

  // Format date for mobile display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status info
  const getStatusInfo = (status?: string, isAnswered?: boolean) => {
    if (isAnswered || status === 'answered') {
      return {
        icon: CheckCircle,
        text: 'Đã trả lời',
        color: theme === 'dark' ? 'text-green-400 bg-green-900/20' : 'text-green-600 bg-green-100'
      };
    }
    
    if (status === 'pending') {
      return {
        icon: Clock,
        text: 'Chờ phản hồi',
        color: theme === 'dark' ? 'text-yellow-400 bg-yellow-900/20' : 'text-yellow-600 bg-yellow-100'
      };
    }

    return {
      icon: MessageSquare,
      text: 'Mới',
      color: theme === 'dark' ? 'text-blue-400 bg-blue-900/20' : 'text-blue-600 bg-blue-100'
    };
  };

  // Loading state
  if (isLoading) {
    return (
      <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
        {/* MobileHeader is automatically included by MobileLayout */}
        <main className="flex-1 px-4 py-6">
          <div className="animate-pulse space-y-4">
            <div className={`h-4 rounded ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-gray-200'}`}></div>
            <div className={`h-6 rounded ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-gray-200'}`}></div>
            <div className={`h-32 rounded ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-gray-200'}`}></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (isError || !qnaDetail) {
    return (
      <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
        {/* MobileHeader is automatically included by MobileLayout */}
        <main className="flex-1 px-4 py-6">
          <div className="text-center py-12">
            <div className={`text-red-500 mb-4`}>
              <p className="text-lg font-semibold mb-2">Không tìm thấy câu hỏi</p>
              <p className="text-sm">Câu hỏi có thể đã bị xóa hoặc không tồn tại.</p>
            </div>
            <Button asChild>
              <Link to="/tien-ich/hoi-dap">Quay lại danh sách</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const statusInfo = getStatusInfo(qnaDetail.status, qnaDetail.is_answered);
  const StatusIcon = statusInfo.icon;

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
              to="/tien-ich/hoi-dap" 
              className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
            >
              Hỏi đáp
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
              Chi tiết
            </span>
          </nav>
        </div>

        {/* Question Card */}
        <div className={`rounded-lg border shadow-sm ${
          theme === 'dark' 
            ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' 
            : 'bg-white border-dseza-light-border'
        }`}>
          
          {/* Question Header */}
          <div className="p-4 space-y-3">
            
            {/* Status and Meta Info */}
            <div className="flex items-center justify-between gap-2">
              <Badge 
                variant="secondary" 
                className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusInfo.color}`}
              >
                <StatusIcon className="h-3 w-3 mr-1" />
                {statusInfo.text}
              </Badge>
              
              {qnaDetail.category && (
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    theme === 'dark' 
                      ? 'border-dseza-dark-border text-dseza-dark-secondary-text' 
                      : 'border-dseza-light-border text-dseza-light-secondary-text'
                  }`}
                >
                  {qnaDetail.category}
                </Badge>
              )}
            </div>

            {/* Question Title */}
            <h1 className={`text-lg font-bold leading-tight ${
              theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
            }`}>
              {qnaDetail.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 text-sm ${
                theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
              }`}>
                <User className="h-4 w-4" />
                <div>
                  <span className="font-medium">{qnaDetail.author}</span>
                  {qnaDetail.author_title && (
                    <span className="text-xs ml-1">({qnaDetail.author_title})</span>
                  )}
                </div>
              </div>
            </div>

            {/* Timestamps */}
            <div className={`text-xs ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              <div className="flex items-center gap-1 mb-1">
                <Calendar className="h-3 w-3" />
                <span>Đăng: {formatDate(qnaDetail.created_date)}</span>
              </div>
              {qnaDetail.updated_date && qnaDetail.updated_date !== qnaDetail.created_date && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Cập nhật: {formatDate(qnaDetail.updated_date)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Question Content */}
          <div className={`px-4 pb-4 border-t ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
            <div className={`mt-4 text-sm leading-relaxed whitespace-pre-line ${
              theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
            }`}>
              {qnaDetail.content}
            </div>

            {/* Tags */}
            {qnaDetail.tags && qnaDetail.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-4">
                {qnaDetail.tags.map((tag, index) => (
                  <Badge 
                    key={index}
                    variant="outline" 
                    className={`text-xs ${
                      theme === 'dark' 
                        ? 'border-dseza-dark-border text-dseza-dark-secondary-text' 
                        : 'border-dseza-light-border text-dseza-light-secondary-text'
                    }`}
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Stats */}
            <div className={`flex items-center gap-4 mt-4 pt-3 border-t border-opacity-20 border-gray-300 text-xs ${
              theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
            }`}>
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-3 w-3" />
                <span>{qnaDetail.like_count} lượt thích</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                <span>{qnaDetail.answer_count} phản hồi</span>
              </div>
              <span>{qnaDetail.view_count} lượt xem</span>
            </div>
          </div>
        </div>

        {/* Answers Section */}
        {qnaDetail.answers && qnaDetail.answers.length > 0 && (
          <div className="space-y-4">
            <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
              Câu trả lời ({qnaDetail.answers.length})
            </h2>

            {qnaDetail.answers.map((answer) => (
              <div 
                key={answer.id}
                className={`rounded-lg border shadow-sm ${
                  theme === 'dark' 
                    ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' 
                    : 'bg-white border-dseza-light-border'
                } ${answer.is_best_answer ? 'ring-2 ' + (theme === 'dark' ? 'ring-green-400/30' : 'ring-green-500/30') : ''}`}
              >
                <div className="p-4 space-y-3">
                  
                  {/* Answer Header */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className={`flex items-center gap-2 text-sm ${
                        theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                      }`}>
                        <User className="h-4 w-4" />
                        <div>
                          <span className={`font-medium ${answer.is_official ? (theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary') : ''}`}>
                            {answer.author}
                          </span>
                          {answer.author_title && (
                            <span className="text-xs ml-1">({answer.author_title})</span>
                          )}
                        </div>
                      </div>
                      
                      {answer.is_official && (
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            theme === 'dark' 
                              ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary border-dseza-dark-primary/30' 
                              : 'bg-dseza-light-primary/20 text-dseza-light-primary border-dseza-light-primary/30'
                          }`}
                        >
                          Chính thức
                        </Badge>
                      )}
                    </div>

                    {answer.is_best_answer && (
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${
                          theme === 'dark' 
                            ? 'bg-green-900/20 text-green-300 border-green-400/30' 
                            : 'bg-green-100/80 text-green-800 border-green-300/30'
                        }`}
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Câu trả lời tốt nhất
                      </Badge>
                    )}
                  </div>

                  {/* Answer Content */}
                  <div className={`text-sm leading-relaxed whitespace-pre-line ${
                    theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                  }`}>
                    {answer.content}
                  </div>

                  {/* Answer Meta */}
                  <div className={`flex items-center justify-between text-xs ${
                    theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                  }`}>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(answer.created_date)}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      <span>{answer.like_count} lượt thích</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Button
            asChild
            variant="outline"
            className={`flex-1 h-11 ${
              theme === 'dark' 
                ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-secondary-bg' 
                : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-secondary-bg'
            }`}
          >
            <Link to="/tien-ich/hoi-dap">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Quay lại danh sách
            </Link>
          </Button>
          
          <Button
            asChild
            className={`flex-1 h-11 ${
              theme === 'dark' 
                ? 'bg-dseza-dark-primary text-dseza-dark-main-bg hover:bg-dseza-dark-primary/80' 
                : 'bg-dseza-light-primary text-white hover:bg-dseza-light-primary/80'
            }`}
          >
            <Link to="/tien-ich/hoi-dap/tao-moi">
              <Reply className="h-4 w-4 mr-2" />
              Đặt câu hỏi mới
            </Link>
          </Button>
        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MobileQnADetailPage; 