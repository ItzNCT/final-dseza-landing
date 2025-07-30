import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  ArrowRight,
  Truck,
  Leaf,
  Package,
  Users,
  FileCheck,
  Network
} from 'lucide-react';
import { useTheme } from "@/context/ThemeContext";
import { useIsMobile } from "@/hooks/use-mobile";
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";
import MobileLayout from "@/components/mobile/MobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InvestmentEnvironmentPage = () => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  // Investment environment categories data
  const investmentEnvironmentCategories = [
    {
      id: 'ha-tang-giao-thong',
      title: 'Hạ tầng giao thông',
      description: 'Thông tin về hệ thống giao thông, kết nối liên vùng và các dự án hạ tầng giao thông trọng điểm',
      icon: Truck,
      url: '/tin-tuc/moi-truong-dau-tu/ha-tang-giao-thong',
      color: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
      bgColor: theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'
    },
    {
      id: 'khoa-hoc-cong-nghe-moi-truong',
      title: 'Khoa học công nghệ - Môi trường',
      description: 'Phát triển công nghệ sạch, bảo vệ môi trường và các giải pháp công nghệ bền vững',
      icon: Leaf,
      url: '/tin-tuc/moi-truong-dau-tu/khoa-hoc-cong-nghe-moi-truong',
      color: theme === 'dark' ? 'text-green-400' : 'text-green-600',
      bgColor: theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'
    },
    {
      id: 'logistics',
      title: 'Logistics',
      description: 'Hệ thống logistics, chuỗi cung ứng và các dịch vụ vận tải, kho bãi hiện đại',
      icon: Package,
      url: '/tin-tuc/moi-truong-dau-tu/logistics',
      color: theme === 'dark' ? 'text-orange-400' : 'text-orange-600',
      bgColor: theme === 'dark' ? 'bg-orange-900/20' : 'bg-orange-50'
    },
    {
      id: 'ha-tang-xa-hoi',
      title: 'Hạ tầng xã hội',
      description: 'Giáo dục, y tế, văn hóa, thể thao và các dịch vụ xã hội phục vụ đời sống dân cư',
      icon: Network,
      url: '/tin-tuc/moi-truong-dau-tu/ha-tang-xa-hoi',
      color: theme === 'dark' ? 'text-purple-400' : 'text-purple-600',
      bgColor: theme === 'dark' ? 'bg-purple-900/20' : 'bg-purple-50'
    },
    {
      id: 'nguon-nhan-luc',
      title: 'Nguồn nhân lực',
      description: 'Chính sách nhân sự, đào tạo nghề, phát triển nguồn nhân lực chất lượng cao',
      icon: Users,
      url: '/tin-tuc/moi-truong-dau-tu/nguon-nhan-luc',
      color: theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600',
      bgColor: theme === 'dark' ? 'bg-indigo-900/20' : 'bg-indigo-50'
    },
    {
      id: 'cai-cach-hanh-chinh',
      title: 'Cải cách hành chính',
      description: 'Hiện đại hóa quy trình, cải thiện chất lượng dịch vụ công và môi trường kinh doanh',
      icon: FileCheck,
      url: '/tin-tuc/moi-truong-dau-tu/cai-cach-hanh-chinh',
      color: theme === 'dark' ? 'text-teal-400' : 'text-teal-600',
      bgColor: theme === 'dark' ? 'bg-teal-900/20' : 'bg-teal-50'
    }
  ];

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
                  Trang chủ
                </Link>
                <ChevronRight className="h-2.5 w-2.5" />
                <Link 
                  to="/tin-tuc" 
                  className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
                >
                  Tin tức
                </Link>
                <ChevronRight className="h-2.5 w-2.5" />
                <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  Môi trường đầu tư
                </span>
              </nav>
            </div>

            {/* Page Header - Mobile optimized */}
            <div className="text-center py-3">
              <h1 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Môi Trường Đầu Tư
              </h1>
              <div className={`w-12 h-0.5 mx-auto mb-2 rounded-full ${theme === 'dark' ? 'bg-dseza-dark-primary' : 'bg-dseza-light-primary'}`}></div>
              <p className={`text-xs ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                Khám phá thông tin về môi trường đầu tư tại Đà Nẵng
              </p>
            </div>

            {/* Categories - Mobile single column */}
            <div className="space-y-4">
              {investmentEnvironmentCategories.map((category) => {
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
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${category.bgColor}`}>
                            <IconComponent className={`h-6 w-6 ${category.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className={`font-semibold text-base mb-1 ${
                              theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                            }`}>
                              {category.title}
                            </h3>
                            <p className={`text-sm line-clamp-2 ${
                              theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                            }`}>
                              {category.description}
                            </p>
                          </div>
                          <ArrowRight className={`h-4 w-4 transition-transform group-active:translate-x-1 ${category.color}`} />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {/* Key Statistics - Mobile optimized */}
            <Card className={`${
              theme === 'dark' 
                ? 'bg-dseza-dark-secondary border-dseza-dark-border' 
                : 'bg-white border-dseza-light-border'
            }`}>
              <CardHeader className="pb-4">
                <CardTitle className={`text-lg text-center ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  Môi Trường Đầu Tư Đà Nẵng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                      7
                    </div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                      Khu công nghiệp
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                      4,000+
                    </div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                      Hecta diện tích
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                      150k+
                    </div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                      Việc làm
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                      $8B+
                    </div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                      Vốn đầu tư
                    </div>
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
                  Cần hỗ trợ thêm thông tin?
                </h3>
                <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                  Liên hệ với chúng tôi để được tư vấn chi tiết
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
                    Liên hệ tư vấn
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link 
                    to="/tin-tuc"
                    className={`inline-flex items-center justify-center w-full px-4 py-3 rounded-lg border font-medium transition-all duration-200 active:scale-[0.98] ${
                      theme === 'dark' 
                        ? 'border-dseza-dark-border text-dseza-dark-main-text' 
                        : 'border-dseza-light-border text-dseza-light-main-text'
                    }`}
                  >
                    Xem tất cả tin tức
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
                Trang chủ
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link 
                to="/tin-tuc" 
                className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Tin tức
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Môi trường đầu tư
              </span>
            </nav>
          </div>
        </div>

        {/* Page Content */}
        <div className="container mx-auto px-4 py-12">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
              Môi Trường Đầu Tư
            </h1>
            <div className={`w-24 h-1 mx-auto mb-6 rounded-full ${theme === 'dark' ? 'bg-dseza-dark-primary' : 'bg-dseza-light-primary'}`}></div>
            <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              Khám phá tất cả thông tin về môi trường đầu tư tại Đà Nẵng - từ hạ tầng giao thông, 
              nguồn nhân lực đến các chính sách hỗ trợ doanh nghiệp
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {investmentEnvironmentCategories.map((category) => {
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
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${category.bgColor}`}>
                        <IconComponent className={`h-8 w-8 ${category.color}`} />
                      </div>
                      <CardTitle className={`text-xl font-bold group-hover:text-opacity-90 transition-colors ${
                        theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                      }`}>
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className={`text-sm leading-relaxed mb-4 ${
                        theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                      }`}>
                        {category.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium transition-colors group-hover:text-opacity-90 ${category.color}`}>
                          Xem chi tiết
                        </span>
                        <ArrowRight className={`h-4 w-4 transition-all duration-300 group-hover:translate-x-1 ${category.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Key Statistics Section */}
          <div className={`p-8 rounded-2xl ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-dseza-dark-secondary to-dseza-dark-secondary/80' 
              : 'bg-gradient-to-br from-dseza-light-secondary/30 to-dseza-light-secondary/10'
          }`}>
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Môi Trường Đầu Tư Đà Nẵng
              </h2>
              <p className={`text-lg ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                Những con số ấn tượng về môi trường đầu tư
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                  7
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                  Khu công nghiệp
                </div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                  4,000+
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                  Hecta diện tích
                </div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                  150k+
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                  Việc làm
                </div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                  $8B+
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                  Vốn đầu tư
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
              Cần hỗ trợ thêm thông tin?
            </h3>
            <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              Liên hệ với chúng tôi để được tư vấn chi tiết về môi trường đầu tư
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
                Liên hệ tư vấn
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/tin-tuc"
                className={`inline-flex items-center px-8 py-3 rounded-lg border-2 font-medium transition-all duration-300 hover:-translate-y-1 ${
                  theme === 'dark' 
                    ? 'border-dseza-dark-primary text-dseza-dark-primary hover:bg-dseza-dark-primary hover:text-dseza-dark-main-text' 
                    : 'border-dseza-light-primary text-dseza-light-primary hover:bg-dseza-light-primary hover:text-white'
                }`}
              >
                Xem tất cả tin tức
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

export default InvestmentEnvironmentPage; 