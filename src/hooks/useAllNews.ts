import { useQuery } from '@tanstack/react-query';
import { extractImageUrl } from '@/utils/drupal';
import { extractFirstImageFromRichText } from '@/utils/richTextProcessor';

// Use same base URL pattern as useHomepageData
const DRUPAL_BASE_URL = import.meta.env.VITE_DRUPAL_BASE_URL || 
  import.meta.env.VITE_API || 
  (import.meta.env.DEV ? '' : 'https://dseza-backend.lndo.site');

// Interface for news item
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  published_date: string;
  featured_image?: string;
  category: string;
  category_id?: string;
  all_categories: string[];
  all_category_ids: string[];
}

/**
 * Fetch all news articles from JSON:API
 */
async function fetchAllNews(): Promise<NewsItem[]> {
  const url = `${DRUPAL_BASE_URL}/jsonapi/node/bai-viet`
    + '?filter[status][value]=1'               // Published
    + '&sort=-created'                         // Newest first
    + '&page[limit]=50'                        // Get more articles
    + '&include=field_anh_dai_dien.field_media_image,field_chuyen_muc'; // Include featured images and categories

  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch news: ${response.status}`);
  }

  const data = await response.json();

  return data.data?.map((item: any) => {
    // Get all categories for this article
    let categoryNames: string[] = [];
    let categoryIds: string[] = [];
    
    if (item.relationships?.field_chuyen_muc?.data?.length > 0 && data.included) {
      // Process ALL categories, not just the first one
      item.relationships.field_chuyen_muc.data.forEach((categoryRelation: any) => {
        const categoryItem = data.included.find((inc: any) => 
          inc.type === 'taxonomy_term--news_category' && inc.id === categoryRelation.id
        );
        
        if (categoryItem) {
          categoryNames.push(categoryItem.attributes.name);
          categoryIds.push(categoryRelation.id);
        }
      });
    }

    // Use first category as primary, but keep all for filtering
    const primaryCategory = categoryNames.length > 0 ? categoryNames[0] : 'Tin tức';
    const primaryCategoryId = categoryIds.length > 0 ? categoryIds[0] : '';

    // Get featured image - try field first, then rich text
    let featuredImage = extractImageUrl(item.relationships.field_anh_dai_dien, data.included);
    
    // If no featured image field, try to extract from body content
    if (!featuredImage && item.attributes.body?.processed) {
      featuredImage = extractFirstImageFromRichText(item.attributes.body.processed, data.included);
    }

    return {
      id: item.id,
      title: item.attributes.title,
      summary: item.attributes.body?.summary || item.attributes.body?.value?.substring(0, 200) + '...' || '',
      published_date: item.attributes.created,
      featured_image: featuredImage,
      category: primaryCategory,
      category_id: primaryCategoryId,
      all_categories: categoryNames,
      all_category_ids: categoryIds,
    };
  }) || [];
}

/**
 * Hook to fetch and cache all news articles
 */
export const useAllNews = () => {
  return useQuery({
    queryKey: ['allNews'],
    queryFn: fetchAllNews,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
  });
}; 