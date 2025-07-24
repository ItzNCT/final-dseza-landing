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

const KhuCongNghiepDaNang = () => {
  const { theme } = useTheme();

  const handleDownload = () => {
    console.log('Downloading document...');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Khu công nghiệp Đà Nẵng - DSEZA',
        text: 'Thông tin về Khu công nghiệp Đà Nẵng',
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
              <Link
                to="/gioi-thieu"
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Giới thiệu
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link
                to="/gioi-thieu/cac-khu-chuc-nang"
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Các khu chức năng
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Khu công nghiệp Đà Nẵng
              </span>
            </nav>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 py-8">
          <article className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-8">
              <h1 className={`font-montserrat text-3xl md:text-4xl font-bold mb-4 leading-tight ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Khu công nghiệp Đà Nẵng
              </h1>
            </header>

            {/* Article Content */}
            <div className={`prose-lg max-w-none font-inter ${theme === 'dark' ? 'prose-invert text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                 <p>Khu Công nghiệp Đà Nẵng được thành lập theo Giấy Phép đầu tư số 689/GP ngày 21/10/1993 của UBNN về Hợp tác và Đầu tư (nay là Bộ Kế hoạch và Đầu tư) tại quận Sơn Trà, nằm cách cảng biển Tiên Sa 6 Km về phía Nam, cách Sân bay quốc tế Đà Nẵng 5km về phía Đông và cách trung tâm thành phố Đà Nẵng gần 2km. Dự án do Công ty Liên doanh MASSDA làm chủ đầu tư.</p>
                 <p>Toàn bộ các công trình hạ tầng như hệ thống cấp điện, cấp nước, đường giao thông, thông tin liên lạc ... tại Khu Công nghiệp Đà Nẵng đã được đầu tư xây dựng hoàn chỉnh.</p>
                <div className="my-6 rounded-lg overflow-hidden shadow-lg">
                    <img
                        src="/media/Functionalmap/khu-cong-nghiep-da-nang.jpg"
                        alt="Khu công nghiệp Đà Nẵng"
                        className="w-full h-auto object-cover"
                    />
                </div>
                <div className="space-y-8 text-justify">
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>1. Vị trí địa lí</h2>
                        <p>quận Sơn Trà, thành phố Đà Nẵng.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>Cách cảng biển Tiên Sa: 06 km</li>
                            <li>Cách Sân bay Quốc tế Đà Nẵng: 04 km</li>
                            <li>Cách Trung tâm thành phố Đà Nẵng: 02 km</li>
                            <li>Cách ga đường sắt: 03 km</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>2. Tổng diện tích</h2>
                        <p>50,1 ha, trong đó có 41.87 ha đất công nghiệp có thể cho thuê. Hiện tại, Khu công nghiệp đã lấp đầy 100% diện tích và không còn đất để cho thuê. Ngoài ra Thủ tướng Chính phủ đã đồng ý chuyển đổi sang Khu đô thị.</p>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>3. Giá cho thuê lại đất và sử dụng hạ tầng</h2>
                        <p>Hiện nay đất tại Khu công nghiệp Đà Nẵng đã được cho thuê hết nên Công ty TNHH Massda Land không thực hiện đăng ký.</p>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>4. Chủ đầu tư kinh doanh hạ tầng</h2>
                        <p className="font-semibold">Công ty TNHH Massda Land</p>
                        <ul className="list-none pl-0 mt-2 space-y-2">
                            <li><strong>Địa chỉ:</strong> KCN Đà Nẵng, quận Sơn Trà, Thành phố Đà Nẵng.</li>
                            <li><strong>Điện thoại:</strong> 84-511-3.844.375</li>
                            <li><strong>Fax:</strong> 84-511-3.844.374</li>
                            <li><strong>Email:</strong> massda@dng.vnn.vn</li>
                        </ul>
                    </section>
                     <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>5. Hiện trạng quy hoạch sử dụng đất</h2>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>Tổng diện tích đất theo quy hoạch : 50,10 ha</li>
                            <li>Diện tích đất công nghiệp có thể cho thuê : 41,87 ha</li>
                            <li>Diện tích đất công nghiệp đã cho thuê: 41,87 ha</li>
                            <li>Diện tích đất công nghiệp còn lại : 0,00 ha</li>
                            <li>Diện tích đất công nghiệp chưa có hạ tầng 0,00 ha</li>
                            <li>Tỷ lệ lắp đầy : 100%</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>6. Bản đồ quy hoạch KCN Đà Nẵng</h2>
                        <p>Tính đến tháng 3 năm 2021 (có file đính kèm)</p>
                        <a href="#" className={`font-semibold ${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary-hover' : 'text-dseza-light-primary hover:text-dseza-light-primary-hover'} underline`}>
                            (Xem tại đây)
                        </a>
                    </section>
                     <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>7. Bản đồ quy hoạch Tổng mặt bằng 1/2000 Khu đô thị An Đồn</h2>
                        <p>UBND thành phố phê duyệt tại Quyết định số 1382/QĐ-UBND ngày 15/3/2017</p>
                        <a href="#" className={`font-semibold ${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary-hover' : 'text-dseza-light-primary hover:text-dseza-light-primary-hover'} underline`}>
                           (Xem tại đây)
                        </a>
                    </section>
                </div>
            </div>

            {/* Share Section */}
            <div className={`mt-12 pt-8 border-t ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
              <h3 className={`font-montserrat text-lg font-semibold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Chia sẻ trang:
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  Tải xuống
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  Chia sẻ
                </Button>
                <Button variant="outline" size="sm" onClick={handlePrint}>
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

export default KhuCongNghiepDaNang;