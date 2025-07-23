import { useQuery } from '@tanstack/react-query';
import { extractImageUrl } from '@/utils/drupal';
import { extractFirstImageFromRichText } from '@/utils/richTextProcessor';

// Use same base URL pattern as useHomepageData
const DRUPAL_BASE_URL = import.meta.env.VITE_DRUPAL_BASE_URL || 
  import.meta.env.VITE_API || 
  (import.meta.env.DEV ? '' : 'https://dseza-backend.lndo.site');

// Interface for news item (only includes articles from event child categories)
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
 * Get all event child category IDs (categories that have "Sự kiện" as parent)
 */
async function getEventChildCategoryIds(): Promise<string[]> {
  const categoriesUrl = `${DRUPAL_BASE_URL}/jsonapi/taxonomy_term/news_category?include=parent&sort=weight`;
  
  const categoriesResponse = await fetch(categoriesUrl, {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    },
  });

  if (!categoriesResponse.ok) {
    throw new Error(`Failed to fetch categories: ${categoriesResponse.status}`);
  }

  const categoriesData = await categoriesResponse.json();
  
  // ID of "Sự kiện" parent category
  const eventsParentId = "a8128998-5393-45f8-a1de-0bcbc82bd5bf";
  
  // Find all categories that have "Sự kiện" as parent
  const eventChildCategories = categoriesData.data?.filter((item: any) => {
    return item.relationships?.parent?.data?.some((parent: any) => 
      parent.id === eventsParentId
    );
  }) || [];
  
  const childCategoryIds = eventChildCategories.map((cat: any) => cat.id);
  
  console.log('🎯 Event child category IDs:', childCategoryIds);
  console.log('🎯 Event child category names:', eventChildCategories.map((cat: any) => cat.attributes.name));
  
  return childCategoryIds;
}

/**
 * Fetch news articles from JSON:API that belong to event child categories only
 */
async function fetchAllNews(): Promise<NewsItem[]> {
  // First, get all event child category IDs
  const eventChildCategoryIds = await getEventChildCategoryIds();
  
  if (eventChildCategoryIds.length === 0) {
    console.warn('⚠️ No event child categories found, returning empty array');
    return [];
  }

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

  // Filter articles to only include those with event child categories
  const filteredData = data.data?.filter((item: any) => {
    if (!item.relationships?.field_chuyen_muc?.data?.length) {
      return false;
    }
    
    // Check if any of the article's categories are event child categories
    const hasEventCategory = item.relationships.field_chuyen_muc.data.some((categoryRelation: any) => 
      eventChildCategoryIds.includes(categoryRelation.id)
    );
    
    console.log(`📰 Article "${item.attributes.title}": hasEventCategory = ${hasEventCategory}`);
    
    return hasEventCategory;
  }) || [];

  console.log(`✅ Filtered ${filteredData.length} articles out of ${data.data?.length || 0} total articles`);

  return filteredData.map((item: any) => {
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
  });
}

/**
 * Hook to fetch and cache news articles that belong to event child categories only
 * This filters articles to only show those with categories that are children of "Sự kiện" parent category
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