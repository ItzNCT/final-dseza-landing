
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ArticleDetailPage from "@/pages/Article/ArticleDetailPage";
import ArticleListPage from "@/pages/News/ArticleListPage";
import DocumentSearchPage from "@/pages/Document/DocumentSearchPage";
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
import InvestmentGuidePage from "./pages/Brochure/InvestmentGuidePage";
import InvestmentPolicyPage from "./pages/Brochure/InvestmentPolicyPage";
import BrochurePage from "./pages/Brochure/BrochurePage";
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
                      <Route path="/van-ban" element={<DocumentSearchPage />} />
                      <Route path="/doanh-nghiep/thong-tin-doanh-nghiep/thong-ke-doanh-nghiep" element={<EnterpriseListPage />} />
                      <Route path="/tin-tuc/lich-cong-tac" element={<WorkSchedulePage />} />
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
