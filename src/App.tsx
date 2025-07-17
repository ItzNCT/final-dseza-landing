
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
import DocumentSearchPage from "@/pages/Document/DocumentSearchPage";
import EnterpriseListPage from "@/pages/Enterprise/EnterpriseListPage";
import WorkSchedulePage from "@/pages/Schedule/WorkSchedulePage";
import QnAListPage from "@/pages/QnA/QnAListPage";
import CreateQuestionPage from "@/pages/QnA/CreateQuestionPage";
import ContactPage from "@/pages/Contact/ContactPage";
import LoginPage from "@/pages/Auth/LoginPage";
import RegisterPage from "@/pages/Auth/RegisterPage";
import ProfilePage from "@/pages/Auth/ProfilePage";
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
                      <Route path="/tien-ich/hoi-dap" element={<QnAListPage />} />
                      <Route path="/tien-ich/hoi-dap/tao-moi" element={<CreateQuestionPage />} />
                      <Route path="/lien-he" element={<ContactPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/dang-nhap" element={<LoginPage />} />
                      <Route path="/dang-ky" element={<RegisterPage />} />
                      <Route path="/ho-so" element={<ProfilePage />} />
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
