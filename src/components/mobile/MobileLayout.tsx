import React from "react";
import MobileHeader from "./MobileHeader";
import MobileHero from "./MobileHero";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "react-router-dom";

interface MobileLayoutProps {
  children?: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const location = useLocation();

  // Chuẩn hoá path và gom tất cả "từ khoá ẩn hero" vào một mảng
  const path = location.pathname.toLowerCase();

  const HIDE_KEYS = [
    // Liên hệ
    "lien-he", "contact",

    // Bài viết / Tin tức
    "bai-viet", "tin-tuc", "news", "article",

    // Dynamic Article Handler (thêm đủ biến thể)
    "dynamic-article", "dynamic-article-handler", "dynamicarticlehandler",

    // Giới thiệu / Introduction
    "gioi-thieu", "introduction", "open-letter", "welcome", "thu-ngo",

    // Cơ cấu / đơn vị
    "co-cau-to-chuc", "departments",
    "don-vi-truc-thuoc", "affiliated-units", "subsidiary-units",

    // Chức năng nhiệm vụ
    "chuc-nang-nhiem-vu", "functions-duties",

    // Tổng quan
    "tong-quan-ve-ban-quan-ly", "management-overview",
    "tong-quan-ve-da-nang", "danang-overview",

    // Khu chức năng
    "cac-khu-chuc-nang", "functional",

    // Lịch công tác
    "lich-cong-tac", "work-schedule",

    // Doanh nghiệp
    "doanh-nghiep", "enterprise",

    // Văn bản
    "van-ban", "documents",   

    // Tiện ích
    "tien-ich", "utilities",

    // Câu hỏi thường gặp
    "cau-hoi-thuong-gap", "faq",

    // Tài nguyên
    "tai-nguyen", "resources",

    // Cẩm nang đầu tư
    "cam-nang-dau-tu", "investment-handbook",

    // Chính sách ưu đãi
    "chinh-sach-uu-dai", "preferential-policy",

    // Brochure
    "brochure", "brochure",
    
  ];

  // Ẩn hero nếu path chứa 1 trong các khoá trên
  const shouldHideHero = HIDE_KEYS.some((key) => path.includes(key));

  // Chỉ render MobileHeader/MobileHero trên thiết bị mobile
  if (!isMobile) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen">
      <MobileHeader />
      {!shouldHideHero && (
        <header className="mobile-hero">
          <MobileHero />
        </header>
      )}
      <main>{children}</main>
    </div>
  );
};

export default MobileLayout;
