import React from "react";
import { Calendar, DollarSign, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useJobs } from "../../hooks/useJobs";
import { LoadingSpinner } from "../../components/ui/loading-spinner";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "../../components/ui/accordion";
import { useTheme } from "../../context/ThemeContext";
import TopBar from "../../components/hero/TopBar";
import LogoSearchBar from "../../components/hero/LogoSearchBar";
import NavigationBar from "../../components/hero/NavigationBar";
import Footer from "../../components/Footer";

const RecruitmentPage: React.FC = () => {
  const { theme } = useTheme();
  const { data: jobs, isLoading, isError, error } = useJobs();

  const isDark = theme === 'dark';
  const bgClass = isDark ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg';
  const textClass = isDark ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text';
  const secondaryTextClass = isDark ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text';
  const cardClass = isDark ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary';
  const borderClass = isDark ? 'border-dseza-dark-border' : 'border-dseza-light-border';

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
              <span className={`font-medium ${textClass}`}>
                Tuyển dụng
              </span>
            </nav>
          </div>
        </div>

        {/* Page Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${textClass}`}>
              Cơ hội nghề nghiệp
            </h1>
            <div className={`w-24 h-1 mx-auto mb-4 rounded-full ${isDark ? 'bg-dseza-dark-primary' : 'bg-dseza-light-primary'}`}></div>
            <div className="flex items-center justify-center space-x-2 text-lg">
              <DollarSign className="w-5 h-5" />
              <span className={secondaryTextClass}>
                Cơ hội việc làm tại Khu Công nghệ cao Đà Nẵng
              </span>
            </div>
            <p className={`text-sm mt-4 max-w-2xl mx-auto ${secondaryTextClass}`}>
              Tham gia đội ngũ chuyên nghiệp, năng động và phát triển sự nghiệp cùng các doanh nghiệp công nghệ hàng đầu.
            </p>
          </div>

          {/* Results Summary */}
          {jobs && jobs.length > 0 && (
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-4">
                <div className={`px-3 py-1 text-sm rounded-md ${isDark ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary border border-dseza-dark-primary/30' : 'bg-dseza-light-primary/20 text-dseza-light-primary border border-dseza-light-primary/30'}`}>
                  {jobs.length} vị trí tuyển dụng
                </div>
              </div>
            </div>
          )}

          {/* Error Alert */}
          {isError && (
            <Alert className="mb-8">
              <AlertDescription>
                Có lỗi xảy ra khi tải tin tuyển dụng: {error?.message || 'Lỗi không xác định'}
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
                  Đang tải danh sách tuyển dụng...
                </p>
              </div>
            </div>
          ) : jobs && jobs.length > 0 ? (
            <div className="max-w-4xl mx-auto space-y-4">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {jobs.map((job) => (
                  <AccordionItem 
                    key={job.id} 
                    value={`job-${job.id}`} 
                    className={`${cardClass} ${borderClass} border rounded-lg shadow-sm overflow-hidden`}
                  >
                    <AccordionTrigger className={`p-6 hover:no-underline hover:${isDark ? 'bg-dseza-dark-hover' : 'bg-dseza-light-hover'} transition-colors`}>
                      <div className="flex justify-between items-center w-full">
                        <div className="text-left flex-1 pr-4">
                          <h2 className={`text-xl font-bold mb-2 ${textClass}`}>
                            {job.position || 'Vị trí tuyển dụng'}
                          </h2>
                          {job.deadline && (
                            <p className={`text-sm flex items-center ${secondaryTextClass}`}>
                              <Calendar className="w-4 h-4 mr-2" />
                              Hạn nộp hồ sơ: {job.deadline}
                            </p>
                          )}
                        </div>
                        {job.salary && (
                          <span className={`text-sm font-semibold px-3 py-1.5 rounded-full whitespace-nowrap ${
                            isDark 
                              ? 'text-dseza-dark-primary bg-dseza-dark-primary/20' 
                              : 'text-dseza-light-primary bg-dseza-light-primary/20'
                          }`}>
                            {job.salary}
                          </span>
                        )}
                      </div>
                    </AccordionTrigger>
                    
                    <AccordionContent className="px-6 pb-6 pt-0">
                      <div className={`border-t pt-4 ${borderClass}`}>
                        {job.description && (
                          <>
                            <h3 className={`font-semibold mb-3 ${textClass}`}>
                              Mô tả công việc
                            </h3>
                            <div 
                              className={`prose prose-sm max-w-none mb-6 ${secondaryTextClass}`}
                              dangerouslySetInnerHTML={{ __html: job.description }} 
                            />
                          </>
                        )}
                        
                        {job.requirements && (
                          <>
                            <h3 className={`font-semibold mb-3 ${textClass}`}>
                              Yêu cầu ứng viên
                            </h3>
                            <div 
                              className={`prose prose-sm max-w-none ${secondaryTextClass}`}
                              dangerouslySetInnerHTML={{ __html: job.requirements }} 
                            />
                          </>
                        )}

                        {/* Contact Information */}
                        <div className={`mt-6 p-4 rounded-lg ${isDark ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'} ${borderClass} border`}>
                          <h4 className={`font-semibold mb-2 ${textClass}`}>
                            Thông tin liên hệ
                          </h4>
                          <p className={`text-sm ${secondaryTextClass}`}>
                            Để ứng tuyển vị trí này, vui lòng gửi hồ sơ về email: 
                            <span className={`ml-1 font-medium ${isDark ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                              tuyendung@dseza.danang.gov.vn
                            </span>
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ) : (
            <div className={`rounded-lg ${cardClass} ${borderClass} border p-16 text-center`}>
              <DollarSign className={`w-16 h-16 mx-auto mb-4 ${secondaryTextClass} opacity-50`} />
              <h3 className={`text-lg font-semibold mb-2 ${textClass}`}>
                Hiện tại không có tin tuyển dụng
              </h3>
              <p className={secondaryTextClass}>
                Chúng tôi sẽ cập nhật thông tin tuyển dụng mới nhất tại đây. Vui lòng quay lại sau.
              </p>
            </div>
          )}

          {/* Back to Enterprise Button */}
          <div className="mt-16 text-center">
            <Link 
              to="/doanh-nghiep"
              className={`inline-flex items-center px-6 py-3 rounded-lg border-2 font-medium transition-all duration-300 hover:-translate-y-1 ${
                isDark 
                  ? 'border-dseza-dark-primary text-dseza-dark-primary hover:bg-dseza-dark-primary hover:text-dseza-dark-main-text' 
                  : 'border-dseza-light-primary text-dseza-light-primary hover:bg-dseza-light-primary hover:text-white'
              }`}
            >
              ← Quay lại Doanh nghiệp
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RecruitmentPage; 