import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useDrupalApi } from "@/utils/drupal";
import { useLanguage } from "@/context/LanguageContext";

// Định nghĩa cấu trúc cho một tài liệu
export interface EnterpriseDocument {
  id: string;
  title: string;
  docNumber: string; // Số/Ký hiệu
  releaseDate: string; // Ngày ban hành
  fileUrl: string; // Đường dẫn tải file
  content?: string; // Thêm trường này để chứa nội dung chi tiết
}

// Base URL pattern consistent with other hooks in the project
const DRUPAL_BASE_URL = import.meta.env.VITE_DRUPAL_BASE_URL || 
  (import.meta.env.DEV ? '' : 'https://dseza-backend.lndo.site');

// Utility function to strip HTML tags and decode HTML entities
const stripHtml = (html: string): string => {
  if (!html) return '';
  
  // Create a temporary div to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};

// Utility function to extract href from HTML link
const extractHref = (htmlLink: string): string => {
  if (!htmlLink) return '';
  
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlLink;
  const linkElement = tempDiv.querySelector('a');
  
  if (linkElement) {
    let href = linkElement.getAttribute('href') || '';
    // If it's a relative URL, make it absolute
    if (href.startsWith('/')) {
      href = `${DRUPAL_BASE_URL}${href}`;
    }
    return href;
  }
  
  return '';
};

// Utility function to extract and format date from HTML time element
const extractDate = (htmlTime: string): string => {
  if (!htmlTime) return '';
  
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlTime;
  const timeElement = tempDiv.querySelector('time');
  
  if (timeElement) {
    const datetime = timeElement.getAttribute('datetime');
    if (datetime) {
      // Parse the datetime and format it nicely
      const date = new Date(datetime);
      return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    }
    
    // Fallback to text content
    return timeElement.textContent || '';
  }
  
  return stripHtml(htmlTime);
};

// Utility function to find category ID by name in included data
const getCategoryIdFromName = (categoryName: string, included: any[]): string | null => {
  console.log('🔍 Looking for category:', categoryName);
  console.log('📦 Available taxonomy terms:', included
    .filter(item => item.type && item.type.startsWith('taxonomy_term'))
    .map(item => ({ 
      type: item.type, 
      name: item.attributes?.name,
      id: item.id 
    }))
  );
  
  // Try different possible taxonomy types for document categories
  const possibleTypes = [
    'taxonomy_term--loai_tai_lieu_dn',
    'taxonomy_term--loai_tai_lieu',
    'taxonomy_term--document_category',
    'taxonomy_term--enterprise_document_category'
  ];
  
  for (const type of possibleTypes) {
    const categoryTerm = included.find((item: any) => 
      item.type === type && 
      item.attributes?.name && 
      item.attributes.name.trim() === categoryName.trim()
    );
    
    if (categoryTerm) {
      console.log('✅ Found category match:', { type, name: categoryTerm.attributes.name, id: categoryTerm.id });
      return categoryTerm.id;
    }
  }
  
  // Try fuzzy matching as fallback
  for (const type of possibleTypes) {
    const categoryTerm = included.find((item: any) => 
      item.type === type && 
      item.attributes?.name && 
      (item.attributes.name.toLowerCase().includes(categoryName.toLowerCase()) ||
       categoryName.toLowerCase().includes(item.attributes.name.toLowerCase()))
    );
    
    if (categoryTerm) {
      console.log('✅ Found fuzzy category match:', { type, name: categoryTerm.attributes.name, id: categoryTerm.id });
      return categoryTerm.id;
    }
  }
  
  console.warn('❌ No category match found for:', categoryName);
  return null;
};

// Utility function to extract file URL from JSON:API response
const extractFileUrlFromJsonApi = (item: any, included: any[]): string => {
  try {
    console.log('🔍 Extracting file URL for:', item.attributes?.title);
    console.log('📋 Available relationships:', Object.keys(item.relationships || {}));
    console.log('📦 Total included items:', included.length);
    console.log('📦 Included types:', [...new Set(included.map(inc => inc.type))]);
    
    // Get field_file_dinh_kem relationship
    const fileRelationship = item.relationships?.field_file_dinh_kem?.data;
    if (!fileRelationship) {
      console.log('❌ No field_file_dinh_kem relationship found');
      return '';
    }

    console.log('📁 File relationship data:', fileRelationship);

    // Handle both single file and array of files
    const fileRef = Array.isArray(fileRelationship) ? fileRelationship[0] : fileRelationship;
    if (!fileRef) {
      console.log('❌ No file reference found');
      return '';
    }

    console.log('📁 Looking for media document:', fileRef.type, fileRef.id);

    // Find the media document in included data
    const mediaDocument = included.find((inc: any) => 
      inc.type === fileRef.type && inc.id === fileRef.id
    );
    if (!mediaDocument) {
      console.log('❌ Media document not found in included data');
      console.log('📦 Available included types:', included.map(inc => inc.type));
      return '';
    }

    console.log('✅ Found media document:', mediaDocument.attributes?.name);

    // Get the field_media_document relationship  
    const mediaFileRelationship = mediaDocument.relationships?.field_media_document?.data;
    if (!mediaFileRelationship) {
      console.log('❌ No field_media_document relationship found');
      return '';
    }

    console.log('📄 Looking for file entity:', mediaFileRelationship.type, mediaFileRelationship.id);

    // Find the actual file in included data
    const fileEntity = included.find((inc: any) => 
      inc.type === mediaFileRelationship.type && inc.id === mediaFileRelationship.id
    );
    if (!fileEntity) {
      console.log('❌ File entity not found in included data');
      return '';
    }

    console.log('✅ Found file entity:', fileEntity.attributes?.filename);

    // Get the file URL
    const fileUrl = fileEntity.attributes?.uri?.url;
    if (!fileUrl) {
      console.log('❌ No URL found in file entity');
      console.log('📋 File attributes:', Object.keys(fileEntity.attributes || {}));
      return '';
    }

    // Return full URL (add base URL if it's a relative path)
    const fullUrl = fileUrl.startsWith('http') ? fileUrl : `${DRUPAL_BASE_URL}${fileUrl}`;
    console.log('🎉 Extracted file URL:', fullUrl);
    return fullUrl;
  } catch (error) {
    console.error('❌ Error extracting file URL from JSON:API:', error);
    console.log('📋 Item relationships:', JSON.stringify(item.relationships, null, 2));
    console.log('📦 Available included items:', included.map(inc => ({ type: inc.type, id: inc.id })));
    return '';
  }
};

// Fallback function to fetch file URL directly if included data is missing
const fetchFileUrlDirectly = async (mediaId: string): Promise<string> => {
  try {
    console.log('🔄 Fetching file URL directly for media ID:', mediaId);
    const response = await fetch(`${DRUPAL_BASE_URL}/jsonapi/media/document/${mediaId}?include=field_media_document`, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
    });
    
    if (!response.ok) {
      console.log('❌ Failed to fetch media directly:', response.status);
      return '';
    }
    
    const mediaData = await response.json();
    console.log('📄 Direct media response:', mediaData);
    
    if (mediaData.included && mediaData.included.length > 0) {
      const fileEntity = mediaData.included.find((item: any) => item.type === 'file--file');
      if (fileEntity?.attributes?.uri?.url) {
        const fileUrl = fileEntity.attributes.uri.url;
        const fullUrl = fileUrl.startsWith('http') ? fileUrl : `${DRUPAL_BASE_URL}${fileUrl}`;
        console.log('🎉 Direct fetch success:', fullUrl);
        return fullUrl;
      }
    }
    
    return '';
  } catch (error) {
    console.error('❌ Error in direct file fetch:', error);
    return '';
  }
};

