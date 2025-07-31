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
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/utils/translations";
import { useIsMobile } from "@/hooks/use-mobile";
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MobileLayout from "@/components/mobile/MobileLayout";
import { useToast } from "@/hooks/use-toast";

/**
 * AffiliatedUnitsPage component with comprehensive mobile and multilingual support
 * Responsive design that adapts to mobile (<768px) automatically
 */
export const AffiliatedUnitsPage: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleDownload = () => {
    // Logic tải xuống - có thể tải PDF hoặc Word
    toast({
      title: t("affiliatedUnits.downloadingTitle"),
      description: t("affiliatedUnits.downloadingTitle"),
      variant: "default",
    });
    console.log('Downloading document...');
  };

  const handleShare = () => {
    // Logic chia sẻ
    if (navigator.share) {
      navigator.share({
        title: `${t("affiliatedUnits.title")} - DSEZA`,
        text: t("affiliatedUnits.pageTitle"),
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: t("affiliatedUnits.shareSuccess"),
        description: t("affiliatedUnits.shareSuccess"),
        variant: "default",
      });
    }
  };

  const handlePrint = () => {
    // Logic in trang
    window.print();
  };

  // Mobile Layout
  if (isMobile) {
    return (
      <MobileLayout>
        <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
          {/* Main Content - Mobile optimized */}
          <main className="flex-1 px-4 py-4 space-y-4">
            
            {/* Mobile Breadcrumb */}
            <div className={`py-1 px-2 rounded-lg ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg/50' : 'bg-dseza-light-secondary-bg/50'}`}>
              <nav className={`flex items-center space-x-1 text-xs ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                <Link 
                  to={`/${language}`} 
                  className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
                >
                  {t("common.home")}
                </Link>
                <ChevronRight className="h-2.5 w-2.5" />
                <span className={`${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                  {t("nav.intro")}
                </span>
                <ChevronRight className="h-2.5 w-2.5" />
                <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  {t("affiliatedUnits.title")}
                </span>
              </nav>
            </div>
            
            {/* Page Header - Mobile optimized */}
            <div className="text-center py-3">
              <h1 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {t("affiliatedUnits.pageTitle")}
              </h1>
              <div className={`w-12 h-0.5 mx-auto mb-2 rounded-full ${theme === 'dark' ? 'bg-dseza-dark-primary' : 'bg-dseza-light-primary'}`}></div>
            </div>

            {/* Article Content - Mobile Cards */}
            <div className="space-y-4">
              
              {/* Section 1 - Direct Units */}
              <Card className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
                <CardContent className="p-4">
                  <h2 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                    {t("affiliatedUnits.section1Title")}
                  </h2>
                  
                  <div className="space-y-4">
                    {/* Unit 1 */}
                    <div>
                      <h3 className={`text-base font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                        1. {t("affiliatedUnits.unit1Name")}
                      </h3>
                      <div className={`p-3 rounded-lg border ${theme === 'dark' ? 'bg-dseza-dark-main-bg/30 border-dseza-dark-border' : 'bg-dseza-light-main-bg/30 border-dseza-light-border'}`}>
                        <p className={`text-sm italic ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                          {t("affiliatedUnits.updateInfo")}
                        </p>
                      </div>
                    </div>

                    {/* Unit 2 */}
                    <div>
                      <h3 className={`text-base font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                        2. {t("affiliatedUnits.unit2Name")}
                      </h3>
                      <div className={`p-3 rounded-lg border space-y-2 ${theme === 'dark' ? 'bg-dseza-dark-main-bg/30 border-dseza-dark-border' : 'bg-dseza-light-main-bg/30 border-dseza-light-border'}`}>
                        <div className="space-y-1 text-sm">
                          <div><strong>{t("affiliatedUnits.address")}:</strong> Số 58 Nguyễn Chí Thanh, quận Hải Châu, TP Đà Nẵng</div>
                          <div><strong>{t("affiliatedUnits.phone")}:</strong> 0236-3.886.159</div>
                          <div><strong>{t("affiliatedUnits.fax")}:</strong> 0236-3.886.157</div>
                          <div><strong>{t("affiliatedUnits.email")}:</strong> daizico@danang.gov.vn</div>
                        </div>
                        
                        {/* Leadership Info - Mobile Compact */}
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                          <h4 className={`font-semibold text-sm mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                            Lãnh đạo chủ chốt:
                          </h4>
                          <div className="space-y-2 text-xs">
                            <div>
                              <strong>Giám đốc:</strong> Ông Nguyễn Trọng Cường
                              <div className="text-gray-600 dark:text-gray-400">📞 (0236) 3886169 | 📱 0914000818</div>
                            </div>
                            <div>
                              <strong>Phó Giám đốc:</strong> Bà Trần Thu Hương  
                              <div className="text-gray-600 dark:text-gray-400">📞 (0236) 3840359 | 📱 0905163169</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 2 - Infrastructure Investment Units */}
              <Card className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
                <CardContent className="p-4">
                  <h2 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                    {t("affiliatedUnits.section2Title")}
                  </h2>
                  
                  <div className="space-y-4">
                    {/* Unit 3 */}
                    <div>
                      <h3 className={`text-base font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                        1. {t("affiliatedUnits.unit3Name")}
                      </h3>
                      <div className={`p-3 rounded-lg border space-y-2 text-sm ${theme === 'dark' ? 'bg-dseza-dark-main-bg/30 border-dseza-dark-border' : 'bg-dseza-light-main-bg/30 border-dseza-light-border'}`}>
                        <div><strong>{t("affiliatedUnits.address")}:</strong> 61A Nguyễn Văn Cừ, TP Đà Nẵng</div>
                        <div><strong>{t("affiliatedUnits.phone")}:</strong> (0236) 3 770998</div>
                        <div><strong>{t("affiliatedUnits.fax")}:</strong> (0236) 3770 997</div>
                        <div><strong>{t("affiliatedUnits.website")}:</strong> www.dananginvest.com</div>
                        <div><strong>{t("affiliatedUnits.email")}:</strong> info@dananginvest.com</div>
                      </div>
                    </div>

                    {/* Unit 4 */}
                    <div>
                      <h3 className={`text-base font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                        2. {t("affiliatedUnits.unit4Name")}
                      </h3>
                      <div className={`p-3 rounded-lg border space-y-2 text-sm ${theme === 'dark' ? 'bg-dseza-dark-main-bg/30 border-dseza-dark-border' : 'bg-dseza-light-main-bg/30 border-dseza-light-border'}`}>
                        <div><strong>{t("affiliatedUnits.address")}:</strong> KCN Đà Nẵng, quận Sơn Trà, TP Đà Nẵng</div>
                        <div><strong>{t("affiliatedUnits.phone")}:</strong> (0236) 3.844.375</div>
                        <div><strong>{t("affiliatedUnits.fax")}:</strong> (0236) 3.844.374</div>
                        <div><strong>{t("affiliatedUnits.email")}:</strong> massda@dng.vnn.vn</div>
                      </div>
                    </div>

                    {/* Unit 5 */}
                    <div>
                      <h3 className={`text-base font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                        3. {t("affiliatedUnits.unit5Name")}
                      </h3>
                      <div className={`p-3 rounded-lg border space-y-2 text-sm ${theme === 'dark' ? 'bg-dseza-dark-main-bg/30 border-dseza-dark-border' : 'bg-dseza-light-main-bg/30 border-dseza-light-border'}`}>
                        <div><strong>{t("affiliatedUnits.address")}:</strong> Số 176 đường 3/2, quận Hải Châu, TP Đà Nẵng</div>
                        <div><strong>{t("affiliatedUnits.phone")}:</strong> (0236) 2 466 467</div>
                        <div><strong>{t("affiliatedUnits.fax")}:</strong> (0236) 3 898 077</div>
                        <div><strong>{t("affiliatedUnits.website")}:</strong> www.hoacamizi.com.vn</div>
                        <div><strong>{t("affiliatedUnits.email")}:</strong> hoacamizi@vnn.vn</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Share Section - Mobile optimized */}
              <Card className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
                <CardContent className="p-4">
                  <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                    <Share2 className="h-4 w-4" />
                    {t("affiliatedUnits.shareTitle")}
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleDownload}
                      className={`text-xs h-9 ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}`}
                    >
                      <Download className="w-3 h-3 mr-1" />
                      {t("affiliatedUnits.download")}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleShare}
                      className={`text-xs h-9 ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}`}
                    >
                      <Share2 className="w-3 h-3 mr-1" />
                      {t("affiliatedUnits.share")}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handlePrint}
                      className={`text-xs h-9 ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}`}
                    >
                      <Printer className="w-3 h-3 mr-1" />
                      {t("affiliatedUnits.print")}
                    </Button>
                  </div>
                </CardContent>
              </Card>

            </div>

          </main>

          {/* Footer */}
          <Footer />
        </div>
      </MobileLayout>
    );
  }

  // Desktop Layout (original but with multilingual support)
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
                to={`/${language}`} 
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {t("common.home")}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                {t("nav.intro")}
              </span>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {t("affiliatedUnits.title")}
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
                {t("affiliatedUnits.pageTitle")}
              </h1>
            </header>

            {/* Article Content */}
            <div className={`prose prose-lg max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
              <div className="space-y-10 text-justify">
                
                {/* I. CÁC ĐƠN VỊ TRỰC THUỘC */}
                <section>
                  <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                    {t("affiliatedUnits.section1Title")}
                  </h2>
                  
                  <div className="space-y-8">
                    {/* 1. Trung tâm Dịch vụ Tổng hợp Khu công nghệ cao Đà Nẵng */}
                    <div>
                      <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                        1. {t("affiliatedUnits.unit1Name")}
                      </h3>
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'}`}>
                        <p className={`text-sm italic ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                          {t("affiliatedUnits.updateInfo")}
                        </p>
                      </div>
                    </div>

                    {/* 2. Công ty Phát triển và Khai thác hạ tầng Khu Công nghiệp Đà Nẵng */}
                    <div>
                      <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                        2. {t("affiliatedUnits.unit2Name")}
                      </h3>
                      
                      {/* Thông tin công ty */}
                      <div className={`p-4 rounded-lg mb-4 border ${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'}`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <Phone className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>{t("affiliatedUnits.address")}:</strong> Số 58 Nguyễn Chí Thanh, quận Hải Châu, Thành phố Đà Nẵng
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>{t("affiliatedUnits.phone")}:</strong> 0236-3.886.159
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>{t("affiliatedUnits.fax")}:</strong> 0236-3.886.157
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>{t("affiliatedUnits.email")}:</strong> daizico@danang.gov.vn
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Thông tin lãnh đạo */}
                      <div className="space-y-6">
                        {/* Giám đốc */}
                        <div>
                          <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                            * Ông Nguyễn Trọng Cường - {t("affiliatedUnits.director")}
                          </h4>
                          <div className={`border rounded-lg overflow-hidden shadow-sm ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
                            <table className="w-full">
                              <tbody>
                                <tr className={`border-b ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                  <td className={`p-3 font-medium ${theme === 'dark' ? 'bg-dseza-dark-secondary/50 text-dseza-dark-main-text' : 'bg-dseza-light-secondary/50 text-dseza-light-main-text'}`}>
                                    {t("affiliatedUnits.officePhone")}
                                  </td>
                                  <td className={`p-3 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                    (0236) 3886169
                                  </td>
                                </tr>
                                <tr className={`border-b ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                  <td className={`p-3 font-medium ${theme === 'dark' ? 'bg-dseza-dark-secondary/50 text-dseza-dark-main-text' : 'bg-dseza-light-secondary/50 text-dseza-light-main-text'}`}>
                                    {t("affiliatedUnits.mobilePhone")}
                                  </td>
                                  <td className={`p-3 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                    0914000818
                                  </td>
                                </tr>
                                <tr>
                                  <td className={`p-3 font-medium ${theme === 'dark' ? 'bg-dseza-dark-secondary/50 text-dseza-dark-main-text' : 'bg-dseza-light-secondary/50 text-dseza-light-main-text'}`}>
                                    {t("affiliatedUnits.email")}
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
                            * Bà Trần Thu Hương - {t("affiliatedUnits.deputyDirector")}
                          </h4>
                          <div className={`border rounded-lg overflow-hidden shadow-sm ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
                            <table className="w-full">
                              <tbody>
                                <tr className={`border-b ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                  <td className={`p-3 font-medium ${theme === 'dark' ? 'bg-dseza-dark-secondary/50 text-dseza-dark-main-text' : 'bg-dseza-light-secondary/50 text-dseza-light-main-text'}`}>
                                    {t("affiliatedUnits.officePhone")}
                                  </td>
                                  <td className={`p-3 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                    (0236) 3840359
                                  </td>
                                </tr>
                                <tr className={`border-b ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                  <td className={`p-3 font-medium ${theme === 'dark' ? 'bg-dseza-dark-secondary/50 text-dseza-dark-main-text' : 'bg-dseza-light-secondary/50 text-dseza-light-main-text'}`}>
                                    {t("affiliatedUnits.mobilePhone")}
                                  </td>
                                  <td className={`p-3 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                    0905163169
                                  </td>
                                </tr>
                                <tr>
                                  <td className={`p-3 font-medium ${theme === 'dark' ? 'bg-dseza-dark-secondary/50 text-dseza-dark-main-text' : 'bg-dseza-light-secondary/50 text-dseza-light-main-text'}`}>
                                    {t("affiliatedUnits.email")}
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
                    {t("affiliatedUnits.section2Title")}
                  </h2>
                  
                  <div className="space-y-8">
                    {/* 1. Công ty cổ phần Đầu tư Sài gòn-Đà Nẵng */}
                    <div>
                      <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                        1. {t("affiliatedUnits.unit3Name")}
                      </h3>
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'}`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <Phone className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>{t("affiliatedUnits.address")}:</strong> 61A Nguyễn Văn Cừ, TP Đà Nẵng
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>{t("affiliatedUnits.phone")}:</strong> (0236) 3 770998
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>{t("affiliatedUnits.fax")}:</strong> (0236) 3770 997
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>{t("affiliatedUnits.website")}:</strong> www.dananginvest.com
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>{t("affiliatedUnits.email")}:</strong> info@dananginvest.com
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2. Công ty TNHH Massda Land */}
                    <div>
                      <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                        2. {t("affiliatedUnits.unit4Name")}
                      </h3>
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'}`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <Phone className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>{t("affiliatedUnits.address")}:</strong> KCN Đà Nẵng, quận Sơn Trà, Thành phố Đà Nẵng
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>{t("affiliatedUnits.phone")}:</strong> (0236) 3.844.375
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>{t("affiliatedUnits.fax")}:</strong> (0236) 3.844.374
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>{t("affiliatedUnits.email")}:</strong> massda@dng.vnn.vn
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 3. Công ty Cổ phần Đầu tư khu công nghiệp Hòa Cầm */}
                    <div>
                      <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                        3. {t("affiliatedUnits.unit5Name")}
                      </h3>
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'}`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <Phone className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>{t("affiliatedUnits.address")}:</strong> Số 176 đường 3/2, quận Hải Châu, thành phố Đà Nẵng
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>{t("affiliatedUnits.phone")}:</strong> (0236) 2 466 467
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>{t("affiliatedUnits.fax")}:</strong> (0236) 3 898 077
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>{t("affiliatedUnits.website")}:</strong> www.hoacamizi.com.vn
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>{t("affiliatedUnits.email")}:</strong> hoacamizi@vnn.vn
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
                {t("affiliatedUnits.shareTitle")}
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleDownload}
                  className={theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t("affiliatedUnits.download")}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleShare}
                  className={theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  {t("affiliatedUnits.share")}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handlePrint}
                  className={theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}
                >
                  <Printer className="w-4 h-4 mr-2" />
                  {t("affiliatedUnits.print")}
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