import React from "react";
import { useParams, Link } from "react-router-dom";
import { 
  MapPin, 
  Building2, 
  TrendingUp,
  Users,
  Calendar,
  Globe,
  Phone,
  Mail,
  ExternalLink,
  Download,
  CheckCircle
} from 'lucide-react';
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/utils/translations";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FunctionalzoneLayout from "./FunctionalzoneLayout";

// Dữ liệu chi tiết mẫu
const zoneDetailsData = {
  "khu-cong-nghiep-da-nang": {
    id: 1,
    name: "Khu công nghiệp Đà Nẵng",
    nameEn: "Da Nang Industrial Park",
    description: "Khu công nghiệp trọng điểm phía Bắc thành phố Đà Nẵng, chuyên về công nghiệp chế biến và sản xuất.",
    descriptionEn: "Key industrial park in northern Da Nang city, specializing in processing and manufacturing industries.",
    detailedDescription: "Khu công nghiệp Đà Nẵng được thành lập từ năm 1997, là một trong những khu công nghiệp đầu tiên và lớn nhất của thành phố. Với vị trí chiến lược và hạ tầng hoàn chỉnh, khu công nghiệp đã thu hút nhiều nhà đầu tư trong và ngoài nước.",
    detailedDescriptionEn: "Da Nang Industrial Park, established in 1997, is one of the first and largest industrial parks in the city. With its strategic location and complete infrastructure, the industrial park has attracted many domestic and foreign investors.",
    area: "1,500 ha",
    establishedYear: "1997",
    occupancyRate: "85%",
    totalCompanies: "85",
    employees: "25,000+",
    majorIndustries: ["Chế biến thực phẩm", "Dệt may", "Cơ khí", "Điện tử", "Hóa chất"],
    majorIndustriesEn: ["Food Processing", "Textiles", "Mechanical", "Electronics", "Chemicals"],
    status: "Hoạt động",
    statusEn: "Active",
    images: [
      "/media/FunctionalZones/industrial-park-1.jpg",
      "/media/HeroBackground/hero-bg-1.png",
      "/media/HeroBackground/hero-bg-2.png"
    ],
    location: {
      address: "Quận Liên Chiểu, Thành phố Đà Nẵng",
      addressEn: "Lien Chieu District, Da Nang City",
      coordinates: "16.0544° N, 108.2022° E"
    },
    infrastructure: {
      electricity: "Cung cấp 24/7 với công suất 200MW",
      electricityEn: "24/7 supply with 200MW capacity",
      water: "Hệ thống cấp nước công nghiệp 50,000m³/ngày",
      waterEn: "Industrial water supply system 50,000m³/day",
      waste: "Hệ thống xử lý nước thải tập trung",
      wasteEn: "Centralized wastewater treatment system",
      transport: "Kết nối trực tiếp với cảng biển và sân bay",
      transportEn: "Direct connection to seaport and airport"
    },
    incentives: [
      {
        title: "Ưu đãi thuế",
        titleEn: "Tax Incentives",
        description: "Miễn thuế thu nhập doanh nghiệp 2 năm đầu",
        descriptionEn: "Corporate income tax exemption for first 2 years"
      },
      {
        title: "Hỗ trợ thủ tục",
        titleEn: "Administrative Support",
        description: "Cơ chế một cửa, rút ngắn thời gian cấp phép",
        descriptionEn: "One-stop service, reduced licensing time"
      },
      {
        title: "Đào tạo nhân lực",
        titleEn: "Human Resource Training",
        description: "Hỗ trợ đào tạo và phát triển nguồn nhân lực",
        descriptionEn: "Support for human resource training and development"
      }
    ],
    contact: {
      phone: "+84 236 3888 999",
      email: "info@danang-ip.com.vn",
      website: "www.danang-ip.com.vn",
      manager: "Ban Quản lý Khu công nghiệp Đà Nẵng",
      managerEn: "Da Nang Industrial Park Management Board"
    }
  }
  // Có thể thêm các khu công nghiệp khác
};

/**
 * FunctionalzoneDetailPage - Trang chi tiết khu công nghiệp
 */
const FunctionalzoneDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { t } = useTranslation();

  // Lấy dữ liệu dựa trên slug
  const zoneData = slug ? zoneDetailsData[slug as keyof typeof zoneDetailsData] : null;

  const textColor = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";
  const secondaryTextColor = theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text";
  const cardBackground = theme === "dark" ? "bg-dseza-dark-secondary" : "bg-dseza-light-main-bg";
  const borderColor = theme === "dark" ? "border-dseza-dark-border" : "border-dseza-light-border";
  const accentColor = theme === "dark" ? "text-dseza-dark-accent" : "text-dseza-light-accent";

  if (!zoneData) {
    return (
      <FunctionalzoneLayout 
        title={language === 'vi' ? "Không tìm thấy khu công nghiệp" : "Industrial Park Not Found"}
        breadcrumbItems={[
          { label: language === 'vi' ? "Lỗi 404" : "Error 404" }
        ]}
      >
        <div className="text-center py-12">
          <h2 className={`text-2xl font-bold ${textColor} mb-4`}>
            {language === 'vi' ? "Không tìm thấy khu công nghiệp" : "Industrial Park Not Found"}
          </h2>
          <p className={`${secondaryTextColor} mb-6`}>
            {language === 'vi' ? "Khu công nghiệp bạn tìm kiếm không tồn tại." : "The industrial park you're looking for doesn't exist."}
          </p>
          <Button asChild>
            <Link to="/functionalzone">
              {language === 'vi' ? "Quay lại danh sách" : "Back to List"}
            </Link>
          </Button>
        </div>
      </FunctionalzoneLayout>
    );
  }

  return (
    <FunctionalzoneLayout 
      title={language === 'vi' ? zoneData.name : zoneData.nameEn}
      breadcrumbItems={[
        { label: language === 'vi' ? zoneData.name : zoneData.nameEn }
      ]}
    >
      {/* Hero Section */}
      <div className="mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Image */}
          <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden">
            <img 
              src={zoneData.images[0]} 
              alt={language === 'vi' ? zoneData.name : zoneData.nameEn}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
            <div className="absolute top-4 right-4">
              <Badge className={`${theme === 'dark' ? 'bg-dseza-dark-accent text-white' : 'bg-dseza-light-accent text-white'}`}>
                {language === 'vi' ? zoneData.status : zoneData.statusEn}
              </Badge>
            </div>
          </div>

          {/* Key Information */}
          <div className="space-y-6">
            <div>
              <h2 className={`text-2xl font-bold ${textColor} mb-3`}>
                {language === 'vi' ? "Thông tin tổng quan" : "General Information"}
              </h2>
              <p className={`${secondaryTextColor} leading-relaxed`}>
                {language === 'vi' ? zoneData.detailedDescription : zoneData.detailedDescriptionEn}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className={`${cardBackground} ${borderColor} border`}>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <MapPin className={`w-6 h-6 ${accentColor} mr-3`} />
                    <div>
                      <p className={`text-lg font-bold ${textColor}`}>{zoneData.area}</p>
                      <p className={`text-sm ${secondaryTextColor}`}>
                        {language === 'vi' ? 'Diện tích' : 'Area'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${cardBackground} ${borderColor} border`}>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <Calendar className={`w-6 h-6 ${accentColor} mr-3`} />
                    <div>
                      <p className={`text-lg font-bold ${textColor}`}>{zoneData.establishedYear}</p>
                      <p className={`text-sm ${secondaryTextColor}`}>
                        {language === 'vi' ? 'Thành lập' : 'Established'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${cardBackground} ${borderColor} border`}>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <TrendingUp className={`w-6 h-6 ${accentColor} mr-3`} />
                    <div>
                      <p className={`text-lg font-bold ${textColor}`}>{zoneData.occupancyRate}</p>
                      <p className={`text-sm ${secondaryTextColor}`}>
                        {language === 'vi' ? 'Tỷ lệ lấp đầy' : 'Occupancy Rate'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${cardBackground} ${borderColor} border`}>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <Users className={`w-6 h-6 ${accentColor} mr-3`} />
                    <div>
                      <p className={`text-lg font-bold ${textColor}`}>{zoneData.employees}</p>
                      <p className={`text-sm ${secondaryTextColor}`}>
                        {language === 'vi' ? 'Lao động' : 'Employees'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="overview" className="mb-12">
        <TabsList className={`grid w-full grid-cols-4 ${cardBackground} ${borderColor}`}>
          <TabsTrigger value="overview" className={textColor}>
            {language === 'vi' ? 'Tổng quan' : 'Overview'}
          </TabsTrigger>
          <TabsTrigger value="infrastructure" className={textColor}>
            {language === 'vi' ? 'Hạ tầng' : 'Infrastructure'}
          </TabsTrigger>
          <TabsTrigger value="incentives" className={textColor}>
            {language === 'vi' ? 'Ưu đãi' : 'Incentives'}
          </TabsTrigger>
          <TabsTrigger value="contact" className={textColor}>
            {language === 'vi' ? 'Liên hệ' : 'Contact'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Location */}
            <Card className={`${cardBackground} ${borderColor} border`}>
              <CardHeader>
                <CardTitle className={`${textColor} flex items-center`}>
                  <MapPin className={`w-5 h-5 ${accentColor} mr-2`} />
                  {language === 'vi' ? 'Vị trí' : 'Location'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className={`text-sm ${secondaryTextColor}`}>
                    {language === 'vi' ? 'Địa chỉ:' : 'Address:'}
                  </p>
                  <p className={textColor}>
                    {language === 'vi' ? zoneData.location.address : zoneData.location.addressEn}
                  </p>
                </div>
                <div>
                  <p className={`text-sm ${secondaryTextColor}`}>
                    {language === 'vi' ? 'Tọa độ:' : 'Coordinates:'}
                  </p>
                  <p className={textColor}>{zoneData.location.coordinates}</p>
                </div>
              </CardContent>
            </Card>

            {/* Major Industries */}
            <Card className={`${cardBackground} ${borderColor} border`}>
              <CardHeader>
                <CardTitle className={`${textColor} flex items-center`}>
                  <Building2 className={`w-5 h-5 ${accentColor} mr-2`} />
                  {language === 'vi' ? 'Ngành công nghiệp chính' : 'Major Industries'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {(language === 'vi' ? zoneData.majorIndustries : zoneData.majorIndustriesEn).map((industry, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className={`w-4 h-4 ${accentColor} mr-2`} />
                      <span className={`text-sm ${textColor}`}>{industry}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="infrastructure" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(zoneData.infrastructure).map(([key, value], index) => {
              if (key.endsWith('En')) return null;
              const titleKey = key.charAt(0).toUpperCase() + key.slice(1);
              const valueEn = zoneData.infrastructure[`${key}En` as keyof typeof zoneData.infrastructure];
              
              return (
                <Card key={index} className={`${cardBackground} ${borderColor} border`}>
                  <CardHeader>
                    <CardTitle className={`${textColor} text-lg`}>
                      {language === 'vi' ? 
                        (key === 'electricity' ? 'Điện' : 
                         key === 'water' ? 'Nước' : 
                         key === 'waste' ? 'Xử lý chất thải' : 
                         'Giao thông') : 
                        (key === 'electricity' ? 'Electricity' : 
                         key === 'water' ? 'Water' : 
                         key === 'waste' ? 'Waste Treatment' : 
                         'Transportation')
                      }
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={secondaryTextColor}>
                      {language === 'vi' ? value : valueEn}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="incentives" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {zoneData.incentives.map((incentive, index) => (
              <Card key={index} className={`${cardBackground} ${borderColor} border`}>
                <CardHeader>
                  <CardTitle className={`${textColor} text-lg`}>
                    {language === 'vi' ? incentive.title : incentive.titleEn}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={secondaryTextColor}>
                    {language === 'vi' ? incentive.description : incentive.descriptionEn}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contact" className="mt-6">
          <Card className={`${cardBackground} ${borderColor} border`}>
            <CardHeader>
              <CardTitle className={textColor}>
                {language === 'vi' ? 'Thông tin liên hệ' : 'Contact Information'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className={`font-medium ${textColor} mb-2`}>
                  {language === 'vi' ? zoneData.contact.manager : zoneData.contact.managerEn}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className={`w-5 h-5 ${accentColor} mr-3`} />
                    <div>
                      <p className={`text-sm ${secondaryTextColor}`}>
                        {language === 'vi' ? 'Điện thoại:' : 'Phone:'}
                      </p>
                      <p className={textColor}>{zoneData.contact.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className={`w-5 h-5 ${accentColor} mr-3`} />
                    <div>
                      <p className={`text-sm ${secondaryTextColor}`}>Email:</p>
                      <p className={textColor}>{zoneData.contact.email}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <ExternalLink className={`w-5 h-5 ${accentColor} mr-3`} />
                    <div>
                      <p className={`text-sm ${secondaryTextColor}`}>Website:</p>
                      <a 
                        href={`https://${zoneData.contact.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`${accentColor} hover:underline`}
                      >
                        {zoneData.contact.website}
                      </a>
                    </div>
                  </div>
                  
                  <Button 
                    asChild
                    className={`${theme === 'dark' ? 'bg-dseza-dark-accent hover:bg-dseza-dark-accent/90' : 'bg-dseza-light-accent hover:bg-dseza-light-accent/90'} text-white`}
                  >
                    <Link to="/contact">
                      {language === 'vi' ? 'Liên hệ đầu tư' : 'Contact for Investment'}
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </FunctionalzoneLayout>
  );
};

export default FunctionalzoneDetailPage; 