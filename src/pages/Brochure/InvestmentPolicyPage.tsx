import React from 'react';
import { Link } from 'react-router-dom';
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Investment Policy Content Component
const InvestmentPolicyContent = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`prose prose-lg max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
      <div className="space-y-10 text-justify">
        <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
          Chính sách ưu đãi và hỗ trợ đầu tư vào Khu công nghệ cao Đà Nẵng
        </h2>
        
        <section>
          <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
            1. Ưu đãi về thuế thu nhập doanh nghiệp
          </h3>
          <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'}`}>
            <ul className="mb-6 space-y-3">
              <li>Thuế suất ưu đãi <strong>10%</strong> trong thời hạn <strong>15 năm</strong> (thời gian áp dụng thuế suất ưu đãi được tính liên tục từ năm đầu tiên doanh nghiệp có doanh thu).</li>
              <li>Dự án từ <strong>3000 tỷ đồng</strong> trở lên được hưởng thuế suất ưu đãi <strong>10%</strong> trong <strong>30 năm</strong>.</li>
              <li><strong>Miễn thuế 4 năm</strong>, giảm <strong>50%</strong> số thuế phải nộp trong <strong>9 năm</strong> tiếp theo (thời gian miễn thuế được tính liên tục từ năm đầu tiên doanh nghiệp có thu nhập chịu thuế).</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
            2. Ưu đãi về tín dụng đầu tư
          </h3>
          <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'}`}>
            <p className="mb-6">
              Các doanh nghiệp, tổ chức kinh tế, đơn vị sự nghiệp có thu đầu tư thuộc Danh mục các dự án vay vốn tín dụng đầu tư thực hiện theo quy định của pháp luật hiện hành.
            </p>
          </div>
        </section>

        <section>
          <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
            3. Ưu đãi về tiền thuê đất
          </h3>
          <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'}`}>
            <ul className="mb-6 space-y-3">
              <li>
                <strong>Miễn toàn bộ tiền thuê đất</strong> cho cả thời hạn dự án đầu tư thuê đối với:
                <ul className="mt-2 ml-4 space-y-1">
                  <li>• Đất xây dựng công trình giao thông và hạ tầng kỹ thuật</li>
                  <li>• Đất cây xanh, đất có mặt nước, công viên sử dụng công cộng</li>
                  <li>• Đất xây dựng cơ sở đào tạo nhân lực công nghệ cao</li>
                  <li>• Đất thực hiện dự án nhà ở cho chuyên gia, người lao động thuê khi làm việc tại Khu công nghệ cao</li>
                  <li>• Dự án thuộc Danh mục lĩnh vực đặc biệt ưu đãi đầu tư</li>
                </ul>
              </li>
              <li><strong>Miễn tiền thuê đất</strong> trong thời gian xây dựng cơ bản nhưng tối đa không quá <strong>03 năm</strong> kể từ ngày có quyết định cho thuê đất.</li>
              <li><strong>Miễn tiền thuê đất trong 19 năm:</strong> Dự án thuộc danh mục lĩnh vực ưu đãi đầu tư</li>
              <li><strong>Miễn tiền thuê đất trong 15 năm:</strong> Dự án không thuộc danh mục lĩnh vực ưu đãi đầu tư; dự án đầu tư xây dựng, kinh doanh kết cấu hạ tầng Khu công nghệ cao.</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
            4. Ưu đãi về thuế nhập khẩu
          </h3>
          <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'}`}>
            <ul className="mb-6 space-y-3">
              <li>
                <strong>Miễn thuế</strong> đối với hàng hóa nhập khẩu để tạo tài sản cố định của dự án trong Khu công nghệ cao, bao gồm:
                <ul className="mt-2 ml-4 space-y-1">
                  <li>• Máy móc, thiết bị, linh kiện</li>
                  <li>• Phương tiện vận tải</li>
                  <li>• Vật tư xây dựng trong nước chưa sản xuất được</li>
                  <li>• Áp dụng cho cả dự án đầu tư mới và dự án đầu tư mở rộng</li>
                </ul>
              </li>
              <li><strong>Miễn thuế nhập khẩu trong thời hạn 05 năm</strong> kể từ khi bắt đầu sản xuất đối với nguyên liệu, vật tư, linh kiện trong nước chưa sản xuất được nhập khẩu để sản xuất của các dự án đầu tư vào Khu công nghệ cao.</li>
              <li>
                <strong>Miễn thuế nhập khẩu</strong> đối với máy móc, thiết bị, phụ tùng, vật tư chuyên dùng trong nước chưa sản xuất được, tài liệu, sách báo khoa học chuyên dùng sử dụng trực tiếp cho:
                <ul className="mt-2 ml-4 space-y-1">
                  <li>• Nghiên cứu khoa học công nghệ</li>
                  <li>• Ươm tạo công nghệ</li>
                  <li>• Ươm tạo doanh nghiệp khoa học và công nghệ trong Khu công nghệ cao</li>
                </ul>
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
            5. Xuất nhập cảnh
          </h3>
          <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'}`}>
            <p className="mb-6">
              Nhà đầu tư, chuyên gia và người lao động là người Việt Nam định cư ở nước ngoài, người nước ngoài làm việc trực tiếp tại Khu công nghệ cao và thành viên gia đình (bao gồm bố, mẹ, vợ hoặc chồng, con đẻ, con nuôi dưới 18 tuổi) được xem xét cấp thị thực có giá trị xuất cảnh, nhập cảnh nhiều lần với thời hạn phù hợp với mục đích nhập cảnh theo quy định của pháp luật.
            </p>
          </div>
        </section>

        <div className={`mt-8 p-4 rounded-lg ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-dseza-light-secondary-bg'}`}>
          <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
            <strong>Lưu ý:</strong> Các chính sách ưu đãi trên được áp dụng theo quy định hiện hành của pháp luật Việt Nam. 
            Để biết thêm chi tiết và cập nhật mới nhất, quý nhà đầu tư vui lòng liên hệ trực tiếp với DSEZA.
          </p>
        </div>
      </div>
    </div>
  );
};

const InvestmentPolicyPage = () => {
  const { theme } = useTheme();
  
  const handleDownload = () => {
    // Logic tải xuống - có thể tải PDF hoặc Word
    console.log('Downloading investment policy document...');
  };

  const handleShare = () => {
    // Logic chia sẻ
    if (navigator.share) {
      navigator.share({
        title: 'Chính sách ưu đãi và hỗ trợ đầu tư vào Khu công nghệ cao Đà Nẵng - DSEZA',
        text: 'Chính sách ưu đãi và hỗ trợ đầu tư vào Khu công nghệ cao Đà Nẵng',
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
                to="/cam-nang-dau-tu" 
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Cẩm nang đầu tư
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Chính sách ưu đãi và hỗ trợ đầu tư
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
                Chính sách ưu đãi và hỗ trợ đầu tư vào Khu công nghệ cao Đà Nẵng
              </h1>
            </header>

            {/* Policy Content */}
            <div className="mb-8">
              <InvestmentPolicyContent />
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

export default InvestmentPolicyPage; 