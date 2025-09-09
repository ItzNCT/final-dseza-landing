import { useQuery } from '@tanstack/react-query';
import { extractImageUrl } from '@/utils/drupal';
import { createPlainTextSummary } from '@/utils/richTextProcessor';
import { DRUPAL_BASE_URL } from '@/config';

// Base URL from centralized config

// Define TypeScript interfaces for the homepage data structure
interface NewsItem {
  id: string;
  title: string;
  summary: string;
  published_date: string;
  featured_image?: string;
  category: string;
}

interface Event {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  start_date: string;
  end_date?: string;
  location: string;
  featured_image?: string;
  path_alias?: string; // SEO-friendly URL alias from Drupal
}

interface InvestmentInfo {
  id: string;
  title: string;
  description: string;
  amount?: string;
  category: string;
  status: string;
}

interface BusinessPartner {
  id: string;
  name: string;
  logo?: string;
  description: string;
  website?: string;
  category: string;
}

interface QuickAccessLink {
  id: string;
  textKey: string;
  link: string;
  icon: string;
  order: number;
}

// Define TypeScript interfaces for the menu data structure
interface MenuItem {
  id: string;
  title: string;
  url: string;
  expanded: boolean;
  children?: MenuItem[];
  attributes?: {
    class?: string;
    target?: string;
    rel?: string;
  };
}

interface MainMenuData {
  menuItems: MenuItem[];
}

export interface HomepageData {
  news: NewsItem[];
  events: Event[];
  investments: InvestmentInfo[];
  partners: BusinessPartner[];
  quickAccessLinks?: QuickAccessLink[];
  statistics?: {
    total_enterprises: number;
    total_investment: string;
    employment_created: number;
    export_value: string;
  };
  announcements?: {
    id: string;
    title: string;
    content: string;
    priority: 'high' | 'medium' | 'low';
    published_date: string;
  }[];
}

/**
 * Fetch main menu data from Drupal GraphQL endpoint
 */
