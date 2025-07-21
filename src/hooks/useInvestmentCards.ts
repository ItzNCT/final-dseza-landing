import { useQuery } from '@tanstack/react-query';
import { extractImageUrl } from '@/utils/drupal';

// Use same base URL pattern as other hooks
const DRUPAL_BASE_URL = import.meta.env.VITE_DRUPAL_BASE_URL || 
  import.meta.env.VITE_API || 
  (import.meta.env.DEV ? '' : 'https://dseza-backend.lndo.site');

// Interface for investment card item
export interface InvestmentCard {
  id: string;
  title: string;
  url: string;
  imageUrl?: string;
  category: string;
}

/**
 * Fetch investment cards from JSON:API
 */
async function fetchInvestmentCards(): Promise<InvestmentCard[]> {
  const url = `${DRUPAL_BASE_URL}/jsonapi/node/investment_card`
    + '?include=field_category,field_image.field_media_image'
    + '&sort=field_order_weight';

  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch investment cards: ${response.status}`);
  }

  const data = await response.json();

  return data.data?.map((item: any) => {
    // Get category name from included data
    let categoryName = '';
    if (item.relationships?.field_category?.data?.id && data.included) {
      const categoryItem = data.included.find((inc: any) => 
        inc.type === 'taxonomy_term--investment_card_category' && inc.id === item.relationships.field_category.data.id
      );
      
      if (categoryItem) {
        categoryName = categoryItem.attributes.name;
      }
    }

    // Get image URL from included data
    const imageUrl = extractImageUrl(item.relationships?.field_image, data.included);

    return {
      id: item.id,
      title: item.attributes.title,
      url: item.attributes.field_link?.uri || '',
      imageUrl,
      category: categoryName,
    };
  }) || [];
}

/**
 * Hook to fetch and cache investment cards
 */
export const useInvestmentCards = () => {
  return useQuery({
    queryKey: ['investmentCards'],
    queryFn: fetchInvestmentCards,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
  });
};
