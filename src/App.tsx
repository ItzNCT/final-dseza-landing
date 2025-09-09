
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import MobileLayout from "./components/mobile/MobileLayout";
import AccessibilityPanel from "./components/AccessibilityPanel";
import LanguageLayout from "./components/LanguageLayout";
import RootRedirect from "./components/RootRedirect";

// Lazily loaded pages for code-splitting
const Index = React.lazy(() => import("./pages/Index"));
const ArticleDetailPage = React.lazy(() => import("@/pages/Article/ArticleDetailPage"));
const ArticleListPage = React.lazy(() => import("@/pages/News/ArticleListPage"));
const DocumentSearchPage = React.lazy(() => import("@/pages/Document/DocumentSearchPage"));
const DocumentTabLayout = React.lazy(() => import("@/pages/Document/Layout/DocumentTabLayout"));
const EnterpriseListPage = React.lazy(() => import("@/pages/Enterprise/EnterpriseListPage"));
const WorkSchedulePage = React.lazy(() => import("@/pages/Schedule/WorkSchedulePage"));
const QnAListPage = React.lazy(() => import("@/pages/QnA/QnAListPage"));
const CreateQuestionPage = React.lazy(() => import("@/pages/QnA/CreateQuestionPage"));
const QnADetailPage = React.lazy(() => import("@/pages/QnA/QnADetailPage"));
const ContactPage = React.lazy(() => import("@/pages/Contact/ContactPage"));
const LoginPage = React.lazy(() => import("@/pages/Auth/LoginPage"));
const CallbackPage = React.lazy(() => import("@/pages/Auth/CallbackPage"));
const RegisterPage = React.lazy(() => import("@/pages/Auth/RegisterPage"));
const ProfilePage = React.lazy(() => import("@/pages/Auth/ProfilePage"));
const DocumentListPage = React.lazy(() => import("@/pages/Enterprise/DocumentListPage"));
const DocumentViewerPage = React.lazy(() => import("@/pages/Enterprise/DocumentViewerPage"));
const RecruitmentPage = React.lazy(() => import("@/pages/Enterprise/RecruitmentPage"));
const ManagementBoardOverviewPage = React.lazy(() => import("./pages/Introduction/ManagementBoardOverviewPage"));
const FunctionsDutiesPage = React.lazy(() => import("./pages/Introduction/FunctionsDutiesPage").then(m => ({ default: m.FunctionsDutiesPage })));
const DepartmentsPage = React.lazy(() => import("./pages/Introduction/DepartmentsPage").then(m => ({ default: m.DepartmentsPage })));
const AffiliatedUnitsPage = React.lazy(() => import("./pages/Introduction/AffiliatedUnitsPage").then(m => ({ default: m.AffiliatedUnitsPage })));
const WelcomeLetterPage = React.lazy(() => import("./pages/Introduction/WelcomeLetterPage"));
const DanangOverviewPage = React.lazy(() => import("./pages/Introduction/DanangOverviewPage"));
const FunctionalZonesListPage = React.lazy(() => import("./pages/Functionalzone/FunctionalZonesListPage"));
const FunctionalzoneDetailPage = React.lazy(() => import("./pages/Functionalzone/FunctionalzoneDetailPage"));
// const FunctionalzoneLayout = React.lazy(() => import("./pages/Functionalzone/FunctionalzoneLayout")); // not used
const KhuCongNgheCaoDaNang = React.lazy(() => import("./pages/Functionalzone/KhuCongNgheCaoDaNang"));
const KhuThuongMaiTuDoDaNang = React.lazy(() => import("./pages/Functionalzone/KhuThuongMaiTuDoDaNang"));
const KhuCNTTTapTrung = React.lazy(() => import("./pages/Functionalzone/KhuCNTTTapTrung"));
const KhuCongNghiepHoaKhanh = React.lazy(() => import("./pages/Functionalzone/KhuCongNghiepHoaKhanh"));
const KhuCongNghiepHoaKhanhMoRong = React.lazy(() => import("./pages/Functionalzone/KhuCongNghiepHoaKhanhMoRong"));
const KhuCongNghiepDaNang = React.lazy(() => import("./pages/Functionalzone/KhuCongNghiepDaNang"));
const KhuCongNghiepDichVuThuySanDaNang = React.lazy(() => import("./pages/Functionalzone/KhuCongNghiepDichVuThuySanDaNang"));
const KhuCongNghiepHoaCam = React.lazy(() => import("./pages/Functionalzone/KhuCongNghiepHoaCam"));
const KhuCongNghiepLienChieu = React.lazy(() => import("./pages/Functionalzone/KhuCongNghiepLienChieu"));
const KhuCongNghiepHoaNinh = React.lazy(() => import("./pages/Functionalzone/KhuCongNghiepHoaNinh"));
const InvestmentGuidePage = React.lazy(() => import("./pages/Brochure/InvestmentGuidePage"));
const InvestmentPolicyPage = React.lazy(() => import("./pages/Brochure/InvestmentPolicyPage"));
const BrochurePage = React.lazy(() => import("./pages/Brochure/BrochurePage"));
const DraftFeedbackPage = React.lazy(() => import("./pages/Feedback/DraftFeedbackPage"));
const DraftDetailPage = React.lazy(() => import("./pages/Feedback/DraftDetailPage"));
const VanBanHuongDanPage = React.lazy(() => import("./pages/Feedback/VanBanHuongDanPage"));
const ResourceListPage = React.lazy(() => import("@/pages/Resource/ResourceListPage"));
const FaqPage = React.lazy(() => import("./pages/QnA/FaqPage"));
const SiteMapPage = React.lazy(() => import("./pages/SiteMap/SiteMapPage"));

