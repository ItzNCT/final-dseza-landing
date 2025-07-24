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

const KhuCongNghiepHoaKhanh = () => {
  const { theme } = useTheme();

  const handleDownload = () => {
    console.log('Downloading document...');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Khu công nghiệp Hòa Khánh - DSEZA',
        text: 'Thông tin về Khu công nghiệp Hòa Khánh',
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
                Khu công nghiệp Hòa Khánh
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
                Khu công nghiệp Hòa Khánh
              </h1>
            </header>

            {/* Article Content */}
            <div className={`prose-lg max-w-none font-inter ${theme === 'dark' ? 'prose-invert text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                <p>Khu công nghiệp Hòa Khánh được thành lập theo Quyết định số 3698/QĐ-UB ngày 12/12/1996 của Chủ tịch Ủy ban nhân dân tỉnh Quảng Nam Đà Nẵng (cũ), thuộc phường Hòa Khánh, quận - Liên Chiểu, nằm cách sân bay quốc tế Đà Nẵng 10km, cảng biển Tiên Sa 20km, cảng Sông Hàn 13km, cảng biển Liên Chiểu 5km.</p>
                <div className="my-6 rounded-lg overflow-hidden shadow-lg">
                    <img
                        src="/media/Functionalmap/ban-do-khu-cong-nghiep-hoa-khanh.jpg"
                        alt="Bản đồ Khu công nghiệp Hòa Khánh"
                        className="w-full h-auto object-cover"
                    />
                </div>
                <div className="space-y-8 text-justify">
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>1. Vị trí địa lí</h2>
                        <p>quận Liên Chiểu, thành phố Đà Nẵng.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>Cách cảng biển Tiên Sa: 20 km</li>
                            <li>Cách Sân bay Quốc tế Đà Nẵng: 10 km</li>
                            <li>Cách Trung tâm thành phố Đà Nẵng: 10 km</li>
                            <li>Cách ga đường sắt: 09 km</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>2. Tổng diện tích</h2>
                        <p>394 ha, trong đó có 303,93 ha đất công nghiệp có thể cho thuê.</p>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>3. Giá cho thuê lại đất và tiền sử dụng hạ tầng</h2>
                        <p className="text-sm italic">Ngày cập nhật: 05/2020</p>
                        <p className="text-sm italic">Giá có tính tham khảo, mọi chi tiết xin liên hệ Công ty Phát triển và Khai thác hạ tầng Khu công nghiệp Đà Nẵng.</p>
                        <div className="mt-4">
                            <h3 className={`font-montserrat text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>3.1. Giá cho thuê lại đất: (Đến năm 2046)</h3>
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
                                            <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>Trả tiền thuê đất từng năm (ổn định trong 5 năm)</td>
                                            <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>23.000</td>
                                        </tr>
                                        <tr className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-dseza-light-secondary-bg'}`}>
                                            <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>Trả tiền thuê lại đất một lần cho cả thời hạn thuê</td>
                                            <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>17.400</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-2 text-sm italic">(*) Nếu Dự án có mục đích kinh doanh dịch vụ thì đơn giá thuê lại đất cao hơn 30% so với đơn giá nêu trên</p>
                        </div>
                        <div className="mt-6">
                            <h3 className={`font-montserrat text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>3.2. Giá thu tiền sử dụng hạ tầng:</h3>
                            <div className="overflow-x-auto">
                                <table className={`min-w-full border-collapse border text-sm ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                    <thead className={`${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`}>
                                        <tr>
                                            <th className={`p-3 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>Chi phí</th>
                                            <th className={`p-3 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>Đơn giá (đồng)</th>
                                            <th className={`p-3 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>Phương thức thanh toán</th>
                                        </tr>
                                    </thead>
                                    <tbody className={`${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                        <tr className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
                                            <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>Tiền sử dụng hạ tầng</td>
                                            <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>8.000 (đồng/m2/năm)</td>
                                            <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>Trả tiền hàng năm, kể từ ngày dự án đăng ký đầu tư đi vào hoạt động.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-2 text-sm italic">Lưu ý: Đơn giá thuê lại đất và tiền sử dụng hạ tầng tại các Khu công nghiệp nêu trên là đơn giá tính đến thời điểm hiện tại; có thể thay đổi theo thời gian bởi quyết định của cơ quan có thẩm quyền và các Công ty kinh doanh hạ tầng.</p>
                        </div>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>4. Giá xử lý nước thải</h2>
                        <p>6.873 đồng/m3 (Trả hàng tháng, theo hợp đồng).</p>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>5. Chủ đầu tư kinh doanh hạ tầng</h2>
                        <p className="font-semibold">Công ty Phát triển và Khai thác hạ tầng Khu Công nghiệp</p>
                        <ul className="list-none pl-0 mt-2 space-y-2">
                            <li><strong>Địa chỉ:</strong> Tầng 3,4 số 58 Nguyễn Chí Thanh, quận Hải Châu, Thành phố Đà Nẵng.</li>
                            <li><strong>Điện thoại:</strong> 0236- 3.886.159</li>
                            <li><strong>Fax:</strong> 0236- 3.886.157</li>
                            <li><strong>Email:</strong> daizico@danang.gov.vn</li>
                        </ul>
                    </section>
                     <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>6. Hiện trạng quy hoạch sử dụng đất</h2>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>Tổng diện tích đất theo quy hoạch : 394 ha</li>
                            <li>Diện tích đất công nghiệp có thể cho thuê : 303,93 ha</li>
                            <li>Diện tích đất công nghiệp đã cho thuê: 303,93 ha</li>
                            <li>Diện tích đất công nghiệp còn lại : 0,00 ha</li>
                            <li>Diện tích đất công nghiệp chưa có hạ tầng 0,00 ha</li>
                            <li>Tỷ lệ lắp đầy : 100%</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>7. Bản đồ quy hoạch KCN Hòa Khánh</h2>
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

export default KhuCongNghiepHoaKhanh;