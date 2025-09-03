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

const KhuCongNghiepHoaNinh = () => {
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
        title: isEn ? 'Hoa Ninh Industrial Park - DSEZA' : 'Khu công nghiệp Hòa Ninh - DSEZA',
        text: isEn ? 'Information about Hoa Ninh Industrial Park' : 'Thông tin về Khu công nghiệp Hòa Ninh',
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
                {isEn ? 'Hoa Ninh Industrial Park' : 'Khu công nghiệp Hòa Ninh'}
              </span>
            </nav>

            {/* Article Header - Mobile */}
            <header className="mb-4">
              <h1 className={`text-lg font-bold mb-2 leading-tight ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {isEn ? 'Hoa Ninh Industrial Park' : 'Khu công nghiệp Hòa Ninh'}
              </h1>
            </header>

            {/* Article Content - Mobile */}
            <div className={`text-sm font-inter ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              <div className="space-y-4 text-justify">
                <section>
                  <p>{isEn ? 'Hoa Ninh Industrial Park was established under Decision No. 398/QD-UBND dated 11/02/2025 by the Chairman of Da Nang People\'s Committee, approving the investor for the project of construction and infrastructure business of Hoa Ninh IP (Phu My 3 Da Nang IP). The park covers 400.02 ha in Ba Na Commune, Da Nang City; about 10 km from Da Nang International Airport, 20 km from Tien Sa Seaport, 13 km from Han River Port, and 5 km from Lien Chieu Seaport.' : 'Khu công nghiệp Hòa Ninh được thành lập theo Quyết định số 398/QĐ-UBND ngày 11/02/2025 của Chủ tịch UBND thành phố Đà Nẵng về chấp thuận Nhà đầu tư dự án đầu tư xây dựng và kinh doanh kết cấu hạ tầng KCN Hòa Ninh (Phú Mỹ 3 Đà Nẵng IP), có quy mô 400,02ha, thuộc xã Bà Nà, thành phố Đà Nẵng; nằm cách sân bay quốc tế Đà Nẵng 10km, cảng biển Tiên Sa 20km, cảng Sông Hàn 13km, cảng biển Liên Chiểu 5km.'}</p>
                </section>
                <div className="my-4 rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="/media/Functionalmap/ban-do-khu-cong-nghiep-hoa-khanh.jpg"
                    alt={isEn ? 'Hoa Ninh IP planning map (representative)' : 'Bản đồ quy hoạch KCN Hòa Ninh (đại diện)'}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <section>
                  <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '1. Location' : '1. Vị trí địa lý'}</h2>
                  <p className="mb-2">{isEn ? 'Ba Na Commune, Da Nang City.' : 'xã Bà Nà, thành phố Đà Nẵng.'}</p>
                  <ul className="list-disc pl-4 mt-1 space-y-1 text-xs">
                    <li>{isEn ? 'Distance to Tien Sa Seaport: 31 km' : 'Cách cảng biển Tiên Sa: 31 km'}</li>
                    <li>{isEn ? 'Distance to Da Nang International Airport: 23 km' : 'Cách Sân bay Quốc tế Đà Nẵng: 23 km'}</li>
                    <li>{isEn ? 'Distance to Da Nang City Center: 20 km' : 'Cách Trung tâm thành phố Đà Nẵng: 20 km'}</li>
                    <li>{isEn ? 'Distance to Railway Station: 22 km' : 'Cách ga đường sắt:  22 km'}</li>
                  </ul>
                </section>
                <section>
                  <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '2. Total area' : '2. Tổng diện tích'}</h2>
                  <p>{isEn ? '400.02 ha. Of which 221.22 ha of industrial land is leasable (per Decision No. 5383/QD-UBND dated 25/11/2019 approving the 1/2000 zoning plan for Hoa Ninh IP).' : '400,02 ha. Trong đó có 221,22 ha đất công nghiệp có thể cho thuê (theo Quyết định số 5383/QĐ-UBND ngày 25/11/2019 về phê duyệt Quy hoạch phân khu tỷ lệ 1/2000 KCN Hòa Ninh).'}</p>
                </section>
                <section>
                  <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '3. Land sublease price and infrastructure fee (until 2075)' : '3. Giá cho thuê lại đất và tiền sử dụng hạ tầng: (Đến năm 2075)'}</h2>
                  <p className="text-xs italic">{isEn ? 'The infrastructure developer, Thanh Binh Phu My JSC, is carrying out procedures to implement technical infrastructure construction for Hoa Ninh IP. Pricing has not yet been established and will be reported to the Da Nang HTP and IPs Authority when available.' : 'Chủ đầu tư kinh doanh hạ tầng là Công ty Cổ phần Thanh Bình Phú Mỹ đang triển khai các thủ tục theo quy định để triển khai xây dựng hạ tầng kỹ thuật của Khu công nghiệp Hòa Ninh. Hiện đơn vị chưa xây dựng đơn giá, sẽ báo cáo Ban Quản lý Khu công nghệ cao và các Khu công nghiệp Đà Nẵng khi có.'}</p>
                </section>
                <section>
                  <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '4. Infrastructure developer' : '4. Chủ đầu tư kinh doanh hạ tầng'}</h2>
                  <p className="font-semibold mb-2">{isEn ? 'Thanh Binh Phu My JSC' : 'Công ty Cổ phần Thanh Bình Phú Mỹ'}</p>
                  <ul className="list-none pl-0 mt-1 space-y-1 text-xs">
                    <li><strong>{isEn ? 'Head office address' : 'Địa chỉ trụ sở'}:</strong> {isEn ? 'Phu My 3 Specialized Industrial Park, Ba Ria – Vung Tau Province (now Ho Chi Minh City)' : 'Khu công nghiệp chuyên sâu Phú Mỹ 3, tỉnh Bà Rịa – Vũng Tàu (nay là thành phố Hồ Chí Minh)'}</li>
                    <li><strong>{isEn ? 'Phone' : 'Điện thoại'}:</strong> 0254. 3936838</li>
                    <li><strong>Fax:</strong> 0254. 3936833</li>
                    <li><strong>Web:</strong> phumy3sip.com</li>
                    <li><strong>Email:</strong> info@ phumy3sip.com</li>
                  </ul>
                </section>
                <section>
                  <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '5. Land-use planning status' : '5. Hiện trạng quy hoạch sử dụng đất'}</h2>
                  <ul className="list-disc pl-4 mt-1 space-y-1 text-xs">
                    <li>{isEn ? 'Total planned land area: 400.02 ha' : 'Tổng diện tích đất theo quy hoạch : 400,02 ha'}</li>
                    <li>{isEn ? 'Industrial land leasable per plan: 221.22 ha' : 'Diện tích đất công nghiệp có thể cho thuê theo quy hoạch: 221,22 ha'}</li>
                    <li>{isEn ? 'Industrial land leased: 0 ha' : 'Diện tích đất công nghiệp đã cho thuê: 0 ha'}</li>
                    <li>{isEn ? 'Remaining industrial land: 221.22 ha' : 'Diện tích đất công nghiệp còn lại: 221,22 ha'}</li>
                  </ul>
                </section>
                <section>
                  <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '6. Master plan map of Hoa Ninh IP' : '6. Bản đồ quy hoạch KCN Hòa Ninh'}</h2>
                  <Dialog onOpenChange={() => setMapZoom(1)}>
                    <DialogTrigger asChild>
                      <button type="button" className={`${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary-hover' : 'text-dseza-light-primary hover:text-dseza-light-primary-hover'} font-semibold underline`}>
                        {isEn ? '(View here)' : '(Xem tại đây)'}
                      </button>
                    </DialogTrigger>
                    <DialogContent className="p-0 bg-transparent border-0 shadow-none max-w-[95vw]">
                      <DialogTitle className="sr-only">{isEn ? 'Hoa Ninh IP Master Plan' : 'Bản đồ quy hoạch KCN Hòa Ninh'}</DialogTitle>
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
              <h3 className={`text-sm font-semibold mb-3 flex items-center gap-1 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                <Share2 className="h-3 w-3" />
                {isEn ? 'Share this page:' : 'Chia sẻ trang:'}
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={handleDownload} className="text-xs h-7">
                  <Download className="w-3 h-3 mr-1" />
                  {isEn ? 'Download' : 'Tải xuống'}
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare} className="text-xs h-7">
                  <Share2 className="w-3 h-3 mr-1" />
                  {isEn ? 'Share' : 'Chia sẻ'}
                </Button>
                <Button variant="outline" size="sm" onClick={handlePrint} className="text-xs h-7">
                  <Printer className="w-3 h-3 mr-1" />
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
                {isEn ? 'Hoa Ninh Industrial Park' : 'Khu công nghiệp Hòa Ninh'}
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
                {isEn ? 'Hoa Ninh Industrial Park' : 'Khu công nghiệp Hòa Ninh'}
              </h1>
            </header>

            {/* Article Content */}
            <div className={`prose-lg max-w-none font-inter ${theme === 'dark' ? 'prose-invert text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              <div className="space-y-8 text-justify">
                <section>
                  <p>{isEn ? 'Hoa Ninh Industrial Park was established under Decision No. 398/QD-UBND dated 11/02/2025 by the Chairman of Da Nang People\'s Committee, approving the investor for the project of construction and infrastructure business of Hoa Ninh IP (Phu My 3 Da Nang IP). The park covers 400.02 ha in Ba Na Commune, Da Nang City; about 10 km from Da Nang International Airport, 20 km from Tien Sa Seaport, 13 km from Han River Port, and 5 km from Lien Chieu Seaport.' : 'Khu công nghiệp Hòa Ninh được thành lập theo Quyết định số 398/QĐ-UBND ngày 11/02/2025 của Chủ tịch UBND thành phố Đà Nẵng về chấp thuận Nhà đầu tư dự án đầu tư xây dựng và kinh doanh kết cấu hạ tầng KCN Hòa Ninh (Phú Mỹ 3 Đà Nẵng IP), có quy mô 400,02ha, thuộc xã Bà Nà, thành phố Đà Nẵng; nằm cách sân bay quốc tế Đà Nẵng 10km, cảng biển Tiên Sa 20km, cảng Sông Hàn 13km, cảng biển Liên Chiểu 5km.'}</p>
                </section>
                <div className="my-6 rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="/media/Functionalmap/ban-do-khu-cong-nghiep-hoa-khanh.jpg"
                    alt={isEn ? 'Hoa Ninh IP planning map (representative)' : 'Bản đồ quy hoạch KCN Hòa Ninh (đại diện)'}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <section>
                  <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '1. Location' : '1. Vị trí địa lý'}</h2>
                  <p>{isEn ? 'Ba Na Commune, Da Nang City.' : 'xã Bà Nà, thành phố Đà Nẵng.'}</p>
                  <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li>{isEn ? 'Distance to Tien Sa Seaport: 31 km' : 'Cách cảng biển Tiên Sa: 31 km'}</li>
                    <li>{isEn ? 'Distance to Da Nang International Airport: 23 km' : 'Cách Sân bay Quốc tế Đà Nẵng: 23 km'}</li>
                    <li>{isEn ? 'Distance to City Center: 20 km' : 'Cách Trung tâm thành phố Đà Nẵng: 20 km'}</li>
                    <li>{isEn ? 'Distance to Railway Station: 22 km' : 'Cách ga đường sắt:  22 km'}</li>
                  </ul>
                </section>
                <section>
                  <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '2. Total area' : '2. Tổng diện tích'}</h2>
                  <p>{isEn ? '400.02 ha. Of which 221.22 ha of industrial land is leasable (per Decision No. 5383/QD-UBND dated 25/11/2019 approving the 1/2000 zoning plan for Hoa Ninh IP).' : '400,02 ha. Trong đó có 221,22 ha đất công nghiệp có thể cho thuê (theo Quyết định số 5383/QĐ-UBND ngày 25/11/2019 về phê duyệt Quy hoạch phân khu tỷ lệ 1/2000 KCN Hòa Ninh).'}</p>
                </section>
                <section>
                  <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '3. Land sublease price and infrastructure fee (until 2075)' : '3. Giá cho thuê lại đất và tiền sử dụng hạ tầng: (Đến năm 2075)'}</h2>
                  <p className="text-sm italic">{isEn ? 'The infrastructure developer, Thanh Binh Phu My JSC, is carrying out procedures to implement technical infrastructure construction for Hoa Ninh IP. Pricing has not yet been established and will be reported to the Da Nang HTP and IPs Authority when available.' : 'Chủ đầu tư kinh doanh hạ tầng là Công ty Cổ phần Thanh Bình Phú Mỹ đang triển khai các thủ tục theo quy định để triển khai xây dựng hạ tầng kỹ thuật của Khu công nghiệp Hòa Ninh. Hiện đơn vị chưa xây dựng đơn giá, sẽ báo cáo Ban Quản lý Khu công nghệ cao và các Khu công nghiệp Đà Nẵng khi có.'}</p>
                </section>
                <section>
                  <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '4. Infrastructure developer' : '4. Chủ đầu tư kinh doanh hạ tầng'}</h2>
                  <p className="font-semibold">{isEn ? 'Thanh Binh Phu My JSC' : 'Công ty Cổ phần Thanh Bình Phú Mỹ'}</p>
                  <ul className="list-none pl-0 mt-2 space-y-2">
                    <li><strong>{isEn ? 'Head office address' : 'Địa chỉ trụ sở'}:</strong> {isEn ? 'Phu My 3 Specialized Industrial Park, Ba Ria – Vung Tau Province (now Ho Chi Minh City)' : 'Khu công nghiệp chuyên sâu Phú Mỹ 3, tỉnh Bà Rịa – Vũng Tàu (nay là thành phố Hồ Chí Minh)'}</li>
                    <li><strong>{isEn ? 'Phone' : 'Điện thoại'}:</strong> 0254. 3936838</li>
                    <li><strong>Fax:</strong> 0254. 3936833</li>
                    <li><strong>Web:</strong> phumy3sip.com</li>
                    <li><strong>Email:</strong> info@ phumy3sip.com</li>
                  </ul>
                </section>
                <section>
                  <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '5. Land-use planning status' : '5. Hiện trạng quy hoạch sử dụng đất'}</h2>
                  <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li>{isEn ? 'Total planned land area: 400.02 ha' : 'Tổng diện tích đất theo quy hoạch : 400,02 ha'}</li>
                    <li>{isEn ? 'Industrial land leasable per plan: 221.22 ha' : 'Diện tích đất công nghiệp có thể cho thuê theo quy hoạch: 221,22 ha'}</li>
                    <li>{isEn ? 'Industrial land leased: 0 ha' : 'Diện tích đất công nghiệp đã cho thuê: 0 ha'}</li>
                    <li>{isEn ? 'Remaining industrial land: 221.22 ha' : 'Diện tích đất công nghiệp còn lại: 221,22 ha'}</li>
                  </ul>
                </section>
                <section>
                  <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '6. Master plan map of Hoa Ninh IP' : '6. Bản đồ quy hoạch KCN Hòa Ninh'}</h2>
                  <Dialog onOpenChange={() => setMapZoom(1)}>
                    <DialogTrigger asChild>
                      <button type="button" className={`${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary-hover' : 'text-dseza-light-primary hover:text-dseza-light-primary-hover'} font-semibold underline`}>
                        {isEn ? '(View here)' : '(Xem tại đây)'}
                      </button>
                    </DialogTrigger>
                    <DialogContent className="p-0 bg-transparent border-0 shadow-none max-w-6xl">
                      <DialogTitle className="sr-only">{isEn ? 'Hoa Ninh IP Master Plan' : 'Bản đồ quy hoạch KCN Hòa Ninh'}</DialogTitle>
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
              <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                <Share2 className="h-5 w-5" />
                {isEn ? 'Share this page:' : 'Chia sẻ trang:'}
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  {isEn ? 'Download' : 'Tải xuống'}
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  {isEn ? 'Share' : 'Chia sẻ'}
                </Button>
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  <Printer className="w-4 h-4 mr-2" />
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

export default KhuCongNghiepHoaNinh; 