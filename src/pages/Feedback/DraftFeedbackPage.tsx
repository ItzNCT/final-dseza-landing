import React from "react";
import { Link } from "react-router-dom";
import { 
  ChevronRight,
  FileText, 
  Calendar,
  Download,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useDraftDocuments } from "@/hooks/useDraftDocuments";
import { useTranslation } from "react-i18next";

// Import complete header structure
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";

// Import UI components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

/**
 * DraftDocumentCard - Component để hiển thị thông tin một dự thảo văn bản
 */
interface DraftDocumentCardProps {
  document: {
    id: string;
    title: string;
    summary?: string;
    publishedDate: string;
    feedbackEndDate?: string;
    documentUrl?: string;
    path: string;
    isOpen: boolean;
  };
  theme: string;
}

const DraftDocumentCard: React.FC<DraftDocumentCardProps> = ({ document, theme }) => {
  const { t } = useTranslation();
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const cardBg = theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-main-bg';
  const textColor = theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text';
  const secondaryTextColor = theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text';
  const borderColor = theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border';
  const hoverColor = theme === 'dark' ? 'hover:bg-dseza-dark-hover' : 'hover:bg-dseza-light-hover';
  const primaryColor = theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary';

  return (
    <Card className={`${cardBg} ${borderColor} border transition-all duration-200 ${hoverColor}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className={`text-lg font-semibold ${textColor} line-clamp-2 flex-1`}>
            {document.title}
          </CardTitle>
          <Badge 
            variant={document.isOpen ? "default" : "secondary"}
            className={`shrink-0 ${
              document.isOpen 
                ? 'bg-green-100 text-green-800 border-green-200' 
                : 'bg-gray-100 text-gray-600 border-gray-200'
            }`}
          >
            {document.isOpen ? (
              <>
                <Clock className="w-3 h-3 mr-1" />
                {t('draft.card.statusOpen')}
              </>
            ) : (
              <>
                <CheckCircle className="w-3 h-3 mr-1" />
                {t('draft.card.statusClosed')}
              </>
            )}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Summary */}
        {document.summary && (
          <p className={`${secondaryTextColor} text-sm mb-4 line-clamp-3`}>
            {document.summary}
          </p>
        )}

        {/* Dates */}
        <div className="space-y-2 mb-4">
          <div className={`flex items-center gap-2 text-sm ${secondaryTextColor}`}>
            <Calendar className="w-4 h-4" />
            <span>{t('draft.card.published')} {formatDate(document.publishedDate)}</span>
          </div>
          
          {document.feedbackEndDate && (
            <div className={`flex items-center gap-2 text-sm ${secondaryTextColor}`}>
              <AlertTriangle className="w-4 h-4" />
              <span>
                {t('draft.card.deadline')} {formatDate(document.feedbackEndDate)}
              </span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2">
          <Button 
            asChild
            variant="outline" 
            size="sm"
            className={`${borderColor} ${textColor} hover:${primaryColor}`}
          >
            <Link to={document.path}>
              <FileText className="w-4 h-4 mr-2" />
              {t('draft.card.viewDetail')}
            </Link>
          </Button>

          {document.documentUrl && (
            <Button 
              asChild
              variant="outline" 
              size="sm"
              className={`${borderColor} ${textColor} hover:${primaryColor}`}
            >
              <a 
                href={document.documentUrl} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Download className="w-4 h-4 mr-2" />
                {t('draft.card.download')}
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * DraftFeedbackPage - Trang hiển thị danh sách dự thảo văn bản lấy ý kiến
 */
const DraftFeedbackPage: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { openDrafts, closedDrafts, isLoading, isError, error } = useDraftDocuments();
  const { t } = useTranslation();

  const textColor = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";
  const secondaryTextColor = theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text";
  const primaryColor = theme === "dark" ? "text-dseza-dark-primary" : "text-dseza-light-primary";
  const primaryHoverColor = theme === "dark" ? "hover:text-dseza-dark-primary" : "hover:text-dseza-light-primary";

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
      {/* Complete Header Structure */}
      <TopBar />
      <LogoSearchBar />
      <NavigationBar />
      
      {/* Main Content */}
      <main className="flex-1 pt-52">
        {/* Breadcrumb */}
        <div className={`py-3 ${theme === 'dark' ? 'bg-dseza-dark-secondary/50' : 'bg-dseza-light-secondary/50'}`}>
          <div className="container mx-auto px-4">
            <nav className={`flex items-center space-x-2 text-sm ${secondaryTextColor}`}>
              <Link 
                to={language === 'en' ? '/en' : '/'} 
                className={`transition-colors ${primaryHoverColor}`}
              >
                {t('draft.breadcrumb.home')}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link 
                to={`${language === 'en' ? '/en' : ''}/van-ban`} 
                className={`transition-colors ${primaryHoverColor}`}
              >
                {t('draft.breadcrumb.documents')}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link 
                to={`${language === 'en' ? '/en' : ''}/van-ban/huong-dan-gop-y`} 
                className={`transition-colors ${primaryHoverColor}`}
              >
                {t('draft.breadcrumb.guide')}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${textColor}`}>
                {t('draft.breadcrumb.list')}
              </span>
            </nav>
          </div>
        </div>

        {/* Page Title */}
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className={`text-3xl md:text-4xl font-bold ${textColor} mb-4`}>
              {t('draft.pageTitle')}
            </h1>
            <p className={`text-lg ${secondaryTextColor} max-w-3xl mx-auto`}>
              {t('draft.description')}
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-16">
              <LoadingSpinner size="lg" />
              <span className={`ml-3 ${textColor}`}>{t('draft.loading')}</span>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="text-center py-16">
              <div className={`text-red-500 mb-4`}>
                <AlertTriangle className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t('draft.errorTitle')}</h3>
                <p>{error?.message || t('draft.errorLoading')}</p>
              </div>
            </div>
          )}

          {/* Content */}
          {!isLoading && !isError && (
            <Tabs defaultValue="open" className="w-full">
              <TabsList className={`grid w-full grid-cols-2 mb-8 ${
                theme === 'dark' 
                  ? 'bg-dseza-dark-secondary border-dseza-dark-border' 
                  : 'bg-dseza-light-secondary border-dseza-light-border'
              }`}>
                <TabsTrigger 
                  value="open"
                  className={`${textColor} data-[state=active]:${primaryColor}`}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  {t('draft.tabs.open')} ({openDrafts.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="closed"
                  className={`${textColor} data-[state=active]:${primaryColor}`}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {t('draft.tabs.closed')} ({closedDrafts.length})
                </TabsTrigger>
              </TabsList>

              {/* Tab: Dự thảo đang lấy ý kiến */}
              <TabsContent value="open" className="space-y-6">
                {openDrafts.length > 0 ? (
                  <div className="grid gap-6">
                    {openDrafts.map((document) => (
                      <DraftDocumentCard 
                        key={document.id} 
                        document={document} 
                        theme={theme}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Clock className={`w-16 h-16 mx-auto mb-4 ${secondaryTextColor}`} />
                    <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>
                      {t('draft.emptyOpen.title')}
                    </h3>
                    <p className={secondaryTextColor}>
                      {t('draft.emptyOpen.desc')}
                    </p>
                  </div>
                )}
              </TabsContent>

              {/* Tab: Dự thảo hết thời gian lấy ý kiến */}
              <TabsContent value="closed" className="space-y-6">
                {closedDrafts.length > 0 ? (
                  <div className="grid gap-6">
                    {closedDrafts.map((document) => (
                      <DraftDocumentCard 
                        key={document.id} 
                        document={document} 
                        theme={theme}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <CheckCircle className={`w-16 h-16 mx-auto mb-4 ${secondaryTextColor}`} />
                    <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>
                      {t('draft.emptyClosed.title')}
                    </h3>
                    <p className={secondaryTextColor}>
                      {t('draft.emptyClosed.desc')}
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DraftFeedbackPage; 