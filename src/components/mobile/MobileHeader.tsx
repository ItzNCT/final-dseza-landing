
import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X, Map } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/translations";

// Type for menu item
type MobileMenuItem = {
  id: string;
  title: string;
  url?: string;
  isExpandable?: boolean;
  items?: {
    heading: string;
    links: {
      title: string;
      url: string;
      children?: { title: string; url: string }[];
    }[];
  }[];
};

// Mobile menu data structure
const mobileMenuData: MobileMenuItem[] = [
  {
    id: "gioi-thieu",
    title: "Giới thiệu",
    isExpandable: true,
    items: [
      {
        heading: "Giới thiệu",
        links: [
          { title: "Thư ngỏ", url: "https://dseza.danang.gov.vn/chi-tiet-tin-tuc/thu-ngo/" },
          { title: "Tổng quan về Đà Nẵng", url: "https://dseza.danang.gov.vn/chi-tiet-tin-tuc/tong-quan-ve-tpda-nang/" },
          { 
            title: "Tổng quan về Ban Quản lý", 
            url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/gioi-thieu/tong-quan-ve-ban-quan-ly/",
            children: [
              { title: "Chức năng, nhiệm vụ, quyền hạn Ban Quản lý", url: "https://dseza.danang.gov.vn/chi-tiet-tin-tuc/chuc-nang-nhiem-vu-quyen-han-ban-quan-ly/" },
              { title: "Các phòng ban", url: "https://dseza.danang.gov.vn/chi-tiet-tin-tuc/cac-phong-ban/" },
              { title: "Đơn vị trực thuộc", url: "https://dseza.danang.gov.vn/chi-tiet-tin-tuc/don-vi-truc-thuoc/" }
            ]
          }
        ]
      },
      {
        heading: "Khu hành chính",
        links: [
          { title: "Khu công nghệ cao Đà Nẵng", url: "https://dseza.danang.gov.vn/chi-tiet-tin-tuc/khu-cong-nghe-cao-da-nang/" },
          { title: "Khu thương mại tự do Đà Nẵng", url: "https://dseza.danang.gov.vn/chi-tiet-tin-tuc/khu-thuong-mai-tu-do-da-nang/" },
          { title: "Khu CNTT tập trung", url: "https://dseza.danang.gov.vn/chi-tiet-tin-tuc/khu-cong-nghe-thong-tin-tap-trung/" },
          { 
            title: "Các Khu công nghiệp Đà Nẵng", 
            url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/gioi-thieu/khu-hanh-chinh/cac-khu-cong-nghiep-da-nang/",
            children: [
              { title: "Khu công nghiệp Hòa Ninh", url: "https://dseza.danang.gov.vn/chi-tiet-tin-tuc/khu-cong-nghiep-hoa-ninh/" },
              { title: "Khu công nghiệp Hòa Khánh", url: "https://dseza.danang.gov.vn/chi-tiet-tin-tuc/khu-cong-nghiep-hoa-khanh/" },
              { title: "Khu công nghiệp Hòa Khánh mở rộng", url: "https://dseza.danang.gov.vn/chi-tiet-tin-tuc/khu-cong-nghiep-hoa-khanh-mo-rong/" },
              { title: "Khu công nghiệp Hòa Cầm", url: "https://dseza.danang.gov.vn/chi-tiet-tin-tuc/khu-cong-nghiep-hoa-cam/" },
              { title: "Khu công nghiệp Liên Chiểu", url: "https://dseza.danang.gov.vn/chi-tiet-tin-tuc/khu-cong-nghiep-lien-chieu/" },
              { title: "Khu công nghiệp Dịch vụ Thủy sản Đà Nẵng", url: "https://dseza.danang.gov.vn/chi-tiet-tin-tuc/khu-cong-nghiep-dich-vu-thuy-san-da-nang/" },
              { title: "Khu công nghiệp Đà Nẵng", url: "https://dseza.danang.gov.vn/chi-tiet-tin-tuc/khu-cong-nghiep-da-nang/" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "tin-tuc",
    title: "Tin tức",
    isExpandable: true,
    items: [
      {
        heading: "Tin tức | Sự kiện",
        links: [
          { title: "Đầu tư - Hợp tác Quốc tế", url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/tin-tuc/dau-tu-hop-tac-quoc-te/" },
          { title: "Doanh nghiệp Chuyển đổi số", url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/tin-tuc/chuyen-doi-so/" },
          { title: "Đào tạo, Ươm tạo Khởi nghiệp", url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/tin-tuc/dao-tao-uom-tao-khoi-nghiep/" },
          { title: "Hoạt động Ban Quản lý", url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/tin-tuc/hoat-dong-ban-quan-ly/" },
          { title: "Tin khác", url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/tin-tuc/tin-khac/" }
        ]
      },
      {
        heading: "Xem thêm",
        links: [
          { title: "Lịch công tác", url: "https://dseza.danang.gov.vn/lich-cong-tac/" },
          { title: "Thông báo", url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/thong-bao/" },
          { title: "Thông tin báo chí", url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/tin-tuc/thong-tin-bao-chi/" }
        ]
      }
    ]
  },
  {
    id: "doanh-nghiep",
    title: "Doanh nghiệp",
    isExpandable: true,
    items: [
      {
        heading: "Báo cáo",
        links: [
          { title: "Báo cáo trực tuyến về DSEZA", url: "https://maps.dhpiza.vn/login?ReturnUrl=%2Fadmin%2Fbaocaonhadautu%2Fyeucaubaocao" },
          { title: "Báo cáo giám sát và đánh giá đầu tư", url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/doanh-nghiep/bao-cao-giam-sat-va-danh-gia-dau-tu/" },
          { title: "Mẫu | Bảng biểu báo cáo", url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/doanh-nghiep/mau-bang-bieu-bao-cao/" }
        ]
      },
      {
        heading: "Xem thêm",
        links: [
          { title: "Thủ tục | Hồ sơ | Dữ liệu môi trường", url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/doanh-nghiep/thu-tuc-ho-so-du-lieu-moi-truong/" },
          { title: "Thống kê doanh nghiệp", url: "https://dseza.danang.gov.vn/thong-ke-doanh-nghiep/" },
          { title: "Tuyển dụng", url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/doanh-nghiep/tuyen-dung/" }
        ]
      }
    ]
  },
  {
    id: "cam-nang-dau-tu",
    title: "Cẩm nang đầu tư",
    url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/cam-nang-dau-tu/"
  },
  {
    id: "van-ban",
    title: "Văn bản",
    isExpandable: true,
    items: [
      {
        heading: "Văn bản pháp luật",
        links: [
          { title: "Văn bản pháp quy trung ương", url: "https://dseza.danang.gov.vn/van-ban/van-ban-phap-quy-tw/" },
          { title: "Văn bản pháp quy địa phương", url: "https://dseza.danang.gov.vn/van-ban/van-ban-phap-quy-dia-phuong/" },
          { title: "Văn bản chỉ đạo điều hành", url: "https://dseza.danang.gov.vn/van-ban/van-ban-chi-dao-dieu-hanh/" },
          { title: "Văn bản CCHC", url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/van-ban/van-ban-cai-cach-hanh-chinh/" }
        ]
      },
      {
        heading: "Xem thêm",
        links: [
          { title: "Văn bản hướng dẫn", url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/van-ban/van-ban-huong-dan/" },
          { title: "Góp ý dự thảo văn bản", url: "https://dseza.danang.gov.vn/gop-y-du-thao-van-ban/" }
        ]
      }
    ]
  },
  {
    id: "cai-cach-hanh-chinh",
    title: "Cải cách hành chính",
    isExpandable: true,
    items: [
      {
        heading: "Ứng dụng và dịch vụ",
        links: [
          { title: "Dịch vụ công trực tuyến", url: "https://dichvucong.danang.gov.vn/" },
          { title: "Bưu chính công ích", url: "https://egov.danang.gov.vn/dailyDVc" },
          { title: "Tra cứu hồ sơ", url: "https://dichvucong.danang.gov.vn/web/guest/tra-cuu-ho-so" },
          { title: "Đặt lịch hẹn giao dịch trực tuyến", url: "http://49.156.54.87/" },
          { title: "Đánh giá chất lượng dịch vụ HCC", url: "https://dichvucong.danang.gov.vn/web/guest/-anh-gia" }
        ]
      },
      {
        heading: "Văn bản",
        links: [
          { title: "Thủ tục hành chính", url: "https://dichvucong.danang.gov.vn/" },
          { 
            title: "Quy trình thực hiện thủ tục hành chính", 
            url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/danh-cho-nha-dau-tu/quy-trinh-thuc-hien-thu-tuc-hanh-chinh/",
            children: [
              { title: "Lĩnh vực đầu tư", url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/danh-cho-nha-dau-tu/quy-trinh-linh-vuc-dau-tu/" }
            ]
          },
          { title: "Văn bản cải cách hành chính", url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/van-ban/van-ban-cai-cach-hanh-chinh/" }
        ]
      }
    ]
  },
  {
    id: "lien-he",
    title: "Liên hệ",
    url: "https://dseza.danang.gov.vn/lien-he/"
  }
];

const MobileHeader: React.FC = () => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [openCollapsibles, setOpenCollapsibles] = useState<{ [key: string]: boolean }>({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Update date/time every minute
  useEffect(() => {
    const timerId = setInterval(() => setCurrentDateTime(new Date()), 60000);
    return () => clearInterval(timerId);
  }, []);

  // Handle collapsible states
  const toggleCollapsible = (id: string) => {
    setOpenCollapsibles(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Get theme-specific colors
  const getBgColor = () => theme === "dark" ? "bg-dseza-dark-main-bg" : "bg-white";
  const getTextColor = () => theme === "dark" ? "text-white" : "text-black";
  const getSecondaryTextColor = () => theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text";
  const getBorderColor = () => theme === "dark" ? "border-dseza-dark-border" : "border-dseza-light-border";
  const getPrimaryColor = () => theme === "dark" ? "text-dseza-dark-primary" : "text-dseza-light-primary";
  const getPrimaryBgColor = () => theme === "dark" ? "bg-dseza-dark-primary" : "bg-dseza-light-primary";
  const getPrimaryHoverBgColor = () => theme === "dark" ? "hover:bg-dseza-dark-primary-hover" : "hover:bg-dseza-light-primary-hover";
  const getShadowColor = () => theme === "dark" ? "shadow-neutral-700" : "shadow-neutral-200";

  // Logo component - changes based on theme
  const Logo = () => (
    <img
      src={theme === "dark" ? "/media/darklogo3.png" : "/media/lightlogo3.png"}
      alt="DSEZA Logo"
      className="h-8"
    />
  );

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full h-16 z-50",
          getBgColor(),
          getShadowColor(),
          "shadow-md"
        )}
      >
        <div className="flex items-center justify-between h-full px-4">
          <Logo />
          
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className={cn(
                  "p-2 rounded-md",
                  getTextColor(),
                  "focus:outline-none focus:ring-2 focus:ring-offset-2",
                  theme === "dark" ? "focus:ring-dseza-dark-primary" : "focus:ring-dseza-light-primary"
                )}
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            
            <SheetContent 
              side="right" 
              className={cn(
                "w-full sm:max-w-md p-0 border-none",
                getBgColor()
              )}
            >
            <div className="flex flex-col h-full">
              {/* Menu Header */}
              <div className={cn(
                "flex items-center justify-between h-16 px-4",
                getBgColor(),
                getShadowColor(),
                "shadow-md"
            )}>
              <Logo />
      {/* === ĐÂY LÀ NÚT CẦN XÓA HOẶC ẨN ICON X === */}
      <button
        onClick={() => setIsMenuOpen(false)}
        aria-label="Close menu"
        className={cn(
          "p-2 rounded-md",
          getTextColor(),
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          theme === "dark" ? "focus:ring-dseza-dark-primary" : "focus:ring-dseza-light-primary"
        )}
      >
        <X className="w-6 h-6" /> {/* Icon X sẽ được xóa hoặc ẩn */}
      </button>
      {/* =============================================== */}
    </div>
                
                {/* Scrollable Menu Content */}
                <div className={cn(
                  "flex-1 overflow-y-auto p-6",
                  getBgColor()
                )}>
                  {mobileMenuData.map((item) => (
                    <div key={item.id} className="mb-1">
                      {item.isExpandable ? (
                        <Collapsible
                          open={openCollapsibles[item.id]}
                          onOpenChange={() => toggleCollapsible(item.id)}
                          className="w-full"
                        >
                          <CollapsibleTrigger asChild>
                            <button 
                              className={cn(
                                "flex items-center justify-between w-full py-3 px-2",
                                getTextColor(),
                                "font-montserrat font-semibold text-lg",
                                getBorderColor(),
                                "border-b"
                              )}
                            >
                              <span>{item.title}</span>
                              <span className="transform transition-transform duration-200">
                                {openCollapsibles[item.id] ? "▼" : "▶"}
                              </span>
                            </button>
                          </CollapsibleTrigger>
                          
                          <CollapsibleContent className="pt-2 pb-3">
                            {item.items?.map((section, idx) => (
                              <div key={idx} className="mb-4">
                                <h3 className={cn(
                                  "pt-3 pb-2 px-4 font-montserrat font-medium text-base",
                                  theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text"
                                )}>
                                  {section.heading}
                                </h3>
                                
                                <div className="space-y-1">
  {section.links.map((link, linkIdx) => (
    <div key={linkIdx}>
      {link.children ? (
        <>
          {/* Cấp 1 - Mục cha có con */}
          <div className={cn(
            "py-2 pl-4 pr-2 font-inter text-sm", // Giảm padding phải để chữ không bị ép nếu dài
            getTextColor()
          )}>
            {link.title}
          </div>
          {/* Cấp 2 - Các mục con */}
          <div className="pl-8"> {/* Thụt vào sâu hơn */}
            {link.children.map((child, childIdx) => (
              <a
                key={childIdx}
                href={child.url}
                className={cn(
                  "block py-2 pl-4 pr-2 font-inter text-sm", // Thụt vào cho mục con
                  getTextColor(),
                  theme === "dark" ? "hover:text-dseza-dark-primary" : "hover:text-dseza-light-primary"
                )}
              >
                {child.title}
              </a>
            ))}
          </div>
        </>
      ) : (
        // Cấp 1 - Mục không có con
        <a
          href={link.url}
          className={cn(
            "block py-2 pl-4 pr-2 font-inter text-sm", // Căn lề tương tự như mục cha có con
            getTextColor(),
            theme === "dark" ? "hover:text-dseza-dark-primary" : "hover:text-dseza-light-primary"
          )}
        >
          {link.title}
        </a>
      )}
    </div>
  ))}
</div>
                              </div>
                            ))}
                          </CollapsibleContent>
                        </Collapsible>
                      ) : (
                        <a 
                          href={item.url}
                          className={cn(
                            "block py-3 px-2",
                            getTextColor(),
                            "font-montserrat font-semibold text-lg",
                            getBorderColor(),
                            "border-b"
                          )}
                        >
                          {item.title}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Settings Footer */}
                <div className={cn(
                  "p-4 border-t",
                  getBorderColor(),
                  getBgColor()
                )}>
                  {/* Date/Time & Site Map */}
                  <div className="flex justify-between items-center">
                    <span className={cn(
                      "font-inter text-xs",
                      getSecondaryTextColor()
                    )}>
                      {formatDate(currentDateTime, true)}
                    </span>
                    
                    <a
                      href="https://dseza.danang.gov.vn/so-do-site"
                      className={cn(
                        "font-inter text-xs",
                        getPrimaryColor()
                      )}
                    >
                      <span className="flex items-center">
                        <Map className="w-3 h-3 mr-1" />
                        Sơ đồ site
                      </span>
                    </a>
                  </div>
                  
                  {/* Language & Theme Toggles */}
                  <div className="flex justify-between items-center mt-3">
                    <LanguageSwitcher />
                    <ThemeToggle />
                  </div>
                  
                  {/* Login Button */}
                  <div className="mt-4">
                    <Button
                      className={cn(
                        "w-full py-2.5 px-5 font-inter font-medium text-base rounded-md",
                        getPrimaryBgColor(),
                        getPrimaryHoverBgColor(),
                        theme === "dark" ? "text-dseza-dark-main-bg" : "text-white"
                      )}
                    >
                      Đăng nhập
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      
      {/* Spacer to offset the fixed header */}
      <div className="h-16"></div>
    </>
  );
};

// Language Switcher Component
const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();
  const { theme } = useTheme();
  
  const getActiveClass = (lang: string) => {
    const isActive = language === lang;
    return cn(
      "font-inter text-sm",
      isActive 
        ? (theme === "dark" ? "text-dseza-dark-primary font-semibold" : "text-dseza-light-primary font-semibold") 
        : (theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text")
    );
  };
  
  return (
    <div className="flex items-center">
      <button 
        onClick={toggleLanguage} 
        className={getActiveClass("vi")}
      >
        Tiếng Việt
      </button>
      <span className={cn(
        "mx-1",
        theme === "dark" ? "text-dseza-dark-border" : "text-dseza-light-border"
      )}>
        /
      </span>
      <button 
        onClick={toggleLanguage} 
        className={getActiveClass("en")}
      >
        English
      </button>
    </div>
  );
};

// Theme Toggle Component
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <button 
      onClick={toggleTheme}
      className={cn(
        "flex items-center space-x-1 font-inter text-sm",
        isDark ? "text-dseza-dark-primary" : "text-dseza-light-primary"
      )}
    >
      {isDark ? (
        <>
          <span>Dark Mode</span>
          <span className="rounded-full w-4 h-4 bg-dseza-dark-primary"></span>
        </>
      ) : (
        <>
          <span>Light Mode</span>
          <span className="rounded-full w-4 h-4 bg-dseza-light-primary"></span>
        </>
      )}
    </button>
  );
};

export default MobileHeader;
