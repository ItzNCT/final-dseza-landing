import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { 
  ChevronRight,
  FileText, 
  Calendar,
  Download,
  ExternalLink,
  Clock,
  AlertTriangle,
  Tag,
  MessageCircle
} from 'lucide-react';
import { useTheme } from "@/context/ThemeContext";

// Import complete header structure
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";

// Import UI components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Separator } from "@/components/ui/separator";
import CommentSection from "@/components/comments/CommentSection";

// Base URL pattern consistent with other hooks in the project
const DRUPAL_BASE_URL = import.meta.env.VITE_DRUPAL_BASE_URL || 
  (import.meta.env.DEV ? '' : 'https://dseza-backend.lndo.site');

// JSON:API headers
const jsonApiHeaders = {
  'Content-Type': 'application/vnd.api+json',
  'Accept': 'application/vnd.api+json',
};

// Interface cho dữ liệu dự thảo văn bản chi tiết
interface DraftDocumentDetail {
  id: string;
  title: string;
  content?: string;
  publishedDate: string;
  feedbackEndDate?: string;
  field: string; // Lĩnh vực hoạt động
  isOpen: boolean;
  attachedFiles: Array<{
    id: string;
    name: string;
    url: string;
    size?: string;
    type?: string;
  }>;
}

/**
 * Fetch draft document detail from Drupal JSON:API
 */
