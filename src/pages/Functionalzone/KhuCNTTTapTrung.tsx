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
import { useLanguageRoutes } from "@/utils/routes";

const KhuCNTTTapTrung = () => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const { language } = useLanguage();
  const isEn = language === 'en';
  const { createUrl } = useLanguageRoutes();
  const [mapZoom, setMapZoom] = React.useState(1);

  const handleDownload = () => {
    console.log('Downloading document...');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: isEn ? 'Da Nang IT Park (Phase 1) - DSEZA' : 'Khu công nghệ thông tin tập trung - DSEZA',
        text: isEn ? 'Information about Da Nang IT Park (Phase 1)' : 'Thông tin về Khu công nghệ thông tin tập trung',
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
                to={createUrl(isEn ? '/home' : '/trang-chu')}
                className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {isEn ? 'Home' : 'Trang chủ'}
              </Link>
              <ChevronRight className="h-2.5 w-2.5" />
              <Link
                to={createUrl(isEn ? '/introduction/functional-zones' : '/gioi-thieu/cac-khu-chuc-nang')}
                className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {isEn ? 'Functional zones' : 'Các khu chức năng'}
              </Link>
              <ChevronRight className="h-2.5 w-2.5" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {isEn ? 'Da Nang IT Park' : 'Khu công nghệ thông tin tập trung'}
              </span>
            </nav>

            {/* Article Header - Mobile */}
            <header className="mb-4">
              <h1 className={`text-lg font-bold mb-2 leading-tight ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {isEn ? 'Da Nang IT Park' : 'Khu công nghệ thông tin tập trung'}
              </h1>
            </header>

            {/* Article Content - Mobile */}
            <div className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              <div className="space-y-4 text-justify">
                <section className="space-y-2">
                  <p>
                    {isEn ? 'The Da Nang IT Park (Phase 1) has completed its technical infrastructure and was recognized as an Information Technology Park under Decision No. 27/QD-TTg dated 06/01/2020 by the Prime Minister.' : 'Khu công nghệ thông tin tập trung (Giai đoạn 1) đã hoàn thành đồng bộ hạ tầng kỹ thuật, được công nhận là Khu CNTT theo Quyết định số 27/QĐ-TTg ngày 06/01/2020 của Thủ tướng Chính phủ.'}
                  </p>
                  <div className="rounded-lg overflow-hidden border shadow-sm">
                    <img src="/media/Functionalmap/ban-do-khu-cntt-tap-trung.jpg" alt={isEn ? 'Da Nang IT Park master plan' : 'Bản đồ Khu CNTT tập trung'} className="w-full h-auto object-cover" />
                  </div>
                </section>

                <section>
                  <h2 className={`font-montserrat text-lg font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '1. Location' : '1. Vị trí địa lí'}</h2>
                  <p>{isEn ? 'Lien Chieu Ward, Da Nang City.' : 'Phường Liên Chiểu, thành phố Đà Nẵng.'} <a href="https://maps.app.goo.gl/DRhNYhnwCMoV9Aho8" target="_blank" rel="noopener noreferrer" className={`${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'} underline`}>{isEn ? '(View on map)' : '(Xem trên bản đồ)'}</a></p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>{isEn ? 'Tien Sa Port: 25 km' : 'Cách cảng biển Tiên Sa: 25 km'}</li>
                    <li>{isEn ? 'Lien Chieu Port: 11 km' : 'Cách cảng Liên Chiểu: 11km'}</li>
                    <li>{isEn ? 'Da Nang International Airport: 18 km' : 'Cách Sân bay Quốc tế Đà Nẵng: 18 km'}</li>
                    <li>{isEn ? 'Da Nang City Center: 17 km' : 'Cách Trung tâm thành phố Đà Nẵng: 17 km'}</li>
                    <li>{isEn ? 'Railway Station: 17 km' : 'Cách ga đường sắt: 17 km'}</li>
                  </ul>
                </section>

                <section className="grid grid-cols-1 gap-2">
                  <div className={`rounded-lg p-3 ${theme === 'dark' ? 'bg-dseza-dark-secondary/60 text-dseza-dark-main-text' : 'bg-dseza-light-secondary/60 text-dseza-light-main-text'}`}>
                    <div className="text-xs opacity-80">{isEn ? 'Total area' : 'Tổng diện tích'}</div>
                    <div className="text-lg font-bold">131 ha</div>
                  </div>
                </section>

                <section className={`rounded-lg p-3 ${theme === 'dark' ? 'bg-dseza-dark-secondary/60 text-dseza-dark-main-text' : 'bg-dseza-light-secondary/60 text-dseza-light-main-text'}`}>
                  <h3 className={`text-base font-semibold mb-1 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? 'Land sublease prices and infrastructure fees' : 'Giá cho thuê lại đất và tiền sử dụng hạ tầng'}</h3>
                  <p>{isEn ? 'For details, please contact the infrastructure investor: Da Nang IT Park Development JSC.' : 'Mọi chi tiết xin liên hệ Chủ đầu tư hạ tầng là Công ty Cổ phần phát triển Khu CNTT Đà Nẵng.'}</p>
                </section>

                <section className="space-y-1">
                  <h3 className={`text-base font-semibold ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? 'Infrastructure investor' : 'Chủ đầu tư kinh doanh hạ tầng'}</h3>
                  <p>{isEn ? 'Da Nang IT Park Development Joint Stock Company.' : 'Công ty Cổ phần phát triển Khu CNTT Đà Nẵng.'}</p>
                </section>

                <section className="space-y-1">
                  <h3 className={`text-base font-semibold ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? 'Land-use planning status' : 'Hiện trạng quy hoạch sử dụng đất'}</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>{isEn ? 'Total planned land area: 131 ha' : 'Tổng diện tích đất theo quy hoạch : 131 ha'}</li>
                    <li>{isEn ? 'Leasable industrial land: 84 ha' : 'Diện tích đất công nghiệp có thể cho thuê : 84 ha'}</li>
                    <li>{isEn ? 'Leased industrial land: 26.73 ha' : 'Diện tích đất công nghiệp đã cho thuê: 26,73 ha'}</li>
                    <li>{isEn ? 'Remaining industrial land: 57.27 ha' : 'Diện tích đất công nghiệp còn lại : 57,27 ha'}</li>
                    <li>{isEn ? 'Industrial land without infrastructure: 0.00 ha' : 'Diện tích đất công nghiệp chưa có hạ tầng 0,00 ha'}</li>
                    <li>{isEn ? 'Occupancy rate: 31.82%' : 'Tỷ lệ lắp đầy : 31,82%'}</li>
                  </ul>
                </section>

                <section>
                  <h3 className={`text-base font-semibold mb-1 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '7. Master plan map of the IT Park' : '7. Bản đồ quy hoạch Khu CNTTTT'}</h3>
                  <Dialog onOpenChange={() => setMapZoom(1)}>
                    <DialogTrigger asChild>
                      <button type="button" className={`${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary-hover' : 'text-dseza-light-primary hover:text-dseza-light-primary-hover'} font-semibold underline`}>
                        {isEn ? '(View here)' : '(Xem tại đây)'}
                      </button>
                    </DialogTrigger>
                    <DialogContent className="p-0 bg-transparent border-0 shadow-none max-w-5xl">
                      <DialogTitle className="sr-only">{isEn ? 'Da Nang IT Park master plan' : 'Bản đồ quy hoạch Khu CNTT tập trung'}</DialogTitle>
                      <div className="relative max-h-[85vh] overflow-auto rounded-md">
                        <img src="/media/Functionalmap/ban-do-khu-cntt-tap-trung.jpg" alt={isEn ? 'Da Nang IT Park master plan' : 'Bản đồ Khu CNTT tập trung'} className="w-full h-auto" style={{ transform: `scale(${mapZoom})`, transformOrigin: 'center center' }} />
                        <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-black/60 rounded-md p-1">
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
              <h3 className={`text-sm font-semibold mb-3 flex items-center gap-1 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                <Share2 className="h-3 w-3" />
                Chia sẻ trang:
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={handleDownload} className="text-xs h-7">
                  <Download className="w-3 h-3 mr-1" />
                  Tải xuống
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare} className="text-xs h-7">
                  <Share2 className="w-3 h-3 mr-1" />
                  Chia sẻ
                </Button>
                <Button variant="outline" size="sm" onClick={handlePrint} className="text-xs h-7">
                  <Printer className="w-3 h-3 mr-1" />
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
                to={createUrl(isEn ? '/home' : '/trang-chu')} 
                className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {isEn ? 'Home' : 'Trang chủ'}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link 
                to={createUrl(isEn ? '/introduction/functional-zones' : '/gioi-thieu/cac-khu-chuc-nang')} 
                className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {isEn ? 'Functional zones' : 'Các khu chức năng'}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {isEn ? 'Da Nang IT Park' : 'Khu công nghệ thông tin tập trung'}
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
                {isEn ? 'Da Nang IT Park' : 'Khu công nghệ thông tin tập trung'}
              </h1>
            </header>

            {/* Article Content */}
            <div className={`prose-lg max-w-none ${theme === 'dark' ? 'prose-invert text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              <div className="space-y-10 text-justify">
                <section className="space-y-4">
                  <p>
                    {isEn ? 'The Da Nang IT Park (Phase 1) has completed its technical infrastructure and was recognized as an Information Technology Park under Decision No. 27/QD-TTg dated 06/01/2020 by the Prime Minister.' : 'Khu công nghệ thông tin tập trung (Giai đoạn 1) đã hoàn thành đồng bộ hạ tầng kỹ thuật, được công nhận là Khu CNTT theo Quyết định số 27/QĐ-TTg ngày 06/01/2020 của Thủ tướng Chính phủ.'}
                  </p>
                  <div className="my-4 rounded-lg overflow-hidden shadow-lg">
                    <img src="/media/Functionalmap/ban-do-khu-cntt-tap-trung.jpg" alt={isEn ? 'Da Nang IT Park master plan' : 'Bản đồ Khu CNTT tập trung'} className="w-full h-auto object-cover" />
                  </div>
                </section>

                <section>
                  <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '1. Location' : '1. Vị trí địa lí'}</h2>
                  <p>{isEn ? 'Lien Chieu Ward, Da Nang City.' : 'Phường Liên Chiểu, thành phố Đà Nẵng.'} <a href="https://maps.app.goo.gl/DRhNYhnwCMoV9Aho8" target="_blank" rel="noopener noreferrer" className={`${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'} underline`}>{isEn ? '(View on map)' : '(Xem trên bản đồ)'}</a></p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>{isEn ? 'Tien Sa Port: 25 km' : 'Cách cảng biển Tiên Sa: 25 km'}</li>
                    <li>{isEn ? 'Lien Chieu Port: 11 km' : 'Cách cảng Liên Chiểu: 11km'}</li>
                    <li>{isEn ? 'Da Nang International Airport: 18 km' : 'Cách Sân bay Quốc tế Đà Nẵng: 18 km'}</li>
                    <li>{isEn ? 'Da Nang City Center: 17 km' : 'Cách Trung tâm thành phố Đà Nẵng: 17 km'}</li>
                    <li>{isEn ? 'Railway Station: 17 km' : 'Cách ga đường sắt: 17 km'}</li>
                  </ul>
                </section>

                <section className="grid md:grid-cols-2 gap-6">
                  <div className={`rounded-lg p-6 ${theme === 'dark' ? 'bg-dseza-dark-secondary/60' : 'bg-dseza-light-secondary/60'}`}>
                    <div className={`text-sm opacity-80 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>{isEn ? 'Total area' : 'Tổng diện tích'}</div>
                    <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>131 ha</div>
                  </div>
                  <div className={`rounded-lg p-6 ${theme === 'dark' ? 'bg-dseza-dark-secondary/60' : 'bg-dseza-light-secondary/60'}`}>
                    <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? 'Land sublease prices and infrastructure fees' : 'Giá cho thuê lại đất và tiền sử dụng hạ tầng'}</h3>
                    <p>{isEn ? 'For details, please contact the infrastructure investor: Da Nang IT Park Development JSC.' : 'Mọi chi tiết xin liên hệ Chủ đầu tư hạ tầng là Công ty Cổ phần phát triển Khu CNTT Đà Nẵng.'}</p>
                  </div>
                </section>

                <section className={`rounded-lg p-6 ${theme === 'dark' ? 'bg-dseza-dark-secondary/60' : 'bg-dseza-light-secondary/60'}`}>
                  <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? 'Infrastructure investor' : 'Chủ đầu tư kinh doanh hạ tầng'}</h3>
                  <p>{isEn ? 'Da Nang IT Park Development Joint Stock Company.' : 'Công ty Cổ phần phát triển Khu CNTT Đà Nẵng.'}</p>
                </section>

                <section className={`rounded-lg p-6 ${theme === 'dark' ? 'bg-dseza-dark-secondary/60' : 'bg-dseza-light-secondary/60'}`}>
                  <h3 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? 'Land-use planning status' : 'Hiện trạng quy hoạch sử dụng đất'}</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>{isEn ? 'Total planned land area: 131 ha' : 'Tổng diện tích đất theo quy hoạch : 131 ha'}</li>
                    <li>{isEn ? 'Leasable industrial land: 84 ha' : 'Diện tích đất công nghiệp có thể cho thuê : 84 ha'}</li>
                    <li>{isEn ? 'Leased industrial land: 26.73 ha' : 'Diện tích đất công nghiệp đã cho thuê: 26,73 ha'}</li>
                    <li>{isEn ? 'Remaining industrial land: 57.27 ha' : 'Diện tích đất công nghiệp còn lại : 57,27 ha'}</li>
                    <li>{isEn ? 'Industrial land without infrastructure: 0.00 ha' : 'Diện tích đất công nghiệp chưa có hạ tầng 0,00 ha'}</li>
                    <li>{isEn ? 'Occupancy rate: 31.82%' : 'Tỷ lệ lắp đầy : 31,82%'}</li>
                  </ul>
                </section>

                <section>
                  <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '7. Master plan map of the IT Park' : '7. Bản đồ quy hoạch Khu CNTTTT'}</h3>
                  <Dialog onOpenChange={() => setMapZoom(1)}>
                    <DialogTrigger asChild>
                      <button type="button" className={`${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary-hover' : 'text-dseza-light-primary hover:text-dseza-light-primary-hover'} font-semibold underline`}>
                        {isEn ? '(View here)' : '(Xem tại đây)'}
                      </button>
                    </DialogTrigger>
                    <DialogContent className="p-0 bg-transparent border-0 shadow-none max-w-6xl">
                      <DialogTitle className="sr-only">{isEn ? 'Da Nang IT Park master plan' : 'Bản đồ quy hoạch Khu CNTT tập trung'}</DialogTitle>
                      <div className="relative max-h-[85vh] overflow-auto rounded-md">
                        <img src="/media/Functionalmap/ban-do-khu-cntt-tap-trung.jpg" alt={isEn ? 'Da Nang IT Park master plan' : 'Bản đồ Khu CNTT tập trung'} className="w-full h-auto" style={{ transform: `scale(${mapZoom})`, transformOrigin: 'center center' }} />
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
                Chia sẻ trang:
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Tải xuống
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Chia sẻ
                </Button>
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  <Printer className="w-4 h-4 mr-2" />
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

export default KhuCNTTTapTrung; 