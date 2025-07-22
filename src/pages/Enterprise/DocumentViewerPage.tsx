import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { LoadingSpinner } from '../../components/ui/loading-spinner';
import { useTheme } from '../../context/ThemeContext';
import { ChevronRight, FileText, Download, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';
import TopBar from '../../components/hero/TopBar';
import LogoSearchBar from '../../components/hero/LogoSearchBar';
import NavigationBar from '../../components/hero/NavigationBar';
import Footer from '../../components/Footer';

// Interface for single document
interface DocumentDetails {
  id: string;
  title: string;
  docNumber: string;
  releaseDate: string;
  fileUrl: string;
}

// Base URL
const DRUPAL_BASE_URL = import.meta.env.VITE_DRUPAL_BASE_URL || 
  (import.meta.env.DEV ? '' : 'https://dseza-backend.lndo.site');

// Function to fetch single document by ID
const fetchSingleDocument = async (docId: string): Promise<DocumentDetails | null> => {
  try {
    console.log('🔍 Fetching single document:', docId);
    
    // Fetch the specific document with includes
    const response = await fetch(
      `${DRUPAL_BASE_URL}/jsonapi/node/tai_lieu_doanh_nghiep/${docId}?include=field_file_dinh_kem,field_file_dinh_kem.field_media_document`, 
      {
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
        },
      }
    );

    if (!response.ok) {
      console.log('❌ Failed to fetch document:', response.status);
      return null;
    }

    const data = await response.json();
    console.log('📄 Document response:', data);

    const item = data.data;
    if (!item) {
      console.log('❌ No document data found');
      return null;
    }

    // Extract file URL
    let fileUrl = '';
    if (item.relationships?.field_file_dinh_kem?.data && data.included) {
      const fileRelationship = Array.isArray(item.relationships.field_file_dinh_kem.data) 
        ? item.relationships.field_file_dinh_kem.data[0] 
        : item.relationships.field_file_dinh_kem.data;

      if (fileRelationship) {
        // Find media document
        const mediaDocument = data.included.find((inc: any) => 
          inc.type === fileRelationship.type && inc.id === fileRelationship.id
        );

        if (mediaDocument?.relationships?.field_media_document?.data) {
          const mediaFileRelationship = mediaDocument.relationships.field_media_document.data;
          const fileEntity = data.included.find((inc: any) => 
            inc.type === mediaFileRelationship.type && inc.id === mediaFileRelationship.id
          );

          if (fileEntity?.attributes?.uri?.url) {
            const url = fileEntity.attributes.uri.url;
            fileUrl = url.startsWith('http') ? url : `${DRUPAL_BASE_URL}${url}`;
          }
        }
      }
    }

    // If still no file URL, try direct media fetch
    if (!fileUrl && item.relationships?.field_file_dinh_kem?.data) {
      const mediaRef = Array.isArray(item.relationships.field_file_dinh_kem.data) 
        ? item.relationships.field_file_dinh_kem.data[0] 
        : item.relationships.field_file_dinh_kem.data;
      
      if (mediaRef?.id) {
        console.log('🔄 Trying direct media fetch for:', mediaRef.id);
        try {
          const mediaResponse = await fetch(
            `${DRUPAL_BASE_URL}/jsonapi/media/document/${mediaRef.id}?include=field_media_document`, 
            {
              headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
              },
            }
          );
          
          if (mediaResponse.ok) {
            const mediaData = await mediaResponse.json();
            if (mediaData.included && mediaData.included.length > 0) {
              const fileEntity = mediaData.included.find((item: any) => item.type === 'file--file');
              if (fileEntity?.attributes?.uri?.url) {
                const url = fileEntity.attributes.uri.url;
                fileUrl = url.startsWith('http') ? url : `${DRUPAL_BASE_URL}${url}`;
                console.log('🎉 Direct media fetch success:', fileUrl);
              }
            }
          }
        } catch (error) {
          console.log('❌ Direct media fetch failed:', error);
        }
      }
    }

    console.log('📄 Final document data:', {
      id: item.id,
      title: item.attributes.title,
      fileUrl
    });

    return {
      id: item.id,
      title: item.attributes.title || 'Không có tiêu đề',
      docNumber: item.attributes.field_so_ky_hieu || 'N/A',
      releaseDate: item.attributes.field_ngay_ban_hanh 
        ? new Date(item.attributes.field_ngay_ban_hanh).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })
        : 'N/A',
      fileUrl: fileUrl || '',
    };
  } catch (error) {
    console.error('❌ Error fetching single document:', error);
    return null;
  }
};

