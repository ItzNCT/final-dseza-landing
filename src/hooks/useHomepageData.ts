import { useQuery } from '@tanstack/react-query';

// Use relative path for proxy, with fallback to env variable
const DRUPAL_BASE_URL = import.meta.env.VITE_API || '';

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
  description: string;
  start_date: string;
  end_date?: string;
  location: string;
  featured_image?: string;
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
 * Fetch data from Drupal JSON:API endpoints and combine into homepage data
 * Uses relative URLs to work with Vite proxy configuration
 */
async function fetchHomepageData(): Promise<HomepageData> {
  try {
    // Use relative URLs when in development (proxy will handle routing)
    // Use full URL when VITE_API is set (production or specific config)
    const baseUrl = DRUPAL_BASE_URL ? DRUPAL_BASE_URL : '';
    
    // Fetch different content types from JSON:API
    const [newsResponse, eventsResponse, quickLinksResponse] = await Promise.allSettled([
      // Fetch recent news/articles
      fetch(`${baseUrl}/jsonapi/node/article?sort=-created&page[limit]=5`, {
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
        },
      }),
      // Fetch upcoming events (if you have event content type)
      fetch(`${baseUrl}/jsonapi/node/event?sort=field_start_date&page[limit]=5`, {
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
        },
      }),
      // Fetch quick access links
      fetch(`${baseUrl}/jsonapi/block_content/quick_link`, {
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
        },
      }),
    ]);

    // Process news data
    let news: NewsItem[] = [];
    if (newsResponse.status === 'fulfilled' && newsResponse.value.ok) {
      const newsData = await newsResponse.value.json();
      news = newsData.data?.map((item: any) => ({
        id: item.id,
        title: item.attributes.title,
        summary: item.attributes.body?.summary || item.attributes.body?.value?.substring(0, 200) + '...' || '',
        published_date: item.attributes.created,
        featured_image: item.relationships?.field_featured_image?.data?.id || undefined,
        category: item.attributes.type || 'article',
      })) || [];
    }

    // Process events data
    let events: Event[] = [];
    if (eventsResponse.status === 'fulfilled' && eventsResponse.value.ok) {
      const eventsData = await eventsResponse.value.json();
      events = eventsData.data?.map((item: any) => ({
        id: item.id,
        title: item.attributes.title,
        description: item.attributes.body?.value || item.attributes.field_description || '',
        start_date: item.attributes.field_start_date || item.attributes.created,
        end_date: item.attributes.field_end_date || undefined,
        location: item.attributes.field_location || '',
        featured_image: item.relationships?.field_featured_image?.data?.id || undefined,
      })) || [];
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
    console.error('Error fetching homepage data:', error);
    throw new Error(`Failed to fetch homepage data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Custom hook to fetch and manage homepage data using React Query
 * @returns Object containing data, loading state, and error state
 */
export const useHomepageData = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['homepageData'],
    queryFn: fetchHomepageData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
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
  };
};

// Export the fetch function for potential standalone use
export { fetchHomepageData };
