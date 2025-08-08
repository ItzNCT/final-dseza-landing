import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  ArrowRight,
  FileCheck,
  TrendingUp,
  Building,
  MapPin,
  Calendar,
  Users
} from 'lucide-react';
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";
import MobileLayout from "@/components/mobile/MobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InvestorGuidelinesPage = () => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const { language } = useLanguage();

  // Investor guidelines categories data with bilingual support
  const investorCategories = (
    language === 'en'
      ? [
        {
          id: 'investment-sector-procedures',
          title: 'Investment Sector Procedures',
          description: 'Detailed guidance on investment procedures and necessary steps for investors',
          icon: FileCheck,
          url: '/news/for-investors/investment-sector-procedures',
          color: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
          bgColor: theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'
        },
        {
          id: 'investment-incentive-sectors',
          title: 'Investment Incentive Sectors',
          description: 'Information on sectors encouraged for investment and special incentive policies',
          icon: TrendingUp,
          url: '/news/for-investors/investment-incentive-sectors',
          color: theme === 'dark' ? 'text-green-400' : 'text-green-600',
          bgColor: theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'
        }
      ]
      : [
    {
      id: 'quy-trinh-linh-vuc-dau-tu',
      title: 'Quy trình lĩnh vực đầu tư',
      description: 'Hướng dẫn chi tiết về quy trình, thủ tục đầu tư và các bước cần thiết cho nhà đầu tư',
      icon: FileCheck,
      url: '/tin-tuc/danh-cho-nha-dau-tu/quy-trinh-linh-vuc-dau-tu',
      color: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
      bgColor: theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'
    },
    {
      id: 'linh-vuc-khuyen-khich-dau-tu',
      title: 'Lĩnh vực khuyến khích đầu tư',
      description: 'Thông tin về các lĩnh vực được khuyến khích đầu tư và chính sách ưu đãi đặc biệt',
      icon: TrendingUp,
      url: '/tin-tuc/danh-cho-nha-dau-tu/linh-vuc-khuyen-khich-dau-tu',
      color: theme === 'dark' ? 'text-green-400' : 'text-green-600',
      bgColor: theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'
    }
  ]
  );

  // Quick access resources with bilingual support
  const quickResources = (
    language === 'en'
      ? [
        {
          title: 'Investment Handbook',
          description: 'Comprehensive document about investment at DSEZA',
          url: '/investment-handbook',
          icon: Building
        },
        {
          title: 'Incentive Policies',
          description: 'Detailed information on special incentive policies',
          url: '/investment-handbook/policies',
          icon: TrendingUp
        },
        {
          title: 'DSEZA Brochure',
          description: 'Overview introduction of DSEZA',
          url: '/investment-handbook/brochure',
          icon: FileCheck
        },
        {
          title: 'Contact for Support',
          description: 'Direct assistance for investors',
          url: '/contact',
          icon: Users
        }
      ]
      : [
    {
      title: 'Cẩm nang đầu tư',
      description: 'Tài liệu tổng hợp về đầu tư tại DSEZA',
      url: '/cam-nang-dau-tu',
      icon: Building
    },
    {
      title: 'Chính sách ưu đãi',
      description: 'Thông tin chi tiết về các chính sách ưu đãi',
      url: '/cam-nang-dau-tu/chinh-sach-uu-dai',
      icon: TrendingUp
    },
    {
      title: 'Brochure DSEZA',
      description: 'Giới thiệu tổng quan về DSEZA',
      url: '/cam-nang-dau-tu/brochure',
      icon: FileCheck
    },
    {
      title: 'Liên hệ tư vấn',
      description: 'Hỗ trợ trực tiếp cho nhà đầu tư',
      url: '/lien-he',
      icon: Users
    }
  ]
  );

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
                  to="/" 
                  className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
                >
                  {language === 'en' ? 'Home' : 'Trang chủ'}
                </Link>
                <ChevronRight className="h-2.5 w-2.5" />
                <Link 
                  to={language === 'en' ? '/news' : '/tin-tuc'} 
                  className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
                >
                  {language === 'en' ? 'News' : 'Tin tức'}
                </Link>
                <ChevronRight className="h-2.5 w-2.5" />
                <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  {language === 'en' ? 'For Investors' : 'Dành cho nhà đầu tư'}
                </span>
              </nav>
            </div>

            {/* Page Header - Mobile optimized */}
            <div className="text-center py-3">
              <h1 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {language === 'en' ? 'For Investors' : 'Dành Cho Nhà Đầu Tư'}
              </h1>
              <div className={`w-12 h-0.5 mx-auto mb-2 rounded-full ${theme === 'dark' ? 'bg-dseza-dark-primary' : 'bg-dseza-light-primary'}`}></div>
              <p className={`text-xs ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                Thông tin toàn diện về quy trình đầu tư và hỗ trợ tại DSEZA
              </p>
            </div>

            {/* Main Categories - Mobile single column */}
            <div className="space-y-4">
              {investorCategories.map((category) => {
                const IconComponent = category.icon;
                
                return (
                  <Link 
                    key={category.id}
                    to={category.url}
                    className="block group"
                  >
                    <Card className={`transition-all duration-200 active:scale-[0.98] ${
                      theme === 'dark' 
                        ? 'bg-dseza-dark-secondary border-dseza-dark-border' 
                        : 'bg-white border-dseza-light-border'
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${category.bgColor}`}>
                            <IconComponent className={`h-7 w-7 ${category.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className={`font-bold text-lg mb-2 ${
                              theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                            }`}>
                              {category.title}
                            </h3>
                            <p className={`text-sm leading-relaxed mb-3 ${
                              theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                            }`}>
                              {category.description}
                            </p>
                            <div className="flex items-center">
                              <span className={`text-sm font-medium ${category.color}`}>
                                Xem chi tiết
                              </span>
                              <ArrowRight className={`h-4 w-4 ml-2 transition-transform group-active:translate-x-1 ${category.color}`} />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {/* Quick Resources - Mobile grid */}
            <Card className={`${
              theme === 'dark' 
                ? 'bg-dseza-dark-secondary border-dseza-dark-border' 
                : 'bg-white border-dseza-light-border'
            }`}>
              <CardHeader className="pb-4">
                <CardTitle className={`text-lg text-center ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  Tài Liệu Hỗ Trợ
                </CardTitle>
                <p className={`text-sm text-center ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                  Các tài liệu và dịch vụ hỗ trợ nhà đầu tư
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {quickResources.map((resource, index) => {
                    const IconComponent = resource.icon;
                    
                    return (
                      <Link 
                        key={index}
                        to={resource.url}
                        className="block group"
                      >
                        <Card className={`h-full transition-all duration-200 active:scale-[0.98] ${
                          theme === 'dark' 
                            ? 'bg-dseza-dark-main-bg border-dseza-dark-border' 
                            : 'bg-dseza-light-main-bg border-dseza-light-border'
                        }`}>
                          <CardContent className="p-3 text-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${
                              theme === 'dark' ? 'bg-dseza-dark-primary/20' : 'bg-dseza-light-primary/20'
                            }`}>
                              <IconComponent className={`h-5 w-5 ${
                                theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'
                              }`} />
                            </div>
                            <h4 className={`font-semibold text-sm mb-1 ${
                              theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                            }`}>
                              {resource.title}
                            </h4>
                            <p className={`text-xs line-clamp-2 ${
                              theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                            }`}>
                              {resource.description}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Investment Highlights - Mobile optimized */}
            <Card className={`${
              theme === 'dark' 
                ? 'bg-dseza-dark-secondary border-dseza-dark-border' 
                : 'bg-white border-dseza-light-border'
            }`}>
              <CardHeader className="pb-4">
                <CardTitle className={`text-lg text-center ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  Tại Sao Chọn DSEZA?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                      400+
                    </div>
                    <h4 className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                      Doanh nghiệp
                    </h4>
                    <p className={`text-xs ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                      Đã tin tướng đầu tư
                    </p>
                  </div>
                  <div>
                    <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                      $8B+
                    </div>
                    <h4 className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                      Vốn đầu tư
                    </h4>
                    <p className={`text-xs ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                      Tổng vốn thu hút
                    </p>
                  </div>
                  <div>
                    <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                      150k+
                    </div>
                    <h4 className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                      Việc làm
                    </h4>
                    <p className={`text-xs ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                      Cơ hội đã tạo ra
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action - Mobile optimized */}
            <Card className={`${
              theme === 'dark' 
                ? 'bg-dseza-dark-secondary border-dseza-dark-border' 
                : 'bg-white border-dseza-light-border'
            }`}>
              <CardContent className="p-4 text-center">
                <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  Sẵn Sàng Đầu Tư?
                </h3>
                <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                  Liên hệ với chúng tôi để được tư vấn chi tiết về cơ hội đầu tư
                </p>
                <div className="space-y-3">
                  <Link 
                    to="/lien-he"
                    className={`inline-flex items-center justify-center w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 active:scale-[0.98] ${
                      theme === 'dark' 
                        ? 'bg-dseza-dark-primary text-dseza-dark-main-text' 
                        : 'bg-dseza-light-primary text-white'
                    }`}
                  >
                    Liên hệ ngay
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link 
                    to="/cam-nang-dau-tu"
                    className={`inline-flex items-center justify-center w-full px-4 py-3 rounded-lg border font-medium transition-all duration-200 active:scale-[0.98] ${
                      theme === 'dark' 
                        ? 'border-dseza-dark-border text-dseza-dark-main-text' 
                        : 'border-dseza-light-border text-dseza-light-main-text'
                    }`}
                  >
                    Tải cẩm nang đầu tư
                  </Link>
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
                to="/" 
                className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {language === 'en' ? 'Home' : 'Trang chủ'}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link 
                to={language === 'en' ? '/news' : '/tin-tuc'} 
                className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {language === 'en' ? 'News' : 'Tin tức'}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {language === 'en' ? 'For Investors' : 'Dành cho nhà đầu tư'}
              </span>
            </nav>
          </div>
        </div>

        {/* Page Content */}
        <div className="container mx-auto px-4 py-12">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
              {language === 'en' ? 'For Investors' : 'Dành Cho Nhà Đầu Tư'}
            </h1>
            <div className={`w-24 h-1 mx-auto mb-6 rounded-full ${theme === 'dark' ? 'bg-dseza-dark-primary' : 'bg-dseza-light-primary'}`}></div>
            <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              Thông tin toàn diện về quy trình đầu tư, lĩnh vực khuyến khích và các hỗ trợ dành riêng cho nhà đầu tư tại DSEZA
            </p>
          </div>

          {/* Main Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {investorCategories.map((category) => {
              const IconComponent = category.icon;
              
              return (
                <Link 
                  key={category.id}
                  to={category.url}
                  className="block group"
                >
                  <Card className={`h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 ${
                    theme === 'dark' 
                      ? 'bg-dseza-dark-secondary border-dseza-dark-border hover:border-dseza-dark-primary/50' 
                      : 'bg-white border-dseza-light-border hover:border-dseza-light-primary/50'
                  }`}>
                    <CardHeader className="pb-4">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${category.bgColor}`}>
                        <IconComponent className={`h-10 w-10 ${category.color}`} />
                      </div>
                      <CardTitle className={`text-2xl font-bold group-hover:text-opacity-90 transition-colors ${
                        theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                      }`}>
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className={`text-base leading-relaxed mb-6 ${
                        theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                      }`}>
                        {category.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className={`text-base font-medium transition-colors group-hover:text-opacity-90 ${category.color}`}>
                          Xem chi tiết
                        </span>
                        <ArrowRight className={`h-5 w-5 transition-all duration-300 group-hover:translate-x-1 ${category.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Quick Resources Section */}
          <div className={`p-8 rounded-2xl mb-16 ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-dseza-dark-secondary to-dseza-dark-secondary/80' 
              : 'bg-gradient-to-br from-dseza-light-secondary/30 to-dseza-light-secondary/10'
          }`}>
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Tài Liệu Hỗ Trợ
              </h2>
              <p className={`text-lg ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                Các tài liệu và dịch vụ hỗ trợ nhà đầu tư
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickResources.map((resource, index) => {
                const IconComponent = resource.icon;
                
                return (
                  <Link 
                    key={index}
                    to={resource.url}
                    className="block group"
                  >
                    <Card className={`h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                      theme === 'dark' 
                        ? 'bg-dseza-dark-main-bg border-dseza-dark-border' 
                        : 'bg-white border-dseza-light-border'
                    }`}>
                      <CardContent className="p-6 text-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                          theme === 'dark' ? 'bg-dseza-dark-primary/20' : 'bg-dseza-light-primary/20'
                        }`}>
                          <IconComponent className={`h-6 w-6 ${
                            theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'
                          }`} />
                        </div>
                        <h3 className={`font-bold mb-2 ${
                          theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                        }`}>
                          {resource.title}
                        </h3>
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                        }`}>
                          {resource.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Investment Highlights */}
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
              Tại Sao Chọn DSEZA?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                  400+
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  Doanh nghiệp
                </h3>
                <p className={`${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                  Đã tin tướng và đầu tư tại DSEZA
                </p>
              </div>
              
              <div className="text-center">
                <div className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                  $8B+
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  Vốn đầu tư
                </h3>
                <p className={`${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                  Tổng vốn đầu tư đã thu hút được
                </p>
              </div>
              
              <div className="text-center">
                <div className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                  150k+
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  Việc làm
                </h3>
                <p className={`${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                  Cơ hội việc làm đã tạo ra
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
              Sẵn Sàng Đầu Tư?
            </h3>
            <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              Liên hệ với chúng tôi để được tư vấn chi tiết về cơ hội đầu tư
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/lien-he"
                className={`inline-flex items-center px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 ${
                  theme === 'dark' 
                    ? 'bg-dseza-dark-primary text-dseza-dark-main-text hover:bg-dseza-dark-primary-hover' 
                    : 'bg-dseza-light-primary text-white hover:bg-dseza-light-primary-hover'
                }`}
              >
                Liên hệ ngay
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/cam-nang-dau-tu"
                className={`inline-flex items-center px-8 py-3 rounded-lg border-2 font-medium transition-all duration-300 hover:-translate-y-1 ${
                  theme === 'dark' 
                    ? 'border-dseza-dark-primary text-dseza-dark-primary hover:bg-dseza-dark-primary hover:text-dseza-dark-main-text' 
                    : 'border-dseza-light-primary text-dseza-light-primary hover:bg-dseza-light-primary hover:text-white'
                }`}
              >
                Tải cẩm nang đầu tư
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default InvestorGuidelinesPage; 