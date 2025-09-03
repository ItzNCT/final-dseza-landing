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
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLanguage } from "@/context/LanguageContext";

const KhuCongNghiepHoaKhanh = () => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const { language } = useLanguage();
  const isEn = language === 'en';
  const [mapZoom, setMapZoom] = React.useState(1);

  const handleDownload = () => {
    console.log('Downloading document...');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: isEn ? 'Hoa Khanh Industrial Park - DSEZA' : 'Khu công nghiệp Hòa Khánh - DSEZA',
        text: isEn ? 'Information about Hoa Khanh Industrial Park' : 'Thông tin về Khu công nghiệp Hòa Khánh',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(isEn ? 'Link copied to clipboard!' : 'Đã sao chép link vào clipboard!');
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
                to={isEn ? '/en/trang-chu' : '/vi/trang-chu'}
                className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {isEn ? 'Home' : 'Trang chủ'}
              </Link>
              <ChevronRight className="h-2.5 w-2.5" />
              <Link
                to={isEn ? '/en/gioi-thieu/cac-khu-chuc-nang' : '/vi/gioi-thieu/cac-khu-chuc-nang'}
                className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {isEn ? 'Functional zones' : 'Các khu chức năng'}
              </Link>
              <ChevronRight className="h-2.5 w-2.5" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {isEn ? 'Hoa Khanh Industrial Park' : 'Khu công nghiệp Hòa Khánh'}
              </span>
            </nav>

            {/* Article Header - Mobile */}
            <header className="mb-4">
              <h1 className={`font-montserrat text-lg font-bold mb-2 leading-tight ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {isEn ? 'Hoa Khanh Industrial Park' : 'Khu công nghiệp Hòa Khánh'}
              </h1>
            </header>

            {/* Article Content - Mobile */}
            <div className={`text-sm font-inter ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                <p className="mb-3 text-justify">Khu công nghiệp Hòa Khánh được thành lập theo Quyết định số 3698/QĐ-UB ngày 12/12/1996 của Chủ tịch Ủy ban nhân dân tỉnh Quảng Nam Đà Nẵng (cũ), thuộc phường Hòa Khánh, quận - Liên Chiểu (nay là phường Liên Chiểu, thành phố Đà Nẵng), nằm cách sân bay quốc tế Đà Nẵng 10km, cảng biển Tiên Sa 20km, cảng Sông Hàn 13km, cảng biển Liên Chiểu 5km.</p>
                <div className="my-4 rounded-lg overflow-hidden shadow-lg">
                    <img
                        src="/media/Functionalmap/ban-do-khu-cong-nghiep-hoa-khanh.jpg"
                        alt={isEn ? 'Hoa Khanh Industrial Park map' : 'Bản đồ Khu công nghiệp Hòa Khánh'}
                        className="w-full h-auto object-cover"
                    />
                </div>
                <div className="space-y-4 text-justify">
                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '1. Location' : '1. Vị trí địa lí'}</h2>
                        <p className="mb-2">{isEn ? 'Lien Chieu Ward, Da Nang City.' : 'quận Liên Chiểu, thành phố Đà Nẵng.'}</p>
                        <ul className="list-disc pl-4 mt-1 space-y-1 text-xs">
                            <li>{isEn ? 'Tien Sa Port: 20 km' : 'Cách cảng biển Tiên Sa: 20 km'}</li>
                            <li>{isEn ? 'Da Nang International Airport: 10 km' : 'Cách Sân bay Quốc tế Đà Nẵng: 10 km'}</li>
                            <li>{isEn ? 'Da Nang City Center: 10 km' : 'Cách Trung tâm thành phố Đà Nẵng: 10 km'}</li>
                            <li>{isEn ? 'Railway Station: 09 km' : 'Cách ga đường sắt: 09 km'}</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>2. Tổng diện tích</h2>
                        <p>394 ha, trong đó có 303,93 ha đất công nghiệp có thể cho thuê.</p>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '3. Land sublease prices and infrastructure fees' : '3. Giá cho thuê lại đất và tiền sử dụng hạ tầng'}</h2>
                        <p className="text-xs italic mb-2">{isEn ? 'Updated: 08/2025' : 'Ngày cập nhật: 08/2025'}</p>
                        <p className="text-xs italic mb-3">{isEn ? 'Prices are indicative; for details please contact Danang Industrial Park Infrastructure Development and Operation Company.' : 'Giá có tính tham khảo, mọi chi tiết xin liên hệ Công ty Phát triển và Khai thác hạ tầng Khu công nghiệp Đà Nẵng.'}</p>
                        
                        <div className="mt-3">
                            <h3 className={`font-montserrat text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{isEn ? '3.1. Land sublease prices (until 2046)' : '3.1. Giá cho thuê lại đất: (Đến năm 2046)'}</h3>
                            <p className="text-xs">{isEn ? 'The industrial park is 100% occupied.' : 'Khu công nghiệp đã lấp đầy 100% doanh nghiệp.'}</p>
                        </div>
                        
                        <div className="mt-4">
                            <h3 className={`font-montserrat text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{isEn ? '3.2. Infrastructure usage fee' : '3.2. Giá thu tiền sử dụng hạ tầng:'}</h3>
                            <div className="overflow-x-auto">
                                <table className={`min-w-full border-collapse border text-xs ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                    <thead className={`${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`}>
                                        <tr>
                                            <th className={`p-2 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Cost item' : 'Chi phí'}</th>
                                            <th className={`p-2 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Unit price (VND)' : 'Đơn giá (đồng)'}</th>
                                            <th className={`p-2 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Payment method' : 'Phương thức thanh toán'}</th>
                                        </tr>
                                    </thead>
                                    <tbody className={`${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                        <tr className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
                                            <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>{isEn ? 'Infrastructure usage fee' : 'Tiền sử dụng hạ tầng'}</td>
                                            <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>{isEn ? '8,000 (VND/m²/year)' : '8.000 (đồng/m2/năm)'}</td>
                                            <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>{isEn ? 'Annual payment from the date the project begins operation.' : 'Trả tiền hàng năm, kể từ ngày dự án đăng ký đầu tư đi vào hoạt động.'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-2 text-xs italic">{isEn ? 'Note: Prices above are current reference values and may change over time by decision of competent authorities and infrastructure companies.' : 'Lưu ý: Đơn giá thuê lại đất và tiền sử dụng hạ tầng tại các Khu công nghiệp nêu trên là đơn giá tính đến thời điểm hiện tại; có thể thay đổi theo thời gian bởi quyết định của cơ quan có thẩm quyền và các Công ty kinh doanh hạ tầng.'}</p>
                        </div>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '4. Wastewater treatment price' : '4. Giá xử lý nước thải'}</h2>
                        <p>{isEn ? '8,445 VND/m³ (Monthly payment as per contract).' : '8.445 đồng/m3 (Trả hàng tháng, theo hợp đồng).'}</p>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '5. Infrastructure investor' : '5. Chủ đầu tư kinh doanh hạ tầng'}</h2>
                        <p className="font-semibold mb-2">Công ty Phát triển và Khai thác hạ tầng Khu Công nghiệp</p>
                        <ul className="list-none pl-0 mt-1 space-y-1 text-xs">
                            <li><strong>{isEn ? 'Address' : 'Địa chỉ'}:</strong> {isEn ? '4th Floor, Working Office Building of Project Management Boards and Affiliated Units, 48 Vo An Ninh, Hoa Xuan Ward, Da Nang City.' : 'Tầng 4, Toà nhà làm việc các Ban quản lý dự án và đơn vị sự nghiệp trực thuộc, số 48 Võ An Ninh, Phường Hòa Xuân, Thành phố Đà Nẵng.'}</li>
                            <li><strong>Tel:</strong> 0236- 3.886.159 <span className="mx-1">-</span> <strong>Fax.:</strong> 0236- 3.886.157</li>
                            <li><strong>Email:</strong> daizico@danang.gov.vn</li>
                        </ul>
                    </section>
                     <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '6. Land-use planning status' : '6. Hiện trạng quy hoạch sử dụng đất'}</h2>
                        <ul className="list-disc pl-4 mt-1 space-y-1 text-xs">
                            <li>{isEn ? 'Total planned land area: 394 ha' : 'Tổng diện tích đất theo quy hoạch : 394 ha'}</li>
                            <li>{isEn ? 'Leasable industrial land: 303.93 ha' : 'Diện tích đất công nghiệp có thể cho thuê : 303,93 ha'}</li>
                            <li>{isEn ? 'Leased industrial land: 303.93 ha' : 'Diện tích đất công nghiệp đã cho thuê: 303,93 ha'}</li>
                            <li>{isEn ? 'Remaining industrial land: 0.00 ha' : 'Diện tích đất công nghiệp còn lại : 0,00 ha'}</li>
                            <li>{isEn ? 'Industrial land without infrastructure: 0.00 ha' : 'Diện tích đất công nghiệp chưa có hạ tầng 0,00 ha'}</li>
                            <li>{isEn ? 'Occupancy rate: 100%' : 'Tỷ lệ lắp đầy : 100%'}</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>7. Bản đồ quy hoạch KCN Hòa Khánh</h2>
                        <a href="#" className={`font-semibold text-xs ${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary-hover' : 'text-dseza-light-primary hover:text-dseza-light-primary-hover'} underline`}>
                            {isEn ? '(View here)' : '(Xem tại đây)'}
                        </a>
                    </section>
                </div>
            </div>

            {/* Share Section - Mobile */}
            <div className={`mt-6 pt-4 border-t ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
              <h3 className={`font-montserrat text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {isEn ? 'Share this page:' : 'Chia sẻ trang:'}
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={handleDownload} className="text-xs h-7">
                  {isEn ? 'Download' : 'Tải xuống'}
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare} className="text-xs h-7">
                  {isEn ? 'Share' : 'Chia sẻ'}
                </Button>
                <Button variant="outline" size="sm" onClick={handlePrint} className="text-xs h-7">
                  {isEn ? 'Print' : 'In'}
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
                {isEn ? 'Home' : 'Trang chủ'}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link
                to="/gioi-thieu/cac-khu-chuc-nang"
                className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {isEn ? 'Functional Zones' : 'Các khu chức năng'}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {isEn ? 'Hoa Khanh Industrial Park' : 'Khu công nghiệp Hòa Khánh'}
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
                {isEn ? 'Hoa Khanh Industrial Park' : 'Khu công nghiệp Hòa Khánh'}
              </h1>
            </header>

            {/* Article Content */}
            <div className={`prose-lg max-w-none font-inter ${theme === 'dark' ? 'prose-invert text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                <p>{isEn ? 'Hoa Khanh Industrial Park was established under Decision No. 3698/QD-UB dated 12/12/1996 by the Chairman of the Quang Nam – Da Nang Provincial People\'s Committee (former). It is located in Hoa Khanh Ward, Lien Chieu District (now Lien Chieu Ward, Da Nang City), about 10 km from Da Nang International Airport, 20 km from Tien Sa Port, 13 km from Han River Port, and 5 km from Lien Chieu Port.' : 'Khu công nghiệp Hòa Khánh được thành lập theo Quyết định số 3698/QĐ-UB ngày 12/12/1996 của Chủ tịch Ủy ban nhân dân tỉnh Quảng Nam Đà Nẵng (cũ), thuộc phường Hòa Khánh, quận - Liên Chiểu, nằm cách sân bay quốc tế Đà Nẵng 10km, cảng biển Tiên Sa 20km, cảng Sông Hàn 13km, cảng biển Liên Chiểu 5km.'}</p>
                <div className="my-6 rounded-lg overflow-hidden shadow-lg">
                    <img
                        src="/media/Functionalmap/ban-do-khu-cong-nghiep-hoa-khanh.jpg"
                        alt="Bản đồ Khu công nghiệp Hòa Khánh"
                        className="w-full h-auto object-cover"
                    />
                </div>
                <div className="space-y-8 text-justify">
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '1. Location' : '1. Vị trí địa lí'}</h2>
                        <p>{isEn ? 'Lien Chieu Ward, Da Nang City.' : 'quận Liên Chiểu, thành phố Đà Nẵng.'}</p>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>{isEn ? 'Distance to Tien Sa Port: 20 km' : 'Cách cảng biển Tiên Sa: 20 km'}</li>
                            <li>{isEn ? 'Distance to Da Nang International Airport: 10 km' : 'Cách Sân bay Quốc tế Đà Nẵng: 10 km'}</li>
                            <li>{isEn ? 'Distance to Da Nang City Center: 10 km' : 'Cách Trung tâm thành phố Đà Nẵng: 10 km'}</li>
                            <li>{isEn ? 'Distance to Railway Station: 09 km' : 'Cách ga đường sắt: 09 km'}</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '2. Total area' : '2. Tổng diện tích'}</h2>
                        <p>{isEn ? '394 ha, including 303.93 ha of leasable industrial land.' : '394 ha, trong đó có 303,93 ha đất công nghiệp có thể cho thuê.'}</p>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '3. Land sublease prices and infrastructure fees' : '3. Giá cho thuê lại đất và tiền sử dụng hạ tầng'}</h2>
                        <p className="text-sm italic">{isEn ? 'Updated: 08/2025' : 'Ngày cập nhật: 08/2025'}</p>
                        <p className="text-sm italic">{isEn ? 'Prices are indicative; for details please contact Danang Industrial Park Infrastructure Development and Operation Company.' : 'Giá có tính tham khảo, mọi chi tiết xin liên hệ Công ty Phát triển và Khai thác hạ tầng Khu công nghiệp Đà Nẵng.'}</p>
                        <div className="mt-4">
                            <h3 className={`font-montserrat text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{isEn ? '3.1. Land sublease prices (until 2046)' : '3.1. Giá cho thuê lại đất: (Đến năm 2046)'}</h3>
                            <div className="overflow-x-auto">
                                <table className={`min-w-full border-collapse border text-sm ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                    <thead className={`${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`}>
                                        <tr>
                                            <th className={`p-3 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Payment method' : 'Phương thức thanh toán'}</th>
                                            <th className={`p-3 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Unit price (VND)' : 'Đơn giá (đồng/m2/năm)'}</th>
                                        </tr>
                                    </thead>
                                    <tbody className={`${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                        <tr className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
                                            <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>{isEn ? 'Annual rent payment (stable for 5 years)' : 'Trả tiền thuê đất từng năm (ổn định trong 5 năm)'}</td>
                                            <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>23.000</td>
                                        </tr>
                                        <tr className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-dseza-light-secondary-bg'}`}>
                                            <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>{isEn ? 'One-time rent payment for the entire lease period' : 'Trả tiền thuê lại đất một lần cho cả thời hạn thuê'}</td>
                                            <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>17.400</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-2 text-sm italic">(*) Nếu Dự án có mục đích kinh doanh dịch vụ thì đơn giá thuê lại đất cao hơn 30% so với đơn giá nêu trên</p>
                        </div>
                        <div className="mt-6">
                            <h3 className={`font-montserrat text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{isEn ? '3.2. Infrastructure usage fee' : '3.2. Giá thu tiền sử dụng hạ tầng:'}</h3>
                            <div className="overflow-x-auto">
                                <table className={`min-w-full border-collapse border text-sm ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                    <thead className={`${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`}>
                                        <tr>
                                            <th className={`p-3 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Cost item' : 'Chi phí'}</th>
                                            <th className={`p-3 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Unit price (VND)' : 'Đơn giá (đồng)'}</th>
                                            <th className={`p-3 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Payment method' : 'Phương thức thanh toán'}</th>
                                        </tr>
                                    </thead>
                                    <tbody className={`${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                        <tr className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
                                            <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>{isEn ? 'Infrastructure usage fee' : 'Tiền sử dụng hạ tầng'}</td>
                                            <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>{isEn ? '8,000 (VND/m²/year)' : '8.000 (đồng/m2/năm)'}</td>
                                            <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>{isEn ? 'Annual payment from the date the project begins operation.' : 'Trả tiền hàng năm, kể từ ngày dự án đăng ký đầu tư đi vào hoạt động.'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-2 text-sm italic">{isEn ? 'Note: Prices above are current reference values and may change over time by decision of competent authorities and infrastructure companies.' : 'Lưu ý: Đơn giá thuê lại đất và tiền sử dụng hạ tầng tại các Khu công nghiệp nêu trên là đơn giá tính đến thời điểm hiện tại; có thể thay đổi theo thời gian bởi quyết định của cơ quan có thẩm quyền và các Công ty kinh doanh hạ tầng.'}</p>
                        </div>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '4. Wastewater treatment price' : '4. Giá xử lý nước thải'}</h2>
                        <p>{isEn ? '8,445 VND/m³ (Monthly payment as per contract).' : '8.445 đồng/m3 (Trả hàng tháng, theo hợp đồng).'}</p>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '5. Infrastructure investor' : '5. Chủ đầu tư kinh doanh hạ tầng'}</h2>
                        <p className="font-semibold">{isEn ? 'Danang Industrial Park Infrastructure Development and Operation Company' : 'Công ty Phát triển và Khai thác hạ tầng Khu Công nghiệp'}</p>
                        <ul className="list-none pl-0 mt-2 space-y-2">
                            <li><strong>{isEn ? 'Address' : 'Địa chỉ'}:</strong> {isEn ? '4th Floor, Working Office Building of Project Management Boards and Affiliated Units, 48 Vo An Ninh, Hoa Xuan Ward, Da Nang City.' : 'Tầng 4, Toà nhà làm việc các Ban quản lý dự án và đơn vị sự nghiệp trực thuộc, số 48 Võ An Ninh, Phường Hòa Xuân, Thành phố Đà Nẵng.'}</li>
                            <li><strong>Tel:</strong> 0236- 3.886.159</li>
                            <li><strong>Fax:</strong> 0236- 3.886.157</li>
                            <li><strong>Email:</strong> daizico@danang.gov.vn</li>
                        </ul>
                    </section>
                     <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>6. Hiện trạng quy hoạch sử dụng đất</h2>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>{isEn ? 'Total land area according to the plan:' : 'Tổng diện tích đất theo quy hoạch :'} 394 ha</li>
                            <li>{isEn ? 'Industrial land area available for lease:' : 'Diện tích đất công nghiệp có thể cho thuê :'} 303,93 ha</li>
                            <li>{isEn ? 'Industrial land area leased:' : 'Diện tích đất công nghiệp đã cho thuê:'} 303,93 ha</li>
                            <li>{isEn ? 'Remaining industrial land area:' : 'Diện tích đất công nghiệp còn lại :'} 0,00 ha</li>
                            <li>{isEn ? 'Industrial land area without infrastructure:' : 'Diện tích đất công nghiệp chưa có hạ tầng'} 0,00 ha</li>
                            <li>{isEn ? 'Filled ratio:' : 'Tỷ lệ lắp đầy :'} 100%</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '7. Master plan map of Hoa Khanh IP' : '7. Bản đồ quy hoạch KCN Hòa Khánh'}</h2>
                        <Dialog onOpenChange={() => setMapZoom(1)}>
                          <DialogTrigger asChild>
                            <button type="button" className={`${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary-hover' : 'text-dseza-light-primary hover:text-dseza-light-primary-hover'} font-semibold underline`}>
                              {isEn ? '(View here)' : '(Xem tại đây)'}
                            </button>
                          </DialogTrigger>
                          <DialogContent className="p-0 bg-transparent border-0 shadow-none max-w-6xl">
                            <DialogTitle className="sr-only">{isEn ? 'Hoa Khanh Industrial Park Master Plan' : 'Bản đồ quy hoạch KCN Hòa Khánh'}</DialogTitle>
                            <div className="relative max-h-[85vh] overflow-auto rounded-md">
                              <img
                                src="/media/Functionalmap/ban-do-khu-cong-nghiep-hoa-khanh.jpg"
                                alt={isEn ? 'Hoa Khanh Industrial Park map' : 'Bản đồ Khu công nghiệp Hòa Khánh'}
                                className="w-full h-auto"
                                style={{ transform: `scale(${mapZoom})`, transformOrigin: 'center center' }}
                              />
                              <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/60 rounded-md p-1">
                                <Button size="sm" variant="secondary" className="w-8 h-8 p-0" onClick={() => setMapZoom(z => Math.max(1, Number((z - 0.25).toFixed(2))))}>-</Button>
                                <span className="px-2 text-xs text-white">{Math.round(mapZoom * 100)}%</span>
                                <Button size="sm" variant="secondary" className="w-8 h-8 p-0" onClick={() => setMapZoom(z => Math.min(5, Number((z + 0.25).toFixed(2))))}>+</Button>
                                <Button size="sm" variant="outline" className="h-8 text-white border-white/60" onClick={() => setMapZoom(1)}>Reset</Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                    </section>
                </div>
            </div>

            {/* Share Section */}
            <div className={`mt-12 pt-8 border-t ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
              <h3 className={`font-montserrat text-lg font-semibold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {isEn ? 'Share this page:' : 'Chia sẻ trang:'}
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  {isEn ? 'Download' : 'Tải xuống'}
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  {isEn ? 'Share' : 'Chia sẻ'}
                </Button>
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  {isEn ? 'Print' : 'In'}
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