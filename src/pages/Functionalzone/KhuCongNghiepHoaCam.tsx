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

const KhuCongNghiepHoaCam = () => {
  const { theme } = useTheme();

  const handleDownload = () => {
    console.log('Downloading document...');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Khu công nghiệp Hòa Cầm - DSEZA',
        text: 'Thông tin về Khu công nghiệp Hòa Cầm',
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
                Khu công nghiệp Hòa Cầm
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
                Khu công nghiệp Hòa Cầm
              </h1>
            </header>

            {/* Article Content */}
            <div className={`prose-lg max-w-none font-inter ${theme === 'dark' ? 'prose-invert text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                <p>KCN Hòa Cầm được thành lập theo Quyết định số 1252/QĐ-BXD ngày 19/9/2003 của Bộ Xây dựng về phê duyệt Quy hoạch chi tiết KCN Hòa Cầm thành phố Đà Nẵng, do Công ty Phát triển và Khai thác hạ tầng KCN Đà Nẵng làm chủ đầu tư. Đến nay, KCN Hòa Cầm đã được chuyển giao cho Công ty Cổ phần Đầu tư KCN Hòa Cầm (Công ty IZI) làm chủ đầu tư theo hướng xã hội hóa ; nằm cách trung tâm thành phố Đà Nẵng 8km, cách các công trình hạ tầng quan trọng như: cảng biển Tiên Sa, cảng biển Liên Chiểu, sân bay quốc tế Đà Nẵng đều nằm trong khoảng từ 5 đến 7km.</p>
                <div className="my-6 rounded-lg overflow-hidden shadow-lg">
                    <img
                        src="/media/Functionalmap/khu-cong-nghiep-hoa-cam.jpg"
                        alt="Bản đồ Khu công nghiệp Hòa Cầm"
                        className="w-full h-auto object-cover"
                    />
                </div>
                <div className="space-y-8 text-justify">
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>1. Vị trí địa lý</h2>
                        <p>quận Cẩm Lệ, thành phố Đà Nẵng.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>Cách cảng biển Tiên Sa: 10 km</li>
                            <li>Cách Sân bay Quốc tế Đà Nẵng: 07 km</li>
                            <li>Cách Trung tâm thành phố Đà Nẵng: 08 km</li>
                            <li>Cách ga đường sắt: 08 km</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>2. Tổng diện tích</h2>
                        <p>149,84 ha, trong đó có 107,07 ha đất công nghiệp có thể cho thuê.</p>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>3. Giá cho thuê lại đất và tiền sử dụng hạ tầng: (Đến tháng 8 năm 2054)</h2>
                        <p className="text-sm italic">Ngày cập nhật: 05/2020</p>
                        <p className="text-sm italic">Giá có tính chất tham khảo, mọi chi tiết xin liên hệ Công ty Cổ phần Đầu tư Khu công nghiệp Hòa Cầm (HoacamIZI)</p>
                        <div className="mt-4">
                            <h3 className={`font-montserrat text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>- Đơn giá thuê lại đất:</h3>
                            <div className="overflow-x-auto">
                                <table className={`min-w-full border-collapse border text-sm ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                    <thead className={`${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`}>
                                        <tr>
                                            <th className={`p-3 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>Phương thức thanh toán</th>
                                            <th className={`p-3 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>Đơn giá (đồng/m2/năm)</th>
                                        </tr>
                                    </thead>
                                    <tbody className={`${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                        <tr className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
                                            <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>Trả tiền thuê lại đất hàng năm</td>
                                            <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>80.000</td>
                                        </tr>
                                        <tr className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-dseza-light-secondary-bg'}`}>
                                            <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>Trả tiền thuê lại đất một lần cho toàn bộ thời hạn thuê (đến ngày 08/8/2054)</td>
                                            <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>2.150.000 (đồng/m2/toàn bộ thời hạn thuê)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className={`font-montserrat text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>- Đơn giá tiền sử dụng hạ tầng:</h3>
                            <p>14.950 đồng/m2/năm (trả hàng năm)</p>
                            <p className="mt-2 text-sm italic">Các đơn giá nêu trên chưa bao gồm thuế GTGT</p>
                        </div>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>4. Chủ đầu tư kinh doanh hạ tầng</h2>
                        <p className="font-semibold">Công ty Cổ phần đầu tư KCN Hòa Cầm (Hoa Cam IZI).</p>
                        <ul className="list-none pl-0 mt-2 space-y-2">
                            <li><strong>Địa chỉ:</strong> Đường số 1, Khu công nghiệp Hòa Cầm, Phường Hòa Thọ Tây, Quận Cẩm Lệ, Thành phố Đà Nẵng.</li>
                            <li><strong>Điện thoại:</strong> (+84) 914.109667 - 672 - 673 - 674 - 675</li>
                            <li><strong>Fax:</strong> (+84 236) 3.898.077</li>
                            <li><strong>Email:</strong> hoacamizi@vnn.vn</li>
                        </ul>
                    </section>
                     <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>5. Hiện trạng quy hoạch sử dụng đất</h2>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>Tổng diện tích đất theo quy hoạch : 149,84 ha</li>
                            <li>Diện tích đất công nghiệp có thể cho thuê : 107,07 ha</li>
                            <li>Diện tích đất công nghiệp đã cho thuê: 94,57ha</li>
                            <li>Diện tích đất công nghiệp còn lại : 12,5 ha</li>
                            <li>Diện tích đất công nghiệp chưa có hạ tầng 12,5 ha</li>
                            <li>Tỷ lệ lắp đầy : 88,33%</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>6. Bản đồ quy hoạch KCN Hòa Cầm</h2>
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

export default KhuCongNghiepHoaCam;