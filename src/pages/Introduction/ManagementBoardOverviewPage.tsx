import React from "react";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Building, 
  ChevronRight,
  Network 
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * ManagementBoardOverviewPage component - Overview of Management Board
 */
const ManagementBoardOverviewPage: React.FC = () => {
  const { theme } = useTheme();

  // Overview items data
  const overviewItems = [
    {
      title: "Cơ cấu tổ chức",
      description: "Sơ đồ tổ chức và cơ cấu quản lý của Ban Quản lý Khu Công nghệ cao Đà Nẵng",
      icon: Building,
      href: "/gioi-thieu/gioi-thieu-chung/co-cau-to-chuc"
    },
    {
      title: "Chức năng nhiệm vụ",
      description: "Các chức năng, nhiệm vụ và quyền hạn của Ban Quản lý theo quy định",
      icon: FileText,
      href: "/gioi-thieu/gioi-thieu-chung/chuc-nang-nhiem-vu"
    },
    {
      title: "Đơn vị trực thuộc",
      description: "Thông tin về các đơn vị trực thuộc và đơn vị chủ đầu tư kinh doanh hạ tầng",
      icon: Network,
      href: "/gioi-thieu/gioi-thieu-chung/don-vi-truc-thuoc"
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
                to="/gioi-thieu/gioi-thieu-chung" 
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Giới thiệu chung
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Tổng quan về Ban Quản lý
              </span>
            </nav>
          </div>
        </div>

        {/* Page Content */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Page Title */}
          <h1 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
            Tổng quan về Ban Quản lý
          </h1>

          {/* Introduction Text */}
          <div className="max-w-4xl mx-auto mb-12">
            <p className={`text-lg leading-relaxed text-center ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              Ban Quản lý Khu Công nghệ cao Đà Nẵng là cơ quan chuyên môn thuộc UBND thành phố Đà Nẵng, 
              có chức năng tham mưu, giúp UBND thành phố quản lý nhà nước về hoạt động đầu tư xây dựng, 
              kinh doanh và các dịch vụ trong Khu Công nghệ cao Đà Nẵng.
            </p>
          </div>

          {/* Overview Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {overviewItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Link 
                  key={index} 
                  to={item.href}
                  className="group"
                >
                  <Card className={`h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer ${
                    theme === 'dark' 
                      ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border hover:border-dseza-dark-primary/50' 
                      : 'bg-dseza-light-secondary-bg border-dseza-light-border hover:border-dseza-light-primary/50'
                  }`}>
                    <CardHeader className="text-center pb-4">
                      <div className={`mx-auto mb-4 p-4 rounded-full w-20 h-20 flex items-center justify-center ${
                        theme === 'dark' 
                          ? 'bg-dseza-dark-primary/20' 
                          : 'bg-dseza-light-primary/20'
                      }`}>
                        <IconComponent className={`h-10 w-10 ${
                          theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'
                        }`} />
                      </div>
                      <CardTitle className={`text-xl font-bold group-hover:${
                        theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'
                      } transition-colors ${
                        theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                      }`}>
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <CardDescription className={`text-base leading-relaxed ${
                        theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                      }`}>
                        {item.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ManagementBoardOverviewPage;
