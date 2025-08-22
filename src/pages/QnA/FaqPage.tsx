import React from "react";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import { 
  ChevronRight,
  HelpCircle,
  MessageCircleQuestion,
  AlertTriangle
} from 'lucide-react';
import { useTheme } from "@/context/ThemeContext";
import { useFaq } from "@/hooks/useFaq";
import { useLanguage } from "@/context/LanguageContext";

// Import complete header structure
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";

// Import UI components
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Card, CardContent } from "@/components/ui/card";
import MobileLayout from "@/components/mobile/MobileLayout";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * FaqSkeleton - Loading skeleton for FAQ items
 */
const FaqSkeleton: React.FC<{ theme: string }> = ({ theme }) => (
  <div className="space-y-4">
    {[...Array(5)].map((_, index) => (
      <div 
        key={index}
        className={`p-4 rounded-lg border ${
          theme === 'dark' 
            ? 'border-dseza-dark-border bg-dseza-dark-secondary/30' 
            : 'border-dseza-light-border bg-dseza-light-secondary/30'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className={`h-5 rounded ${
            theme === 'dark' ? 'bg-dseza-dark-hover' : 'bg-dseza-light-hover'
          }`} style={{ width: `${Math.random() * 40 + 40}%` }} />
          <div className={`w-4 h-4 rounded ${
            theme === 'dark' ? 'bg-dseza-dark-hover' : 'bg-dseza-light-hover'
          }`} />
        </div>
      </div>
    ))}
  </div>
);

/**
 * FaqPage - Trang câu hỏi thường gặp
 */
const FaqPage: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { faqs, isLoading, isError, error, faqCount } = useFaq();
  const isMobile = useIsMobile();

  const textColor = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";
  const secondaryTextColor = theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text";
  const primaryColor = theme === "dark" ? "text-dseza-dark-primary" : "text-dseza-light-primary";
  const primaryHoverColor = theme === "dark" ? "hover:text-dseza-dark-primary" : "hover:text-dseza-light-primary";
  const cardBg = theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-main-bg';
  const borderColor = theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border';

  if (isMobile) {
    return (
      <MobileLayout>
        <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
          <main className="flex-1 px-4 py-4 space-y-4">
            {/* Breadcrumb */}
            <div className={`${theme === 'dark' ? 'bg-dseza-dark-secondary/30' : 'bg-dseza-light-secondary/30'} rounded-lg px-2 py-1`}>
              <nav className={`flex items-center space-x-1 text-xs ${secondaryTextColor}`}>
                <Link to={`/${language}`} className={`${primaryHoverColor} hover:underline`}>
                  {language === 'en' ? 'Home' : 'Trang chủ'}
                </Link>
                <ChevronRight className="h-2.5 w-2.5" />
                <span className={`font-medium ${textColor}`}>
                  {language === 'en' ? 'Frequently Asked Questions' : 'Câu hỏi thường gặp'}
                </span>
              </nav>
            </div>

            {/* Header */}
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${theme === 'dark' ? 'bg-dseza-dark-primary/20' : 'bg-dseza-light-primary/20'}`}>
                <HelpCircle className={`w-6 h-6 ${primaryColor}`} />
              </div>
              <h1 className={`text-xl font-bold ${textColor}`}>{language === 'en' ? 'Frequently Asked Questions' : 'Câu hỏi thường gặp'}</h1>
            </div>

            {/* Loading */}
            {isLoading && (
              <div className="space-y-4">
                <div className="flex justify-center items-center py-8">
                  <LoadingSpinner size="lg" />
                </div>
                <FaqSkeleton theme={theme} />
              </div>
            )}

            {/* Error */}
            {isError && (
              <div className="text-center py-10">
                <p className="text-red-500">{error?.message || (language === 'en' ? 'Unable to load FAQs' : 'Không thể tải dữ liệu câu hỏi thường gặp')}</p>
              </div>
            )}

            {/* Content */}
            {!isLoading && !isError && (
              faqs.length > 0 ? (
                <Card className={`${cardBg} ${borderColor} border`}>
                  <CardContent className="p-4">
                    <Accordion type="single" collapsible className="w-full">
                      {faqs.map((faq, index) => (
                        <AccordionItem key={faq.id} value={`item-${index}`} className={`${borderColor} ${index === faqs.length - 1 ? 'border-b-0' : ''}`}>
                          <AccordionTrigger className={`${textColor} hover:no-underline ${primaryHoverColor} text-left`}>
                            <div className="flex items-start gap-3 pr-2">
                              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold mt-1 ${theme === 'dark' ? 'bg-dseza-dark-primary text-dseza-dark-main-bg' : 'bg-dseza-light-primary text-white'}`}>{index + 1}</div>
                              <span className="font-medium leading-relaxed">{faq.question}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className={`${textColor} ml-9`}>
                            <div className={`prose prose-sm max-w-none ${theme === 'dark' ? 'prose-invert' : ''} leading-relaxed`} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(faq.answer) }} />
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ) : (
                <div className="text-center py-12">
                  <HelpCircle className={`w-12 h-12 mx-auto mb-3 ${secondaryTextColor}`} />
                  <p className={secondaryTextColor}>{language === 'en' ? 'No FAQs yet' : 'Chưa có câu hỏi thường gặp'}</p>
                </div>
              )
            )}
          </main>
          <Footer />
        </div>
      </MobileLayout>
    );
  }

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
                to={`/${language}`} 
                className={`transition-colors ${primaryHoverColor}`}
              >
                {language === 'en' ? 'Home' : 'Trang chủ'}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link 
                to={`/${language}/${language === 'en' ? 'utilities' : 'tien-ich'}`} 
                className={`transition-colors ${primaryHoverColor}`}
              >
                {language === 'en' ? 'Utilities' : 'Tiện ích'}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${textColor}`}>
                {language === 'en' ? 'Frequently Asked Questions' : 'Câu hỏi thường gặp'}
              </span>
            </nav>
          </div>
        </div>

        {/* Page Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
              theme === 'dark' ? 'bg-dseza-dark-primary/20' : 'bg-dseza-light-primary/20'
            }`}>
              <HelpCircle className={`w-8 h-8 ${primaryColor}`} />
            </div>
            <h1 className={`text-3xl md:text-4xl font-bold ${textColor} mb-4`}>
              {language === 'en' ? 'Frequently Asked Questions' : 'Câu hỏi thường gặp'}
            </h1>
            <p className={`text-lg ${secondaryTextColor} max-w-3xl mx-auto`}>
              {language === 'en' 
                ? 'Learn about the most frequently asked questions regarding the activities and services of Da Nang Hi-Tech Park and Industrial Zones Authority.'
                : 'Tìm hiểu các câu hỏi được quan tâm nhiều nhất về hoạt động và dịch vụ của \nBan Quản lý Khu công nghệ cao Đà Nẵng.'}
            </p>
            {faqCount > 0 && (
              <p className={`mt-4 text-sm ${secondaryTextColor}`}>
                <MessageCircleQuestion className="w-4 h-4 inline mr-1" />
                {language === 'en' ? `${faqCount} frequently asked questions` : `Có ${faqCount} câu hỏi thường gặp`}
              </p>
            )}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex justify-center items-center py-8">
                <LoadingSpinner size="lg" />
                <span className={`ml-3 ${textColor}`}>{language === 'en' ? 'Loading FAQs...' : 'Đang tải câu hỏi thường gặp...'}</span>
              </div>
              <FaqSkeleton theme={theme} />
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="max-w-4xl mx-auto text-center py-16">
              <div className={`text-red-500 mb-4`}>
                <AlertTriangle className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{language === 'en' ? 'An error occurred' : 'Có lỗi xảy ra'}</h3>
                <p>{error?.message || (language === 'en' ? 'Unable to load FAQs' : 'Không thể tải dữ liệu câu hỏi thường gặp')}</p>
              </div>
            </div>
          )}

          {/* FAQ Content */}
          {!isLoading && !isError && (
            <div className="max-w-4xl mx-auto">
              {faqs.length > 0 ? (
                <Card className={`${cardBg} ${borderColor} border`}>
                  <CardContent className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                      {faqs.map((faq, index) => (
                        <AccordionItem 
                          key={faq.id} 
                          value={`item-${index}`}
                          className={`${borderColor} ${index === faqs.length - 1 ? 'border-b-0' : ''}`}
                        >
                          <AccordionTrigger className={`${textColor} hover:no-underline ${primaryHoverColor} text-left`}>
                            <div className="flex items-start gap-3 pr-4">
                              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold mt-1 ${
                                theme === 'dark' 
                                  ? 'bg-dseza-dark-primary text-dseza-dark-main-bg' 
                                  : 'bg-dseza-light-primary text-white'
                              }`}>
                                {index + 1}
                              </div>
                              <span className="font-medium leading-relaxed">
                                {faq.question}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className={`${textColor} ml-9`}>
                            <div 
                              className={`prose prose-sm max-w-none ${
                                theme === 'dark' ? 'prose-invert' : ''
                              } leading-relaxed`}
                              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(faq.answer) }}
                            />
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ) : (
                // Empty State
                <div className="text-center py-16">
                  <HelpCircle className={`w-16 h-16 mx-auto mb-4 ${secondaryTextColor}`} />
                  <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>
                    {language === 'en' ? 'No FAQs yet' : 'Chưa có câu hỏi thường gặp'}
                  </h3>
                  <p className={secondaryTextColor}>
                    {language === 'en' ? 'There are no public questions yet. Please check back later.' : 'Hiện tại chưa có câu hỏi nào được công khai. Vui lòng quay lại sau.'}
                  </p>
                  <div className="mt-6">
                    <Link
                      to={`/${language}/${language === 'en' ? 'utilities/qna/create' : 'tien-ich/hoi-dap/tao-moi'}`}
                      className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        theme === 'dark'
                          ? 'bg-dseza-dark-primary text-dseza-dark-main-bg hover:bg-dseza-dark-primary-hover'
                          : 'bg-dseza-light-primary text-white hover:bg-dseza-light-primary-hover'
                      }`}
                    >
                      <MessageCircleQuestion className="w-4 h-4 mr-2" />
                      {language === 'en' ? 'Create a new question' : 'Đặt câu hỏi mới'}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Additional Information */}
          {!isLoading && !isError && faqs.length > 0 && (
            <div className="max-w-4xl mx-auto mt-8">
              <Card className={`${cardBg} ${borderColor} border`}>
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className={`text-lg font-semibold mb-2 ${textColor}`}>
                      {language === 'en' ? 'Cannot find an answer?' : 'Không tìm thấy câu trả lời?'}
                    </h3>
                    <p className={`mb-4 ${secondaryTextColor}`}>
                      {language === 'en' ? 'If you cannot find the answer, please send us your question.' : 'Nếu bạn không tìm thấy câu trả lời cho thắc mắc của mình, hãy gửi câu hỏi mới cho chúng tôi.'}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        to={`/${language}/${language === 'en' ? 'utilities/qna/create' : 'tien-ich/hoi-dap/tao-moi'}`}
                        className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          theme === 'dark'
                            ? 'bg-dseza-dark-primary text-dseza-dark-main-bg hover:bg-dseza-dark-primary-hover'
                            : 'bg-dseza-light-primary text-white hover:bg-dseza-light-primary-hover'
                        }`}
                      >
                        <MessageCircleQuestion className="w-4 h-4 mr-2" />
                        {language === 'en' ? 'Create a new question' : 'Đặt câu hỏi mới'}
                      </Link>
                      <Link
                        to={`/${language}/${language === 'en' ? 'utilities/qna' : 'tien-ich/hoi-dap'}`}
                        className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                          theme === 'dark'
                            ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-hover'
                            : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-hover'
                        }`}
                      >
                        {language === 'en' ? 'See all questions' : 'Xem tất cả câu hỏi'}
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FaqPage; 