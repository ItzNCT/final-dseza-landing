import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { LoadingSpinner } from '../../components/ui/loading-spinner';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
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

// Function to fetch single document by ID with language support
const fetchSingleDocument = async (docId: string, language: 'vi' | 'en' = 'vi'): Promise<DocumentDetails | null> => {
  try {
    console.log('🔍 Fetching single document:', docId, 'Language:', language);
    
    // Use language-aware endpoint
    const languagePrefix = language === 'en' ? '/en' : '/vi';
    const endpoint = `${DRUPAL_BASE_URL}${languagePrefix}/jsonapi/node/tai_lieu_doanh_nghiep/${docId}?include=field_file_dinh_kem,field_file_dinh_kem.field_media_document`;
    
    // Fetch the specific document with includes
    const response = await fetch(endpoint, {
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          'Accept-Language': language,
          'Content-Language': language,
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
        ? new Date(item.attributes.field_ngay_ban_hanh).toLocaleDateString(
            language === 'en' ? 'en-US' : 'vi-VN', 
            {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            }
          )
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
  const { language } = useLanguage();
  const { docId } = useParams<{ docId: string }>();

  // Dynamic breadcrumb links based on language and current path
  const getBreadcrumbLinks = () => {
    const isEnterpriseRoute = window.location.pathname.includes('/enterprises/');
    const isDocumentRoute = window.location.pathname.includes('/tai-lieu/');
    const isVanBanRoute = window.location.pathname.includes('/van-ban/');
    
    if (language === 'en') {
      return {
        home: '/',
        business: isEnterpriseRoute ? '/enterprises' : '/business',
        documents: isEnterpriseRoute ? '/enterprises/reports-data' : '/business/reports-data',
        businessLabel: isEnterpriseRoute ? 'Enterprises' : 'Business',
        documentsLabel: 'Documents'
      };
    } else {
      return {
        home: '/',
        business: '/doanh-nghiep',
        documents: isDocumentRoute ? '/doanh-nghiep/tai-lieu' : (isVanBanRoute ? '/doanh-nghiep/van-ban' : '/doanh-nghiep/bao-cao-du-lieu'),
        businessLabel: 'Doanh nghiệp',
        documentsLabel: isDocumentRoute ? 'Tài liệu' : (isVanBanRoute ? 'Văn bản' : 'Báo cáo dữ liệu')
      };
    }
  };

  const breadcrumbLinks = getBreadcrumbLinks();

  // Use React Query to fetch single document with language support
  const { data: documentData, isLoading, isError } = useQuery({
    queryKey: ['singleDocument', docId, language], // Include language in query key
    queryFn: () => fetchSingleDocument(docId!, language),
    enabled: !!docId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // SEO and metadata management
  useEffect(() => {
    if (documentData) {
      const pageTitle = language === 'en' 
        ? `${documentData.title} - Document Viewer - DSEZA`
        : `${documentData.title} - Xem tài liệu - DSEZA`;
      
      const pageDescription = language === 'en'
        ? `View document: ${documentData.title}. Document number: ${documentData.docNumber}. Release date: ${documentData.releaseDate}.`
        : `Xem tài liệu: ${documentData.title}. Số/Ký hiệu: ${documentData.docNumber}. Ngày ban hành: ${documentData.releaseDate}.`;

      // Set document title
      document.title = pageTitle;

      // Set meta description
      const metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      if (metaDescription) {
        metaDescription.content = pageDescription;
      } else {
        const newMetaDescription = document.createElement('meta');
        newMetaDescription.name = 'description';
        newMetaDescription.content = pageDescription;
        document.head.appendChild(newMetaDescription);
      }

      // Set Open Graph tags
      const ogTags = [
        { property: 'og:title', content: pageTitle },
        { property: 'og:description', content: pageDescription },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: window.location.href },
        { property: 'og:site_name', content: 'DSEZA' },
        { property: 'og:locale', content: language === 'en' ? 'en_US' : 'vi_VN' },
      ];

      ogTags.forEach(tag => {
        let ogTag = document.querySelector(`meta[property="${tag.property}"]`) as HTMLMetaElement;
        if (ogTag) {
          ogTag.content = tag.content;
        } else {
          ogTag = document.createElement('meta');
          ogTag.setAttribute('property', tag.property);
          ogTag.content = tag.content;
          document.head.appendChild(ogTag);
        }
      });

      // Set canonical URL
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (canonicalLink) {
        canonicalLink.href = window.location.href;
      } else {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        canonicalLink.href = window.location.href;
        document.head.appendChild(canonicalLink);
      }

      // --- Alternate hreflang links (SEO improvement) ---
      const currentPath = window.location.pathname; // full path with language prefix
      const isEnglishPath = currentPath.startsWith('/en/');
      const subPath = currentPath.replace(/^\/(en|vi)/, ''); // remove the leading language segment

      // Mapping rules between Vietnamese and English detail paths
      const viDetailPrefixes = [
        '/doanh-nghiep/bao-cao-du-lieu/chi-tiet/',
        '/doanh-nghiep/tai-lieu/chi-tiet/',
        '/doanh-nghiep/van-ban/chi-tiet/',
      ];
      const enDetailPrefix = '/enterprises/documents/detail/';

      let alternateViUrl = `${window.location.origin}${subPath}`; // default fallback (vi current)
      let alternateEnUrl = `${window.location.origin}/en${subPath.startsWith('/') ? subPath.slice(1) : subPath}`; // default fallback (en current)

      if (!isEnglishPath) {
        // Current page is Vietnamese → build English equivalent
        for (const viPrefix of viDetailPrefixes) {
          if (subPath.startsWith(viPrefix)) {
            const idPart = subPath.slice(viPrefix.length);
            alternateEnUrl = `${window.location.origin}${enDetailPrefix}${idPart}`;
            break;
          }
        }
        alternateViUrl = `${window.location.origin}${subPath}`;
      } else {
        // Current page is English → build Vietnamese equivalent (default to báo‐cáo‐dữ‐liệu path)
        if (subPath.startsWith('/enterprises/documents/detail/')) {
          const idPart = subPath.slice('/enterprises/documents/detail/'.length);
          alternateViUrl = `${window.location.origin}/doanh-nghiep/bao-cao-du-lieu/chi-tiet/${idPart}`;
        }
        alternateEnUrl = `${window.location.origin}${subPath}`;
      }

      const hreflangLinks = [
        { href: alternateViUrl, hreflang: 'vi' },
        { href: alternateEnUrl, hreflang: 'en' },
        { href: window.location.href, hreflang: 'x-default' },
      ];

      hreflangLinks.forEach(linkInfo => {
        let linkTag = document.querySelector(`link[rel="alternate"][hreflang="${linkInfo.hreflang}"]`) as HTMLLinkElement;
        if (linkTag) {
          linkTag.href = linkInfo.href;
        } else {
          linkTag = document.createElement('link');
          linkTag.rel = 'alternate';
          linkTag.hreflang = linkInfo.hreflang;
          linkTag.href = linkInfo.href;
          document.head.appendChild(linkTag);
        }
      });

      // Set Schema.org structured data
      const existingSchema = document.querySelector('script[type="application/ld+json"]');
      if (existingSchema) {
        existingSchema.remove();
      }

      const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'DigitalDocument',
        name: documentData.title,
        description: pageDescription,
        url: window.location.href,
        inLanguage: language === 'en' ? 'en-US' : 'vi-VN',
        datePublished: documentData.releaseDate !== 'N/A' ? documentData.releaseDate : undefined,
        identifier: documentData.docNumber !== 'N/A' ? documentData.docNumber : undefined,
        publisher: {
          '@type': 'Organization',
          name: 'DSEZA',
          url: window.location.origin
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: language === 'en' ? 'Home' : 'Trang chủ', item: window.location.origin + breadcrumbLinks.home },
            { '@type': 'ListItem', position: 2, name: breadcrumbLinks.businessLabel, item: window.location.origin + breadcrumbLinks.business },
            { '@type': 'ListItem', position: 3, name: breadcrumbLinks.documentsLabel, item: window.location.origin + breadcrumbLinks.documents },
            { '@type': 'ListItem', position: 4, name: documentData.title, item: window.location.href }
          ]
        }
      };

      const schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.textContent = JSON.stringify(schemaData);
      document.head.appendChild(schemaScript);
    }
  }, [documentData, language]);

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
                {language === 'en' ? 'Loading document...' : 'Đang tải tài liệu...'}
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
              <h2 className="text-xl font-semibold mb-2">
                {language === 'en' ? 'Error Loading Data' : 'Lỗi khi tải dữ liệu'}
              </h2>
              <p>
                {language === 'en' 
                  ? 'Unable to load document data. Please try again later.' 
                  : 'Không thể tải dữ liệu tài liệu. Vui lòng thử lại sau.'}
              </p>
              <div className="mt-6">
                <Link 
                  to={breadcrumbLinks.documents}
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isDark 
                      ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary hover:bg-dseza-dark-primary/30' 
                      : 'bg-dseza-light-primary/20 text-dseza-light-primary hover:bg-dseza-light-primary/30'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Go Back' : 'Quay lại'}
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!documentData) {
    return (
      <div className={`min-h-screen flex flex-col ${bgClass}`}>
        <TopBar />
        <LogoSearchBar />
        <NavigationBar />
        <main className="flex-1 pt-52">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-10">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h2 className={`text-xl font-semibold mb-2 ${textClass}`}>
                {language === 'en' ? 'Document Not Found' : 'Không tìm thấy tài liệu'}
              </h2>
              <p className={secondaryTextClass}>
                {language === 'en' 
                  ? 'The document you are looking for does not exist or has been deleted.' 
                  : 'Tài liệu bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.'}
              </p>
              <div className="mt-6">
                <Link 
                  to={breadcrumbLinks.documents}
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isDark 
                      ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary hover:bg-dseza-dark-primary/30' 
                      : 'bg-dseza-light-primary/20 text-dseza-light-primary hover:bg-dseza-light-primary/30'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Back to list' : 'Quay lại danh sách'}
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
                to={breadcrumbLinks.home} 
                className={`transition-colors hover:underline ${isDark ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {language === 'en' ? 'Home' : 'Trang chủ'}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link 
                to={breadcrumbLinks.business} 
                className={`transition-colors hover:underline ${isDark ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {breadcrumbLinks.businessLabel}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link 
                to={breadcrumbLinks.documents} 
                className={`transition-colors hover:underline ${isDark ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {breadcrumbLinks.documentsLabel}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${textClass}`}>
                {documentData.title}
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
                  {documentData.title}
                </h1>
                <div className={`space-y-2 text-sm ${secondaryTextClass}`}>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      {language === 'en' ? 'Document Number:' : 'Số/Ký hiệu:'}
                    </span>
                    <span>{documentData.docNumber || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      {language === 'en' ? 'Release Date:' : 'Ngày ban hành:'}
                    </span>
                    <span>{documentData.releaseDate || 'N/A'}</span>
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
                  onClick={() => window.open(documentData.fileUrl, '_blank', 'noopener,noreferrer')}
                  disabled={!documentData.fileUrl}
                >
                  <Download className="w-4 h-4" />
                  <span>{language === 'en' ? 'Download' : 'Tải về'}</span>
                </Button>
                <Link to={breadcrumbLinks.documents}>
                  <Button variant="ghost" className={`w-full ${secondaryTextClass} hover:${textClass}`}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {language === 'en' ? 'Go Back' : 'Quay lại'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* PDF Viewer */}
          {documentData.fileUrl ? (
            <div className={`rounded-lg ${cardClass} ${borderClass} border overflow-hidden`}>
              <div className="w-full h-[80vh] bg-gray-100">
                <iframe
                  src={documentData.fileUrl}
                  title={documentData.title}
                  width="100%"
                  height="100%"
                  className="border-0"
                />
              </div>
            </div>
          ) : (
            <div className={`rounded-lg ${cardClass} ${borderClass} border p-8 text-center`}>
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className={`text-lg font-semibold mb-2 ${textClass}`}>
                {language === 'en' ? 'No Attached File' : 'Không có file đính kèm'}
              </h3>
              <p className={secondaryTextClass}>
                {language === 'en' 
                  ? 'This document currently has no attached file to view.' 
                  : 'Tài liệu này hiện chưa có file đính kèm để xem.'}
              </p>
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