// Article route translations
const articleRoutes = { vi: 'bai-viet', en: 'article' };

// Create a client
const queryClient = new QueryClient();

const App: React.FC = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
        <ThemeProvider>
          <LanguageProvider>
            <AccessibilityProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <MobileLayout>
                    <React.Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                      {/* Global callback route for OIDC */}
                      <Route path="/auth/callback" element={<CallbackPage />} />
                      {/* Root redirect - handles URLs without language prefix */}
                      <Route path="/" element={<RootRedirect />} />
                      
                      {/* Language-prefixed routes */}
                      <Route path="/:lang" element={<LanguageLayout />}>
                        {/* Main routes */}
                        <Route index element={<Index />} />
                        <Route path={`${articleRoutes.vi}/:identifier`} element={<ArticleDetailPage />} />
                        <Route path={`${articleRoutes.en}/:identifier`} element={<ArticleDetailPage />} />
                        {/* SEO-friendly article routes now directly handled by ArticleDetailPage */}
                        <Route path="bai-viet/*" element={<ArticleDetailPage />} />
                        <Route path="article/*" element={<ArticleDetailPage />} />
                        
                        {/* Redirect old search paths */}
                        <Route path="van-ban/tim-kiem" element={<Navigate to="../van-ban" replace />} />
                        <Route path="documents/search" element={<Navigate to="../documents" replace />} />

                        {/* Document pages with nested routes - Vietnamese */}
                        <Route path="van-ban" element={<DocumentTabLayout />}>
                          <Route index element={<Navigate to="van-ban-phap-luat/quy-dinh-trung-uong" replace />} />
                          <Route path=":category/:subcategory" element={<DocumentSearchPage />} />
                        </Route>
                        
                        {/* Document pages with nested routes - English */}
                        <Route path="documents" element={<DocumentTabLayout />}>
                          <Route index element={<Navigate to="legal-documents/central-legal-regulations" replace />} />
                          <Route path=":category/:subcategory" element={<DocumentSearchPage />} />
                        </Route>
                        
                        {/* Draft feedback routes */}
                        <Route path="van-ban/huong-dan-gop-y/gop-y-du-thao-van-ban" element={<DraftFeedbackPage />} />
                        <Route path="van-ban/huong-dan-gop-y/gop-y-du-thao-van-ban/:id" element={<DraftDetailPage />} />
                        <Route path="documents/guidelines-feedback/draft-document-feedback" element={<DraftFeedbackPage />} />
                        <Route path="documents/guidelines-feedback/draft-document-feedback/:id" element={<DraftDetailPage />} />
                        <Route path="van-ban/huong-dan-gop-y/van-ban-huong-dan" element={<VanBanHuongDanPage />} />
                        <Route path="documents/guidelines-feedback/guideline-documents" element={<VanBanHuongDanPage />} />
                        
                        {/* Enterprise routes - Vietnamese */}
                        <Route path="doanh-nghiep/thong-tin-doanh-nghiep/thong-ke-doanh-nghiep" element={<EnterpriseListPage />} />
                        <Route path="doanh-nghiep/van-ban/chi-tiet/:docId" element={<DocumentViewerPage />} />
                        <Route path="doanh-nghiep/tai-lieu/chi-tiet/:docId" element={<DocumentViewerPage />} />
                        <Route path="doanh-nghiep/bao-cao-du-lieu/chi-tiet/:docId" element={<DocumentViewerPage />} />
                        <Route path="doanh-nghiep/tuyen-dung" element={<RecruitmentPage />} />
                        <Route path="doanh-nghiep/thong-tin-doanh-nghiep/:docCategorySlug" element={<DocumentListPage />} />
                        <Route path="doanh-nghiep/van-ban/:docCategorySlug" element={<DocumentListPage />} />
                        <Route path="doanh-nghiep/tai-lieu/:docCategorySlug" element={<DocumentListPage />} />
                        <Route path="doanh-nghiep/bao-cao-du-lieu/:docCategory" element={<DocumentListPage />} />
                        
                        {/* Enterprise routes - English (business) */}
                        <Route path="enterprise/enterprise-information/enterprise-statistics" element={<EnterpriseListPage />} />
                        <Route path="enterprise/documents/detail/:docId" element={<DocumentViewerPage />} />
                        <Route path="enterprise/reports-data/detail/:docId" element={<DocumentViewerPage />} />
                        <Route path="enterprise/recruitment" element={<RecruitmentPage />} />
                        <Route path="enterprise/enterprise-information/:docCategorySlug" element={<DocumentListPage />} />
                        <Route path="enterprise/documents/:docCategorySlug" element={<DocumentListPage />} />
                        <Route path="enterprise/reports-data/:docCategory" element={<DocumentListPage />} />
                        
                        {/* Enterprise routes - English (enterprises) */}
                        <Route path="enterprises/enterprise-information/enterprise-statistics" element={<EnterpriseListPage />} />
                        <Route path="enterprises/documents/detail/:docId" element={<DocumentViewerPage />} />
                        {/* Fallback old detail path for backward compatibility */}
                        <Route path="enterprises/reports-data/detail/:docId" element={<DocumentViewerPage />} />
                        <Route path="enterprises/recruitment" element={<RecruitmentPage />} />
                        <Route path="enterprises/enterprise-information/:docCategorySlug" element={<DocumentListPage />} />
                        <Route path="enterprises/documents/:docCategorySlug" element={<DocumentListPage />} />
                        <Route path="enterprises/reports-data/:docCategory" element={<DocumentListPage />} />
                        
                        {/* News routes - Vietnamese */}
                        <Route path="tin-tuc/lich-cong-tac" element={<WorkSchedulePage />} />
                        <Route path="tin-tuc/moi-truong-dau-tu" element={<ArticleListPage />} />
                        <Route path="tin-tuc/danh-cho-nha-dau-tu" element={<ArticleListPage />} />
                        <Route path="tin-tuc/:category/:subcategory" element={<ArticleListPage />} />
                        <Route path="tin-tuc/:category" element={<ArticleListPage />} />
                        
                        {/* News routes - English */}
                        <Route path="news/work-schedule" element={<WorkSchedulePage />} />
                        <Route path="news/investment-environment" element={<ArticleListPage />} />
                        <Route path="news/for-investors" element={<ArticleListPage />} />
                        <Route path="news/:category/:subcategory" element={<ArticleListPage />} />
                        <Route path="news/:category" element={<ArticleListPage />} />
                        
                        {/* Q&A and utilities routes - Vietnamese */}
                        <Route path="tien-ich/hoi-dap/:id" element={<QnADetailPage />} />
                        <Route path="tien-ich/hoi-dap/tao-moi" element={<CreateQuestionPage />} />
                        <Route path="tien-ich/hoi-dap" element={<QnAListPage />} />
                        <Route path="tien-ich/cau-hoi-thuong-gap" element={<FaqPage />} />

                         {/* Resources - Vietnamese and English top-level shortcuts */}
                         <Route path="tai-nguyen" element={<ResourceListPage />} />
                         <Route path="resources" element={<ResourceListPage />} />
                        
                        {/* Q&A and utilities routes - English */}
                        <Route path="utilities/qna/:id" element={<QnADetailPage />} />
                        <Route path="utilities/qna/create" element={<CreateQuestionPage />} />
                        <Route path="utilities/qna" element={<QnAListPage />} />
                        <Route path="utilities/faq" element={<FaqPage />} />
                        <Route path="utilities/qa/:id" element={<QnADetailPage />} />
                        <Route path="utilities/qa" element={<QnAListPage />} />
                        <Route path="utilities/frequently-asked-questions" element={<FaqPage />} />
                        <Route path="faq" element={<FaqPage />} />
                        
                        {/* Site map routes */}
                        <Route path="so-do-site" element={<SiteMapPage />} />
                        <Route path="site-map" element={<SiteMapPage />} />
                        
                        {/* Contact and auth routes */}
                        <Route path="lien-he" element={<ContactPage />} />
                        <Route path="contact" element={<ContactPage />} />
                        
                        <Route path="dang-nhap" element={<LoginPage />} />
                        <Route path="auth/callback" element={<CallbackPage />} />
                        <Route path="dang-ky" element={<RegisterPage />} />
                        <Route path="ho-so" element={<ProfilePage />} />
                        
                        {/* Introduction routes */}
                        <Route path="gioi-thieu/gioi-thieu-chung" element={<Navigate to="tong-quan-ve-ban-quan-ly" replace />} />
                        <Route path="gioi-thieu/gioi-thieu-chung/thu-ngo" element={<WelcomeLetterPage />} />
                        <Route path="gioi-thieu/gioi-thieu-chung/tong-quan-ve-da-nang" element={<DanangOverviewPage />} />
                        <Route path="gioi-thieu/gioi-thieu-chung/tong-quan-ve-ban-quan-ly" element={<ManagementBoardOverviewPage />} />
                        <Route path="gioi-thieu/gioi-thieu-chung/chuc-nang-nhiem-vu" element={<FunctionsDutiesPage />} />
                        <Route path="gioi-thieu/gioi-thieu-chung/co-cau-to-chuc" element={<DepartmentsPage />} />
                        <Route path="gioi-thieu/gioi-thieu-chung/don-vi-truc-thuoc" element={<AffiliatedUnitsPage />} />
                        
                        {/* English Introduction routes */}
                        <Route path="introduction/general-introduction" element={<Navigate to="overview-of-management-board" replace />} />
                        <Route path="introduction/general-introduction/welcome-letter" element={<WelcomeLetterPage />} />
                        <Route path="introduction/general-introduction/overview-of-da-nang" element={<DanangOverviewPage />} />
                        <Route path="introduction/general-introduction/overview-of-management-board" element={<ManagementBoardOverviewPage />} />
                        <Route path="introduction/general-introduction/functions-and-tasks" element={<FunctionsDutiesPage />} />
                        <Route path="introduction/general-introduction/organizational-structure" element={<DepartmentsPage />} />
                        <Route path="introduction/general-introduction/subordinate-units" element={<AffiliatedUnitsPage />} />
                        
                        {/* Functional zones routes */}
                        <Route path="introduction/functional-zones" element={<FunctionalZonesListPage />} />
                        <Route path="gioi-thieu/cac-khu-chuc-nang" element={<FunctionalZonesListPage />} />
                        
                        {/* Investment guide routes */}
                        <Route path="cam-nang-dau-tu" element={<InvestmentGuidePage />} />
                        <Route path="cam-nang-dau-tu/chinh-sach-uu-dai" element={<InvestmentPolicyPage />} />
                        <Route path="cam-nang-dau-tu/brochure" element={<BrochurePage />} />
                        <Route path="investment-handbook" element={<InvestmentGuidePage />} />
                        
                        {/* Vietnamese Functional Zone Specific Routes */}
                        <Route path="gioi-thieu/cac-khu-chuc-nang/khu-cong-nghe-cao-da-nang" element={<KhuCongNgheCaoDaNang />} />
                        <Route path="gioi-thieu/cac-khu-chuc-nang/khu-thuong-mai-tu-do-da-nang" element={<KhuThuongMaiTuDoDaNang />} />
                        <Route path="gioi-thieu/cac-khu-chuc-nang/khu-cntt-tap-trung" element={<KhuCNTTTapTrung />} />
                        <Route path="gioi-thieu/cac-khu-chuc-nang/khu-cong-nghiep-hoa-khanh" element={<KhuCongNghiepHoaKhanh />} />
                        <Route path="gioi-thieu/cac-khu-chuc-nang/khu-cong-nghiep-hoa-khanh-mo-rong" element={<KhuCongNghiepHoaKhanhMoRong />} />
                        <Route path="gioi-thieu/cac-khu-chuc-nang/khu-cong-nghiep-da-nang" element={<KhuCongNghiepDaNang />} />
                        <Route path="gioi-thieu/cac-khu-chuc-nang/khu-cong-nghiep-dich-vu-thuy-san-da-nang" element={<KhuCongNghiepDichVuThuySanDaNang />} />
                        <Route path="gioi-thieu/cac-khu-chuc-nang/khu-cong-nghiep-hoa-cam" element={<KhuCongNghiepHoaCam />} />
                        <Route path="gioi-thieu/cac-khu-chuc-nang/khu-cong-nghiep-lien-chieu" element={<KhuCongNghiepLienChieu />} />
                        <Route path="gioi-thieu/cac-khu-chuc-nang/khu-cong-nghiep-hoa-ninh" element={<KhuCongNghiepHoaNinh />} />
                        
                        {/* English Functional Zone Specific Routes */}
                        <Route path="introduction/functional-zones/da-nang-hi-tech-park" element={<KhuCongNgheCaoDaNang />} />
                        <Route path="introduction/functional-zones/da-nang-free-trade-zone" element={<KhuThuongMaiTuDoDaNang />} />
                        <Route path="introduction/functional-zones/it-concentration-zone" element={<KhuCNTTTapTrung />} />
                        <Route path="introduction/functional-zones/hoa-khanh-industrial-park" element={<KhuCongNghiepHoaKhanh />} />
                        <Route path="introduction/functional-zones/hoa-khanh-expanded-industrial-park" element={<KhuCongNghiepHoaKhanhMoRong />} />
                        <Route path="introduction/functional-zones/da-nang-industrial-park" element={<KhuCongNghiepDaNang />} />
                        <Route path="introduction/functional-zones/da-nang-seafood-service-industrial-park" element={<KhuCongNghiepDichVuThuySanDaNang />} />
                        <Route path="introduction/functional-zones/hoa-cam-industrial-park" element={<KhuCongNghiepHoaCam />} />
                        <Route path="introduction/functional-zones/lien-chieu-industrial-park" element={<KhuCongNghiepLienChieu />} />
                        <Route path="introduction/functional-zones/hoa-ninh-industrial-park" element={<KhuCongNghiepHoaNinh />} />
                        
                        {/* Functional Zone Detail Pages */}
                        <Route path="functionalzone/:slug" element={<FunctionalzoneDetailPage />} />
                        
                        {/* Language Test Component - Development only */}
    
                        {/* SEO-friendly URLs (Drupal path aliases) - handled by ArticleDetailPage */}
                        <Route path="*" element={<ArticleDetailPage />} />
                        
                        {/* 404 - This should be the last route */}
                        {/* <Route path="*" element={<NotFound />} /> */}
                      </Route>
                      
                      {/* Catch-all for invalid URLs without language prefix */}
                      <Route path="*" element={<RootRedirect />} />
                    </Routes>
                    </React.Suspense>
                    {/* Accessibility Panel - available on all pages */}
                    <AccessibilityPanel />
                  </MobileLayout>
                </BrowserRouter>
              </TooltipProvider>
            </AccessibilityProvider>
          </LanguageProvider>
        </ThemeProvider>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
