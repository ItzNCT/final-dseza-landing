
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ArticleDetailPage from "@/pages/Article/ArticleDetailPage";
import ArticleListPage from "@/pages/News/ArticleListPage";
import DocumentSearchPage from "@/pages/Document/DocumentSearchPage";
import DocumentTabLayout from "@/pages/Document/Layout/DocumentTabLayout";
import EnterpriseListPage from "@/pages/Enterprise/EnterpriseListPage";
import WorkSchedulePage from "@/pages/Schedule/WorkSchedulePage";
import QnAListPage from "@/pages/QnA/QnAListPage";
import CreateQuestionPage from "@/pages/QnA/CreateQuestionPage";
import ContactPage from "@/pages/Contact/ContactPage";
import LoginPage from "@/pages/Auth/LoginPage";
import RegisterPage from "@/pages/Auth/RegisterPage";
import ProfilePage from "@/pages/Auth/ProfilePage";
import DocumentListPage from "@/pages/Enterprise/DocumentListPage";
import DocumentViewerPage from "@/pages/Enterprise/DocumentViewerPage";
import RecruitmentPage from "@/pages/Enterprise/RecruitmentPage";
import ManagementBoardOverviewPage from "./pages/Introduction/ManagementBoardOverviewPage";
import { FunctionsDutiesPage } from "./pages/Introduction/FunctionsDutiesPage";
import { DepartmentsPage } from "./pages/Introduction/DepartmentsPage";
import { AffiliatedUnitsPage } from "./pages/Introduction/AffiliatedUnitsPage";
import WelcomeLetterPage from "./pages/Introduction/WelcomeLetterPage";
import DanangOverviewPage from "./pages/Introduction/DanangOverviewPage";
import FunctionalZonesListPage from "./pages/Introduction/FunctionalZonesListPage";
import FunctionalzoneDetailPage from "./pages/Functionalzone/FunctionalzoneDetailPage";
import FunctionalzoneLayout from "./pages/Functionalzone/FunctionalzoneLayout";
// Import 10 Industrial Zone Components
import KhuCongNgheCaoDaNang from "./pages/Functionalzone/KhuCongNgheCaoDaNang";
import KhuThuongMaiTuDoDaNang from "./pages/Functionalzone/KhuThuongMaiTuDoDaNang";
import KhuCNTTTapTrung from "./pages/Functionalzone/KhuCNTTTapTrung";
import KhuCongNghiepHoaKhanh from "./pages/Functionalzone/KhuCongNghiepHoaKhanh";
import KhuCongNghiepHoaKhanhMoRong from "./pages/Functionalzone/KhuCongNghiepHoaKhanhMoRong";
import KhuCongNghiepDaNang from "./pages/Functionalzone/KhuCongNghiepDaNang";
import KhuCongNghiepDichVuThuySanDaNang from "./pages/Functionalzone/KhuCongNghiepDichVuThuySanDaNang";
import KhuCongNghiepHoaCam from "./pages/Functionalzone/KhuCongNghiepHoaCam";
import KhuCongNghiepLienChieu from "./pages/Functionalzone/KhuCongNghiepLienChieu";
import KhuCongNghiepHoaNinh from "./pages/Functionalzone/KhuCongNghiepHoaNinh";
import InvestmentGuidePage from "./pages/Brochure/InvestmentGuidePage";
import InvestmentPolicyPage from "./pages/Brochure/InvestmentPolicyPage";
import BrochurePage from "./pages/Brochure/BrochurePage";
import InvestmentEnvironmentPage from "./pages/News/InvestmentEnvironmentPage";
import InvestorGuidelinesPage from "./pages/News/InvestorGuidelinesPage";
import MobileLayout from "./components/mobile/MobileLayout";
import AccessibilityPanel from "./components/AccessibilityPanel";

// Create a client
const queryClient = new QueryClient();

