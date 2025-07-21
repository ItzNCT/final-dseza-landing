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
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const InvestmentGuidePage = () => {
  const { theme } = useTheme();
  
  const documents = [
    {
      id: 1,
      title: "Chính sách ưu đãi và hỗ trợ đầu tư vào Khu công nghệ cao Đà Nẵng",
      date: "01-01-2025",
      type: "Chính sách",
      url: "/cam-nang-dau-tu/chinh-sach-uu-dai"
    },
    {
      id: 2,
      title: "Brochure - Giới thiệu tổng quan DSEZA",
      date: "01-01-2025", 
      type: "Brochure",
      url: "/cam-nang-dau-tu/brochure"
    }
  ];

  const handleDownload = () => {
    console.log('Downloading investment guide...');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Cẩm nang đầu tư - DSEZA',
        text: 'Cẩm nang đầu tư vào Khu công nghệ cao và các Khu công nghiệp Đà Nẵng',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Đã sao chép link vào clipboard!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

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
                Cẩm nang đầu tư
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
                Cẩm nang đầu tư
              </h1>
              <p className={`text-lg leading-relaxed text-center ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                Tài liệu hướng dẫn và chính sách ưu đãi đầu tư vào Khu công nghệ cao và các Khu công nghiệp Đà Nẵng
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
                Chia sẻ trang:
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Tải xuống
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Chia sẻ
                </Button>
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  <Printer className="w-4 h-4 mr-2" />
                  In
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