import React from 'react';
import { Link } from "react-router-dom";
import {
  Download,
  Share2,
  Printer,
  ChevronRight
} from 'lucide-react';
import { useTheme } from "@/context/ThemeContext";
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const KhuCongNgheCaoDaNang = () => {
  const { theme } = useTheme();

  const handleDownload = () => {
    console.log('Downloading document...');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Khu công nghệ cao Đà Nẵng - DSEZA',
        text: 'Thông tin về Khu công nghệ cao Đà Nẵng',
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
  
  const dataGiaDat = [
    {
      stt: 'I',
      viTri: 'Đường MC (7,5 - 15 - 6 - 15-7,5)',
      loaiDat: [
        { id: '1', name: 'Giá đất thương mại dịch vụ (Thời hạn 50 năm)', giaDat: '3.688.000', heSo: '1,1', tyLe: '1%', tra1Lan: '2.897.714', traHangNam: '28.977' },
        { id: '2', name: 'Giá đất sản xuất kinh doanh phi nông nghiệp (Thời hạn 50 năm)', giaDat: '2.943.000', heSo: '1,1', tyLe: '1%', tra1Lan: '2.312.357', traHangNam: '23.124' }
      ]
    },
    {
      stt: 'II',
      viTri: 'Đường 10,5m MC (6,0 - 10,5 - 6,0)',
      loaiDat: [
        { id: '1', name: 'Giá đất thương mại dịch vụ (Thời hạn 50 năm)', giaDat: '2.485.000', heSo: '1,1', tyLe: '1%', tra1Lan: '1.952.500', traHangNam: '19.525' },
        { id: '2', name: 'Giá đất sản xuất kinh doanh phi nông nghiệp (Thời hạn 50 năm)', giaDat: '2.026.000', heSo: '1,1', tyLe: '1%', tra1Lan: '1.591.857', traHangNam: '15.919' }
      ]
    },
    {
      stt: 'III',
      viTri: 'Đường 10,5m MC (2,0 - 10,5 - 2,0)',
      loaiDat: [
        { id: '1', name: 'Giá đất thương mại dịch vụ (Thời hạn 50 năm)', giaDat: '2.352.000', heSo: '1,1', tyLe: '1%', tra1Lan: '1.848.000', traHangNam: '18.480' },
        { id: '2', name: 'Giá đất sản xuất kinh doanh phi nông nghiệp (Thời hạn 50 năm)', giaDat: '1.894.000', heSo: '1,1', tyLe: '1%', tra1Lan: '1.488.143', traHangNam: '14.881' }
      ]
    },
    {
      stt: 'IV',
      viTri: 'Đường 7,5m x 2 làn MC (6,0-7,5 - 6 - 7,5 - 6,0 )',
      loaiDat: [
        { id: '1', name: 'Giá đất thương mại dịch vụ (Thời hạn 50 năm)', giaDat: '2.485.000', heSo: '1,1', tyLe: '1%', tra1Lan: '1.952.500', traHangNam: '19.525' },
        { id: '2', name: 'Giá đất sản xuất kinh doanh phi nông nghiệp (Thời hạn 50 năm)', giaDat: '2.026.000', heSo: '1,1', tyLe: '1%', tra1Lan: '1.591.857', traHangNam: '15.919' }
      ]
    },
    {
      stt: 'V',
      viTri: 'Đường 7,5m MC (6,0 - 7,5 - 2,0) và (4,0 - 7,5 - 4,0)',
      loaiDat: [
        { id: '1', name: 'Giá đất thương mại dịch vụ (Thời hạn 50 năm)', giaDat: '2.221.000', heSo: '1,1', tyLe: '1%', tra1Lan: '1.745.071', traHangNam: '17.451' },
        { id: '2', name: 'Giá đất sản xuất kinh doanh phi nông nghiệp (Thời hạn 50 năm)', giaDat: '1.763.000', heSo: '1,1', tyLe: '1%', tra1Lan: '1.385.214', traHangNam: '13.852' }
      ]
    },
    {
      stt: 'VI',
      viTri: 'Đường 6m MC (1,0 - 6,0 - 1,0)',
      loaiDat: [
        { id: '1', name: 'Giá đất thương mại dịch vụ (Thời hạn 50 năm)', giaDat: '2.083.000', heSo: '1,1', tyLe: '1%', tra1Lan: '1.636.643', traHangNam: '16.366' },
        { id: '2', name: 'Giá đất sản xuất kinh doanh phi nông nghiệp (Thời hạn 50 năm)', giaDat: '1.624.000', heSo: '1,1', tyLe: '1%', tra1Lan: '1.276.000', traHangNam: '12.760' }
      ]
    }
  ];

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
                to="/"
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Trang chủ
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link
                to="/gioi-thieu"
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Giới thiệu
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link
                to="/gioi-thieu/cac-khu-chuc-nang"
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Các khu chức năng
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Khu công nghệ cao Đà Nẵng
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
                Khu công nghệ cao Đà Nẵng
              </h1>
            </header>

            {/* Article Content */}
            <div className={`prose-lg max-w-none font-inter ${theme === 'dark' ? 'prose-invert text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              <div className="space-y-10 text-justify">
                <section>
                  <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>1. Quá trình thành lập</h2>
                  <p>
                    Khu công nghệ cao Đà Nẵng được thành lập theo Quyết định số 1979/QĐ-TTg ngày 28/10/2010 của Thủ tướng Chính phủ Thành lập Khu công nghệ cao Đà Nẵng trực thuộc Ủy ban nhân dân thành phố Đà Nẵng. Khu công nghệ cao Đà Nẵng có diện tích 1128,40 ha, thuộc huyện Hòa Vang, thành phố Đà Nẵng. Quyết định số 3409/QĐ-UBND ngày 23/7/2016 của UBND thành phố về việc phê duyệt điểu chỉnh tổng mặt bằng quy hoạch chi tiết tỷ lệ 1/500 nay được điều chỉnh tại điều chỉnh theo Quyết định số 5468/QĐ-UBND ngày 30/11/2019 của UBND thành phố, trong đó, có 6 phân khu chức năng chính bao gồm Khu sản xuất công nghệ cao, Khu nghiên cứu – Phát triển đào tạo và ươm tạo doanh nghiệp, Khu quản lý – hành chính, Khu ở, Khu hạ tầng kỹ thuật đầu mối, Khu hậu cần, logistics và dịch vụ công nghệ cao...
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
                  <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>2. Mục tiêu phát triển</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Thu hút các nguồn lực công nghệ cao (CNC) trong nước và nước ngoài, tạo động lực thúc đẩy phát triển CNC. Gắn kết giữa đào tạo, nghiên cứu khoa học và phát triển công nghệ với sản xuất, kinh doanh và dịch vụ; thúc đẩy đổi mới công nghệ, ươm tạo công nghệ, ươm tạo doanh nghiệp CNC và phát triển thị trường khoa học và công nghệ.</li>
                    <li>Hình thành và phát triển một số ngành công nghiệp CNC, góp phần quan trọng vào việc nâng cao hiệu quả kinh tế, sức cạnh tranh của các sản phẩm hàng hóa, dịch vụ của thành phố Đà Nẵng và khu vực miền Trung - Tây Nguyên, Việt Nam.</li>
                  </ul>
                </section>

                <section>
                  <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>3. Sứ mệnh</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Nghiên cứu, ươm tạo, phát triển, chuyển giao, ứng dụng công nghệ cao.</li>
                    <li>Đào tạo nhân lực công nghệ cao.</li>
                    <li>Ươm tạo doanh nghiệp công nghệ cao.</li>
                    <li>Thương mại hóa các kết quả nghiên cứu khoa học và phát triển công nghệ.</li>
                    <li>Sản xuất kinh doanh và dịch vụ công nghệ cao.</li>
                    <li>Đầu tư mạo hiểm.</li>
                  </ul>
                </section>

                <section>
                  <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>4. Hiện trạng sử dụng đất</h2>
                  <p className="mb-4">Bảng tổng hợp tỷ lệ lấp đầy các phân khu đất tại dự án Khu công nghệ cao</p>
                  <div className="overflow-x-auto">
                    <table className={`min-w-full border-collapse border text-sm ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                        <thead className={`${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`}>
                            <tr>
                                <th className={`p-3 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>Stt</th>
                                <th className={`p-3 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>Thành phần</th>
                                <th className={`p-3 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>Diện tích quy hoạch (ha)</th>
                                <th className={`p-3 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>Diện tích đã cho thuê (ha)</th>
                                <th className={`p-3 text-left font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>Tỷ lệ (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
                                <td className={`p-3 border font-semibold ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>I</td>
                                <td className={`p-3 border font-semibold ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>Đất dành cho khu chức năng (cho thuê)</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>329,96</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>107,98</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>32,73</td>
                            </tr>
                            <tr className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-dseza-light-secondary-bg'}`}>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>1</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>Khu sản xuất công nghệ cao</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>202,58</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>85,61</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>42,26</td>
                            </tr>
                            <tr className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>2</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>Khu nghiên cứu – Phát triển, đào tạo và ươm tạo doanh nghiệp</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>99,93</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>4,45</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>4,45</td>
                            </tr>
                            <tr className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-dseza-light-secondary-bg'}`}>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>3</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>Khu hậu cần, logistic và dịch vụ công nghệ cao</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>27,45</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>17,92</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>65,28</td>
                            </tr>
                            <tr className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
                                <td className={`p-3 border font-semibold ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>II</td>
                                <td className={`p-3 border font-semibold ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>Đất công trình phụ trợ (khu ở, quản lý hành chính, giao thông, cây xanh, mặt nước, Nhà máy nước, trạm biến áp, hải quan,công an, cảnh sát PCCC...)</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>280,48</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}></td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}></td>
                            </tr>
                            <tr className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-dseza-light-secondary-bg'}`}>
                                <td className={`p-3 border font-semibold ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>III</td>
                                <td className={`p-3 border font-semibold ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>Đất đồi núi, hồ Hòa Trung, mương nước tưới tiêu và vành đai cây xanh cách ly</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>517,96</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}></td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}></td>
                            </tr>
                            <tr className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
                                <td colSpan={2} className={`p-3 border font-semibold text-center ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>∑ TỔNG CỘNG</td>
                                <td className={`p-3 border font-semibold ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>1.128,40</td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}></td>
                                <td className={`p-3 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}></td>
                            </tr>
                        </tbody>
                    </table>
                  </div>
                </section>
                
                <section>
                    <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>5. Giá cho thuê lại đất và tiền sử dụng hạ tầng</h2>
                    <p className="mb-4">BẢNG GIÁ ĐẤT CÁC TUYẾN ĐƯỜNG TRONG KHU CÔNG NGHỆ CAO ĐÀ NẴNG</p>
                    <div className="overflow-x-auto">
                        <table className={`min-w-full border-collapse border text-sm ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                             <thead className={`${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`}>
                                <tr>
                                    <th rowSpan={2} className={`p-2 text-center align-middle font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>STT<br/>(1)</th>
                                    <th rowSpan={2} className={`p-2 text-center align-middle font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>Vị trí<br/>(2)</th>
                                    <th colSpan={3} className={`p-2 text-center align-middle font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>Căn cứ tính đơn giá</th>
                                    <th colSpan={2} className={`p-2 text-center align-middle font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>Đơn giá thuê đất (đồng/m²)</th>
                                </tr>
                                <tr>
                                    <th className={`p-2 text-center font-normal border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>Giá đất theo QĐ 06/2019/QĐ-UBND<br/>ngày 31/01/2019<br/>(3)</th>
                                    <th className={`p-2 text-center font-normal border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>Hệ số điều chỉnh QĐ 08/2019/QĐ-UBND<br/>ngày 01/02/2019<br/>(4)</th>
                                    <th className={`p-2 text-center font-normal border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>Tỷ lệ % theo QĐ 12/2019/QĐ-UBND<br/>ngày 14/02/2019<br/>(5)</th>
                                    <th className={`p-2 text-center font-normal border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>Trả 1 lần<br/>(50 năm)<br/>(6) = (3)x(4)x50/70</th>
                                    <th className={`p-2 text-center font-normal border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>Trả hàng năm<br/>(7) = (6)x(5)</th>
                                </tr>
                            </thead>
                            <tbody className={`${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                {dataGiaDat.flatMap((nhomDat) => [
                                <tr key={nhomDat.stt} className={`${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`}>
                                    <td className={`p-2 text-center font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>
                                        {nhomDat.stt}
                                    </td>
                                    <td colSpan={7} className={`p-2 font-semibold border ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text' : 'border-dseza-light-border text-dseza-light-main-text'}`}>
                                        {nhomDat.viTri}
                                    </td>
                                </tr>,
                                ...nhomDat.loaiDat.map((dat) => (
                                    <tr key={`${nhomDat.stt}-${dat.id}`} className={`${theme === 'dark' ? 'odd:bg-dseza-dark-main-bg even:bg-dseza-dark-secondary-bg hover:bg-dseza-dark-hover' : 'odd:bg-white even:bg-dseza-light-secondary hover:bg-dseza-light-hover'}`}>
                                        <td className={`p-2 text-center border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                            {dat.id}
                                        </td>
                                        <td className={`p-2 border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                            {dat.name}
                                        </td>
                                        <td className={`p-2 text-right border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                            {dat.giaDat}
                                        </td>
                                        <td className={`p-2 text-center border ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                            {dat.heSo}
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
                        <p className={`font-semibold ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>Lưu ý:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>Tiền sử dụng hạ tầng: 6.000đ/m2/năm (giá trị này chưa bao gồm thuế VAT)</li>
                            <li>Trường hợp diện tích tính thu tiền thuê đất của thửa đất hoặc khu đất có giá trị (tính theo giá đất trong Bảng giá đất) từ 30 tỷ đồng trở lên thì giá đất cụ thể tính thu tiền thuê đất được xác định theo các phương pháp so sánh trực tiếp, chiết trừ, thu nhập, thặng dư.</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h2 className={`font-montserrat text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>6. Bản đồ quy hoạch Khu CNC Đà Nẵng và tình hình sử dụng đất</h2>
                     <p className="mb-4">Tính đến tháng 7 năm 2020 (có file đính kèm)</p>
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

export default KhuCongNgheCaoDaNang;