const App: React.FC = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <LanguageProvider>
            <AccessibilityProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <MobileLayout>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/bai-viet/:uuid" element={<ArticleDetailPage />} />
                      <Route path="/su-kien/:uuid" element={<ArticleDetailPage />} />
                      {/* Document pages with nested routes */}
                      <Route path="/van-ban" element={<DocumentTabLayout />}>
                        <Route index element={<Navigate to="/van-ban/van-ban-phap-luat/phap-quy-trung-uong" replace />} />
                        <Route path=":category/:subcategory" element={<DocumentSearchPage />} />
                      </Route>
                      <Route path="/doanh-nghiep/thong-tin-doanh-nghiep/thong-ke-doanh-nghiep" element={<EnterpriseListPage />} />
                      <Route path="/tin-tuc/lich-cong-tac" element={<WorkSchedulePage />} />
                      {/* Specific route for investment environment page */}
                      <Route path="/tin-tuc/moi-truong-dau-tu" element={<InvestmentEnvironmentPage />} />
                      {/* Specific route for investor guidelines page */}
                      <Route path="/tin-tuc/danh-cho-nha-dau-tu" element={<InvestorGuidelinesPage />} />
                      {/* Dynamic routes for news categories - IMPORTANT: longer routes must come first */}
                      <Route path="/tin-tuc/:category/:subcategory" element={<ArticleListPage />} />
                      <Route path="/tin-tuc/:category" element={<ArticleListPage />} />
                      <Route path="/tien-ich/hoi-dap" element={<QnAListPage />} />
                      <Route path="/tien-ich/hoi-dap/tao-moi" element={<CreateQuestionPage />} />
                      <Route path="/lien-he" element={<ContactPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/dang-nhap" element={<LoginPage />} />
                      <Route path="/dang-ky" element={<RegisterPage />} />
                      <Route path="/ho-so" element={<ProfilePage />} />
                      <Route path="/gioi-thieu/gioi-thieu-chung/thu-ngo" element={<WelcomeLetterPage />} />
                      <Route path="/gioi-thieu/gioi-thieu-chung/tong-quan-ve-da-nang" element={<DanangOverviewPage />} />
                      <Route path="/gioi-thieu/gioi-thieu-chung/tong-quan-ve-ban-quan-ly" element={<ManagementBoardOverviewPage />} />
                      <Route path="/gioi-thieu/gioi-thieu-chung/chuc-nang-nhiem-vu" element={<FunctionsDutiesPage />} />
                      <Route path="/gioi-thieu/gioi-thieu-chung/co-cau-to-chuc" element={<DepartmentsPage />} />
                      <Route path="/gioi-thieu/gioi-thieu-chung/don-vi-truc-thuoc" element={<AffiliatedUnitsPage />} />
                      <Route path="/cam-nang-dau-tu" element={<InvestmentGuidePage />} />
                      <Route path="/cam-nang-dau-tu/chinh-sach-uu-dai" element={<InvestmentPolicyPage />} />
                      <Route path="/cam-nang-dau-tu/brochure" element={<BrochurePage />} />
                      <Route path="/gioi-thieu/cac-khu-chuc-nang" element={<FunctionalZonesListPage />} />
                      
                      {/* 10 Industrial Zone Specific Routes */}
                      <Route path="/gioi-thieu/cac-khu-chuc-nang/khu-cong-nghe-cao-da-nang" element={<KhuCongNgheCaoDaNang />} />
                      <Route path="/gioi-thieu/cac-khu-chuc-nang/khu-thuong-mai-tu-do-da-nang" element={<KhuThuongMaiTuDoDaNang />} />
                      <Route path="/gioi-thieu/cac-khu-chuc-nang/khu-cntt-tap-trung" element={<KhuCNTTTapTrung />} />
                      <Route path="/gioi-thieu/cac-khu-chuc-nang/khu-cong-nghiep-hoa-khanh" element={<KhuCongNghiepHoaKhanh />} />
                      <Route path="/gioi-thieu/cac-khu-chuc-nang/khu-cong-nghiep-hoa-khanh-mo-rong" element={<KhuCongNghiepHoaKhanhMoRong />} />
                      <Route path="/gioi-thieu/cac-khu-chuc-nang/khu-cong-nghiep-da-nang" element={<KhuCongNghiepDaNang />} />
                      <Route path="/gioi-thieu/cac-khu-chuc-nang/khu-cong-nghiep-dich-vu-thuy-san-da-nang" element={<KhuCongNghiepDichVuThuySanDaNang />} />
                      <Route path="/gioi-thieu/cac-khu-chuc-nang/khu-cong-nghiep-hoa-cam" element={<KhuCongNghiepHoaCam />} />
                      <Route path="/gioi-thieu/cac-khu-chuc-nang/khu-cong-nghiep-lien-chieu" element={<KhuCongNghiepLienChieu />} />
                      <Route path="/gioi-thieu/cac-khu-chuc-nang/khu-cong-nghiep-hoa-ninh" element={<KhuCongNghiepHoaNinh />} />
                      
                      {/* Functional Zone Detail Pages */}
                      <Route path="/functionalzone/:slug" element={<FunctionalzoneDetailPage />} />
                      <Route path="/doanh-nghiep/tai-lieu/chi-tiet/:docId" element={<DocumentViewerPage />} />
                      <Route path="/doanh-nghiep/tuyen-dung" element={<RecruitmentPage />} />
                      {/* ROUTE 1: Dành riêng cho trang "Thủ tục - Hồ sơ - Dữ liệu môi trường" */}
                      <Route path="/doanh-nghiep/thong-tin-doanh-nghiep/:docCategorySlug" element={<DocumentListPage />} />
                      {/* ROUTE 2: Dành cho các trang tài liệu doanh nghiệp khác */}
                      <Route path="/doanh-nghiep/tai-lieu/:docCategorySlug" element={<DocumentListPage />} />
                      {/* Route cũ để backward compatibility */}
                      <Route path="/doanh-nghiep/bao-cao-du-lieu/:docCategory" element={<DocumentListPage />} />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    {/* Accessibility Panel - available on all pages */}
                    <AccessibilityPanel />
                  </MobileLayout>
                </BrowserRouter>
              </TooltipProvider>
            </AccessibilityProvider>
          </LanguageProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
