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

export const FunctionsDutiesPage = () => {
  const { theme } = useTheme();

  const handleDownload = () => {
    // Logic tải xuống - có thể tải PDF hoặc Word
    console.log('Downloading document...');
  };

  const handleShare = () => {
    // Logic chia sẻ
    if (navigator.share) {
      navigator.share({
        title: 'Chức năng, nhiệm vụ, quyền hạn Ban Quản lý - DSEZA',
        text: 'Chức năng, nhiệm vụ, quyền hạn Ban Quản lý Khu công nghệ cao và các khu công nghiệp Đà Nẵng',
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
              <Link 
                to="/gioi-thieu/gioi-thieu-chung/tong-quan-ve-ban-quan-ly" 
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Tổng quan về Ban Quản lý
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Chức năng, nhiệm vụ
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
                Chức năng, nhiệm vụ, quyền hạn Ban Quản lý
              </h1>
              

            </header>

            {/* Article Content */}
            <div className={`prose prose-lg max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
              <div className="space-y-8 text-justify">
                {/* Giới thiệu chung */}
                <section>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                    Ban Quản lý Khu công nghệ cao và các khu công nghiệp Đà Nẵng được thực hiện theo Quyết định số 1296/QĐ-TTg ngày 03/10/2018 của Thủ tướng Chính phủ, trên cơ sở hợp nhất 2 đơn vị Ban Quản lý Khu công nghệ cao Đà Nẵng với Ban Quản lý các khu công nghiệp và chế xuất Đà Nẵng trước đây.
                  </p>
                  <p className={`mb-6 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                    Đây sẽ là đầu mối thống nhất cho việc quản lý hoạt động của các Khu công nghiệp trên địa bàn thành phố hiệu quả hơn, đồng thời tạo thuận lợi đẩy mạnh hoạt động xúc tiến đầu tư cho thành phố.
                  </p>
                </section>

                {/* 1. Chức năng */}
                <section>
                  <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                    1. Chức năng
                  </h2>
                  <div className="space-y-4">
                    <p className={theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}>
                      Ban quản lý Khu công nghệ cao và các Khu công nghiệp Đà Nẵng (sau đây viết tắt là Ban Quản lý) là cơ quan trực thuộc UBND thành phố, thực hiện chức năng quản lý nhà nước trực tiếp đối với Khu công nghệ cao và các khu công nghiệp trên địa bàn Đà Nẵng; quản lý và tổ chức thực hiện chức năng cung ứng dịch vụ hành chính công và dịch vụ hỗ trợ khác có liên quan đến hoạt động đầu tư và sản xuất, kinh doanh cho nhà đầu tư trong khu công nghệ cao và các khu công nghiệp.
                    </p>
                    <p className={theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}>
                      Ban Quản lý chịu sự chỉ đạo và quản lý về tổ chức, biên chế, chương trình kế hoạch công tác và kinh phí hoạt động của Ủy ban nhân dân thành phố; chịu sự chỉ đạo, hướng dẫn và kiểm tra về chuyên môn nghiệp vụ của các Bộ, ngành quản lý về lĩnh vực có liên quan.
                    </p>
                    <p className={theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}>
                      Ban Quản lý có tư cách pháp nhân; có con dấu mang hình quốc huy và tài khoản riêng; kinh phí quản lý hành chính nhà nước, kinh phí hoạt động sự nghiệp và vốn đầu tư phát triển do ngân sách nhà nước cấp theo kế hoạch hàng năm.
                    </p>
                  </div>
                </section>

                {/* 2. Nhiệm vụ và Quyền hạn */}
                <section>
                  <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                    2. Nhiệm vụ và Quyền hạn
                  </h2>
                  <div className="space-y-4">
                    <p className={theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}>
                      Ban Quản lý thực hiện nhiệm vụ, quyền hạn theo quy định tại:
                    </p>
                    <ul className={`space-y-2 ml-6 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                      <li>- Điều 35 Nghị định số 99/2003/NĐ-CP ngày 28 tháng 8 năm 2003 của Chính phủ về việc ban hành Quy chế Khu công nghệ cao.</li>
                      <li>- Điều 63 Nghị định số 82/2018/NĐ-CP ngày 22 tháng 5 năm 2018 của Chính phủ quy định về quản lý khu công nghiệp và khu kinh tế.</li>
                      <li>- Các văn bản pháp luật khác có liên quan.</li>
                    </ul>
                  </div>
                </section>

                {/* 3. Sơ đồ tổ chức */}
                <section>
                  <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                    3. Sơ đồ tổ chức
                  </h2>
                  <div className={`p-6 rounded-lg text-center ${theme === 'dark' ? 'bg-dseza-dark-secondary/20' : 'bg-dseza-light-secondary/20'}`}>
                    <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                      SƠ ĐỒ TỔ CHỨC BAN QUẢN LÝ KHU CÔNG NGHỆ CAO VÀ CÁC KHU CÔNG NGHIỆP ĐÀ NẴNG
                    </h3>
                    <p className={`italic ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                      Sơ đồ tổ chức chi tiết đang được cập nhật...
                    </p>
                  </div>
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