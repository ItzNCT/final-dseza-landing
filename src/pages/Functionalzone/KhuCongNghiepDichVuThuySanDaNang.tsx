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

const KhuCongNghiepDichVuThuySanDaNang = () => {
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
        title: isEn ? 'Da Nang Fisheries Service Industrial Park - DSEZA' : 'Khu công nghiệp Dịch vụ Thủy sản Đà Nẵng - DSEZA',
        text: isEn ? 'Information about Da Nang Fisheries Service Industrial Park' : 'Thông tin về Khu công nghiệp Dịch vụ Thủy sản Đà Nẵng',
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
                {isEn ? 'Da Nang Fisheries Service Industrial Park' : 'Khu công nghiệp Dịch vụ Thủy sản Đà Nẵng'}
              </span>
            </nav>

            {/* Article Header - Mobile */}
            <header className="mb-4">
              <h1 className={`font-montserrat text-lg font-bold mb-2 leading-tight ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {isEn ? 'Da Nang Fisheries Service Industrial Park' : 'Khu công nghiệp Dịch vụ Thủy sản Đà Nẵng'}
              </h1>
            </header>

            {/* Article Content - Mobile */}
            <div className={`text-sm font-inter ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                <div className="space-y-4 text-justify">
                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '1. General information' : '1. Thông tin chung'}</h2>
                        <p className="text-sm leading-relaxed">{isEn ? 'Da Nang Fisheries Service Industrial Park (FSIP) was established under Decision No. 5210/QD-UB dated 04/09/2001 by consolidating existing seafood industry clusters. Initially invested by the Department of Fisheries – Agriculture & Forestry; in December 2002 it was transferred to Da Nang Industrial Park Infrastructure Development and Operation Company. After adjustments, FSIP covers 50.63 ha with completed roads, drainage, grading, lighting and water supply systems. Wastewater is collected to Son Tra WWTP. FSIP is being studied for conversion to Son Tra Industrial Cluster per Da Nang City Planning 2021–2030, vision to 2050 (Decision 1287/QD-TTg, 02/11/2023).' : 'Khu Dịch vụ thủy sản Đà Nẵng thành lập theo Quyết định số 5210/QĐ-UB ngày 04/9/2001, trên cơ sở gộp các cụm công nghiệp thủy sản hiện có trên địa bàn thành phố; do Sở Thủy sản – Nông lâm làm chủ đầu tư, đến tháng 12/2002 chuyển giao cho Công ty Phát triển và Khai thác hạ tầng KCN Đà Nẵng làm chủ đầu tư. Qua các lần điều chỉnh, diện tích Khu Dịch vụ thủy sản Đà Nẵng là 50,63ha. Đã xây dựng hoàn thành hệ thống giao thông, thoát nước, san nền, điện chiếu sáng, cấp nước trong toàn KCN. Hiện tại, nước thải Khu Dịch vụ thủy sản Đà Nẵng được thu gom về Trạm xử lý nước thải Sơn Trà. Hiện nay, Khu Dịch vụ thủy sản Đà Nẵng đang được nghiên cứu, thực hiện chuyển đổi, hình thành Cụm Công nghiệp Sơn Trà theo quy hoạch thành phố Đà Nẵng thời kỳ 2021 - 2030, tầm nhìn đến năm 2050 được Thủ tướng Chính phủ phê duyệt tại Quyết định số 1287/QĐ-TTg ngày 02/11/2023.'}</p>
                    </section>
                    <div className="my-4 rounded-lg overflow-hidden shadow-lg">
                    <img
                        src="/media/Functionalmap/ban-do-khu-cong-nghiep-hoa-khanh.jpg"
                        alt="Khu công nghiệp Đà Nẵng"
                        className="w-full h-auto object-cover"
                    />
                </div>
                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '2. Land sublease prices and infrastructure fees' : '2. Giá cho thuê lại đất và tiền sử dụng hạ tầng'}</h2>
                        <p className="text-xs italic mb-1">{isEn ? 'Updated: Q3/2025' : 'Ngày cập nhật: Quý III/2025'}</p>
                        <p className="text-xs italic mb-3">{isEn ? 'Prices are indicative; for details please contact Da Nang Industrial Park Infrastructure Development and Operation Company.' : 'Giá có tính tham khảo, mọi chi tiết xin liên hệ Công ty Phát triển và Khai thác hạ tầng Khu công nghiệp Đà Nẵng.'}</p>
                        <div className="mt-3">
                            <h3 className={`font-montserrat text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{isEn ? '2.1. Land sublease price (until 2046)' : '2.1. Giá cho thuê lại đất: (Đến năm 2046)'}</h3>
                            <p className="text-xs">{isEn ? 'FSIP is fully occupied (100%); no land available.' : 'Khu DVTS Đà Nẵng đã hết đất cho thuê, lấp đầy 100%.'}</p>
                        </div>
                         <div className="mt-4">
                            <h3 className={`font-montserrat text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{isEn ? '2.2. Infrastructure usage fee' : '2.2. Giá thu tiền sử dụng hạ tầng:'}</h3>
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
                                            <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>{isEn ? '9,116 (VND/m²/year)' : '9.116 (đồng/m2/năm)'}</td>
                                            <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>{isEn ? 'Annual payment from the date the project begins operation.' : 'Trả tiền hàng năm, kể từ ngày dự án đăng ký đầu tư đi vào hoạt động.'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-2 text-xs italic">{isEn ? 'Note: Prices above are current reference values and may change over time by decision of competent authorities and infrastructure companies.' : 'Lưu ý: Đơn giá thuê lại đất và tiền sử dụng hạ tầng tại các Khu công nghiệp nêu trên là đơn giá tính đến thời điểm hiện tại; có thể thay đổi theo thời gian bởi quyết định của cơ quan có thẩm quyền và các Công ty kinh doanh hạ tầng.'}</p>
                        </div>
                    </section>

                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>3. Hiện trạng quy hoạch sử dụng đất</h2>
                        <ul className="list-disc pl-4 mt-1 space-y-1 text-xs">
                            <li>{isEn ? 'Total land area according to the master plan: 50,63ha' : 'Tổng diện tích đất theo quy hoạch : 50,63ha'}</li>
                            <li>{isEn ? 'Industrial land available for lease: 45,72 ha' : 'Diện tích đất công nghiệp có thể cho thuê : 45,72 ha'}</li>
                            <li>{isEn ? 'Industrial land leased: 45,72 ha' : 'Diện tích đất công nghiệp đã cho thuê: 45,72 ha'}</li>
                            <li>{isEn ? 'Remaining industrial land: 0,00 ha' : 'Diện tích đất công nghiệp còn lại: 0,00 ha'}</li>
                            <li>{isEn ? 'Industrial land without infrastructure: 0,00 ha' : 'Diện tích đất công nghiệp chưa có hạ tầng 0,00 ha'}</li>
                            <li>{isEn ? 'Filling rate: 100%' : 'Tỷ lệ lắp đầy : 100%'}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className={`font-montserrat text-base font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '4. Master plan map of Fisheries Service IP' : '4. Bản đồ quy hoạch Khu Dịch vụ thủy sản Đà Nẵng'}</h2>
                        <p className="mb-1 text-sm">{isEn ? 'As of Q3/2025 (attachment available)' : 'Tính đến Quý III năm 2025 (có file đính kèm)'}</p>
                        <Dialog onOpenChange={() => setMapZoom(1)}>
                          <DialogTrigger asChild>
                            <button type="button" className={`${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary-hover' : 'text-dseza-light-primary hover:text-dseza-light-primary-hover'} font-semibold underline`}>
                              {isEn ? '(View here)' : '(Xem tại đây)'}
                            </button>
                          </DialogTrigger>
                          <DialogContent className="p-0 bg-transparent border-0 shadow-none max-w-[95vw]">
                            <DialogTitle className="sr-only">{isEn ? 'Fisheries Service Industrial Park Master Plan' : 'Bản đồ quy hoạch Khu Dịch vụ thủy sản Đà Nẵng'}</DialogTitle>
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
                to={isEn ? '/en/trang-chu' : '/vi/trang-chu'}
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {isEn ? 'Home' : 'Trang chủ'}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link
                to={isEn ? '/en/gioi-thieu/cac-khu-chuc-nang' : '/vi/gioi-thieu/cac-khu-chuc-nang'}
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {isEn ? 'Functional zones' : 'Các khu chức năng'}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {isEn ? 'Da Nang Fisheries Service Industrial Park' : 'Khu công nghiệp Dịch vụ Thủy sản Đà Nẵng'}
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
                {isEn ? 'Da Nang Fisheries Service Industrial Park' : 'Khu công nghiệp Dịch vụ Thủy sản Đà Nẵng'}
              </h1>
            </header>

            {/* Article Content */}
            <div className={`prose-lg max-w-none font-inter ${theme === 'dark' ? 'prose-invert text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                <div className="space-y-8 text-justify">
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '1. General information' : '1. Thông tin chung'}</h2>
                        <p>{isEn ? 'Da Nang Fisheries Service Industrial Park (FSIP) was established under Decision No. 5210/QD-UB dated 04/09/2001 by consolidating existing seafood industry clusters. Initially invested by the Department of Fisheries – Agriculture & Forestry; in December 2002 the project was transferred to Da Nang Industrial Park Infrastructure Development and Operation Company. After adjustments, the park covers 50.63 ha with completed roads, drainage, site leveling, lighting, and water supply systems. Wastewater is collected at Son Tra Wastewater Treatment Station. FSIP is under study to be converted into Son Tra Industrial Cluster pursuant to Da Nang City Planning 2021–2030, vision to 2050 (Decision No. 1287/QD-TTg dated 02/11/2023).' : 'Khu Dịch vụ thủy sản Đà Nẵng thành lập theo Quyết định số 5210/QĐ-UB ngày 04/9/2001, trên cơ sở gộp các cụm công nghiệp thủy sản hiện có trên địa bàn thành phố; do Sở Thủy sản – Nông lâm làm chủ đầu tư, đến tháng 12/2002 chuyển giao cho Công ty Phát triển và Khai thác hạ tầng KCN Đà Nẵng làm chủ đầu tư. Qua các lần điều chỉnh, diện tích Khu Dịch vụ thủy sản Đà Nẵng là 50,63ha.Đã xây dựng hoàn thành hệ thống giao thông, thoát nước, san nền, điện chiếu sáng, cấp nước trong toàn KCN. Hiện tại, nước thải Khu Dịch vụ thủy sản Đà Nẵng được thu gom về Trạm xử lý nước thải Sơn Trà. Hiện nay, Khu Dịch vụ thủy sản Đà Nẵng đang được nghiên cứu, thực hiện chuyển đổi, hình thành Cụm Công nghiệp Sơn Trà theo quy hoạch thành phố Đà Nẵng thời kỳ 2021 - 2030, tầm nhìn đến năm 2050 được Thủ tướng Chính phủ phê duyệt tại Quyết định số 1287/QĐ-TTg ngày 02/11/2023.'}</p>
                    </section>
                    <div className="my-4 rounded-lg overflow-hidden shadow-lg">
                    <img
                        src="/media/Functionalmap/ban-do-khu-cong-nghiep-hoa-khanh.jpg"
                        alt="Khu công nghiệp Đà Nẵng"
                        className="w-full h-auto object-cover"
                    />
                </div>
                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '2. Land sublease prices and infrastructure fees' : '2. Giá cho thuê lại đất và tiền sử dụng hạ tầng'}</h2>
                        <p className="text-sm italic">{isEn ? 'Updated: Q3/2025' : 'Ngày cập nhật: Quý III/2025'}</p>
                        <p className="text-sm italic">{isEn ? 'Prices are indicative; for details please contact Da Nang Industrial Park Infrastructure Development and Operation Company.' : 'Giá có tính tham khảo, mọi chi tiết xin liên hệ Công ty Phát triển và Khai thác hạ tầng Khu công nghiệp Đà Nẵng.'}</p>
                        <div className="mt-4">
                            <h3 className={`font-montserrat text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{isEn ? '2.1. Land sublease price (until 2046)' : '2.1. Giá cho thuê lại đất: (Đến năm 2046)'}</h3>
                            <p className="text-sm">{isEn ? 'FSIP is fully occupied (100%); no land available.' : 'Khu DVTS Đà Nẵng đã hết đất cho thuê, lấp đầy 100%.'}</p>
                        </div>
                         <div className="mt-6">
                            <h3 className={`font-montserrat text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{isEn ? '2.2. Infrastructure usage fee' : '2.2. Giá thu tiền sử dụng hạ tầng:'}</h3>
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
                                            <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>{isEn ? '9,116 (VND/m²/year)' : '9.116 (đồng/m2/năm)'}</td>
                                            <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>{isEn ? 'Annual payment from the date the project begins operation.' : 'Trả tiền hàng năm, kể từ ngày dự án đăng ký đầu tư đi vào hoạt động.'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-2 text-sm italic">{isEn ? 'Note: Prices above are current reference values and may change over time by decision of competent authorities and infrastructure companies.' : 'Lưu ý: Đơn giá thuê lại đất và tiền sử dụng hạ tầng tại các Khu công nghiệp nêu trên là đơn giá tính đến thời điểm hiện tại; có thể thay đổi theo thời gian bởi quyết định của cơ quan có thẩm quyền và các Công ty kinh doanh hạ tầng.'}</p>
                        </div>
                    </section>

                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '3. Land-use planning status' : '3. Hiện trạng quy hoạch sử dụng đất'}</h2>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>{isEn ? 'Total land area according to the master plan: 50,63ha' : 'Tổng diện tích đất theo quy hoạch : 50,63ha'}</li>
                            <li>{isEn ? 'Industrial land available for lease: 45,72 ha' : 'Diện tích đất công nghiệp có thể cho thuê : 45,72 ha'}</li>
                            <li>{isEn ? 'Industrial land leased: 45,72 ha' : 'Diện tích đất công nghiệp đã cho thuê: 45,72 ha'}</li>
                            <li>{isEn ? 'Remaining industrial land: 0,00 ha' : 'Diện tích đất công nghiệp còn lại: 0,00 ha'}</li>
                            <li>{isEn ? 'Industrial land without infrastructure: 0,00 ha' : 'Diện tích đất công nghiệp chưa có hạ tầng 0,00 ha'}</li>
                            <li>{isEn ? 'Filling rate: 100%' : 'Tỷ lệ lắp đầy : 100%'}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>{isEn ? '4. Master plan map of Fisheries Service IP' : '4. Bản đồ quy hoạch Khu Dịch vụ thủy sản Đà Nẵng'}</h2>
                        <p className="text-sm italic">{isEn ? 'As of Q3/2025 (attachment available)' : 'Tính đến Quý III năm 2025 (có file đính kèm)'}</p>
                        <Dialog onOpenChange={() => setMapZoom(1)}>
                          <DialogTrigger asChild>
                            <button type="button" className={`${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary-hover' : 'text-dseza-light-primary hover:text-dseza-light-primary-hover'} font-semibold underline`}>
                              {isEn ? '(View here)' : '(Xem tại đây)'}
                            </button>
                          </DialogTrigger>
                          <DialogContent className="p-0 bg-transparent border-0 shadow-none max-w-6xl">
                            <DialogTitle className="sr-only">{isEn ? 'Fisheries Service Industrial Park Master Plan' : 'Bản đồ quy hoạch Khu Dịch vụ thủy sản Đà Nẵng'}</DialogTitle>
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

export default KhuCongNghiepDichVuThuySanDaNang;