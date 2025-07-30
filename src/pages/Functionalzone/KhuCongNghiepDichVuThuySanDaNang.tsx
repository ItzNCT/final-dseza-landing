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

const KhuCongNghiepDichVuThuySanDaNang = () => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  const handleDownload = () => {
    console.log('Downloading document...');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Khu công nghiệp Dịch vụ Thủy sản Đà Nẵng - DSEZA',
        text: 'Thông tin về Khu công nghiệp Dịch vụ Thủy sản Đà Nẵng',
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
                Khu công nghiệp Dịch vụ Thủy sản Đà Nẵng
              </span>
            </nav>

            {/* Article Header - Mobile */}
            <header className="mb-4">
              <h1 className={`font-montserrat text-lg font-bold mb-2 leading-tight ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Khu công nghiệp Dịch vụ Thủy sản Đà Nẵng
              </h1>
            </header>

            {/* Article Content - Mobile */}
            <div className={`text-sm font-inter ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                <div className="space-y-4 text-justify">
                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>1. Thông tin chung</h2>
                        <p className="text-sm leading-relaxed">KCN Dịch vụ thủy sản Đà Nẵng thành lập theo Quyết định số 5210/QĐ-UB ngày 04/9/2001, trên cơ sở gộp các cụm công nghiệp thủy sản hiện có trên địa bàn thành phố; do Sở Thủy sản – Nông lâm làm chủ đầu tư, đến tháng 12/2002 chuyển giao cho Công ty Phát triển và Khai thác hạ tầng KCN Đà Nẵng làm chủ đầu tư. Qua các lần điều chỉnh, diện tích KCN Dịch vụ thủy sản Đà Nẵng là 50,63ha.Đã xây dựng hoàn thành hệ thống giao thông, thoát nước, san nền, điện chiếu sáng, cấp nước trong toàn KCN. Hiện tại, nước thải KCN DVTS Đà Nẵng được thu gom về Trạm xử lý nước thải Sơn Trà. Hiện nay, thành phố Đà Nẵng đang nghiên cứu giải pháp chuyển đổi ngành nghề các dự án thủy sản sang dịch vụ - thương mại tại Khu công nghiệp Dịch vụ thủy sản Đà Nẵng.</p>
                    </section>

                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>2. Giá cho thuê lại đất và tiền sử dụng hạ tầng</h2>
                        <p className="text-xs italic mb-1">Ngày cập nhật: 17/7/2019</p>
                        <p className="text-xs italic mb-3">Giá có tính tham khảo, mọi chi tiết xin liên hệ Công ty Phát triển và Khai thác hạ tầng Khu công nghiệp Đà Nẵng.</p>
                        <div className="mt-3">
                            <h3 className={`font-montserrat text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>2.1. Giá cho thuê lại đất: (Đến năm 2046)</h3>
                             <div className="overflow-x-auto">
                                <table className={`min-w-full border-collapse border text-xs ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                    <thead className={`${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`}>
                                        <tr>
                                            <th className={`p-2 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>Phương thức thanh toán</th>
                                            <th className={`p-2 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>Đơn giá (đồng/m2/năm)</th>
                                        </tr>
                                    </thead>
                                    <tbody className={`${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                        <tr className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
                                            <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>Trả tiền thuê đất từng năm (ổn định trong 5 năm)</td>
                                            <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>23.000</td>
                                        </tr>
                                        <tr className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-dseza-light-secondary-bg'}`}>
                                            <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>Trả tiền thuê lại đất một lần cho cả thời hạn thuê</td>
                                            <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>17.400</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-2 text-xs italic">(*) Nếu Dự án có mục đích kinh doanh dịch vụ thì đơn giá thuê lại đất cao hơn 30% so với đơn giá nêu trên</p>
                        </div>
                         <div className="mt-4">
                            <h3 className={`font-montserrat text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>2.2. Giá thu tiền sử dụng hạ tầng:</h3>
                            <div className="overflow-x-auto">
                                <table className={`min-w-full border-collapse border text-xs ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                    <thead className={`${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`}>
                                        <tr>
                                            <th className={`p-2 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>Chi phí</th>
                                            <th className={`p-2 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>Đơn giá (đồng)</th>
                                            <th className={`p-2 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>Phương thức thanh toán</th>
                                        </tr>
                                    </thead>
                                    <tbody className={`${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                        <tr className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
                                            <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>Tiền sử dụng hạ tầng</td>
                                            <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>8.000 (đồng/m2/năm)</td>
                                            <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>Trả tiền hàng năm, kể từ ngày dự án đăng ký đầu tư đi vào hoạt động.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-2 text-xs italic">Lưu ý: Đơn giá thuê lại đất và tiền sử dụng hạ tầng tại các Khu công nghiệp nêu trên là đơn giá tính đến thời điểm hiện tại; có thể thay đổi theo thời gian bởi quyết định của cơ quan có thẩm quyền và các Công ty kinh doanh hạ tầng.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>3. Hiện trạng quy hoạch sử dụng đất</h2>
                        <ul className="list-disc pl-4 mt-1 space-y-1 text-xs">
                            <li>Tổng diện tích đất theo quy hoạch : 50,63ha</li>
                            <li>Diện tích đất công nghiệp có thể cho thuê : 45,72 ha</li>
                            <li>Diện tích đất công nghiệp đã cho thuê: 45,72 ha</li>
                            <li>Diện tích đất công nghiệp còn lại: 0,00 ha</li>
                            <li>Diện tích đất công nghiệp chưa có hạ tầng 0,00 ha</li>
                            <li>Tỷ lệ lắp đầy : 100%</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>4. Bản đồ quy hoạch KCN Dịch vụ Thủy sản</h2>
                        <p className="mb-1 text-sm">Tính đến tháng 6 năm 2019 (có file đính kèm)</p>
                        <a href="#" className={`font-semibold text-xs ${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary-hover' : 'text-dseza-light-primary hover:text-dseza-light-primary-hover'} underline`}>
                            (Xem tại đây)
                        </a>
                    </section>
                </div>
            </div>

            {/* Share Section - Mobile */}
            <div className={`mt-6 pt-4 border-t ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
              <h3 className={`font-montserrat text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Chia sẻ trang:
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={handleDownload} className="text-xs h-7">
                  Tải xuống
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare} className="text-xs h-7">
                  Chia sẻ
                </Button>
                <Button variant="outline" size="sm" onClick={handlePrint} className="text-xs h-7">
                  In
                </Button>
              </div>
            </div>
          </div>

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
                Khu công nghiệp Dịch vụ Thủy sản Đà Nẵng
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
                Khu công nghiệp Dịch vụ Thủy sản Đà Nẵng
              </h1>
            </header>

            {/* Article Content */}
            <div className={`prose-lg max-w-none font-inter ${theme === 'dark' ? 'prose-invert text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                <div className="space-y-8 text-justify">
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>1. Thông tin chung</h2>
                        <p>KCN Dịch vụ thủy sản Đà Nẵng thành lập theo Quyết định số 5210/QĐ-UB ngày 04/9/2001, trên cơ sở gộp các cụm công nghiệp thủy sản hiện có trên địa bàn thành phố; do Sở Thủy sản – Nông lâm làm chủ đầu tư, đến tháng 12/2002 chuyển giao cho Công ty Phát triển và Khai thác hạ tầng KCN Đà Nẵng làm chủ đầu tư. Qua các lần điều chỉnh, diện tích KCN Dịch vụ thủy sản Đà Nẵng là 50,63ha.Đã xây dựng hoàn thành hệ thống giao thông, thoát nước, san nền, điện chiếu sáng, cấp nước trong toàn KCN. Hiện tại, nước thải KCN DVTS Đà Nẵng được thu gom về Trạm xử lý nước thải Sơn Trà. Hiện nay, thành phố Đà Nẵng đang nghiên cứu giải pháp chuyển đổi ngành nghề các dự án thủy sản sang dịch vụ - thương mại tại Khu công nghiệp Dịch vụ thủy sản Đà Nẵng.</p>
                    </section>

                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>2. Giá cho thuê lại đất và tiền sử dụng hạ tầng</h2>
                        <p className="text-sm italic">Ngày cập nhật: 17/7/2019</p>
                        <p className="text-sm italic">Giá có tính tham khảo, mọi chi tiết xin liên hệ Công ty Phát triển và Khai thác hạ tầng Khu công nghiệp Đà Nẵng.</p>
                        <div className="mt-4">
                            <h3 className={`font-montserrat text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>2.1. Giá cho thuê lại đất: (Đến năm 2046)</h3>
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
                            <h3 className={`font-montserrat text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>2.2. Giá thu tiền sử dụng hạ tầng:</h3>
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
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>3. Hiện trạng quy hoạch sử dụng đất</h2>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>Tổng diện tích đất theo quy hoạch : 50,63ha</li>
                            <li>Diện tích đất công nghiệp có thể cho thuê : 45,72 ha</li>
                            <li>Diện tích đất công nghiệp đã cho thuê: 45,72 ha</li>
                            <li>Diện tích đất công nghiệp còn lại: 0,00 ha</li>
                            <li>Diện tích đất công nghiệp chưa có hạ tầng 0,00 ha</li>
                            <li>Tỷ lệ lắp đầy : 100%</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>4. Bản đồ quy hoạch KCN Dịch vụ Thủy sản</h2>
                        <p>Tính đến tháng 6 năm 2019 (có file đính kèm)</p>
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

export default KhuCongNghiepDichVuThuySanDaNang;