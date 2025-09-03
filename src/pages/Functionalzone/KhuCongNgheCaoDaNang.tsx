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
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/context/LanguageContext";
import { useLanguageRoutes } from "@/utils/routes";

const KhuCongNgheCaoDaNang = () => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const [mapZoom, setMapZoom] = React.useState(1);
  const { language } = useLanguage();
  const isEn = language === 'en';
  const { createUrl } = useLanguageRoutes();

  const handleDownload = () => {
    console.log('Downloading document...');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: isEn ? 'Da Nang Hi-Tech Park - DSEZA' : 'Khu công nghệ cao Đà Nẵng - DSEZA',
        text: isEn ? 'Information about Da Nang Hi-Tech Park' : 'Thông tin về Khu công nghệ cao Đà Nẵng',
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
  
  const dataGiaDat = [
    {
      stt: 'I',
      viTri: 'Đường MC (7,5 - 15 - 6 - 15-7,5)',
      viTriEn: 'MC Road (7.5 - 15 - 6 - 15 - 7.5)',
      loaiDat: [
        { id: '1', nameVi: 'Giá đất thương mại dịch vụ (Thời hạn 50 năm)', nameEn: 'Commercial land price (50-year term)', giaDat: '3.688.000', tyLe: '0,70', tra1Lan: '2,634,286', traHangNam: '2,581,600' },
        { id: '2', nameVi: 'Giá đất sản xuất kinh doanh phi nông nghiệp (Thời hạn 50 năm)', nameEn: 'Non-agricultural business land price (50-year term)', giaDat: '2.943.000', tyLe: '0,70', tra1Lan: '2,102,143', traHangNam: '2,060,100' }
      ]
    },
    {
      stt: 'II',
      viTri: 'Đường 10,5m MC (6,0 - 10,5 - 6,0)',
      viTriEn: '10.5m MC Road (6.0 - 10.5 - 6.0)',
      loaiDat: [
        { id: '1', nameVi: 'Giá đất thương mại dịch vụ (Thời hạn 50 năm)', nameEn: 'Commercial land price (50-year term)', giaDat: '2.485.000', tyLe: '0,70', tra1Lan: '1,775,000', traHangNam: '1,739,500' },
        { id: '2', nameVi: 'Giá đất sản xuất kinh doanh phi nông nghiệp (Thời hạn 50 năm)', nameEn: 'Non-agricultural business land price (50-year term)', giaDat: '2.026.000', tyLe: '0,70', tra1Lan: '1,447,143', traHangNam: '1,418,200' }
      ]
    },
    {
      stt: 'III',
      viTri: 'Đường 10,5m MC (2,0 - 10,5 - 2,0)',
      viTriEn: '10.5m MC Road (2.0 - 10.5 - 2.0)',
      loaiDat: [
        { id: '1', nameVi: 'Giá đất thương mại dịch vụ (Thời hạn 50 năm)', nameEn: 'Commercial land price (50-year term)', giaDat: '2,352,000', tyLe: '0,70', tra1Lan: '1,680,000', traHangNam: '1,646,400' },
        { id: '2', nameVi: 'Giá đất sản xuất kinh doanh phi nông nghiệp (Thời hạn 50 năm)', nameEn: 'Non-agricultural business land price (50-year term)', giaDat: '1.894.000', tyLe: '0,70', tra1Lan: '1,352,857', traHangNam: '1,325,800' }
      ]
    },
    {
      stt: 'IV',
      viTri: 'Đường 7,5m x 2 làn MC (6,0-7,5 - 6 - 7,5 - 6,0 )',
      viTriEn: '7.5m x 2 lanes MC Road (6.0 - 7.5 - 6.0 - 7.5 - 6.0)',
      loaiDat: [
        { id: '1', nameVi: 'Giá đất thương mại dịch vụ (Thời hạn 50 năm)', nameEn: 'Commercial land price (50-year term)', giaDat: '2,485,000', tyLe: '0,70', tra1Lan: '1,775,000', traHangNam: '1,739,500' },
        { id: '2', nameVi: 'Giá đất sản xuất kinh doanh phi nông nghiệp (Thời hạn 50 năm)', nameEn: 'Non-agricultural business land price (50-year term)', giaDat: '2.026.000', tyLe: '0,70', tra1Lan: '1,447,143', traHangNam: '1,418,200' }
      ]
    },
    {
      stt: 'V',
      viTri: 'Đường 7,5m MC (6,0 - 7,5 - 2,0) và (4,0 - 7,5 - 4,0)',
      viTriEn: '7.5m MC Road (6.0 - 7.5 - 2.0) and (4.0 - 7.5 - 4.0)',
      loaiDat: [
        { id: '1', nameVi: 'Giá đất thương mại dịch vụ (Thời hạn 50 năm)', nameEn: 'Commercial land price (50-year term)', giaDat: '2.221.000', tyLe: '0,70', tra1Lan: '1,586,429', traHangNam: '1,554,700' },
        { id: '2', nameVi: 'Giá đất sản xuất kinh doanh phi nông nghiệp (Thời hạn 50 năm)', nameEn: 'Non-agricultural business land price (50-year term)', giaDat: '1.763.000', tyLe: '0,70', tra1Lan: '1,259,286', traHangNam: '1,234,100' }
      ]
    },
    {
      stt: 'VI',
      viTri: 'Đường 6m MC (1,0 - 6,0 - 1,0)',
      viTriEn: '6m MC Road (1.0 - 6.0 - 1.0)',
      loaiDat: [
        { id: '1', nameVi: 'Giá đất thương mại dịch vụ (Thời hạn 50 năm)', nameEn: 'Commercial land price (50-year term)', giaDat: '2.083.000', tyLe: '0,70', tra1Lan: '1,487,857', traHangNam: '1,458,100' },
        { id: '2', nameVi: 'Giá đất sản xuất kinh doanh phi nông nghiệp (Thời hạn 50 năm)', nameEn: 'Non-agricultural business land price (50-year term)', giaDat: '1.624.000', tyLe: '0,70', tra1Lan: '1,160,000', traHangNam: '1,136,800' }
      ]
    }
  ];

  // Mobile Layout
  if (isMobile) {
    return (
      <MobileLayout>
        <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
          {/* Main Content - Mobile optimized */}
          <main className="flex-1 px-4 py-2 space-y-3">
            {/* Mobile Breadcrumb */}
            <div className={`py-1 px-2 rounded-lg ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg/50' : 'bg-dseza-light-secondary-bg/50'}`}>
              <nav className={`flex items-center space-x-1 text-xs ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                <Link
                  to={createUrl( isEn ? '/home' : '/trang-chu')}
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
                <span className={`font-medium line-clamp-1 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  {isEn ? 'Da Nang Hi-Tech Park' : 'Khu công nghệ cao Đà Nẵng'}
                </span>
              </nav>
            </div>

            <article className="space-y-4">
              {/* Article Header - Mobile optimized */}
              <header className="space-y-3">
                <h1 className={`font-montserrat text-xl font-bold leading-tight ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  {isEn ? 'Da Nang Hi-Tech Park' : 'Khu công nghệ cao Đà Nẵng'}
                </h1>
              </header>

              {/* Article Content - Mobile optimized */}
              <div className={`prose prose-sm max-w-none font-inter ${theme === 'dark' ? 'prose-invert text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                <div className="space-y-6 text-justify text-sm">
                  <section>
                    <h2 className={`font-montserrat text-lg font-bold mb-3 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? 'Hi-Tech Park' : 'Khu công nghệ cao'}</h2>
                    <p className="text-sm leading-relaxed">
                      {isEn
                        ? 'Da Nang Hi-Tech Park is one of three national multi-functional hi-tech parks in Vietnam, located in Da Nang City, the Central Highlands and Central Region. Established in 2010 under the Prime Minister’s Decision No. 1979/QD-TTg dated 28/10/2010, the Park aims to become a world-class science and technology urban area with high competitiveness, an attractive destination for domestic and foreign investors in hi-tech fields, and a driving force for science–technology development; promoting innovation, technology incubation, hi-tech business incubation; forming and developing hi-tech industries to significantly enhance economic efficiency and competitiveness for products and services of Da Nang City and the Central–Central Highlands region.'
                        : 'Khu công nghệ cao Đà Nẵng là một trong ba Khu công nghệ cao đa chức năng cấp quốc gia, tọa lạc tại thành phố Đà Nẵng, khu vực miền Trung - Tây Nguyên Việt Nam. Được thành lập từ năm 2010 theo Quyết định số 1979/QĐ-TTg ngày 28/10/2010 của Thủ tướng Chính phủ, Khu công nghệ cao Đà Nẵng mang trong mình sứ mệnh trở thành một đô thị khoa học – công nghệ đạt đẳng cấp quốc tế, có sức cạnh tranh cao, là điểm đến hấp dẫn cho các đầu tư ở lĩnh vực công nghệ cao trong và ngoài nước, là nơi động lực để thúc đẩy phát triển khoa học – công nghệ; thúc đẩy đổi mới, ươm tạo công nghệ, ươm tạo doanh nghiệp công nghệ cao; hình thành và phát triển ngành công nghiệp công nghệ cao, góp phần quan trọng nâng cao hiệu quả kinh tế và sức cạnh tranh cho các sản phẩm hàng hóa, dịch vụ của thành phố Đà Nẵng và Khu vực miền Trung và Tây Nguyên.'}
                    </p>

                    <p className="text-sm leading-relaxed">
                      {isEn
                        ? 'The Park covers 1,128.40 hectares in Hoa Vang District, Da Nang City, with six main functional zones: Hi-tech production (224.34 ha), Research–Development, training and business incubation (90.14 ha), Administration (2.65 ha), Central technical infrastructure (9.75 ha), and Logistics & hi-tech services (59.64 ha).'
                        : 'Khu công nghệ cao Đà Nẵng có diện tích 1128,40 ha, thuộc huyện Hòa Vang, thành phố Đà Nẵng, bao gồm 6 phân khu chức năng chính: Khu sản xuất công nghệ cao 224,34ha, Khu nghiên cứu – Phát triển đào tạo và ươm tạo doanh nghiệp 90,14ha, Khu quản lý – hành chính 2,65ha, Khu hạ tầng kỹ thuật đầu mối 9,75ha, Khu hậu cần, logistics và dịch vụ công nghệ cao 59,64ha.'}
                    </p>
                    <div className="my-4 rounded-lg overflow-hidden shadow-lg">
                      <img 
                        src="/media/Functionalmap/ban-do-khu-cong-nghe-cao-da-nang.jpg" 
                        alt="Bản đồ Khu công nghệ cao Đà Nẵng"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </section>

                  <section>
                    <h2 className={`font-montserrat text-lg font-bold mb-3 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '1. Location' : '1. Vị trí địa lí'}</h2>
                    <p className="text-sm leading-relaxed">{isEn ? 'Lien Chieu Ward, Da Nang City.' : 'Phường Liên Chiểu, thành phố Đà Nẵng.'} <a href="https://maps.app.goo.gl/Z2Xuzjn7WX9VASpt8" target="_blank" rel="noopener noreferrer" className={`${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'} underline`}>{isEn ? '(View on map)' : '(Xem trên bản đồ)'}</a></p>
                    <ul className="list-disc pl-4 space-y-1 text-sm mt-2">
                      <li>{isEn ? 'Tien Sa Port: 28 km' : 'Cách cảng biển Tiên Sa: 28 km'}</li>
                      <li>{isEn ? 'Lien Chieu Port: 10 km' : 'Cách cảng biển Liên Chiểu: 10 km'}</li>
                      <li>{isEn ? 'Da Nang International Airport: 18 km' : 'Cách Sân bay Quốc tế Đà Nẵng: 18 km'}</li>
                      <li>{isEn ? 'Da Nang City Center: 18 km' : 'Cách Trung tâm thành phố Đà Nẵng: 18 km'}</li>
                      <li>{isEn ? 'Railway Station: 18 km' : 'Cách ga đường sắt: 18 km'}</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className={`font-montserrat text-lg font-bold mb-3 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '2. Development objectives' : '2. Mục tiêu phát triển'}</h2>
                    <ul className="list-disc pl-4 space-y-2 text-sm">
                      <li>{isEn ? 'Attract domestic and foreign hi-tech resources to drive development; link education, scientific research and technology development with production, business and services; foster innovation, technology incubation, hi-tech business incubation, and develop the science and technology market.' : 'Thu hút các nguồn lực công nghệ cao (CNC) trong nước và nước ngoài, tạo động lực thúc đẩy phát triển CNC. Gắn kết giữa đào tạo, nghiên cứu khoa học và phát triển công nghệ với sản xuất, kinh doanh và dịch vụ; thúc đẩy đổi mới công nghệ, ươm tạo công nghệ, ươm tạo doanh nghiệp CNC và phát triển thị trường khoa học và công nghệ.'}</li>
                      <li>{isEn ? 'Form and develop several hi-tech industries, significantly improving economic efficiency and the competitiveness of products and services of Da Nang City and the Central–Central Highlands region of Vietnam.' : 'Hình thành và phát triển một số ngành công nghiệp CNC, góp phần quan trọng vào việc nâng cao hiệu quả kinh tế, sức cạnh tranh của các sản phẩm hàng hóa, dịch vụ của thành phố Đà Nẵng và khu vực miền Trung - Tây Nguyên, Việt Nam.'}</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className={`font-montserrat text-lg font-bold mb-3 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '3. Mission' : '3. Sứ mệnh'}</h2>
                    <ul className="list-disc pl-4 space-y-2 text-sm">
                      <li>{isEn ? 'Research, incubate, develop, transfer and apply hi-tech.' : 'Nghiên cứu, ươm tạo, phát triển, chuyển giao, ứng dụng công nghệ cao.'}</li>
                      <li>{isEn ? 'Train hi-tech human resources.' : 'Đào tạo nhân lực công nghệ cao.'}</li>
                      <li>{isEn ? 'Incubate hi-tech enterprises.' : 'Ươm tạo doanh nghiệp công nghệ cao.'}</li>
                      <li>{isEn ? 'Commercialize scientific research and technology development results.' : 'Thương mại hóa các kết quả nghiên cứu khoa học và phát triển công nghệ.'}</li>
                      <li>{isEn ? 'Engage in hi-tech production, business and services.' : 'Sản xuất kinh doanh và dịch vụ công nghệ cao.'}</li>
                      <li>{isEn ? 'Venture investment.' : 'Đầu tư mạo hiểm.'}</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className={`font-montserrat text-lg font-bold mb-3 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '4. Land use status' : '4. Hiện trạng sử dụng đất'}</h2>
                    <p className="mb-3 text-sm">{isEn ? 'Summary of occupancy rates in functional zones (for lease) of the Hi-Tech Park project' : 'Bảng tổng hợp tỷ lệ lấp đầy các phân khu chức năng (cho thuê) tại dự án Khu công nghệ cao'}</p>
                    <div className="overflow-x-auto -mx-4 px-4">
                      <table className={`min-w-full border-collapse border text-xs ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                          <thead className={`${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`}>
                              <tr>
                                  <th className={`p-2 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'No.' : 'Stt'}</th>
                                  <th className={`p-2 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Component' : 'Thành phần'}</th>
                                  <th className={`p-2 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Planned area (ha)' : 'Diện tích quy hoạch (ha)'}</th>
                                  <th className={`p-2 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Leased area (ha)' : 'Diện tích đã cho thuê (ha)'}</th>
                                  <th className={`p-2 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Rate (%)' : 'Tỷ lệ (%)'}</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
                                  <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>1</td>
                                  <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>{isEn ? 'Hi-tech production land' : 'Đất sản xuất CNC'}</td>
                                  <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>224,34</td>
                                  <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>110,78</td>
                                  <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>49,38</td>
                              </tr>
                              <tr className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-dseza-light-secondary-bg'}`}>
                                  <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>2</td>
                                  <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>{isEn ? 'R&D, training and business incubation land' : 'Đất nghiên cứu, phát triển, đào tạo và ươm tạo doanh nghiệp'}</td>
                                  <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>90,14</td>
                                  <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>5,5</td>
                                  <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>6,05</td>
                              </tr>
                              <tr className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
                                  <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>3</td>
                                  <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>{isEn ? 'Logistics and hi-tech services zone' : 'Khu hậu cần, logistics và dịch vụ CNC'}</td>
                                  <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>59,64</td>
                                  <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>20,12</td>
                                  <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>33,74</td>
                              </tr>
                              <tr className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-dseza-light-secondary-bg'}`}>
                                  <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>4</td>
                                  <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>{isEn ? 'Residential land and reserve for residential development' : 'Đất Khu ở và đất dự trữ phát triển khu ở'}</td>
                                  <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>49,8</td>
                                  <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>0,0</td>
                                  <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>0,00</td>
                              </tr>
                              <tr className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
                                  <td colSpan={2} className={`p-2 border font-semibold text-center ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'TOTAL' : 'TỔNG CỘNG'}</td>
                                  <td className={`p-2 border font-semibold ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>423,92</td>
                                  <td className={`p-2 border font-semibold ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>136,35</td>
                                  <td className={`p-2 border font-semibold ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>32,16</td>
                              </tr>
                          </tbody>
                      </table>
                    </div>
                  </section>
                  
                  <section>
                      <h2 className={`font-montserrat text-lg font-bold mb-3 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '5. Land sublease prices and infrastructure fees' : '5. Giá cho thuê lại đất và tiền sử dụng hạ tầng'}</h2>
                      <p className="mb-3 text-sm">{isEn ? 'PRICE TABLE FOR ROADS IN DA NANG HI-TECH PARK' : 'BẢNG GIÁ ĐẤT CÁC TUYẾN ĐƯỜNG TRONG KHU CÔNG NGHỆ CAO ĐÀ NẴNG'}</p>
                      <div className="overflow-x-auto -mx-4 px-4">
                          <table className={`min-w-full border-collapse border text-xs ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                               <thead className={`${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`}>
                                  <tr>
                                      <th className={`p-1 text-center align-middle font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'No.' : 'STT'}<br/>(1)</th>
                                      <th className={`p-1 text-center align-middle font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Location' : 'Vị trí'}<br/>(2)</th>
                                      <th className={`p-1 text-center align-middle font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Land price per Decision 59/2024/QD-UBND (31/12/2024)' : 'Giá đất theo QĐ 59/2024/QĐ-UBND\nngày 31/12/2024'}<br/>(3)</th>
                                      <th className={`p-1 text-center align-middle font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Percentage per Decision 60/2024/QD-UBND (31/12/2024)' : 'Tỷ lệ phần trăm QĐ 60/2024/QĐ-UBND\nngày 31/12/2024'}<br/>(4)</th>
                                      <th className={`p-1 text-center align-middle font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'One-time payment (50 years)' : 'Trả 1 lần (50 năm)'}<br/>(6) = (3) x (4) /70x50</th>
                                      <th className={`p-1 text-center align-middle font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Annual payment' : 'Trả hàng năm'}<br/>(7) = (6) x (5)</th>
                                  </tr>
                              </thead>
                              <tbody className={`${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                  {dataGiaDat.flatMap((nhomDat) => [
                                  <tr key={nhomDat.stt} className={`${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`}>
                                      <td className={`p-1 text-center font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>
                                          {nhomDat.stt}
                                      </td>
                                      <td colSpan={5} className={`p-1 font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>
                                          {isEn ? nhomDat.viTriEn : nhomDat.viTri}
                                      </td>
                                  </tr>,
                                  ...nhomDat.loaiDat.map((dat) => (
                                      <tr key={`${nhomDat.stt}-${dat.id}`} className={`${theme === 'dark' ? 'odd:bg-dseza-dark-main-bg even:bg-dseza-dark-secondary-bg hover:bg-dseza-dark-hover' : 'odd:bg-white even:bg-dseza-light-secondary hover:bg-dseza-light-hover'}`}>
                                          <td className={`p-1 text-center border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                              {dat.id}
                                          </td>
                                          <td className={`p-1 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                              {isEn ? dat.nameEn : dat.nameVi}
                                          </td>
                                          <td className={`p-1 text-right border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                              {dat.giaDat}
                                          </td>
                                          <td className={`p-1 text-center border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                              {dat.tyLe}
                                          </td>
                                          <td className={`p-1 text-center border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                              {dat.tra1Lan}
                                          </td>
                                          <td className={`p-1 text-right border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                              {dat.traHangNam}
                                          </td>
                                      </tr>
                                  ))
                              ])}
                          </tbody>
                          </table>
                      </div>
                      <div className="mt-3">
                          <p className={`font-semibold text-sm ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{isEn ? 'Note:' : 'Lưu ý:'}</p>
                          <ul className="list-disc pl-4 mt-2 space-y-1 text-xs">
                              <li>{isEn ? 'Infrastructure usage fee: 8,300 VND/m²/year' : 'Tiền sử dụng hạ tầng: 8,300đ/m2/năm'}</li>
                              <li>{isEn ? 'For land parcels or zones with a rental land value (based on the Land Price Table) of 30 billion VND or more, the specific land price for land rent is determined by direct comparison, deduction, income, and residual methods.' : 'Trường hợp diện tích tính thu tiền thuê đất của thửa đất hoặc khu đất có giá trị (tính theo giá đất trong Bảng giá đất) từ 30 tỷ đồng trở lên thì giá đất cụ thể tính thu tiền thuê đất được xác định theo các phương pháp so sánh trực tiếp, chiết trừ, thu nhập, thặng dư.'}</li>
                          </ul>
                      </div>
                  </section>

                  <section>
                      <h2 className={`font-montserrat text-lg font-bold mb-3 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '6. Master plan map and land use status' : '6. Bản đồ quy hoạch Khu CNC Đà Nẵng và tình hình sử dụng đất'}</h2>
                       <p className="mb-1 text-sm">{isEn ? 'As of Q3 2025 (attachment available)' : 'Tính đến quý III năm 2025 (có file đính kèm)'}</p>
                       <p className="mb-3 text-xs italic">{isEn ? '(Latest map updated)' : '(Cập nhật bản đồ mới nhất)'}</p>
                      <Dialog onOpenChange={() => setMapZoom(1)}>
                        <DialogTrigger asChild>
                          <button type="button" className={`${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary-hover' : 'text-dseza-light-primary hover:text-dseza-light-primary-hover'} font-semibold text-sm underline`}>
                            {isEn ? '(View here)' : '(Xem tại đây)'}
                          </button>
                        </DialogTrigger>
                        <DialogContent className="p-0 bg-transparent border-0 shadow-none max-w-5xl">
                          <DialogTitle className="sr-only">{isEn ? 'Da Nang Hi-Tech Park Map' : 'Bản đồ Khu công nghệ cao Đà Nẵng'}</DialogTitle>
                          <div className="relative max-h-[85vh] overflow-auto rounded-md">
                            <img
                              src="/media/Functionalmap/ban-do-khu-cong-nghe-cao-da-nang.jpg"
                              alt="Bản đồ Khu công nghệ cao Đà Nẵng"
                              className="w-full h-auto"
                              style={{ transform: `scale(${mapZoom})`, transformOrigin: 'center center' }}
                            />
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

              {/* Share Section - Mobile optimized */}
              <div className={`pt-4 border-t ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                <h3 className={`font-montserrat text-base font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  {isEn ? 'Share this page:' : 'Chia sẻ trang:'}
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" onClick={handleDownload} className="text-xs">
                    <Download className="h-3 w-3 mr-1" />
                    {isEn ? 'Download' : 'Tải xuống'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShare} className="text-xs">
                    <Share2 className="h-3 w-3 mr-1" />
                    {isEn ? 'Share' : 'Chia sẻ'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handlePrint} className="text-xs">
                    <Printer className="h-3 w-3 mr-1" />
                    {isEn ? 'Print' : 'In'}
                  </Button>
                </div>
              </div>
            </article>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </MobileLayout>
    );
  }

  // Desktop Layout (original)
  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
      {/* Header - Complete header structure */}
      <TopBar />
      <LogoSearchBar />
      <NavigationBar />

      {/* Main Content */}
      <main className="flex-1 pt-52">
        {/* Breadcrumb */}
        <div className={`py-3 ${theme === 'dark' ? 'bg-dseza-dark-secondary/50' : 'bg-dseza-light-secondary/50'} border-b ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
          <div className="container mx-auto px-4">
            <nav className={`flex items-center space-x-2 text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              <Link
                to={createUrl('')}
                className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {isEn ? 'Home' : 'Trang chủ'}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link
                to={createUrl(isEn ? 'introduction/functional-zones' : 'gioi-thieu/cac-khu-chuc-nang')}
                className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {isEn ? 'Functional zones' : 'Các khu chức năng'}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {isEn ? 'Da Nang Hi-Tech Park' : 'Khu công nghệ cao Đà Nẵng'}
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
                {isEn ? 'Da Nang Hi-Tech Park' : 'Khu công nghệ cao Đà Nẵng'}
              </h1>
            </header>

            {/* Article Content */}
            <div className={`prose-lg max-w-none font-inter ${theme === 'dark' ? 'prose-invert text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              <div className="space-y-10 text-justify">
                <section>
                  <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? 'Hi-Tech Park' : 'Khu công nghệ cao'}</h2>
                  <p>
                    {isEn ? 'Da Nang Hi-Tech Park is one of three national multi-functional hi-tech parks in Vietnam, located in Da Nang City, the Central Highlands and Central Region. Established in 2010 under the Prime Minister’s Decision No. 1979/QD-TTg dated 28/10/2010, the Park aims to become a world-class science and technology urban area with high competitiveness, an attractive destination for domestic and foreign investors in hi-tech fields, and a driving force for science–technology development; promoting innovation, technology incubation, hi-tech business incubation; forming and developing hi-tech industries to significantly enhance economic efficiency and competitiveness for products and services of Da Nang City and the Central–Central Highlands region.' : 'Khu công nghệ cao Đà Nẵng là một trong ba Khu công nghệ cao đa chức năng cấp quốc gia, tọa lạc tại thành phố Đà Nẵng, khu vực miền Trung - Tây Nguyên Việt Nam. Được thành lập từ năm 2010 theo Quyết định số 1979/QĐ-TTg ngày 28/10/2010 của Thủ tướng Chính phủ, Khu công nghệ cao Đà Nẵng mang trong mình sứ mệnh trở thành một đô thị khoa học – công nghệ đạt đẳng cấp quốc tế, có sức cạnh tranh cao, là điểm đến hấp dẫn cho các đầu tư ở lĩnh vực công nghệ cao trong và ngoài nước, là nơi động lực để thúc đẩy phát triển khoa học – công nghệ; thúc đẩy đổi mới, ươm tạo công nghệ, ươm tạo doanh nghiệp công nghệ cao; hình thành và phát triển ngành công nghiệp công nghệ cao, góp phần quan trọng nâng cao hiệu quả kinh tế và sức cạnh tranh cho các sản phẩm hàng hóa, dịch vụ của thành phố Đà Nẵng và Khu vực miền Trung và Tây Nguyên.'}
                  </p>
                  <p>
                    {isEn ? 'The Park covers 1,128.40 hectares in Hoa Vang District, Da Nang City, with six main functional zones: Hi-tech production (224.34 ha), Research–Development, training and business incubation (90.14 ha), Administration (2.65 ha), Central technical infrastructure (9.75 ha), and Logistics & hi-tech services (59.64 ha).' : 'Khu công nghệ cao Đà Nẵng có diện tích 1128,40 ha, thuộc huyện Hòa Vang, thành phố Đà Nẵng, bao gồm 6 phân khu chức năng chính: Khu sản xuất công nghệ cao 224,34ha, Khu nghiên cứu – Phát triển đào tạo và ươm tạo doanh nghiệp 90,14ha, Khu quản lý – hành chính 2,65ha, Khu hạ tầng kỹ thuật đầu mối 9,75ha, Khu hậu cần, logistics và dịch vụ công nghệ cao 59,64ha.'}
                  </p>
                  <div className="my-6 rounded-lg overflow-hidden shadow-lg">
                    <img 
                      src="/media/Functionalmap/ban-do-khu-cong-nghe-cao-da-nang.jpg" 
                      alt="Bản đồ Khu công nghệ cao Đà Nẵng"
                      className="w-full h-auto object-cover"
                  />
                  </div>
                </section>

                <section>
                  <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '1. Location' : '1. Vị trí địa lí'}</h2>
                  <p>{isEn ? 'Lien Chieu Ward, Da Nang City.' : 'Phường Liên Chiểu, thành phố Đà Nẵng.'} <a href="https://maps.app.goo.gl/Z2Xuzjn7WX9VASpt8" target="_blank" rel="noopener noreferrer" className={`${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'} underline`}>{isEn ? '(View on map)' : '(Xem trên bản đồ)'}</a></p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>{isEn ? 'Tien Sa Port: 28 km' : 'Cách cảng biển Tiên Sa: 28 km'}</li>
                    <li>{isEn ? 'Lien Chieu Port: 10 km' : 'Cách cảng biển Liên Chiểu: 10 km'}</li>
                    <li>{isEn ? 'Da Nang International Airport: 18 km' : 'Cách Sân bay Quốc tế Đà Nẵng: 18 km'}</li>
                    <li>{isEn ? 'Da Nang City Center: 18 km' : 'Cách Trung tâm thành phố Đà Nẵng: 18 km'}</li>
                    <li>{isEn ? 'Railway Station: 18 km' : 'Cách ga đường sắt: 18 km'}</li>
                  </ul>
                </section>

                <section>
                  <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '2. Development objectives' : '2. Mục tiêu phát triển'}</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>{isEn ? 'Attract domestic and foreign hi-tech resources to drive development; link education, scientific research and technology development with production, business and services; foster innovation, technology incubation, hi-tech business incubation, and develop the science and technology market.' : 'Thu hút các nguồn lực công nghệ cao (CNC) trong nước và nước ngoài, tạo động lực thúc đẩy phát triển CNC. Gắn kết giữa đào tạo, nghiên cứu khoa học và phát triển công nghệ với sản xuất, kinh doanh và dịch vụ; thúc đẩy đổi mới công nghệ, ươm tạo công nghệ, ươm tạo doanh nghiệp CNC và phát triển thị trường khoa học và công nghệ.'}</li>
                    <li>{isEn ? 'Form and develop several hi-tech industries, significantly improving economic efficiency and the competitiveness of products and services of Da Nang City and the Central–Central Highlands region of Vietnam.' : 'Hình thành và phát triển một số ngành công nghiệp CNC, góp phần quan trọng vào việc nâng cao hiệu quả kinh tế, sức cạnh tranh của các sản phẩm hàng hóa, dịch vụ của thành phố Đà Nẵng và khu vực miền Trung - Tây Nguyên, Việt Nam.'}</li>
                  </ul>
                </section>

                <section>
                  <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '3. Mission' : '3. Sứ mệnh'}</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>{isEn ? 'Research, incubate, develop, transfer and apply hi-tech.' : 'Nghiên cứu, ươm tạo, phát triển, chuyển giao, ứng dụng công nghệ cao.'}</li>
                    <li>{isEn ? 'Train hi-tech human resources.' : 'Đào tạo nhân lực công nghệ cao.'}</li>
                    <li>{isEn ? 'Incubate hi-tech enterprises.' : 'Ươm tạo doanh nghiệp công nghệ cao.'}</li>
                    <li>{isEn ? 'Commercialize scientific research and technology development results.' : 'Thương mại hóa các kết quả nghiên cứu khoa học và phát triển công nghệ.'}</li>
                    <li>{isEn ? 'Engage in hi-tech production, business and services.' : 'Sản xuất kinh doanh và dịch vụ công nghệ cao.'}</li>
                    <li>{isEn ? 'Venture investment.' : 'Đầu tư mạo hiểm.'}</li>
                  </ul>
                </section>

                <section>
                  <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '4. Land use status' : '4. Hiện trạng sử dụng đất'}</h2>
                  <p className="mb-4">{isEn ? 'Summary of occupancy rates in functional zones (for lease) of the Hi-Tech Park project' : 'Bảng tổng hợp tỷ lệ lấp đầy các phân khu chức năng (cho thuê) tại dự án Khu công nghệ cao'}</p>
                  <div className="overflow-x-auto">
                    <table className={`min-w-full border-collapse border text-sm ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                        <thead className={`${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`}>
                            <tr>
                                <th className={`p-3 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'No.' : 'Stt'}</th>
                                <th className={`p-3 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Component' : 'Thành phần'}</th>
                                <th className={`p-3 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Planned area (ha)' : 'Diện tích quy hoạch (ha)'}</th>
                                <th className={`p-3 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Leased area (ha)' : 'Diện tích đã cho thuê (ha)'}</th>
                                <th className={`p-3 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Rate (%)' : 'Tỷ lệ (%)'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>1</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>{isEn ? 'Hi-tech production land' : 'Đất sản xuất CNC'}</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>224,34</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>110,78</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>49,38</td>
                            </tr>
                            <tr className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-dseza-light-secondary-bg'}`}>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>2</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>{isEn ? 'R&D, training and business incubation land' : 'Đất nghiên cứu, phát triển, đào tạo và ươm tạo doanh nghiệp'}</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>90,14</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>5,5</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>6,05</td>
                            </tr>
                            <tr className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>3</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>{isEn ? 'Logistics and hi-tech services zone' : 'Khu hậu cần, logistics và dịch vụ CNC'}</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>59,64</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>20,12</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>33,74</td>
                            </tr>
                            <tr className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-dseza-light-secondary-bg'}`}>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>4</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>{isEn ? 'Residential land and reserve for residential development' : 'Đất Khu ở và đất dự trữ phát triển khu ở'}</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>49,8</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>0,0</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>0,00</td>
                            </tr>
                            <tr className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
                                <td colSpan={2} className={`p-3 border font-semibold text-center ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'TOTAL' : 'TỔNG CỘNG'}</td>
                                <td className={`p-3 border font-semibold ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>423,92</td>
                                <td className={`p-3 border font-semibold ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>136,35</td>
                                <td className={`p-3 border font-semibold ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>32,16</td>
                            </tr>
                        </tbody>
                    </table>
                  </div>
                </section>
                
                <section>
                    <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '5. Land sublease prices and infrastructure fees' : '5. Giá cho thuê lại đất và tiền sử dụng hạ tầng'}</h2>
                    <p className="mb-4">{isEn ? 'PRICE TABLE FOR ROADS IN DA NANG HI-TECH PARK' : 'BẢNG GIÁ ĐẤT CÁC TUYẾN ĐƯỜNG TRONG KHU CÔNG NGHỆ CAO ĐÀ NẴNG'}</p>
                    <div className="overflow-x-auto">
                        <table className={`min-w-full border-collapse border text-sm ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                             <thead className={`${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`}>
                                <tr>
                                    <th className={`p-2 text-center align-middle font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'No.' : 'STT'}<br/>(1)</th>
                                    <th className={`p-2 text-center align-middle font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Location' : 'Vị trí'}<br/>(2)</th>
                                    <th className={`p-2 text-center align-middle font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Land price per Decision 59/2024/QD-UBND (31/12/2024)' : 'Giá đất theo QĐ 59/2024/QĐ-UBND'}<br/>(3)</th>
                                    <th className={`p-2 text-center align-middle font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Percentage per Decision 60/2024/QD-UBND (31/12/2024)' : 'Tỷ lệ phần trăm QĐ 60/2024/QĐ-UBND'}<br/>(4)</th>
                                    <th className={`p-2 text-center align-middle font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'One-time payment (50 years)' : 'Trả 1 lần (50 năm)'}<br/>(6) = (3) x (4) /70x50</th>
                                    <th className={`p-2 text-center align-middle font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>{isEn ? 'Annual payment' : 'Trả hàng năm'}<br/>(7) = (6) x (5)</th>
                                </tr>
                            </thead>
                            <tbody className={`${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                {dataGiaDat.flatMap((nhomDat) => [
                                <tr key={nhomDat.stt} className={`${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`}>
                                    <td className={`p-2 text-center font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>
                                        {nhomDat.stt}
                                    </td>
                                    <td colSpan={5} className={`p-2 font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>
                                        {isEn ? nhomDat.viTriEn : nhomDat.viTri}
                                    </td>
                                </tr>,
                                ...nhomDat.loaiDat.map((dat) => (
                                    <tr key={`${nhomDat.stt}-${dat.id}`} className={`${theme === 'dark' ? 'odd:bg-dseza-dark-main-bg even:bg-dseza-dark-secondary-bg hover:bg-dseza-dark-hover' : 'odd:bg-white even:bg-dseza-light-secondary hover:bg-dseza-light-hover'}`}>
                                        <td className={`p-2 text-center border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                            {dat.id}
                                        </td>
                                        <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                            {isEn ? dat.nameEn : dat.nameVi}
                                        </td>
                                        <td className={`p-2 text-right border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                            {dat.giaDat}
                                        </td>
                                        <td className={`p-2 text-center border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                            {dat.tyLe}
                                        </td>
                                        <td className={`p-2 text-right border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                            {dat.tra1Lan}
                                        </td>
                                        <td className={`p-2 text-right border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                            {dat.traHangNam}
                                        </td>
                                    </tr>
                                ))
                            ])}
                        </tbody>
                        </table>
                    </div>
                    <div className="mt-4">
                        <p className={`font-semibold ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{isEn ? 'Note:' : 'Lưu ý:'}</p>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>{isEn ? 'Infrastructure usage fee: 8,300 VND/m²/year' : 'Tiền sử dụng hạ tầng: 8,300đ/m2/năm'}</li>
                            <li>{isEn ? 'For land parcels or zones with a rental land value (based on the Land Price Table) of 30 billion VND or more, the specific land price for land rent is determined by direct comparison, deduction, income, and residual methods.' : 'Trường hợp diện tích tính thu tiền thuê đất của thửa đất hoặc khu đất có giá trị (tính theo giá đất trong Bảng giá đất) từ 30 tỷ đồng trở lên thì giá đất cụ thể tính thu tiền thuê đất được xác định theo các phương pháp so sánh trực tiếp, chiết trừ, thu nhập, thặng dư.'}</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '6. Master plan map and land use status' : '6. Bản đồ quy hoạch Khu CNC Đà Nẵng và tình hình sử dụng đất'}</h2>
                     <p className="mb-1">{isEn ? 'As of Q3 2025 (attachment available)' : 'Tính đến quý III năm 2025 (có file đính kèm)'}</p>
                     <p className="mb-4 text-sm italic">{isEn ? '(Latest map updated)' : '(Cập nhật bản đồ mới nhất)'}</p>
                    <Dialog onOpenChange={() => setMapZoom(1)}>
                      <DialogTrigger asChild>
                        <button type="button" className={`${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary-hover' : 'text-dseza-light-primary hover:text-dseza-light-primary-hover'} font-semibold underline`}>
                          {isEn ? '(View here)' : '(Xem tại đây)'}
                        </button>
                      </DialogTrigger>
                      <DialogContent className="p-0 bg-transparent border-0 shadow-none max-w-6xl">
                        <DialogTitle className="sr-only">{isEn ? 'Da Nang Hi-Tech Park Map' : 'Bản đồ Khu công nghệ cao Đà Nẵng'}</DialogTitle>
                        <div className="relative max-h-[85vh] overflow-auto rounded-md">
                          <img
                            src="/media/Functionalmap/ban-do-khu-cong-nghe-cao-da-nang.jpg"
                            alt={isEn ? 'Da Nang Hi-Tech Park Map' : 'Bản đồ Khu công nghệ cao Đà Nẵng'}
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

export default KhuCongNgheCaoDaNang;