async function fetchDraftDocumentDetail(uuid: string): Promise<DraftDocumentDetail | null> {
  try {
    // Fetch the specific draft document with includes
    const url = `${DRUPAL_BASE_URL}/jsonapi/node/du_thao_van_ban/${uuid}`
      + '?include=field_linh_vuc,field_file_dinh_kem,field_file_dinh_kem.field_media_document';

    console.log('🔍 Fetching draft document detail from:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: jsonApiHeaders,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error Response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    console.log('📄 Raw draft document detail response:', data);

    const item = data.data;
    if (!item) {
      console.log('❌ No document data found');
      return null;
    }

    // Extract field (lĩnh vực) from included data
    let field = 'Không xác định';
    if (item.relationships?.field_linh_vuc?.data && data.included) {
      const fieldId = item.relationships.field_linh_vuc.data.id;
      const fieldItem = data.included.find((inc: any) => 
        inc.type === 'taxonomy_term--linh_vuc_hoat_dong' && inc.id === fieldId
      );
      if (fieldItem) {
        field = fieldItem.attributes.name;
      }
    }

    // Extract attached files from included data
    const attachedFiles: Array<{
      id: string;
      name: string;
      url: string;
      size?: string;
      type?: string;
    }> = [];

    if (item.relationships?.field_file_dinh_kem?.data && data.included) {
      const fileRelationships = Array.isArray(item.relationships.field_file_dinh_kem.data) 
        ? item.relationships.field_file_dinh_kem.data 
        : [item.relationships.field_file_dinh_kem.data];

      fileRelationships.forEach((fileRelation: any) => {
        const mediaEntity = data.included.find((inc: any) => 
          inc.type === 'media--document' && inc.id === fileRelation.id
        );
        
        if (mediaEntity?.relationships?.field_media_document?.data) {
          const documentFileId = mediaEntity.relationships.field_media_document.data.id;
          const documentFile = data.included.find((inc: any) => 
            inc.type === 'file--file' && inc.id === documentFileId
          );
          
          if (documentFile?.attributes?.uri?.url) {
            const fileName = documentFile.attributes.filename || mediaEntity.attributes.name || 'Tài liệu đính kèm';
            const fileUrl = `${DRUPAL_BASE_URL}${documentFile.attributes.uri.url}`;
            const fileSize = documentFile.attributes.filesize 
              ? `${Math.round(documentFile.attributes.filesize / 1024)} KB`
              : undefined;
            const fileType = documentFile.attributes.filemime || undefined;
            
            attachedFiles.push({
              id: documentFile.id,
              name: fileName,
              url: fileUrl,
              size: fileSize,
              type: fileType,
            });
          }
        }
      });
    }

    // Determine if the document is still open for feedback
    const currentDate = new Date();
    const endDate = item.attributes?.field_thoi_gian_lay_y_kien 
      ? new Date(item.attributes.field_thoi_gian_lay_y_kien) 
      : null;
    const isOpen = endDate ? endDate >= currentDate : false;

    return {
      id: item.id,
      title: item.attributes?.title || '',
      content: item.attributes?.body?.processed || item.attributes?.body?.value || '',
      publishedDate: item.attributes?.created || '',
      feedbackEndDate: item.attributes?.field_thoi_gian_lay_y_kien || '',
      field,
      isOpen,
      attachedFiles,
    };
  } catch (error) {
    console.error('❌ Error fetching draft document detail:', error);
    throw new Error(`Failed to fetch draft document detail: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * DraftDetailPage - Trang chi tiết dự thảo văn bản
 */
const DraftDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();

  // Fetch draft document detail
  const { data: document, isLoading, isError, error } = useQuery({
    queryKey: ['draftDocumentDetail', id],
    queryFn: () => fetchDraftDocumentDetail(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes cache time
    retry: 3,
  });

  const textColor = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";
  const secondaryTextColor = theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text";
  const primaryColor = theme === "dark" ? "text-dseza-dark-primary" : "text-dseza-light-primary";
  const primaryHoverColor = theme === "dark" ? "hover:text-dseza-dark-primary" : "hover:text-dseza-light-primary";
  const cardBg = theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-main-bg';
  const borderColor = theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border';

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
                to="/" 
                className={`transition-colors ${primaryHoverColor}`}
              >
                Trang chủ
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link 
                to="/van-ban" 
                className={`transition-colors ${primaryHoverColor}`}
              >
                Văn bản
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link 
                to="/van-ban/huong-dan-gop-y" 
                className={`transition-colors ${primaryHoverColor}`}
              >
                Hướng dẫn góp ý
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link 
                to="/van-ban/huong-dan-gop-y/gop-y-du-thao-van-ban" 
                className={`transition-colors ${primaryHoverColor}`}
              >
                Góp ý dự thảo văn bản
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${textColor} line-clamp-1`}>
                {document?.title || 'Chi tiết dự thảo'}
              </span>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-16">
              <LoadingSpinner size="lg" />
              <span className={`ml-3 ${textColor}`}>Đang tải dữ liệu...</span>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="text-center py-16">
              <div className={`text-red-500 mb-4`}>
                <AlertTriangle className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Có lỗi xảy ra</h3>
                <p>{error?.message || 'Không thể tải dữ liệu dự thảo văn bản'}</p>
              </div>
              <Button asChild variant="outline" className="mt-4">
                <Link to="/van-ban/huong-dan-gop-y/gop-y-du-thao-van-ban">
                  Quay lại danh sách
                </Link>
              </Button>
            </div>
          )}

          {/* Document Details */}
          {!isLoading && !isError && document && (
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Document Header */}
              <Card className={`${cardBg} ${borderColor} border`}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className={`text-2xl font-bold ${textColor} flex-1`}>
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
                          Đang lấy ý kiến
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Hết thời gian lấy ý kiến
                        </>
                      )}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Document Meta Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`flex items-center gap-2 text-sm ${secondaryTextColor}`}>
                      <Calendar className="w-4 h-4" />
                      <span>Ngày công bố: {formatDate(document.publishedDate)}</span>
                    </div>
                    
                    {document.feedbackEndDate && (
                      <div className={`flex items-center gap-2 text-sm ${secondaryTextColor}`}>
                        <Clock className="w-4 h-4" />
                        <span>Hết hạn góp ý: {formatDate(document.feedbackEndDate)}</span>
                      </div>
                    )}
                    
                    <div className={`flex items-center gap-2 text-sm ${secondaryTextColor}`}>
                      <Tag className="w-4 h-4" />
                      <span>Lĩnh vực: {document.field}</span>
                    </div>
                  </div>

                  {/* Attached Files Section */}
                  {document.attachedFiles.length > 0 && (
                    <div className="mt-6">
                      <h3 className={`text-lg font-semibold ${textColor} mb-4 flex items-center gap-2`}>
                        <FileText className="w-5 h-5" />
                        Tài liệu đính kèm
                      </h3>
                      <div className="grid gap-3">
                        {document.attachedFiles.map((file) => (
                          <div 
                            key={file.id}
                            className={`flex items-center justify-between p-3 rounded-lg border ${borderColor} ${
                              theme === 'dark' ? 'bg-dseza-dark-hover/30' : 'bg-dseza-light-hover/30'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <FileText className={`w-5 h-5 ${primaryColor}`} />
                              <div>
                                <p className={`font-medium ${textColor}`}>{file.name}</p>
                                {(file.size || file.type) && (
                                  <p className={`text-xs ${secondaryTextColor}`}>
                                    {file.type && file.type.includes('/') ? file.type.split('/')[1].toUpperCase() : ''} 
                                    {file.size && ` • ${file.size}`}
                                  </p>
                                )}
                              </div>
                            </div>
                            <Button 
                              asChild
                              variant="outline" 
                              size="sm"
                              className={`${borderColor} ${textColor} hover:${primaryColor}`}
                            >
                              <a 
                                href={file.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Tải xuống
                                <ExternalLink className="w-3 h-3 ml-1" />
                              </a>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Document Content */}
                  {document.content && (
                    <div className="mt-6">
                      <Separator className="mb-6" />
                      <div 
                        className={`prose prose-lg max-w-none ${theme === 'dark' ? 'prose-invert' : ''} ${textColor}`}
                        dangerouslySetInnerHTML={{ __html: document.content }}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Comments Section */}
              <Card className={`${cardBg} ${borderColor} border`}>
                <CardHeader>
                  <CardTitle className={`text-xl font-semibold ${textColor} flex items-center gap-2`}>
                    <MessageCircle className="w-5 h-5" />
                    Góp ý và bình luận
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {document.isOpen ? (
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 text-sm">
                        Dự thảo này đang trong thời gian lấy ý kiến. Bạn có thể gửi góp ý, bình luận bên dưới.
                      </p>
                    </div>
                  ) : (
                    <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-amber-800 text-sm">
                        Thời gian lấy ý kiến cho dự thảo này đã kết thúc. Bạn vẫn có thể xem các bình luận đã được gửi.
                      </p>
                    </div>
                  )}
                  
                  <CommentSection articleId={document.id} />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DraftDetailPage; 