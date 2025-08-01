import React from 'react';
import { Link } from "react-router-dom";
import { 
  Phone, 
  Mail, 
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
 * DepartmentsPage component with comprehensive mobile and multilingual support
 * Responsive design that adapts to mobile (<768px) automatically
 */
export const DepartmentsPage = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleDownload = () => {
    // Logic tải xuống - có thể tải PDF hoặc Word
    toast({
      title: t("departments.downloadingTitle"),
      description: t("departments.downloadingTitle"),
      variant: "default",
    });
    console.log('Downloading document...');
  };

  const handleShare = () => {
    // Logic chia sẻ
    if (navigator.share) {
      navigator.share({
        title: `${t("departments.title")} - DSEZA`,
        text: t("departments.pageTitle"),
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: t("departments.shareSuccess"),
        description: t("departments.shareSuccess"),
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
                <span className={`${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                  {t("departments.breadcrumbGeneral")}
                </span>
                <ChevronRight className="h-2.5 w-2.5" />
                <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  {t("departments.title")}
                </span>
              </nav>
            </div>
            
            {/* Page Header - Mobile optimized */}
            <div className="text-center py-3">
              <h1 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {t("departments.pageTitle")}
              </h1>
              <div className={`w-12 h-0.5 mx-auto mb-2 rounded-full ${theme === 'dark' ? 'bg-dseza-dark-primary' : 'bg-dseza-light-primary'}`}></div>
            </div>

            {/* Article Content - Mobile Cards */}
            <div className="space-y-4">
              
              {/* Office Section */}
              <Card className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
                <CardContent className="p-4">
                  <h2 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                    {t("departments.office.title")}
                  </h2>
                  <div className={`p-3 rounded-lg mb-4 ${theme === 'dark' ? 'bg-dseza-dark-main-bg/30' : 'bg-dseza-light-main-bg/30'}`}>
                    <div className="space-y-2 text-sm">
                      <div><strong>Tel:</strong> 0236 3830017</div>
                      <div><strong>Fax:</strong> 0236 3830015</div>
                      <div><strong>Email:</strong> dhpiza@danang.gov.vn</div>
                      <div><strong>{t("departments.office.documentReceiving")}:</strong> 0236.3881888 (nhánh 830)</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                      <strong>{t("departments.office.mainFunction")}</strong>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Investment Management Department */}
              <Card className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
                <CardContent className="p-4">
                  <h2 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                    {t("departments.investmentDept.title")}
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                        {t("departments.investmentDept.function")}
                      </h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                        {t("departments.investmentDept.functionDesc")}
                      </p>
                    </div>
                    <div>
                      <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                        {t("departments.investmentDept.duties")}
                      </h3>
                      <ul className={`text-sm space-y-1 list-disc list-inside ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                        {t("departments.investmentDept.dutiesDesc").split(", ").map((duty, index) => (
                          <li key={index}>{duty}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business and Labor Management */}
              <Card className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
                <CardContent className="p-4">
                  <h2 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                    {t("departments.businessDept.title")}
                  </h2>
                  <div className="space-y-2">
                    <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                      <strong>{t("departments.businessDept.duties")}</strong>
                    </p>
                    <ul className={`text-sm space-y-1 list-disc list-inside ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                      {t("departments.businessDept.dutiesDesc").split(", ").map((duty, index) => (
                        <li key={index}>{duty}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Planning and Construction */}
              <Card className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
                <CardContent className="p-4">
                  <h2 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                    {t("departments.planningDept.title")}
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                        {t("departments.planningDept.function")}
                      </h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                        {t("departments.planningDept.functionDesc")}
                      </p>
                    </div>
                    <div>
                      <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                        {t("departments.planningDept.duties")}
                      </h3>
                      <ul className={`text-sm space-y-1 list-disc list-inside ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                        {t("departments.planningDept.dutiesDesc").split(", ").map((duty, index) => (
                          <li key={index}>{duty}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Environment and Technology */}
              <Card className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
                <CardContent className="p-4">
                  <h2 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                    {t("departments.environmentDept.title")}
                  </h2>
                  <div className="space-y-2">
                    <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                      <strong>{t("departments.environmentDept.duties")}</strong>
                    </p>
                    <ul className={`text-sm space-y-1 list-disc list-inside ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                      {t("departments.environmentDept.dutiesDesc").split(", ").map((duty, index) => (
                        <li key={index}>{duty}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Share Section - Mobile optimized */}
              <Card className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
                <CardContent className="p-4">
                  <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                    <Share2 className="h-4 w-4" />
                    {t("departments.shareTitle")}
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleDownload}
                      className={`text-xs h-9 ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}`}
                    >
                      <Download className="w-3 h-3 mr-1" />
                      {t("departments.download")}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleShare}
                      className={`text-xs h-9 ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}`}
                    >
                      <Share2 className="w-3 h-3 mr-1" />
                      {t("departments.share")}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handlePrint}
                      className={`text-xs h-9 ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}`}
                    >
                      <Printer className="w-3 h-3 mr-1" />
                      {t("departments.print")}
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
              <Link 
                to={language === 'vi' ? '/vi/gioi-thieu/gioi-thieu-chung/tong-quan-ve-ban-quan-ly' : '/en/introduction/general-introduction/overview-of-management-board'} 
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {t("departments.breadcrumbGeneral")}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {t("departments.title")}
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
                {t("departments.pageTitle")}
              </h1>
              

            </header>

            {/* Article Content */}
            <div className={`prose prose-lg max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
              <div className="space-y-10 text-justify">
                
                {/* I. VĂN PHÒNG */}
                <section>
                  <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                    {t("departments.office.title")}
                  </h2>
                  
                  {/* Thông tin liên hệ */}
                  <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-dseza-dark-secondary/20' : 'bg-dseza-light-secondary/20'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Phone className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                          <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>Tel:</strong> 0236 3830017
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                          <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>Fax:</strong> 0236 3830015
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                          <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>Email:</strong> dhpiza@danang.gov.vn
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className={`w-4 h-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                          <strong className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>{t("departments.office.documentReceiving")}:</strong> 0236.3881888, nhánh 830
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {t("departments.office.detailedDuties").map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className={`font-medium text-sm mt-1 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                          {index + 1}.
                        </span>
                        <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* II. PHÒNG QUẢN LÝ, XÚC TIẾN VÀ HỖ TRỢ ĐẦU TƯ */}
                <section>
                  <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                    {t("departments.investmentDept.title")}
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                        1. {t("departments.investmentDept.function")}
                      </h3>
                      <p className={`mb-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                        {t("departments.investmentDept.fullFunctionDesc")}
                      </p>
                    </div>

                    <div>
                      <h3 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                        2. {t("departments.investmentDept.duties")}
                      </h3>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                            {t("departments.investmentDept.detailedSections.investmentPromotion.title")}
                          </h4>
                          <ul className={`space-y-2 ml-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                            {t("departments.investmentDept.detailedSections.investmentPromotion.duties").map((duty, index) => (
                              <li key={index} className="text-sm">{duty}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                            {t("departments.investmentDept.detailedSections.investmentCertificate.title")}
                          </h4>
                          <p className={`text-sm ml-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                            {t("departments.investmentDept.detailedSections.investmentCertificate.description")}
                          </p>
                        </div>

                        <div>
                          <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                            {t("departments.investmentDept.detailedSections.projectManagement.title")}
                          </h4>
                          <ul className={`space-y-2 ml-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                            {t("departments.investmentDept.detailedSections.projectManagement.duties").map((duty, index) => (
                              <li key={index} className="text-sm">{duty}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                            {t("departments.investmentDept.detailedSections.investorSupport.title")}
                          </h4>
                          <ul className={`space-y-2 ml-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                            {t("departments.investmentDept.detailedSections.investorSupport.duties").map((duty, index) => (
                              <li key={index} className="text-sm">{duty}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                            {t("departments.investmentDept.detailedSections.internationalCooperation.title")}
                          </h4>
                          <ul className={`space-y-2 ml-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                            {t("departments.investmentDept.detailedSections.internationalCooperation.duties").map((duty, index) => (
                              <li key={index} className="text-sm">{duty}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* III. PHÒNG QUẢN LÝ DOANH NGHIỆP VÀ LAO ĐỘNG */}
                <section>
                  <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                    {t("departments.businessDept.title")}
                  </h2>
                  
                  <div className="space-y-3">
                    {t("departments.businessDept.detailedDuties").map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className={`font-medium text-sm mt-1 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                          {index + 1}.
                        </span>
                        <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* IV. PHÒNG QUẢN LÝ QUY HOẠCH VÀ XÂY DỰNG */}
                <section>
                  <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                    {t("departments.planningDept.title")}
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                        1. {t("departments.planningDept.function")}
                      </h3>
                      <p className={`mb-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                        {t("departments.planningDept.fullFunctionDesc")}
                      </p>
                    </div>

                    <div>
                      <h3 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                        2. {t("departments.planningDept.duties")}
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                            {t("departments.planningDept.detailedSections.planningArchitecture.title")}
                          </h4>
                          <p className={`text-sm ml-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                            {t("departments.planningDept.detailedSections.planningArchitecture.description")}
                          </p>
                        </div>

                        <div>
                          <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                            {t("departments.planningDept.detailedSections.constructionManagement.title")}
                          </h4>
                          <p className={`text-sm ml-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                            {t("departments.planningDept.detailedSections.constructionManagement.description")}
                          </p>
                        </div>

                        <div>
                          <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                            {t("departments.planningDept.detailedSections.landManagement.title")}
                          </h4>
                          <p className={`text-sm ml-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                            {t("departments.planningDept.detailedSections.landManagement.description")}
                          </p>
                        </div>

                        <div>
                          <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                            {t("departments.planningDept.detailedSections.decentralizedTasks.title")}
                          </h4>
                          <p className={`text-sm ml-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                            {t("departments.planningDept.detailedSections.decentralizedTasks.description")}
                          </p>
                        </div>

                        <div>
                          <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                            {t("departments.planningDept.detailedSections.firePreventionRescue.title")}
                          </h4>
                        </div>

                        <div>
                          <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                            {t("departments.planningDept.detailedSections.otherTasks.title")}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* V. PHÒNG QUẢN LÝ MÔI TRƯỜNG, KHOA HỌC - CÔNG NGHỆ VÀ ƯƠM TẠO */}
                <section>
                  <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                    {t("departments.environmentDept.fullTitle")}
                  </h2>
                  
                  <div className="space-y-3">
                    {t("departments.environmentDept.detailedDuties").map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className={`font-medium text-sm mt-1 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                          {index + 1}.
                        </span>
                        <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Share Section */}
            <div className={`mt-12 pt-8 border-t ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
              <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                <Share2 className="h-5 w-5" />
                {t("departments.shareTitle")}
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  {t("departments.download")}
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  {t("departments.share")}
                </Button>
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  <Printer className="w-4 h-4 mr-2" />
                  {t("departments.print")}
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