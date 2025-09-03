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

const KhuCongNghiepHoaCam = () => {
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
        title: isEn ? 'Hoa Cam Industrial Park - DSEZA' : 'Khu công nghiệp Hòa Cầm - DSEZA',
        text: isEn ? 'Information about Hoa Cam Industrial Park' : 'Thông tin về Khu công nghiệp Hòa Cầm',
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
                {isEn ? 'Hoa Cam Industrial Park' : 'Khu công nghiệp Hòa Cầm'}
              </span>
            </nav>

            {/* Article Header - Mobile */}
            <header className="mb-4">
              <h1 className={`font-montserrat text-lg font-bold mb-2 leading-tight ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {isEn ? 'Hoa Cam Industrial Park' : 'Khu công nghiệp Hòa Cầm'}
              </h1>
            </header>

            {/* Article Content - Mobile */}
            <div className={`text-sm font-inter ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                <p className="mb-3 text-justify">{isEn ? 'Hoa Cam Industrial Park (HCIP) was established under Decision No. 1252/QD-BXD dated 19/09/2003 of the Ministry of Construction approving the detailed plan of HCIP in Da Nang City. The project was initially invested by Da Nang Industrial Park Infrastructure Development and Operation Company, and then transferred to Hoa Cam Industrial Park Investment Joint Stock Company (IZI) under a socialization model. HCIP is about 8 km from the city center; key infrastructures such as Tien Sa Seaport, Lien Chieu Seaport, and Da Nang International Airport are within 5–7 km.' : 'KCN Hòa Cầm được thành lập theo Quyết định số 1252/QĐ-BXD ngày 19/9/2003 của Bộ Xây dựng về phê duyệt Quy hoạch chi tiết KCN Hòa Cầm thành phố Đà Nẵng, do Công ty Phát triển và Khai thác hạ tầng KCN Đà Nẵng làm chủ đầu tư. KCN Hòa Cầm đã được chuyển giao cho Công ty Cổ phần Đầu tư KCN Hòa Cầm (Công ty IZI) làm chủ đầu tư theo hướng xã hội hóa; nằm cách trung tâm thành phố Đà Nẵng 8km, các công trình hạ tầng quan trọng như: cảng biển Tiên Sa, cảng biển Liên Chiểu và sân bay quốc tế Đà Nẵng đều nằm trong khoảng từ 5 đến 7km.'}</p>
                <div className="my-4 rounded-lg overflow-hidden shadow-lg">
                    <img
                        src="/media/Functionalmap/ban-do-khu-cong-nghiep-hoa-khanh.jpg"
                        alt="Bản đồ Khu công nghiệp Hòa Cầm"
                        className="w-full h-auto object-cover"
                    />
                </div>
                <div className="space-y-4 text-justify">
                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '1. Location' : '1. Vị trí địa lý'}</h2>
                        <p className="mb-2">{isEn ? 'Cam Le Ward, Da Nang City.' : 'Phường Cẩm Lệ, thành phố Đà Nẵng.'}</p>
                        <ul className="list-disc pl-4 mt-1 space-y-1 text-xs">
                            <li>{isEn ? 'Distance to Tien Sa Seaport: 10 km' : 'Cách cảng biển Tiên Sa: 10 km'}</li>
                            <li>{isEn ? 'Distance to Da Nang International Airport: 07 km' : 'Cách Sân bay Quốc tế Đà Nẵng: 07 km'}</li>
                            <li>{isEn ? 'Distance to Da Nang city center: 08 km' : 'Cách Trung tâm thành phố Đà Nẵng: 08 km'}</li>
                            <li>{isEn ? 'Distance to railway station: 08 km' : 'Cách ga đường sắt: 08 km'}</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '2. Total area' : '2. Tổng diện tích'}</h2>
                        <p>{isEn ? '149.84 ha, including 107.07 ha of leasable industrial land.' : '149,84 ha, trong đó có 107,07 ha đất công nghiệp có thể cho thuê.'}</p>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '3. Land sublease prices and infrastructure fees (until Aug 2054)' : '3. Giá cho thuê lại đất và tiền sử dụng hạ tầng: (Đến tháng 8 năm 2054)'}</h2>
                        <p className="text-xs italic mb-2">{isEn ? 'Updated: Q3/2025' : 'Ngày cập nhật: Quý III năm 2025'}</p>
                        <p className="text-xs italic mb-3">{isEn ? 'Prices are indicative; please contact Hoa Cam Industrial Park Investment JSC (Hoa Cam IZI) for details.' : 'Giá có tính chất tham khảo, mọi chi tiết xin liên hệ Công ty Cổ phần Đầu tư Khu công nghiệp Hòa Cầm (HoacamIZI)'}</p>
                        <div className="mt-3">
                            <h3 className={`font-montserrat text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{isEn ? 'Land sublease price:' : '- Đơn giá thuê lại đất:'}</h3>
                            <div className="overflow-x-auto">
                                <table className={`min-w-full border-collapse border text-xs ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                    <thead className={`${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`}>
                                        <tr>
                                            <th className={`p-2 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Payment method' : 'Phương thức thanh toán'}</th>
                                            <th className={`p-2 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Unit price (VND/m²/year)' : 'Đơn giá (đồng/m2/năm)'}</th>
                                        </tr>
                                    </thead>
                                    <tbody className={`${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                        <tr className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
                                            <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>{isEn ? 'Annual payment' : 'Trả tiền thuê lại đất hàng năm'}</td>
                                            <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>95.500</td>
                                        </tr>
                                        <tr className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-dseza-light-secondary-bg'}`}>
                                            <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>{isEn ? 'One-off payment for entire lease term (until 08/08/2054)' : 'Trả tiền thuê lại đất một lần cho toàn bộ thời hạn thuê (đến ngày 08/8/2054)'}</td>
                                            <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>2.150.000 ({isEn ? 'VND/m²/entire term' : 'đồng/m2/toàn bộ thời hạn thuê'})</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className={`font-montserrat text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{isEn ? 'Infrastructure usage fee:' : '- Đơn giá tiền sử dụng hạ tầng:'}</h3>
                            <p className="mb-1">{isEn ? '14,950 VND/m²/year (paid annually)' : '14.950 đồng/m2/năm (trả hàng năm)'}</p>
                            <p className="text-xs italic">{isEn ? 'Prices exclude VAT.' : 'Các đơn giá nêu trên chưa bao gồm thuế GTGT'}</p>
                        </div>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '4. Infrastructure developer' : '4. Chủ đầu tư kinh doanh hạ tầng'}</h2>
                        <p className="font-semibold mb-2">{isEn ? 'Hoa Cam Industrial Park Investment Joint Stock Company (Hoa Cam IZI).' : 'Công ty Cổ phần đầu tư KCN Hòa Cầm (Hoa Cam IZI).'}</p>
                        <ul className="list-none pl-0 mt-1 space-y-1 text-xs">
                            <li><strong>{isEn ? 'Address:' : 'Địa chỉ:'}</strong> {isEn ? 'Street No. 01, Hoa Cam Industrial Park, Cam Le Ward, Da Nang City.' : 'Đường số 01, Khu công nghiệp Hòa Cầm, Phường Cẩm Lệ, Thành phố Đà Nẵng.'}</li>
                            <li><strong>{isEn ? 'Phone:' : 'Điện thoại:'}</strong> (+84) 914.109667 - 672 - 673 - 674 - 675</li>
                            <li><strong>{isEn ? 'Fax:' : 'Fax:'}</strong> (+84 236) 3.898.077</li>
                            <li><strong>{isEn ? 'Email:' : 'Email:'}</strong> hoacamizi@vnn.vn</li>
                        </ul>
                    </section>
                     <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '5. Land-use planning status' : '5. Hiện trạng quy hoạch sử dụng đất'}</h2>
                        <ul className="list-disc pl-4 mt-1 space-y-1 text-xs">
                            <li>{isEn ? 'Total land area according to the master plan: 149.84 ha' : 'Tổng diện tích đất theo quy hoạch : 149,84 ha'}</li>
                            <li>{isEn ? 'Industrial land available for lease: 107.07 ha' : 'Diện tích đất công nghiệp có thể cho thuê : 107,07 ha'}</li>
                            <li>{isEn ? 'Industrial land leased: 93.44 ha' : 'Diện tích đất công nghiệp đã cho thuê: 93,44ha'}</li>
                            <li>{isEn ? 'Remaining industrial land: 13.63 ha' : 'Diện tích đất công nghiệp còn lại : 13,63 ha'}</li>
                            <li>{isEn ? 'Industrial land without infrastructure: 12.04 ha' : 'Diện tích đất công nghiệp chưa có hạ tầng 12,04 ha'}</li>
                            <li>{isEn ? 'Filling rate: 87.27%' : 'Tỷ lệ lấp đầy : 87,27%'}</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '6. Hoa Cam IP master plan map' : '6. Bản đồ quy hoạch KCN Hòa Cầm'}</h2>
                        <Dialog onOpenChange={() => setMapZoom(1)}>
                          <DialogTrigger asChild>
                            <button type="button" className={`${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary-hover' : 'text-dseza-light-primary hover:text-dseza-light-primary-hover'} font-semibold text-xs underline`}>
                              {isEn ? '(View here)' : '(Xem tại đây)'}
                            </button>
                          </DialogTrigger>
                          <DialogContent className="p-0 bg-transparent border-0 shadow-none max-w-[95vw]">
                            <DialogTitle className="sr-only">{isEn ? 'Hoa Cam Industrial Park Master Plan' : 'Bản đồ quy hoạch Khu công nghiệp Hòa Cầm'}</DialogTitle>
                            <div className="relative max-h-[80vh] overflow-auto rounded-md">
                              <img
                                src="/media/Functionalmap/ban-do-khu-cong-nghiep-hoa-khanh.jpg"
                                alt={isEn ? 'Master plan map' : 'Bản đồ quy hoạch'}
                                className="w-full h-auto"
                                style={{ transform: `scale(${mapZoom})`, transformOrigin: 'center center' }}
                              />
                              <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-black/60 rounded-md p-1">
                                <Button size="sm" variant="secondary" className="w-7 h-7 p-0" onClick={() => setMapZoom(z => Math.max(1, Number((z - 0.25).toFixed(2))))}>-</Button>
                                <span className="px-2 text-xs text-white">{Math.round(mapZoom * 100)}%</span>
                                <Button size="sm" variant="secondary" className="w-7 h-7 p-0" onClick={() => setMapZoom(z => Math.min(5, Number((z + 0.25).toFixed(2))))}>+</Button>
                                <Button size="sm" variant="outline" className="h-7 text-white border-white/60" onClick={() => setMapZoom(1)}>Reset</Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
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
                to={isEn ? '/en/trang-chu' : '/vi/trang-chu'}
                className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {isEn ? 'Home' : 'Trang chủ'}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link
                to={isEn ? '/en/gioi-thieu/cac-khu-chuc-nang' : '/vi/gioi-thieu/cac-khu-chuc-nang'}
                className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {isEn ? 'Functional zones' : 'Các khu chức năng'}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {isEn ? 'Hoa Cam Industrial Park' : 'Khu công nghiệp Hòa Cầm'}
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
                {isEn ? 'Hoa Cam Industrial Park' : 'Khu công nghiệp Hòa Cầm'}
              </h1>
            </header>

            {/* Article Content */}
            <div className={`prose-lg max-w-none font-inter ${theme === 'dark' ? 'prose-invert text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                <p>{isEn ? 'Hoa Cam Industrial Park (HCIP) was established under Decision No. 1252/QD-BXD dated 19/09/2003 by the Ministry of Construction. It was originally invested by Da Nang Industrial Park Infrastructure Development and Operation Company and later transferred to Hoa Cam Industrial Park Investment JSC (IZI). The park is 8 km from the city center; Tien Sa Seaport, Lien Chieu Seaport, and Da Nang International Airport are about 5–7 km away.' : 'KCN Hòa Cầm được thành lập theo Quyết định số 1252/QĐ-BXD ngày 19/9/2003 của Bộ Xây dựng về phê duyệt Quy hoạch chi tiết KCN Hòa Cầm thành phố Đà Nẵng, do Công ty Phát triển và Khai thác hạ tầng KCN Đà Nẵng làm chủ đầu tư. KCN đã được chuyển giao cho Công ty Cổ phần Đầu tư KCN Hòa Cầm (Công ty IZI) làm chủ đầu tư theo hướng xã hội hóa; nằm cách trung tâm thành phố Đà Nẵng 8km; cảng Tiên Sa, cảng Liên Chiểu và sân bay quốc tế Đà Nẵng cách khoảng 5–7km.'}</p>
                <div className="my-6 rounded-lg overflow-hidden shadow-lg">
                    <img
                        src="/media/Functionalmap/ban-do-khu-cong-nghiep-hoa-khanh.jpg"
                        alt="Bản đồ Khu công nghiệp Hòa Cầm"
                        className="w-full h-auto object-cover"
                    />
                </div>
                <div className="space-y-8 text-justify">
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '1. Location' : '1. Vị trí địa lý'}</h2>
                        <p>{isEn ? 'Cam Le Ward, Da Nang City.' : 'Phường Cẩm Lệ, thành phố Đà Nẵng.'}</p>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>{isEn ? 'Distance to Tien Sa Seaport: 10 km' : 'Cách cảng biển Tiên Sa: 10 km'}</li>
                            <li>{isEn ? 'Distance to Da Nang International Airport: 07 km' : 'Cách Sân bay Quốc tế Đà Nẵng: 07 km'}</li>
                            <li>{isEn ? 'Distance to Da Nang city center: 08 km' : 'Cách Trung tâm thành phố Đà Nẵng: 08 km'}</li>
                            <li>{isEn ? 'Distance to railway station: 08 km' : 'Cách ga đường sắt: 08 km'}</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '2. Total area' : '2. Tổng diện tích'}</h2>
                        <p>{isEn ? '149.84 ha, including 107.07 ha of leasable industrial land.' : '149,84 ha, trong đó có 107,07 ha đất công nghiệp có thể cho thuê.'}</p>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '3. Land sublease prices and infrastructure fees (until Aug 2054)' : '3. Giá cho thuê lại đất và tiền sử dụng hạ tầng: (Đến tháng 8 năm 2054)'}</h2>
                        <p className="text-sm italic">{isEn ? 'Updated: Q3/2025' : 'Ngày cập nhật: Quý III năm 2025'}</p>
                        <p className="text-sm italic">{isEn ? 'Prices are indicative; please contact Hoa Cam Industrial Park Investment JSC (Hoa Cam IZI) for details.' : 'Giá có tính chất tham khảo, mọi chi tiết xin liên hệ Công ty Cổ phần Đầu tư Khu công nghiệp Hòa Cầm (HoacamIZI)'}</p>
                        <div className="mt-4">
                            <h3 className={`font-montserrat text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{isEn ? 'Land sublease price:' : '- Đơn giá thuê lại đất:'}</h3>
                            <div className="overflow-x-auto">
                                <table className={`min-w-full border-collapse border text-sm ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                    <thead className={`${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`}>
                                        <tr>
                                            <th className={`p-3 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Payment method' : 'Phương thức thanh toán'}</th>
                                            <th className={`p-3 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Unit price (VND/m²/year)' : 'Đơn giá (đồng/m2/năm)'}</th>
                                        </tr>
                                    </thead>
                                    <tbody className={`${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                        <tr className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
                                            <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>{isEn ? 'Annual payment' : 'Trả tiền thuê lại đất hàng năm'}</td>
                                            <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>95.500</td>
                                        </tr>
                                        <tr className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-dseza-light-secondary-bg'}`}>
                                            <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>{isEn ? 'One-off payment for entire lease term (until 08/08/2054)' : 'Trả tiền thuê lại đất một lần cho toàn bộ thời hạn thuê (đến ngày 08/8/2054)'}</td>
                                            <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>2.150.000 ({isEn ? 'VND/m²/entire term' : 'đồng/m2/toàn bộ thời hạn thuê'})</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className={`font-montserrat text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{isEn ? 'Infrastructure usage fee:' : '- Đơn giá tiền sử dụng hạ tầng:'}</h3>
                            <p>{isEn ? '14,950 VND/m²/year (paid annually)' : '14.950 đồng/m2/năm (trả hàng năm)'}</p>
                            <p className="mt-2 text-sm italic">{isEn ? 'Prices exclude VAT.' : 'Các đơn giá nêu trên chưa bao gồm thuế GTGT'}</p>
                        </div>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '4. Infrastructure developer' : '4. Chủ đầu tư kinh doanh hạ tầng'}</h2>
                        <p className="font-semibold">{isEn ? 'Hoa Cam Industrial Park Investment Joint Stock Company (Hoa Cam IZI).' : 'Công ty Cổ phần đầu tư KCN Hòa Cầm (Hoa Cam IZI).'}</p>
                        <ul className="list-none pl-0 mt-2 space-y-2">
                            <li><strong>{isEn ? 'Address:' : 'Địa chỉ:'}</strong> {isEn ? 'Street No. 01, Hoa Cam Industrial Park, Cam Le Ward, Da Nang City.' : 'Đường số 01, Khu công nghiệp Hòa Cầm, Phường Cẩm Lệ, Thành phố Đà Nẵng.'}</li>
                            <li><strong>{isEn ? 'Phone:' : 'Điện thoại:'}</strong> (+84) 914.109667 - 672 - 673 - 674 - 675</li>
                            <li><strong>{isEn ? 'Fax:' : 'Fax:'}</strong> (+84 236) 3.898.077</li>
                            <li><strong>{isEn ? 'Email:' : 'Email:'}</strong> hoacamizi@vnn.vn</li>
                        </ul>
                    </section>
                     <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '5. Land-use planning status' : '5. Hiện trạng quy hoạch sử dụng đất'}</h2>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>{isEn ? 'Total land area according to the master plan: 149.84 ha' : 'Tổng diện tích đất theo quy hoạch : 149,84 ha'}</li>
                            <li>{isEn ? 'Industrial land available for lease: 107.07 ha' : 'Diện tích đất công nghiệp có thể cho thuê : 107,07 ha'}</li>
                            <li>{isEn ? 'Industrial land leased: 93.44 ha' : 'Diện tích đất công nghiệp đã cho thuê: 93,44ha'}</li>
                            <li>{isEn ? 'Remaining industrial land: 13.63 ha' : 'Diện tích đất công nghiệp còn lại : 13,63 ha'}</li>
                            <li>{isEn ? 'Industrial land without infrastructure: 12.04 ha' : 'Diện tích đất công nghiệp chưa có hạ tầng 12,04 ha'}</li>
                            <li>{isEn ? 'Filling rate: 87.27%' : 'Tỷ lệ lấp đầy : 87,27%'}</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '6. Hoa Cam IP master plan map' : '6. Bản đồ quy hoạch KCN Hòa Cầm'}</h2>
                        <Dialog onOpenChange={() => setMapZoom(1)}>
                          <DialogTrigger asChild>
                            <button type="button" className={`${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary-hover' : 'text-dseza-light-primary hover:text-dseza-light-primary-hover'} font-semibold underline`}>
                              {isEn ? '(View here)' : '(Xem tại đây)'}
                            </button>
                          </DialogTrigger>
                          <DialogContent className="p-0 bg-transparent border-0 shadow-none max-w-6xl">
                            <DialogTitle className="sr-only">{isEn ? 'Hoa Cam Industrial Park Master Plan' : 'Bản đồ quy hoạch Khu công nghiệp Hòa Cầm'}</DialogTitle>
                            <div className="relative max-h-[85vh] overflow-auto rounded-md">
                              <img
                                src="/media/Functionalmap/ban-do-khu-cong-nghiep-hoa-khanh.jpg"
                                alt={isEn ? 'Master plan map' : 'Bản đồ quy hoạch'}
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

export default KhuCongNghiepHoaCam;