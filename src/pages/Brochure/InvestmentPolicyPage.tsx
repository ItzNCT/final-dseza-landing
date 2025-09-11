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
import { useLanguage } from "@/context/LanguageContext";
import { useLanguageRoutes } from "@/utils/routes";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileLayout from "@/components/mobile/MobileLayout";

// Investment Policy Content Component
const InvestmentPolicyContent = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isVi = language === 'vi';
  
  return (
    <div className={`prose prose-lg max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
      <div className="space-y-10 text-justify">
        <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
          {isVi ? 'Chính sách ưu đãi và hỗ trợ đầu tư vào Khu công nghệ cao Đà Nẵng' : 'Investment incentives and support policies in Da Nang Hi‑Tech Park'}
        </h2>
        
        <section>
          <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
            {isVi ? '1. Ưu đãi về thuế thu nhập doanh nghiệp' : '1. Corporate income tax incentives'}
          </h3>
          <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'}`}>
            <ul className="mb-6 space-y-3">
              <li>
                {isVi
                  ? <>Thuế suất ưu đãi <strong>10%</strong> trong thời hạn <strong>15 năm</strong> (thời gian áp dụng thuế suất ưu đãi được tính liên tục từ năm đầu tiên doanh nghiệp có doanh thu).</>
                  : <>Preferential corporate income tax rate of <strong>10%</strong> for <strong>15 years</strong> (applied continuously from the first year the enterprise has revenue).</>}
              </li>
              <li>
                {isVi
                  ? <>Dự án từ <strong>3000 tỷ đồng</strong> trở lên được hưởng thuế suất ưu đãi <strong>10%</strong> trong <strong>30 năm</strong>.</>
                  : <>Projects with total investment from <strong>VND 3,000 billion</strong> are entitled to the <strong>10%</strong> rate for <strong>30 years</strong>.</>}
              </li>
              <li>
                {isVi
                  ? <><strong>Miễn thuế 4 năm</strong>, giảm <strong>50%</strong> số thuế phải nộp trong <strong>9 năm</strong> tiếp theo (thời gian miễn thuế được tính liên tục từ năm đầu tiên doanh nghiệp có thu nhập chịu thuế).</>
                  : <><strong>Tax exemption for 4 years</strong>, and <strong>50%</strong> reduction for the following <strong>9 years</strong> (calculated continuously from the first year with taxable income).</>}
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
            {isVi ? '2. Ưu đãi về tín dụng đầu tư' : '2. Investment credit incentives'}
          </h3>
          <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'}`}>
            <p className="mb-6">
              {isVi
                ? 'Các doanh nghiệp, tổ chức kinh tế, đơn vị sự nghiệp có thu đầu tư thuộc Danh mục các dự án vay vốn tín dụng đầu tư thực hiện theo quy định của pháp luật hiện hành.'
                : 'Enterprises and entities eligible under the list of projects for investment credit loans shall comply with prevailing regulations of Vietnamese law.'}
            </p>
          </div>
        </section>

        <section>
          <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
            {isVi ? '3. Ưu đãi về tiền thuê đất' : '3. Land rent incentives'}
          </h3>
          <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'}`}>
            <ul className="mb-6 space-y-3">
              <li>
                {isVi ? <><strong>Miễn toàn bộ tiền thuê đất</strong> cho cả thời hạn dự án đầu tư thuê đối với:</> : <><strong>Full land rent exemption</strong> for the entire project term for:</>}
                <ul className="mt-2 ml-4 space-y-1">
                  <li>{isVi ? '• Đất xây dựng công trình giao thông và hạ tầng kỹ thuật' : '• Land for transportation works and technical infrastructure'}</li>
                  <li>{isVi ? '• Đất cây xanh, đất có mặt nước, công viên sử dụng công cộng' : '• Land for green areas, water surfaces, and public parks'}</li>
                  <li>{isVi ? '• Đất xây dựng cơ sở đào tạo nhân lực công nghệ cao' : '• Land for facilities training high‑tech human resources'}</li>
                  <li>{isVi ? '• Đất thực hiện dự án nhà ở cho chuyên gia, người lao động thuê khi làm việc tại Khu công nghệ cao' : '• Land for housing projects for experts and workers employed in the Hi‑Tech Park'}</li>
                  <li>{isVi ? '• Dự án thuộc Danh mục lĩnh vực đặc biệt ưu đãi đầu tư' : '• Projects in specially encouraged investment sectors'}</li>
                </ul>
              </li>
              <li>
                {isVi
                  ? <><strong>Miễn tiền thuê đất</strong> trong thời gian xây dựng cơ bản nhưng tối đa không quá <strong>03 năm</strong> kể từ ngày có quyết định cho thuê đất.</>
                  : <><strong>Land rent exemption</strong> during the basic construction period, but no more than <strong>03 years</strong> from the land lease decision date.</>}
              </li>
              <li>
                {isVi
                  ? <><strong>Miễn tiền thuê đất trong 19 năm:</strong> Dự án thuộc danh mục lĩnh vực ưu đãi đầu tư</>
                  : <><strong>Land rent exemption for 19 years:</strong> Projects in the list of encouraged investment sectors</>}
              </li>
              <li>
                {isVi
                  ? <><strong>Miễn tiền thuê đất trong 15 năm:</strong> Dự án không thuộc danh mục lĩnh vực ưu đãi đầu tư; dự án đầu tư xây dựng, kinh doanh kết cấu hạ tầng Khu công nghệ cao.</>
                  : <><strong>Land rent exemption for 15 years:</strong> Projects not in encouraged sectors; projects investing in development and operation of Hi‑Tech Park infrastructure.</>}
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
            {isVi ? '4. Ưu đãi về thuế nhập khẩu' : '4. Import tax incentives'}
          </h3>
          <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'}`}>
            <ul className="mb-6 space-y-3">
              <li>
                {isVi ? <><strong>Miễn thuế</strong> đối với hàng hóa nhập khẩu để tạo tài sản cố định của dự án trong Khu công nghệ cao, bao gồm:</> : <><strong>Exemption</strong> for imports to form fixed assets of projects in the Hi‑Tech Park, including:</>}
                <ul className="mt-2 ml-4 space-y-1">
                  <li>{isVi ? '• Máy móc, thiết bị, linh kiện' : '• Machinery, equipment, components'}</li>
                  <li>{isVi ? '• Phương tiện vận tải' : '• Means of transport'}</li>
                  <li>{isVi ? '• Vật tư xây dựng trong nước chưa sản xuất được' : '• Building materials not yet produced domestically'}</li>
                  <li>{isVi ? '• Áp dụng cho cả dự án đầu tư mới và dự án đầu tư mở rộng' : '• Applicable to both new investments and expansion projects'}</li>
                </ul>
              </li>
              <li>
                {isVi
                  ? <><strong>Miễn thuế nhập khẩu trong thời hạn 05 năm</strong> kể từ khi bắt đầu sản xuất đối với nguyên liệu, vật tư, linh kiện trong nước chưa sản xuất được nhập khẩu để sản xuất của các dự án đầu tư vào Khu công nghệ cao.</>
                  : <><strong>Import tax exemption for 05 years</strong> from the start of production for raw materials, supplies, and components not yet produced domestically, imported for production by projects in the Hi‑Tech Park.</>}
              </li>
              <li>
                {isVi ? <><strong>Miễn thuế nhập khẩu</strong> đối với máy móc, thiết bị, phụ tùng, vật tư chuyên dùng trong nước chưa sản xuất được, tài liệu, sách báo khoa học chuyên dùng sử dụng trực tiếp cho:</> : <><strong>Import tax exemption</strong> for machinery, equipment, spare parts, specialized supplies not yet produced domestically, and specialized scientific documents used directly for:</>}
                <ul className="mt-2 ml-4 space-y-1">
                  <li>{isVi ? '• Nghiên cứu khoa học công nghệ' : '• Scientific and technological research'}</li>
                  <li>{isVi ? '• Ươm tạo công nghệ' : '• Technology incubation'}</li>
                  <li>{isVi ? '• Ươm tạo doanh nghiệp khoa học và công nghệ trong Khu công nghệ cao' : '• Incubation of science and technology enterprises in the Hi‑Tech Park'}</li>
                </ul>
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
            {isVi ? '5. Xuất nhập cảnh' : '5. Entry and exit (immigration)'}
          </h3>
          <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'}`}>
            <p className="mb-6">
              {isVi
                ? 'Nhà đầu tư, chuyên gia và người lao động là người Việt Nam định cư ở nước ngoài, người nước ngoài làm việc trực tiếp tại Khu công nghệ cao và thành viên gia đình (bao gồm bố, mẹ, vợ hoặc chồng, con đẻ, con nuôi dưới 18 tuổi) được xem xét cấp thị thực có giá trị xuất cảnh, nhập cảnh nhiều lần với thời hạn phù hợp với mục đích nhập cảnh theo quy định của pháp luật.'
                : 'Investors, experts, and workers who are overseas Vietnamese or foreigners working directly in the Hi‑Tech Park, and their family members (parents, spouse, biological children, adopted children under 18) may be considered for multiple‑entry visas with validity appropriate to the immigration purpose, in accordance with Vietnamese law.'}
            </p>
          </div>
        </section>

        <div className={`mt-8 p-4 rounded-lg ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-dseza-light-secondary-bg'}`}>
          <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
            {isVi
              ? <><strong>Lưu ý:</strong> Các chính sách ưu đãi trên được áp dụng theo quy định hiện hành của pháp luật Việt Nam. Để biết thêm chi tiết và cập nhật mới nhất, quý nhà đầu tư vui lòng liên hệ trực tiếp với DSEZA.</>
              : <><strong>Note:</strong> The above incentives are applied in accordance with current Vietnamese law. For details and the latest updates, please contact DSEZA directly.</>}
          </p>
        </div>
      </div>
    </div>
  );
};

