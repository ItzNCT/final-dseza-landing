import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient, enApiClient, createLanguageClient } from '@/api/client';

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
  langcode?: string;
  links: MenuLinkWithSubtree[];
}

/**
 * Create dynamic GraphQL query for menu by name
 * @param menuName - The name of the menu (e.g., "MAIN", "MAIN1")
 * @returns GraphQL query string
 */
const createGetMenuQuery = (menuName: string) => `
query GetMainMenu {
  menuByName(name: ${menuName}) {
    langcode
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

// Fallback query using correct menuByName syntax
const GET_MAIN_MENU_FALLBACK_QUERY = `
query GetMainMenu {
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

// Define the GraphQL query for fetching the main menu - using basic menuByName without language
const GET_MAIN_MENU_QUERY = `
query GetMainMenu {
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

// Simple query that works with current schema - no multilingual support for now
const GET_MULTILINGUAL_MENU_QUERY = `
query GetMainMenu {
  menuByName(name: MAIN) {
    links {
      link { label url { path } expanded }
      subtree {
        link { label url { path } expanded }
        subtree {
          link { label url { path } expanded }
          subtree {
            link { label url { path } expanded }
          }
        }
      }
    }
  }
}
`;


/**
 * Fetch main menu data from Drupal GraphQL API
 * Now supports bilingual menu fetching with separate MAIN and MAIN1 menus
 * @returns Promise containing bilingual menu data
 */
async function fetchMainMenuData(): Promise<{ vi: MenuByName, en: MenuByName }> {
  try {
    console.log('🔍 Fetching bilingual menu data...');

    // Tạo các truy vấn động
    const viQuery = createGetMenuQuery("MAIN");
    const enQuery = createGetMenuQuery("MAIN1");

    // Gọi đồng thời cả hai truy vấn
    const [viResponse, enResponse] = await Promise.all([
      apiClient.request<{ menuByName: MenuByName }>(viQuery),
      apiClient.request<{ menuByName: MenuByName }>(enQuery)
    ]);

    if (!viResponse.menuByName || !enResponse.menuByName) {
      throw new Error('One or both menus not found in API response');
    }

    console.log('✅ Bilingual menu fetch successful');

    return {
      vi: viResponse.menuByName,
      en: enResponse.menuByName
    };

  } catch (error) {
    console.error('❌ Bilingual menu fetch failed:', error);
    
    // Fallback: Try with the original fallback query for both languages
    try {
      console.log('🔄 Retrying with fallback query...');
      const fallbackResponse: { menuByName: MenuByName } = await apiClient.request(GET_MAIN_MENU_FALLBACK_QUERY);
      
      if (!fallbackResponse.menuByName) {
        throw new Error('Fallback query failed - no menu data');
      }

      console.log('⚠️ Using fallback menu data for both languages');

      return {
        vi: fallbackResponse.menuByName,
        en: fallbackResponse.menuByName // Use same menu as fallback
      };

    } catch (retryError) {
      console.error('❌ Fallback also failed:', retryError);
      // Trả về cấu trúc rỗng để tránh lỗi crash ứng dụng
      return {
        vi: { links: [] },
        en: { links: [] }
      };
    }
  }
}

/**
 * Custom hook to fetch and manage main menu data using TanStack Query
 * Now returns bilingual menu data (both VI and EN)
 * 
 * @param language - Language code (e.g., 'vi', 'en') - used for backward compatibility
 * @returns {Object} Object containing:
 *   - data: The bilingual menu data from the API
 *   - isLoading: Boolean indicating if the request is in progress
 *   - isError: Boolean indicating if an error occurred
 *   - error: The error object if an error occurred
 *   - isSuccess: Boolean indicating if the request was successful
 *   - refetch: Function to manually refetch the data
 */
export const useMainMenu = (language?: string) => {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['mainMenu'], // Simplified key since we always fetch both languages
    queryFn: () => fetchMainMenuData(),
    staleTime: 10 * 60 * 1000, // 10 minutes - menu data doesn't change frequently
    gcTime: 30 * 60 * 1000, // 30 minutes cache time
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });

  const multilingualData = data as { vi: MenuByName, en: MenuByName } | undefined;
  
  return {
    data: multilingualData,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
    // Additional convenience properties for backward compatibility
    menuLinks: language === 'vi' ? multilingualData?.vi?.links || [] :
               language === 'en' ? multilingualData?.en?.links || [] :
               { vi: multilingualData?.vi?.links || [], en: multilingualData?.en?.links || [] },
    hasMenuData: !!(multilingualData?.vi?.links?.length && multilingualData?.en?.links?.length),
    // For backward compatibility
    viMenuLinks: multilingualData?.vi?.links || [],
    enMenuLinks: multilingualData?.en?.links || [],
  };
};

/**
 * Hook cụ thể cho menu tiếng Anh (deprecated - use useMultilingualMenu instead)
 */
export const useMainMenuEn = () => {
  const result = useMainMenu();
  return {
    ...result,
    menuLinks: result.data?.en?.links || [],
    hasMenuData: !!(result.data?.en?.links?.length),
  };
};

/**
 * Custom hook to fetch multilingual menu data (both VI and EN) using TanStack Query
 * This hook fetches both languages in a single GraphQL query for better performance
 * 
 * @returns {Object} Object containing:
 *   - data: Object with vi and en menu data
 *   - isLoading: Boolean indicating if the request is in progress
 *   - isError: Boolean indicating if an error occurred
 *   - error: The error object if an error occurred
 *   - isSuccess: Boolean indicating if the request was successful
 *   - refetch: Function to manually refetch the data
 *   - viMenuLinks: Vietnamese menu links array
 *   - enMenuLinks: English menu links array
 *   - getMenuLinks: Function to get menu links for a specific language
 */
export const useMultilingualMenu = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['multilingualMenu'],
    queryFn: () => fetchMainMenuData(),
    staleTime: 10 * 60 * 1000, // 10 minutes - menu data doesn't change frequently
    gcTime: 30 * 60 * 1000, // 30 minutes cache time
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });

  const multilingualData = data as { vi: MenuByName, en: MenuByName } | undefined;

  return {
    data: multilingualData,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
    // Convenience accessors
    viMenuLinks: multilingualData?.vi?.links || [],
    enMenuLinks: multilingualData?.en?.links || [],
    hasMenuData: !!(multilingualData?.vi?.links?.length && multilingualData?.en?.links?.length),
    // Function to get menu links for specific language
    getMenuLinks: (language: 'vi' | 'en') => multilingualData?.[language]?.links || [],
  };
};

// Export types for external use
export type {
  MenuUrl,
  MenuLink,
  MenuSubtree,
  MenuLinkWithSubtree,
  MenuByName,
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
 * Fetch article details by UUID from Drupal JSON:API with language support
 * @param uuid - The UUID of the article to fetch
 * @param language - Language code ('vi' or 'en'), defaults to 'vi'
 * @returns Promise containing the article data
 */
async function fetchArticleById(uuid: string, language: 'vi' | 'en' = 'vi'): Promise<any> {
  try {
    // Try a simpler include first to avoid API errors, then fetch additional data if needed
    console.log('🚀 Fetching article with UUID:', uuid, 'Language:', language);
    
    const basicInclude = 'field_chuyen_muc,field_anh_dai_dien,field_anh_dai_dien.field_media_image,field_noi_dung_bai_viet,field_noi_dung_bai_viet.field_file_dinh_kem,field_noi_dung_bai_viet.field_file_dinh_kem.field_media_document';
    
    // Use language-specific endpoint
    const languagePrefix = language === 'en' ? '/en' : '/vi';
    const url = `${JSON_API_BASE_URL}${languagePrefix}/jsonapi/node/bai-viet/${encodeURIComponent(uuid)}?include=${basicInclude}`;
    
    console.log('📡 API URL:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...jsonApiHeaders,
        'Accept-Language': language,
        'Content-Language': language,
      },
    });

    console.log('📊 Response status:', response.status, response.statusText);

    if (!response.ok) {
      // Try fallback for legacy numeric IDs (development support)
      if (/^\d+$/.test(uuid)) {
        console.log('🔄 Trying fallback with numeric ID...');
        const fallbackUrl = `${JSON_API_BASE_URL}${languagePrefix}/jsonapi/node/bai-viet?filter[nid]=${uuid}&include=${basicInclude}`;
        
        const fallbackResponse = await fetch(fallbackUrl, {
          method: 'GET',
          headers: {
            ...jsonApiHeaders,
            'Accept-Language': language,
            'Content-Language': language,
          },
        });
        
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();
          console.log('✅ Fallback successful, data:', fallbackData);
          // Return the first item from the filtered results
          return fallbackData.data[0] ? { data: fallbackData.data[0], included: fallbackData.included } : null;
        } else {
          console.log('❌ Fallback also failed:', fallbackResponse.status);
        }
      }
      
      const errorText = await response.text();
      console.error('❌ API Error:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Article data fetched successfully:', data);
    
    // Now try to fetch additional media relationships for the paragraphs
    if (data?.data?.relationships?.field_noi_dung_bai_viet?.data?.length > 0) {
      await enrichParagraphsWithMedia(data, language);
    }
    
    return data;
  } catch (error) {
    console.error('❌ fetchArticleById error:', error);
    throw new Error(`Failed to fetch article details: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Fetch article by path alias (SEO-friendly URLs)
 * @param pathAlias - The path alias from Drupal (e.g., "/trung-tam-dich-vu-tong-hop-...")
 * @param language - Language for localized content
 * @returns Promise with article data
 * 
 * @example
 * ```typescript
 * const article = await fetchArticleByPath('/trung-tam-dich-vu-tong-hop-...', 'vi');
 * ```
 */
async function fetchArticleByPath(pathAlias: string, language: 'vi' | 'en' = 'vi'): Promise<any> {
  try {
    console.log('🚀 Fetching article with path alias:', pathAlias, 'Language:', language);
    
    const basicInclude = 'field_chuyen_muc,field_anh_dai_dien,field_anh_dai_dien.field_media_image,field_noi_dung_bai_viet,field_noi_dung_bai_viet.field_file_dinh_kem,field_noi_dung_bai_viet.field_file_dinh_kem.field_media_document';
    
    // Use language-specific endpoint with path filter
    const languagePrefix = language === 'en' ? '/en' : '/vi';
    
    // Ensure path starts with /
    const normalizedPath = pathAlias.startsWith('/') ? pathAlias : `/${pathAlias}`;
    
    // Try different approaches to find the article
    // Skip the problematic filter[path][alias] approach and go directly to client-side filtering
    console.log('🔄 Skipping problematic filter approach, using client-side filtering...');
    
    // Approach 1: Fetch all articles and filter client-side (most reliable)
    const fallbackUrl = `${JSON_API_BASE_URL}${languagePrefix}/jsonapi/node/bai-viet?include=${basicInclude}`;
    console.log('📡 Fetching all articles for client-side filtering:', fallbackUrl);
    
    const response = await fetch(fallbackUrl, {
      method: 'GET',
      headers: {
        ...jsonApiHeaders,
        'Accept-Language': language,
        'Content-Language': language,
      },
    });

    console.log('📊 Response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Failed to fetch articles for filtering:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Fetched all articles, filtering by path alias...');
    
    // Filter articles by path alias client-side
    const matchedArticle = data.data.find((article: any) => 
      article.attributes.path?.alias === normalizedPath
    );
    
    if (matchedArticle) {
      console.log('✅ Found matching article by client-side filtering:', matchedArticle);
      const articleData = { data: matchedArticle, included: data.included };
      
      // Enrich with media if needed
      if (articleData?.data?.relationships?.field_noi_dung_bai_viet?.data?.length > 0) {
        await enrichParagraphsWithMedia(articleData, language);
      }
      
      return articleData;
    } else {
      console.log('❌ No article found with path alias after client-side filtering');
      console.log('📋 Available path aliases:', data.data.map((a: any) => a.attributes.path?.alias).filter(Boolean));
      
      // Try to extract potential UUID from path (if path ends with hash-like suffix)
      const pathParts = normalizedPath.split('-');
      const lastPart = pathParts[pathParts.length - 1];
      
      if (lastPart && lastPart.length >= 6) {
        console.log('🔍 Trying to find article by title or URL suffix:', lastPart);
        
        // Try to find by title containing the path elements or by similar path
        const titleMatch = data.data.find((article: any) => {
          const title = article.attributes.title?.toLowerCase() || '';
          const pathSlug = normalizedPath.toLowerCase().replace(/[^a-z0-9\-]/g, '');
          return title.includes(lastPart) || 
                 article.attributes.path?.alias?.includes(lastPart) ||
                 pathSlug.includes(title.replace(/[^a-z0-9\-]/g, '').substring(0, 20));
        });
        
        if (titleMatch) {
          console.log('✅ Found article by title/content matching:', titleMatch);
          const articleData = { data: titleMatch, included: data.included };
          
          // Enrich with media if needed
          if (articleData?.data?.relationships?.field_noi_dung_bai_viet?.data?.length > 0) {
            await enrichParagraphsWithMedia(articleData, language);
          }
          
          return articleData;
        }
      }
      
      throw new Error(`No article found with path alias: ${pathAlias}`);
    }
  } catch (error) {
    console.error('❌ fetchArticleByPath error:', error);
    throw new Error(`Failed to fetch article by path: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Fetch article by UUID (more reliable than path alias)
 * @param uuid - The UUID of the article from Drupal
 * @param language - Language for localized content
 * @returns Promise with article data
 * 
 * @example
 * ```typescript
 * const article = await fetchArticleByUuid('626f1276-6f9a-4e6b-ab38-72e8718ae2fd', 'vi');
 * ```
 */
async function fetchArticleByUuid(uuid: string, language: 'vi' | 'en' = 'vi'): Promise<any> {
  try {
    console.log('🚀 Fetching article with UUID:', uuid, 'Language:', language);
    
    const basicInclude = 'field_chuyen_muc,field_anh_dai_dien,field_anh_dai_dien.field_media_image,field_noi_dung_bai_viet,field_noi_dung_bai_viet.field_file_dinh_kem,field_noi_dung_bai_viet.field_file_dinh_kem.field_media_document';
    
    // Use language-specific endpoint with UUID
    const languagePrefix = language === 'en' ? '/en' : '/vi';
    
    // Direct UUID endpoint - most reliable approach
    const url = `${JSON_API_BASE_URL}${languagePrefix}/jsonapi/node/bai-viet/${uuid}?include=${basicInclude}`;
    
    console.log('📡 Fetching article by UUID:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...jsonApiHeaders,
        'Accept-Language': language,
        'Content-Language': language,
      },
    });

    console.log('📊 Response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Failed to fetch article by UUID:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Article data fetched by UUID:', data);
    
    // The response for UUID fetch is a single object, not an array
    const articleData = { data: data.data, included: data.included };
    
    // Enrich with media if needed
    if (articleData?.data?.relationships?.field_noi_dung_bai_viet?.data?.length > 0) {
      await enrichParagraphsWithMedia(articleData, language);
    }
    
    return articleData;
  } catch (error) {
    console.error('❌ fetchArticleByUuid error:', error);
    throw new Error(`Failed to fetch article by UUID: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Debug function to list all available articles with their path aliases and UUIDs
 * @param language - Language for localized content
 * @returns Promise with array of article info
 */
async function fetchAllArticlesDebugInfo(language: 'vi' | 'en' = 'vi'): Promise<any[]> {
  try {
    const languagePrefix = language === 'en' ? '/en' : '/vi';
    const url = `${JSON_API_BASE_URL}${languagePrefix}/jsonapi/node/bai-viet`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...jsonApiHeaders,
        'Accept-Language': language,
        'Content-Language': language,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return data.data.map((article: any) => ({
      uuid: article.id,
      title: article.attributes.title,
      pathAlias: article.attributes.path?.alias,
      created: article.attributes.created,
      nid: article.attributes.drupal_internal__nid,
    }));
  } catch (error) {
    console.error('❌ fetchAllArticlesDebugInfo error:', error);
    throw error;
  }
}

/**
 * Enrich paragraph data with media relationships
 */
async function enrichParagraphsWithMedia(articleData: any, language: 'vi' | 'en' = 'vi'): Promise<void> {
  try {
    const paragraphIds = articleData.data.relationships.field_noi_dung_bai_viet.data.map((rel: any) => rel.id);
    const existingParagraphs = articleData.included?.filter((item: any) => paragraphIds.includes(item.id)) || [];
    
    console.log('🔍 Found paragraphs to enrich:', existingParagraphs.map((p: any) => ({ type: p.type, id: p.id })));
    
    // Find image paragraphs and try to fetch their media data
    const imageParagraphs = existingParagraphs.filter((p: any) => p.type === 'paragraph--image_block');
    
    for (const imageParagraph of imageParagraphs) {
      console.log('🖼️ Processing image paragraph:', imageParagraph);
      
      // Check if we need to fetch media data for this paragraph
      if (imageParagraph.relationships) {
        const relationshipKeys = Object.keys(imageParagraph.relationships);
        console.log('🔗 Available relationships:', relationshipKeys);
        
        // Try to find image relationships in common field names
        for (const key of relationshipKeys) {
          if (key.includes('image') || key.includes('media')) {
            const relationship = imageParagraph.relationships[key];
            if (relationship?.data?.id) {
              console.log(`📎 Found ${key} relationship:`, relationship.data);
              
              // Try to fetch this media item if not in included
              const mediaExists = articleData.included?.find((item: any) => item.id === relationship.data.id);
              if (!mediaExists) {
                console.log(`🔍 Media ${relationship.data.id} not in included, trying to fetch...`);
                await fetchMissingMediaData(articleData, relationship.data, language);
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.warn('⚠️ Error enriching paragraphs with media:', error);
    // Don't throw - just log warning as this is enhancement
  }
}

/**
 * Fetch missing media data and add to included array
 */
async function fetchMissingMediaData(articleData: any, mediaRef: any, language: 'vi' | 'en' = 'vi'): Promise<void> {
  try {
    const languagePrefix = language === 'en' ? '/en' : '/vi';
    const mediaUrl = `${JSON_API_BASE_URL}${languagePrefix}/jsonapi/${mediaRef.type}/${mediaRef.id}?include=field_media_image,field_media_file,thumbnail`;
    
    const response = await fetch(mediaUrl, {
      method: 'GET',
      headers: {
        ...jsonApiHeaders,
        'Accept-Language': language,
        'Content-Language': language,
      },
    });
    
    if (response.ok) {
      const mediaData = await response.json();
      console.log('✅ Fetched missing media data:', mediaData);
      
      // Add to included array
      if (mediaData.data) {
        articleData.included = articleData.included || [];
        articleData.included.push(mediaData.data);
        
        // Also add any included file entities
        if (mediaData.included) {
          articleData.included.push(...mediaData.included);
        }
      }
    }
  } catch (error) {
    console.warn('⚠️ Failed to fetch missing media data:', error);
  }
}

/**
 * Fetch article view count from Statistics module
 * @param nid - The node ID of the article
 * @returns Promise containing the view count data
 */
async function fetchArticleViewCount(nid: string): Promise<{ totalcount: number; uuid: string; nid: string }> {
  try {
    const url = `${JSON_API_BASE_URL}/api/view-count/${encodeURIComponent(nid)}?_format=json`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      // If view count fails, return default values instead of throwing error
      console.warn(`Failed to fetch view count for nid ${nid}: ${response.status}`);
      return {
        nid,
        totalcount: 0,
        uuid: '',
      };
    }

    const data = await response.json();
    
    // API returns an array, get the first item
    const viewData = Array.isArray(data) && data.length > 0 ? data[0] : null;
    
    if (!viewData) {
      return {
        nid,
        totalcount: 0,
        uuid: '',
      };
    }

    return {
      nid: viewData.nid || nid,
      totalcount: parseInt(viewData.totalcount || '0', 10),
      uuid: viewData.uuid || '',
    };
  } catch (error) {
    // Don't throw error for view count - just log and return defaults
    console.warn(`Error fetching view count for nid ${nid}:`, error);
    return {
      nid,
      totalcount: 0,
      uuid: '',
    };
  }
}

/**
 * Custom hook to fetch article view count data
 * 
 * @param nid - The node ID of the article
 * @returns {Object} Object containing view count data and loading states
 */
export const useArticleViewCount = (nid: string) => {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['articleViewCount', nid],
    queryFn: () => fetchArticleViewCount(nid),
    enabled: !!nid,
    staleTime: 2 * 60 * 1000, // 2 minutes - view count can change frequently
    gcTime: 10 * 60 * 1000, // 10 minutes cache time
    retry: 1, // Only retry once for view count
    retryDelay: 1000, // Quick retry for view count
  });

  return {
    viewCount: data?.totalcount || 0,
    viewData: data,
    isLoading,
    isError,
    error,
  };
};

/**
 * Custom hook to fetch and manage article detail data using TanStack Query with language support
 * 
 * @param uuid - The UUID of the article to fetch
 * @param language - Language code ('vi' or 'en'), defaults to 'vi'
 * @returns {Object} Object containing:
 *   - data: The article data from the API
 *   - isLoading: Boolean indicating if the request is in progress
 *   - isError: Boolean indicating if an error occurred
 *   - error: The error object if an error occurred
 *   - isSuccess: Boolean indicating if the request was successful
 *   - refetch: Function to manually refetch the data
 */


/**
 * React Query hook to fetch article details by path alias with language support
 * @param pathAlias - The path alias from URL (e.g., "/trung-tam-dich-vu-tong-hop-...")
 * @param language - Language for localized content ('vi' or 'en')
 * @returns Object containing:
 *   - data: The article data object with included relationships
 *   - isLoading: Boolean indicating if the request is in progress
 *   - isError: Boolean indicating if an error occurred
 *   - error: The error object if an error occurred
 *   - isSuccess: Boolean indicating if the request was successful
 *   - refetch: Function to manually refetch the data
 *
 * @example
 * ```typescript
 * const { data, isLoading, isError } = useArticleByPath('/some-article-path', 'vi');
 * ```
 */


/**
 * React Query hook to fetch article by UUID with language support
 * @param uuid - The UUID of the article from Drupal
 * @param language - Language for localized content ('vi' or 'en')
 * @returns Object containing:
 *   - data: The article data object with included relationships
 *   - isLoading: Boolean indicating if the request is in progress
 *   - isError: Boolean indicating if an error occurred
 *   - error: The error object if an error occurred
 *   - isSuccess: Boolean indicating if the request was successful
 *   - refetch: Function to manually refetch the data
 *
 * @example
 * ```typescript
 * const { data, isLoading, isError } = useArticleByUuid('626f1276-6f9a-4e6b-ab38-72e8718ae2fd', 'vi');
 * ```
 */


/**
 * Smart hook that detects identifier type and calls appropriate fetch method
 * @param identifier - Either a UUID (36 chars with hyphens or numeric) or a path slug
 * @param language - Language code ('vi' or 'en'), defaults to 'vi'
 * @returns Same shape as useArticleDetail hook
 */
export const useArticle = (identifier: string, language: 'vi' | 'en' = 'vi') => {
  // ────────────────────────────────────────────────────────────────────────
  // 1. Normalize & detect identifier type
  // ────────────────────────────────────────────────────────────────────────
  const normalizedId = (identifier || '').trim();
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const numericRegex = /^\d+$/;

  const isUuid = uuidRegex.test(normalizedId);
  const isNumeric = numericRegex.test(normalizedId);
  const isPath = !isUuid && !isNumeric;

  // ────────────────────────────────────────────────────────────────────────
  // 2. Build a single queryFn based on identifier type
  // ────────────────────────────────────────────────────────────────────────
  const queryFn = () => {
    if (isPath) {
      // Ensure path alias always starts with '/'
      const pathAlias = normalizedId.startsWith('/') ? normalizedId : `/${normalizedId}`;
      return fetchArticleByPath(pathAlias, language);
    }

    // UUID or legacy NID share the same fetcher (handles fallback internally)
    return fetchArticleByUuid(normalizedId, language);
  };

  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['articleDetail', normalizedId, language], // unified cache key
    queryFn,
    enabled: !!normalizedId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000,  // 15 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return { data, isLoading, isError, error, isSuccess, refetch };
};

/**
 * Fetch event details by UUID from Drupal JSON:API
 * @param uuid - The UUID of the event to fetch
 * @returns Promise containing the event data
 */
async function fetchEventById(uuid: string): Promise<any> {
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
    throw new Error(`Failed to fetch event details: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Custom hook to fetch and manage event detail data using TanStack Query
 * 
 * @param uuid - The UUID of the event to fetch
 * @returns {Object} Object containing:
 *   - data: The event data from the API
 *   - isLoading: Boolean indicating if the request is in progress
 *   - isError: Boolean indicating if an error occurred
 *   - error: The error object if an error occurred
 *   - isSuccess: Boolean indicating if the request was successful
 *   - refetch: Function to manually refetch the data
 */
export const useEventDetail = (uuid: string) => {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['event', uuid],
    queryFn: () => fetchEventById(uuid),
    enabled: !!uuid,
    staleTime: 5 * 60 * 1000, // 5 minutes - event data is relatively static
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

/**
 * Interface for document search filters
 */
interface DocumentFilters {
  keyword?: string;
  documentType?: string;
  startDate?: string;
  endDate?: string;
  documentNumber?: string;
  summary?: string;
  category?: string; // Add category filter for document type classification
  language?: 'vi' | 'en'; // UI language to fetch correct data version
  page?: number;
  pageSize?: number;
}

/**
 * Fetch legal documents from Drupal JSON:API with filters
 * @param params - Object containing queryKey from useQuery
 * @returns Promise containing the documents data
 */
async function fetchDocuments({ queryKey }: { queryKey: readonly unknown[] }): Promise<any> {
  try {
    const filters = queryKey[1] as DocumentFilters;
    const queryParams = new URLSearchParams();
    
    // Build query parameters based on filters using correct field names
    if (filters.keyword) {
      queryParams.append('filter[search]', filters.keyword);
    }
    
    if (filters.documentNumber) {
      queryParams.append('filter[field_so_ky_hieu][operator]', 'CONTAINS');
      queryParams.append('filter[field_so_ky_hieu][value]', filters.documentNumber);
    }
    
    if (filters.summary) {
      queryParams.append('filter[field_trich_yeu][operator]', 'CONTAINS');
      queryParams.append('filter[field_trich_yeu][value]', filters.summary);
    }
    
    if (filters.documentType && filters.documentType !== 'all') {
      queryParams.append('filter[field_loai_van_ban.name]', filters.documentType);
    }
    
    // DISABLE SERVER-SIDE CATEGORY FILTERING - use client-side filtering instead
    // Server-side filtering có vấn đề với Drupal JSON API syntax
    // Category filtering sẽ được xử lý hoàn toàn ở client-side
    
    if (filters.startDate) {
      queryParams.append('filter[field_ngay_ban_hanh][value]', filters.startDate);
      queryParams.append('filter[field_ngay_ban_hanh][operator]', '>=');
    }
    
    if (filters.endDate) {
      queryParams.append('filter[field_ngay_ban_hanh_end][value]', filters.endDate);
      queryParams.append('filter[field_ngay_ban_hanh_end][operator]', '<=');
      queryParams.append('filter[field_ngay_ban_hanh_end][path]', 'field_ngay_ban_hanh');
    }
    
    // Pagination
    const page = filters.page || 1;
    const pageSize = filters.pageSize || 10;
    const offset = (page - 1) * pageSize;
    
    queryParams.append('page[limit]', pageSize.toString());
    queryParams.append('page[offset]', offset.toString());
    
    // Sort by issue date (newest first)
    queryParams.append('sort', '-field_ngay_ban_hanh');
    
    // Include all related fields and taxonomy terms
    queryParams.append('include', 'field_file_dinh_kem.field_media_document,field_loai_van_ban,field_cac_loai_van_ban,field_linh_vuc,field_cap_ban_hanh,field_co_quan_ban_hanh');
    
    const language = filters.language === 'en' ? 'en' : 'vi';
    const languagePrefix = language === 'en' ? '/en' : '/vi';

    const url = `${JSON_API_BASE_URL}${languagePrefix}/jsonapi/node/legal_document?${queryParams.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...jsonApiHeaders,
        'Accept-Language': language,
        'Content-Language': language,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch documents: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Custom hook to fetch and manage legal documents data using TanStack Query
 * 
 * @param filters - Object containing document search filters
 * @returns {Object} Object containing:
 *   - data: The documents data from the API
 *   - isLoading: Boolean indicating if the request is in progress
 *   - isError: Boolean indicating if an error occurred
 *   - error: The error object if an error occurred
 *   - isSuccess: Boolean indicating if the request was successful
 *   - refetch: Function to manually refetch the data
 */
export const useDocuments = (filters: DocumentFilters = {}) => {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['documents', filters],
    queryFn: fetchDocuments,
    staleTime: 2 * 60 * 1000, // 2 minutes - question search results can be cached briefly
    gcTime: 5 * 60 * 1000, // 5 minutes cache time
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
    // Additional convenience properties with client-side filtering fallback
    documents: data?.data ? filterDocumentsClientSide(data.data, filters) : [],
    totalResults: data?.meta?.count || (data?.data ? filterDocumentsClientSide(data.data, filters).length : 0),
    hasDocuments: !!(data?.data ? filterDocumentsClientSide(data.data, filters).length : 0),
  };
};

/**
 * Client-side filtering fallback in case server-side filtering fails
 */
function filterDocumentsClientSide(documents: any[], filters: DocumentFilters): any[] {
  if (!filters.category) {
    console.log('🔧 No category filter, returning all documents');
    return documents;
  }
  
  console.log('🔧 Client-side filtering for category:', filters.category);
  
  const categoryMapping: { [key: string]: string } = {
    // Vietnamese slugs (updated)
    'quy-dinh-trung-uong': '13',
    'quy-dinh-dia-phuong': '14',
    'chi-dao-dieu-hanh': '15',
    'cai-cach-hanh-chinh': '16',
    // Legacy Vietnamese slugs for backward compatibility
    'phap-quy-trung-uong': '13',
    'phap-quy-dia-phuong': '14',
    'cchc': '16',
    // English slugs
    'central-legal-regulations': '13',
    'local-legal-regulations': '14',
    'directive-management-documents': '15',
    'administrative-reform-documents': '16'
  };
  
  const expectedCategoryId = categoryMapping[filters.category];
  console.log('🎯 Expected category ID:', expectedCategoryId, 'for category:', filters.category);
  
  if (!expectedCategoryId) {
    console.warn('❌ No mapping found for category:', filters.category);
    return documents;
  }
  
  const filtered = documents.filter((doc: any) => {
    const docCategoryId = doc.relationships?.field_cac_loai_van_ban?.data?.meta?.drupal_internal__target_id?.toString();
    const matches = docCategoryId === expectedCategoryId;
    
    console.log(`📋 Document ${doc.attributes?.field_so_ky_hieu}: category ${docCategoryId}, expected ${expectedCategoryId}, match: ${matches}`);
    
    return matches;
  });
  
  console.log(`✅ Client-side filtering result: ${documents.length} → ${filtered.length} documents`);
  return filtered;
}

// Export types for external use
export type { DocumentFilters };

// Export the fetch function for potential standalone use
export { fetchDocuments }; 

/**
 * Interface for enterprise search filters
 */
interface EnterpriseFilters {
  keyword?: string;
  industry?: string;
  location?: string;
  country?: string;
  foundedYear?: string;
  page?: number;
  pageSize?: number;
}

/**
 * Fetch enterprises from Drupal JSON:API with filters
 * @param params - Object containing queryKey from useQuery
 * @returns Promise containing the enterprises data
 */
async function fetchEnterprises({ queryKey }: { queryKey: readonly unknown[] }): Promise<any> {
  try {
    const filters = queryKey[1] as EnterpriseFilters;
    const queryParams = new URLSearchParams();
    
    // Build query parameters based on filters using JSON:API format
    if (filters.keyword) {
      queryParams.append('filter[title][operator]', 'CONTAINS');
      queryParams.append('filter[title][value]', filters.keyword);
    }
    
    if (filters.location && filters.location !== 'all') {
      // Map location values to proper taxonomy term names
      const locationMap: { [key: string]: string } = {
        'khu-cong-nghe-cao': 'Khu Công nghệ cao',
        'kcn-hoa-khanh': 'KCN Hòa Khánh',
        'kcn-lien-chieu': 'KCN Liên Chiểu',
        'kcn-da-nang': 'KCN Đà Nẵng',
        'kdt-an-don': 'KĐT An Đồn'
      };
      
      const locationName = locationMap[filters.location] || filters.location;
      queryParams.append('filter[field_khu_hanh_chinh.name]', locationName);
    }
    
    if (filters.country && filters.country !== 'all') {
      // Map country values to proper country names
      const countryMap: { [key: string]: string } = {
        'viet-nam': 'Việt Nam',
        'han-quoc': 'Hàn Quốc',
        'nhat-ban': 'Nhật Bản',
        'hoa-ky': 'Hoa Kỳ',
        'dai-loan': 'Đài Loan',
        'duc': 'Đức',
        'singapore': 'Singapore',
        'trung-quoc': 'Trung Quốc'
      };
      
      const countryName = countryMap[filters.country] || filters.country;
      queryParams.append('filter[field_quoc_gia][operator]', 'CONTAINS');
      queryParams.append('filter[field_quoc_gia][value]', countryName);
    }
    
    if (filters.industry && filters.industry !== 'all') {
      // Map industry values to proper industry names
      const industryMap: { [key: string]: string } = {
        'dien-tu-vien-thong': 'Điện tử viễn thông',
        'cong-nghe-thong-tin': 'Công nghệ thông tin',
        'hoa-chat-nhua': 'Hóa chất - Nhựa',
        'oto-co-khi': 'Ô tô - Cơ khí',
        'det-may': 'Dệt may',
        'thuc-pham': 'Thực phẩm',
        'xay-dung': 'Xây dựng',
        'logistics': 'Logistics'
      };
      
      const industryName = industryMap[filters.industry] || filters.industry;
      queryParams.append('filter[field_linh_vuc_hoat_dong.name]', industryName);
    }
    
    // Pagination - JSON:API format
    const page = filters.page || 1;
    const pageSize = filters.pageSize || 10;
    const offset = (page - 1) * pageSize;
    
    queryParams.append('page[limit]', pageSize.toString());
    queryParams.append('page[offset]', offset.toString());
    
    // Sort by creation date (newest first)
    queryParams.append('sort', '-created');
    
    // Include related taxonomy terms
    queryParams.append('include', 'field_khu_hanh_chinh,field_linh_vuc_hoat_dong');
    
    const url = `${JSON_API_BASE_URL}/jsonapi/node/listed_enterprise?${queryParams.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch enterprises: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Custom hook to fetch and manage enterprises data using TanStack Query
 * 
 * @param filters - Object containing enterprise search filters
 * @returns {Object} Object containing:
 *   - data: The enterprises data from the API
 *   - isLoading: Boolean indicating if the request is in progress
 *   - isError: Boolean indicating if an error occurred
 *   - error: The error object if an error occurred
 *   - isSuccess: Boolean indicating if the request was successful
 *   - refetch: Function to manually refetch the data
 */
export const useEnterprises = (filters: EnterpriseFilters = {}) => {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['enterprises', filters],
    queryFn: fetchEnterprises,
    staleTime: 2 * 60 * 1000, // 2 minutes - enterprise search results can be cached briefly
    gcTime: 5 * 60 * 1000, // 5 minutes cache time
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
    enterprises: data?.data || [],
    totalResults: data?.data?.length || 0,
    hasEnterprises: !!data?.data?.length,
  };
};

// Export types for external use
export type { EnterpriseFilters };

// Export the fetch function for potential standalone use
export { fetchEnterprises }; 

/**
 * Fetch work schedule from Drupal JSON:API with week range filter
 * @param weekRange - The week range in format 'YYYY-MM-DD_YYYY-MM-DD' (e.g., '2025-07-07_2025-07-13')
 * @returns Promise containing the work schedule data
 */
async function fetchWorkSchedule(weekRange: string, language: 'vi' | 'en' = 'vi'): Promise<any> {
  try {
    // Parse week range to get start and end dates
    const [startDate, endDate] = weekRange.split('_');
    
    // Build JSON:API query parameters for date range filtering
    const queryParams = new URLSearchParams();
    
    // Simple approach: filter by start date with >= operator
    queryParams.append('filter[field_ngay][value]', startDate);
    queryParams.append('filter[field_ngay][operator]', '>=');
    
    // For now, let's get all items from start date onwards and filter in frontend
    // This is more reliable than complex date range filtering
    
    // Sort by date and time
    queryParams.append('sort', 'field_ngay,field_thoi_gian');
    const languagePrefix = language === 'en' ? '/en' : '/vi';
    const url = `${JSON_API_BASE_URL}${languagePrefix}/jsonapi/node/schedule_item?${queryParams.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...jsonApiHeaders,
        'Accept-Language': language,
        'Content-Language': language,
      },
    });

    if (!response.ok) {
      // If filtering fails, try without any filters as fallback
      if (response.status === 500) {
        console.warn('Date filtering failed, fetching all schedule items');
        const fallbackUrl = `${JSON_API_BASE_URL}${languagePrefix}/jsonapi/node/schedule_item?sort=field_ngay,field_thoi_gian`;
        const fallbackResponse = await fetch(fallbackUrl, {
          method: 'GET',
          headers: {
            ...jsonApiHeaders,
            'Accept-Language': language,
            'Content-Language': language,
          },
        });
        
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();
          // Filter data in frontend
          if (fallbackData.data) {
            const startDateObj = new Date(startDate);
            const endDateObj = new Date(endDate);
            
            fallbackData.data = fallbackData.data.filter((item: any) => {
              const itemDate = new Date(item.attributes.field_ngay);
              return itemDate >= startDateObj && itemDate <= endDateObj;
            });
          }
          return fallbackData;
        }
      }
      
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    
    // Apply end date filtering in frontend to ensure we only get items in the week range
    if (data.data && endDate) {
      const endDateObj = new Date(endDate);
      data.data = data.data.filter((item: any) => {
        const itemDate = new Date(item.attributes.field_ngay);
        return itemDate <= endDateObj;
      });
    }
    
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch work schedule: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Custom hook to fetch and manage work schedule data using TanStack Query
 * 
 * @param weekRange - The week range in format 'YYYY-MM-DD_YYYY-MM-DD'
 * @returns {Object} Object containing:
 *   - data: The work schedule data from the API
 *   - isLoading: Boolean indicating if the request is in progress
 *   - isError: Boolean indicating if an error occurred
 *   - error: The error object if an error occurred
 *   - isSuccess: Boolean indicating if the request was successful
 *   - refetch: Function to manually refetch the data
 */
export const useWorkSchedule = (weekRange: string, language: 'vi' | 'en' = 'vi') => {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['schedule', weekRange, language],
    queryFn: () => fetchWorkSchedule(weekRange, language),
    enabled: !!weekRange,
    staleTime: 5 * 60 * 1000, // 5 minutes - schedule data is relatively static
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
    // Additional convenience properties for Drupal JSON:API structure
    scheduleItems: data?.data || [],
    hasScheduleData: !!data?.data?.length,
  };
};

// Export the fetch function for potential standalone use
export { fetchWorkSchedule }; 

/**
 * Interface for question search filters
 */
interface QuestionFilters {
  keyword?: string;
  topic?: string;
  page?: number;
  pageSize?: number;
}

/**
 * Fetch questions from Drupal JSON:API with filters
 * Only fetch questions for Q&A section (exclude FAQ questions)
 * @param params - Object containing queryKey from useQuery
 * @returns Promise containing the questions data
 */
async function fetchQuestions({ queryKey }: { queryKey: readonly unknown[] }): Promise<any> {
  try {
    const filters = queryKey[1] as QuestionFilters;
    const language = (queryKey[2] as 'vi' | 'en') || 'vi';
    const queryParams = new URLSearchParams();
    
    // IMPORTANT: Only get Q&A questions (exclude FAQ questions)
    // QnA questions have status: "da_tra_loi" (answered) or "cho_duyet" (pending approval)
    // FAQ questions have status: "da_cong_khai" (published publicly) - these are handled by useFaq hook
    
    // Filter for Q&A questions only (not FAQ)
    // We need to exclude "da_cong_khai" status as those are for FAQ page
    queryParams.append('filter[status][value]', '1'); // Only published content
    
    // Use a complex filter to get only Q&A questions (not FAQ questions)
    // This is a bit tricky with JSON:API, so we'll fetch all and filter client-side if needed
    
    // Build query parameters based on filters using JSON:API format
    if (filters.keyword) {
      queryParams.append('filter[title][operator]', 'CONTAINS');
      queryParams.append('filter[title][value]', filters.keyword);
    }
    
    if (filters.topic && filters.topic !== 'all') {
      queryParams.append('filter[field_linh_vuc.name]', filters.topic);
    }
    
    // Pagination - JSON:API format
    const page = filters.page || 1;
    const pageSize = filters.pageSize || 10;
    const offset = (page - 1) * pageSize;
    
    queryParams.append('page[limit]', pageSize.toString());
    queryParams.append('page[offset]', offset.toString());
    
    // Sort by creation date (newest first)
    queryParams.append('sort', '-created');
    
    // Include related taxonomy terms if needed
    queryParams.append('include', 'field_linh_vuc');
    
    const languagePrefix = language === 'en' ? '/en' : '/vi';
    const url = `${JSON_API_BASE_URL}${languagePrefix}/jsonapi/node/question?${queryParams.toString()}`;
    
    console.log('🔍 Fetching Q&A questions from:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...jsonApiHeaders,
        'Accept-Language': language,
        'Content-Language': language,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    
    // Client-side filtering to exclude FAQ questions (da_cong_khai)
    // Only include questions that are for Q&A section
    if (data.data) {
      const originalCount = data.data.length;
      
      data.data = data.data.filter((item: any) => {
        const status = item.attributes?.field_trang_thai;
        // Include questions that are:
        // 1. "da_tra_loi" (answered) - for Q&A
        // 2. "cho_duyet" (pending approval) - for Q&A
        // 3. null/undefined (default questions) - for Q&A
        // Exclude: "da_cong_khai" (published publicly) - those are for FAQ
        const isQnAQuestion = status !== 'da_cong_khai';
        
        console.log(`📋 Question "${item.attributes?.title}": status="${status}", isQnA=${isQnAQuestion}`);
        
        return isQnAQuestion;
      });
      
      console.log(`🔄 Q&A filtering: ${originalCount} → ${data.data.length} questions (excluded FAQ questions)`);
    }
    
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch questions: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Custom hook to fetch and manage questions data using TanStack Query
 * 
 * @param filters - Object containing question search filters
 * @returns {Object} Object containing:
 *   - data: The questions data from the API
 *   - isLoading: Boolean indicating if the request is in progress
 *   - isError: Boolean indicating if an error occurred
 *   - error: The error object if an error occurred
 *   - isSuccess: Boolean indicating if the request was successful
 *   - refetch: Function to manually refetch the data
 */
export const useQuestions = (filters: QuestionFilters = {}, language: 'vi' | 'en' = 'vi') => {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['questions', filters, language],
    queryFn: fetchQuestions,
    staleTime: 2 * 60 * 1000, // 2 minutes - question search results can be cached briefly
    gcTime: 5 * 60 * 1000, // 5 minutes cache time
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
    // Additional convenience properties for Drupal JSON:API structure
    questions: data?.data || [],
    totalResults: data?.data?.length || 0,
    hasQuestions: !!data?.data?.length,
  };
};

// Export types for external use
export type { QuestionFilters };

// Export the fetch function for potential standalone use
export { fetchQuestions }; 

/**
 * Interface for contact form data
 */
interface ContactFormData {
  hoTen: string;
  email: string;
  tieuDe: string;
  noiDung: string;
}

/**
 * Interface for contact form API response
 */
interface ContactFormResponse {
  status: 'success' | 'error';
  message: string;
}

/**
 * Submit contact form data to Drupal API
 * @param formData - The contact form data to submit
 * @returns Promise containing the API response
 */
async function submitContactForm(formData: ContactFormData): Promise<ContactFormResponse> {
  try {
    const url = `${JSON_API_BASE_URL}/api/v1/submit-contact-form`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to submit contact form: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Custom hook to submit contact form using TanStack Query mutation
 * 
 * @returns {Object} Object containing:
 *   - mutate: Function to trigger the contact form submission
 *   - isPending: Boolean indicating if the request is in progress
 *   - isSuccess: Boolean indicating if the request was successful
 *   - isError: Boolean indicating if an error occurred
 *   - error: The error object if an error occurred
 *   - data: The response data if successful
 *   - reset: Function to reset the mutation state
 */
export const useSubmitContactForm = () => {
  const {
    mutate,
    isPending,
    isSuccess,
    isError,
    error,
    data,
    reset,
  } = useMutation({
    mutationFn: submitContactForm,
    retry: 1, // Retry once on failure
    retryDelay: 1000, // Wait 1 second before retry
  });

  return {
    mutate,
    isPending,
    isSuccess,
    isError,
    error,
    data,
    reset,
  };
};

// Registration Form Types
interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

interface RegistrationResponse {
  success: boolean;
  message: string;
  user_id?: string;
  access_token?: string;
  user_name?: string;
  user_role?: string;
}

/**
 * Submit registration form data to Drupal API
 * @param formData - The registration form data to submit
 * @returns Promise containing the API response
 */
async function submitRegistrationForm(formData: RegistrationFormData): Promise<RegistrationResponse> {
  try {
    const url = `${JSON_API_BASE_URL}/api/v1/user/register`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to register user: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Custom hook to register user using TanStack Query mutation
 * 
 * @returns {Object} Object containing:
 *   - mutate: Function to trigger the user registration
 *   - isPending: Boolean indicating if the request is in progress
 *   - isSuccess: Boolean indicating if the request was successful
 *   - isError: Boolean indicating if an error occurred
 *   - error: The error object if an error occurred
 *   - data: The response data if successful
 *   - reset: Function to reset the mutation state
 */
export const useRegisterUser = () => {
  const {
    mutate,
    isPending,
    isSuccess,
    isError,
    error,
    data,
    reset,
  } = useMutation({
    mutationFn: submitRegistrationForm,
    retry: 1, // Retry once on failure
    retryDelay: 1000, // Wait 1 second before retry
  });

  return {
    mutate,
    isPending,
    isSuccess,
    isError,
    error,
    data,
    reset,
  };
};

// Change Password Form Types
interface ChangePasswordFormData {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

interface ChangePasswordResponse {
  success: boolean;
  message: string;
  user_id?: string;
  timestamp?: number;
}

/**
 * Submit change password form data to Drupal API
 * @param formData - The change password form data to submit
 * @param token - Authentication token
 * @returns Promise containing the API response
 */
async function submitChangePasswordForm(formData: ChangePasswordFormData, token?: string): Promise<ChangePasswordResponse> {
  try {
    const url = `${JSON_API_BASE_URL}/api/v1/user/change-password`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Add authentication token if provided
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(formData),
      credentials: 'include', // Include cookies for session-based auth
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to change password: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Custom hook to change user password using TanStack Query mutation
 * 
 * @returns {Object} Object containing:
 *   - mutate: Function to trigger the password change
 *   - isPending: Boolean indicating if the request is in progress
 *   - isSuccess: Boolean indicating if the request was successful
 *   - isError: Boolean indicating if an error occurred
 *   - error: The error object if an error occurred
 *   - data: The response data if successful
 *   - reset: Function to reset the mutation state
 */
export const useChangePassword = () => {
  const {
    mutate,
    isPending,
    isSuccess,
    isError,
    error,
    data,
    reset,
  } = useMutation({
    mutationFn: (formData: ChangePasswordFormData) => {
      // Get token from localStorage if available
      const token = localStorage.getItem('authToken');
      return submitChangePasswordForm(formData, token);
    },
    retry: 1, // Retry once on failure
    retryDelay: 1000, // Wait 1 second before retry
  });

  return {
    mutate,
    isPending,
    isSuccess,
    isError,
    error,
    data,
    reset,
  };
};

/**
 * Fetch content by path alias with support for multiple content types
 * @param pathAlias - The path alias from URL (e.g., "/some-content-path")
 * @param language - Language for localized content ('vi' or 'en')
 * @param contentTypes - Array of content types to search ['bai-viet', 'su-kien', etc.]
 * @returns Promise with content data
 */
async function fetchContentByPath(
  pathAlias: string, 
  language: 'vi' | 'en' = 'vi',
  contentTypes: string[] = ['bai-viet']
): Promise<any> {
  console.log('🚀 Fetching content with path alias:', pathAlias, 'Language:', language, 'Content types:', contentTypes);
  
  const languagePrefix = language === 'en' ? '/en' : '/vi';
  const normalizedPath = pathAlias.startsWith('/') ? pathAlias : `/${pathAlias}`;
  
  // Try each content type until we find a match
  for (const contentType of contentTypes) {
    try {
      console.log(`🔍 Trying content type: ${contentType}`);
      
      const basicInclude = 'field_chuyen_muc,field_anh_dai_dien,field_anh_dai_dien.field_media_image,field_noi_dung_bai_viet,field_noi_dung_bai_viet.field_file_dinh_kem,field_noi_dung_bai_viet.field_file_dinh_kem.field_media_document';
      
      // Approach 1: Try filter[path][alias]
      let url = `${JSON_API_BASE_URL}${languagePrefix}/jsonapi/node/${contentType}?filter[path][alias]=${encodeURIComponent(normalizedPath)}&include=${basicInclude}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          ...jsonApiHeaders,
          'Accept-Language': language,
          'Content-Language': language,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          console.log(`✅ Found content in ${contentType}:`, data);
          
          // Return the first match with content type info
          const articleData = { data: data.data[0], included: data.included, contentType };
          
          // Enrich with media if needed (only for article type)
          if (contentType === 'bai-viet' && articleData?.data?.relationships?.field_noi_dung_bai_viet?.data?.length > 0) {
            await enrichParagraphsWithMedia(articleData, language);
          }
          
          return articleData;
        }
      }
    } catch (error) {
      console.warn(`⚠️ Error searching in ${contentType}:`, error);
      // Continue to next content type
    }
  }
  
  // If no content found in any type, throw error
  throw new Error(`No content found with path alias: ${pathAlias} in content types: ${contentTypes.join(', ')}`);
}

/**
 * React Query hook to fetch content by path alias with support for multiple content types
 * @param pathAlias - The path alias from URL
 * @param language - Language for localized content
 * @param contentTypes - Array of content types to search
 * @returns Object containing content data and loading states
 */
export const useContentByPath = (
  pathAlias: string, 
  language: 'vi' | 'en' = 'vi',
  contentTypes: string[] = ['bai-viet']
) => {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['contentByPath', pathAlias, language, contentTypes],
    queryFn: () => fetchContentByPath(pathAlias, language, contentTypes),
    enabled: !!pathAlias,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes cache time
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
    contentType: data?.contentType, // Expose which content type was found
  };
};

// Export types for external use
export type { ContactFormData, ContactFormResponse, RegistrationFormData, RegistrationResponse, ChangePasswordFormData, ChangePasswordResponse };

// Export the fetch function for potential standalone use
export { submitContactForm, submitRegistrationForm, submitChangePasswordForm, fetchContentByPath, fetchArticleByUuid, fetchAllArticlesDebugInfo }; 