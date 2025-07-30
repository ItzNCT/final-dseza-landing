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

const KhuCongNghiepLienChieu = () => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  const handleDownload = () => {
    console.log('Downloading document...');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Khu công nghiệp Liên Chiểu - DSEZA',
        text: 'Thông tin về Khu công nghiệp Liên Chiểu',
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
                Khu công nghiệp Liên Chiểu
              </span>
            </nav>

            {/* Article Header - Mobile */}
            <header className="mb-4">
              <h1 className={`font-montserrat text-lg font-bold mb-2 leading-tight ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Khu công nghiệp Liên Chiểu
              </h1>
            </header>

            {/* Article Content - Mobile */}
            <div className={`text-sm font-inter ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                <p className="mb-3 text-justify">Khu công nghiệp Liên Chiểu được thành lập theo Quyết định số 344/QĐ-TTg ngày 18/4/1998 của Thủ tướng Chính Phủ, thuộc phường Hòa Hiệp, quận Liên Chiểu; nằm cách sân bay quốc tế Đà Nẵng 15 km, cảng biển Tiên Sa 25 km, cảng Sông Hàn 18 km, nằm sát với cảng biển Liên Chiểu và tiếp giáp với cửa ra phía Nam của đường hầm đèo Hải Vân.</p>
                <div className="my-4 rounded-lg overflow-hidden shadow-lg">
                    <img
                        src="/media/Functionalmap/khu-cong-nghiep-lien-chieu.jpg"
                        alt="Bản đồ Khu công nghiệp Liên Chiểu"
                        className="w-full h-auto object-cover"
                    />
                </div>
                <div className="space-y-4 text-justify">
                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>1. Vị trí địa lí</h2>
                        <p className="mb-2">quận Liên Chiểu, thành phố Đà Nẵng.</p>
                        <ul className="list-disc pl-4 mt-1 space-y-1 text-xs">
                            <li>Cách cảng biển Tiên Sa: 23 km</li>
                            <li>Cách Sân bay Quốc tế Đà Nẵng: 13 km</li>
                            <li>Cách Trung tâm thành phố Đà Nẵng: 14 km</li>
                            <li>Cách ga đường sắt: 14 km</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>2. Tổng diện tích</h2>
                        <p>289,35 ha. Trong đó có 201,16 ha đất công nghiệp có thể cho thuê. Nếu nhà đầu tư muốn tìm hiểu về thuê đất, có thể tham khảo tại địa chỉ Website: <a href="https://dhpiza.danang.gov.vn/" target="_blank" rel="noopener noreferrer" className={`font-semibold text-xs ${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary-hover' : 'text-dseza-light-primary hover:text-dseza-light-primary-hover'} underline`}>https://dhpiza.danang.gov.vn/</a></p>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>3. Giá cho thuê lại đất và tiền sử dụng hạ tầng: (Đến năm 2046)</h2>
                        <p className="text-xs italic mb-2">Ngày cập nhật: 30/12/2020. Ap dụng từ ngày 01/01/2021 (tạm tính theo tỷ giá bán ra ngày 29/12/2020 của Ngân hàng TMCP Ngoại Thương Việt Nam: 1 USD = 23.220 VNĐ)</p>
                        <p className="text-xs italic mb-3">Giá có tính chất tham khảo, mọi chi tiết xin liên hệ Công ty cổ phần Đầu tư Sài Gòn-Đà Nẵng (SDN).</p>
                        <div className="mt-3">
                            <h3 className={`font-montserrat text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>- Đơn giá thuê lại đất:</h3>
                            <div className="overflow-x-auto">
                                <table className={`min-w-full border-collapse border text-xs ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                    <thead className={`${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`}>
                                        <tr>
                                            <th className={`p-2 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>Phương thức thanh toán</th>
                                            <th className={`p-2 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>Đơn giá (đồng/m2/hết thời hạn thuê)</th>
                                        </tr>
                                    </thead>
                                    <tbody className={`${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                        <tr className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
                                            <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>Trả tiền thuê lại đất một lần đến hết thời hạn thuê (chưa bao gồm thuế GTGT)</td>
                                            <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>2.283.000 VNĐ</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className={`font-montserrat text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>- Đơn giá phí quản lý và tiền sử dụng hạ tầng:</h3>
                            <p className="mb-1">11.415 đồng/m2/năm (chưa bao gồm thuế GTGT)</p>
                            <p className="text-xs italic">Các phí quản lý và sử dụng cơ sở hạ tầng này có thể được điều chỉnh sau 3 (ba) năm kể từ ngày Bên cho thuê và Bên thuê ký kết Hợp đồng cung cấp dịch vụ sử dụng cơ sở hạ tầng và cứ 3 (ba) năm một lần Bên cho thuê có quyền điều chỉnh tăng giá nhưng không vượt quá 15% (mười lăm phần trăm) tổng chi phí mà Bên thuê thanh toán của kỳ thanh toán trước đó.</p>
                        </div>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>4. Chủ đầu tư kinh doanh hạ tầng</h2>
                        <p className="font-semibold mb-2">Công ty Cổ phần Đầu tư Sài Gòn - Đà Nẵng (SDN)</p>
                        <ul className="list-none pl-0 mt-1 space-y-1 text-xs">
                            <li><strong>Địa chỉ:</strong> Số 61A Nguyễn Văn Cừ, quận Liên Chiểu, Thành phố Đà Nẵng.</li>
                            <li><strong>Điện thoại:</strong> 02363. 770998</li>
                            <li><strong>Fax:</strong> 02363. 770997</li>
                            <li><strong>Web:</strong> www.dananginvest.com</li>
                            <li><strong>Email:</strong> info@dananginvest.com</li>
                        </ul>
                    </section>
                     <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>5. Hiện trạng quy hoạch sử dụng đất</h2>
                        <ul className="list-disc pl-4 mt-1 space-y-1 text-xs">
                            <li>Tổng diện tích đất theo quy hoạch : 289,35 ha</li>
                            <li>Diện tích đất công nghiệp có thể cho thuê : 206,13 ha</li>
                            <li>Diện tích đất công nghiệp đã cho thuê: 118,67 ha</li>
                            <li>Diện tích đất công nghiệp còn lại : 87,47 ha</li>
                            <li>Diện tích đất công nghiệp chưa có hạ tầng 30,29 ha</li>
                            <li>Tỷ lệ lắp đầy: 57,57%</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>6. Bản đồ quy hoạch KCN Liên Chiểu</h2>
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
                Khu công nghiệp Liên Chiểu
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
                Khu công nghiệp Liên Chiểu
              </h1>
            </header>

            {/* Article Content */}
            <div className={`prose-lg max-w-none font-inter ${theme === 'dark' ? 'prose-invert text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                <p>Khu công nghiệp Liên Chiểu được thành lập theo Quyết định số 344/QĐ-TTg ngày 18/4/1998 của Thủ tướng Chính Phủ, thuộc phường Hòa Hiệp, quận Liên Chiểu; nằm cách sân bay quốc tế Đà Nẵng 15 km, cảng biển Tiên Sa 25 km, cảng Sông Hàn 18 km, nằm sát với cảng biển Liên Chiểu và tiếp giáp với cửa ra phía Nam của đường hầm đèo Hải Vân.</p>
                <div className="my-6 rounded-lg overflow-hidden shadow-lg">
                    <img
                        src="/media/Functionalmap/khu-cong-nghiep-lien-chieu.jpg"
                        alt="Bản đồ Khu công nghiệp Liên Chiểu"
                        className="w-full h-auto object-cover"
                    />
                </div>
                <div className="space-y-8 text-justify">
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>1. Vị trí địa lí</h2>
                        <p>quận Liên Chiểu, thành phố Đà Nẵng.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>Cách cảng biển Tiên Sa: 23 km</li>
                            <li>Cách Sân bay Quốc tế Đà Nẵng: 13 km</li>
                            <li>Cách Trung tâm thành phố Đà Nẵng: 14 km</li>
                            <li>Cách ga đường sắt: 14 km</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>2. Tổng diện tích</h2>
                        <p>289,35 ha. Trong đó có 201,16 ha đất công nghiệp có thể cho thuê. Nếu nhà đầu tư muốn tìm hiểu về thuê đất, có thể tham khảo tại địa chỉ Website: <a href="https://dhpiza.danang.gov.vn/" target="_blank" rel="noopener noreferrer" className={`font-semibold ${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary-hover' : 'text-dseza-light-primary hover:text-dseza-light-primary-hover'} underline`}>https://dhpiza.danang.gov.vn/</a></p>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>3. Giá cho thuê lại đất và tiền sử dụng hạ tầng: (Đến năm 2046)</h2>
                        <p className="text-sm italic">Ngày cập nhật: 30/12/2020. Ap dụng từ ngày 01/01/2021 (tạm tính theo tỷ giá bán ra ngày 29/12/2020 của Ngân hàng TMCP Ngoại Thương Việt Nam: 1 USD = 23.220 VNĐ)</p>
                        <p className="text-sm italic">Giá có tính chất tham khảo, mọi chi tiết xin liên hệ Công ty cổ phần Đầu tư Sài Gòn-Đà Nẵng (SDN).</p>
                        <div className="mt-4">
                            <h3 className={`font-montserrat text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>- Đơn giá thuê lại đất:</h3>
                            <div className="overflow-x-auto">
                                <table className={`min-w-full border-collapse border text-sm ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                    <thead className={`${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`}>
                                        <tr>
                                            <th className={`p-3 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>Phương thức thanh toán</th>
                                            <th className={`p-3 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>Đơn giá (đồng/m2/hết thời hạn thuê)</th>
                                        </tr>
                                    </thead>
                                    <tbody className={`${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                        <tr className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
                                            <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>Trả tiền thuê lại đất một lần đến hết thời hạn thuê (chưa bao gồm thuế GTGT)</td>
                                            <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>2.283.000 VNĐ</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className={`font-montserrat text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>- Đơn giá phí quản lý và tiền sử dụng hạ tầng:</h3>
                            <p>11.415 đồng/m2/năm (chưa bao gồm thuế GTGT)</p>
                            <p className="mt-2 text-sm italic">Các phí quản lý và sử dụng cơ sở hạ tầng này có thể được điều chỉnh sau 3 (ba) năm kể từ ngày Bên cho thuê và Bên thuê ký kết Hợp đồng cung cấp dịch vụ sử dụng cơ sở hạ tầng và cứ 3 (ba) năm một lần Bên cho thuê có quyền điều chỉnh tăng giá nhưng không vượt quá 15% (mười lăm phần trăm) tổng chi phí mà Bên thuê thanh toán của kỳ thanh toán trước đó.</p>
                        </div>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>4. Chủ đầu tư kinh doanh hạ tầng</h2>
                        <p className="font-semibold">Công ty Cổ phần Đầu tư Sài Gòn - Đà Nẵng (SDN)</p>
                        <ul className="list-none pl-0 mt-2 space-y-2">
                            <li><strong>Địa chỉ:</strong> Số 61A Nguyễn Văn Cừ, quận Liên Chiểu, Thành phố Đà Nẵng.</li>
                            <li><strong>Điện thoại:</strong> 02363. 770998</li>
                            <li><strong>Fax:</strong> 02363. 770997</li>
                            <li><strong>Web:</strong> www.dananginvest.com</li>
                            <li><strong>Email:</strong> info@dananginvest.com</li>
                        </ul>
                    </section>
                     <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>5. Hiện trạng quy hoạch sử dụng đất</h2>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>Tổng diện tích đất theo quy hoạch : 289,35 ha</li>
                            <li>Diện tích đất công nghiệp có thể cho thuê : 206,13 ha</li>
                            <li>Diện tích đất công nghiệp đã cho thuê: 118,67 ha</li>
                            <li>Diện tích đất công nghiệp còn lại : 87,47 ha</li>
                            <li>Diện tích đất công nghiệp chưa có hạ tầng 30,29 ha</li>
                            <li>Tỷ lệ lắp đầy: 57,57%</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>6. Bản đồ quy hoạch KCN Liên Chiểu</h2>
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

export default KhuCongNghiepLienChieu;