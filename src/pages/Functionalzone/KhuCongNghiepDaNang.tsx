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

const KhuCongNghiepDaNang = () => {
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
        title: isEn ? 'Da Nang Industrial Park - DSEZA' : 'Khu công nghiệp Đà Nẵng - DSEZA',
        text: isEn ? 'Information about Da Nang Industrial Park' : 'Thông tin về Khu công nghiệp Đà Nẵng',
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
                {isEn ? 'Da Nang Industrial Park' : 'Khu công nghiệp Đà Nẵng'}
              </span>
            </nav>

            {/* Article Header - Mobile */}
            <header className="mb-4">
              <h1 className={`font-montserrat text-lg font-bold mb-2 leading-tight ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {isEn ? 'Da Nang Industrial Park' : 'Khu công nghiệp Đà Nẵng'}
              </h1>
            </header>

            {/* Article Content - Mobile */}
            <div className={`text-sm font-inter ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                 <p className="mb-3 text-justify">{isEn ? 'Da Nang Industrial Park was established under Investment License No. 689/GP dated 21/10/1993 by the State Committee for Cooperation and Investment (now the Ministry of Planning and Investment). Located in Son Tra District (now An Hai Ward), it is about 6 km south of Tien Sa Port, 5 km east of Da Nang International Airport, and nearly 2 km from the city center. The project investor is Massda Land Co., Ltd.' : 'Khu công nghiệp Đà Nẵng được thành lập theo Giấy Phép đầu tư số 689/GP ngày 21/10/1993 của UBNN về Hợp tác và Đầu tư (nay là Bộ Kế hoạch và Đầu tư) tại quận Sơn Trà (nay là phường An Hải), nằm cách Cảng biển Tiên Sa 6 Km về phía Nam, cách Sân bay quốc tế Đà Nẵng 5km về phía Đông và cách trung tâm thành phố Đà Nẵng gần 2km. Dự án do Công ty TNHH Massda Land làm chủ đầu tư.'}</p>
                 <p className="mb-3 text-justify">{isEn ? 'All infrastructure such as power supply, water supply, roads, and telecommunications have been completely built in Da Nang Industrial Park.' : 'Toàn bộ các công trình hạ tầng như hệ thống cấp điện, cấp nước, đường giao thông, thông tin liên lạc ... tại Khu công nghiệp Đà Nẵng đã được đầu tư xây dựng hoàn chỉnh.'}</p>
                 <p className="mb-3 text-justify">{isEn ? 'According to the Da Nang City Urban Master Plan to 2030 with a vision to 2045 (Decision No. 359/QD-TTg dated 15/03/2021), Da Nang IP is planned to become An Don Central Business District (CBD).' : 'Theo Quy hoạch chung thành phố Đà Nẵng đến năm 2030, tầm nhìn đến năm 2045 được Thủ tướng Chính phủ phê duyệt tại Quyết định số 359/QĐ-TTg ngày 15/3/2021, KCN Đà Nẵng được quy hoạch thành Khu thương mại Trung tâm An Đồn (CBD). '}</p>
                <div className="my-4 rounded-lg overflow-hidden shadow-lg">
                    <img
                        src="/media/Functionalmap/ban-do-khu-cong-nghiep-hoa-khanh.jpg"
                        alt="Khu công nghiệp Đà Nẵng"
                        className="w-full h-auto object-cover"
                    />
                </div>
                <div className="space-y-4 text-justify">
                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '1. Location' : '1. Vị trí địa lí'}</h2>
                        <p className="mb-2">{isEn ? 'An Hai Ward, Da Nang City.' : 'Phường An Hải, thành phố Đà Nẵng.'}</p>
                        <ul className="list-disc pl-4 mt-1 space-y-1 text-xs">
                            <li>Cách cảng biển Tiên Sa: 06 km</li>
                            <li>Cách Sân bay Quốc tế Đà Nẵng: 04 km</li>
                            <li>Cách Trung tâm thành phố Đà Nẵng: 02 km</li>
                            <li>Cách ga đường sắt: 03 km</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '2. Total area' : '2. Tổng diện tích'}</h2>
                        <p>{isEn ? '50.1 ha, including 41.87 ha of leasable industrial land. Currently the park is 100% occupied and no land is available for lease.' : '50,1 ha, trong đó có 41.87 ha đất công nghiệp có thể cho thuê. Hiện tại, Khu công nghiệp đã lấp đầy 100% diện tích và không còn đất để cho thuê.'}</p>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '3. Land sublease prices and infrastructure usage' : '3. Giá cho thuê lại đất và sử dụng hạ tầng'}</h2>
                        <p>{isEn ? 'Currently all land in Da Nang Industrial Park has been fully leased, so Massda Land Co., Ltd. does not register prices.' : 'Hiện nay đất tại Khu công nghiệp Đà Nẵng đã được cho thuê hết nên Công ty TNHH Massda Land không thực hiện đăng ký.'}</p>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '4. Infrastructure investor' : '4. Chủ đầu tư kinh doanh hạ tầng'}</h2>
                        <p className="font-semibold mb-2">{isEn ? 'Massda Land Co., Ltd.' : 'Công ty TNHH Massda Land'}</p>
                        <ul className="list-none pl-0 mt-1 space-y-1 text-xs">
                            <li><strong>{isEn ? 'Address' : 'Địa chỉ'}:</strong> {isEn ? 'Da Nang Industrial Park, Son Tra District, Da Nang City.' : 'KCN Đà Nẵng, quận Sơn Trà, Thành phố Đà Nẵng.'}</li>
                            <li><strong>{isEn ? 'Tel' : 'Điện thoại'}:</strong> 84-511-3.844.375</li>
                            <li><strong>Fax:</strong> 84-511-3.844.374</li>
                            <li><strong>Email:</strong> massda@dng.vnn.vn</li>
                        </ul>
                    </section>
                     <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '5. Land-use planning status' : '5. Hiện trạng quy hoạch sử dụng đất'}</h2>
                        <ul className="list-disc pl-4 mt-1 space-y-1 text-xs">
                            <li>{isEn ? 'Total land area according to the plan: 50.10 ha' : 'Tổng diện tích đất theo quy hoạch : 50,10 ha'}</li>
                            <li>{isEn ? 'Leasable industrial land: 41.87 ha' : 'Diện tích đất công nghiệp có thể cho thuê : 41,87 ha'}</li>
                            <li>{isEn ? 'Leased industrial land: 41.87 ha' : 'Diện tích đất công nghiệp đã cho thuê: 41,87 ha'}</li>
                            <li>{isEn ? 'Remaining industrial land: 0.00 ha' : 'Diện tích đất công nghiệp còn lại : 0,00 ha'}</li>
                            <li>{isEn ? 'Industrial land without infrastructure: 0.00 ha' : 'Diện tích đất công nghiệp chưa có hạ tầng 0,00 ha'}</li>
                            <li>{isEn ? 'Occupancy rate: 100%' : 'Tỷ lệ lắp đầy : 100%'}</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '6. Master plan map of Da Nang IP' : '6. Bản đồ quy hoạch KCN Đà Nẵng'}</h2>
                        <p className="mb-1 text-xs italic">{isEn ? 'As of Q3/2025 (attachment available)' : 'Tính đến quý III năm 2025 (có file đính kèm)'}</p>
                        <Dialog onOpenChange={() => setMapZoom(1)}>
                          <DialogTrigger asChild>
                            <button type="button" className={`${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary-hover' : 'text-dseza-light-primary hover:text-dseza-light-primary-hover'} font-semibold underline`}>
                              {isEn ? '(View here)' : '(Xem tại đây)'}
                            </button>
                          </DialogTrigger>
                          <DialogContent className="p-0 bg-transparent border-0 shadow-none max-w-6xl">
                            <DialogTitle className="sr-only">{isEn ? 'Da Nang IP Master Plan' : 'Bản đồ quy hoạch KCN Đà Nẵng'}</DialogTitle>
                            <div className="relative max-h-[85vh] overflow-auto rounded-md">
                              <img
                                src="/media/Functionalmap/ban-do-khu-cong-nghiep-hoa-khanh.jpg"
                                alt={isEn ? 'Da Nang Industrial Park map' : 'Bản đồ Khu công nghiệp Đà Nẵng'}
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
                {isEn ? 'Da Nang Industrial Park' : 'Khu công nghiệp Đà Nẵng'}
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
                {isEn ? 'Da Nang Industrial Park' : 'Khu công nghiệp Đà Nẵng'}
              </h1>
            </header>

            {/* Article Content */}
            <div className={`prose-lg max-w-none font-inter ${theme === 'dark' ? 'prose-invert text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
            <p className="mb-3 text-justify">{isEn ? 'Da Nang Industrial Park was established under Investment License No. 689/GP dated 21/10/1993 by the State Committee for Cooperation and Investment (now the Ministry of Planning and Investment). Located in Son Tra District (now An Hai Ward), it is about 6 km south of Tien Sa Port, 5 km east of Da Nang International Airport, and nearly 2 km from the city center. The project investor is Massda Land Co., Ltd.' : 'Khu công nghiệp Đà Nẵng được thành lập theo Giấy Phép đầu tư số 689/GP ngày 21/10/1993 của UBNN về Hợp tác và Đầu tư (nay là Bộ Kế hoạch và Đầu tư) tại quận Sơn Trà (nay là phường An Hải), nằm cách Cảng biển Tiên Sa 6 Km về phía Nam, cách Sân bay quốc tế Đà Nẵng 5km về phía Đông và cách trung tâm thành phố Đà Nẵng gần 2km. Dự án do Công ty TNHH Massda Land làm chủ đầu tư.'}</p>
                 <p className="mb-3 text-justify">{isEn ? 'All infrastructure such as power supply, water supply, roads, and telecommunications have been completely built in Da Nang Industrial Park.' : 'Toàn bộ các công trình hạ tầng như hệ thống cấp điện, cấp nước, đường giao thông, thông tin liên lạc ... tại Khu công nghiệp Đà Nẵng đã được đầu tư xây dựng hoàn chỉnh.'}</p>
                 <p className="mb-3 text-justify">{isEn ? 'According to the Da Nang City Urban Master Plan to 2030 with a vision to 2045 (Decision No. 359/QD-TTg dated 15/03/2021), Da Nang IP is planned to become An Don Central Business District (CBD).' : 'Theo Quy hoạch chung thành phố Đà Nẵng đến năm 2030, tầm nhìn đến năm 2045 được Thủ tướng Chính phủ phê duyệt tại Quyết định số 359/QĐ-TTg ngày 15/3/2021, KCN Đà Nẵng được quy hoạch thành Khu thương mại Trung tâm An Đồn (CBD). '}</p>
                <div className="my-4 rounded-lg overflow-hidden shadow-lg">
                    <img
                        src="/media/Functionalmap/ban-do-khu-cong-nghiep-hoa-khanh.jpg"
                        alt="Khu công nghiệp Đà Nẵng"
                        className="w-full h-auto object-cover"
                    />
                </div>
                <div className="space-y-8 text-justify">
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '1. Location' : '1. Vị trí địa lí'}</h2>
                        <p>{isEn ? 'An Hai Ward, Da Nang City.' : 'Phường An Hải, thành phố Đà Nẵng.'}</p>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>{isEn ? 'Distance to Tien Sa Port: 06 km' : 'Cách cảng biển Tiên Sa: 06 km'}</li>
                            <li>{isEn ? 'Distance to Da Nang International Airport: 04 km' : 'Cách Sân bay Quốc tế Đà Nẵng: 04 km'}</li>
                            <li>{isEn ? 'Distance to Da Nang City Center: 02 km' : 'Cách Trung tâm thành phố Đà Nẵng: 02 km'}</li>
                            <li>{isEn ? 'Distance to Railway Station: 03 km' : 'Cách ga đường sắt: 03 km'}</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '2. Total area' : '2. Tổng diện tích'}</h2>
                        <p>{isEn ? '50.1 ha, including 41.87 ha of leasable industrial land. Currently the park is 100% occupied and no land is available for lease.' : '50,1 ha, trong đó có 41.87 ha đất công nghiệp có thể cho thuê. Hiện tại, Khu công nghiệp đã lấp đầy 100% diện tích và không còn đất để cho thuê.'}</p>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '3. Land sublease prices and infrastructure usage' : '3. Giá cho thuê lại đất và sử dụng hạ tầng'}</h2>
                        <p>{isEn ? 'Currently all land in Da Nang Industrial Park has been fully leased, so Massda Land Co., Ltd. does not register prices.' : 'Hiện nay đất tại Khu công nghiệp Đà Nẵng đã được cho thuê hết nên Công ty TNHH Massda Land không thực hiện đăng ký.'}</p>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '4. Infrastructure investor' : '4. Chủ đầu tư kinh doanh hạ tầng'}</h2>
                        <p className="font-semibold">{isEn ? 'Massda Land Co., Ltd.' : 'Công ty TNHH Massda Land'}</p>
                        <ul className="list-none pl-0 mt-2 space-y-2">
                            <li><strong>{isEn ? 'Address' : 'Địa chỉ'}:</strong> {isEn ? 'Da Nang Industrial Park, Son Tra District, Da Nang City.' : 'KCN Đà Nẵng, quận Sơn Trà, Thành phố Đà Nẵng.'}</li>
                            <li><strong>{isEn ? 'Tel' : 'Điện thoại'}:</strong> 84-511-3.844.375</li>
                            <li><strong>Fax:</strong> 84-511-3.844.374</li>
                            <li><strong>{isEn ? 'Web' : 'Web'}:</strong> massda@dng.vnn.vn</li>
                        </ul>
                    </section>
                     <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '5. Land-use planning status' : '5. Hiện trạng quy hoạch sử dụng đất'}</h2>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>{isEn ? 'Total land area according to the plan: 50.10 ha' : 'Tổng diện tích đất theo quy hoạch : 50,10 ha'}</li>
                            <li>{isEn ? 'Leasable industrial land: 41.87 ha' : 'Diện tích đất công nghiệp có thể cho thuê : 41,87 ha'}</li>
                            <li>{isEn ? 'Leased industrial land: 41.87 ha' : 'Diện tích đất công nghiệp đã cho thuê: 41,87 ha'}</li>
                            <li>{isEn ? 'Remaining industrial land: 0.00 ha' : 'Diện tích đất công nghiệp còn lại : 0,00 ha'}</li>
                            <li>{isEn ? 'Industrial land without infrastructure: 0.00 ha' : 'Diện tích đất công nghiệp chưa có hạ tầng 0,00 ha'}</li>
                            <li>{isEn ? 'Occupancy rate: 100%' : 'Tỷ lệ lắp đầy : 100%'}</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '6. Master plan map of Da Nang IP' : '6. Bản đồ quy hoạch KCN Đà Nẵng'}</h2>
                        <p className="mb-1 text-xs italic">{isEn ? 'As of Q3/2025 (attachment available)' : 'Tính đến quý III năm 2025 (có file đính kèm)'}</p>
                        <Dialog onOpenChange={() => setMapZoom(1)}>
                          <DialogTrigger asChild>
                            <button type="button" className={`${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary-hover' : 'text-dseza-light-primary hover:text-dseza-light-primary-hover'} font-semibold underline`}>
                              {isEn ? '(View here)' : '(Xem tại đây)'}
                            </button>
                          </DialogTrigger>
                          <DialogContent className="p-0 bg-transparent border-0 shadow-none max-w-6xl">
                            <DialogTitle className="sr-only">{isEn ? 'Da Nang IP Master Plan' : 'Bản đồ quy hoạch KCN Đà Nẵng'}</DialogTitle>
                            <div className="relative max-h-[85vh] overflow-auto rounded-md">
                              <img
                                src="/media/Functionalmap/ban-do-khu-cong-nghiep-hoa-khanh.jpg"
                                alt={isEn ? 'Da Nang Industrial Park map' : 'Bản đồ Khu công nghiệp Đà Nẵng'}
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