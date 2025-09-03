import React, { useMemo } from 'react';
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
import { useLanguage } from "@/context/LanguageContext";
import { useLanguageRoutes } from "@/utils/routes";

type Position = { id: number; left: string; top: string; url: string };

const MapWithMarkers: React.FC<{
  theme: 'dark' | 'light';
  positions: Position[];
  className?: string;
  isEn?: boolean;
}> = ({ theme, positions, className, isEn }) => {
  return (
    <div className={className}>
      <div className={`relative w-full overflow-hidden rounded-lg border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
        <img
          src="/media/Functionalmap/ban-do-khu-thuong-mai-tu-do.jpg"
          alt={isEn ? 'Map of Da Nang Free Trade Zone locations' : 'Bản đồ các vị trí Khu thương mại tự do Đà Nẵng'}
          className="w-full h-auto object-cover select-none"
          draggable={false}
        />
        {positions.map((p) => (
          <button
            key={p.id}
            onClick={() => window.open(p.url, '_blank', 'noopener,noreferrer')}
            className={`absolute -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full text-[10px] font-semibold flex items-center justify-center shadow-md transition-transform hover:scale-110 ${theme === 'dark' ? 'bg-dseza-dark-primary text-black ring-1 ring-dseza-dark-border' : 'bg-dseza-light-primary text-white ring-1 ring-white'}`}
            style={{ left: p.left as any, top: p.top as any }}
            aria-label={`Vị trí ${p.id}`}
            title={isEn ? `Open location ${p.id}` : `Mở vị trí ${p.id}`}
          >
            {p.id}
          </button>
        ))}
      </div>
    </div>
  );
};

const KhuThuongMaiTuDoDaNang = () => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const { language } = useLanguage();
  const isEn = language === 'en';
  const { createUrl } = useLanguageRoutes();

  const initialPositions: Position[] = useMemo(() => ([
    { id: 1, left: '61.36%', top: '27.26%', url: 'https://maps.app.goo.gl/GndDiz3KNsUm85tNA' },
    { id: 2, left: '59.51%', top: '24.50%', url: 'https://maps.app.goo.gl/iTxxanH48Dgtysg69' },
    { id: 3, left: '53.49%', top: '34.29%', url: 'https://maps.app.goo.gl/tMfQv62KQ6CkoLdb9' },
    { id: 4, left: '50.14%', top: '52.52%', url: 'https://maps.app.goo.gl/t63DvgUsQEXz7v6u7' },
    { id: 5, left: '46.62%', top: '64.11%', url: 'https://maps.app.goo.gl/ZDbpkJFQyrfW5RUA7' },
    { id: 6, left: '55.05%', top: '66.39%', url: 'https://maps.app.goo.gl/n4CosWT5d7R4JmY46' },
    { id: 7, left: '49.36%', top: '72.18%', url: 'https://maps.app.goo.gl/py647CPSJZ1EaDKf7' },
  ]), []);

  const positions = initialPositions;

  const handleDownload = () => {
    console.log('Downloading document...');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: isEn ? 'Da Nang Free Trade Zone - DSEZA' : 'Khu thương mại tự do Đà Nẵng - DSEZA',
        text: isEn ? 'Information about Da Nang Free Trade Zone' : 'Thông tin về Khu thương mại tự do Đà Nẵng',
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
                {isEn ? 'Da Nang Free Trade Zone' : 'Khu thương mại tự do Đà Nẵng'}
              </span>
            </nav>

            {/* Article Header - Mobile */}
            <header className="mb-4">
              <h1 className={`text-lg font-bold mb-2 leading-tight ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {isEn ? 'Da Nang Free Trade Zone' : 'Khu thương mại tự do Đà Nẵng'}
              </h1>
            </header>

            {/* Article Content - Mobile */}
            <div className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              <div className="space-y-4 text-justify">
                <section className="space-y-2">
                  <p>
                    {isEn ? 'Da Nang Free Trade Zone was established under Decision No. 1142/QD-TTg dated 13/6/2025 by the Prime Minister.' : 'Khu Thương mại tự do thành phố Đà Nẵng được thành lập theo Quyết định số 1142/QĐ-TTg ngày 13/6/2025 của Thủ tướng Chính phủ.'}
                  </p>
                  <p>
                    {isEn ? 'The Zone consists of 07 non-contiguous locations situated in Hoa Vang commune, Ba Na commune and Hai Van ward, Da Nang City, with a total area of 1,881 ha.' : 'Khu Thương mại tự do bao gồm 07 vị trí không liền kề, thuộc các xã Hoà Vang, xã Bà Nà và phường Hải Vân, thành phố Đà Nẵng. Tổng quy mô 1.881 ha.'}
                  </p>
                </section>

                {/* Interactive Map - Mobile */}
                <section>
                  <h3 className={`text-base font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                    {isEn ? '7 locations of the Free Trade Zone' : '7 địa điểm thuộc Khu thương mại tự do'}
                  </h3>
                  <MapWithMarkers theme={theme as any} positions={positions} isEn={isEn} />
                </section>

                <section>
                  <h3 className={`text-base font-semibold ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? 'Location' : 'Vị trí địa lí'}</h3>
                  <p>{isEn ? 'Located in Hoa Vang commune, Ba Na commune and Hai Van ward, Da Nang City.' : 'Thuộc xã Hoà Vang, xã Bà Nà và phường Hải Vân, thành phố Đà Nẵng.'}</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>{isEn ? 'Tien Sa Port: approx. 20–25 km' : 'Cách cảng biển Tiên Sa: khoảng 20-25 km'}</li>
                    <li>{isEn ? 'Lien Chieu Port: approx. 25 km (location No. 1 adjacent)' : 'Cách cảng biển Liên Chiểu: khoảng 25 km (vị trí số 1 liền kề)'}</li>
                    <li>{isEn ? 'Da Nang International Airport: approx. 15–25 km' : 'Cách Sân bay Quốc tế Đà Nẵng: khoảng 15-25 km'}</li>
                    <li>{isEn ? 'Da Nang City Center: approx. 15–25 km' : 'Cách Trung tâm thành phố Đà Nẵng: khoảng 15-25 km'}</li>
                    <li>{isEn ? 'Railway Station: approx. 20–30 km' : 'Cách ga đường sắt: khoảng 20-30 km'}</li>
                  </ul>
                </section>

                <section className="grid grid-cols-1 gap-2">
                  <div className={`rounded-lg p-3 ${theme === 'dark' ? 'bg-dseza-dark-secondary/60 text-dseza-dark-main-text' : 'bg-dseza-light-secondary/60 text-dseza-light-main-text'}`}>
                    <div className="text-xs opacity-80">Tổng diện tích</div>
                    <div className="text-lg font-bold">1.881 ha</div>
                  </div>
                </section>

                {/* Pricing & infrastructure usage - Mobile */}
                <section className={`rounded-lg p-3 ${theme === 'dark' ? 'bg-dseza-dark-secondary/60 text-dseza-dark-main-text' : 'bg-dseza-light-secondary/60 text-dseza-light-main-text'}`}>
                  <h3 className={`text-base font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? 'Land sublease prices and infrastructure fees' : 'Giá cho thuê lại đất và tiền sử dụng hạ tầng'}</h3>
                  <p className="mb-2">
                    {isEn ? 'The Management Board of Da Nang Hi-Tech Park and Industrial Zones is calling for investors for functional zones of the Free Trade Zone (except functional zone No. 5, 90 ha, already invested by Ba Na Cable Car Service Joint Stock Company under Decision No. 1175/QD-UBND dated 26/8/2025 of the Da Nang City People’s Committee).'
                    : 'Ban Quản lý Khu công nghệ cao và các khu công nghiệp Đà Nẵng đang xúc tiến kêu gọi đầu tư các Nhà đầu tư các khu chức năng thuộc Khu thương mại tự do thành phố Đà Nẵng (Riêng Khu chức năng số 5, quy mô 90ha đã có Nhà đầu tư là Công ty Cổ phần dịch vụ cáp treo Bà Nà, thành lập theo Quyết định số 1175/QĐ-UBND ngày 26/8/2025 của Chủ tịch UBND thành phố Đà Nẵng).'}
                  </p>
                  <p>
                    {isEn ? 'Currently, land sublease prices and infrastructure usage fees have not been announced for the functional zones of the Free Trade Zone.' : 'Hiện tại chưa có giá cho thuê lại đất và tiền sử dụng hạ tầng các khu chức năng thuộc Khu thương mại tự do thành phố Đà Nẵng.'}
                  </p>
                </section>

                <section className="space-y-1">
                  <h3 className={`text-base font-semibold ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? 'Infrastructure investors' : 'Chủ đầu tư kinh doanh hạ tầng'}</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>{isEn ? 'Functional zone No. 5: Ba Na Cable Car Service Joint Stock Company (head office: An Son Hamlet, Ba Na commune, Da Nang City).' : 'Khu chức năng vị trí số 5: Công ty Cổ phần dịch vụ cáp treo Bà Nà (trụ sở: Thôn An Sơn, xã Bà Nà, TP. Đà Nẵng).'}</li>
                    <li>{isEn ? 'Other functional zones: in progress to seek investors.' : 'Các khu chức năng còn lại: đang xúc tiến đầu tư.'}</li>
                  </ul>
                </section>

                <section className="space-y-1">
                  <h3 className={`text-base font-semibold ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? 'Land-use planning status' : 'Hiện trạng quy hoạch sử dụng đất'}</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>{isEn ? 'Location No. 5: Investor is preparing procedures to develop infrastructure as prescribed.' : 'Vị trí số 5: Nhà đầu tư chuẩn bị triển khai thủ tục xây dựng hạ tầng theo quy định.'}</li>
                    <li>{isEn ? 'Other locations: investor attraction in progress.' : 'Các vị trí còn lại: đang xúc tiến đầu tư.'}</li>
                  </ul>
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
                to="/" 
                className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Trang chủ
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
                Khu thương mại tự do Đà Nẵng
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
                {isEn ? 'Da Nang Free Trade Zone' : 'Khu thương mại tự do Đà Nẵng'}
              </h1>
            </header>

            {/* Article Content */}
            <div className={`max-w-none ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              <div className="space-y-10 text-justify">
                <section className="space-y-4">
                  <p>
                    {isEn ? 'Da Nang Free Trade Zone was established under Decision No. 1142/QD-TTg dated 13/6/2025 by the Prime Minister.' : 'Khu Thương mại tự do thành phố Đà Nẵng được thành lập theo Quyết định số 1142/QĐ-TTg ngày 13/6/2025 của Thủ tướng Chính phủ.'}
                  </p>
                  <p>
                    {isEn ? 'The Zone consists of 07 non-contiguous locations situated in Hoa Vang commune, Ba Na commune and Hai Van ward, Da Nang City, with a total area of 1,881 ha.' : 'Khu Thương mại tự do thành phố Đà Nẵng bao gồm 07 vị trí không liền kề, thuộc các xã Hoà Vang, xã Bà Nà và phường Hải Vân, thành phố Đà Nẵng. Tổng quy mô 1.881 ha.'}
                  </p>
                </section>

                {/* Interactive Map */}
                <section>
                  <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '7 locations of Da Nang Free Trade Zone' : '7 địa điểm thuộc Khu thương mại tự do thành phố Đà Nẵng'}</h2>
                  <MapWithMarkers theme={theme as any} positions={positions} className="rounded-xl" isEn={isEn} />
                </section>

                <section className="grid md:grid-cols-2 gap-6">
                  <div className={`rounded-lg p-6 ${theme === 'dark' ? 'bg-dseza-dark-secondary/60' : 'bg-dseza-light-secondary/60'}`}>
                    <h3 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? 'Location' : 'Vị trí địa lí'}</h3>
                    <p>{isEn ? 'Located in Hoa Vang commune, Ba Na commune and Hai Van ward, Da Nang City.' : 'Thuộc xã Hoà Vang, xã Bà Nà và phường Hải Vân, thành phố Đà Nẵng.'}</p>
                    <ul className="list-disc pl-5 mt-3 space-y-1">
                      <li>{isEn ? 'Tien Sa Port: approx. 20–25 km' : 'Cách cảng biển Tiên Sa: khoảng 20-25 km'}</li>
                      <li>{isEn ? 'Lien Chieu Port: approx. 25 km (location No. 1 adjacent)' : 'Cách cảng biển Liên Chiểu: khoảng 25 km (vị trí số 1 liền kề)'}</li>
                      <li>{isEn ? 'Da Nang International Airport: approx. 15–25 km' : 'Cách Sân bay Quốc tế Đà Nẵng: khoảng 15-25 km'}</li>
                      <li>{isEn ? 'Da Nang City Center: approx. 15–25 km' : 'Cách Trung tâm thành phố Đà Nẵng: khoảng 15-25 km'}</li>
                      <li>{isEn ? 'Railway Station: approx. 20–30 km' : 'Cách ga đường sắt: khoảng 20-30 km'}</li>
                    </ul>
                  </div>
                  <div className={`rounded-lg p-6 ${theme === 'dark' ? 'bg-dseza-dark-secondary/60' : 'bg-dseza-light-secondary/60'}`}>
                    <div>
                      <div className={`text-sm opacity-80 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>Tổng diện tích</div>
                      <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>1.881 ha</div>
                    </div>
                  </div>
                </section>

                {/* Pricing & infrastructure usage - Desktop */}
                <section className={`rounded-lg p-6 ${theme === 'dark' ? 'bg-dseza-dark-secondary/60' : 'bg-dseza-light-secondary/60'}`}>
                  <h3 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? 'Land sublease prices and infrastructure fees' : 'Giá cho thuê lại đất và tiền sử dụng hạ tầng'}</h3>
                  <p className="mb-2">
                    {isEn ? 'The Management Board of Da Nang Hi-Tech Park and Industrial Zones is calling for investors for functional zones of the Free Trade Zone (except functional zone No. 5, 90 ha, already invested by Ba Na Cable Car Service Joint Stock Company under Decision No. 1175/QD-UBND dated 26/8/2025 of the Da Nang City People’s Committee).'
                    : 'Ban Quản lý Khu công nghệ cao và các khu công nghiệp Đà Nẵng đang xúc tiến kêu gọi đầu tư các Nhà đầu tư các khu chức năng thuộc Khu thương mại tự do thành phố Đà Nẵng (Riêng Khu chức năng số 5, quy mô 90ha đã có Nhà đầu tư là Công ty Cổ phần dịch vụ cáp treo Bà Nà, thành lập theo Quyết định số 1175/QĐ-UBND ngày 26/8/2025 của Chủ tịch UBND thành phố Đà Nẵng).'}
                  </p>
                  <p>
                    {isEn ? 'Currently, land sublease prices and infrastructure usage fees have not been announced for the functional zones of the Free Trade Zone.' : 'Hiện tại chưa có giá cho thuê lại đất và tiền sử dụng hạ tầng các khu chức năng thuộc Khu thương mại tự do thành phố Đà Nẵng.'}
                  </p>
                </section>

                <section className={`rounded-lg p-6 ${theme === 'dark' ? 'bg-dseza-dark-secondary/60' : 'bg-dseza-light-secondary/60'}`}>
                  <h3 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? 'Infrastructure investors' : 'Chủ đầu tư kinh doanh hạ tầng'}</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>{isEn ? 'Functional zone No. 5: Ba Na Cable Car Service Joint Stock Company. Address: An Son Hamlet, Ba Na commune, Da Nang City.' : 'Khu chức năng tại vị trí số 5: Công ty Cổ phần dịch vụ cáp treo Bà Nà. Địa chỉ: Thôn An Sơn, xã Bà Nà, thành phố Đà Nẵng.'}</li>
                    <li>{isEn ? 'Other functional zones: investment promotion in progress.' : 'Các khu chức năng còn lại: đang xúc tiến đầu tư.'}</li>
                  </ul>
                </section>

                <section className={`rounded-lg p-6 ${theme === 'dark' ? 'bg-dseza-dark-secondary/60' : 'bg-dseza-light-secondary/60'}`}>
                  <h3 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? 'Land-use planning status' : 'Hiện trạng quy hoạch sử dụng đất'}</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>{isEn ? 'Functional zone No. 5: The investor is preparing procedures to implement infrastructure construction as prescribed.' : 'Khu chức năng tại vị trí số 5: Nhà đầu tư chuẩn bị triển khai các thủ tục xây dựng hạ tầng theo quy định.'}</li>
                    <li>{isEn ? 'Other functional zones: investment promotion in progress.' : 'Các khu chức năng còn lại: đang xúc tiến đầu tư.'}</li>
                  </ul>
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

export default KhuThuongMaiTuDoDaNang; 