const DocumentViewerPage: React.FC = () => {
  const { theme } = useTheme();
  const { docId } = useParams<{ docId: string }>();

  // Use React Query to fetch single document
  const { data: document, isLoading, isError } = useQuery({
    queryKey: ['singleDocument', docId],
    queryFn: () => fetchSingleDocument(docId!),
    enabled: !!docId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  const isDark = theme === 'dark';
  const bgClass = isDark ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg';
  const textClass = isDark ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text';
  const secondaryTextClass = isDark ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text';
  const cardClass = isDark ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary';
  const borderClass = isDark ? 'border-dseza-dark-border' : 'border-dseza-light-border';

  if (isLoading) {
    return (
      <div className={`min-h-screen flex flex-col ${bgClass}`}>
        <TopBar />
        <LogoSearchBar />
        <NavigationBar />
        <main className="flex-1 pt-52">
          <div className="flex justify-center items-center h-screen">
            <div className="text-center">
              <LoadingSpinner size="lg" />
              <p className={`mt-4 text-sm ${secondaryTextClass}`}>
                Đang tải tài liệu...
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`min-h-screen flex flex-col ${bgClass}`}>
        <TopBar />
        <LogoSearchBar />
        <NavigationBar />
        <main className="flex-1 pt-52">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-red-500 py-10">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h2 className="text-xl font-semibold mb-2">Lỗi khi tải dữ liệu</h2>
              <p>Không thể tải dữ liệu tài liệu. Vui lòng thử lại sau.</p>
              <div className="mt-6">
                <Link 
                  to="/doanh-nghiep/bao-cao-du-lieu"
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isDark 
                      ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary hover:bg-dseza-dark-primary/30' 
                      : 'bg-dseza-light-primary/20 text-dseza-light-primary hover:bg-dseza-light-primary/30'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Quay lại
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!document) {
    return (
      <div className={`min-h-screen flex flex-col ${bgClass}`}>
        <TopBar />
        <LogoSearchBar />
        <NavigationBar />
        <main className="flex-1 pt-52">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-10">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h2 className={`text-xl font-semibold mb-2 ${textClass}`}>Không tìm thấy tài liệu</h2>
              <p className={secondaryTextClass}>Tài liệu bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
              <div className="mt-6">
                <Link 
                  to="/doanh-nghiep/bao-cao-du-lieu"
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isDark 
                      ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary hover:bg-dseza-dark-primary/30' 
                      : 'bg-dseza-light-primary/20 text-dseza-light-primary hover:bg-dseza-light-primary/30'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Quay lại danh sách
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${bgClass}`}>
      {/* Header components */}
      <TopBar />
      <LogoSearchBar />
      <NavigationBar />

      {/* Main content */}
      <main className="flex-1 pt-52">
        {/* Breadcrumb */}
        <div className={`py-3 ${isDark ? 'bg-dseza-dark-secondary/50' : 'bg-dseza-light-secondary/50'} border-b ${borderClass}`}>
          <div className="container mx-auto px-4">
            <nav className={`flex items-center space-x-2 text-sm ${secondaryTextClass}`}>
              <Link 
                to="/" 
                className={`transition-colors hover:underline ${isDark ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Trang chủ
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link 
                to="/doanh-nghiep" 
                className={`transition-colors hover:underline ${isDark ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Doanh nghiệp
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link 
                to="/doanh-nghiep/bao-cao-du-lieu" 
                className={`transition-colors hover:underline ${isDark ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Báo cáo dữ liệu
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${textClass}`}>
                {document.title}
              </span>
            </nav>
          </div>
        </div>

        {/* Document Header */}
        <div className="container mx-auto px-4 py-8">
          <div className={`p-6 rounded-lg ${cardClass} ${borderClass} border mb-8`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <h1 className={`text-2xl md:text-3xl font-bold mb-4 ${textClass}`}>
                  {document.title}
                </h1>
                <div className={`space-y-2 text-sm ${secondaryTextClass}`}>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Số/Ký hiệu:</span>
                    <span>{document.docNumber || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Ngày ban hành:</span>
                    <span>{document.releaseDate || 'N/A'}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className={`
                    inline-flex items-center space-x-2
                    ${isDark 
                      ? 'border-dseza-dark-primary text-dseza-dark-primary hover:bg-dseza-dark-primary hover:text-dseza-dark-main-text' 
                      : 'border-dseza-light-primary text-dseza-light-primary hover:bg-dseza-light-primary hover:text-white'
                    }
                    transition-colors duration-200
                  `}
                  onClick={() => window.open(document.fileUrl, '_blank', 'noopener,noreferrer')}
                  disabled={!document.fileUrl}
                >
                  <Download className="w-4 h-4" />
                  <span>Tải về</span>
                </Button>
                <Link to="/doanh-nghiep/bao-cao-du-lieu">
                  <Button variant="ghost" className={`w-full ${secondaryTextClass} hover:${textClass}`}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Quay lại
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* PDF Viewer */}
          {document.fileUrl ? (
            <div className={`rounded-lg ${cardClass} ${borderClass} border overflow-hidden`}>
              <div className="w-full h-[80vh] bg-gray-100">
                <iframe
                  src={document.fileUrl}
                  title={document.title}
                  width="100%"
                  height="100%"
                  className="border-0"
                />
              </div>
            </div>
          ) : (
            <div className={`rounded-lg ${cardClass} ${borderClass} border p-8 text-center`}>
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className={`text-lg font-semibold mb-2 ${textClass}`}>Không có file đính kèm</h3>
              <p className={secondaryTextClass}>Tài liệu này hiện chưa có file đính kèm để xem.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DocumentViewerPage; 