/**
 * Enhanced multilingual API client for DSEZA frontend
 * 
 * This module provides language-aware API functions that automatically handle
 * Vietnamese and English content requests from the Drupal JSON:API backend.
 * 
 * Features:
 * - Automatic language prefix handling (/vi/jsonapi/* or /en/jsonapi/*)
 * - Fallback to Vietnamese when English content unavailable
 * - Content translation support
 * - Improved error handling for multilingual scenarios
 */

import { useLanguage } from '@/context/LanguageContext';

// API Configuration
const API_CONFIG = {
  // Base URLs for different environments
  baseUrl: import.meta.env.VITE_DRUPAL_BASE_URL || 
    (import.meta.env.DEV ? '' : 'https://dseza-backend.lndo.site'),
  
  // Language-specific endpoints
  endpoints: {
    vi: '/vi/jsonapi',
    en: '/en/jsonapi',
    universal: '/jsonapi' // Language-negotiated endpoint
  },
  
  // Default headers for JSON:API
  headers: {
    'Content-Type': 'application/vnd.api+json',
    'Accept': 'application/vnd.api+json',
  },
  
  // Request options
  timeout: 30000,
  retries: 3,
};

/**
 * Language-aware fetch wrapper
 */
class MultilingualApiClient {
  private baseUrl: string;
  
  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || API_CONFIG.baseUrl;
  }
  
  /**
   * Make a language-aware API request
   * @param endpoint - API endpoint (without language prefix)
   * @param options - Request options
   * @param language - Target language (vi|en)
   * @param fallbackToVietnamese - Whether to fallback to Vietnamese if English fails
   */
  async request<T = any>(
    endpoint: string,
    options: RequestInit = {},
    language: 'vi' | 'en' = 'vi',
    fallbackToVietnamese: boolean = true
  ): Promise<T> {
    
    // Build language-prefixed URL
    const languagePrefix = API_CONFIG.endpoints[language];
    const url = `${this.baseUrl}${languagePrefix}${endpoint}`;
    
    // Merge headers
    const requestOptions: RequestInit = {
      ...options,
      headers: {
        ...API_CONFIG.headers,
        ...options.headers,
        'Accept-Language': language === 'vi' ? 'vi,en;q=0.8' : 'en,vi;q=0.8',
      },
    };
    
    console.log(`🌐 API Request [${language.toUpperCase()}]:`, url);
    
    try {
      // Primary request
      const response = await this.fetchWithRetry(url, requestOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Check if we got content in the requested language
      if (this.hasContentInLanguage(data, language)) {
        console.log(`✅ Retrieved content in ${language.toUpperCase()}`);
        return data;
      } else if (language === 'en' && fallbackToVietnamese) {
        console.log(`⚠️ No English content found, falling back to Vietnamese`);
        return this.request<T>(endpoint, options, 'vi', false);
      }
      
      return data;
      
    } catch (error) {
      console.error(`❌ API Error [${language.toUpperCase()}]:`, error);
      
      // Fallback to Vietnamese if English request fails
      if (language === 'en' && fallbackToVietnamese) {
        console.log(`🔄 Falling back to Vietnamese due to error`);
        try {
          return this.request<T>(endpoint, options, 'vi', false);
        } catch (fallbackError) {
          console.error(`❌ Fallback also failed:`, fallbackError);
          throw fallbackError;
        }
      }
      
      throw error;
    }
  }
  
  /**
   * Fetch with retry mechanism
   */
  private async fetchWithRetry(
    url: string, 
    options: RequestInit, 
    retries: number = API_CONFIG.retries
  ): Promise<Response> {
    
    for (let i = 0; i <= retries; i++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);
        
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        return response;
        
      } catch (error) {
        console.warn(`Attempt ${i + 1}/${retries + 1} failed:`, error);
        
        if (i === retries) {
          throw error;
        }
        
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
    
    throw new Error('Max retries reached');
  }
  
  /**
   * Check if the response contains content in the requested language
   */
  private hasContentInLanguage(data: any, language: string): boolean {
    if (!data?.data) return false;
    
    // Single item
    if (!Array.isArray(data.data)) {
      return data.data.attributes?.langcode === language ||
             data.data.attributes?.default_langcode === language;
    }
    
    // Multiple items - check if at least some content is in the requested language
    return data.data.some((item: any) => 
      item.attributes?.langcode === language ||
      item.attributes?.default_langcode === language
    );
  }
  
  /**
   * GET request with language support
   */
  async get<T = any>(
    endpoint: string, 
    params: Record<string, any> = {}, 
    language: 'vi' | 'en' = 'vi'
  ): Promise<T> {
    
    // Build query string
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(v => queryParams.append(key, v.toString()));
        } else {
          queryParams.append(key, value.toString());
        }
      }
    });
    
    const queryString = queryParams.toString();
    const fullEndpoint = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.request<T>(fullEndpoint, { method: 'GET' }, language);
  }
  
  /**
   * Get content with automatic translation fallback
   */
  async getWithTranslations<T = any>(
    endpoint: string,
    params: Record<string, any> = {},
    preferredLanguage: 'vi' | 'en' = 'vi'
  ): Promise<{
    data: T;
    language: 'vi' | 'en';
    hasTranslation: boolean;
    translations?: Record<string, any>;
  }> {
    
    try {
      // Try to get content in preferred language
      const primaryData = await this.get<T>(endpoint, params, preferredLanguage);
      
      // Try to get translations
      let translations = {};
      let hasTranslation = false;
      
      const otherLanguage = preferredLanguage === 'vi' ? 'en' : 'vi';
      try {
        const translationData = await this.get<T>(endpoint, params, otherLanguage);
        translations = { [otherLanguage]: translationData };
        hasTranslation = true;
      } catch (translationError) {
        console.warn(`No translation available in ${otherLanguage}:`, translationError);
      }
      
      return {
        data: primaryData,
        language: preferredLanguage,
        hasTranslation,
        translations: hasTranslation ? translations : undefined,
      };
      
    } catch (error) {
      throw new Error(`Failed to retrieve content: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Create singleton instance
const apiClient = new MultilingualApiClient();

/**
 * Hook for language-aware API requests
 */
export function useMultilingualApi() {
  const { language } = useLanguage();
  
  /**
   * Make a GET request in the current language
   */
  const get = async <T = any>(
    endpoint: string, 
    params: Record<string, any> = {}
  ): Promise<T> => {
    return apiClient.get<T>(endpoint, params, language);
  };
  
  /**
   * Get content with translation information
   */
  const getWithTranslations = async <T = any>(
    endpoint: string,
    params: Record<string, any> = {}
  ) => {
    return apiClient.getWithTranslations<T>(endpoint, params, language);
  };
  
  /**
   * Get content in both languages
   */
  const getBilingual = async <T = any>(
    endpoint: string,
    params: Record<string, any> = {}
  ): Promise<{
    vi?: T;
    en?: T;
    currentLanguage: T;
  }> => {
    
    const [viResponse, enResponse] = await Promise.allSettled([
      apiClient.get<T>(endpoint, params, 'vi'),
      apiClient.get<T>(endpoint, params, 'en'),
    ]);
    
    const result: any = {
      currentLanguage: undefined,
    };
    
    if (viResponse.status === 'fulfilled') {
      result.vi = viResponse.value;
    }
    
    if (enResponse.status === 'fulfilled') {
      result.en = enResponse.value;
    }
    
    // Set current language data
    result.currentLanguage = language === 'vi' ? result.vi : result.en;
    
    // Fallback if current language data is not available
    if (!result.currentLanguage) {
      result.currentLanguage = result.vi || result.en;
    }
    
    return result;
  };
  
  return {
    get,
    getWithTranslations,
    getBilingual,
    language,
    client: apiClient,
  };
}

/**
 * Direct API client for use outside of React components
 */
export { apiClient };

/**
 * Utility functions for multilingual content handling
 */
export const multilingualUtils = {
  
  /**
   * Extract content by language from JSON:API response
   */
  extractByLanguage<T = any>(data: any, language: 'vi' | 'en'): T[] {
    if (!data?.data) return [];
    
    const items = Array.isArray(data.data) ? data.data : [data.data];
    
    return items.filter((item: any) => 
      item.attributes?.langcode === language ||
      item.attributes?.default_langcode === language
    );
  },
  
  /**
   * Get available languages from JSON:API response
   */
  getAvailableLanguages(data: any): string[] {
    if (!data?.data) return [];
    
    const items = Array.isArray(data.data) ? data.data : [data.data];
    const languages = new Set<string>();
    
    items.forEach((item: any) => {
      if (item.attributes?.langcode) {
        languages.add(item.attributes.langcode);
      }
    });
    
    return Array.from(languages);
  },
  
  /**
   * Create language-specific URLs
   */
  createLanguageUrl(path: string, language: 'vi' | 'en'): string {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `/${language}/${cleanPath}`;
  },
  
  /**
   * Parse language from URL
   */
  parseLanguageFromUrl(url: string): 'vi' | 'en' | null {
    const match = url.match(/^\/(vi|en)\//);
    return match ? (match[1] as 'vi' | 'en') : null;
  },
};

export default useMultilingualApi; 