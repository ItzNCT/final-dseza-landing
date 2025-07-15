import { useQuery } from '@tanstack/react-query';

// Use same base URL pattern as useHomepageData
const DRUPAL_BASE_URL = import.meta.env.VITE_DRUPAL_BASE_URL || 
  import.meta.env.VITE_API || 
  (import.meta.env.DEV ? '' : 'https://dseza-backend.lndo.site');

// Interface for news category
export interface NewsCategory {
  id: string;
  name: string;
  nameEn?: string;
  tid: number;
  weight: number;
}

/**
 * Fetch news categories from JSON:API
 */
async function fetchNewsCategories(): Promise<NewsCategory[]> {
  const url = `${DRUPAL_BASE_URL}/jsonapi/taxonomy_term/news_category?filter[field_hien_thi_noi_bat][value]=1&sort=weight`;

  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch news categories: ${response.status}`);
  }

  const data = await response.json();

  return data.data?.map((item: any) => ({
    id: item.id,
    name: item.attributes.name,
    nameEn: item.attributes.name_en || item.attributes.name, // Fallback to Vietnamese if no English
    tid: item.attributes.drupal_internal__tid,
    weight: item.attributes.weight || 0,
  })) || [];
}

/**
 * Hook to fetch and cache news categories
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