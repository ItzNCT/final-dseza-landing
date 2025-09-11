import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Calendar, 
  ChevronRight,
  Download,
  Share2,
  Printer
} from 'lucide-react';
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useLanguageRoutes } from "@/utils/routes";
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileLayout from "@/components/mobile/MobileLayout";

const InvestmentGuidePage = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { createUrl } = useLanguageRoutes();
  const isMobile = useIsMobile();
  
  const isVi = language === 'vi';

  const documents = [
    {
      id: 1,
      title: isVi
        ? "Chính sách ưu đãi và hỗ trợ đầu tư vào Khu công nghệ cao Đà Nẵng"
        : "Investment incentives and support policies in Da Nang Hi‑Tech Park",
      date: "01-01-2025",
      type: isVi ? "Chính sách" : "Policy",
      url: createUrl('/cam-nang-dau-tu/chinh-sach-uu-dai')
    },
    {
      id: 2,
      title: isVi
        ? "Brochure - Giới thiệu tổng quan DSEZA"
        : "Brochure - DSEZA Overview",
      date: "01-01-2025", 
      type: "Brochure",
      url: createUrl('/cam-nang-dau-tu/brochure')
    }
  ];

  const handleDownload = () => {
    console.log('Downloading investment guide...');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: isVi ? 'Cẩm nang đầu tư - DSEZA' : 'Investment handbook - DSEZA',
        text: isVi
          ? 'Cẩm nang đầu tư vào Khu công nghệ cao và các Khu công nghiệp Đà Nẵng'
          : 'Guides and policies for investing in Da Nang Hi‑Tech Park and Industrial Zones',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(isVi ? 'Đã sao chép link vào clipboard!' : 'Link copied to clipboard!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Mobile optimized layout
  if (isMobile) {
    return (
      <MobileLayout>
        <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
          {/* Main Content - Mobile optimized */}
          <main className="flex-1 px-4 py-4 space-y-4">
            {/* Mobile Breadcrumb */}
            <div className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg/50' : 'bg-dseza-light-secondary-bg/50'} py-1 px-2 rounded-lg`}>
              <nav className={`flex items-center space-x-1 text-xs ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                <Link 
                  to={createUrl('/')} 
                  className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
                >
                  {isVi ? 'Trang chủ' : 'Home'}
                </Link>
                <ChevronRight className="h-2.5 w-2.5" />
                <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  {isVi ? 'Cẩm nang đầu tư' : 'Investment handbook'}
                </span>
              </nav>
            </div>

            {/* Page Header - Mobile optimized */}
            <div className="text-center py-3">
              <h1 className={`${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'} text-xl font-bold mb-2`}>
                {isVi ? 'Cẩm nang đầu tư' : 'Investment handbook'}
              </h1>
              <div className={`${theme === 'dark' ? 'bg-dseza-dark-primary' : 'bg-dseza-light-primary'} w-12 h-0.5 mx-auto mb-2 rounded-full`}></div>
              <p className={`${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'} text-xs`}>
                {isVi
                  ? 'Tài liệu hướng dẫn và chính sách ưu đãi đầu tư vào Khu công nghệ cao và các Khu công nghiệp Đà Nẵng'
                  : 'Guides and policies for investing in Da Nang Hi‑Tech Park and Industrial Zones'}
              </p>
            </div>

            {/* Documents List - Mobile optimized */}
            <div className="space-y-3">
              {documents.map((doc) => (
                <Link 
                  key={doc.id} 
                  to={doc.url}
                  className="block group active:scale-[0.98] transition-transform"
                >
                  <Card className={`${theme === 'dark' 
                      ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' 
                      : 'bg-dseza-light-secondary-bg border-dseza-light-border'
                    } h-full transition-all duration-200`}>
                    <CardHeader className="py-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className={`${theme === 'dark' ? 'bg-dseza-dark-primary/20' : 'bg-dseza-light-primary/20'} flex-shrink-0 p-2 rounded-full`}>
                            <FileText className={`${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'} w-5 h-5`} />
                          </div>
                          <div className="flex-1">
                            <CardTitle className={`${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'} text-base font-semibold mb-2 group-hover:${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'} transition-colors`}>
                              {doc.title}
                            </CardTitle>
                            <div className="flex items-center justify-between text-xs">
                              <div className={`${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'} flex items-center space-x-1`}>
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{doc.date}</span>
                              </div>
                              <span className={`${theme === 'dark' 
                                  ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary' 
                                  : 'bg-dseza-light-primary/20 text-dseza-light-primary'
                                } px-2 py-0.5 rounded-full text-[10px] font-medium`}>
                                {doc.type}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0 ml-3">
                          <div className={`${theme === 'dark' ? 'bg-dseza-dark-primary/10' : 'bg-dseza-light-primary/10'} p-1.5 rounded-full`}>
                            <ChevronRight className={`${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'} w-4 h-4`} />
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Share Section - Mobile optimized */}
            <div className={`${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'} mt-4 pt-6 border-t`}>
              <h3 className={`${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'} text-base font-semibold mb-3 flex items-center gap-2`}>
                <Share2 className="h-5 w-5" />
                {isVi ? 'Chia sẻ trang:' : 'Share this page:'}
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-1" />
                  {isVi ? 'Tải xuống' : 'Download'}
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-1" />
                  {isVi ? 'Chia sẻ' : 'Share'}
                </Button>
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  <Printer className="w-4 h-4 mr-1" />
                  {isVi ? 'In' : 'Print'}
                </Button>
              </div>
            </div>
          </main>

          {/* Footer */}
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
                to={createUrl('/')} 
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {isVi ? 'Trang chủ' : 'Home'}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {isVi ? 'Cẩm nang đầu tư' : 'Investment handbook'}
              </span>
            </nav>
          </div>
        </div>

        {/* Page Content */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          <article className="max-w-4xl mx-auto">
            {/* Page Header */}
            <header className="mb-8">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight text-center ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {isVi ? 'Cẩm nang đầu tư' : 'Investment handbook'}
              </h1>
              <p className={`text-lg leading-relaxed text-center ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                {isVi
                  ? 'Tài liệu hướng dẫn và chính sách ưu đãi đầu tư vào Khu công nghệ cao và các Khu công nghiệp Đà Nẵng'
                  : 'Guides and policies for investing in Da Nang Hi‑Tech Park and Industrial Zones'}
              </p>
            </header>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 gap-6 mt-12">
              {documents.map((doc) => (
                <Link 
                  key={doc.id} 
                  to={doc.url}
                  className="group"
                >
                  <Card className={`h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer ${
                    theme === 'dark' 
                      ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border hover:border-dseza-dark-primary/50' 
                      : 'bg-dseza-light-secondary-bg border-dseza-light-border hover:border-dseza-light-primary/50'
                  }`}>
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className={`flex-shrink-0 p-3 rounded-full ${
                            theme === 'dark' ? 'bg-dseza-dark-primary/20' : 'bg-dseza-light-primary/20'
                          }`}>
                            <FileText className={`w-6 h-6 ${
                              theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <CardTitle className={`text-xl font-bold mb-3 group-hover:${
                              theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'
                            } transition-colors ${
                              theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                            }`}>
                              {doc.title}
                            </CardTitle>
                            <div className="flex items-center space-x-4 text-sm">
                              <div className={`flex items-center space-x-2 ${
                                theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                              }`}>
                                <Calendar className="w-4 h-4" />
                                <span>{doc.date}</span>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                theme === 'dark' 
                                  ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary' 
                                  : 'bg-dseza-light-primary/20 text-dseza-light-primary'
                              }`}>
                                {doc.type}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                          <div className={`p-2 rounded-full ${
                            theme === 'dark' ? 'bg-dseza-dark-primary/10' : 'bg-dseza-light-primary/10'
                          }`}>
                            <ChevronRight className={`w-5 h-5 ${
                              theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'
                            }`} />
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Share Section */}
            <div className={`mt-12 pt-8 border-t ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
              <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                <Share2 className="h-5 w-5" />
                {isVi ? 'Chia sẻ trang:' : 'Share this page:'}
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  {isVi ? 'Tải xuống' : 'Download'}
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  {isVi ? 'Chia sẻ' : 'Share'}
                </Button>
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  <Printer className="w-4 h-4 mr-2" />
                  {isVi ? 'In' : 'Print'}
                </Button>
              </div>
            </div>
          </article>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default InvestmentGuidePage;