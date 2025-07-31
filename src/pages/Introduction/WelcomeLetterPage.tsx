import React from 'react';
import { Link } from "react-router-dom";
import { 
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
 * WelcomeLetterContent component with multilingual support
 */
const WelcomeLetterContent: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4 text-justify">
      <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
        {t("welcome.greeting")}
      </p>
      <p className={`mb-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
        {t("welcome.introduction")}
      </p>
      <p className={`mb-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
        {t("welcome.paragraph1")}
      </p>
      <p className={`mb-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
        {t("welcome.paragraph2")}
      </p>
      <p className={`mb-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
        {t("welcome.paragraph3")}
      </p>
      <p className={`mb-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
        {t("welcome.paragraph4")}
      </p>
      <p className={`mb-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
        {t("welcome.paragraph5")}
      </p>
      <p className={`font-semibold text-right mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
        {t("welcome.closing")}
      </p>
      <p className={`font-semibold text-right ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
        {t("welcome.signature")}
      </p>
    </div>
  );
};

/**
 * WelcomeLetterPage component with comprehensive mobile and multilingual support
 * Responsive design that adapts to mobile (<768px) automatically
 */
const WelcomeLetterPage: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleDownload = () => {
    // Logic tải xuống - có thể tải PDF hoặc Word
    toast({
      title: t("welcome.downloadingTitle"),
      description: t("welcome.downloadingTitle"),
      variant: "default",
    });
    console.log('Downloading document...');
  };

  const handleShare = () => {
    // Logic chia sẻ
    if (navigator.share) {
      navigator.share({
        title: `${t("welcome.title")} - DSEZA`,
        text: t("welcome.introduction"),
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: t("welcome.shareSuccess"),
        description: t("welcome.shareSuccess"),
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
                  {t("welcome.title")}
                </span>
              </nav>
            </div>
            
            {/* Page Header - Mobile optimized */}
            <div className="text-center py-3">
              <h1 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {t("welcome.pageTitle")}
              </h1>
              <div className={`w-12 h-0.5 mx-auto mb-2 rounded-full ${theme === 'dark' ? 'bg-dseza-dark-primary' : 'bg-dseza-light-primary'}`}></div>
            </div>

            {/* Article Content - Mobile Card */}
            <Card className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
              <CardContent className="p-4">
                <div className={`prose prose-sm max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
                  <WelcomeLetterContent />
                </div>
              </CardContent>
            </Card>

            {/* Share Section - Mobile optimized */}
            <Card className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
              <CardContent className="p-4">
                <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  <Share2 className="h-4 w-4" />
                  {t("welcome.shareTitle")}
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleDownload}
                    className={`text-xs h-9 ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}`}
                  >
                    <Download className="w-3 h-3 mr-1" />
                    {t("welcome.download")}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleShare}
                    className={`text-xs h-9 ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}`}
                  >
                    <Share2 className="w-3 h-3 mr-1" />
                    {t("welcome.share")}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handlePrint}
                    className={`text-xs h-9 ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}`}
                  >
                    <Printer className="w-3 h-3 mr-1" />
                    {t("welcome.print")}
                  </Button>
                </div>
              </CardContent>
            </Card>

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
                {t("welcome.title")}
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
                {t("welcome.pageTitle")}
              </h1>
            </header>

            {/* Article Content */}
            <div className={`prose prose-lg max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
              <WelcomeLetterContent />
            </div>

            {/* Share Section */}
            <div className={`mt-12 pt-8 border-t ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
              <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                <Share2 className="h-5 w-5" />
                {t("welcome.shareTitle")}
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleDownload}
                  className={theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t("welcome.download")}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleShare}
                  className={theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  {t("welcome.share")}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handlePrint}
                  className={theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}
                >
                  <Printer className="w-4 h-4 mr-2" />
                  {t("welcome.print")}
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

export default WelcomeLetterPage; 