const InvestmentPolicyPage = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isVi = language === 'vi';
  const { createUrl } = useLanguageRoutes();
  const isMobile = useIsMobile();
  
  const handleDownload = () => {
    // Logic tải xuống - có thể tải PDF hoặc Word
    console.log('Downloading investment policy document...');
  };

  const handleShare = () => {
    // Logic chia sẻ
    if (navigator.share) {
      navigator.share({
        title: isVi ? 'Chính sách ưu đãi và hỗ trợ đầu tư vào Khu công nghệ cao Đà Nẵng - DSEZA' : 'Investment incentives and support policies in Da Nang Hi‑Tech Park - DSEZA',
        text: isVi ? 'Chính sách ưu đãi và hỗ trợ đầu tư vào Khu công nghệ cao Đà Nẵng' : 'Investment incentives and support policies in Da Nang Hi‑Tech Park',
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert(isVi ? 'Đã sao chép link vào clipboard!' : 'Link copied to clipboard!');
    }
  };

  const handlePrint = () => {
    // Logic in trang
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
                <Link 
                  to={createUrl('/cam-nang-dau-tu')} 
                  className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
                >
                  {isVi ? 'Cẩm nang đầu tư' : 'Investment handbook'}
                </Link>
                <ChevronRight className="h-2.5 w-2.5" />
                <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  {isVi ? 'Chính sách ưu đãi và hỗ trợ đầu tư' : 'Investment incentives and support policies'}
                </span>
              </nav>
            </div>

            {/* Page Header - Mobile optimized */}
            <div className="text-center py-3">
              <h1 className={`${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'} text-xl font-bold mb-2`}>
                {isVi ? 'Chính sách ưu đãi và hỗ trợ đầu tư vào Khu công nghệ cao Đà Nẵng' : 'Investment incentives and support policies in Da Nang Hi‑Tech Park'}
              </h1>
              <div className={`${theme === 'dark' ? 'bg-dseza-dark-primary' : 'bg-dseza-light-primary'} w-12 h-0.5 mx-auto mb-2 rounded-full`}></div>
            </div>

            {/* Content */}
            <div className={`${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'} rounded-lg p-3 border`}>
              <InvestmentPolicyContent />
            </div>

            {/* Share Section - Mobile optimized */}
            <div className={`${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'} mt-2 pt-4 border-t`}>
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
              <Link 
                to={createUrl('/cam-nang-dau-tu')} 
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {isVi ? 'Cẩm nang đầu tư' : 'Investment handbook'}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {isVi ? 'Chính sách ưu đãi và hỗ trợ đầu tư' : 'Investment incentives and support policies'}
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
                {isVi ? 'Chính sách ưu đãi và hỗ trợ đầu tư vào Khu công nghệ cao Đà Nẵng' : 'Investment incentives and support policies in Da Nang Hi‑Tech Park'}
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

export default InvestmentPolicyPage; 