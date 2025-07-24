import { useQuery } from '@tanstack/react-query';

// Base URL pattern consistent with other hooks in the project
const DRUPAL_BASE_URL = import.meta.env.VITE_DRUPAL_BASE_URL || 
  (import.meta.env.DEV ? '' : 'https://dseza-backend.lndo.site');

// JSON:API headers
const jsonApiHeaders = {
  'Content-Type': 'application/vnd.api+json',
  'Accept': 'application/vnd.api+json',
};

// Interface cho dữ liệu dự thảo văn bản
export interface DraftDocument {
  id: string;
  title: string;
  summary?: string;
  publishedDate: string;
  feedbackEndDate?: string;
  documentUrl?: string;
  path: string;
  isOpen: boolean; // true nếu còn trong thời gian lấy ý kiến
}

// Interface cho kết quả trả về từ hook
export interface DraftDocumentsResult {
  openDrafts: DraftDocument[];
  closedDrafts: DraftDocument[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

/**
 * Fetch draft documents from Drupal JSON:API
 */
async function fetchDraftDocuments(): Promise<DraftDocument[]> {
  try {
    // Fetch all du_thao_van_ban nodes with necessary includes
    const url = `${DRUPAL_BASE_URL}/jsonapi/node/du_thao_van_ban`
      + '?filter[status][value]=1'  // Only published content
      + '&sort=-created'             // Sort by creation date (newest first)
      + '&include=field_linh_vuc,field_file_dinh_kem,field_file_dinh_kem.field_media_document'; // Include attached files

    console.log('🔍 Fetching draft documents from:', url);

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
    console.log('📄 Raw draft documents API response:', data);
    console.log('📊 Total draft documents found:', data?.data?.length || 0);

    // Map the response data to our interface
    const draftDocuments: DraftDocument[] = data.data?.map((item: any) => {
      // Extract feedback period date (single date field)
      const feedbackEndDate = item.attributes?.field_thoi_gian_lay_y_kien || null;
      
      // Determine if the document is still open for feedback
      const currentDate = new Date();
      const endDate = feedbackEndDate ? new Date(feedbackEndDate) : null;
      const isOpen = endDate ? endDate >= currentDate : false;

      // Extract document file URL if available
      let documentUrl = '';
      if (item.relationships?.field_file_dinh_kem?.data && data.included) {
        const fileRelationship = item.relationships.field_file_dinh_kem.data;
        if (Array.isArray(fileRelationship) && fileRelationship.length > 0) {
          const fileId = fileRelationship[0].id;
          const fileEntity = data.included.find((inc: any) => 
            inc.type === 'media--document' && inc.id === fileId
          );
          
          if (fileEntity?.relationships?.field_media_document?.data) {
            const documentFileId = fileEntity.relationships.field_media_document.data.id;
            const documentFile = data.included.find((inc: any) => 
              inc.type === 'file--file' && inc.id === documentFileId
            );
            
            if (documentFile?.attributes?.uri?.url) {
              documentUrl = `${DRUPAL_BASE_URL}${documentFile.attributes.uri.url}`;
            }
          }
        } else if (!Array.isArray(fileRelationship)) {
          // Single file relationship
          const fileId = fileRelationship.id;
          const fileEntity = data.included.find((inc: any) => 
            inc.type === 'media--document' && inc.id === fileId
          );
          
          if (fileEntity?.relationships?.field_media_document?.data) {
            const documentFileId = fileEntity.relationships.field_media_document.data.id;
            const documentFile = data.included.find((inc: any) => 
              inc.type === 'file--file' && inc.id === documentFileId
            );
            
            if (documentFile?.attributes?.uri?.url) {
              documentUrl = `${DRUPAL_BASE_URL}${documentFile.attributes.uri.url}`;
            }
          }
        }
      }

      // Generate path for the detail page
      const path = `/van-ban/huong-dan-gop-y/gop-y-du-thao-van-ban/${item.id}`;

              return {
          id: item.id,
          title: item.attributes?.title || '',
          summary: item.attributes?.body?.summary || item.attributes?.body?.value?.substring(0, 200) + '...' || '',
          publishedDate: item.attributes?.created || '',
          feedbackEndDate,
          documentUrl,
          path,
          isOpen,
        };
    }) || [];

    console.log('🔄 Mapped draft documents:', draftDocuments.length);
    console.log('📊 Open drafts:', draftDocuments.filter(doc => doc.isOpen).length);
    console.log('📊 Closed drafts:', draftDocuments.filter(doc => !doc.isOpen).length);
    
    return draftDocuments;
  } catch (error) {
    console.error('❌ Error fetching draft documents:', error);
    throw new Error(`Failed to fetch draft documents: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Process and categorize draft documents
 */
async function processDraftDocuments(): Promise<{
  openDrafts: DraftDocument[];
  closedDrafts: DraftDocument[];
}> {
  const allDrafts = await fetchDraftDocuments();
  
  // Separate into open and closed drafts
  const openDrafts = allDrafts.filter(draft => draft.isOpen);
  const closedDrafts = allDrafts.filter(draft => !draft.isOpen);
  
  console.log('📊 Final categorization:');
  console.log('✅ Open drafts:', openDrafts.length);
  console.log('❌ Closed drafts:', closedDrafts.length);
  
  return {
    openDrafts,
    closedDrafts,
  };
}

/**
 * Custom hook to fetch and categorize draft documents using TanStack Query
 * 
 * @returns Object containing openDrafts, closedDrafts, and loading states
 */
export const useDraftDocuments = (): DraftDocumentsResult => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['draftDocuments'],
    queryFn: processDraftDocuments,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes cache time
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });

  return {
    openDrafts: data?.openDrafts || [],
    closedDrafts: data?.closedDrafts || [],
    isLoading,
    isError,
    error: error as Error | null,
  };
}; 