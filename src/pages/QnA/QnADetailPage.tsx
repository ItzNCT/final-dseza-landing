import React from "react";
import { Link, useParams } from "react-router-dom";
import { 
  ChevronRight, 
  HelpCircle, 
  User, 
  Calendar, 
  Mail, 
  Phone,
  Building,
  MessageCircle,
  AlertTriangle
} from 'lucide-react';
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@/context/ThemeContext";

// Import complete header structure
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";

// Import UI components
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/**
 * Fetch single question detail by ID from Drupal JSON:API
 */
async function fetchQuestionById(id: string) {
  try {
    const JSON_API_BASE_URL = import.meta.env.VITE_DRUPAL_BASE_URL || 
      (import.meta.env.DEV ? '' : 'https://dseza-backend.lndo.site');
    
    const url = `${JSON_API_BASE_URL}/jsonapi/node/question/${id}`;
    
    console.log('🔍 Fetching question detail from:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch question: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * QnADetailPage - Trang chi tiết câu hỏi và trả lời
 */
const QnADetailPage: React.FC = () => {
  const { theme } = useTheme();
  const { id } = useParams<{ id: string }>();

  // Fetch question detail
  const { 
    data: questionData, 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['questionDetail', id],
    queryFn: () => fetchQuestionById(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    retry: 3,
  });

  const question = questionData?.data;

  const textColor = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";
  const secondaryTextColor = theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text";
  const primaryColor = theme === "dark" ? "text-dseza-dark-primary" : "text-dseza-light-primary";
  const primaryHoverColor = theme === "dark" ? "hover:text-dseza-dark-primary" : "hover:text-dseza-light-primary";
  const cardBg = theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-main-bg';
  const borderColor = theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border';

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge style
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'da_tra_loi':
      case 'answered':
        return theme === 'dark' 
          ? 'bg-green-900/50 text-green-300' 
          : 'bg-green-100 text-green-800';
      case 'cho_duyet':
      case 'pending':
        return theme === 'dark' 
          ? 'bg-yellow-900/50 text-yellow-300' 
          : 'bg-yellow-100 text-yellow-800';
      default:
        return theme === 'dark' 
          ? 'bg-gray-900/50 text-gray-300' 
          : 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'da_tra_loi':
      case 'answered':
        return 'Đã trả lời';
      case 'cho_duyet':
      case 'pending':
        return 'Chờ duyệt';
      default:
        return status || 'Đang xử lý';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
      {/* Complete Header Structure */}
      <TopBar />
      <LogoSearchBar />
      <NavigationBar />
      
      {/* Main Content */}
      <main className="flex-1 pt-52">
        {/* Breadcrumb */}
        <div className={`py-3 ${theme === 'dark' ? 'bg-dseza-dark-secondary/50' : 'bg-dseza-light-secondary/50'}`}>
          <div className="container mx-auto px-4">
            <nav className={`flex items-center space-x-2 text-sm ${secondaryTextColor}`}>
              <Link 
                to="/" 
                className={`transition-colors ${primaryHoverColor}`}
              >
                Trang chủ
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link 
                to="/tien-ich/hoi-dap" 
                className={`transition-colors ${primaryHoverColor}`}
              >
                Hỏi đáp
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${textColor}`}>
                Chi tiết câu hỏi
              </span>
            </nav>
          </div>
        </div>

        {/* Page Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Loading State */}
          {isLoading && (
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-center items-center py-16">
                <LoadingSpinner size="lg" />
                <span className={`ml-3 ${textColor}`}>Đang tải chi tiết câu hỏi...</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="max-w-4xl mx-auto text-center py-16">
              <div className={`text-red-500 mb-4`}>
                <AlertTriangle className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Không tìm thấy câu hỏi</h3>
                <p>{error?.message || 'Câu hỏi này có thể đã bị xóa hoặc không tồn tại'}</p>
                <div className="mt-6">
                  <Link 
                    to="/tien-ich/hoi-dap"
                    className={`inline-flex items-center px-4 py-2 rounded-lg ${
                      theme === 'dark'
                        ? 'bg-dseza-dark-primary text-dseza-dark-main-bg hover:bg-dseza-dark-primary/80'
                        : 'bg-dseza-light-primary text-white hover:bg-dseza-light-primary/80'
                    } transition-colors`}
                  >
                    Quay về danh sách câu hỏi
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Question Detail Content */}
          {!isLoading && !isError && question && (
            <div className="max-w-4xl mx-auto space-y-6">
              
              {/* Question Card */}
              <Card className={`${cardBg} ${borderColor} border`}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        theme === 'dark' 
                          ? 'bg-dseza-dark-primary/20' 
                          : 'bg-dseza-light-primary/20'
                      }`}>
                        <HelpCircle className={`w-5 h-5 ${primaryColor}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className={`text-xl font-bold ${textColor} mb-2`}>
                          {question.attributes?.title || 'Câu hỏi không có tiêu đề'}
                        </CardTitle>
                        
                        {/* Status and Category */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Badge className={getStatusBadgeStyle(question.attributes?.field_trang_thai)}>
                            {getStatusText(question.attributes?.field_trang_thai)}
                          </Badge>
                          
                          {question.attributes?.field_linh_vuc && (
                            <Badge variant="outline" className={`${borderColor} ${secondaryTextColor}`}>
                              {question.attributes.field_linh_vuc}
                            </Badge>
                          )}
                        </div>

                        {/* Question Date */}
                        {question.attributes?.created && (
                          <div className={`flex items-center gap-1 text-sm ${secondaryTextColor}`}>
                            <Calendar className="h-4 w-4" />
                            <span>Ngày gửi: {formatDate(question.attributes.created)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Question Content */}
                  <div className={`mb-6 ${textColor}`}>
                    <h3 className="font-semibold mb-3">Nội dung câu hỏi:</h3>
                    <div 
                      className={`prose prose-sm max-w-none ${
                        theme === 'dark' ? 'prose-invert' : ''
                      } leading-relaxed`}
                      dangerouslySetInnerHTML={{ 
                        __html: question.attributes?.field_noi_dung_cau_hoi?.processed || 
                                question.attributes?.field_noi_dung_cau_hoi?.value || 
                                'Không có nội dung'
                      }}
                    />
                  </div>

                  {/* Sender Information */}
                  <div className={`border-t ${borderColor} pt-4`}>
                    <h3 className={`font-semibold mb-3 ${textColor}`}>Thông tin người gửi:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Full Name */}
                      {question.attributes?.field_nguoi_gui && (
                        <div className={`flex items-center gap-2 ${secondaryTextColor}`}>
                          <User className="h-4 w-4" />
                          <span>Họ tên: {question.attributes.field_nguoi_gui}</span>
                        </div>
                      )}

                      {/* Email */}
                      {question.attributes?.field_email && (
                        <div className={`flex items-center gap-2 ${secondaryTextColor}`}>
                          <Mail className="h-4 w-4" />
                          <span>Email: {question.attributes.field_email}</span>
                        </div>
                      )}

                      {/* Phone */}
                      {question.attributes?.field_so_dien_thoai && (
                        <div className={`flex items-center gap-2 ${secondaryTextColor}`}>
                          <Phone className="h-4 w-4" />
                          <span>Điện thoại: {question.attributes.field_so_dien_thoai}</span>
                        </div>
                      )}

                      {/* Address */}
                      {question.attributes?.field_dia_chi && (
                        <div className={`flex items-center gap-2 ${secondaryTextColor}`}>
                          <Building className="h-4 w-4" />
                          <span>Địa chỉ: {question.attributes.field_dia_chi}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Answer Card */}
              {question.attributes?.field_noi_dung_tra_loi && (
                <Card className={`${cardBg} ${borderColor} border`}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        theme === 'dark' 
                          ? 'bg-green-900/50' 
                          : 'bg-green-100'
                      }`}>
                        <MessageCircle className={`w-5 h-5 ${
                          theme === 'dark' ? 'text-green-300' : 'text-green-600'
                        }`} />
                      </div>
                      <CardTitle className={`text-lg font-semibold ${textColor}`}>
                        Trả lời
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div 
                      className={`prose prose-sm max-w-none ${
                        theme === 'dark' ? 'prose-invert' : ''
                      } leading-relaxed ${textColor}`}
                      dangerouslySetInnerHTML={{ 
                        __html: question.attributes.field_noi_dung_tra_loi.processed || 
                                question.attributes.field_noi_dung_tra_loi.value || 
                                question.attributes.field_noi_dung_tra_loi
                      }}
                    />
                    
                    {/* Answer Date */}
                    {question.attributes?.field_ngay_tra_loi && (
                      <div className={`flex items-center gap-1 text-sm mt-4 pt-4 border-t ${borderColor} ${secondaryTextColor}`}>
                        <Calendar className="h-4 w-4" />
                        <span>Ngày trả lời: {formatDate(question.attributes.field_ngay_tra_loi)}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* No Answer State */}
              {(!question.attributes?.field_noi_dung_tra_loi && 
                (question.attributes?.field_trang_thai === 'cho_duyet' || 
                 question.attributes?.field_trang_thai === 'pending' ||
                 !question.attributes?.field_trang_thai)) && (
                <Card className={`${cardBg} ${borderColor} border`}>
                  <CardContent className="py-8 text-center">
                    <div className={`text-yellow-500 mb-4`}>
                      <MessageCircle className="w-12 h-12 mx-auto mb-4" />
                      <h3 className={`text-lg font-semibold mb-2 ${textColor}`}>Chưa có câu trả lời</h3>
                      <p className={secondaryTextColor}>
                        Câu hỏi của bạn đang được xem xét và sẽ được phản hồi trong thời gian sớm nhất.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/tien-ich/hoi-dap"
                  className={`inline-flex items-center justify-center px-6 py-3 rounded-lg border transition-colors ${
                    theme === 'dark'
                      ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-hover'
                      : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-hover'
                  }`}
                >
                  Quay về danh sách câu hỏi
                </Link>
                
                <Link 
                  to="/tien-ich/hoi-dap/tao-moi"
                  className={`inline-flex items-center justify-center px-6 py-3 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'bg-dseza-dark-primary text-dseza-dark-main-bg hover:bg-dseza-dark-primary/80'
                      : 'bg-dseza-light-primary text-white hover:bg-dseza-light-primary/80'
                  }`}
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Đặt câu hỏi mới
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default QnADetailPage; 