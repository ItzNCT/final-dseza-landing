import { useQuery } from '@tanstack/react-query';
import { extractImageUrl } from '@/utils/drupal';

// Base URL của Drupal backend - same pattern as other hooks
const JSON_API_BASE_URL = import.meta.env.VITE_DRUPAL_BASE_URL || 
  import.meta.env.VITE_API || 
  (import.meta.env.DEV ? '' : 'https://dseza-backend.lndo.site');

// Interface cho dữ liệu functional zone sau khi đã xử lý
export interface FunctionalZone {
  id: string;
  title: string;
  summary: string;
  imageUrl: string | null;
  imageLarge: string | null;
  thumbnailUrl: string | null;
  path: string;
  area: string | null;
  occupancyRate: number;
  enterprises: number;
  occupancy: number;
}

// Hàm fetch dữ liệu từ JSON:API theo ngôn ngữ
const fetchFunctionalZones = async (language: 'vi' | 'en' = 'vi'): Promise<FunctionalZone[]> => {
  const languagePrefix = language === 'en' ? '/en' : '/vi';
  const endpoint = `${JSON_API_BASE_URL}${languagePrefix}/jsonapi/node/functional_zone`
    + '?include=field_image_large.field_media_image,field_image_thumbnail.field_media_image'
    + '&filter[status]=1'; // Only published content

  const response = await fetch(endpoint, {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Accept-Language': language,
      'Content-Language': language,
    },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch functional zones: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  console.log('🏭 Functional zones data:', { language, data });
  
  // Xử lý dữ liệu và map theo yêu cầu
  return data.data?.map((item: any) => {
    // Extract image URLs using the established utility function
    const imageLarge = extractImageUrl(item.relationships?.field_image_large, data.included);
    const thumbnailUrl = extractImageUrl(item.relationships?.field_image_thumbnail, data.included);
    const imageUrl = imageLarge || thumbnailUrl; // Prefer large image, fallback to thumbnail
    
    // Get path from attributes
    const path = item.attributes?.path?.alias || `/functional-zone/${item.attributes?.drupal_internal__nid}`;
    
    // Get area and format it
    const areaValue = item.attributes?.field_area;
    const area = areaValue ? `${areaValue} ha` : null;
    
    // Get occupancy rate
    const occupancyRate = parseFloat(item.attributes?.field_occupancy) || 0;
    
    // Get enterprises count
    const enterprises = parseInt(item.attributes?.field_enterprises) || 0;
    
    return {
      id: item.id,
      title: item.attributes?.title || '',
      summary: item.attributes?.field_description || item.attributes?.body?.summary || '',
      imageUrl,
      imageLarge,
      thumbnailUrl,
      path,
      area,
      occupancyRate,
      enterprises,
      occupancy: occupancyRate // Same value for compatibility
    };
  }) || [];
};

// Custom hook sử dụng useQuery
export const useFunctionalZones = (language: 'vi' | 'en' = 'vi') => {
  return useQuery({
    queryKey: ['functional-zones', language],
    queryFn: () => fetchFunctionalZones(language),
    staleTime: 5 * 60 * 1000, // 5 phút
    gcTime: 10 * 60 * 1000, // 10 phút (garbage collection time)
  });
};
