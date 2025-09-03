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

const KhuCongNghiepLienChieu = () => {
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
        title: isEn ? 'Lien Chieu Industrial Park - DSEZA' : 'Khu công nghiệp Liên Chiểu - DSEZA',
        text: isEn ? 'Information about Lien Chieu Industrial Park' : 'Thông tin về Khu công nghiệp Liên Chiểu',
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
                {isEn ? 'Lien Chieu Industrial Park' : 'Khu công nghiệp Liên Chiểu'}
              </span>
            </nav>

            {/* Article Header - Mobile */}
            <header className="mb-4">
              <h1 className={`font-montserrat text-lg font-bold mb-2 leading-tight ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {isEn ? 'Lien Chieu Industrial Park' : 'Khu công nghiệp Liên Chiểu'}
              </h1>
            </header>

            {/* Article Content - Mobile */}
            <div className={`text-sm font-inter ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                <p className="mb-3 text-justify">{isEn ? 'Lien Chieu Industrial Park was established under Decision No. 344/QD-TTg dated 18/04/1998 of the Prime Minister, located in Hai Van Ward, Da Nang City; about 15 km from Da Nang International Airport, 25 km from Tien Sa Seaport, adjacent to Lien Chieu Seaport and near the southern exit of the Hai Van Tunnel.' : 'Khu công nghiệp Liên Chiểu được thành lập theo Quyết định số 344/QĐ-TTg ngày 18/4/1998 của Thủ tướng Chính Phủ, thuộc phường Hải Vân, thành phố Đà Nẵng; nằm cách sân bay quốc tế Đà Nẵng 15 km, cảng biển Tiên Sa 25 km, nằm sát với cảng biển Liên Chiểu và tiếp giáp với cửa ra phía Nam của đường hầm đèo Hải Vân.'}</p>
                <div className="my-4 rounded-lg overflow-hidden shadow-lg">
                    <img
                        src="/media/Functionalmap/ban-do-khu-cong-nghiep-hoa-khanh.jpg"
                        alt={isEn ? 'Lien Chieu Industrial Park planning map (representative)' : 'Bản đồ quy hoạch KCN Liên Chiểu (đại diện)'}
                        className="w-full h-auto object-cover"
                    />
                </div>
                <div className="space-y-4 text-justify">
                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '1. Location' : '1. Vị trí địa lí'}</h2>
                        <p className="mb-2">{isEn ? 'Hai Van Ward, Da Nang City.' : 'Phường Hải Vân, thành phố Đà Nẵng.'}</p>
                        <ul className="list-disc pl-4 mt-1 space-y-1 text-xs">
                            <li>{isEn ? 'Distance to Tien Sa Seaport: 23 km' : 'Cách cảng biển Tiên Sa: 23 km'}</li>
                            <li>{isEn ? 'Distance to Da Nang International Airport: 13 km' : 'Cách Sân bay Quốc tế Đà Nẵng: 13 km'}</li>
                            <li>{isEn ? 'Distance to City Center: 14 km' : 'Cách Trung tâm thành phố Đà Nẵng: 14 km'}</li>
                            <li>{isEn ? 'Distance to Railway Station: 14 km' : 'Cách ga đường sắt: 14 km'}</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '2. Total area' : '2. Tổng diện tích'}</h2>
                        <p>{isEn ? '289.35 ha. Of which 206.13 ha of industrial land is leasable.' : '289,35 ha. Trong đó có 206,13 ha đất công nghiệp có thể cho thuê.'}</p>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '3. Land sublease price and infrastructure fee (until 2046)' : '3. Giá cho thuê lại đất và tiền sử dụng hạ tầng: (Đến năm 2046)'}</h2>
                        <p className="text-xs italic mb-2">{isEn ? 'Updated: Q3/2025. Applied from 01/01/2021 (reference exchange rate 29/12/2020 of Vietcombank: 1 USD = 23,220 VND).' : 'Ngày cập nhật: Quý III năm 2025. Áp dụng từ ngày 01/01/2021 (tạm tính theo tỷ giá bán ra ngày 29/12/2020 của Ngân hàng TMCP Ngoại Thương Việt Nam: 1 USD = 23.220 VNĐ)'}</p>
                        <p className="text-xs italic mb-3">{isEn ? 'Prices are indicative; please contact Saigon - Da Nang Investment JSC (SDN) for details.' : 'Giá có tính chất tham khảo, mọi chi tiết xin liên hệ Công ty cổ phần Đầu tư Sài Gòn-Đà Nẵng (SDN).'}</p>
                        <div className="mt-3">
                            <h3 className={`font-montserrat text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{isEn ? '2.1. Land sublease price:' : '- Đơn giá thuê lại đất:'}</h3>
                            <div className="overflow-x-auto">
                                <table className={`min-w-full border-collapse border text-xs ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                    <thead className={`${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`}>
                                        <tr>
                                            <th className={`p-2 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Payment method' : 'Phương thức thanh toán'}</th>
                                            <th className={`p-2 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Unit price (VND/m²/lease term)' : 'Đơn giá (đồng/m2/hết thời hạn thuê)'}</th>
                                        </tr>
                                    </thead>
                                    <tbody className={`${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                        <tr className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
                                            <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>{isEn ? 'One-time payment until end of lease term (VAT excluded)' : 'Trả tiền thuê lại đất một lần đến hết thời hạn thuê (chưa bao gồm thuế GTGT)'}</td>
                                            <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>2.599.300 VNĐ</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className={`font-montserrat text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{isEn ? '2.2. Infrastructure use and management fee:' : '- Đơn giá phí quản lý và tiền sử dụng hạ tầng:'}</h3>
                            <p className="mb-1">{isEn ? '11,815 VND/m²/year (VAT excluded)' : '11.815 đồng/m2/năm (chưa bao gồm thuế GTGT)'}</p>
                            <p className="text-xs italic">Các phí quản lý và sử dụng cơ sở hạ tầng này có thể được điều chỉnh sau 3 (ba) năm kể từ ngày Bên cho thuê và Bên thuê ký kết Hợp đồng cung cấp dịch vụ sử dụng cơ sở hạ tầng và cứ 3 (ba) năm một lần Bên cho thuê có quyền điều chỉnh tăng giá nhưng không vượt quá 15% (mười lăm phần trăm) tổng chi phí mà Bên thuê thanh toán của kỳ thanh toán trước đó.</p>
                        </div>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '4. Infrastructure developer' : '4. Chủ đầu tư kinh doanh hạ tầng'}</h2>
                        <p className="font-semibold mb-2">{isEn ? 'Saigon - Da Nang Investment JSC (SDN)' : 'Công ty Cổ phần Đầu tư Sài Gòn - Đà Nẵng (SDN)'}</p>
                        <ul className="list-none pl-0 mt-1 space-y-1 text-xs">
                            <li><strong>{isEn ? 'Address' : 'Địa chỉ'}:</strong> {isEn ? '61A Nguyen Van Cu St., Lien Chieu District, Da Nang City.' : 'Số 61A Nguyễn Văn Cừ, quận Liên Chiểu, Thành phố Đà Nẵng.'}</li>
                            <li><strong>{isEn ? 'Phone' : 'Điện thoại'}:</strong> 02363. 770998</li>
                            <li><strong>Fax:</strong> 02363. 770997</li>
                            <li><strong>Web:</strong> www.dananginvest.com</li>
                            <li><strong>Email:</strong> info@dananginvest.com</li>
                        </ul>
                    </section>
                     <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '5. Land-use planning status' : '5. Hiện trạng quy hoạch sử dụng đất'}</h2>
                        <ul className="list-disc pl-4 mt-1 space-y-1 text-xs">
                            <li>{isEn ? 'Total planned land area: 289.35 ha' : 'Tổng diện tích đất theo quy hoạch : 289,35 ha'}</li>
                            <li>{isEn ? 'Industrial land available for lease: 206.13 ha' : 'Diện tích đất công nghiệp có thể cho thuê : 206,13 ha'}</li>
                            <li>{isEn ? 'Industrial land leased: 123.82 ha' : 'Diện tích đất công nghiệp đã cho thuê: 123,82 ha'}</li>
                            <li>{isEn ? 'Remaining industrial land: 82.31 ha' : 'Diện tích đất công nghiệp còn lại : 82,31 ha'}</li>
                            <li>{isEn ? 'Industrial land without infrastructure: 23 ha' : 'Diện tích đất công nghiệp chưa có hạ tầng 23 ha'}</li>
                            <li>{isEn ? 'Filling rate: 60.07%' : 'Tỷ lệ lắp đầy: 60,07%'}</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '6. Lien Chieu IP master plan map' : '6. Bản đồ quy hoạch KCN Liên Chiểu'}</h2>
                        <Dialog onOpenChange={() => setMapZoom(1)}>
                          <DialogTrigger asChild>
                            <button type="button" className={`${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary-hover' : 'text-dseza-light-primary hover:text-dseza-light-primary-hover'} font-semibold underline`}>
                              {isEn ? '(View here)' : '(Xem tại đây)'}
                            </button>
                          </DialogTrigger>
                          <DialogContent className="p-0 bg-transparent border-0 shadow-none max-w-[95vw]">
                            <DialogTitle className="sr-only">{isEn ? 'Lien Chieu IP Master Plan' : 'Bản đồ quy hoạch KCN Liên Chiểu'}</DialogTitle>
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
                {isEn ? 'Functional zones' : 'Các khu chức năng'}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {isEn ? 'Lien Chieu Industrial Park' : 'Khu công nghiệp Liên Chiểu'}
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
                {isEn ? 'Lien Chieu Industrial Park' : 'Khu công nghiệp Liên Chiểu'}
              </h1>
            </header>

            {/* Article Content */}
            <div className={`prose-lg max-w-none font-inter ${theme === 'dark' ? 'prose-invert text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                <p>{isEn ? 'Lien Chieu Industrial Park was established under Decision No. 344/QD-TTg dated 18/04/1998 of the Prime Minister, located in Hai Van Ward, Da Nang City; about 15 km from Da Nang International Airport, 25 km from Tien Sa Seaport, adjacent to Lien Chieu Seaport and near the southern exit of the Hai Van Tunnel.' : 'Khu công nghiệp Liên Chiểu được thành lập theo Quyết định số 344/QĐ-TTg ngày 18/4/1998 của Thủ tướng Chính Phủ, thuộc phường Hải Vân, thành phố Đà Nẵng; nằm cách sân bay quốc tế Đà Nẵng 15 km, cảng biển Tiên Sa 25 km, nằm sát với cảng biển Liên Chiểu và tiếp giáp với cửa ra phía Nam của đường hầm đèo Hải Vân.'}</p>
                <div className="my-6 rounded-lg overflow-hidden shadow-lg">
                    <img
                        src="/media/Functionalmap/ban-do-khu-cong-nghiep-hoa-khanh.jpg"
                        alt={isEn ? 'Lien Chieu Industrial Park planning map (representative)' : 'Bản đồ quy hoạch KCN Liên Chiểu (đại diện)'}
                        className="w-full h-auto object-cover"
                    />
                </div>
                <div className="space-y-8 text-justify">
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '1. Location' : '1. Vị trí địa lí'}</h2>
                        <p>{isEn ? 'Hai Van Ward, Da Nang City.' : 'Phường Hải Vân, thành phố Đà Nẵng.'}</p>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>{isEn ? 'Distance to Tien Sa Seaport: 23 km' : 'Cách cảng biển Tiên Sa: 23 km'}</li>
                            <li>{isEn ? 'Distance to Da Nang International Airport: 13 km' : 'Cách Sân bay Quốc tế Đà Nẵng: 13 km'}</li>
                            <li>{isEn ? 'Distance to City Center: 14 km' : 'Cách Trung tâm thành phố Đà Nẵng: 14 km'}</li>
                            <li>{isEn ? 'Distance to Railway Station: 14 km' : 'Cách ga đường sắt: 14 km'}</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '2. Total area' : '2. Tổng diện tích'}</h2>
                        <p>{isEn ? '289.35 ha. Of which 206.13 ha of industrial land is leasable.' : '289,35 ha. Trong đó có 206,13 ha đất công nghiệp có thể cho thuê.'}</p>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '3. Land sublease price and infrastructure fee (until 2046)' : '3. Giá cho thuê lại đất và tiền sử dụng hạ tầng: (Đến năm 2046)'}</h2>
                        <p className="text-sm italic">{isEn ? 'Updated: Q3/2025. Applied from 01/01/2021 (reference exchange rate 29/12/2020 of Vietcombank: 1 USD = 23,220 VND)' : 'Ngày cập nhật: Quý III năm 2025. Áp dụng từ ngày 01/01/2021 (tạm tính theo tỷ giá bán ra ngày 29/12/2020 của Ngân hàng TMCP Ngoại Thương Việt Nam: 1 USD = 23.220 VNĐ)'}</p>
                        <p className="text-sm italic">{isEn ? 'Prices are indicative; please contact Saigon - Da Nang Investment JSC (SDN) for details.' : 'Giá có tính chất tham khảo, mọi chi tiết xin liên hệ Công ty cổ phần Đầu tư Sài Gòn-Đà Nẵng (SDN).'}</p>
                        <div className="mt-4">
                            <h3 className={`font-montserrat text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{isEn ? '2.1. Land sublease price:' : '- Đơn giá thuê lại đất:'}</h3>
                            <div className="overflow-x-auto">
                                <table className={`min-w-full border-collapse border text-sm ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                    <thead className={`${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`}>
                                        <tr>
                                            <th className={`p-3 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Payment method' : 'Phương thức thanh toán'}</th>
                                            <th className={`p-3 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Unit price (VND/m²/lease term)' : 'Đơn giá (đồng/m2/hết thời hạn thuê)'}</th>
                                        </tr>
                                    </thead>
                                    <tbody className={`${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                        <tr className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
                                            <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>{isEn ? 'One-time payment until end of lease term (VAT excluded)' : 'Trả tiền thuê lại đất một lần đến hết thời hạn thuê (chưa bao gồm thuế GTGT)'}</td>
                                            <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>2.599.300 VNĐ</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className={`font-montserrat text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{isEn ? '2.2. Infrastructure use and management fee:' : '- Đơn giá phí quản lý và tiền sử dụng hạ tầng:'}</h3>
                            <p>{isEn ? '11,815 VND/m²/year (VAT excluded)' : '11.815 đồng/m2/năm (chưa bao gồm thuế GTGT)'}</p>
                            <p className="mt-2 text-sm italic">Các phí quản lý và sử dụng cơ sở hạ tầng này có thể được điều chỉnh sau 3 (ba) năm kể từ ngày Bên cho thuê và Bên thuê ký kết Hợp đồng cung cấp dịch vụ sử dụng cơ sở hạ tầng và cứ 3 (ba) năm một lần Bên cho thuê có quyền điều chỉnh tăng giá nhưng không vượt quá 15% (mười lăm phần trăm) tổng chi phí mà Bên thuê thanh toán của kỳ thanh toán trước đó.</p>
                        </div>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '4. Infrastructure developer' : '4. Chủ đầu tư kinh doanh hạ tầng'}</h2>
                        <p className="font-semibold">{isEn ? 'Saigon - Da Nang Investment JSC (SDN)' : 'Công ty Cổ phần Đầu tư Sài Gòn - Đà Nẵng (SDN)'}</p>
                        <ul className="list-none pl-0 mt-2 space-y-2">
                            <li><strong>{isEn ? 'Address' : 'Địa chỉ'}:</strong> {isEn ? '61A Nguyen Van Cu St., Lien Chieu District, Da Nang City.' : 'Số 61A Nguyễn Văn Cừ, quận Liên Chiểu, Thành phố Đà Nẵng.'}</li>
                            <li><strong>{isEn ? 'Phone' : 'Điện thoại'}:</strong> 02363. 770998</li>
                            <li><strong>Fax:</strong> 02363. 770997</li>
                            <li><strong>Web:</strong> www.dananginvest.com</li>
                            <li><strong>Email:</strong> info@dananginvest.com</li>
                        </ul>
                    </section>
                     <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '5. Land-use planning status' : '5. Hiện trạng quy hoạch sử dụng đất'}</h2>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>{isEn ? 'Total planned land area: 289.35 ha' : 'Tổng diện tích đất theo quy hoạch : 289,35 ha'}</li>
                            <li>{isEn ? 'Industrial land available for lease: 206.13 ha' : 'Diện tích đất công nghiệp có thể cho thuê : 206,13 ha'}</li>
                            <li>{isEn ? 'Industrial land leased: 123.82 ha' : 'Diện tích đất công nghiệp đã cho thuê: 123,82 ha'}</li>
                            <li>{isEn ? 'Remaining industrial land: 82.31 ha' : 'Diện tích đất công nghiệp còn lại : 82,31 ha'}</li>
                            <li>{isEn ? 'Industrial land without infrastructure: 23 ha' : 'Diện tích đất công nghiệp chưa có hạ tầng 23 ha'}</li>
                            <li>{isEn ? 'Filling rate: 60.07%' : 'Tỷ lệ lắp đầy: 60,07%'}</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '6. Lien Chieu IP master plan map' : '6. Bản đồ quy hoạch KCN Liên Chiểu'}</h2>
                        <Dialog onOpenChange={() => setMapZoom(1)}>
                          <DialogTrigger asChild>
                            <button type="button" className={`${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary-hover' : 'text-dseza-light-primary hover:text-dseza-light-primary-hover'} font-semibold underline`}>
                              {isEn ? '(View here)' : '(Xem tại đây)'}
                            </button>
                          </DialogTrigger>
                          <DialogContent className="p-0 bg-transparent border-0 shadow-none max-w-6xl">
                            <DialogTitle className="sr-only">{isEn ? 'Lien Chieu IP Master Plan' : 'Bản đồ quy hoạch KCN Liên Chiểu'}</DialogTitle>
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

export default KhuCongNghiepLienChieu;