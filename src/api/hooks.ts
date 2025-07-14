import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/api/client';

// Define TypeScript interfaces for the menu data structure
interface MenuUrl {
  path: string;
}

interface MenuLink {
  label: string;
  url: MenuUrl;
  expanded: boolean;
}

interface MenuSubtree {
  link: MenuLink;
  subtree?: MenuSubtree[];
}

interface MenuLinkWithSubtree {
  link: MenuLink;
  subtree?: MenuSubtree[];
}

interface MenuByName {
  links: MenuLinkWithSubtree[];
}

interface FullMenuQueryResponse {
  menuByName: MenuByName;
}

// Define the GraphQL query for fetching the main menu
const GET_MAIN_MENU_QUERY = `
  query FullMenuQuery {
    menuByName(name: MAIN) {
      links {
        # --- Cấp 1 ---
        link {
          label
          url {
            path
          }
          expanded
        }
        subtree {
          # --- Cấp 2 ---
          link {
            label
            url {
              path
            }
            expanded
          }
          subtree {
            # --- Cấp 3 ---
            link {
              label
              url {
                path
              }
              expanded
            }
            # Thêm cấp lồng cuối cùng để lấy cấp 4
            subtree {
              # --- Cấp 4 ---
              link {
                label
                url {
                  path
                }
                expanded
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * Fetch main menu data from Drupal GraphQL API
 * @returns Promise containing the menu data
 */
async function fetchMainMenuData(): Promise<MenuByName> {
  try {
    const response: FullMenuQueryResponse = await apiClient.request(GET_MAIN_MENU_QUERY);
    
    if (!response.menuByName) {
      throw new Error('Menu data not found in response');
    }

    return response.menuByName;
  } catch (error) {
    throw new Error(`Failed to fetch main menu data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Custom hook to fetch and manage main menu data using TanStack Query
 * 
 * @returns {Object} Object containing:
 *   - data: The menu data from the API
 *   - isLoading: Boolean indicating if the request is in progress
 *   - isError: Boolean indicating if an error occurred
 *   - error: The error object if an error occurred
 *   - isSuccess: Boolean indicating if the request was successful
 *   - refetch: Function to manually refetch the data
 */
export const useMainMenu = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['mainMenu'],
    queryFn: fetchMainMenuData,
    staleTime: 10 * 60 * 1000, // 10 minutes - menu data doesn't change frequently
    gcTime: 30 * 60 * 1000, // 30 minutes cache time
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });

  return {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
    // Additional convenience properties
    menuLinks: data?.links || [],
    hasMenuData: !!data?.links?.length,
  };
};

// Export types for external use
export type {
  MenuUrl,
  MenuLink,
  MenuSubtree,
  MenuLinkWithSubtree,
  MenuByName,
  FullMenuQueryResponse,
};

// Export the fetch function for potential standalone use
export { fetchMainMenuData };

/**
 * Base URL for JSON:API endpoints
 * Use relative URLs in development to leverage Vite proxy
 */
const JSON_API_BASE_URL = import.meta.env.VITE_DRUPAL_BASE_URL || 
  (import.meta.env.DEV ? '' : 'https://dseza-backend.lndo.site');
/**
 * JSON:API headers for consistent API calls
 */
const jsonApiHeaders = {
  'Content-Type': 'application/vnd.api+json',
  'Accept': 'application/vnd.api+json',
};

/**
 * Fetch article details by UUID from Drupal JSON:API
 * @param uuid - The UUID of the article to fetch
 * @returns Promise containing the article data
 */
async function fetchArticleById(uuid: string): Promise<any> {
  try {
    const url = `${JSON_API_BASE_URL}/jsonapi/node/bai-viet/${encodeURIComponent(uuid)}?include=field_anh_dai_dien.field_media_image`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: jsonApiHeaders,
    });

    if (!response.ok) {
      // Fallback for legacy numeric IDs (development support)
      if (/^\d+$/.test(uuid)) {
        const fallbackUrl = `${JSON_API_BASE_URL}/jsonapi/node/bai-viet?filter[nid]=${uuid}&include=field_anh_dai_dien.field_media_image`;
        
        const fallbackResponse = await fetch(fallbackUrl, {
          method: 'GET',
          headers: jsonApiHeaders,
        });
        
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();
          // Return the first item from the filtered results
          return fallbackData.data[0] ? { data: fallbackData.data[0], included: fallbackData.included } : null;
        }
      }
      
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch article details: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Custom hook to fetch and manage article detail data using TanStack Query
 * 
 * @param uuid - The UUID of the article to fetch
 * @returns {Object} Object containing:
 *   - data: The article data from the API
 *   - isLoading: Boolean indicating if the request is in progress
 *   - isError: Boolean indicating if an error occurred
 *   - error: The error object if an error occurred
 *   - isSuccess: Boolean indicating if the request was successful
 *   - refetch: Function to manually refetch the data
 */
export const useArticleDetail = (uuid: string) => {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['article', uuid],
    queryFn: () => fetchArticleById(uuid),
    enabled: !!uuid,
    staleTime: 5 * 60 * 1000, // 5 minutes - article data is relatively static
    gcTime: 15 * 60 * 1000, // 15 minutes cache time
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });

  return {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  };
}; 