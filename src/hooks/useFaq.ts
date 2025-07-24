import { useQuery } from '@tanstack/react-query';
import { useDrupalApi } from '@/utils/drupal';

// Interface cho dữ liệu FAQ
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * Custom hook to fetch and manage FAQ data using TanStack Query with language support
 * 
 * @returns Object containing FAQ data, loading state, and error state
 */
export const useFaq = () => {
  const { apiGet } = useDrupalApi(); // Use language-aware API client

  /**
   * Fetch FAQ data from Drupal JSON:API
   * Only get questions that are published (da_cong_khai) and have answers
   */
  const fetchFaqs = async (): Promise<FaqItem[]> => {
    try {
      console.log('🔍 Fetching FAQs with language support');

      // Build API options for FAQ request
      const apiOptions = {
        filter: {
          status: { value: '1' }, // Only published content
          field_trang_thai: { value: 'da_cong_khai' } // Only public/FAQ questions
        },
        sort: '-created', // Sort by creation date (newest first)
        page: { limit: 50 } // Limit to 50 FAQs
      };

      const data = await apiGet('/jsonapi/node/question', apiOptions);
      console.log('📄 Raw FAQ API response:', data);
      console.log('📊 Total FAQs found:', data?.data?.length || 0);

      // Filter and map the response data to our interface  
      const faqs: FaqItem[] = data.data
        ?.filter((item: any) => {
          // Only include items that have both question (title) and answer (field_noi_dung_tra_loi)
          const hasQuestion = item.attributes?.title?.trim();
          const hasAnswer = item.attributes?.field_noi_dung_tra_loi?.processed?.trim();
          return hasQuestion && hasAnswer;
        })
        ?.map((item: any) => ({
          id: item.id,
          question: item.attributes?.title || '',
          answer: item.attributes?.field_noi_dung_tra_loi?.processed || '',
        })) || [];

      console.log('🔄 Processed FAQs:', faqs.length);
      console.log('📊 FAQ titles:', faqs.map(faq => faq.question));
      
      return faqs;
    } catch (error) {
      console.error('❌ Error fetching FAQs:', error);
      throw new Error(`Failed to fetch FAQs: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['faqs'],
    queryFn: fetchFaqs,
    staleTime: 10 * 60 * 1000, // 10 minutes - FAQ data doesn't change frequently
    gcTime: 30 * 60 * 1000, // 30 minutes cache time
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });

  return {
    data: data || [],
    isLoading,
    isError,
    error: error as Error | null,
    isSuccess,
    refetch,
    // Additional convenience properties
    faqs: data || [],
    hasFaqs: !!data?.length,
    faqCount: data?.length || 0,
  };
}; 