async function fetchMainMenuData(): Promise<MainMenuData> {
  try {
    const graphqlQuery = {
      query: `
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
      `
    };

    const response = await fetch(`${DRUPAL_BASE_URL || ''}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(graphqlQuery),
    });

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(`GraphQL errors: ${result.errors.map((err: any) => err.message).join(', ')}`);
    }

    // Transform the GraphQL response to our interface
    const transformMenuLink = (linkData: any, index: number): MenuItem => ({
      id: `menu-item-${index}`,
      title: linkData.link.label,
      url: linkData.link.url.path,
      expanded: linkData.link.expanded,
      children: linkData.subtree?.map((subLink: any, subIndex: number) => ({
        id: `menu-item-${index}-${subIndex}`,
        title: subLink.link.label,
        url: subLink.link.url.path,
        expanded: subLink.link.expanded,
        children: subLink.subtree?.map((grandLink: any, grandIndex: number) => ({
          id: `menu-item-${index}-${subIndex}-${grandIndex}`,
          title: grandLink.link.label,
          url: grandLink.link.url.path,
          expanded: grandLink.link.expanded,
        })) || [],
      })) || [],
    });

    const menuItems: MenuItem[] = result.data?.menuByName?.links?.map(transformMenuLink) || [];

    return {
      menuItems,
    };

  } catch (error) {
    throw new Error(`Failed to fetch main menu data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Fetch latest news articles from JSON:API
 */
async function fetchNewsList(baseUrl: string): Promise<NewsItem[]> {
  const url = `${baseUrl}/jsonapi/node/bai-viet`
    + '?filter[status][value]=1'               // Published
    + '&sort=-created'                         // Newest first
    + '&page[limit]=8'                         // 8 articles for homepage
    + '&include=field_anh_dai_dien.field_media_image,field_chuyen_muc'; // Include featured images for homepage

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

  return data.data
    ?.map((item: any) => {
      // Get category name from included data
      let categoryName = 'Tin tức';
      if (item.relationships?.field_chuyen_muc?.data?.length > 0 && data.included) {
        const categoryId = item.relationships.field_chuyen_muc.data[0].id;
        const categoryItem = data.included.find((inc: any) => 
          inc.type === 'taxonomy_term--news_category' && inc.id === categoryId
        );
        if (categoryItem) {
          categoryName = categoryItem.attributes.name;
        }
      }

      const rawSummary = item.attributes.body?.summary || item.attributes.body?.value || '';

      return {
        id: item.id,                 // JSON:API id is UUID
        title: item.attributes.title,
        summary: createPlainTextSummary(rawSummary),
        published_date: item.attributes.created,
        featured_image: extractImageUrl(item.relationships.field_anh_dai_dien, data.included),
        category: categoryName,
      };
    })
    ?.slice(0, 4) || []; // Take only first 4 for homepage
}

/**
 * Fetch featured events from JSON:API with language support
 */
async function fetchFeaturedEvents(baseUrl: string, language: 'vi' | 'en' = 'vi'): Promise<Event[]> {
  const languagePrefix = language === 'en' ? '/en' : '/vi';
  
  // Fetch both Vietnamese and English versions for better language support
  const [viData, enData] = await Promise.allSettled([
    fetch(`${baseUrl}/vi/jsonapi/node/bai-viet?filter[status][value]=1&filter[field_su_kien_tieu_bieu][value]=1&sort=-created&page[limit]=4&include=field_anh_dai_dien.field_media_image,field_chuyen_muc`, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Accept-Language': 'vi',
        'Content-Language': 'vi',
      },
    }),
    fetch(`${baseUrl}/en/jsonapi/node/bai-viet?filter[status][value]=1&filter[field_su_kien_tieu_bieu][value]=1&sort=-created&page[limit]=4&include=field_anh_dai_dien.field_media_image,field_chuyen_muc`, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Accept-Language': 'en',
        'Content-Language': 'en',
      },
    })
  ]);

  const url = `${baseUrl}${languagePrefix}/jsonapi/node/bai-viet`
    + '?filter[status][value]=1'
    + '&filter[field_su_kien_tieu_bieu][value]=1'       // Chỉ bài viết được đánh dấu sự kiện tiêu điểm
    + '&sort=-created'                                   // Sắp xếp theo ngày tạo mới nhất
    + '&page[limit]=4'
    + '&include=field_anh_dai_dien.field_media_image,field_chuyen_muc'; // Include featured images for homepage

  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Accept-Language': language,
      'Content-Language': language,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch featured events: ${response.status}`);
  }

  const data = await response.json();
  
  // Process alternative language data for dual language support
  let viDataResult: any = null;
  let enDataResult: any = null;
  
  if (viData.status === 'fulfilled' && viData.value.ok) {
    viDataResult = await viData.value.json();
  }
  
  if (enData.status === 'fulfilled' && enData.value.ok) {
    enDataResult = await enData.value.json();
  }
  
  return data.data?.map((item: any) => {
    // Find corresponding article in other language for dual language support
    let titleEn: string | undefined;
    let descriptionEn: string | undefined;
    
    // Look for English version if current is Vietnamese
    if (language === 'vi' && enDataResult?.data) {
      const enArticle = enDataResult.data.find((enItem: any) => 
        enItem.attributes?.drupal_internal__nid === item.attributes?.drupal_internal__nid
      );
      if (enArticle) {
        titleEn = enArticle.attributes.title;
        const rawDescription = enArticle.attributes.body?.processed || enArticle.attributes.body?.value || '';
        descriptionEn = createPlainTextSummary(rawDescription);
      }
    }
    
    // Look for Vietnamese version if current is English  
    if (language === 'en' && viDataResult?.data) {
      const viArticle = viDataResult.data.find((viItem: any) => 
        viItem.attributes?.drupal_internal__nid === item.attributes?.drupal_internal__nid
      );
      if (viArticle) {
        // For English articles, we store Vietnamese as the alternative
        titleEn = viArticle.attributes.title;
        const rawDescription = viArticle.attributes.body?.processed || viArticle.attributes.body?.value || '';
        descriptionEn = createPlainTextSummary(rawDescription);
      }
    }

    const rawMainDescription = item.attributes.body?.processed || item.attributes.body?.value || '';

    return {
      id: item.id,
      title: item.attributes.title,
      titleEn,
      description: createPlainTextSummary(rawMainDescription),
      descriptionEn,
      start_date: item.attributes.created,                 // Sử dụng ngày tạo làm ngày sự kiện
      end_date: undefined,
      location: '',                                        // Bài viết không có địa điểm
      featured_image: extractImageUrl(item.relationships?.field_anh_dai_dien, data.included), // Restore featured images for homepage
      path_alias: item.attributes.path?.alias || null, // Extract path alias for SEO URLs
    };
  }) || [];
}

/**
 * Fetch data from Drupal JSON:API endpoints and combine into homepage data with language support
 * Uses pure JSON:API for better reliability
 */
async function fetchHomepageData(language: 'vi' | 'en' = 'vi'): Promise<HomepageData> {
  try {
    // Use relative URLs when in development (proxy will handle routing)
    // Use full URL when VITE_API is set (production or specific config)
    const baseUrl = DRUPAL_BASE_URL ? DRUPAL_BASE_URL : '';
    const languagePrefix = language === 'en' ? '/en' : '/vi';
    
    // Fetch different content types from JSON:API
    const [newsResponse, eventsResponse, quickLinksResponse] = await Promise.allSettled([
      // Fetch recent news/articles via JSON:API
      fetchNewsList(baseUrl),
      // Fetch featured events via JSON:API with language support
      fetchFeaturedEvents(baseUrl, language),
      // Fetch quick access links
      fetch(`${baseUrl}${languagePrefix}/jsonapi/block_content/quick_link`, {
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          'Accept-Language': language,
          'Content-Language': language,
        },
      }),
    ]);

    // Process news data from JSON:API
    let news: NewsItem[] = [];
    if (newsResponse.status === 'fulfilled') {
      news = newsResponse.value;
    }

    // Process events data from JSON:API
    let events: Event[] = [];
    if (eventsResponse.status === 'fulfilled') {
      events = eventsResponse.value;
    }

    // Process quick access links
    let quickAccessLinks: QuickAccessLink[] = [];
    if (quickLinksResponse.status === 'fulfilled' && quickLinksResponse.value.ok) {
      const quickLinksData = await quickLinksResponse.value.json();
      quickAccessLinks = quickLinksData.data?.map((item: any) => ({
        id: item.id,
        textKey: item.attributes.info || item.attributes.title,
        link: item.attributes.field_duong_dan?.uri || item.attributes.field_link?.uri || '#',
        icon: item.attributes.field_icon || 'default',
        order: item.attributes.drupal_internal__id || 0,
      })) || [];
    }

    // Return combined data with fallbacks
    return {
      news,
      events,
      investments: [], // TODO: Implement when investment content type is available
      partners: [], // TODO: Implement when partner content type is available
      quickAccessLinks,
      statistics: {
        total_enterprises: 0,
        total_investment: '0',
        employment_created: 0,
        export_value: '0',
      },
      announcements: [],
    };

      } catch (error) {
      throw new Error(`Failed to fetch homepage data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

/**
 * Custom hook to fetch and manage main menu data using React Query
 * @returns Object containing menu data, loading state, and error state
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
    queryKey: ['mainMenuData'],
    queryFn: fetchMainMenuData,
    staleTime: 10 * 60 * 1000, // 10 minutes (menu data changes less frequently)
    gcTime: 30 * 60 * 1000, // 30 minutes
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
    menuItems: data?.menuItems || [],
  };
};

/**
 * Custom hook to fetch and manage homepage data using React Query with language support
 * @param language - Language code ('vi' or 'en'), defaults to 'vi'
 * @returns Object containing data, loading state, and error state
 */
export const useHomepageData = (language: 'vi' | 'en' = 'vi') => {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['homepageData', language],
    queryFn: () => fetchHomepageData(language),
    staleTime: 60_000, // 1 minute – homepage should be quite fresh
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 1, // news is not critical
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

// Export the fetch functions for potential standalone use
export { fetchHomepageData, fetchMainMenuData };
export type { MainMenuData, MenuItem };
