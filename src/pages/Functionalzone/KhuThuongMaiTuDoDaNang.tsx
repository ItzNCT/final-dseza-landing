import React from 'react';
import { Link } from "react-router-dom";
import { 
  Download, 
  Share2, 
  Printer,
  ChevronRight 
} from 'lucide-react';
import { useTheme } from "@/context/ThemeContext";
import { useIsMobile } from "@/hooks/use-mobile";
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";
import MobileLayout from "@/components/mobile/MobileLayout";
import { Button } from "@/components/ui/button";

const KhuThuongMaiTuDoDaNang = () => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  const handleDownload = () => {
    console.log('Downloading document...');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Khu thương mại tự do Đà Nẵng - DSEZA',
        text: 'Thông tin về Khu thương mại tự do Đà Nẵng',
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

  if (isMobile) {
    return (
      <MobileLayout>
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
          {/* Mobile Content */}
          <div className="px-4 py-2 space-y-3">
            {/* Breadcrumb - Mobile */}
            <nav className={`flex items-center text-xs space-x-1 py-1 px-2 rounded-lg ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg/50 text-dseza-dark-secondary-text' : 'bg-dseza-light-secondary-bg/50 text-dseza-light-secondary-text'}`}>
              <Link
                to="/"
                className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Trang chủ
              </Link>
              <ChevronRight className="h-2.5 w-2.5" />
              <Link
                to="/gioi-thieu"
                className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Giới thiệu
              </Link>
              <ChevronRight className="h-2.5 w-2.5" />
              <Link
                to="/gioi-thieu/cac-khu-chuc-nang"
                className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Các khu chức năng
              </Link>
              <ChevronRight className="h-2.5 w-2.5" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Khu thương mại tự do Đà Nẵng
              </span>
            </nav>

            {/* Article Header - Mobile */}
            <header className="mb-4">
              <h1 className={`text-lg font-bold mb-2 leading-tight ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Khu thương mại tự do Đà Nẵng
              </h1>
            </header>

            {/* Article Content - Mobile */}
            <div className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              <div className="space-y-4 text-justify">
                {/* Nội dung sẽ được bổ sung */}
                <section>
                  <p className={`mb-2 text-center italic ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                    Nội dung đang được cập nhật...
                  </p>
                </section>
              </div>
            </div>

            {/* Share Section - Mobile */}
            <div className={`mt-6 pt-4 border-t ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
              <h3 className={`text-sm font-semibold mb-3 flex items-center gap-1 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                <Share2 className="h-3 w-3" />
                Chia sẻ trang:
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={handleDownload} className="text-xs h-7">
                  <Download className="w-3 h-3 mr-1" />
                  Tải xuống
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare} className="text-xs h-7">
                  <Share2 className="w-3 h-3 mr-1" />
                  Chia sẻ
                </Button>
                <Button variant="outline" size="sm" onClick={handlePrint} className="text-xs h-7">
                  <Printer className="w-3 h-3 mr-1" />
                  In
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
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
        <div className={`py-3 border-b ${theme === 'dark' ? 'bg-dseza-dark-secondary/50 border-dseza-dark-border' : 'bg-dseza-light-secondary/50 border-dseza-light-border'}`}>
          <div className="container mx-auto px-4">
            <nav className={`flex items-center space-x-2 text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              <Link 
                to="/" 
                className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Trang chủ
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link 
                to="/gioi-thieu" 
                className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Giới thiệu
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link 
                to="/gioi-thieu/cac-khu-chuc-nang" 
                className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Các khu chức năng
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Khu thương mại tự do Đà Nẵng
              </span>
            </nav>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 py-8">
          <article className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-8">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Khu thương mại tự do Đà Nẵng
              </h1>
            </header>

            {/* Article Content */}
            <div className={`prose prose-lg max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
              <div className="space-y-8 text-justify">
                {/* Nội dung sẽ được bổ sung */}
                <section>
                  <p className={`mb-4 text-center italic ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                    Nội dung đang được cập nhật...
                  </p>
                </section>
              </div>
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

export default KhuThuongMaiTuDoDaNang; 