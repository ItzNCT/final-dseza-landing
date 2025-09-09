import { useQuery } from '@tanstack/react-query';
import { DRUPAL_BASE_URL as JSON_API_BASE_URL } from '@/config';

/**
 * Base URL for JSON:API endpoints from centralized config
 */

/**
 * JSON:API headers for consistent API calls
 */
const jsonApiHeaders = {
  'Content-Type': 'application/vnd.api+json',
  'Accept': 'application/vnd.api+json',
};

/**
 * Interface for Partner data structure
 */
interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  partnerUrl: string;
}

/**
 * Interface for raw Drupal JSON:API partner data
 */
interface RawPartnerData {
  id: string;
  type: string;
  attributes: {
    title: string;
    field_partner_url?: {
      uri: string;
      title?: string;
    };
  };
  relationships?: {
    field_logo?: {
      data?: {
        id: string;
        type: string;
      };
    };
  };
}

/**
 * Interface for included media data
 */
interface IncludedMedia {
  id: string;
  type: string;
  attributes?: {
    name?: string;
  };
  relationships?: {
    field_media_image?: {
      data?: {
        id: string;
        type: string;
      };
    };
  };
}

/**
 * Interface for included file data
 */
interface IncludedFile {
  id: string;
  type: string;
  attributes?: {
    uri?: {
      url: string;
    };
    filename?: string;
  };
}

/**
 * Fetch business partners from Drupal JSON:API
 * @returns Promise containing the partners data
 */
async function fetchPartners(): Promise<Partner[]> {
  try {
    const url = `${JSON_API_BASE_URL}/jsonapi/node/business_partner?include=field_logo.field_media_image&sort=field_order_weight`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: jsonApiHeaders,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    
    // Map the Drupal JSON:API data to our Partner interface
    const partners: Partner[] = data.data.map((partner: RawPartnerData) => {
      let logoUrl = '';
      
      // Find the logo URL from included data
      if (partner.relationships?.field_logo?.data && data.included) {
        const logoMediaId = partner.relationships.field_logo.data.id;
        
        // Find the logo media entity
        const logoMedia = data.included.find((item: IncludedMedia) => 
          item.id === logoMediaId && item.type === 'media--image'
        );
        
        if (logoMedia?.relationships?.field_media_image?.data) {
          const imageFileId = logoMedia.relationships.field_media_image.data.id;
          
          // Find the actual file entity
          const imageFile = data.included.find((item: IncludedFile) => 
            item.id === imageFileId && item.type === 'file--file'
          );
          
          if (imageFile?.attributes?.uri?.url) {
            // Build full URL for the logo
            const baseUrl = JSON_API_BASE_URL || '';
            logoUrl = imageFile.attributes.uri.url.startsWith('http') 
              ? imageFile.attributes.uri.url 
              : `${baseUrl}${imageFile.attributes.uri.url}`;
          }
        }
      }
      
      // Get partner URL
      const partnerUrl = partner.attributes.field_partner_url?.uri || '';
      
      return {
        id: partner.id,
        name: partner.attributes.title,
        logoUrl,
        partnerUrl,
      };
    });
    
    return partners;
  } catch (error) {
    throw new Error(`Failed to fetch partners: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Custom hook to fetch and manage business partners data using TanStack Query
 * 
 * @returns {Object} Object containing:
 *   - data: The partners data from the API
 *   - isLoading: Boolean indicating if the request is in progress
 *   - isError: Boolean indicating if an error occurred
 *   - error: The error object if an error occurred
 *   - isSuccess: Boolean indicating if the request was successful
 *   - refetch: Function to manually refetch the data
 */
export const usePartners = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['partners'],
    queryFn: fetchPartners,
    staleTime: 10 * 60 * 1000, // 10 minutes - partner data doesn't change frequently
    gcTime: 30 * 60 * 1000, // 30 minutes cache time
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });

  return {
    data: data || [],
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
    // Additional convenience properties
    partners: data || [],
    hasPartners: !!data?.length,
    partnerCount: data?.length || 0,
  };
};

// Export types for external use
export type { Partner };

// Export the fetch function for potential standalone use
export { fetchPartners };
