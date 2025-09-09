import { useQuery } from '@tanstack/react-query';
import { DRUPAL_BASE_URL } from '@/config';

// Base URL from centralized config

// Interface for news category
export interface NewsCategory {
  id: string;
  name: string;
  nameEn?: string;
  tid: number;
  weight: number;
}

/**
 * Fetch news categories from JSON:API with bilingual support
 */
async function fetchNewsCategories(): Promise<NewsCategory[]> {
  // Fetch both Vietnamese and English versions for better language support
  const [viData, enData] = await Promise.allSettled([
    fetch(`${DRUPAL_BASE_URL}/vi/jsonapi/taxonomy_term/news_category?include=parent&sort=weight`, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Accept-Language': 'vi',
        'Content-Language': 'vi',
      },
    }),
    fetch(`${DRUPAL_BASE_URL}/en/jsonapi/taxonomy_term/news_category?include=parent&sort=weight`, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Accept-Language': 'en',
        'Content-Language': 'en',
      },
    })
  ]);

  // Primary data (Vietnamese)
  const url = `${DRUPAL_BASE_URL}/vi/jsonapi/taxonomy_term/news_category?include=parent&sort=weight`;
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Accept-Language': 'vi',
      'Content-Language': 'vi',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch news categories: ${response.status}`);
  }

  const data = await response.json();
  
  // Process alternative language data for dual language support
  let viDataResult: any = null;
  let enDataResult: any = null;
  
  if (viData.status === 'fulfilled' && viData.value.ok) {
    viDataResult = await viData.value.json();
    console.log('🌐 Categories: Vietnamese data loaded');
  }
  
  if (enData.status === 'fulfilled' && enData.value.ok) {
    enDataResult = await enData.value.json();
    console.log('🌐 Categories: English data loaded');
  }
  
  // Debug: Log all categories for inspection
  console.log('🔍 All categories from API:', data.data.map((item: any) => ({
    name: item.attributes.name,
    tid: item.attributes.drupal_internal__tid,
    field_hien_thi_noi_bat: item.attributes.field_hien_thi_noi_bat,
    parent: item.relationships?.parent?.data
  })));

  // Find the "Sự kiện" (Events) parent category ID (tid: 52)
  const eventsParentId = "a8128998-5393-45f8-a1de-0bcbc82bd5bf"; // This is the ID for "Sự kiện"
  
  console.log('🎯 Looking for categories with parent:', eventsParentId);
  
  // Categories to explicitly exclude (investment-related categories)
  const excludedCategoryNames = [
    'Quy trình lĩnh vực đầu tư',
    'Lĩnh vực thu hút đầu tư', 
    'Lĩnh vực khuyến khích đầu tư',
    'Dành cho nhà đầu tư'
  ];
  
  // Filter to only get categories that:
  // 1. Have "Sự kiện" as parent (are children of Events category)
  // 2. Have field_hien_thi_noi_bat set to true (should be highlighted)
  // 3. Are NOT in the excluded categories list
  const eventChildCategories = data.data?.filter((item: any) => {
    // Check if this category has "Sự kiện" as parent
    const hasEventsParent = item.relationships?.parent?.data?.some((parent: any) => 
      parent.id === eventsParentId
    );
    
    // Check if it should be highlighted (field_hien_thi_noi_bat is true)
    const shouldBeHighlighted = item.attributes.field_hien_thi_noi_bat === true;
    
    // Check if this category is NOT in the excluded list
    const isNotExcluded = !excludedCategoryNames.includes(item.attributes.name);
    
    console.log(`📋 Category "${item.attributes.name}":`, {
      hasEventsParent,
      shouldBeHighlighted,
      isNotExcluded,
      included: hasEventsParent && shouldBeHighlighted && isNotExcluded
    });
    
    return hasEventsParent && shouldBeHighlighted && isNotExcluded;
  }) || [];

  const result = eventChildCategories.map((item: any) => {
    // Find corresponding English category by tid
    let nameEn = item.attributes.name; // Fallback to Vietnamese
    
    if (enDataResult?.data) {
      const enCategory = enDataResult.data.find((enItem: any) => 
        enItem.attributes?.drupal_internal__tid === item.attributes?.drupal_internal__tid
      );
      if (enCategory) {
        nameEn = enCategory.attributes.name;
        console.log(`✅ Found English name for "${item.attributes.name}": "${nameEn}"`);
      }
    }

    return {
      id: item.id,
      name: item.attributes.name,
      nameEn: nameEn,
      tid: item.attributes.drupal_internal__tid,
      weight: item.attributes.weight || 0,
    };
  });
  
  console.log('✅ Final filtered categories for NewsSection:', result);
  
  return result;
}

/**
 * Fetch ALL news categories from JSON:API with bilingual support (for routing and filtering)
 */
async function fetchAllNewsCategories(): Promise<NewsCategory[]> {
  // Fetch both Vietnamese and English versions
  const [viData, enData] = await Promise.allSettled([
    fetch(`${DRUPAL_BASE_URL}/vi/jsonapi/taxonomy_term/news_category?sort=weight`, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Accept-Language': 'vi',
        'Content-Language': 'vi',
      },
    }),
    fetch(`${DRUPAL_BASE_URL}/en/jsonapi/taxonomy_term/news_category?sort=weight`, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Accept-Language': 'en',
        'Content-Language': 'en',
      },
    })
  ]);

  const url = `${DRUPAL_BASE_URL}/vi/jsonapi/taxonomy_term/news_category?sort=weight`;
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Accept-Language': 'vi',
      'Content-Language': 'vi',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch all news categories: ${response.status}`);
  }

  const data = await response.json();
  
  // Process English data
  let enDataResult: any = null;
  if (enData.status === 'fulfilled' && enData.value.ok) {
    enDataResult = await enData.value.json();
  }

  return data.data?.map((item: any) => {
    // Find corresponding English category by tid
    let nameEn = item.attributes.name; // Fallback to Vietnamese
    
    if (enDataResult?.data) {
      const enCategory = enDataResult.data.find((enItem: any) => 
        enItem.attributes?.drupal_internal__tid === item.attributes?.drupal_internal__tid
      );
      if (enCategory) {
        nameEn = enCategory.attributes.name;
      }
    }

    return {
      id: item.id,
      name: item.attributes.name,
      nameEn: nameEn,
      tid: item.attributes.drupal_internal__tid,
      weight: item.attributes.weight || 0,
    };
  }) || [];
}

/**
 * Hook to fetch and cache news categories (only event categories)
 */
export const useNewsCategories = () => {
  return useQuery({
    queryKey: ['newsCategories'],
    queryFn: fetchNewsCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
  });
};

/**
 * Hook to fetch and cache ALL news categories (for routing and filtering)
 */
export const useAllNewsCategories = () => {
  return useQuery({
    queryKey: ['allNewsCategories'],
    queryFn: fetchAllNewsCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
  });
}; 