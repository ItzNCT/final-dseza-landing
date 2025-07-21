import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, 
  Share2, 
  Printer, 
  FileText,
  ExternalLink, 
  ZoomIn, 
  ZoomOut,
  ChevronRight,
  Building,
  MapPin,
  Zap,
  Users
} from 'lucide-react';
import { useTheme } from "@/context/ThemeContext";
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Brochure Content Component
const BrochureContent = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`prose prose-lg max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
      <div className="space-y-10 text-justify">
        {/* Header Section */}
        <section className="text-center mb-8">
          <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
            BAN QUẢN LÝ KHU CÔNG NGHỆ CAO VÀ CÁC KHU CÔNG NGHIỆP ĐÀ NẴNG
          </h2>
          <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
            DA NANG SPECIFIC ECONOMIC ZONES AUTHORITY (DSEZA)
          </h3>
          <p className={`text-lg mt-4 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
            Điểm đến lý tưởng cho các nhà đầu tư trong và ngoài nước
          </p>
        </section>

        {/* About DSEZA */}
        <section>
          <h3 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
            <Building className="w-6 h-6" />
            Giới thiệu về DSEZA
          </h3>
          <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'}`}>
            <p className="mb-4">
              Ban Quản lý Khu công nghệ cao và các Khu công nghiệp Đà Nẵng (DSEZA) là cơ quan trực thuộc UBND thành phố Đà Nẵng, 
              được thành lập nhằm quản lý và phát triển các khu kinh tế đặc biệt tại Đà Nẵng.
            </p>
            <p className="mb-4">
              <strong>Sứ mệnh:</strong> Tạo dựng môi trường đầu tư thuận lợi, hiện đại và bền vững, thu hút các dự án đầu tư 
              chất lượng cao trong lĩnh vực công nghệ, sản xuất và dịch vụ.
            </p>
          </div>
        </section>

        {/* Key Zones */}
        <section>
          <h3 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
            <MapPin className="w-6 h-6" />
            Các Khu chức năng chính
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'}`}>
              <h4 className="font-bold text-lg mb-2">🏢 Khu Công nghệ cao Đà Nẵng</h4>
              <p className="text-sm">Trung tâm nghiên cứu và phát triển công nghệ, đào tạo nhân lực chất lượng cao</p>
            </div>
            
            <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'}`}>
              <h4 className="font-bold text-lg mb-2">🏭 Các Khu Công nghiệp</h4>
              <p className="text-sm">7 khu công nghiệp với tổng diện tích hơn 4.000 ha, thu hút đầu tư sản xuất</p>
            </div>
            
            <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'}`}>
              <h4 className="font-bold text-lg mb-2">💻 Khu CNTT tập trung</h4>
              <p className="text-sm">Trung tâm phát triển công nghệ thông tin và chuyển đổi số</p>
            </div>
            
            <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'}`}>
              <h4 className="font-bold text-lg mb-2">🌐 Khu Thương mại Tự do</h4>
              <p className="text-sm">Khu vực đặc biệt với các ưu đãi về thương mại và dịch vụ</p>
            </div>
          </div>
        </section>

        {/* Investment Advantages */}
        <section>
          <h3 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
            <Zap className="w-6 h-6" />
            Lợi thế đầu tư
          </h3>
          
          <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'}`}>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <h4 className="font-semibold">Vị trí địa lý chiến lược</h4>
                  <p className="text-sm">Trung tâm kết nối Đông Nam Á, gần sân bay quốc tế và cảng biển</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-2xl">💰</span>
                <div>
                  <h4 className="font-semibold">Chính sách ưu đãi hấp dẫn</h4>
                  <p className="text-sm">Thuế suất 10%, miễn thuế thu nhập doanh nghiệp, ưu đãi tiền thuê đất</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-2xl">🏗️</span>
                <div>
                  <h4 className="font-semibold">Hạ tầng hiện đại</h4>
                  <p className="text-sm">Hệ thống điện, nước, viễn thông, giao thông hoàn chỉnh</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-2xl">👥</span>
                <div>
                  <h4 className="font-semibold">Nguồn nhân lực chất lượng</h4>
                  <p className="text-sm">Lao động được đào tạo bài bản, trình độ cao</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Statistics */}
        <section>
          <h3 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
            <Users className="w-6 h-6" />
            Thành tựu nổi bật
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`text-center p-4 rounded-lg ${theme === 'dark' ? 'bg-gradient-to-br from-blue-900 to-blue-800' : 'bg-gradient-to-br from-blue-50 to-blue-100'}`}>
              <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>400+</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-blue-200' : 'text-blue-700'}`}>Doanh nghiệp</div>
            </div>
            
            <div className={`text-center p-4 rounded-lg ${theme === 'dark' ? 'bg-gradient-to-br from-green-900 to-green-800' : 'bg-gradient-to-br from-green-50 to-green-100'}`}>
              <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-green-300' : 'text-green-600'}`}>150k+</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-green-200' : 'text-green-700'}`}>Việc làm</div>
            </div>
            
            <div className={`text-center p-4 rounded-lg ${theme === 'dark' ? 'bg-gradient-to-br from-purple-900 to-purple-800' : 'bg-gradient-to-br from-purple-50 to-purple-100'}`}>
              <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-purple-300' : 'text-purple-600'}`}>$8B+</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-purple-200' : 'text-purple-700'}`}>Vốn đầu tư</div>
            </div>
            
            <div className={`text-center p-4 rounded-lg ${theme === 'dark' ? 'bg-gradient-to-br from-orange-900 to-orange-800' : 'bg-gradient-to-br from-orange-50 to-orange-100'}`}>
              <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-orange-300' : 'text-orange-600'}`}>4000+</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-orange-200' : 'text-orange-700'}`}>Hecta</div>
            </div>
          </div>
        </section>

        {/* Priority Sectors */}
        <section>
          <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
            Lĩnh vực ưu tiên đầu tư
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className={`p-4 border rounded-lg ${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'}`}>
              <h4 className="font-semibold mb-2">🔬 Công nghệ cao</h4>
              <ul className="text-sm space-y-1">
                <li>• Vi mạch bán dẫn</li>
                <li>• Trí tuệ nhân tạo</li>
                <li>• IoT và Big Data</li>
              </ul>
            </div>
            
            <div className={`p-4 border rounded-lg ${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'}`}>
              <h4 className="font-semibold mb-2">🏭 Sản xuất thông minh</h4>
              <ul className="text-sm space-y-1">
                <li>• Cơ khí chính xác</li>
                <li>• Điện tử</li>
                <li>• Dệt may công nghệ cao</li>
              </ul>
            </div>
            
            <div className={`p-4 border rounded-lg ${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'}`}>
              <h4 className="font-semibold mb-2">🌱 Năng lượng sạch</h4>
              <ul className="text-sm space-y-1">
                <li>• Năng lượng tái tạo</li>
                <li>• Công nghệ xanh</li>
                <li>• Môi trường</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className={`mt-8 p-6 rounded-lg text-white ${theme === 'dark' ? 'bg-gradient-to-r from-dseza-dark-primary to-blue-800' : 'bg-gradient-to-r from-dseza-light-primary to-blue-600'}`}>
          <h3 className="text-xl font-bold mb-4">Liên hệ với chúng tôi</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Địa chỉ:</strong> Lô A17, đường Trung tâm, Khu công nghệ cao, xã Hòa Liên, huyện Hòa Vang, Đà Nẵng</p>
              <p><strong>Điện thoại:</strong> 0236 3666117</p>
            </div>
            <div>
              <p><strong>Email:</strong> dseza@danang.gov.vn</p>
              <p><strong>Website:</strong> www.dseza.danang.gov.vn</p>
            </div>
          </div>
        </section>

        <div className={`mt-8 text-center text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
          <p><strong>DSEZA</strong> - Cùng bạn kiến tạo tương lai</p>
          <p><em>"Building the Future Together"</em></p>
        </div>
      </div>
    </div>
  );
};

const BrochurePage = () => {
  const { theme } = useTheme();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const pdfUrl = '/dhpiza-profile-2023-176x250-vn.pdf';

  const handleDownload = () => {
    // Tải xuống file PDF thật
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Brochure-DSEZA-2023.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    // Logic chia sẻ
    if (navigator.share) {
      navigator.share({
        title: 'Brochure - Giới thiệu tổng quan DSEZA',
        text: 'Brochure giới thiệu tổng quan về Ban Quản lý Khu công nghệ cao và các Khu công nghiệp Đà Nẵng',
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Đã sao chép link vào clipboard!');
    }
  };

  const handlePrint = () => {
    // Mở PDF trong tab mới để in
    window.open(pdfUrl, '_blank');
  };

  const handleViewFullscreen = () => {
    window.open(pdfUrl, '_blank');
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
                Brochure - Giới thiệu tổng quan DSEZA
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
                Brochure - Giới thiệu tổng quan DSEZA
              </h1>
              
              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-2 flex-wrap pt-4">
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Tải xuống
                </Button>
                <Button variant="outline" size="sm" onClick={handleViewFullscreen}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Xem toàn màn hình
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
            </header>

            {/* PDF Viewer */}
            <div className="w-full mb-8">
              <div className={`rounded-lg p-4 mb-4 border ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Xem trước tài liệu</h3>
                  <div className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                    <FileText className="w-4 h-4" />
                    <span>File PDF - {(3.7).toFixed(1)} MB</span>
                  </div>
                </div>
                
                {/* PDF Embed */}
                <div className="relative w-full" style={{ height: '800px' }}>
                  <iframe
                    src={`${pdfUrl}#view=FitH`}
                    className={`w-full h-full border rounded ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}
                    title="Brochure DSEZA"
                  />
                </div>
                
                {/* PDF Controls */}
                <div className="mt-4 flex items-center justify-center gap-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleViewFullscreen}
                    className="flex items-center gap-2"
                  >
                    <ZoomIn className="w-4 h-4" />
                    Xem kích thước thật
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleDownload}
                    className={`flex items-center gap-2 ${
                      theme === 'dark' 
                        ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary-hover' 
                        : 'bg-dseza-light-primary hover:bg-dseza-light-primary-hover'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    Tải xuống PDF
                  </Button>
                </div>
              </div>
              
              {/* Alternative download section for browsers that don't support PDF embed */}
              <div className={`mt-6 p-4 border rounded-lg ${
                theme === 'dark' 
                  ? 'bg-yellow-900/20 border-yellow-800' 
                  : 'bg-yellow-50 border-yellow-200'
              }`}>
                <div className="flex items-start gap-3">
                  <FileText className={`w-5 h-5 mt-0.5 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`} />
                  <div className="flex-1">
                    <h4 className={`font-medium mb-1 ${theme === 'dark' ? 'text-yellow-200' : 'text-yellow-800'}`}>
                      Không thể hiển thị PDF?
                    </h4>
                    <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-700'}`}>
                      Trình duyệt của bạn có thể không hỗ trợ hiển thị PDF. Bạn có thể tải xuống để xem.
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleDownload}>
                        <Download className="w-4 h-4 mr-2" />
                        Tải xuống PDF
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleViewFullscreen}>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Mở trong tab mới
                      </Button>
                    </div>
                  </div>
                </div>
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

export default BrochurePage; 