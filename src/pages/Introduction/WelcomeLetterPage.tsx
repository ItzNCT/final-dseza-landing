import React from 'react';
import { Link } from "react-router-dom";
import { 
  Download, 
  Share2, 
  Printer,
  ChevronRight 
} from 'lucide-react';
import { useTheme } from "@/context/ThemeContext";
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

// *** BẠN CÓ THỂ THAY THẾ NỘI DUNG TRONG COMPONENT NÀY ***
const WelcomeLetterContent = () => {
  const { theme } = useTheme();
  
  return (
    <div className="space-y-6 text-justify">
      <p className="text-lg mb-6">
        Chào mừng quý vị đã đến với DSEZA chúng tôi,
      </p>
      <p className="mb-4">
        Lời đầu tiên, Ban Quản lý Khu công nghệ cao và các khu công nghiệp Đà nẵng (DSEZA) xin được gửi đến Quý tổ chức, doanh nghiệp, nhà đầu tư, cá nhân lời chào trân trọng, lời chúc sức khỏe, an khang và thịnh vượng.
      </p>
      <p className="mb-4">
        Ban Quản lý Khu công nghệ cao và các khu công nghiệp Đà Nẵng được thành lập dựa trên cơ sở hợp nhất Ban Quản lý các Khu công nghiệp và chế xuất Đà Nẵng và Ban Quản lý Khu công nghệ cao Đà Nẵng, từ tháng 10/2018 nhằm đáp ứng với chủ trương của Chính phủ, Nhà nước và phù hợp với yêu cầu phát triển kinh tế - xã hội của cả nước và của thành phố Đà Nẵng.
      </p>
      <p className="mb-4">
        Ngày 29/4/2025, UBND TP.Đà Nẵng ban hành quyết định số 34/2025/QĐ-UBND quy định chức năng, nhiệm vụ, quyền hạn và cơ cấu tổ chức của ban quản lý, trong đó đáng chú ý là chức năng mới quản lý Khu thương mại tự do. Quyết định này thay thế các quyết định trước đó về quy định chức năng, nhiệm vụ, quyền hạn và cơ cấu tổ chức của Ban quản lý Khu Công nghệ cao và các KCN Đà Nẵng - đơn vị trực thuộc UBND thành phố.
      </p>
      <p className="mb-4">
        Ban Quản lý là cơ quan trực thuộc Ủy ban nhân dân thành phố Đà Nẵng, thực hiện chức năng quản lý nhà nước trực tiếp đối với khu công nghệ cao, khu công nghệ thông tin tập trung Đà Nẵng và các khu công nghiệp trên địa bàn thành phố Đà Nẵng; quản lý và tổ chức thực hiện chức năng cung ứng dịch vụ hành chính công và dịch vụ hỗ trợ khác có liên quan đến hoạt động đầu tư và sản xuất, kinh doanh cho nhà đầu tư trong khu công nghệ cao, khu công nghệ thông tin tập trung Đà Nẵng và các khu công nghiệp trên địa bàn thành phố Đà Nẵng theo quy định của pháp luật.
      </p>
      <p className="mb-4">
        Với tinh thần thiện chí của mình tại khu công nghệ cao, khu công nghệ thông tin tập trung Đà Nẵng và các khu công nghiệp trên địa bàn thành phố Đà Nẵng.  DSEZA cam kết luôn đồng hành cùng các tổ chức, doanh nghiệp, nhà đầu tư, cá nhân khi đặt niềm tin, lựa chọn khu công nghệ cao, khu công nghệ thông tin tập trung Đà Nẵng và các khu công nghiệp  trên địa bàn thành phố Đà Nẵng làm điểm đến trong thời gian qua, cũng như hiện tại và trong tương lai
      </p>
      <p className="mb-4">
        Hy vọng quý tổ chức, doanh nghiệp, nhà đầu tư, cá nhân thật sự hài lòngvới DSEZA và thành phố Đà Nẵng. Một lần nữa, kính chúc quý vị luôn gặp nhiều may mắn, thành công và phát đạt. 
      </p>
      <p className="font-semibold text-right mb-2">Trân trọng cảm ơn.</p>
      <p className="font-semibold text-right">DSEZA</p>
    </div>
  );
};

const WelcomeLetterPage = () => {
  const { theme } = useTheme();

  const handleDownload = () => {
    // Logic tải xuống - có thể tải PDF hoặc Word
    console.log('Downloading document...');
  };

  const handleShare = () => {
    // Logic chia sẻ
    if (navigator.share) {
      navigator.share({
        title: 'Thư ngỏ - DSEZA',
        text: 'Thư ngỏ từ Ban Quản lý Khu công nghệ cao và các khu công nghiệp Đà Nẵng',
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Đã sao chép link vào clipboard!');
    }
  };

  const handlePrint = () => {
    // Logic in trang
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
              <Link 
                to="/gioi-thieu" 
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Giới thiệu
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Thư ngỏ
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
                Thư ngỏ
              </h1>
              

            </header>

            {/* Article Content */}
            <div className={`prose prose-lg max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
              <WelcomeLetterContent />
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

export default WelcomeLetterPage; 