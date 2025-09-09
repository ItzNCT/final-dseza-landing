/**
 * API client for Drupal JSON:API
 */
import { DRUPAL_BASE_URL } from '@/config';

interface ApiGetOptions {
  sort?: string;
  include?: string;
  filter?: Record<string, any>;
  page?: {
    limit?: number;
    offset?: number;
  };
}

interface ApiResponse<T = any> {
  data: T;
  included?: any[];
  meta?: any;
  links?: any;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T = any>(endpoint: string, options: ApiGetOptions = {}): Promise<ApiResponse<T>> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    // Add query parameters
    if (options.sort) {
      url.searchParams.append('sort', options.sort);
    }
    
    if (options.include) {
      url.searchParams.append('include', options.include);
    }
    
    if (options.filter) {
      Object.entries(options.filter).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            url.searchParams.append(`filter[${key}][${subKey}]`, String(subValue));
          });
        } else {
          url.searchParams.append(`filter[${key}]`, String(value));
        }
      });
    }
    
    if (options.page) {
      if (options.page.limit) {
        url.searchParams.append('page[limit]', String(options.page.limit));
      }
      if (options.page.offset) {
        url.searchParams.append('page[offset]', String(options.page.offset));
      }
    }

    const response = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}

// Export a single instance
export const api = new ApiClient(DRUPAL_BASE_URL); 