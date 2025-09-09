import { useQuery } from '@tanstack/react-query';
import { extractImageUrl } from '@/utils/drupal';
import { extractFirstImageFromRichText, createPlainTextSummary } from '@/utils/richTextProcessor';
import { DRUPAL_BASE_URL } from '@/config';

// Base URL from centralized config

// Interface for news item (only includes articles from event child categories)
export interface NewsItem {
  id: string;
  title: string;
  titleEn?: string;
  summary: string;
  summaryEn?: string;
  published_date: string;
  featured_image?: string;
  category: string;
  category_id?: string;
  all_categories: string[];
  all_category_ids: string[];
  path_alias?: string; // SEO-friendly URL alias from Drupal
}

/**
 * Get all event child category IDs (categories that have "Sự kiện" as parent)
 */
export async function getEventChildCategoryIds(language: 'vi' | 'en' = 'vi'): Promise<string[]> {
  const languagePrefix = language === 'en' ? '/en' : '/vi';
  const categoriesUrl = `${DRUPAL_BASE_URL}${languagePrefix}/jsonapi/taxonomy_term/news_category?include=parent&sort=weight`;
  
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
 * Fetch news articles from JSON:API that belong to event child categories only with language support
 */
async function fetchAllNews(language: 'vi' | 'en' = 'vi'): Promise<NewsItem[]> {
  // First, get all event child category IDs
  const eventChildCategoryIds = await getEventChildCategoryIds(language);
  
  if (eventChildCategoryIds.length === 0) {
    console.warn('⚠️ No event child categories found, returning empty array');
    return [];
  }

  const languagePrefix = language === 'en' ? '/en' : '/vi';
  
  // Fetch both Vietnamese and English versions for better language support
  const [viData, enData] = await Promise.allSettled([
    fetch(`${DRUPAL_BASE_URL}/vi/jsonapi/node/bai-viet?filter[status][value]=1&sort=-created&page[limit]=50&include=field_anh_dai_dien.field_media_image,field_chuyen_muc`, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Accept-Language': 'vi',
        'Content-Language': 'vi',
      },
    }),
    fetch(`${DRUPAL_BASE_URL}/en/jsonapi/node/bai-viet?filter[status][value]=1&sort=-created&page[limit]=50&include=field_anh_dai_dien.field_media_image,field_chuyen_muc`, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Accept-Language': 'en',
        'Content-Language': 'en',
      },
    })
  ]);

  // Process primary data (current language)
  const url = `${DRUPAL_BASE_URL}${languagePrefix}/jsonapi/node/bai-viet`
    + '?filter[status][value]=1'               // Published
    + '&sort=-created'                         // Newest first
    + '&page[limit]=50'                        // Get more articles
    + '&include=field_anh_dai_dien.field_media_image,field_chuyen_muc'; // Include featured images and categories

  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Accept-Language': language,
      'Content-Language': language,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch news: ${response.status}`);
  }

  const data = await response.json();
  
  // Process alternative language data for dual language support
  let viDataResult: any = null;
  let enDataResult: any = null;
  
  if (viData.status === 'fulfilled' && viData.value.ok) {
    viDataResult = await viData.value.json();
    console.log('🌐 Bilingual support: Vietnamese data loaded');
  } else {
    console.warn('⚠️ Vietnamese data fetch failed');
  }
  
  if (enData.status === 'fulfilled' && enData.value.ok) {
    enDataResult = await enData.value.json();
    console.log('🌐 Bilingual support: English data loaded');
  } else {
    console.warn('⚠️ English data fetch failed');
  }

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

    // Find corresponding article in other language for dual language support
    const articleId = item.id;
    let titleEn: string | undefined;
    let summaryEn: string | undefined;
    
    // Look for English version if current is Vietnamese
    if (language === 'vi' && enDataResult?.data) {
      const enArticle = enDataResult.data.find((enItem: any) => 
        enItem.attributes?.drupal_internal__nid === item.attributes?.drupal_internal__nid
      );
      if (enArticle) {
        titleEn = enArticle.attributes.title;
        const rawSummary = enArticle.attributes.body?.summary || enArticle.attributes.body?.value || '';
        summaryEn = createPlainTextSummary(rawSummary);
      }
    }
    
    // Look for Vietnamese version if current is English  
    if (language === 'en' && viDataResult?.data) {
      const viArticle = viDataResult.data.find((viItem: any) => 
        viItem.attributes?.drupal_internal__nid === item.attributes?.drupal_internal__nid
      );
      if (viArticle) {
        // For English articles, titleEn stores the Vietnamese alternative
        titleEn = viArticle.attributes.title; // This is Vietnamese text
        const rawSummary = viArticle.attributes.body?.summary || viArticle.attributes.body?.value || '';
        summaryEn = createPlainTextSummary(rawSummary);
      }
    }

    const rawMainSummary = item.attributes.body?.summary || item.attributes.body?.value || '';

    return {
      id: item.id,
      title: item.attributes.title,
      titleEn,
      summary: createPlainTextSummary(rawMainSummary),
      summaryEn,
      published_date: item.attributes.created,
      featured_image: featuredImage,
      category: primaryCategory,
      category_id: primaryCategoryId,
      all_categories: categoryNames,
      all_category_ids: categoryIds,
      path_alias: item.attributes.path?.alias || null, // Extract path alias for SEO URLs
    };
  });
}

/**
 * Hook to fetch and cache news articles that belong to event child categories only with language support
 * This filters articles to only show those with categories that are children of "Sự kiện" parent category
 */
export const useAllNews = (language: 'vi' | 'en' = 'vi') => {
  return useQuery({
    queryKey: ['allNews', language],
    queryFn: () => fetchAllNews(language),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
  });
}; 