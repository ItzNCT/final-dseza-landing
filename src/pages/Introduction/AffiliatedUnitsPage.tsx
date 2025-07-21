import React from 'react';
import { Link } from "react-router-dom";
import { 
  Phone, 
  Mail, 
  Globe, 
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

export const AffiliatedUnitsPage = () => {
  const { theme } = useTheme();

  const handleDownload = () => {
    // Logic tải xuống - có thể tải PDF hoặc Word
    console.log('Downloading document...');
  };

  const handleShare = () => {
    // Logic chia sẻ
    if (navigator.share) {
      navigator.share({
        title: 'Đơn vị trực thuộc - DSEZA',
        text: 'Thông tin về các đơn vị trực thuộc Ban Quản lý Khu công nghệ cao và các khu công nghiệp Đà Nẵng',
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Đã sao chép link vào clipboard!');
    }
  };

  const handlePrint = () => {
    // Logic in trang
    window.print();
  };

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
                to="/gioi-thieu/gioi-thieu-chung/tong-quan-ve-ban-quan-ly" 
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Tổng quan về Ban Quản lý
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Đơn vị trực thuộc
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
                Đơn vị trực thuộc
              </h1>
              

            </header>

            {/* Article Content */}
            <div className={`prose prose-lg max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
              <div className="space-y-10 text-justify">
                
                {/* I. CÁC ĐƠN VỊ TRỰC THUỘC */}
                <section>
                  <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                    I. CÁC ĐƠN VỊ TRỰC THUỘC
                  </h2>
                  
                  <div className="space-y-8">
                    {/* 1. Trung tâm Dịch vụ Tổng hợp Khu công nghệ cao Đà Nẵng */}
                    <div>
                      <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                        1. Trung tâm Dịch vụ Tổng hợp Khu công nghệ cao Đà Nẵng
                      </h3>
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'}`}>
                        <p className={`text-sm italic ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                          Thông tin chi tiết đang được cập nhật...
                        </p>
                      </div>
                    </div>

                    {/* 2. Công ty Phát triển và Khai thác hạ tầng Khu Công nghiệp Đà Nẵng */}
                    <div>
                      <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                        2. Công ty Phát triển và Khai thác hạ tầng Khu Công nghiệp Đà Nẵng
                      </h3>
                      
                      {/* Thông tin công ty */}
                      <div className={`p-4 rounded-lg mb-4 border ${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'}`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <Phone className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>Địa chỉ:</strong> Số 58 Nguyễn Chí Thanh, quận Hải Châu, Thành phố Đà Nẵng
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>Điện thoại:</strong> 0236-3.886.159
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>Fax:</strong> 0236-3.886.157
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>Email:</strong> daizico@danang.gov.vn
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Thông tin lãnh đạo */}
                      <div className="space-y-6">
                        {/* Giám đốc */}
                        <div>
                          <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                            * Ông Nguyễn Trọng Cường - Giám đốc
                          </h4>
                          <div className={`border rounded-lg overflow-hidden shadow-sm ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
                            <table className="w-full">
                              <tbody>
                                <tr className={`border-b ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                  <td className={`p-3 font-medium ${theme === 'dark' ? 'bg-dseza-dark-secondary/50 text-dseza-dark-main-text' : 'bg-dseza-light-secondary/50 text-dseza-light-main-text'}`}>
                                    Điện thoại văn phòng
                                  </td>
                                  <td className={`p-3 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                    (0236) 3886169
                                  </td>
                                </tr>
                                <tr className={`border-b ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                  <td className={`p-3 font-medium ${theme === 'dark' ? 'bg-dseza-dark-secondary/50 text-dseza-dark-main-text' : 'bg-dseza-light-secondary/50 text-dseza-light-main-text'}`}>
                                    Điện thoại di động
                                  </td>
                                  <td className={`p-3 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                    0914000818
                                  </td>
                                </tr>
                                <tr>
                                  <td className={`p-3 font-medium ${theme === 'dark' ? 'bg-dseza-dark-secondary/50 text-dseza-dark-main-text' : 'bg-dseza-light-secondary/50 text-dseza-light-main-text'}`}>
                                    Email
                                  </td>
                                  <td className={`p-3 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                    cuongnt2@danang.gov.vn
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Phó Giám đốc */}
                        <div>
                          <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                            * Bà Trần Thu Hương - Phó Giám đốc
                          </h4>
                          <div className={`border rounded-lg overflow-hidden shadow-sm ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
                            <table className="w-full">
                              <tbody>
                                <tr className={`border-b ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                  <td className={`p-3 font-medium ${theme === 'dark' ? 'bg-dseza-dark-secondary/50 text-dseza-dark-main-text' : 'bg-dseza-light-secondary/50 text-dseza-light-main-text'}`}>
                                    Điện thoại văn phòng
                                  </td>
                                  <td className={`p-3 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                    (0236) 3840359
                                  </td>
                                </tr>
                                <tr className={`border-b ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                  <td className={`p-3 font-medium ${theme === 'dark' ? 'bg-dseza-dark-secondary/50 text-dseza-dark-main-text' : 'bg-dseza-light-secondary/50 text-dseza-light-main-text'}`}>
                                    Điện thoại di động
                                  </td>
                                  <td className={`p-3 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                    0905163169
                                  </td>
                                </tr>
                                <tr>
                                  <td className={`p-3 font-medium ${theme === 'dark' ? 'bg-dseza-dark-secondary/50 text-dseza-dark-main-text' : 'bg-dseza-light-secondary/50 text-dseza-light-main-text'}`}>
                                    Email
                                  </td>
                                  <td className={`p-3 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                    huongtt1@danang.gov.vn
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* II. CÁC ĐƠN VỊ CHỦ ĐẦU TƯ KINH DOANH HẠ TẦNG TẠI CÁC KHU CÔNG NGHIỆP */}
                <section>
                  <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                    II. CÁC ĐƠN VỊ CHỦ ĐẦU TƯ KINH DOANH HẠ TẦNG TẠI CÁC KHU CÔNG NGHIỆP
                  </h2>
                  
                  <div className="space-y-8">
                    {/* 1. Công ty cổ phần Đầu tư Sài gòn-Đà Nẵng */}
                    <div>
                      <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                        1. Công ty cổ phần Đầu tư Sài gòn-Đà Nẵng
                      </h3>
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'}`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <Phone className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>Địa chỉ:</strong> 61A Nguyễn Văn Cừ, TP Đà Nẵng
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>Điện thoại:</strong> (0236) 3 770998
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>Fax:</strong> (0236) 3770 997
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>Website:</strong> www.dananginvest.com
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>Email:</strong> info@dananginvest.com
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2. Công ty TNHH Massda Land */}
                    <div>
                      <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                        2. Công ty TNHH Massda Land
                      </h3>
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'}`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <Phone className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>Địa chỉ:</strong> KCN Đà Nẵng, quận Sơn Trà, Thành phố Đà Nẵng
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>Điện thoại:</strong> (0236) 3.844.375
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>Fax:</strong> (0236) 3.844.374
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>Email:</strong> massda@dng.vnn.vn
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 3. Công ty Cổ phần Đầu tư khu công nghiệp Hòa Cầm */}
                    <div>
                      <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                        3. Công ty Cổ phần Đầu tư khu công nghiệp Hòa Cầm
                      </h3>
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'}`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <Phone className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>Địa chỉ:</strong> Số 176 đường 3/2, quận Hải Châu, thành phố Đà Nẵng
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>Điện thoại:</strong> (0236) 2 466 467
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>Fax:</strong> (0236) 3 898 077
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>Website:</strong> www.hoacamizi.com.vn
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>Email:</strong> hoacamizi@vnn.vn
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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