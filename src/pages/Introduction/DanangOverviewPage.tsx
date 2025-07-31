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
 * DanangOverviewContent component with multilingual support
 */
const DanangOverviewContent: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  
  return (
    <div className="space-y-8 text-justify">
      {/* Section 1 - Area, Population, Administrative Units */}
      <section>
        <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
          {t("danangOverview.section1Title")}
        </h2>
        <div className="space-y-4">
          <p className={`mb-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
            {t("danangOverview.section1Content")}
          </p>
          <ul className="space-y-2 ml-6">
            <li><strong>{t("danangOverview.area")}:</strong> {t("danangOverview.areaValue")}</li>
            <li><strong>{t("danangOverview.population")}:</strong> {t("danangOverview.populationValue")}</li>
            <li><strong>{t("danangOverview.density")}:</strong> {t("danangOverview.densityValue")}</li>
            <li><strong>{t("danangOverview.administrative")}:</strong> {t("danangOverview.administrativeValue")}</li>
          </ul>
          <p className={`text-sm italic ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
            {t("danangOverview.sourceWikipedia")}
          </p>
        </div>
      </section>

      {/* Section 2 - Climate */}
      <section>
        <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
          {t("danangOverview.section2Title")}
        </h2>
        <div className="space-y-4">
          <p className={`mb-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
            {t("danangOverview.section2Content")}
          </p>
          <ul className="space-y-2 ml-6">
            <li>{t("danangOverview.seasons")}</li>
            <li><strong>{t("danangOverview.temperature")}:</strong> {t("danangOverview.temperatureValue")}</li>
            <li><strong>{t("danangOverview.humidity")}:</strong> {t("danangOverview.humidityValue")}</li>
            <li><strong>{t("danangOverview.rainfall")}:</strong> {t("danangOverview.rainfallValue")}</li>
            <li><strong>{t("danangOverview.sunshine")}:</strong> {t("danangOverview.sunshineValue")}</li>
          </ul>
          <p className={`text-sm italic ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
            {t("danangOverview.sourceWikipedia")}
          </p>
        </div>
      </section>

      {/* Section 3 - Economic Indicators */}
      <section>
        <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
          {t("danangOverview.section3Title")}
        </h2>
        <div className="space-y-4">
          <ul className="space-y-3 ml-6">
            <li><strong>{t("danangOverview.gdpGrowth")}:</strong> {t("danangOverview.gdpGrowthValue")}</li>
            <li><strong>{t("danangOverview.income")}:</strong> {t("danangOverview.incomeValue")}</li>
            <li><strong>{t("danangOverview.investment")}:</strong> {t("danangOverview.investmentValue")}</li>
            <li>
              <strong>{t("danangOverview.tourism")}:</strong>
              <ul className="mt-2 ml-4 space-y-1">
                <li>+ {t("danangOverview.tourismRevenue")}</li>
                <li>+ {t("danangOverview.touristCount")}</li>
              </ul>
            </li>
          </ul>
          <p className={`text-sm italic ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
            {t("danangOverview.sourceDanangStats")}
          </p>
        </div>
      </section>

      {/* Section 4 - Investment Attractions */}
      <section>
        <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
          {t("danangOverview.section4Title")}
        </h2>
        <div className="space-y-6">
          {/* Strategic Location */}
          <div>
            <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
              {t("danangOverview.locationTitle")}
            </h3>
            <ul className="space-y-2 ml-6">
              <li>{t("danangOverview.locationContent1")}</li>
              <li>{t("danangOverview.locationContent2")}</li>
              <li>{t("danangOverview.locationContent3")}</li>
              <li>{t("danangOverview.locationContent4")}</li>
            </ul>
          </div>

          {/* Infrastructure */}
          <div>
            <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
              {t("danangOverview.infraTitle")}
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">{t("danangOverview.portTitle")}</h4>
                <ul className="ml-6 space-y-1">
                  <li>+ {t("danangOverview.portContent1")}</li>
                  <li>+ {t("danangOverview.portContent2")}</li>
                  <li>+ {t("danangOverview.portContent3")}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{t("danangOverview.airportTitle")}</h4>
                <p className="ml-6">{t("danangOverview.airportContent")}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{t("danangOverview.roadTitle")}</h4>
                <p className="ml-6">{t("danangOverview.roadContent")}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{t("danangOverview.utilityTitle")}</h4>
                <p className="ml-6">{t("danangOverview.utilityContent")}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{t("danangOverview.commTitle")}</h4>
                <p className="ml-6">{t("danangOverview.commContent")}</p>
              </div>
            </div>
          </div>

          {/* Investment Environment */}
          <div>
            <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
              {t("danangOverview.envTitle")}
            </h3>
            <ul className="space-y-2 ml-6">
              <li>{t("danangOverview.envContent1")}</li>
              <li>{t("danangOverview.envContent2")}</li>
              <li>{t("danangOverview.envContent3")}</li>
              <li>{t("danangOverview.envContent4")}</li>
            </ul>
          </div>

          {/* Human Resources */}
          <div>
            <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
              {t("danangOverview.hrTitle")}
            </h3>
            <div className="space-y-3">
              <p>{t("danangOverview.hrContent1")}</p>
              <ul className="ml-6 space-y-1">
                <li>{t("danangOverview.hrTech")}</li>
                <li>{t("danangOverview.hrMid")}</li>
                <li>{t("danangOverview.hrHigh")}</li>
                <li>{t("danangOverview.hrOther")}</li>
              </ul>
              <p>{t("danangOverview.hrContent2")}</p>
            </div>
          </div>

          {/* Living Environment */}
          <div>
            <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
              {t("danangOverview.livingTitle")}
            </h3>
            <ul className="space-y-2 ml-6">
              <li>{t("danangOverview.livingContent1")}</li>
              <li>{t("danangOverview.livingContent2")}</li>
              <li>{t("danangOverview.livingContent3")}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 5 - FDI */}
      <section>
        <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
          {t("danangOverview.section5Title")}
        </h2>
        <div className="space-y-4">
          <p className={`mb-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
            {t("danangOverview.section5Content")}
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-dseza-dark-secondary/20' : 'bg-dseza-light-secondary/20'}`}>
              <h4 className="font-semibold mb-2">{t("danangOverview.fdiCapitalTitle")}</h4>
            </div>
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-dseza-dark-secondary/20' : 'bg-dseza-light-secondary/20'}`}>
              <h4 className="font-semibold mb-2">{t("danangOverview.fdiProjectTitle")}</h4>
            </div>
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-dseza-dark-secondary/20' : 'bg-dseza-light-secondary/20'}`}>
              <h4 className="font-semibold mb-2">{t("danangOverview.fdiSectorTitle")}</h4>
            </div>
          </div>
          <p className={`text-sm italic ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
            {t("danangOverview.sourceDseza")}
          </p>
        </div>
      </section>
    </div>
  );
};

/**
 * DanangOverviewPage component with comprehensive mobile and multilingual support
 * Responsive design that adapts to mobile (<768px) automatically
 */
const DanangOverviewPage: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: t("danangOverview.downloadingTitle"),
      description: t("danangOverview.downloadingTitle"),
      variant: "default",
    });
    console.log('Downloading document...');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${t("danangOverview.title")} - DSEZA`,
        text: t("danangOverview.pageTitle"),
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: t("danangOverview.shareSuccess"),
        description: t("danangOverview.shareSuccess"),
        variant: "default",
      });
    }
  };

  const handlePrint = () => {
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
                  {t("danangOverview.title")}
                </span>
              </nav>
            </div>
            
            {/* Page Header - Mobile optimized */}
            <div className="text-center py-3">
              <h1 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {t("danangOverview.pageTitle")}
              </h1>
              <div className={`w-12 h-0.5 mx-auto mb-2 rounded-full ${theme === 'dark' ? 'bg-dseza-dark-primary' : 'bg-dseza-light-primary'}`}></div>
            </div>

            {/* Article Content - Mobile Cards */}
            <div className="space-y-4">
              
              {/* Section 1 - Area, Population, Administrative Units */}
              <Card className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
                <CardContent className="p-4">
                  <h2 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                    {t("danangOverview.section1Title")}
                  </h2>
                  <div className="space-y-3 text-sm">
                    <p className={theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}>
                      {t("danangOverview.section1Content")}
                    </p>
                    <div className="space-y-1">
                      <div><strong>{t("danangOverview.area")}:</strong> {t("danangOverview.areaValue")}</div>
                      <div><strong>{t("danangOverview.population")}:</strong> 1.046.876 người</div>
                      <div><strong>{t("danangOverview.density")}:</strong> {t("danangOverview.densityValue")}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 2 - Climate */}
              <Card className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
                <CardContent className="p-4">
                  <h2 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                    {t("danangOverview.section2Title")}
                  </h2>
                  <div className="space-y-3 text-sm">
                    <p className={theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}>
                      {t("danangOverview.section2Content")}
                    </p>
                    <div className="space-y-1">
                      <div><strong>{t("danangOverview.temperature")}:</strong> 25,9°C</div>
                      <div><strong>{t("danangOverview.humidity")}:</strong> {t("danangOverview.humidityValue")}</div>
                      <div><strong>{t("danangOverview.rainfall")}:</strong> {t("danangOverview.rainfallValue")}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 3 - Economic Indicators */}
              <Card className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
                <CardContent className="p-4">
                  <h2 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                    {t("danangOverview.section3Title")}
                  </h2>
                  <div className="space-y-2 text-sm">
                    <div><strong>{t("danangOverview.gdpGrowth")}:</strong> {t("danangOverview.gdpGrowthValue")}</div>
                    <div><strong>{t("danangOverview.income")}:</strong> 56,3 triệu đồng/người/năm</div>
                    <div><strong>Dự án FDI:</strong> 322 dự án (3,389 tỷ USD)</div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 4 - Investment Attractions */}
              <Card className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
                <CardContent className="p-4">
                  <h2 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                    {t("danangOverview.section4Title")}
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                        {t("danangOverview.locationTitle")}
                      </h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                        Cách Hà Nội 764km, cách TP.HCM 964km, là cửa ngõ ra biển của Tây Nguyên.
                      </p>
                    </div>
                    <div>
                      <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                        {t("danangOverview.infraTitle")}
                      </h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                        Cảng Tiên Sa, Sân bay quốc tế, hệ thống giao thông hiện đại.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Share Section - Mobile optimized */}
              <Card className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
                <CardContent className="p-4">
                  <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                    <Share2 className="h-4 w-4" />
                    {t("danangOverview.shareTitle")}
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleDownload}
                      className={`text-xs h-9 ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}`}
                    >
                      <Download className="w-3 h-3 mr-1" />
                      {t("danangOverview.download")}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleShare}
                      className={`text-xs h-9 ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}`}
                    >
                      <Share2 className="w-3 h-3 mr-1" />
                      {t("danangOverview.share")}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handlePrint}
                      className={`text-xs h-9 ${theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}`}
                    >
                      <Printer className="w-3 h-3 mr-1" />
                      {t("danangOverview.print")}
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
                {t("danangOverview.title")}
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
                {t("danangOverview.pageTitle")}
              </h1>
            </header>

            {/* Article Content */}
            <div className={`prose prose-lg max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
              <DanangOverviewContent />
            </div>

            {/* Share Section */}
            <div className={`mt-12 pt-8 border-t ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
              <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                <Share2 className="h-5 w-5" />
                {t("danangOverview.shareTitle")}
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleDownload}
                  className={theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t("danangOverview.download")}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleShare}
                  className={theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  {t("danangOverview.share")}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handlePrint}
                  className={theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}
                >
                  <Printer className="w-4 h-4 mr-2" />
                  {t("danangOverview.print")}
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

export default DanangOverviewPage; 