export const useEnterpriseDocs = () => {
  // Lấy docCategorySlug từ URL, ví dụ: "mau-bang-bieu-bao-cao" hoặc "thu-tuc-ho-so-du-lieu-moi-truong"
  const { docCategory, docCategorySlug } = useParams<{ 
    docCategory?: string; 
    docCategorySlug?: string; 
  }>();
  
  // Sử dụng docCategorySlug nếu có, nếu không thì fallback về docCategory (để tương thích với route cũ)
  const categoryParam = docCategorySlug || docCategory;
  
  // Get language-aware API client
  const { apiGet } = useDrupalApi();
  const { language } = useLanguage();

  const fetchDocuments = async (): Promise<EnterpriseDocument[]> => {
    if (!categoryParam) {
      return [];
    }

    // Try JSON:API endpoint first with category filtering
    // Map URL categories to category names for filtering (bilingual support)
    const categoryMapping: { [key: string]: { vi: string; en: string } } = {
      'bao-cao-giam-sat-va-danh-gia-dau-tu': { 
        vi: 'Báo cáo giám sát và đánh giá đầu tư', 
        en: 'Investment Monitoring & Evaluation Reports' 
      },
      'investment-monitoring-evaluation-reports': { 
        vi: 'Báo cáo giám sát và đánh giá đầu tư', 
        en: 'Investment Monitoring & Evaluation Reports' 
      },
      'mau-bang-bieu-bao-cao': { 
        vi: 'Mẫu bảng biểu báo cáo', 
        en: 'Report Forms & Templates' 
      },
      'report-forms-templates': { 
        vi: 'Mẫu bảng biểu báo cáo', 
        en: 'Report Forms & Templates' 
      },
      'van-ban-phap-ly': { 
        vi: 'Văn bản pháp lý', 
        en: 'Legal Documents' 
      },
      'legal-documents': { 
        vi: 'Văn bản pháp lý', 
        en: 'Legal Documents' 
      },
      'tai-lieu-huong-dan': { 
        vi: 'Tài liệu hướng dẫn', 
        en: 'Guidance Documents' 
      },
      'guidance-documents': { 
        vi: 'Tài liệu hướng dẫn', 
        en: 'Guidance Documents' 
      },
      'bieu-mau-ho-so': { 
        vi: 'Biểu mẫu hồ sơ', 
        en: 'Application Forms' 
      },
      'application-forms': { 
        vi: 'Biểu mẫu hồ sơ', 
        en: 'Application Forms' 
      },
      'quy-dinh-thuc-hien': { 
        vi: 'Quy định thực hiện', 
        en: 'Implementation Regulations' 
      },
      'implementation-regulations': { 
        vi: 'Quy định thực hiện', 
        en: 'Implementation Regulations' 
      },
      'thu-tuc-ho-so-du-lieu-moi-truong': { 
        vi: 'Thủ tục - Hồ sơ - Dữ liệu môi trường', 
        en: 'Environmental Procedures - Documents - Data' 
      },
      'procedures-records-environmental-data': {
        vi: 'Thủ tục - Hồ sơ - Dữ liệu môi trường', 
        en: 'Environmental Procedures - Documents - Data' 
      },
      'environmental-procedures-documents-data': { 
        vi: 'Thủ tục - Hồ sơ - Dữ liệu môi trường', 
        en: 'Environmental Procedures - Documents - Data' 
      },
    };

    const categoryName = categoryMapping[categoryParam]?.[language] || categoryParam;
    
    // Validate category mapping
    if (!categoryMapping[categoryParam]) {
      console.warn('⚠️ No explicit mapping found for category:', categoryParam, 'using as-is:', categoryName);
    }
    
    // Try JSON:API endpoint with category filtering using language-aware API
    const apiOptions = {
      filter: {
        'field_loai_tai_lieu.name': categoryName
      },
      include: 'field_loai_tai_lieu,field_file_dinh_kem,field_file_dinh_kem.field_media_document',
      sort: '-created'
    };
    
    console.log('🔍 Using language-aware API with language:', language);
    console.log('🎯 URL category parameter:', categoryParam);
    console.log('📂 Mapped category name:', categoryName);
    console.log('🔧 API options:', apiOptions);

    try {
      // First try JSON:API with proper filtering using language-aware client
      let data;
      let isJsonApi = true;

      try {
        data = await apiGet('/jsonapi/node/tai_lieu_doanh_nghiep', apiOptions);
        console.log('✅ JSON:API call successful with language-aware client');
      } catch (apiError) {
        console.log('⚠️ Language-aware JSON:API failed, falling back to manual fetch');
        console.log('❌ API Error:', apiError);
        
        // Fallback to manual fetch with language prefix
        const queryParams = new URLSearchParams();
        queryParams.append('filter[field_loai_tai_lieu.name]', categoryName);
        queryParams.append('include', 'field_loai_tai_lieu,field_file_dinh_kem,field_file_dinh_kem.field_media_document');
        queryParams.append('sort', '-created');
        
        const languagePrefix = language === 'en' ? '/en' : '/vi';
        const jsonApiEndpoint = `${DRUPAL_BASE_URL}${languagePrefix}/jsonapi/node/tai_lieu_doanh_nghiep?${queryParams.toString()}`;
        
        console.log('🔍 Fallback endpoint:', jsonApiEndpoint);
        
        const response = await fetch(jsonApiEndpoint, {
          method: 'GET',
          headers: {
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
            'Accept-Language': language,
            'Content-Language': language,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        data = await response.json();
      }
      console.log('📄 Raw API response:', data);
      console.log('🔧 Using JSON:API:', isJsonApi);
      console.log('📦 Included data length:', data.included?.length || 0);
      console.log('🔍 Included types:', data.included?.map((inc: any) => inc.type) || []);
      
      let documents: any[] = [];
      
      if (isJsonApi && data.data) {
        // Process JSON:API response
        documents = data.data;
        console.log('📋 JSON:API documents found:', documents.length);
        
        // If no documents found or no included data, try without filter
        if (documents.length === 0 || !data.included || data.included.length === 0) {
          console.log('🔄 No documents found or missing included data, trying without filter...');
          
          // Try fetching without category filter using language-aware API
          try {
            const noFilterOptions = {
              include: 'field_loai_tai_lieu,field_file_dinh_kem,field_file_dinh_kem.field_media_document',
              sort: '-created'
            };
            
            const noFilterData = await apiGet('/jsonapi/node/tai_lieu_doanh_nghiep', noFilterOptions);
            console.log('📋 All documents found:', noFilterData.data?.length || 0);
            console.log('📦 Included entities found:', noFilterData.included?.length || 0);
            
            documents = noFilterData.data || [];
            data.included = noFilterData.included || [];
          } catch (noFilterError) {
            console.log('❌ No filter API call also failed:', noFilterError);
          }
        }
        
        // Filter documents by category if needed (when we fetched all documents)
        let filteredDocuments = documents;
        if (data.included && data.included.length > 0) {
          // If we have included data, we might have fetched all documents, so filter by category
          const categoryId = getCategoryIdFromName(categoryName, data.included);
          if (categoryId) {
            filteredDocuments = documents.filter((item: any) => {
              const categoryRelationship = item.relationships?.field_loai_tai_lieu?.data;
              return categoryRelationship && categoryRelationship.id === categoryId;
            });
            console.log(`🔍 Filtered ${filteredDocuments.length} documents from ${documents.length} total for category: ${categoryName}`);
          } else {
            // If categoryId not found, try with both language variants
            const viCategoryName = categoryMapping[categoryParam]?.vi;
            const enCategoryName = categoryMapping[categoryParam]?.en;
            
            let viCategoryId = null;
            let enCategoryId = null;
            
            if (viCategoryName) {
              viCategoryId = getCategoryIdFromName(viCategoryName, data.included);
            }
            if (enCategoryName) {
              enCategoryId = getCategoryIdFromName(enCategoryName, data.included);
            }
            
            const targetCategoryId = viCategoryId || enCategoryId;
            
            if (targetCategoryId) {
              filteredDocuments = documents.filter((item: any) => {
                const categoryRelationship = item.relationships?.field_loai_tai_lieu?.data;
                return categoryRelationship && categoryRelationship.id === targetCategoryId;
              });
              console.log(`🔍 Filtered ${filteredDocuments.length} documents using fallback category ID`);
            } else {
              console.warn(`⚠️ No category ID found for any language variant of: ${categoryParam}, returning empty array`);
              filteredDocuments = [];
            }
          }
        }

        // Map JSON:API data structure with fallback for missing file URLs
        const mappedDocuments = await Promise.all(filteredDocuments.map(async (item: any) => {
          let fileUrl = extractFileUrlFromJsonApi(item, data.included || []);
          console.log(`📄 Processing document: ${item.attributes.title}`);
          console.log(`📁 Extracted file URL: ${fileUrl}`);
          
          // If no file URL was extracted and we have a media relationship, try direct fetch
          if (!fileUrl && item.relationships?.field_file_dinh_kem?.data) {
            const mediaRef = Array.isArray(item.relationships.field_file_dinh_kem.data) 
              ? item.relationships.field_file_dinh_kem.data[0] 
              : item.relationships.field_file_dinh_kem.data;
            
            if (mediaRef?.id) {
              console.log(`🔄 Attempting direct fetch for media: ${mediaRef.id}`);
              fileUrl = await fetchFileUrlDirectly(mediaRef.id);
            }
          }
          
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
        }));

        console.log('🔄 JSON:API mapped documents:', mappedDocuments.length);
        console.log('📁 File URLs extracted:', mappedDocuments.map(doc => ({ 
          title: doc.title.substring(0, 50) + '...', 
          fileUrl: doc.fileUrl || 'NO FILE'
        })));
        return mappedDocuments;
      } else {
        // Process custom API response and filter client-side
        documents = Array.isArray(data) ? data : [];
        console.log('📋 Custom API documents found:', documents.length);
        
        // Improved client-side filtering by category name - more strict matching
        const filteredDocs = documents.filter((item: any) => {
          // Check if the document has a category field that exactly matches our target category
          if (item.field_loai_tai_lieu) {
            const docCategoryName = stripHtml(item.field_loai_tai_lieu).trim();
            // Exact match with the mapped category name
            if (docCategoryName === categoryName) {
              return true;
            }
          }
          
          // Fallback: check if the document has any category information that matches
          // But make this more strict than before
          const title = stripHtml(item.title || '').toLowerCase();
          
          // Only do title-based matching for specific well-known categories
          // to avoid false positives
          if (categoryName === 'Báo cáo giám sát và đánh giá đầu tư') {
            return title.includes('giám sát') && title.includes('đánh giá') && title.includes('đầu tư');
          } else if (categoryName === 'Mẫu bảng biểu báo cáo') {
            return (title.includes('mẫu') || title.includes('biểu mẫu')) && title.includes('báo cáo');
          } else if (categoryName === 'Thủ tục - Hồ sơ - Dữ liệu môi trường') {
            return (title.includes('thủ tục') || title.includes('hồ sơ')) && title.includes('môi trường');
          }
          
          // For other categories, be more conservative - only match if we have exact category field match
          return false;
        });
        
        console.log('🔍 Filtered documents:', filteredDocs.length, 'out of', documents.length);
        console.log('🔍 Filter criteria - Category:', categoryName);
        console.log('🔍 Filtered document titles:', filteredDocs.map(doc => stripHtml(doc.title || '')));
        
        // Map custom API data structure with HTML processing
        const mappedDocuments = filteredDocs.map((item: any, index: number) => ({
          id: item.id || `doc-${index}`,
          title: stripHtml(item.title || ''),
          docNumber: item.field_so_ky_hieu || 'N/A',
          releaseDate: extractDate(item.field_ngay_ban_hanh || ''),
          fileUrl: extractHref(item.field_file_dinh_kem || ''),
        }));

        console.log('🔄 Custom API mapped documents:', mappedDocuments);
        console.log('📁 File URLs extracted:', mappedDocuments.map(doc => ({ title: doc.title, fileUrl: doc.fileUrl })));
        return mappedDocuments;
      }
    } catch (error) {
      console.error("❌ Error fetching enterprise documents:", error);
      throw new Error(`Failed to fetch documents: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return useQuery<EnterpriseDocument[], Error>({
    queryKey: ['enterpriseDocs', categoryParam, language], // Include language in query key
    queryFn: fetchDocuments,
    enabled: !!categoryParam, // Chỉ chạy khi có categoryParam
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
}; 