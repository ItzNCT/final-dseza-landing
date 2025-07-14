import React, { useState, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "@/utils/translations";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InvestmentCard {
  id: string;
  title: string;
  image: string;
  link: string;
}

const InvestmentInformation: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"investors" | "environment">("investors");
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Theme-specific styles
  const textColor = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";
  const secondaryTextColor = theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text";
  const accentColor = theme === "dark" ? "text-dseza-dark-primary-accent" : "text-dseza-light-primary-accent";
  
  // Updated hover colors for navigation arrows
  const navArrowHoverBgColor = theme === "dark" ? "hover:bg-dseza-dark-primary-accent/20" : "hover:bg-dseza-light-primary-accent/20";
  const navArrowHoverTextColor = theme === "dark" ? "hover:text-dseza-dark-primary-accent" : "hover:text-dseza-light-primary-accent";
  
  // Static investor cards data
  const investorCards: InvestmentCard[] = [
    { 
      id: 'inv1', 
      title: "Quy trình lĩnh vực đầu tư", 
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", 
      link: "/tin-tuc/danh-cho-nha-dau-tu/quy-trinh-linh-vuc-dau-tu" 
    },
    { 
      id: 'inv2', 
      title: "Lĩnh vực thu hút đầu tư", 
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", 
      link: "/gioi-thieu/cac-khu-chuc-nang/cac-khu-cong-nghiep-da-nang" 
    },
    { 
      id: 'inv3', 
      title: "Quy hoạch khu chức năng", 
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", 
      link: "/gioi-thieu/cac-khu-chuc-nang/cac-khu-cong-nghiep-da-nang" 
    },
    { 
      id: 'inv4', 
      title: "Đăng ký nộp hồ sơ qua bưu điện", 
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", 
      link: "https://egov.danang.gov.vn/dailyDVc" 
    },
    { 
      id: 'inv5', 
      title: "Tra cứu thủ tục hành chính", 
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", 
      link: "https://dichvucong.danang.gov.vn/vi/" 
    },
    { 
      id: 'inv6', 
      title: "Dịch vụ công trực tuyến", 
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", 
      link: "https://dichvucong.danang.gov.vn/vi/" 
    }
  ];

  // Empty environment cards as requested
  const environmentCards: InvestmentCard[] = [];
  
  const currentCards = activeTab === "investors" ? investorCards : environmentCards;
  
  const cardWidth = 320; 
  const cardGap = 16; 
  const scrollAmount = cardWidth + cardGap;

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    const maxScrollLeft = scrollWidth - clientWidth;

    if (direction === "left") {
      if (scrollLeft <= 0) {
        carouselRef.current.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
      } else {
        carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    } else { 
      if (scrollLeft >= maxScrollLeft - 5) { 
        carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };
  
  return (
    <section className={cn(
      "py-12 px-4 sm:px-6 lg:px-8",
      theme === "dark" ? "bg-[#1D262E]" : "bg-[#FFFFFF]"
    )}>
      <div className="container mx-auto">
        <h2 className={cn(
          "font-montserrat font-bold text-3xl md:text-4xl mb-8",
          textColor
        )}>
          {t('homepage.investmentInfo')}
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column: tabs and navigation */}
          <div className="w-full lg:w-1/3">
            <div className="mb-8">
              <button 
                className={cn(
                  "block font-montserrat font-semibold text-xl mb-4 transition-colors duration-300",
                  activeTab === "investors" ? accentColor : secondaryTextColor,
                  activeTab !== "investors" && (theme === "dark" ? "hover:text-dseza-dark-primary-accent-hover" : "hover:text-dseza-light-primary-accent-hover")
                )}
                onClick={() => setActiveTab("investors")}
              >
                {t('investment.forInvestors')}
              </button>
              
              <button 
                className={cn(
                  "block font-montserrat font-semibold text-xl mb-4 transition-colors duration-300",
                  activeTab === "environment" ? accentColor : secondaryTextColor,
                  activeTab !== "environment" && (theme === "dark" ? "hover:text-dseza-dark-primary-accent-hover" : "hover:text-dseza-light-primary-accent-hover")
                )}
                onClick={() => setActiveTab("environment")}
              >
                {t('investment.investmentEnvironment')}
              </button>
            </div>
            
            <div className="flex space-x-4">
              <button 
                className={cn(
                  "p-2 rounded-full transition-colors duration-300",
                  secondaryTextColor, 
                  navArrowHoverBgColor,
                  navArrowHoverTextColor
                )}
                onClick={() => scrollCarousel("left")}
              >
                <ArrowLeft className="w-8 h-8" />
              </button>
              
              <button 
                className={cn(
                  "p-2 rounded-full transition-colors duration-300",
                  secondaryTextColor, 
                  navArrowHoverBgColor,
                  navArrowHoverTextColor
                )}
                onClick={() => scrollCarousel("right")}
              >
                <ArrowRight className="w-8 h-8" />
              </button>
            </div>
          </div>
          
          {/* Right column: card carousel */}
          <div className="w-full lg:w-2/3">
            {/* Cards Display */}
            {currentCards.length > 0 ? (
              <div 
                ref={carouselRef}
                className="flex overflow-x-auto scrollbar-none gap-4 pb-4 snap-x"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {currentCards.map((card: InvestmentCard) => (
                  <a
                    key={card.id}
                    href={card.link}
                    target={card.link.startsWith('http') ? "_blank" : "_self"}
                    rel={card.link.startsWith('http') ? "noopener noreferrer" : undefined}
                    className="group min-w-[280px] sm:min-w-[320px] h-64 rounded-lg overflow-hidden relative flex-shrink-0 snap-start transition-transform duration-300 hover:scale-[1.05]"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110" 
                      style={{ backgroundImage: `url(${card.image})` }}
                    ></div>
                    <div className="absolute inset-0 bg-black/40 transition-all duration-300 group-hover:bg-black/60"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className={cn(
                        "font-montserrat font-semibold text-lg text-white transition-colors duration-300",
                        "group-hover:text-white/90"
                      )}>
                        {card.title}
                      </h3>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className={cn("text-lg", textColor)}>
                  {activeTab === "environment" 
                    ? "Thông tin môi trường đầu tư đang được cập nhật." 
                    : "Chưa có thông tin đầu tư nào được đăng tải."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentInformation;